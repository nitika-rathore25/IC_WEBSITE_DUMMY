"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { caseStudies, type BlogCategoryId } from "@/data/blogs";
import { CaseStudyCard } from "./CaseStudyCard";

/** Case studies shown before the "More case studies" button (the design shows four). */
const INITIAL_COUNT = 4;

/**
 * "Read Our Case Studies": two-column grid of large cards. Follows the section
 * selected in the blog tabs; with no section selected it shows every case study,
 * the first four first and the rest behind a button.
 */
export function CaseStudyGrid({ category }: { category: BlogCategoryId | null }) {
  const [expanded, setExpanded] = useState(false);

  // A new section starts collapsed again.
  useEffect(() => setExpanded(false), [category]);

  const visible = category ? caseStudies.filter((c) => c.category === category) : caseStudies;
  const shown = expanded ? visible : visible.slice(0, INITIAL_COUNT);
  const hiddenCount = visible.length - shown.length;

  return (
    <Section py="pt-16 pb-12 lg:pt-[120px] lg:pb-[60px]" id="case-studies">
      <div className="flex flex-col gap-8 lg:gap-9">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          Read Our Case Studies
        </h2>
        {shown.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
            {shown.map((c) => (
              <li key={c.slug}>
                <CaseStudyCard study={c} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-para lg:leading-[30px]">No case studies in this section yet.</p>
        )}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mx-auto rounded-full border border-cta px-8 py-3 text-xl font-medium text-cta transition hover:bg-cta hover:text-white"
          >
            More case studies ({hiddenCount})
          </button>
        )}
      </div>
    </Section>
  );
}
