import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * "Customer Story": title (and optional button) on the left; a photo that fades
 * into either labelled Challenge / Approach / Outcome text or a quote with an
 * attribution on the right.
 */
export function StoryPanel({
  eyebrow = "Customer Story",
  title,
  cta,
  image,
  items,
  quote,
  panelHeight = "lg:h-[360px]",
  imageFrame = "lg:inset-0",
  panelImage,
}: {
  eyebrow?: string;
  title: string;
  cta?: { label: string; href: string };
  image: string;
  items?: { label: string; body: string }[];
  quote?: { text: string; attribution: string };
  /** Desktop panel height: 360px (Enspeek) or 330px (quote panels on SegmentIQ/PersonaAI/ConceptAI). */
  panelHeight?: "lg:h-[360px]" | "lg:h-[330px]";
  /** Where the photo sits inside the panel on desktop (the design crops each photo differently). */
  imageFrame?: string;
  /** Desktop-only photo pre-cropped exactly as the design frames it in the 748x330 panel (phones keep `image`). */
  panelImage?: string;
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      {/* Figma "Customer Story": 700px text column, 40px gap, 748x360 panel with a 24px radius. */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,700fr)_minmax(0,748fr)]">
        <div className="flex flex-col items-start gap-3">
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{eyebrow}</p>
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {cta && <CtaButton href={cta.href}>{cta.label}</CtaButton>}
        </div>
        {/* The photo fills the panel shifted left (as cropped in the design) and fades to
            white from 25% to 51%, so the copy on the right sits on white. On small screens
            the copy drops below the photo instead. */}
        <div className={`relative overflow-hidden rounded-[24px] ${panelHeight}`}>
          <div className="relative h-[240px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
            <div className={`absolute inset-0 ${imageFrame}`}>
              <Image src={image} alt="" fill sizes="(min-width:1024px) 748px, 100vw" className={`object-cover ${panelImage ? "lg:hidden" : ""}`} />
              {panelImage && <Image src={panelImage} alt="" fill sizes="748px" className="hidden object-cover lg:block" />}
            </div>
            <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent from-[25.27%] to-white to-[50.94%] lg:block" aria-hidden="true" />
          </div>
          <div className={`relative flex flex-col bg-white p-5 lg:absolute ${quote ? "gap-3" : "gap-1.5"} lg:right-[30px] lg:top-1/2 lg:w-[400px] lg:max-w-[54%] lg:-translate-y-1/2 lg:bg-transparent lg:p-0`}>
            {items?.map((it) => (
              <div key={it.label} className="flex flex-col gap-1.5">
                <p className="text-xl font-medium leading-[30px] text-cta">{it.label}</p>
                <p className="text-base leading-6 text-heading lg:text-lg">{it.body}</p>
              </div>
            ))}
            {quote && (
              <figure className="flex flex-col gap-3">
                <blockquote className="text-base leading-6 text-heading lg:text-lg">&ldquo;{quote.text}&rdquo;</blockquote>
                <figcaption className="text-right text-xl font-medium leading-[30px] text-cta lg:text-2xl lg:leading-9">{quote.attribution}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
