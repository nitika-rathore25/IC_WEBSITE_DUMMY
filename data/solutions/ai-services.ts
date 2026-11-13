import { CTA } from "@/lib/cta-links";

/** Copy for the AI & Data Science page — Figma "Website Flow" → AI & Data Science. */

const img = (n: string) => `/images/solutions/ai-services/${n}`;
const sub = (slug: string) => `${CTA.aiServices}/${slug}`;

export const aiHero = {
  title: "AI That Moves From",
  highlight: "Insight to Impact",
  body: [
    "AI, data science, and intelligent automation built around the decisions your business already makes.",
    "From identifying the right opportunity to designing the data foundation, building the solution, and taking it into production, Insights Curry helps organizations turn AI ambition into systems that deliver measurable business value.",
  ],
  ctas: [
    { label: "Explore Our AI & Data Services", href: "#ai-capabilities" },
    { label: "Talk to an AI Expert", href: CTA.contact, variant: "navy" as const },
  ],
  callout: {
    title: "No AI theatre. No pilots that disappear into a deck.",
    body: "Just AI designed to be useful, usable, and owned, deployed directly on your existing estate, tied to operational decisions, and managed by your team.",
  },
  image: {
    src: img("hero.webp"),
    alt: "AI chip powering analytics dashboards, data, cloud and code panels",
    width: 1200,
    height: 800,
  },
};

export const aiProblem = {
  title: "From the Right Question to a",
  highlight: "Production-Ready Solution",
  lead: "AI initiatives often fail before the model is even built:",
  items: [
    { icon: "/icons/aids/ai-and-data-science-page-misaligned-funding.svg", title: "Misaligned Funding", body: "The wrong use case gets budget." },
    { icon: "/icons/aids/ai-and-data-science-page-unprepared-foundations.svg", title: "Unprepared Foundations", body: "Enterprise data isn't ready or trusted." },
    { icon: "/icons/aids/ai-and-data-science-page-orphaned-prototypes.svg", title: "Orphaned Prototypes", body: "Proofs-of-concept fail to integrate with legacy enterprise systems." },
    { icon: "/icons/aids/ai-and-data-science-page-operational-blindspots.svg", title: "Operational Blindspots", body: "Post-launch, teams struggle to operate, monitor, and scale." },
  ],
  closing: "We connect business questions, data, technology, and execution so every initiative follows a clear path from opportunity to outcome.",
};

export const aiFramework = {
  lead: "Proprietary Framework:",
  title: "The Insights Curry AI-to-Impact Model",
  steps: [
    { title: "Business Need", body: "What operational decision needs to change?" },
    { title: "Data Reality", body: "What data exists, and can it be trusted at scale?" },
    { title: "AI Opportunity", body: "Where does AI create sustainable competitive edge?" },
    { title: "Build & Deploy", body: "ML Models, GenAI, Agentic Workflows, Enterprise Apps" },
    { title: "Operate & Learn", body: "Continuous Monitoring, Drift Detection, Scale & Ops" },
    { title: "Business Impact", body: "Better decisions, Faster execution, Lower cost" },
  ],
};

export const aiCapabilitiesTitle = { lead: "Six Capabilities.", rest: "One connected AI journey." };

export const aiCapabilities = [
  {
    heading: "AI & Data Advisory",
    sub: "Know what to build before you invest in building it.",
    paragraphs: ["We assess AI opportunities, data readiness, technology choices and technical feasibility to create a practical roadmap for AI adoption."],
    cta: { label: "Explore AI & Data Advisory", href: sub("ai-data-advisory") },
    image: { src: img("advisory.webp"), alt: "Laptop showing AI readiness scores with cloud, data and roadmap panels", width: 1000, height: 500 },
  },
  {
    heading: "Data & Cloud Architecture",
    sub: "Build the data foundation AI depends on.",
    paragraphs: ["We design modern, governed and scalable data architectures that make enterprise data ready for analytics, AI and real-time decision-making."],
    cta: { label: "Explore Data & Cloud Architecture", href: sub("data-cloud-architecture") },
    image: { src: img("cloud.webp"), alt: "Cloud data platform with databases, security and analytics panels", width: 1000, height: 500 },
  },
  {
    heading: "Predictive AI & Machine Learning",
    sub: "Turn data into better predictions and decisions.",
    paragraphs: ["From forecasting and optimisation to recommendations, segmentation and computer vision, we build models around real business decisions."],
    cta: { label: "Explore Predictive AI & ML", href: sub("predictive-ai-ml") },
    image: { src: img("predictive.webp"), alt: "Predictive analytics dashboards with charts, maps and model nodes", width: 1000, height: 500 },
  },
  {
    heading: "Generative AI & LLMs",
    sub: "Put enterprise knowledge to work with GenAI.",
    paragraphs: ["Build secure AI assistants, RAG solutions, document intelligence and customised LLM applications grounded in your business data."],
    cta: { label: "Explore Generative AI & LLMs", href: sub("generative-ai-llms") },
    image: { src: img("genai.webp"), alt: "Laptop with an AI assistant connected to documents, data and cloud services", width: 1000, height: 500 },
  },
  {
    heading: "Agentic AI & Automation",
    sub: "Move from AI that answers to AI that acts.",
    paragraphs: ["Design intelligent agents and workflows that can reason, interact with enterprise systems and complete multi-step work—with humans in control where required."],
    cta: { label: "Explore Agentic AI & Automation", href: sub("agentic-ai-automation") },
    image: { src: img("agentic.webp"), alt: "AI agent workflow connecting enterprise apps, email, analytics and automations", width: 1000, height: 500 },
  },
  {
    heading: "Production AI & MLOps",
    sub: "Take AI from experiment to reliable production.",
    paragraphs: ["We build the infrastructure, deployment, monitoring and governance needed to operate AI reliably at scale."],
    cta: { label: "Explore Production AI & MLOps", href: sub("production-ai-mlops") },
    image: { src: img("mlops.webp"), alt: "AI core platform with dashboards, servers, security shield and monitoring panels", width: 1000, height: 500 },
  },
];

export const aiJourney = {
  title: "The Insights Curry AI Journey",
  sub: "ASSESS → ARCHITECT → BUILD → INTEGRATE → DEPLOY → MONITOR → SCALE",
  tiles: [
    { icon: "/icons/aids/ai-and-data-science-page-assess.svg", title: "Assess", bullets: ["Use case prioritization", "Economic value mapping", "Technical feasibility"] },
    { icon: "/icons/aids/ai-and-data-science-page-architect.svg", title: "Architect", bullets: ["Data pipeline design", "Cloud infrastructure", "AI security & compliance"] },
    { icon: "/icons/aids/ai-and-data-science-page-build.svg", title: "Build", bullets: ["Custom ML models", "Fine-tuned LLMs", "Autonomous agents", "Enterprise UI"] },
    { icon: "/icons/aids/ai-and-data-science-page-integrate.svg", title: "Integrate", bullets: ["API orchestration", "Legacy system hooks", "Workflow embedding"] },
    { icon: "/icons/aids/ai-and-data-science-page-deploy.svg", title: "Deploy", bullets: ["Automated production", "Governance frameworks", "Team enablement"] },
    { icon: "/icons/aids/ai-and-data-science-page-scale.svg", title: "Scale", bullets: ["Portfolio expansion", "User adoption", "Enterprise-wide value realization"] },
  ],
};
