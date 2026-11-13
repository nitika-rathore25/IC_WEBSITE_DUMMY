import { Section } from "@/components/ui/Section";
import { ConnectionDiagram } from "@/components/shared/ConnectionDiagram";

/** About Us hero — same connection animation as the homepage, different copy. */
export function AboutHero() {
  return (
    <Section className="bg-[#f8f8fa] lg:flex lg:min-h-[720px] lg:items-center" innerClassName="w-full" py="py-12 lg:py-0">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-9">
          <h1 className="max-w-[700px] text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-[60px] lg:leading-[70px]">
            We Connect What Others Leave Disconnected.
          </h1>
          <div className="flex max-w-[700px] flex-col gap-3">
            <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
              People. Data. AI. Technology. Business.
            </p>
            <p className="text-lg text-para lg:text-xl lg:leading-[30px]">
              They already exist inside every organisation. The problem is that they rarely work together.
              Insights Curry brings them into the same conversation connecting AI, data, technology and human
              intelligence to solve complex business problems and create what comes next. We build AI solutions,
              intelligent workflows, data platforms, digital products and technology experiences that work around
              how businesses actually operate.
            </p>
            <p className="text-lg font-medium text-heading lg:text-xl lg:leading-[30px]">
              Because the future isn&apos;t about having more technology. It&apos;s about making everything work
              better together.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ConnectionDiagram className="max-w-[720px]" />
        </div>
      </div>
    </Section>
  );
}
