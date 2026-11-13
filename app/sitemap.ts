import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { caseStudies } from "@/data/blogs";
import { team } from "@/data/about";
import { pressReleases } from "@/data/press-releases";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * No lastmod, changefreq or priority: Google ignores the last two, and a
 * lastmod stamped with the build time on every URL teaches it to ignore
 * lastmod too. Add `lastModified` per URL only from a real content date.
 */
const staticRoutes: string[] = [
  "",
  "/about-us",
  ...team.map((m) => `/about-us/team/${m.slug}`),
  "/contact-us",
  "/platforms/insignai",
  "/platforms/personaai",
  "/platforms/segmentiq",
  "/platforms/enspeek",
  "/platforms/conceptai",
  "/platforms/talk-n-act",
  "/solutions/research-services",
  "/solutions/custom-development",
  "/solutions/ai-services",
  "/solutions/ai-services/ai-data-advisory",
  "/solutions/ai-services/data-cloud-architecture",
  "/solutions/ai-services/predictive-ai-ml",
  "/solutions/ai-services/generative-ai-llms",
  "/solutions/ai-services/agentic-ai-automation",
  "/solutions/ai-services/production-ai-mlops",
  "/blogs",
  "/events",
  "/media",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...blogPosts.map(({ slug }) => ({ url: `${SITE_URL}/blogs/${slug}` })),
    ...caseStudies.map(({ slug }) => ({ url: `${SITE_URL}/case-studies/${slug}` })),
    ...pressReleases.map(({ slug }) => ({ url: `${SITE_URL}/media/${slug}` })),
  ];
}
