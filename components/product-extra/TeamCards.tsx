import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product/Icon";

/**
 * "Who it's for": centred title (with an optional gradient tail) and a row of
 * bordered cards, each with a coloured icon tile, a name and one line of copy.
 */
export function TeamCards({
  eyebrow,
  title,
  highlight,
  items,
  accent = "orange",
  bg = "surface",
  cols = 5,
}: {
  /** Orange line above the title, as in the kit's SectionTitle. */
  eyebrow?: string;
  title: string;
  /** Tail of the title rendered with the teal gradient. */
  highlight?: string;
  items: { icon: string; title: string; body: string }[];
  accent?: "orange" | "blue";
  bg?: "white" | "surface";
  /** Cards per row on wide screens: 5 (PersonaAI / SegmentIQ) or 4 (TalkNAct). */
  cols?: 4 | 5;
}) {
  // Approximate width of the full heading in ems (~0.49em per character), used to
  // shrink the type on desktop just enough to keep it on one line, capped at 60px.
  const fit = ((highlight ? `${title} ${highlight}` : title).length * 0.49).toFixed(2);
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        {eyebrow && <p className="-mb-5 text-center text-xl font-medium text-cta lg:-mb-6 lg:text-2xl lg:leading-9">{eyebrow}</p>}
        <h2
          style={{ "--fit": fit } as React.CSSProperties}
          className="text-center text-[32px] font-bold leading-tight text-heading sm:text-5xl lg:whitespace-nowrap lg:text-[min(60px,calc((100vw-96px)/var(--fit)))] lg:leading-[1.17] xl:text-[min(60px,calc((min(100vw,1728px)-240px)/var(--fit)))]"
        >
          {title}
          {highlight && <> <span className="text-gradient-teal">{highlight}</span></>}
        </h2>
        {/* Flex-wrap (not grid) so a short last row stays centred at 2/3-column widths. */}
        <ul className="flex flex-wrap justify-center gap-5 min-[1440px]:gap-[29.5px]">
          {items.map((it) => (
            // Each card is a size container: contents are sized in cqw against the
            // 274px Figma card (capped at the Figma px), so narrower cards scale
            // down instead of re-wrapping the copy.
            <li
              key={it.title}
              className={`w-full rounded-[18px] border bg-white [container-type:inline-size] ${cols === 4 ? "sm:w-[calc((100%-20px)/2)] xl:w-[calc((100%-60px)/4)] min-[1440px]:w-[calc((100%-88.5px)/4)]" : "sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] min-[1440px]:w-[calc((100%-118px)/5)]"} ${accent === "orange" ? "border-cta/20" : "border-insight-blue/20"}`}
            >
              <div className="flex flex-col items-center gap-[min(12px,4.38cqw)] px-[min(12px,4.38cqw)] py-[min(16px,5.84cqw)] text-center">
                {isIconAsset(it.icon) ? (
                  <IconAsset src={it.icon} size={60} className="h-[min(60px,21.9cqw)] w-[min(60px,21.9cqw)]" />
                ) : (
                  <span className={`flex h-[min(60px,21.9cqw)] w-[min(60px,21.9cqw)] items-center justify-center rounded-xl text-white ${accent === "orange" ? "bg-cta" : "bg-insight-blue"}`}>
                    <Icon name={it.icon} size={30} className="h-1/2 w-1/2" />
                  </span>
                )}
                <h3 className="text-[min(24px,8.76cqw)] font-medium leading-[min(36px,13.14cqw)] text-heading">{it.title}</h3>
                <p className="text-[min(20px,7.3cqw)] leading-[min(30px,10.95cqw)] text-para">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
