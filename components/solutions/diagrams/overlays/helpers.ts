import type { OverlayPath, OverlayPulse } from "../heroOverlay.types";
import type { Pt } from "../spline";

export interface Leg {
  id: string;
  pts: Pt[];
  color: string;
  /** Which turn in the relay this leg runs in (0 … slots-1). Legs sharing a slot run together. */
  slot: number;
}

/**
 * Dots that hand over one after another, like a baton: leg 0 runs first, then
 * leg 1 … Each leg is given an equal share of the loop.
 */
export function relay(legs: Leg[], slots: number, opts: { r?: number; tail?: number } = {}): OverlayPath[] {
  return legs.map((l) => ({
    id: l.id,
    pts: l.pts,
    color: l.color,
    r: opts.r ?? 8,
    tail: opts.tail ?? 3,
    travel: 1 / slots,
    phase: (1 - l.slot / slots) % 1,
  }));
}

/** A ring that spreads from a point at the moment the relay reaches slot `slot`. */
export function arrivalPulse(x: number, y: number, r: number, color: string, slot: number, slots: number): OverlayPulse {
  return { x, y, r, color, at: (slot % slots) / slots };
}

/** Points around a circle, for a dot that orbits something. */
export function circlePts(cx: number, cy: number, r: number, n = 12, start = -Math.PI / 2): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
}
