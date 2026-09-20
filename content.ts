// Core content model for The Living Physics Book.
// Every topic page is built from the same 11 pedagogical sections.

export type SimId =
  | "derivative-tangent"
  | "maxima-minima"
  | "approximation"
  | "partial-derivative"
  | "taylor-series"
  | "binomial-series"
  | "integral-area"
  | "direction-field"
  | "shm-second-order"
  | "vector-add"
  | "dot-cross"
  | "gradient-field"
  | "divergence-field"
  | "curl-paddle"
  | "continuity-tube"
  | "bernoulli-tube"
  | "heat-flow"
  | "gauss-law"
  | "reference-frame"
  | "rotating-platform"
  | "coriolis-globe"
  | "foucault"
  | "gravity-latitude"
  | "centre-of-mass"
  | "collision-2d"
  | "rutherford"
  | "central-orbit"
  | "kepler"
  | "satellite"
  | null;

export interface QuizQuestion {
  id: string;
  level: "basic" | "application" | "challenge";
  q: string;
  options: string[];
  answer: number;
  hint: string;
  explain: string;
}

export interface FormulaEntry {
  /** mini-TeX string understood by <Math /> */
  tex: string;
  name: string;
  where: { sym: string; meaning: string; unit: string }[];
  conditions: string[];
  rearranged?: string[];
  dimensional?: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  minutes: number;
  /** 1 AWAKEN */
  awaken: { hook: string; curiosity: string; realWorld: string; objective: string };
  /** 2 UNDERSTAND */
  understand: { simple: string; analogy: string; demo: string; eli5: string };
  /** 3 REAL DEFINITION */
  definition: {
    formal: string;
    conditions: string[];
    vocabulary: { term: string; meaning: string }[];
    units: string;
    assumptions: string[];
  };
  /** 4 SEE THE LAW + 6 EXPERIMENT share the simulation */
  sim: SimId;
  simBrief?: string;
  staticFallback: string;
  steps: string[];
  prediction?: string;
  /** 5 FORMULA LAB */
  formulas: FormulaEntry[];
  examples: WorkedExample[];
  /** 7 */
  realLife: { where: string; detail: string }[];
  /** 8 */
  mistakes: { wrong: string; why: string; right: string; trick: string }[];
  /** 9 EXAM MODE */
  exam: {
    definition: string;
    derivation: string[];
    keyFormula: string;
    twoMark: { q: string; a: string };
    fiveMark: { q: string; a: string };
    numerical: { q: string; a: string };
    checklist: string[];
  };
  /** 10 CHALLENGE */
  quiz: QuizQuestion[];
  /** 11 SUMMARY */
  summary: { points: string[]; recap: string[]; memoryMap: string[] };
  /** Floating formula-assembly activity: ordered tokens */
  assemble?: { prompt: string; tokens: string[] };
  /** verification flag for teachers */
  verify?: string;
}

export interface Chapter {
  id: string;
  unit: number;
  title: string;
  subtitle: string;
  portal: string;
  accent: string;
  blurb: string;
  topics: Topic[];
}
