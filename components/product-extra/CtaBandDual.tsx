import { CtaButton } from "@/components/ui/CtaButton";

/**
 * Orange closing band with two buttons side by side (same look as the shared
 * CtaBand, which has a single button). `secondary.light` makes the second
 * button white with dark text; otherwise it is black like the first.
 */
export function CtaBandDual({
  title,
  sub,
  body,
  primary,
  secondary,
  minHeight = "lg:min-h-[398px]",
}: {
  title: string[];
  sub?: string;
  body?: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; light?: boolean };
  minHeight?: "lg:min-h-[398px]" | "lg:min-h-[370px]";
}) {
  return (
    <section className={`relative flex overflow-hidden bg-gradient-to-b from-[#ffd33d] to-[#fd6446] lg:items-center ${minHeight}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-1.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[42%] -right-[10%] hidden h-[75%] w-auto -rotate-45 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -left-[3%] -top-[15%] hidden h-[90%] w-auto rotate-90 lg:block" />
      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col items-center gap-6 px-6 py-16 text-center lg:py-[60px]">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {title.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h2>
        <div className="flex flex-col gap-3 text-heading">
          {sub && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{sub}</p>}
          {body && <p className="max-w-[1100px] text-lg lg:text-xl lg:leading-[30px]">{body}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          <CtaButton href={primary.href} variant="dark">{primary.label}</CtaButton>
          <CtaButton
            href={secondary.href}
            variant="dark"
            className={secondary.light ? "!bg-white !text-heading hover:!bg-white/90" : ""}
          >
            {secondary.label}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
