import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product";
import { SolTitle } from "./SolGradientText";

export interface SolDarkTile {
  icon: string;
  title: string;
  body?: string;
  bullets?: string[];
}

/**
 * Navy band of outlined tiles.
 * - "stacked": centered white title above a 4-up row (icon above uppercase title).
 * - "split": title + orange sub line on the left, 3-up tile grid on the right
 *   (icon beside the title, bullet lists inside).
 */
export function SolDarkTiles({
  layout = "stacked",
  title,
  sub,
  tiles,
}: {
  layout?: "stacked" | "split";
  title: string;
  sub?: string;
  tiles: SolDarkTile[];
}) {
  const split = layout === "split";
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className={split ? "grid items-center gap-10 lg:grid-cols-[minmax(0,700fr)_minmax(0,718fr)] lg:gap-12 xl:gap-[70px]" : "flex flex-col gap-8 lg:gap-9"}>
        <div className={`flex flex-col gap-3 ${split ? "" : "items-center text-center"}`}>
          <SolTitle tone2="light">{title}</SolTitle>
          {sub && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{sub}</p>}
        </div>
        <ul className={`grid gap-4 sm:grid-cols-2 ${split ? "lg:grid-cols-3 lg:gap-5" : "lg:grid-cols-4 lg:gap-6"}`}>
          {tiles.map((t) => (
            <li key={t.title} className={`flex flex-col gap-1.5 rounded-xl border ${split ? "border-white p-3" : "border-white/25 p-5"}`}>
              {split ? (
                <div className="flex items-center gap-3">
                  {isIconAsset(t.icon) ? (
                    <IconAsset src={t.icon} size={30} />
                  ) : (
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-white/10"><Icon name={t.icon} size={18} /></span>
                  )}
                  <h3 className="text-lg font-medium leading-[30px] lg:text-xl">{t.title}</h3>
                </div>
              ) : (
                <>
                  {isIconAsset(t.icon) ? (
                    <IconAsset src={t.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px] max-md:self-center" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center max-md:self-center"><Icon name={t.icon} size={28} strokeWidth={1.6} /></span>
                  )}
                  <h3 className="text-lg font-medium uppercase leading-[30px] lg:text-xl">{t.title}</h3>
                </>
              )}
              {t.body && <p className="text-base lg:text-lg lg:leading-6">{t.body}</p>}
              {t.bullets && (
                <ul className={`text-base lg:text-lg lg:leading-6 ${split ? "" : "list-disc space-y-0.5 pl-5 marker:text-white/70"}`}>
                  {t.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
