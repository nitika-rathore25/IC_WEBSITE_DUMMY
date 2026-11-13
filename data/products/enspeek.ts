import type { LeadBullet } from "@/components/product-extra/FeatureSplit";

/** Copy for the Enspeek page — Figma "Website Flow" → Enspeek. */

const img = (n: string) => `/images/products/enspeek/${n}`;

export const enspeekHero = {
  badge: "Enspeek",
  title: "Research That Starts With a",
  highlight: "Conversation.",
  sub: "Stop asking consumers to take surveys. Start talking to them.",
  body: [
    "EnspeeK transforms everyday consumer conversations into structured research intelligence. Engage people on the channels they already use, powered by AI that listens, probes, and adapts in real time, delivering actionable insights your teams can act on immediately.",
  ],
  image: { src: img("hero.webp"), alt: "Consumer chat conversations flowing through AI into dashboards, audience segments, charts and reports", width: 1536, height: 1024 },
};

export const enspeekProblem = {
  title: "Your Customers Are Already Talking.",
  highlight: "Are You Listening?",
  paragraphs: [
    "Consumers share opinions every single day about your brand, products, campaigns, and experiences. They talk about what they love, what frustrates them, and what they wish existed.",
  ],
  lead: "Traditional research forces them to stop, open a survey, and answer a rigid list of static questions. The result?",
  pills: ["Plummeting engagement", "Shallow, one-word answers", "High drop-off rates", "Zero context"],
  outro:
    "The most valuable insights live in the follow-up. EnspeeK lets consumers behave like real people by starting an authentic conversation instead of serving a form.",
};

export const enspeekListen = {
  title: ["Research Has Always Asked Questions.", "EnspeeK Teaches Research to Listen."],
  body: [
    "Traditional surveys are built around the questionnaire. EnspeeK is built around the conversation.",
    "Our AI dynamically responds to what people say, asking relevant follow-ups and exploring unexpected paths.",
  ],
  comparison: ["Traditional: Ask → Answer → Next Question", "EnspeeK: Ask → Listen → Probe → Understand → Discover"] as [string, string],
  pill: "The result: Richer feedback, deeper context, and a natural experience for your participants.",
};

export const enspeekFeature1 = {
  eyebrow: "Feature 01",
  title: "Start With a Conversation, Not a Questionnaire.",
  paragraphs: [
    "Input the core business question you want to explore. EnspeeK instantly transforms your objective into an interactive research experience that your team can review, refine, and approve.",
  ],
  callout: {
    title: "The Difference",
    body: "InsignAI helps you build better research studies. EnspeeK gives those studies a human voice.",
  },
  capabilities: [
    { icon: "/icons/enspeek/f1-natural-language.svg", title: "Natural-Language Study Setup", body: "Describe your core objectives in plain English." },
    { icon: "/icons/enspeek/f1-conversation-design.svg", title: "AI Conversation Design", body: "Smart Questions & Adaptive Flows" },
    { icon: "/icons/enspeek/f1-question-refinement.svg", title: "Question Refinement", body: "Tweak and perfect the flow before going live." },
    { icon: "/icons/enspeek/f1-researcher-control.svg", title: "Total Researcher Control", body: "Your team retains full approval power over every study." },
    { icon: "/icons/enspeek/f1-rapid-deployment.svg", title: "Rapid Deployment", body: "Move from brief to field-ready conversation in minutes." },
  ],
};

export const enspeekFeature2 = {
  eyebrow: "Feature 02",
  title: "Don't Just Collect Answers. Explore Them.",
  sub: "When a consumer shares a critical detail, EnspeeK goes deeper.",
  leadBullets: [
    { lead: "Mention a problem?", text: "Probe for root causes." },
    { lead: "Reveal an unexpected need?", text: "Explore potential solutions." },
    { lead: "Shift the context?", text: "Adapt the path seamlessly." },
  ] as LeadBullet[],
  capabilities: [
    { icon: "/icons/enspeek/f2-human-like.svg", title: "Human-like, contextual interactions" },
    { icon: "/icons/enspeek/f2-probing.svg", title: "Dynamic probing & intelligent follow-ups" },
    { icon: "/icons/enspeek/f2-variable.svg", title: "Smart Variable Classification" },
    { icon: "/icons/enspeek/f2-statistical.svg", title: "Statistical Optimization" },
  ],
};

export const enspeekFeature3 = {
  eyebrow: "Feature 03",
  title: "Meet Consumers Where They Already Live.",
  paragraphs: [
    "Never force consumers to change their habits to give feedback. EnspeeK delivers conversational research directly to their favorite digital channels.",
  ],
  capabilities: [
    { icon: "/icons/enspeek/f3-channel-a.svg", title: "WhatsApp", body: "Engage audiences on the world's most popular messaging app." },
    { icon: "/icons/enspeek/f3-channel-b.svg", title: "Facebook Messenger", body: "Connect seamlessly across social messaging networks." },
    { icon: "/icons/enspeek/f3-channel-a.svg", title: "Direct Web Links", body: "Embed conversations directly into apps or digital touchpoints." },
    { icon: "/icons/enspeek/f3-channel-b.svg", title: "Multi-Channel Reach", body: "Scale your listening strategy across diverse audience demographics." },
  ],
};

export const enspeekFeature4 = {
  eyebrow: "Feature 04",
  title: "Turn Conversations Into Research Intelligence.",
  paragraphs: [
    "A conversation is only valuable if it drives action. EnspeeK synthesizes raw dialogue into structured, executive-ready data.",
  ],
  callout: {
    title: "Explore Outputs Via",
    body: "Interactive Dashboards | Cross-Tabs | Segment Comparisons | Exportable Charts",
  },
  capabilities: [
    { icon: "/icons/enspeek/f1-natural-language.svg", title: "Sentiment", body: "Real-time emotional nuance and brand perception." },
    { icon: "/icons/enspeek/f1-conversation-design.svg", title: "Themes", body: "Recurring patterns across thousands of conversations." },
    { icon: "/icons/enspeek/f1-question-refinement.svg", title: "Emerging Needs", body: "Unmet market demands identified early." },
    { icon: "/icons/enspeek/f1-researcher-control.svg", title: "Pain Points", body: "Precise operational and CX friction points." },
    { icon: "/icons/enspeek/f1-rapid-deployment.svg", title: "Segment Insights", body: "Audience-specific behavioral variations." },
  ],
};

export const enspeekRhythm = {
  eyebrow: "Feature 05",
  title: "Stop Waiting for the Next Research Cycle.",
  body: "Consumer behavior changes daily—your insights shouldn't update quarterly. EnspeeK enables continuous listening to keep your teams ahead of market shifts.",
  flowLabel: "Shift Your Rhythm",
  arrow: "/icons/enspeek/f5-arrow.svg",
  rows: [
    { label: "Old Way", chips: ["Brief", "Fieldwork", "Analysis", "Report", "Decision"] },
    { label: "EnspeeK Way", chips: ["Listen", "Converse", "Understand", "Act", "Repeat"] },
  ],
  capabilities: [
    { icon: "/icons/enspeek/f5-feedback-loops.svg", title: "Continuous Feedback Loops", body: "Maintain ongoing dialogue beyond individual studies." },
    { icon: "/icons/enspeek/f5-signals.svg", title: "Real-Time Signals", body: "Identify emerging issues and trends instantly." },
    { icon: "/icons/enspeek/f5-reporting.svg", title: "Stakeholder Reporting", body: "One-click PPT & Excel exports tailored for executive suites." },
  ],
};

export const enspeekSteps = {
  title: "One Conversation.",
  highlight: "Five Steps to Intelligence.",
  items: [
    { icon: "/icons/enspeek/s4-define.svg", title: "Define", body: "Input your strategic business question." },
    { icon: "/icons/enspeek/s4-converse.svg", title: "Converse", body: "AI engages consumers on their preferred messaging apps." },
    { icon: "/icons/enspeek/s4-capture.svg", title: "Capture", body: "Dynamic dialogue is gathered and converted into structured data." },
    { icon: "/icons/enspeek/s4-understand.svg", title: "Understand", body: "AI analyzes sentiment, recurring themes, and hidden signals." },
    { icon: "/icons/enspeek/s4-act.svg", title: "Act", body: "Teams leverage real-time insights for marketing and strategy." },
  ],
};

export const enspeekDifferent = {
  eyebrow: "What Makes ENSPEEK Different?",
  title: "Designed Around the Consumer, Not the Form.",
  items: [
    { lead: "Conversation-First:", text: "Eliminates survey fatigue with fluid dialogue." },
    { lead: "Truly Adaptive:", text: "Dynamically shifts based on individual answers." },
    { lead: "Context-Rich:", text: "Captures the \"why\" behind consumer opinions." },
    { lead: "Channel-Native:", text: "Operates inside apps users open daily." },
    { lead: "Continuous:", text: "Replaces static, periodic studies with real-time intelligence." },
  ],
};

export const enspeekListening = {
  title: "AI Engineered for Sophisticated Listening.",
  items: [
    { icon: "/icons/enspeek/s6-engine.svg", title: "Conversational Engine", body: "Manages fluid, human-grade dialogic mechanics." },
    { icon: "/icons/enspeek/s6-context.svg", title: "Context Intelligence", body: "Retains short and long-term memory throughout the chat." },
    { icon: "/icons/enspeek/s6-adaptive.svg", title: "Adaptive Logic", body: "Determines relevant follow-ups on the fly." },
    { icon: "/icons/enspeek/s6-nlu.svg", title: "NLU & Sentiment Analysis", body: "Decodes implicit meaning, tone, and emotional drivers." },
    { icon: "/icons/enspeek/s6-analytics.svg", title: "Research Analytics", body: "Converts transcripts into structured tables and metrics." },
  ],
};

export const enspeekUseCases = {
  title: "Use Cases",
  cards: [
    { image: img("uc-customer-feedback.jpg"), title: "Customer Feedback", body: "Deep-dive into overall satisfaction drivers." },
    { image: img("uc-cx-diagnostic.jpg"), title: "CX Diagnostic", body: "Locate precise operational break-points." },
    { image: img("uc-brand-tracking.jpg"), title: "Brand Tracking", body: "Monitor evolving audience perception over time." },
    { image: img("uc-concept-testing.jpg"), title: "Concept Testing", body: "Rapidly vet product designs and value propositions." },
    { image: img("uc-message-testing.jpg"), title: "Message Testing", body: "Measure narrative resonance before launching campaigns." },
    { image: img("uc-qualitative.jpg"), title: "Qualitative at Scale", body: "Conduct thousands of simultaneous, depth-interview style chats." },
  ],
};

export const enspeekResults = {
  title: "Richer Context. Faster Execution. Better Intelligence.",
  tiles: [
    { title: "Higher Engagement", body: "Reach completion rates standard surveys can't match." },
    { title: "Deeper Feedback", body: "Uncover hidden drivers with open-ended probing." },
    { title: "Reduced Fatigue", body: "Treat consumers like partners, not data entry points." },
    { title: "Agile Decisions", body: "Get instant data without multi-week fieldwork delays." },
  ],
};

export const enspeekEcosystem = {
  title: "The Complete AI Research Ecosystem.",
  image: { src: img("ecosystem.webp"), alt: "Messaging conversations feeding a central AI core that connects study design, data analysis, adaptive research, reports and actionable insights", width: 1536, height: 1024 },
  sections: [
    {
      sub: "InsignAI (The Research Workspace)",
      paragraphs: ["Designed for researchers to design studies, structure questionnaires, analyze data, and build reports faster."],
    },
    {
      sub: "EnspeeK (The Listening Engine)",
      paragraphs: ["Designed to engage consumers naturally on messaging channels, conduct adaptive probing, and gather live signals."],
    },
    { paragraphs: ["InsignAI optimizes how you manage research. EnspeeK modernizes how you gather it."] },
  ],
};

export const enspeekStory = {
  title: "What Happens When Research Feels Like a Conversation?",
  image: img("story.jpg"),
  items: [
    { label: "The Challenge", body: "A global brand needed high-context consumer insights without relying on low-response online surveys." },
    { label: "The Approach", body: "Deployed EnspeeK to run adaptive AI conversations via WhatsApp." },
    { label: "The Outcome", body: "Achieved higher completion rates and unlocked actionable qualitative insights alongside quantitative trends." },
  ],
};

export const enspeekPlans = {
  title: "Flexible Plans Built to Scale With Your Needs.",
  tiers: [
    { name: "PILOT", text: "Perfect for single studies or proof-of-concept projects." },
    { name: "TEAM", text: "Built for insights and CX teams running recurring research." },
    { name: "BUSINESS", text: "Multi-seat access for cross-functional intelligence programs." },
    { name: "ENTERPRISE", text: "Scale always-on, global listening ecosystems." },
  ],
};

export const enspeekFaqs = [
  { q: "What is EnspeeK?", a: "EnspeeK is an AI platform that conducts adaptive research conversations on channels like WhatsApp to gather rich consumer intelligence." },
  { q: "Which messaging channels are supported?", a: "EnspeeK supports WhatsApp, Facebook Messenger, and direct web link deployments." },
  { q: "How does EnspeeK differ from traditional survey software?", a: "Standard surveys follow fixed scripts. EnspeeK uses conversational AI to ask dynamic follow-up questions based on how participants answer." },
  { q: "Do human researchers maintain control?", a: "Yes. Researchers review and approve study setups, guardrails, and conversation flows before deployment." },
];
