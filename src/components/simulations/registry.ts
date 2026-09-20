import type { SimId } from "@/types/content";

export interface Param {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  def: number;
  unit?: string;
}
export interface Palette {
  ink: string;
  soft: string;
  accent: string;
  accent2: string;
  accent3: string;
  grid: string;
  paper: string;
}
export type P = Record<string, number>;
export interface SimDef {
  title: string;
  instructions: string;
  params: Param[];
  animated?: boolean;
  /** pointer position in normalised canvas coordinates (0..1) */
  drag?: (nx: number, ny: number, p: P) => P;
  readout: (p: P, t: number) => { label: string; value: string }[];
  draw: (c: CanvasRenderingContext2D, W: number, H: number, p: P, t: number, pal: Palette) => void;
}

/* ------------------------------------------------------------------ */
/* drawing helpers                                                     */
/* ------------------------------------------------------------------ */
const line = (c: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, col: string, w = 1.5) => {
  c.strokeStyle = col;
  c.lineWidth = w;
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
};
const arrow = (c: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, col: string, w = 2) => {
  line(c, x1, y1, x2, y2, col, w);
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 6 + w;
  c.fillStyle = col;
  c.beginPath();
  c.moveTo(x2, y2);
  c.lineTo(x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4));
  c.lineTo(x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4));
  c.closePath();
  c.fill();
};
const dot = (c: CanvasRenderingContext2D, x: number, y: number, r: number, col: string) => {
  c.fillStyle = col;
  c.beginPath();
  c.arc(x, y, r, 0, 7);
  c.fill();
};
const label = (c: CanvasRenderingContext2D, txt: string, x: number, y: number, col: string, size = 12, align: CanvasTextAlign = "left") => {
  c.fillStyle = col;
  c.font = `${size}px Inter, system-ui, sans-serif`;
  c.textAlign = align;
  c.fillText(txt, x, y);
  c.textAlign = "left";
};

/** Cartesian frame mapper */
function frame(W: number, H: number, xmin: number, xmax: number, ymin: number, ymax: number) {
  const pad = 34;
  const sx = (W - 2 * pad) / (xmax - xmin);
  const sy = (H - 2 * pad) / (ymax - ymin);
  return {
    X: (x: number) => pad + (x - xmin) * sx,
    Y: (y: number) => H - pad - (y - ymin) * sy,
    invX: (px: number) => xmin + (px - pad) / sx,
    invY: (py: number) => ymin + (H - pad - py) / sy,
  };
}
function grid(c: CanvasRenderingContext2D, W: number, H: number, f: ReturnType<typeof frame>, xmin: number, xmax: number, ymin: number, ymax: number, pal: Palette) {
  c.save();
  c.strokeStyle = pal.grid;
  c.lineWidth = 1;
  for (let x = Math.ceil(xmin); x <= xmax; x++) {
    c.globalAlpha = x === 0 ? 0.85 : 0.22;
    c.beginPath();
    c.moveTo(f.X(x), 8);
    c.lineTo(f.X(x), H - 8);
    c.stroke();
  }
  for (let y = Math.ceil(ymin); y <= ymax; y++) {
    c.globalAlpha = y === 0 ? 0.85 : 0.22;
    c.beginPath();
    c.moveTo(8, f.Y(y));
    c.lineTo(W - 8, f.Y(y));
    c.stroke();
  }
  c.restore();
}
function plot(c: CanvasRenderingContext2D, f: ReturnType<typeof frame>, xmin: number, xmax: number, fn: (x: number) => number, col: string, w = 2.4) {
  c.strokeStyle = col;
  c.lineWidth = w;
  c.beginPath();
  let started = false;
  for (let i = 0; i <= 260; i++) {
    const x = xmin + ((xmax - xmin) * i) / 260;
    const y = fn(x);
    if (!isFinite(y)) {
      started = false;
      continue;
    }
    const px = f.X(x);
    const py = f.Y(y);
    if (!started) {
      c.moveTo(px, py);
      started = true;
    } else c.lineTo(px, py);
  }
  c.stroke();
}

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

/* ------------------------------------------------------------------ */
/* simulations                                                         */
/* ------------------------------------------------------------------ */
export const SIMS: Partial<Record<NonNullable<SimId>, SimDef>> = {
  "derivative-tangent": {
    title: "Tangent line laboratory",
    instructions: "Drag anywhere on the plot to move the point P, or use the sliders. Shrink h to watch the secant become the tangent.",
    params: [
      { key: "x0", label: "Position of P (x₀)", min: -2.5, max: 2.5, step: 0.05, def: 1 },
      { key: "h", label: "Interval h", min: 0.01, max: 1.5, step: 0.01, def: 0.8 },
      { key: "a", label: "Curve shape a in y = a x³ − 2x", min: -1, max: 1, step: 0.05, def: 0.5 },
    ],
    drag: (nx, _ny, p) => ({ ...p, x0: -3 + nx * 6 }),
    readout: (p) => {
      const f = (x: number) => p.a * x ** 3 - 2 * x;
      const slope = 3 * p.a * p.x0 ** 2 - 2;
      const sec = (f(p.x0 + p.h) - f(p.x0)) / p.h;
      return [
        { label: "Exact slope f′(x₀)", value: slope.toFixed(3) },
        { label: "Secant slope (average rate)", value: sec.toFixed(3) },
        { label: "Difference", value: Math.abs(sec - slope).toFixed(4) },
        { label: "Angle of tangent", value: `${((Math.atan(slope) * 180) / Math.PI).toFixed(1)}°` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const f = (x: number) => p.a * x ** 3 - 2 * x;
      const fr = frame(W, H, -3, 3, -4, 4);
      grid(c, W, H, fr, -3, 3, -4, 4, pal);
      plot(c, fr, -3, 3, f, pal.accent);
      const m = 3 * p.a * p.x0 ** 2 - 2;
      plot(c, fr, -3, 3, (x) => f(p.x0) + m * (x - p.x0), pal.accent2, 1.8);
      const x1 = p.x0 + p.h;
      line(c, fr.X(p.x0), fr.Y(f(p.x0)), fr.X(x1), fr.Y(f(x1)), pal.accent3, 1.6);
      dot(c, fr.X(p.x0), fr.Y(f(p.x0)), 6, pal.ink);
      dot(c, fr.X(x1), fr.Y(f(x1)), 4.5, pal.accent3);
      label(c, "P", fr.X(p.x0) + 8, fr.Y(f(p.x0)) - 8, pal.ink, 13);
      label(c, "Q", fr.X(x1) + 8, fr.Y(f(x1)) - 8, pal.soft, 12);
      label(c, "tangent", 12, 20, pal.accent2, 12);
      label(c, "secant", 12, 36, pal.accent3, 12);
    },
  },

  "maxima-minima": {
    title: "Stationary points explorer",
    instructions: "Reshape the cubic y = x³ + bx² + cx. Maxima are marked amber, minima cyan. Drag to move the probe.",
    params: [
      { key: "b", label: "Coefficient b", min: -4, max: 4, step: 0.1, def: -3 },
      { key: "c", label: "Coefficient c", min: -6, max: 6, step: 0.1, def: 0 },
      { key: "x", label: "Probe position", min: -4, max: 4, step: 0.05, def: 0 },
    ],
    drag: (nx, _ny, p) => ({ ...p, x: -4.5 + nx * 9 }),
    readout: (p) => {
      const d = 4 * p.b * p.b - 12 * p.c;
      const roots = d >= 0 ? [(-2 * p.b - Math.sqrt(d)) / 6, (-2 * p.b + Math.sqrt(d)) / 6] : [];
      return [
        { label: "f′(x) at probe", value: (3 * p.x ** 2 + 2 * p.b * p.x + p.c).toFixed(3) },
        { label: "f″(x) at probe", value: (6 * p.x + 2 * p.b).toFixed(3) },
        { label: "Stationary points", value: roots.length ? roots.map((r) => r.toFixed(2)).join(", ") : "none (monotonic)" },
        { label: "Probe classification", value: Math.abs(3 * p.x ** 2 + 2 * p.b * p.x + p.c) < 0.08 ? (6 * p.x + 2 * p.b > 0 ? "minimum" : 6 * p.x + 2 * p.b < 0 ? "maximum" : "inflection") : "not stationary" },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const f = (x: number) => x ** 3 + p.b * x ** 2 + p.c * x;
      const fr = frame(W, H, -4.5, 4.5, -12, 12);
      grid(c, W, H, fr, -4.5, 4.5, -12, 12, pal);
      plot(c, fr, -4.5, 4.5, f, pal.accent);
      const d = 4 * p.b * p.b - 12 * p.c;
      if (d >= 0) {
        [(-2 * p.b - Math.sqrt(d)) / 6, (-2 * p.b + Math.sqrt(d)) / 6].forEach((r) => {
          const col = 6 * r + 2 * p.b > 0 ? pal.accent3 : pal.accent2;
          dot(c, fr.X(r), fr.Y(f(r)), 6, col);
        });
      }
      dot(c, fr.X(p.x), fr.Y(f(p.x)), 5, pal.ink);
      const m = 3 * p.x ** 2 + 2 * p.b * p.x + p.c;
      plot(c, fr, p.x - 1.2, p.x + 1.2, (x) => f(p.x) + m * (x - p.x), pal.soft, 1.4);
    },
  },

  approximation: {
    title: "Linear approximation error",
    instructions: "Increase Δx and watch the gap between the true curve and the tangent grow as (Δx)².",
    params: [
      { key: "x0", label: "Base point x₀", min: 0.5, max: 4, step: 0.05, def: 2 },
      { key: "dx", label: "Step Δx", min: 0.01, max: 2, step: 0.01, def: 0.6 },
    ],
    drag: (nx, _ny, p) => ({ ...p, dx: Math.max(0.01, nx * 2) }),
    readout: (p) => {
      const f = Math.sqrt, fp = (x: number) => 0.5 / Math.sqrt(x);
      const exact = f(p.x0 + p.dx);
      const approx = f(p.x0) + fp(p.x0) * p.dx;
      return [
        { label: "√(x₀+Δx) exact", value: exact.toFixed(5) },
        { label: "Linear estimate", value: approx.toFixed(5) },
        { label: "Absolute error", value: Math.abs(exact - approx).toFixed(5) },
        { label: "Relative error", value: `${((Math.abs(exact - approx) / exact) * 100).toFixed(3)} %` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const f = Math.sqrt;
      const fr = frame(W, H, 0, 6, 0, 3);
      grid(c, W, H, fr, 0, 6, 0, 3, pal);
      plot(c, fr, 0.01, 6, f, pal.accent);
      const m = 0.5 / Math.sqrt(p.x0);
      plot(c, fr, 0, 6, (x) => f(p.x0) + m * (x - p.x0), pal.accent2, 1.8);
      const x1 = p.x0 + p.dx;
      dot(c, fr.X(p.x0), fr.Y(f(p.x0)), 5, pal.ink);
      dot(c, fr.X(x1), fr.Y(f(x1)), 5, pal.accent);
      dot(c, fr.X(x1), fr.Y(f(p.x0) + m * p.dx), 5, pal.accent2);
      line(c, fr.X(x1), fr.Y(f(x1)), fr.X(x1), fr.Y(f(p.x0) + m * p.dx), pal.accent3, 3);
      label(c, "error", fr.X(x1) + 8, (fr.Y(f(x1)) + fr.Y(f(p.x0) + m * p.dx)) / 2, pal.accent3, 12);
      label(c, "y = √x", 14, 22, pal.accent, 12);
      label(c, "tangent at x₀", 14, 38, pal.accent2, 12);
    },
  },

  "partial-derivative": {
    title: "Surface slices and partial slopes",
    instructions: "Drag the probe across the saddle z = x² − y². The two slice curves show ∂z/∂x and ∂z/∂y.",
    params: [
      { key: "x", label: "Probe x", min: -2, max: 2, step: 0.05, def: 1 },
      { key: "y", label: "Probe y", min: -2, max: 2, step: 0.05, def: 0.6 },
    ],
    drag: (nx, ny, p) => ({ ...p, x: -2 + nx * 4, y: 2 - ny * 4 }),
    readout: (p) => [
      { label: "z = x² − y²", value: (p.x ** 2 - p.y ** 2).toFixed(3) },
      { label: "∂z/∂x = 2x", value: (2 * p.x).toFixed(3) },
      { label: "∂z/∂y = −2y", value: (-2 * p.y).toFixed(3) },
      { label: "|∇z|", value: Math.hypot(2 * p.x, 2 * p.y).toFixed(3) },
    ],
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -2, 2, -2, 2);
      for (let i = -2; i <= 2; i += 0.1) {
        for (let j = -2; j <= 2; j += 0.1) {
          const z = i * i - j * j;
          c.fillStyle = z > 0 ? `rgba(255,170,60,${Math.min(0.5, Math.abs(z) / 8)})` : `rgba(80,190,255,${Math.min(0.5, Math.abs(z) / 8)})`;
          c.fillRect(fr.X(i), fr.Y(j + 0.1), (W - 68) / 40 + 1, (H - 68) / 40 + 1);
        }
      }
      grid(c, W, H, fr, -2, 2, -2, 2, pal);
      line(c, fr.X(-2), fr.Y(p.y), fr.X(2), fr.Y(p.y), pal.accent2, 2);
      line(c, fr.X(p.x), fr.Y(-2), fr.X(p.x), fr.Y(2), pal.accent3, 2);
      dot(c, fr.X(p.x), fr.Y(p.y), 6, pal.ink);
      arrow(c, fr.X(p.x), fr.Y(p.y), fr.X(p.x + 2 * p.x * 0.2), fr.Y(p.y - 2 * p.y * 0.2), pal.ink, 2);
      label(c, "slice y = const (gives ∂z/∂x)", 12, 20, pal.accent2, 11);
      label(c, "slice x = const (gives ∂z/∂y)", 12, 36, pal.accent3, 11);
    },
  },

  "taylor-series": {
    title: "Taylor series builder",
    instructions: "Add terms one at a time and watch the polynomial wrap itself around the exact curve.",
    params: [
      { key: "n", label: "Number of terms", min: 1, max: 9, step: 1, def: 2 },
      { key: "fn", label: "Function (0 = sin x, 1 = cos x, 2 = eˣ)", min: 0, max: 2, step: 1, def: 0 },
      { key: "x", label: "Evaluate at x", min: -6, max: 6, step: 0.1, def: 3 },
    ],
    drag: (nx, _ny, p) => ({ ...p, x: -7 + nx * 14 }),
    readout: (p) => {
      const exact = p.fn === 0 ? Math.sin(p.x) : p.fn === 1 ? Math.cos(p.x) : Math.exp(p.x);
      let s = 0;
      for (let k = 0; k < p.n; k++) {
        if (p.fn === 0) s += ((-1) ** k * p.x ** (2 * k + 1)) / fact(2 * k + 1);
        else if (p.fn === 1) s += ((-1) ** k * p.x ** (2 * k)) / fact(2 * k);
        else s += p.x ** k / fact(k);
      }
      return [
        { label: "Exact value", value: exact.toFixed(5) },
        { label: `Series (${p.n} terms)`, value: s.toFixed(5) },
        { label: "Error", value: Math.abs(exact - s).toExponential(2) },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const exact = (x: number) => (p.fn === 0 ? Math.sin(x) : p.fn === 1 ? Math.cos(x) : Math.exp(x));
      const series = (x: number) => {
        let s = 0;
        for (let k = 0; k < p.n; k++) {
          if (p.fn === 0) s += ((-1) ** k * x ** (2 * k + 1)) / fact(2 * k + 1);
          else if (p.fn === 1) s += ((-1) ** k * x ** (2 * k)) / fact(2 * k);
          else s += x ** k / fact(k);
        }
        return s;
      };
      const fr = frame(W, H, -7, 7, -3, 3);
      grid(c, W, H, fr, -7, 7, -3, 3, pal);
      plot(c, fr, -7, 7, exact, pal.accent);
      plot(c, fr, -7, 7, series, pal.accent2, 2);
      dot(c, fr.X(p.x), fr.Y(Math.max(-3, Math.min(3, exact(p.x)))), 5, pal.ink);
      label(c, "exact", 12, 20, pal.accent, 12);
      label(c, `${p.n}-term series`, 12, 36, pal.accent2, 12);
    },
  },

  "binomial-series": {
    title: "Binomial approximation",
    instructions: "Compare (1+x)ⁿ with its one-, two- and three-term expansions as x grows.",
    params: [
      { key: "n", label: "Index n", min: -2, max: 3, step: 0.1, def: 0.5 },
      { key: "x", label: "Small quantity x", min: -0.9, max: 0.9, step: 0.01, def: 0.2 },
    ],
    drag: (nx, _ny, p) => ({ ...p, x: -0.9 + nx * 1.8 }),
    readout: (p) => {
      const ex = Math.pow(1 + p.x, p.n);
      const a1 = 1 + p.n * p.x;
      const a2 = a1 + (p.n * (p.n - 1) * p.x ** 2) / 2;
      return [
        { label: "Exact (1+x)ⁿ", value: ex.toFixed(6) },
        { label: "1 + nx", value: a1.toFixed(6) },
        { label: "+ n(n−1)x²/2", value: a2.toFixed(6) },
        { label: "Error of 1 + nx", value: Math.abs(ex - a1).toExponential(2) },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -0.9, 0.9, -1, 3);
      grid(c, W, H, fr, -0.9, 0.9, -1, 3, pal);
      plot(c, fr, -0.89, 0.9, (x) => Math.pow(1 + x, p.n), pal.accent);
      plot(c, fr, -0.9, 0.9, (x) => 1 + p.n * x, pal.accent2, 1.8);
      plot(c, fr, -0.9, 0.9, (x) => 1 + p.n * x + (p.n * (p.n - 1) * x * x) / 2, pal.accent3, 1.6);
      dot(c, fr.X(p.x), fr.Y(Math.pow(1 + p.x, p.n)), 5, pal.ink);
      label(c, "exact", 12, 20, pal.accent, 12);
      label(c, "1 + nx", 12, 36, pal.accent2, 12);
      label(c, "two corrections", 12, 52, pal.accent3, 12);
    },
  },

  "integral-area": {
    title: "Riemann sum to integral",
    instructions: "Increase the number of strips and watch the sum converge on the exact area. Drag to move the upper limit.",
    params: [
      { key: "b", label: "Upper limit b", min: 0.4, max: 3, step: 0.05, def: 2 },
      { key: "n", label: "Number of strips", min: 1, max: 60, step: 1, def: 8 },
    ],
    drag: (nx, _ny, p) => ({ ...p, b: Math.max(0.4, nx * 3) }),
    readout: (p) => {
      const f = (x: number) => x * x;
      const dx = p.b / p.n;
      let s = 0;
      for (let i = 0; i < p.n; i++) s += f(i * dx + dx / 2) * dx;
      const exact = p.b ** 3 / 3;
      return [
        { label: "Riemann sum", value: s.toFixed(5) },
        { label: "Exact ∫₀ᵇ x² dx = b³/3", value: exact.toFixed(5) },
        { label: "Error", value: Math.abs(exact - s).toExponential(2) },
        { label: "Strip width Δx", value: dx.toFixed(4) },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const f = (x: number) => x * x;
      const fr = frame(W, H, 0, 3, 0, 9);
      grid(c, W, H, fr, 0, 3, 0, 9, pal);
      const dx = p.b / p.n;
      for (let i = 0; i < p.n; i++) {
        const xm = i * dx + dx / 2;
        c.fillStyle = "rgba(80,190,255,0.35)";
        c.strokeStyle = pal.accent3;
        c.lineWidth = 1;
        const x0 = fr.X(i * dx), y0 = fr.Y(f(xm)), w = fr.X(dx) - fr.X(0), h = fr.Y(0) - y0;
        c.fillRect(x0, y0, w, h);
        c.strokeRect(x0, y0, w, h);
      }
      plot(c, fr, 0, 3, f, pal.accent);
      line(c, fr.X(p.b), fr.Y(0), fr.X(p.b), fr.Y(f(p.b)), pal.accent2, 2);
      label(c, "y = x²", W - 60, 24, pal.accent, 12);
    },
  },

  "direction-field": {
    title: "Direction field and solution curves",
    instructions: "Choose the equation, then drag on the field to drop a new initial condition and trace its solution.",
    params: [
      { key: "eq", label: "Equation (0: y′=(x+y)/x, 1: y′=1−y, 2: y′=−x/y)", min: 0, max: 2, step: 1, def: 0 },
      { key: "x0", label: "Initial x₀", min: 0.2, max: 4, step: 0.1, def: 1 },
      { key: "y0", label: "Initial y₀", min: -3, max: 3, step: 0.1, def: 1 },
    ],
    drag: (nx, ny, p) => ({ ...p, x0: Math.max(0.2, nx * 5), y0: 3.5 - ny * 7 }),
    readout: (p) => {
      const s = p.eq === 0 ? (p.x0 + p.y0) / p.x0 : p.eq === 1 ? 1 - p.y0 : -p.x0 / (p.y0 || 1e-6);
      return [
        { label: "Initial point", value: `(${p.x0.toFixed(2)}, ${p.y0.toFixed(2)})` },
        { label: "Slope there", value: s.toFixed(3) },
        { label: "Equation type", value: p.eq === 0 ? "homogeneous (function of y/x)" : p.eq === 1 ? "linear, steady state y = 1" : "separable, circles" },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const F = (x: number, y: number) => (p.eq === 0 ? (x + y) / (x || 1e-6) : p.eq === 1 ? 1 - y : -x / (y || 1e-6));
      const fr = frame(W, H, 0, 5, -3.5, 3.5);
      grid(c, W, H, fr, 0, 5, -3.5, 3.5, pal);
      for (let x = 0.25; x <= 5; x += 0.4) {
        for (let y = -3.25; y <= 3.5; y += 0.5) {
          const s = Math.max(-8, Math.min(8, F(x, y)));
          const a = Math.atan(s);
          const L = 11;
          line(c, fr.X(x) - L * Math.cos(a), fr.Y(y) + L * Math.sin(a), fr.X(x) + L * Math.cos(a), fr.Y(y) - L * Math.sin(a), pal.soft, 1.2);
        }
      }
      // integrate the trajectory (RK2) forwards and backwards
      [1, -1].forEach((dir) => {
        let x = p.x0, y = p.y0;
        c.strokeStyle = pal.accent;
        c.lineWidth = 2.4;
        c.beginPath();
        c.moveTo(fr.X(x), fr.Y(y));
        for (let i = 0; i < 600; i++) {
          const h = 0.01 * dir;
          const k1 = F(x, y);
          const k2 = F(x + h, y + h * k1);
          y += (h * (k1 + k2)) / 2;
          x += h;
          if (x < 0.05 || x > 5 || Math.abs(y) > 4) break;
          c.lineTo(fr.X(x), fr.Y(y));
        }
        c.stroke();
      });
      dot(c, fr.X(p.x0), fr.Y(p.y0), 5, pal.accent2);
    },
  },

  "shm-second-order": {
    title: "Damped and driven oscillator",
    instructions: "Change mass, stiffness, damping and drive. Watch the transient die away and the steady state remain.",
    animated: true,
    params: [
      { key: "m", label: "Mass m", min: 0.2, max: 4, step: 0.1, def: 1, unit: "kg" },
      { key: "k", label: "Spring constant k", min: 1, max: 40, step: 0.5, def: 10, unit: "N/m" },
      { key: "b", label: "Damping b", min: 0, max: 8, step: 0.1, def: 0.6, unit: "N s/m" },
      { key: "F", label: "Drive amplitude F₀", min: 0, max: 10, step: 0.2, def: 0, unit: "N" },
      { key: "w", label: "Drive frequency ω", min: 0.2, max: 8, step: 0.1, def: 3, unit: "rad/s" },
    ],
    readout: (p) => {
      const w0 = Math.sqrt(p.k / p.m), g = p.b / (2 * p.m);
      const reg = g < w0 - 1e-9 ? "underdamped" : Math.abs(g - w0) < 1e-9 ? "critically damped" : "overdamped";
      return [
        { label: "ω₀ = √(k/m)", value: `${w0.toFixed(3)} rad/s` },
        { label: "γ = b/2m", value: `${g.toFixed(3)} s⁻¹` },
        { label: "Regime", value: reg },
        { label: "Damped frequency ω_d", value: g < w0 ? `${Math.sqrt(w0 * w0 - g * g).toFixed(3)} rad/s` : "—" },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const w0 = Math.sqrt(p.k / p.m), g = p.b / (2 * p.m);
      const x = (tt: number) => {
        let tr: number;
        if (g < w0) tr = Math.exp(-g * tt) * Math.cos(Math.sqrt(w0 * w0 - g * g) * tt);
        else if (Math.abs(g - w0) < 1e-6) tr = (1 + g * tt) * Math.exp(-g * tt);
        else {
          const r = Math.sqrt(g * g - w0 * w0);
          tr = (Math.exp(-(g - r) * tt) * (g + r) - Math.exp(-(g + r) * tt) * (g - r)) / (2 * r);
        }
        const A = p.F / p.m / Math.hypot(w0 * w0 - p.w * p.w, 2 * g * p.w);
        const ph = Math.atan2(2 * g * p.w, w0 * w0 - p.w * p.w);
        return tr + (p.F > 0 ? A * Math.cos(p.w * tt - ph) : 0);
      };
      const fr = frame(W, H, 0, 12, -2.2, 2.2);
      grid(c, W, H, fr, 0, 12, -2.2, 2.2, pal);
      plot(c, fr, 0, 12, x, pal.accent, 2.2);
      const tt = t % 12;
      dot(c, fr.X(tt), fr.Y(Math.max(-2.2, Math.min(2.2, x(tt)))), 6, pal.accent2);
      // mass-spring cartoon
      const bx = W - 70, by = 40 + 30 * Math.max(-2, Math.min(2, x(tt)));
      line(c, W - 70, 20, bx, by, pal.soft, 1.5);
      c.fillStyle = pal.accent2;
      c.fillRect(bx - 12, by, 24, 18);
      label(c, "x(t)", 14, 22, pal.accent, 12);
    },
  },

  "vector-add": {
    title: "Vector addition in 3D grid",
    instructions: "Drag in the plot to move the tip of A⃗, or use sliders for all components. The resultant closes the triangle.",
    params: [
      { key: "ax", label: "Aₓ", min: -5, max: 5, step: 0.1, def: 3 },
      { key: "ay", label: "A_y", min: -5, max: 5, step: 0.1, def: 1 },
      { key: "bx", label: "Bₓ", min: -5, max: 5, step: 0.1, def: -1 },
      { key: "by", label: "B_y", min: -5, max: 5, step: 0.1, def: 3 },
    ],
    drag: (nx, ny, p) => ({ ...p, ax: -6 + nx * 12, ay: 4.5 - ny * 9 }),
    readout: (p) => {
      const rx = p.ax + p.bx, ry = p.ay + p.by;
      const ang = (Math.atan2(ry, rx) * 180) / Math.PI;
      const between = (Math.acos((p.ax * p.bx + p.ay * p.by) / (Math.hypot(p.ax, p.ay) * Math.hypot(p.bx, p.by) || 1)) * 180) / Math.PI;
      return [
        { label: "|A⃗|", value: Math.hypot(p.ax, p.ay).toFixed(3) },
        { label: "|B⃗|", value: Math.hypot(p.bx, p.by).toFixed(3) },
        { label: "Resultant R⃗", value: `(${rx.toFixed(2)}, ${ry.toFixed(2)}), |R⃗| = ${Math.hypot(rx, ry).toFixed(3)}` },
        { label: "Angle between A⃗ and B⃗", value: `${between.toFixed(1)}°` },
        { label: "Direction of R⃗", value: `${ang.toFixed(1)}° from +x` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -6, 6, -4.5, 4.5);
      grid(c, W, H, fr, -6, 6, -4.5, 4.5, pal);
      const O = [fr.X(0), fr.Y(0)] as const;
      arrow(c, O[0], O[1], fr.X(p.ax), fr.Y(p.ay), pal.accent, 3);
      arrow(c, fr.X(p.ax), fr.Y(p.ay), fr.X(p.ax + p.bx), fr.Y(p.ay + p.by), pal.accent2, 3);
      arrow(c, O[0], O[1], fr.X(p.ax + p.bx), fr.Y(p.ay + p.by), pal.accent3, 3.4);
      label(c, "A⃗", fr.X(p.ax / 2) + 6, fr.Y(p.ay / 2) - 6, pal.accent, 14);
      label(c, "B⃗", fr.X(p.ax + p.bx / 2) + 6, fr.Y(p.ay + p.by / 2) - 6, pal.accent2, 14);
      label(c, "R⃗ = A⃗ + B⃗", fr.X((p.ax + p.bx) / 2) + 8, fr.Y((p.ay + p.by) / 2) + 16, pal.accent3, 13);
    },
  },

  "dot-cross": {
    title: "Dot and cross product",
    instructions: "Rotate B⃗ with the slider or drag it. The shaded parallelogram area is |A⃗×B⃗|; the bar shows A⃗·B⃗.",
    params: [
      { key: "A", label: "|A⃗|", min: 0.5, max: 5, step: 0.1, def: 3 },
      { key: "B", label: "|B⃗|", min: 0.5, max: 5, step: 0.1, def: 2.5 },
      { key: "th", label: "Angle between them", min: 0, max: 180, step: 1, def: 55, unit: "°" },
    ],
    drag: (nx, ny, p) => {
      const a = (Math.atan2(-(ny - 0.5), nx - 0.5) * 180) / Math.PI;
      return { ...p, th: Math.max(0, Math.min(180, Math.abs(a))) };
    },
    readout: (p) => {
      const r = (p.th * Math.PI) / 180;
      return [
        { label: "A⃗·B⃗ = AB cos θ", value: (p.A * p.B * Math.cos(r)).toFixed(3) },
        { label: "|A⃗×B⃗| = AB sin θ", value: (p.A * p.B * Math.sin(r)).toFixed(3) },
        { label: "Parallelogram area", value: (p.A * p.B * Math.sin(r)).toFixed(3) },
        { label: "Direction of A⃗×B⃗", value: p.th === 0 || p.th === 180 ? "undefined (parallel)" : "out of the page (right-hand rule)" },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -6, 6, -4.5, 4.5);
      grid(c, W, H, fr, -6, 6, -4.5, 4.5, pal);
      const r = (p.th * Math.PI) / 180;
      const bx = p.B * Math.cos(r), by = p.B * Math.sin(r);
      c.fillStyle = "rgba(255,170,60,0.22)";
      c.beginPath();
      c.moveTo(fr.X(0), fr.Y(0));
      c.lineTo(fr.X(p.A), fr.Y(0));
      c.lineTo(fr.X(p.A + bx), fr.Y(by));
      c.lineTo(fr.X(bx), fr.Y(by));
      c.closePath();
      c.fill();
      arrow(c, fr.X(0), fr.Y(0), fr.X(p.A), fr.Y(0), pal.accent, 3);
      arrow(c, fr.X(0), fr.Y(0), fr.X(bx), fr.Y(by), pal.accent2, 3);
      line(c, fr.X(0), fr.Y(0), fr.X(p.B * Math.cos(r)), fr.Y(0), pal.accent3, 3);
      label(c, "A⃗", fr.X(p.A) + 8, fr.Y(0) - 8, pal.accent, 14);
      label(c, "B⃗", fr.X(bx) + 8, fr.Y(by) - 8, pal.accent2, 14);
      label(c, "projection B cos θ", 12, H - 14, pal.accent3, 11);
    },
  },

  "gradient-field": {
    title: "Gradient of a scalar field",
    instructions: "Drag the probe over the contour map of φ = x² + y². The arrow always points uphill, perpendicular to the contours.",
    params: [
      { key: "x", label: "Probe x", min: -3, max: 3, step: 0.05, def: 1.4 },
      { key: "y", label: "Probe y", min: -3, max: 3, step: 0.05, def: 0.9 },
      { key: "mode", label: "View (0 = contours, 1 = arrow grid)", min: 0, max: 1, step: 1, def: 0 },
    ],
    drag: (nx, ny, p) => ({ ...p, x: -3 + nx * 6, y: 3 - ny * 6 }),
    readout: (p) => [
      { label: "φ = x² + y²", value: (p.x ** 2 + p.y ** 2).toFixed(3) },
      { label: "∇φ", value: `(${(2 * p.x).toFixed(2)}, ${(2 * p.y).toFixed(2)})` },
      { label: "|∇φ| (steepest rate)", value: (2 * Math.hypot(p.x, p.y)).toFixed(3) },
      { label: "Direction", value: `${((Math.atan2(2 * p.y, 2 * p.x) * 180) / Math.PI).toFixed(1)}° from +x` },
    ],
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -3, 3, -3, 3);
      grid(c, W, H, fr, -3, 3, -3, 3, pal);
      if (p.mode === 0) {
        for (let k = 1; k <= 8; k++) {
          const R = Math.sqrt(k);
          c.strokeStyle = pal.accent;
          c.globalAlpha = 0.5;
          c.lineWidth = 1.4;
          c.beginPath();
          c.ellipse(fr.X(0), fr.Y(0), fr.X(R) - fr.X(0), fr.Y(0) - fr.Y(R), 0, 0, 7);
          c.stroke();
          c.globalAlpha = 1;
        }
      } else {
        for (let x = -2.5; x <= 2.6; x += 0.6)
          for (let y = -2.5; y <= 2.6; y += 0.6) {
            const s = 0.12;
            arrow(c, fr.X(x), fr.Y(y), fr.X(x + 2 * x * s), fr.Y(y + 2 * y * s), pal.soft, 1.3);
          }
      }
      dot(c, fr.X(p.x), fr.Y(p.y), 6, pal.ink);
      arrow(c, fr.X(p.x), fr.Y(p.y), fr.X(p.x + 2 * p.x * 0.25), fr.Y(p.y + 2 * p.y * 0.25), pal.accent2, 3);
      label(c, "∇φ", fr.X(p.x + 2 * p.x * 0.25) + 6, fr.Y(p.y + 2 * p.y * 0.25) - 6, pal.accent2, 13);
    },
  },

  "divergence-field": {
    title: "Divergence: sources, sinks and vortices",
    instructions: "Set the source strength and rotation. Positive divergence pushes tracer particles outward; a pure vortex has zero divergence.",
    animated: true,
    params: [
      { key: "s", label: "Source strength (divergence)", min: -1.5, max: 1.5, step: 0.05, def: 0.8 },
      { key: "w", label: "Rotation (curl)", min: -1.5, max: 1.5, step: 0.05, def: 0 },
    ],
    readout: (p) => [
      { label: "Field", value: `F⃗ = ${p.s.toFixed(2)}(x, y) + ${p.w.toFixed(2)}(−y, x)` },
      { label: "∇·F⃗", value: (2 * p.s).toFixed(3) },
      { label: "(∇×F⃗)_z", value: (2 * p.w).toFixed(3) },
      { label: "Behaviour", value: p.s > 0.02 ? "source (outflow)" : p.s < -0.02 ? "sink (inflow)" : "solenoidal (no net outflow)" },
    ],
    draw: (c, W, H, p, t, pal) => {
      const fr = frame(W, H, -3, 3, -3, 3);
      grid(c, W, H, fr, -3, 3, -3, 3, pal);
      for (let x = -2.6; x <= 2.7; x += 0.65)
        for (let y = -2.6; y <= 2.7; y += 0.65) {
          const u = p.s * x - p.w * y, v = p.s * y + p.w * x;
          arrow(c, fr.X(x), fr.Y(y), fr.X(x + u * 0.28), fr.Y(y + v * 0.28), pal.soft, 1.3);
        }
      for (let i = 0; i < 48; i++) {
        const a = (i / 48) * 7;
        const phase = (t * 0.4 + i * 0.13) % 1;
        const r0 = 0.35 + 2.4 * (p.s >= 0 ? phase : 1 - phase);
        const ang = a + p.w * t * 0.7;
        dot(c, fr.X(r0 * Math.cos(ang)), fr.Y(r0 * Math.sin(ang)), 3, pal.accent);
      }
      dot(c, fr.X(0), fr.Y(0), 6, pal.accent2);
    },
  },

  "curl-paddle": {
    title: "Paddle wheel in a shear flow",
    instructions: "Drag the paddle wheel anywhere in the flow. It spins wherever the curl is non-zero — even with perfectly straight streamlines.",
    animated: true,
    params: [
      { key: "mode", label: "Flow (0 = shear, 1 = rigid rotation, 2 = free vortex)", min: 0, max: 2, step: 1, def: 0 },
      { key: "x", label: "Wheel x", min: -2.6, max: 2.6, step: 0.05, def: 0.8 },
      { key: "y", label: "Wheel y", min: -2.6, max: 2.6, step: 0.05, def: 1 },
    ],
    drag: (nx, ny, p) => ({ ...p, x: -3 + nx * 6, y: 3 - ny * 6 }),
    readout: (p) => {
      const curl = p.mode === 0 ? 1 : p.mode === 1 ? 2 : 0;
      return [
        { label: "Flow field", value: p.mode === 0 ? "v⃗ = (y, 0) shear" : p.mode === 1 ? "v⃗ = (−y, x) rigid rotation" : "v⃗ = (−y, x)/r² free vortex" },
        { label: "(∇×v⃗)_z", value: p.mode === 2 ? "0 (except at the centre)" : curl.toFixed(2) },
        { label: "Paddle wheel", value: p.mode === 2 ? "translates without spinning" : "spins" },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const fr = frame(W, H, -3, 3, -3, 3);
      grid(c, W, H, fr, -3, 3, -3, 3, pal);
      const V = (x: number, y: number): [number, number] => {
        if (p.mode === 0) return [y, 0];
        if (p.mode === 1) return [-y, x];
        const r2 = Math.max(0.25, x * x + y * y);
        return [-y / r2, x / r2];
      };
      for (let x = -2.6; x <= 2.7; x += 0.6)
        for (let y = -2.6; y <= 2.7; y += 0.6) {
          const [u, v] = V(x, y);
          const s = 0.22 / Math.max(0.4, Math.hypot(u, v) / 2);
          arrow(c, fr.X(x), fr.Y(y), fr.X(x + u * s), fr.Y(y + v * s), pal.soft, 1.2);
        }
      const spin = p.mode === 0 ? -t * 1.1 : p.mode === 1 ? t * 2 : 0;
      const cx = fr.X(p.x), cy = fr.Y(p.y), R = 20;
      c.strokeStyle = pal.accent2;
      c.lineWidth = 2.6;
      for (let k = 0; k < 4; k++) {
        const a = spin + (k * Math.PI) / 2;
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        c.stroke();
      }
      dot(c, cx, cy, 4, pal.accent);
    },
  },

  "continuity-tube": {
    title: "Continuity in a narrowing tube",
    instructions: "Drag to change the throat radius. The mass flow rate stays constant, so the speed rises where the area falls.",
    animated: true,
    params: [
      { key: "r2", label: "Throat radius", min: 0.2, max: 1, step: 0.02, def: 0.45, unit: "×r₁" },
      { key: "v1", label: "Inlet speed v₁", min: 0.5, max: 5, step: 0.1, def: 2, unit: "m/s" },
    ],
    drag: (_nx, ny, p) => ({ ...p, r2: Math.max(0.2, Math.min(1, Math.abs(0.5 - ny) * 2)) }),
    readout: (p) => {
      const v2 = p.v1 / (p.r2 * p.r2);
      return [
        { label: "Area ratio A₂/A₁", value: (p.r2 * p.r2).toFixed(3) },
        { label: "Throat speed v₂ = v₁A₁/A₂", value: `${v2.toFixed(2)} m/s` },
        { label: "Volume flow rate (per unit A₁)", value: `${p.v1.toFixed(2)} (constant)` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const midY = H / 2, R1 = H * 0.3, R2 = R1 * p.r2;
      const prof = (x: number) => {
        const u = x / W;
        const k = 0.5 - 0.5 * Math.cos(Math.min(1, Math.max(0, (u - 0.25) / 0.3)) * Math.PI);
        const k2 = u > 0.55 ? 1 : k;
        return R1 + (R2 - R1) * k2;
      };
      c.strokeStyle = pal.ink;
      c.lineWidth = 2.4;
      c.beginPath();
      for (let x = 0; x <= W; x += 4) c.lineTo(x, midY - prof(x));
      c.stroke();
      c.beginPath();
      for (let x = 0; x <= W; x += 4) c.lineTo(x, midY + prof(x));
      c.stroke();
      for (let i = 0; i < 28; i++) {
        const lane = (i % 7) / 6 - 0.5;
        let x = ((t * 60 * p.v1 + i * 47) % W);
        const r = prof(x);
        const y = midY + lane * 2 * r * 0.8;
        const speed = p.v1 * (R1 * R1) / (r * r);
        dot(c, x, y, 3, pal.accent);
        line(c, x, y, x - Math.min(24, speed * 6), y, pal.accent, 1.2);
      }
      label(c, "A₁v₁ = A₂v₂", 14, 22, pal.accent2, 13);
    },
  },

  "bernoulli-tube": {
    title: "Venturi tube: Bernoulli in action",
    instructions: "Narrow the throat and watch the pressure fall as the speed rises. The total p + ½ρv² stays constant.",
    animated: true,
    params: [
      { key: "r2", label: "Throat radius", min: 0.25, max: 1, step: 0.02, def: 0.5, unit: "×r₁" },
      { key: "v1", label: "Inlet speed v₁", min: 0.5, max: 6, step: 0.1, def: 2, unit: "m/s" },
      { key: "p1", label: "Inlet gauge pressure", min: 5, max: 60, step: 1, def: 30, unit: "kPa" },
    ],
    drag: (_nx, ny, p) => ({ ...p, r2: Math.max(0.25, Math.min(1, Math.abs(0.5 - ny) * 2)) }),
    readout: (p) => {
      const v2 = p.v1 / (p.r2 * p.r2);
      const dp = 0.5 * 1000 * (v2 * v2 - p.v1 * p.v1) / 1000;
      return [
        { label: "Throat speed v₂", value: `${v2.toFixed(2)} m/s` },
        { label: "Pressure drop ½ρ(v₂²−v₁²)", value: `${dp.toFixed(2)} kPa` },
        { label: "Throat pressure", value: `${(p.p1 - dp).toFixed(2)} kPa` },
        { label: "Total head (constant)", value: `${(p.p1 + 0.5 * p.v1 * p.v1).toFixed(2)} kPa-equivalent` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const midY = H * 0.62, R1 = H * 0.22, R2 = R1 * p.r2;
      const prof = (x: number) => R1 + (R2 - R1) * Math.exp(-(((x - W / 2) / (W * 0.13)) ** 2));
      c.strokeStyle = pal.ink;
      c.lineWidth = 2.4;
      c.beginPath();
      for (let x = 0; x <= W; x += 3) c.lineTo(x, midY - prof(x));
      c.stroke();
      c.beginPath();
      for (let x = 0; x <= W; x += 3) c.lineTo(x, midY + prof(x));
      c.stroke();
      // manometer columns
      [0.15, 0.5, 0.85].forEach((u) => {
        const x = u * W, r = prof(x);
        const v = p.v1 * (R1 * R1) / (r * r);
        const press = p.p1 - (0.5 * 1000 * (v * v - p.v1 * p.v1)) / 1000;
        const hgt = Math.max(6, press * 1.6);
        c.fillStyle = pal.accent3;
        c.fillRect(x - 5, midY - r - hgt, 10, hgt);
        label(c, `${press.toFixed(0)} kPa`, x, midY - r - hgt - 6, pal.soft, 10, "center");
      });
      for (let i = 0; i < 24; i++) {
        const lane = (i % 6) / 5 - 0.5;
        const x = (t * 70 * p.v1 + i * 53) % W;
        const r = prof(x);
        dot(c, x, midY + lane * 2 * r * 0.75, 2.6, pal.accent);
      }
    },
  },

  "heat-flow": {
    title: "Heat diffusion along a bar",
    instructions: "Set the diffusivity and press play. A hot spot spreads and flattens; the area under the curve (total heat) is conserved.",
    animated: true,
    params: [
      { key: "a", label: "Thermal diffusivity α", min: 0.02, max: 1, step: 0.02, def: 0.3, unit: "m²/s" },
      { key: "w", label: "Initial hot-spot width", min: 0.05, max: 0.6, step: 0.01, def: 0.12 },
    ],
    readout: (p, t) => {
      const s2 = p.w * p.w + 2 * p.a * (t % 12);
      return [
        { label: "Elapsed time", value: `${(t % 12).toFixed(2)} s` },
        { label: "Profile width √(w²+2αt)", value: Math.sqrt(s2).toFixed(3) },
        { label: "Peak temperature", value: (p.w / Math.sqrt(s2)).toFixed(3) },
        { label: "Spread time for 1 m", value: `≈ ${(1 / p.a).toFixed(1)} s (t ~ L²/α)` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const tt = t % 12;
      const s2 = p.w * p.w + 2 * p.a * tt;
      const T = (x: number) => (p.w / Math.sqrt(s2)) * Math.exp(-(x * x) / (2 * s2));
      const fr = frame(W, H, -2, 2, 0, 1.15);
      grid(c, W, H, fr, -2, 2, 0, 1.15, pal);
      for (let i = 0; i < 80; i++) {
        const x = -2 + (4 * i) / 80;
        const v = T(x);
        c.fillStyle = `rgba(255,${Math.round(200 - 150 * v)},60,${0.15 + 0.7 * v})`;
        c.fillRect(fr.X(x), H - 30, (W - 68) / 80 + 1, 18);
      }
      plot(c, fr, -2, 2, T, pal.accent2, 2.6);
      label(c, "temperature profile T(x, t)", 14, 22, pal.accent2, 12);
      label(c, "bar", 14, H - 16, pal.soft, 11);
    },
  },

  "gauss-law": {
    title: "Gauss's law laboratory",
    instructions: "Drag the charge in and out of the Gaussian sphere. Flux jumps to q/ε₀ only when the charge is inside.",
    params: [
      { key: "x", label: "Charge position x", min: -3, max: 3, step: 0.05, def: 0.4 },
      { key: "y", label: "Charge position y", min: -2, max: 2, step: 0.05, def: 0.3 },
      { key: "q", label: "Charge q", min: -3, max: 3, step: 0.1, def: 1, unit: "nC" },
      { key: "R", label: "Gaussian radius", min: 0.5, max: 2.5, step: 0.05, def: 1.4 },
    ],
    drag: (nx, ny, p) => ({ ...p, x: -3.5 + nx * 7, y: 2.4 - ny * 4.8 }),
    readout: (p) => {
      const inside = Math.hypot(p.x, p.y) < p.R;
      const flux = inside ? (p.q * 1e-9) / 8.854e-12 : 0;
      return [
        { label: "Charge location", value: inside ? "inside the surface" : "outside the surface" },
        { label: "Enclosed charge", value: `${inside ? p.q.toFixed(2) : "0.00"} nC` },
        { label: "Net flux ∮E⃗·dA⃗", value: `${flux.toFixed(1)} V·m` },
        { label: "Field at the surface (nearest point)", value: `${(8.99e9 * Math.abs(p.q) * 1e-9 / Math.max(0.05, (Math.hypot(p.x, p.y) - p.R) ** 2 || 0.05)).toExponential(2)} V/m (approx.)` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -3.5, 3.5, -2.4, 2.4);
      grid(c, W, H, fr, -3.5, 3.5, -2.4, 2.4, pal);
      c.strokeStyle = pal.accent3;
      c.setLineDash([6, 5]);
      c.lineWidth = 2;
      c.beginPath();
      c.ellipse(fr.X(0), fr.Y(0), fr.X(p.R) - fr.X(0), fr.Y(0) - fr.Y(p.R), 0, 0, 7);
      c.stroke();
      c.setLineDash([]);
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * 7;
        const sgn = p.q >= 0 ? 1 : -1;
        const x1 = p.x + 0.18 * Math.cos(a), y1 = p.y + 0.18 * Math.sin(a);
        const x2 = p.x + sgn * 1.5 * Math.cos(a), y2 = p.y + sgn * 1.5 * Math.sin(a);
        arrow(c, fr.X(x1), fr.Y(y1), fr.X(x2), fr.Y(y2), pal.accent, 1.3);
      }
      dot(c, fr.X(p.x), fr.Y(p.y), 9, p.q >= 0 ? pal.accent2 : pal.accent3);
      label(c, p.q >= 0 ? "+" : "−", fr.X(p.x), fr.Y(p.y) + 5, pal.paper, 15, "center");
      label(c, "Gaussian surface", 14, 22, pal.accent3, 12);
    },
  },

  "reference-frame": {
    title: "Two observers, one ball",
    instructions: "Switch the observer and change the frame's velocity or acceleration. The physics is identical; the description is not.",
    animated: true,
    params: [
      { key: "view", label: "Observer (0 = ground, 1 = vehicle)", min: 0, max: 1, step: 1, def: 0 },
      { key: "V", label: "Vehicle velocity", min: 0, max: 6, step: 0.2, def: 3, unit: "m/s" },
      { key: "A", label: "Vehicle acceleration", min: -3, max: 3, step: 0.1, def: 0, unit: "m/s²" },
    ],
    readout: (p) => [
      { label: "Frame type", value: Math.abs(p.A) < 1e-6 ? "inertial (constant velocity)" : "non-inertial (accelerating)" },
      { label: "Pseudo-force per kg in vehicle frame", value: `${(-p.A).toFixed(2)} m/s²` },
      { label: "Ball path seen by this observer", value: p.view === 0 ? "parabola (projectile)" : Math.abs(p.A) < 1e-6 ? "straight vertical drop" : "curved backwards" },
    ],
    draw: (c, W, H, p, t, pal) => {
      const tt = (t % 2.2);
      const g = 9.8;
      const ground = H - 40;
      const xTrain = p.V * tt + 0.5 * p.A * tt * tt;
      const xBall = p.V * tt;
      const yBall = 0.5 * g * tt * tt;
      const sc = 26;
      const shift = p.view === 1 ? xTrain * sc : 0;
      c.strokeStyle = pal.soft;
      c.lineWidth = 2;
      line(c, 0, ground, W, ground, pal.soft, 2);
      for (let i = -2; i < 14; i++) line(c, ((i * 60 - shift) % (W + 120)) + 0, ground, ((i * 60 - shift) % (W + 120)) + 12, ground + 8, pal.grid, 1);
      const tx = 60 + xTrain * sc - shift;
      c.strokeStyle = pal.accent3;
      c.lineWidth = 2.2;
      c.strokeRect(tx - 50, ground - 110, 150, 100);
      label(c, "vehicle frame", tx - 44, ground - 116, pal.accent3, 11);
      const bx = 60 + xBall * sc - shift, by = ground - 100 + yBall * 22;
      if (by < ground) dot(c, bx, by, 7, pal.accent2);
      c.strokeStyle = pal.accent;
      c.lineWidth = 1.6;
      c.beginPath();
      for (let s = 0; s <= tt; s += 0.03) {
        const X = 60 + p.V * s * sc - (p.view === 1 ? (p.V * s + 0.5 * p.A * s * s) * sc : 0);
        const Y = ground - 100 + 0.5 * g * s * s * 22;
        if (Y < ground) c.lineTo(X, Y);
      }
      c.stroke();
      label(c, p.view === 0 ? "Ground observer" : "Vehicle observer", 14, 24, pal.ink, 13);
    },
  },

  "rotating-platform": {
    title: "Rotating platform",
    instructions: "Launch a ball across a turntable and compare the straight inertial path with the curved path seen from the platform.",
    animated: true,
    params: [
      { key: "w", label: "Angular speed ω", min: 0, max: 3, step: 0.05, def: 1.2, unit: "rad/s" },
      { key: "v", label: "Launch speed", min: 0.3, max: 3, step: 0.1, def: 1.4, unit: "m/s" },
      { key: "view", label: "View (0 = ground, 1 = rotating)", min: 0, max: 1, step: 1, def: 1 },
      { key: "m", label: "Mass at radius 1 m", min: 0.1, max: 3, step: 0.1, def: 1, unit: "kg" },
    ],
    readout: (p, t) => {
      const tt = t % 4;
      const r = p.v * tt;
      return [
        { label: "Centrifugal force at r = 1 m", value: `${(p.m * p.w * p.w).toFixed(2)} N` },
        { label: "Coriolis acceleration 2ωv", value: `${(2 * p.w * p.v).toFixed(2)} m/s²` },
        { label: "Current radius", value: `${Math.min(3, r).toFixed(2)} m` },
        { label: "Platform angle", value: `${(((p.w * tt * 180) / Math.PI) % 360).toFixed(0)}°` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const tt = t % 4;
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.42;
      const rot = p.view === 1 ? -p.w * tt : 0;
      c.strokeStyle = pal.grid;
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(cx, cy, R, 0, 7);
      c.stroke();
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * 7 + (p.view === 1 ? 0 : p.w * tt);
        line(c, cx, cy, cx + R * Math.cos(a), cy + R * Math.sin(a), pal.grid, 1);
      }
      c.strokeStyle = pal.accent;
      c.lineWidth = 2.4;
      c.beginPath();
      for (let s = 0; s <= tt; s += 0.02) {
        const r = (p.v * s * R) / 3;
        const a = p.view === 1 ? -p.w * s : 0;
        c.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      c.stroke();
      const rr = (p.v * tt * R) / 3;
      dot(c, cx + rr * Math.cos(rot), cy + rr * Math.sin(rot), 6, pal.accent2);
      label(c, p.view === 1 ? "Rotating-frame view (curved path)" : "Ground view (straight path)", 14, 22, pal.ink, 12);
    },
  },

  "coriolis-globe": {
    title: "Coriolis deflection on the rotating Earth",
    instructions: "Choose the latitude and launch direction. The trace shows how the ground path bends right (north) or left (south).",
    animated: true,
    params: [
      { key: "lat", label: "Latitude", min: -80, max: 80, step: 1, def: 30, unit: "°" },
      { key: "v", label: "Speed", min: 20, max: 300, step: 5, def: 120, unit: "m/s" },
      { key: "T", label: "Flight time", min: 10, max: 600, step: 10, def: 200, unit: "s" },
    ],
    readout: (p) => {
      const O = 7.292e-5;
      const f = 2 * O * Math.sin((p.lat * Math.PI) / 180);
      const a = Math.abs(f * p.v);
      const d = 0.5 * a * p.T * p.T;
      return [
        { label: "Coriolis parameter f = 2Ω sin λ", value: `${f.toExponential(3)} s⁻¹` },
        { label: "Coriolis acceleration", value: `${a.toExponential(3)} m/s²` },
        { label: "Sideways deflection in flight time", value: `${d.toFixed(1)} m` },
        { label: "Deflection sense", value: p.lat > 0 ? "to the right" : p.lat < 0 ? "to the left" : "no horizontal deflection" },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const O = 7.292e-5;
      const f = 2 * O * Math.sin((p.lat * Math.PI) / 180);
      const tt = ((t % 4) / 4) * p.T;
      const sc = Math.min(W, H) / (p.v * p.T * 1.2);
      const x0 = W * 0.15, y0 = H * 0.8;
      line(c, x0, y0, x0 + p.v * p.T * sc, y0 - 0, pal.grid, 1.2);
      c.strokeStyle = pal.soft;
      c.setLineDash([5, 5]);
      line(c, x0, y0, x0 + p.v * p.T * sc * Math.cos(-0.6), y0 + p.v * p.T * sc * Math.sin(-0.6), pal.soft, 1.4);
      c.setLineDash([]);
      c.strokeStyle = pal.accent;
      c.lineWidth = 2.6;
      c.beginPath();
      for (let s = 0; s <= tt; s += p.T / 200) {
        const along = p.v * s;
        const side = 0.5 * f * p.v * s * s;
        const ang = -0.6;
        const X = x0 + (along * Math.cos(ang) - side * Math.sin(ang)) * sc;
        const Y = y0 + (along * Math.sin(ang) + side * Math.cos(ang)) * sc;
        c.lineTo(X, Y);
      }
      c.stroke();
      const along = p.v * tt, side = 0.5 * f * p.v * tt * tt, ang = -0.6;
      dot(c, x0 + (along * Math.cos(ang) - side * Math.sin(ang)) * sc, y0 + (along * Math.sin(ang) + side * Math.cos(ang)) * sc, 6, pal.accent2);
      label(c, "dashed: path with no rotation", 14, 22, pal.soft, 11);
      label(c, "solid: actual ground track", 14, 38, pal.accent, 11);
    },
  },

  foucault: {
    title: "Foucault pendulum",
    instructions: "Set the latitude and watch the plane of swing precess. The precession period is one sidereal day divided by sin λ.",
    animated: true,
    params: [
      { key: "lat", label: "Latitude", min: 5, max: 90, step: 1, def: 45, unit: "°" },
      { key: "speed", label: "Time acceleration", min: 200, max: 5000, step: 100, def: 1800, unit: "×" },
    ],
    readout: (p, t) => {
      const s = Math.sin((p.lat * Math.PI) / 180);
      const T = 23.934 / s;
      return [
        { label: "Precession rate", value: `${(15 * s).toFixed(2)} ° per hour` },
        { label: "Full rotation period", value: `${T.toFixed(1)} hours` },
        { label: "Simulated elapsed time", value: `${((t * p.speed) / 3600).toFixed(2)} hours` },
        { label: "Plane rotated by", value: `${((((t * p.speed) / 3600) * 15 * s) % 360).toFixed(1)}°` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.38;
      c.strokeStyle = pal.grid;
      c.lineWidth = 1.4;
      c.beginPath();
      c.arc(cx, cy, R, 0, 7);
      c.stroke();
      const s = Math.sin((p.lat * Math.PI) / 180);
      const rotDeg = (((t * p.speed) / 3600) * 15 * s) % 360;
      const a = (rotDeg * Math.PI) / 180;
      for (let k = 0; k < 24; k++) {
        const ang = (k / 24) * 7;
        dot(c, cx + R * Math.cos(ang), cy + R * Math.sin(ang), 3, pal.grid);
      }
      c.globalAlpha = 0.25;
      for (let q = 1; q <= 5; q++) {
        const ap = a - (q * 12 * Math.PI) / 180;
        line(c, cx - R * Math.cos(ap), cy - R * Math.sin(ap), cx + R * Math.cos(ap), cy + R * Math.sin(ap), pal.accent, 1.2);
      }
      c.globalAlpha = 1;
      line(c, cx - R * Math.cos(a), cy - R * Math.sin(a), cx + R * Math.cos(a), cy + R * Math.sin(a), pal.accent2, 2.6);
      const sw = Math.cos(t * 4) * R * 0.92;
      dot(c, cx + sw * Math.cos(a), cy + sw * Math.sin(a), 8, pal.accent);
      label(c, "plane of swing (top view)", 14, 22, pal.accent2, 12);
    },
  },

  "gravity-latitude": {
    title: "Effective gravity with latitude",
    instructions: "Move the latitude slider to see how much of g the Earth's rotation removes.",
    params: [
      { key: "lat", label: "Latitude", min: 0, max: 90, step: 1, def: 28, unit: "°" },
      { key: "g0", label: "Non-rotating g", min: 9.7, max: 9.9, step: 0.001, def: 9.83, unit: "m/s²" },
    ],
    drag: (nx, _ny, p) => ({ ...p, lat: Math.max(0, Math.min(90, nx * 90)) }),
    readout: (p) => {
      const w2R = 0.0338;
      const lam = (p.lat * Math.PI) / 180;
      const corr = w2R * Math.cos(lam) ** 2;
      return [
        { label: "ω²R", value: `${w2R.toFixed(4)} m/s²` },
        { label: "Correction ω²R cos²λ", value: `${corr.toFixed(4)} m/s²` },
        { label: "Effective g", value: `${(p.g0 - corr).toFixed(4)} m/s²` },
        { label: "Plumb-line tilt", value: `${(((w2R * Math.cos(lam) * Math.sin(lam)) / p.g0) * (180 / Math.PI) * 60).toFixed(2)} arcmin` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const cx = W * 0.42, cy = H / 2, R = Math.min(W, H) * 0.36;
      c.strokeStyle = pal.grid;
      c.lineWidth = 2;
      c.beginPath();
      c.arc(cx, cy, R, 0, 7);
      c.stroke();
      line(c, cx, cy - R * 1.25, cx, cy + R * 1.25, pal.soft, 1.4);
      const lam = (p.lat * Math.PI) / 180;
      const px = cx + R * Math.cos(lam), py = cy - R * Math.sin(lam);
      line(c, cx, py, px, py, pal.accent3, 1.4);
      dot(c, px, py, 6, pal.ink);
      arrow(c, px, py, cx + (px - cx) * 0.55, cy + (py - cy) * 0.55, pal.accent, 2.4);
      arrow(c, px, py, px + 52, py, pal.accent2, 2.4);
      label(c, "gravity", cx + (px - cx) * 0.5 - 12, cy + (py - cy) * 0.5 - 8, pal.accent, 11);
      label(c, "centrifugal", px + 8, py - 10, pal.accent2, 11);
      label(c, `λ = ${p.lat.toFixed(0)}°`, 14, 24, pal.ink, 13);
    },
  },

  "centre-of-mass": {
    title: "Centre of mass finder",
    instructions: "Drag mass A anywhere and change the masses. The marker always sits at the weighted average position.",
    params: [
      { key: "m1", label: "Mass A", min: 0.5, max: 8, step: 0.1, def: 2, unit: "kg" },
      { key: "x1", label: "A position x", min: -4, max: 4, step: 0.05, def: -2 },
      { key: "y1", label: "A position y", min: -3, max: 3, step: 0.05, def: 1 },
      { key: "m2", label: "Mass B", min: 0.5, max: 8, step: 0.1, def: 5, unit: "kg" },
      { key: "x2", label: "B position x", min: -4, max: 4, step: 0.05, def: 2.5 },
      { key: "y2", label: "B position y", min: -3, max: 3, step: 0.05, def: -1 },
    ],
    drag: (nx, ny, p) => ({ ...p, x1: -5 + nx * 10, y1: 3.5 - ny * 7 }),
    readout: (p) => {
      const M = p.m1 + p.m2;
      return [
        { label: "Total mass", value: `${M.toFixed(2)} kg` },
        { label: "x_cm", value: ((p.m1 * p.x1 + p.m2 * p.x2) / M).toFixed(3) },
        { label: "y_cm", value: ((p.m1 * p.y1 + p.m2 * p.y2) / M).toFixed(3) },
        { label: "Distance ratio (A:B from cm)", value: `${p.m2.toFixed(1)} : ${p.m1.toFixed(1)}` },
      ];
    },
    draw: (c, W, H, p, _t, pal) => {
      const fr = frame(W, H, -5, 5, -3.5, 3.5);
      grid(c, W, H, fr, -5, 5, -3.5, 3.5, pal);
      const M = p.m1 + p.m2;
      const cx = (p.m1 * p.x1 + p.m2 * p.x2) / M, cy = (p.m1 * p.y1 + p.m2 * p.y2) / M;
      line(c, fr.X(p.x1), fr.Y(p.y1), fr.X(p.x2), fr.Y(p.y2), pal.grid, 1.6);
      dot(c, fr.X(p.x1), fr.Y(p.y1), 6 + p.m1 * 2, pal.accent);
      dot(c, fr.X(p.x2), fr.Y(p.y2), 6 + p.m2 * 2, pal.accent3);
      dot(c, fr.X(cx), fr.Y(cy), 7, pal.accent2);
      label(c, "A", fr.X(p.x1) + 12, fr.Y(p.y1) - 12, pal.accent, 13);
      label(c, "B", fr.X(p.x2) + 12, fr.Y(p.y2) - 12, pal.accent3, 13);
      label(c, "centre of mass", fr.X(cx) + 10, fr.Y(cy) + 18, pal.accent2, 12);
    },
  },

  "collision-2d": {
    title: "Two-dimensional collision laboratory",
    instructions: "Set the masses, incident speed and impact parameter, then press play. Switch frames to see the symmetric C-frame picture.",
    animated: true,
    params: [
      { key: "m1", label: "Projectile mass m₁", min: 0.2, max: 6, step: 0.1, def: 1, unit: "kg" },
      { key: "m2", label: "Target mass m₂", min: 0.2, max: 6, step: 0.1, def: 1, unit: "kg" },
      { key: "u", label: "Incident speed u₁", min: 1, max: 8, step: 0.1, def: 4, unit: "m/s" },
      { key: "b", label: "Impact parameter (× radius)", min: 0, max: 1, step: 0.02, def: 0.4 },
      { key: "view", label: "Frame (0 = laboratory, 1 = centre of mass)", min: 0, max: 1, step: 1, def: 0 },
    ],
    drag: (_nx, ny, p) => ({ ...p, b: Math.max(0, Math.min(1, Math.abs(0.5 - ny) * 2)) }),
    readout: (p) => {
      const thC = Math.PI - 2 * Math.asin(Math.min(1, p.b));
      const thL = Math.atan2(Math.sin(thC), Math.cos(thC) + p.m1 / p.m2);
      const phL = (Math.PI - thC) / 2;
      const vcm = (p.m1 * p.u) / (p.m1 + p.m2);
      return [
        { label: "v_cm", value: `${vcm.toFixed(3)} m/s` },
        { label: "C-frame scattering angle θ_C", value: `${((thC * 180) / Math.PI).toFixed(1)}°` },
        { label: "Lab scattering angle θ_L", value: `${((thL * 180) / Math.PI).toFixed(1)}°` },
        { label: "Lab recoil angle φ_L", value: `${((phL * 180) / Math.PI).toFixed(1)}°` },
        { label: "Sum θ_L + φ_L", value: `${(((thL + phL) * 180) / Math.PI).toFixed(1)}° ${Math.abs(p.m1 - p.m2) < 1e-6 ? "(equal masses → 90°)" : ""}` },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const tt = t % 4;
      const cy = H / 2;
      const thC = Math.PI - 2 * Math.asin(Math.min(1, p.b));
      const vcm = (p.m1 * p.u) / (p.m1 + p.m2);
      const u1c = (p.m2 * p.u) / (p.m1 + p.m2);
      const u2c = vcm;
      const sc = 26;
      const drift = p.view === 1 ? -vcm : 0;
      const yOff = p.b * 40;
      const hit = 2;
      let x1: number, y1: number, x2: number, y2: number;
      if (tt < hit) {
        x1 = (p.u + drift) * tt * sc;
        y1 = -yOff;
        x2 = drift * tt * sc;
        y2 = 0;
      } else {
        const s = tt - hit;
        const v1x = u1c * Math.cos(thC) + vcm + drift, v1y = u1c * Math.sin(thC);
        const v2x = -u2c * Math.cos(thC) + vcm + drift, v2y = -u2c * Math.sin(thC);
        x1 = (p.u + drift) * hit * sc + v1x * s * sc;
        y1 = -yOff + v1y * s * sc;
        x2 = drift * hit * sc + v2x * s * sc;
        y2 = v2y * s * sc;
      }
      const ox = 70;
      line(c, 0, cy, W, cy, pal.grid, 1);
      c.strokeStyle = pal.accent;
      c.lineWidth = 1.4;
      dot(c, ox + x1, cy + y1, 5 + p.m1 * 2, pal.accent);
      dot(c, ox + x2, cy + y2, 5 + p.m2 * 2, pal.accent3);
      label(c, "m₁", ox + x1 + 10, cy + y1 - 10, pal.accent, 12);
      label(c, "m₂", ox + x2 + 10, cy + y2 - 10, pal.accent3, 12);
      label(c, p.view === 0 ? "Laboratory frame" : "Centre-of-mass frame", 14, 22, pal.ink, 13);
    },
  },

  rutherford: {
    title: "Rutherford scattering",
    instructions: "Change the impact parameter and energy. Small impact parameters produce the rare large-angle deflections that revealed the nucleus.",
    animated: true,
    params: [
      { key: "b", label: "Impact parameter", min: 1, max: 60, step: 0.5, def: 20, unit: "fm" },
      { key: "E", label: "Alpha energy", min: 1, max: 12, step: 0.1, def: 5, unit: "MeV" },
      { key: "Z", label: "Target atomic number Z", min: 6, max: 92, step: 1, def: 79 },
    ],
    drag: (_nx, ny, p) => ({ ...p, b: Math.max(1, Math.min(60, Math.abs(0.5 - ny) * 120)) }),
    readout: (p) => {
      const kqq = 1.44 * 2 * p.Z; // MeV·fm
      const th = 2 * Math.atan(kqq / (2 * p.E * p.b));
      return [
        { label: "kq₁q₂", value: `${kqq.toFixed(1)} MeV·fm` },
        { label: "Scattering angle θ", value: `${((th * 180) / Math.PI).toFixed(1)}°` },
        { label: "Closest approach (head-on)", value: `${(kqq / p.E).toFixed(1)} fm` },
        { label: "Relative dσ/dΩ ∝ cosec⁴(θ/2)", value: (1 / Math.sin(th / 2) ** 4).toExponential(2) },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const cx = W * 0.55, cy = H / 2;
      dot(c, cx, cy, 9, pal.accent2);
      label(c, `Z = ${p.Z}`, cx + 14, cy - 12, pal.accent2, 12);
      const kqq = 1.44 * 2 * p.Z;
      const drawPath = (b: number, col: string, w: number, upto = 1) => {
        c.strokeStyle = col;
        c.lineWidth = w;
        c.beginPath();
        let x = -400, y = b, vx = Math.sqrt(p.E) * 6, vy = 0;
        const scale = 3;
        for (let i = 0; i < 900 * upto; i++) {
          const r = Math.hypot(x, y) || 1;
          const a = (kqq * 40) / (r * r * r);
          vx += a * x * 0.02;
          vy += a * y * 0.02;
          x += vx * 0.02;
          y += vy * 0.02;
          c.lineTo(cx + x / scale, cy - y / scale);
          if (Math.abs(x) > 1400 || Math.abs(y) > 900) break;
        }
        c.stroke();
      };
      [-45, -25, 25, 45].forEach((b) => drawPath(b, pal.grid, 1.2));
      drawPath(p.b, pal.accent, 2.6, Math.min(1, ((t % 3) / 3) * 1.2));
      label(c, "alpha particles", 14, 22, pal.accent, 12);
    },
  },

  "central-orbit": {
    title: "Central-force orbit simulator",
    instructions: "Change the force-law exponent and the initial speed. Only the inverse-square law gives a closed, non-precessing orbit.",
    animated: true,
    params: [
      { key: "n", label: "Force exponent n in F ∝ −1/rⁿ", min: 1, max: 3.5, step: 0.05, def: 2 },
      { key: "v0", label: "Initial tangential speed", min: 0.4, max: 1.6, step: 0.02, def: 0.9 },
      { key: "r0", label: "Initial radius", min: 0.6, max: 2, step: 0.05, def: 1.2 },
    ],
    readout: (p) => [
      { label: "Force law", value: `F ∝ −1/r^${p.n.toFixed(2)}` },
      { label: "Orbit type", value: Math.abs(p.n - 2) < 0.02 ? "closed conic (ellipse/circle)" : "precessing rosette" },
      { label: "Angular momentum per unit mass", value: (p.r0 * p.v0).toFixed(3) },
      { label: "Circular-orbit speed here", value: Math.sqrt(1 / Math.pow(p.r0, p.n - 1)).toFixed(3) },
    ],
    draw: (c, W, H, p, t, pal) => {
      const cx = W / 2, cy = H / 2, S = Math.min(W, H) * 0.2;
      dot(c, cx, cy, 8, pal.accent2);
      let x = p.r0, y = 0, vx = 0, vy = p.v0;
      c.strokeStyle = pal.accent;
      c.lineWidth = 2;
      c.beginPath();
      const steps = 4000;
      let px = 0, py = 0;
      for (let i = 0; i < steps; i++) {
        const r = Math.max(0.12, Math.hypot(x, y));
        const a = -1 / Math.pow(r, p.n);
        vx += (a * x) / r * 0.004;
        vy += (a * y) / r * 0.004;
        x += vx * 0.004;
        y += vy * 0.004;
        if (Math.hypot(x, y) > 6) break;
        c.lineTo(cx + x * S, cy - y * S);
        if (i === Math.floor(((t * 220) % steps))) {
          px = cx + x * S;
          py = cy - y * S;
        }
      }
      c.stroke();
      if (px) dot(c, px, py, 6, pal.accent3);
    },
  },

  kepler: {
    title: "Kepler's laws visualiser",
    instructions: "Change the eccentricity and watch equal areas being swept in equal times. The planet races through perihelion.",
    animated: true,
    params: [
      { key: "e", label: "Eccentricity e", min: 0, max: 0.8, step: 0.01, def: 0.5 },
      { key: "a", label: "Semi-major axis (AU)", min: 0.5, max: 3, step: 0.05, def: 1 },
    ],
    readout: (p) => [
      { label: "Period from T² = a³", value: `${Math.pow(p.a, 1.5).toFixed(3)} years` },
      { label: "Perihelion distance a(1−e)", value: `${(p.a * (1 - p.e)).toFixed(3)} AU` },
      { label: "Aphelion distance a(1+e)", value: `${(p.a * (1 + p.e)).toFixed(3)} AU` },
      { label: "Speed ratio perihelion:aphelion", value: `${((1 + p.e) / (1 - p.e)).toFixed(2)} : 1` },
    ],
    draw: (c, W, H, p, t, pal) => {
      const S = Math.min(W, H) * 0.3 / Math.max(0.6, p.a);
      const a = p.a * S, b = a * Math.sqrt(1 - p.e * p.e), cxF = W / 2, cy = H / 2;
      const cxE = cxF + a * p.e;
      c.strokeStyle = pal.grid;
      c.lineWidth = 1.6;
      c.beginPath();
      c.ellipse(cxE, cy, a, b, 0, 0, 7);
      c.stroke();
      dot(c, cxF, cy, 9, pal.accent2);
      // solve Kepler's equation for the current mean anomaly
      const period = Math.pow(p.a, 1.5) * 3;
      const M = ((t % period) / period) * 2 * Math.PI;
      let E = M;
      for (let i = 0; i < 40; i++) E = E - (E - p.e * Math.sin(E) - M) / (1 - p.e * Math.cos(E));
      const px = cxE + a * Math.cos(E), py = cy + b * Math.sin(E);
      // swept sector over a short fixed time
      const dM = 0.45;
      let E2 = M + dM;
      for (let i = 0; i < 40; i++) E2 = E2 - (E2 - p.e * Math.sin(E2) - (M + dM)) / (1 - p.e * Math.cos(E2));
      c.fillStyle = "rgba(255,180,84,0.3)";
      c.beginPath();
      c.moveTo(cxF, cy);
      for (let s = 0; s <= 1; s += 0.05) {
        const Es = E + (E2 - E) * s;
        c.lineTo(cxE + a * Math.cos(Es), cy + b * Math.sin(Es));
      }
      c.closePath();
      c.fill();
      dot(c, px, py, 6, pal.accent);
      line(c, cxF, cy, px, py, pal.accent3, 1.4);
      label(c, "equal areas in equal times", 14, 22, pal.accent2, 12);
    },
  },

  satellite: {
    title: "Satellite orbit laboratory",
    instructions: "Set the altitude and launch speed. Below circular speed the orbit dips; above escape speed the satellite never returns.",
    animated: true,
    params: [
      { key: "h", label: "Altitude", min: 200, max: 40000, step: 100, def: 400, unit: "km" },
      { key: "k", label: "Speed as a fraction of circular speed", min: 0.6, max: 1.5, step: 0.01, def: 1 },
    ],
    readout: (p) => {
      const R = 6371e3, GM = 3.986e14;
      const r = R + p.h * 1000;
      const vc = Math.sqrt(GM / r);
      const v = vc * p.k;
      const E = 0.5 * v * v - GM / r;
      const T = 2 * Math.PI * Math.sqrt(r ** 3 / GM);
      return [
        { label: "Circular speed at this altitude", value: `${(vc / 1000).toFixed(3)} km/s` },
        { label: "Chosen speed", value: `${(v / 1000).toFixed(3)} km/s` },
        { label: "Escape speed here", value: `${((Math.SQRT2 * vc) / 1000).toFixed(3)} km/s` },
        { label: "Circular period", value: `${(T / 60).toFixed(1)} min` },
        { label: "Trajectory", value: E >= 0 ? "unbound (escape)" : p.k === 1 ? "circular" : p.k < 1 ? "ellipse with perigee below start" : "ellipse with apogee above start" },
      ];
    },
    draw: (c, W, H, p, t, pal) => {
      const cx = W / 2, cy = H / 2;
      const R = 6371, r0 = R + p.h;
      const S = (Math.min(W, H) * 0.42) / Math.max(r0 * 1.2, 2 * R);
      c.fillStyle = "rgba(80,170,255,0.25)";
      c.beginPath();
      c.arc(cx, cy, R * S, 0, 7);
      c.fill();
      c.strokeStyle = pal.accent3;
      c.lineWidth = 2;
      c.stroke();
      const GM = 3.986e14;
      let x = r0 * 1000, y = 0;
      const vc = Math.sqrt(GM / (r0 * 1000));
      let vx = 0, vy = vc * p.k;
      c.strokeStyle = pal.accent;
      c.lineWidth = 2;
      c.beginPath();
      const dt = 8;
      let px = 0, py = 0;
      for (let i = 0; i < 4000; i++) {
        const r = Math.hypot(x, y);
        if (r < R * 1000) break;
        const a = -GM / (r * r);
        vx += (a * x) / r * dt;
        vy += (a * y) / r * dt;
        x += vx * dt;
        y += vy * dt;
        const X = cx + (x / 1000) * S, Y = cy - (y / 1000) * S;
        c.lineTo(X, Y);
        if (i === Math.floor((t * 260) % 4000)) {
          px = X;
          py = Y;
        }
        if (Math.hypot(x, y) / 1000 > 12 * R) break;
      }
      c.stroke();
      if (px) dot(c, px, py, 5, pal.accent2);
      label(c, "Earth", cx - 16, cy + 4, pal.paper, 12);
    },
  },
};

export const getSim = (id: SimId): SimDef | null => (id ? SIMS[id] ?? null : null);
