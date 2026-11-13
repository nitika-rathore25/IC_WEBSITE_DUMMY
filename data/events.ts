import { contactHref } from "@/lib/contact-intent";

export interface EventItem {
  title: string;
  description: string;
  /** Label on the card; when unset it is read from the title ("Webinar", "Seminar", ...). */
  kind?: string;
  /**
   * TODO(client): event detail pages / registration links are not provided.
   * "Get More Info" goes to the contact page until real URLs are supplied.
   */
  href: string;
}

// Newest first. The five workshops (Aug to Oct) have no year in the source; they are the latest sessions, so they lead.
export const events: EventItem[] = [
  {
    title: "Build a Customer Satisfaction Engine for Continuous Growth with InsignAI",
    kind: "Workshop",
    description: "14th Oct, 12:30 PM EST | 9:30 AM PST",
    href: contactHref("Build a Customer Satisfaction Engine for Continuous Growth with InsignAI", "workshop"),
  },
  {
    title: "De-Risk Innovation Through Concept Testing",
    kind: "Workshop",
    description: "23rd Sep, 12:30 PM EST | 9:30 AM PST",
    href: contactHref("De-Risk Innovation Through Concept Testing", "workshop"),
  },
  {
    title: "Turn Voice of Customer into Growth Opportunities",
    kind: "Workshop",
    description: "9th Sep, 12:30 PM EST | 9:30 AM PST",
    href: contactHref("Turn Voice of Customer into Growth Opportunities", "workshop"),
  },
  {
    title: "Listen to Your Customers: Designing Surveys That Deliver Decisions",
    kind: "Workshop",
    description: "19th August, 12:30 PM EST | 9:30 AM PST",
    href: contactHref("Listen to Your Customers: Designing Surveys That Deliver Decisions", "workshop"),
  },
  {
    title: "Know Your Customer: Customer Intelligence in the Age of AI",
    kind: "Workshop",
    description: "5th August, 12:30 PM EST | 9:30 AM PST",
    href: contactHref("Know Your Customer: Customer Intelligence in the Age of AI", "workshop"),
  },
  {
    title: "AI Powered Research In a Day: Insign AI Webinar",
    description: "Get insights for the Insign AI Webinar (April 23, 2025)",
    href: contactHref("AI Powered Research In a Day: Insign AI Webinar", "workshop"),
  },
  {
    title: "Unlock the Future of AI: Conversational AI Webinar",
    description: "Get insights for the Conversational AI Webinar (February 5, 2025)",
    href: contactHref("Unlock the Future of AI: Conversational AI Webinar", "workshop"),
  },
  {
    title: "32nd Annual Market Research Seminar (MRSI)",
    description: "23rd Sept, 2024 - 24th Sept, 2024",
    href: contactHref("32nd Annual Market Research Seminar (MRSI)", "workshop"),
  },
  {
    title: "Presentation on Empowering Market Research with Generative AI, A Paradigm Shift in the Consumer Insights",
    description: "By Mohit Shant and Md. Faisal at A&I Submit, April 29 - May 3, 2024, San Antonio, Texas",
    href: contactHref("Presentation on Empowering Market Research with Generative AI, A Paradigm Shift in the Consumer Insights", "workshop"),
  },
  {
    title: "Webinar on Insign AI, Leading Intelligent Research",
    description: "30th May, 2023",
    href: contactHref("Webinar on Insign AI, Leading Intelligent Research", "workshop"),
  },
  {
    title: "Webinar on Text Optics",
    description: "12th April, 2023",
    href: contactHref("Webinar on Text Optics", "workshop"),
  },
  {
    title: "Webinar on Conjoint Optiminer",
    description: "15th March 2023",
    href: contactHref("Webinar on Conjoint Optiminer", "workshop"),
  },
  {
    title: "Webinar on Maxdiff Optiminer",
    description: "22nd September 2022",
    href: contactHref("Webinar on Maxdiff Optiminer", "workshop"),
  },
];
