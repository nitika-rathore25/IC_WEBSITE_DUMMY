import type { Capability } from "@/components/product";

/** Copy for the Concept AI (Concept Generator) page — Figma "Website Flow" → Concept AI. */

const img = (n: string) => `/images/products/conceptai/${n}`;

export const conceptHero = {
  badge: "ConceptAI",
  title: "Great Products Don't Start with",
  highlight: "Great Ideas.",
  sub: "They Start with Great Concepts.",
  body: [
    "Transform a simple business objective into structured, research-ready product concepts using AI. Build better concepts, validate faster, and bring innovation to market with confidence.",
  ],
  // Unverified claim from the design: needs client validation before launch.
  footnote: "Trusted by innovation teams, consumer insights leaders, product managers and marketing organizations.",
  image: { src: img("hero.webp"), alt: "A brief document feeding an AI layer that produces product concept cards for skincare packaging", width: 1536, height: 1024 },
};

export const conceptIntro = {
  title: "Every Great Innovation Begins with a Strong Concept.",
  sub: "So Why Is Concept Development Still So Manual?",
  paragraphs: [
    "The biggest challenge in innovation isn't generating ideas. It's transforming ideas into concepts that customers actually understand, researchers can test, and leadership can confidently approve.",
    "Today, concept creation is fragmented. Marketing writes the brief. Research rewrites it. Design creates visuals. Innovation asks for revisions. Legal checks compliance. By the time everyone aligns, weeks have passed. And that's before consumer testing even begins.",
  ],
  callout: {
    title: "Concept Generator changes the entire process.",
    body: "Instead of coordinating multiple teams and endless review cycles, simply describe your business objective. Concept Generator orchestrates specialized AI agents to transform your objectives into structured, brand-aligned, research-ready concepts complete with messaging, visuals and testing assets, all within minutes.",
  },
};

export const conceptBand = {
  title: ["Because Great Innovation Deserves Better", "Than Endless Revisions."],
  body: [
    "Whether you're launching a new product, extending a brand, exploring new categories or validating ideas before research, Concept Generator helps teams move from business challenge to consumer-ready concepts, faster than ever.",
  ],
};

export const conceptFeatures: {
  eyebrow: string;
  title: string;
  sub: string;
  paragraphs: string[];
  capabilities: Capability[];
}[] = [
  {
    eyebrow: "Feature 01",
    title: "Turn Business Objectives into Powerful Concept Briefs",
    sub: "Every successful innovation starts with clarity.",
    paragraphs: [
      "Instead of writing long creative briefs or learning prompt engineering, simply explain your objective as you would to a colleague.",
      "Concept Generator captures your intent, asks intelligent follow-up questions and automatically creates a structured innovation brief that becomes the foundation for every concept.",
    ],
    capabilities: [
      { icon: "/icons/conceptai/concept-ai-conversational-brief-builder.svg", title: "Conversational Brief Builder", body: "Describe your challenge naturally." },
      { icon: "/icons/conceptai/concept-ai-intelligent-brief-evaluation.svg", title: "Intelligent Brief Evaluation", body: "AI identifies missing information before generation begins." },
      { icon: "/icons/conceptai/concept-ai-intent-recognition.svg", title: "Intent Recognition", body: "Automatically maps objectives to the most suitable framework." },
      { icon: "/icons/conceptai/concept-ai-audience-definition.svg", title: "Audience Definition", body: "Capture target users, benefits and positioning effortlessly." },
      { icon: "/icons/conceptai/concept-ai-research-ready-structure.svg", title: "Research-Ready Structure", body: "Every brief follows a standardized innovation framework." },
      { icon: "/icons/conceptai/concept-ai-faster-project-kickoff.svg", title: "Faster Project Kickoff", body: "Reduce briefing time from days to minutes." },
    ],
  },
  {
    eyebrow: "Feature 02",
    title: "Multiple AI Specialists.",
    sub: "One Intelligent Workflow.",
    paragraphs: [
      "Innovation isn't one task. It's many specialized activities working together.",
      "Concept Generator uses multiple AI agents, each responsible for a different part of concept development, from research and ideation to messaging, visuals and refinement, working together as one integrated system.",
    ],
    capabilities: [
      { icon: "/icons/conceptai/concept-ai-multi-agent-ai-collaboration.svg", title: "Multi-Agent AI Collaboration", body: "Specialized AI agents work together seamlessly." },
      { icon: "/icons/conceptai/concept-ai-research-ready-concepts.svg", title: "Research-Ready Concepts", body: "Generate concepts designed for qualitative and quantitative testing." },
      { icon: "/icons/conceptai/concept-ai-rapid-concept-creation.svg", title: "Rapid Concept Creation", body: "Produce multiple concept routes in minutes." },
      { icon: "/icons/conceptai/concept-ai-visual-concept-development.svg", title: "Visual Concept Development", body: "Generate supporting visuals alongside messaging." },
      { icon: "/icons/conceptai/concept-ai-clear-innovation-outputs.svg", title: "Clear Innovation Outputs", body: "Concepts follow consistent formats for easier evaluation." },
      { icon: "/icons/conceptai/concept-ai-accelerated-ideation.svg", title: "Accelerated Ideation", body: "Explore more possibilities without increasing timelines." },
    ],
  },
  {
    eyebrow: "Feature 03",
    title: "Create Concepts That Stay On Brand",
    sub: "The best concept isn't always the most creative.",
    paragraphs: [
      "It's the one your organization can confidently launch.",
      "Concept Generator continuously validates every output against your brand guidelines, design principles and governance rules to ensure every concept remains consistent, compliant and enterprise-ready.",
    ],
    capabilities: [
      { icon: "/icons/conceptai/concept-ai-brand-guideline-intelligence.svg", title: "Brand Guideline Intelligence", body: "Apply brand rules automatically." },
      { icon: "/icons/conceptai/concept-ai-asset-learning.svg", title: "Asset Learning", body: "Leverage existing campaigns and brand assets." },
      { icon: "/icons/conceptai/concept-ai-compliance-validation.svg", title: "Compliance Validation", body: "Detect risks before concepts move forward." },
      { icon: "/icons/conceptai/concept-ai-visual-quality-review.svg", title: "Visual Quality Review", body: "Evaluate generated visuals against brand standards." },
      { icon: "/icons/conceptai/concept-ai-explainable-ai.svg", title: "Explainable AI", body: "Understand why recommendations were made." },
      { icon: "/icons/conceptai/concept-ai-enterprise-governance.svg", title: "Enterprise Governance", body: "Support secure collaboration across teams." },
    ],
  },
  {
    eyebrow: "Feature 04",
    title: "Refine Ideas Without Starting Over",
    sub: "Innovation is rarely perfect on the first attempt.",
    paragraphs: [
      "Instead of rebuilding concepts from scratch, refine them through simple conversations. Ask AI to shorten messaging. Change the audience.",
      "Modify the benefit. Explore another direction. Every version remains connected, allowing teams to compare, improve and confidently choose the strongest concept.",
    ],
    capabilities: [
      { icon: "/icons/conceptai/concept-ai-conversational-editing.svg", title: "Conversational Editing", body: "Refine concepts using natural language." },
      { icon: "/icons/conceptai/concept-ai-version-management.svg", title: "Version Management", body: "Track every concept iteration." },
      { icon: "/icons/conceptai/concept-ai-secure-enterprise-projects.svg", title: "Secure Enterprise Projects", body: "Maintain governance and auditability." },
      { icon: "/icons/conceptai/concept-ai-collaborative-workspace.svg", title: "Collaborative Workspace", body: "Share concepts across teams." },
      { icon: "/icons/conceptai/concept-ai-knowledge-repository.svg", title: "Knowledge Repository", body: "Reuse successful concepts in future innovation projects." },
      { icon: "/icons/conceptai/concept-ai-visual-refinement.svg", title: "Visual Refinement", body: "Improve layouts and creative direction instantly." },
    ],
  },
];

export const conceptArchitecture = {
  highlight: "AI Designed",
  title: "for Innovation Teams",
  body: "Concept Generator combines generative AI, multi-agent orchestration and enterprise governance to transform innovation from a fragmented process into a connected workflow.",
  label: "AI Architecture",
  chips: [
    "Multi-Agent AI", "Large Language Models", "Brand Knowledge Engine", "Prompt Orchestration",
    "Visual AI", "Enterprise Governance", "Collaboration Framework", "Explainable AI",
  ],
};

export const conceptAudience = {
  title: "Who It's For",
  items: [
    { title: "Innovation Teams", body: "Accelerate product development." },
    { title: "Consumer Insights Teams", body: "Generate better concepts for testing." },
    { title: "Brand Managers", body: "Ensure consistency across every concept." },
    { title: "Product Managers", body: "Move from idea to validation faster." },
    { title: "Research Agencies", body: "Create consumer-ready concepts for clients." },
    { title: "Marketing Teams", body: "Build campaigns around stronger innovation ideas." },
  ],
};

export const conceptBefore = {
  title: "Because Winning Products Are Designed Before They're Built.",
  image: { src: img("because.webp"), alt: "Consumer research and product concepts moving along a conveyor belt toward a finished launch", width: 1536, height: 1024 },
  sections: [
    {
      sub: "Every successful launch starts long before manufacturing.",
      paragraphs: [
        "It starts with understanding consumers. Aligning teams. Testing stronger concepts. And making smarter decisions. Concept Generator helps organizations do all four, faster.",
      ],
    },
  ],
};

/** The quote is unattributed in the design: needs a real, approved customer quote before launch. */
export const conceptStory = {
  title: "Innovation Teams Move Faster When AI Handles the Heavy Lifting",
  image: img("story.jpg"),
  panelImage: img("story-panel.jpg"),
  quote: {
    text: "Concept Generator reduced weeks of concept development into a collaborative workflow that produced research-ready concepts in a fraction of the time.",
    attribution: "~ Lisa",
  },
};

/** The blue sub line is shown as in the design (client review asked for the missing text). */
export const conceptSpeed = {
  title: "Innovation at Enterprise Speed",
  sub: "Marketing claims should be validated before publication.",
  tiles: [
    { title: "Up to 80% faster concept development" },
    { title: "Generate multiple concepts in a single session" },
    { title: "Reduce briefing and review cycles dramatically" },
    { title: "Create consumer testing assets automatically" },
    { title: "Improve collaboration across research, marketing and product teams" },
  ],
};

export const conceptPlans = {
  title: "Plans",
  tiers: [
    { name: "Starter", text: "Individuals" },
    { name: "Professional", text: "Innovation Teams" },
    { name: "Business", text: "Mid-size Organizations" },
    { name: "Enterprise", text: "Global Enterprises" },
    { name: "Custom", text: "Tailored Deployment" },
  ],
};

export const conceptFaqs = [
  { q: "What is Concept Generator?", a: "Concept Generator is an AI-powered innovation platform that transforms business objectives into structured, research-ready product concepts." },
  { q: "Does it generate multiple concept variations?", a: "Yes. Multiple AI agents collaborate to produce several concept routes for evaluation and refinement." },
  { q: "Does the platform follow brand guidelines?", a: "Yes. Concept Generator incorporates brand rules, existing assets and compliance checks to keep outputs aligned with your organization." },
  { q: "Is the platform suitable for enterprise teams?", a: "Yes. Enterprise governance, secure workspaces, permissions and reusable knowledge libraries support large-scale collaboration." },
  { q: "Can I use Concept Generator without prompt engineering experience?", a: "Yes. Simply describe your objective in plain language. The platform builds the brief and guides the rest of the workflow." },
  { q: "Can I refine concepts after they're created?", a: "Absolutely. Every concept can be modified through natural conversations while preserving version history." },
  { q: "Can concepts be used directly for consumer research?", a: "Yes. Concepts are structured specifically for qualitative and quantitative testing." },
  { q: "Which industries benefit most from Concept Generator?", a: "FMCG, Retail, Healthcare, Consumer Goods, Financial Services, Technology, Automotive and any organization focused on continuous product or service innovation." },
];
