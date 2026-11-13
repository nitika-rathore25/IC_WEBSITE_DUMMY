import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product";
import { AiSvcServiceCards } from "@/components/solutions/AiSvcServiceCards";
import { AiSvcDiagram } from "@/components/solutions/AiSvcDiagram";
import { agenticHero, agenticServices, agenticLoop } from "@/data/solutions/agentic-ai-automation";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { agenticOverlay } from "@/components/solutions/diagrams/overlays/agentic";

export const metadata: Metadata = buildMetadata({
  title: "Agentic AI & Automation",
  description:
    "AI agents that plan, reason, use tools, interact with enterprise systems and complete multi-step workflows, with human approval where the decision requires it.",
  path: "/solutions/ai-services/agentic-ai-automation",
});

/** Agentic AI & Automation — rebuilt from the new Figma design. */
export default function AgenticAIAutomationPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Agentic AI & Automation", description: String(metadata.description), path: "/solutions/ai-services/agentic-ai-automation" }),
        breadcrumbSchema([
          { name: "AI & Data Science", path: "/solutions/ai-services" },
          { name: "Agentic AI & Automation", path: "/solutions/ai-services/agentic-ai-automation" },
        ]),
      ]} />
      <ProductHero variant="service" copyWidth={700} {...agenticHero} visual={<HeroOverlay image={agenticHero.image} config={agenticOverlay} />} />
      <AiSvcServiceCards {...agenticServices} />
      <AiSvcDiagram {...agenticLoop} />
    </>
  );
}
