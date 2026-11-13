import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/about/TeamCard";
import { team } from "@/data/about";

export function TeamSection() {
  return (
    <Section className="scroll-mt-[100px] bg-surface" py="py-12 lg:py-[60px]" id="team">
      <div className="flex flex-col items-center gap-9">
        <SectionHeading>Our Team</SectionHeading>
        <ul className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {team.map((m) => (
            <li key={m.slug}>
              <TeamCard member={m} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
