import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";

/** Copy for Production AI & MLOps — Figma "Website Flow" → Production AI & MLOps. */

export const mlopsHero = {
  badge: "Production AI & MLOps",
  title: "Going live is not the finish line.",
  body: [
    "A successful AI system needs to perform reliably after launch.",
    "We help organisations operationalise AI with production infrastructure, deployment pipelines, monitoring, evaluation, observability and cost optimisation.",
  ],
  image: {
    src: "/images/solutions/mlops/hero.webp",
    alt: "Go live cycle: production infrastructure, deployment pipelines, monitoring, evaluation, observability and cost optimisation",
    width: 1120,
    height: 1088,
  },
};

export const mlopsServices: { title: string; items: AiSvcService[] } = {
  title: "Our Services",
  items: [
    {
      icon: "/icons/mlops/production-ai-and-mlops-productionization-mlops-and-llmops.svg",
      title: "Productionization, MLOps & LLMOps",
      body: "Build CI/CD pipelines, model registries, deployment workflows, version control and rollback mechanisms for production AI.",
    },
    {
      icon: "/icons/mlops/production-ai-and-mlops-evaluation-monitoring-and-observability.svg",
      title: "Evaluation, Monitoring & Observability",
      body: "Monitor model quality, drift, latency, safety and reliability so teams know when intervention is needed.",
    },
    {
      icon: "/icons/mlops/production-ai-and-mlops-infrastructure-scale-and-efficiency.svg",
      title: "Infrastructure, Scale & Efficiency",
      body: "Optimise inference infrastructure and serving strategies to support demand while managing AI unit economics.",
    },
  ],
};

export const mlopsFlywheel = {
  title: "The Production AI Flywheel",
  steps: ["Build", "Deploy", "Observe", "Evaluate", "Optimise", "Retrain/Improve", "Release"],
  caption: "We don't just help you launch AI. We help your team run it.",
};
