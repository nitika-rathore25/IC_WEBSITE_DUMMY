"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { useLoopingAnimations } from "@/hooks/useLoopingAnimations";
import { buildOverlayAnimations } from "./heroOverlay.animate";
import type { HeroOverlayConfig } from "./heroOverlay.types";
import { splinePath } from "./spline";

interface Props {
  image: { src: string; alt: string };
  config: HeroOverlayConfig;
  className?: string;
  /** Multiply the picture into the section (default). Off when the section already uses the picture's backdrop colour. */
  blend?: boolean;
}

/**
 * A finished hero picture with motion laid over it: dots that run along the
 * lines already drawn in the picture, rings that spread from key points and
 * soft glows that breathe. One component for every solution page — each page
 * only supplies a config (see `./overlays/`). With reduced motion, or before
 * scripts load, only the picture shows.
 */
export function HeroOverlay({ image, config, className = "", blend = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  useLoopingAnimations(ref, (root) => buildOverlayAnimations(root, config), [config]);

  const { width, height } = config;
  const hidden = { opacity: 0 } as const;
  const own = { transformBox: "fill-box", transformOrigin: "center", opacity: 0 } as const;

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <div data-k="picture" className={`relative ${blend ? "mix-blend-multiply" : ""}`}>
        <Image src={image.src} alt={image.alt} width={width} height={height} priority className="h-auto w-full" />
        <svg viewBox={`0 0 ${width} ${height}`} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            {(config.glows ?? []).map((g, i) => (
              <radialGradient key={i} id={`${uid}-g${i}`}>
                <stop offset="0" stopColor={g.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={g.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {(config.glows ?? []).map((g, i) => (
            <circle key={i} data-k="glow" data-n={i} cx={g.x} cy={g.y} r={g.r} fill={`url(#${uid}-g${i})`} style={hidden} />
          ))}

          {(config.pulses ?? []).map((p, i) => (
            <circle key={i} data-k="pulse" data-n={i} cx={p.x} cy={p.y} r={p.r} fill="none" stroke={p.color} strokeWidth={Math.max(2, p.r / 7)} style={own} />
          ))}

          {/* Invisible guides the dots follow */}
          {(config.paths ?? []).map((p) => (
            <path key={p.id} data-k="path" data-n={p.id} d={splinePath(p.pts)} fill="none" stroke="none" />
          ))}

          {(config.paths ?? []).flatMap((p) => {
            const dots = p.dots ?? 1;
            const tail = p.tail ?? 0;
            const r = p.r ?? 7;
            return Array.from({ length: dots * (tail + 1) }, (_, n) => {
              const d = Math.floor(n / (tail + 1));
              const t = n % (tail + 1);
              return (
                <circle
                  key={`${p.id}-${d}-${t}`}
                  data-k="dot"
                  data-p={p.id}
                  data-d={d}
                  data-t={t}
                  cx={0}
                  cy={0}
                  r={r * (1 - t * 0.14)}
                  fill={p.color}
                  stroke="#fff"
                  strokeWidth={r / 4}
                  style={hidden}
                />
              );
            });
          })}
        </svg>
      </div>
    </div>
  );
}
