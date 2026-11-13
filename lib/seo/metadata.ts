import type { Metadata } from "next";
import { SITE_URL } from "./site-url";

// `||` on purpose, not `??` — see lib/seo/site-url.ts.
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site Name";

/** The site-wide description: home page meta description and Organization schema. */
export const SITE_DESCRIPTION =
  "Insights Curry — an intelligence consultancy connecting People, Data, AI, Technology and Business.";

/**
 * Build a page's metadata from a small set of inputs, so every route gets
 * consistent title formatting, canonical URLs, Open Graph, and Twitter
 * card data instead of hand-rolled <head> tags. Call this from each
 * route's `metadata` export or `generateMetadata`, overriding fields as
 * needed rather than writing metadata from scratch per page.
 */
export function buildMetadata(input: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${input.path ?? ""}`;
  const image = input.image ?? `${SITE_URL}/og-default.png`;

  return {
    title: `${input.title} | ${SITE_NAME}`,
    description: input.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}
