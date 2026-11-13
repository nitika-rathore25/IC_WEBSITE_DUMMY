import { Section } from "@/components/ui/Section";
import { MobileFlow } from "@/components/ui/MobileFlow";

/**
 * Centered feature with rows of chips joined by orange arrows (Figma InsignAI "Feature 5"): eyebrow,
 * title, then a 12px group of the blue sub line and the first row's intro; chips are 18x8-padded
 * 20/30 Medium on white with a 12px radius and a 0 5 10 shadow, 8px either side of each arrow; the
 * whole stack is 24px apart.
 */
export function ChipFlow({
  eyebrow,
  title,
  sub,
  rows,
  outro,
  bg = "surface",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  rows: { intro?: string; chips: string[] }[];
  outro?: string[];
  bg?: "white" | "surface";
}) {
  const arrow = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/shared/flow-arrow.svg" alt="" aria-hidden="true" width={17} height={8} className="mx-2 shrink-0" />
  );
  const chip = "rounded-xl bg-white px-[18px] py-2 text-lg font-medium leading-[30px] text-heading shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:text-xl";
  const chips = (list: string[]) => (
    <>
      <ul className="hidden flex-wrap items-center justify-center gap-y-3 md:flex">
        {list.map((c, j) => (
          <li key={c} className="flex items-center">
            <span className={chip}>{c}</span>
            {j < list.length - 1 && arrow}
          </li>
        ))}
      </ul>
      <MobileFlow steps={list} chipClass={chip} />
    </>
  );
  const [first, ...rest] = rows;
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-5 text-center lg:gap-6">
        {eyebrow && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>}
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <div className="flex flex-col items-center gap-3">
          {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
          {first?.intro && <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{first.intro}</p>}
        </div>
        {first && chips(first.chips)}
        {rest.map((r, i) => (
          <div key={i} className="contents">
            {r.intro && <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{r.intro}</p>}
            {chips(r.chips)}
          </div>
        ))}
        {outro?.map((o) => (
          <p key={o} className="max-w-[1488px] text-lg text-para lg:text-xl lg:leading-[30px]">{o}</p>
        ))}
      </div>
    </Section>
  );
}
