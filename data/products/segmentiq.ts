import type { Capability } from "@/components/product";

/** Copy for the SegmentIQ page — Figma "Website Flow" → SegmentIQ. */

const img = (n: string) => `/images/products/segmentiq/${n}`;

export const segmentHero = {
  badge: "SegmentIQ",
  title: "Stop Guessing Who Your Customers Are.",
  highlight: "Start Understanding Them.",
  body: [
    "Build statistically robust customer segments in minutes using AI.",
    "Simply describe your objective, upload your survey, and let SegmentIQ uncover meaningful customer groups, explain what makes them unique, and tell you how to reach them.",
  ],
  footnote: "Trusted by consumer insights teams, marketers, innovation leaders and research agencies.",
  image: { src: img("hero.png"), alt: "SegmentIQ workspace showing an AI assistant and four customer segments with their share of respondents", width: 1536, height: 1024 },
};

export const segmentProblem = {
  title: [
    { text: "Great Marketing Starts with" },
    { text: "Great Segmentation.", tone: "blue" as const },
  ],
  sub: "But Great Segmentation Has Always Been Too Complex. Every business wants to understand its customers better.",
  items: [
    "Who are your highest-value buyers?",
    "Which customers are likely to switch?",
    "Which audience responds to premium messaging?",
    "Who should you target first?",
  ],
  paragraph:
    "The answers exist in your data. Unfortunately, finding them usually requires statistical expertise, multiple software tools, manual interpretation and weeks of analysis. Most organizations never move beyond demographic segmentation because advanced analytics feels inaccessible.",
  callout: {
    title: "SegmentIQ changes that.",
    body: "Powered by AI, SegmentIQ transforms raw survey data into rich, evidence-backed customer segments through simple conversations. No coding. No clustering expertise. No statistical software. Just ask a question, and SegmentIQ does the heavy lifting from selecting the right variables and building the model to generating executive-ready insights.",
  },
};

export const segmentWhy = {
  eyebrow: "Why SegmentIQ?",
  // No-break space and word joiners (\u00a0, \u2060) keep "Age 25–34." on one line; the text looks the same.
  title: "Because your customers deserve better than Age\u00a025\u2060–\u206034.",
  body: "Demographics tell you who your customers are. SegmentIQ tells you:",
  chips: ["Why they buy", "What motivates them", "How they think", "What they'll do next", "How to win them"],
};

export const segmentFeatures: {
  eyebrow: string;
  title: string;
  sub: string;
  lead?: string;
  paragraphs: string[];
  capabilitiesTitle?: string;
  capabilities: Capability[];
}[] = [
  {
    eyebrow: "Feature 01",
    title: "AI That Thinks Like a Senior Research Analyst",
    sub: "Forget configuring statistical models.",
    paragraphs: [
      "Simply describe your objective in plain English. SegmentIQ understands your research goals, explores your data, identifies the right variables and recommends the next best step all through a natural conversation.",
    ],
    capabilities: [
      { icon: "/icons/segmentiq/segment-iq-conversational-research.svg", title: "Conversational Research", body: "Describe your business challenge instead of configuring complex software." },
      { icon: "/icons/segmentiq/segment-iq-automated-data-assessment.svg", title: "Automated Data Assessment", body: "Instantly understand sample quality, missing values, respondent counts and variable distributions." },
      { icon: "/icons/segmentiq/segment-iq-guided-research-workflow.svg", title: "Guided Research Workflow", body: "Receive intelligent recommendations throughout the segmentation journey." },
      { icon: "/icons/segmentiq/segment-iq-intelligent-data-validation.svg", title: "Intelligent Data Validation", body: "Automatically identifies issues before analysis begins." },
      { icon: "/icons/segmentiq/segment-iq-all-in-one-research.svg", title: "All-in-One Research", body: "Explore, cluster, and interpret insights in one place." },
      { icon: "/icons/segmentiq/segment-iq-built-for-business-users.svg", title: "Built for Business Users", body: "No statistics degree required." },
    ],
  },
  {
    eyebrow: "Feature 02",
    title: "AI Builds the Segmentation Strategy for You",
    sub: "One of the hardest parts of segmentation isn't running the algorithm.",
    lead: "It's knowing what should actually go into it.",
    paragraphs: [
      "SegmentIQ automatically determines which variables drive meaningful customer differences while separating descriptive information from predictive variables. The result is stronger, more reliable segments every time.",
    ],
    capabilities: [
      { icon: "/icons/segmentiq/segment-iq-intelligent-variable-selection.svg", title: "Intelligent Variable Selection", body: "AI identifies the variables that matter most." },
      { icon: "/icons/segmentiq/segment-iq-behavior-and-attitudes.svg", title: "Behavior & Attitudes", body: "Go beyond demographics to uncover motivations, attitudes, and needs." },
      { icon: "/icons/segmentiq/segment-iq-smart-feature-engineering.svg", title: "Smart Feature Engineering", body: "Reduce complex surveys into meaningful dimensions." },
      { icon: "/icons/segmentiq/segment-iq-smart-variable-classification.svg", title: "Smart Variable Classification", body: "Automatically separates drivers from profiling variables." },
      { icon: "/icons/segmentiq/segment-iq-statistical-optimization.svg", title: "Statistical Optimization", body: "Choose the right segmentation approach automatically." },
      { icon: "/icons/segmentiq/segment-iq-transparent-ai-decisions.svg", title: "Transparent AI Decisions", body: "Know exactly why every variable was selected." },
    ],
  },
  {
    eyebrow: "Feature 03",
    title: "Insights That Drive Action, Not Just Analysis",
    sub: "Customer segments aren't valuable because they exist.",
    paragraphs: [
      "They're valuable because they influence business decisions.",
      "SegmentIQ transforms statistical outputs into clear business stories, complete with customer profiles, buying behaviors, marketing recommendations and executive-ready visualizations.",
    ],
    capabilities: [
      { icon: "/icons/segmentiq/segment-iq-rich-customer-profiles.svg", title: "Rich Customer Profiles", body: "Understand who each segment really is." },
      { icon: "/icons/segmentiq/segment-iq-behavioral-signals.svg", title: "Behavioral Signals", body: "Discover what makes every customer group unique." },
      { icon: "/icons/segmentiq/segment-iq-purchase-motivations.svg", title: "Purchase Motivations", body: "Identify the drivers behind buying decisions." },
      { icon: "/icons/segmentiq/segment-iq-marketing-insights.svg", title: "Marketing Insights", body: "Know what to say, where to reach customers, and which offers resonate." },
      { icon: "/icons/segmentiq/segment-iq-executive-infographics.svg", title: "Executive Infographics", body: "Presentation-ready visual stories, no slide creation required." },
      { icon: "/icons/segmentiq/segment-iq-one-click-export.svg", title: "One-Click Export", body: "Share insights instantly across the organization." },
    ],
  },
];

export const segmentArchitecture = {
  title: "Built on AI.",
  sub: "Grounded in Research Science.",
  paragraph:
    "SegmentIQ combines artificial intelligence with advanced statistical methodologies traditionally used by experienced market researchers. Behind every segmentation model is a powerful AI engine that understands survey design, respondent behavior, variable relationships and clustering techniques, automating what once required specialist expertise.",
  label: "AI Architecture",
  chips: [
    "Conversational AI",
    "Machine Learning",
    "Feature Engineering",
    "PCA Analysis",
    "Intelligent Clustering",
    "Explainable AI",
    "Statistical Validation",
    "Enterprise Security",
  ],
};

export const segmentAudience = {
  title: "Built for Every Team That Makes",
  highlight: "Customer Decisions",
  items: [
    { icon: "/icons/segmentiq/segment-iq-consumer-insights.svg", title: "Consumer Insights", body: "Generate robust customer segments faster." },
    { icon: "/icons/segmentiq/segment-iq-marketing-teams.svg", title: "Marketing Teams", body: "Deliver highly targeted campaigns." },
    { icon: "/icons/segmentiq/segment-iq-brand-managers.svg", title: "Brand Managers", body: "Understand different customer mindsets." },
    { icon: "/icons/segmentiq/segment-iq-innovation-teams.svg", title: "Innovation Teams", body: "Identify whitespace opportunities." },
    { icon: "/icons/segmentiq/segment-iq-research-agencies.svg", title: "Research Agencies", body: "Scale segmentation without adding analysts." },
  ],
};

export const segmentBenefits = {
  title: "Smarter Segmentation. Smarter Decisions.",
  lead: "With SegmentIQ your organization can:",
  items: [
    "Reduce segmentation projects from weeks to minutes",
    "Eliminate dependency on specialist statistical resources",
    "Increase confidence in customer targeting",
    "Discover hidden customer opportunities",
    "Improve campaign effectiveness",
    "Deliver executive-ready insights faster",
  ],
};

export const segmentStop = {
  title: "Stop Building Segments.",
  sub: "Start Understanding People.",
  paragraphs: [
    "Customer segmentation shouldn't end with cluster numbers. SegmentIQ tells the story behind every customer group, who they are, what motivates them, how they buy and how your business can win them.",
    "Because the goal was never better analytics. The goal is better decisions.",
  ],
  image: { src: img("stop-building.png"), alt: "Three groups of customers feeding into a single customer profile with purchase, preference and insight signals", width: 1254, height: 670 },
};

export const segmentStory = {
  title: "Better Segmentation Creates Better Business Outcomes",
  image: { src: img("story.jpg"), panel: img("story-panel.jpg"), alt: "Two colleagues reviewing customer data together on a laptop" },
  quote:
    "What used to take multiple analysts and statistical software now happens in one intelligent workflow. SegmentIQ has transformed how we approach customer segmentation.",
  attribution: "~ Saurabh",
};

/** NOTE: the design marks these as "potential claims" that must be validated against real customer data before launch. */
export const segmentStats = {
  title: "Accelerate Research Outcomes",
  label: "Potential claims section for validation:",
  stats: [
    { value: "90%", label: "Up to 90% faster segmentation projects" },
    { value: "80%", label: "Reduce manual analytics by 80%" },
    { value: "In Minutes", label: "Executive-ready reports in minutes" },
    { value: "No Specialist", label: "analytics expertise required" },
  ],
};

export const segmentPlans = {
  title: "Plans",
  plans: [
    { name: "Starter", audience: "Small Teams" },
    { name: "Professional", audience: "Growing Research Teams" },
    { name: "Business", audience: "Agencies" },
    { name: "Enterprise", audience: "Large Enterprises" },
    { name: "Custom", audience: "Tailored Deployment" },
  ],
};

export const segmentFaqs = [
  { q: "What is SegmentIQ?", a: "SegmentIQ is an AI-powered customer segmentation platform that helps organizations build statistically robust customer segments using natural language instead of complex statistical software." },
  { q: "What data can SegmentIQ analyze?", a: "Survey data, respondent-level datasets, customer studies, brand tracking research, U&A studies and market research datasets." },
  { q: "How long does a segmentation project take?", a: "Projects that traditionally require days or weeks can often be completed in minutes, depending on dataset size and complexity." },
  { q: "Can I export results?", a: "Yes. You can export clustered datasets, detailed segment profiles and executive-ready infographics." },
  { q: "Do I need experience in statistics?", a: "No. SegmentIQ automatically recommends variables, clustering techniques and segmentation approaches while explaining every decision." },
  { q: "Can SegmentIQ create behavioral segments?", a: "Yes. The platform supports behavioral, attitudinal and perception-based segmentation, not just demographic segmentation." },
  { q: "Can I compare multiple segmentation models?", a: "Absolutely. SegmentIQ saves every run, allowing teams to compare different segmentation strategies and select the most effective one." },
  { q: "Is SegmentIQ secure for enterprise use?", a: "Yes. SegmentIQ is designed for enterprise environments with secure workspaces, governed access and scalable deployment." },
];
