import { Fragment } from "react";
import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product";

export interface AiSvcFactor {
  icon: string;
  label: string;
  /** Operator shown AFTER this factor ("×" or "÷"). Omit on the last one. */
  operator?: string;
  /** Tailwind classes for the soft circle (gradient, ring) and icon colour. */
  tone: string;
}

/** "The Insights Curry AI Opportunity Score": factors joined by operators, an arrow, then the result. */
export function AiSvcScoreFormula({
  title,
  factors,
  result,
}: {
  title: string;
  factors: AiSvcFactor[];
  result: { icon: string; label: string };
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        {/* Figma: 100px circles, 24/36 labels on one line, large operators level with the circles. */}
        <ul className="flex w-full flex-col items-center gap-3 lg:flex-row lg:items-start lg:justify-between">
          {factors.map((f) => (
            <Fragment key={f.label}>
              <li className="flex flex-col items-center gap-3 text-center lg:gap-4">
                {isIconAsset(f.icon) ? (
                  // Exported Figma circle (radial tint + gradient ring + glyph).
                  <IconAsset src={f.icon} size={100} className="h-[84px] w-[84px] lg:h-[100px] lg:w-[100px]" />
                ) : (
                  <span className={`flex h-[84px] w-[84px] items-center justify-center rounded-full border lg:h-[100px] lg:w-[100px] ${f.tone}`}>
                    <Icon name={f.icon} size={40} strokeWidth={1.7} />
                  </span>
                )}
                <span className="whitespace-nowrap text-lg font-medium text-heading lg:text-xl xl:text-2xl xl:leading-9">{f.label}</span>
              </li>
              {f.operator && (
                <li aria-hidden="true" className="text-3xl leading-none text-heading lg:mt-[32px] lg:text-[36px]">
                  {f.operator}
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-3">
          <svg width="28" height="56" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-heading" aria-hidden="true">
            <path d="M12 2v42m-8-9 8 9 8-9" />
          </svg>
          {isIconAsset(result.icon) ? (
            <IconAsset src={result.icon} size={100} className="h-[84px] w-[84px] lg:h-[100px] lg:w-[100px]" />
          ) : (
            <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-navy/30 bg-gradient-to-b from-slate-100 to-white text-navy shadow-sm lg:h-[100px] lg:w-[100px]">
              <Icon name={result.icon} size={40} strokeWidth={1.7} />
            </span>
          )}
          <span className="text-lg font-medium text-heading lg:text-xl xl:text-2xl xl:leading-9">{result.label}</span>
        </div>
      </div>
    </Section>
  );
}
