import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/product";
import { SolTitle } from "./SolGradientText";

/** Navy band with a centered white title and centered paragraphs (bold runs via **...**). */
export function SolCenteredBand({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      <div className="mx-auto flex max-w-[1488px] flex-col items-center gap-6 text-center lg:gap-10">
        <SolTitle tone2="light">{title}</SolTitle>
        <div className="flex flex-col gap-3">
          {paragraphs.map((p) => (
            <p key={p} className="text-lg lg:text-2xl lg:leading-9"><Rich boldClass="font-bold text-white">{p}</Rich></p>
          ))}
        </div>
      </div>
    </Section>
  );
}
