import type { ImageSplitSection } from "@/components/product-extra/ImageSplit";

/** Copy for the TalknAct (TalkNAct) page — Figma "Website Flow" → TalknAct. */

const img = (n: string) => `/images/products/talknact/${n}`;

export const talkHero = {
  badge: "TalknAct",
  title: "Tell AI What You Want Done.",
  highlight: "TalkNAct Builds the Workflow.",
  body: [
    "TalkNAct is a domain-agnostic Agentic AI platform that turns business objectives into dynamic multi-agent workflows. Describe what you need, screen resumes, score leads, segment customers or flag anomalies. TalkNAct determines the agents, tools, models and execution sequence required to get it done.",
  ],
  image: { src: img("hero.webp"), alt: "TalkNAct turning prioritised experience, excluded variables and an alternative model into refined data, a new output and real-time adjustments", width: 1536, height: 1024 },
};

export const talkProblem = {
  title: "AI Shouldn't Require You to Build the AI.",
  paragraphs: [
    "Businesses know what they want AI to accomplish. Turning that objective into the right agents, models, tools and workflow is the harder part.",
  ],
  pills: ["Orchestrate agent roles", "Architecture is created", "Execute & analyze", "Act & refine"],
  outro: "TalkNAct changes the starting point: you define the outcome; TalkNAct creates the architecture.",
};

export const talkOutcome = {
  title: "AI That Starts With the Outcome, Not the Workflow.",
  paragraphs: ["Describe the objective in natural language. TalkNAct determines the architecture required to accomplish it."],
  flow: ["Describe", "Architect", "Execute", "Analyse", "Act"],
  lead: "The architecture adapts to the objective instead of forcing the objective into a fixed workflow.",
};

interface TalkFeature {
  eyebrow: string;
  title: string;
  sections: ImageSplitSection[];
  image: { src: string; alt: string; width: number; height: number };
}

export const talkFeatures: TalkFeature[] = [
  {
    eyebrow: "Feature 01",
    title: "Describe the Outcome. Let TalkNAct Build the Architecture.",
    sections: [
      {
        paragraphs: [
          "Start with a business objective, not a technical specification. TalkNAct determines the agents, responsibilities, tools, models and sequence required to execute it.",
        ],
        bullets: ["Natural-language objective setup", "Dynamic architecture creation", "Task-specific agents", "Tool and model selection"],
      },
    ],
    image: { src: img("feature-1.webp"), alt: "A chat request flowing into TalkNAct, which fans out to search, analytics, document and settings agents and returns a growth chart", width: 1514, height: 1039 },
  },
  {
    eyebrow: "Feature 02",
    title: "Build an Intelligent Multi-Agent Workflow.",
    sections: [
      {
        paragraphs: [
          "Complex business problems need multiple specialised steps. TalkNAct coordinates agents, handoffs, tools and models into one execution flow.",
        ],
        bullets: ["Agents created for the job", "Specialised responsibilities", "Multi-LLM execution", "Coordinated agent handoffs"],
      },
    ],
    image: { src: img("feature-2.webp"), alt: "TalkNAct at the centre of a ring of specialised agents connected to tools, models and apps such as Excel, Slack, Gmail and Google", width: 1514, height: 1039 },
  },
  {
    eyebrow: "Feature 03",
    title: "Give AI the Data and Intelligence It Needs.",
    sections: [
      {
        paragraphs: [
          "TalkNAct works with structured and unstructured inputs and can invoke analytics and ML methods when the objective requires them.",
        ],
        bullets: ["CSV, Excel, documents, resumes and text", "Clustering and segmentation", "Classification and prediction", "Profiling and visualisation"],
      },
    ],
    image: { src: img("feature-3.webp"), alt: "Spreadsheets, PDFs, documents and images flowing into TalkNAct and out as charts, segments and insights", width: 1514, height: 1039 },
  },
  {
    eyebrow: "Feature 04",
    title: "Turn Insights Into Action.",
    sections: [
      {
        paragraphs: [
          "Workflows can continue beyond analysis and trigger downstream actions when results or defined conditions warrant it.",
        ],
        // The design repeats the Feature 02 bullets here: needs the client's own Feature 04 bullets.
        bullets: ["Agents created for the job", "Specialised responsibilities", "Multi-LLM execution", "Coordinated agent handoffs"],
      },
    ],
    image: { src: img("feature-4.webp"), alt: "A result triggering a condition that either sends alerts and messages or updates databases and records", width: 1514, height: 1039 },
  },
  {
    eyebrow: "Feature 05",
    title: "Stay in Control. Refine the Workflow Conversationally.",
    sections: [
      {
        paragraphs: [
          "Users can review results and reshape the workflow in the same conversation without rebuilding the architecture.",
        ],
        bullets: ["Change requirements mid-flight", "Adjust weights or models", "Steer alerts and actions", "Review before downstream action"],
      },
    ],
    image: { src: img("feature-5.webp"), alt: "A conversation with TalkNAct that reshapes an agent workflow from one chain of tools into a longer one", width: 1514, height: 1039 },
  },
];

export const talkSteps = {
  title: "One Objective. Four Steps to Action.",
  steps: [
    { title: "Define", body: "Describe the business objective." },
    { title: "Architect", body: "TalkNAct creates the required agent architecture." },
    { title: "Execute", body: "Agents process data, analyse and produce the outcome." },
    { title: "Act & Refine", body: "Trigger actions and refine the workflow conversationally." },
  ],
};

export const talkDesigned = {
  title: "Designed Around the Objective, Not the Workflow.",
  items: [
    { icon: "/icons/talknact/talk-n-act-dynamic.svg", title: "Dynamic", body: "Creates the architecture required for each objective." },
    { icon: "/icons/talknact/talk-n-act-multi-agent.svg", title: "Multi-Agent", body: "Coordinates specialised agents across the workflow." },
    { icon: "/icons/talknact/talk-n-act-model-agnostic.svg", title: "Model-Agnostic", body: "Uses models and tools according to each task." },
    { icon: "/icons/talknact/talk-n-act-domain-agnostic.svg", title: "Domain-Agnostic", body: "Supports different business problems with one underlying platform." },
    { icon: "/icons/talknact/talk-n-act-conversational.svg", title: "Conversational", body: "Lets business teams define and refine workflows in natural language." },
    { icon: "/icons/talknact/talk-n-act-action-oriented.svg", title: "Action-Oriented", body: "Moves beyond analysis into downstream action." },
  ],
};

export const talkArchitecture = {
  title: "An Agentic Engine Built to Solve Business Problems.",
  image: {
    src: img("architecture.webp"),
    alt: "TalkNAct architecture in seven steps: 1 Objective Understanding, 2 Architecture Engine, 3 Agent Orchestration, 4 Data & Analytics, 5 Multi-LLM Layer, 6 Action Layer, 7 Human Control",
    width: 1774,
    height: 887,
  },
};

export const talkAudience = {
  eyebrow: "Who Is TalkNAct For?",
  title: "Built for Business Problems Across Functions.",
  items: [
    { icon: "users", title: "HR & Recruitment", body: "Screen resumes, evaluate candidates and generate recommendations." },
    { icon: "target", title: "Sales & Marketing", body: "Score leads, segment customers and prioritise campaigns." },
    { icon: "shield", title: "Finance & Risk", body: "Analyse historical attributes and support risk workflows." },
    { icon: "settings", title: "Operations & Experience", body: "Detect anomalies, analyse feedback and automate responses." },
  ],
};

export const talkPlans = {
  title: "Flexible Plans Built Around Your AI Workflows.",
  tiers: [
    { name: "Pilot", text: "A specific use case or proof of concept." },
    { name: "Team", text: "For recurring AI workflows." },
    { name: "Business", text: "For cross-functional deployment." },
    { name: "Enterprise", text: "For organisation-wide scale." },
  ],
};

export const talkFaqs = [
  { q: "What is TalkNAct?", a: "TalkNAct is a domain-agnostic Agentic AI platform that dynamically creates the multi-agent architecture required to accomplish a business objective." },
  { q: "Do I need to design the AI agents?", a: "No. TalkNAct dynamically determines the agents required for the objective." },
  { q: "What data can TalkNAct work with?", a: "It can work with structured and unstructured inputs including datasets, CSV and Excel files, documents, resumes, research data and text." },
  { q: "Do humans remain in control?", a: "Yes. Users can review results, modify requirements, adjust models and control when automation is allowed to act." },
  { q: "How does TalkNAct work?", a: "Users describe what they want to achieve in natural language. TalkNAct determines the agents, tools, models and execution sequence, then executes the workflow." },
  { q: "Can TalkNAct use different AI models?", a: "Yes. Different agents can use different LLMs and tools based on the requirements of each task." },
  { q: "Can TalkNAct automate actions?", a: "Yes. Workflows can trigger downstream actions such as notifications, updates, deliverables and routing based on results or conditions." },
];
