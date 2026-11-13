import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcLoopFlow } from "@/components/solutions/AiSvcLoopFlow";
import { predictiveHero, predictiveServices, predictiveLoop } from "@/data/solutions/predictive-ai-ml";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { predictiveFlowOverlay } from "@/components/solutions/diagrams/overlays/predictiveFlow";

export const metadata: Metadata = buildMetadata({
  title: "Predictive AI & Machine Learning",
  description:
    "Predictive models that help teams anticipate demand, identify opportunities, optimise resources and personalise experiences.",
  path: "/solutions/ai-services/predictive-ai-ml",
});

/** Predictive AI & Machine Learning — rebuilt from the new Figma design. */
export default function PredictiveAIMLPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Predictive AI & Machine Learning", description: String(metadata.description), path: "/solutions/ai-services/predictive-ai-ml" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "Predictive AI & Machine Learning", path: "/solutions/ai-services/predictive-ai-ml" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...predictiveHero} visual={<HeroOverlay image={predictiveHero.image} config={predictiveFlowOverlay} />} />
      <AiSvcServiceCards {...predictiveServices} />
      <AiSvcLoopFlow {...predictiveLoop} />
    </>
  );
}
