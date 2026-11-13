import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcLoopFlow } from "@/components/solutions/AiSvcLoopFlow";
import { mlopsHero, mlopsServices, mlopsFlywheel } from "@/data/solutions/production-ai-mlops";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { mlopsOverlay } from "@/components/solutions/diagrams/overlays/mlops";

export const metadata: Metadata = buildMetadata({
  title: "Production AI & MLOps",
  description:
    "Going live is not the finish line. We help organisations operationalise AI with production infrastructure, deployment pipelines, monitoring, evaluation, observability and cost optimisation.",
  path: "/solutions/ai-services/production-ai-mlops",
});

/** Production AI & MLOps — rebuilt from the new Figma design. */
export default function ProductionAIMLOpsPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Production AI & MLOps", description: String(metadata.description), path: "/solutions/ai-services/production-ai-mlops" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "Production AI & MLOps", path: "/solutions/ai-services/production-ai-mlops" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...mlopsHero} visual={<HeroOverlay image={mlopsHero.image} config={mlopsOverlay} />} />
      <AiSvcServiceCards {...mlopsServices} cols={3} />
      <AiSvcLoopFlow {...mlopsFlywheel} />
    </>
  );
}
