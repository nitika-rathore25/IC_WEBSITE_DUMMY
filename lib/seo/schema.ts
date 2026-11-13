import { SITE_URL } from "./site-url";
import { CONTACT_EMAIL, OFFICES } from "@/lib/site-config";
import type { TeamMember } from "@/data/about";

/**
 * schema.org JSON-LD builders. Every page that emits structured data goes
 * through here, so the organisation's name, logo and address are written
 * once. Render the result with <JsonLd> (components/seo/JsonLd.tsx).
 *
 * Only describe what the page itself shows: Google treats markup that
 * isn't visible on the page as spam.
 */

type Thing = Record<string, unknown>;

export const ORG_NAME = "Insights Curry";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/ic-logo.png`;

const abs = (path: string) => `${SITE_URL}${path}`;

/** Short reference to the organisation, for publisher/provider/worksFor fields. */
const orgRef: Thing = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORG_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL },
};

/**
 * The offices in OFFICES (lib/site-config.ts), split into postal fields.
 * Keep the two in step when an address changes.
 */
const POSTAL_ADDRESSES: Thing[] = [
  {
    "@type": "PostalAddress",
    streetAddress: "6410 Paseo Santa Maria",
    addressLocality: "Pleasanton",
    addressRegion: "CA",
    postalCode: "94566",
    addressCountry: "US",
  },
  {
    "@type": "PostalAddress",
    streetAddress: "Desk Plaza, 4th Floor, Good Earth City Center, Sector 50",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122018",
    addressCountry: "IN",
  },
];

/** Full organisation entity: home, about and contact pages. */
export function organizationSchema(description: string): Thing {
  return {
    ...orgRef,
    description,
    email: CONTACT_EMAIL,
    address: POSTAL_ADDRESSES,
    contactPoint: OFFICES.map((office) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: office.region,
      telephone: office.phones[0].href.replace("tel:", ""),
      email: CONTACT_EMAIL,
    })),
  };
}

export function websiteSchema(): Thing {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: ORG_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb trail for an inner page. Home is added first automatically. */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Thing {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Built from the FAQ items already shown on the page, word for word. */
export function faqSchema(items: { q: string; a: string }[]): Thing {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  path: string;
}): Thing {
  return {
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: orgRef,
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }): Thing {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    provider: orgRef,
  };
}

export function personSchema(member: TeamMember): Thing {
  return {
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.summary,
    image: abs(member.image),
    url: abs(`/about-us/team/${member.slug}`),
    sameAs: [member.linkedIn],
    worksFor: orgRef,
  };
}

export function contactPageSchema(input: { description: string; path: string }): Thing {
  return {
    "@type": "ContactPage",
    name: `Contact ${ORG_NAME}`,
    description: input.description,
    url: abs(input.path),
    about: { "@id": ORG_ID },
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  image: string;
  path: string;
  author?: string;
  datePublished?: string;
}): Thing {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: abs(input.image),
    mainEntityOfPage: abs(input.path),
    author: input.author ? { "@type": "Person", name: input.author } : { "@type": "Organization", name: ORG_NAME },
    publisher: orgRef,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
  };
}
