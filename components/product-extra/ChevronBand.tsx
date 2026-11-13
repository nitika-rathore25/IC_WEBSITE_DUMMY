import { Section } from "@/components/ui/Section";

/**
 * Navy band: small white eyebrow, big white title and wrapped, centered
 * outlined tiles with a chevron bullet. Each tile is one run of text with an
 * optional bold-ish lead ("Conversation-First: ...").
 */
export function ChevronBand({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: { lead?: string; text: string }[];
}) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-8 text-center lg:gap-9">
        <div className="flex flex-col gap-3">
          {eyebrow && <p className="text-lg font-medium lg:text-2xl lg:leading-9">{eyebrow}</p>}
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
        </div>
        <ul className="flex w-full max-w-[1404px] flex-wrap justify-center gap-4 text-left lg:gap-x-6 lg:gap-y-5">
          {items.map((it) => (
            <li key={it.text} className="flex basis-full items-start gap-3 rounded-xl border border-white/25 p-5 sm:basis-[calc(50%-8px)] lg:basis-[calc(33.333%-16px)] lg:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/shared/chevron-tile-dark.svg" alt="" aria-hidden="true" width={30} height={30} className="shrink-0" />
              <p className="text-lg lg:text-xl lg:leading-[30px]">
                {it.lead && <>{it.lead} </>}
                {it.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
