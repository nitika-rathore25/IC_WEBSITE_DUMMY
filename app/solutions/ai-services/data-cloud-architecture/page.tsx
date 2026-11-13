import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcDiagram } from "@/components/solutions/AiSvcDiagram";
import { cloudHero, cloudServices, cloudDiagram } from "@/data/solutions/data-cloud-architecture";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { predictiveFlowOverlay } from "@/components/solutions/diagrams/overlays/predictiveFlow";

export const metadata: Metadata = buildMetadata({
  title: "Data & Cloud Architecture",
  description:
    "Build the data foundation your AI strategy needs: modern data environments, connected sources and governed architectures for analytics, machine learning and AI.",
  path: "/solutions/ai-services/data-cloud-architecture",
});

/** Data & Cloud Architecture — rebuilt from the new Figma design. */
export default function DataCloudArchitecturePage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Data & Cloud Architecture", description: String(metadata.description), path: "/solutions/ai-services/data-cloud-architecture" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "Data & Cloud Architecture", path: "/solutions/ai-services/data-cloud-architecture" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...cloudHero} visual={<HeroOverlay image={cloudHero.image} config={predictiveFlowOverlay} />} />
      <AiSvcServiceCards {...cloudServices} />
      <AiSvcDiagram {...cloudDiagram} layout="center" />
    </>
  );
}
