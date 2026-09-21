/** Offline / PWA helpers. Everything here degrades gracefully. */

export type InstallState = "unsupported" | "available" | "installed" | "idle";

let deferredPrompt: any = null;
const listeners = new Set<(s: InstallState) => void>();
let state: InstallState = "idle";

const emit = (s: InstallState) => {
  state = s;
  listeners.forEach((l) => l(s));
};

export function initInstall() {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
    emit("available");
  });
  window.addEventListener("appinstalled", () => emit("installed"));
  if (window.matchMedia?.("(display-mode: standalone)").matches) emit("installed");
}

export const onInstallState = (fn: (s: InstallState) => void) => {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
};

export async function promptInstall(): Promise<string> {
  if (!deferredPrompt) {
    return "Your browser did not offer an automatic install prompt. You can still install this book: in Chrome or Edge use the menu → “Install app”; on iOS Safari use Share → “Add to Home Screen”. Use the offline status on the cover to check whether the book is saved.";
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return outcome === "accepted" ? "Installed. The book will now open like an app and work with no internet." : "Installation dismissed.";
}

/** Registers the service worker (present in the production build). */
export async function registerSW(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return false;
  try {
    await navigator.serviceWorker.register("./sw.js", {
      scope: "./",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * True when the application shell is cached and the book can run with no
 * network. The whole book (text, formulas, simulations, themes) is bundled
 * into the single HTML document, so caching that document caches everything.
 */
export async function isOfflineReady(): Promise<boolean> {
  if (!("caches" in window)) return false;
  try {
    const keys = await caches.keys();
    for (const k of keys.filter(k => k === "living-physics-book-v3-studio")) {
      const c = await caches.open(k);
      const m = await c.match(new URL("./", location.href).href, { ignoreSearch: true });
      if (m) return true;
      const any = await c.keys();
      if (any.some((r) => r.url.endsWith(".html") || r.url.endsWith("/"))) return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/** Force-cache the current document so the book is guaranteed to work offline. */
export async function cacheAppShell(): Promise<boolean> {
  if (!("caches" in window)) return false;
  try {
    const c = await caches.open("living-physics-book-v3-studio");
    await c.add(new Request(location.href, { cache: "reload" }));
    return true;
  } catch {
    return false;
  }
}

/**
 * “Download Complete Book Package”.
 * The production build is a single self-contained HTML file, so saving the
 * live document gives a complete, fully offline copy including every
 * simulation, theme and 3D scene.
 */
export function downloadCompleteBook() {
  const clone = document.documentElement.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-transient]").forEach((n) => n.remove());
  const html = `<!doctype html>\n${clone.outerHTML}`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "the-living-physics-book.html";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
