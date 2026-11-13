import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcDiagram } from "@/components/solutions/AiSvcDiagram";
import { genaiHero, genaiServices, genaiArchitecture } from "@/data/solutions/generative-ai-llms";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { genaiOverlay } from "@/components/solutions/diagrams/overlays/genai";

export const metadata: Metadata = buildMetadata({
  title: "Generative AI & LLMs",
  description:
    "Enterprise GenAI grounded in your knowledge, systems and workflows: AI assistants, RAG and knowledge systems, document intelligence and customised LLM applications.",
  path: "/solutions/ai-services/generative-ai-llms",
});

/** Generative AI & LLMs — rebuilt from the new Figma design. */
export default function GenerativeAILLMsPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Generative AI & LLMs", description: String(metadata.description), path: "/solutions/ai-services/generative-ai-llms" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "Generative AI & LLMs", path: "/solutions/ai-services/generative-ai-llms" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...genaiHero} visual={<HeroOverlay image={genaiHero.image} config={genaiOverlay} />} />
      <AiSvcServiceCards {...genaiServices} />
      <AiSvcDiagram {...genaiArchitecture} />
    </>
  );
}
