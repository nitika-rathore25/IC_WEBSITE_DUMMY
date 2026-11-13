import { blogCategories, type BlogCategoryId } from "@/data/blogs";

/** Small category tag shown on case study cards. */
export function CategoryPill({ category }: { category: BlogCategoryId }) {
  const c = blogCategories[category];
  return (
    <span className={`w-fit whitespace-nowrap rounded-full px-5 py-2 text-base leading-7 lg:text-lg min-[1440px]:px-6 min-[1440px]:py-3 min-[1440px]:text-2xl min-[1440px]:leading-9 ${c.tone}`}>{c.label}</span>
  );
}
