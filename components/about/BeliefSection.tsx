import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStats } from "@/data/about";

/** "What We Believe" navy band with the five stat boxes. */
export function BeliefSection() {
  return (
    <Section className="bg-navy lg:min-h-[526px]" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-8 text-center lg:gap-9">
        <div className="flex flex-col items-center gap-3">
          <SectionHeading tone="light" sub="Sneak peek into the world of Insights Curry" subClassName="text-white">
            What We Believe
          </SectionHeading>
          <p className="max-w-[1180px] text-lg text-white lg:text-xl lg:leading-[30px]">
            The most valuable intelligence isn&apos;t sitting in one place. It&apos;s scattered across data, people,
            systems, conversations and workflows. We connect those dots to help organisations move from information
            to intelligence, from intelligence to action, and from ideas to impact.
          </p>
        </div>
        <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {aboutStats.map((s) => (
            <li
              key={s.label}
              className="flex min-h-[155px] flex-col items-center justify-center gap-1.5 rounded-xl border border-white p-6 lg:w-full lg:max-w-[225px] lg:justify-self-center"
            >
              <span className="text-5xl font-bold leading-none text-white lg:text-[60px] lg:leading-[70px]">{s.value}</span>
              <span className="text-lg text-white lg:text-xl">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
