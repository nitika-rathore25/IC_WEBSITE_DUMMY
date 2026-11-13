import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata: Metadata = buildMetadata({
  title: "Blogs and Case Studies",
  description:
    "Read Insights Curry blogs and case studies on customer segmentation, AI-powered research platforms and custom technology.",
  path: "/blogs",
});

/** Blogs and Case Study listing, built from the Figma "Blog Page" frame. */
export default function BlogsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Blogs and Case Studies", path: "/blogs" }])]} />
      <BlogListing />
    </>
  );
}
