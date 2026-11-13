import { Section } from "@/components/ui/Section";
import { Rich } from "./Rich";

/**
 * Two-column colour-gradient band ("Why InsignAI?", Figma InsignAI "Section 3"): eyebrow + big title in a
 * 750px column; 38px gap; a 700px column with the sub line, paragraph and a white-bordered call-out
 * (24px padding, 12px radius, 24/36 title, 18/24 body), stacked 24px apart.
 */
export function GradientBand({
  eyebrow,
  title,
  sub,
  body,
  callout,
  gradient = "teal",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  body: string[];
  callout?: { title: string; body: string };
  gradient?: "teal" | "orange";
}) {
  const bg = gradient === "teal" ? "bg-gradient-to-b from-[#13d8bd] to-[#3c48b7]" : "bg-gradient-to-b from-[#ffd33d] to-[#fd6446]";
  const text = gradient === "teal" ? "text-white" : "text-heading";
  return (
    <Section className={`${bg} ${text} lg:min-h-[494px] lg:flex lg:items-center`} innerClassName="w-full" py="py-12 lg:py-[60px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cta/shape-2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[25%] -left-[4%] hidden h-[80%] w-auto opacity-30 lg:block" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,750fr)_minmax(0,700fr)] lg:gap-[38px]">
        <div className="flex flex-col gap-3">
          {eyebrow && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{eyebrow}</p>}
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          {sub && <p className="text-xl font-medium lg:text-2xl lg:leading-9">{sub}</p>}
          {body.map((p) => (
            <p key={p} className="text-lg lg:text-xl lg:leading-[30px]"><Rich boldClass="font-medium">{p}</Rich></p>
          ))}
          {callout && (
            <div className="flex flex-col gap-3 rounded-xl border border-current p-5 lg:p-6">
              <p className="text-xl font-medium lg:text-2xl lg:leading-9">{callout.title}</p>
              <p className="text-base lg:text-lg lg:leading-6">{callout.body}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
