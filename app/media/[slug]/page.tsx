import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { seoTitle } from "@/lib/seo/titles";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { MediaContact, PressReleaseBody, PressReleaseMeta } from "@/components/press-releases/PressReleaseBody";
import { getPressRelease, pressReleases } from "@/data/press-releases";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return pressReleases.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const release = getPressRelease(params.slug);
  if (!release) return {};
  return buildMetadata({
    title: seoTitle(`/media/${release.slug}`, release.title),
    description: release.excerpt,
    path: `/media/${release.slug}`,
  });
}

/**
 * Press release page: headline block on the soft surface gradient, then the
 * release text, ending with the About boilerplate and media contact as in the release.
 */
export default function PressReleasePage({ params }: { params: Params }) {
  const release = getPressRelease(params.slug);
  if (!release) notFound();

  const path = `/media/${release.slug}`;
  const jsonLd = [
    {
      ...articleSchema({
        headline: release.title,
        description: release.excerpt,
        image: "/og-default.png",
        path,
        datePublished: release.publishedAt,
      }),
      "@type": "NewsArticle",
    },
    breadcrumbSchema([
      { name: "Media", path: "/media" },
      { name: release.title, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Section className="bg-gradient-to-b from-surface to-white" py="pt-10 pb-8 lg:pt-[60px] lg:pb-12">
        <Link
          href="/media"
          className="group inline-flex items-center gap-2 text-base font-medium text-para transition-colors hover:text-cta lg:text-lg"
        >
          <svg
            className="h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 30 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
          </svg>
          All press releases
        </Link>
        <div className="mt-6 lg:mt-8">
          <PressReleaseMeta release={release} />
        </div>
        <h1 className="mt-5 max-w-[1300px] text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-[60px] lg:leading-[70px]">
          {release.title}
        </h1>
        <p className="mt-5 max-w-[1100px] text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
          {release.subtitle}
        </p>
      </Section>

      <Section py="pt-2 pb-12 lg:pt-4 lg:pb-[60px]">
        <article>
          <PressReleaseBody blocks={release.body} />
          {/* About and Media Contact side by side from lg, as matching grey cards. */}
          <div className="mt-6 grid gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_400px]">
            <Link href="/about-us" className="group mobile-center-off rounded-3xl bg-surface p-6 lg:p-8">
              <h2 className="text-2xl font-medium leading-snug text-heading transition-colors group-hover:text-cta lg:text-[32px] lg:leading-[48px]">
                About Insights Curry
              </h2>
              <p className="mt-3 text-lg text-para lg:text-xl lg:leading-[30px]">{release.about}</p>
            </Link>
            <MediaContact />
          </div>
        </article>
      </Section>
    </>
  );
}
