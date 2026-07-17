# Frontend Atlas — Complete Project and Chat Handoff

Last updated: 17 July 2026  
Project location on the original device: `/Users/baljindersingh/Documents/melearning`

This file is the source of context for continuing Frontend Atlas on another device or in a new Codex task. Read it before changing the application.

## 1. Product in one sentence

Frontend Atlas is a local-only, modern, interactive frontend engineering textbook organized as:

```text
Topic → Subtopic → Important concepts → Key things to understand → Practical mastery
```

It is designed for an experienced React/frontend developer rebuilding deep fundamentals. The application should explain what a mechanism is, why it exists, how it works internally, how to use its syntax, where it appears in production, what mistakes to avoid, and how it connects to other frontend concepts.

## 2. Conversation history and requirement precedence

The requirements changed during the conversation. Later requirements override conflicting earlier ones.

### Stage 1 — original broad learning-platform request

The first request described a two-month senior frontend roadmap with visual teaching inspired by progressive JavaScript visual explanations. It asked for:

- JavaScript, TypeScript, browser, networking, security, React, state, performance, testing, accessibility, architecture, AI, Git, internationalization, and PWA coverage.
- Meaningful visualizations such as call stacks, queues, runtime state, rendering pipelines, network flows, React trees, architecture boundaries, and dependency graphs.
- Play, pause, next, previous, restart, speed, and current-state controls.
- Detailed explanations, code, production context, mistakes, relationships, and mental models.
- An original visual system rather than copied text, branding, artwork, or layouts.

That initial prompt also proposed weekly schedules, progress tracking, quizzes, interview preparation, projects, exercises, and system-design modes.

### Stage 2 — complete sequential curriculum

A second, much larger curriculum was supplied. It established the current canonical topic order and detailed hierarchy:

```text
Topic
└── Subtopic
    ├── Important concepts
    ├── Key things to understand
    └── Practical mastery
```

The full curriculum now lives in:

```text
content/mastery-curriculum.md
```

Do not duplicate that entire curriculum in another component or hand-maintained data file.

### Stage 3 — controlling redesign requirements

After reviewing the first application, the user explicitly replaced the course/dashboard direction with a topic-first knowledge product. These are the controlling requirements:

- Keep the application local only.
- Do not deploy, publish, or add hosting configuration.
- Remove weeks, days, deadlines, study schedules, revision plans, and roadmap framing.
- Remove practice exercises, coding challenges, quizzes, interview questions, progress tracking, project assignments, and revision sections for now.
- Remove Frontend System Design as a visible standalone topic.
- Retain frontend architecture material such as component architecture, state architecture, design systems, modularity, monorepos, microfrontends, API patterns, observability, and CI/CD.
- Give every main topic a dedicated page.
- Give every subtopic a dedicated page.
- Provide detailed explanations, internal behavior, mental models, code, visualizers, common mistakes, related concepts, and topic mind maps.
- Provide a global frontend knowledge map.
- Use a clear left sidebar, grouped expandable navigation, breadcrumbs, search, anchor navigation, previous/next navigation, readable typography, responsive layouts, and meaningful selected states.
- Avoid random tips, decorative learning cards, motivational filler, excessive empty space, tiny text, and decorative visualizations.
- Make the result feel like a premium interactive engineering textbook.

### Stage 4 — visual direction

The user asked for the application to be visually great, pleasing, and modern. The implemented design uses:

- Editorial/textbook hierarchy.
- Geist and Geist Mono typography.
- Light and dark token-based themes.
- Restrained indigo and domain accent colors.
- Readable long-form sections.
- A persistent left knowledge navigator.
- Modern code panels, diagrams, visualizer surfaces, reference cards, and mind maps.
- Responsive breakpoints at approximately 1180px, 900px, and 640px.
- Reduced-motion support.

### Stage 5 — latest bug and content request

The user reported:

- The light theme stayed on instead of preserving the selected theme.
- Play/pause behavior was buggy.
- Explanations did not include enough syntax or code.
- Studying a concept without seeing its syntax was not useful.
- Six *You Don’t Know JS* PDFs and one frontend architect field guide were supplied as reference material.

The resulting requirements were:

- Persist light/dark selection across navigation and reloads.
- Repair play, pause, replay, step, reset, and speed behavior.
- Add a dedicated syntax/code section to every subtopic.
- Explain what each example proves.
- Give the learner a small modification or experiment to try next.
- Map the attached books to relevant topics without copying their text.

## 3. Current authoritative scope

### Included

- Topic and subtopic learning pages.
- Progressive explanations.
- Mental models clearly separated from actual behavior.
- Interactive concept visualizers.
- Code syntax and examples.
- Internal behavior and step descriptions.
- Production usage.
- Edge cases and common mistakes.
- Related concepts.
- Topic mind maps and a global knowledge map.
- Search and keyboard search focus.
- Light/dark themes.
- Responsive and accessible presentation.
- Reading maps for the attached books.

### Intentionally excluded

- Deployment and hosting.
- Accounts or backend persistence.
- Weeks, study schedules, deadlines, and streaks.
- Progress dashboards.
- Quizzes and revision queues.
- Interview mode.
- Coding challenges and project assignments.
- A visible standalone Frontend System Design topic.

Do not reintroduce excluded surfaces unless the user explicitly changes the scope again.

## 4. Current curriculum state

The raw canonical curriculum contains:

- 66 source topics.
- 374 subtopics.
- 656 learning groups.
- 2,912 learning points.

The interface intentionally filters out topic `60`, **Frontend System Design**, to satisfy the later redesign requirement. Therefore, the visible application contains 65 main topics and more than 370 visible subtopics.

### Source topic index

1. How JavaScript Executes Code
2. JavaScript Variables, Scope, and Hoisting
3. JavaScript Data Types and Values
4. Functions and Functional Concepts
5. Closures
6. The `this` Keyword
7. Objects, Prototypes, and Classes
8. Arrays and Data Transformation
9. Asynchronous JavaScript and Event Loop
10. Promises, Async/Await, and Request Control
11. Browser Architecture
12. Browser Rendering Pipeline
13. Networking Fundamentals
14. Browser Caching
15. Storage, Cookies, and Client Persistence
16. Same-Origin Policy and CORS
17. HTML Fundamentals and Semantics
18. Accessibility
19. CSS Fundamentals
20. Flexbox
21. CSS Grid
22. Responsive Design
23. CSS Architecture and Design Tokens
24. TypeScript Fundamentals
25. Type Narrowing and Domain Modeling
26. TypeScript Generics
27. Advanced TypeScript
28. Runtime Validation and API Contracts
29. React Mental Model
30. React State
31. React Hooks
32. React Effects
33. React Context
34. React Forms
35. React Error Handling
36. React Concurrency and Suspense Concepts
37. Frontend State Classification
38. Redux and Redux Toolkit
39. Server-State Management
40. API Client Architecture
41. Authentication
42. Authorization and Permissions
43. Real-Time Communication
44. Performance Engineering
45. React Performance
46. Bundle Performance
47. Memory Management
48. Frontend Testing
49. Frontend Security
50. Reliability and Failure Handling
51. Frontend Architecture
52. Component Architecture
53. Design Systems
54. Monorepo Architecture
55. Microfrontends
56. Backend for Frontend
57. Feature Flags and Remote Configuration
58. Observability
59. CI/CD and Frontend Delivery
60. Frontend System Design — present in source data but hidden from the UI
61. Architecture Documentation
62. AI-Powered Frontend Applications
63. Git and Engineering Collaboration
64. Internationalization and Localization
65. Progressive Web Applications and Offline Systems
66. Final Mastery Requirements

## 5. Technology and runtime

Current stack:

- Next.js `16.2.6`
- React and React DOM `19.2.6`
- TypeScript `5.9.3`
- Vinext `0.0.50`
- Vite `8.0.13`
- ESLint `9.39.4`
- Tailwind packages are installed, but the current knowledge UI primarily uses custom CSS.

Required runtime:

```text
Node.js >= 22.13.0
```

The project contains `.nvmrc` and an `engines.node` declaration.

Node 20 is not sufficient. With Node `20.19.3`, Vinext fails with:

```text
SyntaxError: The requested module 'node:fs/promises'
does not provide an export named 'glob'
```

The solution is to use Node 22.13 or newer:

```bash
nvm install
nvm use
npm install
npm run dev
```

## 6. Current project structure

```text
app/
├── KnowledgeApp.tsx
├── globals.css
├── knowledge.css
├── layout.tsx
├── learning-examples.ts
├── mastery-data.json
├── page.tsx
└── learn/
    └── [topic]/
        ├── page.tsx
        └── [subtopic]/
            └── page.tsx
content/
└── mastery-curriculum.md
scripts/
└── build-mastery-data.mjs
tests/
└── rendered-html.test.mjs
.nvmrc
package.json
package-lock.json
README.md
PROJECT_HANDOFF.md
```

### Important file responsibilities

`content/mastery-curriculum.md`

- Canonical curriculum source.
- Contains the complete topic/subtopic/group hierarchy.
- Edit this file when changing learning content.

`scripts/build-mastery-data.mjs`

- Parses the Markdown hierarchy.
- Creates stable slugs.
- Preserves prose, list items, and code blocks.
- Writes `app/mastery-data.json`.

`app/mastery-data.json`

- Generated application data.
- Do not make long-term manual edits here.

`app/KnowledgeApp.tsx`

- Main client application.
- Global overview, sidebar, search, breadcrumbs, topic pages, subtopic pages, reference shelf, code panels, visualizers, relationships, mind maps, and navigation.

`app/learning-examples.ts`

- Creates a syntax example for every subtopic.
- Reuses authored curriculum code when it exists.
- Otherwise chooses an original topic-aware example through `learningExampleFor(...)`.
- Stores the attached-book shelf and per-topic reading mappings.

`app/knowledge.css`

- Complete visual system for the knowledge product.
- Theme variables, layout, typography, sidebar, diagrams, reading references, syntax panels, visualizer surfaces, responsive behavior, and reduced motion.

`app/layout.tsx`

- Metadata and fonts.
- Runs the saved-theme initialization before paint.

`tests/rendered-html.test.mjs`

- Builds and server-renders the application.
- Protects the main learning-product contracts.

## 7. Implemented user experience

### Global overview

- Frontend Atlas hero and system diagram.
- Eight connected learning domains.
- Domain cards linking into the topic sequence.
- Attached reading shelf.
- Global navigation and search.

### Topic workspace

- Topic title, importance, domain, and subtopic count.
- Topic overview and purpose.
- Relevant attached-book reading references.
- Terminology.
- Core concepts.
- Dedicated subtopic cards.
- Interactive visual model.
- Common misunderstandings.
- Clickable topic mind map.
- Previous/next topic navigation.

### Subtopic workspace

Each subtopic follows this sequence:

1. Definition
2. Purpose
3. Mental model
4. Attached reading references, where relevant
5. Internal behavior
6. Syntax and focused example
7. Interactive visualizer
8. Real-world frontend usage
9. Edge cases and important behavior
10. Common mistakes
11. Related concepts
12. Topic mind map
13. Previous/next subtopic navigation

### Search and navigation

- Expandable domain groups in the left sidebar.
- Active topic and visible active-topic subtopics.
- Search across topic titles, subtopic titles, group titles, prose, and learning points.
- `Command/Ctrl + K` focuses the search field.
- Breadcrumbs.
- In-page anchor navigation.
- Previous/next topic and subtopic links.
- Mind-map nodes link to subtopic routes.
- Mobile slide-out sidebar.

## 8. Theme bug fix

Theme persistence is implemented in two layers.

### Before React paints

`app/layout.tsx` runs an inline script that:

1. Reads the `frontend-atlas-theme` key from `localStorage`.
2. Uses the stored `light` or `dark` value when available.
3. Otherwise uses the operating-system color preference.
4. Sets `data-knowledge-theme` on the root HTML element.

This prevents a saved dark theme from flashing or resetting to light during a full-page navigation.

### In the client application

`app/KnowledgeApp.tsx`:

- Initializes theme state from the same storage key.
- Writes theme changes back to `localStorage`.
- Updates the root `data-knowledge-theme` attribute.
- Uses `suppressHydrationWarning` on the HTML element because the pre-paint attribute can differ from server HTML.

The browser test confirmed the dark theme before and after navigating from a topic to a subtopic:

```text
theme: dark
body background: rgb(16, 18, 24)
```

Do not rename the storage key without updating both `layout.tsx` and `KnowledgeApp.tsx`.

## 9. Visualizer control fixes

`ConceptVisualizer` now:

- Has play, pause, replay, reset, previous, next, and speed controls.
- Stops playback when the final step is reached.
- Shows **Replay** at the final step.
- Resets to step one before replaying from the end.
- Stops playback when the learner manually moves backward or forward.
- Is keyed by subtopic ID so state does not leak between routes.
- Pads very small data sets to at least three safe display steps.
- Announces the current explanation through `aria-live="polite"`.
- Provides clear accessible labels, including `Replay visualizer` and `Visualizer speed`.
- Uses `data-testid="concept-visualizer"` for validation.

The replay/pause behavior was manually browser-tested, including pausing after replay and confirming the step did not continue advancing.

## 10. Syntax and example system

Every visible subtopic gets a syntax section, even when the original curriculum has no code block.

The display contains:

- Language.
- Filename.
- Example title.
- Copy-code button.
- Focused code sample.
- “What the syntax proves.”
- “Try this next.”

`learningExampleFor(topicId, topicTitle, subtopicTitle, authoredCode?)`:

1. Uses curriculum-authored code when a suitable code block exists.
2. Otherwise selects an original example based on topic number and concept keywords.
3. Falls back to a domain-appropriate TypeScript/JavaScript/HTML/CSS/TSX/Markdown/Shell example.

Existing example families include:

- JavaScript engines, parsing, scopes, hoisting, values, coercion, functions, recursion, debounce, closures, `this`, prototypes, arrays, event loop, promises, cancellation, and workers.
- Browser architecture, rendering, networking, caching, storage, and CORS.
- Semantic HTML and accessibility.
- CSS, TypeScript, React, state, data, authentication, and realtime behavior.
- Performance, testing, security, and reliability.
- Architecture, documentation, AI clients, Git, localization, and service workers.

When adding a subtopic with unusual semantics, add a focused branch to `learningExampleFor(...)` rather than relying indefinitely on the generic fallback.

## 11. Attached-book research and mappings

The PDFs themselves are not copied into the project and are not needed at runtime. Their content is represented only through original explanations and concise chapter/page mappings.

### You Don’t Know JS set

Original-device files:

```text
/Users/baljindersingh/Desktop/YDKJS/YDKJS_01.pdf
/Users/baljindersingh/Desktop/YDKJS/YDKJS_02.pdf
/Users/baljindersingh/Desktop/YDKJS/YDKJS_03.pdf
/Users/baljindersingh/Desktop/YDKJS/YDKJS_04.pdf
/Users/baljindersingh/Desktop/YDKJS/YDKJS_05.pdf
/Users/baljindersingh/Desktop/YDKJS/YDKJS_06.pdf
```

Inspected titles:

1. *You Don’t Know JS: Up & Going* — programming basics, values, functions, scope, closures, `this`, and prototypes.
2. *You Don’t Know JS: Scope & Closures* — lexical scope, function/block scope, hoisting, and closures.
3. *You Don’t Know JS: this & Object Prototypes* — call-site binding, objects, classes, prototypes, and behavior delegation.
4. *You Don’t Know JS: Types & Grammar* — types, values, native objects, coercion, equality, and grammar.
5. *You Don’t Know JS: Async & Performance* — asynchrony, callbacks, promises, generators, performance, and benchmarking.
6. *You Don’t Know JS: ES6 & Beyond* — modern syntax, iterators, generators, modules, classes, promises, collections, proxies, and async evolution.

These are mapped primarily to frontend topics 1–10.

### Architect field guide

Original-device file:

```text
/Users/baljindersingh/Downloads/Architect-Mode-Field-Guide.pdf
```

Inspected material used in the application:

- Pages 5–6: architecture patterns, React/Next.js architecture, TypeScript architecture, design systems, scalable project structure, state architecture, typed API layers, performance, Core Web Vitals, security, accessibility, testing, monorepos, microfrontends, observability, and CI/CD.
- Page 15: frontend architecture and architecture documentation/decisions.
- Page 19: thinking in scale, trade-offs, failure, and cost.

The guide is mapped to relevant architecture, quality, security, delivery, and documentation topics. Schedule, generic system-design, project, and progress material from the guide was not added because it conflicts with the controlling scope.

### Copyright and content rule

- Do not copy paragraphs or artwork from these books.
- Keep explanations original and paraphrased.
- Use the PDF page references only as a study map.
- If moving to another device, copy the PDFs separately only if they need to be reinspected.
- The website continues to work without the PDF files.

## 12. Files added, replaced, or removed

Major current-work additions:

- `app/KnowledgeApp.tsx`
- `app/knowledge.css`
- `app/learning-examples.ts`
- `app/learn/[topic]/page.tsx`
- `app/learn/[topic]/[subtopic]/page.tsx`
- `PROJECT_HANDOFF.md`

Major files changed:

- `.gitignore`
- `README.md`
- `app/globals.css`
- `app/layout.tsx`
- `app/mastery-data.json`
- `app/page.tsx`
- `package.json`
- `package-lock.json`
- `scripts/build-mastery-data.mjs`
- `tests/rendered-html.test.mjs`
- `vite.config.ts`

Obsolete course/cloud files removed in the current worktree:

- `.openai/hosting.json`
- `app/LearningApp.tsx`
- `app/chatgpt-auth.ts`
- `app/curriculum.ts`
- Cloudflare worker, D1, Drizzle, and example database files.
- The old hosting Vite plugin.
- Obsolete Cloudflare types.

These removals are intentional. They support the local-only requirement.

## 13. Validation completed

Validation was run using Node `22.13.0`.

Commands:

```bash
npx tsc --noEmit
npm run lint
npm test
```

Results:

- TypeScript passed.
- ESLint passed.
- Vinext production build passed.
- Six of six Node regression tests passed.
- Server rendering passed for the home page, a topic route, and a subtopic route.
- Curriculum counts and stable slugs passed.
- Syntax examples and attached-reading maps passed.
- Visualizer and accessibility contracts passed.
- Removed deployment/course-management contracts passed.
- `git diff --check` passed.

Browser checks completed:

- Theme selection persisted between topic and subtopic navigation.
- Topic and subtopic reading references rendered.
- Syntax section rendered.
- Visualizer rendered.
- Topic workspace loaded without new console errors after a clean dev-server restart.
- At 390px viewport width:
  - Syntax notes collapsed to one column.
  - The sidebar was off-canvas when closed.
  - The mobile menu opened the sidebar.
  - Code remained horizontally scrollable.
  - The document had no page-level horizontal overflow.

The local development server was stopped after validation.

## 14. Regression tests that should remain

The test suite protects:

- Global knowledge-map server rendering.
- Home-page reading shelf.
- Absence of weekly roadmaps, revision queues, interview readiness, and System Design from the rendered home page.
- Topic and subtopic route rendering.
- Mental model and internal-behavior sections.
- Syntax and example sections.
- “What the syntax proves” and “Try this next.”
- Attached-book reading references.
- Complete raw curriculum counts.
- Stable topic and subtopic slugs.
- Visualizer controls and accessible labels.
- Theme storage contract.
- Reduced-motion CSS.
- Absence of progress, quiz, revision, and interview application logic.
- Absence of worker, Cloudflare, Wrangler, D1, and hosting configuration.

When changing these features, update behavior and tests together. Do not simply weaken the test to hide a regression.

## 15. Known limitations and honest continuation notes

- The application has multiple visual model types, but many subtopics still share a model family. A future quality pass can create more bespoke simulations for especially important concepts.
- Fallback syntax examples ensure complete coverage, but each example should eventually receive topic-by-topic technical review and deeper examples where justified.
- The raw curriculum still contains Frontend System Design at topic 60. It is intentionally hidden in `KnowledgeApp.tsx`, not deleted from the source curriculum.
- The application is intentionally not a complete exercise, interview, quiz, or progress platform.
- The PDF page mappings correspond to the attached editions. Page numbering may differ in other editions.
- The current changes are in a dirty Git worktree and were not committed during this task.

## 16. Critical transfer warning

At the time of this handoff, many changes are modified, deleted, or untracked in Git. A normal `git clone` of an older remote may not contain the rebuilt application.

Before changing devices, use one of these approaches:

### Option A — copy the full working directory

Copy the entire `melearning` folder while excluding generated dependencies/build output:

```text
node_modules/
.vinext/
.next/
dist/
```

Do not omit untracked files such as:

```text
app/KnowledgeApp.tsx
app/knowledge.css
app/learning-examples.ts
app/learn/
PROJECT_HANDOFF.md
```

### Option B — commit the work, then clone it

Review the current Git diff, create a branch/commit, push it to the user’s repository, and clone that branch on the second device. Do this only when the user explicitly requests Git commit/push actions.

The attached PDFs are outside the repository and must be transferred separately if they are needed for future book research.

## 17. Setup on another device

From the transferred project directory:

```bash
nvm install
nvm use
npm install
npm run content:build
npx tsc --noEmit
npm run lint
npm test
npm run dev
```

Then open the local URL printed by Vinext, normally:

```text
http://localhost:3000
```

If the `node:fs/promises` `glob` export error appears, confirm:

```bash
node --version
```

It must be Node 22.13 or newer.

## 18. How to change or add curriculum content

1. Edit `content/mastery-curriculum.md`.
2. Preserve the hierarchy:

   ```text
   # N. Topic
   ## Topic importance
   ## N.M Subtopic
   ### Learning group
   - Learning point
   ```

3. Run:

   ```bash
   npm run content:build
   ```

4. Inspect the generated `app/mastery-data.json`.
5. Add a focused example branch in `app/learning-examples.ts` when the general example is not sufficient.
6. Add or adjust a reading mapping only when a supplied source directly supports the topic.
7. Run type checking, linting, and tests.
8. Browser-test the affected route in both themes and at a mobile width.

## 19. Design and implementation guardrails

- Keep the interface original.
- Prioritize educational clarity over decoration.
- Visualizers must explain state changes.
- Mark simplified models as simplified.
- Code examples must be technically correct and focused.
- Keep semantic HTML and keyboard accessibility.
- Do not make text smaller to fit more content.
- Do not add generic dashboard cards.
- Do not hardcode the complete curriculum into JSX.
- Do not introduce heavy visualization dependencies when HTML, CSS, or SVG is sufficient.
- Keep the product local-only unless the user explicitly reverses that requirement.
- Preserve user changes and unrelated working-tree changes.
- Always use Node 22.13+ for validation.

## 20. Recommended continuation priorities

If the user asks to continue improving the product, the highest-value sequence is:

1. Review syntax examples topic by topic for correctness and specificity.
2. Replace shared visualizer families with bespoke simulations for the most important concepts.
3. Deepen explanations where the curriculum only contains short learning points.
4. Add more explicit architecture connections inside existing topics without restoring a standalone system-design module.
5. Expand browser-based regression coverage for theme persistence and visualizer timing.
6. Improve mobile navigation focus management and overlay dismissal.

Do not begin these automatically. Follow the user’s next explicit request.

## 21. Copy-paste prompt for a new Codex task

Use this prompt on the other device:

```text
Continue the Frontend Atlas project in this repository.

First read PROJECT_HANDOFF.md, README.md, package.json,
content/mastery-curriculum.md, app/KnowledgeApp.tsx,
app/learning-examples.ts, app/knowledge.css, and the regression tests.

Treat PROJECT_HANDOFF.md as the conversation and implementation context.
Preserve the later controlling requirements: the application is local-only,
topic-first, and focused on explanations, syntax, interactive visualizers,
relationships, and mind maps. Do not add deployment, schedules, progress
tracking, quizzes, interviews, projects, revision mode, or a visible standalone
Frontend System Design topic unless I explicitly request them.

Use Node 22.13 or newer. Inspect the current dirty worktree before editing.
Run TypeScript, lint, tests, and relevant browser checks after changes.
```

