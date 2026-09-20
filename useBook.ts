import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditionId } from "@/themes/themes";
import type { Level } from "@/services/voice";

export type Screen = "landing" | "library" | "reader" | "notes";
export type LearnMode = "story" | "simple" | "academic" | "exam";
export type PerfLevel = "high" | "balanced" | "lite";

interface Prefs {
  edition: EditionId;
  mode: LearnMode;
  level: Level;
  showDeeper: boolean;
  perf: PerfLevel;
  perfAuto: boolean;
  fontScale: number; // 1 = 100%
  highContrast: boolean;
  reducedMotion: boolean;
  sound: boolean;
  focusMode: boolean;
}

interface Progress {
  completed: string[]; // topic ids
  bookmarks: string[];
  lastTopic: string | null;
  scores: Record<string, { score: number; total: number }>;
  streak: { count: number; lastDay: string | null };
  visited: string[];
}

interface BookState extends Prefs, Progress {
  screen: Screen;
  chapterId: string | null;
  topicId: string | null;
  set: <K extends keyof (Prefs & Progress)>(k: K, v: (Prefs & Progress)[K]) => void;
  go: (screen: Screen, chapterId?: string | null, topicId?: string | null) => void;
  openTopic: (chapterId: string, topicId: string) => void;
  toggleComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
  saveScore: (id: string, score: number, total: number) => void;
  markVisited: (id: string) => void;
  touchStreak: () => void;
  resetProgress: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

export const useBook = create<BookState>()(
  persist(
    (set, get) => ({
      edition: "cosmic",
      mode: "story",
      level: "standard",
      showDeeper: true,
      perf: "high",
      perfAuto: true,
      fontScale: 1,
      highContrast: false,
      reducedMotion: false,
      sound: false,
      focusMode: false,
      completed: [],
      bookmarks: [],
      lastTopic: null,
      scores: {},
      streak: { count: 0, lastDay: null },
      visited: [],
      screen: "landing",
      chapterId: null,
      topicId: null,

      set: (k, v) => set({ [k]: v } as never),
      go: (screen, chapterId = null, topicId = null) =>
        set((s) => ({
          screen,
          chapterId: chapterId ?? s.chapterId,
          topicId: topicId ?? s.topicId,
        })),
      openTopic: (chapterId, topicId) =>
        set({ screen: "reader", chapterId, topicId, lastTopic: topicId }),
      toggleComplete: (id) =>
        set((s) => ({
          completed: s.completed.includes(id)
            ? s.completed.filter((x) => x !== id)
            : [...s.completed, id],
        })),
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((x) => x !== id)
            : [...s.bookmarks, id],
        })),
      saveScore: (id, score, total) =>
        set((s) => ({ scores: { ...s.scores, [id]: { score, total } } })),
      markVisited: (id) =>
        set((s) => (s.visited.includes(id) ? {} : { visited: [...s.visited, id] })),
      touchStreak: () => {
        const { streak } = get();
        const d = today();
        if (streak.lastDay === d) return;
        const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        set({
          streak: { count: streak.lastDay === y ? streak.count + 1 : 1, lastDay: d },
        });
      },
      resetProgress: () =>
        set({
          completed: [],
          bookmarks: [],
          scores: {},
          visited: [],
          lastTopic: null,
          streak: { count: 0, lastDay: null },
        }),
    }),
    {
      name: "living-physics-book:v1",
      partialize: (s) => {
        const { screen: _s, ...rest } = s;
        return rest as BookState;
      },
    },
  ),
);
