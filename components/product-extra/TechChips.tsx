import { Section } from "@/components/ui/Section";

/** Centered title (gradient lead-in), paragraph, blue label and a grid of small white outlined chips. */
export function TechChips({
  highlight,
  title,
  body,
  label,
  chips,
}: {
  highlight?: string;
  title: string;
  body: string;
  label: string;
  chips: string[];
}) {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="mx-auto flex max-w-[1488px] flex-col items-center gap-5 text-center lg:gap-6">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
          {highlight && <><span className="text-gradient-orange">{highlight}</span>{" "}</>}
          {title}
        </h2>
        <div className="flex flex-col items-center gap-3">
          <p className="max-w-[900px] text-lg text-para lg:text-xl lg:leading-[30px]">{body}</p>
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{label}</p>
        </div>
        <ul className="grid w-full max-w-[976px] grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {chips.map((c) => (
            <li key={c} className="flex min-h-[64px] items-center justify-center rounded-xl border border-para/50 bg-white p-3 text-base font-medium leading-6 text-heading shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:min-h-[86px] lg:text-xl lg:leading-[30px]">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
