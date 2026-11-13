import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTA } from "@/lib/cta-links";
import { ProductHero, ImageCards, FaqGrid } from "@/components/product";
import { CenteredIntro } from "@/components/product-extra/CenteredIntro";
import { CenteredGradientBand } from "@/components/product-extra/CenteredGradientBand";
import { FeatureSplit } from "@/components/product-extra/FeatureSplit";
import { Callout } from "@/components/product-extra/Callout";
import { RhythmFlow } from "@/components/product-extra/RhythmFlow";
import { StepCards } from "@/components/product-extra/StepCards";
import { ChevronBand } from "@/components/product-extra/ChevronBand";
import { IconTileColumns } from "@/components/product-extra/IconTileColumns";
import { TileSplit } from "@/components/product-extra/TileSplit";
import { ImageSplit } from "@/components/product-extra/ImageSplit";
import { StoryPanel } from "@/components/product-extra/StoryPanel";
import { PlanBand } from "@/components/product-extra/PlanBand";
import { CtaBandDual } from "@/components/product-extra/CtaBandDual";
import {
  enspeekHero, enspeekProblem, enspeekListen, enspeekFeature1, enspeekFeature2, enspeekFeature3,
  enspeekFeature4, enspeekRhythm, enspeekSteps, enspeekDifferent, enspeekListening, enspeekUseCases,
  enspeekResults, enspeekEcosystem, enspeekStory, enspeekPlans, enspeekFaqs,
} from "@/data/products/enspeek";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { enspeekOverlay } from "@/components/solutions/diagrams/overlays/enspeek";

export const metadata: Metadata = buildMetadata({
  title: "Conversational AI Research | Enspeek",
  description:
    "EnspeeK turns everyday consumer conversations on WhatsApp, Messenger and web links into structured research intelligence, using adaptive AI that listens, probes and understands.",
  path: "/platforms/enspeek",
});

/** Enspeek — rebuilt from the new Figma design ("Website Flow" → Enspeek). */
export default function EnspeekPage() {
  const { callout: f1Callout, ...f1 } = enspeekFeature1;
  const { callout: f4Callout, ...f4 } = enspeekFeature4;
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({ name: "Enspeek", description: String(metadata.description), path: "/platforms/enspeek" }),
        faqSchema(enspeekFaqs),
        breadcrumbSchema([{ name: "Enspeek", path: "/platforms/enspeek" }]),
      ]} />
      <ProductHero
        {...enspeekHero}
        visual={<HeroOverlay image={enspeekHero.image} config={enspeekOverlay} />}
        ctas={[
          { label: "Book a Demo", href: CTA.contact },
          { label: "Discover How EnspeeK Works", href: CTA.caseStudiesFor("enspeek"), variant: "navy" },
        ]}
      />
      <CenteredIntro {...enspeekProblem} />
      <CenteredGradientBand {...enspeekListen} />
      <FeatureSplit {...f1} bg="surface" extra={<Callout {...f1Callout} />} />
      <FeatureSplit {...enspeekFeature2} flip cols={2} />
      <FeatureSplit {...enspeekFeature3} bg="surface" cols={2} />
      <FeatureSplit {...f4} flip extra={<Callout {...f4Callout} />} />
      <RhythmFlow {...enspeekRhythm} />
      <StepCards {...enspeekSteps} />
      <ChevronBand {...enspeekDifferent} />
      <IconTileColumns {...enspeekListening} marquee />
      <ImageCards {...enspeekUseCases} wide />
      <TileSplit {...enspeekResults} />
      <ImageSplit {...enspeekEcosystem} />
      <StoryPanel {...enspeekStory} imageFrame="lg:-left-[29.81%] lg:-top-[28.79%] lg:h-[138.71%] lg:w-full" cta={{ label: "Read Full Case Study", href: CTA.caseStudy("the-rating-told-them-what-happened-nobody-could-say-why") }} />
      <PlanBand {...enspeekPlans} layout="stacked" cta={{ label: "Talk to an Expert", href: CTA.contact }} ctaLight />
      <FaqGrid title="Questions? Let's Make Them Useful." items={enspeekFaqs} />
      <CtaBandDual
        title={["Your Customers Are Already Talking.", "Start Listening Differently."]}
        sub="Turn everyday conversations into strategic consumer understanding, and understanding into growth."
        primary={{ label: "Book Your Personalized Demo", href: CTA.contact }}
        secondary={{ label: "Talk to a Research Expert", href: CTA.contact, light: true }}
      />
    </>
  );
}
