# Frontend Atlas

Frontend Atlas is a local, interactive knowledge map for frontend engineering. It is organized as a durable reference rather than a course schedule:

```text
Topic → Subtopic → Important concepts → Key things to understand → Practical mastery
```

## What is included

- 65 focused frontend topics and 370+ subtopics, grouped into eight navigable domains.
- Dedicated URLs for every topic and subtopic.
- Progressive explanations covering definitions, purpose, mental models, internal behavior, usage, edge cases, mistakes, and related concepts.
- A dedicated syntax section for every subtopic, with a focused code sample, the behavior it proves, and a small experiment to try next.
- A controllable visualizer on every topic and subtopic page, with play, pause, step, reset, and speed controls.
- A global frontend knowledge map plus a clickable mind map for each topic.
- Search, breadcrumbs, in-page navigation, previous/next links, a locally saved light/dark theme, responsive layouts, and reduced-motion support.
- A reading shelf that maps the attached *You Don’t Know JS* series and *Architect Mode — Career Field Guide* to the relevant topics without copying the source books into the project.
- A canonical Markdown curriculum that generates the application data.

The product deliberately excludes schedules, streaks, quizzes, revision queues, interview modes, project trackers, and progress dashboards. It is a topic-first reference for understanding how frontend systems work.

## Project structure

```text
app/
├── KnowledgeApp.tsx       # Knowledge navigation, teaching pages, visualizers, mind maps
├── knowledge.css          # Complete responsive visual system
├── learning-examples.ts   # Syntax examples and attached-book reading maps
├── mastery-data.json      # Generated sequential frontend knowledge map
├── learn/[topic]/         # Dedicated topic routes
├── learn/[topic]/[subtopic]/ # Dedicated subtopic routes
├── page.tsx               # Global knowledge-map entry
└── layout.tsx             # Local application shell and metadata
content/
└── mastery-curriculum.md  # Canonical curriculum source
scripts/
└── build-mastery-data.mjs # Markdown-to-data parser
tests/
└── rendered-html.test.mjs # Build and knowledge-product contracts
```

## Run locally

Node.js 22.13 or newer is required. Node 20 does not expose the `node:fs/promises` `glob` API required by Vinext.

```bash
nvm install
nvm use
npm install
npm run dev
```

Open the local URL printed by the development server.

## Validate

```bash
npm run lint
npm test
```

`npm test` regenerates the content data, creates the local production build, and verifies server rendering, routes, hierarchy, syntax examples, attached-reading maps, interactive-learning controls, accessibility contracts, and the absence of the removed course-management surfaces.

## Extend the curriculum

1. Edit `content/mastery-curriculum.md`.
2. Preserve the hierarchy `Topic → Subtopic → Learning group → Learning point`.
3. Run `npm run content:build` to regenerate `app/mastery-data.json`.
4. Run `npm test` before using the updated reference.

The application is intentionally local-only and contains no deployment, worker, cloud database, or hosting configuration.
