import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqGrid } from "@/components/product";
import { SolHero } from "@/components/solutions/SolHero";
import { SolCenteredBand } from "@/components/solutions/SolCenteredBand";
import { SolCenterBlock } from "@/components/solutions/SolCenterBlock";
import { SolSplit } from "@/components/solutions/SolSplit";
import { SolCardGrid } from "@/components/solutions/SolCardGrid";
import { SolSteps } from "@/components/solutions/SolSteps";
import { SolDarkTiles } from "@/components/solutions/SolDarkTiles";
import { SolCtaBand } from "@/components/solutions/SolCtaBand";
import {
  devHero, devIntro, devAi, devProduct, devMobile, devLaunch, devShip, devOpportunities,
  devSteps, devAudience, devFaqs, devCta,
} from "@/data/solutions/custom-development";
import { HeroOverlay } from "@/components/solutions/diagrams/HeroOverlay";
import { customDevelopmentOverlay } from "@/components/solutions/diagrams/overlays/customDevelopment";

export const metadata: Metadata = buildMetadata({
  title: "Custom AI & Software Development",
  description:
    "Custom AI applications, analytics platforms, web and mobile products built around the way your business actually works, from idea to MVP to scale.",
  path: "/solutions/custom-development",
});

/** Custom Development — rebuilt from the new Figma design ("Website Flow" → Custom Development). */
export default function CustomDevelopmentPage() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ name: "Custom Development", description: String(metadata.description), path: "/solutions/custom-development" }),
        faqSchema(devFaqs),
        breadcrumbSchema([{ name: "Custom Development", path: "/solutions/custom-development" }]),
      ]} />
      <SolHero {...devHero} copyWidth={650} imageClassName="max-w-[620px]" visual={<HeroOverlay image={devHero.image} config={customDevelopmentOverlay} className="mx-auto max-w-[620px]" />} />
      <SolCenteredBand {...devIntro} />
      <SolCenterBlock {...devAi} />
      <SolSplit {...devProduct} bg="surface" imageSide="left" headingSize="md" variant="rounded" />
      <SolSplit {...devMobile} bg="white" imageSide="right" headingSize="md" variant="rounded" />
      <SolSplit {...devLaunch} bg="surface" imageSide="right" variant="rounded" />
      <SolSplit {...devShip} bg="white" imageSide="left" variant="rounded" />
      <SolCardGrid {...devOpportunities} />
      <SolSteps {...devSteps} />
      <SolDarkTiles {...devAudience} />
      <FaqGrid title="Custom development, without the complexity." items={devFaqs} />
      <SolCtaBand {...devCta} />
    </>
  );
}
