import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product";

export interface AiSvcService {
  icon: string;
  title: string;
  body: string;
  /** Optional "Keywords:" line shown under the body. */
  keywords?: string;
}

/** "Our Services" / "Our Advisory Services": surface band with white rounded cards (orange icon tile, title, body). */
export function AiSvcServiceCards({
  title,
  items,
  cols = 2,
  bg = "surface",
}: {
  title: string;
  items: AiSvcService[];
  cols?: 2 | 3;
  bg?: "surface" | "white";
}) {
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-8 lg:gap-9">
        <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <ul className={`grid w-full gap-6 md:grid-cols-2 lg:gap-x-10 lg:gap-y-9 ${cols === 3 ? "max-w-[1424px] lg:grid-cols-3" : ""}`}>
          {items.map((s) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-[24px] bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.1)]">
              {isIconAsset(s.icon) ? (
                <IconAsset src={s.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px] max-md:self-center" />
              ) : (
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-cta text-white max-md:self-center">
                  <Icon name={s.icon} size={30} />
                </span>
              )}
              <h3 className="text-xl font-medium leading-[30px] text-heading lg:text-2xl lg:leading-9">{s.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{s.body}</p>
              {s.keywords && (
                <p className="text-base text-para lg:text-xl lg:leading-[30px]">
                  <span className="text-insight-blue">Keywords:</span> {s.keywords}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
