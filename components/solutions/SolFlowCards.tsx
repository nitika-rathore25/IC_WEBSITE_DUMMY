import { Section } from "@/components/ui/Section";
import { SolTitle, type SolTone } from "./SolGradientText";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 shrink-0 text-cta ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h17m-5-5 5 5-5 5" />
    </svg>
  );
}

/** Two-tone title over a row of white step cards joined by orange arrows (stacks on small screens). */
export function SolFlowCards({
  lead,
  title,
  steps,
  tone = "aqua",
}: {
  lead: string;
  /** Gradient for the lead line; the title below stays black. */
  tone?: SolTone;
  title: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col gap-8 lg:gap-9">
        <SolTitle lead={lead} tone={tone} leadBlock className="text-center [&>span]:mx-auto">
          {title}
        </SolTitle>
        <ol className="flex flex-col items-center gap-2 xl:flex-row xl:items-stretch xl:gap-0">
          {steps.map((s, i) => (
            <li key={s.title} className="flex w-full max-w-md flex-col items-center gap-2 xl:max-w-none xl:flex-1 xl:flex-row xl:items-center xl:gap-0">
              <div className="flex h-full w-full flex-col items-center gap-1.5 rounded-xl border border-para/20 bg-white p-3 text-center shadow-[0_5px_10px_rgba(0,0,0,0.1)]">
                <h3 className="text-lg font-medium uppercase leading-[30px] text-heading lg:text-xl">{s.title}</h3>
                <p className="text-base text-para lg:text-xl lg:leading-[30px]">{s.body}</p>
              </div>
              {i < steps.length - 1 && <Arrow className="rotate-90 xl:mx-0 xl:rotate-0" />}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
