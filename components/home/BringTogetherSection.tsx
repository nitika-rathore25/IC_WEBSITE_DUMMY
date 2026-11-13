import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { bringTogether } from "@/data/home";

/** "What we bring together" (Figma "Section 3"): five pillars on a soft gradient band. */
export function BringTogetherSection() {
  return (
    <Section id="bring-together" className="bg-white lg:min-h-[524px]">
      <div className="flex flex-col items-center gap-9">
        <SectionHeading>What we bring together</SectionHeading>
        <div className="relative w-full">
          {/* Soft multi-colour band running behind the icons */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[50px] hidden h-[30px] w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(252,71,251,0.1) 4.6706%, rgba(32,98,173,0.1) 20%, rgba(255,255,255,0) 25%, rgba(32,98,173,0.1) 30%, rgba(135,43,249,0.1) 45%, rgba(255,255,255,0) 50%, rgba(135,43,249,0.1) 55%, rgba(19,216,189,0.1) 70%, rgba(255,255,255,0) 75%, rgba(19,216,189,0.05) 80%, rgba(255,211,61,0.1) 95%, rgba(255,255,255,0) 100%)",
            }}
          />
          <ul className="relative grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {bringTogether.map((item) => (
              <li key={item.title} className="flex w-full max-w-[275px] flex-col items-center gap-3 text-center">
                <Image src={item.icon} alt="" width={100} height={100} />
                <p className="text-2xl font-medium leading-9 text-heading">{item.title}</p>
                <p className="text-lg leading-6 text-para">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <CtaButton href="#built-by">When these connect, things start moving.</CtaButton>
      </div>
    </Section>
  );
}
