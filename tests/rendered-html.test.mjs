import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: handler } = await import(workerUrl.href);
  return typeof handler === "function"
    ? handler(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }))
    : handler.fetch(
        new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
        {},
        { waitUntil() {}, passThroughOnException() {} },
      );
}

test("server-renders the global frontend knowledge map", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Frontend Atlas/);
  assert.match(html, /Understand the system/);
  assert.match(html, /Explore the map/);
  assert.match(html, /JavaScript language/);
  assert.match(html, /Attached reading shelf/i);
  assert.match(html, /Books mapped to the knowledge atlas/i);
  assert.doesNotMatch(html, /Weekly roadmap|Revision queue|Interview readiness|System Design/);
});

test("dedicated topic and subtopic routes render their teaching workspaces", async () => {
  const data = JSON.parse(await readFile(new URL("app/mastery-data.json", root), "utf8"));
  const topic = data.topics[0];
  const subtopic = topic.subtopics[0];

  const topicResponse = await render(`/learn/${topic.slug}`);
  assert.equal(topicResponse.status, 200);
  const topicHtml = await topicResponse.text();
  assert.match(topicHtml, new RegExp(topic.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(topicHtml, /Topic mind map/i);
  assert.match(topicHtml, /Interactive visual model/i);

  const subtopicResponse = await render(`/learn/${topic.slug}/${subtopic.slug}`);
  assert.equal(subtopicResponse.status, 200);
  const subtopicHtml = await subtopicResponse.text();
  assert.match(subtopicHtml, new RegExp(subtopic.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(subtopicHtml, /Mental model/i);
  assert.match(subtopicHtml, /Internal behavior/i);
  assert.match(subtopicHtml, /Syntax &amp; example/i);
  assert.match(subtopicHtml, /What the syntax proves/i);
  assert.match(subtopicHtml, /Try this next/i);
  assert.match(subtopicHtml, /engine-input\.js/i);
  assert.match(subtopicHtml, /Mapped from your attached books/i);
});

test("mastery data preserves the complete source hierarchy and stable slugs", async () => {
  const data = JSON.parse(await readFile(new URL("app/mastery-data.json", root), "utf8"));
  assert.equal(data.stats.topics, 66);
  assert.equal(data.stats.subtopics, 374);
  assert.ok(data.stats.learningPoints >= 2900);
  assert.equal(data.topics[0].title, "How JavaScript Executes Code");
  assert.equal(data.topics.at(-1).title, "Final Mastery Requirements");
  assert.match(data.topics[0].slug, /^[a-z0-9-]+$/);
  assert.match(data.topics[0].subtopics[0].slug, /^[a-z0-9-]+$/);
  const engine = data.topics[0].subtopics.find((item) => item.title === "JavaScript Engine");
  assert.ok(engine.groups.some((group) => group.title === "Important concepts"));
  assert.ok(engine.groups.some((group) => group.title === "Key things to understand"));
  assert.ok(engine.groups.some((group) => group.title === "Practical mastery"));
});

test("the primary learning flow is visual, accessible, and topic-only", async () => {
  const app = await readFile(new URL("app/KnowledgeApp.tsx", root), "utf8");
  const css = await readFile(new URL("app/knowledge.css", root), "utf8");
  for (const contract of ["ConceptVisualizer", "TopicMindMap", "SyntaxExample", "Play visualizer", "Replay visualizer", "Previous step", "Next step", "Reset visualizer", "Visualizer speed", "Search topics and subtopics"]) {
    assert.match(app, new RegExp(contract));
  }
  assert.match(app, /frontend-atlas-theme/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(app, /progressStore|recordQuiz|markComplete|revision|interview/i);
});

test("examples and attached references cover syntax as well as deeper reading", async () => {
  const examples = await readFile(new URL("app/learning-examples.ts", root), "utf8");
  for (const contract of [
    "learningExampleFor",
    "readingReferencesFor",
    "You Don’t Know JS: Scope & Closures",
    "You Don’t Know JS: Async & Performance",
    "Architect Mode — Career Field Guide",
  ]) {
    assert.match(examples, new RegExp(contract));
  }
});

test("deployment and course-management starter files are removed", async () => {
  const packageJson = await readFile(new URL("package.json", root), "utf8");
  const viteConfig = await readFile(new URL("vite.config.ts", root), "utf8");
  assert.doesNotMatch(packageJson, /wrangler|cloudflare|drizzle/i);
  assert.doesNotMatch(viteConfig, /hosting|worker|cloudflare|wrangler|d1/i);
});
