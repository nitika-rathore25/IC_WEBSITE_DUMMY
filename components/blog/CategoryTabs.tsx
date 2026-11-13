import Link from "next/link";
import { blogCategories, type BlogCategoryId } from "@/data/blogs";

/**
 * Category filter row (Figma "Read Our Blogs" and article pages). The active
 * tab is an orange pill. Pass `onSelect` for in-page filtering (buttons) or
 * `hrefFor` for navigation (links). A hairline separates the groups (product / solution) when they share a row.
 */
export function CategoryTabs({
  groups,
  active,
  onSelect,
  hrefFor,
  label = "Blog categories",
}: {
  groups: BlogCategoryId[][];
  active: BlogCategoryId | null;
  onSelect?: (id: BlogCategoryId) => void;
  hrefFor?: (id: BlogCategoryId) => string;
  label?: string;
}) {
  const base = "block rounded-full text-left sm:whitespace-nowrap px-[14px] py-2 text-lg leading-8 transition lg:text-xl lg:leading-9 min-[1728px]:px-[18px] min-[1728px]:text-2xl";
  const cls = (on: boolean) =>
    `${base} ${on ? "bg-cta px-5 text-white min-[1728px]:px-6" : "text-[#004aa0] hover:text-cta"}`;

  return (
    <nav aria-label={label} className="border-y border-[#ebebed] py-6 lg:py-9">
      {/*
        Each group (products / solutions) wraps as a block: if the row is too narrow the
        whole solutions group moves to the next line, not just its last item. Groups sit
        29px apart with a hairline centred in the gap; the wrapper's -29px margin plus
        overflow-hidden clips that gap (and its hairline) whenever a group starts a row.
        Below md the groups dissolve (display: contents) and all items wrap as one flat list.
      */}
      <div className="-mx-[14px] overflow-hidden min-[1728px]:-mx-[18px]">
        <ul className="flex flex-wrap items-center gap-y-2 md:-ml-[29px]">
          {groups.map((group, gi) => (
            <li
              key={gi}
              className="contents md:relative md:ml-[29px] md:block md:max-w-full md:before:absolute md:before:-left-[15px] md:before:top-1/2 md:before:h-[52px] md:before:w-px md:before:-translate-y-1/2 md:before:bg-[#ebebed]"
            >
              <ul className="contents md:flex md:flex-wrap md:items-center md:gap-y-2">
                {group.map((id) => {
                  const on = id === active;
                  const text = blogCategories[id].label;
                  return (
                    <li key={id} className="max-w-full">
                      {hrefFor ? (
                        <Link href={hrefFor(id)} aria-current={on ? "page" : undefined} className={cls(on)}>
                          {text}
                        </Link>
                      ) : (
                        <button type="button" aria-pressed={on} onClick={() => onSelect?.(id)} className={cls(on)}>
                          {text}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
