"use client";

import { useId, useRef } from "react";
import { useLoopingAnimations } from "@/hooks/useLoopingAnimations";
import { researchNetwork as cfg, HUB, SIZE } from "./researchNetwork.config";
import { buildResearchAnimations } from "./researchNetwork.animate";
import { splinePath } from "./spline";

/** {x, y, w, h} → SVG rect attributes. */
const box = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => ({ x, y, width: w, height: h });

/** Elements that scale/rotate around their own centre. */
const own = { transformBox: "fill-box", transformOrigin: "center" } as const;

interface Props {
  className?: string;
  label?: string;
}

/**
 * Animated hero for the Research Services page: a researcher at the centre of
 * a network of Consumer · Behavior · Insight · Strategy, with three small
 * charts that draw themselves. Everything is drawn from `researchNetwork.config.ts`;
 * the motion lives in `researchNetwork.animate.ts`; start / pause / reduced-motion
 * handling is the shared `useLoopingAnimations` hook. With motion turned off the
 * finished picture is shown.
 */
export function ResearchNetworkDiagram({
  className = "",
  label = "A researcher at the centre of a network linking consumer, behavior, insight and strategy",
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  useLoopingAnimations(ref, (root) => buildResearchAnimations(root), []);

  const { donut, bars, line } = cfg;
  const circ = 2 * Math.PI * donut.r;
  let offset = 0;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SIZE.w} ${SIZE.h}`}
      role="img"
      aria-label={label}
      className={`h-auto w-full select-none ${className}`}
    >
      <defs>
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#1a2a6c" floodOpacity="0.1" />
        </filter>
        <clipPath id={`${uid}-face`}>
          <circle cx={HUB.x} cy={HUB.y} r={67} />
        </clipPath>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="55%" stopColor="#cfe3fb" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#cfe3fb" stopOpacity="0" />
        </radialGradient>
        {cfg.curves.map((cv) =>
          Array.isArray(cv.color) ? (
            <linearGradient
              key={cv.id}
              id={`${uid}-${cv.id}`}
              gradientUnits="userSpaceOnUse"
              x1={cv.pts[0][0]}
              y1={cv.pts[0][1]}
              x2={cv.pts[cv.pts.length - 1][0]}
              y2={cv.pts[cv.pts.length - 1][1]}
            >
              <stop offset="0" stopColor={cv.color[0]} />
              <stop offset="1" stopColor={cv.color[1]} />
            </linearGradient>
          ) : null,
        )}
      </defs>

      {/* Soft background circles — float gently, always on */}
      {cfg.decor.map((d, i) => (
        <circle key={i} data-k="decor" data-n={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={d.opacity} />
      ))}

      <g data-k="stage">
        {/* Faint dashed rings around the researcher */}
        {cfg.orbits.map((r, i) => (
          <circle
            key={r}
            data-k="orbit"
            data-n={i}
            cx={HUB.x}
            cy={HUB.y}
            r={r}
            fill="none"
            stroke="#c9d6ec"
            strokeWidth={1.2}
            strokeDasharray="3 8"
            opacity={0.8}
            style={{ transformBox: "view-box", transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          />
        ))}

        {/* Lines */}
        <g fill="none" strokeLinecap="round">
          {cfg.curves.map((cv) => (
            <path
              key={cv.id}
              data-k="curve"
              data-n={cv.id}
              d={splinePath(cv.pts)}
              stroke={Array.isArray(cv.color) ? `url(#${uid}-${cv.id})` : cv.color}
              strokeWidth={cv.width}
              opacity={cv.opacity ?? 1}
              {...(cv.dashed ? { strokeDasharray: "5 7" } : { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 0 })}
            />
          ))}
        </g>

        {/* Labels */}
        {cfg.nodes.map((n) =>
          n.pill ? (
            <g key={n.id} data-k="pill" data-n={n.id}>
              <rect x={n.pill.x} y={n.pill.y} width={n.pill.w} height={n.pill.h} rx={n.pill.h / 2} fill={n.pill.fill} />
              <text
                x={n.pill.x + n.pill.w / 2}
                y={n.pill.y + n.pill.h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={21}
                fontWeight={600}
                fill="#14205b"
                style={{ fontFamily: "inherit" }}
              >
                {n.pill.label}
              </text>
            </g>
          ) : null,
        )}

        {/* Dots */}
        {cfg.nodes.map((n) => (
          <g key={n.id} data-k="node" data-n={n.id} style={own}>
            <circle data-k="halo" cx={n.x} cy={n.y} r={n.halo.r} fill={n.halo.color} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
          </g>
        ))}

        {/* Chart: donut */}
        <g data-k="card" data-n="donut">
          <rect {...box(donut.card)} rx={16} fill="#fff" filter={`url(#${uid}-shadow)`} />
          <g transform={`rotate(-90 ${donut.center.x} ${donut.center.y})`}>
            {donut.segments.map((s, i) => {
              const el = (
                <circle
                  key={i}
                  data-k="seg"
                  data-n={i}
                  cx={donut.center.x}
                  cy={donut.center.y}
                  r={donut.r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={donut.stroke}
                  pathLength={100}
                  strokeDasharray={`${s.len} ${100 - s.len}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += s.len;
              return el;
            })}
          </g>
          {donut.rows.map((r, i) => (
            <g key={i} data-k="row" data-n={i}>
              <circle cx={245} cy={r.y} r={5.5} fill={r.dot} />
              <rect x={260} y={r.y - 5} width={i === 1 ? 62 : 66} height={10} rx={5} fill="#e6e9f1" />
            </g>
          ))}
        </g>

        {/* Chart: bars */}
        <g data-k="card" data-n="bars">
          <rect {...box(bars.card)} rx={16} fill="#fff" filter={`url(#${uid}-shadow)`} />
          {bars.items.map(([x, h, color], i) => (
            <rect
              key={x}
              data-k="bar"
              data-n={i}
              x={x}
              y={bars.baseline - h}
              width={13}
              height={h}
              rx={3}
              fill={color}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            />
          ))}
        </g>

        {/* Chart: line */}
        <g data-k="card" data-n="line">
          <rect {...box(line.card)} rx={16} fill="#fff" filter={`url(#${uid}-shadow)`} />
          <rect {...box(line.panel)} rx={8} fill="#f1f0fb" />
          <path
            data-k="spark"
            d={splinePath(line.pts)}
            fill="none"
            stroke="#6a2fe8"
            strokeWidth={3.5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={0}
          />
          <circle data-k="spark-dot" cx={0} cy={0} r={6.5} fill="#7a3ff0" stroke="#fff" strokeWidth={2.5} style={{ transform: `translate(${line.pts[3][0]}px, ${line.pts[3][1]}px)` }} />
        </g>

        {/* Dots that run along the lines */}
        {cfg.curves.map((cv) =>
          cv.travel ? (
            <circle
              key={cv.id}
              data-k="trav"
              data-n={cv.id}
              cx={0}
              cy={0}
              r={cv.travel.r}
              fill={cv.travel.color}
              stroke="#fff"
              strokeWidth={1.5}
              opacity={0}
            />
          ) : null,
        )}

        {/* The researcher */}
        <g>
          <circle data-k="ripple" data-n={0} cx={HUB.x} cy={HUB.y} r={96} fill="none" stroke="#7fb0f3" strokeWidth={2} opacity={0} style={own} />
          <circle data-k="ripple" data-n={1} cx={HUB.x} cy={HUB.y} r={96} fill="none" stroke="#b9a5f5" strokeWidth={2} opacity={0} style={own} />
          <g data-k="hub" style={own}>
            <circle cx={HUB.x} cy={HUB.y} r={150} fill={`url(#${uid}-glow)`} />
            <circle cx={HUB.x} cy={HUB.y} r={111} fill="#d6e6fb" opacity={0.85} />
            <circle cx={HUB.x} cy={HUB.y} r={92} fill="#7db2f3" />
            <circle cx={HUB.x} cy={HUB.y} r={80} fill="#fff" />
            <image
              href="/images/solutions/research-services/researcher.webp"
              x={HUB.x - 70}
              y={HUB.y - 70}
              width={140}
              height={140}
              clipPath={`url(#${uid}-face)`}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
