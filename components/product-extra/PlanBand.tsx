import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * Navy "plans" band with outlined tier cards (name over a rule, then one line).
 * layout "inline": title left, cards right. "stacked": centered title, cards,
 * centered button. "split": title left with the button on the right, cards below.
 */
export function PlanBand({
  title,
  tiers,
  cta,
  ctaLight = false,
  layout,
}: {
  title: string;
  tiers: { name: string; text: string }[];
  cta?: { label: string; href: string };
  ctaLight?: boolean;
  layout: "inline" | "stacked" | "split";
}) {
  const button = cta && (
    <CtaButton href={cta.href} className={ctaLight ? "!bg-white !text-navy hover:!bg-white/90" : ""}>
      {cta.label}
    </CtaButton>
  );
  const cards = (cols: string) => (
    <ul className={`grid gap-4 sm:grid-cols-2 xl:gap-[29px] ${cols}`}>
      {tiers.map((t) => (
        // Size container: on desktop the contents are sized in cqw against the 224px
        // Figma card (capped at the Figma px), so "Mid-size Organizations" keeps to
        // one line in narrower cards instead of wrapping.
        <li key={t.name} className="rounded-xl border border-white/25 [container-type:inline-size]">
          <div className="flex flex-col gap-3 p-3 lg:gap-[min(12px,5.36cqw)] lg:p-[min(12px,5.36cqw)]">
            <p className="border-b border-white/50 pb-3 text-lg font-bold lg:pb-[min(12px,5.36cqw)] lg:text-[min(20px,8.93cqw)] lg:leading-[min(30px,13.39cqw)]">{t.name}</p>
            <p className="text-base lg:text-[min(18px,8.04cqw)] lg:leading-[min(24px,10.71cqw)]">{t.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <Section className="bg-navy text-white" py="py-12 lg:py-[60px]">
      {layout === "inline" && (
        <div className="grid items-center gap-8 lg:grid-cols-[200px_1fr] lg:gap-10 xl:gap-[102px]">
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
          {cards(`${tiers.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} xl:!gap-[14px]`)}
        </div>
      )}
      {layout === "stacked" && (
        <div className="flex flex-col items-center gap-8 text-center lg:gap-9">
          <h2 className="text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
          <div className="w-full text-left">{cards("lg:grid-cols-4")}</div>
          {button}
        </div>
      )}
      {layout === "split" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <h2 className="max-w-[1180px] text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px]">{title}</h2>
            {button}
          </div>
          {cards("lg:grid-cols-4 xl:!gap-[30px]")}
        </div>
      )}
    </Section>
  );
}
