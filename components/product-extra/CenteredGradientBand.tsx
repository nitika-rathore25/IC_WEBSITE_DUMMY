import { Section } from "@/components/ui/Section";

/**
 * Centered colour-gradient statement band: white title lines, short
 * paragraphs, an optional two-part comparison line and an optional white
 * result pill. Decorative logo outlines sit in the corners.
 */
export function CenteredGradientBand({
  title,
  body,
  comparison,
  pill,
}: {
  title: string[];
  body: string[];
  comparison?: [string, string];
  pill?: string;
}) {
  return (
    <Section className="bg-gradient-to-b from-[#13d8bd] to-[#3c48b7] text-white" py="py-12 lg:py-[60px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -left-[3%] -top-[10%] hidden h-[90%] w-auto opacity-30 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-1.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -right-[4%] -top-[20%] hidden h-[80%] w-auto opacity-30 lg:block" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-5 text-center lg:gap-6">
        <div className="flex flex-col items-center gap-3">
        <h2 className="text-4xl font-bold leading-tight lg:text-[clamp(44px,3.9vw,60px)] lg:leading-[1.17]">
          {title.map((l) => (
            <span key={l} className="block xl:whitespace-nowrap">{l}</span>
          ))}
        </h2>
        <div className="flex flex-col gap-1 text-lg lg:text-xl lg:leading-[30px]">
          {body.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
        </div>
        {comparison && (
          <div className="flex flex-col items-center gap-3 text-base font-bold sm:flex-row sm:gap-[14px] lg:text-xl lg:leading-[30px]">
            <p className="p-3">{comparison[0]}</p>
            <span className="hidden h-[54px] w-0.5 bg-white sm:block" aria-hidden="true" />
            <p className="p-3">{comparison[1]}</p>
          </div>
        )}
        {pill && (
          <p className="rounded-[40px] bg-white px-8 py-5 text-xl font-medium text-insight-blue lg:rounded-full lg:px-12 lg:py-6 lg:text-2xl lg:leading-9">{pill}</p>
        )}
      </div>
    </Section>
  );
}
