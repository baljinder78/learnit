"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  knowledgeLinks,
  systemCases,
  visualLabels,
  weekOneLessons,
  weeks,
  type VisualKind,
} from "./curriculum";
import masteryData from "./mastery-data.json";

type MasteryGroup = { title: string; items: string[]; prose: string[]; code: string[] };
type MasterySubtopic = { id: string; title: string; groups: MasteryGroup[] };
type MasteryTopic = { id: string; title: string; importance: string[]; subtopics: MasterySubtopic[] };
type MasteryCurriculum = { title: string; topics: MasteryTopic[]; stats: { topics: number; subtopics: number; groups: number; learningPoints: number } };
const mastery = masteryData as MasteryCurriculum;

type Mode = "dashboard" | "roadmap" | "lesson" | "labs" | "practice" | "interview" | "revision" | "system";

type ProgressState = {
  completedLessons: string[];
  quizScores: Record<string, boolean>;
  exerciseRuns: number;
  minutes: number;
  streak: number;
  lastVisit: string;
  weakTopics: string[];
  completedSubtopics: string[];
  completedMasteryItems: string[];
};

const defaultProgress: ProgressState = {
  completedLessons: ["execution-context", "scope-closures"],
  quizScores: { "execution-context": true, "scope-closures": false },
  exerciseRuns: 4,
  minutes: 286,
  streak: 6,
  lastVisit: new Date().toISOString().slice(0, 10),
  weakTopics: ["Variance", "Promise cancellation", "React transitions"],
  completedSubtopics: [],
  completedMasteryItems: [],
};

const progressStore = {
  load(): ProgressState {
    if (typeof window === "undefined") return defaultProgress;
    try {
      const value = window.localStorage.getItem("frontend-atlas-progress-v1");
      return value ? { ...defaultProgress, ...JSON.parse(value) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  },
  save(progress: ProgressState) {
    try {
      window.localStorage.setItem("frontend-atlas-progress-v1", JSON.stringify(progress));
    } catch {
      // Progress remains usable in-memory when storage is unavailable.
    }
  },
};

function Glyph({ name }: { name: string }) {
  const glyphs: Record<string, string> = {
    dashboard: "⌂",
    roadmap: "≋",
    labs: "◇",
    practice: "</>",
    interview: "◌",
    revision: "↻",
    system: "⌘",
    search: "⌕",
    sun: "☼",
    moon: "◐",
    check: "✓",
    arrow: "→",
    play: "▶",
    pause: "Ⅱ",
    next: "›",
    previous: "‹",
    restart: "↺",
  };
  return <span aria-hidden="true">{glyphs[name] ?? "•"}</span>;
}

const navigation: { id: Mode; label: string; icon: string }[] = [
  { id: "dashboard", label: "Overview", icon: "dashboard" },
  { id: "roadmap", label: "Roadmap", icon: "roadmap" },
  { id: "labs", label: "Visual lab", icon: "labs" },
  { id: "practice", label: "Practice", icon: "practice" },
  { id: "interview", label: "Interview", icon: "interview" },
  { id: "revision", label: "Revision", icon: "revision" },
  { id: "system", label: "System design", icon: "system" },
];

export default function LearningApp() {
  const [mode, setMode] = useState<Mode>("dashboard");
  const [lessonId, setLessonId] = useState<string>("event-loop");
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      setProgress(progressStore.load());
      const savedTheme = window.localStorage.getItem("frontend-atlas-theme");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(hydration);
  }, []);

  useEffect(() => {
    if (ready) progressStore.save(progress);
  }, [progress, ready]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (ready) window.localStorage.setItem("frontend-atlas-theme", theme);
  }, [theme, ready]);

  const openLesson = (id: string) => {
    setLessonId(id);
    setMode("lesson");
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = (next: Mode) => {
    setMode(next);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markComplete = (id: string) => {
    setProgress((current) => ({
      ...current,
      completedLessons: current.completedLessons.includes(id)
        ? current.completedLessons.filter((item) => item !== id)
        : [...current.completedLessons, id],
    }));
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to learning content</a>
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav((value) => !value)} aria-expanded={mobileNav} aria-label="Toggle navigation">≡</button>
        <button className="brand" onClick={() => navigate("dashboard")} aria-label="Frontend Atlas home">
          <span className="brand-mark"><span>F</span><span>A</span></span>
          <span><strong>Frontend Atlas</strong><small>Senior engineering field guide</small></span>
        </button>
        <div className="topbar-context">
          <span className="signal-dot" />
          <span>Topic 01</span>
          <span className="context-slash">/</span>
          <strong>JavaScript execution</strong>
        </div>
        <div className="topbar-actions">
          <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            <Glyph name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className="streak-pill" onClick={() => navigate("revision")}><span>✦</span><strong>{progress.streak}</strong><span>day streak</span></button>
          <div className="avatar" aria-label="Local learner profile">BS</div>
        </div>
      </header>

      <aside className={`sidebar ${mobileNav ? "is-open" : ""}`} aria-label="Primary navigation">
        <nav>
          {navigation.map((item) => (
            <button key={item.id} className={mode === item.id || (mode === "lesson" && item.id === "roadmap") ? "active" : ""} onClick={() => navigate(item.id)}>
              <span className="nav-icon"><Glyph name={item.icon} /></span>
              <span>{item.label}</span>
              {item.id === "roadmap" && <small>66</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-progress">
          <div className="mini-ring" style={{ "--progress": `${(progress.completedSubtopics.length / mastery.stats.subtopics) * 100}%` } as React.CSSProperties}><span>{Math.round((progress.completedSubtopics.length / mastery.stats.subtopics) * 100)}%</span></div>
          <div><small>Mastery progress</small><strong>{progress.completedSubtopics.length} of {mastery.stats.subtopics} subtopics</strong></div>
        </div>
        <div className="sidebar-note"><span>⌁</span><p><strong>Local-first</strong>Your progress stays on this device.</p></div>
      </aside>

      <main id="main-content" className="main-content" tabIndex={-1}>
        {mode === "dashboard" && <Dashboard progress={progress} openLesson={openLesson} navigate={navigate} />}
        {mode === "roadmap" && <Roadmap
          progress={progress}
          openLesson={openLesson}
          toggleSubtopic={(id) => setProgress((current) => ({
            ...current,
            completedSubtopics: current.completedSubtopics.includes(id)
              ? current.completedSubtopics.filter((item) => item !== id)
              : [...current.completedSubtopics, id],
          }))}
          toggleMasteryItem={(id) => setProgress((current) => ({
            ...current,
            completedMasteryItems: current.completedMasteryItems.includes(id)
              ? current.completedMasteryItems.filter((item) => item !== id)
              : [...current.completedMasteryItems, id],
          }))}
        />}
        {mode === "lesson" && (
          <LessonView
            key={lessonId}
            lessonId={lessonId}
            progress={progress}
            openLesson={openLesson}
            markComplete={markComplete}
            recordQuiz={(id, correct) => setProgress((current) => ({
              ...current,
              quizScores: { ...current.quizScores, [id]: correct },
              weakTopics: correct ? current.weakTopics.filter((topic) => topic !== id) : Array.from(new Set([...current.weakTopics, id])),
            }))}
          />
        )}
        {mode === "labs" && <VisualLab openLesson={openLesson} />}
        {mode === "practice" && <PracticeStudio onRun={() => setProgress((current) => ({ ...current, exerciseRuns: current.exerciseRuns + 1 }))} />}
        {mode === "interview" && <InterviewMode />}
        {mode === "revision" && <RevisionMode progress={progress} openLesson={openLesson} />}
        {mode === "system" && <SystemDesignCanvas />}
      </main>
    </div>
  );
}

function Dashboard({ progress, openLesson, navigate }: { progress: ProgressState; openLesson: (id: string) => void; navigate: (mode: Mode) => void }) {
  const accuracy = Math.round((Object.values(progress.quizScores).filter(Boolean).length / Math.max(Object.keys(progress.quizScores).length, 1)) * 100);
  return (
    <div className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> CURRENT FIELDWORK · TOPIC 01</p>
          <h1>See the runtime.<br /><em>Explain the trade-off.</em></h1>
          <p className="hero-lede">A visual, practice-first path from JavaScript internals to frontend system design. Built for engineers who want a senior mental model—not another checklist.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => openLesson("event-loop")}><Glyph name="play" /> Continue: The event loop</button>
            <button className="secondary-button" onClick={() => navigate("roadmap")}>Explore the roadmap <Glyph name="arrow" /></button>
          </div>
          <div className="resume-row">
            <div className="lesson-progress"><span style={{ width: "42%" }} /></div>
            <span>Lesson 5 of 12</span><span>·</span><span>18 min remaining</span>
          </div>
        </div>
        <div className="hero-lab-wrap">
          <div className="hero-lab-label"><span>LIVE MENTAL MODEL</span><strong>Event loop · Step 4</strong></div>
          <EventLoopMini />
        </div>
      </section>

      <section className="metrics-strip" aria-label="Learning progress summary">
        <Metric label="Overall" value={`${Math.round((progress.completedSubtopics.length / mastery.stats.subtopics) * 100)}%`} detail={`${mastery.stats.topics} topics · ${mastery.stats.subtopics} subtopics`} tone="blue" />
        <Metric label="Focused time" value={`${Math.floor(progress.minutes / 60)}h ${progress.minutes % 60}m`} detail="+48m this week" tone="green" />
        <Metric label="Exercises" value={String(progress.exerciseRuns)} detail="3 passing" tone="orange" />
        <Metric label="Quiz accuracy" value={`${accuracy}%`} detail="2 concepts to revisit" tone="violet" />
        <Metric label="Interview readiness" value="31%" detail="Building foundation" tone="yellow" />
      </section>

      <div className="dashboard-grid">
        <section className="panel current-week-panel">
          <div className="panel-heading"><div><p className="eyebrow">CURRENT MAP</p><h2>Foundation track · Runtime mechanics</h2></div><button onClick={() => navigate("roadmap")}>Full map <Glyph name="arrow" /></button></div>
          <div className="lesson-list">
            {weekOneLessons.slice(0, 6).map((lesson, index) => {
              const complete = progress.completedLessons.includes(lesson.id);
              return (
                <button key={lesson.id} className={`lesson-row ${lesson.id === "event-loop" ? "current" : ""}`} onClick={() => openLesson(lesson.id)}>
                  <span className={`lesson-index ${complete ? "complete" : ""}`}>{complete ? <Glyph name="check" /> : String(index + 1).padStart(2, "0")}</span>
                  <span className="lesson-copy"><strong>{lesson.title}</strong><small>{lesson.concepts.slice(0, 3).join(" · ")}</small></span>
                  <span className="lesson-duration">{lesson.minutes} min</span>
                  <span className="row-arrow"><Glyph name="arrow" /></span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="dashboard-side">
          <section className="panel weak-panel">
            <div className="panel-heading"><div><p className="eyebrow">REVISION SIGNALS</p><h2>Needs another pass</h2></div><span className="count-badge">{progress.weakTopics.length}</span></div>
            {progress.weakTopics.map((topic, index) => <button key={topic} onClick={() => navigate("revision")}><span className={`weak-rank rank-${index}`}>{index + 1}</span><span><strong>{topic}</strong><small>{index === 0 ? "Low confidence" : "Due for review"}</small></span><Glyph name="arrow" /></button>)}
          </section>
          <section className="panel next-review">
            <p className="eyebrow">NEXT REVISION</p>
            <div className="review-date"><strong>18</strong><span>JUL<br />SAT</span></div>
            <p>8 flashcards · 2 weak concepts · ~12 minutes</p>
            <button className="secondary-button wide" onClick={() => navigate("revision")}>Start early <Glyph name="arrow" /></button>
          </section>
        </aside>
      </div>

      <section className="knowledge-section">
        <div><p className="eyebrow">KNOWLEDGE GRAPH</p><h2>Concepts are connected.<br />Learn the edges.</h2><p>Follow the paths that turn isolated facts into a reusable engineering model.</p><button className="secondary-button" onClick={() => navigate("labs")}>Open relationship map <Glyph name="arrow" /></button></div>
        <KnowledgeGraph />
      </section>
    </div>
  );
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  return <div className={`metric metric-${tone}`}><span className="metric-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function EventLoopMini() {
  return (
    <div className="event-mini" aria-label="Event loop diagram showing microtasks before timers">
      <div className="code-gutter"><span>1</span><span>2</span><span className="active">3</span><span>4</span><span>5</span></div>
      <pre><code><span className="muted">console.log(</span><span className="string">&apos;A&apos;</span><span className="muted">)</span>{"\n"}<span className="blue">setTimeout</span><span className="muted">(task, 0)</span>{"\n"}<span className="highlight"><span className="violet">Promise</span>.resolve().then(micro)</span>{"\n"}<span className="blue">queueMicrotask</span><span className="muted">(micro2)</span>{"\n"}<span className="muted">console.log(</span><span className="string">&apos;E&apos;</span><span className="muted">)</span></code></pre>
      <div className="loop-panels">
        <div><small>CALL STACK</small><span className="stack-frame">global()</span></div>
        <div><small>WEB APIs</small><span className="api-frame">timer · ready</span></div>
        <div className="queue-panel"><small>MICROTASKS</small><span>micro()</span><span>micro2()</span></div>
        <div className="queue-panel task"><small>TASKS</small><span>task()</span></div>
      </div>
      <div className="mini-explanation"><span>04</span><p><strong>Promise reaction queued.</strong> It waits until the current stack is empty, then runs before the timer task.</p></div>
    </div>
  );
}

function Roadmap({ progress, openLesson, toggleSubtopic, toggleMasteryItem }: { progress: ProgressState; openLesson: (id: string) => void; toggleSubtopic: (id: string) => void; toggleMasteryItem: (id: string) => void }) {
  const [topicId, setTopicId] = useState("1");
  const [subtopicId, setSubtopicId] = useState("1.1");
  const [query, setQuery] = useState("");
  const topic = mastery.topics.find((item) => item.id === topicId) ?? mastery.topics[0];
  const subtopic = topic.subtopics.find((item) => item.id === subtopicId) ?? topic.subtopics[0];
  const allSubtopics = useMemo(() => mastery.topics.flatMap((item) => item.subtopics.map((entry) => ({ topic: item, subtopic: entry }))), []);
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => normalized ? allSubtopics.filter(({ topic: item, subtopic: entry }) => {
    const searchable = `${item.title} ${entry.title} ${entry.groups.flatMap((group) => [group.title, ...group.items, ...group.prose]).join(" ")}`.toLowerCase();
    return searchable.includes(normalized);
  }).slice(0, 40) : [], [allSubtopics, normalized]);
  const currentIndex = allSubtopics.findIndex((item) => item.subtopic.id === subtopic.id);
  const completedInTopic = topic.subtopics.filter((item) => progress.completedSubtopics.includes(item.id)).length;
  const practicalGroups = subtopic.groups.filter((group) => /practical|mastery|exercise|implementation|practice/i.test(group.title));
  const learningGroups = subtopic.groups.filter((group) => !practicalGroups.includes(group));

  const selectTopic = (nextTopic: MasteryTopic) => {
    setTopicId(nextTopic.id);
    setSubtopicId(nextTopic.subtopics[0]?.id ?? `${nextTopic.id}.1`);
  };
  const selectSearchResult = (nextTopic: MasteryTopic, nextSubtopic: MasterySubtopic) => {
    setTopicId(nextTopic.id);
    setSubtopicId(nextSubtopic.id);
    setQuery("");
  };
  const move = (delta: number) => {
    const next = allSubtopics[Math.max(0, Math.min(allSubtopics.length - 1, currentIndex + delta))];
    if (next) selectSearchResult(next.topic, next.subtopic);
  };

  return (
    <div className="page roadmap-page mastery-page">
      <PageIntro eyebrow="SEQUENTIAL FRONTEND KNOWLEDGE MAP" title="Complete mastery curriculum" copy={`${mastery.stats.topics} topics → ${mastery.stats.subtopics} subtopics → ${mastery.stats.groups} learning sections → ${mastery.stats.learningPoints.toLocaleString()} concepts, explanations, questions, and practical mastery points.`} />
      <div className="mastery-summary" aria-label="Mastery curriculum statistics">
        <span><strong>{mastery.stats.topics}</strong><small>Topics</small></span>
        <span><strong>{mastery.stats.subtopics}</strong><small>Subtopics</small></span>
        <span><strong>{mastery.stats.learningPoints.toLocaleString()}</strong><small>Learning points</small></span>
        <span><strong>{progress.completedSubtopics.length}</strong><small>Completed</small></span>
      </div>
      <label className="global-search mastery-search"><Glyph name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search every topic, subtopic, concept, question, or mastery task…" /><kbd>⌘ K</kbd></label>
      {normalized && <section className="mastery-search-results"><div><span>SEARCHING THE FULL MAP</span><strong>{matches.length} results</strong></div>{matches.length ? matches.map(({ topic: item, subtopic: entry }) => <button key={`${item.id}-${entry.id}`} onClick={() => selectSearchResult(item, entry)}><span>{entry.id}</span><strong>{entry.title}</strong><small>{item.title}</small><Glyph name="arrow" /></button>) : <p>No matching learning point. Try a mechanism, API, failure mode, or implementation term.</p>}</section>}

      {!normalized && <div className="mastery-shell">
        <aside className="mastery-topics" aria-label="Sequential topics">
          <div className="mastery-column-title"><span>01</span><div><small>LEVEL ONE</small><strong>Topics</strong></div></div>
          <nav>{mastery.topics.map((item) => {
            const completed = item.subtopics.filter((entry) => progress.completedSubtopics.includes(entry.id)).length;
            return <button key={item.id} className={item.id === topic.id ? "active" : ""} onClick={() => selectTopic(item)}><span>{item.id.padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{completed}/{item.subtopics.length} complete</small></div><i style={{ "--topic-progress": `${(completed / Math.max(item.subtopics.length, 1)) * 100}%` } as React.CSSProperties} /></button>;
          })}</nav>
        </aside>

        <aside className="mastery-subtopics" aria-label={`Subtopics in ${topic.title}`}>
          <div className="mastery-column-title"><span>02</span><div><small>LEVEL TWO</small><strong>Subtopics</strong></div></div>
          <header><span>TOPIC {topic.id.padStart(2, "0")}</span><h2>{topic.title}</h2><p>{topic.importance.join(" ")}</p><div><i style={{ width: `${(completedInTopic / Math.max(topic.subtopics.length, 1)) * 100}%` }} /><small>{completedInTopic} of {topic.subtopics.length}</small></div></header>
          <nav>{topic.subtopics.map((item, index) => <button key={item.id} className={`${item.id === subtopic.id ? "active" : ""} ${progress.completedSubtopics.includes(item.id) ? "complete" : ""}`} onClick={() => setSubtopicId(item.id)}><span>{progress.completedSubtopics.includes(item.id) ? <Glyph name="check" /> : String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.groups.reduce((sum, group) => sum + group.items.length + group.prose.length, 0)} points</small></button>)}</nav>
        </aside>

        <article className="mastery-detail" data-testid="mastery-detail">
          <header className="mastery-detail-header"><div><p><span>TOPIC {topic.id.padStart(2, "0")}</span><Glyph name="arrow" /><span>SUBTOPIC {subtopic.id}</span></p><h1>{subtopic.title}</h1><p>{topic.title}</p></div><button className={progress.completedSubtopics.includes(subtopic.id) ? "completed" : ""} onClick={() => toggleSubtopic(subtopic.id)}><Glyph name={progress.completedSubtopics.includes(subtopic.id) ? "check" : "arrow"} />{progress.completedSubtopics.includes(subtopic.id) ? "Mastered" : "Mark mastered"}</button></header>

          <div className="mastery-level-path"><span className="active"><i>1</i>Topic</span><Glyph name="arrow" /><span className="active"><i>2</i>Subtopic</span><Glyph name="arrow" /><span><i>3</i>Concepts</span><Glyph name="arrow" /><span><i>4</i>Understand</span><Glyph name="arrow" /><span><i>5</i>Practise</span></div>

          <section className="mastery-importance"><span>WHY THIS BUILDS THE NEXT LAYER</span><p>{topic.importance.join(" ") || `${subtopic.title} is a required step in the sequence before moving to the next frontend engineering layer.`}</p></section>

          {learningGroups.map((group, groupIndex) => <MasteryGroupView key={`${group.title}-${groupIndex}`} group={group} index={groupIndex} />)}

          {practicalGroups.length > 0 && <section className="mastery-practice"><div className="mastery-group-heading"><span>05</span><div><small>PRACTICAL MASTERY</small><h2>Prove it through action</h2></div></div>{practicalGroups.map((group, groupIndex) => <div key={`${group.title}-${groupIndex}`}><h3>{group.title}</h3>{group.prose.map((text, index) => <p key={`${text}-${index}`}>{text}</p>)}<div className="mastery-checklist">{group.items.map((item, itemIndex) => {
            const id = `${subtopic.id}:practice:${groupIndex}:${itemIndex}`;
            const checked = progress.completedMasteryItems.includes(id);
            return <label key={id} className={checked ? "checked" : ""}><input type="checkbox" checked={checked} onChange={() => toggleMasteryItem(id)} /><span><Glyph name={checked ? "check" : "arrow"} /></span><strong>{item}</strong></label>;
          })}</div>{group.code.map((code, index) => <CodeBlock key={`${code}-${index}`} code={code} />)}</div>)}</section>}

          <div className="mastery-deep-link"><div><small>INTERACTIVE DEEP DIVE</small><strong>Open the related visual lesson, execution trace, exercises, and interview questions.</strong></div><button className="secondary-button" onClick={() => openLesson(bestLessonFor(`${topic.title} ${subtopic.title}`))}>Open visual lesson <Glyph name="arrow" /></button></div>

          <footer className="mastery-sequence"><button onClick={() => move(-1)} disabled={currentIndex <= 0}><Glyph name="previous" /><span><small>PREVIOUS</small><strong>{allSubtopics[currentIndex - 1]?.subtopic.title ?? "Start"}</strong></span></button><div><span>{currentIndex + 1}</span><i><b style={{ width: `${((currentIndex + 1) / allSubtopics.length) * 100}%` }} /></i><small>{allSubtopics.length}</small></div><button onClick={() => move(1)} disabled={currentIndex >= allSubtopics.length - 1}><span><small>NEXT IN SEQUENCE</small><strong>{allSubtopics[currentIndex + 1]?.subtopic.title ?? "Complete"}</strong></span><Glyph name="next" /></button></footer>
        </article>
      </div>}
    </div>
  );
}

function MasteryGroupView({ group, index }: { group: MasteryGroup; index: number }) {
  const concepts = /concept|subtopic|types|methods|components|values|layers|states/i.test(group.title);
  const questions = /question/i.test(group.title);
  const understand = /understand|important|distinction|characteristic|benefit|caution|practice|risk|flow|sequence/i.test(group.title);
  const label = concepts ? "IMPORTANT CONCEPTS" : questions ? "REASONING QUESTIONS" : understand ? "KEY THINGS TO UNDERSTAND" : group.title.toUpperCase();
  return <section className={`mastery-group ${concepts ? "concept-group" : ""} ${questions ? "question-group" : ""}`}><div className="mastery-group-heading"><span>{String(Math.min(index + 3, 9)).padStart(2, "0")}</span><div><small>{label}</small><h2>{group.title}</h2></div></div>{group.prose.map((text, proseIndex) => <p key={`${text}-${proseIndex}`}>{text}</p>)}{group.items.length > 0 && (concepts ? <div className="mastery-concept-grid">{group.items.map((item, itemIndex) => <span key={`${item}-${itemIndex}`}><i>{String(itemIndex + 1).padStart(2, "0")}</i>{item}</span>)}</div> : <ul>{group.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}><span>{questions ? "?" : "→"}</span><p>{item}</p></li>)}</ul>)}{group.code.map((code, codeIndex) => <CodeBlock key={`${code}-${codeIndex}`} code={code} />)}</section>;
}

function bestLessonFor(topic: string) {
  const lowered = topic.toLowerCase();
  const exact = weekOneLessons.find((lesson) => lesson.concepts.some((concept) => lowered.includes(concept.toLowerCase()) || concept.toLowerCase().includes(lowered)));
  if (exact) return exact.id;
  if (/promise|async|await/.test(lowered)) return "promises";
  if (/type|generic|keyof|variance|interface|union/.test(lowered)) return "ts-generics";
  if (/retry|abort|concurr|dedup|race/.test(lowered)) return "async-control";
  if (/clone|copy|mutation|garbage|memory/.test(lowered)) return "values-memory";
  return "implementation-studio";
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></header>;
}

type Lesson = (typeof weekOneLessons)[number];

function LessonView({ lessonId, progress, openLesson, markComplete, recordQuiz }: { lessonId: string; progress: ProgressState; openLesson: (id: string) => void; markComplete: (id: string) => void; recordQuiz: (id: string, correct: boolean) => void }) {
  const lesson = (weekOneLessons.find((item) => item.id === lessonId) ?? weekOneLessons[0]) as Lesson;
  const index = weekOneLessons.findIndex((item) => item.id === lesson.id);
  const isComplete = progress.completedLessons.includes(lesson.id);
  const [mistakeLevel, setMistakeLevel] = useState<"Junior" | "Mid-level" | "Senior">("Senior");
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="lesson-layout">
      <aside className="lesson-rail">
        <button className="rail-back" onClick={() => openLesson("execution-context")}>← Week 1 map</button>
        <p>JAVASCRIPT & TYPESCRIPT</p>
        <nav aria-label="Week 1 lessons">{weekOneLessons.map((item, itemIndex) => <button key={item.id} className={`${item.id === lesson.id ? "active" : ""} ${progress.completedLessons.includes(item.id) ? "complete" : ""}`} onClick={() => openLesson(item.id)}><span>{progress.completedLessons.includes(item.id) ? <Glyph name="check" /> : String(itemIndex + 1).padStart(2, "0")}</span><strong>{item.title}</strong></button>)}</nav>
      </aside>
      <article className="lesson-page">
        <header className="lesson-header">
          <div><p className="eyebrow">{lesson.eyebrow}</p><h1>{lesson.title}</h1><p>{lesson.intro}</p></div>
          <div className="lesson-status"><span>{lesson.minutes} min</span><button className={isComplete ? "completed" : ""} onClick={() => markComplete(lesson.id)}><Glyph name={isComplete ? "check" : "arrow"} /> {isComplete ? "Completed" : "Mark complete"}</button></div>
        </header>
        <div className="concept-strip">{lesson.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>

        <section className="lesson-section"><SectionNumber n="01" label="CONCEPT INTRODUCTION" /><h2>Start with the mechanism</h2><p className="large-copy">{lesson.intro}</p><div className="why-grid"><div><h3>Why it matters</h3><p>{lesson.why}</p></div><ImpactGrid /></div></section>

        <section className="lesson-section mental-model"><SectionNumber n="02" label="MENTAL MODEL" /><div className="model-card"><span className="model-label">USEFUL MODEL</span><p>{lesson.analogy}</p><small>Simplified models are marked. Use them to predict behavior, then refine with the technical trace below.</small></div></section>

        <section className="lesson-section visual-section"><SectionNumber n="03" label="VISUAL EXPLANATION" /><h2>Run it one decision at a time</h2><p>The visual model exposes only the runtime panels that matter for this concept. Pause anywhere and inspect the current state.</p>{lesson.id === "event-loop" ? <EventLoopLab /> : <ConceptTrace lesson={lesson} />}</section>

        <section className="lesson-section code-section"><SectionNumber n="04" label="CODE + EXECUTION" /><div className="code-execution-grid"><CodeBlock code={lesson.code} /><div className="execution-notes"><span>CURRENT INVARIANT</span><h3>{lesson.concepts[0]}</h3><p>{lesson.why}</p><div><small>Watch</small><strong>{lesson.concepts.slice(1, 4).join(" · ")}</strong></div></div></div></section>

        <section className="lesson-section"><SectionNumber n="05" label="COMMON MISTAKES" /><div className="tabs" role="tablist">{(["Junior", "Mid-level", "Senior"] as const).map((level) => <button role="tab" aria-selected={mistakeLevel === level} className={mistakeLevel === level ? "active" : ""} onClick={() => setMistakeLevel(level)} key={level}>{level}</button>)}</div><div className="mistake-card"><span>!</span><div><h3>{mistakeLevel} failure mode</h3><p>{mistakeLevel === "Senior" ? lesson.mistake : mistakeLevel === "Mid-level" ? `Knowing the rule but missing its lifecycle consequence. ${lesson.mistake}` : `Memorizing the output without a model. ${lesson.mistake}`}</p></div></div></section>

        <section className="lesson-section production-grid"><div><SectionNumber n="06" label="IN PRODUCTION" /><h2>Where this becomes real</h2><p>{lesson.production}</p></div><div><SectionNumber n="07" label="ARCHITECTURAL VIEW" /><h2>Zoom out</h2><p>{lesson.architecture}</p></div></section>

        <section className="lesson-section interview-section"><SectionNumber n="08" label="INTERVIEW LENS" /><div className="interview-card"><span className="question-level">SENIOR · TRADE-OFF</span><h2>{lesson.question}</h2><details><summary>Reveal a strong answer</summary><p>{lesson.answer}</p><small>A strong answer names the mechanism, a failure mode, and the design implication.</small></details></div><div className="question-types">{["Concept", "Reasoning", "Code output", "Debugging", "System design"].map((type, i) => <span key={type}><small>0{i + 1}</small>{type}</span>)}</div></section>

        <section className="lesson-section exercise-section"><SectionNumber n="09" label="PRACTICE EXERCISE" /><OrderingExercise lesson={lesson} /></section>

        <section className="lesson-section quiz-section"><SectionNumber n="10" label="KNOWLEDGE CHECK" /><h2>{lesson.quiz.prompt}</h2><div className="quiz-options">{lesson.quiz.options.map((option, optionIndex) => <button key={option} className={`${quizChoice === optionIndex ? "selected" : ""} ${submitted && optionIndex === lesson.quiz.correct ? "correct" : ""} ${submitted && quizChoice === optionIndex && optionIndex !== lesson.quiz.correct ? "wrong" : ""}`} onClick={() => !submitted && setQuizChoice(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>{!submitted ? <button className="primary-button" disabled={quizChoice === null} onClick={() => { if (quizChoice !== null) { setSubmitted(true); recordQuiz(lesson.id, quizChoice === lesson.quiz.correct); } }}>Check answer</button> : <div className={`quiz-feedback ${quizChoice === lesson.quiz.correct ? "success" : "retry"}`}><strong>{quizChoice === lesson.quiz.correct ? "Correct — model confirmed." : "Not quite — trace the mechanism again."}</strong><p>{lesson.quiz.explanation}</p></div>}</section>

        <footer className="lesson-summary"><p className="eyebrow">SUMMARY</p><h2>Keep this model</h2><div><span><small>KEY TAKEAWAY</small><strong>{lesson.intro}</strong></span><span><small>ONE-LINE MODEL</small><strong>{lesson.analogy.split("Runtime truth:")[0].replace("Analogy: ", "")}</strong></span><span><small>STUDY NEXT</small><button onClick={() => openLesson(weekOneLessons[Math.min(index + 1, weekOneLessons.length - 1)].id)}>{weekOneLessons[Math.min(index + 1, weekOneLessons.length - 1)].title} <Glyph name="arrow" /></button></span></div></footer>
      </article>
    </div>
  );
}

function SectionNumber({ n, label }: { n: string; label: string }) { return <div className="section-number"><span>{n}</span><small>{label}</small></div>; }

function ImpactGrid() {
  return <div className="impact-grid">{[["Correctness", "Predict state"], ["Performance", "Spot blocking"], ["Maintainability", "Name ownership"], ["Architecture", "Shape boundaries"], ["Interviews", "Explain why"]].map(([label, value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div>;
}

function CodeBlock({ code }: { code: string }) {
  return <div className="code-block"><div className="code-toolbar"><span><i /><i /><i /></span><small>example.ts</small><button onClick={() => navigator.clipboard?.writeText(code)}>Copy</button></div><pre><code>{code}</code></pre></div>;
}

function ConceptTrace({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState(0);
  const stages = lesson.concepts.slice(0, 5);
  return <div className="concept-trace"><div className="trace-canvas">{stages.map((stage, index) => <div key={stage} className={`${index === step ? "active" : ""} ${index < step ? "passed" : ""}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{index < step ? "resolved" : index === step ? "inspect now" : "waiting"}</small>{index < stages.length - 1 && <i />}</div>)}</div><div className="trace-inspector"><span>CURRENT STATE · {step + 1}/{stages.length}</span><h3>{stages[step]}</h3><p>{traceExplanation(lesson.id, stages[step])}</p></div><Transport step={step} max={stages.length - 1} setStep={setStep} /></div>;
}

function traceExplanation(id: string, stage: string) {
  if (id.includes("ts")) return `${stage} constrains the possible program states at compile time. No runtime JavaScript is added by this step.`;
  if (id === "values-memory") return `${stage} changes which identities are reachable. Follow the reference edges before deciding whether the value can be collected or safely mutated.`;
  if (id === "scope-closures") return `${stage} is reachable from the active function. Only bindings still referenced by live closures must remain available.`;
  return `${stage} is the active decision in the model. Inspect the call site, owned data, and next lookup before advancing.`;
}

function Transport({ step, max, setStep, playing, setPlaying, speed, setSpeed }: { step: number; max: number; setStep: (step: number) => void; playing?: boolean; setPlaying?: (value: boolean) => void; speed?: number; setSpeed?: (value: number) => void }) {
  return <div className="transport"><button onClick={() => setStep(0)} aria-label="Restart"><Glyph name="restart" /></button><button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} aria-label="Previous step"><Glyph name="previous" /></button>{setPlaying && <button className="play-button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}><Glyph name={playing ? "pause" : "play"} /></button>}<button onClick={() => setStep(Math.min(max, step + 1))} disabled={step === max} aria-label="Next step"><Glyph name="next" /></button><span className="transport-progress"><i style={{ width: `${((step + 1) / (max + 1)) * 100}%` }} /></span><small>{step + 1} / {max + 1}</small>{setSpeed && <label>Speed<select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={1400}>0.5×</option><option value={800}>1×</option><option value={400}>2×</option></select></label>}</div>;
}

type LoopStep = { line: number; title: string; detail: string; stack: string[]; api: string[]; micro: string[]; task: string[]; output: string[]; promise: "none" | "fulfilled" | "handled" };
const loopSteps: LoopStep[] = [
  { line: 1, title: "Global script begins", detail: "The script task pushes the global execution context. console.log runs synchronously.", stack: ["global()", "console.log('A')"], api: [], micro: [], task: [], output: ["A"], promise: "none" },
  { line: 2, title: "Timer delegated to the host", detail: "setTimeout registers a timer with the browser. Its callback is not placed on the stack.", stack: ["global()"], api: ["timer → 0ms"], micro: [], task: [], output: ["A"], promise: "none" },
  { line: 2, title: "Timer becomes eligible", detail: "After the delay threshold, the host queues a timer task. It still cannot interrupt the script.", stack: ["global()"], api: [], micro: [], task: ["log('B')"], output: ["A"], promise: "none" },
  { line: 3, title: "Promise settles", detail: "Promise.resolve creates an already-fulfilled promise; then creates a new pending promise.", stack: ["global()"], api: [], micro: [], task: ["log('B')"], output: ["A"], promise: "fulfilled" },
  { line: 3, title: "Reaction enters the microtask queue", detail: "Because the source promise is fulfilled, the reaction job is queued for the next microtask checkpoint.", stack: ["global()"], api: [], micro: ["log('C')"], task: ["log('B')"], output: ["A"], promise: "handled" },
  { line: 4, title: "Explicit microtask joins FIFO", detail: "queueMicrotask appends its callback after the promise reaction.", stack: ["global()"], api: [], micro: ["log('C')", "log('D')"], task: ["log('B')"], output: ["A"], promise: "handled" },
  { line: 5, title: "Synchronous script finishes", detail: "E is logged while the global context is active. The stack then becomes empty.", stack: [], api: [], micro: ["log('C')", "log('D')"], task: ["log('B')"], output: ["A", "E"], promise: "handled" },
  { line: 3, title: "Microtask checkpoint drains", detail: "The promise reaction runs first. Microtasks added during the checkpoint would also run before a task.", stack: ["log('C')"], api: [], micro: ["log('D')"], task: ["log('B')"], output: ["A", "E", "C"], promise: "handled" },
  { line: 4, title: "Second microtask runs", detail: "The explicit microtask runs, leaving the microtask queue empty.", stack: ["log('D')"], api: [], micro: [], task: ["log('B')"], output: ["A", "E", "C", "D"], promise: "handled" },
  { line: 2, title: "Event loop selects the timer task", detail: "Only after the microtask checkpoint may the event loop select the timer task.", stack: ["log('B')"], api: [], micro: [], task: [], output: ["A", "E", "C", "D", "B"], promise: "handled" },
];

function EventLoopLab() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step >= loopSteps.length - 1) setPlaying(false);
      else setStep(step + 1);
    }, speed);
    return () => window.clearTimeout(timer);
  }, [playing, speed, step]);
  const state = loopSteps[step];
  const lines = ["console.log('A');", "setTimeout(() => console.log('B'), 0);", "Promise.resolve().then(() => console.log('C'));", "queueMicrotask(() => console.log('D'));", "console.log('E');"];
  return <div className="event-loop-lab">
    <div className="lab-toolbar"><div><span className="live-dot" /> EXECUTION TRACE</div><span>Browser event loop · simplified HTML model</span><button aria-label="Inspect current state">Inspect state</button></div>
    <div className="event-main">
      <div className="event-code"><div className="code-toolbar"><span><i /><i /><i /></span><small>event-loop.js</small></div><pre>{lines.map((line, index) => <code key={line} className={state.line === index + 1 ? "active" : ""}><span>{index + 1}</span>{line}</code>)}</pre><div className="console-box"><small>CONSOLE OUTPUT</small><strong>{state.output.join("  ")}<i /></strong></div></div>
      <div className="runtime-board">
        <RuntimeColumn title="CALL STACK" items={state.stack} empty="stack empty" tone="blue" />
        <RuntimeColumn title="WEB APIs" items={state.api} empty="host idle" tone="orange" />
        <RuntimeColumn title="MICROTASK QUEUE" items={state.micro} empty="queue empty" tone="violet" />
        <RuntimeColumn title="TASK QUEUE" items={state.task} empty="queue empty" tone="green" />
        <div className="promise-state"><small>PROMISE STATE</small><span className={state.promise}>{state.promise}</span><div><i className={state.promise !== "none" ? "on" : ""} /><i className={state.promise === "fulfilled" || state.promise === "handled" ? "on" : ""} /><i className={state.promise === "handled" ? "on" : ""} /></div></div>
      </div>
    </div>
    <div className="state-inspector"><span>{String(step + 1).padStart(2, "0")}</span><div><small>CURRENT STATE</small><h3>{state.title}</h3><p>{state.detail}</p></div></div>
    <Transport step={step} max={loopSteps.length - 1} setStep={setStep} playing={playing} setPlaying={setPlaying} speed={speed} setSpeed={setSpeed} />
  </div>;
}

function RuntimeColumn({ title, items, empty, tone }: { title: string; items: string[]; empty: string; tone: string }) {
  return <div className={`runtime-column tone-${tone}`}><small>{title}</small><div>{items.length ? items.map((item) => <span key={item}>{item}</span>) : <em>{empty}</em>}</div></div>;
}

function OrderingExercise({ lesson }: { lesson: Lesson }) {
  const seed = [lesson.concepts[2] ?? "Observe", lesson.concepts[0], lesson.concepts[1] ?? "Resolve"];
  const [items, setItems] = useState(seed);
  const [checked, setChecked] = useState(false);
  const move = (index: number, delta: number) => setItems((current) => { const next = [...current]; const target = index + delta; if (target < 0 || target >= next.length) return current; [next[index], next[target]] = [next[target], next[index]]; return next; });
  const correct = items[0] === lesson.concepts[0];
  return <div className="ordering-exercise"><div><h2>Put the reasoning in order</h2><p>Arrange the mechanism from first decision to final observation.</p></div><div className="order-list">{items.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong><button onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${item} up`}>↑</button><button onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={`Move ${item} down`}>↓</button></div>)}</div><button className="primary-button" onClick={() => setChecked(true)}>Check sequence</button>{checked && <p className={correct ? "order-correct" : "order-retry"}>{correct ? "Coherent sequence. Now explain why each transition is allowed." : `Start with ${lesson.concepts[0]}. The mechanism must exist before its consequences can be observed.`}</p>}</div>;
}

function VisualLab({ openLesson }: { openLesson: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<VisualKind | "all">("all");
  const allLabs = weeks.flatMap((week) => week.modules.map((module) => ({ week, module })));
  const filtered = allLabs.filter(({ module }) => (kind === "all" || module.visual === kind) && `${module.title} ${module.topics.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page labs-page"><PageIntro eyebrow="INTERACTIVE OBSERVATORY" title="Visual lab" copy="Replay the mechanics without reading a full lesson. Each lab uses the diagram grammar that best explains the system: queues, pipelines, trees, boundaries, timelines, or focus paths." /><div className="lab-filters"><label><Glyph name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search visual models…" /></label><select value={kind} onChange={(event) => setKind(event.target.value as VisualKind | "all")} aria-label="Filter visual labs"><option value="all">All visual models</option>{Object.entries(visualLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div className="featured-lab"><div><p className="eyebrow">FLAGSHIP LAB · WEEK 1</p><h2>Event loop execution theatre</h2><p>Control the stack, browser APIs, promise states, microtasks, tasks, and output one statement at a time.</p><button className="primary-button" onClick={() => openLesson("event-loop")}>Open full lab <Glyph name="arrow" /></button></div><EventLoopMini /></div><div className="lab-grid">{filtered.map(({ week, module }, index) => <article key={`${week.id}-${module.title}`} className={`lab-card visual-${module.visual}`}><div className="lab-card-visual"><VisualGlyph kind={module.visual} seed={index} /></div><p>WEEK {week.id} · {visualLabels[module.visual].toUpperCase()}</p><h3>{module.title}</h3><span>{module.topics.length} concepts · step controls · state inspector</span><button onClick={() => week.id === 1 ? openLesson(bestLessonFor(module.topics[0])) : undefined}>{week.id === 1 ? "Launch model" : "Inspect curriculum"} <Glyph name="arrow" /></button></article>)}</div></div>;
}

function VisualGlyph({ kind, seed }: { kind: VisualKind; seed: number }) {
  if (kind === "testing") return <div className="pyramid"><i /><i /><i /></div>;
  if (kind === "network" || kind === "browser" || kind === "ai") return <div className="pipeline-glyph">{[0, 1, 2, 3].map((item) => <span key={item} style={{ width: `${34 + ((seed + item) % 3) * 18}px` }} />)}</div>;
  if (kind === "architecture" || kind === "system") return <div className="node-glyph"><i /><i /><i /><i /></div>;
  if (kind === "react" || kind === "state") return <div className="tree-glyph"><i /><span><b /><b /></span></div>;
  if (kind === "security") return <div className="shield-glyph"><i>!</i><span /><span /></div>;
  if (kind === "accessibility") return <div className="focus-glyph"><i>1</i><i>2</i><i>3</i></div>;
  return <div className="queue-glyph"><span /><span /><span /><i /></div>;
}

function PracticeStudio({ onRun }: { onRun: () => void }) {
  const challenges = ["Debounce", "Promise concurrency limiter", "Deep clone", "Event emitter", "Retry with backoff", "Type-safe storage"];
  const [challenge, setChallenge] = useState(challenges[0]);
  const [code, setCode] = useState("export function debounce(fn, wait) {\n  // Keep one timer per returned function.\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n}");
  const [result, setResult] = useState<null | { passed: number; total: number }>(null);
  const run = () => { const signals = ["return", "=>", challenge === "Debounce" ? "clearTimeout" : "function"]; const passed = signals.filter((signal) => code.includes(signal)).length; setResult({ passed, total: signals.length }); onRun(); };
  return <div className="page practice-page"><PageIntro eyebrow="IMPLEMENTATION STUDIO" title="Write the contract, then the code" copy="Production-minded challenges with visible invariants, edge cases, and test feedback. The editor is intentionally small: the reasoning is the real interface." /><div className="practice-shell"><aside><p>CHALLENGES</p>{challenges.map((item, index) => <button className={challenge === item ? "active" : ""} onClick={() => { setChallenge(item); setResult(null); }} key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}</aside><section className="challenge-brief"><p className="eyebrow">JAVASCRIPT · MEDIUM</p><h2>{challenge}</h2><p>Implement a production-safe {challenge.toLowerCase()} while preserving arguments, errors, and the caller’s scheduling expectations.</p><h3>Contract</h3><ul><li>Keep behavior deterministic and framework-agnostic.</li><li>Do not leak timers, listeners, or unresolved work.</li><li>Preserve useful TypeScript inference.</li></ul><h3>Hidden edges</h3><div className="edge-tags"><span>cancellation</span><span>reentrancy</span><span>errors</span></div></section><section className="editor-panel"><div className="editor-tabs"><span>solution.ts</span><button onClick={() => setCode("")}>Reset</button></div><textarea aria-label="Code editor" spellCheck={false} value={code} onChange={(event) => setCode(event.target.value)} /><div className="test-console"><div><span>TEST RUNNER</span>{result && <strong>{result.passed}/{result.total} passing</strong>}</div>{result ? <>{["returns a function", "preserves arguments", "resets scheduled work"].map((test, index) => <p key={test} className={index < result.passed ? "pass" : "fail"}><Glyph name={index < result.passed ? "check" : "restart"} /> {test}</p>)}</> : <p className="idle-test">Run tests to inspect behavior.</p>}</div><button className="primary-button run-tests" onClick={run}><Glyph name="play" /> Run tests</button></section></div></div>;
}

const interviewQuestions = [
  { level: "FOUNDATION", topic: "JavaScript", question: "Explain why a promise callback runs before a zero-delay timer.", answer: "The current task must finish, then the event loop performs a microtask checkpoint. Promise reactions are microtasks; the timer callback is a later task." },
  { level: "REASONING", topic: "React", question: "A context provider value changes on every render. What do you measure and change first?", answer: "Confirm affected consumers with the Profiler. Stabilize ownership and split contexts by change frequency before reaching for broad memoization." },
  { level: "SENIOR TRADE-OFF", topic: "Architecture", question: "When does a micro-frontend boundary create more risk than autonomy?", answer: "When teams do not have independent release needs, the boundary duplicates runtime, governance, observability, accessibility, and dependency coordination costs without unlocking real ownership." },
];

function InterviewMode() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timed, setTimed] = useState(true);
  const [seconds, setSeconds] = useState(120);
  useEffect(() => { if (!timed || revealed || seconds <= 0) return; const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000); return () => window.clearInterval(timer); }, [revealed, seconds, timed]);
  const next = () => { setIndex((value) => (value + 1) % interviewQuestions.length); setRevealed(false); setSeconds(120); };
  const item = interviewQuestions[index];
  return <div className="page interview-page"><PageIntro eyebrow="EXPLAIN YOUR JUDGMENT" title="Interview room" copy="Think aloud before revealing the model answer. Strong responses name the mechanism, surface assumptions, and make trade-offs legible." /><div className="interview-controls"><button className={timed ? "active" : ""} onClick={() => setTimed(true)}>Timed</button><button className={!timed ? "active" : ""} onClick={() => setTimed(false)}>Untimed</button><span>{index + 1} / {interviewQuestions.length}</span></div><section className="interview-stage"><div className="timer-ring"><span>{timed ? `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}` : "∞"}</span><small>THINK ALOUD</small></div><p>{item.level} · {item.topic.toUpperCase()}</p><h1>{item.question}</h1><div className="thinking-prompts"><span>Mechanism</span><Glyph name="arrow" /><span>Failure mode</span><Glyph name="arrow" /><span>Trade-off</span><Glyph name="arrow" /><span>Decision</span></div>{revealed ? <div className="model-answer"><small>MODEL ANSWER</small><p>{item.answer}</p><div><span>Rate your answer</span>{["Weak", "Partial", "Strong"].map((rating) => <button key={rating}>{rating}</button>)}</div></div> : <button className="primary-button" onClick={() => setRevealed(true)}>Reveal model answer</button>}<button className="next-question" onClick={next}>Next question <Glyph name="arrow" /></button></section></div>;
}

function RevisionMode({ progress, openLesson }: { progress: ProgressState; openLesson: (id: string) => void }) {
  const cards = [
    { front: "What does a closure retain?", back: "Access to lexical bindings that remain reachable—not a frozen snapshot of an entire call." },
    { front: "When can memoization make performance worse?", back: "When comparison and retention cost exceed avoided work, or when unstable inputs invalidate it anyway." },
    { front: "Why combine AbortSignal with request identity?", back: "Cancellation is cooperative; identity prevents a late, superseded result from committing." },
  ];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  return <div className="page revision-page"><PageIntro eyebrow="SPACED REVISION" title="Strengthen the weak edges" copy="Short, active recall sessions are generated from missed quizzes, low-confidence topics, and concepts due for review." /><div className="revision-grid"><section className="flashcard-stage"><div className="flashcard-meta"><span>CARD {index + 1} OF {cards.length}</span><span>Runtime mechanics</span></div><button className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((value) => !value)}><small>{flipped ? "ANSWER" : "PROMPT"}</small><strong>{flipped ? card.back : card.front}</strong><span>{flipped ? "Click to see prompt" : "Think, then reveal"}</span></button><div className="flashcard-actions"><button onClick={() => { setIndex((index - 1 + cards.length) % cards.length); setFlipped(false); }}><Glyph name="previous" /> Previous</button>{flipped && <><button className="again">Again</button><button className="good" onClick={() => { setIndex((index + 1) % cards.length); setFlipped(false); }}>Got it</button></>}<button onClick={() => { setIndex((index + 1) % cards.length); setFlipped(false); }}>Next <Glyph name="next" /></button></div></section><aside className="revision-queue"><p className="eyebrow">TODAY’S QUEUE</p><h2>12 minutes</h2><div><span><strong>08</strong><small>Flashcards</small></span><span><strong>02</strong><small>Quiz repairs</small></span><span><strong>01</strong><small>Code trace</small></span></div><h3>Weak topics</h3>{progress.weakTopics.map((topic) => <button key={topic} onClick={() => openLesson(bestLessonFor(topic))}><span />{topic}<Glyph name="arrow" /></button>)}</aside></div></div>;
}

type CanvasNode = { id: number; label: string; x: number; y: number; kind: string };

function SystemDesignCanvas() {
  const [caseName, setCaseName] = useState(systemCases[2]);
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: 1, label: "Search input", x: 70, y: 90, kind: "ui" },
    { id: 2, label: "Query state", x: 300, y: 90, kind: "state" },
    { id: 3, label: "Search API", x: 530, y: 90, kind: "api" },
    { id: 4, label: "Result cache", x: 300, y: 245, kind: "cache" },
  ]);
  const [active, setActive] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const addNode = () => setNodes((current) => [...current, { id: Date.now(), label: `Boundary ${current.length + 1}`, x: 100 + current.length * 32, y: 330, kind: "boundary" }]);
  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, node: CanvasNode) => { const rect = event.currentTarget.getBoundingClientRect(); dragOffset.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; setActive(node.id); event.currentTarget.setPointerCapture(event.pointerId); };
  const drag = (event: React.PointerEvent<HTMLButtonElement>, id: number) => { if (active !== id) return; const canvas = event.currentTarget.parentElement?.getBoundingClientRect(); if (!canvas) return; setNodes((current) => current.map((node) => node.id === id ? { ...node, x: Math.max(8, Math.min(canvas.width - 170, event.clientX - canvas.left - dragOffset.current.x)), y: Math.max(8, Math.min(canvas.height - 64, event.clientY - canvas.top - dragOffset.current.y)) } : node)); };
  return <div className="page system-page"><PageIntro eyebrow="COHERENCE OVER ONE RIGHT ANSWER" title="System design workbench" copy="Clarify requirements, place boundaries, connect responsibilities, and make each trade-off explicit. Your design is evaluated for coherence—not resemblance to a template." /><div className="case-tabs">{systemCases.map((item) => <button key={item} className={caseName === item ? "active" : ""} onClick={() => setCaseName(item)}>{item}</button>)}</div><div className="design-shell"><aside className="design-brief"><p className="eyebrow">CASE BRIEF</p><h2>{caseName}</h2><p>Design a production-ready frontend surface for 500k monthly users across desktop and mobile.</p><h3>Clarify first</h3>{["Who owns the source of truth?", "What latency is acceptable?", "What happens offline?", "Which roles see which data?"].map((question) => <label key={question}><input type="checkbox" />{question}</label>)}<h3>Decision score</h3><div className="coherence-meter"><span style={{ width: `${Math.min(86, 30 + nodes.length * 9)}%` }} /></div><small>{nodes.length < 6 ? "Add boundaries and name trade-offs" : "Coherent foundation · test failure modes"}</small></aside><section className="canvas-panel"><div className="canvas-toolbar"><span>ARCHITECTURE CANVAS</span><button onClick={addNode}>+ Add node</button></div><div className="design-canvas" aria-label="Draggable architecture canvas">{nodes.map((node, index) => <button key={node.id} className={`canvas-node node-${node.kind}`} style={{ left: node.x, top: node.y }} onPointerDown={(event) => startDrag(event, node)} onPointerMove={(event) => drag(event, node.id)} onPointerUp={() => setActive(null)}><small>{node.kind}</small><strong>{node.label}</strong><span>⋮⋮</span>{index < nodes.length - 1 && <i className="connector" />}</button>)}</div><div className="tradeoff-bar"><span>TRADE-OFF LOG</span><p><strong>Cache:</strong> stale-while-revalidate improves perceived latency, but requires a visible freshness model.</p><button>+ Record decision</button></div></section><aside className="design-steps"><p>DESIGN WALKTHROUGH</p>{["Requirements", "Data model", "Boundaries", "State", "API & cache", "Failure modes", "Security", "Accessibility", "Testing", "Observability", "Scale"].map((step, index) => <button key={step} className={index < 3 ? "complete" : index === 3 ? "active" : ""}><span>{index < 3 ? <Glyph name="check" /> : index + 1}</span>{step}</button>)}</aside></div></div>;
}

function KnowledgeGraph() {
  return <div className="knowledge-graph" aria-label="Knowledge graph connecting frontend concepts"><div className="graph-core">Frontend<br />mental model</div>{knowledgeLinks.map((path, pathIndex) => <div key={path[0]} className={`graph-path path-${pathIndex}`}>{path.map((node, index) => <span key={node} style={{ "--node-index": index } as React.CSSProperties}>{node}</span>)}</div>)}</div>;
}
