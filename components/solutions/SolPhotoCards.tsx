import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SolTitle } from "./SolGradientText";

/** Centered title over a grid of bordered cards: 2:1 photo, blue name, one line of copy. */
export function SolPhotoCards({
  title,
  cards,
}: {
  title: string;
  cards: { image: string; alt: string; title: string; body: string }[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SolTitle className="text-center">{title}</SolTitle>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
          {cards.map((c) => (
            <li key={c.title} className="flex flex-col items-center gap-3 rounded-2xl border border-surface bg-white p-5 text-center lg:p-6">
              <div className="relative aspect-[424/212] w-full overflow-hidden rounded-xl">
                <Image src={c.image} alt={c.alt} fill sizes="(min-width:1024px) 424px, (min-width:640px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{c.title}</h3>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
