/* The Living Physics Book — offline service worker.
   The production build is a single self-contained HTML document, so caching
   the app shell caches the entire book: text, formulas, simulations, themes
   and 3D scenes. Nothing is ever fetched from a CDN. */

const CACHE = "living-physics-book-v4-expanded-lessons";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => c.add("./"))).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("living-physics-book-") && k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Navigation requests: serve the cached shell first so the book opens offline.
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(
        (hit) =>
          hit ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put("./index.html", copy));
              return res;
            })
            .catch(() => caches.match("./")),
      ),
    );
    return;
  }

  // Everything else: cache-first with runtime caching for optional assets.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req)
          .then((res) => {
            if (res.ok && res.type === "basic") {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => hit),
    ),
  );
});
