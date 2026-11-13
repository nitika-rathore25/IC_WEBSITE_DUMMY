import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import { CTA } from "@/lib/cta-links";
import {
  ProductHero, ProblemSplit, GradientBand, FeatureBlock, ChipFlow, DarkBand,
  ImageCards, BenefitGrid, StatSplit, StoryBlock, TierBand, FaqGrid,
} from "@/components/product";
import { IconTileColumns } from "@/components/product-extra/IconTileColumns";
import {
  insignHero, insignProblem, insignWhy, insignFeatures, insignFlow, insignLayer, insignDifferent,
  insignAudience, insignBenefits, insignStats, insignStory, insignTiers, insignFaqs,
} from "@/data/products/insignai";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { insignAiOverlay } from "@/components/solutions/diagrams/overlays/insignAi";

export const metadata: Metadata = buildMetadata({
  title: "AI Market Research Platform | InsignAI",
  description:
    "InsignAI brings questionnaire design, data-quality monitoring, analysis and insight delivery into one AI-native research platform with its own Market Research LLM.",
  path: "/platforms/insignai",
});

/** InsignAI — rebuilt from the new Figma design ("Website Flow" → InsignAI). */
export default function InsignAIPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "InsignAI", description: String(metadata.description), path: "/platforms/insignai" }),
        faqSchema(insignFaqs),
        breadcrumbSchema([{ name: "InsignAI", path: "/platforms/insignai" }]),
      ]} />
      <ProductHero
        copyWidth={650}
        {...insignHero}
        visual={<HeroOverlay image={insignHero.image} config={insignAiOverlay} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Talk to an Expert", href: CTA.contact, variant: "navy" },
        ]}
      />
      <ProblemSplit {...insignProblem} />
      <GradientBand {...insignWhy} />
      {insignFeatures.map((f, i) => (
        <FeatureBlock key={f.eyebrow} {...f} flip={i % 2 === 1} bg={i % 2 === 0 ? "surface" : "white"} />
      ))}
      <ChipFlow {...insignFlow} />
      <DarkBand {...insignLayer} />
      <IconTileColumns {...insignDifferent} tone="orange" marquee />
      <ImageCards {...insignAudience} wide />
      <BenefitGrid {...insignBenefits} />
      <StatSplit {...insignStats} />
      <StoryBlock {...insignStory} />
      <TierBand {...insignTiers} cta={{ label: "Talk to an Expert", href: CTA.contact }} />
      <FaqGrid title="Questions? Let's Make Them Useful." items={insignFaqs} />
      <CtaBand
        title={["Your Research Questions Aren't", "Getting Any Slower."]}
        sub="Your Research Shouldn't Either."
        body={["Move from question → data → insight → decision with an AI platform built specifically for market research."]}
        ctaLabel="Book Your InsignAI Demo"
        ctaHref={CTA.contact}
        footnote="See what your research team could accomplish at 10X speed."
        minHeight="lg:min-h-[530px]"
      />
    </>
  );
}
