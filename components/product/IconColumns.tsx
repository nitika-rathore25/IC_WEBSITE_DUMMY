import { Section } from "@/components/ui/Section";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";

/** "What makes X different": centered title then a row of orange-icon columns. */
export function IconColumns({
  eyebrow,
  title,
  sub,
  items,
  bg = "white",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  items: { icon: string; title: string; body: string }[];
  bg?: "white" | "surface";
}) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-10">
        <SectionTitle eyebrow={eyebrow} title={title} sub={sub} />
        <ul className={`grid gap-8 sm:grid-cols-2 ${cols}`}>
          {items.map((it) => (
            <li key={it.title} className="flex flex-col gap-3">
              <span className="flex h-[45px] w-[45px] items-center justify-center rounded-lg bg-cta text-white max-md:self-center"><Icon name={it.icon} size={24} /></span>
              <h3 className="text-xl font-medium leading-[30px] text-heading">{it.title}</h3>
              <p className="text-lg text-para lg:leading-[30px]">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
