"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { homeConnectionDiagram, type ConnectionDiagramConfig, type DiagramNode } from "./config";
import { buildAnimations, pointOnRoundedRect } from "./animate";
import { useLoopingAnimations } from "@/hooks/useLoopingAnimations";
import { BarsIcon, MonitorIcon, StarIcon } from "./icons";

interface Props {
  /** Defaults to the homepage hero diagram. Pass another config to reuse elsewhere. */
  config?: ConnectionDiagramConfig;
  className?: string;
  /** Accessible description of the diagram. */
  label?: string;
}

/**
 * Animated "People · Data · Technology · Business → AI" connection diagram.
 *
 * ONE component drives every instance of this animation on the site: cards,
 * dashed links, travelling dots, AI-card orbit and ambient twinkle are all
 * generated from `config`, and the motion lives in `./animate.ts`. A fix or
 * tweak there is picked up everywhere it is used.
 *
 * - Scales fluidly: everything is sized in container-query units from the
 *   844-px design space, so no JS resize handling is needed.
 * - Respects `prefers-reduced-motion` (renders the finished, static diagram).
 * - Pauses itself while off-screen.
 */
export function ConnectionDiagram({
  config = homeConnectionDiagram,
  className = "",
  label = "People, Data, Technology and Business connected through AI",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const { size } = config;
  const u = (n: number) => `${((n / size) * 100).toFixed(4)}cqw`;
  const hub = config.hub;

  useLoopingAnimations(ref, (root) => buildAnimations(root, config), [config]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative aspect-square w-full select-none ${className}`}
      style={{ containerType: "inline-size" }}
    >
      {/* Ambient dots (always on, behind everything) */}
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${size} ${size}`} aria-hidden>
        {config.ambient.map((d, i) => (
          <circle key={i} data-k="amb" data-n={i} cx={d.x} cy={d.y} r={d.r} fill={config.ambientColor} opacity={0.8} />
        ))}
      </svg>

      <div data-k="stage" className="absolute inset-0">
        {/* Links, travelling dots, orbit */}
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size} ${size}`} aria-hidden>
          <defs>
            {config.nodes.map((n) => (
              <mask key={n.id} id={`${uid}-m-${n.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={size} height={size}>
                <line
                  data-k="draw"
                  data-n={n.id}
                  x1={n.anchor.x}
                  y1={n.anchor.y}
                  x2={n.hubPoint.x}
                  y2={n.hubPoint.y}
                  stroke="#fff"
                  strokeWidth={6}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={0}
                />
              </mask>
            ))}
          </defs>

          {config.nodes.map((n) => (
            <g key={n.id}>
              <line
                x1={n.anchor.x}
                y1={n.anchor.y}
                x2={n.hubPoint.x}
                y2={n.hubPoint.y}
                stroke={n.linkColor ?? n.color}
                strokeWidth={1.6}
                strokeDasharray="5 4"
                strokeLinecap="round"
                mask={`url(#${uid}-m-${n.id})`}
              />
            </g>
          ))}
        </svg>

        {/* Cards */}
        {config.nodes.map((n) => (
          <NodeCard key={n.id} node={n} u={u} />
        ))}

        {/* AI hub */}
        <div
          data-k="hub"
          className="absolute"
          style={{ left: u(hub.box.x), top: u(hub.box.y), width: u(hub.box.w), height: u(hub.box.h) }}
        >
          <div
            data-k="glow"
            className="absolute inset-0"
            style={{ borderRadius: u(16), boxShadow: `0 0 ${u(28)} ${hub.color}59`, opacity: 0.5 }}
          />
          <div
            className="absolute inset-0 bg-white"
            style={{ borderRadius: u(16), border: `${u(1.6)} solid ${hub.color}` }}
          />
          <div
            className="absolute flex items-center justify-center"
            style={{ left: u(hub.icon.x), top: u(hub.icon.y), width: u(hub.icon.size), height: u(hub.icon.size), borderRadius: u(14), background: "#f3eaed" }}
          >
            <StarIcon size={u(hub.icon.size * 0.52)} color={hub.color} />
          </div>
          <div className="absolute" style={{ left: u(hub.textX), top: u(hub.textTop) }}>
            <p className="font-bold" style={{ color: hub.color, fontSize: u(23), lineHeight: u(28) }}>
              {hub.title}
            </p>
            <p style={{ color: "#6b7280", fontSize: u(18.5), lineHeight: u(25), marginTop: u(3) }}>
              {hub.lines.map((l) => (
                <span key={l} className="block whitespace-nowrap">
                  {l}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Travelling dots + orbiting particles (drawn above the cards) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {config.nodes.map((n) => (
            <circle key={`a-${n.id}`} data-k="anchor" data-n={n.id} cx={n.anchor.x} cy={n.anchor.y} r={6} fill={n.color} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          ))}
          {config.nodes.map((n) => (
            <circle key={n.id} data-k="trav" data-n={n.id} cx={0} cy={0} r={4} fill={n.color} style={{ opacity: 0 }} />
          ))}
          <g data-k="orbit">
            {config.orbit.map((p, i) => {
              const pos = pointOnRoundedRect(hub.box, 16, p.phase);
              return (
                <circle
                  key={i}
                  data-k="orb"
                  data-n={i}
                  cx={0}
                  cy={0}
                  r={p.r}
                  fill={p.color}
                  style={{ transform: `translate(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px)` }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

function NodeCard({ node, u }: { node: DiagramNode; u: (n: number) => string }) {
  const { box, media } = node;
  return (
    <div
      data-k="card"
      data-n={node.id}
      className="absolute"
      style={{ left: u(box.x), top: u(box.y), width: u(box.w), height: u(box.h) }}
    >
      <div
        className="absolute inset-0 bg-white/40"
        style={{
          borderRadius: u(16),
          border: `${u(1)} solid #e9ecf4`,
          boxShadow: `0 ${u(2)} ${u(14)} rgba(20,30,80,0.03)`,
        }}
      />
      <div className="absolute" style={{ left: u(media.x), top: u(media.y), width: u(media.size), height: u(media.size) }}>
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt=""
            width={media.size * 2}
            height={media.size * 2}
            className="h-full w-full rounded-full object-cover"
            priority
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={media.tile ? { borderRadius: u(16), background: "#f1ecf6" } : undefined}
          >
            {media.icon === "bars" ? <BarsIcon size={u(media.size)} /> : <MonitorIcon size={u(media.size * 0.55)} />}
          </div>
        )}
      </div>
      <div className="absolute" style={{ left: u(node.textX), top: u(node.textTop) }}>
        <p className="font-bold" style={{ color: "#0f1f4b", fontSize: u(17), lineHeight: u(25), letterSpacing: "0.08em" }}>
          {node.title}
        </p>
        <p style={{ color: "#6b7280", fontSize: u(18.5), lineHeight: u(25), marginTop: u(8) }}>
          {node.lines.map((l) => (
            <span key={l} className="block whitespace-nowrap">
              {l}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
