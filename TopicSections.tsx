import React from "react";
import {
  Sparkles, BookOpen, GraduationCap, Eye, FlaskConical, Beaker, Globe2,
  AlertTriangle, ClipboardCheck, Trophy, ListChecks, Bookmark, CheckCircle2,
  Telescope, Quote, Link2, NotebookPen,
} from "lucide-react";
import MathTex from "./Math";
import SimPlayer from "./SimPlayer";
import { FormulaAssembly, Quiz, NotePad, RisingTitle } from "./Interactives";
import type { Chapter, Topic } from "./content";
import { useBook, type LearnMode } from "./useBook";
import { voice, sectionIntro, type Level } from "./voice";
import { getExpansion } from "./expansions";

export interface Section {
  id: string;
  n: number;
  name: string;
  short: string;
  icon: React.ReactNode;
  modes: LearnMode[];
  body: React.ReactNode;
}

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[0.74rem] font-bold uppercase tracking-[0.14em] soft mt-5 mb-1">{children}</h4>
);

const Callout: React.FC<{ title: string; children: React.ReactNode; tone?: "plain" | "warn" | "accent" }> = ({
  title, children, tone = "plain",
}) => (
  <div
    className="mt-3 rounded-xl border p-3"
    style={{
      borderColor: tone === "warn" ? "rgba(180,110,20,0.45)" : "rgba(0,0,0,0.15)",
      background: tone === "warn" ? "rgba(220,160,40,0.12)" : "rgba(0,0,0,0.035)",
      borderLeftWidth: 3,
      borderLeftColor: tone === "accent" ? "var(--accent)" : tone === "warn" ? "rgba(180,110,20,0.7)" : "rgba(0,0,0,0.35)",
    }}
  >
    <p className="text-[0.72rem] font-bold uppercase tracking-wider soft mb-1">{title}</p>
    <div className="text-[0.93rem] leading-relaxed">{children}</div>
  </div>
);

const Intro: React.FC<{ id: string; level: Level }> = ({ id, level }) => {
  const t = sectionIntro(id, level);
  return t ? <p className="text-[0.85rem] italic soft mb-3">{t}</p> : null;
};

export function buildSections(chapter: Chapter, topic: Topic, level: Level): Section[] {
  const all: LearnMode[] = ["story", "simple", "academic", "exam"];
  const v = voice(topic, level);
  const x = getExpansion(topic.id);

  return [
    {
      id: "awaken", n: 1, name: "Awaken", short: "Awaken", icon: <Sparkles size={16} />,
      modes: ["story", "simple", "academic"],
      body: (
        <div>
          <Intro id="awaken" level={level} />
          <p className="text-[1.12rem] leading-relaxed font-medium serif">
            <RisingTitle text={topic.awaken.hook} />
          </p>
          <Callout title="Curiosity question" tone="accent">{topic.awaken.curiosity}</Callout>
          <H>Why this matters outside the classroom</H>
          <p>{topic.awaken.realWorld}</p>
          <H>By the end of this page you should be able to</H>
          <p className="soft">{topic.awaken.objective}</p>
          <p className="text-xs soft mt-4">
            Unit {chapter.unit} · {chapter.title} · about {topic.minutes} minutes ·{" "}
            {topic.formulas.length} formula{topic.formulas.length === 1 ? "" : "s"} ·{" "}
            {topic.quiz.length} practice questions
          </p>
        </div>
      ),
    },
    {
      id: "understand", n: 2, name: "Understand", short: "Understand", icon: <BookOpen size={16} />,
      modes: ["story", "simple", "academic"],
      body: (
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-wider soft mb-1">{v.badge}</p>
          <p className="text-[1.02rem] leading-relaxed font-medium">{v.lead}</p>
          <H>Explained properly</H>
          <p className="leading-relaxed">{v.main}</p>
          {v.main !== topic.understand.simple && level !== "standard" && (
            <p className="leading-relaxed mt-2">{topic.understand.simple}</p>
          )}
          <Callout title="A familiar analogy">{v.support}</Callout>
          <H>What to watch for in the demonstration</H>
          <p>{topic.understand.demo}</p>
          <Callout title="Explain like I'm new">
            <span className="font-semibold">{topic.understand.eli5}</span>
          </Callout>
        </div>
      ),
    },
    {
      id: "definition", n: 3, name: "Real definition", short: "Definition", icon: <GraduationCap size={16} />,
      modes: ["story", "academic", "exam"],
      body: (
        <div>
          <Intro id="definition" level={level} />
          <p className="text-[0.85rem] italic soft mb-2">{v.definitionLead}</p>
          <p className="leading-relaxed text-[1.01rem]">{topic.definition.formal}</p>
          <H>Conditions under which it holds</H>
          <ul className="list-disc pl-5 space-y-1">
            {topic.definition.conditions.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
          <H>Technical vocabulary</H>
          <dl className="space-y-1">
            {topic.definition.vocabulary.map((w) => (
              <div key={w.term} className="flex gap-2">
                <dt className="font-semibold shrink-0">{w.term}:</dt>
                <dd className="soft">{w.meaning}</dd>
              </div>
            ))}
          </dl>
          <H>Symbols and SI units</H>
          <p>{topic.definition.units}</p>
          <H>Assumptions and limitations</H>
          <ul className="list-disc pl-5 space-y-1">
            {topic.definition.assumptions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      ),
    },
    {
      id: "see", n: 4, name: "See the law", short: "See it", icon: <Eye size={16} />, modes: all,
      body: (
        <div>
          <p className="text-[0.85rem] italic soft mb-3">
            Move things, change values, and watch the mathematics respond. Every control has a
            keyboard equivalent and a written description.
          </p>
          <SimPlayer sim={topic.sim} fallback={topic.staticFallback} brief={topic.simBrief} steps={topic.steps} />
        </div>
      ),
    },
    {
      id: "formula", n: 5, name: "Formula lab", short: "Formulas", icon: <FlaskConical size={16} />,
      modes: ["story", "academic", "exam"],
      body: (
        <div className="space-y-5">
          <Intro id="formula" level={level} />
          {topic.formulas.map((f, i) => (
            <div key={i} className="rounded-2xl border border-black/15 bg-white/45 p-4">
              <p className="text-[0.74rem] font-bold uppercase tracking-wider soft">{f.name}</p>
              <MathTex tex={f.tex} block />
              <H>What each symbol means</H>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.85rem] min-w-[320px]">
                  <thead>
                    <tr className="text-left soft">
                      <th className="py-1">Symbol</th><th>Meaning</th><th>SI unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {f.where.map((w, k) => (
                      <tr key={k} className="border-t border-black/10">
                        <td className="py-1 pr-2"><MathTex tex={w.sym} /></td>
                        <td className="pr-2">{w.meaning}</td>
                        <td className="soft">{w.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <H>Conditions of validity</H>
              <ul className="list-disc pl-5">{f.conditions.map((c, k) => <li key={k}>{c}</li>)}</ul>
              {f.rearranged && (
                <>
                  <H>Rearranged and related forms</H>
                  <div className="flex flex-wrap gap-2">
                    {f.rearranged.map((r, k) => (
                      <span key={k} className="rounded-lg bg-black/[0.05] px-3 py-1"><MathTex tex={r} /></span>
                    ))}
                  </div>
                </>
              )}
              {f.dimensional && (
                <>
                  <H>Dimensional check</H>
                  <MathTex tex={f.dimensional} />
                </>
              )}
            </div>
          ))}
          {topic.examples.map((e, i) => (
            <div key={i} className="rounded-2xl border border-black/15 bg-black/[0.03] p-4">
              <p className="font-bold text-[0.94rem]">{e.title}</p>
              <p className="mt-1 italic">{e.problem}</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">{e.steps.map((s, k) => <li key={k}>{s}</li>)}</ol>
              <p className="mt-2 font-semibold">Answer: {e.answer}</p>
            </div>
          ))}
          {topic.assemble && <FormulaAssembly prompt={topic.assemble.prompt} tokens={topic.assemble.tokens} />}
        </div>
      ),
    },
    {
      id: "experiment", n: 6, name: "Experiment", short: "Experiment", icon: <Beaker size={16} />,
      modes: ["story", "simple", "academic"],
      body: (
        <div className="space-y-3">
          <p className="text-[0.85rem] italic soft">
            Predict first, then run it. Being wrong on purpose is one of the fastest ways to learn.
          </p>
          <SimPlayer
            sim={topic.sim}
            fallback={topic.staticFallback}
            brief={topic.simBrief}
            steps={topic.steps}
            prediction={topic.prediction ?? "What do you expect to change when you move the first slider?"}
          />
          <Callout title="Scientific explanation of what you observed">
            {topic.understand.demo} {topic.definition.formal}
          </Callout>
        </div>
      ),
    },
    {
      id: "real", n: 7, name: "Real-life connection", short: "Real life", icon: <Globe2 size={16} />,
      modes: ["story", "simple", "academic"],
      body: (
        <ul className="space-y-2">
          {topic.realLife.map((r, i) => (
            <li key={i} className="rounded-xl border border-black/10 bg-white/40 p-3">
              <span className="chip" style={{ borderColor: "rgba(0,0,0,0.25)", color: "var(--ink)", background: "rgba(0,0,0,0.05)" }}>
                {r.where}
              </span>
              <p className="mt-2">{r.detail}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "deeper", n: 8, name: "Going deeper", short: "Deeper", icon: <Telescope size={16} />,
      modes: ["story", "academic", "exam"],
      body: (
        <div>
          <Intro id="deeper" level={level} />
          {x ? (
            <>
              {x.deeper.map((d, i) => (
                <p key={i} className="leading-relaxed mb-3">{d}</p>
              ))}
              <Callout title="How this idea actually came about">
                <span className="inline-flex gap-2"><Quote size={15} className="shrink-0 mt-[3px]" />{x.history}</span>
              </Callout>
              <H>Where this leads next</H>
              <ul className="space-y-1">
                {x.connections.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <Link2 size={15} className="shrink-0 mt-1 soft" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <Callout title="The one sentence most students wish they had read first" tone="warn">
                {x.pitfallNote}
              </Callout>
            </>
          ) : (
            <p className="soft">Extended material for this topic is being prepared.</p>
          )}
        </div>
      ),
    },
    {
      id: "mistakes", n: 9, name: "Common mistakes", short: "Mistakes", icon: <AlertTriangle size={16} />,
      modes: all,
      body: (
        <div className="space-y-3">
          {topic.mistakes.map((m, i) => (
            <div key={i} className="rounded-2xl border border-black/15 bg-white/45 p-4">
              <p><strong>Common error:</strong> {m.wrong}</p>
              <p className="mt-1"><strong>Why it is wrong:</strong> {m.why}</p>
              <p className="mt-1"><strong>Correct idea:</strong> {m.right}</p>
              <p className="mt-2 text-[0.86rem] soft"><strong>Memory trick:</strong> {m.trick}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "exam", n: 10, name: "Exam mode", short: "Exam", icon: <ClipboardCheck size={16} />,
      modes: ["academic", "exam", "story"],
      body: (
        <div>
          <Intro id="exam" level={level} />
          <H>Definition to write in the examination</H>
          <p>{topic.exam.definition}</p>
          <H>Important derivation</H>
          <ol className="list-decimal pl-5 space-y-1">{topic.exam.derivation.map((d, i) => <li key={i}>{d}</li>)}</ol>
          <H>Key formula</H>
          <MathTex tex={topic.exam.keyFormula} block />
          <div className="space-y-2 mt-2">
            <div className="rounded-xl border border-black/15 bg-black/[0.03] p-3">
              <p className="font-semibold">Two marks — {topic.exam.twoMark.q}</p>
              <p className="mt-1 soft">{topic.exam.twoMark.a}</p>
            </div>
            <div className="rounded-xl border border-black/15 bg-black/[0.03] p-3">
              <p className="font-semibold">Five marks — {topic.exam.fiveMark.q}</p>
              <p className="mt-1 soft">{topic.exam.fiveMark.a}</p>
            </div>
            <div className="rounded-xl border border-black/15 bg-black/[0.03] p-3">
              <p className="font-semibold">Numerical — {topic.exam.numerical.q}</p>
              <p className="mt-1 soft">{topic.exam.numerical.a}</p>
            </div>
          </div>
          <H>Revision checklist</H>
          <ul className="list-disc pl-5">{topic.exam.checklist.map((c, i) => <li key={i}>{c}</li>)}</ul>
          {topic.verify && (
            <Callout title="For teacher verification" tone="warn">{topic.verify}</Callout>
          )}
        </div>
      ),
    },
    {
      id: "challenge", n: 11, name: "Challenge", short: "Quiz", icon: <Trophy size={16} />, modes: all,
      body: <Quiz topicId={topic.id} questions={topic.quiz} />,
    },
    {
      id: "summary", n: 12, name: "Page summary", short: "Summary", icon: <ListChecks size={16} />, modes: all,
      body: <SummarySection topic={topic} chapterId={chapter.id} />,
    },
  ];
}

const SummarySection: React.FC<{ topic: Topic; chapterId: string }> = ({ topic, chapterId }) => {
  const { completed, bookmarks, toggleComplete, toggleBookmark, go } = useBook();
  const done = completed.includes(topic.id);
  const marked = bookmarks.includes(topic.id);
  return (
    <div className="space-y-4">
      <H>Five key points</H>
      <ol className="list-decimal pl-5 space-y-1">
        {topic.summary.points.map((p, i) => <li key={i}>{p}</li>)}
      </ol>
      <div>
        <H>Formula recap</H>
        <div className="flex flex-wrap gap-2">
          {topic.summary.recap.map((r, i) => (
            <span key={i} className="rounded-lg bg-black/[0.05] px-3 py-1"><MathTex tex={r} /></span>
          ))}
        </div>
      </div>
      <div>
        <H>Visual memory map</H>
        <div className="flex flex-wrap items-center gap-2">
          {topic.summary.memoryMap.map((m, i) => (
            <React.Fragment key={i}>
              <span className="rounded-full border border-black/20 bg-white/60 px-3 py-1 text-[0.82rem] font-semibold">{m}</span>
              {i < topic.summary.memoryMap.length - 1 && <span aria-hidden className="soft">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-ink" onClick={() => toggleComplete(topic.id)} aria-pressed={done}>
          <CheckCircle2 size={16} /> {done ? "Marked as completed" : "Mark as completed"}
        </button>
        <button className="btn btn-ink" onClick={() => toggleBookmark(topic.id)} aria-pressed={marked}>
          <Bookmark size={16} /> {marked ? "Bookmarked" : "Bookmark this topic"}
        </button>
        <button className="btn btn-ink" onClick={() => go("notes")}>
          <NotebookPen size={16} /> Open my notebook
        </button>
      </div>
      <NotePad topicId={topic.id} topicTitle={topic.title} chapterId={chapterId} />
    </div>
  );
};
