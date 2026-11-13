import Image from "next/image";
import { Section } from "@/components/ui/Section";

/**
 * "Customer Story" (Figma InsignAI "Section 10"): 676px column (eyebrow, then title 24px below) beside a
 * 748x330 panel (12px radius) where the photo fades fully to white; Challenge / Solution / Outcome sit
 * in a 500px block 24px from the right, vertically centred (24/36 orange labels, 18/24 copy, 6px gaps).
 * Below 1536px the panel sits under the title; on phones the copy drops below the photo.
 */
export function StoryBlock({
  eyebrow = "Customer Story",
  title,
  image,
  items,
}: {
  eyebrow?: string;
  title: string;
  image: string;
  items: { label: string; body: string }[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      {/* Side by side only from 1536px; below that the 748px panel would be too narrow for the copy, so it sits under the title. */}
      <div className="grid items-center gap-10 min-[1536px]:grid-cols-[minmax(0,676fr)_minmax(0,748fr)] min-[1536px]:gap-16">
        <div className="flex flex-col gap-3 lg:gap-6">
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{eyebrow}</p>
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        </div>
        <div className="relative w-full max-w-[748px] overflow-hidden rounded-xl md:flex md:min-h-[330px] md:items-center md:justify-end md:p-6 md:pr-6">
          {/* Phone: plain photo above the copy. */}
          <div className="relative h-[240px] md:hidden">
            <Image src={image} alt="" fill sizes="100vw" className="object-cover object-[30%_40%]" />
          </div>
          {/* md+: Figma crop - photo zoomed to 144% of the panel height and shifted left so the
              woman fills the left third, then faded to white behind the copy. */}
          <div className="absolute left-0 top-[-24%] hidden aspect-[1400/933] h-[144%] -translate-x-[16%] md:block" aria-hidden="true">
            <Image src={image} alt="" fill sizes="720px" className="object-cover" />
          </div>
          <div
            className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0)_130px,rgba(255,255,255,0.9)_215px,#fff_290px)] md:block"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-1.5 bg-white p-5 md:w-[500px] md:max-w-[calc(100%-200px)] md:bg-transparent md:p-0">
            {items.map((it) => (
              <div key={it.label} className="flex flex-col gap-1.5">
                <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{it.label}</p>
                <p className="text-base leading-6 text-heading lg:text-lg lg:leading-6">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
