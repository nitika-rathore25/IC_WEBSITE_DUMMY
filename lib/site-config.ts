/**
 * Single source of truth for the public contact address. Every mailto: link
 * and displayed email on the site reads from here, which reads from
 * NEXT_PUBLIC_CONTACT_EMAIL (set in .env.local / .env.production on the server). The contact
 * form's API route (app/api/contact/route.ts) falls back to the same value
 * when CONTACT_TO_EMAIL isn't set separately.
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@insightscurry.com";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/**
 * Office addresses, shown on the contact page and in the footer. Each
 * address is split into postal lines so it renders the same everywhere.
 */
export const OFFICES = [
  {
    region: "United States",
    addressLines: ["6410 Paseo Santa Maria", "Pleasanton, CA 94566, USA"],
    phones: [{ label: "+1 (315) 642-2662", href: "tel:+13156422662" }],
  },
  {
    region: "India",
    addressLines: [
      "Desk Plaza, 4th Floor, Good Earth City Center",
      "Sector 50, Gurgaon, Haryana 122018, India",
    ],
    phones: [
      { label: "+91 (011) 42638374", href: "tel:+911142638374" },
      { label: "42638474", href: "tel:+911142638474" },
    ],
  },
];
