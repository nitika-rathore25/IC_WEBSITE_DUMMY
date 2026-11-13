import { Section } from "@/components/ui/Section";
import { Rich } from "./Rich";

/**
 * "The problem" split (Figma InsignAI "Section 2"): two 700px columns 88px apart. Left: a 2-up grid of
 * white question pills (338x48, 12px padding, 18/24), a note and an orange accent line. Right: title,
 * blue sub line, paragraphs and an optional closing line.
 */
export function ProblemSplit({
  pills,
  note,
  noteAccent,
  title,
  sub,
  paragraphs,
  closing,
}: {
  pills: string[];
  note?: string[];
  noteAccent?: string;
  title: string;
  sub?: string;
  paragraphs: string[];
  closing?: string;
}) {
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-[88px]">
        {/* Heading first in the markup so mobile reads heading → points; md:order-first keeps tablet and desktop exactly as designed. */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2 className="text-4xl font-bold leading-tight text-black lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {sub && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{sub}</p>}
          {paragraphs.map((p) => (
            <p key={p} className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{p}</Rich></p>
          ))}
          {closing && <p className="text-lg font-medium text-heading lg:text-xl lg:leading-[30px]">{closing}</p>}
        </div>
        <div className="flex flex-col gap-4 md:order-first">
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:gap-y-4">
            {pills.map((p) => (
              <li key={p} className="rounded-xl bg-white p-3 text-base leading-6 text-para lg:text-lg lg:leading-6">{p}</li>
            ))}
          </ul>
          {note?.map((n) => (
            <p key={n} className="text-lg text-para lg:text-xl lg:leading-[30px]">{n}</p>
          ))}
          {noteAccent && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{noteAccent}</p>}
        </div>
      </div>
    </Section>
  );
}
