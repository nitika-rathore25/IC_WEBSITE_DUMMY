import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site-url";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoTitle } from "@/lib/seo/titles";
import { CTA } from "@/lib/cta-links";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/shared/CtaBand";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { CaseStudyCard } from "@/components/blog/CaseStudyCard";
import { CategoryPill } from "@/components/blog/CategoryPill";
import { caseStudies } from "@/data/blogs";
import { caseStudyContent, getCaseStudyContent } from "@/data/case-study-content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudyContent.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const teaser = caseStudies.find((c) => c.slug === params.slug);
  if (!teaser) return {};
  return buildMetadata({
    title: seoTitle(`/case-studies/${teaser.slug}`, teaser.title),
    description: teaser.excerpt,
    path: `/case-studies/${teaser.slug}`,
    image: `${SITE_URL}${teaser.image}`,
  });
}

/**
 * Case study template. There is no Figma frame for it yet, so it reuses the blog
 * article layout (title, picture, body) and adds a key-facts card under the title.
 * TODO(client): confirm the layout once a design exists.
 */
export default function CaseStudyPage({ params }: { params: Params }) {
  const content = getCaseStudyContent(params.slug);
  const teaser = caseStudies.find((c) => c.slug === params.slug);
  if (!content || !teaser) notFound();

  const url = `${SITE_URL}/case-studies/${teaser.slug}`;
  const others = caseStudies.filter((c) => c.slug !== teaser.slug);
  const related = [
    ...others.filter((c) => c.category === teaser.category),
    ...others.filter((c) => c.category !== teaser.category),
  ].slice(0, 3);

  const path = `/case-studies/${teaser.slug}`;
  const jsonLd = [
    articleSchema({ headline: teaser.title, description: teaser.excerpt, image: teaser.image, path }),
    breadcrumbSchema([
      { name: "Blogs and Case Studies", path: "/blogs" },
      { name: teaser.title, path },
    ]),
  ];

  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    {
      label: "X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(teaser.title)}`,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Section py="pt-12 pb-0 lg:pt-[60px]">
        <Link
          href={`/blogs?category=${teaser.category}#case-studies`}
          className="text-lg font-medium text-[#004aa0] hover:text-cta lg:text-xl"
        >
          <span aria-hidden="true">&larr; </span>All case studies
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CategoryPill category={teaser.category} />
          <span className="text-lg font-medium text-para lg:text-xl">Case study</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-[60px] lg:leading-[70px]">
          {teaser.title}
        </h1>

        <div className="mt-8 overflow-hidden rounded-[32px]">
          <Image
            src={teaser.image}
            alt={teaser.imageAlt}
            width={1280}
            height={640}
            priority
            sizes="(min-width: 1728px) 1488px, 100vw"
            className="aspect-[2/1] w-full object-cover"
          />
        </div>

        {content.facts.length > 0 && (
          <dl className="mt-8 grid gap-x-10 gap-y-5 rounded-3xl border border-[#ebebed] bg-[#f8f8fa] p-6 md:grid-cols-2 lg:p-8">
            {content.facts.map((f) => (
              <div key={f.label} className={f.value.length > 140 ? "md:col-span-2" : ""}>
                <dt className="text-base font-medium uppercase tracking-wide text-cta">{f.label}</dt>
                <dd className="mt-1 text-lg text-heading lg:text-xl lg:leading-[30px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Section>

      <Section py="pt-9 pb-0">
        <ArticleBody blocks={content.body} />
      </Section>

      <Section py="pt-9 pb-4 lg:pb-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-lg text-para">
          <span className="font-medium text-heading">Share this case study</span>
          {share.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#004aa0] hover:text-cta"
            >
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section py="py-12 lg:py-[60px]">
          <div className="flex flex-col gap-8 lg:gap-9">
            <h2 className="text-3xl font-medium text-heading lg:text-4xl lg:leading-[54px]">More Case Studies</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <CaseStudyCard study={c} compact />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* TODO(client): confirm the closing CTA copy; it is not part of a design. */}
      <CtaBand
        title={["Let's Talk About", "Your Next Insight."]}
        body={["Tell us what you are trying to decide and our team will show you how Insights Curry can help."]}
        ctaLabel="Talk to an Expert"
        ctaHref={CTA.contact}
      />
    </>
  );
}
