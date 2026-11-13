import Link from "next/link";
import { ButtonLabel, CtaButton, mobileCenter } from "@/components/ui/CtaButton";
import { withContactIntent } from "@/lib/contact-intent";

export type SolButtonVariant = "orange" | "dark" | "navy" | "outline" | "outline-dark";

const outline: Record<"outline" | "outline-dark", string> = {
  outline: "border border-cta text-cta hover:bg-cta/5",
  "outline-dark": "border border-heading text-heading hover:bg-heading/5",
};

/**
 * Pill button. Filled variants are the shared CtaButton; the two outlined
 * variants (Figma "secondary" buttons) share its size, arrow and link logic.
 */
export function SolButton({ href, variant = "orange", className = "", shortLabel, children }: { href: string; variant?: SolButtonVariant; className?: string; shortLabel?: string; children: React.ReactNode }) {
  if (variant !== "outline" && variant !== "outline-dark") {
    return <CtaButton href={href} variant={variant} className={className} shortLabel={shortLabel}>{children}</CtaButton>;
  }
  href = withContactIntent(href, children);
  const classes = `inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-lg font-medium leading-[30px] transition lg:text-xl ${outline[variant]} ${mobileCenter(className)} ${className}`;
  const content = (
    <>
      <ButtonLabel shortLabel={shortLabel}>{children}</ButtonLabel>
      <svg className="h-[30px] w-[30px] shrink-0" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
        <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
      </svg>
    </>
  );
  if (/^(#|mailto:|tel:|https?:)/.test(href)) return <a href={href} className={classes}>{content}</a>;
  return <Link href={href} className={classes}>{content}</Link>;
}
