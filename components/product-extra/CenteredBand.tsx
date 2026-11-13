import { Section } from "@/components/ui/Section";

const gradients = {
  orange: "bg-gradient-to-b from-[#ffd33d] to-[#fd6446]",
  purple: "bg-gradient-to-b from-[#fc47fb] to-[#872bf9]",
} as const;

/**
 * Full-width gradient band with centred white copy ("Why PersonaAI?"):
 * eyebrow, big title, supporting text and an optional row of outlined chips.
 */
export function CenteredBand({
  eyebrow,
  title,
  body,
  chips,
  gradient = "orange",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  chips?: string[];
  gradient?: keyof typeof gradients;
}) {
  return (
    <Section className={`${gradients[gradient]} text-white`} py="py-12 lg:py-[60px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[25%] -left-[4%] hidden h-[90%] w-auto opacity-30 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-1.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -right-[6%] -top-[30%] hidden h-[110%] w-auto opacity-30 lg:block" />
      <div className="relative mx-auto flex max-w-[1488px] flex-col items-center gap-5 text-center lg:gap-6">
        <div className="flex max-w-[1200px] flex-col items-center gap-3">
        {eyebrow && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{eyebrow}</p>}
        <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <p className="text-lg lg:text-xl lg:leading-[30px]">{body}</p>
        </div>
        {chips && (
          <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-[14px]">
            {chips.map((c) => (
              <li key={c} className="rounded-xl border border-white/25 p-3 text-lg font-bold leading-[30px] lg:text-xl">{c}</li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
