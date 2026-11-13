import type { Capability, Tile } from "@/components/product";

/** Copy for the InsignAI page — Figma "Website Flow" → InsignAI. */

const img = (n: string) => `/images/products/insignai/${n}`;

export const insignHero = {
  badge: "InsignAI",
  title: "What If Market Research Could Think Like a",
  highlight: "Researcher?",
  sub: "Meet InsignAI.",
  body: [
    "An AI-native market research platform built specifically for research, not generic AI. From questionnaire design and data collection to analysis, visualization and insight delivery, InsignAI brings the research workflow into one intelligent system, helping teams move from business questions to evidence-backed insights at unprecedented speed.",
  ],
  image: { src: img("hero.png"), alt: "Design, Collect, Analyze and Insights flowing through AI into research insights", width: 910, height: 540 },
};

export const insignProblem = {
  pills: [
    "A business question comes up.",
    "A research brief is created.",
    "The questionnaire takes days.",
    "Fieldwork begins.",
    "Data is cleaned.",
    "Analysts start working.",
    "Charts are created.",
    "The report is written.",
  ],
  note: ["And somewhere along the way, the business moves on. The problem isn't that research lacks intelligence."],
  noteAccent: "It's that too much of the intelligence is trapped inside a slow, fragmented process.",
  title: "Research Was Built for a Slower World. Business Isn't.",
  sub: "InsignAI changes that.",
  paragraphs: [
    "It brings AI into every critical stage of market research, from designing the right questions to monitoring response quality, analysing structured and unstructured data, identifying patterns and turning findings into business-ready insights.",
    "Instead of stitching together multiple tools and manual workflows, teams get one intelligent research environment designed around how researchers actually work.",
  ],
  closing: "Research faster. Think deeper. Act sooner.",
};

export const insignWhy = {
  eyebrow: "Why InsignAI?",
  title: "Because AI Shouldn't Just Make Research Faster.",
  sub: "It Should Make Research Smarter.",
  body: [
    "Generic AI can write a question. It can summarize a report. It can create a chart. But market research requires more. It requires understanding research objectives, questionnaire logic, respondent behavior, methodology, data quality and the difference between an interesting finding and an actionable insight.",
  ],
  callout: {
    title: "That's why InsignAI has its own Market Research LLM.",
    body: "The platform is designed specifically around research logic, questionnaire nuance, respondent behavior and business outcomes, rather than simply adding a generic AI layer to an existing survey tool.",
  },
};

export const insignFeatures: {
  eyebrow: string;
  title: string;
  sub: string;
  paragraphs: string[];
  capabilities: Capability[];
}[] = [
  {
    eyebrow: "Feature 01",
    title: "Start With the Right Questions",
    sub: "Better research starts before the first response.",
    paragraphs: [
      "A great research study depends on asking the right questions in the right way.",
      "InsignAI helps transform a business objective into a structured research instrument, reducing the manual effort involved in questionnaire development while applying research best practices.",
      "Instead of starting with a blank questionnaire, start with a conversation about what you need to learn.",
    ],
    capabilities: [
      { icon: "/icons/insignai/insignai-ai-questionnaire-design.svg", title: "AI Questionnaire Design", body: "Transform research objectives into structured questionnaires using AI." },
      { icon: "/icons/insignai/insignai-smart-question-generation.svg", title: "Smart Question Generation", body: "Create relevant questions to research objectives & target audiences." },
      { icon: "/icons/insignai/insignai-research-templates.svg", title: "Research Templates", body: "Speed up research with structured, reusable research frameworks." },
      { icon: "/icons/insignai/insignai-survey-logic-and-flow.svg", title: "Survey Logic & Flow", body: "Design respondent journeys aligned with research objectives." },
      { icon: "/icons/insignai/insignai-question-quality.svg", title: "Question Quality", body: "Identify wording, bias, ambiguity, and structural issues." },
      { icon: "/icons/insignai/insignai-faster-iteration.svg", title: "Faster Iteration", body: "Refine questionnaires without starting from scratch." },
    ],
  },
  {
    eyebrow: "Feature 02",
    title: "Know Your Data Is Good Before You Trust It",
    sub: "Because bad data doesn't become good insight.",
    paragraphs: [
      "One of the biggest risks in market research happens before analysis even begins. Low-quality respondents. Speeders. Inconsistent answers. Duplicates. Incomplete responses.",
      "InsignAI brings data-quality intelligence into the research workflow, helping teams identify problems while data is being collected rather than discovering them after the project is over.",
      "The platform's current positioning specifically highlights **real-time data-quality monitoring from real human responses** as one of its differentiators.",
    ],
    capabilities: [
      { icon: "/icons/insignai/insignai-real-time-quality-monitoring.svg", title: "Real-Time Quality Monitoring", body: "Monitor response quality while fieldwork is underway." },
      { icon: "/icons/insignai/insignai-respondent-quality-checks.svg", title: "Respondent Quality Checks", body: "Identify suspicious or low-quality response behavior." },
      { icon: "/icons/insignai/insignai-data-validation.svg", title: "Data Validation", body: "Surface inconsistencies before they contaminate downstream analysis." },
      { icon: "/icons/insignai/insignai-continuous-monitoring.svg", title: "Continuous Monitoring", body: "Keep quality checks running throughout the research lifecycle." },
      { icon: "/icons/insignai/insignai-faster-intervention.svg", title: "Faster Intervention", body: "Identify issues early enough to correct them." },
      { icon: "/icons/insignai/insignai-research-grade-data.svg", title: "Research-Grade Data", body: "Build analysis on a stronger foundation of respondent data." },
    ],
  },
  {
    eyebrow: "Feature 03",
    title: "Don't just Analyze Data.",
    sub: "Understand What It Means.",
    paragraphs: [
      "Research produces enormous amounts of data. Tables. Charts. Open-ended responses. Video. Cross-tabs. Statistical outputs. The real challenge is connecting all of it.",
      "InsignAI uses AI to analyze structured and unstructured research data, helping researchers move from **what happened to why it matters.** The platform supports automated analysis across structured, text and video data.",
    ],
    capabilities: [
      { icon: "/icons/insignai/insignai-quantitative-analysis.svg", title: "Quantitative Analysis", body: "Analyze structured survey data and identify meaningful patterns." },
      { icon: "/icons/insignai/insignai-text-analysis.svg", title: "Text Analysis", body: "Transform open-ended responses into themes, sentiments, & key insights." },
      { icon: "/icons/insignai/insignai-video-analysis.svg", title: "Video Analysis", body: "Extend AI analysis to video-based research inputs." },
      { icon: "/icons/insignai/insignai-cross-data-intelligence.svg", title: "Cross-Data Intelligence", body: "Bring multiple forms of research evidence together for a richer understanding." },
      { icon: "/icons/insignai/insignai-automated-insights.svg", title: "Automated Insights", body: "Surface important patterns without requiring analysts to manually search every table." },
      { icon: "/icons/insignai/insignai-researcher-led-analysis.svg", title: "Researcher-Led Analysis", body: "Use AI to accelerate analysis while keeping researchers in control of interpretation." },
    ],
  },
  {
    eyebrow: "Feature 04",
    title: "Turn Research into a story people can actually Use",
    sub: "The best insight is the one that changes a decision.",
    paragraphs: [
      "Research shouldn't end with a spreadsheet. Or a 150-slide deck. Or a dashboard nobody opens.",
      "InsignAI transforms analysis into visual, understandable and business-ready outputs that help stakeholders see the story behind the data.",
    ],
    capabilities: [
      { icon: "/icons/insignai/insignai-intelligent-visualization.svg", title: "Intelligent Visualization", body: "Turn research findings into clear visual representations." },
      { icon: "/icons/insignai/insignai-automated-research-insights.svg", title: "Automated Research Insights", body: "Turn complex findings into clear, compelling narratives." },
      { icon: "/icons/insignai/insignai-interactive-dashboards.svg", title: "Interactive Dashboards", body: "Explore research results without rebuilding analysis manually." },
      { icon: "/icons/insignai/insignai-cross-tab-exploration.svg", title: "Cross-Tab Exploration", body: "Trace headline findings to underlying audience behaviors and variables." },
      { icon: "/icons/insignai/insignai-presentation-ready-outputs.svg", title: "Presentation-Ready Outputs", body: "Create outputs that support stakeholder decisions." },
      { icon: "/icons/insignai/insignai-insight-to-action.svg", title: "Insight to Action", body: "Connect findings to the business questions they were designed to answer." },
    ],
  },
];

export const insignFlow = {
  eyebrow: "Feature 05",
  title: "One Intelligent Workflow.",
  sub: "From Question to Insight.",
  rows: [
    { intro: "Traditional research often looks like this:", chips: ["Brief", "Questionnaire Tool", "Fieldwork", "Data Cleaning", "Analytics Tool", "Insight", "Analyst", "PowerPoint", "Decision"] },
    { intro: "InsignAI brings these stages into one AI-native research environment.", chips: ["Question", "Research Design", "Data", "Quality", "Analysis", "Insight", "Decision"] },
  ],
  outro: [
    "The result is less handoff. Less duplication. Less manual work. And far less time between asking a question and knowing what the data says.",
    "InsignAI's current positioning describes this as an end-to-end research workflow spanning questionnaire design, analysis, visualization and insight delivery.",
  ],
};

export const insignLayer = {
  title: "AI Built for Research.",
  sub: "Not AI Added to Research.",
  paragraphs: [
    "At the heart of InsignAI is a dedicated **Market Research LLM** designed around the language, logic and workflows of research.",
    "It understands that a research question isn't simply a prompt. A questionnaire isn't simply a collection of questions. And an insight isn't simply a statistical output.",
  ],
  tilesLabel: "The Intelligence Layer",
  tiles: [
    { icon: "/icons/insignai/insignai-market-research-llm.svg", title: "Market Research LLM", body: "Built specifically for market research rather than generic business tasks." },
    { icon: "/icons/insignai/insignai-generative-ai.svg", title: "Generative AI", body: "Accelerates questionnaire creation, analysis and insight generation." },
    { icon: "/icons/insignai/insignai-natural-language-processing.svg", title: "Natural Language Processing", body: "Understands open-ended responses and unstructured research data." },
    { icon: "/icons/insignai/insignai-machine-learning.svg", title: "Machine Learning", body: "Identifies patterns, relationships and emerging signals across datasets." },
    { icon: "/icons/insignai/insignai-multimodal-ai.svg", title: "Multimodal AI", body: "Enables analysis across structured, text and video research data." },
    { icon: "/icons/insignai/insignai-methodology-insights.svg", title: "Methodology Insights", body: "Embeds research principles into the workflow." },
    { icon: "/icons/insignai/insignai-automated-analytics.svg", title: "Automated Analytics", body: "Reduces manual analytical effort across the research lifecycle." },
  ] as Tile[],
};

export const insignDifferent = {
  eyebrow: "What Makes InsignAI Different?",
  title: "Most AI Tools Know Language.",
  sub: "InsignAI Knows Research.",
  items: [
    { icon: "/icons/insignai/insignai-a-dedicated-research-brain.svg", title: "A Dedicated Research Brain", body: "InsignAI is built around its own Market Research LLM rather than relying solely on generic AI." },
    { icon: "/icons/insignai/insignai-end-to-end-research.svg", title: "End-to-End Research", body: "Design, collect, monitor, analyze and interpret research within one intelligent workflow." },
    { icon: "/icons/insignai/insignai-ai-human-expertise.svg", title: "AI + Human Expertise", body: "AI handles analysis. Researchers bring context and strategic thinking." },
    { icon: "/icons/insignai/insignai-research-grade-data-quality.svg", title: "Research-Grade Data Quality", body: "Quality monitoring happens during data collection, not as an afterthought." },
    { icon: "/icons/insignai/insignai-beyond-structured-data.svg", title: "Beyond Structured Data", body: "Combine quantitative, text and video data for deeper insights." },
    { icon: "/icons/insignai/insignai-built-for-business-speed.svg", title: "Built for Business Speed", body: "Move from a research question to actionable intelligence dramatically faster." },
  ],
};

export const insignAudience = {
  eyebrow: "Who Is InsignAI For?",
  title: "Built for Teams That Need Answers Faster.",
  cards: [
    { image: img("aud-consumer.jpg"), title: "Consumer Insights Teams", body: "Run more research without proportionally increasing workload." },
    { image: img("aud-agencies.jpg"), title: "Market Research Agencies", body: "Increase project throughput while maintaining research rigor." },
    { image: img("aud-brand.jpg"), title: "Brand & Marketing Teams", body: "Get faster answers to brand, campaign and consumer questions." },
    { image: img("aud-product.jpg"), title: "Product & Innovation Teams", body: "Validate ideas and understand customers before making major investments." },
    { image: img("aud-strategy.jpg"), title: "Strategy Teams", body: "Bring evidence into strategic decisions faster." },
    { image: img("aud-leaders.jpg"), title: "Research Leaders", body: "Modernize research operations without compromising methodology." },
  ],
};

export const insignBenefits = {
  title: "Research at the Speed of Business.",
  lead: "With InsignAI, organizations can:",
  items: [
    { title: "Move Faster", body: "Compress research workflows that traditionally take weeks into dramatically shorter cycles." },
    { title: "Do More With Existing Teams", body: "Automate repetitive research tasks and give researchers more time for strategic thinking." },
    { title: "Improve Research Quality", body: "Build stronger questionnaires and monitor respondent quality throughout fieldwork." },
    { title: "Analyze More Data", body: "Process structured and unstructured research data at scale." },
    { title: "Find Deeper Insights", body: "Connect quantitative findings with themes, sentiment and qualitative signals." },
    { title: "Make Research More Accessible", body: "Give business stakeholders faster access to understandable research intelligence." },
  ],
};

/** NOTE: the design itself says these numbers must be validated against real customer data before launch. */
export const insignStats = {
  title: "The Goal Isn't More Research.",
  sub: "It's More Intelligence From Every Research Dollar.",
  body: "Final numerical claims should be validated against InsignAI's actual customer/product data before publishing.",
  label: "Potential claims section for validation:",
  stats: [
    { value: "10X", label: "Faster insight generation" },
    { value: "Weeks → Hours", label: "Accelerated research workflows" },
    { value: "100%", label: "Researcher-controlled AI workflows" },
    { value: "1 Platform", label: "Questionnaire design to insight delivery" },
  ],
};

export const insignStory = {
  title: "What Happens When Research Moves at Business Speed?",
  image: img("story.jpg"),
  items: [
    { label: "Challenge", body: "A research team needed to reduce the time spent designing, analyzing and reporting studies while maintaining research quality." },
    { label: "Solution", body: "InsignAI brought questionnaire design, data quality monitoring, analysis and insight generation into one AI-powered workflow." },
    { label: "Outcome", body: "Faster research cycles. Less manual analysis. More time for researchers to focus on what the findings actually mean." },
  ],
};

export const insignTiers = {
  title: "Research That Scales With Your Questions.",
  tiers: [
    { name: "Project", for: "For individual research studies", bestFor: "One-off research projects" },
    { name: "Team", for: "For recurring research teams", bestFor: "Brands and insights teams running multiple studies" },
    { name: "Business", for: "For organizations scaling AI-powered research", bestFor: "Multiple teams and research programs" },
    { name: "Enterprise", for: "For large-scale research transformation", bestFor: "Global organizations and complex research environments" },
    { name: "Custom", for: "For specialized research requirements", bestFor: "Agencies, Enterprises & Custom Deployments" },
  ],
};

export const insignFaqs = [
  { q: "What is InsignAI?", a: "InsignAI is an AI-native market research platform designed to help organizations execute research faster, from questionnaire design and data collection through analysis, visualization and insight delivery." },
  { q: "Is InsignAI suitable for research agencies?", a: "Yes. Its end-to-end workflow and project-based pricing make it relevant to agencies as well as internal research and insights teams." },
  { q: "How is InsignAI different from ChatGPT or generic AI tools?", a: "InsignAI is built specifically for market research and has its own Market Research LLM. It is designed to understand research logic, questionnaire design, respondent behavior and business outcomes rather than simply generate generic text." },
  { q: "Can InsignAI monitor data quality?", a: "Yes. Real-time data-quality monitoring from human respondents is one of the capabilities highlighted by InsignAI." },
  { q: "Can InsignAI be used for qualitative and quantitative research?", a: "Yes. InsignAI's research approach supports both quantitative and qualitative research workflows, including the analysis of open-ended responses and mixed-method research." },
  { q: "What types of data can InsignAI analyze?", a: "InsignAI supports analysis across structured data as well as text and video research data." },
  { q: "Can InsignAI create questionnaires?", a: "Yes. InsignAI uses AI to accelerate questionnaire design, helping researchers move from research objectives to structured surveys faster. Its own content also positions AI questionnaire generation as a core application of AI-powered survey design." },
  { q: "Does AI replace researchers?", a: "No. The strongest model is AI-augmented research. AI accelerates data processing, analysis and repetitive workflows, while researchers remain responsible for methodology, context, interpretation and strategic judgment. InsignAI's own research content describes this hybrid model as important to effective AI-powered research." },
];
