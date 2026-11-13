import { Section } from "@/components/ui/Section";
import { whatWeBuild } from "@/data/about";

export function WhatWeBuildSection() {
  return (
    <Section className="bg-white lg:min-h-[372px] lg:flex lg:items-center" innerClassName="w-full" py="py-12 lg:py-[60px]">
      <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:whitespace-nowrap lg:leading-[70px]">
          What We Build
        </h2>
        <ul className="grid w-full gap-5 sm:grid-cols-2 lg:max-w-[924px] lg:justify-self-end">
          {whatWeBuild.map((item) => (
            <li key={item.title} className="flex flex-col gap-1.5 rounded-xl border border-para/25 p-3">
              <h3 className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{item.title}</h3>
              <p className="text-base text-para lg:text-lg lg:leading-6">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
