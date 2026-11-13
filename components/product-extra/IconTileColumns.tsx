import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/product/SectionTitle";
import { Icon, IconAsset, isIconAsset } from "@/components/product/Icon";

/**
 * Centered title then a row of icon columns (like the kit's IconColumns, with a
 * blue or orange icon tile). `marquee` turns the row into a continuously moving
 * strip, as the Enspeek design runs its columns off the frame edge.
 */
export function IconTileColumns({
  eyebrow,
  title,
  sub,
  items,
  tone = "blue",
  bg = "white",
  marquee = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  items: { icon: string; title: string; body: string }[];
  tone?: "blue" | "orange";
  bg?: "white" | "surface";
  marquee?: boolean;
}) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const tile = tone === "blue" ? "bg-gradient-to-b from-[#1f8ec9] to-[#1f4fa8]" : "bg-cta";
  const column = (it: { icon: string; title: string; body: string }) => (
    <>
      {isIconAsset(it.icon) ? (
        <IconAsset src={it.icon} size={60} className="h-12 w-12 lg:h-[60px] lg:w-[60px] max-md:self-center" />
      ) : (
        <span className={`flex h-[45px] w-[45px] items-center justify-center rounded-lg text-white ${tile} max-md:self-center`}><Icon name={it.icon} size={24} /></span>
      )}
      <h3 className="text-xl font-medium leading-[30px] text-heading lg:text-2xl lg:leading-9">{it.title}</h3>
      <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{it.body}</p>
    </>
  );
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-10">
        <SectionTitle eyebrow={eyebrow} title={title} sub={sub} />
        {marquee ? (
          <div className="-mx-6 overflow-hidden md:-mx-12 xl:-mx-[120px]">
            <ul className="marquee-track flex w-max">
              {[...items, ...items].map((it, i) => (
                <li
                  key={`${it.title}-${i}`}
                  aria-hidden={i >= items.length ? true : undefined}
                  className="flex w-[280px] shrink-0 flex-col gap-3 pl-6 pr-6 lg:w-[356px] lg:pl-0 lg:pr-9"
                >
                  {column(it)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className={`grid gap-8 sm:grid-cols-2 ${cols}`}>
            {items.map((it) => (
              <li key={it.title} className="flex flex-col gap-3">
                {column(it)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
