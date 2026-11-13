import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#1e7bff";
const ORANGE = "#f97316";
const TEAL = "#14b8a6";
const VIOLET = "#6d4af5";
const NAVY = "#0b2a66";

/** Four conversations feed the analysis; the dashboard sends four kinds of output to the right. */
export const enspeekOverlay: HeroOverlayConfig = {
  width: 1536,
  height: 1024,
  period: 9,
  paths: [
    { id: "i1", pts: [[470, 250], [545, 300], [548, 420], [575, 470], [590, 488]], color: BLUE, r: 11, tail: 3, travel: 0.3, phase: 0 },
    { id: "i2", pts: [[433, 405], [500, 420], [540, 470], [580, 486]], color: ORANGE, r: 11, tail: 3, travel: 0.3, phase: 0.97 },
    { id: "i3", pts: [[437, 555], [490, 540], [530, 500], [575, 488]], color: TEAL, r: 11, tail: 3, travel: 0.3, phase: 0.94 },
    { id: "i4", pts: [[480, 695], [520, 680], [535, 600], [545, 540], [575, 495]], color: VIOLET, r: 11, tail: 3, travel: 0.3, phase: 0.91 },
    { id: "chart", pts: [[870, 615], [912, 575], [940, 590], [1002, 551]], color: NAVY, r: 8, tail: 4, travel: 0.7, period: 4.5 },
    { id: "o1", pts: [[1062, 395], [1100, 390], [1110, 300], [1150, 265], [1190, 265]], color: TEAL, r: 11, tail: 3, travel: 0.3, phase: 0.55 },
    { id: "o2", pts: [[1062, 470], [1110, 460], [1130, 420], [1195, 418]], color: ORANGE, r: 11, tail: 3, travel: 0.3, phase: 0.52 },
    { id: "o3", pts: [[1062, 525], [1110, 535], [1140, 580], [1190, 580]], color: VIOLET, r: 11, tail: 3, travel: 0.3, phase: 0.49 },
    { id: "o4", pts: [[1062, 650], [1110, 655], [1125, 720], [1150, 742], [1190, 742]], color: BLUE, r: 11, tail: 3, travel: 0.3, phase: 0.46 },
  ],
  pulses: [
    { x: 590, y: 488, r: 28, color: NAVY, at: 0.32 },
    { x: 1201, y: 265, r: 24, color: TEAL, at: 0.82 },
    { x: 1208, y: 418, r: 24, color: ORANGE, at: 0.8 },
    { x: 1203, y: 580, r: 24, color: VIOLET, at: 0.78 },
    { x: 1201, y: 742, r: 24, color: BLUE, at: 0.76 },
  ],
  glows: [{ x: 830, y: 500, r: 340, color: "#3b82f6", strength: 0.16, phase: 0.2 }],
  float: 6,
};
