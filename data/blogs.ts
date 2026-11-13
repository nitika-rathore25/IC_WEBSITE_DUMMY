import { CTA } from "@/lib/cta-links";
import { sectionBlogs } from "@/data/section-blogs";
import { caseStudyContent } from "@/data/case-study-content";

/**
 * Blog + case study listing data (`/blogs`), also the Homepage "InsightsLab"
 * teasers. Blog slugs map to /blogs/[slug]; the article bodies live in
 * `data/blog-posts.ts`.
 */

export type BlogCategoryId =
  | "insignai"
  | "personaai"
  | "segmentiq"
  | "enspeek"
  | "talknact"
  | "research"
  | "custom-technology"
  | "ai-solutions";

export interface BlogCategory {
  id: BlogCategoryId;
  label: string;
  /** Pill colours (Tailwind classes) used on cards. */
  tone: string;
}

/** Filter tabs on the listing, in design order. Products first, then solutions (divider between). */
export const productCategoryIds: BlogCategoryId[] = ["insignai", "personaai", "segmentiq", "enspeek", "talknact"];
export const solutionCategoryIds: BlogCategoryId[] = ["research", "custom-technology", "ai-solutions"];

// Pill colours measured from the design: SegmentIQ blue, PersonaAI / InsignAI purple,
// Custom Technology teal. Enspeek, Research and AI Solutions are not used in the
// design yet, so their tones are a best guess. TalkNAct is a new tab (the client's
// blog doc has a TalkNAct section; the Figma tabs do not), tone also a guess.
export const blogCategories: Record<BlogCategoryId, BlogCategory> = {
  insignai: { id: "insignai", label: "InsignAI", tone: "bg-[#f3eaff] text-[#750bf8]" },
  personaai: { id: "personaai", label: "PersonaAI", tone: "bg-[#f3eaff] text-[#750bf8]" },
  segmentiq: { id: "segmentiq", label: "SegmentIQ", tone: "bg-[#e9f0f7] text-[#00489f]" },
  enspeek: { id: "enspeek", label: "Enspeek", tone: "bg-cta/10 text-cta" },
  talknact: { id: "talknact", label: "TalkNAct", tone: "bg-[#eef2ff] text-[#3730a3]" },
  research: { id: "research", label: "Research Solutions", tone: "bg-surface text-heading" },
  "custom-technology": {
    id: "custom-technology",
    label: "Custom Development",
    tone: "bg-[#e8fcf9] text-[#00d1b1]",
  },
  "ai-solutions": { id: "ai-solutions", label: "AI Solutions", tone: "bg-[#e9f0f7] text-[#00489f]" },
};

export interface BlogTeaser {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  /** Category tab this blog belongs to. */
  category: BlogCategoryId;
  /** Longer excerpt used on the big "Recent Blog" card of the listing. */
  featuredExcerpt?: string;
}

/** The three SegmentIQ blogs from the design, with the hand-written teasers. */
const segmentIqTeasers: BlogTeaser[] = [
  {
    slug: "beyond-age-25-34-demographic-segmentation",
    title: "Beyond age 25-34: Why demographic segmentation no longer works",
    excerpt:
      "Open almost any customer segmentation report from the last decade and you will find the same shorthand...",
    featuredExcerpt:
      "Open almost any customer segmentation report from the last decade and you will find the same shorthand. Age 25 to 34. Urban. Middle income. College educated. These labels show up in marketing decks, media plans, and...",
    image: "/images/blog/segmentiq/blog-1.png",
    category: "segmentiq",
  },
  {
    slug: "ai-customer-segmentation-explained",
    title: "AI customer segmentation explained: how machine learning builds better...",
    excerpt:
      "A research analyst once described manual clustering as \"reading tea leaves with a calculator.\" She was only half joking...",
    image: "/images/blog/segmentiq/blog-2.png",
    category: "segmentiq",
  },
  {
    slug: "attitudinal-vs-behavioral-segmentation",
    title: "Attitudinal vs behavioral segmentation: which model should you use and when",
    excerpt:
      "A beverage brand once ran two segmentation projects on the same customer base within the same year...",
    image: "/images/blog/segmentiq/blog-3.png",
    category: "segmentiq",
  },
];

/** "Intro text cut to about 130 characters at a word boundary, ending in ...". */
function excerptOf(intro: string, max = 130): string {
  const text = intro.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.\-–—]+$/, "")}...`;
}

/**
 * Sections whose own pictures have been supplied, mapped to their folder under
 * /images/blog. Files are numbered in data order (blog-1.png, blog-2.png, ...).
 */
const blogImageFolders: Partial<Record<BlogCategoryId, string>> = {
  insignai: "insignai",
  personaai: "persona-ai",
  segmentiq: "segmentiq",
  enspeek: "enspeek",
  talknact: "talknact",
  research: "research-sol",
  "custom-technology": "custom-tech",
  "ai-solutions": "ai-solutions",
};

/** The same for case studies, under /images/case-studies (case-study-1.png, ...). */
const caseStudyImageFolders: Partial<Record<BlogCategoryId, string>> = {
  insignai: "insignai",
  personaai: "persona-ai",
  segmentiq: "segmentiq",
  enspeek: "enspeek",
  talknact: "talknact",
  research: "research-sol",
  "custom-technology": "custom-tech",
  "ai-solutions": "ai-solutions",
};

/** Case studies in a folder above whose own picture has not been supplied yet; they use the fallbacks. */
const caseStudiesWithoutImage = new Set<string>();

/**
 * Teasers for the section blogs from the client's doc. Sections without their own
 * pictures reuse the three design pictures until real ones arrive.
 */
const sectionTeasers: BlogTeaser[] = sectionBlogs.map((b) => {
  const index = sectionBlogs.filter((o) => o.category === b.category).indexOf(b);
  const folder = blogImageFolders[b.category];
  return {
    slug: b.slug,
    title: b.title,
    excerpt: excerptOf(b.intro),
    image: folder ? `/images/blog/${folder}/blog-${index + 1}.png` : `/images/blog/blog-${(index % 3) + 1}.png`,
    category: b.category,
  };
});

/** Every blog. SegmentIQ first (it leads the listing and the home page), then the other sections. */
export const blogTeasers: BlogTeaser[] = [...segmentIqTeasers, ...sectionTeasers];

export interface CaseStudyTeaser {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: BlogCategoryId;
  /** Detail page (`/case-studies/[slug]`). */
  href: string;
}

/** Fallback pictures for case studies without their own, reused in turn. */
const caseStudyImages = [
  { src: "/images/blog/case-study-1.jpg", alt: "Abstract orange and navy contour waves" },
  { src: "/images/blog/case-study-2.jpg", alt: "Abstract black and white layered waves" },
  { src: "/images/blog/case-study-3.jpg", alt: "Sand dune ridge in warm light" },
  { src: "/images/blog/case-study-4.jpg", alt: "Aerial view of rocks in the surf" },
];

/**
 * Every case study, from the client's doc (`data/case-study-content.ts`). Ordered one per
 * section first, then the second of each, so the first four match the design.
 */
export const caseStudies: CaseStudyTeaser[] = caseStudyContent.map((c, i) => {
  const folder = caseStudyImageFolders[c.category];
  const index = caseStudyContent.filter((o) => o.category === c.category).indexOf(c);
  const img = folder && !caseStudiesWithoutImage.has(c.slug)
    ? { src: `/images/case-studies/${folder}/case-study-${index + 1}.png`, alt: c.title }
    : caseStudyImages[i % caseStudyImages.length];
  return {
    slug: c.slug,
    title: c.title,
    excerpt: excerptOf(c.summary, 200),
    image: img.src,
    imageAlt: img.alt,
    category: c.category,
    href: `/case-studies/${c.slug}`,
  };
});
