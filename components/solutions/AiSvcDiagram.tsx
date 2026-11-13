import Image from "next/image";
import { Section } from "@/components/ui/Section";

/**
 * Diagram section. layout "split": diagram on the left, title + blue sub on the right.
 * layout "center": centred title, diagram below.
 */
export function AiSvcDiagram({
  title,
  sub,
  image,
  layout = "split",
  bg = "white",
}: {
  title: string;
  sub?: string;
  image: { src: string; alt: string; width: number; height: number };
  layout?: "split" | "center";
  bg?: "white" | "surface";
}) {
  const bgClass = bg === "surface" ? "bg-surface" : "bg-white";
  if (layout === "center") {
    return (
      <Section className={bgClass} py="py-12 lg:py-[60px]">
        <div className="flex flex-col items-center gap-8 lg:gap-[88px]">
          <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {sub && <p className="text-center text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full max-w-[1488px]" />
        </div>
      </Section>
    );
  }
  return (
    <Section className={bgClass} py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-[88px]">
        {/* Heading first in the markup so mobile reads heading → diagram; md:order-first keeps tablet and desktop exactly as designed. */}
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
        </div>
        <div className="flex justify-center md:order-first lg:justify-start">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full max-w-[700px]" />
        </div>
      </div>
    </Section>
  );
}
