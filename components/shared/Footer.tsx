import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO, OFFICES } from "@/lib/site-config";
import { footerColumns } from "@/lib/nav";

/**
 * Site-wide footer, rebuilt from the new Figma design: logo left, then
 * Products / Solutions / Resources link columns and a Contact Info column.
 * Email comes from lib/site-config.ts (NEXT_PUBLIC_CONTACT_EMAIL).
 * Below md everything stacks in one left-aligned column.
 */
export default function Footer() {
  const heading = "text-2xl leading-9 font-medium text-navy";
  const rule = "mb-1.5 mt-1.5 h-px bg-cta/40";
  // No mouse-focus box: the footer persists across client navigations, so a clicked
  // link would otherwise stay outlined on the next page.
  const linkClass =
    "text-xl leading-[30px] text-heading hover:text-cta transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cta";

  return (
    <footer className="mobile-center bg-surface">
      <div className="mx-auto flex max-w-[1728px] flex-col gap-10 px-6 py-12 xl:flex-row xl:gap-12 min-[1600px]:gap-[158px] xl:px-[120px]">
        <Link href="/" className="shrink-0 self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Insights Curry" className="h-14 w-auto min-[1500px]:h-[87px]" />
        </Link>

        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-8 md:gap-y-10 xl:gap-x-10 md:grid-cols-3 lg:grid-cols-[auto_auto_auto_minmax(0,360px)] xl:min-w-0">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className={heading}>{col.title}</p>
              <div className={rule} />
              <ul className="flex flex-col gap-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tablet: full row under the link columns; side by side from lg. */}
          <div className="md:col-span-3 lg:col-span-1">
            <p className={heading}>Contact Info</p>
            <div className={rule} />
            {/* Phones: text scales with the screen so "Email: address" always fits on one line. */}
            <ul className="flex flex-col gap-1.5 text-xl leading-[30px] text-heading max-md:text-[clamp(14px,4.6vw,20px)]">
              <li>
                <span className="font-bold text-cta">Phone: </span>
                <a href={OFFICES[0].phones[0].href} className="hover:text-cta transition-colors">
                  {OFFICES[0].phones[0].label}
                </a>
              </li>
              <li className="max-md:whitespace-nowrap">
                <span className="font-bold text-cta">Email: </span>
                <a href={CONTACT_MAILTO} className="break-words hover:text-cta transition-colors xl:whitespace-nowrap">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span className="font-bold text-cta">Address: </span>
                <address className="inline not-italic">
                  {OFFICES[0].addressLines.join(", ")}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
