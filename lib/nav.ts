/**
 * Single source of truth for site navigation. Header (menus) and Footer
 * (link columns) both read from here — labels and order follow the
 * "Menu" / "Solution" dropdown frames and Footer in the Figma design.
 */
export interface NavLink {
  label: string;
  href: string;
}

export const platformLinks: NavLink[] = [
  { label: "InsignAI", href: "/platforms/insignai" },
  { label: "PersonaAI", href: "/platforms/personaai" },
  { label: "SegmentIQ", href: "/platforms/segmentiq" },
  { label: "Enspeek", href: "/platforms/enspeek" },
  { label: "TalknAct", href: "/platforms/talk-n-act" },
];

export const solutionLinks: NavLink[] = [
  { label: "Research Solution", href: "/solutions/research-services" },
  { label: "Custom Development", href: "/solutions/custom-development" },
  { label: "AI & Data Science", href: "/solutions/ai-services" },
];

/** Indented under "AI & Data Science" in the Solution dropdown. */
export const aiServiceLinks: NavLink[] = [
  { label: "AI & Data Advisory", href: "/solutions/ai-services/ai-data-advisory" },
  { label: "Data & Cloud Architecture", href: "/solutions/ai-services/data-cloud-architecture" },
  { label: "Predictive AI & Machine Learning", href: "/solutions/ai-services/predictive-ai-ml" },
  { label: "Generative AI & LLMs", href: "/solutions/ai-services/generative-ai-llms" },
  { label: "Agentic AI & Automation", href: "/solutions/ai-services/agentic-ai-automation" },
  { label: "Production AI & MLOps", href: "/solutions/ai-services/production-ai-mlops" },
];

/** Company menu. With a single link the header shows Company as a plain link, not a dropdown. */
export const companyLinks: NavLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Media", href: "/media" },
];

export const resourceLinks: NavLink[] = [
  { label: "Blogs and Case Study", href: "/blogs" },
  { label: "Events", href: "/events" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "InsignAI", href: "/platforms/insignai" },
      { label: "PersonaAI", href: "/platforms/personaai" },
      { label: "SegmentIQ", href: "/platforms/segmentiq" },
      // { label: "Concept AI", href: "/platforms/conceptai" },
      { label: "Enspeek", href: "/platforms/enspeek" },
      { label: "TalknAct", href: "/platforms/talk-n-act" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Research Solutions", href: "/solutions/research-services" },
      { label: "Custom Development", href: "/solutions/custom-development" },
      { label: "AI & Data Science", href: "/solutions/ai-services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Case Studies", href: "/blogs" },
    ],
  },
];
