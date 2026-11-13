import { SolButton } from "./SolButton";

/**
 * Orange closing band (same artwork as shared CtaBand) with a primary dark
 * button and an optional outlined secondary button, as on the Custom Development page.
 */
export function SolCtaBand({
  title,
  body,
  emphasis,
  primary,
  secondary,
}: {
  title: string;
  body?: string[];
  emphasis?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative flex overflow-hidden bg-gradient-to-b from-[#ffd33d] to-[#fd6446] lg:min-h-[414px] lg:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-1.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[42%] -right-[10%] hidden h-[75%] w-auto -rotate-45 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -left-[3%] -top-[15%] hidden h-[90%] w-auto rotate-90 lg:block" />
      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col items-center gap-6 px-6 py-16 text-center lg:py-[60px]">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        {body && (
          <div className="flex max-w-[1200px] flex-col gap-1 text-heading">
            {body.map((b) => (
              <p key={b} className="text-lg lg:text-xl lg:leading-[30px]">{b}</p>
            ))}
          </div>
        )}
        {emphasis && <p className="text-xl font-medium text-heading lg:text-2xl lg:leading-9">{emphasis}</p>}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          <SolButton href={primary.href} variant="dark">{primary.label}</SolButton>
          {secondary && <SolButton href={secondary.href} variant="outline-dark">{secondary.label}</SolButton>}
        </div>
      </div>
    </section>
  );
}
