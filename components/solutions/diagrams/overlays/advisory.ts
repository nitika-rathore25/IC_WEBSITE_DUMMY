import type { HeroOverlayConfig } from "../heroOverlay.types";
import { arrivalPulse, relay } from "./helpers";

const BLUE = "#1e90ff";
const ORANGE = "#ff7a1a";
const PURPLE = "#9333ea";

/** AI → Identify → Assess → Evaluate → Value: a dot climbs the curve, each stop lights up as it arrives. */
export const advisoryOverlay: HeroOverlayConfig = {
  width: 1243,
  height: 904,
  period: 8,
  paths: relay(
    [
      { id: "a1", slot: 0, color: BLUE, pts: [[222, 748], [285, 720], [330, 680], [375, 652]] },
      { id: "a2", slot: 1, color: ORANGE, pts: [[375, 652], [420, 640], [480, 600], [530, 560], [595, 543]] },
      { id: "a3", slot: 2, color: PURPLE, pts: [[595, 543], [650, 520], [700, 480], [745, 440], [797, 427]] },
      { id: "a4", slot: 3, color: ORANGE, pts: [[797, 427], [880, 410], [960, 385], [1030, 330], [1070, 265], [1080, 230]] },
    ],
    5,
    { r: 10, tail: 4 },
  ),
  pulses: [
    { x: 150, y: 752, r: 62, color: BLUE, at: 0 },
    arrivalPulse(375, 652, 38, BLUE, 1, 5),
    arrivalPulse(595, 543, 40, ORANGE, 2, 5),
    arrivalPulse(797, 427, 40, PURPLE, 3, 5),
    arrivalPulse(1078, 178, 78, ORANGE, 4, 5),
  ],
  glows: [
    { x: 1078, y: 178, r: 190, color: "#ff7a1a", strength: 0.35, phase: 0.1 },
    { x: 150, y: 752, r: 150, color: "#1e90ff", strength: 0.3, phase: 0.6 },
  ],
  float: 6,
};
