import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Download, List, Grid3x3, CheckCircle2, Clock, Bookmark, NotebookPen } from "lucide-react";
import { useBook } from "@/stores/useBook";
import { CHAPTERS } from "@/data";
import { exportChapter } from "@/services/exporters";
import type { Chapter } from "@/types/content";

const PortalArt: React.FC<{ chapter: Chapter; animate: boolean }> = ({ chapter, animate }) => (
  <div
    className="relative h-28 overflow-hidden rounded-xl"
    style={{ background: `radial-gradient(90% 120% at 50% 110%, ${chapter.accent}44, transparent 70%), var(--bg-2)` }}
    aria-hidden
  >
    <svg viewBox="0 0 300 110" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`g-${chapter.id}`}>
          <stop offset="0%" stopColor={chapter.accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={chapter.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="95" r="70" fill={`url(#g-${chapter.id})`} />
      {chapter.id === "calculus" && (
        <>
          <path d="M10 95 C 80 20, 160 120, 290 25" stroke={chapter.accent} strokeWidth="2" fill="none" />
          <line x1="90" y1="95" x2="230" y2="35" stroke="var(--accent-2)" strokeWidth="1.6" />
        </>
      )}
      {chapter.id === "vectors" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={40 + i * 42} y1={90} x2={40 + i * 42 + 22} y2={90 - 18 - i * 6} stroke={chapter.accent} strokeWidth="2" markerEnd="" />
          ))}
        </>
      )}
      {chapter.id === "dynamics" && (
        <>
          <circle cx="150" cy="60" r="34" stroke={chapter.accent} strokeWidth="2" fill="none" />
          <path d="M150 26 A34 34 0 0 1 184 60" stroke="var(--accent-2)" strokeWidth="3" fill="none" />
          <line x1="150" y1="60" x2="150" y2="14" stroke="var(--muted)" strokeWidth="1" />
        </>
      )}
      {chapter.id === "central" && (
        <>
          <ellipse cx="150" cy="60" rx="90" ry="34" stroke={chapter.accent} strokeWidth="1.6" fill="none" />
          <circle cx="150" cy="60" r="7" fill="var(--accent-2)" />
          <circle cx={animate ? 234 : 60} cy="60" r="4" fill={chapter.accent}>
            {animate && <animateMotion dur="9s" repeatCount="indefinite" path="M84,0 a90,34 0 1,0 0.1,0" />}
          </circle>
        </>
      )}
    </svg>
  </div>
);

export const Library: React.FC = () => {
  const { go, openTopic, completed, bookmarks, chapterId, reducedMotion, perf } = useBook();
  const [view, setView] = React.useState<"portals" | "list">("portals");
  const [openCh, setOpenCh] = React.useState<string | null>(chapterId);
  const animate = !reducedMotion && perf !== "lite";

  return (
    <main id="main" className="min-h-screen px-4 py-6" style={{ background: "radial-gradient(120% 80% at 50% 0%, var(--bg-2), var(--bg) 65%)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <button className="btn btn-ghost" onClick={() => go("landing")}>
            <ArrowLeft size={16} /> Cover
          </button>
          <h1 className="serif text-2xl sm:text-3xl font-bold">The Magical Library</h1>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={() => setView("portals")} aria-pressed={view === "portals"}>
              <Grid3x3 size={16} /> Portals
            </button>
            <button className="btn btn-ghost" onClick={() => setView("list")} aria-pressed={view === "list"}>
              <List size={16} /> Accessible list
            </button>
            <button className="btn btn-ghost" onClick={() => go("notes")}>
              <NotebookPen size={16} /> Notebook
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Four chapter portals. Use the accessible list if you prefer plain navigation — it contains
          exactly the same content.
        </p>

        {view === "portals" ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CHAPTERS.map((c, i) => {
              const done = c.topics.filter((t) => completed.includes(t.id)).length;
              const pct = Math.round((done / c.topics.length) * 100);
              const minutes = c.topics.reduce((n, t) => n + t.minutes, 0);
              const checkpoint = c.topics.find((t) => !completed.includes(t.id)) ?? c.topics[0];
              return (
                <motion.section
                  key={c.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : i * 0.08, duration: 0.5 }}
                  className="panel p-4"
                >
                  <PortalArt chapter={c} animate={animate} />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-widest" style={{ color: c.accent }}>
                        Unit {c.unit}
                      </p>
                      <h2 className="serif text-xl font-bold">{c.title}</h2>
                      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{c.subtitle}</p>
                    </div>
                    <span className="chip">{pct}%</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{c.portal}</p>

                  <div className="mt-3 h-2 w-full rounded-full" style={{ background: "var(--line)" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: c.accent }} />
                  </div>
                  <ul className="mt-3 grid grid-cols-2 gap-1 text-xs" style={{ color: "var(--muted)" }}>
                    <li className="inline-flex items-center gap-1"><CheckCircle2 size={13} /> {done}/{c.topics.length} topics completed</li>
                    <li className="inline-flex items-center gap-1"><Clock size={13} /> ~{minutes} min estimated</li>
                    <li className="col-span-2 truncate">Current checkpoint: {checkpoint.title}</li>
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={() => openTopic(c.id, checkpoint.id)}>
                      <Play size={16} /> Continue
                    </button>
                    <button className="btn" onClick={() => setOpenCh(openCh === c.id ? null : c.id)} aria-expanded={openCh === c.id}>
                      {openCh === c.id ? "Hide topics" : `All ${c.topics.length} topics`}
                    </button>
                    <button className="btn" onClick={() => exportChapter(c.id)}>
                      <Download size={16} /> Download chapter
                    </button>
                  </div>

                  {openCh === c.id && (
                    <ol className="mt-3 space-y-1 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                      {c.topics.map((t, k) => (
                        <li key={t.id}>
                          <button
                            className="btn btn-ghost w-full justify-start text-left"
                            onClick={() => openTopic(c.id, t.id)}
                          >
                            <span className="soft mr-1 tabular-nums" style={{ color: "var(--muted)" }}>{k + 1}.</span>
                            <span className="flex-1 truncate">{t.title}</span>
                            {bookmarks.includes(t.id) && <Bookmark size={14} />}
                            {completed.includes(t.id) && <CheckCircle2 size={14} style={{ color: c.accent }} />}
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </motion.section>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {CHAPTERS.map((c) => (
              <section key={c.id}>
                <h2 className="serif text-xl font-bold">Unit {c.unit} — {c.title}</h2>
                <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>{c.blurb}</p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {c.topics.map((t) => (
                    <li key={t.id}>
                      <button className="btn btn-ghost w-full justify-start" onClick={() => openTopic(c.id, t.id)}>
                        <span className="flex-1 truncate text-left">{t.title}</span>
                        <span className="text-xs" style={{ color: "var(--muted)" }}>{t.minutes} min</span>
                        {completed.includes(t.id) && <CheckCircle2 size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Library;
