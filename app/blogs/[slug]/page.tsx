import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site-url";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoTitle } from "@/lib/seo/titles";
import { CTA } from "@/lib/cta-links";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqGrid } from "@/components/product";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { blogTeasers, productCategoryIds, solutionCategoryIds } from "@/data/blogs";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: seoTitle(`/blogs/${post.slug}`, post.title),
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    image: `${SITE_URL}${post.heroImage.src}`,
  });
}

/**
 * Article template, built from the Figma "Blog Page Internal" frame.
 * Author, date and read time are not in the design; they appear (and enter
 * the Article JSON-LD) only once set in data/blog-posts.ts.
 */
export default function BlogArticlePage({ params }: { params: Params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  // Same-section blogs first, then fill up from the rest so the row always has three.
  const others = blogTeasers.filter((b) => b.slug !== post.slug);
  const related = [
    ...others.filter((b) => b.category === post.category),
    ...others.filter((b) => b.category !== post.category),
  ].slice(0, 3);

  // FaqGrid fills the left column first; the design reads left-to-right, so interleave.
  const faqs = post.faqs ?? [];
  const faqItems = [...faqs.filter((_, i) => i % 2 === 0), ...faqs.filter((_, i) => i % 2 === 1)];

  const path = `/blogs/${post.slug}`;
  const jsonLd = [
    articleSchema({
      headline: post.title,
      description: post.excerpt,
      image: post.heroImage.src,
      path,
      author: post.author,
      datePublished: post.publishedAt,
    }),
    breadcrumbSchema([
      { name: "Blogs and Case Studies", path: "/blogs" },
      { name: post.title, path },
    ]),
    ...(faqs.length ? [faqSchema(faqs)] : []),
  ];

  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    {
      label: "X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    },
  ];

  const meta = [post.author, post.publishedAt, post.readTime].filter(Boolean);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Section py="pt-12 pb-0 lg:pt-[60px]">
        <CategoryTabs
          groups={[productCategoryIds, solutionCategoryIds]}
          active={post.category}
          hrefFor={(id) => `/blogs?category=${id}`}
        />
        <h1 className="mt-8 text-4xl font-bold leading-tight text-heading md:text-5xl lg:mt-10 lg:text-[60px] lg:leading-[70px]">
          {post.title}
        </h1>
        {meta.length > 0 && <p className="mt-4 text-lg text-para">{meta.join(" · ")}</p>}
        <p className="mt-6 text-lg text-para lg:text-xl lg:leading-[30px]">{post.intro}</p>
        <div className="mt-8 overflow-hidden rounded-[32px]">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            width={post.heroImage.width}
            height={post.heroImage.height}
            priority
            sizes="(min-width: 1728px) 1488px, 100vw"
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      </Section>

      {post.body.length > 0 && (
        <Section py="pt-9 pb-0">
          <ArticleBody blocks={post.body} />
        </Section>
      )}

      <Section py="pt-9 pb-4 lg:pb-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-lg text-para">
          <span className="font-medium text-heading">Share this article</span>
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

      {faqItems.length > 0 && <FaqGrid title="Questions? Let's Make Them Useful." items={faqItems} />}

      {related.length > 0 && (
        <Section py="py-12 lg:py-[60px]">
          <div className="flex flex-col gap-8 lg:gap-9">
            <h2 className="text-3xl font-medium text-heading lg:text-4xl lg:leading-[54px]">More Blogs</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => (
                <li key={b.slug}>
                  <BlogCard blog={b} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* TODO(client): confirm the closing CTA copy; it is not part of the article design. */}
      <CtaBand
        title={["Let's Talk About", "Your Next Insight."]}
        body={["Tell us what you are trying to decide and our team will show you how Insights Curry can help."]}
        ctaLabel="Talk to an Expert"
        ctaHref={CTA.contact}
      />
    </>
  );
}
