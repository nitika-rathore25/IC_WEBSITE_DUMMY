"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { CTA } from "@/lib/cta-links";
import {
  platformLinks,
  solutionLinks,
  aiServiceLinks,
  companyLinks,
  resourceLinks,
  type NavLink,
} from "@/lib/nav";

type MenuKey = "platform" | "solution" | "company" | "resources";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-[22px] w-[22px] transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/** One row of a dropdown card; rows are separated by a hairline, per the Figma "Menu" frames. */
function DropdownRow({
  link,
  width,
  sub = false,
}: {
  link: NavLink;
  width: string;
  sub?: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={`block border-b border-para/25 last:border-b-0 pb-3 last:pb-0 ${width} ${
        sub
          ? "pl-6 text-lg leading-6 text-insight-blue font-normal"
          : "text-xl leading-[30px] text-heading font-medium"
      } hover:text-cta transition-colors`}
    >
      {link.label}
    </Link>
  );
}

/** One link inside an expanded mobile section; `sub` rows are the indented AI services. */
function MobileLink({ link, active, sub = false }: { link: NavLink; active: boolean; sub?: boolean }) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${sub ? "" : "font-medium"} ${
        active ? "bg-white text-cta shadow-sm" : `hover:bg-white ${sub ? "text-insight-blue" : "text-heading"}`
      }`}
    >
      {link.label}
    </Link>
  );
}

function Dropdown({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`absolute top-full z-50 pt-3 ${
        align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
      }`}
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-surface bg-white p-6 shadow-[10px_10px_10px_rgba(0,0,0,0.1)]">
        {children}
      </div>
    </div>
  );
}

/**
 * Site-wide header, rebuilt from the new Figma design: 100px bar, logo left,
 * Platform / Solution / Company / Resources centred, "Request a demo" pill
 * right. Dropdown cards follow the "Menu" and "Solution" frames. Links come
 * from lib/nav.ts so Header and Footer stay in sync.
 */
export default function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setOpen(null);
  }, [pathname]);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const menuButton =
    "flex items-center gap-1.5 text-xl leading-[30px] font-medium text-heading hover:text-cta transition-colors";

  function hoverProps(key: MenuKey) {
    return {
      onMouseEnter: () => setOpen(key),
      onMouseLeave: () => setOpen(null),
    };
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white shadow-[0_5px_10px_rgba(0,0,0,0.1)]"
    >
      <div className="mx-auto flex h-[72px] lg:h-[100px] max-w-[1728px] items-center justify-between px-6 xl:px-[120px]">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Insights Curry" className="h-10 lg:h-[50px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <div className="relative" {...hoverProps("platform")}>
            <button
              className={menuButton}
              onClick={() => setOpen(open === "platform" ? null : "platform")}
              aria-expanded={open === "platform"}
            >
              Platform <Chevron open={open === "platform"} />
            </button>
            {open === "platform" && (
              <Dropdown align="center">
                {platformLinks.map((l) => (
                  <DropdownRow key={l.href} link={l} width="w-[120px]" />
                ))}
              </Dropdown>
            )}
          </div>

          <div className="relative" {...hoverProps("solution")}>
            <button
              className={menuButton}
              onClick={() => setOpen(open === "solution" ? null : "solution")}
              aria-expanded={open === "solution"}
            >
              Solution <Chevron open={open === "solution"} />
            </button>
            {open === "solution" && (
              <Dropdown align="center">
                {solutionLinks.map((l) => (
                  <DropdownRow key={l.href} link={l} width="w-[280px]" />
                ))}
                {aiServiceLinks.map((l) => (
                  <DropdownRow key={l.href} link={l} width="w-[280px]" sub />
                ))}
              </Dropdown>
            )}
          </div>

          {companyLinks.length > 1 ? (
            <div className="relative" {...hoverProps("company")}>
              <button
                className={menuButton}
                onClick={() => setOpen(open === "company" ? null : "company")}
                aria-expanded={open === "company"}
              >
                Company <Chevron open={open === "company"} />
              </button>
              {open === "company" && (
                <Dropdown align="center">
                  {companyLinks.map((l) => (
                    <DropdownRow key={l.href} link={l} width="min-w-[120px] whitespace-nowrap" />
                  ))}
                </Dropdown>
              )}
            </div>
          ) : (
            <Link href={companyLinks[0].href} className={menuButton}>
              Company
            </Link>
          )}

          <div className="relative" {...hoverProps("resources")}>
            <button
              className={menuButton}
              onClick={() => setOpen(open === "resources" ? null : "resources")}
              aria-expanded={open === "resources"}
            >
              Resources <Chevron open={open === "resources"} />
            </button>
            {open === "resources" && (
              <Dropdown align="center">
                {resourceLinks.map((l) => (
                  <DropdownRow key={l.href} link={l} width="min-w-[120px] whitespace-nowrap" />
                ))}
              </Dropdown>
            )}
          </div>
        </nav>

        <div className="hidden lg:block">
          <CtaButton href={CTA.contact}>Request a demo</CtaButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-heading"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu: collapsible sections separated by dividers, demo button pinned below. */}
      {mobileOpen && (
        <div className="lg:hidden flex h-[calc(100dvh-72px)] flex-col border-t border-surface bg-white">
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6">
            <ul className="divide-y divide-[#ebebed]">
              {(
                [
                  { key: "platform", title: "Platform", links: platformLinks },
                  { key: "solution", title: "Solution", links: solutionLinks, sub: aiServiceLinks },
                  { key: "company", title: "Company", links: companyLinks },
                  { key: "resources", title: "Resources", links: resourceLinks },
                ] as { key: MenuKey; title: string; links: NavLink[]; sub?: NavLink[] }[]
              ).map((group) => {
                const expanded = mobileSection === group.key;
                // A one-link group (Company while PR is hidden) is a plain link, not a section.
                if (group.links.length === 1 && !group.sub) {
                  const only = group.links[0];
                  return (
                    <li key={group.key}>
                      <Link
                        href={only.href}
                        className={`block py-4 text-lg font-medium ${pathname === only.href ? "text-cta" : "text-heading"}`}
                      >
                        {group.title}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={group.key}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between py-4 text-lg font-medium transition-colors ${expanded ? "text-cta" : "text-heading"}`}
                      onClick={() => setMobileSection(expanded ? null : group.key)}
                      aria-expanded={expanded}
                    >
                      {group.title}
                      <Chevron open={expanded} />
                    </button>
                    {expanded && (
                      <ul className="mb-4 flex flex-col gap-1 rounded-xl bg-surface p-2">
                        {group.links.map((l) => (
                          <li key={l.href}>
                            <MobileLink link={l} active={pathname === l.href} />
                          </li>
                        ))}
                        {group.sub && (
                          <li>
                            <ul className="ml-3 flex flex-col gap-1 border-l-2 border-insight-blue/20 pl-2">
                              {group.sub.map((l) => (
                                <li key={l.href}>
                                  <MobileLink link={l} active={pathname === l.href} sub />
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-[#ebebed] px-6 py-4">
            <CtaButton href={CTA.contact} className="w-full">
              Request a demo
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
