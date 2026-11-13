import { Section } from "@/components/ui/Section";
import { Icon, IconAsset, isIconAsset } from "@/components/product/Icon";
import { MobileFlow } from "@/components/ui/MobileFlow";

/**
 * Centered "shift your rhythm" feature (Figma Enspeek "Feature 5"): eyebrow,
 * title, paragraph, labelled rows of chips joined by arrows (each row starts
 * with an orange tag), then a labelled row of capability cards.
 */
export function RhythmFlow({
  eyebrow,
  title,
  body,
  flowLabel,
  rows,
  arrow,
  capabilitiesLabel,
  capabilities,
  bg = "surface",
}: {
  eyebrow: string;
  title: string;
  body: string;
  flowLabel: string;
  rows: { label: string; chips: string[] }[];
  /** Arrow drawn between chips (the exported Figma arrow); falls back to "→". */
  arrow?: string;
  capabilitiesLabel?: string;
  capabilities: { icon: string; title: string; body: string }[];
  bg?: "surface" | "white";
}) {
  const chip = "rounded-xl px-[18px] py-2 text-lg font-medium leading-[30px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] lg:text-xl";
  const join = arrow ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={arrow} alt="" aria-hidden="true" width={17} height={8} className="mx-2 shrink-0" />
  ) : (
    <span className="mx-2 text-cta" aria-hidden="true">→</span>
  );
  return (
    <Section className={bg === "surface" ? "bg-surface" : "bg-white"} py="py-12 lg:py-[60px]">
      <div className="mx-auto flex max-w-[1488px] flex-col items-center gap-8 text-center lg:gap-9">
        <div className="flex flex-col items-center gap-5 lg:gap-6">
          <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">{title}</h2>
          <div className="flex flex-col items-center gap-3">
            <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{body}</p>
            <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{flowLabel}</p>
          </div>
          {rows.map((r) => (
            <ul key={r.label} className="hidden flex-wrap items-center justify-center gap-y-3 md:flex">
              <li className="flex items-center">
                <span className={`${chip} bg-cta text-white`}>{r.label}</span>
                {join}
              </li>
              {r.chips.map((c, j) => (
                <li key={c} className="flex items-center">
                  <span className={`${chip} bg-white text-heading`}>{c}</span>
                  {j < r.chips.length - 1 && join}
                </li>
              ))}
            </ul>
          ))}
          {/* Phones: one card per row ("Old Way", then the new way), steps stacked inside. */}
          {rows.map((r) => (
            <div key={r.label} className="flex w-full max-w-[340px] flex-col items-center gap-4 rounded-2xl bg-white p-5 md:hidden">
              <span className={`${chip} bg-cta text-white`}>{r.label}</span>
              <MobileFlow steps={r.chips} chipClass="rounded-xl bg-surface px-[18px] py-2 text-lg font-medium leading-[30px] text-heading" />
            </div>
          ))}
          {capabilitiesLabel && <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{capabilitiesLabel}</p>}
        </div>
        <ul className="grid w-full max-w-[1092px] gap-5 text-left sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {capabilities.map((c) => (
            <li key={c.title} className="flex flex-col gap-1.5 rounded-xl bg-white p-5 lg:p-6">
              <div className="flex items-start gap-3">
                {isIconAsset(c.icon) ? (
                  <IconAsset src={c.icon} size={30} />
                ) : (
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-cta/10 text-cta">
                    <Icon name={c.icon} size={18} />
                  </span>
                )}
                <h3 className="text-lg font-medium leading-[30px] text-black lg:text-xl">{c.title}</h3>
              </div>
              <p className="text-base leading-6 text-para lg:text-lg">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
