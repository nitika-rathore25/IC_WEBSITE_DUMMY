import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PressReleaseListing } from "@/components/press-releases/PressReleaseListing";
import { pressCoverage, pressReleases } from "@/data/press-releases";

export const metadata: Metadata = buildMetadata({
  title: "Media",
  description: "Press coverage, press releases, product launches and company announcements from Insights Curry.",
  path: "/media",
});

/** Media page (press coverage and press releases): the newest release as a featured card, older ones in a grid (data/press-releases.ts). */
export default function MediaPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Media", path: "/media" }])]} />
      <PressReleaseListing releases={pressReleases} coverage={pressCoverage} />
    </>
  );
}
