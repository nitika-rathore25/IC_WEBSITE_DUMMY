import { Section } from "@/components/ui/Section";
import { SectionTitle } from "./SectionTitle";

/** Navy section with a centered title, lead-in line and a grid of outlined benefit tiles (chevron bullet). */
export function BenefitGrid({
  title,
  lead,
  items,
  cols = 3,
  bodySize = "md",
}: {
  title: string;
  lead?: string;
  items: { title: string; body: string }[];
  cols?: 2 | 3 | 4;
  /** Card body: "md" 18/24 (InsignAI) or "lg" 20/30 (ConceptAI). */
  bodySize?: "md" | "lg";
}) {
  const grid = cols === 4 ? "lg:grid-cols-4" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SectionTitle title={title} sub={lead} tone="light" />
        <ul className={`grid gap-4 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-5 ${grid}`}>
          {items.map((it) => (
            <li key={it.title} className="flex flex-col gap-1.5 rounded-xl border border-white/25 p-5 lg:p-6">
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/shared/chevron-circle-light.svg" alt="" aria-hidden="true" width={30} height={30} className="shrink-0" />
                <h3 className="text-lg font-medium leading-[30px] lg:text-xl">{it.title}</h3>
              </div>
              <p className={`text-base ${bodySize === "lg" ? "lg:text-xl lg:leading-[30px]" : "lg:text-lg lg:leading-6"}`}>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
