# Complete Frontend Engineering Mastery Curriculum

Follow the topics in the given order. Each topic builds the foundation required for the next one.

---

# 1. How JavaScript Executes Code

## Topic importance

Before learning frameworks or architecture, understand how JavaScript reads, prepares, and executes code. This knowledge helps debug scope problems, asynchronous behavior, memory issues, and unexpected runtime results.

## 1.1 JavaScript Engine

### Important concepts

* JavaScript engine
* Parser
* Interpreter
* Compiler
* Just-in-Time compilation
* Optimized machine code
* Deoptimization

### Key things to understand

* A JavaScript engine executes JavaScript code.
* Examples include V8, SpiderMonkey, and JavaScriptCore.
* The engine first parses the source code.
* Parsing converts source code into an Abstract Syntax Tree.
* The engine may generate bytecode before converting frequently used code into optimized machine code.
* Runtime assumptions may cause optimized code to be deoptimized.
* Frequently changing value types can make optimization harder.

### Important questions

* What happens after a JavaScript file is downloaded?
* What is the difference between parsing and execution?
* Why can dynamically typed code be harder to optimize?
* What causes JavaScript engines to deoptimize code?

### Practical mastery

* Inspect JavaScript execution using browser developer tools.
* Compare execution of stable-type and changing-type functions.
* Learn to identify optimization-sensitive patterns without prematurely optimizing code.

---

## 1.2 Parsing and Abstract Syntax Tree

### Important concepts

* Tokenization
* Parsing
* Syntax validation
* Abstract Syntax Tree
* Static analysis

### Key things to understand

* Source code is broken into meaningful tokens.
* Tokens are converted into a tree representing the code structure.
* Syntax errors are generally detected during parsing.
* Tools such as ESLint, Babel, TypeScript, and minifiers work with syntax trees.
* An AST represents meaning and structure rather than the original formatting.

### Example

```js
const total = price + tax;
```

The AST represents:

* Variable declaration
* Identifier named `total`
* Binary expression
* Identifiers named `price` and `tax`

### Practical mastery

* Use an AST explorer.
* Inspect how arrow functions, classes, and optional chaining appear in an AST.
* Understand how Babel transforms modern syntax into older JavaScript.

---

## 1.3 Execution Context

### Important concepts

* Global execution context
* Function execution context
* Module execution context
* Creation phase
* Execution phase
* Variable environment
* Lexical environment

### Key things to understand

* JavaScript prepares an environment before executing code.
* The global execution context is created first.
* Every function call creates a new function execution context.
* Variables, function declarations, and scope relationships are prepared before line-by-line execution.
* Execution contexts are placed on the call stack.
* An execution context disappears from the stack when the function finishes, but referenced lexical data may remain because of closures.

### Practical mastery

Draw execution contexts for:

```js
const globalValue = 10;

function outer() {
  const outerValue = 20;

  function inner() {
    return globalValue + outerValue;
  }

  return inner();
}

outer();
```

Identify:

* Global environment
* Outer function environment
* Inner function environment
* Scope lookup sequence

---

## 1.4 Call Stack

### Important concepts

* Stack frame
* Function invocation
* Last In, First Out
* Stack overflow
* Recursive execution

### Key things to understand

* Every function call adds a frame to the call stack.
* The most recently called function executes first.
* When a function finishes, its frame is removed.
* Very deep or infinite recursion can exceed the stack limit.
* The call stack is one reason normal JavaScript execution is described as single-threaded.

### Practical mastery

Predict the call-stack sequence:

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Done");
}

first();
```

Expected sequence:

1. Global execution
2. `first`
3. `second`
4. `third`
5. `console.log`
6. Remove `console.log`
7. Remove `third`
8. Remove `second`
9. Remove `first`

---

# 2. JavaScript Variables, Scope, and Hoisting

## Topic importance

Scope determines where data can be accessed. Poor understanding of scope causes hidden bugs, accidental mutation, stale values, and naming conflicts.

## 2.1 Variable Declarations

### Subtopics

* `var`
* `let`
* `const`

### Important things about `var`

* Function-scoped
* Can be redeclared
* Can be reassigned
* Initialized with `undefined`
* Does not respect normal block scope
* Can create accidental bugs in loops and conditional blocks

### Important things about `let`

* Block-scoped
* Cannot be redeclared in the same scope
* Can be reassigned
* Exists in the Temporal Dead Zone before declaration

### Important things about `const`

* Block-scoped
* Cannot be reassigned
* Must be initialized during declaration
* Does not make objects deeply immutable

### Key distinction

```js
const user = {
  name: "Hira",
};

user.name = "Updated"; // Allowed
```

The variable reference cannot be replaced, but the object can still be mutated.

---

## 2.2 Scope Types

### Subtopics

* Global scope
* Function scope
* Block scope
* Module scope
* Lexical scope

### Global scope

#### Important things

* Accessible across large parts of the program.
* Excessive global state increases coupling.
* Global variables can conflict with other scripts.
* Browser globals can become properties of `window`, depending on declaration style.

### Function scope

#### Important things

* Variables declared inside a function are unavailable outside it.
* `var` respects function scope.
* Each function invocation receives its own local environment.

### Block scope

#### Important things

* Created by blocks such as `if`, `for`, and `{}`.
* `let` and `const` respect block scope.
* `var` does not behave as block-scoped.

### Module scope

#### Important things

* Variables declared inside ES modules are private to that module unless exported.
* Modules reduce global namespace pollution.
* ES modules run in strict mode.

### Lexical scope

#### Important things

* Scope is determined by where code is written.
* It is not determined by where a function is called.
* Inner functions can access variables from outer scopes.

---

## 2.3 Scope Chain

### Important concepts

* Identifier lookup
* Parent lexical environment
* Outer environment reference

### Key things to understand

When JavaScript cannot find a variable locally, it looks upward through the lexical environment chain.

```js
const globalName = "Global";

function outer() {
  const outerName = "Outer";

  function inner() {
    const innerName = "Inner";
    console.log(innerName, outerName, globalName);
  }

  inner();
}
```

Lookup sequence inside `inner`:

1. Search `inner`
2. Search `outer`
3. Search global scope
4. Throw `ReferenceError` if not found

---

## 2.4 Hoisting

### Important concepts

* Declaration registration
* Initialization
* Function hoisting
* Variable hoisting

### Key things to understand

* Hoisting does not physically move code.
* JavaScript registers declarations while creating execution environments.
* Function declarations are available before their written position.
* `var` is registered and initialized with `undefined`.
* `let` and `const` are registered but remain uninitialized.

### Example

```js
console.log(value);
var value = 10;
```

Conceptually behaves like:

```js
var value;
console.log(value);
value = 10;
```

---

## 2.5 Temporal Dead Zone

### Important concepts

* Uninitialized binding
* Declaration position
* `ReferenceError`

### Key things to understand

* `let` and `const` exist before their declaration line.
* They cannot be accessed until initialization.
* The period before initialization is called the Temporal Dead Zone.

```js
console.log(value);
const value = 10;
```

This throws a `ReferenceError`.

---

## 2.6 Shadowing

### Important concepts

* Variable shadowing
* Legal shadowing
* Illegal shadowing

### Key things to understand

A variable in an inner scope may hide a variable with the same name from an outer scope.

```js
const value = "global";

function example() {
  const value = "local";
  console.log(value);
}
```

The local value shadows the global value.

### Important caution

Excessive shadowing reduces readability and can cause developers to use the wrong variable accidentally.

---

# 3. JavaScript Data Types and Values

## Topic importance

Understanding values and references is necessary for equality, mutation, copying, React state updates, memoization, and performance.

## 3.1 Primitive Types

### Primitive values

* String
* Number
* Boolean
* Undefined
* Null
* Symbol
* BigInt

### Key things to understand

* Primitive values are immutable.
* Operations produce new primitive values.
* Primitive comparison generally compares the actual value.
* Variables contain primitive values directly from the language-level perspective.

---

## 3.2 Reference Values

### Reference values

* Objects
* Arrays
* Functions
* Dates
* Maps
* Sets

### Key things to understand

* Variables hold references to objects.
* Two separate objects with identical properties are not strictly equal.
* Mutating an object affects every reference pointing to that object.

```js
const first = { value: 1 };
const second = first;

second.value = 10;

console.log(first.value); // 10
```

---

## 3.3 Numbers and Floating-Point Behavior

### Important concepts

* IEEE-754
* Floating-point precision
* Safe integers
* Infinity
* `NaN`

### Key things to understand

```js
0.1 + 0.2 !== 0.3;
```

This happens because many decimal fractions cannot be represented exactly in binary floating-point form.

### Important practices

* Avoid raw floating-point arithmetic for financial calculations.
* Store money in the smallest currency unit, such as paise or cents.
* Understand `Number.MAX_SAFE_INTEGER`.
* Use `BigInt` only where its limitations are acceptable.

---

## 3.4 `NaN`

### Important things

* Means “Not a Number.”
* Its type is still `"number"`.
* It is not equal to itself.
* `Number.isNaN()` is safer than the global `isNaN()`.

```js
Number.isNaN(NaN); // true
NaN === NaN; // false
```

---

## 3.5 Null and Undefined

### `undefined`

Usually means:

* A value has not been assigned.
* A property does not exist.
* A function did not return a value.
* An argument was omitted.

### `null`

Usually represents:

* Intentional absence of a value.
* Explicitly cleared state.

### Key things to understand

* JavaScript does not enforce a universal semantic difference.
* Teams should define consistent conventions.
* Optional chaining and nullish coalescing help work with nullish values.

---

## 3.6 Type Coercion

### Subtopics

* Implicit coercion
* Explicit conversion
* Truthy values
* Falsy values

### Falsy values

* `false`
* `0`
* `-0`
* `0n`
* `""`
* `null`
* `undefined`
* `NaN`

### Key things to understand

* Objects and arrays are truthy, even when empty.
* Implicit coercion may produce surprising results.
* Explicit conversion improves readability.

```js
Boolean([]);
Boolean({});
Boolean("false");
```

All return `true`.

---

## 3.7 Equality

### Subtopics

* Loose equality
* Strict equality
* `Object.is`
* SameValueZero

### Strict equality

```js
valueA === valueB;
```

Avoids most coercion behavior.

### Loose equality

```js
valueA == valueB;
```

Performs coercion according to complex language rules.

### `Object.is`

Important differences:

```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

### Key things to understand

* Object equality compares references.
* Structural equality requires custom comparison logic.
* Deep equality can be expensive.

---

# 4. Functions and Functional Concepts

## Topic importance

Functions are central to JavaScript. React components, hooks, callbacks, middleware, event handlers, and asynchronous operations all depend on function behavior.

## 4.1 Function Types

### Subtopics

* Function declarations
* Function expressions
* Arrow functions
* Anonymous functions
* Named function expressions
* Immediately Invoked Function Expressions

### Key differences

#### Function declarations

* Hoisted with their implementation.
* Useful for named reusable logic.

#### Function expressions

* Assigned to variables.
* Availability depends on variable initialization.

#### Arrow functions

* Lexical `this`
* No own `arguments`
* Cannot normally be used as constructors
* Concise syntax

---

## 4.2 Parameters and Arguments

### Important concepts

* Default parameters
* Rest parameters
* Destructured parameters
* Argument objects
* Optional values

### Key things to understand

* Parameters belong to the function declaration.
* Arguments are values supplied during invocation.
* Rest parameters create a real array.
* Default values apply when the argument is `undefined`.

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}
```

Passing `null` does not activate the default.

---

## 4.3 Higher-Order Functions

### Important concepts

A higher-order function:

* Accepts a function as an argument.
* Returns a function.
* Or does both.

### Examples

* `map`
* `filter`
* `reduce`
* Event listeners
* Middleware
* React hooks
* Function factories

### Key things to understand

Higher-order functions help separate:

* What operation should happen
* When or how it should happen

---

## 4.4 Pure Functions

### Important characteristics

* Same input produces the same output.
* Does not modify external state.
* Does not produce hidden side effects.

### Benefits

* Easier testing
* Predictable behavior
* Easier memoization
* Easier reuse
* Safer concurrency and rendering

### Important caution

Not every function can or should be pure. Network requests, logging, storage access, and DOM updates are side effects.

---

## 4.5 Recursion

### Important concepts

* Base case
* Recursive case
* Call-stack growth
* Tree traversal
* Divide and conquer

### Key things to understand

* Every recursive function needs a terminating base case.
* Deep recursion may cause stack overflow.
* Iterative solutions may be more memory-efficient.
* Recursion is natural for nested data such as trees and menus.

---

## 4.6 Currying and Partial Application

### Currying

Transforms:

```js
function add(a, b) {}
```

Into:

```js
function add(a) {
  return function (b) {};
}
```

### Partial application

Creates a new function with some arguments already supplied.

### Key things to understand

* Currying produces a chain of single-argument functions.
* Partial application can bind one or more arguments.
* These techniques are useful for reusable configuration and composition.
* Excessive currying may reduce readability in ordinary application code.

---

## 4.7 Debounce and Throttle

### Debounce

Executes after calls stop for a defined duration.

Useful for:

* Search input
* Form autosave
* Resize processing

### Throttle

Limits execution to at most once per interval.

Useful for:

* Scroll events
* Mouse movement
* Continuous tracking

### Important implementation details

* Timer cleanup
* Latest argument handling
* Preserving `this`
* Leading execution
* Trailing execution
* Cancellation

---

# 5. Closures

## Topic importance

Closures power private state, callbacks, React hooks, memoization, event handlers, and many reusable JavaScript patterns.

## 5.1 Closure Definition

### Important concept

A closure is created when a function remembers variables from the lexical environment where it was created.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}
```

The returned function retains access to `count`.

---

## 5.2 Private State

### Key things to understand

Closures can protect data from direct external modification.

```js
function createAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}
```

---

## 5.3 Function Factories

### Important concepts

A function factory creates configured functions.

```js
function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}
```

### Use cases

* Formatters
* Validators
* Permission checks
* API configuration
* Logging
* Event processing

---

## 5.4 Stale Closures

### Important things

A stale closure occurs when a callback captures an older value that no longer represents the current state.

Common locations:

* Timers
* Event listeners
* React effects
* Promise callbacks
* Subscriptions

### Key things to understand

* Closures capture variables from a particular render or execution environment.
* React creates a new function scope on every render.
* Older callbacks may continue referring to older render values.

---

## 5.5 Closure Memory Problems

### Important things

Closures may retain:

* Large objects
* DOM nodes
* Cached data
* Event targets
* Application state

### Key practice

Release references when they are no longer required.

Examples:

* Remove event listeners.
* Clear timers.
* Unsubscribe from streams.
* Avoid retaining entire objects when only a small value is needed.

---

# 6. The `this` Keyword

## Topic importance

Understanding `this` helps with object methods, legacy React code, callbacks, classes, and library APIs.

## 6.1 Default Binding

### Key thing

In a normal function call, `this` depends on execution mode.

```js
function show() {
  console.log(this);
}

show();
```

In strict mode, `this` is `undefined`.

---

## 6.2 Implicit Binding

### Key thing

When a function is called through an object, the object before the dot becomes the receiver.

```js
const user = {
  name: "Hira",
  showName() {
    console.log(this.name);
  },
};

user.showName();
```

---

## 6.3 Lost Context

```js
const showName = user.showName;
showName();
```

The function is no longer called through `user`.

### Common causes

* Passing methods as callbacks
* Event handling
* Timer callbacks
* Destructuring object methods

---

## 6.4 Explicit Binding

### Methods

* `call`
* `apply`
* `bind`

### `call`

Calls immediately with individually supplied arguments.

### `apply`

Calls immediately with arguments supplied as an array-like value.

### `bind`

Returns a new function with a fixed `this`.

---

## 6.5 Constructor Binding

### Key thing

When a function is called with `new`:

* A new object is created.
* Its prototype is linked.
* `this` refers to the new object.
* The object is returned unless another object is explicitly returned.

---

## 6.6 Arrow Function Binding

### Key things

* Arrow functions do not create their own `this`.
* They capture `this` from the surrounding lexical scope.
* They are useful for callbacks.
* They are not always suitable for object methods.

---

# 7. Objects, Prototypes, and Classes

## Topic importance

JavaScript uses prototype-based inheritance. Understanding it is necessary for classes, object behavior, library internals, and efficient design.

## 7.1 Object Creation

### Methods

* Object literals
* `Object.create`
* Constructor functions
* Classes
* Factory functions

### Key things to understand

Each creation technique provides different:

* Prototype behavior
* Encapsulation
* Syntax
* Reusability
* Testing characteristics

---

## 7.2 Prototype Chain

### Important concepts

* Own property
* Inherited property
* Prototype lookup
* `Object.getPrototypeOf`
* `Object.setPrototypeOf`

### Key things to understand

When accessing a property:

1. JavaScript checks the object.
2. It checks the object’s prototype.
3. It continues upward.
4. It stops at `null`.

---

## 7.3 Constructor Functions

```js
function User(name) {
  this.name = name;
}

User.prototype.showName = function () {
  return this.name;
};
```

### Important things

* Methods placed on the prototype are shared.
* Methods created inside the constructor are recreated for every instance.
* `new` controls object creation and prototype linkage.

---

## 7.4 Classes

### Important concepts

* Constructor
* Instance methods
* Static methods
* Private fields
* Inheritance
* `super`

### Key things to understand

* Classes use the prototype system internally.
* Class syntax provides clearer structure.
* Class methods are placed on the prototype.
* Static methods belong to the class itself.
* Private fields enforce class-level privacy.

---

## 7.5 Inheritance Versus Composition

### Inheritance

Represents an “is-a” relationship.

### Composition

Builds behavior by combining smaller capabilities.

### Key things to understand

Prefer composition when:

* Features vary independently.
* Deep inheritance trees appear.
* Subclasses override large portions of parent behavior.
* Reuse does not represent a true identity relationship.

---

## 7.6 Property Descriptors

### Descriptor properties

* `value`
* `writable`
* `enumerable`
* `configurable`
* `get`
* `set`

### Key things to understand

Property descriptors control:

* Whether values can change.
* Whether properties appear during enumeration.
* Whether properties can be deleted.
* Whether access is handled through getters and setters.

---

## 7.7 Shallow and Deep Copying

### Shallow copy

Copies only the top level.

Techniques:

* Spread syntax
* `Object.assign`
* `Array.slice`

### Deep copy

Copies nested data structures.

Techniques:

* `structuredClone`
* Custom cloning
* Domain-specific mapping

### Important cautions

JSON cloning loses or changes:

* `undefined`
* Functions
* Dates
* Maps
* Sets
* Circular references
* Special numeric values

---

# 8. Arrays and Data Transformation

## Topic importance

Frontend applications constantly transform server responses, lists, tables, forms, and UI state.

## 8.1 Array Mutation Methods

### Common mutation methods

* `push`
* `pop`
* `shift`
* `unshift`
* `splice`
* `sort`
* `reverse`

### Key things to understand

* These methods modify the original array.
* Mutation can cause bugs in React state and Redux reducers.
* `sort()` mutates the array.
* Copy before sorting immutable state.

---

## 8.2 Non-Mutating Methods

### Common methods

* `map`
* `filter`
* `reduce`
* `slice`
* `concat`
* `flat`
* `flatMap`
* `toSorted`
* `toReversed`
* `toSpliced`

### Key things to understand

* Prefer non-mutating transformations for state.
* Choose the method that best communicates intention.
* Avoid using `reduce` for everything merely because it is flexible.

---

## 8.3 `map`

### Purpose

Transforms every item and returns a new array.

### Important points

* Result length normally matches input length.
* Do not use `map` purely for side effects.
* Return values consistently.

---

## 8.4 `filter`

### Purpose

Keeps values that match a condition.

### Important points

* Returns a new array.
* Does not change original items.
* Filtering large collections repeatedly may need memoization or indexing.

---

## 8.5 `reduce`

### Purpose

Combines a list into another value.

Possible results:

* Number
* Object
* Map
* Grouped data
* Tree
* Array

### Important points

* Always consider an explicit initial value.
* Keep reducers readable.
* Break complex reductions into named helper functions.

---

## 8.6 Map and Set

### Map

Useful when:

* Keys are not limited to strings.
* Insertion order matters.
* Frequent additions and deletions occur.
* Key-value semantics are important.

### Set

Useful for:

* Unique values
* Fast membership checks
* Removing duplicates

### Important caution

React state containing Map or Set still requires immutable replacement to trigger predictable updates.

---

# 9. Asynchronous JavaScript and Event Loop

## Topic importance

Frontend applications depend on timers, events, network requests, promises, rendering, and user interactions.

## 9.1 Synchronous Execution

### Key things

* JavaScript executes normal statements sequentially.
* Long-running synchronous code blocks the main thread.
* While blocked, the browser cannot respond smoothly to input or render updates.

---

## 9.2 Browser APIs

### Examples

* Timers
* Fetch
* DOM events
* Geolocation
* Web Workers
* Intersection Observer

### Key things to understand

* Browser APIs are not part of the JavaScript language itself.
* They allow work to happen outside the current call stack.
* Their callbacks are scheduled for later execution.

---

## 9.3 Task Queue

### Examples of tasks

* Timer callbacks
* User events
* Message events
* Some network-related callbacks

### Key things

* A task executes only when the call stack is empty.
* Timer duration represents a minimum delay, not exact execution time.

---

## 9.4 Microtask Queue

### Examples

* Promise callbacks
* `queueMicrotask`
* Mutation Observer callbacks

### Key things

* Microtasks normally run before the next task.
* The microtask queue is drained after the current stack finishes.
* Too many microtasks can delay rendering and task processing.

---

## 9.5 Rendering Opportunity

### Key things

The browser may render between tasks when:

* The main thread is available.
* Rendering is required.
* The browser decides it is the appropriate time.

### Important caution

A long task or endless microtask chain can delay paint.

---

## 9.6 Timers

### Important things

* `setTimeout` does not guarantee exact timing.
* Nested timers may be clamped.
* Background tabs may have stronger timer throttling.
* Clear unused timers.

---

## 9.7 Promise Execution Order

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Output:

```text
A
D
C
B
```

### Reason

1. Synchronous code executes.
2. Promise callback enters microtask queue.
3. Timer callback enters task queue.
4. Microtasks execute before the next task.

---

# 10. Promises, Async/Await, and Request Control

## Topic importance

Reliable asynchronous architecture requires more than writing `await`. You need error handling, cancellation, concurrency control, deduplication, and race-condition management.

## 10.1 Promise States

### States

* Pending
* Fulfilled
* Rejected

### Key things

* A promise changes state only once.
* A fulfilled or rejected promise is settled.
* Promise handlers execute asynchronously through the microtask queue.

---

## 10.2 Promise Chaining

### Important things

* Return values flow into the next `.then`.
* Returned promises are awaited by the chain.
* Throwing creates rejection.
* Missing `return` can break sequencing.

---

## 10.3 Error Propagation

### Key things

* Errors travel down the promise chain until handled.
* A `catch` may recover by returning a normal value.
* Throwing inside `catch` continues rejection.
* `finally` is for cleanup, not replacing the result.

---

## 10.4 Async Functions

### Important things

* An `async` function always returns a promise.
* Returning a value creates a fulfilled promise.
* Throwing creates a rejected promise.

---

## 10.5 Await

### Key things

* `await` pauses only the current async function.
* It does not block the entire browser thread.
* Code after `await` continues as a microtask.
* Independent requests should not be awaited sequentially without reason.

### Sequential

```js
const user = await getUser();
const orders = await getOrders();
```

### Parallel

```js
const [user, orders] = await Promise.all([
  getUser(),
  getOrders(),
]);
```

---

## 10.6 Promise Combinators

### `Promise.all`

Use when:

* Every result is required.
* One failure should reject the complete operation.

### `Promise.allSettled`

Use when:

* Every outcome must be inspected.
* Partial failure is acceptable.

### `Promise.race`

Use when:

* The first settled result should win.
* Implementing timeout-like behavior.

### `Promise.any`

Use when:

* The first successful result should win.
* Rejections should be ignored until every option fails.

---

## 10.7 Request Cancellation

### Important concepts

* `AbortController`
* `AbortSignal`
* Component cleanup
* Navigation cancellation
* Search cancellation

### Key things

* Cancellation prevents unnecessary work and stale updates.
* Pass the same signal through relevant layers.
* Distinguish cancellation from actual failure.
* Do not display alarming error messages for intentional aborts.

---

## 10.8 Race Conditions

### Common example

A user searches:

1. `"rea"`
2. `"react"`

The first request may finish after the second and replace the newer result.

### Solutions

* Abort the previous request.
* Track request IDs.
* Compare current query before updating.
* Use server-state libraries with cancellation and cache keys.

---

## 10.9 Retry

### Important things

Retry only when failures may be temporary.

Potentially retryable:

* Network interruptions
* Timeout
* Some server errors
* Rate limiting, with server guidance

Normally not retryable:

* Validation errors
* Authentication failures
* Permission errors
* Invalid requests

### Key strategies

* Exponential backoff
* Jitter
* Retry limits
* Respect `Retry-After`
* Idempotency awareness

---

## 10.10 Concurrency Limiting

### Important use cases

* File uploads
* Bulk requests
* Data processing
* Image loading
* Background synchronization

### Key things

Do not start thousands of requests simultaneously. Use a queue or promise pool that limits active work.

---

# 11. Browser Architecture

## Topic importance

Understanding browser internals helps explain rendering performance, memory behavior, security boundaries, workers, and UI responsiveness.

## 11.1 Browser Processes

### Main process categories

* Browser process
* Renderer process
* Network process
* GPU process
* Utility processes

### Important things

* Browsers isolate work into processes.
* A renderer process usually handles a page or group of related pages.
* Process isolation improves stability and security.
* Crashing one renderer should not necessarily crash the entire browser.

---

## 11.2 Main Thread

### Responsibilities

* JavaScript execution
* DOM manipulation
* Style calculation
* Layout
* Paint preparation
* Event handling

### Key things

* Heavy JavaScript blocks rendering and input.
* Long tasks create poor interaction responsiveness.
* Work should be divided or moved away from the main thread where appropriate.

---

## 11.3 Web Workers

### Important things

* Workers execute JavaScript on another thread.
* Workers cannot directly access the DOM.
* Communication uses message passing.
* Data may be cloned or transferred.
* Workers are suitable for CPU-heavy computations.

### Good use cases

* Parsing large files
* Data transformation
* Image processing
* Search indexing
* Complex calculations

---

## 11.4 Site Isolation and Sandboxing

### Key things

* Different origins may be separated into different renderer processes.
* Sandboxing limits what renderer processes can access.
* Browser security relies on several isolation layers.
* Same-origin rules remain essential even with process isolation.

---

# 12. Browser Rendering Pipeline

## Topic importance

Rendering knowledge helps optimize animations, layouts, large pages, responsive interfaces, and interaction performance.

## 12.1 DOM Construction

### Important things

* HTML is parsed incrementally.
* Elements become DOM nodes.
* Scripts may pause parsing depending on how they are loaded.
* Invalid HTML may be corrected by browser parsing rules.

---

## 12.2 CSSOM Construction

### Important things

* CSS rules are parsed into the CSS Object Model.
* The browser needs styling information to render correctly.
* CSS can block initial rendering.
* Complex selectors may increase style calculation work, although real-world impact depends on scale.

---

## 12.3 Render Tree

### Important things

* DOM and CSSOM contribute to the render tree.
* Non-visible elements such as `display: none` are excluded.
* The render tree represents elements that require visual output.

---

## 12.4 Style Calculation

### Important things

The browser determines:

* Which CSS rules match
* Inheritance
* Cascade
* Computed values
* Custom property resolution

### Performance concerns

* Large DOM
* Frequent class changes
* Complex style dependencies
* Repeated changes across many elements

---

## 12.5 Layout

### Important things

Layout calculates:

* Position
* Width
* Height
* Geometry
* Relationship between elements

### Layout-triggering changes

* Width
* Height
* Margin
* Padding
* Font size
* Content changes
* Positioning changes

---

## 12.6 Paint

### Important things

Paint creates drawing instructions for:

* Text
* Borders
* Backgrounds
* Shadows
* Images
* Decorations

### Paint-heavy patterns

* Large shadows
* Complex clipping
* Large painted regions
* Frequent visual changes

---

## 12.7 Compositing

### Important things

* Layers are combined into the final page.
* `transform` and `opacity` can often be handled at the compositing stage.
* Separate layers may improve animation smoothness.
* Too many layers increase memory usage.

---

## 12.8 Layout Thrashing

### Problem pattern

1. Read layout.
2. Change style.
3. Read layout again.
4. Change style again.

This may force repeated synchronous layout calculations.

### Better approach

* Batch reads.
* Batch writes.
* Use `requestAnimationFrame`.
* Avoid mixing measurement and mutation repeatedly.

---

# 13. Networking Fundamentals

## Topic importance

Frontend engineers need to understand what happens between the browser, CDN, load balancer, API gateway, BFF, and backend services.

## 13.1 URL Processing

### Important components

* Protocol
* Host
* Port
* Path
* Query string
* Fragment

### Key things

* Fragments are generally not sent to the server.
* Query parameters are part of the request URL.
* Sensitive information should not be placed in URLs.
* URLs may be logged by browsers, servers, analytics, and proxies.

---

## 13.2 DNS

### Important things

* DNS converts domain names into IP addresses.
* Results may be cached at multiple levels.
* DNS lookup adds latency when uncached.
* CDNs may use DNS to route users to nearby infrastructure.

---

## 13.3 TCP

### Important things

* TCP provides ordered, reliable data delivery.
* Connections require setup.
* Lost packets may be retransmitted.
* Connection reuse reduces repeated setup cost.

---

## 13.4 TLS and HTTPS

### Important things

HTTPS provides:

* Encryption
* Integrity
* Server identity verification

### Key concepts

* Certificates
* Certificate authorities
* Handshake
* Session reuse
* Secure transport

### Important caution

HTTPS does not make application logic secure by itself. XSS, CSRF, insecure authorization, and data exposure can still exist.

---

## 13.5 HTTP Methods

### Methods

* GET
* POST
* PUT
* PATCH
* DELETE
* OPTIONS
* HEAD

### Key things

* GET should retrieve data.
* POST usually creates or triggers processing.
* PUT generally replaces a complete resource.
* PATCH applies partial updates.
* DELETE removes a resource.
* OPTIONS is often used for CORS preflight.

---

## 13.6 Idempotency

### Important definition

An operation is idempotent when repeating it produces the same intended server state.

### Important use cases

* Payment submission
* Case creation
* Order creation
* Retryable mutations

### Key strategy

Use idempotency keys for operations that must not be duplicated.

---

## 13.7 Status Codes

### Important groups

* `2xx`: success
* `3xx`: redirection
* `4xx`: client-side request or access issue
* `5xx`: server-side issue

### Important status examples

* `200`: success
* `201`: created
* `204`: success without response body
* `304`: cached resource still valid
* `400`: bad request
* `401`: unauthenticated
* `403`: authenticated but forbidden
* `404`: resource not found
* `409`: conflict
* `422`: validation failure
* `429`: rate limited
* `500`: server error
* `502`: bad gateway
* `503`: unavailable
* `504`: gateway timeout

### Key things

Do not handle every failure with the same generic message.

---

## 13.8 HTTP Headers

### Request headers

* `Authorization`
* `Accept`
* `Content-Type`
* `If-None-Match`
* `Origin`
* `Cookie`

### Response headers

* `Cache-Control`
* `Content-Type`
* `ETag`
* `Set-Cookie`
* `Content-Encoding`
* CORS headers

### Key things

* `Content-Type` describes the sent body.
* `Accept` describes acceptable response types.
* Authorization tokens and cookies serve different transport patterns.

---

## 13.9 HTTP/2 and HTTP/3 Concepts

### HTTP/2

Important concepts:

* Multiplexing
* Header compression
* Stream-based communication
* Connection reuse

### HTTP/3

Important concepts:

* Built on QUIC
* Uses UDP underneath
* Faster connection establishment in many situations
* Better handling of packet loss across streams

### Key thing

Protocol improvements do not remove the need to reduce unnecessary requests and waterfalls.

---

# 14. Browser Caching

## Topic importance

Correct caching improves loading speed, reduces backend traffic, and creates more responsive interfaces.

## 14.1 Cache Layers

### Possible cache locations

* Browser memory cache
* Browser disk cache
* Service Worker cache
* CDN cache
* Reverse proxy cache
* Backend cache
* Application-level cache

### Key things

Different cache layers have different ownership, lifetime, and invalidation rules.

---

## 14.2 Cache-Control

### Important directives

* `max-age`
* `s-maxage`
* `no-cache`
* `no-store`
* `private`
* `public`
* `immutable`
* `must-revalidate`
* `stale-while-revalidate`

### Critical distinction

* `no-cache`: may store but must revalidate before reuse.
* `no-store`: do not store the response.

---

## 14.3 Validation Headers

### ETag

* Server assigns a version identifier.
* Browser sends `If-None-Match`.
* Server returns `304` when unchanged.

### Last-Modified

* Server provides modification time.
* Browser sends `If-Modified-Since`.

### Key thing

ETags can offer more precise validation than timestamps.

---

## 14.4 Static Asset Strategy

### Recommended pattern

For versioned JavaScript, CSS, and images:

* Filename contains a content hash.
* Use a long cache lifetime.
* Mark as immutable.

Example:

```text
main.a8f91c.js
```

A content change creates a different filename.

---

## 14.5 HTML Caching Strategy

### Important things

HTML often references the latest asset files.

Therefore:

* Avoid excessively long immutable caching for HTML.
* Allow revalidation.
* Ensure users receive updated asset references after deployment.

---

# 15. Storage, Cookies, and Client Persistence

## Topic importance

Storage decisions affect authentication, security, performance, offline behavior, and multi-tab coordination.

## 15.1 Cookies

### Important attributes

* `HttpOnly`
* `Secure`
* `SameSite`
* `Domain`
* `Path`
* `Expires`
* `Max-Age`

### `HttpOnly`

* Prevents JavaScript access.
* Reduces token theft through direct script access.
* Does not prevent all XSS impact.

### `Secure`

* Cookie is sent only over HTTPS.

### `SameSite`

Values:

* `Strict`
* `Lax`
* `None`

### Important things

* `SameSite=None` normally requires `Secure`.
* Domain configuration affects subdomain sharing.
* Cookies are automatically included only when request rules match.
* Cross-origin requests may require credential configuration.

---

## 15.2 Local Storage

### Important things

* Persists across browser sessions.
* Shared by tabs under the same origin.
* Synchronous API.
* Accessible to JavaScript.
* Vulnerable to theft when XSS exists.
* Suitable for non-sensitive preferences and cached state.

---

## 15.3 Session Storage

### Important things

* Scoped to a browsing context or tab.
* Usually cleared when the tab closes.
* Not automatically shared like local storage.
* Accessible to JavaScript.

---

## 15.4 IndexedDB

### Important things

* Asynchronous storage.
* Supports structured data.
* Suitable for larger datasets.
* Can support offline applications.
* More complex than local storage.
* Requires schema and migration planning.

---

## 15.5 Cache Storage

### Important things

* Commonly used with Service Workers.
* Stores request-response pairs.
* Useful for offline resource strategies.
* Requires explicit invalidation and versioning.

---

## 15.6 Multi-Tab Synchronization

### Possible techniques

* `storage` event
* BroadcastChannel
* Shared Worker
* Service Worker messaging
* Backend session checks

### Use cases

* Logout synchronization
* Token or session state changes
* Draft updates
* Feature-state coordination

---

# 16. Same-Origin Policy and CORS

## Topic importance

This topic is essential for applications running on different domains, subdomains, ports, and backend environments.

## 16.1 Origin

An origin consists of:

* Protocol
* Host
* Port

These are different origins:

```text
https://example.com
http://example.com
https://api.example.com
https://example.com:4300
```

---

## 16.2 Same-Origin Policy

### Important things

* Restricts how one origin interacts with another.
* Protects users from malicious websites reading sensitive data from authenticated sites.
* Applies to browser-controlled access.
* Does not prevent all cross-origin requests from being sent.
* Often prevents JavaScript from reading the response.

---

## 16.3 Simple CORS Request

A request may avoid preflight when it meets strict conditions regarding:

* Method
* Headers
* Content type

### Important caution

“Simple” does not mean automatically permitted. The server still needs appropriate CORS headers.

---

## 16.4 Preflight Request

### Important things

* Browser sends `OPTIONS`.
* Browser asks whether the actual request is permitted.
* Server responds with allowed methods, origins, and headers.
* The browser then decides whether to send the actual request.

---

## 16.5 Credentials

### Frontend configuration

```js
fetch(url, {
  credentials: "include",
});
```

### Server requirements

* Explicit allowed origin
* `Access-Control-Allow-Credentials: true`
* Correct cookie attributes
* Correct domain and path

### Important restriction

Credentialed CORS requests cannot use `Access-Control-Allow-Origin: *`.

---

## 16.6 Common CORS Failures

* Missing allowed origin
* Wildcard origin with credentials
* Missing allowed custom header
* Backend not handling `OPTIONS`
* Cookie blocked by `SameSite`
* Incorrect frontend credential mode
* Redirect response missing required CORS headers
* Different environment configuration

---

# 17. HTML Fundamentals and Semantics

## Topic importance

HTML provides structure, accessibility, browser behavior, SEO signals, and native interaction.

## 17.1 Document Structure

### Important elements

* `html`
* `head`
* `body`
* `title`
* `meta`
* `link`
* `script`

### Key things

* Define language using `lang`.
* Provide proper character encoding.
* Configure responsive viewport behavior.
* Use meaningful page titles.

---

## 17.2 Semantic Elements

### Important elements

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`

### Key things

* Semantics describe purpose.
* Screen readers use landmarks for navigation.
* Do not choose elements only based on default appearance.

---

## 17.3 Headings

### Important things

* Use headings to represent document hierarchy.
* Do not select heading levels solely for font size.
* Avoid skipping levels without a structural reason.
* Each major section should have a meaningful heading.

---

## 17.4 Buttons Versus Links

### Button

Use for:

* Actions
* Form submission
* Opening dialogs
* Toggling state

### Link

Use for:

* Navigation
* Moving to another page
* Moving to another document section

### Key thing

A clickable `div` does not automatically provide keyboard and accessibility behavior.

---

## 17.5 Forms

### Important elements

* `form`
* `label`
* `input`
* `select`
* `textarea`
* `fieldset`
* `legend`
* `button`

### Key things

* Every input needs an accessible name.
* Labels should be programmatically associated.
* Placeholder is not a label.
* Group related controls with `fieldset` and `legend`.
* Display errors near fields and connect them programmatically.
* Prevent accidental duplicate submission.

---

## 17.6 Tables

### Important elements

* `table`
* `caption`
* `thead`
* `tbody`
* `tr`
* `th`
* `td`

### Key things

* Use tables for tabular data.
* Use header cells correctly.
* Provide captions where helpful.
* Support keyboard and screen-reader interaction for interactive tables.

---

## 17.7 Dialogs

### Important things

A modal dialog requires:

* Accessible name
* Focus movement into dialog
* Focus containment
* Escape-to-close behavior where appropriate
* Focus restoration
* Background interaction prevention
* Clear close action

---

# 18. Accessibility

## Topic importance

Accessibility is part of software correctness. An interface that excludes keyboard or assistive-technology users is incomplete.

## 18.1 WCAG Principles

### Perceivable

Users must be able to perceive content.

### Operable

Users must be able to operate controls.

### Understandable

Interfaces and content should behave predictably.

### Robust

Content should work with browsers and assistive technologies.

---

## 18.2 Keyboard Navigation

### Important things

* Every interactive control must be keyboard accessible.
* Tab order should follow logical visual order.
* Avoid positive `tabindex` values.
* Support Enter and Space according to expected control behavior.
* Do not create keyboard traps.

---

## 18.3 Focus Management

### Important things

Manage focus during:

* Dialog opening
* Dialog closing
* Route changes
* Dynamic content
* Validation failure
* Deleted elements
* Menu opening

### Key thing

Do not move focus unexpectedly without a clear user-action reason.

---

## 18.4 ARIA

### Important rules

* Prefer native HTML first.
* Do not add ARIA when native behavior already exists.
* ARIA changes accessibility semantics, not actual behavior.
* A custom button still needs keyboard handling even with `role="button"`.

---

## 18.5 Live Regions

### Use cases

* Success messages
* Error notifications
* Dynamic search counts
* Background operation status

### Important things

* Use polite announcements for normal updates.
* Use assertive announcements sparingly.
* Avoid announcing constantly changing content.

---

## 18.6 Colour Contrast

### Important things

* Text must remain readable.
* Disabled text should still be understandable.
* Do not communicate status only with colour.
* Focus indicators require sufficient visibility.
* Test light and dark themes separately.

---

## 18.7 Reduced Motion

### Important things

Respect:

```css
@media (prefers-reduced-motion: reduce) {
}
```

Reduce or remove:

* Large movement
* Parallax
* Continuous animations
* Flashing effects
* Motion-heavy transitions

---

# 19. CSS Fundamentals

## Topic importance

CSS mastery requires understanding layout rules, the cascade, sizing, stacking, and rendering—not just memorizing properties.

## 19.1 Cascade

### Important factors

* Origin
* Importance
* Cascade layer
* Specificity
* Source order

### Key things

* The cascade determines which declaration wins.
* `!important` should not be the default solution.
* Cascade layers can help separate reset, base, component, and utility rules.

---

## 19.2 Specificity

### General order

* Inline styles
* IDs
* Classes, attributes, and pseudo-classes
* Elements and pseudo-elements

### Important things

* High specificity makes overrides difficult.
* Avoid deeply nested selectors.
* Prefer predictable component ownership.

---

## 19.3 Inheritance

### Important things

Some properties naturally inherit:

* Colour
* Font
* Line height

Others generally do not:

* Margin
* Padding
* Border
* Width

### Key thing

Use `inherit`, `initial`, `unset`, and `revert` intentionally.

---

## 19.4 Box Model

### Components

* Content
* Padding
* Border
* Margin

### `box-sizing`

Use:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

This usually makes sizing more predictable.

---

## 19.5 Display Types

### Important values

* `block`
* `inline`
* `inline-block`
* `flex`
* `grid`
* `none`
* `contents`

### Key things

Each display type changes:

* Layout participation
* Sizing
* Child layout
* Line behavior

---

## 19.6 Positioning

### Values

* `static`
* `relative`
* `absolute`
* `fixed`
* `sticky`

### Important things

* Absolutely positioned elements use a containing block.
* Fixed positioning may behave differently inside transformed ancestors.
* Sticky requires appropriate scroll conditions.
* Overusing absolute positioning creates fragile layouts.

---

## 19.7 Stacking Context

### Common stacking-context triggers

* Positioned element with `z-index`
* `opacity` below 1
* `transform`
* `filter`
* `isolation`
* Certain flex and grid items
* `will-change`

### Key thing

A child cannot escape its parent stacking context merely by using a very large `z-index`.

---

# 20. Flexbox

## Topic importance

Flexbox is the primary one-dimensional layout system for rows, columns, alignment, and distributing available space.

## 20.1 Main and Cross Axis

### Important things

* `flex-direction` defines the main axis.
* `justify-content` controls the main axis.
* `align-items` controls the cross axis.
* Axis meaning changes with direction.

---

## 20.2 Flex Sizing

### Important properties

* `flex-grow`
* `flex-shrink`
* `flex-basis`
* `flex`

### Key things

* `flex-basis` defines the initial main-size basis.
* Shrinking behavior is influenced by intrinsic content size.
* `min-width: auto` can prevent expected shrinking.
* `min-width: 0` often fixes overflowing flex children.

---

## 20.3 Alignment

### Important properties

* `justify-content`
* `align-items`
* `align-self`
* `align-content`
* `gap`

### Important distinction

`align-content` matters when multiple flex lines exist.

---

## 20.4 Wrapping

### Important things

* `flex-wrap` allows multiple lines.
* Wrapping may create uneven layouts.
* Grid may be better when row and column alignment both matter.

---

# 21. CSS Grid

## Topic importance

Grid is designed for two-dimensional layouts where rows and columns need coordinated control.

## 21.1 Grid Container

### Important properties

* `grid-template-columns`
* `grid-template-rows`
* `gap`
* `grid-auto-flow`
* `grid-auto-columns`
* `grid-auto-rows`

---

## 21.2 Grid Sizing

### Important units and functions

* `fr`
* `minmax`
* `repeat`
* `auto-fit`
* `auto-fill`
* `min-content`
* `max-content`

### Key things

* `fr` distributes remaining space.
* `minmax` creates flexible limits.
* `auto-fit` and `auto-fill` behave differently with empty tracks.
* Intrinsic sizing is important for content-aware layouts.

---

## 21.3 Placement

### Important properties

* `grid-column`
* `grid-row`
* Named lines
* Grid areas

### Key things

* Explicit placement can improve layout clarity.
* Avoid creating visual order that conflicts with DOM and keyboard order.

---

## 21.4 Subgrid

### Important things

* Allows nested layouts to align with parent grid tracks.
* Useful for cards and forms requiring consistent internal alignment.
* Verify browser support according to project requirements.

---

# 22. Responsive Design

## Topic importance

Responsive design must account for screen size, container size, input method, content size, and user preferences.

## 22.1 Mobile-First Design

### Important things

* Start with essential content and behavior.
* Add enhancements for larger layouts.
* Avoid assuming mobile means lower capability.
* Consider touch target size and mobile keyboard behavior.

---

## 22.2 Media Queries

### Important query types

* Width
* Height
* Orientation
* Resolution
* Hover support
* Pointer precision
* Reduced motion
* Colour scheme

### Key things

Do not base every breakpoint on specific device models. Choose breakpoints where the layout requires change.

---

## 22.3 Container Queries

### Important things

* Components respond to available container space.
* Useful for reusable components in different layouts.
* Reduces dependency on global viewport breakpoints.
* Requires intentional containment configuration.

---

## 22.4 Responsive Units

### Important units

* `%`
* `em`
* `rem`
* `vw`
* `vh`
* `dvh`
* `svh`
* `lvh`
* `ch`
* `clamp`

### Key things

* Use `rem` for scalable typography and spacing.
* Use dynamic viewport units carefully on mobile.
* `clamp` can create fluid values with minimum and maximum limits.

---

## 22.5 Responsive Images

### Important tools

* `srcset`
* `sizes`
* `picture`
* Modern image formats
* Lazy loading

### Key things

* Avoid serving desktop-sized images to small screens.
* Provide dimensions to reduce layout shifts.
* Use art direction when crops need to change across layouts.

---

# 23. CSS Architecture and Design Tokens

## Topic importance

Large applications need predictable styling, theming, component ownership, and reusable design decisions.

## 23.1 Styling Approaches

### Common approaches

* Global CSS
* BEM
* CSS Modules
* Utility CSS
* CSS-in-JS
* Vanilla Extract-style static CSS
* Component library styling systems

### Evaluation criteria

* Runtime cost
* Isolation
* Theming
* Developer experience
* Type safety
* Server rendering
* Bundle size
* Maintainability
* Design-system integration

---

## 23.2 Design Tokens

### Token layers

#### Primitive tokens

Examples:

* Raw colours
* Spacing values
* Font sizes
* Radii
* Shadows

#### Semantic tokens

Examples:

* Background primary
* Text secondary
* Border danger
* Action hover
* Surface elevated

#### Component tokens

Examples:

* Button background
* Input border
* Modal elevation

### Key things

* Components should consume semantic tokens.
* Avoid directly using raw colour values everywhere.
* Dark mode should remap semantic meaning rather than individually overriding components.

---

## 23.3 Theming

### Important things

* Use CSS custom properties where appropriate.
* Support system theme and explicit user preference.
* Avoid flashes of incorrect theme.
* Store theme preference safely.
* Ensure every token has a dark-theme equivalent.

---

# 24. TypeScript Fundamentals

## Topic importance

TypeScript improves correctness, refactoring, API clarity, and developer tooling, but only when its type model is properly understood.

## 24.1 Compile-Time Versus Runtime

### Key things

* TypeScript checks code during development or build.
* Types are removed from emitted JavaScript.
* TypeScript cannot automatically validate backend responses.
* Runtime validation is still required for untrusted data.

---

## 24.2 Type Inference

### Important things

* TypeScript can infer many types.
* Avoid redundant annotations.
* Add explicit types at important boundaries.
* Inference may widen literals unless constrained.

---

## 24.3 Structural Typing

### Important definition

Types are compatible based on their structure.

```ts
type User = {
  name: string;
};

const value = {
  name: "Hira",
  age: 30,
};

const user: User = value;
```

This is usually allowed because the required structure exists.

---

## 24.4 `any`, `unknown`, and `never`

### `any`

* Disables type checking.
* Spreads unsafety through code.
* Should be limited to controlled migration boundaries.

### `unknown`

* Represents an unknown value safely.
* Requires narrowing before use.

### `never`

Represents:

* Impossible values
* Functions that never return
* Exhaustiveness failures

---

## 24.5 Union Types

### Important things

Union types represent one of several possibilities.

```ts
type Status = "idle" | "loading" | "success" | "error";
```

### Benefits

* Prevent invalid strings.
* Improve autocomplete.
* Support domain modeling.

---

## 24.6 Intersection Types

### Important things

Intersection types combine requirements.

```ts
type Timestamped = {
  createdAt: string;
};

type User = {
  name: string;
};

type TimestampedUser = User & Timestamped;
```

### Caution

Conflicting property types may create impossible types.

---

# 25. Type Narrowing and Domain Modeling

## Topic importance

Narrowing allows TypeScript to safely determine which member of a union is being used.

## 25.1 Built-in Narrowing

### Techniques

* `typeof`
* `instanceof`
* `in`
* Equality checks
* Truthiness checks

### Important caution

Truthiness narrowing can accidentally treat valid values such as `0` and `""` as absent.

---

## 25.2 Discriminated Unions

### Example

```ts
type RequestState =
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; message: string };
```

### Key things

* Each state has a common discriminant.
* Each state contains only relevant properties.
* Impossible state combinations are prevented.

---

## 25.3 Exhaustiveness Checking

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
```

### Key benefit

New domain states cause compiler errors until every required branch is handled.

---

## 25.4 User-Defined Type Guards

```ts
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value
  );
}
```

### Important caution

A wrong type guard misleads the compiler. It must validate accurately.

---

# 26. TypeScript Generics

## Topic importance

Generics preserve relationships between inputs and outputs while supporting reusable abstractions.

## 26.1 Generic Functions

```ts
function identity<T>(value: T): T {
  return value;
}
```

### Key things

* `T` represents a type chosen during usage.
* TypeScript can often infer it.
* Generics preserve exact information that `unknown` or broad unions may lose.

---

## 26.2 Generic Constraints

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}
```

### Key things

Constraints ensure a required minimum structure while preserving additional fields.

---

## 26.3 `keyof`

```ts
function getProperty<T, K extends keyof T>(
  object: T,
  key: K
): T[K] {
  return object[key];
}
```

### Key things

* `keyof` produces valid property names.
* Indexed access returns the corresponding property type.
* This pattern helps build safe reusable utilities.

---

## 26.4 Generic Components

Useful for:

* Tables
* Select controls
* Forms
* List renderers
* API clients
* Cache utilities

### Important caution

Do not create generic APIs so abstract that ordinary usage becomes difficult.

---

# 27. Advanced TypeScript

## Topic importance

Advanced types help model libraries, domain APIs, reusable components, and strongly typed configuration.

## 27.1 Mapped Types

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

### Important uses

* Making properties optional
* Making properties read-only
* Transforming value types
* Creating form-state models

---

## 27.2 Conditional Types

```ts
type IsString<T> = T extends string ? true : false;
```

### Important things

* Behave like type-level conditions.
* May distribute over union types.
* Can become difficult to understand when deeply nested.

---

## 27.3 `infer`

```ts
type PromiseValue<T> =
  T extends Promise<infer U> ? U : T;
```

### Key things

`infer` extracts a type from a matched structure.

---

## 27.4 Template Literal Types

```ts
type EventName<T extends string> = `${T}Changed`;
```

### Use cases

* Event APIs
* Route definitions
* CSS property conventions
* Typed translation keys

---

## 27.5 Branded Types

```ts
type UserId = string & {
  readonly __brand: "UserId";
};

type OrderId = string & {
  readonly __brand: "OrderId";
};
```

### Benefit

Prevents accidentally passing one string-based identifier where another is expected.

---

## 27.6 Recursive Types

Useful for:

* Trees
* Nested form definitions
* JSON values
* Menu structures
* Workflow graphs

### Important caution

Deep recursive types can slow the compiler and reduce readability.

---

# 28. Runtime Validation and API Contracts

## Topic importance

TypeScript interfaces do not prove that server data is valid.

## 28.1 Trust Boundaries

Treat as untrusted:

* API responses
* Local storage
* URL parameters
* User input
* PostMessage events
* Third-party SDK output
* AI-generated structured output

---

## 28.2 Parsing Versus Casting

### Casting

```ts
const user = response as User;
```

This does not validate anything.

### Parsing

Checks the actual runtime structure and returns either:

* Valid domain data
* Structured validation errors

---

## 28.3 DTO and Domain Model Separation

### DTO

Represents backend transport shape.

### Domain model

Represents frontend business meaning.

### Key things

A mapping layer can handle:

* Date conversion
* Field renaming
* Null handling
* Version compatibility
* Derived values
* Backend inconsistencies

---

## 28.4 Contract Synchronization

Possible approaches:

* OpenAPI-generated clients
* Shared schema packages
* JSON Schema
* Runtime schema libraries
* Consumer-driven contract tests

### Important caution

Shared contracts should not tightly couple frontend release timing to every backend implementation detail.

---

# 29. React Mental Model

## Topic importance

React should be understood as a rendering and state coordination model, not merely a collection of hooks.

## 29.1 Components

### Important things

* Components are functions or classes that describe UI.
* Function components execute during rendering.
* They should remain pure during render.
* Rendering may happen more than once.
* Do not perform irreversible side effects during render.

---

## 29.2 React Elements

### Important things

* JSX creates React elements.
* React elements are descriptions, not DOM nodes.
* They contain type, props, and child information.
* React compares descriptions to determine changes.

---

## 29.3 Render Phase

### Important things

During rendering, React:

* Calls components.
* Reads props and state.
* Produces the next element tree.
* Determines required changes.

### Critical rule

The render phase should be pure and repeatable.

---

## 29.4 Commit Phase

### Important things

During commit, React:

* Updates the DOM.
* Updates refs.
* Runs layout-related effects.
* Schedules normal effects.
* Applies changes that users can observe.

---

## 29.5 Reconciliation

### Important things

React compares the previous and next element trees.

It uses:

* Element type
* Position
* Keys
* Component identity

### Key thing

Changing element type or key can reset state.

---

## 29.6 Keys

### Important things

Keys identify list items across renders.

Good keys:

* Stable database IDs
* Stable permanent item IDs

Risky keys:

* Array index when order changes
* Random values
* Values regenerated every render

### Problems caused by unstable keys

* Lost input state
* Wrong item reuse
* Unnecessary remounting
* Broken animations
* Incorrect local state association

---

# 30. React State

## Topic importance

Correct state design prevents synchronization bugs, unnecessary rendering, and unclear ownership.

## 30.1 State Ownership

### Important questions

* Which component needs the state?
* Which components modify it?
* Which components read it?
* Does it need to survive navigation?
* Is the server the true owner?
* Should it exist in the URL?

### Key principle

Keep state as close as possible to the components that need it.

---

## 30.2 Minimal State

Do not store values that can be derived.

Bad:

```js
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
```

Better:

```js
const fullName = `${firstName} ${lastName}`;
```

---

## 30.3 State Updates

### Important things

* State updates schedule rendering.
* State does not change immediately within the current render.
* Multiple updates may be batched.
* Use functional updates when the next value depends on the previous one.

```js
setCount(previous => previous + 1);
```

---

## 30.4 Immutable Updates

### Important things

Do not mutate React state directly.

Bad:

```js
user.name = "Updated";
setUser(user);
```

Better:

```js
setUser(previous => ({
  ...previous,
  name: "Updated",
}));
```

---

## 30.5 Controlled and Uncontrolled State

### Controlled

State is managed by React.

### Uncontrolled

State is managed by the DOM or component internally.

### Key things

* Controlled components provide predictable coordination.
* Uncontrolled inputs may reduce rendering overhead.
* Component libraries may support both patterns.
* Avoid switching between controlled and uncontrolled modes.

---

## 30.6 State Machines

### Useful when

* Workflows have defined stages.
* Some transitions are invalid.
* Multiple booleans create impossible states.
* Error and retry behavior is complex.

### Example states

* Idle
* Validating
* Submitting
* Success
* Failure
* Cancelled

---

# 31. React Hooks

## Topic importance

Hooks connect component rendering with state, references, context, memoization, and external systems.

## 31.1 Rules of Hooks

### Rules

* Call hooks only at the top level.
* Call hooks from React components or custom hooks.
* Keep hook order stable.

### Why

React associates hook state with call order.

---

## 31.2 `useState`

### Best for

* Small local state
* Independent values
* Simple transitions

### Important things

* Initializer functions can avoid repeated expensive initialization.
* Functional updates prevent stale-value problems.
* State should represent meaningful domain or UI information.

---

## 31.3 `useReducer`

### Best for

* Related state transitions
* Complex updates
* Domain events
* State-machine-like behavior

### Key things

* Reducers should be pure.
* Actions should describe what happened.
* Avoid actions such as `SET_EVERYTHING` without a clear domain reason.

---

## 31.4 `useRef`

### Uses

* DOM references
* Mutable values
* Previous values
* Timer IDs
* External instances
* Latest callback reference

### Key things

* Updating a ref does not trigger rendering.
* Do not use refs as hidden replacement state when UI should update.
* Refs are useful for imperative interactions.

---

## 31.5 `useMemo`

### Purpose

Caches a calculated value between renders.

### Appropriate when

* Calculation is expensive.
* Dependencies change infrequently.
* Stable reference helps memoized children or hooks.

### Important caution

Memoization has overhead and does not guarantee permanent caching.

---

## 31.6 `useCallback`

### Purpose

Caches a function reference.

### Appropriate when

* Passing callbacks to memoized children.
* Stable callbacks are required by subscriptions or dependencies.
* Function identity has measurable impact.

### Important caution

Do not wrap every handler automatically.

---

## 31.7 Custom Hooks

### Good custom hooks

* Encapsulate reusable stateful behavior.
* Hide complex subscriptions or API coordination.
* Expose a focused and stable interface.
* Handle cleanup internally.

### Poor custom hooks

* Merely rename one call.
* Hide too much business behavior.
* Mix unrelated concerns.
* Return an excessively large object.

---

# 32. React Effects

## Topic importance

Effects are one of the most misunderstood parts of React. They should synchronize with external systems, not replace normal rendering logic.

## 32.1 Correct Effect Use Cases

Use effects for:

* Network synchronization
* Subscriptions
* Browser APIs
* Third-party widgets
* Timers
* Logging connected to committed UI state
* Manual DOM systems

---

## 32.2 Incorrect Effect Use Cases

Avoid effects for:

* Deriving values
* Updating state from other state without necessity
* Handling user events that can be handled directly
* Resetting data that can be controlled by keys or state design
* Transforming props into state automatically

---

## 32.3 Dependency Arrays

### Important things

Dependencies should include values used from the component scope.

Missing dependencies may cause:

* Stale values
* Missed synchronization
* Incorrect cleanup
* Bugs that appear only after later renders

### Important caution

Do not silence dependency warnings without understanding the actual data flow.

---

## 32.4 Cleanup

### Cleanup is required for

* Timers
* Event listeners
* Subscriptions
* Observers
* Network requests
* Third-party instances

### Key thing

Cleanup runs before the effect reruns and when the component unmounts.

---

## 32.5 Effect Race Conditions

### Common problem

Old asynchronous work finishes after new work and updates the component incorrectly.

### Solutions

* Abort old requests.
* Track active operations.
* Ignore obsolete results.
* Use a server-state library.

---

## 32.6 Strict Mode Development Behavior

### Important things

Development Strict Mode may intentionally:

* Render components more than once.
* Run effect setup and cleanup again.
* Reveal unsafe side effects.

### Key thing

Do not “fix” the duplicate behavior by disabling Strict Mode. Fix the effect design.

---

# 33. React Context

## Topic importance

Context distributes values through a component tree without manually passing props through every layer.

## 33.1 Good Context Use Cases

* Theme
* Locale
* Authentication identity
* Permission services
* Design-system configuration
* Shared infrastructure services

---

## 33.2 Context Rerender Behavior

### Important things

When the provider value changes, consumers may rerender.

### Optimization approaches

* Split contexts by responsibility.
* Split read and dispatch contexts.
* Memoize provider values where useful.
* Keep high-frequency state outside broad context providers.

---

## 33.3 Context Design

### Important things

A good context should expose:

* Clear value shape
* Safe default or explicit provider requirement
* Stable methods
* Focused responsibility

### Important caution

A single application context containing every state value becomes difficult to maintain and optimize.

---

# 34. React Forms

## Topic importance

Forms contain complicated combinations of state, validation, accessibility, server errors, dynamic fields, and submission behavior.

## 34.1 Form State Categories

* Current values
* Initial values
* Dirty state
* Touched state
* Validation errors
* Submission state
* Server errors
* Field visibility
* Field dependencies

---

## 34.2 Validation

### Types

* Field-level validation
* Form-level validation
* Schema validation
* Async validation
* Backend validation

### Key things

* Client validation improves experience.
* Backend validation is authoritative.
* Do not validate on every keystroke when it harms usability.
* Preserve backend error details in a field-friendly format.

---

## 34.3 Submission

### Important things

* Disable or guard duplicate submission.
* Show progress.
* Preserve entered values on failure.
* Focus the first invalid field when appropriate.
* Handle network and business errors separately.
* Support cancellation for long-running actions where possible.

---

## 34.4 Dynamic Forms

### Important things

* Use stable field IDs.
* Preserve values during controlled visibility changes when required.
* Support conditional validation.
* Avoid using array indexes as permanent field identity.
* Separate form schema from rendered field components.

---

# 35. React Error Handling

## Topic importance

Failure isolation prevents a small UI problem from breaking the entire application.

## 35.1 Error Boundaries

### Handle

* Errors during rendering
* Errors during certain lifecycle operations
* Errors in descendant components

### Do not automatically handle

* Event-handler errors
* Promise rejections
* Errors outside the React tree
* Server request errors unless they affect rendering

---

## 35.2 Boundary Placement

Possible levels:

* Application
* Route
* Feature
* Widget
* Plugin
* Data panel

### Key principle

Place boundaries where meaningful recovery is possible.

---

## 35.3 Recovery UI

Should provide relevant actions such as:

* Retry
* Reload section
* Return to previous page
* Open support
* Copy diagnostic ID
* Sign in again

---

# 36. React Concurrency and Suspense Concepts

## Topic importance

Modern React can prioritize work and coordinate loading boundaries to keep interfaces responsive.

## 36.1 Urgent and Non-Urgent Updates

### Urgent

* Typing
* Clicking
* Direct manipulation

### Non-urgent

* Filtering a large list
* Rendering secondary results
* Updating expensive derived UI

---

## 36.2 Transitions

### Key things

Transitions mark updates that may be deferred.

Useful for:

* Search results
* Route-like content changes
* Large filtered views
* Non-critical panel updates

### Important caution

Transitions do not make expensive code free. They improve scheduling and responsiveness.

---

## 36.3 Deferred Values

### Important things

A deferred value allows slower UI to lag behind urgent input.

Useful when:

* Input should remain responsive.
* Result rendering is expensive.
* Debouncing is not the exact desired behavior.

---

## 36.4 Suspense Boundaries

### Important things

Suspense coordinates waiting UI for supported asynchronous resources.

Good boundary design:

* Keeps navigation usable.
* Shows local fallbacks.
* Avoids replacing the whole page.
* Reveals sections progressively.

---

# 37. Frontend State Classification

## Topic importance

The correct state solution depends on what kind of state is being managed.

## 37.1 Local UI State

Examples:

* Modal open state
* Selected tab
* Expanded panel
* Temporary input state

Recommended ownership:

* Component state
* Nearby reducer

---

## 37.2 Shared Client State

Examples:

* User preferences
* Cross-feature selections
* Draft workflow state
* Application-wide configuration

Possible solutions:

* Lifted state
* Context
* Redux
* Specialized state libraries

---

## 37.3 Server State

Examples:

* Users
* Cases
* Orders
* Search results
* Dashboard data

Characteristics:

* Remote source of truth
* Asynchronous
* Cacheable
* Can become stale
* Shared by multiple screens

Recommended approach:

* Dedicated server-state management

---

## 37.4 URL State

Examples:

* Search query
* Filters
* Sort order
* Pagination
* Selected entity ID
* Current tab

### Benefits

* Shareable
* Bookmarkable
* Browser-history compatible
* Survives refresh

---

## 37.5 Persistent State

Examples:

* Theme
* Recently used items
* Drafts
* Offline queues

### Key things

Choose storage according to:

* Sensitivity
* Size
* Lifetime
* Multi-tab needs
* Offline requirements
* Synchronous performance impact

---

# 38. Redux and Redux Toolkit

## Topic importance

Redux is useful for predictable shared state, complex domain transitions, debugging, middleware, and coordinated updates.

## 38.1 Store

### Important things

* Holds application state.
* State should be serializable where possible.
* Store shape should reflect domains.
* Avoid placing transient component details globally.

---

## 38.2 Actions

### Better action style

```text
caseSubmitted
userLoggedOut
permissionLoaded
workflowStepCompleted
```

### Weaker action style

```text
setLoading
setData
setError
```

### Key thing

Actions should preferably describe domain events rather than only property assignment.

---

## 38.3 Reducers

### Important things

* Must be pure.
* Should not perform network calls.
* Should not read current time randomly.
* Should not generate unpredictable values.
* Redux Toolkit allows mutation-like syntax through Immer.

---

## 38.4 Selectors

### Important things

Selectors:

* Hide internal state shape.
* Compute derived data.
* Support memoization.
* Reduce duplication.
* Improve testability.

---

## 38.5 Normalized State

### Example

Instead of:

```ts
users: User[]
```

Use:

```ts
users: {
  ids: string[];
  entities: Record<string, User>;
}
```

### Benefits

* Fast lookup
* Easier updates
* Reduced duplication
* Better relationship handling

---

## 38.6 Middleware

### Uses

* Logging
* Analytics
* Async workflows
* Event processing
* Cross-tab synchronization
* Persistence
* Error reporting

### Important caution

Middleware should not become an invisible place containing all application business logic.

---

# 39. Server-State Management

## Topic importance

Server state requires caching, freshness rules, deduplication, invalidation, mutation coordination, and background synchronization.

## 39.1 Query Keys

### Important things

A query key should include every input that changes the result.

Example:

```ts
["users", { page, search, role }]
```

### Problems with weak keys

* Incorrect cache reuse
* Stale filters
* Data overwriting
* Hard-to-debug mismatches

---

## 39.2 Freshness and Staleness

### Important things

Define:

* How long data is fresh
* When background refetch occurs
* Whether focus triggers refetch
* Whether reconnect triggers refetch
* How long unused cache is retained

---

## 39.3 Query Deduplication

### Key thing

Multiple components requesting the same resource should ideally share the same in-flight operation and cached result.

---

## 39.4 Mutations

### Important things

A mutation may require:

* Cache update
* Invalidation
* Optimistic update
* Rollback
* Toast or user feedback
* Redirect
* Related-query refresh

---

## 39.5 Optimistic Updates

### Flow

1. Cancel relevant refetches.
2. Save previous cache.
3. Apply expected result.
4. Send mutation.
5. Roll back on failure.
6. Reconcile with server response.
7. Refetch where needed.

### Important caution

Optimistic updates are risky when:

* Server behavior is unpredictable.
* Validation is complex.
* Conflicts are common.
* The operation has serious consequences.

---

## 39.6 Pagination

### Important considerations

* Page-based versus cursor-based pagination
* Keeping previous data
* Total count
* Filter resets
* Sorting
* Caching each page
* Race-condition control

---

## 39.7 Infinite Queries

### Important considerations

* Next-page cursor
* Duplicate records
* Scroll restoration
* Memory growth
* Retry
* End-of-list detection
* Accessibility of endless scrolling

---

# 40. API Client Architecture

## Topic importance

A centralized API architecture prevents inconsistent request behavior, duplicated error handling, and tight coupling between components and backend transport.

## 40.1 Base Client

Responsibilities may include:

* Base URL
* Credentials
* Common headers
* Timeout
* Parsing
* Correlation ID
* Error normalization
* Cancellation

---

## 40.2 API Modules

Organize by domain:

```text
authApi
usersApi
casesApi
workflowApi
layoutApi
searchApi
```

### Key things

* Components should call domain-level methods.
* Avoid exposing raw endpoint details everywhere.
* Keep transport details inside the API layer.

---

## 40.3 Error Taxonomy

### Error categories

* Network error
* Timeout
* Cancellation
* Authentication error
* Authorization error
* Validation error
* Conflict
* Business-rule failure
* Server error
* Parsing error

### Key thing

Different categories need different recovery and messages.

---

## 40.4 Interceptors

Possible uses:

* Add correlation IDs
* Add authorization headers
* Refresh sessions
* Normalize errors
* Record telemetry

### Important caution

Interceptors can hide flow and create loops. Authentication retries must be tightly controlled.

---

## 40.5 DTO Mapping

### Important things

Map backend shapes into frontend models at boundaries.

Benefits:

* Consistent naming
* Date parsing
* Null normalization
* Version adaptation
* Reduced backend coupling

---

# 41. Authentication

## Topic importance

Authentication architecture affects security, routing, deep links, multi-tab behavior, refresh behavior, and every API request.

## 41.1 Authentication Versus Authorization

### Authentication

Determines who the user is.

### Authorization

Determines what the user may do.

### Critical rule

Frontend checks are for user experience. Backend enforcement is mandatory.

---

## 41.2 OAuth and OpenID Connect Concepts

### OAuth

Primarily concerned with delegated authorization.

### OpenID Connect

Adds an identity layer.

### Important concepts

* Authorization endpoint
* Token endpoint
* Client
* Resource server
* Identity provider
* Access token
* ID token
* Refresh token
* Scope
* State
* Nonce
* PKCE

---

## 41.3 Authorization Code Flow with PKCE

### High-level flow

1. Frontend creates verifier and challenge.
2. User is redirected to identity provider.
3. User authenticates.
4. Identity provider redirects back with authorization code.
5. Code is exchanged using verifier.
6. Tokens or backend session are established.

### Important things

* `state` helps protect redirect flow.
* `nonce` helps validate identity responses.
* PKCE protects intercepted authorization codes.
* Redirect URI must match configured values.

---

## 41.4 SPA Token Flow

### Characteristics

* Frontend participates in token acquisition.
* Frontend may hold access tokens.
* APIs receive bearer tokens.
* Refresh and multi-tab behavior require careful design.

### Risks and considerations

* XSS exposure
* Token storage
* Silent authentication behavior
* Expiry
* Redirect loops
* Multiple-tab coordination

---

## 41.5 Backend Session or BFF Flow

### Characteristics

* Backend performs secure code exchange.
* Browser receives a session cookie.
* Tokens remain on the backend.
* Frontend calls backend using cookies.

### Benefits

* Tokens are not directly available to frontend JavaScript.
* Backend can manage refresh securely.
* Frontend auth logic may become simpler.

### Challenges

* CSRF protection
* Cookie configuration
* CORS
* Subdomain behavior
* Session expiry
* Backend availability
* Redirect preservation

---

## 41.6 Authentication Bootstrap

### Correct startup questions

1. Which authentication mode should be used?
2. Is there already a valid application session?
3. Is authentication initialization still loading?
4. Is the current route an authentication callback?
5. Should the original deep link be preserved?
6. Should the app redirect or continue?
7. Has a redirect already been attempted?

### Key thing

Authentication initialization should be modeled as an explicit state machine.

---

## 41.7 Authentication States

Recommended states:

* Initializing
* Resolving configuration
* Checking session
* Unauthenticated
* Redirecting
* Processing callback
* Authenticated
* Refreshing session
* Session expired
* Authentication failed

### Avoid

Using only:

```ts
isAuthenticated: boolean
```

A boolean cannot represent the full lifecycle.

---

## 41.8 Deep-Link Authentication

### Required behavior

1. User opens a protected URL.
2. Application stores the complete intended destination.
3. Authentication starts.
4. Callback is processed.
5. Session is established.
6. User returns to the original destination.

### Important things

* Preserve path, query, and fragment when appropriate.
* Validate return URLs.
* Avoid open redirects.
* Prevent returning to callback routes.
* Handle deep links opened in a new tab.

---

## 41.9 Multi-Tab Authentication

### Important considerations

* One tab logs in.
* Another tab should detect the new session.
* One tab logs out.
* Other tabs should update.
* Session expiry should not trigger repeated redirects in every tab.

### Techniques

* Cookie-backed backend session
* BroadcastChannel
* Storage event
* Session-check endpoint
* Identity-provider session reuse

---

## 41.10 Session Expiry

### Important cases

* Access token expiry
* Backend session expiry
* Refresh token expiry
* Identity-provider session expiry
* Revoked permission
* Disabled user

### Key thing

These are different failures and may require different handling.

---

## 41.11 Logout

### Possible steps

* Clear local state.
* Clear server session.
* Revoke tokens when required.
* Notify other tabs.
* Reset server-state cache.
* Redirect safely.
* Optionally sign out from identity provider.

### Important design question

Determine whether logout means:

* Application-only logout
* Identity-provider logout
* Full single-sign-out

---

# 42. Authorization and Permissions

## Topic importance

Frontend authorization architecture should remain consistent, testable, and aligned with backend policy.

## 42.1 Roles

Examples:

* Admin
* Reviewer
* Approver
* Viewer

### Limitation

Role checks become rigid when permissions vary by resource or operation.

---

## 42.2 Permission-Based Checks

Examples:

* `case:create`
* `case:update`
* `workflow:approve`
* `layout:publish`

### Benefits

* More precise
* Easier to reuse
* Better for capability-driven UI
* Less coupled to role names

---

## 42.3 Resource-Level Authorization

Examples:

* User can edit cases they own.
* User can approve only within their region.
* User can view fields based on classification.

### Key thing

The frontend may need resource metadata, but the backend must enforce the rule.

---

## 42.4 Permission Loading

Possible states:

* Unknown
* Loading
* Allowed
* Denied
* Failed

### Important thing

Avoid briefly rendering restricted UI before permissions are resolved.

---

## 42.5 Route Guards

### Important things

Route guards should:

* Wait for authentication initialization.
* Wait for required permission resolution.
* Preserve intended destination.
* Avoid redirect loops.
* Render an appropriate unauthorized state.

---

# 43. Real-Time Communication

## Topic importance

Applications may need background updates, workflow progress, notifications, collaboration, or live dashboards.

## 43.1 Polling

### Best for

* Low-frequency updates
* Simple infrastructure
* Predictable endpoints
* Background job status

### Important things

* Stop when work completes.
* Use adaptive intervals.
* Pause or reduce when the tab is hidden.
* Prevent overlapping requests.
* Add backoff after failures.
* Cancel during navigation.

---

## 43.2 Long Polling

### Important things

* Server holds request until data is available or timeout occurs.
* Client immediately reconnects afterward.
* More efficient than frequent empty polling.
* Still built on repeated HTTP requests.

---

## 43.3 Server-Sent Events

### Characteristics

* Server-to-client stream
* Browser-managed reconnection support
* Text-based events
* Useful for notifications and progress streams

### Limitations

* Primarily one directional
* Authentication and proxy behavior need planning
* Event replay requires IDs and server support

---

## 43.4 WebSockets

### Characteristics

* Bidirectional persistent connection
* Suitable for collaboration, chat, and highly interactive updates

### Required design

* Authentication
* Reconnection
* Heartbeat
* Message ordering
* Deduplication
* Backpressure
* State resynchronization
* Connection recovery

---

## 43.5 Reconnection

### Important things

Use:

* Exponential backoff
* Jitter
* Maximum delay
* Online/offline awareness
* Authentication refresh
* Last-event or cursor recovery

---

## 43.6 Message Ordering and Deduplication

### Required metadata

* Event ID
* Sequence number
* Timestamp
* Entity version

### Key thing

Never assume every network event arrives exactly once and in perfect order.

---

# 44. Performance Engineering

## Topic importance

Performance is not only loading speed. It includes interaction latency, rendering cost, memory, responsiveness, and stability.

## 44.1 Measurement First

### Important tools and sources

* Browser Performance panel
* Network panel
* React Profiler
* Lighthouse-style audits
* Real User Monitoring
* Web Vitals
* Heap snapshots
* Coverage tools
* Bundle analyzers

### Key principle

Measure before and after every meaningful optimization.

---

## 44.2 Loading Performance

### Important contributors

* HTML delivery
* Critical CSS
* JavaScript size
* Request waterfalls
* Images
* Fonts
* Third-party scripts
* Backend response time
* Caching

---

## 44.3 Interaction Performance

### Common problems

* Long tasks
* Expensive React renders
* Large DOM
* Synchronous storage access
* Heavy event handlers
* Repeated layout
* Excessive main-thread JavaScript

---

## 44.4 Core User-Centric Metrics

Important categories:

* Loading performance
* Interaction responsiveness
* Visual stability

### Key things

* Measure field data when possible.
* Different devices and networks produce different results.
* An average can hide poor experiences for slower users.

---

## 44.5 Performance Budgets

Possible budgets:

* Initial JavaScript size
* Total transferred bytes
* Maximum long-task duration
* Largest image size
* Route loading time
* Interaction latency
* DOM node count

### Key thing

Budgets should be enforced in CI or monitoring, not only written in documentation.

---

# 45. React Performance

## Topic importance

React optimization should target real expensive work, not simply the number of renders.

## 45.1 Rerenders

A component may render because:

* Its state changed.
* Its parent rendered.
* Its context changed.
* An external store subscription changed.
* Its key changed.

### Key thing

Rendering is normal. Expensive unnecessary rendering is the problem.

---

## 45.2 Component Boundaries

### Important things

* Keep frequently changing state close to its usage.
* Separate expensive static regions from dynamic regions.
* Avoid lifting state higher than required.
* Avoid huge components that recalculate everything.

---

## 45.3 Memoization

### Tools

* `React.memo`
* `useMemo`
* `useCallback`
* Memoized selectors

### Appropriate when

* Render or calculation is expensive.
* Props remain stable often enough.
* Profiling shows meaningful benefit.

### Inappropriate when

* Component is cheap.
* Props always change.
* Comparison cost exceeds render cost.
* Added complexity harms maintenance.

---

## 45.4 Context Performance

### Problems

* Large provider value changes.
* High-frequency state in broad context.
* New object and function references every render.
* Too many unrelated consumers.

### Solutions

* Split contexts.
* Memoize values where useful.
* Use selector-based external stores.
* Keep dynamic state local.

---

## 45.5 Large Lists

### Techniques

* Pagination
* Virtualization
* Incremental rendering
* Server filtering
* Windowing
* Memoized rows
* Stable keys

### Important accessibility consideration

Virtualized lists need careful keyboard navigation, screen-reader behavior, and scroll restoration.

---

# 46. Bundle Performance

## Topic importance

JavaScript must be downloaded, parsed, compiled, and executed. Large bundles affect all four stages.

## 46.1 Tree Shaking

### Important things

* Works best with static ES module syntax.
* Libraries must expose tree-shakeable modules.
* Side effects can prevent removal.
* Importing from package root may include more code than expected.

---

## 46.2 Code Splitting

### Possible boundaries

* Routes
* Large features
* Editors
* Charts
* Admin tools
* Rare dialogs
* AI features

### Key things

* Split according to user journeys.
* Do not create excessive tiny chunks.
* Include loading and failure UI.
* Consider preloading likely next routes.

---

## 46.3 Dynamic Imports

```js
const module = await import("./heavy-module");
```

### Uses

* Lazy feature loading
* Conditional functionality
* Route chunks
* Rare workflows

---

## 46.4 Dependency Analysis

### Important questions

* How large is the dependency?
* Is it tree-shakeable?
* Does it duplicate existing functionality?
* Is it loaded on the initial route?
* Can a native browser API replace it?
* Is maintenance healthy?
* Does it introduce security risk?

---

## 46.5 Source Maps

### Important things

* Help debug minified production code.
* May expose source structure if publicly accessible.
* Upload privately to monitoring platforms where possible.
* Ensure release versions match source maps.

---

# 47. Memory Management

## Topic importance

Memory leaks cause slowdowns, crashes, and degraded long-running application sessions.

## 47.1 Garbage Collection

### Key things

* Objects are collected when unreachable.
* Developers do not manually free normal JavaScript memory.
* Reachability is the central concept.
* Retained references prevent collection.

---

## 47.2 Common Leak Sources

* Event listeners
* Timers
* Subscriptions
* Detached DOM nodes
* Closures
* Global caches
* Large history state
* Unbounded arrays
* Third-party widgets
* WebSocket handlers

---

## 47.3 Detached DOM Nodes

### Important thing

A removed DOM node can remain in memory if JavaScript still references it.

### Investigation

* Capture heap snapshots.
* Search detached elements.
* Inspect retaining paths.
* Repeat the problematic workflow and compare snapshots.

---

## 47.4 Cache Limits

### Key things

Every cache needs:

* Maximum size
* Expiration
* Eviction strategy
* Ownership
* Reset behavior

An unbounded cache is a controlled memory leak.

---

# 48. Frontend Testing

## Topic importance

Testing should provide confidence in user behavior, domain logic, integrations, and critical workflows.

## 48.1 Unit Testing

### Best for

* Pure functions
* Reducers
* Parsers
* Validators
* Formatters
* Permission logic
* State transitions

### Important things

* Fast
* Isolated
* Deterministic
* Focused on logic

---

## 48.2 Component Testing

### Best for

* Form behavior
* Component interaction
* Keyboard behavior
* Validation
* Conditional rendering
* Context integration

### Key principle

Test what the user sees and does, not internal implementation details.

---

## 48.3 Integration Testing

### Best for

* Components with API layers
* Authentication guards
* State stores
* Route behavior
* Multiple collaborating modules

### Important things

Mock network boundaries rather than mocking every internal function.

---

## 48.4 End-to-End Testing

### Best for

* Login
* Deep links
* Critical form submission
* Payment or order journeys
* Permission-sensitive workflows
* Cross-page behavior

### Key things

* Keep the suite focused.
* Avoid testing every visual variation.
* Use stable selectors.
* Control test data.
* Collect screenshots, videos, and traces for failures.

---

## 48.5 Contract Testing

### Important things

Contract tests verify frontend assumptions about backend behavior.

Check:

* Required fields
* Optional fields
* Status codes
* Error shape
* Enum values
* Version compatibility

---

## 48.6 Accessibility Testing

### Layers

* Automated linting
* Automated browser audit
* Keyboard testing
* Screen-reader testing
* Contrast testing
* Zoom testing

### Key thing

Automated tools catch only a portion of accessibility problems.

---

## 48.7 Performance Testing

### Possible tests

* Bundle-size limits
* Route-load thresholds
* Render benchmarks
* Large-list behavior
* Memory growth
* User-flow performance

---

# 49. Frontend Security

## Topic importance

Frontend code executes in an untrusted user-controlled environment. Security requires browser, backend, and infrastructure cooperation.

## 49.1 Cross-Site Scripting

### Types

* Stored XSS
* Reflected XSS
* DOM-based XSS

### Common causes

* Unsafe HTML rendering
* Untrusted URL injection
* Unsafe script construction
* Third-party content
* Weak sanitization

### Important things

* React escapes normal text interpolation.
* Unsafe HTML APIs bypass protection.
* Sanitization must match the output context.
* Never trust stored data merely because it came from your database.

---

## 49.2 CSRF

### Important things

CSRF is relevant when the browser automatically attaches credentials such as cookies.

### Defenses

* SameSite cookies
* CSRF tokens
* Origin validation
* Referer validation where appropriate
* Custom headers
* Correct method semantics

### Key thing

CORS is not a complete CSRF defense.

---

## 49.3 Content Security Policy

### Important purposes

* Restrict script sources
* Restrict styles
* Restrict frames
* Restrict connections
* Report violations

### Recommended adoption

1. Inventory resource sources.
2. Enable report-only mode.
3. Analyze violations.
4. Remove unsafe patterns.
5. Enforce gradually.

---

## 49.4 Clickjacking

### Defenses

* `frame-ancestors` in CSP
* Appropriate frame restrictions

### Key thing

Protect sensitive applications from being invisibly embedded in malicious pages.

---

## 49.5 Open Redirects

### Problem

An attacker supplies a malicious return URL.

### Defense

* Allow only relative internal paths.
* Or validate against an explicit allowlist.
* Never redirect to arbitrary user-provided URLs.

---

## 49.6 Frontend Secrets

### Critical rule

Anything included in a frontend bundle must be considered public.

Do not place:

* Private API keys
* Database credentials
* Client secrets
* Signing keys
* Internal privileged tokens

in frontend environment files.

---

## 49.7 Sensitive Logging

Do not log:

* Access tokens
* Session cookies
* Passwords
* Full payment data
* Sensitive personal information
* Confidential documents
* Raw authentication callbacks

---

## 49.8 Dependency Security

### Important practices

* Audit dependencies.
* Remove unused packages.
* Review post-install scripts.
* Pin or control versions appropriately.
* Monitor security advisories.
* Avoid adding packages for trivial functions.
* Review third-party scripts separately from package dependencies.

---

# 50. Reliability and Failure Handling

## Topic importance

Production applications must continue behaving usefully when networks, APIs, sessions, or individual features fail.

## 50.1 Timeouts

### Important things

* Every request should have an acceptable waiting limit.
* Timeout values depend on operation type.
* Long-running jobs may use async processing instead of holding requests.
* Timeout UI should provide recovery options.

---

## 50.2 Retries

### Important things

* Retry only safe and temporary failures.
* Add backoff and jitter.
* Stop after a limit.
* Avoid synchronized retry storms.
* Protect non-idempotent operations.

---

## 50.3 Partial Failure

### Important things

Independent sections should fail independently.

Example dashboard:

* Profile loads.
* Notifications fail.
* Analytics loads.
* Recommendations time out.

Do not replace the entire dashboard with one error if partial content remains useful.

---

## 50.4 Graceful Degradation

Examples:

* Show cached data when live data fails.
* Disable only unavailable actions.
* Provide read-only mode.
* Preserve draft data.
* Offer manual refresh.
* Communicate stale data clearly.

---

## 50.5 Offline Handling

### Important considerations

* Network detection is imperfect.
* Requests can fail even while the browser reports online.
* Queue only safe operations.
* Show pending synchronization status.
* Handle conflicts after reconnection.

---

## 50.6 Duplicate Submission

### Defenses

* Disable repeated clicks.
* Track in-flight operations.
* Use idempotency keys.
* Reconcile after uncertain network outcomes.
* Avoid assuming a timeout means the server did nothing.

---

# 51. Frontend Architecture

## Topic importance

Architecture defines boundaries, ownership, dependency direction, change isolation, and how teams work safely at scale.

## 51.1 Feature-Based Architecture

### Example structure

```text
features/
  authentication/
  entity-management/
  layout-builder/
  form-renderer/
  entity-search/
  workflow/
```

Each feature may contain:

* Components
* Hooks
* State
* API
* Models
* Tests
* Public exports

### Benefits

* Business capability ownership
* Easier navigation
* Better team boundaries
* Reduced unrelated coupling

---

## 51.2 Layered Architecture

Possible layers:

* Presentation
* Application
* Domain
* Infrastructure

### Responsibilities

#### Presentation

* React components
* Visual behavior
* Accessibility
* User interaction

#### Application

* Use cases
* Coordination
* State transitions
* Workflow orchestration

#### Domain

* Business rules
* Domain types
* Validation
* Calculations

#### Infrastructure

* API clients
* Storage
* Analytics
* Authentication adapters

---

## 51.3 Dependency Direction

### Key principle

Higher-level business logic should not depend directly on low-level implementation details.

For example:

* Domain logic should not import React.
* Components should not know raw endpoint URLs.
* Feature code should not import another feature’s private files.
* Infrastructure should implement explicit interfaces.

---

## 51.4 Public Module APIs

### Good pattern

```ts
import {
  EntitySearchPage,
  useEntitySearch,
  type EntitySearchResult,
} from "@/features/entity-search";
```

### Avoid

```ts
import { helper } from "@/features/entity-search/internal/utils/helper";
```

### Key thing

Public APIs preserve encapsulation and allow internal refactoring.

---

## 51.5 Shared Code

### Appropriate shared code

* Design-system primitives
* Generic utilities
* Authentication infrastructure
* Logging
* API base client
* Common types with clear ownership

### Avoid

A generic `shared` folder containing unrelated code from every feature.

---

# 52. Component Architecture

## Topic importance

Good component boundaries improve reuse, accessibility, performance, testing, and maintenance.

## 52.1 Presentational Components

### Responsibilities

* Receive data through props.
* Render UI.
* Emit user events.
* Avoid owning complex business workflows.

---

## 52.2 Container Components

### Responsibilities

* Fetch or select data.
* Coordinate actions.
* Convert domain state into presentation props.
* Handle orchestration.

### Important caution

Do not turn every component into a container. Use the boundary only where it improves clarity.

---

## 52.3 Headless Components

### Important things

Headless components provide:

* State
* Interaction
* Keyboard behavior
* Accessibility
* No fixed visual design

Useful for:

* Dropdowns
* Comboboxes
* Tabs
* Dialogs
* Menus
* Date pickers

---

## 52.4 Compound Components

Example API:

```jsx
<Tabs>
  <Tabs.List />
  <Tabs.Tab />
  <Tabs.Panel />
</Tabs>
```

### Benefits

* Expressive API
* Shared internal state
* Flexible composition

### Challenges

* Context performance
* Invalid composition
* Accessibility contracts
* Complex typing

---

## 52.5 Component API Design

### Key questions

* Does the API express user intent?
* Are invalid combinations prevented?
* Can consumers customize safely?
* Are defaults accessible?
* Are controlled and uncontrolled modes clear?
* Is styling customization predictable?
* Can behavior be tested independently?

---

# 53. Design Systems

## Topic importance

A design system combines visual language, reusable components, accessibility, governance, and engineering standards.

## 53.1 Foundations

Include:

* Colour
* Typography
* Spacing
* Radius
* Elevation
* Motion
* Icons
* Breakpoints
* Layout principles

---

## 53.2 Primitives

Examples:

* Box
* Stack
* Text
* Button
* Input
* Icon
* Divider
* Visually hidden content

### Important things

Primitives should:

* Be accessible.
* Use design tokens.
* Avoid product-specific behavior.
* Remain stable and composable.

---

## 53.3 Composite Components

Examples:

* Form field
* Modal
* Dropdown
* Table
* Toast
* Pagination
* Date picker
* Navigation header

### Important things

Composite components combine:

* Visual styling
* Interaction
* Accessibility
* State coordination

---

## 53.4 Documentation

Should include:

* Usage
* Variants
* Accessibility guidance
* Do and do not examples
* API reference
* Responsive behavior
* Theme behavior
* Migration notes

---

## 53.5 Governance

### Important things

Define:

* Ownership
* Contribution process
* Review requirements
* Release strategy
* Deprecation policy
* Adoption measurement
* Support channels

---

# 54. Monorepo Architecture

## Topic importance

A monorepo can improve code sharing and coordinated tooling, but only when dependency boundaries are explicit.

## 54.1 Repository Structure

Possible categories:

* Applications
* Domain libraries
* UI libraries
* Infrastructure libraries
* Tooling
* Configuration
* Documentation

---

## 54.2 Dependency Graph

### Important things

Define rules such as:

* Apps may depend on feature and shared libraries.
* Features may depend on domain and infrastructure interfaces.
* Domain libraries may not depend on React.
* Shared UI may not depend on product features.
* One application should not import another application.

---

## 54.3 Circular Dependencies

### Problems

* Unpredictable initialization
* Build issues
* Tight coupling
* Difficult refactoring
* Hidden ownership

### Prevention

* Enforce module boundaries.
* Use dependency graph tooling.
* Extract shared concepts carefully.
* Redesign bidirectional dependencies.

---

## 54.4 Build Caching

### Important things

* Cache based on inputs.
* Include source, dependencies, configuration, and environment assumptions.
* Use affected-project execution.
* Separate deterministic tasks from environment-dependent tasks.

---

## 54.5 Shared Configuration

Possible shared configuration:

* TypeScript
* ESLint
* Testing
* Bundling
* Formatting

### Important caution

Allow controlled application overrides. One configuration should not force unrelated apps into identical architecture.

---

# 55. Microfrontends

## Topic importance

Microfrontends are an organizational and deployment architecture, not merely a code-splitting technique.

## 55.1 When They May Help

* Independent teams
* Independent deployment
* Different release cycles
* Large organizational boundaries
* Gradual legacy migration

---

## 55.2 Integration Approaches

* Build-time packages
* Runtime module loading
* Module Federation-style systems
* Web components
* Iframes
* Server composition

---

## 55.3 Key Challenges

* Shared dependency versions
* Routing ownership
* Authentication
* State communication
* Design consistency
* Performance
* Error isolation
* Observability
* Local development
* End-to-end testing

---

## 55.4 Communication

Prefer:

* Explicit events
* URL state
* Shared backend state
* Stable contracts
* Narrow shared services

Avoid:

* Importing another microfrontend’s private store
* Sharing mutable global objects
* Tight runtime knowledge of internal implementation

---

## 55.5 Failure Isolation

### Important questions

* What happens if one microfrontend fails to load?
* Can the shell continue?
* Can the user retry?
* How are incompatible versions handled?
* How are errors attributed to owning teams?

---

# 56. Backend for Frontend

## Topic importance

A BFF provides APIs tailored to frontend workflows and can securely manage sessions and downstream orchestration.

## 56.1 Responsibilities

Possible responsibilities:

* Authentication session management
* Response aggregation
* Response shaping
* Protocol adaptation
* Request authorization
* Frontend-specific caching
* Reducing request waterfalls

---

## 56.2 What Should Not Be Added Carelessly

Avoid turning the BFF into:

* A duplicate domain backend
* A dumping ground for all business rules
* A proxy with no ownership
* A tightly coupled frontend release blocker

---

## 56.3 Failure Handling

### Important things

When aggregating services:

* Define partial response behavior.
* Set downstream timeouts.
* Use circuit-breaker concepts where appropriate.
* Return stable error categories.
* Include correlation IDs.
* Avoid hiding critical dependency failures.

---

# 57. Feature Flags and Remote Configuration

## Topic importance

Feature flags separate deployment from release and allow controlled rollout, experimentation, and emergency shutdown.

## 57.1 Flag Types

* Release flag
* Experiment flag
* Operational flag
* Permission flag
* Kill switch
* Configuration value

### Important distinction

A feature flag is not automatically an authorization mechanism.

---

## 57.2 Initialization

### Important questions

* Must flags load before authentication?
* What is the safe default?
* Can cached configuration be used?
* What happens when the service fails?
* How do we prevent UI flicker?

---

## 57.3 Flag Lifecycle

Every flag should have:

* Owner
* Purpose
* Created date
* Expiry date
* Removal plan
* Default behavior
* Test coverage

### Key thing

Permanent old flags create hidden branches and long-term complexity.

---

## 57.4 Testing

Test:

* Enabled state
* Disabled state
* Loading state
* Failure state
* Changed state during session
* Interaction with permissions
* Interaction with stored user state

---

# 58. Observability

## Topic importance

Observability helps reconstruct failures, measure user impact, and connect frontend behavior with backend systems.

## 58.1 Logging

### Useful context

* Application version
* Route
* Feature
* Operation
* Correlation ID
* Safe user identifier
* Browser
* Environment
* Error category

### Important caution

Never log sensitive authentication or business data.

---

## 58.2 Error Monitoring

### Capture

* Stack trace
* Source map mapping
* User action context
* Breadcrumbs
* Release version
* Route
* Feature flag state
* Network failure context

### Key thing

Group errors carefully so distinct root causes are not hidden together.

---

## 58.3 Real User Monitoring

### Useful metrics

* Page loading
* Interaction latency
* Resource timing
* Errors
* Route transitions
* Long tasks
* User journeys

### Important things

* Use sampling intentionally.
* Protect privacy.
* Mask sensitive fields.
* Monitor cost.

---

## 58.4 Session Replay

### Important risks

* Captured form data
* Personal information
* Authentication data
* Confidential content
* Increased billing
* Data retention requirements

### Required controls

* Input masking
* Element exclusion
* Sampling
* Retention policy
* Access control
* Consent and legal review where necessary

---

## 58.5 Correlation IDs

### Flow

1. Frontend generates or receives an ID.
2. Sends it with API requests.
3. Backend propagates it through services.
4. Logs and traces include the same ID.
5. Support can reconstruct the complete operation.

---

# 59. CI/CD and Frontend Delivery

## Topic importance

A reliable delivery pipeline validates quality, produces immutable artifacts, and supports safe release and rollback.

## 59.1 CI Validation Order

Run faster checks first:

1. Formatting or basic validation
2. Linting
3. Type checking
4. Unit tests
5. Component tests
6. Build
7. Security checks
8. End-to-end tests
9. Performance checks

---

## 59.2 Build-Time Versus Runtime Configuration

### Build-time configuration

Embedded during compilation.

### Runtime configuration

Loaded when the application starts.

### Key things

Runtime configuration can allow one immutable artifact to run across environments, but initialization and security must be designed carefully.

---

## 59.3 Immutable Artifacts

### Important things

* Build once.
* Promote the same artifact.
* Do not silently modify files after verification.
* Version every release.
* Associate source maps and monitoring releases correctly.

---

## 59.4 Progressive Delivery

### Strategies

* Internal rollout
* Percentage rollout
* Region-based rollout
* User-segment rollout
* Canary deployment
* Feature-flag release

### Required capabilities

* Monitoring
* Rollback
* Kill switch
* Version visibility
* Error comparison

---

## 59.5 Rollback

### Important things

Rollback should consider:

* Frontend assets
* Cached HTML
* Service Worker versions
* API compatibility
* Database or schema changes
* Feature flags
* Runtime configuration

---

# 60. Frontend System Design

## Topic importance

System design connects product requirements with architecture, data flow, performance, security, reliability, and team ownership.

## 60.1 Requirement Analysis

Identify:

* Users
* Core workflows
* Scale
* Devices
* Accessibility needs
* Security level
* Offline requirements
* Real-time needs
* Browser support
* Compliance constraints

---

## 60.2 Data Modeling

Identify:

* Entities
* Relationships
* IDs
* Source of truth
* Read and write frequency
* Cache behavior
* Optimistic-update safety
* Versioning
* Conflict resolution

---

## 60.3 Application Boundaries

Define:

* Routes
* Features
* Shared infrastructure
* Design system
* Authentication
* Permissions
* API layer
* Observability
* Configuration
* AI integrations

---

## 60.4 Data Flow

Document:

* Initial application bootstrap
* Authentication
* Configuration loading
* Page data loading
* Mutations
* Cache updates
* Polling or events
* Session expiry
* Error recovery

---

## 60.5 Performance Design

Decide:

* Route splitting
* Data preloading
* Cache policy
* Image strategy
* List virtualization
* Worker usage
* Bundle budget
* Third-party script policy
* Performance monitoring

---

## 60.6 Security Design

Document:

* Authentication flow
* Authorization enforcement
* Token or cookie strategy
* CSRF protections
* XSS protections
* CSP
* Sensitive data
* Redirect validation
* Third-party scripts
* Audit requirements

---

## 60.7 Reliability Design

Define:

* Timeouts
* Retry rules
* Cancellation
* Partial failure
* Offline behavior
* Duplicate submission prevention
* Session recovery
* Error boundaries
* Rollback

---

## 60.8 Observability Design

Define:

* Error events
* Performance metrics
* Business events
* Correlation IDs
* Logs
* Dashboards
* Alerts
* Privacy controls

---

# 61. Architecture Documentation

## Topic importance

Architecture that exists only in one engineer’s mind cannot be safely maintained.

## 61.1 System Context Diagram

Show:

* Users
* Frontend
* Identity provider
* Backend systems
* External services
* Monitoring
* AI systems
* Feature configuration

---

## 61.2 Container Diagram

Show deployable units:

* Web application
* BFF
* APIs
* Worker services
* Databases
* CDN
* Authentication service

---

## 61.3 Component Diagram

Show internal frontend areas:

* Application shell
* Routing
* Authentication
* Feature modules
* State management
* API client
* Design system
* Observability

---

## 61.4 Sequence Diagram

Use sequence diagrams for:

* Login
* Deep-link authentication
* Token refresh
* Page loading
* Form submission
* Polling
* Real-time events
* Logout
* Session expiry
* AI request

---

## 61.5 Architecture Decision Record

Each ADR should include:

* Title
* Status
* Context
* Decision
* Alternatives
* Benefits
* Consequences
* Risks
* Rollback strategy
* Review date

---

# 62. AI-Powered Frontend Applications

## Topic importance

AI applications introduce probabilistic output, streaming, tool execution, safety, structured data validation, and cost concerns.

## 62.1 Streaming Responses

### Important things

* Render partial content incrementally.
* Avoid blocking the interface.
* Support cancellation.
* Handle stream interruption.
* Preserve partial output where appropriate.
* Prevent markdown or HTML rendering vulnerabilities.

---

## 62.2 Structured Output

### Important things

* Define a schema.
* Validate at runtime.
* Handle invalid or incomplete output.
* Support schema versions.
* Avoid trusting model-generated JSON blindly.

---

## 62.3 Conversation State

### Important things

Store:

* User messages
* Assistant responses
* Tool results
* Attachments
* Metadata
* Conversation IDs

### Key considerations

* Context-window limits
* Summarization
* Privacy
* Persistence
* Editing
* Regeneration
* Branching

---

## 62.4 Tool Calls

### Required UI states

* Tool requested
* Waiting for approval
* Running
* Succeeded
* Failed
* Cancelled

### Important things

* Display what action will happen.
* Require confirmation for high-impact actions.
* Prevent duplicate tool execution.
* Record audit information.
* Make failure recovery clear.

---

## 62.5 Human Approval

Require approval before:

* Sending email
* Deleting data
* Changing production configuration
* Making payments
* Updating external systems
* Publishing content
* Executing privileged operations

---

## 62.6 AI Uncertainty

### Important things

* Clearly separate facts from generated suggestions.
* Provide citations where applicable.
* Show missing-information states.
* Avoid pretending uncertain output is confirmed.
* Allow correction and user feedback.

---

## 62.7 AI Security

### Risks

* Prompt injection
* Data leakage
* Unsafe tool execution
* Secret exposure
* Malicious retrieved content
* Cross-user data mixing
* Unvalidated generated code

### Defenses

* Tool permission boundaries
* Data-access controls
* Input and output validation
* Approval workflows
* Least privilege
* Audit logs
* Content isolation

---

## 62.8 AI Cost and Performance

Track:

* Model latency
* Time to first token
* Total tokens
* Tool-call count
* Failure rate
* Cancellation rate
* Acceptance rate
* Cost per workflow

### Optimization approaches

* Prompt caching
* Smaller models for simpler tasks
* Context summarization
* Retrieval filtering
* Response length controls
* Structured tool routing

---

## 62.9 AI Evaluation

### Evaluate

* Accuracy
* Completeness
* Relevance
* Safety
* Citation correctness
* Tool selection
* Task completion
* User acceptance
* Latency
* Cost

### Key thing

Do not evaluate only by reading a few manually selected responses. Build repeatable evaluation datasets.

---

# 63. Git and Engineering Collaboration

## Topic importance

Senior frontend engineers must understand version control beyond basic commit and push operations.

## 63.1 Commit Design

### Important things

A strong commit should:

* Represent one logical change.
* Build and test where possible.
* Explain why through its message.
* Avoid unrelated formatting noise.
* Be reversible.

---

## 63.2 Merge and Rebase

### Merge

* Preserves branch history.
* Creates a merge commit.

### Rebase

* Replays commits on a new base.
* Creates a cleaner linear history.
* Rewrites commit hashes.

### Important caution

Avoid rebasing shared public history without team agreement.

---

## 63.3 Cherry-Pick

### Use cases

* Apply a specific fix to another branch.
* Backport a release correction.

### Risks

* Duplicate commits
* Missing related changes
* Future merge conflicts

---

## 63.4 Reflog

### Important things

Reflog helps recover:

* Deleted branches
* Lost commits
* Previous HEAD positions
* Failed rebases

---

## 63.5 Bisect

### Important things

`git bisect` uses binary search to identify the commit that introduced a regression.

### Strong use case

Combine it with automated tests to locate a failure efficiently.

---

## 63.6 Pull Requests

A strong pull request explains:

* Problem
* Solution
* Architectural impact
* Screenshots
* Testing
* Risks
* Migration
* Rollback
* Monitoring

---

# 64. Internationalization and Localization

## Topic importance

Global applications must support different languages, currencies, dates, numbers, directions, and time zones.

## 64.1 Translation

### Important things

* Use translation keys.
* Avoid sentence concatenation.
* Support pluralization.
* Support gender and grammatical variation where needed.
* Avoid placing markup directly inside translation logic without structure.

---

## 64.2 Dates and Time Zones

### Important things

* Store timestamps in a consistent absolute format.
* Display using the user’s locale and time zone.
* Distinguish date-only values from timestamps.
* Test daylight-saving transitions.
* Avoid manually calculating offsets.

---

## 64.3 Number and Currency Formatting

### Important things

Use locale-aware formatting for:

* Decimal separators
* Group separators
* Currency symbols
* Percentage
* Compact notation

---

## 64.4 Right-to-Left Layout

### Important things

* Use logical CSS properties.
* Mirror directional icons where appropriate.
* Do not mirror universally recognizable icons incorrectly.
* Test forms, tables, navigation, and charts.

---

## 64.5 Text Expansion

### Important things

Translated text may be much longer than English.

Design for:

* Flexible buttons
* Wrapping labels
* Expandable navigation
* Table overflow
* Dynamic form height

---

# 65. Progressive Web Applications and Offline Systems

## Topic importance

PWA and offline support require deliberate caching, synchronization, updates, and conflict management.

## 65.1 Service Workers

### Important things

* Run separately from the page.
* Can intercept network requests.
* Can cache responses.
* Have an installation and activation lifecycle.
* Must be served securely.

---

## 65.2 Cache Strategies

### Cache first

Good for:

* Versioned static assets
* Stable images

### Network first

Good for:

* Frequently changing data
* Content where freshness matters

### Stale while revalidate

Good for:

* Data where quick display and background refresh are acceptable

### Network only

Good for:

* Highly sensitive or non-cacheable operations

---

## 65.3 Update Lifecycle

### Important things

* A new Service Worker may wait while old pages remain open.
* Users can become stuck on old assets if updates are poorly managed.
* Update prompts should avoid interrupting critical user work.
* Cache versions must be cleaned up.

---

## 65.4 Offline Mutation Queue

### Important things

Only queue operations that:

* Can safely be retried.
* Have stable identifiers.
* Support conflict resolution.
* Can communicate pending state.
* Have an idempotency strategy.

---

# 66. Final Mastery Requirements

For every major topic, you should be able to answer all of the following.

## Conceptual understanding

* What problem does this concept solve?
* How does it work internally?
* What happens step by step?
* Which browser, JavaScript, or React mechanisms are involved?

## Implementation understanding

* Can you implement a simplified version?
* Can you write tests for it?
* Can you handle loading, success, failure, and cleanup?
* Can you make it accessible?

## Debugging understanding

* What are the most common bugs?
* Which developer tools should be used?
* How would you reproduce the problem?
* How would you confirm the root cause?

## Architectural understanding

* When should this concept be used?
* When should it not be used?
* What are the alternatives?
* What trade-offs are involved?
* How does it behave at enterprise scale?

## Production understanding

* What are the security risks?
* What are the performance risks?
* What are the accessibility requirements?
* What should be logged?
* How should failure and rollback work?

## Teaching understanding

* Can you draw the flow?
* Can you explain it without jargon?
* Can you explain it to another senior engineer?
* Can you defend your design decision during an architecture review?
