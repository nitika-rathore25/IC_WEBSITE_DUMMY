import { Section } from "@/components/ui/Section";

/**
 * Light-grey stats section (Figma InsignAI "Section 9"): 700px copy (title, then the blue sub line and
 * note as a 12px group, 24px stack) beside a 724px column with an optional 24/36 label 20px above a 2x2
 * grid of 352x104 cards (12px padding, 6px gap, para/10 border, 36/48 Bold value, 18/24 label); 64px gap.
 */
export function StatSplit({
  title,
  sub,
  body,
  label,
  stats,
}: {
  title: string;
  sub?: string;
  body?: string;
  label?: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,700fr)_minmax(0,724fr)] lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {(sub || body) && (
            <div className="flex flex-col gap-3">
              {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
              {body && <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{body}</p>}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 lg:gap-5">
          {label && <p className="text-xl font-medium text-heading lg:text-2xl lg:leading-9">{label}</p>}
          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {stats.map((s) => (
              <li key={s.value + s.label} className="flex flex-col gap-1.5 rounded-xl border border-para/10 bg-white p-3">
                <p className="text-3xl font-bold leading-tight text-cta lg:text-4xl lg:leading-[48px]">{s.value}</p>
                <p className="text-base text-para lg:text-lg lg:leading-6">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
