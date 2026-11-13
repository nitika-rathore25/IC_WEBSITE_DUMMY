import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { CapabilityGrid } from "@/components/product/CapabilityGrid";
import { Rich } from "@/components/product/Rich";
import type { Capability } from "@/components/product";

export interface LeadBullet {
  lead: string;
  text: string;
}

/**
 * Variant of the kit's FeatureBlock for "Feature 0N" sections whose copy needs
 * more than paragraphs: an optional orange-lead bullet list, a free `extra`
 * slot (e.g. a call-out box), an optional capabilities heading and capability
 * cards that may have no body text.
 */
export function FeatureSplit({
  eyebrow,
  title,
  sub,
  paragraphs = [],
  leadBullets,
  extra,
  capabilitiesTitle,
  capabilities,
  flip = false,
  bg = "white",
  cols = 3,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  paragraphs?: string[];
  leadBullets?: LeadBullet[];
  extra?: ReactNode;
  capabilitiesTitle?: string;
  capabilities: (Omit<Capability, "body"> & { body?: string })[];
  flip?: boolean;
  bg?: "white" | "surface";
  cols?: 2 | 3;
}) {
  const text = (
    <div className="flex flex-col gap-4 lg:gap-6">
      <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>
      <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
      {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
      {paragraphs.map((p) => (
        <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
      ))}
      {leadBullets && (
        <ul className="flex list-disc flex-col gap-0.5 pl-6 text-lg text-para marker:text-cta lg:text-xl lg:leading-[30px]">
          {leadBullets.map((b) => (
            <li key={b.lead}>
              <span className="text-cta">{b.lead}</span> {b.text}
            </li>
          ))}
        </ul>
      )}
      {extra}
    </div>
  );
  const caps = (
    <div className={`flex flex-col gap-4 lg:gap-5 ${flip ? "md:order-first" : ""}`}>
      {capabilitiesTitle && <p className="text-xl font-medium text-heading lg:text-2xl lg:leading-9">{capabilitiesTitle}</p>}
      <CapabilityGrid items={capabilities} cols={cols} />
    </div>
  );
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      {/* Figma: copy column 702, capabilities column 718, whichever side each is on. */}
      <div className={`grid items-center gap-10 lg:gap-12 xl:gap-[70px] ${flip ? "lg:grid-cols-[minmax(0,718fr)_minmax(0,702fr)]" : "lg:grid-cols-[minmax(0,702fr)_minmax(0,718fr)]"}`}>
        {/* Text first in the markup so phones read text → visual; md:order-first keeps tablet and desktop exactly as designed. */}
        {text}
        {caps}
      </div>
    </Section>
  );
}
