import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { Icon, IconAsset, isIconAsset } from "./Icon";
import { Rich } from "./Rich";

export interface Tile {
  icon?: string;
  title: string;
  body: string;
}

/**
 * Navy band (Figma InsignAI "Section 4"): a 700px heading (title + orange sub, 12px) beside 718px of
 * copy, 70px apart; 36px below, the tiles label; 36px below that, 350px outlined tiles (24px padding,
 * white/25 border, 12px radius, 6px gap) with a 30px icon + 20/30 title row and 18/24 body, 24px
 * between tiles and 20px between rows, the last row centred.
 */
export function DarkBand({
  title,
  sub,
  paragraphs,
  cta,
  tilesLabel,
  tiles,
  tileCols = 4,
}: {
  title: string;
  sub?: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  tilesLabel?: string;
  tiles?: Tile[];
  tileCols?: 3 | 4;
}) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,700fr)_minmax(0,718fr)] lg:gap-12 xl:gap-[70px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {sub && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{sub}</p>}
        </div>
        <div className="flex flex-col gap-3">
          {paragraphs.map((p) => (
            <p key={p} className="text-lg lg:text-xl lg:leading-[30px]"><Rich boldClass="font-bold text-white">{p}</Rich></p>
          ))}
          {cta && <div className="pt-2"><CtaButton href={cta.href}>{cta.label}</CtaButton></div>}
        </div>
      </div>
      {tiles && (
        <div className="mt-8 flex flex-col gap-8 lg:mt-9 lg:gap-9">
          {tilesLabel && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{tilesLabel}</p>}
          <ul className="flex flex-wrap justify-center gap-4 lg:gap-x-6 lg:gap-y-5">
            {tiles.map((t) => (
              <li
                key={t.title}
                className={`flex basis-full flex-col gap-1.5 rounded-xl border border-white/25 p-5 sm:basis-[calc(50%-8px)] lg:p-6 ${tileCols === 4 ? "lg:basis-[calc(25%-18px)]" : "lg:basis-[calc(33.333%-16px)]"}`}
              >
                <div className="flex items-start gap-3">
                  {t.icon &&
                    (isIconAsset(t.icon) ? (
                      <IconAsset src={t.icon} size={30} />
                    ) : (
                      <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-cta/20 text-cta"><Icon name={t.icon} size={18} /></span>
                    ))}
                  <h3 className="text-lg font-medium leading-[30px] lg:text-xl">{t.title}</h3>
                </div>
                <p className="text-base lg:text-lg lg:leading-6">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
