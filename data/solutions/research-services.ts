import { CTA } from "@/lib/cta-links";

/** Copy for the Research Services page — Figma "Website Flow" → Research. */

const img = (n: string) => `/images/solutions/research-services/${n}`;

export const researchHero = {
  title: "Decode Consumer Behavior & Drive",
  highlight: "Strategic Market Growth",
  sub: "People. Data. AI. Technology. Business.",
  body: [
    "Understanding your target audience requires going beyond basic transactional data. True **market intelligence** comes from uncovering core needs, subconscious motivations, attitudes, and decision-making drivers.",
    "Insights Curry integrates advanced **consumer insights**, data analytics, and modern research methodologies to deliver a 360-degree view of your audience and competitive landscape.",
  ],
  ctas: [
    { label: "Talk to Our Research Experts", shortLabel: "Talk to Our Experts", href: CTA.contact },
    { label: "Discover Our Research Methodology", shortLabel: "Discover Our Methodology", href: CTA.caseStudiesFor("research"), variant: "outline" as const },
  ],
  image: {
    src: img("hero.webp"),
    alt: "Network of consumer, behavior, insight and strategy nodes around a researcher",
    width: 1200,
    height: 800,
  },
};

export const researchQuestions = {
  eyebrow: "What Are You Trying to Solve?",
  title: "Better Questions Yield Sharper Market Insights",
  intro: "Targeted **consumer market research** addresses your most critical business questions:",
  // NOTE: the Figma frame repeats the fourth question as the fifth card; kept as designed until the client confirms.
  questions: [
    "Who is your core target audience, and what shapes their purchasing decisions?",
    "What unmet needs, values, and pain points drive their daily choices?",
    "How is your brand perceived against key competitors?",
    "How are shifting cultural and market dynamics altering audience preferences?",
    "How are shifting cultural and market dynamics altering audience preferences?",
  ],
  closing: "Data alone isn't the destination—translating complex **consumer behaviour analysis** into actionable business strategy is.",
};

export const researchOfferings = {
  title: "Build a Clearer, Data-Backed View of Your Market",
  cards: [
    {
      image: img("consumer-insights.webp"),
      alt: "Researcher examining a product in a store while a colleague looks on",
      title: "Consumer Insights & Segmentation",
      body: "Map complex buyer personas, attitudes, lifestyles, and decision frameworks.",
    },
    {
      image: img("usage-attitude.webp"),
      alt: "Hands typing on a laptop at a table during a usage study",
      title: "Usage & Attitude (U&A) Studies",
      body: "Examine category interaction, product usage frequency, and perception drivers.",
    },
    {
      image: img("needs-motivations.webp"),
      alt: "Facilitator at a whiteboard leading a group discussion",
      title: "Needs & Motivations Research",
      body: "Uncover latent consumer friction points and deep-seated purchasing triggers.",
    },
    {
      image: img("market-category.webp"),
      alt: "Person sketching a trend line on a tablet",
      title: "Market & Category Intelligence",
      body: "Assess macro market trends, category shift dynamics, and growth vectors.",
    },
    {
      image: img("cx-satisfaction.webp"),
      alt: "Team reviewing satisfaction charts on a laptop",
      title: "CX & Satisfaction Analytics",
      body: "Measure CSAT scores and pinpoint key operational drivers of overall brand loyalty.",
    },
    {
      image: img("brand-health.webp"),
      alt: "Market trend chart on a trading screen",
      title: "Brand Health Tracking & Equity",
      body: "Monitor brand awareness, sentiment metrics, and market share perception over time.",
    },
  ],
};

export const researchIntelligence = {
  heading: "Data-Driven Intelligence Built for",
  highlight: "Actionable Decisions",
  list: [
    "Granular clarity on buyer motivation and purchasing pathways",
    "Real-time visibility into shifting market dynamics and emerging trends",
    "Reduced commercial risk backed by empirical evidence",
    "Tailored research frameworks designed for your specific industry challenges",
  ],
  image: {
    src: img("intelligence.webp"),
    alt: "Insight, analysis and intelligence flowing through to decision, strategy and growth",
    width: 1200,
    height: 800,
  },
};

export const researchRelated = {
  title: "Related Offerings",
  items: [
    { title: "Product & Innovation Research", body: "Validate product concepts and optimize features before go-to-market." },
    { title: "Brand & Communication Research", body: "Test ad creative and align messaging with audience sentiment." },
    { title: "Customer Journey & Experience Mapping", body: "Diagnose touchpoint friction and boost lifetime value." },
  ],
};

// Ordered so the two-column FaqGrid reads like the design: left column Q1, Q3; right column Q2, Q4.
export const researchFaqs = [
  {
    q: "How do you determine the right research methodology for our brand?",
    a: "We align the research architecture strictly to your primary business objectives, timeline, target demographic, and budget parameters.",
  },
  {
    q: "Does this service include competitive brand tracking?",
    a: "Yes. Longitudinal brand health tracking and competitive benchmarking are core components of our research scope.",
  },
  {
    q: "What business challenges does Consumer & Market Understanding research address?",
    a: "It resolves strategic uncertainty around product-market fit, audience segmentation, brand positioning, and shifting consumer expectations.",
  },
  {
    q: "Can we integrate qualitative and quantitative methodologies?",
    a: "Absolutely. We design customized hybrid approaches combining qualitative depth (ethnography, focus groups) with quantitative scale (surveys, predictive analytics).",
  },
];
