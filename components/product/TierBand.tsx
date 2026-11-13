import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { Rich } from "./Rich";

/**
 * Navy "pricing / scale" band (Figma InsignAI "Section 11"): title (beside optional copy), then a row
 * of tier cards 14px apart (12px padding and gaps, white/25 border): 20/30 Bold name over a white
 * rule, 18/24 audience, and a white/10 "Best for" box. The CTA sits centred under the cards.
 */
export function TierBand({
  title,
  body,
  cta,
  tiers,
}: {
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  tiers: { name: string; for: string; bestFor: string }[];
}) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      {body ? (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,700fr)_minmax(0,718fr)] lg:gap-12 xl:gap-[70px]">
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
          <p className="text-lg lg:text-xl lg:leading-[30px]"><Rich boldClass="font-medium text-white">{body}</Rich></p>
        </div>
      ) : (
        <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-5 lg:gap-[14px]">
        {tiers.map((t) => (
          <li key={t.name} className="flex flex-col gap-3 rounded-xl border border-white/25 p-3">
            <p className="border-b border-white pb-3 text-lg font-bold uppercase leading-[30px] lg:text-xl">{t.name}</p>
            <p className="text-base lg:text-lg lg:leading-6">{t.for}</p>
            <p className="mt-auto rounded-lg bg-white/10 p-3 text-base lg:text-lg lg:leading-6"><span className="font-bold">Best for:</span> {t.bestFor}</p>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-8 flex justify-center lg:mt-10">
          <CtaButton href={cta.href}>{cta.label}</CtaButton>
        </div>
      )}
    </Section>
  );
}
