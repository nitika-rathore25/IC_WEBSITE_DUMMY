import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { Rich } from "./Rich";

export interface HeroCta {
  label: string;
  href: string;
  variant?: "orange" | "dark" | "navy";
}

/**
 * Hero for product and solution pages: optional badge pill, 60/70 title with
 * one highlighted tail ("... Like a <Researcher?>"), blue sub line, intro
 * paragraphs, CTA buttons, and a right-hand image.
 */
export function ProductHero({
  badge,
  title,
  highlight,
  sub,
  body,
  ctas,
  footnote,
  image,
  visual,
  imageClassName = "",
  minHeight = "lg:min-h-[720px]",
  copyWidth = 600,
  variant = "product",
  bg,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  sub?: string;
  body: string[];
  ctas?: HeroCta[];
  /** Optional blue "Trusted by ..." line under the buttons. */
  footnote?: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Replaces the picture, e.g. a picture with animation laid over it. */
  visual?: React.ReactNode;
  imageClassName?: string;
  minHeight?: string;
  /** Figma copy-column width at 1728px (600 Enspeek, 650 InsignAI, 700 SegmentIQ / PersonaAI / ConceptAI). */
  copyWidth?: 600 | 650 | 700;
  /** "service": Figma AI sub-page hero - white band, 36px stack, sub line + body as a 12px group. */
  variant?: "product" | "service";
  /** Section background override, e.g. to match an illustration's own backdrop edge to edge. */
  bg?: string;
}) {
  const service = variant === "service";
  const cols = { 600: "lg:grid-cols-[minmax(0,600px)_1fr]", 650: "lg:grid-cols-[minmax(0,650px)_1fr]", 700: "lg:grid-cols-[minmax(0,700px)_1fr]" }[copyWidth];
  return (
    <Section className={`${bg ?? (service ? "bg-white" : "bg-[#f8f8fa]")} lg:flex ${minHeight} lg:items-center`} innerClassName="w-full" py="py-12 lg:py-10">
      <div className={`grid items-center gap-10 lg:gap-10 xl:gap-[22px] ${cols}`}>
        <div className={`flex flex-col gap-6 ${service ? "lg:gap-9" : ""}`}>
          {badge && (
            <span className="w-fit rounded-full border border-cta bg-cta/10 px-6 py-2 text-lg font-medium text-cta lg:text-xl lg:leading-[30px]">{badge}</span>
          )}
          <h1 className="text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-[60px] lg:leading-[70px]">
            {title}
            {highlight && <> <span className="text-gradient-orange">{highlight}</span></>}
          </h1>
          <div className={`flex flex-col ${service ? "gap-3" : "gap-6"}`}>
            {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
            {body.map((p) => (
              <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
            ))}
          </div>
          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap gap-4 lg:gap-6">
              {ctas.map((c) => (
                <CtaButton key={c.label} href={c.href} variant={c.variant ?? "orange"}>
                  {c.label}
                </CtaButton>
              ))}
            </div>
          )}
          {footnote && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{footnote}</p>}
        </div>
        <div className="flex justify-center lg:justify-end">
          {visual ? (
            <div className={`w-full max-w-[850px] ${imageClassName}`}>{visual}</div>
          ) : (
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority className={`h-auto w-full max-w-[850px] ${imageClassName}`} />
          )}
        </div>
      </div>
    </Section>
  );
}
