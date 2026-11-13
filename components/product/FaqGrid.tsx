import { Section } from "@/components/ui/Section";
import { SectionTitle } from "./SectionTitle";

/** FAQ block as in the product designs: all answers visible, two columns. */
export function FaqGrid({ eyebrow = "FAQs", title, items }: { eyebrow?: string; title: string; items: { q: string; a: string }[] }) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  // Interleave so each desktop row pairs the nth left and right item, as in the design.
  const ordered = left.flatMap((it, i) => (right[i] ? [it, right[i]] : [it]));
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SectionTitle eyebrow={eyebrow} title={title} />
        <dl className="grid gap-x-12 gap-y-8 lg:grid-cols-2 lg:gap-y-9 xl:gap-x-[88px]">
          {ordered.map((it) => (
            <div key={it.q} className="flex flex-col gap-2 lg:gap-3">
              <dt className="text-xl font-medium leading-[30px] text-heading lg:text-2xl lg:leading-9">{it.q}</dt>
              <dd className="text-lg text-para lg:text-xl lg:leading-[30px]">{it.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
