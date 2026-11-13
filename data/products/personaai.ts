import type { Capability } from "@/components/product";

/** Copy for the PersonaAI page — Figma "Website Flow" → PersonaAI. */

const img = (n: string) => `/images/products/personaai/${n}`;

export const personaHero = {
  badge: "PersonaAI",
  title: "Stop Searching Through Reports.",
  highlight: "Start Talking to Your Customers.",
  body: [
    "Transform years of consumer research into evidence-backed AI digital twins that answer business questions, validate ideas, test concepts, and uncover insights in minutes, not weeks.",
  ],
  footnote: "Trusted by forward-thinking insights, marketing and innovation teams.",
  image: { src: img("hero.png"), alt: "Research documents and spreadsheets feeding an AI that creates digital consumer twins you can chat with", width: 1254, height: 1040 },
};

export const personaProblem = {
  title: [
    { text: "Every Organization Has Consumer Knowledge." },
    { text: "Very Few Can Actually Use It.", tone: "orange" as const },
  ],
  sub: "Every year, organizations invest millions in consumer research.",
  items: ["Brand trackers", "Usage & Attitude Studies", "Segmentation", "Innovation Research", "Customer Experience"],
  paragraph:
    "Yet when a new business question arises, teams start from scratch. Why? Because valuable insights remain trapped inside PowerPoint presentations, PDFs, spreadsheets and archived reports.",
  callout: {
    title: "PersonaAI changes that.",
    body: "Instead of searching through years of research, simply describe your business challenge. PersonaAI instantly creates **AI-powered digital consumer twins** from your organization's historical research, allowing you to ask questions, compare audiences and explore decisions through natural conversations. The platform grounds every response in real evidence from your research corpus, showing supporting studies, respondent coverage and confidence levels.",
  },
};

export const personaWhy = {
  eyebrow: "Why PersonaAI?",
  title: "Because your next business decision shouldn't wait for your next research project.",
  body: "Whether you're launching a product, refining your messaging, testing a concept or identifying new opportunities, PersonaAI helps you make evidence-backed decisions using the research you've already invested in.",
};

export const personaFeatures: {
  eyebrow: string;
  title: string;
  sub?: string;
  bullets: string[];
  capabilities: Capability[];
}[] = [
  {
    eyebrow: "Feature 01",
    title: "Build AI Consumer Twins That Reflect Real People",
    sub: "Not Generic Personas",
    bullets: [
      "Forget static personas that become outdated the moment they're created.",
      "PersonaAI creates dynamic digital twins based on your specific business objective, audience definition and historical research.",
      "Every persona is generated in real time from relevant respondents—not selected from a pre-built library.",
    ],
    capabilities: [
      { icon: "/icons/personaai/personaai-conversational-brief-creation.svg", title: "Conversational Brief Creation", body: "Describe your challenge naturally. PersonaAI turns it into a research brief." },
      { icon: "/icons/personaai/personaai-live-persona-generation.svg", title: "Live Persona Generation", body: "Generate statistically representative consumer twins in minutes." },
      { icon: "/icons/personaai/personaai-cross-study-intelligence.svg", title: "Cross-Study Intelligence", body: "Unify trackers, U&A, segmentation, & research into one consumer profile." },
      { icon: "/icons/personaai/personaai-confidence-scoring.svg", title: "Confidence Scoring", body: "Assess how strongly each persona is backed by historical evidence." },
      { icon: "/icons/personaai/personaai-coverage-analysis.svg", title: "Coverage Analysis", body: "Identify knowledge gaps before making critical decisions." },
      { icon: "/icons/personaai/personaai-dynamic-persona-creation.svg", title: "Dynamic Persona Creation", body: "Every new business question creates a new set of digital twins." },
    ],
  },
  {
    eyebrow: "Feature 02",
    title: "Every Answer Comes With Evidence.",
    bullets: [
      "AI shouldn't ask you to trust it. It should prove itself.",
      "PersonaAI explains why every consumer opinion exists.",
      "Every recommendation is backed by real respondents, actual studies and transparent evidence.",
      "No black box.",
      "No hallucinations.",
      "Just research-backed intelligence.",
    ],
    capabilities: [
      { icon: "/icons/personaai/personaai-supporting-research-studies.svg", title: "Supporting Research Studies", body: "Know exactly which studies contributed to every insight." },
      { icon: "/icons/personaai/personaai-respondent-transparency.svg", title: "Respondent Transparency", body: "See how many respondents support every persona." },
      { icon: "/icons/personaai/personaai-evidence-trails.svg", title: "Evidence Trails", body: "Trace every recommendation back to actual research signals." },
      { icon: "/icons/personaai/personaai-confidence-indicators.svg", title: "Confidence Indicators", body: "Understand where evidence is strong, and where caution is needed." },
      { icon: "/icons/personaai/personaai-gap-detection.svg", title: "Gap Detection", body: "PersonaAI flags missing information instead of hiding uncertainty." },
      { icon: "/icons/personaai/personaai-explainable-ai.svg", title: "Explainable AI", body: "Every insight is transparent and auditable." },
    ],
  },
  {
    eyebrow: "Feature 03",
    title: "Have Conversations That Move Business Decisions Forward",
    sub: "Research shouldn't end with reports. It should become a conversation.",
    bullets: [
      "Talk to one digital consumer. Or create an AI-powered focus group.",
      "Explore reactions.",
      "Challenge assumptions.",
      "Test messaging.",
      "Validate innovation ideas.",
      "All before spending another research dollar.",
    ],
    capabilities: [
      { icon: "/icons/personaai/personaai-one-to-one-conversations.svg", title: "One-to-One Conversations", body: "Interview individual digital twins naturally." },
      { icon: "/icons/personaai/personaai-virtual-focus-groups.svg", title: "Virtual Focus Groups", body: "Compare reactions across multiple consumer personas." },
      { icon: "/icons/personaai/personaai-concept-testing.svg", title: "Concept Testing", body: "Understand likely consumer reactions before fieldwork." },
      { icon: "/icons/personaai/personaai-message-evaluation.svg", title: "Message Evaluation", body: "Discover which communication resonates with different audiences." },
      { icon: "/icons/personaai/personaai-decision-simulation.svg", title: "Decision Simulation", body: "Explore \"what if\" scenarios safely." },
      { icon: "/icons/personaai/personaai-configurable-analysis.svg", title: "Configurable Analysis", body: "Adjust confidence thresholds, assumptions & response perspectives." },
    ],
  },
];

export const personaArchitecture = {
  title: "Enterprise AI Built for",
  highlight: "Market Research",
  paragraph:
    "Unlike generic AI assistants, PersonaAI combines multiple AI technologies with market research science to produce reliable, evidence-backed recommendations.",
  label: "AI Architecture",
  chips: [
    "Large Language\nModels",
    "Retrieval-Augmented\nGeneration (RAG)",
    "Research Knowledge\nGraphs",
    "Ontology-Based\nData Mapping",
    "Statistical Persona\nGeneration",
    "Explainable\nAI",
    "Confidence Scoring\nEngine",
    "Enterprise-Grade\nSecurity",
  ],
};

export const personaAudience = {
  title: "WHO IT'S FOR?",
  items: [
    { icon: "/icons/personaai/personaai-consumer-insights.svg", title: "Consumer Insights", body: "Unlock years of research instantly." },
    { icon: "/icons/personaai/personaai-brand-managers.svg", title: "Brand Managers", body: "Test messaging before launch." },
    { icon: "/icons/personaai/personaai-innovation-teams.svg", title: "Innovation Teams", body: "Validate concepts before investing." },
    { icon: "/icons/personaai/personaai-strategy-teams.svg", title: "Strategy Teams", body: "Make decisions backed by consumer evidence." },
    { icon: "/icons/personaai/personaai-agencies.svg", title: "Agencies", body: "Richer recommendations without extra fieldwork." },
  ],
};

export const personaBenefits = {
  title: "Turn Research Investments Into Everyday Business Decisions",
  lead: "Organizations using PersonaAI can:",
  items: [
    "Reduce insight generation time from weeks to minutes",
    "Reuse historical research instead of commissioning repetitive studies",
    "Increase the value of existing research investments",
    "Democratize access to consumer intelligence",
    "Enable faster innovation and campaign planning",
    "Improve confidence in strategic decisions",
  ],
};

export const personaStory = {
  title: "Every Great Decision Starts With Better Consumer Understanding",
  image: { src: img("story.jpg"), panel: img("story-panel.jpg"), alt: "A customer wearing a headset speaking during a call" },
  quote:
    "PersonaAI transformed years of archived research into an always-available source of consumer intelligence, enabling faster strategic discussions without waiting for new studies.",
  attribution: "~ Jeff",
};

export const personaGeneric = {
  title: "We Don't Build Generic AI.",
  sub: "We Build AI That Thinks Like Researchers.",
  paragraphs: [
    "PersonaAI is built by market researchers, data scientists and AI specialists who understand that business decisions demand evidence, not assumptions.",
    "Every recommendation is grounded in your research. Every conversation is transparent. Every insight is explainable.",
  ],
  image: { src: img("generic-ai.png"), alt: "Reports, spreadsheets and a video call flowing into an AI brain that produces a dashboard of insights", width: 1254, height: 700 },
};

export const personaFaqs = [
  { q: "What is PersonaAI?", a: "PersonaAI is an AI-powered consumer intelligence solution that transforms historical market research into evidence-backed digital consumer twins that you can interact with through natural conversations." },
  { q: "Does PersonaAI generate information using public AI models?", a: "No. Responses are grounded in your organization's research corpus and supported with transparent evidence and confidence indicators." },
  { q: "Can I test concepts before conducting fieldwork?", a: "Yes. PersonaAI allows you to explore likely reactions to concepts, messaging and innovation ideas using evidence-backed digital twins." },
  { q: "Which industries can use PersonaAI?", a: "PersonaAI is ideal for FMCG, Retail, Healthcare, Financial Services, Telecom, Consumer Goods, Agencies and any organization that relies on consumer insights." },
  { q: "How are PersonaAI personas different from traditional personas?", a: "Traditional personas are static documents. PersonaAI generates dynamic, evidence-backed digital twins specific to each business question using your existing research." },
  { q: "Can PersonaAI combine multiple research studies?", a: "Yes. PersonaAI can unify trackers, segmentation studies, U&A research and other historical datasets into a single conversational knowledge base." },
  { q: "Is PersonaAI suitable for enterprise organizations?", a: "Yes. PersonaAI is designed with enterprise governance, explainable AI, confidence scoring and secure workspaces in mind." },
  { q: "How quickly can organizations get started?", a: "Once historical research is available, PersonaAI can begin generating digital twins and answering business questions in minutes." },
];
