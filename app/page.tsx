import { HeroSection } from "@/components/home/HeroSection";
import { ConnectionSection } from "@/components/home/ConnectionSection";
import { BringTogetherSection } from "@/components/home/BringTogetherSection";
import { OurWorkTabs } from "@/components/home/OurWorkTabs";
import { BuiltBySection } from "@/components/home/BuiltBySection";
import { InsightsLabSection } from "@/components/home/InsightsLabSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { CTA } from "@/lib/cta-links";
import { SITE_DESCRIPTION } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * Homepage — rebuilt from the new Figma design ("Website Flow" → "Homepage",
 * node 129:1761). Section order matches the frame: hero, connection band,
 * what we bring together, our work (tabs), built by, insights lab, CTA.
 * Header and Footer come from the root layout.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(SITE_DESCRIPTION), websiteSchema()]} />
      <HeroSection />
      <ConnectionSection />
      <BringTogetherSection />
      <OurWorkTabs />
      <BuiltBySection />
      <InsightsLabSection />
      <CtaBand
        title={["We don't think intelligence lives", "in one place."]}
        body={[
          "Not in a dashboard. Not in a research report. Not inside an LLM. Not with one team.",
          "The organisations that move fastest are the ones that can connect all of it.",
        ]}
        emphasis="That's what Insights Curry is built to do."
        ctaLabel="Start a conversation"
        ctaHref={CTA.contact}
      />
    </>
  );
}
