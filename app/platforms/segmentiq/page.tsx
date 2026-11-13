import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import { CTA } from "@/lib/cta-links";
import { ProductHero, FeatureBlock, FaqGrid } from "@/components/product";
import { ProblemIntro } from "@/components/product-extra/ProblemIntro";
import { CenteredBand } from "@/components/product-extra/CenteredBand";
import { ArchitectureChips } from "@/components/product-extra/ArchitectureChips";
import { TeamCards } from "@/components/product-extra/TeamCards";
import { BenefitTiles } from "@/components/product-extra/BenefitTiles";
import { QuoteStory } from "@/components/product-extra/QuoteStory";
import { IllustrationSplit } from "@/components/product-extra/IllustrationSplit";
import { StatsAside } from "@/components/product-extra/StatsAside";
import { PlansStrip } from "@/components/product-extra/PlansStrip";
import {
  segmentHero, segmentProblem, segmentWhy, segmentFeatures, segmentArchitecture, segmentAudience,
  segmentBenefits, segmentStop, segmentStory, segmentStats, segmentPlans, segmentFaqs,
} from "@/data/products/segmentiq";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { segmentIqOverlay } from "@/components/solutions/diagrams/overlays/segmentIq";

export const metadata: Metadata = buildMetadata({
  title: "Customer Segmentation Software | SegmentIQ",
  description:
    "SegmentIQ is an AI-powered customer segmentation platform that builds statistically robust customer segments in minutes using natural language.",
  path: "/platforms/segmentiq",
});

/** SegmentIQ — rebuilt from the new Figma design ("Website Flow" → SegmentIQ). */
export default function SegmentIQPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "SegmentIQ", description: String(metadata.description), path: "/platforms/segmentiq" }),
        faqSchema(segmentFaqs),
        breadcrumbSchema([{ name: "SegmentIQ", path: "/platforms/segmentiq" }]),
      ]} />
      <ProductHero
        copyWidth={700}
        {...segmentHero}
        visual={<HeroOverlay image={segmentHero.image} config={segmentIqOverlay} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Discover SegmentIQ in Action", href: CTA.caseStudiesFor("segmentiq"), variant: "navy" },
        ]}
      />
      <ProblemIntro {...segmentProblem} subTone="orange" itemStyle="card" callout={{ ...segmentProblem.callout, tone: "blue" }} />
      <CenteredBand {...segmentWhy} gradient="purple" />
      {segmentFeatures.map((f, i) => (
        <FeatureBlock key={f.eyebrow} {...f} flip={i % 2 === 1} bg={i % 2 === 0 ? "surface" : "white"} />
      ))}
      <ArchitectureChips {...segmentArchitecture} />
      <TeamCards {...segmentAudience} accent="blue" bg="surface" />
      <BenefitTiles {...segmentBenefits} />
      <IllustrationSplit {...segmentStop} bg="white" />
      <QuoteStory {...segmentStory} />
      <StatsAside {...segmentStats} />
      <PlansStrip {...segmentPlans} />
      <FaqGrid title="Questions? Let's Make Them Useful." items={segmentFaqs} />
      <CtaBand
        title={["Your Customers Are Already", "Telling You Who They Are."]}
        sub="You just need AI to connect the dots."
        body={["Discover richer customer segments, faster decisions and smarter marketing with SegmentIQ."]}
        ctaLabel="Book Your Personalized Demo"
        ctaHref={CTA.contact}
        minHeight="lg:min-h-[398px]"
      />
    </>
  );
}
