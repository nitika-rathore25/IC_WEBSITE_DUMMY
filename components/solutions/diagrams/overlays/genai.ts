import type { HeroOverlayConfig } from "../heroOverlay.types";

const BLUE = "#2f7cf0";
const GREEN = "#1fb58a";
const ORANGE = "#f59a47";
const INDIGO = "#6d6df0";
const LILAC = "#8c8cf5";

/** Knowledge, systems and workflows flow into GenAI; GenAI fans out to four outcomes. */
export const genaiOverlay: HeroOverlayConfig = {
  width: 1217,
  height: 1076,
  period: 9,
  paths: [
    { id: "t1", pts: [[250, 316], [262, 350], [300, 375], [400, 376], [450, 385], [487, 425]], color: BLUE, tail: 3, travel: 0.4, phase: 0 },
    { id: "t2", pts: [[603, 308], [603, 364], [603, 410]], color: GREEN, tail: 3, travel: 0.3, phase: 0.97 },
    { id: "t3", pts: [[957, 315], [950, 360], [920, 375], [800, 376], [740, 395], [720, 425]], color: ORANGE, tail: 3, travel: 0.4, phase: 0.94 },
    { id: "b1", pts: [[548, 655], [530, 685], [490, 698], [300, 698], [190, 705], [165, 735], [160, 760]], color: LILAC, tail: 3, travel: 0.4, phase: 0.5 },
    { id: "b2", pts: [[603, 668], [580, 698], [520, 707], [465, 720], [449, 755]], color: INDIGO, tail: 3, travel: 0.4, phase: 0.47 },
    { id: "b3", pts: [[603, 668], [630, 700], [700, 710], [745, 725], [757, 755]], color: INDIGO, tail: 3, travel: 0.4, phase: 0.44 },
    { id: "b4", pts: [[658, 655], [675, 685], [720, 697], [950, 698], [1020, 712], [1048, 757]], color: LILAC, tail: 3, travel: 0.4, phase: 0.41 },
  ],
  pulses: [
    { x: 603, y: 490, r: 90, color: INDIGO, at: 0.4 },
    { x: 603, y: 490, r: 90, color: INDIGO, at: 0.9 },
  ],
  glows: [
    { x: 603, y: 490, r: 240, color: "#6d6df0", strength: 0.35, phase: 0.45 },
    { x: 155, y: 880, r: 140, color: BLUE, strength: 0.16, phase: 0.55 },
    { x: 455, y: 880, r: 140, color: INDIGO, strength: 0.16, phase: 0.62 },
    { x: 760, y: 880, r: 140, color: GREEN, strength: 0.16, phase: 0.69 },
    { x: 1060, y: 880, r: 140, color: ORANGE, strength: 0.16, phase: 0.76 },
  ],
  float: 6,
};
