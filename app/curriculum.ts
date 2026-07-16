export type VisualKind =
  | "runtime"
  | "memory"
  | "types"
  | "browser"
  | "network"
  | "security"
  | "react"
  | "state"
  | "testing"
  | "accessibility"
  | "architecture"
  | "system"
  | "ai"
  | "interview";

export type Module = {
  title: string;
  visual: VisualKind;
  topics: string[];
};

export type Week = {
  id: number;
  kicker: string;
  title: string;
  outcome: string;
  hours: number;
  accent: string;
  modules: Module[];
};

const list = (value: string) => value.split("|");

export const weeks: Week[] = [
  {
    id: 1,
    kicker: "Language mechanics",
    title: "JavaScript & TypeScript Internals",
    outcome: "Explain runtime behavior from memory allocation to asynchronous control flow.",
    hours: 14,
    accent: "blue",
    modules: [
      {
        title: "Execution & scope",
        visual: "runtime",
        topics: list("Execution context|Global execution context|Function execution context|Creation and execution phases|Call stack|Scope|Lexical environment|Scope chain|Hoisting|Temporal Dead Zone|Closures|this behavior|Explicit binding|Implicit binding|Constructor binding|Default binding|Arrow functions and lexical this"),
      },
      {
        title: "Objects, memory & identity",
        visual: "memory",
        topics: list("Prototypes|Prototype chain|Constructor functions|Classes versus prototypes|Primitive and reference values|Shallow copying|Deep copying|Mutation|Immutability|Garbage collection|Memory leaks|Closures and retained memory|Detached DOM nodes|Event-listener leaks"),
      },
      {
        title: "Asynchronous JavaScript",
        visual: "runtime",
        topics: list("JavaScript runtime|Event loop|Browser Web APIs|Microtask queue|Macrotask queue|Promises|Promise states|Promise chaining|Promise error propagation|async and await|Promise.all|Promise.allSettled|Promise.race|Promise.any|queueMicrotask|setTimeout|Race conditions|AbortController|Retry logic|Exponential backoff|Concurrency limiting|Request deduplication"),
      },
      {
        title: "TypeScript as a design tool",
        visual: "types",
        topics: list("Type inference|Interfaces|Type aliases|Generics|Generic constraints|Utility types|Mapped types|Conditional types|Indexed access types|Discriminated unions|Type guards|Function overloads|keyof|typeof|infer|Exhaustive checking|Branded types|Structural typing|Variance|Type-safe API responses|Declaration files"),
      },
      {
        title: "Implementation studio",
        visual: "types",
        topics: list("Debounce|Throttle|Deep clone|Retry function|Event emitter|Promise concurrency limiter|Object flattening|Array grouping|Type-safe storage wrapper|Result-based error handling"),
      },
    ],
  },
  {
    id: 2,
    kicker: "Platform mechanics",
    title: "Browser, Networking & Security",
    outcome: "Trace a navigation from URL to pixels and defend every trust boundary.",
    hours: 13,
    accent: "orange",
    modules: [
      {
        title: "Browser rendering",
        visual: "browser",
        topics: list("Navigation lifecycle|HTML parsing|Tokenization|DOM construction|CSS parsing|CSSOM construction|Render tree|Style calculation|Layout|Paint|Composite|Reflow|Repaint|Critical rendering path|Main thread|Compositor thread|GPU acceleration|Layout thrashing|async scripts|defer scripts|ES modules"),
      },
      {
        title: "Browser capabilities",
        visual: "browser",
        topics: list("Cookies|Local storage|Session storage|IndexedDB|Web workers|Service workers|Intersection Observer|Resize Observer|Mutation Observer|History API|Clipboard API|BroadcastChannel"),
      },
      {
        title: "The request journey",
        visual: "network",
        topics: list("URL parsing|DNS lookup|TCP connection|TLS negotiation|HTTP request lifecycle|HTTP/1.1|HTTP/2|HTTP/3|Request headers|Response headers|CORS|Preflight requests|Browser caching|Cache-Control|ETags|CDN behavior|Compression|WebSockets|Server-Sent Events|Long polling"),
      },
      {
        title: "Frontend security",
        visual: "security",
        topics: list("XSS|Stored XSS|Reflected XSS|DOM-based XSS|CSRF|Content Security Policy|Clickjacking|Open redirects|Secure cookies|HttpOnly|Secure flag|SameSite|Token-storage risks|Session fixation|Dependency vulnerabilities|Prototype pollution|Sensitive-data exposure"),
      },
    ],
  },
  {
    id: 3,
    kicker: "UI runtime",
    title: "React Mastery",
    outcome: "Predict renders, place state deliberately, and optimize from evidence.",
    hours: 14,
    accent: "cyan",
    modules: [
      {
        title: "React internals",
        visual: "react",
        topics: list("Component rendering|Render phase|Commit phase|Reconciliation|Fiber architecture|Component identity|State preservation|Keys|Batching|Strict Mode|Concurrent rendering concepts|Suspense|Transitions|Hydration|Error boundaries|Portals"),
      },
      {
        title: "Hooks under pressure",
        visual: "react",
        topics: list("useState|useEffect|useLayoutEffect|useRef|useReducer|useMemo|useCallback|Custom hooks|Dependency arrays|Stale closures|Referential equality|Effect cleanup|Async race conditions|When not to use an effect"),
      },
      {
        title: "React performance",
        visual: "react",
        topics: list("React Profiler|Unnecessary renders|State colocation|Component splitting|Lazy loading|Code splitting|List virtualization|Bundle analysis|Image optimization|Request deduplication|Optimistic UI|Memoization trade-offs"),
      },
      {
        title: "State placement",
        visual: "state",
        topics: list("Local state|Lifted state|Context|Redux Toolkit|Server state|URL state|Form state|State machines"),
      },
    ],
  },
  {
    id: 4,
    kicker: "Confidence systems",
    title: "Testing, Accessibility & Quality",
    outcome: "Build interfaces that are testable, operable, observable, and safe to change.",
    hours: 11,
    accent: "yellow",
    modules: [
      {
        title: "Testing strategy",
        visual: "testing",
        topics: list("Unit testing|Integration testing|Component testing|End-to-end testing|Contract testing|Visual regression testing|Accessibility testing|Performance testing|Vitest or Jest|React Testing Library|Playwright|Mock Service Worker|Storybook"),
      },
      {
        title: "Accessible by default",
        visual: "accessibility",
        topics: list("Semantic HTML|Keyboard navigation|Focus management|Accessible forms|Labels and descriptions|ARIA roles|Screen-reader behavior|Accessible modals|Accessible dropdowns|Color contrast|Reduced motion|WCAG fundamentals"),
      },
      {
        title: "Engineering quality",
        visual: "testing",
        topics: list("ESLint|TypeScript strict mode|Formatting|Git hooks|Pre-commit checks|CI quality gates|Pull-request standards|Code-review practices|Feature flags|Logging|Monitoring|Error tracking|Real-user monitoring"),
      },
    ],
  },
  {
    id: 5,
    kicker: "Boundaries & scale",
    title: "Frontend Architecture",
    outcome: "Choose boundaries that preserve team autonomy without multiplying complexity.",
    hours: 12,
    accent: "violet",
    modules: [
      {
        title: "Architecture patterns",
        visual: "architecture",
        topics: list("Feature-based architecture|Domain-based architecture|Layered architecture|Vertical slices|Dependency direction|Separation of concerns|Composition|Dependency injection|Ports and adapters|Event-driven architecture|Schema-driven UI|Configuration-driven UI|Plugin architecture|Workflow-driven interfaces"),
      },
      {
        title: "Nx & monorepos",
        visual: "architecture",
        topics: list("Applications and libraries|Feature libraries|Domain libraries|UI libraries|Data-access libraries|Utility libraries|Dependency constraints|Circular dependencies|Build graphs|Incremental builds|Affected commands|Shared configuration|Deployment boundaries"),
      },
      {
        title: "Micro-frontends",
        visual: "architecture",
        topics: list("Independent deployment|Module Federation|Shared dependencies|Routing ownership|Cross-application communication|Authentication ownership|Design-system consistency|Version conflicts|Performance overhead|Failure isolation|Micro-frontends versus a modular monolith"),
      },
    ],
  },
  {
    id: 6,
    kicker: "Design practice",
    title: "Frontend System Design",
    outcome: "Turn ambiguous product needs into coherent, explainable frontend systems.",
    hours: 15,
    accent: "green",
    modules: [
      {
        title: "Guided design cases",
        visual: "system",
        topics: list("Dynamic form builder|Enterprise dashboard|Drag-and-drop layout builder|Configurable data table|Search autocomplete|Notification system|Role-based application|File-upload platform|Workflow engine|Design system|Micro-frontend platform"),
      },
      {
        title: "Design dimensions",
        visual: "system",
        topics: list("Requirement clarification|Functional requirements|Non-functional requirements|Data model|Application boundaries|Component hierarchy|State management|API design|Caching|Error handling|Performance|Security|Accessibility|Testing|Observability|Trade-offs|Future scaling"),
      },
    ],
  },
  {
    id: 7,
    kicker: "Probabilistic products",
    title: "AI-Enabled Frontend Engineering",
    outcome: "Design transparent AI experiences with guarded pipelines and graceful failure.",
    hours: 10,
    accent: "pink",
    modules: [
      {
        title: "AI fundamentals",
        visual: "ai",
        topics: list("Large language models|Tokens|Context windows|Embeddings|Vector search|Retrieval-augmented generation|Tool calling|Structured outputs|Agents|Hallucination|Prompt injection|Evaluation|Latency|Cost"),
      },
      {
        title: "AI interface patterns",
        visual: "ai",
        topics: list("Streaming responses|Cancel generation|Retry generation|Conversation state|Structured JSON responses|Tool-call progress|Human approval|Source citations|Feedback collection|Failure handling|Token usage|Prompt versioning"),
      },
      {
        title: "AI architecture",
        visual: "ai",
        topics: list("Model gateway|Provider abstraction|Retrieval pipeline|Context construction|Access control|Sensitive-data filtering|Prompt-injection protection|Evaluation datasets|Model routing|Caching|Rate limiting|Audit logging|Human-in-the-loop workflows"),
      },
    ],
  },
  {
    id: 8,
    kicker: "Make it legible",
    title: "Interview & Job-Switch Preparation",
    outcome: "Translate engineering judgment into clear code, design, and impact stories.",
    hours: 12,
    accent: "red",
    modules: [
      {
        title: "JavaScript interviews",
        visual: "interview",
        topics: list("Debounce interview|Throttle interview|Event emitter interview|Promise pool|Deep clone interview|Memoization|Retry with backoff|LRU cache|Tree traversal|Object diff|Request deduplication interview|Flattening nested data"),
      },
      {
        title: "React interviews",
        visual: "interview",
        topics: list("Rendering reasoning|Reconciliation reasoning|Keys reasoning|State placement reasoning|Context performance|Redux decisions|Hooks reasoning|Stale closures debugging|Race conditions debugging|Component APIs|Performance optimization"),
      },
      {
        title: "Behavioural story builder",
        visual: "interview",
        topics: list("Complex feature ownership|Architectural decisions|Performance improvements|Security improvements|Production debugging|Technical disagreements|Mentoring|AI initiatives"),
      },
      {
        title: "Job-switch cockpit",
        visual: "interview",
        topics: list("Resume checklist|LinkedIn checklist|Portfolio checklist|GitHub checklist|Mock-interview log|Job-application tracker|Weak-topic tracker|Revision plan"),
      },
    ],
  },
];

export const weekOneLessons = [
  {
    id: "execution-context",
    title: "Execution contexts",
    eyebrow: "Runtime / 01",
    minutes: 24,
    concepts: ["Execution context", "Creation phase", "Execution phase", "Call stack", "Hoisting", "Temporal Dead Zone"],
    intro: "Before JavaScript executes a line, the engine creates a bookkeeping environment for it. That environment records bindings, the outer environment, and the value of this.",
    why: "This model explains hoisting, scope errors, stack traces, recursion limits, and why a value can exist before it can legally be read.",
    analogy: "Analogy: every function call gets a workbench with labeled drawers. Runtime truth: engines use optimized internal records, not literal drawers, and may avoid materializing objects entirely.",
    code: "const rate = 2;\nfunction total(price) {\n  const tax = price * rate;\n  return price + tax;\n}\nconsole.log(total(10));",
    production: "A pricing helper throws before telemetry is initialized. Reading the stack as nested execution contexts reveals which binding was unresolved and which caller supplied the bad input.",
    architecture: "Keep boundary functions narrow. Smaller execution contexts do not make JavaScript faster by themselves, but they make data ownership, stack traces, and failure surfaces easier to reason about.",
    mistake: "Treating hoisting as source code physically moving. Declarations are registered during environment creation; the source stays where it is.",
    question: "During which phase is a let binding created, and why can’t it be read immediately?",
    answer: "The binding is created during environment setup but remains uninitialized until evaluation reaches the declaration. That interval is the TDZ.",
    quiz: { prompt: "What happens first when total(10) is called?", options: ["A function execution context is created", "tax is calculated", "console.log runs", "the global context is destroyed"], correct: 0, explanation: "The call creates and pushes a function execution context before its body executes." },
  },
  {
    id: "scope-closures",
    title: "Scope, closures & retained memory",
    eyebrow: "Runtime / 02",
    minutes: 28,
    concepts: ["Lexical environment", "Scope chain", "Closures", "Garbage collection", "Retained memory", "Event-listener leaks"],
    intro: "A closure is a function plus access to the lexical environment where it was created—even after the outer call has returned.",
    why: "Closures power callbacks, hooks, factories, and module privacy. They also explain stale values and why apparently finished work can retain large object graphs.",
    analogy: "Analogy: a function carries a keyring for rooms where it was born. Runtime truth: it keeps references to required environment records; engines may optimize unused bindings away.",
    code: "function makeCounter(label) {\n  let count = 0;\n  return () => `${label}: ${++count}`;\n}\nconst next = makeCounter('sync');\nnext(); next();",
    production: "A subscription callback closes over a large dashboard model. Removing the visible component is insufficient; the emitter still references the callback, which keeps the environment—and model—reachable.",
    architecture: "Long-lived callbacks are ownership boundaries. Pair every subscribe with unsubscribe, and pass minimal values into closures when lifetime is uncertain.",
    mistake: "Saying a closure is a snapshot. It normally observes live bindings, not copied values; stale closures arise when a later render creates a different binding.",
    question: "Why can a detached DOM subtree remain in memory after remove()?",
    answer: "Any reachable listener, cache, timer, or closure that still references a node keeps the subtree reachable, so it cannot be collected.",
    quiz: { prompt: "What does a closure retain?", options: ["The full call stack", "Access to lexical bindings", "A cloned outer object", "Only primitive values"], correct: 1, explanation: "A closure retains access to bindings in its defining lexical environment, not a frozen copy of every value." },
  },
  {
    id: "this-prototypes",
    title: "this, prototypes & classes",
    eyebrow: "Objects / 03",
    minutes: 27,
    concepts: ["Default binding", "Implicit binding", "Explicit binding", "Constructor binding", "Lexical this", "Prototype chain", "Classes versus prototypes"],
    intro: "For normal functions, this is selected by the call site. Property lookup, meanwhile, walks an object’s prototype chain until it finds a key or reaches null.",
    why: "Mixing call-site binding with lexical this creates subtle callback bugs. Misunderstanding prototypes leads to duplicated methods, accidental shadowing, and unsafe mutation.",
    analogy: "Analogy: this is the badge issued at entry; prototypes are an escalation directory. Runtime truth: binding rules and [[Prototype]] lookup are separate mechanisms.",
    code: "const meter = {\n  value: 3,\n  read() { return this.value; },\n  later() { return () => this.value; }\n};\nmeter.read();\nmeter.read.call({ value: 9 });",
    production: "A method passed directly as an event handler loses its receiver. Wrap it, bind it, or model the callback without receiver-dependent state.",
    architecture: "Prefer composition and explicit dependencies. Prototype inheritance is useful for shared behavior, but deep behavioral hierarchies hide coupling and make substitution harder.",
    mistake: "Assuming this points to where a function was defined. That is true for arrow functions’ lexical this, not for normal functions.",
    question: "Why does class syntax not replace JavaScript’s prototype model?",
    answer: "Class methods still live on the constructor’s prototype and instances still delegate through [[Prototype]]. Classes provide syntax and semantics on top of that model.",
    quiz: { prompt: "Which binding rule wins for fn.call(obj)?", options: ["Default", "Implicit", "Explicit", "Lexical"], correct: 2, explanation: "call/apply/bind establish explicit binding for normal functions." },
  },
  {
    id: "values-memory",
    title: "Values, references & copying",
    eyebrow: "Memory / 04",
    minutes: 22,
    concepts: ["Primitive values", "Reference values", "Shallow copy", "Deep copy", "Mutation", "Immutability", "Garbage collection"],
    intro: "Variables hold values. For objects, the value behaves like a reference to an object identity, so two variables can lead to the same mutable structure.",
    why: "Identity determines memoization, React updates, cache keys, change detection, and whether an innocent-looking copy isolates nested data.",
    analogy: "Analogy: copying a house address does not clone the house. Runtime truth: the specification describes values and references abstractly; stack-versus-heap is an implementation detail.",
    code: "const source = { user: { name: 'Ada' } };\nconst copy = { ...source };\ncopy.user.name = 'Grace';\nconsole.log(source.user.name); // Grace",
    production: "An optimistic update shallow-copies a list but mutates a nested item shared with the rollback snapshot. The rollback cannot recover the original value.",
    architecture: "Define ownership at API and state boundaries. Use structural sharing for predictable updates; reserve deep cloning for explicit isolation because it loses types and can be expensive.",
    mistake: "Using JSON stringify/parse as a universal deep clone. It drops undefined, functions, symbols, prototypes, and mishandles several built-in types and cycles.",
    question: "When is structuredClone preferable, and what can it still not clone?",
    answer: "It is useful for supported structured data and cycles, but functions and some platform objects remain non-cloneable; class instances also lose custom prototype behavior.",
    quiz: { prompt: "What does {...source} copy?", options: ["The entire object graph", "Top-level property values", "Only primitives", "The prototype chain"], correct: 1, explanation: "Spread creates a shallow copy: nested object identities remain shared." },
  },
  {
    id: "event-loop",
    title: "The event loop",
    eyebrow: "Async / 05",
    minutes: 34,
    concepts: ["Call stack", "Web APIs", "Microtask queue", "Task queue", "queueMicrotask", "setTimeout", "Rendering opportunity"],
    intro: "JavaScript runs one task at a time on an execution stack. The host schedules future work, and the event loop decides when queued callbacks may run.",
    why: "Queue priority explains output puzzles, UI jank, batching, starvation, and why a zero-millisecond timer never means immediate execution.",
    analogy: "Analogy: one chef, several order rails, and strict pickup rules. Runtime truth: the HTML event loop has task sources, microtask checkpoints, and rendering opportunities—not just two literal arrays.",
    code: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nqueueMicrotask(() => console.log('D'));\nconsole.log('E');",
    production: "A recursive microtask chain keeps the microtask checkpoint busy, delaying input and rendering. Yielding with a task or scheduler API restores responsiveness.",
    architecture: "Treat the main thread as a shared latency budget. Break CPU work into chunks, move pure heavy work to workers, and make cancellation part of async APIs.",
    mistake: "Saying promises run in parallel. Promise reactions are queued jobs; JavaScript callbacks still run one at a time on the main agent unless work is delegated.",
    question: "Can a microtask prevent a timer from running indefinitely?",
    answer: "Yes. If each microtask enqueues another, the checkpoint may never empty, so the event loop cannot select the timer task or render.",
    quiz: { prompt: "What is the output order for the sample?", options: ["A E C D B", "A B C D E", "A E B C D", "A C D E B"], correct: 0, explanation: "Synchronous logs finish first, promise and queueMicrotask callbacks run FIFO at the checkpoint, then the timer task runs." },
  },
  {
    id: "promises",
    title: "Promises & async/await",
    eyebrow: "Async / 06",
    minutes: 31,
    concepts: ["Promise states", "Chaining", "Error propagation", "async", "await", "all", "allSettled", "race", "any"],
    intro: "A promise is a stateful placeholder for one eventual outcome. then creates a new promise and schedules a reaction after settlement; await is syntax for suspending an async function around that chain.",
    why: "Correct chaining determines whether failures propagate, concurrency is preserved, and callers can cancel or recover without hidden unhandled rejections.",
    analogy: "Analogy: a claim ticket that eventually resolves to a value or reason. Runtime truth: settlement is irreversible, but handlers may be attached before or after it and always run asynchronously.",
    code: "async function load() {\n  const [profile, flags] = await Promise.all([\n    getProfile(), getFlags()\n  ]);\n  return { profile, flags };\n}",
    production: "Sequential awaits accidentally turn independent startup requests into a waterfall. Starting both operations before awaiting reduces critical-path latency.",
    architecture: "Choose combinators by product semantics: fail-fast for atomic screens, allSettled for partial dashboards, any for redundant sources, and race mainly with explicit timeout/cancellation cleanup.",
    mistake: "Forgetting to return a promise inside then. The next step receives undefined and the nested work escapes the chain’s error handling.",
    question: "Why doesn’t Promise.race cancel the losing operations?",
    answer: "It only settles from the first outcome. The input operations continue unless their own APIs support cancellation, commonly through AbortSignal.",
    quiz: { prompt: "Which combinator preserves every success and failure?", options: ["all", "race", "allSettled", "any"], correct: 2, explanation: "allSettled waits for every input and reports each status without rejecting early." },
  },
  {
    id: "async-control",
    title: "Async control & resilience",
    eyebrow: "Async / 07",
    minutes: 30,
    concepts: ["Race conditions", "AbortController", "Retry", "Exponential backoff", "Concurrency limits", "Deduplication"],
    intro: "Async correctness is not only about awaiting work. It is about ownership: which request is current, which may be retried, how many may run, and who can cancel them.",
    why: "Without explicit coordination, stale results overwrite fresh state, retries amplify incidents, and duplicate work exhausts browser and service capacity.",
    analogy: "Analogy: an air-traffic controller assigns lanes, cancels stale landings, and spaces retries. Runtime truth: coordination is implemented through identities, signals, queues, and policies.",
    code: "let active;\nasync function search(query) {\n  active?.abort();\n  active = new AbortController();\n  return fetch(`/search?q=${query}`, { signal: active.signal });\n}",
    production: "Typeahead search cancels the previous request and also compares request IDs, because cancellation may arrive after a response has already progressed.",
    architecture: "Expose AbortSignal through every async layer. Retry only idempotent or safely keyed operations, add jitter, cap attempts, and share in-flight promises by stable cache key.",
    mistake: "Retrying immediately in a tight loop. That synchronizes clients during an outage and makes recovery harder.",
    question: "Why combine cancellation with a latest-request identity check?",
    answer: "Cancellation is cooperative and can race with completion. Identity guards prevent late success from a superseded request from committing stale state.",
    quiz: { prompt: "What does jitter improve?", options: ["Type inference", "Retry desynchronization", "Promise ordering", "Garbage collection"], correct: 1, explanation: "Randomized delay prevents many clients from retrying in lockstep." },
  },
  {
    id: "ts-inference",
    title: "Inference, structure & narrowing",
    eyebrow: "Type system / 08",
    minutes: 26,
    concepts: ["Type inference", "Interfaces", "Type aliases", "Structural typing", "Discriminated unions", "Type guards", "Exhaustive checking"],
    intro: "TypeScript checks the shapes values may have without changing JavaScript runtime behavior. Inference removes annotations; narrowing makes a broad possibility precise along a control-flow path.",
    why: "Good models make invalid UI states unrepresentable and keep domain changes discoverable across a large codebase.",
    analogy: "Analogy: a design-time proofreader. Runtime truth: most types are erased, so external data still needs runtime validation.",
    code: "type LoadState =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: User }\n  | { status: 'error'; message: string };",
    production: "A discriminated union replaces three booleans that previously allowed impossible combinations such as loading and error at the same time.",
    architecture: "Model domain states near the boundary that owns them. Convert untrusted wire data into validated internal types rather than spreading unknown shapes through components.",
    mistake: "Casting with as to silence a mismatch. A cast adds no runtime check and can erase the evidence that the model is wrong.",
    question: "Why can a structurally compatible value cross an interface boundary without explicitly implementing it?",
    answer: "TypeScript is structurally typed: compatibility is based primarily on members, not declared nominal relationships.",
    quiz: { prompt: "What enables exhaustive switch checking?", options: ["A common discriminant", "Function overloads", "Declaration merging", "Variance"], correct: 0, explanation: "A stable literal discriminant lets control flow narrow each union member and expose an unhandled never case." },
  },
  {
    id: "ts-generics",
    title: "Generics & reusable constraints",
    eyebrow: "Type system / 09",
    minutes: 27,
    concepts: ["Generics", "Constraints", "keyof", "Indexed access", "typeof", "Function overloads", "Variance"],
    intro: "A generic preserves a relationship between inputs and outputs. A constraint defines the minimum capability required without throwing away the caller’s more specific type.",
    why: "Senior-level TypeScript APIs should preserve information, guide callers, and produce useful failures—not merely replace any with unknown syntax.",
    analogy: "Analogy: a reusable machine with an adjustable jig. Runtime truth: generic parameters are erased; they constrain compile-time substitutions.",
    code: "function get<T, K extends keyof T>(value: T, key: K): T[K] {\n  return value[key];\n}\nconst name = get({ id: 1, name: 'Ada' }, 'name');",
    production: "A typed table column keeps accessor keys aligned with row data and infers each cell renderer’s exact value type.",
    architecture: "Place generics where relationships matter—adapters, repositories, component contracts—not on every helper. Over-general APIs are harder to evolve and understand.",
    mistake: "Using a generic that appears only once. If no relationship is preserved, a concrete or union type is usually clearer.",
    question: "What determines whether a generic position is covariant, contravariant, or invariant?",
    answer: "How the parameter is consumed and produced. Output-only tends toward covariance, input-only toward contravariance under strict function checking, and both directions toward invariance.",
    quiz: { prompt: "What does K extends keyof T guarantee?", options: ["K is a string", "K names a property of T", "T is an object at runtime", "The property is writable"], correct: 1, explanation: "The constraint restricts K to the known keys of T, enabling the indexed result T[K]." },
  },
  {
    id: "ts-transformations",
    title: "Mapped & conditional types",
    eyebrow: "Type system / 10",
    minutes: 29,
    concepts: ["Utility types", "Mapped types", "Conditional types", "infer", "Indexed access types", "Declaration files"],
    intro: "Type transformations compute new contracts from existing ones. Mapped types iterate over keys; conditional types select a result and may infer part of an input pattern.",
    why: "Derived types reduce drift between API models, forms, permissions, events, and component variants—when the transformation remains readable.",
    analogy: "Analogy: formulas in a schema spreadsheet. Runtime truth: the compiler evaluates type-level relations and erases the result from emitted JavaScript.",
    code: "type AsyncResult<T> = T extends Promise<infer R> ? R : T;\ntype Form<T> = {\n  [K in keyof T]?: { value: T[K]; error?: string }\n};",
    production: "A patch API derives optional writable fields from a canonical entity but explicitly excludes server-owned identifiers and timestamps.",
    architecture: "Prefer named domain transformations over dense one-liners. Type-level cleverness has a maintenance and compiler-performance cost.",
    mistake: "Deriving a public contract from an internal persistence type. Accidental fields leak across the boundary when the internal model grows.",
    question: "Why can a conditional type distribute over a union?",
    answer: "When the checked side is a naked type parameter, TypeScript applies the conditional to each union member, then unions the results.",
    quiz: { prompt: "What does infer do?", options: ["Runs runtime reflection", "Introduces a type variable inside a conditional pattern", "Declares an interface", "Forces a cast"], correct: 1, explanation: "infer captures a matched portion of a type for use in the conditional result." },
  },
  {
    id: "type-safe-boundaries",
    title: "Type-safe boundaries",
    eyebrow: "Type system / 11",
    minutes: 25,
    concepts: ["Branded types", "API responses", "Declaration files", "Storage wrapper", "Result errors"],
    intro: "Static types are strongest inside the program and weakest at the edge. Boundary code must validate unknown data, attach domain meaning, and return explicit outcomes.",
    why: "Most costly frontend failures begin where a server response, storage value, message, or third-party script was trusted without proof.",
    analogy: "Analogy: customs control stamps inspected goods. Runtime truth: parsers validate values, while brands exist only at compile time unless backed by validation.",
    code: "type UserId = string & { readonly __brand: 'UserId' };\ntype Result<T> =\n  | { ok: true; value: T }\n  | { ok: false; error: Error };",
    production: "A local-storage adapter parses versioned JSON, validates its fields, migrates old records, and returns Result rather than throwing during application boot.",
    architecture: "Hide untrusted systems behind adapters. Components should receive domain values or explicit failure states, never raw Response, JSON, or storage strings.",
    mistake: "Annotating await response.json() as User. The annotation asserts a belief; it does not inspect the payload.",
    question: "What must accompany a branded identifier at an external boundary?",
    answer: "Runtime validation or a trusted constructor that proves the underlying value meets the domain rule before applying the brand.",
    quiz: { prompt: "Which type best represents unvalidated JSON?", options: ["any", "unknown", "object", "never"], correct: 1, explanation: "unknown forces narrowing or validation before the value can be used." },
  },
  {
    id: "implementation-studio",
    title: "Implementation studio",
    eyebrow: "Practice / 12",
    minutes: 45,
    concepts: ["Debounce", "Throttle", "Deep clone", "Retry", "Event emitter", "Concurrency limiter", "Flattening", "Grouping"],
    intro: "Implementation questions reveal contract thinking more than typing speed. Start with semantics: leading or trailing, cancellation, error behavior, ordering, identity, and resource limits.",
    why: "The same primitives appear in search, analytics, batch loading, event systems, immutable updates, and resilient networking.",
    analogy: "Analogy: define the rules of the game before playing. Runtime truth: edge cases are the contract—timers, reentrancy, rejected promises, cycles, symbols, and cancellation.",
    code: "function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {\n  let timer: ReturnType<typeof setTimeout>;\n  return (...args: Parameters<T>) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n}",
    production: "A search input debounces network work but updates local text immediately, aborts prior requests, exposes flush/cancel semantics, and remains testable with a fake clock.",
    architecture: "Keep scheduling primitives framework-agnostic. Wrap them with React lifecycle behavior at the hook boundary rather than embedding React assumptions in the core algorithm.",
    mistake: "Implementing the happy path before naming edge cases. Interviewers evaluate the questions you ask and invariants you preserve.",
    question: "What contract decisions must a production debounce expose?",
    answer: "Leading/trailing behavior, argument and this preservation, result semantics, cancel/flush, timer reset policy, and cleanup ownership.",
    quiz: { prompt: "What is the core invariant of a concurrency limiter?", options: ["Tasks finish in input order", "No more than N tasks are active", "All failures are retried", "Every task uses a timer"], correct: 1, explanation: "Completion order may vary; the limiter guarantees an upper bound on active work." },
  },
] as const;

export const totalTopics = weeks.reduce((sum, week) => sum + week.modules.reduce((count, module) => count + module.topics.length, 0), 0);

export const visualLabels: Record<VisualKind, string> = {
  runtime: "Runtime trace",
  memory: "Reference map",
  types: "Type transformation",
  browser: "Rendering pipeline",
  network: "Request waterfall",
  security: "Attack / defence flow",
  react: "Render timeline",
  state: "State ownership map",
  testing: "Confidence pyramid",
  accessibility: "Focus flow",
  architecture: "Dependency graph",
  system: "Design canvas",
  ai: "AI request pipeline",
  interview: "Reasoning drill",
};

export const systemCases = ["Dynamic form builder", "Enterprise dashboard", "Search autocomplete", "File-upload platform", "Workflow engine", "Design system", "Micro-frontend platform"];

export const knowledgeLinks = [
  ["Closures", "Hooks", "Stale closures", "Memoization"],
  ["Event loop", "Promises", "async / await", "React batching"],
  ["Browser rendering", "React commit", "Performance"],
  ["Cookies", "Authentication", "CSRF", "SameSite"],
  ["State ownership", "Architecture", "Testing"],
  ["Embeddings", "Retrieval", "RAG", "Source citations"],
];
