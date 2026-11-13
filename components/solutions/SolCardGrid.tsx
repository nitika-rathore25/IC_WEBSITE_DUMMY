import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset, Rich } from "@/components/product";
import { SolGradientText, SolTitle, type SolTone } from "./SolGradientText";

/**
 * Grey section: centered title, optional orange lead-in, and a grid of white
 * cards with an orange icon tile, blue title and a line of copy. `align`
 * centres the card content (AI problem cards) or keeps it left (opportunity cards).
 */
export function SolCardGrid({
  title,
  highlight,
  tone = "purple",
  lead,
  items,
  cols = 3,
  align = "left",
  uppercaseTitles = false,
  closing,
}: {
  title: string;
  /** Gradient-filled tail of the title, placed on its own line. */
  highlight?: string;
  tone?: SolTone;
  lead?: string;
  items: { icon: string; title: string; body: string }[];
  cols?: 3 | 4;
  align?: "left" | "center";
  uppercaseTitles?: boolean;
  closing?: string;
}) {
  const center = align === "center";
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-6 lg:gap-9">
        <div className="flex flex-col items-center gap-3 text-center">
          <SolTitle>
            {title}
            {highlight && <span className="block"><SolGradientText tone={tone}>{highlight}</SolGradientText></span>}
          </SolTitle>
          {lead && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{lead}</p>}
        </div>
        <ul className={`grid w-full gap-5 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4 lg:gap-6" : "lg:grid-cols-3 lg:gap-[30px]"}`}>
          {items.map((it) => (
            <li key={it.title} className={`flex flex-col gap-3 rounded-2xl border border-surface bg-white p-5 lg:p-6 ${center ? "items-center text-center" : ""}`}>
              {isIconAsset(it.icon) ? (
                <IconAsset src={it.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px] max-md:self-center" />
              ) : (
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-cta/10 text-cta max-md:self-center">
                  <Icon name={it.icon} size={30} />
                </span>
              )}
              <h3 className={`text-xl font-medium leading-[30px] text-insight-blue lg:text-2xl lg:leading-9 ${uppercaseTitles ? "uppercase" : ""}`}>{it.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{it.body}</p>
            </li>
          ))}
        </ul>
        {closing && <p className="max-w-[1200px] text-center text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{closing}</Rich></p>}
      </div>
    </Section>
  );
}
