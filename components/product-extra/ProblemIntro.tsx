import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product/Rich";

export type TitleTone = "dark" | "orange" | "blue";

const toneClass: Record<TitleTone, string> = {
  dark: "text-heading",
  orange: "text-gradient-orange",
  blue: "bg-gradient-to-b from-[#4a8be0] to-[#1b4f9c] bg-clip-text text-transparent",
};

/**
 * "The problem" intro on the light-grey band: centred two-tone title, a
 * coloured sub line, a row of short pills or question cards, one paragraph and
 * a full-width tinted call-out ("X changes that.").
 */
export function ProblemIntro({
  title,
  sub,
  subTone = "blue",
  items,
  itemStyle = "pill",
  paragraph,
  callout,
}: {
  title: { text: string; tone?: TitleTone }[];
  sub: string;
  subTone?: "blue" | "orange";
  items: string[];
  itemStyle?: "pill" | "card";
  paragraph: string;
  callout: { title: string; body: string; tone?: "orange" | "blue" };
}) {
  const calloutTone = callout.tone ?? "orange";
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-6 text-center lg:gap-9">
        <div className="flex flex-col items-center gap-4 lg:gap-6">
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">
            {title.map((l) => (
              <span key={l.text} className={`block ${toneClass[l.tone ?? "dark"]}`}>{l.text}</span>
            ))}
          </h2>
          <p className={`text-xl font-medium lg:text-2xl lg:leading-9 ${subTone === "orange" ? "text-cta" : "text-insight-blue"}`}>{sub}</p>
        </div>
        {itemStyle === "pill" ? (
          <ul className="flex flex-wrap justify-center gap-3 lg:gap-6">
            {items.map((i) => (
              <li key={i} className="rounded-full bg-gradient-to-b from-[#13d8bd] to-[#3c48b7] px-6 py-3 text-base font-medium leading-6 text-white lg:text-lg lg:leading-6">{i}</li>
            ))}
          </ul>
        ) : (
          <ul className="grid w-full max-w-[1464px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {items.map((i) => (
              <li key={i} className="flex items-center rounded-xl bg-white p-5 text-left text-lg text-para lg:min-h-[108px] lg:p-6 lg:text-xl lg:leading-[30px]">{i}</li>
            ))}
          </ul>
        )}
        <p className={`text-lg text-para lg:text-xl lg:leading-[30px] ${itemStyle === "pill" ? "max-w-[1200px]" : "max-w-[1488px]"}`}>{paragraph}</p>
        <div
          className={`flex w-full flex-col gap-3 rounded-[24px] border p-5 text-left lg:p-6 ${
            calloutTone === "orange" ? "border-cta bg-[#fdefe7]" : "border-insight-blue bg-[#e9eff7]"
          }`}
        >
          <p className={`text-xl font-medium lg:text-2xl lg:leading-9 ${calloutTone === "orange" ? "text-cta" : "text-insight-blue"}`}>{callout.title}</p>
          <p className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{callout.body}</Rich></p>
        </div>
      </div>
    </Section>
  );
}
