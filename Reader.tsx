import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowLeft, Bookmark, CheckCircle2, Printer, ArrowUp,
  List, X, NotebookPen, Layers, Type,
} from "lucide-react";
import { buildSections } from "./TopicSections";
import { RisingTitle } from "./Interactives";
import { useBook, type LearnMode } from "./useBook";
import { findChapter, findTopic } from "./index";
import { LEVELS, type Level } from "./voice";
import { exportChapter } from "./exporters";

/* ------------------------------------------------------------------ */
/* Sticky rail: where you are inside the topic                         */
/* ------------------------------------------------------------------ */
const SectionRail: React.FC<{
  sections: { id: string; n: number; short: string; icon: React.ReactNode }[];
  active: string;
  onJump: (id: string) => void;
}> = ({ sections, active, onJump }) => (
  <nav aria-label="Sections of this topic" className="hidden xl:block">
    <ul className="sticky top-24 space-y-1">
      {sections.map((s) => {
        const on = s.id === active;
        return (
          <li key={s.id}>
            <button
              onClick={() => onJump(s.id)}
              aria-current={on}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-[7px] text-left text-[0.8rem] transition"
              style={{
                color: on ? "var(--accent)" : "var(--muted)",
                background: on ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
                borderLeft: `2px solid ${on ? "var(--accent)" : "transparent"}`,
              }}
            >
              <span className="shrink-0">{s.icon}</span>
              <span className="truncate">{s.short}</span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

/* ------------------------------------------------------------------ */
/* Chapter topic drawer — fixes the overcrowded topic list             */
/* ------------------------------------------------------------------ */
const TopicDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { chapterId, topicId, openTopic, completed, bookmarks } = useBook();
  const chapter = findChapter(chapterId);
  if (!open || !chapter) return null;
  return (
    <div className="fixed inset-0 z-50 no-print" role="dialog" aria-modal="true" aria-label="Topics in this chapter">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="absolute left-0 top-0 h-full w-full max-w-sm overflow-y-auto scrollbar-thin p-4"
        style={{ background: "var(--bg-2)", borderRight: "1px solid var(--line)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs soft" style={{ color: "var(--muted)" }}>Unit {chapter.unit}</p>
            <h2 className="serif text-lg font-bold">{chapter.title}</h2>
          </div>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close topic list"><X size={18} /></button>
        </div>
        <ol className="mt-3 space-y-1">
          {chapter.topics.map((t, i) => {
            const on = t.id === topicId;
            return (
              <li key={t.id}>
                <button
                  className="flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-sm"
                  style={{
                    background: on ? "color-mix(in srgb, var(--accent) 16%, transparent)" : "transparent",
                    color: on ? "var(--accent)" : "var(--fg)",
                    minHeight: 44,
                  }}
                  onClick={() => {
                    openTopic(chapter.id, t.id);
                    onClose();
                  }}
                  aria-current={on}
                >
                  <span className="tabular-nums shrink-0 w-5" style={{ color: "var(--muted)" }}>{i + 1}</span>
                  <span className="flex-1">{t.title}</span>
                  {bookmarks.includes(t.id) && <Bookmark size={13} className="shrink-0 mt-[3px]" />}
                  {completed.includes(t.id) && <CheckCircle2 size={13} className="shrink-0 mt-[3px]" />}
                </button>
              </li>
            );
          })}
        </ol>
        <button className="btn w-full mt-4" onClick={() => exportChapter(chapter.id)}>
          <Printer size={16} /> Print this chapter
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/** framer-motion's whileInView needs IntersectionObserver; degrade safely without it. */
const CAN_IN_VIEW = typeof IntersectionObserver !== "undefined";

export const Reader: React.FC = () => {
  const s = useBook();
  const { chapterId, topicId, mode, level, showDeeper, reducedMotion, go, openTopic, markVisited, bookmarks, completed, toggleBookmark } = s;
  const chapter = findChapter(chapterId);
  const topic = findTopic(chapterId, topicId);

  const [active, setActive] = React.useState("awaken");
  const [progress, setProgress] = React.useState(0);
  const [drawer, setDrawer] = React.useState(false);
  const [showTop, setShowTop] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  const sections = React.useMemo(
    () =>
      chapter && topic
        ? buildSections(chapter, topic, level as Level)
            .filter((x) => x.modes.includes(mode))
            .filter((x) => showDeeper || x.id !== "deeper")
            .map((x, i, arr) => ({ ...x, n: i + 1, total: arr.length }))
        : [],
    [chapter, topic, mode, level, showDeeper],
  );

  React.useEffect(() => {
    if (topic) markVisited(topic.id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setActive(sections[0]?.id ?? "awaken");
  }, [topicId, mode, level]); // eslint-disable-line react-hooks/exhaustive-deps

  /* reading progress + active section */
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = bodyRef.current;
        if (!el) return;
        const top = el.offsetTop;
        const h = el.scrollHeight - window.innerHeight + 120;
        setProgress(Math.max(0, Math.min(1, (window.scrollY - top + 120) / Math.max(1, h))));
        setShowTop(window.scrollY > 700);
        let current = sections[0]?.id ?? "";
        for (const sec of sections) {
          const node = document.getElementById(`sec-${sec.id}`);
          if (node && node.getBoundingClientRect().top <= 140) current = sec.id;
        }
        setActive(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  const jump = (id: string) => {
    const node = document.getElementById(`sec-${id}`);
    if (!node) return;
    const y = node.getBoundingClientRect().top + window.scrollY - 86;
    window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
  };

  /* keyboard: left/right move between topics */
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t?.tagName?.match(/INPUT|TEXTAREA|SELECT/)) return;
      if (!chapter || !topic) return;
      const i = chapter.topics.findIndex((x) => x.id === topic.id);
      if (e.key === "ArrowRight" && chapter.topics[i + 1]) openTopic(chapter.id, chapter.topics[i + 1].id);
      if (e.key === "ArrowLeft" && chapter.topics[i - 1]) openTopic(chapter.id, chapter.topics[i - 1].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [chapter, topic, openTopic]);

  if (!chapter || !topic) {
    return (
      <div className="p-8">
        <button className="btn" onClick={() => go("library")}>
          <ArrowLeft size={16} /> Back to the library
        </button>
      </div>
    );
  }

  const idx = chapter.topics.findIndex((t) => t.id === topic.id);
  const prevTopic = chapter.topics[idx - 1];
  const nextTopic = chapter.topics[idx + 1];

  return (
    <div className="min-h-screen pb-28">
      {/* ---------------- top bar ---------------- */}
      <header
        className="no-print sticky top-0 z-30 backdrop-blur-md"
        style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="mx-auto max-w-[1500px] px-3 py-2 flex items-center gap-2">
          <button className="btn btn-ghost px-2" onClick={() => go("library")} aria-label="Back to library">
            <ArrowLeft size={18} />
          </button>
          <button className="btn btn-ghost px-2" onClick={() => setDrawer(true)} aria-label="All topics in this chapter">
            <List size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] truncate" style={{ color: "var(--muted)" }}>
              Unit {chapter.unit} · {chapter.title} · topic {idx + 1} of {chapter.topics.length}
            </p>
            <h1 className="text-[0.98rem] sm:text-lg font-bold truncate serif">{topic.title}</h1>
          </div>
          <button className="btn btn-ghost px-2" onClick={() => go("notes")} aria-label="My notebook">
            <NotebookPen size={18} />
          </button>
          <button
            className="btn btn-ghost px-2"
            onClick={() => toggleBookmark(topic.id)}
            aria-label="Bookmark this topic"
            aria-pressed={bookmarks.includes(topic.id)}
          >
            <Bookmark size={18} fill={bookmarks.includes(topic.id) ? "currentColor" : "none"} />
          </button>
          {completed.includes(topic.id) && <CheckCircle2 size={18} style={{ color: "var(--accent-2)" }} aria-label="Completed" />}
        </div>

        {/* mode + level strip */}
        <div className="mx-auto max-w-[1500px] px-3 pb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            <Layers size={12} /> mode
          </span>
          <div className="flex gap-1">
            {(["story", "simple", "academic", "exam"] as LearnMode[]).map((m) => (
              <button
                key={m}
                onClick={() => s.set("mode", m)}
                aria-pressed={mode === m}
                className="rounded-md px-2 py-1 text-[0.72rem] font-semibold capitalize"
                style={{
                  color: mode === m ? "#06101c" : "var(--muted)",
                  background: mode === m ? "var(--accent)" : "transparent",
                  border: `1px solid ${mode === m ? "transparent" : "var(--line)"}`,
                  minHeight: 30,
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider ml-2" style={{ color: "var(--muted)" }}>
            <Type size={12} /> language
          </span>
          <div className="flex gap-1">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => s.set("level", l.id)}
                aria-pressed={level === l.id}
                title={l.blurb}
                className="rounded-md px-2 py-1 text-[0.72rem] font-semibold"
                style={{
                  color: level === l.id ? "#06101c" : "var(--muted)",
                  background: level === l.id ? "var(--accent-2)" : "transparent",
                  border: `1px solid ${level === l.id ? "transparent" : "var(--line)"}`,
                  minHeight: 30,
                }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* reading progress */}
        <div className="h-[3px] w-full" style={{ background: "var(--line)" }} aria-hidden>
          <div className="h-full transition-[width] duration-150" style={{ width: `${progress * 100}%`, background: "var(--accent)" }} />
        </div>
      </header>

      {/* ---------------- body ---------------- */}
      <div className="mx-auto max-w-[1500px] px-2 sm:px-4 mt-5 grid gap-6 xl:grid-cols-[190px_minmax(0,1fr)]">
        <SectionRail sections={sections} active={active} onJump={jump} />

        <div ref={bodyRef} className="min-w-0">
          {/* mobile section chips */}
          <div className="xl:hidden -mx-2 mb-4 overflow-x-auto scrollbar-thin px-2 no-print">
            <div className="flex gap-1 w-max pb-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => jump(sec.id)}
                  aria-current={active === sec.id}
                  className="rounded-full px-3 py-1 text-[0.74rem] font-semibold whitespace-nowrap"
                  style={{
                    background: active === sec.id ? "var(--accent)" : "transparent",
                    color: active === sec.id ? "#06101c" : "var(--muted)",
                    border: `1px solid ${active === sec.id ? "transparent" : "var(--line)"}`,
                    minHeight: 34,
                  }}
                >
                  {sec.short}
                </button>
              ))}
            </div>
          </div>

          {/* the scroll of pages */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 40px 90px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}
          >
            {sections.map((sec, i) => (
              <motion.section
                key={sec.id}
                id={`sec-${sec.id}`}
                initial={reducedMotion || !CAN_IN_VIEW ? false : { opacity: 0, y: 22 }}
                whileInView={reducedMotion || !CAN_IN_VIEW ? undefined : { opacity: 1, y: 0 }}
                viewport={CAN_IN_VIEW ? { once: true, margin: "-60px" } : undefined}
                transition={{ duration: 0.5, ease: [0.22, 0.85, 0.28, 1] }}
                className="paper px-5 py-7 sm:px-10 sm:py-10 scroll-mt-24"
                style={{
                  borderTop: i === 0 ? undefined : "1px solid rgba(0,0,0,0.14)",
                  boxShadow: i === 0 ? undefined : "inset 0 22px 30px -30px rgba(0,0,0,0.7)",
                }}
                aria-labelledby={`h-${sec.id}`}
              >
                <div className="mx-auto max-w-[72ch]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full border border-black/20 bg-black/[0.05]">
                      {sec.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] soft">
                        Section {sec.n} of {sections.length}
                      </p>
                      <h2 id={`h-${sec.id}`} className="text-[1.45rem] font-bold serif leading-tight">
                        <RisingTitle text={sec.name} />
                      </h2>
                    </div>
                  </div>
                  <div className="text-[0.96rem] leading-[1.75] space-y-2">{sec.body}</div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* topic navigation */}
          <nav className="no-print mt-6 grid gap-2 sm:grid-cols-2" aria-label="Topic navigation">
            {prevTopic ? (
              <button className="btn justify-start text-left" onClick={() => openTopic(chapter.id, prevTopic.id)}>
                <ChevronLeft size={16} className="shrink-0" />
                <span className="min-w-0">
                  <span className="block text-[0.68rem] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Previous</span>
                  <span className="block truncate">{prevTopic.title}</span>
                </span>
              </button>
            ) : (
              <button className="btn justify-start" onClick={() => go("library")}>
                <ChevronLeft size={16} /> Back to the library
              </button>
            )}
            {nextTopic ? (
              <button className="btn btn-primary justify-end text-right" onClick={() => openTopic(chapter.id, nextTopic.id)}>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] uppercase tracking-wider opacity-80">Next topic</span>
                  <span className="block truncate">{nextTopic.title}</span>
                </span>
                <ChevronRight size={16} className="shrink-0" />
              </button>
            ) : (
              <button className="btn btn-primary justify-end" onClick={() => go("library")}>
                Chapter finished — choose another <ChevronRight size={16} />
              </button>
            )}
          </nav>
        </div>
      </div>

      {showTop && (
        <button
          className="btn no-print fixed bottom-4 left-4 z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          aria-label="Back to the top of this topic"
          style={{ borderRadius: 999, minHeight: 48, minWidth: 48 }}
        >
          <ArrowUp size={18} />
        </button>
      )}

      <TopicDrawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  );
};

export default Reader;
