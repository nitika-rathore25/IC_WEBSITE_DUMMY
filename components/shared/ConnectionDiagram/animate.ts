import type { ConnectionDiagramConfig, Point, Box } from "./config";

/** Position on a rounded rectangle's outline for t in [0,1) (clockwise from top-left). */
export function pointOnRoundedRect(box: Box, radius: number, t: number): Point {
  const { x, y, w, h } = box;
  const r = Math.min(radius, w / 2, h / 2);
  const sw = w - 2 * r; // straight horizontal length
  const sh = h - 2 * r; // straight vertical length
  const arc = (Math.PI * r) / 2;
  const total = 2 * sw + 2 * sh + 4 * arc;
  let d = (((t % 1) + 1) % 1) * total;
  const seg = (len: number) => {
    if (d <= len) return true;
    d -= len;
    return false;
  };
  if (seg(sw)) return { x: x + r + d, y };
  if (seg(arc)) { const a = d / r; return { x: x + w - r + Math.sin(a) * r, y: y + r - Math.cos(a) * r }; }
  if (seg(sh)) return { x: x + w, y: y + r + d };
  if (seg(arc)) { const a = d / r; return { x: x + w - r + Math.cos(a) * r, y: y + h - r + Math.sin(a) * r }; }
  if (seg(sw)) return { x: x + w - r - d, y: y + h };
  if (seg(arc)) { const a = d / r; return { x: x + r - Math.sin(a) * r, y: y + h - r + Math.cos(a) * r }; }
  if (seg(sh)) return { x, y: y + h - r - d };
  const a = d / r;
  return { x: x + r - Math.cos(a) * r, y: y + r - Math.sin(a) * r };
}

const tr = (p: Point) => `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px)`;
const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Opacity 0 → 1 across [a, b], hold, (optional extra props per key). */
function fade(a: number, b: number, from: Keyframe = {}, to: Keyframe = {}): Keyframe[] {
  return [
    { offset: 0, opacity: 0, ...from },
    { offset: clamp(a), opacity: 0, ...from },
    { offset: clamp(b), opacity: 1, ...to },
    { offset: 1, opacity: 1, ...to },
  ];
}

/**
 * Builds every Web Animation for a ConnectionDiagram. All animations share the
 * same loop `duration`, so they stay in sync; ambient dots use their own cycle.
 * Elements are found by `data-k` (kind) and `data-n` (node id / index).
 */
export function buildAnimations(root: HTMLElement, cfg: ConnectionDiagramConfig): Animation[] {
  const ms = cfg.duration * 1000;
  const loop = { duration: ms, iterations: Infinity, fill: "both" as FillMode, easing: "linear" };
  const out: Animation[] = [];
  const q = (kind: string, n?: string | number) =>
    root.querySelector<HTMLElement | SVGElement>(`[data-k="${kind}"]${n !== undefined ? `[data-n="${n}"]` : ""}`);
  const run = (el: Element | null, keyframes: Keyframe[], opts: KeyframeAnimationOptions = loop) => {
    if (el) out.push(el.animate(keyframes, opts));
  };

  // Whole stage fades out at the end of the loop, then restarts.
  run(q("stage"), [
    { offset: 0, opacity: 1 },
    { offset: cfg.fadeOut[0], opacity: 1 },
    { offset: cfg.fadeOut[1], opacity: 0 },
    { offset: 1, opacity: 0 },
  ]);

  cfg.nodes.forEach((n) => {
    const [a, b] = n.appear;
    run(q("card", n.id), fade(a, b, { transform: "translateY(10px)" }, { transform: "translateY(0px)" }));
    run(q("anchor", n.id), fade(b, b + 0.04, { transform: "scale(0)" }, { transform: "scale(1)" }));

    // Dashed link "draws" in through a mask.
    const d0 = b + 0.03;
    const d1 = d0 + cfg.linkDraw;
    run(q("draw", n.id), [
      { offset: 0, strokeDashoffset: 1 },
      { offset: clamp(d0), strokeDashoffset: 1 },
      { offset: clamp(d1), strokeDashoffset: 0 },
      { offset: 1, strokeDashoffset: 0 },
    ]);

    // Dot that travels anchor → hub, a few times per loop.
    const { start, end, passes } = cfg.travel;
    const span = (end - start) / passes;
    const keys: Keyframe[] = [{ offset: 0, opacity: 0, transform: tr(n.anchor) }];
    for (let i = 0; i < passes; i++) {
      const s = start + i * span + (cfg.nodes.indexOf(n) * span) / (cfg.nodes.length * 2);
      const e = s + span * 0.7;
      keys.push(
        { offset: clamp(s), opacity: 0, transform: tr(n.anchor) },
        { offset: clamp(s + (e - s) * 0.12), opacity: 1 },
        { offset: clamp(e - (e - s) * 0.12), opacity: 1 },
        { offset: clamp(e), opacity: 0, transform: tr(n.hubPoint) },
      );
    }
    keys.push({ offset: 1, opacity: 0, transform: tr(n.hubPoint) });
    run(q("trav", n.id), keys);
  });

  // Hub card + glow
  const [ha, hb] = cfg.hub.appear;
  run(q("hub"), fade(ha, hb, { transform: "scale(0.94)" }, { transform: "scale(1)" }));
  const glow: Keyframe[] = [{ offset: 0, opacity: 0 }, { offset: clamp(hb), opacity: 0 }];
  const pulses = 3;
  const gs = (cfg.fadeOut[0] - hb) / pulses;
  for (let i = 0; i < pulses; i++) {
    glow.push({ offset: clamp(hb + i * gs + gs * 0.5), opacity: 1 }, { offset: clamp(hb + (i + 1) * gs), opacity: 0.15 });
  }
  glow.push({ offset: 1, opacity: 0 });
  run(q("glow"), glow);

  // Orbit particles — only after the hub has appeared.
  run(q("orbit"), fade(hb, hb + 0.05));
  const SAMPLES = 40;
  const hubBox = cfg.hub.box;
  cfg.orbit.forEach((p, i) => {
    const keys: Keyframe[] = [];
    for (let s = 0; s <= SAMPLES; s++) {
      const t = s / SAMPLES;
      keys.push({ offset: t, transform: tr(pointOnRoundedRect(hubBox, 16, p.phase + t * p.laps)) });
    }
    run(q("orb", i), keys);
  });

  // Ambient twinkle — independent of the loop, staggered per dot.
  root.querySelectorAll<SVGElement>('[data-k="amb"]').forEach((el, i) => {
    const d = 2200 + (i % 5) * 450;
    out.push(
      el.animate([{ opacity: 0.25 }, { opacity: 1 }, { opacity: 0.25 }], {
        duration: d,
        iterations: Infinity,
        delay: -((i * 397) % d),
        easing: "ease-in-out",
      }),
    );
  });

  return out;
}
