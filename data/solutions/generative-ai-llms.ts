import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";

/** Copy for Generative AI & LLMs — Figma "Website Flow" → Generative AI & LLMs. */

export const genaiHero = {
  badge: "Generative AI & LLMs",
  title: "Enterprise GenAI that knows your business.",
  body: [
    "Generative AI becomes exponentially more useful when it is grounded in your organisation's knowledge, systems and workflows.",
    "Insights Curry helps organisations design secure, enterprise-ready GenAI solutions, from AI assistants and knowledge systems to document intelligence and customised LLM applications.",
  ],
  image: {
    src: "/images/solutions/genai/hero.webp",
    alt: "Your knowledge, systems and workflows feeding GenAI, which powers AI assistants, knowledge systems, document intelligence and customised LLM applications",
    width: 1217,
    height: 1076,
  },
};

export const genaiServices: { title: string; items: AiSvcService[] } = {
  title: "Our Services",
  items: [
    {
      icon: "/icons/genai/generative-ai-and-llms-enterprise-genai-applications-and-assist.svg",
      title: "Enterprise GenAI Applications & Assistants",
      body: "Build role-specific AI assistants and copilots that help employees access information, create content and complete knowledge-intensive tasks.",
    },
    {
      icon: "/icons/genai/generative-ai-and-llms-rag-and-knowledge-intelligence.svg",
      title: "RAG & Knowledge Intelligence",
      body: "Connect LLMs to trusted enterprise knowledge so responses are grounded in relevant organisational information.",
    },
    {
      icon: "/icons/genai/generative-ai-and-llms-document-and-multimodal-intelligence.svg",
      title: "Document & Multimodal Intelligence",
      body: "Extract, classify and reason across documents, PDFs, images and other forms of unstructured information.",
    },
    {
      icon: "/icons/genai/generative-ai-and-llms-llm-customisation-and-fine-tuning.svg",
      title: "LLM Customisation & Fine-Tuning",
      body: "Adapt models through prompt engineering, retrieval strategies, adapters and fine-tuning when generic models aren't enough.",
    },
  ],
};

export const genaiArchitecture = {
  title: "Insights Curry Enterprise GenAI Architecture",
  sub: "Your data stays yours. Your AI works within your controls.",
  image: {
    src: "/images/solutions/genai/architecture.webp",
    alt: "Enterprise GenAI architecture: user, AI application, LLM and RAG layer, enterprise tools and APIs, enterprise knowledge, with governance across security, access, audit and evaluation",
    width: 1038,
    height: 1306,
  },
};
