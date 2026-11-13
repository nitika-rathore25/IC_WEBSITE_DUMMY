import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { CTA } from "@/lib/cta-links";
import { builtBy } from "@/data/home";

/** "Built by Insights Curry" product strip (Figma "Section 6"). */
export function BuiltBySection() {
  return (
    <Section id="built-by" className="bg-surface lg:min-h-[718px]">
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
            Built by <span className="text-gradient-teal">Insights Curry</span>
          </h2>
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
            Intelligence with a point of view.
          </p>
        </div>

        {/* Five products: one row from 1440px; below that 3 + 2 / 2 + 2 + 1 with the short last row centred. */}
        <ul className="flex w-full flex-wrap justify-center gap-9 rounded-3xl bg-white p-6 lg:p-10">
          {builtBy.map((p) => (
            <li
              key={p.title}
              className="w-full sm:w-[calc((100%-36px)/2)] lg:w-[calc((100%-72px)/3)] min-[1440px]:w-[calc((100%-144px)/5)]"
            >
              <Link href={p.href} className="group flex flex-col items-center gap-3 text-center">
                <Image src={p.icon} alt="" width={100} height={100} />
                <p className="text-2xl font-medium leading-9 text-heading group-hover:text-cta transition-colors">
                  {p.title}
                </p>
                <div className="text-lg text-para lg:text-xl lg:leading-[30px]">
                  {p.text.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <CtaButton href={CTA.contact}>Meet the Insights Curry products</CtaButton>
      </div>
    </Section>
  );
}
