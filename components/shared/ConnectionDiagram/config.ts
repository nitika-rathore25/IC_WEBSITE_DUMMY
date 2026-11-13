/**
 * Configuration for <ConnectionDiagram />.
 *
 * Everything the animation draws (cards, copy, colours, link geometry, timing)
 * lives here, in a 844 x 844 design space taken from the Figma hero export.
 * To reuse the animation on another page, pass a different config (or tweak a
 * few fields of `homeConnectionDiagram`) — the component itself never changes.
 *
 * Timing values are fractions (0–1) of one full loop (`duration` seconds).
 */

export type Point = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };

export type NodeMedia =
  | { type: "image"; src: string; x: number; y: number; size: number }
  | { type: "icon"; icon: "bars" | "monitor"; x: number; y: number; size: number; tile?: boolean };

export interface DiagramNode {
  id: string;
  title: string;
  lines: string[];
  /** Card rectangle. */
  box: Box;
  media: NodeMedia;
  /** Text block position, relative to the card's top-left. */
  textX: number;
  textTop: number;
  /** Coloured dot where the link leaves the card. */
  anchor: Point;
  /** Point on the hub card the dashed link runs to. */
  hubPoint: Point;
  color: string;
  /** Dashed link colour (defaults to `color`). */
  linkColor?: string;
  /** [start, end] of the card fade-in. */
  appear: [number, number];
}

export interface DiagramHub {
  title: string;
  lines: string[];
  box: Box;
  icon: { x: number; y: number; size: number };
  textX: number;
  textTop: number;
  color: string;
  appear: [number, number];
}

export interface OrbitParticle {
  color: string;
  r: number;
  /** Whole laps per loop (keeps the loop seamless). */
  laps: 1 | 2 | 3;
  /** Start position around the card, 0–1. */
  phase: number;
}

export interface AmbientDot {
  x: number;
  y: number;
  r: number;
}

export interface ConnectionDiagramConfig {
  size: number;
  /** Seconds per full loop. */
  duration: number;
  nodes: DiagramNode[];
  hub: DiagramHub;
  orbit: OrbitParticle[];
  ambient: AmbientDot[];
  ambientColor: string;
  /** Gap between a card finishing and its link starting / link draw length. */
  linkDraw: number;
  /** Window in which dots travel along the links. */
  travel: { start: number; end: number; passes: number };
  /** Loop fade-out window. */
  fadeOut: [number, number];
}

const AMBIENT: AmbientDot[] = [
  [143, 160, 3.2], [271, 189, 3.2], [538, 105, 3.2], [743, 175, 3.2], [365, 336, 3.2], [141, 552, 3.2], [722, 535, 3.2],
  [422, 242, 2.2], [664, 295, 2.2], [421, 436, 2.2], [463, 437, 2.2], [394, 637, 2.2],
  [215, 152, 1.2], [336, 139, 1.2], [310, 200, 1.2], [210, 253, 1.2], [217, 273, 1.2], [325, 255, 1.2],
  [176, 302, 1.2], [205, 323, 1.2], [413, 363, 1.2], [699, 371, 1.2], [741, 123, 1.2], [712, 501, 1.2],
  [357, 669, 1.2], [467, 712, 1.2],
].map(([x, y, r]) => ({ x, y, r }));

export const homeConnectionDiagram: ConnectionDiagramConfig = {
  size: 844,
  duration: 4.5,
  nodes: [
    {
      id: "people",
      title: "PEOPLE",
      lines: ["Real human", "understanding"],
      box: { x: 72, y: 121, w: 306, h: 156 },
      media: { type: "image", src: "/images/home/diagram-people.png", x: 19, y: 34, size: 100 },
      textX: 139,
      textTop: 42,
      anchor: { x: 279, y: 278 },
      hubPoint: { x: 357, y: 357 },
      color: "#2d6bff",
      linkColor: "#a85cf7",
      appear: [0.08, 0.17],
    },
    {
      id: "data",
      title: "DATA",
      lines: ["Signals", "everywhere"],
      box: { x: 478, y: 121, w: 295, h: 156 },
      media: { type: "icon", icon: "bars", x: 46, y: 62, size: 42 },
      textX: 140,
      textTop: 42,
      anchor: { x: 564, y: 278 },
      hubPoint: { x: 497, y: 347 },
      color: "#12b886",
      appear: [0.15, 0.24],
    },
    {
      id: "technology",
      title: "TECHNOLOGY",
      lines: ["Systems that", "make it real"],
      box: { x: 72, y: 556, w: 310, h: 156 },
      media: { type: "icon", icon: "monitor", x: 28, y: 32, size: 90, tile: true },
      textX: 141,
      textTop: 36,
      anchor: { x: 279, y: 556 },
      hubPoint: { x: 340, y: 497 },
      color: "#5b3df5",
      linkColor: "#6a45f0",
      appear: [0.22, 0.31],
    },
    {
      id: "business",
      title: "BUSINESS",
      lines: ["Impact that", "lasts"],
      box: { x: 478, y: 556, w: 295, h: 156 },
      media: { type: "image", src: "/images/home/diagram-business.png", x: 9, y: 20, size: 108 },
      textX: 140,
      textTop: 36,
      anchor: { x: 564, y: 556 },
      hubPoint: { x: 503, y: 497 },
      color: "#f5a000",
      appear: [0.26, 0.35],
    },
  ],
  hub: {
    title: "AI",
    lines: ["From patterns", "to possibilities"],
    box: { x: 287, y: 346, w: 271, h: 151 },
    icon: { x: 26, y: 34, size: 83 },
    textX: 126,
    textTop: 38,
    color: "#f0642a",
    appear: [0.36, 0.45],
  },
  orbit: [
    { color: "#f0642a", r: 4, laps: 1, phase: 0.02 },
    { color: "#f0642a", r: 3.2, laps: 1, phase: 0.2 },
    { color: "#f0642a", r: 4, laps: 1, phase: 0.38 },
    { color: "#f0642a", r: 3, laps: 2, phase: 0.55 },
    { color: "#f0642a", r: 3.6, laps: 1, phase: 0.72 },
    { color: "#f0642a", r: 3, laps: 2, phase: 0.9 },
    { color: "#12b886", r: 3.4, laps: 1, phase: 0.12 },
    { color: "#5b3df5", r: 3.4, laps: 1, phase: 0.62 },
  ],
  ambient: AMBIENT,
  ambientColor: "#4a78b4",
  linkDraw: 0.1,
  travel: { start: 0.46, end: 0.9, passes: 2 },
  fadeOut: [0.93, 0.99],
};
