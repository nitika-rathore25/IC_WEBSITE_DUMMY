import { researchNetwork as cfg } from "./researchNetwork.config";
import { samplePath } from "./spline";

type Cfg = typeof cfg;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const tr = (p: { x: number; y: number }) => `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;

/** 0 → 1 opacity across [a, b], then hold. `from`/`to` add extra properties. */
function fade(a: number, b: number, from: Keyframe = {}, to: Keyframe = {}): Keyframe[] {
  return [
    { offset: 0, opacity: 0, ...from },
    { offset: clamp(a), opacity: 0, ...from },
    { offset: clamp(b), opacity: 1, ...to },
    { offset: 1, opacity: 1, ...to },
  ];
}

/**
 * Builds every Web Animation for the Research hero. One loop of
 * `cfg.duration` seconds: the network builds up, dots start travelling, then
 * the whole stage fades and restarts. The faint extras (turning rings,
 * floating circles, breathing halos) run on their own clocks.
 * Elements are found by `data-k` (kind) and `data-n` (id).
 */
export function buildResearchAnimations(root: Element, c: Cfg = cfg): Animation[] {
  const ms = c.duration * 1000;
  const loop: KeyframeAnimationOptions = { duration: ms, iterations: Infinity, fill: "both", easing: "linear" };
  const out: Animation[] = [];
  const q = (k: string, n?: string | number) =>
    root.querySelector<SVGElement>(`[data-k="${k}"]${n !== undefined ? `[data-n="${n}"]` : ""}`);
  const run = (el: Element | null, keys: Keyframe[], opts: KeyframeAnimationOptions = loop) => {
    if (el) out.push(el.animate(keys, opts));
  };

  // ── Whole stage fades out at the end of the loop
  run(q("stage"), [
    { offset: 0, opacity: 1 },
    { offset: c.fadeOut[0], opacity: 1 },
    { offset: c.fadeOut[1], opacity: 0 },
    { offset: 1, opacity: 0 },
  ]);

  // ── Researcher + rings
  run(q("hub"), fade(0, 0.1, { transform: "scale(0.9)" }, { transform: "scale(1)" }));
  const ripple = (i: number): Keyframe[] => {
    const keys: Keyframe[] = [{ offset: 0, opacity: 0, transform: "scale(0.8)" }];
    const pulses = 3;
    const start = 0.14 + i * 0.07;
    const span = (c.fadeOut[0] - start) / pulses;
    for (let p = 0; p < pulses; p++) {
      const s = start + p * span;
      keys.push(
        { offset: clamp(s), opacity: 0, transform: "scale(0.8)" },
        { offset: clamp(s + span * 0.25), opacity: 0.5 },
        { offset: clamp(s + span * 0.95), opacity: 0, transform: "scale(1.75)" },
      );
    }
    keys.push({ offset: 1, opacity: 0, transform: "scale(1.75)" });
    return keys;
  };
  run(q("ripple", 0), ripple(0));
  run(q("ripple", 1), ripple(1));

  // ── Lines: solid ones draw themselves, dashed ones fade in
  c.curves.forEach((cv) => {
    const [a, b] = cv.appear;
    if (cv.dashed) {
      run(q("curve", cv.id), fade(a, b));
    } else {
      run(q("curve", cv.id), [
        { offset: 0, strokeDashoffset: 1 },
        { offset: clamp(a), strokeDashoffset: 1 },
        { offset: clamp(b), strokeDashoffset: 0 },
        { offset: 1, strokeDashoffset: 0 },
      ]);
    }

    // Dot that runs along the line
    const dot = q("trav", cv.id);
    const path = q("curve", cv.id) as unknown as SVGGeometryElement | null;
    if (dot && path && cv.travel && typeof path.getTotalLength === "function") {
      const pts = samplePath(path, 36);
      if (cv.travel.reverse) pts.reverse();
      const { start, passes } = cv.travel;
      const span = (c.fadeOut[0] - 0.02 - start) / passes;
      const keys: Keyframe[] = [{ offset: 0, opacity: 0, transform: tr(pts[0]) }];
      for (let p = 0; p < passes; p++) {
        const s = start + p * span;
        const e = s + span * 0.78;
        keys.push({ offset: clamp(s), opacity: 0, transform: tr(pts[0]) });
        pts.forEach((pt, i) => {
          const t = s + ((e - s) * i) / (pts.length - 1);
          const edge = i === 0 ? 0 : i === pts.length - 1 ? 0 : 1;
          keys.push({ offset: clamp(t), opacity: edge, transform: tr(pt) });
        });
      }
      keys.push({ offset: 1, opacity: 0, transform: tr(pts[pts.length - 1]) });
      run(dot, keys);
    }
  });

  // ── Nodes pop in, labels slide out
  c.nodes.forEach((n) => {
    const [a, b] = n.appear;
    run(q("node", n.id), fade(a, b, { transform: "scale(0.2)" }, { transform: "scale(1)" }));
    if (n.pill) {
      const pa = b - 0.01;
      run(q("pill", n.id), fade(pa, pa + 0.07, { transform: "translateX(" + (n.pill.x < n.x ? 14 : -14) + "px)" }, { transform: "translateX(0px)" }));
    }
  });

  // ── Charts
  const { donut, bars, line } = c;
  run(q("card", "donut"), fade(donut.appear[0], donut.appear[1], { transform: "translateY(14px)" }, { transform: "translateY(0px)" }));
  donut.segments.forEach((s, i) => {
    const a = donut.appear[1] + i * 0.012;
    const final = `${s.len} ${100 - s.len}`;
    run(q("seg", i), [
      { offset: 0, strokeDasharray: "0 100" },
      { offset: clamp(a), strokeDasharray: "0 100" },
      { offset: clamp(a + 0.06), strokeDasharray: final },
      { offset: 1, strokeDasharray: final },
    ]);
  });
  donut.rows.forEach((_, i) => {
    const a = donut.appear[1] + 0.04 + i * 0.015;
    run(q("row", i), fade(a, a + 0.05));
  });

  run(q("card", "bars"), fade(bars.appear[0], bars.appear[1], { transform: "translateY(14px)" }, { transform: "translateY(0px)" }));
  bars.items.forEach((_, i) => {
    const a = bars.appear[1] + i * 0.016;
    run(q("bar", i), [
      { offset: 0, transform: "scaleY(0)" },
      { offset: clamp(a), transform: "scaleY(0)" },
      { offset: clamp(a + 0.06), transform: "scaleY(1)" },
      // gentle "breathing" of the chart once it has grown
      { offset: clamp(a + 0.3), transform: `scaleY(${0.88 + (i % 3) * 0.04})` },
      { offset: clamp(a + 0.55), transform: "scaleY(1)" },
      { offset: 1, transform: "scaleY(1)" },
    ]);
  });

  run(q("card", "line"), fade(line.appear[0], line.appear[1], { transform: "translateY(14px)" }, { transform: "translateY(0px)" }));
  const spark = q("spark");
  run(spark, [
    { offset: 0, strokeDashoffset: 1 },
    { offset: clamp(line.appear[1]), strokeDashoffset: 1 },
    { offset: clamp(line.appear[1] + 0.1), strokeDashoffset: 0 },
    { offset: 1, strokeDashoffset: 0 },
  ]);
  const sparkDot = q("spark-dot");
  const sparkPath = spark as unknown as SVGGeometryElement | null;
  if (sparkDot && sparkPath && typeof sparkPath.getTotalLength === "function") {
    const pts = samplePath(sparkPath, 30);
    const s0 = line.appear[1] + 0.1;
    const keys: Keyframe[] = [{ offset: 0, opacity: 0, transform: tr(pts[0]) }, { offset: clamp(s0), opacity: 0, transform: tr(pts[0]) }];
    const passes = 2;
    const span = (c.fadeOut[0] - 0.03 - s0) / passes;
    for (let p = 0; p < passes; p++) {
      pts.forEach((pt, i) => {
        keys.push({ offset: clamp(s0 + p * span + (span * 0.9 * i) / (pts.length - 1)), opacity: 1, transform: tr(pt) });
      });
    }
    keys.push({ offset: 1, opacity: 1, transform: tr(pts[pts.length - 1]) });
    run(sparkDot, keys);
  }

  // ── Independent "alive" motion (own clocks, not tied to the loop)
  root.querySelectorAll<SVGElement>('[data-k="halo"]').forEach((el, i) => {
    const d = 2600 + (i % 4) * 500;
    out.push(el.animate([{ opacity: 0.55 }, { opacity: 1 }, { opacity: 0.55 }], { duration: d, iterations: Infinity, delay: -((i * 613) % d), easing: "ease-in-out" }));
  });
  root.querySelectorAll<SVGElement>('[data-k="orbit"]').forEach((el, i) => {
    out.push(el.animate([{ transform: "rotate(0deg)" }, { transform: `rotate(${i % 2 ? -360 : 360}deg)` }], { duration: 90000 - i * 18000, iterations: Infinity, easing: "linear" }));
  });
  root.querySelectorAll<SVGElement>('[data-k="decor"]').forEach((el, i) => {
    const d = 6000 + (i % 3) * 1500;
    out.push(el.animate([{ transform: "translateY(0px)" }, { transform: `translateY(${i % 2 ? -9 : 9}px)` }, { transform: "translateY(0px)" }], { duration: d, iterations: Infinity, delay: -((i * 1100) % d), easing: "ease-in-out" }));
  });

  return out;
}
