import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product";
import { SolButton } from "./SolButton";
import { SolGradientText, type SolTone } from "./SolGradientText";

/** Outlined "chip" row ("We build ..."). */
export function SolChips({ items, variant = "plain" }: { items: string[]; variant?: "plain" | "outlined" }) {
  const style =
    variant === "outlined"
      ? "rounded-lg border border-insight-blue/70 bg-white px-4 py-2.5 text-center shadow-[0_2px_8px_rgba(32,98,173,0.12)]"
      : "rounded-xl border border-para/25 bg-white p-3 lg:leading-[30px]";
  return (
    <ul className={`flex flex-wrap gap-3 ${variant === "outlined" ? "justify-center" : ""}`}>
      {items.map((c) => (
        <li key={c} className={`${style} text-base text-heading ${variant === "plain" ? "lg:text-xl" : "lg:text-lg"}`}>{c}</li>
      ))}
    </ul>
  );
}

export interface SolSplitProps {
  bg?: "white" | "surface";
  /** Which side the illustration sits on at desktop width. */
  imageSide?: "left" | "right";
  headingSize?: "md" | "lg";
  headingLevel?: "h2" | "h3";
  heading: string;
  highlight?: string;
  highlightTone?: SolTone;
  sub?: string;
  paragraphs?: string[];
  chipsLabel?: string;
  chips?: string[];
  listLabel?: string;
  list?: string[];
  closing?: string;
  cta?: { label: string; href: string };
  /** Lines shown above the illustration ("Best for: ..." plus a blue link). */
  aside?: { bestFor?: string; link?: { label: string; href: string } };
  image: { src: string; alt: string; width: number; height: number };
  py?: string;
  /** "rounded": 24px-radius picture and 88px column gap (Custom Development / AI pages). */
  variant?: "default" | "rounded";
  /** 24px copy stack (AI capability rows) instead of 36px. */
  tight?: boolean;
}

/**
 * Generic two-column block: copy (heading, sub, paragraphs, optional chips or
 * bullet list, closing line, CTA) beside an illustration, which can sit on
 * either side and carry a "Best for" aside above it.
 */
export function SolSplit({
  bg = "white",
  imageSide = "right",
  headingSize = "lg",
  headingLevel: Heading = "h2",
  heading,
  highlight,
  highlightTone = "purple",
  sub,
  paragraphs,
  chipsLabel,
  chips,
  listLabel,
  list,
  closing,
  cta,
  aside,
  image,
  py = "py-12 lg:py-[60px]",
  variant = "default",
  tight = false,
}: SolSplitProps) {
  const rounded = variant === "rounded";
  const headingClass = headingSize === "lg" ? "text-4xl lg:text-[60px] lg:leading-[70px]" : "text-3xl lg:text-4xl lg:leading-[48px]";
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py={py}>
      <div className={`grid items-center gap-10 lg:gap-12 ${rounded ? "lg:grid-cols-2 xl:gap-[88px]" : `xl:gap-[60px] ${imageSide === "left" ? "lg:grid-cols-[minmax(0,728fr)_minmax(0,700fr)]" : "lg:grid-cols-[minmax(0,700fr)_minmax(0,728fr)]"}`}`}>
        <div className={`flex flex-col gap-6 ${tight ? "" : "lg:gap-9"}`}>
          <Heading className={`font-bold leading-tight text-heading ${headingClass}`}>
            {heading}
            {highlight && <> <SolGradientText tone={highlightTone} className="block w-fit">{highlight}</SolGradientText></>}
          </Heading>
          <div className="flex flex-col gap-3">
          {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
          {paragraphs?.map((p) => (
            <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
          ))}
          {chips && (
            <div className="flex flex-col gap-3">
              {chipsLabel && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{chipsLabel}</p>}
              <SolChips items={chips} />
            </div>
          )}
          {list && (
            <div className="flex flex-col gap-3">
              {listLabel && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{listLabel}</p>}
              <ul className="list-disc pl-[30px] text-lg text-para marker:text-para lg:text-xl lg:leading-[30px]">
                {list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          )}
          {closing && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{closing}</p>}
          </div>
          {cta && (
            <div>
              <SolButton href={cta.href}>{cta.label}</SolButton>
            </div>
          )}
        </div>
        <div className={`flex flex-col gap-6 ${imageSide === "left" ? "lg:order-first" : ""}`}>
          {(aside?.bestFor || aside?.link) && (
            <div className="flex flex-col gap-3">
              {aside?.bestFor && (
                <p className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{aside.bestFor}</Rich></p>
              )}
              {aside?.link && (
                <Link href={aside.link.href} className="text-xl font-medium text-insight-blue hover:underline lg:text-2xl lg:leading-9">
                  {aside.link.label}
                </Link>
              )}
            </div>
          )}
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className={`h-auto w-full ${rounded ? "rounded-[24px]" : ""}`} />
        </div>
      </div>
    </Section>
  );
}
