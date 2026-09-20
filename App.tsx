import React from "react";
import { Wrench } from "lucide-react";
import Landing from "./Landing";
import Library from "./Library";
import Reader from "./Reader";
import Notebook from "./Notebook";
import Tools from "./Tools";
import { useBook } from "./useBook";
import { applyEdition } from "./themes";
import { initInstall, registerSW, cacheAppShell } from "./offline";

type Tab = "search" | "contents" | "formulas" | "marks" | "progress" | "themes" | "settings" | "export";

export default function App() {
  const { screen, edition, fontScale, highContrast, reducedMotion, focusMode, perfAuto, set } = useBook();
  const [tools, setTools] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>("contents");

  /* theme + accessibility tokens */
  React.useEffect(() => applyEdition(edition), [edition]);
  React.useEffect(() => {
    document.documentElement.style.setProperty("--fs", String(fontScale));
  }, [fontScale]);
  React.useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
  }, [highContrast]);
  React.useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [reducedMotion]);

  /* honour the OS reduced-motion preference on first run */
  React.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) set("reducedMotion", true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* automatic performance detection (always overridable in Settings) */
  React.useEffect(() => {
    if (!perfAuto) return;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as any).deviceMemory ?? 4;
    const small = window.innerWidth < 700;
    let webgl = false;
    try {
      webgl = !!document.createElement("canvas").getContext("webgl");
    } catch {
      webgl = false;
    }
    const level = !webgl ? "lite" : cores >= 8 && mem >= 8 && !small ? "high" : cores >= 4 ? "balanced" : "lite";
    set("perf", level);
  }, [perfAuto]); // eslint-disable-line react-hooks/exhaustive-deps

  /* offline support */
  React.useEffect(() => {
    initInstall();
    registerSW().then(() => cacheAppShell());
  }, []);

  const openTools = (t?: string) => {
    if (t) setTab(t as Tab);
    setTools(true);
  };

  return (
    <div className={focusMode ? "focus-mode" : undefined}>
      <a href="#main" className="skip-link">Skip to main content</a>

      {screen === "landing" && <Landing onTools={openTools} />}
      {screen === "library" && <Library />}
      {screen === "reader" && <Reader />}
      {screen === "notes" && <Notebook />}

      <button
        className="btn btn-primary no-print fixed bottom-4 right-4 z-40 shadow-lg"
        style={{ minHeight: 52, minWidth: 52, borderRadius: 999 }}
        onClick={() => setTools(true)}
        aria-label="Open student tools: search, contents, formulas, bookmarks, settings"
      >
        <Wrench size={18} /> <span className="hidden sm:inline">Tools</span>
      </button>

      <Tools open={tools} tab={tab} setTab={setTab} onClose={() => setTools(false)} />
    </div>
  );
}
