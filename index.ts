import { calculus } from "./chapters/calculus";
import { vectors } from "./chapters/vectors";
import { dynamics } from "./chapters/dynamics";
import { central } from "./chapters/central";
import type { Chapter, Topic } from "@/types/content";

export const CHAPTERS: Chapter[] = [calculus, vectors, dynamics, central];

export const allTopics = (): { chapter: Chapter; topic: Topic }[] =>
  CHAPTERS.flatMap((c) => c.topics.map((t) => ({ chapter: c, topic: t })));

export const findChapter = (id: string | null) => CHAPTERS.find((c) => c.id === id);
export const findTopic = (chapterId: string | null, topicId: string | null) => {
  const c = findChapter(chapterId);
  return c?.topics.find((t) => t.id === topicId);
};

export const totalTopics = CHAPTERS.reduce((n, c) => n + c.topics.length, 0);
export const totalMinutes = CHAPTERS.reduce(
  (n, c) => n + c.topics.reduce((m, t) => m + t.minutes, 0),
  0,
);

export interface FormulaRow {
  tex: string;
  name: string;
  chapterId: string;
  chapter: string;
  topicId: string;
  topic: string;
}

export const formulaLibrary = (): FormulaRow[] =>
  allTopics().flatMap(({ chapter, topic }) =>
    topic.formulas.map((f) => ({
      tex: f.tex,
      name: f.name,
      chapterId: chapter.id,
      chapter: chapter.title,
      topicId: topic.id,
      topic: topic.title,
    })),
  );

export interface SearchHit {
  chapterId: string;
  topicId: string;
  chapter: string;
  title: string;
  snippet: string;
  score: number;
}

export function searchBook(q: string): SearchHit[] {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  const words = query.split(/\s+/);
  const hits: SearchHit[] = [];
  for (const { chapter, topic } of allTopics()) {
    const haystack = [
      topic.title,
      topic.understand.simple,
      topic.definition.formal,
      topic.awaken.hook,
      ...topic.formulas.map((f) => f.name),
      ...topic.summary.points,
    ]
      .join(" • ")
      .toLowerCase();
    let score = 0;
    for (const w of words) {
      if (topic.title.toLowerCase().includes(w)) score += 6;
      if (haystack.includes(w)) score += 2;
    }
    if (score > 0) {
      const i = haystack.indexOf(words[0]);
      hits.push({
        chapterId: chapter.id,
        topicId: topic.id,
        chapter: chapter.title,
        title: topic.title,
        snippet: haystack.slice(Math.max(0, i - 40), Math.max(0, i - 40) + 160),
        score,
      });
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 24);
}
