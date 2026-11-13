import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product";
import { SolButton, type SolButtonVariant } from "./SolButton";
import { SolGradientText, type SolTone } from "./SolGradientText";

export interface SolHeroCta {
  label: string;
  href: string;
  variant?: SolButtonVariant;
  /** Shorter label for phones. */
  shortLabel?: string;
}

/**
 * Hero for the three solution landing pages: 60/70 h1 with an optional
 * gradient second line, blue sub line, paragraphs, CTA row, optional bordered
 * call-out card, and an illustration on the right.
 */
export function SolHero({
  title,
  highlight,
  tone = "purple",
  sub,
  body,
  ctas,
  callout,
  image,
  visual,
  imageClassName = "",
  copyWidth = 700,
  largeVisual = false,
}: {
  title: string;
  highlight?: string;
  tone?: SolTone;
  sub?: string;
  body: string[];
  ctas: SolHeroCta[];
  callout?: { title: string; body: string };
  image: { src: string; alt: string; width: number; height: number };
  /** Replaces the picture, e.g. an animated diagram. */
  visual?: React.ReactNode;
  imageClassName?: string;
  /** Figma copy-column width at 1728px. */
  copyWidth?: 650 | 700 | 770;
  /**
   * Bigger illustration: stacked below 1280px, then copy and visual share the row
   * in proportion (instead of a fixed copy column) and the visual grows 100px
   * to the left, keeping its right edge on the header's "Request a demo" line.
   */
  largeVisual?: boolean;
}) {
  const fixedCols = { 650: "lg:grid-cols-[minmax(0,650px)_1fr]", 700: "lg:grid-cols-[minmax(0,702px)_1fr]", 770: "lg:grid-cols-[minmax(0,770px)_1fr]" }[copyWidth];
  // Figma copy column vs. the rest of the 1488px row (less the 48px gap); static for Tailwind.
  const fluidCols = { 650: "xl:grid-cols-[minmax(0,650fr)_minmax(0,790fr)]", 700: "xl:grid-cols-[minmax(0,700fr)_minmax(0,740fr)]", 770: "xl:grid-cols-[minmax(0,770fr)_minmax(0,670fr)]" }[copyWidth];
  const cols = largeVisual ? fluidCols : fixedCols;
  const heading = (
    <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-[60px] lg:leading-[70px]">
      {title}
      {highlight && <>{" "}<SolGradientText tone={tone} className="block w-fit">{highlight}</SolGradientText></>}
    </h1>
  );
  const paras = body.map((p) => (
    <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
  ));
  // Side by side as in Figma; the labels step down to 18px below the 1728px frame so both fit.
  const buttons = (
    // Phones: stacked, full width, so both buttons match; side by side from sm.
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {ctas.map((c) => (
        <SolButton
          key={c.label}
          href={c.href}
          variant={c.variant}
          shortLabel={c.shortLabel}
          className="w-full sm:w-auto lg:!px-5 lg:!text-lg min-[1728px]:!px-6 min-[1728px]:!text-xl"
        >
          {c.label}
        </SolButton>
      ))}
    </div>
  );
  return (
    <Section className="bg-white" py="py-12 lg:py-10">
      <div className={`grid items-center gap-10 lg:gap-12 ${cols}`}>
        <div className="flex flex-col gap-6 lg:gap-9">
          {sub ? (
            <>
              {heading}
              <div className="flex flex-col gap-3">
                <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>
                {paras}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4 lg:gap-6">
              {heading}
              <div className="flex flex-col gap-3">{paras}</div>
            </div>
          )}
          <div className={largeVisual ? "xl:hidden" : ""}>{buttons}</div>
          {callout && (
            <div className="flex flex-col gap-3 rounded-xl border border-para/20 bg-white p-5 lg:p-6">
              <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{callout.title}</p>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{callout.body}</p>
            </div>
          )}
        </div>
        <div className={`flex justify-center ${largeVisual ? "xl:justify-end" : "lg:justify-end"}`}>
          {visual ? (
            <div className={`w-full ${largeVisual ? "max-w-[800px] xl:-ml-[100px] xl:w-[calc(100%+100px)] xl:max-w-none" : "max-w-[909px]"}`}>{visual}</div>
          ) : (
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority className={`h-auto w-full max-w-[909px] ${imageClassName}`} />
          )}
        </div>
      </div>
      {/* Beside a large visual the copy column is too narrow for both buttons on one line,
          so from xl they sit in their own row under the copy and visual. */}
      {largeVisual && <div className="mt-9 hidden xl:block">{buttons}</div>}
    </Section>
  );
}
