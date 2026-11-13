import { Section } from "@/components/ui/Section";

/** Navy band: centered title and a row of large faded numerals, each with an uppercase step name and a line of copy. */
export function NumberedSteps({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <h2 className="text-center text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3">
              <span className="text-5xl font-bold leading-tight text-white/25 lg:text-[60px] lg:leading-[70px]" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-medium uppercase leading-[30px] lg:text-2xl lg:leading-9">{s.title}</h3>
              <p className="text-base lg:text-xl lg:leading-[30px]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
