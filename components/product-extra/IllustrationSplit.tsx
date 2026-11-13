import Image from "next/image";
import { Section } from "@/components/ui/Section";

/** Illustration on the left, big title + blue sub line + paragraphs on the right. The image's white background is blended into the section. */
export function IllustrationSplit({
  title,
  sub,
  paragraphs,
  image,
  bg = "surface",
}: {
  title: string;
  sub?: string;
  paragraphs: string[];
  image: { src: string; alt: string; width: number; height: number };
  bg?: "white" | "surface";
}) {
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,723fr)_minmax(0,700fr)] lg:gap-12 xl:gap-[73px]">
        {/* Text first in the markup so mobile reads text → image; md:order-first keeps tablet and desktop exactly as designed. */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          <div className="flex flex-col gap-3">
            {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
            {paragraphs.map((p) => (
              <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]">{p}</p>
            ))}
          </div>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width:1024px) 723px, 100vw"
          className="h-auto w-full max-w-[723px] justify-self-center mix-blend-multiply md:order-first"
        />
      </div>
    </Section>
  );
}
