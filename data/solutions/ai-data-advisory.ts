import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";
import type { AiSvcFactor } from "@/components/solutions/AiSvcScoreFormula";

/** Copy for AI & Data Advisory — Figma "Website Flow" → AI & Data Advisory. */

export const advisoryHero = {
  badge: "AI & Data Advisory",
  title: "Know where AI can create value before you",
  highlight: "invest in it.",
  sub: "AI strategy shouldn't start with a technology.",
  body: [
    "It should start with a business decision. Insights Curry helps organisations identify the right AI opportunities, assess feasibility, evaluate technology choices and create practical roadmaps for implementation.",
  ],
  image: {
    src: "/images/solutions/advisory/hero.webp",
    alt: "Path from AI through identifying opportunities, assessing feasibility and evaluating technology choices to value",
    width: 1243,
    height: 904,
  },
};

export const advisoryQuestions = {
  title: "What We Help You Answer",
  questions: [
    "Which AI use cases are worth pursuing?",
    "Is the required data available and usable?",
    "What technology architecture do we need?",
    "Build, buy or customise?",
    "What will it cost to implement and operate?",
    "What should happen now & what can wait?",
  ],
};

export const advisoryServices: { title: string; items: AiSvcService[] } = {
  title: "Our Advisory Services",
  items: [
    {
      icon: "/icons/advisory/ai-and-data-advisory-use-case-and-technical-feasibility.svg",
      title: "Use Case & Technical Feasibility",
      body: "Evaluate business value, data readiness, technical complexity, risk and implementation feasibility before significant investment.",
      keywords: "AI feasibility assessment, AI use case assessment, AI consulting",
    },
    {
      icon: "/icons/advisory/ai-and-data-advisory-solution-and-integration-architecture.svg",
      title: "Solution & Integration Architecture",
      body: "Design how data, models, applications, APIs and identity work together within your existing technology environment.",
      keywords: "AI solution architecture, AI integration architecture",
    },
    {
      icon: "/icons/advisory/ai-and-data-advisory-technology-and-platform-selection.svg",
      title: "Technology & Platform Selection",
      body: "Evaluate AI platforms, cloud technologies, models and vendors against cost, performance, security and organisational requirements.",
      keywords: "AI technology consulting, AI platform selection",
    },
    {
      icon: "/icons/advisory/ai-and-data-advisory-technical-modernisation.svg",
      title: "Technical Modernisation",
      body: "Create a practical roadmap for modernising legacy technology and data environments so they can support AI and advanced analytics.",
      keywords: "AI technology modernisation, AI infrastructure consulting",
    },
  ],
};

export const advisoryScore: { title: string; factors: AiSvcFactor[]; result: { icon: string; label: string } } = {
  title: "The Insights Curry AI Opportunity Score",
  factors: [
    { icon: "/icons/advisory/ai-and-data-advisory-business-value.svg", label: "Business Value", operator: "×", tone: "border-pink-300/70 bg-gradient-to-b from-pink-50 to-white text-pink-500" },
    { icon: "/icons/advisory/ai-and-data-advisory-data-readiness.svg", label: "Data Readiness", operator: "×", tone: "border-blue-300/70 bg-gradient-to-b from-blue-50 to-white text-blue-600" },
    { icon: "/icons/advisory/ai-and-data-advisory-technical-feasibility.svg", label: "Technical Feasibility", operator: "×", tone: "border-violet-300/70 bg-gradient-to-b from-violet-50 to-white text-violet-600" },
    { icon: "/icons/advisory/ai-and-data-advisory-adoption-potential.svg", label: "Adoption Potential", operator: "÷", tone: "border-teal-300/70 bg-gradient-to-b from-teal-50 to-white text-teal-500" },
    { icon: "/icons/advisory/ai-and-data-advisory-risk-and-complexity.svg", label: "Risk & Complexity", tone: "border-amber-300/70 bg-gradient-to-b from-amber-50 to-white text-amber-500" },
  ],
  result: { icon: "/icons/advisory/ai-and-data-advisory-ai-priority-score.svg", label: "AI Priority Score" },
};
