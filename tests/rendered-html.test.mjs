import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished learning product", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Frontend Atlas/);
  assert.match(html, /See the runtime/);
  assert.match(html, /Event loop/);
  assert.match(html, /Visual lab/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("curriculum covers every requested week and remains data-driven", async () => {
  const curriculum = await readFile(new URL("app/curriculum.ts", root), "utf8");
  const app = await readFile(new URL("app/LearningApp.tsx", root), "utf8");
  for (let week = 1; week <= 8; week += 1) assert.match(curriculum, new RegExp(`id: ${week},`));
  for (const topic of ["Execution context", "Event loop", "Content Security Policy", "Fiber architecture", "WCAG fundamentals", "Micro-frontends", "Retrieval-augmented generation", "LRU cache"]) assert.match(curriculum, new RegExp(topic));
  assert.match(app, /weeks\.flatMap/);
  assert.match(app, /weekOneLessons\.map/);
});

test("mastery map preserves the complete sequential curriculum hierarchy", async () => {
  const data = JSON.parse(await readFile(new URL("app/mastery-data.json", root), "utf8"));
  assert.equal(data.stats.topics, 66);
  assert.equal(data.stats.subtopics, 374);
  assert.ok(data.stats.learningPoints >= 2900);
  assert.equal(data.topics[0].title, "How JavaScript Executes Code");
  assert.equal(data.topics.at(-1).title, "Final Mastery Requirements");
  const engine = data.topics[0].subtopics.find((item) => item.title === "JavaScript Engine");
  assert.ok(engine.groups.some((group) => group.title === "Important concepts"));
  assert.ok(engine.groups.some((group) => group.title === "Key things to understand"));
  assert.ok(engine.groups.some((group) => group.title === "Practical mastery"));
});

test("primary learning flow includes persistence and accessible controls", async () => {
  const app = await readFile(new URL("app/LearningApp.tsx", root), "utf8");
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(app, /localStorage\.setItem\("frontend-atlas-progress-v1"/);
  assert.match(app, /aria-label="Next step"/);
  assert.match(app, /aria-label="Code editor"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(app, /markComplete/);
  assert.match(app, /recordQuiz/);
});
