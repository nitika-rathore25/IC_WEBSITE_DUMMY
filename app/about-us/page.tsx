import type { Metadata } from "next";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { BeliefSection } from "@/components/about/BeliefSection";
import { WhatWeBuildSection } from "@/components/about/WhatWeBuildSection";
import { TeamSection } from "@/components/about/TeamSection";
import { WhySection } from "@/components/about/WhySection";
import { LifeSection } from "@/components/about/LifeSection";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Insights Curry connects people, data, AI, technology and business — meet the team and what we build.",
  path: "/about-us",
});

/**
 * About Us — built from the Figma export of "Website Flow" → About Us
 * (node 216:2310). Header and Footer come from the root layout; the page
 * ends with the footer (no CTA band in this frame).
 */
export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={[organizationSchema(SITE_DESCRIPTION), breadcrumbSchema([{ name: "About Us", path: "/about-us" }])]} />
      <AboutHero />
      <BeliefSection />
      <WhatWeBuildSection />
      <TeamSection />
      <WhySection />
      <LifeSection />
    </>
  );
}
