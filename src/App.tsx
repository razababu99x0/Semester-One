import React from "react";
import { Wrench } from "lucide-react";
import Landing from "@/app/Landing";
import Library from "@/app/Library";
import Reader from "@/components/book/Reader";
import Notebook from "@/components/notes/Notebook";
import Tools from "@/components/navigation/Tools";
import { useBook } from "@/stores/useBook";
import { applyEdition } from "@/themes/themes";
import { initInstall, registerSW, cacheAppShell } from "@/services/offline";

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

      <a
        href="https://github.com/razababu99x0"
        target="_blank"
        rel="noreferrer"
        className="no-print fixed bottom-4 left-4 z-40"
        style={{
          padding: "10px 14px",
          borderRadius: 999,
          background: "rgba(8, 15, 32, 0.82)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.24)",
          backdropFilter: "blur(12px)",
          fontSize: 12,
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
        aria-label="Developed by Sajid Raza — open portfolio"
      >
        Developed by Sajid Raza · Portfolio
      </a>

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
