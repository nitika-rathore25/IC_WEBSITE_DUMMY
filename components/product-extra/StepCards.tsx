import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product/Icon";

/** Centered title (gradient tail) over a row of bordered step cards with a blue icon tile. */
export function StepCards({
  title,
  highlight,
  items,
}: {
  title: string;
  highlight?: string;
  items: { icon: string; title: string; body: string }[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {title}
          {highlight && <> <span className="text-gradient-orange">{highlight}</span></>}
        </h2>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 xl:gap-[29.5px]">
          {items.map((it) => (
            <li key={it.title} className="flex flex-col items-center gap-3 rounded-[18px] border border-insight-blue/20 bg-white px-3 py-4 text-center">
              {isIconAsset(it.icon) ? (
                <IconAsset src={it.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px]" />
              ) : (
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-[#1f5fb0] text-white">
                  <Icon name={it.icon} size={30} />
                </span>
              )}
              <h3 className="text-xl font-medium leading-[30px] text-heading lg:text-2xl lg:leading-9">{it.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
