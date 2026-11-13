import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product";

/** "Problem → Product → Scale": arrow-joined title and a row of icon steps. */
export function SolSteps({
  titleParts,
  steps,
  footnote,
}: {
  titleParts: string[];
  steps: { icon: string; title: string; body: string }[];
  footnote?: string;
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-10">
        <h2 className="flex flex-wrap items-center justify-center gap-x-3 text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {titleParts.map((part, i) => (
            <span key={part} className="flex items-center gap-3">
              {part}
              {i < titleParts.length - 1 && (
                // Figma: heavy 46x38 arrow, square-ended shaft and mitred tip.
                <svg className="h-[26px] w-[32px] text-insight-blue lg:h-[38px] lg:w-[46px]" viewBox="0 0 46 38" fill="none" stroke="currentColor" strokeWidth="7.5" aria-hidden="true">
                  <path d="M0 19h40" />
                  <path d="M25.5 3.5 41 19 25.5 34.5" strokeLinejoin="miter" />
                </svg>
              )}
            </span>
          ))}
        </h2>
        <ol className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-5">
          {steps.map((s) => (
            <li key={s.title} className="flex flex-col items-center gap-3 text-center">
              {/* Figma: 100px tile, ~50px glyph. */}
              {isIconAsset(s.icon) ? (
                <IconAsset src={s.icon} size={100} className="h-[84px] w-[84px] lg:h-[100px] lg:w-[100px]" />
              ) : (
                <span className="flex h-[84px] w-[84px] items-center justify-center rounded-[24px] bg-[#e8f0fb] text-insight-blue lg:h-[100px] lg:w-[100px]">
                  <Icon name={s.icon} size={50} strokeWidth={1.6} className="h-[50%] w-[50%]" />
                </span>
              )}
              <h3 className="text-xl font-medium uppercase leading-[30px] text-heading lg:text-2xl lg:leading-9">{s.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{s.body}</p>
            </li>
          ))}
        </ol>
        {footnote && <p className="text-center text-xl font-medium text-cta lg:text-2xl lg:leading-9">{footnote}</p>}
      </div>
    </Section>
  );
}
