import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "./SectionTitle";

/** "Who is it for": centered title and a grid of bordered cards with a photo, blue name and a line of copy. */
export function ImageCards({
  eyebrow,
  title,
  sub,
  cards,
  cols = 3,
  bg = "white",
  wide = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  cards: { image: string; title: string; body: string }[];
  cols?: 2 | 3 | 4;
  bg?: "white" | "surface";
  /** Enspeek "Use Cases": 448px cards (400px content) spanning ~1404px, 400:148 photos. */
  wide?: boolean;
}) {
  const grid = cols === 4 ? "lg:grid-cols-4" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-10">
        <SectionTitle eyebrow={eyebrow} title={title} sub={sub} />
        <ul
          className={`mx-auto grid w-full sm:grid-cols-2 ${
            wide ? "max-w-[1416px] gap-6 lg:gap-9 min-[1440px]:grid-cols-3" : `max-w-[1080px] gap-7 ${grid}`
          }`}
        >
          {cards.map((c) =>
            wide ? (
              // 3-up from 1440px (2-up below, where three would be too narrow). Each card is a
              // size container: from 1440px its contents are sized in cqw against the 446px (inside the border)
              // Figma card (capped at the Figma px) so narrower cards keep the design's line breaks.
              <li key={c.title} className="rounded-xl border border-para/25 bg-white [container-type:inline-size]">
                <div className="flex h-full flex-col items-center gap-3 px-[23px] py-6 text-center min-[1440px]:gap-[min(12px,2.69cqw)] min-[1440px]:px-[min(23px,5.16cqw)] min-[1440px]:py-[min(24px,5.38cqw)]">
                  <div className="relative aspect-[400/150] w-full overflow-hidden rounded-lg">
                    <Image src={c.image} alt="" fill sizes="(min-width: 640px) 450px, 100vw" className="object-cover" />
                  </div>
                  <h3 className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9 min-[1440px]:text-[min(24px,5.38cqw)] min-[1440px]:leading-[min(36px,8.07cqw)]">{c.title}</h3>
                  <p className="text-lg text-para lg:text-xl lg:leading-[30px] min-[1440px]:text-[min(20px,4.48cqw)] min-[1440px]:leading-[min(30px,6.73cqw)]">{c.body}</p>
                </div>
              </li>
            ) : (
              <li key={c.title} className="flex flex-col items-center gap-3 rounded-xl border border-[#e4e6ee] bg-white p-6 text-center">
                <div className="relative aspect-[300/112] w-full overflow-hidden rounded-lg">
                  <Image src={c.image} alt="" fill sizes="320px" className="object-cover" />
                </div>
                <h3 className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{c.title}</h3>
                <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{c.body}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </Section>
  );
}
