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
import {
  personaHero, personaProblem, personaWhy, personaFeatures, personaArchitecture, personaAudience,
  personaBenefits, personaStory, personaGeneric, personaFaqs,
} from "@/data/products/personaai";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { personaAiOverlay } from "@/components/solutions/diagrams/overlays/personaAi";

export const metadata: Metadata = buildMetadata({
  title: "AI Consumer Digital Twins | PersonaAI",
  description:
    "PersonaAI transforms years of consumer research into evidence-backed AI digital twins that answer business questions, validate ideas and test concepts in minutes.",
  path: "/platforms/personaai",
});

/** PersonaAI — rebuilt from the new Figma design ("Website Flow" → PersonaAI). */
export default function PersonaAIPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "PersonaAI", description: String(metadata.description), path: "/platforms/personaai" }),
        faqSchema(personaFaqs),
        breadcrumbSchema([{ name: "PersonaAI", path: "/platforms/personaai" }]),
      ]} />
      <ProductHero
        copyWidth={700}
        {...personaHero}
        visual={<HeroOverlay image={personaHero.image} config={personaAiOverlay} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Discover PersonaAI in Action", href: CTA.caseStudiesFor("personaai"), variant: "navy" },
        ]}
      />
      <ProblemIntro {...personaProblem} subTone="blue" itemStyle="pill" />
      <CenteredBand {...personaWhy} gradient="orange" />
      {personaFeatures.map((f, i) => (
        <FeatureBlock key={f.eyebrow} {...f} paragraphs={[]} flip={i % 2 === 1} bg={i % 2 === 0 ? "surface" : "white"} />
      ))}
      <ArchitectureChips {...personaArchitecture} />
      <TeamCards {...personaAudience} accent="blue" bg="surface" />
      <BenefitTiles {...personaBenefits} />
      <QuoteStory {...personaStory} />
      <IllustrationSplit {...personaGeneric} bg="surface" />
      <FaqGrid title="Questions? Let's Make Them Useful." items={personaFaqs} />
      <CtaBand
        title={["Your Next Business Decision Already", "Exists in Your Research."]}
        sub="Let's unlock it together"
        ctaLabel="Book Your PersonaAI Demo"
        ctaHref={CTA.contact}
        minHeight="lg:min-h-[398px]"
      />
    </>
  );
}
