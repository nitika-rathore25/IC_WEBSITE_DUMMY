import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { CTA } from "@/lib/cta-links";
import { AiSvcQuestionBand } from "@/components/solutions/AiSvcQuestionBand";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcScoreFormula } from "@/components/solutions/AiSvcScoreFormula";
import { advisoryHero, advisoryQuestions, advisoryServices, advisoryScore } from "@/data/solutions/ai-data-advisory";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { advisoryOverlay } from "@/components/solutions/diagrams/overlays/advisory";

export const metadata: Metadata = buildMetadata({
  title: "AI & Data Advisory",
  description:
    "Know where AI can create value before you invest in it. Insights Curry helps organisations identify AI opportunities, assess feasibility, evaluate technology choices and build practical roadmaps.",
  path: "/solutions/ai-services/ai-data-advisory",
});

/** AI & Data Advisory — rebuilt from the new Figma design. */
export default function AIDataAdvisoryPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "AI & Data Advisory", description: String(metadata.description), path: "/solutions/ai-services/ai-data-advisory" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "AI & Data Advisory", path: "/solutions/ai-services/ai-data-advisory" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...advisoryHero} visual={<HeroOverlay image={advisoryHero.image} config={advisoryOverlay} />} ctas={[{ label: "Assess Your AI Opportunity", href: CTA.contact }]} />
      <AiSvcQuestionBand {...advisoryQuestions} />
      <AiSvcServiceCards {...advisoryServices} />
      <AiSvcScoreFormula {...advisoryScore} />
    </>
  );
}
