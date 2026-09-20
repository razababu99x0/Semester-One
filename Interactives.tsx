import React from "react";
import { Check, X, Lightbulb, RotateCcw, Shuffle, NotebookPen, FilePlus2 } from "lucide-react";
import MathTex from "./Math";
import type { QuizQuestion } from "./content";
import { useBook } from "./useBook";
import { notesDB, quizDB, pagesDB } from "./db";

/* ------------------------------------------------------------------ */
/* Rising letters — words gently lift off the page when it opens        */
/* ------------------------------------------------------------------ */
export const RisingTitle: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const reduced = useBook((s) => s.reducedMotion);
  const perf = useBook((s) => s.perf);
  const words = text.split(" ");
  if (reduced || perf === "lite") return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block rise"
          style={{ animationDelay: `${Math.min(0.5, i * 0.055)}s` }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Formula assembly — drag or keyboard-order the floating symbols       */
/* ------------------------------------------------------------------ */
export const FormulaAssembly: React.FC<{ prompt: string; tokens: string[] }> = ({ prompt, tokens }) => {
  const shuffle = React.useCallback(
    () =>
      tokens
        .map((t, i) => ({ t, i, k: Math.random() }))
        .sort((a, b) => a.k - b.k)
        .map(({ t, i }) => ({ t, i })),
    [tokens],
  );
  const [pool, setPool] = React.useState(shuffle);
  const [slots, setSlots] = React.useState<{ t: string; i: number }[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);
  const correct = slots.length === tokens.length && slots.every((s, k) => s.i === k);

  const place = (item: { t: string; i: number }) => {
    const expected = slots.length;
    if (item.i === expected) {
      setSlots((s) => [...s, item]);
      setPool((p) => p.filter((x) => x.i !== item.i));
      setMsg(null);
    } else {
      setMsg(
        `Not yet — position ${expected + 1} of the equation needs a different piece. Think about what must come after what you have already placed.`,
      );
    }
  };

  const reset = () => {
    setPool(shuffle());
    setSlots([]);
    setMsg(null);
  };

  return (
    <div className="rounded-2xl border border-black/15 bg-white/45 p-4">
      <p className="text-[0.9rem] font-bold mb-1">Formula assembly</p>
      <p className="text-[0.82rem] soft mb-3">{prompt} Select the pieces in the correct order (click, tap or press Enter).</p>

      <div
        className="min-h-[58px] rounded-xl border border-dashed border-black/25 bg-black/[0.03] p-2 flex flex-wrap items-center gap-1 mb-3"
        aria-live="polite"
        aria-label="Assembled equation"
      >
        {slots.length === 0 && <span className="text-xs soft px-2">The completed equation will settle here…</span>}
        {slots.map((s, i) => (
          <span key={i} className="px-2 py-1 rounded-lg bg-black/[0.06]">
            <MathTex tex={s.t} />
          </span>
        ))}
        {correct && (
          <span className="chip ml-2" style={{ borderColor: "#2e7d32", color: "#2e7d32", background: "rgba(46,125,50,0.12)" }}>
            <Check size={13} /> complete
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {pool.map((item) => (
          <button
            key={item.i}
            className="btn btn-ink"
            onClick={() => place(item)}
            aria-label={`Place symbol ${item.t}`}
          >
            <MathTex tex={item.t} />
          </button>
        ))}
      </div>

      {msg && (
        <p className="mt-3 text-[0.82rem] flex items-start gap-2" role="status">
          <X size={16} className="mt-[2px] shrink-0" /> {msg}
        </p>
      )}

      <button className="btn btn-ink mt-3 text-xs" onClick={reset}>
        <Shuffle size={15} /> Shuffle and try again
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Quiz                                                                 */
/* ------------------------------------------------------------------ */
export const Quiz: React.FC<{ topicId: string; questions: QuizQuestion[] }> = ({ topicId, questions }) => {
  const saveScore = useBook((s) => s.saveScore);
  const touchStreak = useBook((s) => s.touchStreak);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [hints, setHints] = React.useState<Record<string, boolean>>({});

  const score = questions.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0);
  const mastery = score / questions.length;

  const submit = () => {
    setSubmitted(true);
    saveScore(topicId, score, questions.length);
    touchStreak();
    quizDB.put({ id: `${topicId}-${Date.now()}`, topicId, score, total: questions.length, at: Date.now() });
  };

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <fieldset key={q.id} className="rounded-2xl border border-black/15 bg-white/40 p-4">
          <legend className="px-1 text-[0.72rem] font-bold uppercase tracking-wider soft">
            {q.level} · Question {qi + 1}
          </legend>
          <p className="font-semibold text-[0.95rem] mb-3">{q.q}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.options.map((o, i) => {
              const chosen = answers[q.id] === i;
              const right = submitted && i === q.answer;
              const wrong = submitted && chosen && i !== q.answer;
              return (
                <button
                  key={i}
                  onClick={() => !submitted && setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className="btn btn-ink justify-start text-left"
                  style={{
                    borderColor: right ? "#2e7d32" : wrong ? "#b3261e" : undefined,
                    background: right
                      ? "rgba(46,125,50,0.14)"
                      : wrong
                        ? "rgba(179,38,30,0.12)"
                        : chosen
                          ? "rgba(0,0,0,0.1)"
                          : undefined,
                  }}
                  aria-pressed={chosen}
                  disabled={submitted}
                >
                  <span className="font-bold mr-1">{"ABCD"[i]}.</span> {o}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <button className="btn btn-ink text-xs" onClick={() => setHints((h) => ({ ...h, [q.id]: !h[q.id] }))}>
              <Lightbulb size={14} /> Hint
            </button>
            {hints[q.id] && <span className="text-[0.82rem] soft">{q.hint}</span>}
          </div>
          {submitted && (
            <p className="mt-2 text-[0.85rem]">
              <strong>{answers[q.id] === q.answer ? "Correct. " : "Not quite. "}</strong>
              {q.explain}
            </p>
          )}
        </fieldset>
      ))}

      {!submitted ? (
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={Object.keys(answers).length < questions.length}
        >
          Submit answers ({Object.keys(answers).length}/{questions.length})
        </button>
      ) : (
        <div className="rounded-2xl border border-black/15 bg-white/50 p-4">
          <p className="text-lg font-bold">
            Score {score} / {questions.length}
          </p>
          <p className="text-[0.88rem] soft">
            Mastery:{" "}
            {mastery === 1
              ? "Excellent — you can move on with confidence."
              : mastery >= 0.7
                ? "Good — revise the questions you missed."
                : mastery >= 0.4
                  ? "Developing — reread the Understand and Formula Lab sections."
                  : "Needs work — start again from Section 2 and try the simulation."}
          </p>
          <button
            className="btn btn-ink mt-3"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
          >
            <RotateCcw size={15} /> Try again
          </button>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Personal note (IndexedDB)                                            */
/* ------------------------------------------------------------------ */
export const NotePad: React.FC<{ topicId: string; topicTitle?: string; chapterId?: string }> = ({
  topicId, topicTitle, chapterId,
}) => {
  const go = useBook((st) => st.go);
  const [text, setText] = React.useState("");
  const [status, setStatus] = React.useState("");
  const loaded = React.useRef(false);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    loaded.current = false;
    notesDB.get(topicId).then((r) => {
      setText(r?.text ?? "");
      loaded.current = true;
    });
  }, [topicId]);

  React.useEffect(() => {
    if (!loaded.current) return;
    window.clearTimeout(timer.current);
    setStatus("Saving…");
    timer.current = window.setTimeout(async () => {
      await notesDB.put({ id: topicId, text, updated: Date.now() });
      setStatus(`Saved offline at ${new Date().toLocaleTimeString()}`);
    }, 600);
    return () => window.clearTimeout(timer.current);
  }, [text, topicId]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const createPage = async () => {
    await pagesDB.put({
      id: `p${Date.now().toString(36)}`,
      title: topicTitle ? `${topicTitle} — my page` : "New page",
      body: text,
      tags: topicTitle ? ["from topic"] : [],
      colour: "cream",
      topicId,
      chapterId,
      created: Date.now(),
      updated: Date.now(),
    });
    go("notes");
  };

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "#fbf6e8",
        border: "1px solid #d8cfb4",
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.08) 27px, rgba(0,0,0,0.08) 28px)",
        backgroundPosition: "0 46px",
        color: "#22212a",
      }}
    >
      <label className="flex items-center gap-2 text-[0.88rem] font-bold" htmlFor={`note-${topicId}`}>
        <NotebookPen size={16} /> My note for this topic
      </label>
      <p className="text-[0.76rem] mb-2" style={{ color: "rgba(0,0,0,0.55)" }}>
        Saved automatically on this device, and available with no internet.
      </p>
      <textarea
        id={`note-${topicId}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full resize-y bg-transparent outline-none text-[0.95rem]"
        style={{ lineHeight: "28px", fontFamily: "var(--serif)" }}
        placeholder="The one thing you never want to forget about this topic…"
      />
      <div className="flex flex-wrap items-center gap-3 mt-2">
        <span className="text-[0.74rem]" style={{ color: "rgba(0,0,0,0.55)" }}>
          {words} word{words === 1 ? "" : "s"}{status ? ` · ${status}` : ""}
        </span>
        <button className="btn btn-ink ml-auto text-xs" onClick={createPage}>
          <FilePlus2 size={14} /> Start a full notebook page from this
        </button>
        <button className="btn btn-ink text-xs" onClick={() => go("notes")}>
          Open notebook
        </button>
      </div>
    </div>
  );
};
