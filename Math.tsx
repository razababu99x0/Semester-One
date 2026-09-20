import React from "react";

/**
 * A tiny, fully-offline math renderer.
 *
 * KaTeX/MathJax ship font files that would have to be fetched separately; because
 * this book must run from a single offline bundle we render a carefully chosen
 * subset of TeX with pure HTML + CSS instead. Text stays real text, so it is
 * selectable, zoomable, screen-reader friendly and always sharp.
 *
 * Supported: \frac{}{}  \sqrt{}  ^{}  _{}  \vec{}  \hat{}  \bar{}  \dot{}
 *            \text{}  \mathbf{}  \left( \right)  greek letters, operators.
 */

const SYMBOLS: Record<string, string> = {
  alpha: "α", beta: "β", gamma: "γ", Gamma: "Γ", delta: "δ", Delta: "Δ",
  epsilon: "ε", varepsilon: "ε", zeta: "ζ", eta: "η", theta: "θ", Theta: "Θ",
  iota: "ι", kappa: "κ", lambda: "λ", Lambda: "Λ", mu: "μ", nu: "ν", xi: "ξ",
  pi: "π", Pi: "Π", rho: "ρ", sigma: "σ", Sigma: "Σ", tau: "τ", phi: "φ",
  Phi: "Φ", varphi: "φ", chi: "χ", psi: "ψ", Psi: "Ψ", omega: "ω", Omega: "Ω",
  partial: "∂", nabla: "∇", infty: "∞", int: "∫", oint: "∮", iint: "∬",
  sum: "∑", prod: "∏", cdot: "·", times: "×", pm: "±", mp: "∓", approx: "≈",
  neq: "≠", ne: "≠", leq: "≤", le: "≤", geq: "≥", ge: "≥", to: "→",
  rightarrow: "→", Rightarrow: "⇒", leftrightarrow: "↔", propto: "∝",
  in: "∈", forall: "∀", exists: "∃", angle: "∠", perp: "⊥", parallel: "∥",
  ldots: "…", cdots: "⋯", quad: "\u2003", qquad: "\u2003\u2003", ",": "\u2009",
  ";": "\u2009", " ": " ", degree: "°", circ: "∘", equiv: "≡", sim: "∼",
  hbar: "ℏ", ell: "ℓ", prime: "′", dd: "d",
};

const FUNCS = ["sin", "cos", "tan", "cot", "sec", "csc", "log", "ln", "exp", "lim", "max", "min", "det", "arg", "sinh", "cosh", "tanh"];

interface Node {
  type: "text" | "cmd" | "group" | "sup" | "sub";
  value?: string;
  args?: Node[][];
  body?: Node[];
}

function parse(src: string): Node[] {
  let i = 0;
  const parseGroup = (stop?: string): Node[] => {
    const out: Node[] = [];
    while (i < src.length) {
      const c = src[i];
      if (c === "}" && stop === "}") {
        i++;
        return out;
      }
      if (c === "{") {
        i++;
        out.push({ type: "group", body: parseGroup("}") });
        continue;
      }
      if (c === "^" || c === "_") {
        i++;
        const arg = readArg();
        out.push({ type: c === "^" ? "sup" : "sub", body: arg });
        continue;
      }
      if (c === "\\") {
        i++;
        let name = "";
        if (/[a-zA-Z]/.test(src[i])) {
          while (i < src.length && /[a-zA-Z]/.test(src[i])) name += src[i++];
        } else {
          name = src[i++];
        }
        const argc = name === "frac" ? 2 : ["sqrt", "vec", "hat", "bar", "dot", "text", "mathbf", "mathrm", "overline"].includes(name) ? 1 : 0;
        const args: Node[][] = [];
        for (let a = 0; a < argc; a++) args.push(readArg());
        out.push({ type: "cmd", value: name, args });
        continue;
      }
      i++;
      out.push({ type: "text", value: c });
    }
    return out;
  };
  const readArg = (): Node[] => {
    while (src[i] === " ") i++;
    if (src[i] === "{") {
      i++;
      return parseGroup("}");
    }
    if (src[i] === "\\") {
      const start = i;
      i++;
      while (i < src.length && /[a-zA-Z]/.test(src[i])) i++;
      return parse(src.slice(start, i));
    }
    return [{ type: "text", value: src[i++] ?? "" }];
  };
  return parseGroup();
}

function render(nodes: Node[], key = "k"): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  nodes.forEach((n, idx) => {
    const k = `${key}-${idx}`;
    if (n.type === "text") {
      const v = n.value!;
      if (/[a-zA-Z]/.test(v)) out.push(<i key={k} className="mathvar">{v}</i>);
      else if (v === "*") out.push(<span key={k}>·</span>);
      else out.push(<span key={k}>{v}</span>);
      return;
    }
    if (n.type === "group") {
      out.push(<span key={k}>{render(n.body!, k)}</span>);
      return;
    }
    if (n.type === "sup" || n.type === "sub") {
      const Tag = n.type === "sup" ? "sup" : "sub";
      out.push(<Tag key={k} className="mathscript">{render(n.body!, k)}</Tag>);
      return;
    }
    const name = n.value!;
    if (name === "frac") {
      out.push(
        <span key={k} className="mathfrac">
          <span className="mathnum">{render(n.args![0], k + "n")}</span>
          <span className="mathden">{render(n.args![1], k + "d")}</span>
        </span>,
      );
      return;
    }
    if (name === "sqrt") {
      out.push(
        <span key={k} className="mathsqrt">
          <span aria-hidden>√</span>
          <span className="mathsqrtbody">{render(n.args![0], k + "s")}</span>
        </span>,
      );
      return;
    }
    if (name === "vec" || name === "hat" || name === "bar" || name === "dot" || name === "overline") {
      const mark = name === "vec" ? "→" : name === "hat" ? "^" : name === "dot" ? "˙" : "‾";
      out.push(
        <span key={k} className={`mathacc acc-${name}`}>
          <span className="mathaccmark" aria-hidden>{mark}</span>
          <span>{render(n.args![0], k + "a")}</span>
        </span>,
      );
      return;
    }
    if (name === "text" || name === "mathrm") {
      out.push(<span key={k} className="mathtext">{plain(n.args![0])}</span>);
      return;
    }
    if (name === "mathbf") {
      out.push(<b key={k} className="mathvar">{plain(n.args![0])}</b>);
      return;
    }
    if (name === "left" || name === "right") return;
    if (FUNCS.includes(name)) {
      out.push(<span key={k} className="mathtext">{name}</span>);
      return;
    }
    const sym = SYMBOLS[name];
    out.push(<span key={k} className={name === "int" || name === "sum" || name === "oint" ? "mathbig" : undefined}>{sym ?? name}</span>);
  });
  return out;
}

function plain(nodes: Node[]): string {
  return nodes
    .map((n) =>
      n.type === "text" ? n.value : n.type === "group" ? plain(n.body!) : SYMBOLS[n.value ?? ""] ?? n.value ?? "",
    )
    .join("");
}

/** Approximate spoken form for screen readers. */
export function speak(tex: string): string {
  return tex
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, " $1 over $2 ")
    .replace(/\\vec\{([^{}]*)\}/g, " vector $1 ")
    .replace(/\\sqrt\{([^{}]*)\}/g, " square root of $1 ")
    .replace(/\^\{?([^{}\s]*)\}?/g, " to the power $1 ")
    .replace(/_\{?([^{}\s]*)\}?/g, " sub $1 ")
    .replace(/\\([a-zA-Z]+)/g, (_m, w) => ` ${SYMBOLS[w] ? w : w} `)
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const Math: React.FC<{ tex: string; block?: boolean; className?: string }> = ({
  tex,
  block,
  className = "",
}) => {
  const nodes = React.useMemo(() => parse(tex), [tex]);
  return (
    <span
      className={`mathroot ${block ? "mathblock" : "mathinline"} ${className}`}
      role="math"
      aria-label={speak(tex)}
    >
      {render(nodes)}
    </span>
  );
};

export default Math;
