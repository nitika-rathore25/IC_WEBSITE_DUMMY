import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product";
import { SolButton } from "./SolButton";
import { SolTitle } from "./SolGradientText";

/**
 * White section with a centered title, a bold sub-heading, a paragraph, a
 * "We build" row of boxes, a CTA, a "Best for" line and an orange text link.
 */
export function SolCenterBlock({
  title,
  heading,
  paragraph,
  chipsLabel,
  chips,
  cta,
  bestFor,
  link,
}: {
  title: string;
  heading: string;
  paragraph: string;
  chipsLabel: string;
  chips: string[];
  cta: { label: string; href: string };
  bestFor: string;
  link: { label: string; href: string };
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-6 text-center">
        <SolTitle>{title}</SolTitle>
        <div className="flex max-w-[1200px] flex-col items-center gap-3">
          <h3 className="text-2xl font-bold leading-tight text-heading lg:text-[32px] lg:leading-[40px]">{heading}</h3>
          <p className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{paragraph}</Rich></p>
        </div>
        <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{chipsLabel}</p>
          {/* Figma: equal boxes in one row, each label held to 160px so it sits on two centred lines. */}
          <ul className="grid w-full max-w-[1362px] grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6 xl:gap-6">
            {chips.map((c) => (
              <li
                key={c}
                className="flex min-h-[72px] items-center justify-center rounded-lg border border-navy bg-white px-4 py-3 text-base leading-6 text-heading shadow-[0_4px_10px_rgba(20,20,20,0.08)] lg:min-h-[84px] lg:text-xl lg:leading-[30px]"
              >
                <span className="max-w-[160px]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <SolButton href={cta.href}>{cta.label}</SolButton>
        <div className="flex flex-col items-center gap-3">
          <p className="text-base text-para lg:text-lg"><Rich>{bestFor}</Rich></p>
          <Link href={link.href} className="text-xl font-medium text-cta hover:underline lg:text-2xl lg:leading-9">{link.label}</Link>
        </div>
      </div>
    </Section>
  );
}
