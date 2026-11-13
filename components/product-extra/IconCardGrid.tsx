import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product/Icon";

/** Light-grey band: centered title and a grid of white cards, each with a peach icon tile, blue name and a line of copy. */
export function IconCardGrid({
  title,
  items,
}: {
  title: string;
  items: { icon: string; title: string; body: string }[];
}) {
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
          {items.map((it) => (
            <li key={it.title} className="flex flex-col gap-3 rounded-2xl border border-surface bg-white p-5 lg:p-6">
              {isIconAsset(it.icon) ? (
                <IconAsset src={it.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px] max-md:self-center" />
              ) : (
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-cta/10 text-cta max-md:self-center">
                  <Icon name={it.icon} size={30} />
                </span>
              )}
              <h3 className="text-xl font-medium leading-[30px] text-insight-blue lg:text-2xl lg:leading-9">{it.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
