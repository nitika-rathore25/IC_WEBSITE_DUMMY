import Image from "next/image";
import { Section } from "@/components/ui/Section";

/** White band: centered title above one wide diagram image. */
export function DiagramBand({
  title,
  image,
}: {
  title: string;
  image: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-center text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width:1280px) 1448px, 100vw" className="h-auto w-full max-w-[1448px]" />
      </div>
    </Section>
  );
}
