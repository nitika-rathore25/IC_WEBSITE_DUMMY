import { Section } from "@/components/ui/Section";

/** Light-grey section with a 2x2 grid of big-number cards on the left and a large title on the right. */
export function StatsAside({ title, label, stats }: { title: string; label?: string; stats: { value: string; label: string }[] }) {
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,724fr)_minmax(0,700fr)] lg:gap-12 xl:gap-16">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:order-2 lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <div className="flex flex-col gap-4 lg:order-1 lg:gap-5">
          {label && <p className="text-xl font-medium text-heading lg:text-2xl lg:leading-9">{label}</p>}
          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {stats.map((s) => (
              <li key={s.value} className="flex flex-col gap-1.5 rounded-xl border border-para/10 bg-white p-3">
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
