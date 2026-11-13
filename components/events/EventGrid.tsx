import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { events as defaultEvents, type EventItem } from "@/data/events";

/** Small label for the card: `kind` if set, else read from the title / description ("Webinar", ...). */
function kindOf(e: EventItem): string | null {
  if (e.kind) return e.kind;
  const text = `${e.title} ${e.description}`.toLowerCase();
  const kinds: [RegExp, string][] = [
    [/workshop/, "Workshop"],
    [/webinar/, "Webinar"],
    [/seminar/, "Seminar"],
    [/presentation/, "Presentation"],
    [/press release/, "Press Release"],
    [/award/, "Award"],
    [/partnership/, "Partnership"],
    [/featured in|in the news/, "In the News"],
  ];
  return kinds.find(([re]) => re.test(text))?.[1] ?? null;
}

function CalendarIcon() {
  return (
    <svg className="mt-[3px] h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path strokeLinecap="round" d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

/**
 * Events page body: H1 plus a responsive grid of text cards (type label, title,
 * date line, "Get More Info"). The PR page reuses it with its own heading and items.
 */
export function EventGrid({ title = "Events", items = defaultEvents }: { title?: string; items?: EventItem[] }) {
  return (
    <Section className="bg-gradient-to-b from-surface to-white" py="pt-12 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <div className="flex flex-col gap-8 lg:gap-12">
        <h1 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h1>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
          {items.map((e) => {
            const kind = kindOf(e);
            return (
              <li key={e.title}>
                <Link
                  href={e.href}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-para/20 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-cta/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] lg:p-8"
                >
                  {/* Brand-gradient rule that draws in along the top on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ffd33d] to-cta transition-transform duration-300 group-hover:scale-x-100"
                  />
                  {kind && (
                    <span className="w-fit rounded-full bg-cta/10 px-3 py-1 text-sm font-medium text-cta">{kind}</span>
                  )}
                  <h2 className="text-xl font-bold leading-snug text-heading transition-colors group-hover:text-insight-blue lg:text-2xl lg:leading-9">
                    {e.title}
                  </h2>
                  <p className="flex gap-2 text-base leading-6 text-para lg:text-lg lg:leading-7">
                    <CalendarIcon />
                    <span>{e.description}</span>
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-base font-medium text-cta lg:text-lg">
                    Get More Info
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cta/10 transition group-hover:translate-x-1 group-hover:bg-cta/20"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 30 30" fill="currentColor">
                        <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
