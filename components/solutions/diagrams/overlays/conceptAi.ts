import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#4f6ef5";
const SKY = "#5aa9f5";
const VIOLET = "#8b5cf6";
const CYAN = "#14c3d3";

/** A brief goes in on three lines, the AI layers work, three concept cards come out. */
export const conceptAiOverlay: HeroOverlayConfig = {
  width: 1536,
  height: 1024,
  period: 9,
  paths: [
    { id: "i1", pts: [[388, 347], [440, 350], [470, 420], [500, 465], [555, 470]], color: BLUE, r: 11, tail: 3, travel: 0.3, phase: 0 },
    { id: "i2", pts: [[400, 438], [460, 455], [500, 482], [550, 487]], color: SKY, r: 11, tail: 3, travel: 0.3, phase: 0.96 },
    { id: "i3", pts: [[418, 565], [470, 525], [510, 505], [550, 500]], color: VIOLET, r: 11, tail: 3, travel: 0.3, phase: 0.92 },
    { id: "o1", pts: [[930, 408], [970, 380], [990, 300], [1020, 280], [1062, 277]], color: BLUE, r: 11, tail: 3, travel: 0.3, phase: 0.55 },
    { id: "o2", pts: [[945, 485], [990, 455], [1030, 442], [1058, 440]], color: VIOLET, r: 11, tail: 3, travel: 0.3, phase: 0.51 },
    { id: "o3", pts: [[950, 485], [985, 520], [990, 580], [1005, 620], [1027, 632]], color: CYAN, r: 11, tail: 3, travel: 0.3, phase: 0.47 },
  ],
  pulses: [
    { x: 168, y: 388, r: 50, color: "#f05a3c", at: 0 },
    { x: 750, y: 395, r: 90, color: BLUE, at: 0.34 },
    { x: 1063, y: 277, r: 24, color: BLUE, at: 0.85 },
    { x: 1058, y: 440, r: 24, color: VIOLET, at: 0.81 },
    { x: 1027, y: 632, r: 24, color: CYAN, at: 0.77 },
  ],
  glows: [
    { x: 750, y: 480, r: 260, color: "#6d7cff", strength: 0.35, phase: 0.15 },
    { x: 1260, y: 480, r: 380, color: "#a78bfa", strength: 0.1, phase: 0.6 },
  ],
  float: 7,
};
