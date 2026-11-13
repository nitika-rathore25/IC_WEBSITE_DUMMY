import type { Metadata } from "next";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo/metadata";
import { breadcrumbSchema, contactPageSchema, organizationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Label } from "@/components/shared/Label";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_MAILTO, CONTACT_EMAIL, OFFICES } from "@/lib/site-config";
import { CONTACT_INTENTS, isContactIntent } from "@/lib/contact-intent";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the Insights Curry team — tell us about your project and we'll get back to you.",
  path: "/contact-us",
});

const iconProps = {
  className: "h-5 w-5 shrink-0 text-cta",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/**
 * Contact page — new (not part of the original Figma Make source). Form
 * fields match the old insightscurry.com/contact-us page.
 *
 * Contact buttons link here with ?intent=demo|expert|workshop|team and
 * ?cta=<button label> (lib/contact-intent.ts); the heading, intro line,
 * form title and the enquiry email follow whichever button was clicked.
 */
export default function ContactUsPage({
  searchParams,
}: {
  searchParams: { intent?: string | string[]; cta?: string | string[] };
}) {
  const intent = isContactIntent(searchParams.intent)
    ? searchParams.intent
    : "team";
  const cta =
    typeof searchParams.cta === "string" ? searchParams.cta.slice(0, 150) : "";
  const copy = CONTACT_INTENTS[intent];

  return (
    <>
      <JsonLd data={[
          contactPageSchema({ description: String(metadata.description), path: "/contact-us" }),
          organizationSchema(SITE_DESCRIPTION),
          breadcrumbSchema([{ name: "Contact Us", path: "/contact-us" }]),
        ]} />
      <Section className="bg-surface" py="pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-3xl">
          <Label>Get in Touch</Label>
          <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-heading sm:text-5xl lg:text-[3.75rem]">
            {copy.heading}
          </h1>
          <p className="text-lg leading-relaxed text-para sm:text-xl lg:text-2xl lg:leading-9">
            {copy.pageText}
          </p>
          {intent === "workshop" && cta && (
            <p className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-heading shadow-sm sm:text-base">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-cta"
                aria-hidden="true"
              />
              <span className="truncate">{cta}</span>
            </p>
          )}
        </div>
      </Section>

      <Section py="py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="rounded-3xl border border-[#ebebed] bg-white p-6 shadow-[0_8px_30px_rgba(5,44,90,0.06)] sm:p-8 lg:p-10">
            <h2 className="mb-2 text-2xl font-bold text-heading lg:text-[28px]">
              {copy.formTitle}
            </h2>
            <p className="mb-6 text-base text-para">
              Fill in your details and our team will get back to you shortly.
            </p>
            <ContactForm key={`${intent}:${cta}`} intent={intent} cta={cta} />
          </div>

          <div className="flex flex-col gap-6">
            {OFFICES.map((office) => (
              <div
                key={office.region}
                // Phones: card stays left-aligned (icon column, then text) instead of the page-wide centring.
                className="mobile-center-off rounded-3xl border border-[#ebebed] bg-surface p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(5,44,90,0.08)] sm:p-8"
              >
                <p className="mb-5 inline-flex rounded-full bg-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                  {office.region}
                </p>
                <ul className="space-y-4 text-base text-heading sm:text-lg">
                  <li className="flex gap-3">
                    <PinIcon />
                    <address className="not-italic leading-relaxed">
                      {office.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <PhoneIcon />
                    <span className="flex flex-wrap gap-x-2">
                      {office.phones.map((phone, i) => (
                        <span key={phone.href}>
                          {i > 0 && <span className="mr-2 text-para">/</span>}
                          <a
                            href={phone.href}
                            className="transition-colors hover:text-cta"
                          >
                            {phone.label}
                          </a>
                        </span>
                      ))}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MailIcon />
                    <a
                      href={CONTACT_MAILTO}
                      className="break-all transition-colors hover:text-cta"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
