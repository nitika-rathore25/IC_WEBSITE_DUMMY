import { blogPosts } from "@/data/blog-posts";
import { caseStudies } from "@/data/blogs";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * /llms.txt (llmstxt.org): a short, curated map of the site for AI tools.
 * Built at build time from the same data as the pages, so blogs and case
 * studies stay in sync. Product and service lines repeat each page's meta
 * description. robots.txt stays open to all crawlers, AI crawlers included,
 * on purpose: the site wants to be found and quoted.
 */
export const dynamic = "force-static";

const products = [
  ["InsignAI", "/platforms/insignai", "AI-native market research platform: questionnaire design, data-quality monitoring, analysis and insight delivery, with its own Market Research LLM."],
  ["PersonaAI", "/platforms/personaai", "Turns years of consumer research into evidence-backed AI digital twins that answer business questions, validate ideas and test concepts in minutes."],
  ["SegmentIQ", "/platforms/segmentiq", "AI-powered customer segmentation platform that builds statistically robust customer segments in minutes using natural language."],
  ["Enspeek", "/platforms/enspeek", "Turns everyday consumer conversations on WhatsApp, Messenger and web links into structured research intelligence, using adaptive AI."],
  ["TalknAct", "/platforms/talk-n-act", "Domain-agnostic agentic AI platform: describe the business outcome and it creates the multi-agent architecture, runs the analysis and triggers the action."],
];

const solutions = [
  ["Research Solutions", "/solutions/research-services", "Consumer and market research that decodes behavior, uncovers needs and motivations, and turns audience data into strategic market growth."],
  ["Custom Development", "/solutions/custom-development", "Custom AI applications, analytics platforms, web and mobile products, from idea to MVP to scale."],
  ["AI & Data Science", "/solutions/ai-services", "AI, data science and intelligent automation, from advisory and data architecture to predictive, generative and agentic AI in production."],
  ["AI & Data Advisory", "/solutions/ai-services/ai-data-advisory", "Identify AI opportunities, assess feasibility, evaluate technology choices and build practical roadmaps."],
  ["Data & Cloud Architecture", "/solutions/ai-services/data-cloud-architecture", "Modern data environments, connected sources and governed architectures for analytics, machine learning and AI."],
  ["Predictive AI & Machine Learning", "/solutions/ai-services/predictive-ai-ml", "Predictive models that help teams anticipate demand, identify opportunities, optimise resources and personalise experiences."],
  ["Generative AI & LLMs", "/solutions/ai-services/generative-ai-llms", "Enterprise GenAI: AI assistants, RAG and knowledge systems, document intelligence and customised LLM applications."],
  ["Agentic AI & Automation", "/solutions/ai-services/agentic-ai-automation", "AI agents that plan, reason, use tools and complete multi-step workflows, with human approval where needed."],
  ["Production AI & MLOps", "/solutions/ai-services/production-ai-mlops", "Production infrastructure, deployment pipelines, monitoring, evaluation, observability and cost optimisation for AI."],
];

const company = [
  ["About Us", "/about-us", "Who Insights Curry is, what it builds and the leadership team."],
  ["Contact Us", "/contact-us", "Offices in the United States and India, phone and email."],
  ["Blogs and Case Studies", "/blogs", "Articles and client case studies on segmentation, AI research platforms and custom technology."],
  ["Events", "/events", "Webinars, seminars and events on AI-powered market research."],
  ["Media", "/media", "Press coverage, press releases, product launches and company announcements."],
];

const line = ([name, path, text]: string[]) => `- [${name}](${SITE_URL}${path}): ${text}`;

export function GET() {
  const body = [
    "# Insights Curry",
    "",
    "> Insights Curry is an intelligence consultancy connecting people, data, AI, technology and business. It builds AI-native market research platforms (InsignAI, PersonaAI, SegmentIQ, Enspeek and TalknAct) and delivers research, custom development and AI & data science services. Offices in Pleasanton, California, USA and Gurgaon, India.",
    "",
    "## Products",
    ...products.map(line),
    "",
    "## Solutions",
    ...solutions.map(line),
    "",
    "## Company",
    ...company.map(line),
    "",
    "## Blogs",
    ...blogPosts.map((p) => line([p.title, `/blogs/${p.slug}`, p.excerpt])),
    "",
    "## Case studies",
    ...caseStudies.map((c) => line([c.title, `/case-studies/${c.slug}`, c.excerpt])),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
