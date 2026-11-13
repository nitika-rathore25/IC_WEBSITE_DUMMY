import type { HeroOverlayConfig } from "../heroOverlay.types";
import { arrivalPulse, circlePts, relay } from "./helpers";

const ORANGE = "#ff7a1a";
const BLUE = "#1e7bff";
const PURPLE = "#8b3df5";
const GREEN = "#12b886";

/** Six stages around "Custom AI Solution": the baton runs the arrows, each stage lights up in turn. */
export const customDevelopmentOverlay: HeroOverlayConfig = {
  width: 1100,
  height: 1100,
  period: 12,
  paths: [
    ...relay(
      [
        { id: "s1", slot: 0, color: ORANGE, pts: [[700, 135], [755, 150], [795, 190]] },
        { id: "s2", slot: 1, color: BLUE, pts: [[992, 445], [998, 520], [992, 595]] },
        { id: "s3", slot: 2, color: PURPLE, pts: [[800, 862], [755, 890], [710, 915]] },
        { id: "s4", slot: 3, color: ORANGE, pts: [[390, 917], [340, 895], [300, 862]] },
        { id: "s5", slot: 4, color: GREEN, pts: [[105, 603], [100, 520], [105, 445]] },
        { id: "s6", slot: 5, color: BLUE, pts: [[295, 196], [340, 160], [395, 135]] },
      ],
      6,
      { r: 9, tail: 3 },
    ),
    // a slow dot circling the dashed ring around the hub
    { id: "orbit", pts: circlePts(550, 525, 180, 16), color: "#6d5cf0", r: 8, tail: 5, period: 9, travel: 0.95 },
  ],
  pulses: [
    arrivalPulse(550, 52, 36, ORANGE, 0, 6),
    arrivalPulse(877, 210, 36, BLUE, 1, 6),
    arrivalPulse(880, 586, 36, PURPLE, 2, 6),
    arrivalPulse(550, 757, 36, ORANGE, 3, 6),
    arrivalPulse(222, 586, 36, GREEN, 4, 6),
    arrivalPulse(224, 210, 36, BLUE, 5, 6),
    { x: 550, y: 525, r: 150, color: "#3b5bff", at: 0.5 },
  ],
  glows: [
    { x: 550, y: 525, r: 230, color: "#4f46e5", strength: 0.28, phase: 0 },
    { x: 550, y: 190, r: 150, color: ORANGE, strength: 0.18, phase: 0 },
    { x: 865, y: 345, r: 150, color: BLUE, strength: 0.18, phase: 1 / 6 },
    { x: 870, y: 700, r: 150, color: PURPLE, strength: 0.18, phase: 2 / 6 },
    { x: 550, y: 850, r: 150, color: ORANGE, strength: 0.18, phase: 3 / 6 },
    { x: 225, y: 710, r: 150, color: GREEN, strength: 0.18, phase: 4 / 6 },
    { x: 235, y: 345, r: 150, color: BLUE, strength: 0.18, phase: 5 / 6 },
  ],
};
