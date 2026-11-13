import type { HeroOverlayConfig } from "../heroOverlay.types";

const PURPLE = "#7c3aed";
const GREEN = "#10b981";
const BLUE = "#2563eb";
const AMBER = "#f59e0b";

/** Design, Collect, Analyze and Insights run into AI; AI delivers the insights card. */
export const insignAiOverlay: HeroOverlayConfig = {
  width: 910,
  height: 540,
  period: 8,
  paths: [
    { id: "i1", pts: [[232, 71], [285, 75], [310, 130], [325, 200], [355, 230], [386, 238]], color: PURPLE, r: 7, tail: 3, travel: 0.3, phase: 0 },
    { id: "i2", pts: [[232, 203], [275, 205], [300, 225], [330, 245], [386, 250]], color: GREEN, r: 7, tail: 3, travel: 0.3, phase: 0.97 },
    { id: "i3", pts: [[232, 338], [275, 335], [300, 310], [330, 272], [386, 262]], color: BLUE, r: 7, tail: 3, travel: 0.3, phase: 0.94 },
    { id: "i4", pts: [[232, 468], [285, 462], [310, 420], [325, 320], [355, 285], [386, 272]], color: AMBER, r: 7, tail: 3, travel: 0.3, phase: 0.91 },
    { id: "out", pts: [[516, 260], [550, 260], [585, 260]], color: BLUE, r: 7, tail: 3, travel: 0.16, phase: 0.58 },
    { id: "bars", pts: [[627, 298], [659, 290], [690, 278], [711, 250]], color: BLUE, r: 6, tail: 3, travel: 0.6, period: 4 },
  ],
  pulses: [
    { x: 450, y: 262, r: 60, color: BLUE, at: 0.34 },
    { x: 825, y: 175, r: 28, color: GREEN, at: 0.66 },
  ],
  glows: [
    { x: 450, y: 262, r: 130, color: "#3b82f6", strength: 0.3, phase: 0.2 },
    { x: 868, y: 112, r: 45, color: "#3b82f6", strength: 0.5, phase: 0.1 },
  ],
  float: 4,
};
