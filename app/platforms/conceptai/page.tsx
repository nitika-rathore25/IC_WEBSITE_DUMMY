import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import { CTA } from "@/lib/cta-links";
import { ProductHero, FeatureBlock, BenefitGrid, FaqGrid } from "@/components/product";
import { CenteredIntro } from "@/components/product-extra/CenteredIntro";
import { CenteredGradientBand } from "@/components/product-extra/CenteredGradientBand";
import { TechChips } from "@/components/product-extra/TechChips";
import { ImageSplit } from "@/components/product-extra/ImageSplit";
import { StoryPanel } from "@/components/product-extra/StoryPanel";
import { TileSplit } from "@/components/product-extra/TileSplit";
import { PlanBand } from "@/components/product-extra/PlanBand";
import {
  conceptHero, conceptIntro, conceptBand, conceptFeatures, conceptArchitecture, conceptAudience,
  conceptBefore, conceptStory, conceptSpeed, conceptPlans, conceptFaqs,
} from "@/data/products/conceptai";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { conceptAiOverlay } from "@/components/solutions/diagrams/overlays/conceptAi";

export const metadata: Metadata = buildMetadata({
  title: "AI Concept Generator | Concept AI",
  description:
    "Concept Generator turns a business objective into structured, brand-aligned, research-ready product concepts with multi-agent AI, in minutes instead of weeks.",
  path: "/platforms/conceptai",
});

/** Concept AI — rebuilt from the new Figma design ("Website Flow" → Concept AI). */
export default function ConceptAIPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "Concept AI", description: String(metadata.description), path: "/platforms/conceptai" }),
        faqSchema(conceptFaqs),
        breadcrumbSchema([{ name: "Concept AI", path: "/platforms/conceptai" }]),
      ]} />
      <ProductHero
        copyWidth={700}
        {...conceptHero}
        visual={<HeroOverlay image={conceptHero.image} config={conceptAiOverlay} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Discover Concept Generator in Action", href: CTA.caseStudiesFor("all"), variant: "navy" },
        ]}
      />
      <CenteredIntro {...conceptIntro} />
      <CenteredGradientBand {...conceptBand} />
      {conceptFeatures.map((f, i) => (
        <FeatureBlock key={f.eyebrow} {...f} flip={i % 2 === 1} bg={i % 2 === 0 ? "surface" : "white"} />
      ))}
      <TechChips {...conceptArchitecture} />
      <BenefitGrid {...conceptAudience} bodySize="lg" />
      <ImageSplit {...conceptBefore} />
      <StoryPanel {...conceptStory} panelHeight="lg:h-[330px]" />
      <TileSplit {...conceptSpeed} tilesSide="left" columns={1} />
      <PlanBand {...conceptPlans} layout="inline" />
      <FaqGrid title="Questions? Let's Make Them Useful." items={conceptFaqs} />
      <CtaBand
        title={["Your Next Winning Product Starts With", "One Conversation."]}
        body={["Transform ideas into consumer-ready concepts faster than ever."]}
        ctaLabel="Book Your Personalized Demo"
        ctaHref={CTA.contact}
        minHeight="lg:min-h-[398px]"
      />
    </>
  );
}
