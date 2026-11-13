import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import { BenefitGrid, FaqGrid } from "@/components/product";
import { SolHero } from "@/components/solutions/SolHero";
import { ResearchNetworkDiagram } from "@/components/solutions/diagrams/ResearchNetworkDiagram";
import { SolQuestionBand } from "@/components/solutions/SolQuestionBand";
import { SolPhotoCards } from "@/components/solutions/SolPhotoCards";
import { SolSplit } from "@/components/solutions/SolSplit";
import { CTA } from "@/lib/cta-links";
import {
  researchHero, researchQuestions, researchOfferings, researchIntelligence, researchRelated, researchFaqs,
} from "@/data/solutions/research-services";

export const metadata: Metadata = buildMetadata({
  title: "Market Research Services",
  description:
    "Consumer and market research that decodes behavior, uncovers needs and motivations, and turns audience data into strategic market growth.",
  path: "/solutions/research-services",
});

/** Research Services — rebuilt from the new Figma design ("Website Flow" → Research). */
export default function ResearchServicesPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Research Solution", description: String(metadata.description), path: "/solutions/research-services" }),
        faqSchema(researchFaqs),
        breadcrumbSchema([{ name: "Research Solution", path: "/solutions/research-services" }]),
      ]} />
      <SolHero {...researchHero} tone="violet" copyWidth={770} largeVisual visual={<ResearchNetworkDiagram />} />
      <SolQuestionBand {...researchQuestions} />
      <SolPhotoCards {...researchOfferings} />
      <SolSplit
        bg="surface"
        imageSide="right"
        heading={researchIntelligence.heading}
        highlight={researchIntelligence.highlight}
        list={researchIntelligence.list}
        image={researchIntelligence.image}
      />
      <BenefitGrid title={researchRelated.title} items={researchRelated.items} />
      <FaqGrid title="Questions? Let's Make Them Useful." items={researchFaqs} />
      <CtaBand
        title={["Ready to Understand Your Market?"]}
        sub="Turn audience data into your strongest competitive advantage."
        ctaLabel="Connect with Our Research Strategy Team"
        ctaHref={CTA.contact}
        minHeight="lg:min-h-[360px]"
      />
    </>
  );
}
