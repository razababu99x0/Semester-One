import React from "react";
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Move, Eye } from "lucide-react";
import { getSim, type P, type Palette } from "./registry";
import type { SimId } from "@/types/content";
import { useBook } from "@/stores/useBook";

const readPalette = (): Palette => {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
  return {
    ink: v("--ink", "#1a1a22"),
    soft: v("--ink-soft", "#4a4a58"),
    accent: v("--accent", "#4cc9ff"),
    accent2: v("--accent-2", "#ffb454"),
    accent3: v("--accent-3", "#7aa2ff"),
    grid: "rgba(0,0,0,0.25)",
    paper: v("--paper", "#f3f1e7"),
  };
};

interface Props {
  sim: SimId;
  fallback: string;
  brief?: string;
  steps?: string[];
  prediction?: string;
}

export const SimPlayer: React.FC<Props> = ({ sim, fallback, brief, steps, prediction }) => {
  const def = getSim(sim);
  const reduced = useBook((s) => s.reducedMotion);
  const perf = useBook((s) => s.perf);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [params, setParams] = React.useState<P>(() =>
    def ? Object.fromEntries(def.params.map((p) => [p.key, p.def])) : {},
  );
  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [showSteps, setShowSteps] = React.useState(false);
  const [predicted, setPredicted] = React.useState(false);
  const timeRef = React.useRef(0);
  const liteBlocked = perf === "lite";

  React.useEffect(() => {
    if (!def) return;
    setParams(Object.fromEntries(def.params.map((p) => [p.key, p.def])));
    timeRef.current = 0;
    setTime(0);
    setPlaying(false);
  }, [sim]); // eslint-disable-line react-hooks/exhaustive-deps

  const render = React.useCallback(
    (t: number) => {
      const cv = canvasRef.current;
      if (!cv || !def) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = cv.clientWidth, H = cv.clientHeight;
      if (cv.width !== W * dpr || cv.height !== H * dpr) {
        cv.width = W * dpr;
        cv.height = H * dpr;
      }
      const c = cv.getContext("2d");
      if (!c) return;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pal = readPalette();
      c.clearRect(0, 0, W, H);
      c.fillStyle = "rgba(255,255,255,0.55)";
      c.fillRect(0, 0, W, H);
      def.draw(c, W, H, params, t, pal);
    },
    [def, params],
  );

  React.useEffect(() => {
    if (liteBlocked) return;
    render(timeRef.current);
  }, [render, liteBlocked]);

  React.useEffect(() => {
    if (!playing || liteBlocked) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      timeRef.current += dt;
      setTime(timeRef.current);
      render(timeRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, render, liteBlocked]);

  // pause when the tab is hidden
  React.useEffect(() => {
    const h = () => document.hidden && setPlaying(false);
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  if (!def) {
    return (
      <div className="rounded-xl border border-black/15 bg-black/[0.03] p-4">
        <p className="text-sm font-semibold mb-1">Static diagram</p>
        <p className="text-sm soft leading-relaxed">{fallback}</p>
      </div>
    );
  }

  if (liteBlocked) {
    return (
      <div className="rounded-xl border border-black/15 bg-black/[0.03] p-4">
        <p className="text-sm font-semibold mb-1">{def.title} — Lite mode</p>
        <p className="text-sm soft leading-relaxed mb-2">{fallback}</p>
        <p className="text-xs soft">
          Continuous animation is disabled in Lite mode. Switch to Balanced or High Magic in
          Settings to run this simulation.
        </p>
      </div>
    );
  }

  const set = (k: string, v: number) => {
    setParams((p) => {
      const next = { ...p, [k]: v };
      return next;
    });
  };

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!def.drag || e.buttons === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setParams((p) => def.drag!(Math.max(0, Math.min(1, nx)), Math.max(0, Math.min(1, ny)), p));
  };

  const step = (dir: number) => {
    timeRef.current = Math.max(0, timeRef.current + dir * 0.15);
    setTime(timeRef.current);
    render(timeRef.current);
  };

  const reset = () => {
    setParams(Object.fromEntries(def.params.map((p) => [p.key, p.def])));
    timeRef.current = 0;
    setTime(0);
    setPlaying(false);
  };

  const readouts = def.readout(params, time);

  return (
    <div className="rounded-2xl border border-black/15 bg-white/45 overflow-hidden">
      <div className="px-4 pt-3 pb-2 flex flex-wrap items-center gap-2 justify-between">
        <h4 className="text-[0.95rem] font-bold">{def.title}</h4>
        {def.drag && (
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wide soft">
            <Move size={13} /> draggable
          </span>
        )}
      </div>
      <p className="px-4 pb-2 text-[0.82rem] soft leading-relaxed">{brief ?? def.instructions}</p>

      {prediction && (
        <div className="mx-4 mb-3 rounded-lg border border-black/10 bg-black/[0.035] p-3">
          <p className="text-[0.8rem] font-semibold mb-1">Predict first</p>
          <p className="text-[0.82rem] soft">{prediction}</p>
          {!predicted && (
            <button className="btn btn-ink mt-2 text-xs" onClick={() => setPredicted(true)}>
              I have made my prediction
            </button>
          )}
          {predicted && <p className="text-[0.78rem] mt-2 soft">Now run the simulation and compare.</p>}
        </div>
      )}

      <canvas
        ref={canvasRef}
        onPointerMove={onPointer}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          onPointer(e);
        }}
        className="block w-full touch-none"
        style={{ height: "clamp(240px, 42vw, 380px)", cursor: def.drag ? "crosshair" : "default" }}
        role="img"
        aria-label={`${def.title}. ${fallback}`}
      />

      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-black/10">
        {def.animated && (
          <>
            <button className="btn btn-ink" onClick={() => setPlaying((v) => !v)} aria-pressed={playing}>
              {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Pause" : "Play"}
            </button>
            <button className="btn btn-ink" onClick={() => step(-1)} aria-label="Step backward">
              <SkipBack size={16} />
            </button>
            <button className="btn btn-ink" onClick={() => step(1)} aria-label="Step forward">
              <SkipForward size={16} />
            </button>
          </>
        )}
        <button className="btn btn-ink" onClick={reset}>
          <RotateCcw size={16} /> Reset
        </button>
        {steps && steps.length > 0 && (
          <button className="btn btn-ink" onClick={() => setShowSteps((v) => !v)} aria-expanded={showSteps}>
            <Eye size={16} /> Step-by-step
          </button>
        )}
        {reduced && <span className="text-xs soft">Reduced motion: animation starts only when you press play.</span>}
      </div>

      {showSteps && steps && (
        <ol className="px-6 pb-3 list-decimal space-y-1 text-[0.85rem]">
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}

      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
        <div className="space-y-2">
          {def.params.map((pr) => (
            <label key={pr.key} className="block">
              <span className="flex justify-between text-[0.78rem] font-medium">
                <span>{pr.label}</span>
                <span className="soft tabular-nums">
                  {params[pr.key]?.toFixed(pr.step < 1 ? 2 : 0)} {pr.unit ?? ""}
                </span>
              </span>
              <input
                type="range"
                min={pr.min}
                max={pr.max}
                step={pr.step}
                value={params[pr.key] ?? pr.def}
                onChange={(e) => set(pr.key, Number(e.target.value))}
                aria-label={pr.label}
              />
            </label>
          ))}
        </div>
        <dl
          className="rounded-lg border border-black/10 bg-black/[0.03] p-3 text-[0.82rem] space-y-1"
          aria-live="polite"
        >
          {readouts.map((r) => (
            <div key={r.label} className="flex justify-between gap-3">
              <dt className="soft">{r.label}</dt>
              <dd className="font-semibold tabular-nums text-right">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <details className="px-4 pb-4">
        <summary className="text-[0.8rem] font-semibold cursor-pointer">
          Text description of this visualisation
        </summary>
        <p className="text-[0.82rem] soft mt-2 leading-relaxed">{fallback}</p>
      </details>
    </div>
  );
};

export default SimPlayer;
