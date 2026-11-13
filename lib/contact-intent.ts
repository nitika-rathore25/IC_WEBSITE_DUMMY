import type { ReactNode } from "react";
import { CTA } from "@/lib/cta-links";

/**
 * What a visitor wanted when they clicked through to /contact-us. Every
 * contact button links to `/contact-us?intent=<key>&cta=<button label>`
 * (built by contactHref below), so the contact page intro, the email
 * subject and the email body can all say what the request is about.
 */
export type ContactIntent = "demo" | "expert" | "workshop" | "team";

export const CONTACT_INTENTS: Record<
  ContactIntent,
  {
    label: string;
    subject: string;
    heading: string;
    pageText: string;
    formTitle: string;
  }
> = {
  demo: {
    label: "Demo Request",
    subject: "Demo Request",
    heading: "Book a Demo",
    formTitle: "Request your demo",
    pageText:
      "Book a personalized demo and see how Insights Curry's platforms can turn your data into decisions.",
  },
  expert: {
    label: "Talk to an Expert",
    subject: "Expert Consultation Request",
    heading: "Talk to an Expert",
    formTitle: "Connect with an expert",
    pageText:
      "Share your goals with us, and one of the Insights Curry experts will connect with you to explore the right solution.",
  },
  workshop: {
    label: "Workshop / Event",
    subject: "Workshop & Event Enquiry",
    heading: "Workshops & Events",
    formTitle: "Register your interest",
    pageText:
      "Register your interest in our workshops and events, and our team will share the details with you.",
  },
  team: {
    label: "Connect with Our Team",
    subject: "New Enquiry",
    heading: "Contact Us",
    formTitle: "Send us a message",
    pageText: "Talk to the Insights Curry team to find out how we can help you.",
  },
};

export function isContactIntent(value: unknown): value is ContactIntent {
  return typeof value === "string" && value in CONTACT_INTENTS;
}

/** Works out the intent from a button's label ("Book a Demo" → demo). */
export function intentFromLabel(label: string): ContactIntent {
  const text = label.toLowerCase();
  if (/workshop|webinar|seminar|event/.test(text)) return "workshop";
  if (/demo/.test(text)) return "demo";
  if (/expert/.test(text)) return "expert";
  return "team";
}

/** Contact page link carrying the intent and the clicked button's label. */
export function contactHref(
  label: string,
  intent: ContactIntent = intentFromLabel(label)
) {
  const params = new URLSearchParams({ intent, cta: label });
  return `${CTA.contact}?${params.toString()}`;
}

/** Adds intent + label to plain contact links; leaves every other href alone. */
export function withContactIntent(href: string, label: ReactNode) {
  return href === CTA.contact && typeof label === "string"
    ? contactHref(label)
    : href;
}
