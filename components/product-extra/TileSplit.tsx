import { Section } from "@/components/ui/Section";

/**
 * Light-grey band: a big title (+ optional blue sub line) beside white tiles
 * with orange headings (and optional body text). `tilesSide` picks which side
 * the tiles sit on; `columns` is the tile grid width on desktop.
 */
export function TileSplit({
  title,
  sub,
  tiles,
  tilesSide = "right",
  columns = 2,
}: {
  title: string;
  sub?: string;
  tiles: { title: string; body?: string }[];
  tilesSide?: "left" | "right";
  columns?: 1 | 2;
}) {
  const heading = (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
      {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
    </div>
  );
  const grid = (
    <ul className={`grid ${columns === 2 ? "gap-4 sm:grid-cols-2 lg:gap-5" : "gap-3"} ${tilesSide === "left" ? "md:order-first" : ""}`}>
      {tiles.map((t) => (
        <li key={t.title} className={`flex flex-col gap-1.5 rounded-xl border border-para/10 bg-white ${columns === 1 ? "px-5 py-3" : "p-3"}`}>
          <h3 className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{t.title}</h3>
          {t.body && <p className="text-base text-para lg:text-lg lg:leading-6">{t.body}</p>}
        </li>
      ))}
    </ul>
  );
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,700fr)_minmax(0,720fr)] lg:gap-12 xl:gap-16">
        {/* Text first in the markup so phones read text → visual; md:order-first keeps tablet and desktop exactly as designed. */}
        {heading}
        {grid}
      </div>
    </Section>
  );
}
