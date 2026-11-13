import type { HeroOverlayConfig } from "../heroOverlay.types";

/** Documents flow into the AI spark, personas come alive one by one, the chat bar answers. */
export const personaAiOverlay: HeroOverlayConfig = {
  width: 1254,
  height: 1040,
  period: 10,
  paths: [
    { id: "d1", pts: [[308, 150], [350, 165], [366, 250], [372, 328], [395, 358], [412, 385]], color: "#ef4444", r: 9, tail: 3, travel: 0.3, phase: 0 },
    { id: "d2", pts: [[263, 278], [300, 285], [325, 330], [350, 380], [398, 410]], color: "#16a34a", r: 9, tail: 3, travel: 0.3, phase: 0.97 },
    { id: "d3", pts: [[270, 378], [310, 385], [340, 410], [378, 420]], color: "#2563eb", r: 9, tail: 3, travel: 0.3, phase: 0.94 },
    { id: "d4", pts: [[281, 558], [325, 530], [350, 470], [380, 440]], color: "#6366f1", r: 9, tail: 3, travel: 0.3, phase: 0.91 },
    { id: "d5", pts: [[362, 607], [385, 560], [397, 500], [405, 465]], color: "#8b5cf6", r: 9, tail: 3, travel: 0.3, phase: 0.88 },
  ],
  pulses: [
    { x: 415, y: 425, r: 75, color: "#5b6cf5", at: 0.32 },
    { x: 531, y: 510, r: 30, color: "#3b82f6", at: 0.42 },
    { x: 787, y: 355, r: 30, color: "#f59e0b", at: 0.52 },
    { x: 972, y: 505, r: 30, color: "#8b5cf6", at: 0.62 },
    { x: 1065, y: 663, r: 40, color: "#2563eb", at: 0.76 },
  ],
  glows: [
    { x: 415, y: 425, r: 150, color: "#6d7cff", strength: 0.35, phase: 0.2 },
    { x: 610, y: 320, r: 190, color: "#60a5fa", strength: 0.16, phase: 0.42 },
    { x: 840, y: 200, r: 170, color: "#fbbf24", strength: 0.2, phase: 0.52 },
    { x: 1070, y: 330, r: 190, color: "#a78bfa", strength: 0.16, phase: 0.62 },
    { x: 780, y: 860, r: 280, color: "#60a5fa", strength: 0.1, phase: 0.8 },
  ],
  float: 6,
};
