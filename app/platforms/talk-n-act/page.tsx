import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTA } from "@/lib/cta-links";
import { ProductHero, FaqGrid } from "@/components/product";
import { CenteredIntro } from "@/components/product-extra/CenteredIntro";
import { ImageSplit } from "@/components/product-extra/ImageSplit";
import { NumberedSteps } from "@/components/product-extra/NumberedSteps";
import { IconCardGrid } from "@/components/product-extra/IconCardGrid";
import { DiagramBand } from "@/components/product-extra/DiagramBand";
import { PlanBand } from "@/components/product-extra/PlanBand";
import { TeamCards } from "@/components/product-extra/TeamCards";
import { CtaBandDual } from "@/components/product-extra/CtaBandDual";
import {
  talkHero, talkProblem, talkOutcome, talkFeatures, talkSteps, talkDesigned, talkArchitecture,
  talkAudience, talkPlans, talkFaqs,
} from "@/data/products/talknact";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { talkNActOverlay } from "@/components/solutions/diagrams/overlays/talkNAct";

export const metadata: Metadata = buildMetadata({
  title: "Agentic AI Workflow Platform | TalknAct",
  description:
    "TalkNAct is a domain-agnostic Agentic AI platform: describe the business outcome and it creates the multi-agent architecture, runs the analysis and triggers the action.",
  path: "/platforms/talk-n-act",
});

/** TalknAct — rebuilt from the new Figma design ("Website Flow" → TalknAct). */
export default function TalkNActPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "TalknAct", description: String(metadata.description), path: "/platforms/talk-n-act" }),
        faqSchema(talkFaqs),
        breadcrumbSchema([{ name: "TalknAct", path: "/platforms/talk-n-act" }]),
      ]} />
      <ProductHero
        {...talkHero}
        bg="bg-[#f6f5f8]"
        visual={<HeroOverlay image={talkHero.image} config={talkNActOverlay} blend={false} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Discover How TalkNAct Works", href: CTA.caseStudiesFor("talknact"), variant: "navy" },
        ]}
      />
      <CenteredIntro {...talkProblem} bg="white" pillVariant="rainbow" outroTone="heading" />
      <CenteredIntro {...talkOutcome} bg="white" outroTone="blue" />
      {talkFeatures.map((f, i) => (
        <ImageSplit key={f.eyebrow} {...f} variant="feature" imageSide={i % 2 === 0 ? "right" : "left"} bg={i % 2 === 0 ? "surface" : "white"} />
      ))}
      <NumberedSteps {...talkSteps} />
      <IconCardGrid {...talkDesigned} />
      <DiagramBand {...talkArchitecture} />
      <TeamCards {...talkAudience} cols={4} accent="orange" bg="surface" />
      <PlanBand {...talkPlans} layout="split" cta={{ label: "Talk to an Expert", href: CTA.contact }} />
      <FaqGrid title="Questions? Let's Make Them Useful." items={talkFaqs} />
      <CtaBandDual
        title={["Your Business Knows What It Wants AI to Do."]}
        sub="TalkNAct Figures Out How."
        body="Describe the objective. Let TalkNAct build the architecture. Put AI to work."
        primary={{ label: "Book Your Personalized Demo", href: CTA.contact }}
        secondary={{ label: "Talk to an AI Expert", href: CTA.contact }}
        minHeight="lg:min-h-[370px]"
      />
    </>
  );
}
