import { CTA } from "@/lib/cta-links";

/** Copy for the Custom Development page — Figma "Website Flow" → Custom Development. */

const img = (n: string) => `/images/solutions/custom-development/${n}`;

export const devHero = {
  title: "Build what your business actually needs.",
  sub: "Have a process to automate? An AI model to commercialise? Complex data to turn into an application? Or a product idea ready to build?",
  body: [
    "Insights Curry designs and builds custom technology solutions from AI applications and analytics platforms to web, mobile and digital products. We bring together product thinking, design, engineering, AI/ML and analytics to build technology around the way your business actually works.",
  ],
  ctas: [{ label: "Discuss Your Requirement", href: CTA.contact }],
  image: {
    src: img("hero.webp"),
    alt: "Six-step cycle from business need to analysis, design, build, deploy and AI product, around a custom AI solution",
    width: 1100,
    height: 1100,
  },
};

export const devIntro = {
  title: "When off-the-shelf isn't enough.",
  paragraphs: [
    "Your workflows are unique. Your data is complex. Your product needs to do more. That's when you need technology built **around your business not the other way around.**",
    "We turn manual processes into applications, AI models into usable products, ideas into MVPs and systems you've outgrown into platforms built for what's next. **The right technology isn't the one with the most features. It's the one that solves your problem.**",
  ],
};

export const devAi = {
  title: "Custom technology. Built for the job.",
  heading: "Turn AI and data into something people can use.",
  paragraph:
    "AI models and data are valuable only when they drive action. We build **AI-powered applications and analytics solutions** that turn complex models and data into intuitive tools for teams, customers and decision-makers.",
  chipsLabel: "We build",
  chips: [
    "Predictive & forecasting apps",
    "NLP & Generative AI solutions",
    "Computer vision applications",
    "Interactive analytics platforms",
    "Decision-support tools",
    "Automated reporting apps",
  ],
  cta: { label: "Read Case Study", href: CTA.caseStudy("from-a-spreadsheet-no-one-trusted-to-a-platform") },
  bestFor: "**Best for:** Businesses ready to turn AI, research or business data into real products.",
  link: { label: "Explore the thinking behind the technology.", href: CTA.blogs },
};

export const devProduct = {
  heading: "From idea to product.",
  paragraphs: [
    "A product needs more than code. It needs the right experience, architecture and foundation to grow. We build **custom digital products, platforms and MVPs** from product definition and UX through development, integrations and cloud deployment.",
  ],
  chipsLabel: "We build",
  chips: ["Web applications", "SaaS platforms", "Business applications", "Customer-facing platforms", "Data-driven products", "MVPs & prototypes"],
  cta: { label: "Read Case Study", href: CTA.caseStudy("an-mvp-built-to-answer-one-question") },
  aside: {
    bestFor: "**Best for:** Build fast. Validate early. Scale when ready.",
    link: { label: "See how we turn complex ideas into working products.", href: CTA.blogs },
  },
  image: { src: img("idea-to-product.webp"), alt: "AI core connecting idea, UX design, product, platform and scale", width: 1100, height: 619 },
};

export const devMobile = {
  heading: "Put your product where your users are.",
  paragraphs: [
    "Customers, employees and field teams aren't always behind a desk. We build **custom mobile applications** that make products, data and workflows accessible wherever people work.",
  ],
  chipsLabel: "We build",
  chips: [
    "Customer apps",
    "Employee & field-force apps",
    "Companion apps",
    "Mobile data-collection applications",
    "Offline-ready applications",
    "Research applications",
  ],
  cta: { label: "Read Case Study", href: CTA.caseStudiesFor("custom-technology") },
  aside: {
    bestFor: "**Best for:** iOS. Android. Cross-platform. Built around your users.",
    link: { label: "Explore how mobile technology can transform real-world workflows.", href: CTA.blogs },
  },
  image: { src: img("mobile.webp"), alt: "Two colleagues using a laptop and a mobile app with data collection and maps", width: 1100, height: 733 },
};

export const devLaunch = {
  heading: "Launch is just the beginning.",
  paragraphs: [
    "Getting version one out is only the start. Our **product engineering services** help you build, improve and scale from architecture and performance to new features, integrations and cloud infrastructure.",
  ],
  listLabel: "We help you",
  list: [
    "Build scalable product architecture",
    "Improve product experience",
    "Develop front-end and back-end systems",
    "Integrate with your technology ecosystem",
    "Optimise application performance",
    "Scale cloud infrastructure",
    "Continuously ship new features",
  ],
  closing: "Build for today. Engineer for what's next.",
  cta: { label: "Talk to Our Technology Team", href: CTA.contact },
  image: { src: img("platform.webp"), alt: "Platform connected to front end, back end, integrations, cloud infrastructure and monitoring", width: 1000, height: 1000 },
};

export const devShip = {
  heading: "Ship faster. Stay secure.",
  paragraphs: [
    "Great software shouldn't be slow to release, fragile in production or vulnerable to attack. **We build security, testing and operations into development from day one.**",
  ],
  listLabel: "Our capabilities",
  list: [
    "CI/CD pipelines",
    "Automated testing",
    "Cloud infrastructure",
    "Application monitoring",
    "Security & vulnerability management",
    "Release management",
    "Production deployment",
  ],
  closing: "Faster releases. Fewer surprises. Better products.",
  image: { src: img("ship-secure.webp"), alt: "Deployment pipeline with a secured cloud, servers, a laptop and a phone", width: 1100, height: 733 },
};

export const devOpportunities = {
  title: "If there's a problem, there's a product opportunity.",
  items: [
    { icon: "/icons/customdev/customer-development-ai-powered-consumer-intelligence.svg", title: "AI-Powered Consumer Intelligence", body: "Turn customer feedback into actionable insights." },
    { icon: "/icons/customdev/customer-development-mobile-data-collection-applications.svg", title: "Mobile Data-Collection Applications", body: "Capture information wherever your teams work." },
    { icon: "/icons/customdev/customer-development-custom-analytics-platforms.svg", title: "Custom Analytics Platforms", body: "Bring fragmented data into one intelligent environment." },
    { icon: "/icons/customdev/customer-development-customer-intelligence-applications.svg", title: "Customer Intelligence Applications", body: "Combine data, segmentation and predictive models." },
    { icon: "/icons/customdev/customer-development-workflow-automation.svg", title: "Workflow Automation", body: "Replace spreadsheets and manual processes with software." },
    { icon: "/icons/customdev/customer-development-ai-decision-support-platforms.svg", title: "AI Decision-Support Platforms", body: "Give teams faster, smarter answers from their data." },
  ],
};

export const devSteps = {
  titleParts: ["Problem", "Product", "Scale"],
  steps: [
    { icon: "/icons/customdev/customer-development-discover.svg", title: "Discover", body: "Understand the problem, users, workflows and business outcome." },
    { icon: "/icons/customdev/customer-development-define.svg", title: "Define", body: "Shape the product scope, technology architecture and roadmap." },
    { icon: "/icons/customdev/customer-development-design.svg", title: "Design", body: "Create the experience before we write the code." },
    { icon: "/icons/customdev/customer-development-build.svg", title: "Build", body: "Develop the application, AI/ML, analytics and integrations." },
    { icon: "/icons/customdev/customer-development-launch.svg", title: "Launch", body: "Test, deploy and move into production." },
    { icon: "/icons/customdev/customer-development-scale.svg", title: "Scale", body: "Improve, optimise and build what's next." },
  ],
  footnote: "Focused enough to move fast. Flexible enough to adapt.",
};

export const devAudience = {
  title: "Built for teams ready to build what's next.",
  tiles: [
    { icon: "/icons/customdev/customer-development-enterprises-and-brands.svg", title: "Enterprises & Brands", body: "Automate processes. Modernise systems. Build AI-powered solutions." },
    { icon: "/icons/customdev/customer-development-research-and-insights-teams.svg", title: "Research & Insights Teams", body: "Turn research and consumer data into intelligent applications." },
    { icon: "/icons/customdev/customer-development-startups-and-new-ventures.svg", title: "Startups & New Ventures", body: "Turn ideas into MVPs and scalable products." },
    { icon: "/icons/customdev/customer-development-technology-and-product.svg", title: "Technology & Product", body: "Extend your engineering capacity with specialised AI and analytics expertise." },
  ],
};

// Left column (first five) then right column (last four), matching the design's two-column layout.
export const devFaqs = [
  {
    q: "What is custom technology development?",
    a: "Custom technology development means building software specifically around your business requirements, workflows, users and data, rather than adapting your business to an off-the-shelf solution.",
  },
  {
    q: "Can Insights Curry turn an AI model into an application?",
    a: "Yes. We can take AI/ML models, research outputs or analytics models and turn them into usable applications, platforms and decision-support tools.",
  },
  {
    q: "Do you build web and mobile applications?",
    a: "Yes. We develop custom web applications, digital platforms and mobile applications for customers, employees, field teams and research users.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Our product engineering capabilities extend beyond launch to improve, optimise, integrate and scale your product as your business evolves.",
  },
  {
    q: "How do we get started?",
    a: "Start with the problem — not the technology specification. Tell us what you want to solve, automate, build or improve. We'll help define the right approach.",
  },
  {
    q: "When should I choose custom software development?",
    a: "When existing software can't support your workflows, integrations, data or user experience — or when you're building something that doesn't exist as an off-the-shelf product.",
  },
  {
    q: "Can you build an MVP?",
    a: "Yes. We help define, design and develop focused MVPs that allow businesses and startups to validate ideas with real users before scaling the investment.",
  },
  {
    q: "Can you work with our existing technology?",
    a: "Yes. We can extend, integrate or modernise your existing technology ecosystem rather than requiring you to replace everything.",
  },
  {
    q: "How long does custom software development take?",
    a: "It depends on the product, scope and complexity. A focused MVP can move quickly, while larger platforms require a structured development roadmap. We define the scope and approach before development begins.",
  },
];

export const devCta = {
  title: "Bring us the problem. We'll build the solution.",
  body: [
    "You don't need a technology blueprint. Bring us the business problem, process, AI model, data or product idea.",
    "We'll help you define what to build and build it.",
  ],
  emphasis: "From idea to application. From AI model to product. From MVP to scale.",
  primary: { label: "Discuss Your Idea", href: CTA.contact },
  secondary: { label: "Talk to Our Technology Team", href: CTA.contact },
};
