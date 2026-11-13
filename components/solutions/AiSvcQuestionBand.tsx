import { Section } from "@/components/ui/Section";

/** Navy band: white centred title over a 3-column grid of outlined question pills. */
export function AiSvcQuestionBand({ title, questions }: { title: string; questions: string[] }) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-8 lg:gap-9">
        <h2 className="text-center text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <ul className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-9">
          {questions.map((q) => (
            <li key={q} className="flex items-start gap-3 rounded-xl border border-white/25 p-5 lg:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/shared/chevron-circle-light.svg" alt="" aria-hidden="true" width={30} height={30} className="shrink-0" />
              <span className="text-lg font-medium leading-[30px] lg:text-xl">{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
