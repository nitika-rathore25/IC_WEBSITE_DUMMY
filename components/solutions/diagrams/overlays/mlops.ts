import type { HeroOverlayConfig } from "../heroOverlay.types";
import { arrivalPulse, relay } from "./helpers";

const SLOTS = 7;

/** Six stages around GO LIVE: the baton runs the ring, each stage pulses on arrival, GO LIVE keeps glowing. */
export const mlopsOverlay: HeroOverlayConfig = {
  width: 1120,
  height: 1088,
  period: 12,
  paths: relay(
    [
      { id: "m1", slot: 0, color: "#7c6cf0", pts: [[700, 135], [780, 160], [870, 235]] },
      { id: "m2", slot: 1, color: "#22b07d", pts: [[1020, 530], [1025, 580], [1018, 630]] },
      { id: "m3", slot: 2, color: "#f59e0b", pts: [[853, 827], [800, 880], [700, 920]] },
      { id: "m4", slot: 3, color: "#ef6b6b", pts: [[420, 915], [340, 890], [262, 825]] },
      { id: "m5", slot: 4, color: "#ef6b6b", pts: [[103, 628], [98, 580], [103, 530]] },
      { id: "m6", slot: 5, color: "#3b9cf0", pts: [[247, 230], [320, 170], [420, 130]] },
    ],
    SLOTS,
    { r: 9, tail: 3 },
  ),
  pulses: [
    arrivalPulse(972, 338, 100, "#7c6cf0", 1, SLOTS),
    arrivalPulse(972, 748, 100, "#22b07d", 2, SLOTS),
    arrivalPulse(560, 918, 100, "#f59e0b", 3, SLOTS),
    arrivalPulse(147, 748, 100, "#ef6b6b", 4, SLOTS),
    arrivalPulse(147, 338, 100, "#ef6b6b", 5, SLOTS),
    arrivalPulse(560, 135, 100, "#3b9cf0", 6, SLOTS),
    { x: 560, y: 545, r: 110, color: "#4f6bff", at: 0.0 },
    { x: 560, y: 545, r: 110, color: "#4f6bff", at: 0.5 },
  ],
  glows: [
    { x: 560, y: 560, r: 240, color: "#4f6bff", strength: 0.3, phase: 0 },
    { x: 560, y: 425, r: 110, color: "#7c83f5", strength: 0.35, phase: 0.5 },
  ],
  float: 5,
};
