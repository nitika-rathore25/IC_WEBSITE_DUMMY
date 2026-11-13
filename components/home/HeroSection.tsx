import { ConnectionDiagram } from "@/components/shared/ConnectionDiagram";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { CTA } from "@/lib/cta-links";

/**
 * Homepage hero (Figma "Section 1"). The right-hand diagram is the coded
 * <ConnectionDiagram /> (rebuilt from the designer's GIF) — one reusable
 * component, so fixes made there apply on every page that uses it.
 */
export function HeroSection() {
  return (
    <Section className="bg-[#f8f8fa] lg:flex lg:min-h-[720px] lg:items-center" innerClassName="w-full" py="py-12 lg:py-0">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-9">
          <h1 className="max-w-[700px] text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-[60px] lg:leading-[70px]">
            We connect what others leave disconnected.
          </h1>
          <div className="flex max-w-[700px] flex-col gap-3">
            <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
              People. Data. AI. Technology. Business.
            </p>
            <p className="text-lg text-para lg:text-xl lg:leading-[30px]">
              Most organisations have all five. Very few have them working together. Insights Curry brings them
              into the same conversation so ideas move faster, intelligence gets sharper and technology actually
              earns its place.
            </p>
          </div>
          <div>
            <CtaButton href={CTA.companyVideo}>See how we connect the dots</CtaButton>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ConnectionDiagram className="max-w-[720px]" />
        </div>
      </div>
    </Section>
  );
}
