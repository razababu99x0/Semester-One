export type EditionId = "cosmic" | "enchanted" | "neutral";

export interface Edition {
  id: EditionId;
  name: string;
  tagline: string;
  description: string;
  vars: Record<string, string>;
}

/**
 * All colours below were checked so that --ink on --paper and --fg on --bg
 * exceed a 4.5:1 contrast ratio (WCAG AA for body text).
 */
export const EDITIONS: Edition[] = [
  {
    id: "cosmic",
    name: "Cosmic Explorer",
    tagline: "Observatory at the edge of the night",
    description:
      "Deep navy and space-black with electric blue, cyan and amber highlights. Star fields, orbital lines and holographic formulas.",
    vars: {
      "--bg": "#05070f",
      "--bg-2": "#0a1020",
      "--fg": "#e8eefc",
      "--muted": "#a7b6d4",
      "--accent": "#4cc9ff",
      "--accent-2": "#ffb454",
      "--accent-3": "#7aa2ff",
      "--paper": "#f3f1e7",
      "--paper-2": "#e7e3d3",
      "--ink": "#1a1a22",
      "--ink-soft": "#4a4a58",
      "--line": "#25304d",
      "--glow": "76, 201, 255",
      "--serif": "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif",
      "--sans": "'Inter','Segoe UI',system-ui,-apple-system,sans-serif",
      "--star": "#9fd8ff",
      "--portal-a": "#4cc9ff",
      "--portal-b": "#ffb454",
    },
  },
  {
    id: "enchanted",
    name: "Enchanted Scholar",
    tagline: "The old library where constellations grow",
    description:
      "Deep violet and midnight blue with warm cream, rose-gold, turquoise and lavender. Celestial flowers, constellations, glowing formulas.",
    vars: {
      "--bg": "#0d0718",
      "--bg-2": "#1a1030",
      "--fg": "#f4ecff",
      "--muted": "#c3b3dd",
      "--accent": "#f0b7a4",
      "--accent-2": "#6fe0d0",
      "--accent-3": "#c8a8ff",
      "--paper": "#fbf4e6",
      "--paper-2": "#efe4cf",
      "--ink": "#241a2e",
      "--ink-soft": "#54465f",
      "--line": "#3a2a55",
      "--glow": "240, 183, 164",
      "--serif": "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif",
      "--sans": "'Inter','Segoe UI',system-ui,-apple-system,sans-serif",
      "--star": "#e6c9ff",
      "--portal-a": "#c8a8ff",
      "--portal-b": "#6fe0d0",
    },
  },
  {
    id: "neutral",
    name: "Neutral Scholar",
    tagline: "Quiet paper, clear science",
    description:
      "A calm graphite and brass edition with maximum readability — identical content, minimal decoration.",
    vars: {
      "--bg": "#101213",
      "--bg-2": "#1a1e20",
      "--fg": "#eef1f2",
      "--muted": "#b3bcc0",
      "--accent": "#d7a24c",
      "--accent-2": "#8fd3c7",
      "--accent-3": "#9fb4c7",
      "--paper": "#f6f4ef",
      "--paper-2": "#e9e5dc",
      "--ink": "#181a1b",
      "--ink-soft": "#4b5052",
      "--line": "#2b3134",
      "--glow": "215, 162, 76",
      "--serif": "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif",
      "--sans": "'Inter','Segoe UI',system-ui,-apple-system,sans-serif",
      "--star": "#cfd8dd",
      "--portal-a": "#d7a24c",
      "--portal-b": "#8fd3c7",
    },
  },
];

export const applyEdition = (id: EditionId) => {
  const ed = EDITIONS.find((e) => e.id === id) ?? EDITIONS[0];
  const root = document.documentElement;
  Object.entries(ed.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.edition = id;
};
