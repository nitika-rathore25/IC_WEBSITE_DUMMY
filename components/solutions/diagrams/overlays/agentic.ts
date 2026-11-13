import type { HeroOverlayConfig } from "../heroOverlay.types";
import { arrivalPulse, relay } from "./helpers";

const INDIGO = "#6366f1";
const SLOTS = 7;

/** Plan → Reason → Use tools → Interact → Execute → Human approval → Complete, then round again. */
export const agenticOverlay: HeroOverlayConfig = {
  width: 1170,
  height: 1073,
  period: 14,
  paths: relay(
    [
      { id: "l1", slot: 0, color: INDIGO, pts: [[588, 143], [620, 146], [650, 152]] },
      { id: "l2", slot: 1, color: INDIGO, pts: [[908, 192], [950, 225], [975, 265]] },
      { id: "l3", slot: 2, color: INDIGO, pts: [[1098, 470], [1112, 520], [1100, 575]] },
      { id: "l4", slot: 3, color: INDIGO, pts: [[880, 748], [850, 780], [828, 800]] },
      { id: "l4b", slot: 3, color: INDIGO, pts: [[968, 835], [940, 880], [890, 903], [838, 908]] },
      { id: "l5", slot: 4, color: INDIGO, pts: [[570, 866], [540, 865], [515, 865]] },
      { id: "l6", slot: 5, color: INDIGO, pts: [[243, 842], [190, 820], [155, 775], [140, 720]] },
      { id: "l7", slot: 6, color: INDIGO, pts: [[140, 390], [145, 300], [185, 225], [250, 185], [308, 172]] },
    ],
    SLOTS,
    { r: 9, tail: 3 },
  ),
  pulses: [
    arrivalPulse(450, 125, 80, "#38bdf8", 0, SLOTS),
    arrivalPulse(780, 160, 80, "#8b5cf6", 1, SLOTS),
    arrivalPulse(1005, 375, 80, "#22c55e", 2, SLOTS),
    arrivalPulse(990, 640, 80, "#3b82f6", 3, SLOTS),
    arrivalPulse(705, 845, 80, "#f59e0b", 4, SLOTS),
    arrivalPulse(385, 850, 80, "#ef6b7a", 5, SLOTS),
    arrivalPulse(155, 520, 80, "#10b981", 6, SLOTS),
    { x: 550, y: 450, r: 120, color: INDIGO, at: 0.2 },
    { x: 550, y: 450, r: 120, color: INDIGO, at: 0.7 },
  ],
  glows: [{ x: 550, y: 440, r: 220, color: "#7c83f5", strength: 0.35, phase: 0 }],
  float: 5,
};
