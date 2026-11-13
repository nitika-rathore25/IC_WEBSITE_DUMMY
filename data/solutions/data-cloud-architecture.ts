import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";

/** Copy for Data & Cloud Architecture — Figma "Website Flow" → Data & Cloud Architecture. */

export const cloudHero = {
  badge: "Data & Cloud Architecture",
  title: "Build the data foundation your AI strategy needs.",
  sub: "AI is only as effective as the data infrastructure supporting it.",
  body: [
    "We help organisations modernise data environments, connect fragmented sources and create governed architectures designed for analytics, machine learning and AI.",
  ],
  // TODO(design): Figma re-uses the Predictive page hero illustration here; swap for a data/cloud-specific one.
  image: {
    src: "/images/solutions/cloud/hero.webp",
    alt: "Data sources flowing through a model into predictions and decisions",
    width: 1225,
    height: 866,
  },
};

export const cloudServices: { title: string; items: AiSvcService[] } = {
  title: "Our Services",
  items: [
    {
      icon: "/icons/datacloud/data-and-cloud-architecture-enterprise-data-architecture.svg",
      title: "Enterprise Data Architecture",
      body: "Design data domains, ownership models, governance frameworks and standards that create trusted enterprise data.",
    },
    {
      icon: "/icons/datacloud/data-and-cloud-architecture-cloud-architecture-and-modernization.svg",
      title: "Cloud Architecture & Modernization",
      body: "Design cloud environments and migration strategies that balance scalability, security, cost and flexibility.",
    },
    {
      icon: "/icons/datacloud/data-and-cloud-architecture-modern-data-platforms-and-engineering.svg",
      title: "Modern Data Platforms & Engineering",
      body: "Build modern lakehouse, warehouse and streaming environments with reliable pipelines and APIs.",
    },
    {
      icon: "/icons/datacloud/data-and-cloud-architecture-ai-ready-data-design.svg",
      title: "AI-Ready Data Design",
      body: "Prepare enterprise data for ML, RAG and GenAI through modern data platforms, cloud architecture, embeddings and AI-ready data design.",
    },
  ],
};

export const cloudDiagram = {
  title: "From Enterprise Data to AI",
  image: {
    src: "/images/solutions/cloud/data-to-ai.webp",
    alt: "Data sources (CRM, ERP, web, research, documents, IoT) flow into a data platform and governance and quality, then split into structured data for ML and analytics and unstructured data for RAG and LLM, powering AI applications and business decisions",
    width: 1222,
    height: 1020,
  },
};
