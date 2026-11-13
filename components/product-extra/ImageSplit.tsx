import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product/Rich";

export interface ImageSplitSection {
  sub?: string;
  paragraphs?: string[];
  bullets?: string[];
}

/**
 * Illustration beside copy: optional orange eyebrow, big title, then one or
 * more blocks (blue sub line, paragraphs, bullet list). `imageSide` picks the
 * side the picture sits on.
 */
export function ImageSplit({
  eyebrow,
  title,
  sections,
  image,
  imageSide = "left",
  bg = "white",
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  sections: ImageSplitSection[];
  image: { src: string; alt: string; width: number; height: number };
  imageSide?: "left" | "right";
  bg?: "white" | "surface";
  /** "feature": Figma TalknAct features - 700px columns 88px apart, picture with a 24px radius. */
  variant?: "default" | "feature";
}) {
  const feature = variant === "feature";
  const picture = (
    <div className={`flex justify-center ${imageSide === "left" ? "md:order-first" : ""}`}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width:1024px) 800px, 100vw" className={`h-auto w-full ${feature ? "max-w-[800px] rounded-[24px]" : "max-w-[770px]"}`} />
    </div>
  );
  const text = (
    <div className="flex flex-col gap-4 lg:gap-6">
      {eyebrow && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>}
      <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
      {sections.map((s, i) => (
        <div key={s.sub ?? s.paragraphs?.[0] ?? i} className="flex flex-col gap-3">
          {s.sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{s.sub}</p>}
          {s.paragraphs?.map((p) => (
            <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
          ))}
          {s.bullets && (
            <ul className="flex list-disc flex-col gap-0.5 pl-6 text-lg text-para marker:text-para lg:text-xl lg:leading-[30px]">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className={`grid items-center gap-10 ${feature ? "lg:grid-cols-2 lg:gap-12 xl:gap-[88px]" : `lg:gap-11 ${imageSide === "left" ? "lg:grid-cols-[minmax(0,770fr)_minmax(0,700fr)]" : "lg:grid-cols-[minmax(0,700fr)_minmax(0,770fr)]"}`}`}>
        {/* Text first in the markup so phones read text → visual; md:order-first keeps tablet and desktop exactly as designed. */}
        {text}
        {picture}
      </div>
    </Section>
  );
}
