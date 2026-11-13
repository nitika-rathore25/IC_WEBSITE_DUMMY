import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ReadLink } from "@/components/blog/ReadLink";
import { PRESS_MEDIA_EMAIL, type PressCoverageItem, type PressRelease } from "@/data/press-releases";
import { CalendarIcon, PressReleaseMeta } from "./PressReleaseBody";

/** Brand-gradient rule that draws in along the top of a card on hover (as on the Events cards). */
function HoverRule() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ffd33d] to-cta transition-transform duration-300 group-hover:scale-x-100"
    />
  );
}

const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-cta/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]";

/**
 * Navy panel on the featured card: soft brand glows over a dot grid, with the
 * release's products as glass chips. Releases without a product list show the
 * newsroom label only.
 */
function ReleaseVisual({ release }: { release: PressRelease }) {
  const products = release.body.find((b) => b.type === "products");

  return (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-navy px-6 py-12 lg:min-h-full lg:px-10">
      <span aria-hidden="true" className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-insight-blue/60 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-cta/45 blur-3xl transition-transform duration-700 group-hover:scale-110" />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan">
          {products ? products.label : "Insights Curry Newsroom"}
        </p>
        {products && (
          <>
            <ul className="flex max-w-[440px] flex-wrap justify-center gap-3">
              {products.items.map((p, i) => (
                <li
                  key={p.name}
                  style={{ transitionDelay: `${i * 50}ms` }}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 py-2 pl-2 pr-4 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:border-white/30"
                >
                  <span className="rounded-xl bg-white p-0.5">
                    <Image src={p.icon} alt="" width={36} height={36} />
                  </span>
                  <span className="text-base font-medium text-white lg:text-lg">{p.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-white/70">{products.items.length} connected products</p>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Pale panel on a coverage card: the featured card's glows and dot grid, mirrored and in a light
 * tint, because publication logos are dark and would be lost on navy.
 */
function CoverageVisual({ item }: { item: PressCoverageItem }) {
  return (
    <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-insight-blue/10 p-8">
      <span aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-insight-blue/25 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cta/20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(20,50,90,0.28)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <Image
        src={item.logo}
        alt={item.publication}
        width={272}
        height={90}
        className="relative h-auto w-[220px] transition duration-300 group-hover:-translate-y-1 lg:w-[272px]"
      />
    </div>
  );
}

/**
 * Press Releases page body: Press Coverage heading and cards (the publication's logo beside the copy,
 * opening the article on the publication's site), Press Releases heading, the newest release as a
 * wide featured card (copy beside the navy product visual), older releases in a card grid, then a
 * navy media-enquiries band. Each release card opens the release's own page.
 */
export function PressReleaseListing({ releases, coverage }: { releases: PressRelease[]; coverage: PressCoverageItem[] }) {
  const [featured, ...rest] = releases;

  return (
    <Section className="bg-gradient-to-b from-surface to-white" py="pt-12 pb-16 lg:pt-[60px] lg:pb-[100px]">
      <div className="flex flex-col gap-8 lg:gap-12">
        {coverage.length > 0 && (
          <div id="press-coverage" className="flex flex-col gap-8 lg:gap-12">
            <div className="flex max-w-[900px] flex-col gap-3">
              <h2 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
                Press Coverage
              </h2>
              <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
                Insights Curry in the news.
              </p>
            </div>
            <ul className="flex flex-col gap-5 md:gap-6">
              {coverage.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative grid overflow-hidden rounded-3xl border border-para/20 bg-white md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[380px_minmax(0,1fr)] ${cardHover}`}
                  >
                    <HoverRule />
                    <CoverageVisual item={c} />
                    <div className="flex flex-col gap-3 p-6 lg:px-8">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-base text-para lg:text-lg">
                        <span className="rounded-full bg-insight-blue/10 px-3 py-1 text-sm font-medium text-insight-blue">
                          {c.publication}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <CalendarIcon />
                          {c.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug text-heading transition-colors group-hover:text-insight-blue lg:text-2xl lg:leading-9">
                        {c.title}
                      </h3>
                      <p className="hidden text-base text-para md:block lg:text-lg lg:leading-7">{c.text}</p>
                      <span className="mt-auto pt-1">
                        <ReadLink>Read on {c.publication}</ReadLink>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stays the page's h1, matching its title, though Press Coverage comes first. */}
        <div className="mt-8 flex max-w-[900px] flex-col gap-3 first:mt-0 lg:mt-12">
          <h1 className="text-4xl font-bold leading-tight text-heading lg:text-[60px] lg:leading-[70px]">
            Press Releases
          </h1>
          <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">
            News and announcements from Insights Curry.
          </p>
        </div>

        {featured && (
          <Link
            href={`/media/${featured.slug}`}
            className={`group relative grid overflow-hidden rounded-[32px] border border-para/20 bg-white lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] ${cardHover}`}
          >
            <HoverRule />
            <div className="flex flex-col gap-5 p-6 md:p-10 xl:p-12">
              <PressReleaseMeta release={featured} latest />
              <h2 className="text-3xl font-bold leading-tight text-heading transition-colors group-hover:text-insight-blue lg:text-[40px] lg:leading-[52px]">
                {featured.title}
              </h2>
              <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{featured.subtitle}</p>
              <span className="mt-auto pt-2">
                <ReadLink>Read the press release</ReadLink>
              </span>
            </div>
            <ReleaseVisual release={featured} />
          </Link>
        )}

        {rest.length > 0 && (
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-3xl font-medium text-heading lg:text-4xl lg:leading-[54px]">More Press Releases</h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
              {rest.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/media/${r.slug}`}
                    className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-para/20 bg-white p-6 lg:p-8 ${cardHover}`}
                  >
                    <HoverRule />
                    <PressReleaseMeta release={r} />
                    <h3 className="text-xl font-bold leading-snug text-heading transition-colors group-hover:text-insight-blue lg:text-2xl lg:leading-9">
                      {r.title}
                    </h3>
                    <p className="line-clamp-3 text-base text-para lg:text-lg lg:leading-7">{r.subtitle}</p>
                    <span className="mt-auto pt-2">
                      <ReadLink>Read more</ReadLink>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <span aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-cta/30 blur-3xl" />
          <div className="relative flex flex-col gap-2">
            <p className="text-2xl font-medium lg:text-[32px] lg:leading-[48px]">Media Enquiries</p>
            <p className="text-lg text-white/75 lg:text-xl lg:leading-[30px]">
              For press and interview requests, contact our team.
            </p>
          </div>
          {/* The full address doesn't fit in the pill on phones, so it reads "Email Us" there. */}
          <CtaButton href={`mailto:${PRESS_MEDIA_EMAIL}`} shortLabel="Email Us" className="relative shrink-0">
            {PRESS_MEDIA_EMAIL}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
