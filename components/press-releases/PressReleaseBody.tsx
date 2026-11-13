import Image from "next/image";
import Link from "next/link";
import { Rich } from "@/components/product/Rich";
import { getTeamMember } from "@/data/about";
import { PRESS_MEDIA_EMAIL, type PressReleaseBlock, type PressReleaseProduct, type PressRelease } from "@/data/press-releases";

const bodyText = "text-lg text-para lg:text-xl lg:leading-[30px]";

/** Paragraph text: [label](href) becomes a link; the rest goes through Rich for **bold**. */
function Text({ children }: { children: string }) {
  // split() with two capture groups gives [text, label, href, text, label, href, ...].
  const parts = children.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 3 === 0 ? (
          <Rich key={i}>{p}</Rich>
        ) : i % 3 === 1 ? (
          <Link
            key={i}
            href={parts[i + 1]}
            className="font-medium text-insight-blue underline decoration-insight-blue/30 underline-offset-4 transition-colors hover:text-cta hover:decoration-cta"
          >
            {p}
          </Link>
        ) : null
      )}
    </>
  );
}

export function CalendarIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path strokeLinecap="round" d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path strokeLinejoin="round" d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
      <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
    </svg>
  );
}

/** "Press Release" pill, date and dateline city: used on the Press Releases listing and the release page. */
export function PressReleaseMeta({ release, latest = false }: { release: PressRelease; latest?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-base text-para lg:text-lg">
      <span className="flex flex-wrap gap-2">
        {latest && (
          <span className="inline-flex items-center gap-2 rounded-full bg-heading px-3 py-1 text-sm font-medium text-white">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cta" />
            </span>
            Latest
          </span>
        )}
        <span className="rounded-full bg-cta/10 px-3 py-1 text-sm font-medium text-cta">Press Release</span>
      </span>
      <span className="inline-flex items-center gap-2">
        <CalendarIcon />
        <time dateTime={release.publishedAt}>{release.date}</time>
      </span>
      <span className="inline-flex items-center gap-2">
        <PinIcon />
        {release.location}
      </span>
    </div>
  );
}

/**
 * Media-contact card at the end of each release. Same soft
 * grey card and heading size as the release's "About Insights Curry" box, so the
 * two read as a pair; the address carries a small orange mail badge.
 */
export function MediaContact({ className = "" }: { className?: string }) {
  return (
    <div className={`mobile-center-off flex flex-col gap-3 rounded-3xl bg-surface p-6 lg:p-8 ${className}`}>
      <h2 className="text-2xl font-medium leading-snug text-heading lg:text-[32px] lg:leading-[48px]">
        Media Contact
      </h2>
      <a
        href={`mailto:${PRESS_MEDIA_EMAIL}`}
        className="inline-flex w-fit max-w-full items-center gap-3 text-lg font-medium text-insight-blue transition-colors hover:text-cta lg:text-xl lg:leading-[30px]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta/10 text-cta">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
          </svg>
        </span>
        <span className="min-w-0 [overflow-wrap:anywhere]">{PRESS_MEDIA_EMAIL}</span>
      </a>
    </div>
  );
}

/** The release's product list as linked rows: icon, name and description, arrow on hover. */
function Products({ items }: { items: PressReleaseProduct[] }) {
  return (
    <ul className="divide-y divide-para/15 overflow-hidden rounded-3xl border border-para/20 bg-white">
      {items.map((p) => (
        <li key={p.name}>
          <Link
            href={p.href}
            className="group flex items-start gap-4 p-5 transition-colors hover:bg-surface lg:gap-6 lg:p-6"
          >
            <Image src={p.icon} alt="" width={56} height={56} className="h-12 w-12 shrink-0 lg:h-14 lg:w-14" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-xl font-medium leading-8 text-heading transition-colors group-hover:text-cta lg:text-2xl lg:leading-9">
                {p.name}
              </p>
              <p className="text-base text-para lg:text-lg lg:leading-7">{p.text}</p>
            </div>
            <span className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta/10 text-cta transition group-hover:translate-x-1 group-hover:bg-cta/20 sm:flex">
              <Arrow className="h-6 w-6" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Pull quote on a navy card: gradient quote mark, quote one step above body text, speaker's photo and role. */
function Quote({ block }: { block: Extract<PressReleaseBlock, { type: "quote" }> }) {
  const member = block.teamSlug ? getTeamMember(block.teamSlug) : undefined;
  return (
    <figure className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white md:p-8 lg:p-10">
      <span aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-insight-blue/50 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cta/25 blur-3xl" />
      <blockquote className="relative flex flex-col gap-4 text-xl font-medium leading-snug lg:text-2xl lg:leading-9">
        {block.parts.map((p, i) => (
          <p key={p}>
            {i === 0 && <span className="text-gradient-orange mr-1 align-[-0.4em] text-[2.2em] font-bold leading-[0]">&ldquo;</span>}
            {p}
            {i === block.parts.length - 1 && <span className="text-gradient-orange ml-1 align-[-0.4em] text-[2.2em] font-bold leading-[0]">&rdquo;</span>}
          </p>
        ))}
      </blockquote>
      <figcaption className="relative mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
        {member && (
          <Image
            src={member.image}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/20"
          />
        )}
        <div className="flex flex-col">
          {member ? (
            <Link href={`/about-us/team/${member.slug}`} className="text-lg font-medium hover:text-cta lg:text-xl">
              {block.name}
            </Link>
          ) : (
            <span className="text-lg font-medium lg:text-xl">{block.name}</span>
          )}
          <span className="text-base text-white/70 lg:text-lg">{block.role}</span>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Body of a press release. Consecutive paragraphs sit 12px apart; headings,
 * the product list and quotes get 36px around them, as in the blog articles.
 */
export function PressReleaseBody({ blocks }: { blocks: PressReleaseBlock[] }) {
  return (
    <div className="mobile-center-off">
      {blocks.map((b, i) => {
        const prev = blocks[i - 1];
        const gap = i === 0 ? "" : prev?.type === "paragraph" && b.type === "paragraph" ? "mt-3" : "mt-6 lg:mt-9";
        switch (b.type) {
          case "paragraph":
            return (
              <p key={i} className={`${gap} ${bodyText} ${i === 0 ? "text-heading/80" : ""}`}>
                <Text>{b.text}</Text>
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className={`${gap} text-2xl font-medium leading-snug text-heading lg:text-[32px] lg:leading-[48px]`}>
                {b.text}
              </h2>
            );
          case "products":
            return (
              <div key={i} className={gap}>
                <Products items={b.items} />
              </div>
            );
          case "quote":
            return (
              <div key={i} className={gap}>
                <Quote block={b} />
              </div>
            );
        }
      })}
    </div>
  );
}
