/**
 * Press releases, newest first. The Media page (/media) features the first one and
 * lists the rest; each release has its own page at /media/[slug].
 *
 * Text is word for word from the client's release documents. In `paragraph`
 * text, **double asterisks** mark bold and [label](href) marks a link.
 */

export interface PressReleaseProduct {
  name: string;
  icon: string;
  href: string;
  text: string;
}

export type PressReleaseBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  /** Product list; `label` names the set on the Press Releases listing's featured card. */
  | { type: "products"; label: string; items: PressReleaseProduct[] }
  | {
      type: "quote";
      /** The quoted sentences, shown as one pull quote. */
      parts: string[];
      name: string;
      role: string;
      /** Team member slug in data/about.ts, for the photo and profile link. */
      teamSlug?: string;
    };

export interface PressRelease {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date, for sorting and the NewsArticle JSON-LD. */
  publishedAt: string;
  /** Date as written in the release. */
  date: string;
  location: string;
  /** Meta description and listing teaser. */
  excerpt: string;
  body: PressReleaseBlock[];
  /** "About Insights Curry" boilerplate. */
  about: string;
}

/**
 * Media contact named in the releases. Kept apart from CONTACT_EMAIL
 * (lib/site-config.ts) so the press release pages match the release text in every environment.
 */
export const PRESS_MEDIA_EMAIL = "support@insightscurry.com";

export const pressReleases: PressRelease[] = [
  {
    slug: "insights-curry-launches-ai-ecosystem",
    title: "Insights Curry Launches AI Ecosystem to Turn Consumer Research Into Everyday Business Decisions",
    subtitle:
      "New AI products help teams reuse past research, gather feedback through AI-led chats and turn business goals into automated workflows",
    publishedAt: "2026-10-27",
    date: "Oct. 27, 2026",
    location: "Pleasanton, CA",
    excerpt:
      "Insights Curry launches an AI ecosystem of connected products that let organizations question existing research, gather feedback through AI-led chats and turn business goals into automated AI workflows.",
    body: [
      {
        type: "paragraph",
        text: "**Pleasanton, CA – Oct. 27, 2026 –** [Insights Curry](/), an AI-first consumer intelligence company, today announced the launch of its AI ecosystem, a set of connected products that lets organizations question their existing research through AI-built virtual consumers, gather feedback through AI-led chats with real consumers on messaging apps, and turn business goals into automated AI workflows. The products are live now.",
      },
      {
        type: "paragraph",
        text: "The launch targets a common problem in consumer research. Companies often commission new studies to answer questions their archived reports may already address, while years of findings remain trapped in PDFs and slide decks. The ecosystem includes:",
      },
      {
        type: "products",
        label: "AI Ecosystem",
        items: [
          {
            name: "PersonaAI",
            icon: "/images/home/product-personaai.svg",
            href: "/platforms/personaai",
            text: "Turns existing research into evidence-backed, AI-built virtual consumers that teams can question on demand, with supporting studies and confidence levels shown for every answer.",
          },
          {
            name: "SegmentIQ",
            icon: "/images/home/product-segmentiq.svg",
            href: "/platforms/segmentiq",
            text: "Builds and profiles customer segments from survey data using plain-English prompts, with no coding required.",
          },
          {
            name: "InsignAI",
            icon: "/images/home/product-insignai.svg",
            href: "/platforms/insignai",
            text: "Uses a research-specific language model to design questionnaires, monitor data quality and analyze results in one workflow.",
          },
          {
            name: "Enspeek",
            icon: "/images/home/product-enspeek.svg",
            href: "/platforms/enspeek",
            text: "Replaces static surveys with AI-led conversations that adapt to each respondent, reaching real consumers on WhatsApp, Messenger and web links.",
          },
          {
            name: "TalkNAct",
            icon: "/images/home/product-talknact.svg",
            href: "/platforms/talk-n-act",
            text: "Turns a plain-English business goal into a multi-agent workflow that runs the analysis and can trigger downstream actions, with people controlling when it acts.",
          },
        ],
      },
      {
        type: "quote",
        parts: [
          "The challenge for most organizations isn’t a lack of data. It’s getting from that data to a decision quickly enough to matter.",
          "When teams can have a conversation with their research and gather feedback through the apps consumers already use, insight becomes part of everyday decision-making. These tools are designed to support researchers, not replace them.",
        ],
        name: "Mohit Shant",
        role: "Co-founder and Managing Director, Insights Curry",
        teamSlug: "mohit-shant",
      },
      {
        type: "paragraph",
        text: "The products are built to connect data, context, analysis and action, helping organizations move from fragmented information to better-informed decisions.",
      },
      { type: "heading", text: "Custom AI built around the business problem" },
      {
        type: "paragraph",
        text: "Insights Curry also designs custom AI systems and agents for organizations facing challenges that off-the-shelf tools may not fully solve, combining AI models, client-provided data, domain knowledge and purpose-built workflows. “The real opportunity isn’t simply access to powerful AI models,” Shant said. “It’s building the right intelligence, context and workflows around them.”",
      },
      {
        type: "paragraph",
        text: "As enterprise AI evolves, Insights Curry will continue to expand its product ecosystem and develop tailored solutions for organizations looking to embed intelligence more deeply into their operations.",
      },
    ],
    about:
      "Insights Curry is an AI-first market research and consumer intelligence company that combines research expertise, AI-powered products and custom innovation to solve business challenges across the research value chain. Learn more at insightscurry.com.",
  },
];

/** Articles about Insights Curry on other sites, newest first; shown on the Press Releases page. */
export interface PressCoverageItem {
  title: string;
  /** Publication that ran the article. */
  publication: string;
  /** Publication's logo, 272x90 on a transparent background. */
  logo: string;
  /** Date as shown on the publication's article. */
  date: string;
  text: string;
  href: string;
}

export const pressCoverage: PressCoverageItem[] = [
  {
    title: "Insights Curry Launches AI Ecosystem to Turn Consumer Research Into Everyday Business Decisions",
    publication: "CustomerThink",
    logo: "/images/press-coverage/customerthink-logo.png",
    date: "October 29, 2026",
    text: "New AI products help teams reuse past research, gather feedback through AI-led chats and turn business goals into automated workflows",
    href: "https://customerthink.com/insights-curry-launches-ai-ecosystem-to-turn-consumer-research-into-everyday-business-decisions/",
  },
];

export const getPressRelease =(slug: string) => pressReleases.find((p) => p.slug === slug);
