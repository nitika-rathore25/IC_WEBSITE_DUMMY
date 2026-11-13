"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import {
  blogCategories,
  blogTeasers,
  productCategoryIds,
  solutionCategoryIds,
  type BlogCategoryId,
} from "@/data/blogs";
import { BlogCard } from "./BlogCard";
import { CaseStudyGrid } from "./CaseStudyGrid";
import { CategoryTabs } from "./CategoryTabs";
import { ReadLink } from "./ReadLink";

const DEFAULT_CATEGORY: BlogCategoryId = productCategoryIds[0];
/** Blogs shown per section before the "More blogs" button (the recent card plus a full row of three cards). */
const INITIAL_COUNT = 4;
/** On tablet the grid has two columns, so the recent card plus one row of two. */
const TABLET_INITIAL_COUNT = 3;
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023.98px)";

function isCategory(v: string | null): v is BlogCategoryId {
  return v !== null && v in blogCategories;
}

/**
 * "Read Our Blogs" block: title, category tabs, the Recent Blog card and the
 * More Blogs grid, then the case studies of the same section. The first tab is selected on load; clicking
 * the selected tab again shows every blog. `?category=<id>` pre-selects a tab; `?category=all` shows every section.
 */
export function BlogListing() {
  const [category, setCategory] = useState<BlogCategoryId | null>(DEFAULT_CATEGORY);
  const [expanded, setExpanded] = useState(false);
  const [initialCount, setInitialCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (isCategory(param)) setCategory(param);
    else if (param === "all") setCategory(null);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(TABLET_QUERY);
    const update = () => setInitialCount(mq.matches ? TABLET_INITIAL_COUNT : INITIAL_COUNT);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visible = category ? blogTeasers.filter((b) => b.category === category) : blogTeasers;
  const shown = expanded ? visible : visible.slice(0, initialCount);
  const hiddenCount = visible.length - shown.length;
  const [recent, ...more] = shown;

  return (
    <>
      <Section py="pt-12 pb-0 lg:pt-[60px]">
        <h1 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          Read Our Blogs
        </h1>
        <div className="mt-6 lg:mt-8">
          <CategoryTabs
            groups={[productCategoryIds, solutionCategoryIds]}
            active={category}
            onSelect={(id) => {
              setExpanded(false);
              setCategory((cur) => (cur === id ? null : id));
            }}
          />
        </div>

        {recent ? (
          <div className="mt-8 flex flex-col gap-10 lg:mt-10">
            <article className="grid items-center gap-6 lg:grid-cols-[minmax(0,650fr)_minmax(0,798fr)] lg:gap-10">
              <Link
                href={`/blogs/${recent.slug}`}
                className="block overflow-hidden rounded-[36px]"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={recent.image}
                  alt=""
                  width={1774}
                  height={887}
                  priority
                  sizes="(min-width: 1024px) 649px, 100vw"
                  className="aspect-[650/400] w-full object-cover"
                />
              </Link>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">Recent Blog</p>
                <h2 className="text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-[60px] lg:leading-[70px]">
                  <Link href={`/blogs/${recent.slug}`}>{recent.title}</Link>
                </h2>
                <p className="text-lg text-para lg:text-xl lg:leading-[30px]">
                  {recent.featuredExcerpt ?? recent.excerpt}
                </p>
                <Link href={`/blogs/${recent.slug}`} className="group w-fit">
                  <ReadLink>Read the full blog</ReadLink>
                </Link>
              </div>
            </article>

            {more.length > 0 && (
              <div className="flex flex-col gap-8 lg:gap-9">
                <h2 className="text-3xl font-medium text-[#1e1e1e] lg:text-4xl lg:leading-[48px]">More Blogs</h2>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {more.map((b) => (
                    <li key={b.slug}>
                      <BlogCard blog={b} />
                    </li>
                  ))}
                </ul>
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="mx-auto rounded-full border border-cta px-8 py-3 text-xl font-medium text-cta transition hover:bg-cta hover:text-white"
                  >
                    More blogs ({hiddenCount})
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="text-xl text-para lg:leading-[30px]">
              No blogs in {category ? blogCategories[category].label : "this category"} yet.
            </p>
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                setCategory(null);
              }}
              className="text-xl font-medium text-cta underline-offset-4 hover:underline"
            >
              Show all blogs
            </button>
          </div>
        )}
      </Section>
      <CaseStudyGrid category={category} />
    </>
  );
}
