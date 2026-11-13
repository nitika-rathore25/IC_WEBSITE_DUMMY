import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#3b82f6";
const GREEN = "#2fb386";
const ORANGE = "#f59a5b";
const PURPLE = "#9a7be0";

/**
 * Four sources converge on the model, three-four outcomes fan out of it.
 * Shared by Predictive AI & ML and Data & Cloud Architecture (same picture).
 */
export const predictiveFlowOverlay: HeroOverlayConfig = {
  width: 1225,
  height: 866,
  period: 9,
  paths: [
    // in
    { id: "i1", pts: [[285, 148], [325, 165], [340, 220], [342, 320], [360, 355], [398, 365]], color: BLUE, tail: 3, travel: 0.4, phase: 0 },
    { id: "i2", pts: [[285, 325], [320, 328], [345, 350], [370, 364], [398, 366]], color: GREEN, tail: 3, travel: 0.4, phase: 0.97 },
    { id: "i3", pts: [[285, 488], [325, 480], [340, 430], [352, 385], [372, 366], [398, 366]], color: ORANGE, tail: 3, travel: 0.4, phase: 0.94 },
    { id: "i4", pts: [[285, 664], [325, 650], [346, 600], [346, 480], [352, 400], [375, 368], [398, 366]], color: PURPLE, tail: 3, travel: 0.4, phase: 0.91 },
    // inside the model: the line chart
    { id: "chart", pts: [[592, 323], [630, 335], [672, 302], [717, 260]], color: "#3b6cf0", tail: 4, travel: 0.7, period: 4.5, r: 7 },
    // out
    { id: "o1", pts: [[822, 338], [870, 325], [880, 250], [890, 170], [925, 145], [945, 145]], color: BLUE, tail: 3, travel: 0.4, phase: 0.5 },
    { id: "o2", pts: [[822, 362], [870, 355], [895, 325], [945, 320]], color: GREEN, tail: 3, travel: 0.4, phase: 0.47 },
    { id: "o3", pts: [[822, 387], [860, 392], [875, 440], [900, 480], [945, 486]], color: ORANGE, tail: 3, travel: 0.4, phase: 0.44 },
    { id: "o4", pts: [[822, 387], [855, 395], [868, 470], [870, 590], [905, 640], [945, 650]], color: PURPLE, tail: 3, travel: 0.4, phase: 0.41 },
  ],
  pulses: [
    { x: 410, y: 366, r: 22, color: "#64748b", at: 0.38 },
    { x: 610, y: 340, r: 100, color: "#6d8cff", at: 0.42 },
    { x: 770, y: 360, r: 36, color: "#7c6ce8", at: 0.46 },
  ],
  glows: [
    { x: 610, y: 340, r: 260, color: "#5b8cff", strength: 0.3, phase: 0.45 },
    { x: 1070, y: 130, r: 130, color: BLUE, strength: 0.18, phase: 0.9 },
    { x: 1070, y: 330, r: 130, color: GREEN, strength: 0.18, phase: 0.93 },
    { x: 1070, y: 510, r: 130, color: ORANGE, strength: 0.18, phase: 0.96 },
    { x: 1070, y: 690, r: 130, color: PURPLE, strength: 0.18, phase: 0.99 },
  ],
  float: 6,
};
