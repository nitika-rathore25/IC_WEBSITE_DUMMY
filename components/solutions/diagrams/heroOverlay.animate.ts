import type { HeroOverlayConfig } from "./heroOverlay.types";
import { samplePath } from "./spline";

const tr = (p: { x: number; y: number }) => `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;

/**
 * Motion for <HeroOverlay />. Every element runs on its own endless clock
 * (so there is no visible "restart"), and every overlay element is invisible
 * until its animation starts, so with reduced motion only the picture shows.
 * Elements are found by `data-k` (kind) and `data-n` (id).
 */
export function buildOverlayAnimations(root: Element, cfg: HeroOverlayConfig): Animation[] {
  const out: Animation[] = [];
  const all = (k: string) => Array.from(root.querySelectorAll<SVGElement>(`[data-k="${k}"]`));

  // Dots (and their tails) running along the lines
  (cfg.paths ?? []).forEach((p) => {
    const path = root.querySelector<SVGGeometryElement>(`[data-k="path"][data-n="${p.id}"]`);
    if (!path || typeof path.getTotalLength !== "function") return;
    const samples = samplePath(path, 48);
    if (p.reverse) samples.reverse();
    const period = (p.period ?? cfg.period) * 1000;
    const travel = p.travel ?? 0.75;
    const dots = p.dots ?? 1;
    const tail = p.tail ?? 0;

    const keys: Keyframe[] = [{ offset: 0, opacity: 0, transform: tr(samples[0]) }];
    samples.forEach((s, i) => {
      const t = (i / (samples.length - 1)) * travel;
      const edge = i < 3 ? i / 3 : i > samples.length - 4 ? (samples.length - 1 - i) / 3 : 1;
      keys.push({ offset: t, opacity: edge, transform: tr(s) });
    });
    keys.push({ offset: 1, opacity: 0, transform: tr(samples[samples.length - 1]) });

    root.querySelectorAll<SVGElement>(`[data-k="dot"][data-p="${p.id}"]`).forEach((el) => {
      const d = Number(el.dataset.d); // which dot
      const tl = Number(el.dataset.t); // which tail step (0 = the dot itself)
      const phase = (p.phase ?? 0) + d / dots - (tl * 0.035) / Math.max(travel, 0.1);
      const fade = tail ? 1 - tl / (tail + 1) : 1;
      out.push(
        el.animate(
          keys.map((k) => ({ ...k, opacity: Number(k.opacity) * fade })),
          { duration: period, iterations: Infinity, delay: -(((phase % 1) + 1) % 1) * period, easing: "linear" },
        ),
      );
    });
  });

  // Rings that spread out from a point
  all("pulse").forEach((el) => {
    const i = Number(el.dataset.n);
    const pu = (cfg.pulses ?? [])[i];
    if (!pu) return;
    const dur = cfg.period * 1000;
    out.push(
      el.animate(
        [
          { offset: 0, opacity: 0, transform: "scale(0.5)" },
          { offset: 0.04, opacity: 0.65 },
          { offset: 0.2, opacity: 0, transform: "scale(2)" },
          { offset: 1, opacity: 0, transform: "scale(2)" },
        ],
        { duration: dur, iterations: pu.repeat === false ? 1 : Infinity, delay: (pu.at ?? 0) * dur, easing: "ease-out" },
      ),
    );
  });

  // Soft glows that breathe
  all("glow").forEach((el) => {
    const g = (cfg.glows ?? [])[Number(el.dataset.n)];
    if (!g) return;
    const dur = cfg.period * 1000;
    const peak = g.strength ?? 0.6;
    out.push(
      el.animate([{ opacity: 0 }, { opacity: peak }, { opacity: 0 }], {
        duration: dur,
        iterations: Infinity,
        delay: -((g.phase ?? 0) % 1) * dur,
        easing: "ease-in-out",
      }),
    );
  });

  // Gentle drift of the whole picture
  const pic = root.querySelector<HTMLElement>('[data-k="picture"]');
  if (pic && cfg.float) {
    out.push(
      pic.animate([{ transform: "translateY(0px)" }, { transform: `translateY(${-cfg.float}px)` }, { transform: "translateY(0px)" }], {
        duration: cfg.period * 700,
        iterations: Infinity,
        easing: "ease-in-out",
      }),
    );
  }

  return out;
}
