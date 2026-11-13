import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#2f6bff";
const PURPLE = "#7c5cf0";
const ORANGE = "#ff8a3d";
const CYAN = "#19b4e8";

/** Cards feed the dashboard; the dashboard feeds the AI chip. Dots run inwards along each connector. */
export const aiServicesOverlay: HeroOverlayConfig = {
  width: 1200,
  height: 800,
  period: 8,
  paths: [
    { id: "c1", pts: [[372, 162], [398, 168], [420, 172]], color: BLUE, tail: 3, travel: 0.3, phase: 0.0 },
    { id: "c2", pts: [[316, 255], [318, 300], [345, 335], [398, 346]], color: BLUE, tail: 3, travel: 0.35, phase: 0.14 },
    { id: "c3", pts: [[580, 162], [580, 195]], color: PURPLE, tail: 3, travel: 0.25, phase: 0.28 },
    { id: "c4", pts: [[760, 165], [735, 172], [712, 195], [708, 225]], color: ORANGE, tail: 3, travel: 0.35, phase: 0.42 },
    { id: "c5", pts: [[310, 382], [350, 395], [365, 450], [420, 490], [470, 502]], color: PURPLE, tail: 3, travel: 0.4, phase: 0.56 },
    { id: "c6", pts: [[352, 543], [400, 545], [440, 520], [470, 503]], color: CYAN, tail: 3, travel: 0.35, phase: 0.7 },
    { id: "c7", pts: [[910, 358], [880, 360], [868, 400], [850, 435], [833, 438]], color: CYAN, tail: 3, travel: 0.35, phase: 0.84 },
    { id: "c8", pts: [[912, 592], [850, 600], [790, 578], [740, 535]], color: PURPLE, tail: 3, travel: 0.4, phase: 0.95 },
    // along the chart line inside the dashboard
    { id: "chart", pts: [[498, 385], [535, 358], [562, 370], [598, 348], [632, 367], [682, 328]], color: "#6d4cf0", tail: 4, travel: 0.5, period: 5, r: 7 },
  ],
  pulses: [
    { x: 583, y: 545, r: 60, color: BLUE, at: 0.1 },
    { x: 583, y: 545, r: 60, color: BLUE, at: 0.6 },
    { x: 682, y: 328, r: 14, color: "#6d4cf0", at: 0.35 },
  ],
  glows: [
    { x: 583, y: 545, r: 150, color: "#3b82f6", strength: 0.45, phase: 0 },
    { x: 610, y: 650, r: 210, color: "#6d7cff", strength: 0.18, phase: 0.5 },
  ],
  float: 7,
};
