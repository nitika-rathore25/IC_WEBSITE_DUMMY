import { Section } from "@/components/ui/Section";

/**
 * "Built on AI" band: centred title, supporting paragraph, a blue label and a
 * grid of outlined technology chips. Chip labels may contain "\n" to fix where
 * the line breaks, as in the Figma cards.
 */
export function ArchitectureChips({
  title,
  highlight,
  sub,
  paragraph,
  label,
  chips,
}: {
  title: string;
  /** Second title line shown with the orange gradient. */
  highlight?: string;
  /** Orange line under the title. */
  sub?: string;
  paragraph: string;
  label: string;
  chips: string[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-5 text-center lg:gap-6">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
            {title}
            {highlight && <span className="block text-gradient-orange">{highlight}</span>}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-3">
          {sub && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{sub}</p>}
          <p className="max-w-[1200px] text-lg text-para lg:text-xl lg:leading-[30px]">{paragraph}</p>
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{label}</p>
        </div>
        <ul className="grid w-full max-w-[976px] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {chips.map((c) => (
            <li
              key={c}
              className="flex min-h-[56px] items-center justify-center whitespace-pre-line rounded-xl border border-para/50 bg-white p-3 text-base font-medium leading-6 text-heading shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:text-xl lg:leading-[30px]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
