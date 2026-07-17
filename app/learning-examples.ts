export type LearningExample = {
  language: string;
  filename: string;
  title: string;
  code: string;
  takeaway: string;
  experiment: string;
};

export type ReadingReference = {
  book: string;
  section: string;
  pages: string;
  focus: string;
  tone: "javascript" | "architecture";
};

const createExample = (
  language: string,
  filename: string,
  title: string,
  code: string,
  takeaway: string,
  experiment: string,
): LearningExample => ({ language, filename, title, code, takeaway, experiment });

function inferredLanguage(topicId: string) {
  const id = Number(topicId);
  if (id <= 16) return ["javascript", "example.js"];
  if (id === 17 || id === 18) return ["html", "index.html"];
  if (id >= 19 && id <= 23) return ["css", "styles.css"];
  if (id >= 24 && id <= 28) return ["typescript", "example.ts"];
  if (id >= 29 && id <= 36) return ["tsx", "Example.tsx"];
  if (id >= 37 && id <= 43) return ["typescript", "state.ts"];
  if (id >= 44 && id <= 50) return ["javascript", "quality-check.js"];
  if (id >= 51 && id <= 59) return ["typescript", "architecture.ts"];
  if (id === 61) return ["markdown", "decision.md"];
  if (id === 62) return ["typescript", "ai-client.ts"];
  if (id === 63) return ["shell", "commands.sh"];
  if (id === 64) return ["javascript", "locale.js"];
  if (id === 65) return ["javascript", "service-worker.js"];
  return ["typescript", "mastery.ts"];
}

export function learningExampleFor(
  topicId: string,
  topicTitle: string,
  subtopicTitle: string,
  authoredCode?: string,
): LearningExample {
  const text = `${topicTitle} ${subtopicTitle}`.toLowerCase();
  const [language, filename] = inferredLanguage(topicId);

  if (authoredCode && authoredCode.trim().length >= 12) {
    return createExample(
      language,
      filename,
      `${subtopicTitle} in code`,
      authoredCode.trim(),
      `This example makes the observable behavior of ${subtopicTitle} concrete instead of leaving it as a definition.`,
      "Predict the output first, then change one value or operation and explain why the result changes.",
    );
  }

  if (/javascript engine|parser|compiler|abstract syntax tree/.test(text)) {
    return createExample(
      "javascript",
      "engine-input.js",
      "Source code becomes executable structure",
      `const price = 40;
const taxRate = 0.18;
const total = price + price * taxRate;

console.log(total); // 47.2`,
      "The engine tokenizes and parses this source before executing it. The declarations and binary expressions become structured nodes rather than raw text.",
      "Introduce a syntax error, then compare a parse-time failure with a runtime ReferenceError.",
    );
  }

  if (/scope|shadowing|variable declaration/.test(text)) {
    return createExample(
      "javascript",
      "scope.js",
      "Lexical scope decides which binding wins",
      `const label = "global";

function renderCard() {
  const label = "card";

  if (true) {
    const label = "badge";
    console.log(label); // "badge"
  }

  console.log(label); // "card"
}

renderCard();`,
      "Each block creates a nearer lexical binding. Lookup starts locally and moves outward through the scope chain.",
      "Remove the innermost declaration and predict which label each log resolves to.",
    );
  }

  if (/hoisting|temporal dead zone/.test(text)) {
    return createExample(
      "javascript",
      "hoisting.js",
      "Declaration setup is not the same as initialization",
      `console.log(varValue); // undefined
var varValue = 1;

console.log(letValue); // ReferenceError
let letValue = 2;`,
      "`var` is initialized with `undefined` during environment setup. `let` exists but remains uninitialized inside its temporal dead zone.",
      "Move both logs below their declarations, then wrap the declarations in a block.",
    );
  }

  if (/primitive|reference value|shallow|deep copy|mutation/.test(text)) {
    return createExample(
      "javascript",
      "values.js",
      "Values copy differently from object references",
      `let scoreA = 10;
let scoreB = scoreA;
scoreB += 5;

const userA = { profile: { name: "Ari" } };
const userB = { ...userA };
userB.profile.name = "Mina";

console.log(scoreA);           // 10
console.log(userA.profile.name); // "Mina"`,
      "Primitive assignment copies a value. Object spread copies only the outer container, so nested objects remain shared.",
      "Replace the spread with `structuredClone(userA)` and compare the final name.",
    );
  }

  if (/nan|floating|number|equality|coercion|null|undefined/.test(text)) {
    return createExample(
      "javascript",
      "comparison.js",
      "Make conversion and comparison explicit",
      `const input = "42";
const parsed = Number(input);

console.log(Number.isNaN(parsed)); // false
console.log(parsed === 42);        // true
console.log(Object.is(NaN, NaN));  // true
console.log(0.1 + 0.2);            // 0.30000000000000004`,
      "Numeric conversion, IEEE-754 precision, and equality are separate mechanisms. Explicit operations make the intended comparison visible.",
      "Try `Number(\"\")`, `Number(undefined)`, and `parseInt(\"42px\", 10)`.",
    );
  }

  if (/higher-order|pure function|currying|partial|function type|parameter|argument/.test(text)) {
    return createExample(
      "javascript",
      "functions.js",
      "Functions can receive and return behavior",
      `const withTax = (rate) => (price) => price + price * rate;
const addGST = withTax(0.18);

const prices = [100, 250, 80];
const totals = prices.map(addGST);

console.log(totals); // [118, 295, 94.4]`,
      "`withTax` is higher-order and curried: it captures configuration once, then returns a reusable transformation.",
      "Create a second configured function for a different tax rate without changing `withTax`.",
    );
  }

  if (/recursion/.test(text)) {
    return createExample(
      "javascript",
      "recursion.js",
      "A recursive function needs a shrinking problem",
      `function sumTree(node) {
  if (!node.children?.length) return node.value;

  return node.value +
    node.children.reduce((sum, child) => sum + sumTree(child), 0);
}`,
      "The base case stops recursion. Every recursive call moves to a smaller subtree.",
      "Add a deeply nested tree, then compare this approach with an explicit stack.",
    );
  }

  if (/debounce|throttle/.test(text)) {
    return createExample(
      "javascript",
      "rate-limit.js",
      "Debounce noisy input",
      `function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}

const search = debounce((query) => fetch(\`/api?q=\${query}\`), 300);`,
      "Every call replaces the pending timer, so the callback runs only after input has been quiet for the chosen delay.",
      "Add a `cancel()` method, then compare this behavior with a throttle.",
    );
  }

  if (/closure|private state|function factor|stale closure/.test(text)) {
    return createExample(
      "javascript",
      "closure.js",
      "A returned function keeps its lexical environment",
      `function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    current() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2`,
      "The methods remain linked to `count` after `createCounter` returns. Outside code cannot access that binding directly.",
      "Create two counters and prove that each closure owns independent state.",
    );
  }

  if (/this keyword|binding|lost context/.test(text)) {
    return createExample(
      "javascript",
      "this-binding.js",
      "Call-site syntax chooses `this`",
      `const player = {
  name: "Ada",
  show() {
    return this.name;
  },
};

player.show();                  // "Ada"
const detached = player.show;
detached();                     // undefined in strict mode
detached.call({ name: "Lin" }); // "Lin"`,
      "The same function receives different `this` values because the call sites use implicit, default, and explicit binding.",
      "Create a bound function with `player.show.bind(player)` and call it later.",
    );
  }

  if (/prototype|constructor function|class|inheritance|composition|property descriptor|object creation/.test(text)) {
    return createExample(
      "javascript",
      "objects.js",
      "Objects delegate through the prototype chain",
      `const speaker = {
  speak() {
    return \`\${this.name} speaks\`;
  },
};

const user = Object.create(speaker);
user.name = "Asha";

console.log(user.speak());
console.log(Object.getPrototypeOf(user) === speaker); // true`,
      "`user` does not own `speak`; property lookup follows its prototype link and invokes the function with `user` as the receiver.",
      "Add an own `speak` property to `user` and observe how shadowing changes lookup.",
    );
  }

  if (/array|map$|filter|reduce|set/.test(text)) {
    return createExample(
      "javascript",
      "collections.js",
      "Transform data without mutating the source",
      `const orders = [
  { id: 1, total: 80, paid: true },
  { id: 2, total: 40, paid: false },
  { id: 3, total: 120, paid: true },
];

const paidTotal = orders
  .filter((order) => order.paid)
  .map((order) => order.total)
  .reduce((sum, total) => sum + total, 0);

console.log(paidTotal); // 200`,
      "Each stage has one job: select, project, then aggregate. The original array remains unchanged.",
      "Rewrite the pipeline as one `reduce` and compare clarity, allocations, and debugging.",
    );
  }

  if (/event loop|task queue|microtask|timer|browser api|rendering opportunity|synchronous execution/.test(text)) {
    return createExample(
      "javascript",
      "event-loop.js",
      "Tasks and microtasks have different checkpoints",
      `console.log("script:start");

setTimeout(() => console.log("task:timer"), 0);

queueMicrotask(() => console.log("microtask:queued"));
Promise.resolve().then(() => console.log("microtask:promise"));

console.log("script:end");

// script:start
// script:end
// microtask:queued
// microtask:promise
// task:timer`,
      "The current script finishes first. The runtime drains microtasks before taking the timer task from the next task turn.",
      "Queue a microtask inside the timer and explain where it appears.",
    );
  }

  if (/promise|async function|await|request cancellation|race condition|retry|concurrency/.test(text)) {
    return createExample(
      "javascript",
      "request-control.js",
      "Make asynchronous ownership explicit",
      `async function loadUser(userId, signal) {
  const response = await fetch(\`/api/users/\${userId}\`, { signal });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

const controller = new AbortController();

loadUser("42", controller.signal)
  .then((user) => console.log(user.name))
  .catch((error) => {
    if (error.name !== "AbortError") console.error(error);
  });

controller.abort();`,
      "The promise represents the eventual result, while `AbortSignal` gives the caller explicit cancellation ownership.",
      "Remove the abort call, then add a timeout that aborts only slow requests.",
    );
  }

  if (/worker/.test(text)) {
    return createExample(
      "javascript",
      "main.js",
      "Move CPU work away from the main thread",
      `const worker = new Worker("/calculate.js", { type: "module" });

worker.postMessage({ values: [4, 8, 15, 16, 23, 42] });
worker.addEventListener("message", (event) => {
  console.log("result", event.data);
});`,
      "A worker has a separate JavaScript execution context. Values cross the boundary through messages rather than shared UI state.",
      "Send a large typed array as a transferable and compare copying cost.",
    );
  }

  if (Number(topicId) === 11 || Number(topicId) === 12) {
    return createExample(
      "javascript",
      "browser-work.js",
      "Protect the main thread and observe rendering work",
      `const status = document.querySelector("#status");

performance.mark("update:start");
status.textContent = "Loaded";

requestAnimationFrame(() => {
  performance.mark("frame:ready");
  performance.measure("update-to-frame", "update:start", "frame:ready");
  console.log(performance.getEntriesByName("update-to-frame").at(-1));
});`,
      "DOM mutation runs on the main thread. `requestAnimationFrame` schedules observation at the next rendering opportunity after browser rendering work is prepared.",
      "Add a long synchronous loop before `requestAnimationFrame` and measure how it delays the frame.",
    );
  }

  if (/url|dns|tcp|tls|http|status code|header|idempotency/.test(text)) {
    return createExample(
      "javascript",
      "http-client.js",
      "Express HTTP intent in the request",
      `const response = await fetch("/api/profile", {
  method: "PUT",
  headers: {
    "content-type": "application/json",
    "if-match": currentVersion,
  },
  body: JSON.stringify(nextProfile),
});

if (response.status === 412) {
  throw new Error("The profile changed on another device.");
}`,
      "Method, headers, body, and status form a contract. Conditional headers make concurrent updates safer.",
      "Compare the retry implications of `PUT` with a non-idempotent `POST`.",
    );
  }

  if (/cache|validation header|static asset|html caching/.test(text)) {
    return createExample(
      "javascript",
      "cache-policy.js",
      "Choose caching behavior deliberately",
      `const response = await fetch("/api/catalog", {
  cache: "no-cache", // Revalidate before reuse
});

// Example response policy:
// Cache-Control: public, max-age=60, stale-while-revalidate=300
// ETag: "catalog-v18"`,
      "Freshness and validation are different decisions. A stale response can be revalidated instead of downloaded again.",
      "Compare `no-store`, `reload`, and `force-cache` in the browser network panel.",
    );
  }

  if (/cookie|local storage|session storage|indexeddb|cache storage|multi-tab/.test(text)) {
    return createExample(
      "javascript",
      "persistence.js",
      "Use storage according to the data’s lifecycle",
      `const settings = { density: "comfortable", theme: "dark" };
localStorage.setItem("ui-settings", JSON.stringify(settings));

const saved = JSON.parse(localStorage.getItem("ui-settings") ?? "{}");

window.addEventListener("storage", (event) => {
  if (event.key === "ui-settings") {
    console.log("Settings changed in another tab", event.newValue);
  }
});`,
      "Local storage persists small string values and emits cross-tab notifications. It is not appropriate for secrets or large indexed records.",
      "Move a larger record set to IndexedDB and define a versioned schema.",
    );
  }

  if (/origin|cors|preflight|credential/.test(text)) {
    return createExample(
      "javascript",
      "cors-request.js",
      "CORS is a browser-enforced response contract",
      `const response = await fetch("https://api.example.com/me", {
  method: "GET",
  credentials: "include",
  headers: { "x-client-version": "2" },
});

// The API must opt in with response headers such as:
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Credentials: true`,
      "The browser may send a preflight because of credentials or non-safelisted headers. Client code cannot grant itself cross-origin access.",
      "Remove the custom header and compare whether the request remains preflighted.",
    );
  }

  if (/document structure|semantic|heading|button|link|form|table|dialog|aria|keyboard|focus|live region|contrast/.test(text)) {
    return createExample(
      "html",
      "accessible-card.html",
      "Use native semantics before adding ARIA",
      `<article aria-labelledby="course-title">
  <h2 id="course-title">JavaScript execution</h2>
  <p>Four visual lessons about engines, contexts, and stacks.</p>

  <a href="/learn/how-javascript-executes-code">
    Open topic
  </a>

  <button type="button" aria-describedby="save-help">
    Save for later
  </button>
  <span id="save-help">Stores this preference on your device.</span>
</article>`,
      "Headings, links, and buttons already expose useful roles and keyboard behavior. ARIA supplies relationships, not replacement semantics.",
      "Navigate the example using only Tab, Enter, and Space.",
    );
  }

  if (/cascade|specificity|inheritance|box model|display|position|stacking|flex|grid|responsive|media quer|container quer|unit|image|token|theme|styling/.test(text)) {
    return createExample(
      "css",
      "component.css",
      "Encode layout intent with constraints",
      `:root {
  --space-3: 0.75rem;
  --surface: #ffffff;
  --text: #171922;
}

.topic-grid {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: var(--space-3);
}

@container (width > 42rem) {
  .topic-card {
    grid-template-columns: 8rem 1fr;
  }
}`,
      "Tokens separate design decisions from selectors. Intrinsic grid sizing and a container query let the component respond to its own available space.",
      "Resize the component inside different parents without changing the viewport.",
    );
  }

  if (/typescript|type inference|structural|unknown|never|union|intersection|narrow|discriminated|exhaustive|type guard|generic|keyof|mapped|conditional|infer|template literal|brand|recursive|dto|contract|parsing|trust boundar/.test(text)) {
    return createExample(
      "typescript",
      "domain-model.ts",
      "Model valid states and validate the boundary",
      `type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function renderState(state: LoadState<string>) {
  switch (state.status) {
    case "idle": return "Start";
    case "loading": return "Loading…";
    case "success": return state.data;
    case "error": return state.message;
    default: {
      const impossible: never = state;
      return impossible;
    }
  }
}`,
      "The discriminant connects each status with exactly the fields valid in that state. The `never` check catches forgotten variants.",
      "Add a `cancelled` state and follow the compiler error to every missing branch.",
    );
  }

  if (Number(topicId) >= 29 && Number(topicId) <= 36) {
    return createExample(
      "tsx",
      "SearchResults.tsx",
      "Separate state, derivation, and synchronization",
      `function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then(setResults)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      });

    return () => controller.abort();
  }, [query]);

  return results.map((result) => (
    <ResultCard key={result.id} result={result} />
  ));
}`,
      "Render stays pure. The effect synchronizes with a request, cleanup cancels stale work, and stable keys preserve item identity.",
      "Wrap the query update in a transition and compare urgent typing with non-urgent result rendering.",
    );
  }

  if (/redux|reducer|selector|normalized|middleware|server state|query|mutation|optimistic|pagination|api client|interceptor|dto/.test(text)) {
    return createExample(
      "typescript",
      "data-layer.ts",
      "Keep transport data behind a typed boundary",
      `type UserDTO = { id: string; display_name: string };
type User = { id: string; displayName: string };

const toUser = (dto: UserDTO): User => ({
  id: dto.id,
  displayName: dto.display_name,
});

export async function getUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new ApiError(response.status);
  return toUser(await response.json());
}`,
      "The module owns HTTP failure handling and DTO mapping. Components depend on a stable domain model rather than backend field names.",
      "Add an abort signal and a distinct error type for validation failures.",
    );
  }

  if (/authentication|authorization|oauth|openid|pkce|token|session|permission|role|route guard/.test(text)) {
    return createExample(
      "typescript",
      "authorization.ts",
      "Treat UI authorization as a capability hint",
      `type Permission = "invoice:read" | "invoice:refund";

function can(
  permissions: ReadonlySet<Permission>,
  required: Permission,
) {
  return permissions.has(required);
}

const mayRefund = can(session.permissions, "invoice:refund");

// The server must enforce the same permission again.
if (mayRefund) showRefundButton();`,
      "The client can shape the interface, but only the server can enforce the security boundary for the actual operation.",
      "Model resource-level permission, such as refunding only invoices owned by the user’s organization.",
    );
  }

  if (/polling|server-sent|websocket|reconnection|message ordering|deduplication/.test(text)) {
    return createExample(
      "typescript",
      "live-updates.ts",
      "Make reconnects and duplicate delivery safe",
      `const seen = new Set<string>();
const socket = new WebSocket("wss://example.com/updates");

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data) as {
    id: string;
    sequence: number;
    payload: unknown;
  };

  if (seen.has(message.id)) return;
  seen.add(message.id);
  applyUpdate(message);
});`,
      "Real-time delivery can repeat or arrive out of order. Message identity and sequence data let the client recover predictably.",
      "Add bounded retention to `seen` and a reconnect strategy with exponential backoff.",
    );
  }

  if (/performance|core user|loading|interaction|budget|rerender|memo|large list|tree shaking|code splitting|dynamic import|source map|memory|garbage|leak|detached|cache limit/.test(text)) {
    return createExample(
      "javascript",
      "measure.js",
      "Measure the exact work you want to improve",
      `performance.mark("catalog:start");
const catalog = await import("./catalog.js");
catalog.render();
performance.mark("catalog:end");

performance.measure(
  "catalog:load-and-render",
  "catalog:start",
  "catalog:end",
);

const [measure] = performance.getEntriesByName("catalog:load-and-render");
console.log(\`\${measure.duration.toFixed(1)}ms\`);`,
      "A named measurement creates evidence around a specific boundary. Dynamic import also makes the dependency an explicit loading split.",
      "Record the measure for several runs, then compare median rather than one lucky result.",
    );
  }

  if (/test|unit|component|integration|end-to-end|contract|accessibility testing/.test(text)) {
    return createExample(
      "typescript",
      "checkout.test.ts",
      "Test behavior at the useful boundary",
      `it("prevents duplicate checkout submission", async () => {
  const user = userEvent.setup();
  render(<Checkout />);

  const submit = screen.getByRole("button", { name: "Pay now" });
  await user.dblClick(submit);

  expect(api.createOrder).toHaveBeenCalledTimes(1);
  expect(await screen.findByText("Order confirmed")).toBeVisible();
});`,
      "The test observes a user-visible guarantee while checking the production risk: duplicate submission.",
      "Add a failed-network case and verify that retrying does not create a second order.",
    );
  }

  if (/xss|csrf|content security|clickjacking|open redirect|secret|sensitive|dependency security/.test(text)) {
    return createExample(
      "javascript",
      "safe-rendering.js",
      "Keep untrusted data out of executable contexts",
      `const message = new URL(location.href).searchParams.get("message") ?? "";
const output = document.querySelector("#message");

// textContent treats the value as text, not markup.
output.textContent = message;

// Pair safe rendering with a response policy:
// Content-Security-Policy: default-src 'self'; script-src 'self'`,
      "Safe DOM APIs prevent markup interpretation. CSP adds defense in depth if unsafe content reaches an executable sink elsewhere.",
      "Search the codebase for `innerHTML`, URL redirects, and token logging, then classify each trust boundary.",
    );
  }

  if (/timeout|retry|partial failure|graceful|offline|duplicate submission/.test(text)) {
    return createExample(
      "typescript",
      "resilient-request.ts",
      "Bound waiting and make retries selective",
      `async function withTimeout<T>(
  work: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await work(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}`,
      "The caller owns a finite waiting budget. Cleanup runs whether the operation succeeds, fails, or is aborted.",
      "Retry only transient failures and add jitter so many clients do not retry simultaneously.",
    );
  }

  if (Number(topicId) === 61 || /diagram|architecture decision|system context|sequence/.test(text)) {
    return createExample(
      "markdown",
      "adr-004-api-boundary.md",
      "Record the decision and its trade-off",
      `# ADR-004: Add a typed API boundary

## Context
UI components currently import transport DTOs directly.

## Decision
Feature API modules will validate responses and map DTOs to domain models.

## Consequences
- Backend changes stop leaking into components.
- Mapping code and validation become explicit maintenance costs.
- Contract failures can be observed at one boundary.`,
      "An ADR preserves context, choice, and consequences. It explains why the structure exists after the original discussion is gone.",
      "Add one rejected alternative and the signal that would justify revisiting this decision.",
    );
  }

  if (/architecture|module|layer|dependency|shared code|component api|headless|compound|design system|primitive|governance|monorepo|circular|build cache|microfrontend|integration|failure isolation|backend for frontend|feature flag|configuration|observability|logging|monitoring|delivery|rollback|artifact/.test(text)) {
    return createExample(
      "typescript",
      "public-api.ts",
      "Expose a narrow public module contract",
      `// features/billing/index.ts — the only public entry point
export { InvoiceList } from "./ui/InvoiceList";
export { loadInvoices } from "./api/loadInvoices";
export type { Invoice } from "./model/Invoice";

// A consumer imports the capability, not internal files.
import {
  InvoiceList,
  loadInvoices,
} from "@/features/billing";`,
      "A public entry point protects internal structure and makes dependency direction reviewable. Consumers cannot accidentally couple to implementation files.",
      "Add an import-boundary lint rule, then move an internal file without changing consumers.",
    );
  }

  if (/streaming response|structured output|conversation|tool call|human approval|ai uncertainty|ai security|ai cost|ai evaluation/.test(text)) {
    return createExample(
      "typescript",
      "ai-boundary.ts",
      "Validate model output before the UI trusts it",
      `type Recommendation = {
  title: string;
  confidence: number;
  reasons: string[];
};

const response = await fetch("/api/recommend", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query }),
});

const unknownOutput: unknown = await response.json();
const recommendation = RecommendationSchema.parse(unknownOutput);

if (recommendation.confidence < 0.7) {
  showHumanReview(recommendation);
}`,
      "Model output remains untrusted until runtime validation. Confidence and approval are product states, not decorative labels.",
      "Add a tool call that requires explicit approval before causing an external side effect.",
    );
  }

  if (/git|commit|merge|rebase|cherry-pick|reflog|bisect|pull request/.test(text)) {
    return createExample(
      "shell",
      "commands.sh",
      "Use history to isolate a regression",
      `git bisect start
git bisect bad HEAD
git bisect good v2.4.0

# Test the checked-out midpoint, then mark it:
git bisect good   # or: git bisect bad

git bisect reset`,
      "`git bisect` performs a binary search through commits, turning a large regression window into a small number of reproducible checks.",
      "Automate the check with `git bisect run npm test -- regression.test.ts`.",
    );
  }

  if (/translation|date|time zone|currency|number format|right-to-left|text expansion|internationalization|localization/.test(text)) {
    return createExample(
      "javascript",
      "locale.js",
      "Format data with locale-aware primitives",
      `const locale = "hi-IN";
const amount = 125000.5;
const createdAt = new Date("2026-07-17T08:00:00Z");

console.log(new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "INR",
}).format(amount));

console.log(new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
}).format(createdAt));`,
      "Store canonical values, then format at the presentation boundary with an explicit locale and time zone.",
      "Switch to an Arabic locale and verify text direction, digit shaping, and layout expansion.",
    );
  }

  if (/service worker|cache strateg|update lifecycle|offline mutation|progressive web/.test(text)) {
    return createExample(
      "javascript",
      "service-worker.js",
      "Use cache-first only where staleness is acceptable",
      `const STATIC_CACHE = "static-v3";

self.addEventListener("fetch", (event) => {
  if (event.request.destination !== "image") return;

  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached;

      const response = await fetch(event.request);
      const cache = await caches.open(STATIC_CACHE);
      cache.put(event.request, response.clone());
      return response;
    }),
  );
});`,
      "The strategy matches the resource’s tolerance for staleness. Responses are cloned because their bodies are streams.",
      "Add cache cleanup during activation and an offline fallback for navigation requests.",
    );
  }

  return createExample(
    language,
    filename,
    `${subtopicTitle}: smallest useful example`,
    `// ${subtopicTitle}
// Make the inputs, boundary, and observable result explicit.

type Input = { value: string };
type Result = { ok: true; value: string } | { ok: false; reason: string };

function applyConcept(input: Input): Result {
  if (!input.value.trim()) return { ok: false, reason: "Value is required" };
  return { ok: true, value: input.value.trim() };
}

console.log(applyConcept({ value: " ${subtopicTitle} " }));`,
    `The example gives ${subtopicTitle} an explicit input, decision boundary, and inspectable result.`,
    "Replace the happy-path input with an empty or malformed value and follow the failure branch.",
  );
}

export function readingReferencesFor(topicId: string): ReadingReference[] {
  const id = Number(topicId);
  const references: ReadingReference[] = [];

  const addYdkjs = (book: string, section: string, pages: string, focus: string) => {
    references.push({ book, section, pages, focus, tone: "javascript" });
  };
  const addArchitect = (section: string, pages: string, focus: string) => {
    references.push({
      book: "Architect Mode — Career Field Guide",
      section,
      pages,
      focus,
      tone: "architecture",
    });
  };

  if (id === 1) addYdkjs("You Don’t Know JS: Up & Going", "Into Programming and Into JavaScript", "15–73", "Statements, expressions, values, functions, engine behavior, and the language’s core runtime vocabulary.");
  if (id === 2) addYdkjs("You Don’t Know JS: Scope & Closures", "What Is Scope? through Hoisting", "15–60", "Lexical lookup, function and block scope, declaration processing, hoisting, and the temporal model behind bindings.");
  if (id === 3) addYdkjs("You Don’t Know JS: Types & Grammar", "Types, Values, and Coercion", "15–133", "Built-in value types, references, special numeric values, conversion, and equality edge cases.");
  if (id === 4) addYdkjs("You Don’t Know JS: Up & Going", "Functions as Values", "61–65", "Function expressions, functions as first-class values, and immediately invoked functions.");
  if (id === 5) addYdkjs("You Don’t Know JS: Scope & Closures", "Scope Closure", "61–77", "How functions retain lexical access, closure in loops, and the module pattern.");
  if (id === 6) addYdkjs("You Don’t Know JS: this & Object Prototypes", "this or That? and this All Makes Sense Now!", "15–47", "Call sites, the four binding rules, binding precedence, and lexical `this`.");
  if (id === 7) addYdkjs("You Don’t Know JS: this & Object Prototypes", "Objects, Prototypes, and Behavior Delegation", "49–157", "Property behavior, descriptors, prototype lookup, delegation, classes, and composition trade-offs.");
  if (id === 8) {
    addYdkjs("You Don’t Know JS: Types & Grammar", "Values", "25–51", "Arrays, strings, numbers, special values, and value-versus-reference behavior.");
    addYdkjs("You Don’t Know JS: ES6 & Beyond", "Collections and API Additions", "150–181", "Maps, sets, typed arrays, iterators, and modern collection APIs.");
  }
  if (id === 9) addYdkjs("You Don’t Know JS: Async & Performance", "Asynchrony: Now & Later and Callbacks", "8–37", "Event-loop ordering, chunks of execution, callbacks, and the limits of purely sequential reasoning.");
  if (id === 10) {
    addYdkjs("You Don’t Know JS: Async & Performance", "Promises and Generators", "38–116", "Promise trust, chaining, error flow, concurrency, and generator-based flow control.");
    addYdkjs("You Don’t Know JS: ES6 & Beyond", "Async Flow Control", "138–147", "Promise APIs and composing asynchronous work.");
  }

  if ([18, 23, 37, 40, 44, 48, 49, 51, 52, 53, 54, 55, 56, 58, 59].includes(id)) {
    addArchitect(
      "Frontend Architect Path",
      "5–6",
      "Architecture boundaries, TypeScript contracts, state placement, API layers, design systems, performance, security, accessibility, testing, monorepos, microfrontends, observability, and delivery.",
    );
  }
  if ([51, 54, 55, 61, 63].includes(id)) {
    addArchitect(
      "The Skill Tree and Architect Mindset",
      "15, 19",
      "Dependency thinking, architecture communication, decision records, trade-offs, failure radius, cost, and scale.",
    );
  }

  return references;
}

export const readingShelf = [
  {
    title: "You Don’t Know JS: Up & Going",
    area: "Language foundations",
    topics: "Programming vocabulary, values, functions, `this`, prototypes, and the rest of the series map.",
  },
  {
    title: "You Don’t Know JS: Scope & Closures",
    area: "Scope and closure",
    topics: "Lexical scope, block scope, hoisting, closure, and modules.",
  },
  {
    title: "You Don’t Know JS: this & Object Prototypes",
    area: "Object model",
    topics: "`this` binding, objects, descriptors, prototype delegation, and classes.",
  },
  {
    title: "You Don’t Know JS: Types & Grammar",
    area: "Values and coercion",
    topics: "Types, special values, references, coercion, equality, operators, and grammar.",
  },
  {
    title: "You Don’t Know JS: Async & Performance",
    area: "Asynchronous JavaScript",
    topics: "Event-loop reasoning, callbacks, promises, generators, and performance measurement.",
  },
  {
    title: "You Don’t Know JS: ES6 & Beyond",
    area: "Modern JavaScript",
    topics: "Modern syntax, iterators, modules, classes, promises, collections, proxies, and async functions.",
  },
  {
    title: "Architect Mode — Career Field Guide",
    area: "Frontend architecture",
    topics: "Boundaries, typed APIs, state placement, design systems, quality, observability, delivery, decisions, and trade-offs.",
  },
];
