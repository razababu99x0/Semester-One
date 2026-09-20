import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Compass, Download, DownloadCloud, Palette, Accessibility, Play, WifiOff, CheckCircle2, NotebookPen,
} from "lucide-react";
import BookScene from "@/scenes/landing/BookScene";
import SafeScene from "@/components/accessibility/SafeScene";
import { useBook } from "@/stores/useBook";
import { EDITIONS } from "@/themes/themes";
import { downloadCompleteBook, promptInstall, cacheAppShell, isOfflineReady } from "@/services/offline";
import { totalTopics, totalMinutes, CHAPTERS, findTopic } from "@/data";

export const Landing: React.FC<{ onTools: (tab?: string) => void }> = ({ onTools }) => {
  const { go, openTopic, lastTopic, edition, perf, reducedMotion, completed } = useBook();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);
  const use3D = perf !== "lite" && !reducedMotion;

  React.useEffect(() => {
    isOfflineReady().then(setReady);
  }, []);

  const enter = () => {
    setOpen(true);
    window.setTimeout(() => go("library"), reducedMotion ? 150 : 1400);
  };

  const cont = () => {
    if (!lastTopic) return go("library");
    const ch = CHAPTERS.find((c) => c.topics.some((t) => t.id === lastTopic));
    if (ch && findTopic(ch.id, lastTopic)) openTopic(ch.id, lastTopic);
    else go("library");
  };

  const ed = EDITIONS.find((e) => e.id === edition)!;

  return (
    <main className="relative min-h-screen overflow-hidden" id="main">
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 10%, var(--bg-2), var(--bg) 70%)" }} />
      {use3D && (
        <div className="absolute inset-0" aria-hidden>
          <SafeScene>
          <BookScene
            open={open}
            accent={ed.vars["--accent"]}
            accent2={ed.vars["--accent-2"]}
            star={ed.vars["--star"]}
            quality={perf === "high" ? "high" : "balanced"}
          />
          </SafeScene>
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 1.1 }}
        >
          <p className="chip mb-5">{ed.name} edition</p>
          <h1 className="serif text-4xl sm:text-6xl font-bold leading-[1.05]" style={{ textShadow: "0 0 40px rgba(var(--glow),0.35)" }}>
            The Living Physics Book
          </h1>
          <p className="mt-3 text-lg sm:text-xl" style={{ color: "var(--accent)" }}>
            Where every law comes alive
          </p>
          <p className="mt-4 text-[0.98rem] soft" style={{ color: "var(--muted)" }}>
            Mathematical Physics &amp; Classical Mechanics · B.Sc. Physics, Semester I
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            4 chapters · {totalTopics} topics · ~{Math.round(totalMinutes / 60)} hours of guided study · works with no internet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.5, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button className="btn btn-primary text-base px-6" onClick={enter} style={{ minHeight: 52 }}>
            <BookOpen size={18} /> Enter the Book
          </button>
          <button className="btn" onClick={cont} disabled={!lastTopic}>
            <Play size={16} /> Continue learning
          </button>
          <button className="btn" onClick={() => go("library")}>
            <Compass size={16} /> Explore chapters
          </button>
          <button className="btn" onClick={() => go("notes")}>
            <NotebookPen size={16} /> My notebook
          </button>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            className="btn btn-ghost"
            onClick={async () => {
              const m = await promptInstall();
              await cacheAppShell();
              setReady(await isOfflineReady());
              setMsg(m);
            }}
          >
            <Download size={16} /> Install offline app
          </button>
          <button className="btn btn-ghost" onClick={downloadCompleteBook}>
            <DownloadCloud size={16} /> Download complete book
          </button>
          <button className="btn btn-ghost" onClick={() => onTools("themes")}>
            <Palette size={16} /> Choose edition
          </button>
          <button className="btn btn-ghost" onClick={() => onTools("settings")}>
            <Accessibility size={16} /> Accessibility settings
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
          {ready ? (
            <span className="inline-flex items-center gap-1" style={{ color: "var(--accent-2)" }}>
              <CheckCircle2 size={14} /> Offline ready — every page, formula and simulation is stored on this device
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <WifiOff size={14} /> Press “Install offline app” to cache the complete book
            </span>
          )}
        </div>

        {msg && (
          <p className="mt-4 max-w-xl text-sm panel p-3" role="status">
            {msg}
          </p>
        )}

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.map((c) => {
            const done = c.topics.filter((t) => completed.includes(t.id)).length;
            return (
              <button
                key={c.id}
                onClick={() => go("library", c.id)}
                className="panel p-4 text-left transition hover:-translate-y-[2px]"
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-widest" style={{ color: c.accent }}>
                  Unit {c.unit}
                </p>
                <p className="serif text-lg font-bold mt-1">{c.title}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {c.topics.length} topics · {done}/{c.topics.length} complete
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl text-xs" style={{ color: "var(--muted)" }}>
          Sound is off by default and there is no autoplaying audio. All motion respects your
          reduced-motion preference, and every simulation has a keyboard-accessible slider and a
          written description.
        </p>
      </div>
    </main>
  );
};

export default Landing;
