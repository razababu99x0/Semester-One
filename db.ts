import { openDB, type IDBPDatabase } from "idb";

export interface NoteRecord {
  id: string; // topicId
  text: string;
  updated: number;
}
export interface QuizRecord {
  id: string; // topicId + timestamp
  topicId: string;
  score: number;
  total: number;
  at: number;
}

const NAME = "living-physics-book";
let dbp: Promise<IDBPDatabase> | null = null;

function db() {
  if (!dbp) {
    dbp = openDB(NAME, 2, {
      upgrade(d) {
        if (!d.objectStoreNames.contains("notes")) d.createObjectStore("notes", { keyPath: "id" });
        if (!d.objectStoreNames.contains("quiz")) d.createObjectStore("quiz", { keyPath: "id" });
        if (!d.objectStoreNames.contains("kv")) d.createObjectStore("kv");
        if (!d.objectStoreNames.contains("pages")) d.createObjectStore("pages", { keyPath: "id" });
      },
    }).catch((e) => {
      console.warn("IndexedDB unavailable, falling back to localStorage", e);
      throw e;
    });
  }
  return dbp;
}

/* Graceful fallback so the book still works in private-mode browsers,
   in sandboxed iframes, and anywhere storage is unavailable. */
const lsKey = (store: string, id: string) => `lpb:${store}:${id}`;

const mem = new Map<string, string>();
const LS = {
  get(k: string): string | null {
    try {
      return globalThis.localStorage?.getItem(k) ?? mem.get(k) ?? null;
    } catch {
      return mem.get(k) ?? null;
    }
  },
  set(k: string, v: string) {
    mem.set(k, v);
    try {
      globalThis.localStorage?.setItem(k, v);
    } catch {
      /* memory only */
    }
  },
  del(k: string) {
    mem.delete(k);
    try {
      globalThis.localStorage?.removeItem(k);
    } catch {
      /* memory only */
    }
  },
  keys(prefix: string): string[] {
    const out = new Set<string>();
    mem.forEach((_v, k) => k.startsWith(prefix) && out.add(k));
    try {
      Object.keys(globalThis.localStorage ?? {}).forEach((k) => k.startsWith(prefix) && out.add(k));
    } catch {
      /* memory only */
    }
    return [...out];
  },
};

export const notesDB = {
  async put(rec: NoteRecord) {
    try {
      await (await db()).put("notes", rec);
    } catch {
      LS.set(lsKey("notes", rec.id), JSON.stringify(rec));
    }
  },
  async all(): Promise<NoteRecord[]> {
    try {
      return await (await db()).getAll("notes");
    } catch {
      return LS.keys("lpb:notes:").map((k) => JSON.parse(LS.get(k)!));
    }
  },
  async get(id: string): Promise<NoteRecord | undefined> {
    try {
      return await (await db()).get("notes", id);
    } catch {
      const raw = LS.get(lsKey("notes", id));
      return raw ? JSON.parse(raw) : undefined;
    }
  },
  async del(id: string) {
    try {
      await (await db()).delete("notes", id);
    } catch {
      LS.del(lsKey("notes", id));
    }
  },
};

export const quizDB = {
  async put(rec: QuizRecord) {
    try {
      await (await db()).put("quiz", rec);
    } catch {
      LS.set(lsKey("quiz", rec.id), JSON.stringify(rec));
    }
  },
  async all(): Promise<QuizRecord[]> {
    try {
      return await (await db()).getAll("quiz");
    } catch {
      return LS.keys("lpb:quiz:").map((k) => JSON.parse(LS.get(k)!));
    }
  },
  async clear() {
    try {
      await (await db()).clear("quiz");
    } catch {
      LS.keys("lpb:quiz:").forEach((k) => LS.del(k));
    }
  },
};

/* ------------------------------------------------------------------ */
/* Notebook pages — rich, free-form note pages the student can create  */
/* ------------------------------------------------------------------ */
export interface PageRecord {
  id: string;
  title: string;
  body: string;
  tags: string[];
  colour: string;
  topicId?: string;
  chapterId?: string;
  created: number;
  updated: number;
  pinned?: boolean;
}

export const pagesDB = {
  async put(rec: PageRecord) {
    try {
      await (await db()).put("pages", rec);
    } catch {
      LS.set(lsKey("pages", rec.id), JSON.stringify(rec));
    }
  },
  async all(): Promise<PageRecord[]> {
    try {
      return await (await db()).getAll("pages");
    } catch {
      return LS.keys("lpb:pages:").map((k) => JSON.parse(LS.get(k)!));
    }
  },
  async del(id: string) {
    try {
      await (await db()).delete("pages", id);
    } catch {
      LS.del(lsKey("pages", id));
    }
  },
};
