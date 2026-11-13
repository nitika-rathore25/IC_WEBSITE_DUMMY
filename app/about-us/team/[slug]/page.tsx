import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoTitle } from "@/lib/seo/titles";
import { Section } from "@/components/ui/Section";
import { getTeamMember, team } from "@/data/about";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const member = getTeamMember(params.slug);
  if (!member) return {};
  return buildMetadata({
    title: seoTitle(`/about-us/team/${member.slug}`, `${member.name}, ${member.role}`),
    description: member.summary,
    path: `/about-us/team/${member.slug}`,
  });
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Leader detail page, opened from the "Know More" link on the About Us team cards. */
export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = getTeamMember(params.slug);
  if (!member) notFound();
  const [lead, ...rest] = member.bio;

  return (
    <>
      <JsonLd data={[
          personSchema(member),
          breadcrumbSchema([
            { name: "About Us", path: "/about-us" },
            { name: member.name, path: `/about-us/team/${member.slug}` },
          ]),
        ]} />
      <Section className="bg-gradient-to-b from-surface to-white" py="pt-10 pb-12 lg:pt-[60px] lg:pb-[100px]">
        <Link
          href="/about-us#team"
          className="text-lg font-medium text-[#004aa0] transition-colors hover:text-cta lg:text-xl"
        >
          <span aria-hidden="true">&larr; </span>Our Team
        </Link>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,460px)_minmax(0,1fr)] xl:gap-[88px]">
          {/* Profile card: stays in view while the biography scrolls on desktop. */}
          <aside className="lg:sticky lg:top-[132px] lg:self-start">
            {/* Photo card, then name, title and LinkedIn below it. */}
            <div className="mx-auto flex max-w-[460px] flex-col gap-5">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, (min-width: 500px) 460px, 100vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              {/* Name and title under the photo, with an orange accent rule. */}
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold leading-tight text-heading lg:text-4xl lg:leading-[48px]">{member.name}</h1>
                <span className="h-1 w-14 rounded-full bg-gradient-to-r from-[#ffd33d] to-cta" aria-hidden="true" />
                <p className="w-fit rounded-full bg-insight-blue/10 px-4 py-1.5 text-base font-medium text-insight-blue lg:text-lg">
                  {member.role}
                </p>
              </div>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-md max-md:mx-auto bg-insight-blue px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#184d8a]"
              >
                <LinkedInIcon />
                Connect on LinkedIn
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </aside>

          <article className="flex flex-col gap-6">
            <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">About {member.name}</p>
            <p className="text-xl leading-[32px] text-heading lg:text-2xl lg:leading-[38px]">{lead}</p>
            <div className="h-px w-full bg-para/20" />
            {rest.map((p) => (
              <p key={p.slice(0, 40)} className="text-lg leading-[30px] text-para lg:text-xl lg:leading-[34px]">
                {p}
              </p>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
