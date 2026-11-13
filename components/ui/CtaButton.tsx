import Link from "next/link";
import { withContactIntent } from "@/lib/contact-intent";

/**
 * Pill CTA used across the redesigned pages: 20px Medium label + arrow,
 * fully rounded. "orange" is the default; "dark" is the black variant on
 * the orange CTA band. Arrow path is the exact one from the Figma icon. Plain <a> for #anchor / mailto: / external targets
 * (next/link can't route those), next/link otherwise.
 */
/**
 * Phones (below md): every button sits centred in its column, whatever the
 * parent (block, flex or grid), via auto margins. Full-width buttons are
 * already centred and keep their width. Tablet and desktop are unchanged.
 */
export const mobileCenter = (className: string) =>
  /(^|\s)w-full(\s|$)/.test(className) ? "" : "max-md:flex max-md:w-fit max-md:mx-auto";

export type Variant = "orange" | "dark" | "navy";

const variants: Record<Variant, string> = {
  orange: "bg-cta hover:brightness-95",
  dark: "bg-heading hover:bg-black",
  navy: "bg-navy hover:brightness-125",
};

export function CtaButton({
  href,
  children,
  variant = "orange",
  className = "",
  shortLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Shorter label shown on phones; the full label still names the contact enquiry. */
  shortLabel?: string;
}) {
  // Contact links carry the button label so the contact page and the
  // enquiry email know what was clicked (lib/contact-intent.ts).
  href = withContactIntent(href, children);
  const classes = `inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-lg lg:text-xl font-medium leading-[30px] text-white transition ${variants[variant]} ${mobileCenter(className)} ${className}`;

  const content = (
    <>
      <ButtonLabel shortLabel={shortLabel}>{children}</ButtonLabel>
      <svg
        className="h-[30px] w-[30px] shrink-0"
        viewBox="0 0 30 30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
      </svg>
    </>
  );

  if (/^(#|mailto:|tel:|https?:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/**
 * Button label. On phones (below md), text-balance splits a label that has to wrap into even
 * lines instead of leaving one word alone; one-line labels, tablet and desktop are unaffected.
 * `shortLabel` replaces the text below sm, where long labels don't fit.
 */
export function ButtonLabel({ children, shortLabel }: { children: React.ReactNode; shortLabel?: string }) {
  if (!shortLabel) return <span className="max-md:text-balance max-md:text-center">{children}</span>;
  return (
    <>
      <span className="max-md:text-balance max-md:text-center sm:hidden">{shortLabel}</span>
      <span className="hidden max-md:text-balance max-md:text-center sm:inline">{children}</span>
    </>
  );
}
