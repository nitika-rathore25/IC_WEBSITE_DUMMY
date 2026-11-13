import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SolHero } from "@/components/solutions/SolHero";
import { SolCardGrid } from "@/components/solutions/SolCardGrid";
import { SolFlowCards } from "@/components/solutions/SolFlowCards";
import { SolSplit } from "@/components/solutions/SolSplit";
import { SolDarkTiles } from "@/components/solutions/SolDarkTiles";
import { SolTitle } from "@/components/solutions/SolGradientText";
import {
  aiHero, aiProblem, aiFramework, aiCapabilitiesTitle, aiCapabilities, aiJourney,
} from "@/data/solutions/ai-services";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { aiServicesOverlay } from "@/components/solutions/diagrams/overlays/aiServices";

export const metadata: Metadata = buildMetadata({
  title: "AI & Data Science Services",
  description:
    "AI, data science and intelligent automation, from advisory and data architecture to predictive, generative and agentic AI in production.",
  path: "/solutions/ai-services",
});

/** AI & Data Science — rebuilt from the new Figma design ("Website Flow" → AI & Data Science). */
export default function AIServicesPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "AI & Data Science", description: String(metadata.description), path: "/solutions/ai-services" }),
        breadcrumbSchema([{ name: "AI & Data Science", path: "/solutions/ai-services" }]),
      ]} />
      <SolHero {...aiHero} tone="ocean" copyWidth={700} visual={<HeroOverlay image={aiHero.image} config={aiServicesOverlay} />} />
      <SolCardGrid {...aiProblem} cols={4} align="center" />
      <SolFlowCards {...aiFramework} />
      <Section id="ai-capabilities" className="scroll-mt-28 bg-white" py="pt-12 pb-6 lg:pt-[60px] lg:pb-6">
        <SolTitle lead={aiCapabilitiesTitle.lead} tone="fuchsia" className="text-center">
          {aiCapabilitiesTitle.rest}
        </SolTitle>
      </Section>
      {aiCapabilities.map((c, i) => (
        <SolSplit
          key={c.heading}
          {...c}
          headingLevel="h3"
          imageSide={i % 2 === 0 ? "right" : "left"}
          variant="rounded"
          tight
          py={i === aiCapabilities.length - 1 ? "pt-6 pb-12 lg:pb-[60px]" : "py-6"}
        />
      ))}
      <SolDarkTiles layout="split" {...aiJourney} />
    </>
  );
}
