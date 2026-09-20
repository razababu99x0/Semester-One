import type { Topic } from "@/types/content";
import { getExpansion } from "@/data/expansions";

/**
 * Language levels.
 *
 * The book is written three times over. The physics, the formulas, the
 * simulations and the exam material are identical at every level — only the
 * register of the English changes, so a student can drop to Explorer when a
 * topic is new and climb to Scholar before the examination.
 *
 * The architecture is deliberately translation-ready: every string a student
 * reads is produced by a function of (topic, level), so a Hindi or Hinglish
 * pack can be added later by supplying an alternative resolver without
 * touching a single component.
 */
export type Level = "explorer" | "standard" | "scholar";

export const LEVELS: { id: Level; name: string; blurb: string; reading: string }[] = [
  {
    id: "explorer",
    name: "Explorer",
    blurb: "Short sentences, everyday words, one idea at a time.",
    reading: "Easiest reading",
  },
  {
    id: "standard",
    name: "Standard",
    blurb: "The normal textbook voice — clear but complete.",
    reading: "Balanced reading",
  },
  {
    id: "scholar",
    name: "Scholar",
    blurb: "Precise, formal, examiner-facing English with full conditions.",
    reading: "Most demanding reading",
  },
];

export interface VoicedTopic {
  /** one-line lead for the top of the page */
  lead: string;
  /** main explanation paragraph */
  main: string;
  /** supporting paragraph (analogy for lower levels, precision for higher) */
  support: string;
  /** how the definition section should be introduced */
  definitionLead: string;
  /** label used above the explanation */
  badge: string;
}

export function voice(topic: Topic, level: Level): VoicedTopic {
  const x = getExpansion(topic.id);

  if (level === "explorer") {
    return {
      badge: "In the simplest words",
      lead: topic.understand.eli5,
      main: x?.plain ?? topic.understand.simple,
      support: topic.understand.analogy,
      definitionLead:
        "Here is the same idea written the way your university will expect it. Read the simple version above first, then come back to this one — they say the same thing.",
    };
  }

  if (level === "scholar") {
    return {
      badge: "Formal statement",
      lead: x?.rigorous ?? topic.definition.formal,
      main: topic.definition.formal,
      support: topic.understand.simple,
      definitionLead:
        "The formal statement below is the one to reproduce in an examination. Note carefully which conditions are necessary and which are merely sufficient.",
    };
  }

  return {
    badge: "The idea",
    lead: topic.understand.simple,
    main: x?.plain ? topic.understand.simple : topic.understand.simple,
    support: topic.understand.analogy,
    definitionLead:
      "Now the same idea stated precisely, with the conditions that make it true.",
  };
}

/** Section intro lines adapt to the level too. */
export function sectionIntro(sectionId: string, level: Level): string | null {
  const map: Record<string, Record<Level, string>> = {
    awaken: {
      explorer: "Start here. One question, one reason it matters.",
      standard: "Set the scene before the mathematics begins.",
      scholar: "Motivation and scope of the topic, with the learning objective stated formally.",
    },
    definition: {
      explorer: "This is the 'proper' version. Take it slowly — every word is doing a job.",
      standard: "The university-level statement, with conditions, symbols and units.",
      scholar: "Necessary and sufficient conditions, admissible assumptions and limits of validity.",
    },
    formula: {
      explorer: "Every symbol is explained. Nothing here is meant to be memorised blindly.",
      standard: "Each formula with its symbols, units, conditions and rearranged forms.",
      scholar: "Dimensional consistency and conditions of applicability are given for each relation.",
    },
    exam: {
      explorer: "Exactly what to write in the exam, in the order to write it.",
      standard: "Definition, derivation and model answers for two-mark, five-mark and numerical questions.",
      scholar: "Examination-standard derivations with complete justification at each step.",
    },
    deeper: {
      explorer: "Extra reading if you are curious. Skip it safely and come back later.",
      standard: "Going further than the syllabus requires — for understanding, not for marks.",
      scholar: "Advanced context, historical development and connections to later courses.",
    },
  };
  return map[sectionId]?.[level] ?? null;
}
