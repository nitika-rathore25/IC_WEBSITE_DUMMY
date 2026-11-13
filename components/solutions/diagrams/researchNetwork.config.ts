import type { Pt } from "./spline";

/**
 * Research Services hero: "researcher at the centre of a network of Consumer,
 * Behavior, Insight and Strategy". Everything is drawn in a 1200 x 800 design
 * space taken from the Figma hero picture. Timing values are fractions (0–1)
 * of one loop (`duration` seconds).
 */

export const SIZE = { w: 1200, h: 800 } as const;
export const HUB = { x: 660, y: 365 } as const;

export interface NetCurve {
  id: string;
  pts: Pt[];
  /** One colour, or [start, end] for a gradient along the line. */
  color: string | [string, string];
  width: number;
  /** Dashed lines fade in; solid ones draw themselves. */
  dashed?: boolean;
  opacity?: number;
  /** [start, end] of the draw / fade-in. */
  appear: [number, number];
  /** A dot that runs along the line. */
  travel?: { color: string; r: number; start: number; passes: number; reverse?: boolean };
}

export interface NetNode {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  /** Soft ring around the dot. */
  halo: { r: number; color: string };
  pill?: { label: string; x: number; y: number; w: number; h: number; fill: string };
  appear: [number, number];
}

export interface NetDecor {
  x: number;
  y: number;
  r: number;
  color: string;
  opacity: number;
}

export const researchNetwork = {
  duration: 10,
  fadeOut: [0.94, 0.99] as [number, number],

  /** Faint dashed rings around the researcher; they turn slowly. */
  orbits: [150, 235, 335],

  decor: [
    { x: 457, y: 338, r: 62, color: "#cfe0f7", opacity: 0.75 },
    { x: 832, y: 420, r: 75, color: "#d3e2f8", opacity: 0.75 },
    { x: 784, y: 632, r: 47, color: "#e0dcf7", opacity: 0.85 },
    { x: 965, y: 162, r: 42, color: "#fde4d3", opacity: 0.9 },
  ] satisfies NetDecor[],

  curves: [
    // main arcs
    { id: "consumer-behavior", pts: [[555, 166], [640, 95], [715, 72], [791, 82]], color: ["#4d7df2", "#8a4ff0"], width: 2, appear: [0.1, 0.22], travel: { color: "#7b4ff0", r: 8, start: 0.52, passes: 2 } },
    { id: "behavior-insight", pts: [[791, 82], [880, 125], [937, 194], [970, 290], [977, 365]], color: ["#8a4ff0", "#2f7cf6"], width: 2, appear: [0.14, 0.28], travel: { color: "#2f7cf6", r: 8, start: 0.56, passes: 2 } },
    { id: "consumer-tech", pts: [[555, 166], [450, 200], [382, 257], [340, 350], [338, 430], [351, 513]], color: ["#2f7cf6", "#7a3ff0"], width: 2, appear: [0.12, 0.28], travel: { color: "#2f7cf6", r: 8, start: 0.6, passes: 2 } },
    { id: "tech-bottom", pts: [[351, 513], [440, 570], [550, 595]], color: "#8a4ff0", width: 2, appear: [0.26, 0.36] },
    { id: "bottom-arc", pts: [[550, 595], [700, 604], [894, 593]], color: ["#8a4ff0", "#f58a2d"], width: 1.6, appear: [0.3, 0.42], travel: { color: "#f58a2d", r: 7.5, start: 0.66, passes: 2, reverse: true } },
    { id: "strategy-left", pts: [[720, 491], [640, 545], [550, 595]], color: ["#f58a2d", "#8a4ff0"], width: 2, appear: [0.3, 0.4] },
    { id: "strategy-right", pts: [[720, 491], [800, 570], [894, 593]], color: "#f58a2d", width: 2, appear: [0.32, 0.42], travel: { color: "#f58a2d", r: 8, start: 0.7, passes: 2 } },
    { id: "right-up", pts: [[894, 593], [952, 500], [977, 365]], color: ["#f58a2d", "#2f7cf6"], width: 1.8, appear: [0.34, 0.46] },
    { id: "behavior-orange", pts: [[791, 82], [840, 165], [877, 246], [930, 310], [977, 365]], color: ["#c04bd8", "#f58a2d"], width: 1.8, appear: [0.16, 0.3] },
    { id: "tech-left", pts: [[351, 513], [400, 460], [451, 412]], color: "#8a4ff0", width: 1.6, appear: [0.24, 0.34] },
    { id: "left-consumer", pts: [[451, 412], [490, 300], [555, 166]], color: "#6aa0f4", width: 1.4, opacity: 0.8, appear: [0.2, 0.32] },
    // links to the researcher
    { id: "hub-consumer", pts: [[555, 166], [600, 230], [645, 292]], color: "#2f7cf6", width: 1.8, dashed: true, appear: [0.38, 0.48], travel: { color: "#2f7cf6", r: 7, start: 0.58, passes: 3 } },
    { id: "hub-behavior", pts: [[791, 82], [706, 186], [675, 285]], color: "#7a3ff0", width: 1.8, dashed: true, appear: [0.4, 0.5], travel: { color: "#7a3ff0", r: 7, start: 0.62, passes: 3 } },
    { id: "hub-insight", pts: [[977, 365], [850, 350], [740, 342]], color: "#2f7cf6", width: 1.6, opacity: 0.8, appear: [0.42, 0.52], travel: { color: "#2f7cf6", r: 7, start: 0.66, passes: 3, reverse: true } },
    { id: "hub-strategy", pts: [[720, 491], [708, 450], [696, 420]], color: "#f58a2d", width: 1.8, dashed: true, appear: [0.44, 0.54], travel: { color: "#f58a2d", r: 7, start: 0.7, passes: 3 } },
    { id: "hub-left", pts: [[451, 412], [525, 388], [588, 372]], color: "#8a4ff0", width: 1.6, opacity: 0.9, appear: [0.4, 0.5] },
    // links to the three small charts
    { id: "to-donut", pts: [[240, 358], [284, 449], [351, 513]], color: "#2f7cf6", width: 1.6, dashed: true, appear: [0.3, 0.4] },
    { id: "to-line", pts: [[550, 595], [549, 630], [549, 662]], color: "#8a4ff0", width: 1.6, dashed: true, appear: [0.36, 0.44] },
    { id: "to-bars-a", pts: [[977, 365], [996, 392], [1030, 420]], color: "#2f7cf6", width: 1.6, dashed: true, appear: [0.34, 0.44] },
    { id: "to-bars-b", pts: [[894, 593], [960, 565], [1015, 517]], color: "#f58a2d", width: 1.6, dashed: true, appear: [0.36, 0.46] },
  ] satisfies NetCurve[],

  nodes: [
    { id: "consumer", x: 555, y: 166, r: 16, color: "#1a73f2", halo: { r: 31, color: "#dbe8fc" }, pill: { label: "Consumer", x: 413, y: 130, w: 128, h: 43, fill: "#dbe8fb" }, appear: [0.08, 0.16] },
    { id: "behavior", x: 791, y: 82, r: 15, color: "#7b2ff7", halo: { r: 30, color: "#e6dcf9" }, pill: { label: "Behavior", x: 808, y: 36, w: 136, h: 47, fill: "#e6dcf9" }, appear: [0.1, 0.18] },
    { id: "insight", x: 977, y: 365, r: 18, color: "#1a73f2", halo: { r: 32, color: "#dbe8fc" }, pill: { label: "Insight", x: 1003, y: 322, w: 114, h: 42, fill: "#dbe8fb" }, appear: [0.12, 0.2] },
    { id: "strategy", x: 720, y: 491, r: 16, color: "#ff7a1a", halo: { r: 31, color: "#fde0cb" }, pill: { label: "Strategy", x: 731, y: 456, w: 134, h: 43, fill: "#fde4d3" }, appear: [0.14, 0.22] },
    { id: "n1", x: 382, y: 257, r: 10, color: "#2f7cf6", halo: { r: 21, color: "#dbe8fc" }, appear: [0.2, 0.26] },
    { id: "n2", x: 451, y: 412, r: 11, color: "#7a3ff0", halo: { r: 22, color: "#e6dcf9" }, appear: [0.22, 0.28] },
    { id: "n3", x: 351, y: 513, r: 13, color: "#6a2fe8", halo: { r: 25, color: "#e6dcf9" }, appear: [0.24, 0.3] },
    { id: "n4", x: 550, y: 595, r: 12, color: "#6a2fe8", halo: { r: 24, color: "#e6dcf9" }, appear: [0.28, 0.34] },
    { id: "n5", x: 706, y: 186, r: 8, color: "#7a3ff0", halo: { r: 17, color: "#e6dcf9" }, appear: [0.3, 0.36] },
    { id: "n6", x: 877, y: 246, r: 10, color: "#ff7a1a", halo: { r: 22, color: "#fde0cb" }, appear: [0.26, 0.32] },
    { id: "n7", x: 894, y: 593, r: 10, color: "#ff7a1a", halo: { r: 20, color: "#fde0cb" }, appear: [0.32, 0.38] },
    { id: "n8", x: 937, y: 194, r: 7, color: "#3a5de0", halo: { r: 14, color: "#dbe8fc" }, appear: [0.24, 0.3] },
    { id: "n9", x: 284, y: 449, r: 8, color: "#2f7cf6", halo: { r: 15, color: "#dbe8fc" }, appear: [0.3, 0.36] },
    { id: "n10", x: 555, y: 497, r: 11, color: "#a8cdf5", halo: { r: 17, color: "#eaf2fd" }, appear: [0.34, 0.4] },
    { id: "n11", x: 793, y: 241, r: 13, color: "#e3dcf7", halo: { r: 17, color: "#f3effc" }, appear: [0.32, 0.38] },
    { id: "n12", x: 688, y: 689, r: 7, color: "#b83fd0", halo: { r: 13, color: "#f2dff6" }, appear: [0.38, 0.44] },
  ] satisfies NetNode[],

  donut: {
    card: { x: 132, y: 252, w: 208, h: 106 },
    center: { x: 186, y: 306 },
    r: 32,
    stroke: 18,
    /** % of the ring, starting at 12 o'clock, clockwise. */
    segments: [
      { len: 14, color: "#9cc4f3" },
      { len: 27, color: "#ff8a1f" },
      { len: 15, color: "#e0467a" },
      { len: 24, color: "#7a2fe0" },
      { len: 20, color: "#2f7cf6" },
    ],
    rows: [
      { y: 282, dot: "#2f7cf6" },
      { y: 306, dot: "#ff8a1f" },
      { y: 330, dot: "#b030d8" },
    ],
    appear: [0.18, 0.3] as [number, number],
  },
  bars: {
    card: { x: 1003, y: 420, w: 138, h: 96 },
    baseline: 500,
    /** [x, height, colour] */
    items: [
      [1022, 24, "#cfe0fb"],
      [1043, 38, "#bcd3f8"],
      [1064, 25, "#2f7cf6"],
      [1085, 40, "#5a8cf4"],
      [1106, 52, "#4a78f0"],
      [1127, 68, "#3d63ea"],
    ] as [number, number, string][],
    appear: [0.2, 0.32] as [number, number],
  },
  line: {
    card: { x: 466, y: 660, w: 170, h: 98 },
    panel: { x: 480, y: 674, w: 142, h: 70 },
    pts: [[484, 728], [498, 706], [510, 696], [525, 698], [545, 716], [566, 722], [588, 712], [606, 692], [620, 686]] as Pt[],
    dot: 3,
    appear: [0.24, 0.36] as [number, number],
  },
};
