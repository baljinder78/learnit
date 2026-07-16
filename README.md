# Frontend Atlas

Frontend Atlas is an interactive eight-week learning system for experienced frontend engineers. It teaches concepts through controlled visual traces, focused code, production consequences, architecture decisions, practice, and interview reasoning.

## What is implemented

- A responsive dashboard with progress, streak, quiz, exercise, revision, and interview-readiness signals.
- A complete sequential mastery map with 66 topics, 374 subtopics, 656 learning sections, and more than 2,900 concepts, explanations, questions, examples, and practical mastery tasks.
- Twelve fully structured Week 1 lessons with all thirteen teaching sections requested in the brief.
- A statement-by-statement event-loop lab with call stack, browser APIs, microtask queue, task queue, promise state, console output, play/pause, previous/next, restart, speed, and current-state inspection.
- Reusable concept traces, code panels, ordering exercises, quizzes with feedback, production examples, architecture views, and interview prompts.
- Topic explorer, searchable visual lab, coding-practice editor with test feedback, timed interview mode, revision flashcards, weak-topic queue, knowledge graph, and draggable system-design canvas.
- Dark/light themes, reduced-motion handling, keyboard focus styles, semantic controls, responsive layouts, and device-local progress persistence.

## Architecture

The project intentionally keeps content, product state, and rendering separate:

```text
app/
├── mastery-data.json  # Generated 66-topic sequential knowledge map
├── curriculum.ts      # Weeks, modules, topics, detailed Week 1 lessons, relationships
├── LearningApp.tsx    # Product modes, reusable visualizations, exercises, local adapter
├── page.tsx           # Route entry and page metadata
├── layout.tsx         # Root metadata, fonts, theme root
└── globals.css        # Visual system, diagrams, responsive and accessibility rules
tests/
└── rendered-html.test.mjs
content/
└── mastery-curriculum.md # Canonical curriculum source
scripts/
└── build-mastery-data.mjs # Reproducible Markdown-to-data parser
```

Progress is accessed through a small storage adapter (`progressStore`) rather than directly throughout the UI. Replacing it with an authenticated backend later only requires changing that adapter and hydration strategy.

The full curriculum is modeled as `Topic → Subtopic → Learning group → Learning point`. Learning groups preserve important concepts, key things to understand, examples, questions, and practical mastery separately. The original guided lessons remain a deeper visual layer linked from the sequential map.

## Run locally

Node.js 22.13 or newer is required.

```bash
nvm install
nvm use
npm install
npm run dev
```

If a terminal still reports Node 20, run `nvm use` in that terminal before starting the app. Vinext relies on Node APIs that are unavailable in Node 20.

Open the local URL printed by the development server.

## Validate

```bash
npm run lint
npm test
```

`npm test` creates the production build and verifies server rendering, curriculum coverage, local persistence, accessibility controls, and the primary learning-flow contracts.

## Extending the curriculum

1. Add topics to the appropriate module in `app/curriculum.ts`.
2. For the complete mastery map, edit `content/mastery-curriculum.md` and run `npm run content:build`.
3. Add a detailed lesson object when the topic needs a full guided visual lesson.
4. Choose the most accurate `VisualKind`, or add a new visual grammar when the mechanism cannot be taught well with an existing one.
5. Add a focused test for any new state transition or persistence behavior.

## Roadmap mapping

| Week | Implemented surface |
| --- | --- |
| 1 · JavaScript & TypeScript | Complete guided lessons, event-loop lab, memory/type traces, exercises, quizzes, interviews |
| 2 · Browser, network, security | Curriculum pages plus rendering, waterfall, storage, and attack/defence visual-lab models |
| 3 · React mastery | Curriculum pages plus renderer timeline, hooks failure models, state-placement map |
| 4 · Testing, accessibility, quality | Curriculum pages plus testing pyramid and focus-flow lab models |
| 5 · Architecture | Curriculum pages plus dependency and boundary graph models |
| 6 · System design | Guided cases and draggable decision canvas with coherence signals |
| 7 · AI frontend engineering | Curriculum pages plus retrieval/tool/human-approval pipeline model |
| 8 · Interview preparation | Timed reasoning room, implementation practice, revision system, preparation topics |

## Known limitations and next improvements

- Progress is intentionally local to one browser and has no account synchronization.
- Week 1 is the fully authored reference module. Weeks 2–8 have complete curriculum coverage and purpose-built visual lab entries, but should be expanded into the same depth of authored lesson narrative over time.
- The practice editor uses deterministic in-browser contract checks rather than an isolated JavaScript/TypeScript sandbox.
- The system-design canvas supports draggable nodes and decision recording UI; persistent connectors, import/export, and collaborative review are natural next additions.
- Revision scheduling currently uses a compact weak-topic queue rather than a full SM-2-style scheduler.
