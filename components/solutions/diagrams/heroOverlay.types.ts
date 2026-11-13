import type { Pt } from "./spline";

/**
 * Animation laid over a finished hero picture. All coordinates are in the
 * picture's own pixels (the width / height of the image file), so a config
 * can be written by reading positions straight off the picture.
 */
export interface OverlayPath {
  id: string;
  /** Points the dots run through. Put them on the lines drawn in the picture. */
  pts: Pt[];
  color: string;
  /** Dot radius, in picture pixels. */
  r?: number;
  /** How many dots run along this line at once (spread evenly). Default 1. */
  dots?: number;
  /** Trail dots behind each dot, getting fainter. Default 0. */
  tail?: number;
  /** Seconds for one trip along the line. Default `config.period`. */
  period?: number;
  /** 0–1: where in the cycle the first dot starts. Default 0. */
  phase?: number;
  /** Share of the cycle the dot is travelling (rest is hidden). Default 0.75. */
  travel?: number;
  /** Run from the last point to the first. */
  reverse?: boolean;
}

export interface OverlayPulse {
  x: number;
  y: number;
  /** Ring radius at its largest is about 2x this. */
  r: number;
  color: string;
  /** 0–1: when in the loop the ring fires. Default 0. */
  at?: number;
  /** Fire again every loop (default true). */
  repeat?: boolean;
}

export interface OverlayGlow {
  x: number;
  y: number;
  r: number;
  color: string;
  /** 0–1 peak strength. Default 0.6. */
  strength?: number;
  /** 0–1 offset in the loop, so neighbours do not breathe together. */
  phase?: number;
}

export interface HeroOverlayConfig {
  /** Picture size in pixels. */
  width: number;
  height: number;
  /** Seconds for one loop; pulses and glows follow it. */
  period: number;
  paths?: OverlayPath[];
  pulses?: OverlayPulse[];
  glows?: OverlayGlow[];
  /** Very gentle up-and-down drift of the picture, in picture pixels. */
  float?: number;
}
