import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogTeasers } from "@/data/blogs";

/** The design shows three teasers, so the home page never grows with the blog count. */
const HOME_BLOG_COUNT = 3;

/** "InsightsLab" blog teasers (Figma "Section 9"). */
export function InsightsLabSection() {
  return (
    <Section className="bg-white lg:min-h-[731px]">
      <div className="flex flex-col items-center gap-9">
        <SectionHeading highlight="Lab" joined>
          Insights
        </SectionHeading>
        <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogTeasers.slice(0, HOME_BLOG_COUNT).map((b) => (
            <li key={b.slug}>
              <Link
                href={`/blogs/${b.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-para/25 bg-white"
              >
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 478px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-xl font-medium leading-8 text-heading lg:text-2xl lg:leading-9">{b.title}</p>
                  <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{b.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-3 text-xl font-medium leading-[30px] text-cta">
                    Read the full blog
                    <Image src="/icons/arrow-orange.svg" alt="" width={30} height={30} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
