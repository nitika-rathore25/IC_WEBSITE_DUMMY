import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "Why Insights Curry": heading over the supplied illustration, which carries the
 * section's copy itself (AI connected to the middle, the five "Your ..." points).
 * Keeps id="video": CTA.companyVideo ("See how we connect the dots") links here.
 */
export function WhySection() {
  return (
    <Section id="video" className="scroll-mt-[100px] bg-white" py="pt-12 pb-0 lg:pt-[60px]">
      <div className="flex flex-col items-center gap-2 lg:gap-3">
        <SectionHeading>Why Insights Curry</SectionHeading>
        <Image
          src="/images/about/why.png"
          alt="We don't add AI to the edges, we connect it to the middle: your knowledge, workflows, customers, teams and decisions around AI plus human expertise, where intelligence becomes useful."
          width={1536}
          height={1024}
          // Small labels in the artwork: serve a large, uncompressed copy so it stays sharp.
          quality={100}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto w-full max-w-[1200px]"
        />
      </div>
    </Section>
  );
}
