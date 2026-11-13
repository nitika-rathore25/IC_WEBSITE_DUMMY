import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { EventGrid } from "@/components/events/EventGrid";

export const metadata: Metadata = buildMetadata({
  title: "Events and Press Releases",
  description: "Webinars, seminars and events from Insights Curry on AI-powered market research.",
  path: "/events",
});

/** Events and Press Releases page, built from the Figma "Event Page" frame. */
export default function EventsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Events", path: "/events" }])]} />
      <EventGrid />
    </>
  );
}
