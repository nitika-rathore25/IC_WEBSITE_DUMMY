import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product";
import { SolTitle } from "./SolGradientText";

/** Grey band: blue eyebrow, big title, intro line, a wrapped set of white question cards, closing line. */
export function SolQuestionBand({
  eyebrow,
  title,
  intro,
  questions,
  closing,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  questions: string[];
  closing: string;
}) {
  return (
    <Section className="bg-surface" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-6 text-center lg:gap-9">
        <div className="flex flex-col items-center gap-3 lg:gap-[14px]">
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{eyebrow}</p>
          <SolTitle>{title}</SolTitle>
          <p className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{intro}</Rich></p>
        </div>
        <ul className="flex w-full max-w-[1480px] flex-wrap justify-center gap-5 lg:gap-[30px]">
          {questions.map((q, i) => (
            <li
              key={`${i}-${q}`}
              className="flex basis-full items-center justify-center rounded-2xl bg-white p-6 text-lg text-para shadow-[0_10px_20px_rgba(0,0,0,0.1)] sm:basis-[calc(50%-10px)] lg:min-h-[108px] lg:basis-[calc(33.333%-20px)] lg:text-xl lg:leading-[30px]"
            >
              {q}
            </li>
          ))}
        </ul>
        <p className="max-w-[1488px] text-lg text-para lg:text-2xl lg:leading-9"><Rich>{closing}</Rich></p>
      </div>
    </Section>
  );
}
