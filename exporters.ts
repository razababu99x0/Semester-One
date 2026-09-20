import { CHAPTERS, formulaLibrary, findChapter } from "@/data";
import { getExpansion } from "@/data/expansions";
import type { Chapter } from "@/types/content";
import { notesDB, quizDB, pagesDB } from "@/services/db";

/* ------------------------------------------------------------------ */
/* Print engine                                                        */
/* ------------------------------------------------------------------ */
/* A hidden same-document iframe is used instead of window.open(). It
   works offline, is never blocked by pop-up blockers, keeps the reader's
   place, and prints reliably on mobile browsers. A download fallback is
   always offered as well.                                              */

const CSS = `
  @page { margin: 15mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia,"Times New Roman",serif; color:#111; line-height:1.5; margin:0; }
  .wrap { max-width: 178mm; margin: 0 auto; }
  h1 { font-size: 23pt; margin:0 0 2pt; letter-spacing:-0.4pt; }
  h2 { font-size: 14.5pt; margin:15pt 0 4pt; border-bottom:1.2px solid #444; padding-bottom:3pt; }
  h3 { font-size: 11pt; margin:9pt 0 2pt; text-transform:uppercase; letter-spacing:0.6pt; color:#444; }
  p,li,td,th { font-size: 10.5pt; }
  ul,ol { margin:4pt 0 4pt 16pt; padding:0; }
  li { margin-bottom:2pt; }
  .sub { color:#444; font-size:10pt; font-style:italic; margin:0 0 2pt; }
  .meta { color:#666; font-size:8.5pt; margin:0 0 14pt; padding-bottom:6pt; border-bottom:1px solid #ddd; }
  .box { border:1px solid #c9c9c9; border-left:3px solid #666; padding:6pt 9pt; margin:6pt 0; background:#fafafa; }
  .tex { font-style:italic; font-size:11.5pt; display:inline-block; padding:1pt 0; }
  .formula { text-align:center; margin:5pt 0; }
  table { width:100%; border-collapse:collapse; margin:6pt 0; }
  td,th { border:1px solid #ccc; padding:3.5pt 6pt; text-align:left; font-size:9.8pt; vertical-align:top; }
  th { background:#f0f0f0; }
  .break { page-break-after: always; }
  .avoid { page-break-inside: avoid; }
  .note { border:1px solid #bbb; padding:8pt 10pt; margin:7pt 0; page-break-inside:avoid; }
  .note h3 { margin-top:0; text-transform:none; letter-spacing:0; font-size:12pt; color:#111; }
  .note .body { white-space:pre-wrap; font-size:10.5pt; }
  .tags { color:#666; font-size:8.5pt; margin-top:4pt; }
  .rule { height:1px; background:#ddd; margin:10pt 0; }
  footer { margin-top:16pt; padding-top:6pt; border-top:1px solid #ccc; color:#666; font-size:8.5pt; }
  @media screen { body { background:#fff; padding:24px; } }
`;

function buildDoc(title: string, inner: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head>
<body><div class="wrap">
<h1>${title}</h1>
<p class="meta">The Living Physics Book — Mathematical Physics &amp; Classical Mechanics · B.Sc. Physics, Semester I · generated ${new Date().toLocaleString()}</p>
${inner}
<footer>Exported offline from The Living Physics Book. Interactive 3D content is replaced here by static diagrams and written descriptions. Use your browser's “Save as PDF” destination in the print dialogue.</footer>
</div></body></html>`;
}

function printDoc(title: string, inner: string) {
  const html = buildDoc(title, inner);
  const old = document.getElementById("lpb-print-frame");
  if (old) old.remove();

  const frame = document.createElement("iframe");
  frame.id = "lpb-print-frame";
  frame.setAttribute("data-transient", "true");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;";
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  if (!doc) {
    downloadDoc(title, html);
    return;
  }
  doc.open();
  doc.write(html);
  doc.close();

  const go = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } catch {
      downloadDoc(title, html);
    }
    window.setTimeout(() => frame.remove(), 60000);
  };
  // give the iframe a tick to lay out before printing
  if (doc.readyState === "complete") window.setTimeout(go, 250);
  else frame.onload = () => window.setTimeout(go, 250);
}

function downloadDoc(title: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/** Exposed so the UI can offer “save a copy” as well as “print”. */
export function saveAsFile(title: string, inner: string) {
  downloadDoc(title, buildDoc(title, inner));
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);

/** Renders mini-TeX to readable plain text for print (no web fonts needed). */
const SYM: Record<string, string> = {
  alpha: "α", beta: "β", gamma: "γ", Gamma: "Γ", delta: "δ", Delta: "Δ", epsilon: "ε",
  theta: "θ", lambda: "λ", mu: "μ", nu: "ν", pi: "π", rho: "ρ", sigma: "σ", Sigma: "Σ",
  tau: "τ", phi: "φ", Phi: "Φ", omega: "ω", Omega: "Ω", partial: "∂", nabla: "∇",
  infty: "∞", int: "∫", oint: "∮", sum: "Σ", cdot: "·", times: "×", pm: "±", approx: "≈",
  neq: "≠", leq: "≤", geq: "≥", to: "→", propto: "∝", ldots: "…", varepsilon: "ε",
  quad: " ", qquad: "  ", left: "", right: "", text: "", mathrm: "", varphi: "φ", psi: "ψ",
};
function tex(src: string): string {
  let s = src;
  s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
  s = s.replace(/\\sqrt\{([^{}]*)\}/g, "√($1)");
  s = s.replace(/\\vec\{([^{}]*)\}/g, "$1\u20D7");
  s = s.replace(/\\hat\{([^{}]*)\}/g, "$1\u0302");
  s = s.replace(/\\dot\{([^{}]*)\}/g, "$1\u0307");
  s = s.replace(/\\(?:text|mathrm|mathbf)\{([^{}]*)\}/g, "$1");
  s = s.replace(/\\([a-zA-Z]+)/g, (_m, w: string) => SYM[w] ?? w);
  s = s.replace(/\^\{([^{}]*)\}/g, "^($1)").replace(/_\{([^{}]*)\}/g, "_($1)");
  s = s.replace(/[{}]/g, "");
  return esc(s);
}
const F = (t: string) => `<div class="formula"><span class="tex">${tex(t)}</span></div>`;

/* ------------------------------------------------------------------ */
/* Chapter export — full study document                                */
/* ------------------------------------------------------------------ */
export function exportChapter(chapterId: string) {
  const ch = findChapter(chapterId) as Chapter;
  if (!ch) return;
  const toc = `<h2>Contents</h2><ol>${ch.topics.map((t) => `<li>${esc(t.title)} <span style="color:#777">· ${t.minutes} min</span></li>`).join("")}</ol>
  <p class="sub">${esc(ch.blurb)}</p><div class="break"></div>`;

  const body = ch.topics
    .map((t) => {
      const x = getExpansion(t.id);
      return `<section>
  <h2>${esc(t.title)}</h2>
  <p class="sub">${esc(t.awaken.hook)}</p>

  <h3>In the simplest words</h3><p>${esc(x?.plain ?? t.understand.eli5)}</p>
  <h3>Standard explanation</h3><p>${esc(t.understand.simple)}</p>
  <p><strong>Analogy.</strong> ${esc(t.understand.analogy)}</p>
  <h3>Formal definition</h3><p>${esc(t.definition.formal)}</p>
  <p><strong>Conditions.</strong></p><ul>${t.definition.conditions.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
  <p><strong>Units.</strong> ${esc(t.definition.units)}</p>
  <p><strong>Assumptions.</strong> ${t.definition.assumptions.map(esc).join(" ")}</p>

  <h3>Formulas</h3>
  ${t.formulas
    .map(
      (f) => `<div class="box avoid"><strong>${esc(f.name)}</strong>${F(f.tex)}
      <table><tr><th>Symbol</th><th>Meaning</th><th>Unit</th></tr>
      ${f.where.map((w) => `<tr><td>${tex(w.sym)}</td><td>${esc(w.meaning)}</td><td>${esc(w.unit)}</td></tr>`).join("")}</table>
      <p style="margin:3pt 0 0"><em>Valid when:</em> ${f.conditions.map(esc).join("; ")}</p></div>`,
    )
    .join("")}

  <h3>Worked examples</h3>
  ${t.examples
    .map(
      (e) => `<div class="box avoid"><strong>${esc(e.title)}</strong><p><em>${esc(e.problem)}</em></p>
      <ol>${e.steps.map((st) => `<li>${esc(st)}</li>`).join("")}</ol>
      <p><strong>Answer:</strong> ${esc(e.answer)}</p></div>`,
    )
    .join("")}

  <h3>Diagram (static description)</h3><p>${esc(t.staticFallback)}</p>
  <h3>Step-by-step method</h3><ol>${t.steps.map((st) => `<li>${esc(st)}</li>`).join("")}</ol>

  <h3>Going deeper</h3>${(x?.deeper ?? []).map((d) => `<p>${esc(d)}</p>`).join("")}
  ${x ? `<p><strong>Historical note.</strong> ${esc(x.history)}</p>` : ""}

  <h3>Common mistakes</h3>
  ${t.mistakes.map((m) => `<div class="box avoid"><p><strong>Error:</strong> ${esc(m.wrong)}</p><p><strong>Why wrong:</strong> ${esc(m.why)}</p><p><strong>Correct:</strong> ${esc(m.right)}</p><p><em>Trick: ${esc(m.trick)}</em></p></div>`).join("")}

  <h3>Examination material</h3>
  <p><strong>Definition.</strong> ${esc(t.exam.definition)}</p>
  <p><strong>Derivation.</strong></p><ol>${t.exam.derivation.map((d) => `<li>${esc(d)}</li>`).join("")}</ol>
  ${F(t.exam.keyFormula)}
  <div class="box avoid"><p><strong>2 marks — ${esc(t.exam.twoMark.q)}</strong></p><p>${esc(t.exam.twoMark.a)}</p></div>
  <div class="box avoid"><p><strong>5 marks — ${esc(t.exam.fiveMark.q)}</strong></p><p>${esc(t.exam.fiveMark.a)}</p></div>
  <div class="box avoid"><p><strong>Numerical — ${esc(t.exam.numerical.q)}</strong></p><p>${esc(t.exam.numerical.a)}</p></div>
  <p><strong>Revision checklist.</strong></p><ul>${t.exam.checklist.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>

  <h3>Practice questions</h3>
  <ol>${t.quiz.map((qq) => `<li>${esc(qq.q)}<br><span style="color:#555">${qq.options.map((o, i) => `${"ABCD"[i]}. ${esc(o)}`).join(" &nbsp; ")}</span><br><em>Answer: ${"ABCD"[qq.answer]} — ${esc(qq.explain)}</em></li>`).join("")}</ol>

  <h3>Summary</h3><ul>${t.summary.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
  ${t.summary.recap.map(F).join("")}
  ${t.verify ? `<div class="box"><strong>For teacher verification:</strong> ${esc(t.verify)}</div>` : ""}
  </section><div class="break"></div>`;
    })
    .join("");

  printDoc(`${ch.title} — Unit ${ch.unit} complete notes`, toc + body);
}

/* ------------------------------------------------------------------ */
export function exportFormulaSheet() {
  const byChapter = CHAPTERS.map((c) => {
    const rows = formulaLibrary()
      .filter((f) => f.chapterId === c.id)
      .map((f) => `<tr><td style="width:30%">${esc(f.name)}</td><td style="width:40%"><span class="tex">${tex(f.tex)}</span></td><td>${esc(f.topic)}</td></tr>`)
      .join("");
    return `<h2>Unit ${c.unit} — ${esc(c.title)}</h2><table><tr><th>Name</th><th>Formula</th><th>Topic</th></tr>${rows}</table>`;
  }).join("");
  printDoc("Formula sheet — all four units", byChapter);
}

/* ------------------------------------------------------------------ */
export async function exportStudyNotes() {
  const notes = await notesDB.all();
  const inner = notes.filter((n) => n.text.trim()).length
    ? notes
        .filter((n) => n.text.trim())
        .map((n) => {
          const t = CHAPTERS.flatMap((c) => c.topics).find((x) => x.id === n.id);
          return `<section class="avoid"><h2>${esc(t?.title ?? n.id)}</h2>
          <div class="note"><h3>My note</h3><div class="body">${esc(n.text)}</div></div>
          <h3>Key points from the book</h3><ul>${(t?.summary.points ?? []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${(t?.summary.recap ?? []).map(F).join("")}</section>`;
        })
        .join("")
    : "<p>You have not written any topic notes yet. Open any topic, scroll to the summary section and add a note — it is stored offline on this device.</p>";
  printDoc("Printable study notes", inner);
}

/* ------------------------------------------------------------------ */
export async function exportNotebook() {
  const pages = (await pagesDB.all()).sort(
    (a, b) => Number(!!b.pinned) - Number(!!a.pinned) || a.created - b.created,
  );
  const topicNotes = (await notesDB.all()).filter((n) => n.text.trim());
  const name = (id?: string) => CHAPTERS.flatMap((c) => c.topics).find((t) => t.id === id)?.title;

  const inner =
    (pages.length
      ? `<h2>Notebook pages</h2>` +
        pages
          .map(
            (p) => `<div class="note"><h3>${esc(p.title || "Untitled note")}</h3>
      ${p.topicId ? `<p class="sub">Linked to: ${esc(name(p.topicId) ?? p.topicId)}</p>` : ""}
      <div class="body">${esc(p.body || "(empty)")}</div>
      <p class="tags">${p.tags.length ? "Tags: " + p.tags.map(esc).join(", ") + " · " : ""}last edited ${new Date(p.updated).toLocaleString()}</p></div>`,
          )
          .join("")
      : "<p>No notebook pages yet.</p>") +
    (topicNotes.length
      ? `<div class="break"></div><h2>Notes attached to topics</h2>` +
        topicNotes
          .map(
            (n) => `<div class="note"><h3>${esc(name(n.id) ?? n.id)}</h3><div class="body">${esc(n.text)}</div></div>`,
          )
          .join("")
      : "");

  printDoc("My Notebook", inner);
}

/* ------------------------------------------------------------------ */
export async function exportQuizReport() {
  const all = await quizDB.all();
  const byTopic = new Map<string, { best: number; total: number; attempts: number; last: number }>();
  all.forEach((r) => {
    const cur = byTopic.get(r.topicId);
    byTopic.set(r.topicId, {
      best: Math.max(cur?.best ?? 0, r.score),
      total: r.total,
      attempts: (cur?.attempts ?? 0) + 1,
      last: Math.max(cur?.last ?? 0, r.at),
    });
  });
  const name = (id: string) => CHAPTERS.flatMap((c) => c.topics).find((t) => t.id === id)?.title ?? id;
  const summary = all.length
    ? `<h2>Summary by topic</h2><table><tr><th>Topic</th><th>Best score</th><th>%</th><th>Attempts</th><th>Last attempt</th></tr>
      ${[...byTopic.entries()].map(([id, v]) => `<tr><td>${esc(name(id))}</td><td>${v.best}/${v.total}</td><td>${Math.round((v.best / v.total) * 100)}%</td><td>${v.attempts}</td><td>${new Date(v.last).toLocaleDateString()}</td></tr>`).join("")}</table>
      <h2>Full history</h2><table><tr><th>Topic</th><th>Score</th><th>When</th></tr>
      ${all.sort((a, b) => b.at - a.at).map((r) => `<tr><td>${esc(name(r.topicId))}</td><td>${r.score}/${r.total}</td><td>${new Date(r.at).toLocaleString()}</td></tr>`).join("")}</table>`
    : "<p>No quiz attempts recorded yet.</p>";
  printDoc("Quiz result report", summary);
}
