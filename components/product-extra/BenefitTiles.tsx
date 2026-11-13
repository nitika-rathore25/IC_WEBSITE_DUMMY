import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/product/SectionTitle";

/** Navy band with a centred title, a lead-in line and a grid of single-line outlined benefit tiles. */
export function BenefitTiles({ title, lead, items }: { title: string; lead?: string; items: string[] }) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SectionTitle title={title} tone="light" />
        <div className="flex flex-col gap-5">
        {lead && <p className="text-center text-xl font-medium lg:text-2xl lg:leading-9">{lead}</p>}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3 rounded-xl border border-white/25 p-5 lg:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/shared/chevron-circle-light.svg" alt="" aria-hidden="true" width={30} height={30} className="shrink-0" />
              <p className="text-lg font-medium lg:text-xl lg:leading-[30px]">{it}</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Section>
  );
}
