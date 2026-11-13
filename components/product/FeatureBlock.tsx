import { Section } from "@/components/ui/Section";
import { CapabilityGrid } from "./CapabilityGrid";
import { Rich } from "./Rich";

export interface Capability {
  icon: string;
  title: string;
  body: string;
}

/**
 * "Feature 0N" section: text column (eyebrow, big title, blue sub line,
 * paragraphs) beside a grid of feature cards, with an optional heading over the
 * cards. `flip` puts the cards on the left; `bg` alternates white / light-grey.
 */
export function FeatureBlock({
  eyebrow,
  title,
  sub,
  paragraphs,
  lead,
  bullets,
  capabilitiesTitle,
  capabilities,
  flip = false,
  bg = "white",
  cols = 3,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  paragraphs: string[];
  /** Medium-weight dark line shown before the paragraphs. */
  lead?: string;
  /** Bulleted list shown after the paragraphs. */
  bullets?: string[];
  capabilitiesTitle?: string;
  capabilities: Capability[];
  flip?: boolean;
  bg?: "white" | "surface";
  cols?: 2 | 3;
}) {
  // Figma: text stack 24px apart; the sub line, paragraphs and bullets form one 12px-gap group.
  const text = (
    <div className="flex flex-col gap-4 lg:gap-6">
      <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>
      <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
      <div className="flex flex-col gap-3">
      {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
      {lead && <p className="text-lg font-medium text-heading lg:text-xl lg:leading-[30px]">{lead}</p>}
      {paragraphs.map((p) => (
        <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
      ))}
      {bullets && bullets.length > 0 && (
        <ul className="flex list-disc flex-col gap-0.5 pl-6 text-lg text-para marker:text-para lg:text-xl lg:leading-[30px]">
          {bullets.map((b) => (
            <li key={b}><Rich>{b}</Rich></li>
          ))}
        </ul>
      )}
      </div>
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
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,702fr)_minmax(0,718fr)] lg:gap-12 xl:gap-[70px]">
        {/* Text first in the markup so phones read text → visual; md:order-first keeps tablet and desktop exactly as designed. */}
        {text}
        {caps}
      </div>
    </Section>
  );
}
