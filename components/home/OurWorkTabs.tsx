"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { ourWork } from "@/data/home";

/**
 * "Our Work" tabbed section (Figma Section 4, variants RS / CD / AI).
 * The active tab is a blue pill; the layout flips image-first on the
 * Custom Development tab exactly as in the design.
 */
export function OurWorkTabs() {
  const [active, setActive] = useState(0);
  const item = ourWork[active];

  const text = (
    <div className="flex max-w-[700px] flex-col gap-6">
      <h3 className="text-3xl font-bold leading-tight text-heading lg:text-4xl lg:leading-[48px]">{item.title}</h3>
      <div className="flex flex-col gap-3 text-lg text-para lg:text-xl lg:leading-[30px]">
        {item.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div>
        <CtaButton href={item.href}>{item.cta}</CtaButton>
      </div>
    </div>
  );

  // The supplied home artwork has text near its edges, so it is never cropped:
  // every tab shows it inside the same frame, scaled to fit.
  // Artwork with a hard off-white edge (fadeAspect = its width / height) is sized to
  // its own shape inside the frame and feathered on all four sides into the page.
  const fade = "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";
  const image = item.imageContain ? (
    <div className="flex aspect-[1671/941] w-full max-w-[840px] items-center justify-center lg:w-[58%] lg:shrink-0">
      <div
        className="relative h-full max-w-full"
        style={
          item.fadeAspect
            ? { aspectRatio: item.fadeAspect, maskImage: fade, WebkitMaskImage: fade, maskComposite: "intersect", WebkitMaskComposite: "source-in" }
            : { width: "100%" }
        }
      >
        <Image
          key={item.image}
          src={item.image}
          alt={item.title}
          fill
          // The artwork has small labels: serve a larger, uncompressed copy so the
          // browser scales down a sharp image instead of a soft one.
          quality={100}
          // `fullRes` artwork skips Next's resize/re-encode and ships the original PNG.
          unoptimized={item.fullRes}
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  ) : (
    <div className="relative aspect-[2/1] w-full max-w-[700px] overflow-hidden lg:h-[350px] lg:w-[700px]">
      <Image
        key={item.image}
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 700px, 100vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <Section className="bg-white lg:min-h-[744px]">
      <div className="flex flex-col items-center gap-9">
        <SectionHeading highlight="Work">Our</SectionHeading>

        <div role="tablist" aria-label="Our work" className="flex flex-wrap items-center justify-center gap-2 lg:gap-0">
          {ourWork.map((w, i) => (
            <button
              key={w.tab}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-6 py-3 text-xl font-medium transition-colors lg:text-2xl lg:leading-9 ${
                i === active ? "bg-insight-blue text-white" : "text-heading hover:text-insight-blue"
              }`}
            >
              {w.tab}
            </button>
          ))}
        </div>

        <div className="w-full border-t border-para/25" />

        <div
          role="tabpanel"
          className={`flex w-full flex-col items-center justify-center gap-8 lg:gap-[88px] ${
            item.imageFirst ? "lg:flex-row" : "lg:flex-row"
          }`}
        >
          {item.imageFirst ? (
            <>
              {image}
              {text}
            </>
          ) : (
            <>
              {text}
              {image}
            </>
          )}
        </div>

        <div className="w-full border-t border-para/25" />
      </div>
    </Section>
  );
}
