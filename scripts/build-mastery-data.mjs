import { readFile, writeFile } from "node:fs/promises";

const sourceUrl = new URL("../content/mastery-curriculum.md", import.meta.url);
const outputUrl = new URL("../app/mastery-data.json", import.meta.url);
const lines = (await readFile(sourceUrl, "utf8")).split(/\r?\n/);

const curriculum = { title: "Complete Frontend Engineering Mastery Curriculum", topics: [] };
let topic = null;
let subtopic = null;
let group = null;
let inCode = false;
let code = [];

const clean = (value) => value
  .replace(/`([^`]+)`/g, "$1")
  .replace(/\*\*([^*]+)\*\*/g, "$1")
  .replace(/\*([^*]+)\*/g, "$1")
  .trim();

const ensureSubtopic = () => {
  if (!topic) return null;
  if (!subtopic) {
    subtopic = { id: `${topic.id}.0`, title: "Topic overview", groups: [] };
    topic.subtopics.push(subtopic);
  }
  return subtopic;
};

const ensureGroup = (title = "Overview") => {
  const owner = ensureSubtopic();
  if (!owner) return null;
  if (!group) {
    group = { title, items: [], prose: [], code: [] };
    owner.groups.push(group);
  }
  return group;
};

for (const rawLine of lines) {
  const line = rawLine.trimEnd();

  if (line.startsWith("```")) {
    if (inCode) {
      ensureGroup()?.code.push(code.join("\n"));
      code = [];
      inCode = false;
    } else {
      inCode = true;
    }
    continue;
  }

  if (inCode) {
    code.push(rawLine);
    continue;
  }

  const topicMatch = line.match(/^#\s+(\d+)\.\s+(.+)$/);
  if (topicMatch) {
    topic = { id: topicMatch[1], title: clean(topicMatch[2]), importance: [], subtopics: [] };
    curriculum.topics.push(topic);
    subtopic = null;
    group = null;
    continue;
  }

  if (!topic || /^#\s/.test(line)) continue;

  const subtopicMatch = line.match(/^##\s+(?:(\d+(?:\.\d+)?)\s+)?(.+)$/);
  if (subtopicMatch) {
    const title = clean(subtopicMatch[2]);
    if (title.toLowerCase() === "topic importance") {
      subtopic = { id: `${topic.id}.importance`, title: "Why this topic matters", groups: [{ title: "Topic importance", items: [], prose: [], code: [] }] };
    } else {
      subtopic = { id: subtopicMatch[1] ?? `${topic.id}.${topic.subtopics.length + 1}`, title, groups: [] };
    }
    topic.subtopics.push(subtopic);
    group = subtopic.groups[0] ?? null;
    continue;
  }

  const groupMatch = line.match(/^###\s+(.+)$/);
  if (groupMatch) {
    group = { title: clean(groupMatch[1]), items: [], prose: [], code: [] };
    ensureSubtopic()?.groups.push(group);
    continue;
  }

  if (/^---+$/.test(line) || !line.trim()) continue;

  const bullet = line.match(/^[-*]\s+(.+)$/);
  if (bullet) {
    ensureGroup()?.items.push(clean(bullet[1]));
    continue;
  }

  const numbered = line.match(/^\d+\.\s+(.+)$/);
  if (numbered) {
    ensureGroup()?.items.push(clean(numbered[1]));
    continue;
  }

  if (!/^#{3,}\s/.test(line)) ensureGroup()?.prose.push(clean(line));
}

for (const item of curriculum.topics) {
  const importance = item.subtopics.find((entry) => entry.title === "Why this topic matters");
  if (importance) {
    item.importance = importance.groups.flatMap((entry) => [...entry.prose, ...entry.items]);
    item.subtopics = item.subtopics.filter((entry) => entry !== importance);
  }
}

const stats = {
  topics: curriculum.topics.length,
  subtopics: curriculum.topics.reduce((sum, item) => sum + item.subtopics.length, 0),
  groups: curriculum.topics.reduce((sum, item) => sum + item.subtopics.reduce((count, entry) => count + entry.groups.length, 0), 0),
  learningPoints: curriculum.topics.reduce((sum, item) => sum + item.subtopics.reduce((count, entry) => count + entry.groups.reduce((points, section) => points + section.items.length + section.prose.length + section.code.length, 0), 0), 0),
};

await writeFile(outputUrl, `${JSON.stringify({ ...curriculum, stats }, null, 2)}\n`);
console.log(stats);
