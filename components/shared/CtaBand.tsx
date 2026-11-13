import { CtaButton } from "@/components/ui/CtaButton";

/**
 * Full-width orange gradient call-to-action band (Figma "CTA" frame on the
 * Homepage; the same band closes most pages). Decorative logo-shape
 * outlines sit in the corners.
 */
export function CtaBand({
  title,
  body,
  emphasis,
  sub,
  footnote,
  ctaLabel,
  ctaHref,
  minHeight = "lg:min-h-[470px]",
}: {
  title: string[];
  body?: string[];
  emphasis?: string;
  /** Medium line directly under the title (before the body). */
  sub?: string;
  /** Plain line under the button. */
  footnote?: string;
  ctaLabel: string;
  ctaHref: string;
  /** Desktop band height: 470px on Home, 398px on the product pages. */
  minHeight?: "lg:min-h-[470px]" | "lg:min-h-[398px]" | "lg:min-h-[530px]" | "lg:min-h-[360px]" | "lg:min-h-[414px]";
}) {
  return (
    <section className={`relative flex overflow-hidden bg-gradient-to-b from-[#ffd33d] to-[#fd6446] lg:items-center ${minHeight}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta/shape-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[42%] -right-[10%] hidden h-[75%] w-auto -rotate-45 lg:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta/shape-2.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-[3%] -top-[15%] hidden h-[90%] w-auto rotate-90 lg:block"
      />
      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col items-center gap-6 px-6 py-16 text-center lg:py-[60px]">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="flex flex-col gap-3 text-heading">
          {sub && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{sub}</p>}
          {body && (
            <p className="max-w-[1100px] text-lg lg:text-xl lg:leading-[30px]">{body.join(" ")}</p>
          )}
          {emphasis && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{emphasis}</p>}
        </div>
        <CtaButton href={ctaHref} variant="dark">
          {ctaLabel}
        </CtaButton>
        {footnote && <p className="text-lg font-medium text-heading lg:text-2xl lg:leading-9">{footnote}</p>}
      </div>
    </section>
  );
}
