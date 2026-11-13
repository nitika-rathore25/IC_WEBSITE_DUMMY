import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product/Rich";
import { Callout } from "./Callout";
import { MobileFlow } from "@/components/ui/MobileFlow";

// Figma TalknAct pills: solid 1px border in the accent colour over a 10% tint of it on white.
const rainbow = [
  "border-cta bg-[#fdefe7] text-cta",
  "border-insight-blue bg-[#e9eff7] text-insight-blue",
  "border-[#872bf9] bg-[#f3eafe] text-[#872bf9]",
  "border-[#fc47fb] bg-[#ffedff] text-[#fc47fb]",
];

const flowChip = "rounded-full bg-white px-6 py-3 text-lg font-medium leading-[30px] text-heading shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:text-xl";

/**
 * Centered intro / problem section: big title (optional gradient second line),
 * orange sub line, paragraphs, an optional arrow chip flow, a blue lead line,
 * a row of pills, a closing line and an optional call-out box.
 */
export function CenteredIntro({
  title,
  highlight,
  sub,
  paragraphs = [],
  flow,
  lead,
  pills,
  pillVariant = "navy",
  outro,
  outroTone = "para",
  callout,
  bg = "surface",
}: {
  title: string;
  highlight?: string;
  sub?: string;
  paragraphs?: string[];
  flow?: string[];
  lead?: string;
  pills?: string[];
  pillVariant?: "navy" | "rainbow";
  outro?: string;
  outroTone?: "para" | "heading" | "blue";
  callout?: { title: string; body: string };
  bg?: "surface" | "white";
}) {
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="mx-auto flex max-w-[1488px] flex-col items-center gap-6 text-center lg:gap-9">
        <div className="flex flex-col items-center gap-5 lg:gap-6">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {title}
          {highlight && <span className="block text-gradient-orange">{highlight}</span>}
        </h2>
        {sub && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{sub}</p>}
        {paragraphs.map((p) => (
          <p key={p} className="max-w-[1200px] text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
        ))}
        {flow && (
          // Figma: 24x12-padded pills (20/30 Medium, 0 5 10 shadow), 36px orange arrows 12px either side.
          <ul className="hidden flex-wrap items-center justify-center gap-y-3 md:flex">
            {flow.map((c, i) => (
              <li key={c} className="flex items-center">
                <span className={flowChip}>{c}</span>
                {i < flow.length - 1 && (
                  <svg className="mx-3 shrink-0 text-cta" width="36" height="10" viewBox="0 0 36 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M0 5h34.5M30.5 1l4 4-4 4" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
        {flow && <MobileFlow steps={flow} chipClass={flowChip} />}
        {lead && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{lead}</p>}
        </div>
        {pills && (
          // Figma: equal 324x84 pills (300px label + 12px side padding, 24px vertical), 24px apart,
          // label on one line. Each pill is a size container so the label scales with the pill
          // when four don't fit at 324px, instead of wrapping onto two lines.
          <ul className="flex w-full flex-wrap justify-center gap-4 lg:gap-6">
            {pills.map((p, i) => (
              <li
                key={p}
                className={`w-full rounded-full [container-type:inline-size] sm:w-[calc((100%-16px)/2)] ${
                  pillVariant === "navy" ? "bg-navy text-white lg:w-[min(324px,calc((100%-72px)/4))]" : `border lg:w-[min(350px,calc((100%-72px)/4))] ${rainbow[i % rainbow.length]}`
                }`}
              >
                <span className={`flex items-center justify-center whitespace-nowrap py-5 font-medium leading-9 lg:py-6 ${pillVariant === "navy" ? "px-[min(12px,3.7cqw)] text-[min(24px,7.41cqw)]" : "px-[min(24px,6.86cqw)] text-[min(24px,6.86cqw)]"}`}>
                  {p}
                </span>
              </li>
            ))}
          </ul>
        )}
        {outro && (
          <p className={`text-lg ${outroTone === "para" ? "text-para lg:text-xl lg:leading-[30px]" : `font-medium lg:text-2xl lg:leading-9 ${outroTone === "blue" ? "text-insight-blue" : "text-heading"}`}`}>{outro}</p>
        )}
        {callout && <Callout {...callout} className="mt-3 w-full text-left" />}
      </div>
    </Section>
  );
}
