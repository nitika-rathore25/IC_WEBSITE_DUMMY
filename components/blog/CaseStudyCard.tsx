import Image from "next/image";
import Link from "next/link";
import type { CaseStudyTeaser } from "@/data/blogs";
import { CategoryPill } from "./CategoryPill";
import { ReadLink } from "./ReadLink";

/**
 * Case study card. The default size is the large card of the listing ("Read Our
 * Case Studies"); `compact` is the smaller card used in an article's related row.
 */
export function CaseStudyCard({ study, compact = false }: { study: CaseStudyTeaser; compact?: boolean }) {
  return (
    <Link
      href={study.href}
      className={`group flex h-full flex-col overflow-hidden border border-para/25 bg-white ${compact ? "rounded-3xl" : "rounded-[36px]"}`}
    >
      <Image
        src={study.image}
        alt={study.imageAlt}
        width={1280}
        height={640}
        sizes={compact ? "(min-width: 1024px) 479px, (min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="aspect-[2/1] w-full object-cover"
      />
      <div className="flex flex-1 flex-col items-start gap-3 p-6">
        <CategoryPill category={study.category} />
        <h3
          className={
            compact
              ? "text-xl font-medium leading-8 text-heading lg:text-2xl lg:leading-9"
              : "line-clamp-4 text-3xl font-bold leading-tight text-heading lg:text-[48px] lg:leading-[58px] min-[1440px]:text-[60px] min-[1440px]:leading-[70px]"
          }
        >
          {study.title}
        </h3>
        <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{study.excerpt}</p>
        <span className="mt-auto">
          <ReadLink>Read full case study</ReadLink>
        </span>
      </div>
    </Link>
  );
}
