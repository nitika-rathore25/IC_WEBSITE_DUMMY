export type Pt = readonly [number, number];

/**
 * Smooth SVG path that passes through every point (Catmull-Rom → cubic Bézier).
 * Lets a diagram be described by "the points a line goes through" instead of
 * hand-written curve handles.
 */
export function splinePath(pts: readonly Pt[]): string {
  if (pts.length < 2) return "";
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Points along an SVG path, evenly spaced by length (used for travelling dots). */
export function samplePath(path: SVGGeometryElement, samples: number): { x: number; y: number }[] {
  const len = path.getTotalLength();
  return Array.from({ length: samples + 1 }, (_, i) => {
    const p = path.getPointAtLength((len * i) / samples);
    return { x: p.x, y: p.y };
  });
}
