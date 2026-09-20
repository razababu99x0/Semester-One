import React from "react";
import {
  X, Search, List, Sigma, Bookmark, BarChart3, Palette, Settings2, FileDown, Flame, Trash2,
} from "lucide-react";
import MathTex from "@/components/formulas/Math";
import { useBook, type LearnMode, type PerfLevel } from "@/stores/useBook";
import { EDITIONS, type EditionId } from "@/themes/themes";
import { CHAPTERS, formulaLibrary, searchBook, totalTopics } from "@/data";
import { notesDB, quizDB } from "@/services/db";
import { exportChapter, exportFormulaSheet, exportQuizReport, exportStudyNotes, exportNotebook } from "@/services/exporters";
import { LEVELS, type Level } from "@/services/voice";
import { downloadCompleteBook, promptInstall, cacheAppShell } from "@/services/offline";

type Tab = "search" | "contents" | "formulas" | "marks" | "progress" | "themes" | "settings" | "export";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "search", label: "Search", icon: <Search size={16} /> },
  { id: "contents", label: "Contents", icon: <List size={16} /> },
  { id: "formulas", label: "Formulas", icon: <Sigma size={16} /> },
  { id: "marks", label: "Bookmarks & notes", icon: <Bookmark size={16} /> },
  { id: "progress", label: "Progress", icon: <BarChart3 size={16} /> },
  { id: "themes", label: "Editions", icon: <Palette size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings2 size={16} /> },
  { id: "export", label: "Export & offline", icon: <FileDown size={16} /> },
];

export const Tools: React.FC<{ open: boolean; tab: Tab; setTab: (t: Tab) => void; onClose: () => void }> = ({
  open, tab, setTab, onClose,
}) => {
  const s = useBook();
  const [q, setQ] = React.useState("");
  const [fq, setFq] = React.useState("");
  const [notes, setNotes] = React.useState<{ id: string; text: string }[]>([]);
  const [quizzes, setQuizzes] = React.useState<{ topicId: string; score: number; total: number; at: number }[]>([]);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    notesDB.all().then((n) => setNotes(n.map((x) => ({ id: x.id, text: x.text }))));
    quizDB.all().then(setQuizzes);
    panelRef.current?.focus();
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;
  const hits = searchBook(q);
  const formulas = formulaLibrary().filter(
    (f) => !fq || f.name.toLowerCase().includes(fq.toLowerCase()) || f.topic.toLowerCase().includes(fq.toLowerCase()),
  );
  const topicById = (id: string) => CHAPTERS.flatMap((c) => c.topics).find((t) => t.id === id);
  const chapterOf = (id: string) => CHAPTERS.find((c) => c.topics.some((t) => t.id === id));

  return (
    <div className="fixed inset-0 z-50 no-print" role="dialog" aria-modal="true" aria-label="Student tools">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto scrollbar-thin p-4"
        style={{ background: "var(--bg-2)", borderLeft: "1px solid var(--line)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="serif text-xl font-bold">Student tools</h2>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close tools">
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className="btn btn-ghost text-xs"
              style={tab === t.id ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined}
              onClick={() => setTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4 text-sm">
          {tab === "search" && (
            <>
              <label className="block">
                <span className="text-xs font-semibold">Search the whole book (works offline)</span>
                <input
                  className="mt-1 w-full rounded-lg border p-2"
                  style={{ background: "var(--bg)", borderColor: "var(--line)", color: "var(--fg)", minHeight: 44 }}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="curl, Coriolis, Kepler, integrating factor…"
                />
              </label>
              {hits.map((h) => (
                <button
                  key={h.topicId}
                  className="panel w-full p-3 text-left"
                  onClick={() => {
                    s.openTopic(h.chapterId, h.topicId);
                    onClose();
                  }}
                >
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{h.chapter}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>…{h.snippet}…</p>
                </button>
              ))}
              {q.length > 1 && hits.length === 0 && <p style={{ color: "var(--muted)" }}>No matches found.</p>}
            </>
          )}

          {tab === "contents" && (
            <>
              {CHAPTERS.map((c) => (
                <div key={c.id}>
                  <h3 className="serif font-bold" style={{ color: c.accent }}>Unit {c.unit} — {c.title}</h3>
                  <ol className="mt-1 space-y-1">
                    {c.topics.map((t, i) => (
                      <li key={t.id}>
                        <button
                          className="btn btn-ghost w-full justify-start text-left text-xs"
                          onClick={() => {
                            s.openTopic(c.id, t.id);
                            onClose();
                          }}
                        >
                          {i + 1}. {t.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </>
          )}

          {tab === "formulas" && (
            <>
              <input
                className="w-full rounded-lg border p-2"
                style={{ background: "var(--bg)", borderColor: "var(--line)", color: "var(--fg)", minHeight: 44 }}
                value={fq}
                onChange={(e) => setFq(e.target.value)}
                placeholder="Filter formulas…"
                aria-label="Filter formulas"
              />
              <p className="text-xs" style={{ color: "var(--muted)" }}>{formulas.length} formulas</p>
              {formulas.map((f, i) => (
                <button
                  key={i}
                  className="panel w-full p-3 text-left"
                  onClick={() => {
                    s.openTopic(f.chapterId, f.topicId);
                    onClose();
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{f.name} · {f.topic}</p>
                  <div style={{ color: "var(--fg)" }}><MathTex tex={f.tex} block /></div>
                </button>
              ))}
            </>
          )}

          {tab === "marks" && (
            <>
              <h3 className="font-bold">Bookmarks</h3>
              {s.bookmarks.length === 0 && <p style={{ color: "var(--muted)" }}>No bookmarks yet.</p>}
              {s.bookmarks.map((id) => (
                <button
                  key={id}
                  className="panel w-full p-2 text-left"
                  onClick={() => {
                    const c = chapterOf(id);
                    if (c) s.openTopic(c.id, id);
                    onClose();
                  }}
                >
                  {topicById(id)?.title ?? id}
                </button>
              ))}
              <button className="btn w-full" onClick={() => { s.go("notes"); onClose(); }}>
                Open the full Notebook
              </button>
              <h3 className="font-bold mt-4">Notes</h3>
              {notes.length === 0 && <p style={{ color: "var(--muted)" }}>No notes yet.</p>}
              {notes.map((n) => (
                <div key={n.id} className="panel p-3">
                  <p className="font-semibold text-xs">{topicById(n.id)?.title ?? n.id}</p>
                  <p className="mt-1" style={{ color: "var(--muted)" }}>{n.text}</p>
                  <button
                    className="btn btn-ghost mt-2 text-xs"
                    onClick={async () => {
                      await notesDB.del(n.id);
                      setNotes((x) => x.filter((y) => y.id !== n.id));
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              ))}
            </>
          )}

          {tab === "progress" && (
            <>
              <div className="panel p-3">
                <p className="text-lg font-bold">
                  {s.completed.length} / {totalTopics} topics completed
                </p>
                <div className="mt-2 h-2 rounded-full" style={{ background: "var(--line)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${(s.completed.length / totalTopics) * 100}%`, background: "var(--accent)" }} />
                </div>
                <p className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: "var(--accent-2)" }}>
                  <Flame size={14} /> Learning streak: {s.streak.count} day{s.streak.count === 1 ? "" : "s"}
                </p>
              </div>
              <h3 className="font-bold">Quiz history</h3>
              {quizzes.length === 0 && <p style={{ color: "var(--muted)" }}>No quiz attempts yet.</p>}
              <ul className="space-y-1">
                {quizzes
                  .sort((a, b) => b.at - a.at)
                  .slice(0, 25)
                  .map((r, i) => (
                    <li key={i} className="panel p-2 flex justify-between gap-2">
                      <span className="truncate">{topicById(r.topicId)?.title ?? r.topicId}</span>
                      <span className="tabular-nums">{r.score}/{r.total}</span>
                    </li>
                  ))}
              </ul>
              <button
                className="btn"
                onClick={() => {
                  if (confirm("Reset all progress, scores and streak? Notes and bookmarks stay unless you clear them separately.")) {
                    s.resetProgress();
                    quizDB.clear();
                    setQuizzes([]);
                  }
                }}
              >
                <Trash2 size={16} /> Reset progress
              </button>
            </>
          )}

          {tab === "themes" && (
            <>
              <p style={{ color: "var(--muted)" }}>
                Three visual editions. The content, difficulty and every simulation are identical —
                only the appearance changes. Any student may use any edition.
              </p>
              {EDITIONS.map((e) => (
                <button
                  key={e.id}
                  className="panel w-full p-3 text-left"
                  style={s.edition === e.id ? { borderColor: "var(--accent)" } : undefined}
                  onClick={() => s.set("edition", e.id as EditionId)}
                  aria-pressed={s.edition === e.id}
                >
                  <div className="flex items-center gap-2">
                    {["--accent", "--accent-2", "--accent-3", "--paper"].map((k) => (
                      <span key={k} className="h-5 w-5 rounded-full border border-white/20" style={{ background: e.vars[k] }} />
                    ))}
                    <span className="font-bold">{e.name}</span>
                    {s.edition === e.id && <span className="chip ml-auto">current</span>}
                  </div>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{e.tagline} — {e.description}</p>
                </button>
              ))}
            </>
          )}

          {tab === "settings" && (
            <>
              <h3 className="font-bold">Learning mode</h3>
              <div className="flex flex-wrap gap-2">
                {(["story", "simple", "academic", "exam"] as LearnMode[]).map((m) => (
                  <button key={m} className="btn" style={s.mode === m ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined} onClick={() => s.set("mode", m)} aria-pressed={s.mode === m}>
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Story: guided narrative. Simple: plain words and analogies. Academic: definitions,
                derivations and formulas. Exam: questions, derivations and revision.
              </p>

              <h3 className="font-bold mt-3">Language level</h3>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    className="btn"
                    style={s.level === l.id ? { borderColor: "var(--accent-2)", color: "var(--accent-2)" } : undefined}
                    onClick={() => s.set("level", l.id as Level)}
                    aria-pressed={s.level === l.id}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
              <ul className="text-xs space-y-1" style={{ color: "var(--muted)" }}>
                {LEVELS.map((l) => (
                  <li key={l.id}><strong>{l.name}</strong> — {l.blurb} ({l.reading})</li>
                ))}
              </ul>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                The physics, formulas, simulations and examination material are identical at every
                level; only the English changes. The text pipeline is translation-ready, so a Hindi
                or Hinglish pack can be added later without touching the interface.
              </p>
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={s.showDeeper} onChange={(e) => s.set("showDeeper", e.target.checked)} />
                Show the “Going deeper” section (extra reading beyond the syllabus)
              </label>

              <h3 className="font-bold mt-3">Performance level</h3>
              <div className="flex flex-wrap gap-2">
                {(["high", "balanced", "lite"] as PerfLevel[]).map((p) => (
                  <button key={p} className="btn" style={s.perf === p ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined} onClick={() => { s.set("perf", p); s.set("perfAuto", false); }} aria-pressed={s.perf === p}>
                    {p === "high" ? "High magic" : p}
                  </button>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                High magic: full 3D, particles and dynamic lighting. Balanced: reduced particles and
                simpler lighting. Lite: static diagrams only, with the complete text, quizzes and
                offline features.
              </p>

              <h3 className="font-bold mt-3">Reading comfort</h3>
              <label className="block">
                <span className="text-xs">Text size: {(s.fontScale * 100).toFixed(0)}%</span>
                <input type="range" min={0.85} max={1.6} step={0.05} value={s.fontScale} onChange={(e) => s.set("fontScale", Number(e.target.value))} />
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={s.highContrast} onChange={(e) => s.set("highContrast", e.target.checked)} />
                High contrast mode
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={s.reducedMotion} onChange={(e) => s.set("reducedMotion", e.target.checked)} />
                Reduced motion (fade transitions, no continuous animation)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={s.focusMode} onChange={(e) => s.set("focusMode", e.target.checked)} />
                Full-screen focus mode (hides decoration)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={s.sound} onChange={(e) => s.set("sound", e.target.checked)} />
                Ambient sound (off by default; this build ships silent, so the switch only stores your preference)
              </label>
            </>
          )}

          {tab === "export" && (
            <>
              <h3 className="font-bold">Offline</h3>
              <button className="btn w-full" onClick={async () => { await promptInstall(); await cacheAppShell(); }}>
                Install offline app
              </button>
              <button className="btn w-full" onClick={downloadCompleteBook}>
                Download complete book package (single self-contained file)
              </button>
              <h3 className="font-bold mt-3">Exports</h3>
              <button className="btn w-full" onClick={exportNotebook}>My notebook (all note pages)</button>
              <button className="btn w-full" onClick={exportStudyNotes}>Printable study notes</button>
              <button className="btn w-full" onClick={exportFormulaSheet}>Formula sheet (PDF via print)</button>
              <button className="btn w-full" onClick={exportQuizReport}>Quiz result report</button>
              {CHAPTERS.map((c) => (
                <button key={c.id} className="btn w-full" onClick={() => exportChapter(c.id)}>
                  Chapter PDF — {c.title}
                </button>
              ))}
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Exports open a print-ready page; choose “Save as PDF” in the print dialogue. If pop-ups
                are blocked the file downloads as HTML instead. Interactive 3D content is replaced by
                static descriptions.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
