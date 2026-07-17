"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import masteryData from "./mastery-data.json";
import {
  learningExampleFor,
  readingReferencesFor,
  readingShelf,
  type LearningExample,
} from "./learning-examples";

type Group = { title: string; items: string[]; prose: string[]; code: string[] };
type Subtopic = { id: string; slug: string; title: string; groups: Group[] };
type Topic = { id: string; slug: string; title: string; importance: string[]; subtopics: Subtopic[] };
type Curriculum = { title: string; topics: Topic[]; stats: { topics: number; subtopics: number; groups: number; learningPoints: number } };
type VisualKind = "runtime" | "queue" | "tree" | "pipeline" | "references" | "layout" | "boundary" | "layers" | "types" | "graph";

const curriculum = masteryData as Curriculum;
const visibleTopics = curriculum.topics.filter((topic) => topic.id !== "60");

const topicGroups = [
  { label: "JavaScript language", range: [1, 10], mark: "JS", color: "indigo" },
  { label: "Web platform", range: [11, 23], mark: "WP", color: "cyan" },
  { label: "TypeScript", range: [24, 28], mark: "TS", color: "violet" },
  { label: "React", range: [29, 36], mark: "RE", color: "blue" },
  { label: "State & data", range: [37, 43], mark: "SD", color: "green" },
  { label: "Performance & quality", range: [44, 50], mark: "PQ", color: "orange" },
  { label: "Frontend architecture", range: [51, 59], mark: "FA", color: "pink" },
  { label: "Engineering practice", range: [61, 66], mark: "EP", color: "yellow" },
];

const findGroup = (subtopic: Subtopic, pattern: RegExp) => subtopic.groups.find((group) => pattern.test(group.title));
const topicHref = (topic: Topic) => `/learn/${topic.slug}`;
const subtopicHref = (topic: Topic, subtopic: Subtopic) => `${topicHref(topic)}/${subtopic.slug}`;

function Icon({ name }: { name: string }) {
  const icons: Record<string, string> = { search: "⌕", arrow: "→", back: "←", next: "›", previous: "‹", play: "▶", pause: "Ⅱ", reset: "↺", menu: "≡", sun: "☼", moon: "◐", book: "▤", map: "⌘", link: "↗" };
  return <span aria-hidden="true">{icons[name] ?? "•"}</span>;
}

export default function KnowledgeApp({ initialTopicSlug, initialSubtopicSlug }: { initialTopicSlug?: string; initialSubtopicSlug?: string }) {
  const topic = visibleTopics.find((item) => item.slug === initialTopicSlug);
  const subtopic = topic?.subtopics.find((item) => item.slug === initialSubtopicSlug);
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return visibleTopics.flatMap((item) => [
      ...(item.title.toLowerCase().includes(normalizedQuery) ? [{ topic: item, subtopic: undefined as Subtopic | undefined }] : []),
      ...item.subtopics.filter((entry) => `${entry.title} ${entry.groups.flatMap((group) => [group.title, ...group.items, ...group.prose]).join(" ")}`.toLowerCase().includes(normalizedQuery)).map((entry) => ({ topic: item, subtopic: entry })),
    ]).slice(0, 24);
  }, [normalizedQuery]);

  useEffect(() => {
    const stored = window.localStorage.getItem("frontend-atlas-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = stored === "dark" || stored === "light" ? stored : preferred;
    const timer = window.setTimeout(() => setTheme(initialTheme), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.knowledgeTheme = theme;
    window.localStorage.setItem("frontend-atlas-theme", theme);
  }, [theme]);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const resolvedTheme = theme ?? "light";

  return (
    <div className="knowledge-app">
      <a className="skip-link" href="#knowledge-main">Skip to learning content</a>
      <KnowledgeSidebar topic={topic} query={query} setQuery={setQuery} searchResults={searchResults} open={mobileNav} close={() => setMobileNav(false)} searchInputRef={searchInputRef} />
      <div className="knowledge-frame">
        <KnowledgeHeader topic={topic} subtopic={subtopic} theme={resolvedTheme} toggleTheme={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} toggleNav={() => setMobileNav(!mobileNav)} />
        <main id="knowledge-main" tabIndex={-1}>
          {!topic ? <GlobalOverview /> : subtopic ? <SubtopicWorkspace topic={topic} subtopic={subtopic} /> : <TopicWorkspace topic={topic} />}
        </main>
      </div>
    </div>
  );
}

function KnowledgeSidebar({ topic, query, setQuery, searchResults, open, close, searchInputRef }: { topic?: Topic; query: string; setQuery: (value: string) => void; searchResults: { topic: Topic; subtopic?: Subtopic }[]; open: boolean; close: () => void; searchInputRef: RefObject<HTMLInputElement | null> }) {
  return <aside className={`knowledge-sidebar ${open ? "open" : ""}`} aria-label="Frontend curriculum">
    <Link className="knowledge-brand" href="/" onClick={close}><span className="knowledge-logo"><b>F</b><b>A</b></span><span><strong>Frontend Atlas</strong><small>Interactive engineering textbook</small></span></Link>
    <label className="knowledge-search"><Icon name="search" /><input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the textbook" aria-label="Search topics and subtopics" /><kbd>⌘K</kbd></label>
    {query.trim() && <div className="knowledge-search-popover">{searchResults.length ? searchResults.map((result) => <a key={`${result.topic.id}-${result.subtopic?.id ?? "topic"}`} href={result.subtopic ? subtopicHref(result.topic, result.subtopic) : topicHref(result.topic)}><span>{result.subtopic?.id ?? result.topic.id.padStart(2, "0")}</span><div><strong>{result.subtopic?.title ?? result.topic.title}</strong>{result.subtopic && <small>{result.topic.title}</small>}</div><Icon name="arrow" /></a>) : <p>No matching concept found.</p>}</div>}
    <div className="knowledge-nav-title"><span>KNOWLEDGE MAP</span><small>{visibleTopics.length} topics</small></div>
    <nav className="knowledge-topic-nav">{topicGroups.map((group) => {
      const topics = visibleTopics.filter((item) => Number(item.id) >= group.range[0] && Number(item.id) <= group.range[1]);
      const containsActive = topics.some((item) => item.id === topic?.id);
      return <details key={group.label} open={containsActive || (!topic && group.range[0] === 1)}><summary><span className={`group-mark ${group.color}`}>{group.mark}</span><strong>{group.label}</strong><small>{topics.length}</small><span className="chevron">⌄</span></summary><div>{topics.map((item) => <div className="sidebar-topic" key={item.id}><a className={item.id === topic?.id ? "active" : ""} href={topicHref(item)} onClick={close}><span>{item.id.padStart(2, "0")}</span><strong>{item.title}</strong></a>{item.id === topic?.id && <div className="sidebar-subtopics">{item.subtopics.map((entry) => <a key={entry.id} href={subtopicHref(item, entry)} onClick={close}>{entry.title}</a>)}</div>}</div>)}</div></details>;
    })}</nav>
    <footer className="knowledge-sidebar-footer"><span><Icon name="book" /></span><div><strong>Local knowledge base</strong><small>No account, schedule, or tracking</small></div></footer>
  </aside>;
}

function KnowledgeHeader({ topic, subtopic, theme, toggleTheme, toggleNav }: { topic?: Topic; subtopic?: Subtopic; theme: "light" | "dark"; toggleTheme: () => void; toggleNav: () => void }) {
  const group = topic ? topicGroups.find((item) => Number(topic.id) >= item.range[0] && Number(topic.id) <= item.range[1]) : undefined;
  return <header className="knowledge-header"><button className="knowledge-menu" onClick={toggleNav} aria-label="Toggle topic navigation"><Icon name="menu" /></button><nav aria-label="Breadcrumb"><Link href="/">Atlas</Link>{group && <><span>/</span><small>{group.label}</small></>}{topic && <><span>/</span><a href={topicHref(topic)}>{topic.title}</a></>}{subtopic && <><span>/</span><strong>{subtopic.title}</strong></>}</nav><div><span className="local-chip"><i /> LOCAL</span><button onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><Icon name={theme === "light" ? "moon" : "sun"} /></button></div></header>;
}

function GlobalOverview() {
  return <div className="knowledge-page global-overview">
    <section className="global-hero"><div><p className="kicker">THE FRONTEND KNOWLEDGE ATLAS</p><h1>Understand the system.<br /><em>Not just the syntax.</em></h1><p>A topic-first engineering textbook for rebuilding frontend fundamentals from JavaScript execution through browser internals, React, performance, security, and architecture.</p><div className="global-actions"><a className="knowledge-primary" href={topicHref(visibleTopics[0])}>Begin with JavaScript execution <Icon name="arrow" /></a><a className="knowledge-secondary" href="#global-map">Explore the map</a></div></div><GlobalHeroDiagram /></section>
    <section className="atlas-principles"><span><b>01</b><strong>Read the mechanism</strong><small>Progressive, internally accurate explanations.</small></span><span><b>02</b><strong>Run the visual model</strong><small>Controlled state changes, not decoration.</small></span><span><b>03</b><strong>Follow relationships</strong><small>Every concept points to its dependencies.</small></span></section>
    <section id="global-map" className="global-map-section"><header><p className="kicker">GLOBAL FRONTEND MIND MAP</p><h2>One platform. Eight connected domains.</h2><p>Choose a domain, then move through its topics in conceptual order.</p></header><div className="global-domain-grid">{topicGroups.map((group, index) => { const topics = visibleTopics.filter((item) => Number(item.id) >= group.range[0] && Number(item.id) <= group.range[1]); return <article key={group.label} className={`domain-card ${group.color}`}><div><span>{group.mark}</span><small>0{index + 1}</small></div><h3>{group.label}</h3><p>{domainDescription(group.label)}</p><div>{topics.slice(0, 5).map((topic) => <a key={topic.id} href={topicHref(topic)}>{topic.title}<Icon name="arrow" /></a>)}</div><a className="domain-all" href={topicHref(topics[0])}>Explore {topics.length} topics <Icon name="arrow" /></a></article>; })}</div></section>
    <ReferenceShelf />
  </div>;
}

function GlobalHeroDiagram() {
  return <div className="global-hero-diagram" aria-label="Frontend engineering domains connected as a system"><span className="hero-core">Frontend<br />Engineering</span>{["JavaScript", "Browser", "React", "Types", "Performance", "Security"].map((label, index) => <span key={label} className={`orbit-node orbit-${index}`}>{label}</span>)}</div>;
}

function TopicWorkspace({ topic }: { topic: Topic }) {
  const firstSubtopic = topic.subtopics[0];
  const reading = readingReferencesFor(topic.id);
  const terminology = topic.subtopics.flatMap((entry) => (findGroup(entry, /concept|terminology|types|methods|states/i)?.items ?? [])).slice(0, 14);
  const corePoints = topic.subtopics.flatMap((entry) => (findGroup(entry, /understand|important things|behavior|characteristics/i)?.items ?? [])).slice(0, 8);
  return <div className="knowledge-page topic-workspace">
    <TopicHero topic={topic} />
    <AnchorNav items={[['overview','Overview'], ...(reading.length ? [['reading','Reading']] as [string, string][] : []), ['terminology','Terminology'],['concepts','Core concepts'],['subtopics','Subtopics'],['visualizer','Visualizer'],['misunderstandings','Misunderstandings'],['mind-map','Mind map']]} />
    <div className="reading-column">
      <section id="overview" className="textbook-section overview-section"><SectionHeading number="01" eyebrow="TOPIC INTRODUCTION" title="Build the mental model first" /><p className="lead-paragraph">{topic.importance.join(" ")}</p><div className="why-usage-grid"><div><small>WHY IT EXISTS</small><p>{purposeFor(topic)}</p></div><div><small>WHERE YOU USE IT</small><p>{usageFor(topic)}</p></div></div>{reading.length > 0 && <ReadingReferences topic={topic} />}</section>
      <section id="terminology" className="textbook-section"><SectionHeading number="02" eyebrow="IMPORTANT TERMINOLOGY" title="Name the moving parts" /><p>These terms form the vocabulary for the internal behavior explained throughout this topic.</p><div className="terminology-grid">{(terminology.length ? terminology : topic.subtopics.map((entry) => entry.title)).map((term, index) => <span key={`${term}-${index}`}><i>{String(index + 1).padStart(2, "0")}</i><strong>{term}</strong></span>)}</div></section>
      <section id="concepts" className="textbook-section"><SectionHeading number="03" eyebrow="CORE CONCEPTS" title="The ideas that hold the topic together" /><div className="core-explanation-list">{corePoints.map((point, index) => <article key={`${point}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{topic.subtopics[index % topic.subtopics.length]?.title}</h3><p>{point}</p></div></article>)}</div></section>
      <section id="subtopics" className="textbook-section full-width-section"><SectionHeading number="04" eyebrow="SUBTOPICS" title="Explore one mechanism at a time" /><p>Each workspace follows definition → purpose → internal behavior → interactive trace → real-world usage → mistakes → relationships.</p><div className="subtopic-workspace-grid">{topic.subtopics.map((entry) => <a href={subtopicHref(topic, entry)} key={entry.id}><div><span>{entry.id}</span><small>{visualLabel(visualKindFor(topic, entry))}</small></div><h3>{entry.title}</h3><p>{summaryFor(entry)}</p><footer><span>{entry.groups.reduce((sum, group) => sum + group.items.length + group.prose.length, 0)} learning points</span><Icon name="arrow" /></footer></a>)}</div></section>
      {firstSubtopic && <section id="visualizer" className="textbook-section full-width-section"><SectionHeading number="05" eyebrow="INTERACTIVE VISUAL MODEL" title={`See ${firstSubtopic.title.toLowerCase()} in motion`} /><p>The diagram exposes one state transition at a time. Pause anywhere to inspect what changed and why.</p><ConceptVisualizer key={firstSubtopic.id} topic={topic} subtopic={firstSubtopic} /></section>}
      <section id="misunderstandings" className="textbook-section"><SectionHeading number="06" eyebrow="COMMON MISUNDERSTANDINGS" title="Correct the model, not the symptom" /><Misconceptions topic={topic} subtopic={firstSubtopic} /></section>
      <section id="mind-map" className="textbook-section full-width-section"><SectionHeading number="07" eyebrow="TOPIC MIND MAP" title={`How ${topic.title.toLowerCase()} connects`} /><TopicMindMap topic={topic} /></section>
    </div>
    <TopicSequence topic={topic} />
  </div>;
}

function SubtopicWorkspace({ topic, subtopic }: { topic: Topic; subtopic: Subtopic }) {
  const keyGroup = findGroup(subtopic, /understand|important things|behavior|characteristic|flow/i);
  const conceptGroup = findGroup(subtopic, /concept|types|methods|states|components|values/i);
  const practicalGroup = findGroup(subtopic, /practical|mastery|use case|useful|practice/i);
  const code = subtopic.groups.flatMap((group) => group.code)[0];
  const example = learningExampleFor(topic.id, topic.title, subtopic.title, code);
  const reading = readingReferencesFor(topic.id);
  const edgeGroups = subtopic.groups.filter((group) => /caution|risk|failure|edge|limitation|problem|incorrect/i.test(group.title));
  const index = topic.subtopics.findIndex((entry) => entry.id === subtopic.id);
  return <div className="knowledge-page subtopic-workspace">
    <header className="subtopic-hero"><div><p className="kicker">{topic.title.toUpperCase()} · {subtopic.id}</p><h1>{subtopic.title}</h1><p>{summaryFor(subtopic)}</p></div><div className="subtopic-hero-meta"><span><small>VISUAL MODEL</small><strong>{visualLabel(visualKindFor(topic, subtopic))}</strong></span><span><small>LEARNING POINTS</small><strong>{subtopic.groups.reduce((sum, group) => sum + group.items.length + group.prose.length, 0)}</strong></span></div></header>
    <AnchorNav items={[['definition','Definition'],['purpose','Purpose'], ...(reading.length ? [['reading','Reading']] as [string, string][] : []), ['internal','Internal behavior'],['syntax','Syntax'],['visualizer','Visualizer'],['usage','Usage'],['edge-cases','Edge cases'],['mistakes','Mistakes'],['related','Related']]} />
    <div className="reading-column">
      <section id="definition" className="textbook-section"><SectionHeading number="01" eyebrow="DEFINITION" title={`What is ${subtopic.title}?`} /><p className="lead-paragraph">{definitionFor(subtopic, topic)}</p>{conceptGroup && <div className="concept-pills">{conceptGroup.items.map((item) => <span key={item}>{item}</span>)}</div>}</section>
      <section id="purpose" className="textbook-section"><SectionHeading number="02" eyebrow="PURPOSE" title="Why this mechanism exists" /><p>{purposeForSubtopic(subtopic, topic)}</p><div className="mental-model"><span>MENTAL MODEL</span><p>{mentalModelFor(topic, subtopic)}</p><small>The analogy explains the shape of the system; the runtime trace below shows the actual mechanism.</small></div>{reading.length > 0 && <ReadingReferences topic={topic} />}</section>
      <section id="internal" className="textbook-section"><SectionHeading number="03" eyebrow="INTERNAL BEHAVIOR" title="Follow the mechanism step by step" />{keyGroup ? <div className="internal-steps">{[...keyGroup.prose, ...keyGroup.items].map((item, itemIndex) => <article key={`${item}-${itemIndex}`}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div> : <GroupContent groups={subtopic.groups.slice(0, 2)} />}</section>
      <section id="syntax" className="textbook-section full-width-section"><SectionHeading number="04" eyebrow="SYNTAX & EXAMPLE" title="See the idea in working code" /><SyntaxExample example={example} /></section>
      <section id="visualizer" className="textbook-section full-width-section"><SectionHeading number="05" eyebrow="INTERACTIVE VISUALIZER" title="Inspect every state transition" /><ConceptVisualizer key={subtopic.id} topic={topic} subtopic={subtopic} /></section>
      <section id="usage" className="textbook-section"><SectionHeading number="06" eyebrow="REAL-WORLD FRONTEND USAGE" title="Where this appears in production" />{practicalGroup ? <GroupContent groups={[practicalGroup]} /> : <div className="usage-callout"><p>{usageFor(topic)}</p></div>}</section>
      <section id="edge-cases" className="textbook-section"><SectionHeading number="07" eyebrow="EDGE CASES & IMPORTANT BEHAVIORS" title="Know where the simple model bends" />{edgeGroups.length ? <GroupContent groups={edgeGroups} /> : <BehaviorNotes topic={topic} subtopic={subtopic} />}</section>
      <section id="mistakes" className="textbook-section"><SectionHeading number="08" eyebrow="COMMON MISTAKES" title="Failure modes worth recognizing" /><Misconceptions topic={topic} subtopic={subtopic} /></section>
      <section id="related" className="textbook-section full-width-section"><SectionHeading number="09" eyebrow="RELATED CONCEPTS" title="Follow the dependency edges" /><RelatedConcepts topic={topic} subtopic={subtopic} /></section>
      <section className="textbook-section full-width-section"><SectionHeading number="10" eyebrow="TOPIC MIND MAP" title={`Return to the ${topic.title.toLowerCase()} map`} /><TopicMindMap topic={topic} activeSubtopic={subtopic} /></section>
    </div>
    <SubtopicSequence topic={topic} index={index} />
  </div>;
}

function TopicHero({ topic }: { topic: Topic }) {
  const group = topicGroups.find((item) => Number(topic.id) >= item.range[0] && Number(topic.id) <= item.range[1]);
  return <header className="topic-hero"><div className={`topic-number ${group?.color ?? "indigo"}`}><span>{topic.id.padStart(2, "0")}</span><small>{group?.mark}</small></div><div><p className="kicker">{group?.label.toUpperCase()} · TOPIC {topic.id.padStart(2, "0")}</p><h1>{topic.title}</h1><p>{topic.importance.join(" ")}</p><div><span>{topic.subtopics.length} focused subtopics</span><span>{topic.subtopics.reduce((sum, entry) => sum + entry.groups.length, 0)} explanation sections</span><span>Interactive visual model</span></div></div></header>;
}

function AnchorNav({ items }: { items: [string, string][] }) {
  return <nav className="anchor-nav" aria-label="On this page"><span>ON THIS PAGE</span>{items.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>;
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <header className="textbook-heading"><span>{number}</span><div><small>{eyebrow}</small><h2>{title}</h2></div></header>;
}

function ReferenceShelf() {
  return <section id="reading-shelf" className="reference-shelf">
    <header><p className="kicker">ATTACHED READING SHELF</p><h2>Books mapped to the knowledge atlas.</h2><p>The shelf is ordered by concept area. Topic pages point to the chapters that deepen the current mental model; explanations and examples in the atlas remain original and concise.</p></header>
    <div>{readingShelf.map((book, index) => <article key={book.title}><span>{String(index + 1).padStart(2, "0")}</span><small>{book.area}</small><h3>{book.title}</h3><p>{book.topics}</p></article>)}</div>
  </section>;
}

function ReadingReferences({ topic }: { topic: Topic }) {
  const references = readingReferencesFor(topic.id);
  if (!references.length) return null;
  return <aside id="reading" className="reading-references" aria-label={`Reading references for ${topic.title}`}>
    <header><span><Icon name="book" /></span><div><small>DEEPER READING</small><strong>Mapped from your attached books</strong></div></header>
    <div>{references.map((reference) => <article className={reference.tone} key={`${reference.book}-${reference.section}`}><div><small>{reference.book}</small><strong>{reference.section}</strong></div><span>PDF pages {reference.pages}</span><p>{reference.focus}</p></article>)}</div>
    <footer>Chapter references are used as a study map. The explanations and code examples here are newly written and paraphrased.</footer>
  </aside>;
}

function SyntaxExample({ example }: { example: LearningExample }) {
  return <div className="syntax-example">
    <header><div><small>{example.language.toUpperCase()}</small><h3>{example.title}</h3></div><span>Runnable pattern</span></header>
    <CodeExample code={example.code} filename={example.filename} language={example.language} />
    <div className="syntax-notes"><article><small>WHAT THE SYNTAX PROVES</small><p>{example.takeaway}</p></article><article><small>TRY THIS NEXT</small><p>{example.experiment}</p></article></div>
  </div>;
}

function GroupContent({ groups }: { groups: Group[] }) {
  return <div className="group-content">{groups.map((group, index) => <article key={`${group.title}-${index}`}><h3>{group.title}</h3>{group.prose.map((item) => <p key={item}>{item}</p>)}{group.items.length > 0 && <ul>{group.items.map((item) => <li key={item}><span>→</span>{item}</li>)}</ul>}{group.code.map((code) => <CodeExample key={code} code={code} />)}</article>)}</div>;
}

function CodeExample({ code, filename = "example.js", language = "javascript" }: { code: string; filename?: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };
  return <div className="knowledge-code" data-language={language}><header><span><i /><i /><i /></span><small>{filename}</small><button onClick={copyCode} aria-label={`Copy ${filename} code`}>{copied ? "Copied" : "Copy code"}</button></header><pre><code>{code}</code></pre></div>;
}

function ConceptVisualizer({ topic, subtopic }: { topic: Topic; subtopic: Subtopic }) {
  const kind = visualKindFor(topic, subtopic);
  const source = findGroup(subtopic, /understand|important things|behavior|flow|sequence|concept/i);
  const rawSteps = [...(source?.prose ?? []), ...(source?.items ?? [])];
  const steps = (rawSteps.length ? rawSteps : subtopic.groups.flatMap((group) => [...group.prose, ...group.items])).slice(0, 7);
  const safeSteps = steps.length > 1 ? steps : [steps[0] ?? `Create the ${subtopic.title} model`, "Connect the relevant state and dependencies", "Observe the resulting behavior"];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1100);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep >= safeSteps.length - 1) setPlaying(false);
    }, speed);
    return () => window.clearTimeout(timer);
  }, [playing, safeSteps.length, speed, step]);

  const togglePlayback = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step >= safeSteps.length - 1) setStep(0);
    setPlaying(true);
  };
  const replaying = !playing && step >= safeSteps.length - 1;

  return <div className={`concept-visualizer visual-${kind}`} data-testid="concept-visualizer">
    <header><div><span className="visual-live" /> INTERACTIVE MODEL</div><strong>{visualLabel(kind)}</strong><small>Simplified for learning · inspect the explanation below</small></header>
    <div className="visual-stage"><VisualizerDiagram kind={kind} steps={safeSteps} step={step} title={subtopic.title} /></div>
    <div className="visual-explanation" aria-live="polite"><span>{String(step + 1).padStart(2, "0")}</span><div><small>CURRENT STEP</small><h3>{shortLabel(safeSteps[step])}</h3><p>{safeSteps[step]}</p></div></div>
    <footer><button onClick={() => { setStep(0); setPlaying(false); }} aria-label="Reset visualizer"><Icon name="reset" /></button><button onClick={() => { setPlaying(false); setStep(Math.max(0, step - 1)); }} disabled={step === 0} aria-label="Previous step"><Icon name="previous" /></button><button className="visual-play" onClick={togglePlayback} aria-label={playing ? "Pause visualizer" : replaying ? "Replay visualizer" : "Play visualizer"}><Icon name={playing ? "pause" : replaying ? "reset" : "play"} />{playing ? "Pause" : replaying ? "Replay" : "Play"}</button><button onClick={() => { setPlaying(false); setStep(Math.min(safeSteps.length - 1, step + 1)); }} disabled={step === safeSteps.length - 1} aria-label="Next step"><Icon name="next" /></button><div className="visual-progress"><i style={{ width: `${((step + 1) / safeSteps.length) * 100}%` }} /></div><small>{step + 1} / {safeSteps.length}</small><label>Speed<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Visualizer speed"><option value={1700}>0.5×</option><option value={1100}>1×</option><option value={550}>2×</option></select></label></footer>
  </div>;
}

function VisualizerDiagram({ kind, steps, step, title }: { kind: VisualKind; steps: string[]; step: number; title: string }) {
  const labels = steps.map(shortLabel);
  if (kind === "queue") return <div className="queue-diagram"><div><small>CALL STACK</small>{labels.slice(0, 2).map((label, index) => <span className={index === step ? "active" : index < step ? "passed" : ""} key={label}>{label}</span>)}</div><div><small>HOST / APIs</small>{labels.slice(2, 4).map((label, index) => <span className={index + 2 === step ? "active" : index + 2 < step ? "passed" : ""} key={label}>{label}</span>)}</div><div><small>MICROTASKS</small>{labels.slice(4, 6).map((label, index) => <span className={index + 4 === step ? "active" : index + 4 < step ? "passed" : ""} key={label}>{label}</span>)}</div><i className="loop-orbit">EVENT<br />LOOP</i></div>;
  if (kind === "tree") return <div className="tree-diagram"><span className="tree-root">{title}</span><div>{labels.slice(0, 3).map((label, index) => <span className={index === step ? "active" : index < step ? "passed" : ""} key={label}>{label}<i>{labels[index + 3] ?? "lookup"}</i></span>)}</div></div>;
  if (kind === "references") return <div className="reference-diagram"><div className="reference-source"><small>BINDINGS</small>{labels.slice(0, 3).map((label, index) => <span className={index === step ? "active" : ""} key={label}>{label}<i>ref {index + 1}</i></span>)}</div><div className="reference-lines"><i /><i /><i /></div><div className="reference-memory"><small>REACHABLE STATE</small>{labels.slice(3, 6).map((label, index) => <span className={index + 3 === step ? "active" : ""} key={label}>{label}</span>)}</div></div>;
  if (kind === "layout") return <div className="layout-diagram"><div className="layout-viewport"><span className={step === 0 ? "active" : ""}>viewport</span><div className={step === 1 ? "active" : ""}><i /><i /><i /></div><footer className={step >= 2 ? "active" : ""}>flow & sizing</footer></div><aside>{labels.slice(0, 5).map((label, index) => <span className={index === step ? "active" : ""} key={label}>{label}</span>)}</aside></div>;
  if (kind === "boundary") return <div className="boundary-diagram"><div><small>UNTRUSTED / EXTERNAL</small><span>{labels[0]}</span><span>{labels[1]}</span></div><i className={step >= 2 ? "active" : ""}>VALIDATE<br />BOUNDARY</i><div><small>TRUSTED / INTERNAL</small><span>{labels[2]}</span><span>{labels[3]}</span></div></div>;
  if (kind === "layers") return <div className="layers-diagram">{labels.slice(0, 5).map((label, index) => <span className={index === step ? "active" : index < step ? "passed" : ""} style={{ width: `${42 + index * 12}%` }} key={label}><i>{index + 1}</i>{label}</span>)}</div>;
  if (kind === "types") return <div className="types-diagram"><div><small>INPUT TYPE</small><strong>{labels[0] ?? title}</strong></div><i className={step >= 1 ? "active" : ""}>constraint<br />transform</i><div><small>INFERRED OUTPUT</small><strong>{labels[Math.min(step, labels.length - 1)]}</strong></div></div>;
  return <div className="pipeline-diagram"><span className="pipeline-title">{title}</span><div>{labels.slice(0, 6).map((label, index) => <span className={index === step ? "active" : index < step ? "passed" : ""} key={`${label}-${index}`}><i>{String(index + 1).padStart(2, "0")}</i>{label}</span>)}</div></div>;
}

function TopicMindMap({ topic, activeSubtopic }: { topic: Topic; activeSubtopic?: Subtopic }) {
  return <div className="topic-mind-map"><div className="mind-map-core"><small>TOPIC {topic.id}</small><strong>{topic.title}</strong></div><div className="mind-map-nodes">{topic.subtopics.map((entry, index) => <a className={`${entry.id === activeSubtopic?.id ? "active" : ""} node-tone-${index % 4}`} href={subtopicHref(topic, entry)} key={entry.id}><span>{entry.id}</span><strong>{entry.title}</strong><small>{visualLabel(visualKindFor(topic, entry))}</small></a>)}</div><p>Click any node to open its dedicated learning workspace.</p></div>;
}

function Misconceptions({ topic, subtopic }: { topic: Topic; subtopic?: Subtopic }) {
  const mistakes = misconceptionsFor(topic, subtopic);
  return <div className="misconception-list">{mistakes.map((item, index) => <article key={item}><span>0{index + 1}</span><div><small>{index === 0 ? "SIMPLIFIED MODEL" : index === 1 ? "IMPLEMENTATION TRAP" : "SENIOR-LEVEL CAUTION"}</small><p>{item}</p></div></article>)}</div>;
}

function BehaviorNotes({ topic, subtopic }: { topic: Topic; subtopic: Subtopic }) {
  const kind = visualKindFor(topic, subtopic);
  const notes: Record<VisualKind, string[]> = {
    runtime: ["Creation and execution are separate phases; do not explain them as source code physically moving.", "Optimizing engines may represent the mechanism differently while preserving observable semantics."],
    queue: ["Queued work never interrupts the currently executing JavaScript frame.", "Cancellation and ordering must be designed explicitly at asynchronous boundaries."],
    tree: ["Identity and parent-child relationships affect lookup, reuse, and invalidation.", "A visual tree is a model; engines may store optimized internal structures."],
    pipeline: ["An earlier slow stage increases the latency of every dependent stage.", "Parallel work is possible only where data dependencies allow it."],
    references: ["Reachability, not visual presence, determines whether data can be collected.", "Copying a reference does not duplicate the referenced structure."],
    layout: ["Layout decisions are affected by containing blocks and formatting context.", "Read-after-write patterns can force synchronous recalculation."],
    boundary: ["Client-side checks improve UX but never replace server-side enforcement.", "Treat every external value as untrusted until parsed and validated."],
    layers: ["Higher layers should depend on stable contracts, not hidden implementation details.", "Each extra abstraction has an operational and cognitive cost."],
    types: ["Static types are erased and cannot validate external runtime data.", "Preserve useful relationships; do not add generic complexity without benefit."],
    graph: ["Dependency direction matters more than folder names.", "Cycles make change impact and initialization order harder to predict."],
  };
  return <div className="behavior-notes">{notes[kind].map((note) => <p key={note}><span>!</span>{note}</p>)}</div>;
}

function RelatedConcepts({ topic, subtopic }: { topic: Topic; subtopic: Subtopic }) {
  const index = topic.subtopics.findIndex((entry) => entry.id === subtopic.id);
  const sameTopic = [topic.subtopics[index - 1], topic.subtopics[index + 1]].filter(Boolean);
  const crossTopics = relatedTopicsFor(topic).slice(0, 3);
  return <div className="related-concepts"><div><small>WITHIN THIS TOPIC</small>{sameTopic.map((entry) => <a key={entry.id} href={subtopicHref(topic, entry)}><span>{entry.id}</span><strong>{entry.title}</strong><Icon name="arrow" /></a>)}</div><div><small>CROSS-TOPIC CONNECTIONS</small>{crossTopics.map((entry) => <a key={entry.id} href={topicHref(entry)}><span>{entry.id.padStart(2, "0")}</span><strong>{entry.title}</strong><Icon name="link" /></a>)}</div></div>;
}

function TopicSequence({ topic }: { topic: Topic }) {
  const index = visibleTopics.findIndex((entry) => entry.id === topic.id);
  const previous = visibleTopics[index - 1]; const next = visibleTopics[index + 1];
  return <footer className="topic-sequence">{previous ? <a href={topicHref(previous)}><Icon name="back" /><span><small>PREVIOUS TOPIC</small><strong>{previous.title}</strong></span></a> : <span />}{next && <a href={topicHref(next)}><span><small>NEXT TOPIC</small><strong>{next.title}</strong></span><Icon name="arrow" /></a>}</footer>;
}

function SubtopicSequence({ topic, index }: { topic: Topic; index: number }) {
  const previous = topic.subtopics[index - 1]; const next = topic.subtopics[index + 1];
  return <footer className="topic-sequence">{previous ? <a href={subtopicHref(topic, previous)}><Icon name="back" /><span><small>PREVIOUS SUBTOPIC</small><strong>{previous.title}</strong></span></a> : <a href={topicHref(topic)}><Icon name="back" /><span><small>TOPIC OVERVIEW</small><strong>{topic.title}</strong></span></a>}{next ? <a href={subtopicHref(topic, next)}><span><small>NEXT SUBTOPIC</small><strong>{next.title}</strong></span><Icon name="arrow" /></a> : <a href={`${topicHref(topic)}#mind-map`}><span><small>FINISH TOPIC</small><strong>Open the mind map</strong></span><Icon name="map" /></a>}</footer>;
}

function visualKindFor(topic: Topic, subtopic: Subtopic): VisualKind {
  const text = `${topic.title} ${subtopic.title}`.toLowerCase();
  if (/event loop|promise|async|timer|real-time|websocket|polling/.test(text)) return "queue";
  if (/execution context|call stack|function|closure|hook|effect/.test(text)) return "runtime";
  if (/dom|cssom|tree|prototype|fiber|reconciliation|component|document structure/.test(text)) return "tree";
  if (/memory|reference|garbage|mutation|state|cache|storage/.test(text)) return "references";
  if (/css|flex|grid|responsive|layout|position|display|internationalization/.test(text)) return "layout";
  if (/typescript|type |narrowing|generic|validation|contract/.test(text)) return "types";
  if (/security|authentication|authorization|cors|origin|cookie|permission|secret/.test(text)) return "boundary";
  if (/testing|architecture|design system|monorepo|microfrontend|delivery|observability|git/.test(text)) return "layers";
  if (/engine|parser|compiler|browser|rendering|network|http|bundle|loading|performance|ai|service worker/.test(text)) return "pipeline";
  return "graph";
}

function visualLabel(kind: VisualKind) {
  return ({ runtime: "Execution trace", queue: "Queue simulator", tree: "Tree explorer", pipeline: "Pipeline trace", references: "Reference graph", layout: "Layout model", boundary: "Trust boundary", layers: "Layer map", types: "Type transformation", graph: "Relationship graph" } as Record<VisualKind, string>)[kind];
}

function shortLabel(value: string) {
  const clean = value.replace(/[`_*]/g, "");
  return clean.length > 44 ? `${clean.slice(0, 41)}…` : clean;
}

function summaryFor(subtopic: Subtopic) {
  const candidates = subtopic.groups.flatMap((group) => [...group.prose, ...group.items]);
  const explanation = candidates.find((item) => item.length >= 55);
  return explanation ?? `Understand how ${subtopic.title} works, which state it affects, and how its behavior appears in production interfaces.`;
}

function definitionFor(subtopic: Subtopic, topic: Topic) {
  const candidates = subtopic.groups.flatMap((group) => [...group.prose, ...group.items]);
  const authored = candidates.find((item) => item.length >= 75 && /[.!?]$/.test(item));
  if (authored) return authored;
  const kind = visualKindFor(topic, subtopic);
  const definitions: Record<VisualKind, string> = {
    runtime: `${subtopic.title} is an execution mechanism within ${topic.title}. It determines which work is active, which bindings are available, and how control moves from one operation to the next.`,
    queue: `${subtopic.title} coordinates work that cannot finish in the current synchronous turn. It defines when follow-up work becomes eligible, where it waits, and which ordering rules affect the result.`,
    tree: `${subtopic.title} organizes related values as parent-and-child nodes. Structure, identity, and traversal rules determine how the system finds, reuses, and updates those nodes.`,
    pipeline: `${subtopic.title} is a staged process within ${topic.title}. Each stage transforms or validates an input before passing a result to the next dependent stage.`,
    references: `${subtopic.title} describes how bindings point to values and how shared state stays reachable. The key distinction is between copying a reference and creating an independent value graph.`,
    layout: `${subtopic.title} participates in the browser’s constraint-based layout system. Available space, formatting context, intrinsic size, and surrounding content all influence the final result.`,
    boundary: `${subtopic.title} controls a trust boundary in ${topic.title}. It decides which inputs or actions are accepted, which identity or policy is required, and what must be rejected safely.`,
    layers: `${subtopic.title} defines an engineering boundary with a public responsibility and replaceable implementation. Its value comes from controlling dependency direction and reducing the blast radius of change.`,
    types: `${subtopic.title} models possible program states at compile time. It helps preserve relationships between inputs and outputs, while runtime data still requires explicit validation.`,
    graph: `${subtopic.title} is a connected concept within ${topic.title}. Its behavior becomes predictable when you identify the participating entities, the relationships between them, and the direction in which information or control flows.`,
  };
  return definitions[kind];
}

function purposeFor(topic: Topic) {
  return topic.importance.join(" ") || `${topic.title} provides the mechanism and vocabulary needed to reason about the frontend systems that depend on it.`;
}

function purposeForSubtopic(subtopic: Subtopic, topic: Topic) {
  const practical = findGroup(subtopic, /benefit|purpose|use case|useful|solve/i);
  const authored = [...(practical?.prose ?? []), ...(practical?.items ?? [])].find((item) => item.length >= 65);
  return authored ?? `${subtopic.title} exists to make one part of ${topic.title} explicit and controllable. A correct model lets you predict outcomes before running the code, isolate failures faster, and choose an implementation based on behavior rather than convention.`;
}

function usageFor(topic: Topic) {
  const text = topic.title.toLowerCase();
  if (/javascript|function|closure|object|array|async|promise/.test(text)) return "Component logic, event handlers, data transformation, asynchronous requests, libraries, and every framework abstraction ultimately rely on these language semantics.";
  if (/browser|render|network|cache|storage|cors|html|css|accessibility/.test(text)) return "Page loading, interaction responsiveness, responsive layout, accessible controls, API communication, and secure persistence all depend on this web-platform behavior.";
  if (/react|state|redux|server-state/.test(text)) return "Interactive product interfaces use these mechanisms to own state, schedule updates, synchronize external systems, and keep UI behavior explainable.";
  if (/performance|testing|security|reliability|memory/.test(text)) return "Production teams use this knowledge to measure risk, reproduce failures, establish budgets, and keep changes safe under real traffic.";
  return "Senior frontend engineers use this model when choosing boundaries, reviewing implementation trade-offs, debugging production behavior, and explaining system decisions.";
}

function mentalModelFor(topic: Topic, subtopic: Subtopic) {
  const kind = visualKindFor(topic, subtopic);
  const models: Record<VisualKind, string> = { runtime: "Think of each active operation as a workbench with its own bindings and a link to the environment that created it.", queue: "Think of one worker completing the current job while host-managed rails hold eligible follow-up work in a defined order.", tree: "Think of a rooted ownership map: lookup and updates follow edges, while identity decides what may be reused.", pipeline: "Think of a dependency pipeline: a stage can begin only when its required inputs are ready, and early delay propagates forward.", references: "Think of labeled pointers to shared state: copying a pointer does not copy the state, and reachable pointers keep data alive.", layout: "Think of nested constraint boxes: available space flows inward, measured results flow outward, and context changes the rules.", boundary: "Think of a controlled checkpoint between untrusted and trusted zones; validation and policy belong at the crossing.", layers: "Think of stacked contracts: upper layers ask for capabilities while lower layers hide replaceable implementation details.", types: "Think of a compile-time proof system that narrows possible program states but disappears before JavaScript executes.", graph: "Think of explicit nodes and dependency edges: direction determines what can change independently and where cycles create risk." };
  return models[kind];
}

function misconceptionsFor(topic: Topic, subtopic?: Subtopic) {
  const kind = subtopic ? visualKindFor(topic, subtopic) : visualKindFor(topic, topic.subtopics[0]);
  const subject = subtopic?.title ?? topic.title;
  const shared: Record<VisualKind, string[]> = {
    runtime: [`Treating ${subject} as source code physically moving instead of an execution model with observable semantics.`, "Assuming a finished stack frame means every value created by it is immediately removed from memory.", "Explaining engine optimizations as language guarantees rather than implementation strategies."],
    queue: ["Assuming a zero delay means immediate execution or that queued callbacks can interrupt the current stack.", "Describing promises as parallel JavaScript instead of scheduled reactions to eventual outcomes.", "Ignoring cancellation, stale results, starvation, and error propagation when designing asynchronous flows."],
    tree: ["Treating two structurally similar nodes as the same identity during lookup or reconciliation.", "Mutating shared ancestry and expecting consumers to observe a clean isolated change.", "Confusing the educational tree representation with an engine’s optimized internal storage."],
    pipeline: ["Optimizing a late stage while ignoring the earlier dependency that controls the critical path.", "Assuming every stage can execute in parallel even when data dependencies serialize the work.", "Measuring laboratory output without checking user-visible latency and failure behavior."],
    references: ["Assuming object assignment or spread automatically creates a fully independent object graph.", "Treating visual removal as proof that data is unreachable and eligible for collection.", "Using unbounded caches or long-lived listeners without defining ownership and cleanup."],
    layout: ["Changing properties without understanding the containing block or formatting context that resolves them.", "Mixing layout reads and writes in a loop and unintentionally forcing synchronous recalculation.", "Designing for one viewport or language length and treating overflow as an edge case."],
    boundary: ["Treating client-side validation or hidden UI as a security boundary.", "Storing sensitive credentials where injected scripts can read them without evaluating the threat model.", "Applying a security mechanism without understanding which attack, origin, or resource it actually protects."],
    layers: ["Adding abstraction layers without a change boundary, ownership need, or measurable reduction in coupling.", "Sharing internal modules directly and bypassing the public contract that protects dependency direction.", "Confusing repository structure with architecture while runtime dependencies remain tangled."],
    types: ["Casting an external value and assuming TypeScript validated it at runtime.", "Using advanced generic syntax that does not preserve a useful relationship for callers.", "Deriving public contracts from internal models and accidentally exposing implementation details."],
    graph: [`Treating ${subject} as an isolated definition instead of identifying the values, actors, and relationships that make it work.`, "Memorizing the happy path while ignoring which dependency owns the transition and which failure can interrupt it.", "Choosing an implementation before describing the required behavior, change axis, and observable trade-off."],
  };
  return shared[kind];
}

function relatedTopicsFor(topic: Topic) {
  const id = Number(topic.id);
  const candidates = id <= 10 ? [11, 29, 47] : id <= 23 ? [1, 44, 49] : id <= 28 ? [1, 29, 40] : id <= 43 ? [1, 44, 48] : id <= 50 ? [11, 29, 58] : [29, 48, 59];
  return candidates
    .map((candidate) => visibleTopics.find((entry) => Number(entry.id) === candidate))
    .filter((entry): entry is Topic => Boolean(entry) && entry?.id !== topic.id);
}

function domainDescription(label: string) {
  const descriptions: Record<string, string> = { "JavaScript language": "Execution, scope, functions, identity, objects, and asynchronous control flow.", "Web platform": "Browser architecture, rendering, networking, semantics, accessibility, and CSS layout.", TypeScript: "Static modeling, narrowing, generics, advanced transformations, and runtime boundaries.", React: "Rendering, state, hooks, effects, context, forms, recovery, and concurrent behavior.", "State & data": "State classification, Redux, server state, API boundaries, auth, and real-time updates.", "Performance & quality": "Measurement, rendering cost, bundles, memory, tests, security, and reliability.", "Frontend architecture": "Module boundaries, component APIs, design systems, delivery, flags, and observability.", "Engineering practice": "Documentation, AI interfaces, collaboration, localization, and offline systems." };
  return descriptions[label] ?? "Connected frontend engineering concepts.";
}
