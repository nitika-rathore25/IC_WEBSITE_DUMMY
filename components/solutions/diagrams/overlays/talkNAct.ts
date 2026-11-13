import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#2563eb";
const VIOLET = "#7c3aed";
const INDIGO = "#5b4df0";

/** Three inputs shape TalkNAct, it produces a result, the checklist ticks off, and the dashed loop feeds back. */
export const talkNActOverlay: HeroOverlayConfig = {
  width: 1536,
  height: 1024,
  period: 10,
  paths: [
    { id: "i1", pts: [[447, 289], [500, 295], [515, 380], [540, 460], [590, 483], [605, 483]], color: BLUE, r: 11, tail: 3, travel: 0.25, phase: 0 },
    { id: "i2", pts: [[447, 484], [520, 484], [605, 483]], color: INDIGO, r: 11, tail: 3, travel: 0.25, phase: 0.97 },
    { id: "i3", pts: [[447, 688], [500, 680], [515, 600], [540, 510], [580, 486], [605, 483]], color: VIOLET, r: 11, tail: 3, travel: 0.25, phase: 0.94 },
    { id: "out", pts: [[940, 483], [985, 483], [1022, 483]], color: INDIGO, r: 11, tail: 3, travel: 0.15, phase: 0.7 },
    { id: "loop", pts: [[1265, 865], [1240, 898], [1100, 905], [900, 905], [800, 892], [778, 810]], color: VIOLET, r: 10, tail: 4, travel: 0.26, phase: 0.28 },
  ],
  pulses: [
    { x: 780, y: 483, r: 150, color: INDIGO, at: 0.3 },
    { x: 1400, y: 260, r: 30, color: BLUE, at: 0.46 },
    { x: 1400, y: 428, r: 30, color: VIOLET, at: 0.54 },
    { x: 1400, y: 600, r: 30, color: BLUE, at: 0.62 },
    { x: 1400, y: 772, r: 30, color: VIOLET, at: 0.7 },
    { x: 655, y: 745, r: 28, color: INDIGO, at: 0.95 },
  ],
  glows: [
    { x: 780, y: 483, r: 300, color: "#6d5cf0", strength: 0.22, phase: 0.2 },
    { x: 1250, y: 520, r: 330, color: "#7c6cf0", strength: 0.1, phase: 0.45 },
  ],
  float: 6,
};
