import type { HeroOverlayConfig } from "../heroOverlay.types";

const ORANGE = "#f97316";
const BLUE = "#2563eb";
const GREEN = "#16a34a";
const PURPLE = "#8b5cf6";

/**
 * This picture is an app screen with no connecting lines, so it works as a
 * story: the AI answers, then each segment lights up and its bar fills.
 */
export const segmentIqOverlay: HeroOverlayConfig = {
  width: 1536,
  height: 1024,
  period: 10,
  paths: [
    { id: "b1", pts: [[734, 431], [860, 431], [986, 431]], color: ORANGE, r: 10, tail: 3, travel: 0.1, phase: 0.72 },
    { id: "b2", pts: [[1144, 431], [1270, 431], [1396, 431]], color: BLUE, r: 10, tail: 3, travel: 0.1, phase: 0.62 },
    { id: "b3", pts: [[734, 636], [860, 636], [986, 636]], color: GREEN, r: 10, tail: 3, travel: 0.1, phase: 0.52 },
    { id: "b4", pts: [[1144, 636], [1270, 636], [1396, 636]], color: PURPLE, r: 10, tail: 3, travel: 0.1, phase: 0.42 },
    { id: "sil", pts: [[1362, 160], [1380, 156], [1396, 148], [1412, 134]], color: BLUE, r: 7, tail: 2, travel: 0.2, phase: 0.5 },
  ],
  pulses: [
    { x: 150, y: 430, r: 34, color: ORANGE, at: 0.04 },
    { x: 684, y: 334, r: 36, color: ORANGE, at: 0.26 },
    { x: 1093, y: 334, r: 36, color: BLUE, at: 0.36 },
    { x: 684, y: 538, r: 36, color: GREEN, at: 0.46 },
    { x: 1093, y: 538, r: 36, color: PURPLE, at: 0.56 },
    { x: 1318, y: 240, r: 10, color: GREEN, at: 0.62 },
    { x: 150, y: 687, r: 34, color: ORANGE, at: 0.74 },
    { x: 531, y: 830, r: 30, color: ORANGE, at: 0.9 },
  ],
  glows: [
    { x: 825, y: 375, r: 220, color: ORANGE, strength: 0.14, phase: 0.74 },
    { x: 1235, y: 375, r: 220, color: BLUE, strength: 0.14, phase: 0.64 },
    { x: 825, y: 570, r: 220, color: GREEN, strength: 0.14, phase: 0.54 },
    { x: 1235, y: 570, r: 220, color: PURPLE, strength: 0.14, phase: 0.44 },
  ],
  float: 5,
};
