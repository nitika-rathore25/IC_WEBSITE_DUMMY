import { Section } from "@/components/ui/Section";
import { MobileFlow } from "@/components/ui/MobileFlow";

const chip = "rounded-full border border-para/25 bg-white px-5 py-2 text-base font-medium uppercase text-heading shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:px-6 lg:py-3 lg:text-xl lg:leading-[30px]";

/** Centred title, a row of pill steps joined by orange arrows, then a blue closing line. */
export function AiSvcLoopFlow({
  title,
  steps,
  caption,
  bg = "white",
}: {
  title: string;
  steps: string[];
  caption?: string;
  bg?: "white" | "surface";
}) {
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-8 text-center lg:gap-9">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
        <ol className="hidden flex-wrap items-center justify-center gap-y-3 md:flex">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center">
              <span className={chip}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <span className="px-2 text-cta lg:px-4" aria-hidden="true">
                  <svg width="36" height="10" viewBox="0 0 36 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 5h33M30 1l4 4-4 4" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
        {/* Every flow on these pages is a cycle, so the phone layout closes the loop. */}
        <MobileFlow steps={steps} chipClass={chip} loop />
        {caption && <p className="max-w-[1200px] text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{caption}</p>}
      </div>
    </Section>
  );
}
