/**
 * Where every call-to-action goes — from the designer's CTA sheet. Change a
 * destination here and every button that uses it follows.
 *
 * "Contact us" is the /contact-us page (not a mailto). The "Resources case
 * study page" is /blogs for now (the Blogs and Case Study listing).
 */
export const CTA = {
  contact: "/contact-us",
  companyVideo: "/about-us#video",
  research: "/solutions/research-services",
  customDevelopment: "/solutions/custom-development",
  aiServices: "/solutions/ai-services",
  caseStudies: "/blogs",
  blogs: "/blogs",
  events: "/events",
  /** One case study page, by its slug in data/case-study-content.ts. */
  caseStudy: (slug: string) => `/case-studies/${slug}`,
  /** The case study grid on /blogs, filtered to one section. */
  caseStudiesFor: (category: string) => `/blogs?category=${category}#case-studies`,
} as const;
