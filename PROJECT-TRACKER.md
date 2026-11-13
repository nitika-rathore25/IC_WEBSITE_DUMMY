# InsightCurry — Project Tracker

Per-project tracker (dates, checkpoints, status) for this engagement, per
the two-layer setup — the general methodology lives in the shared
`Claude/Skills/` files, this file just tracks InsightCurry specifically.

## Status

Current stage: **In the review/iterate cycle — moving hosting from Vercel to
our own server (2026-10-08).** All routes are built and pushed to
`github.com/swarn-arora-insight/InsightsCurry_Website` (private repo on
your personal account).

Deploying on the server: copy `.env.production` there (it's git-ignored),
then `npm ci`, `npm run build`, `npm run start` (port 3010). The old Vercel
preview (insights-curry-website-sw-kappa.vercel.app) is no longer the target.

### All routes — build status

| Route | Source | Status |
|---|---|---|
| `/` | `pages/Home.tsx` | ✅ Built 2026-09-17 |
| `/platforms/insignai` | `pages/InsignAI.tsx` | ✅ Built 2026-09-17 |
| `/platforms/segmentiq` | `pages/SegmentIQ.tsx` | ✅ Built 2026-09-17 |
| `/platforms/personaai` | `pages/PersonaAI.tsx` | ✅ Built 2026-09-17 |
| `/platforms/conceptai` | `pages/ConceptAI.tsx` | ✅ Built 2026-09-17 |
| `/platforms/enspeek` | `pages/EnspeeK.tsx` | ✅ Built 2026-09-17 |
| `/platforms/talk-n-act` | `ComingSoon` (title="Talk n Act") | ✅ Built 2026-09-17 |
| `/solutions/research-services` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/ai-data-advisory` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/data-cloud-architecture` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/predictive-ai-ml` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/generative-ai-llms` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/agentic-ai-automation` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/ai-services/production-ai-mlops` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/solutions/custom-development` | `ComingSoon` | ✅ Built 2026-09-17 |
| `/contact-us` | new (not in Figma source) | ✅ Built 2026-10-07 — form wired to `/api/contact` (Resend) |

(routes.tsx actually lists 10 `ComingSoon` routes, not 9 as first noted
here — corrected once the real source was read.)

### Next steps (yours to run, not something I can do from here)

1. Run `npm install` locally to pick up the new `resend` dependency.
2. Add `RESEND_API_KEY` to your `.env.local` (not committed) — you said
   you already have a key for the InsightCurry Resend account.
3. Tell me the destination inbox for contact-form submissions so I can
   set `CONTACT_TO_EMAIL`.
4. Grab the Vercel preview URL once the deploy finishes.
5. Share it for review.
6. Go live on the real site once approved.

## Checkpoints

| Date | Checkpoint | Notes |
|---|---|---|
| 2026-09-14 | Figma/design review completed | Four pages analyzed: Homepage, SegmentIQ, InsignAI, Custom Technology. Full findings in `Claude outputs/insightcurry-design-review.md`. |
| 2026-09-14 | Next.js project scaffolded | Copied from `nextjs-base` template into this folder. |
| 2026-09-14 | Hosting + data layer confirmed | Hosting: Vercel (for now, may change). Data layer: static/hardcoded content — no DB or CMS. |
| 2026-09-14 | Git initialized | Initial commit made on the local repo. |
| 2026-09-14 | Figma MCP connector connected | Connected in Claude, but the connected account only had comment access on the standalone Homepage file — no API access to pull exact design context. |
| 2026-09-14 | Requested write/edit access to all pages | Requested from the Figma file owner. |
| 2026-09-16 | Client merged all pages into one file with proper routing | New file replaces the old standalone Homepage link. Figma MCP can read its full generated source (no edit access needed for this one — it returned source directly). This is now the file to build from. |
| 2026-09-17 | Homepage built from real Figma Make source | Pulled `App.tsx`, `routes.tsx`, `Header.tsx`, `Footer.tsx`, `Root.tsx`, `pages/Home.tsx`, `index.css`, and the logo SVG directly from Figma (not screenshots). Ported to Next.js App Router: `app/layout.tsx` (Header+Footer shell, Inter via next/font), `app/page.tsx` (homepage), `components/shared/Header.tsx` + `Footer.tsx` (site-wide chrome), `components/ui/OrangeBtn.tsx` (reused CTA), `components/home/*.tsx` (Label, Constellation, IntelligenceFlow, WorkCard, ProductCard, AudienceItem — homepage-specific, per the DRY/structure standard). Logo saved to `public/logo.svg`. |
| 2026-09-17 | `npm install` run successfully on your machine | 394 packages installed. Surfaced an `EBADENGINE` warning (`eslint-visitor-keys@5.0.1` wanting Node ≥20.19/22.13/24, you're on 20.17) and "5 vulnerabilities (4 high, 1 critical)" from `npm audit` — both from the eslint 8 devDependency chain, not from Next.js or app runtime code. Fixed the engine warning via a `package.json` `overrides` pin (see below); the same fix was mirrored into the `nextjs-base` template so future projects don't hit it. Run `npm audit fix` (no `--force`) next time you're in the project for the remaining audit items — non-forcing, so it won't introduce breaking changes. |
| 2026-09-17 | Dev server moved off port 3000 | You have another project already running on 3000, so `npm run dev` / `npm run start` now use `-p 3010` in this project's `package.json`. Template's default port is untouched (3000) since that conflict is specific to your machine right now, not a template-wide policy. |
| 2026-09-17 | All 5 remaining product pages + 10 ComingSoon routes built | Pulled `InsignAI.tsx`, `SegmentIQ.tsx`, `PersonaAI.tsx`, `ConceptAI.tsx`, `EnspeeK.tsx`, `ComingSoon.tsx` and `routes.tsx` directly from the Figma Make source (fileKey `jTfvSmGoAdC1U0W2VgPmjs`). All 16 site routes now exist. New shared components: `components/shared/Label.tsx`, `PlatformOrangeBtn.tsx`, `PlatformSecondaryBtn.tsx` (product-page CTA buttons — see fidelity note below), `FAQItem.tsx` (accordion, identical across all 5 product pages in the source), `ComingSoon.tsx`. Page-specific components under `components/insignai/`, `components/segmentiq/`, `components/personaai/`, `components/conceptai/`, `components/enspeek/`. Each product page has its own `export const metadata` via `buildMetadata()`, sourced from the Figma page's `<title>` text. All 29 new/changed `.tsx` files verified with an esbuild syntax check (no network access here to run a full `npm install`/`next build`) and every committed file's byte size re-checked against the source after write — all matched on the first check, no stale-write retries needed this round. |
| 2026-09-17 | Build verified locally, code pushed to GitHub | `npm run build` and `npm run dev` both run clean on your machine (port 3010). Repo created on the company org account and connected: `github.com/KE-Developers/InsightsCurry_Website`. Code pushed. |
| 2026-09-17 | Switched repo to personal account — org repo hit a Vercel Pro requirement | Importing `KE-Developers/InsightsCurry_Website` into Vercel as a Team required a Pro plan. Moved the remote to a new private repo on your personal account instead: `github.com/swarn-arora-insight/InsightsCurry_Website`. Pushed there, connected it in Vercel under your personal (Hobby) scope, deploy kicked off. |
| 2026-09-17 | First Vercel build failed — fixed a real bug in `lib/seo/metadata.ts` | Build crashed on `/_not-found` with `TypeError: Invalid URL, input: ''`. Root cause: `lib/seo/metadata.ts` used `process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"` — `??` only falls back on `undefined`/`null`, not on an empty string, and the Vercel env var was coming through blank. `new URL("")` then throws and takes the whole build down. Fixed by switching both `SITE_NAME` and `SITE_URL` to `||` instead of `??`, so a blank env var now falls back to the safe default instead of crashing. This is a real bug, not a design change — mirrored the identical fix into the `nextjs-base` template so future projects don't inherit it. Still worth double-checking `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_NAME` are actually set (non-blank) in Vercel's Project Settings → Environment Variables, for Production — the code fix stops the crash either way, but a blank value there means canonical URLs/Open Graph tags will point at `example.com` instead of the real site. |
| 2026-09-17 | Deployed — live preview | Pushed the metadata fix, Vercel rebuilt clean. Live at **https://insights-curry-website-sw-kappa.vercel.app/**. Going forward: you push changes after testing locally, mention it here, and I'll check the live preview URL to confirm what landed. |
| 2026-09-17 | Added `components/ui/SmartLink.tsx` to the `nextjs-base` template | We reimplemented the same mailto:/#-vs-`next/link` fix three separate times on this project (OrangeBtn, PlatformOrangeBtn/PlatformSecondaryBtn, Footer). Generalized it into a reusable `SmartLink` component in the template (also handles `tel:`) plus a README mention, so future projects get it for free instead of rediscovering the bug. Not backported into this project — its existing buttons already have the fix inline and work fine; no need to touch working code for it. |
| 2026-10-07 | Built `/contact-us` page + Resend-backed contact form | Not part of the Figma Make source — built fresh, fields matched to the old insightscurry.com/contact-us page (Name, Email, Company, Designation, Message, all required). `components/contact/ContactForm.tsx` (client component, invisible honeypot field instead of the old page's visible captcha) posts to `app/api/contact/route.ts`, which sends via the `resend` package. Added `resend` to `package.json` (needs `npm install` on your machine — no registry access from here). Added `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (defaults to `onboarding@resend.dev` until a domain is verified in Resend), and `CONTACT_TO_EMAIL` (blank — destination inbox still TBD) to `.env.example`. Repointed Header's "Contact" link and Footer's "Get in Touch" link from `mailto:` to `/contact-us` so the new page is actually reachable from nav — flagging this since it's a functional change, not just new content. Contact-info panel on the page (US/India addresses, phones, email) copied verbatim from the live old site — worth confirming still current before launch. `device_bash` is back working as of this session (the September 8 Windows-update issue is resolved). |

### Fidelity note: two different "OrangeBtn"s, on purpose

The Figma source defines `OrangeBtn` differently per page family:
- **Homepage + Footer**: has an arrow icon. Ported to
  `components/ui/OrangeBtn.tsx` — unchanged from the earlier homepage
  build.
- **InsignAI / SegmentIQ / PersonaAI / ConceptAI / EnspeeK**: no arrow
  icon — confirmed byte-identical across all five page sources. Ported to
  new `components/shared/PlatformOrangeBtn.tsx` + `PlatformSecondaryBtn.tsx`
  instead of reusing the homepage's version, specifically so the product
  pages don't pick up a visual element (the arrow) that isn't in their
  actual design — in keeping with the "replicate exactly, no adjustments"
  instruction.

### Known minor DRY deviation (tooling-limited, not a design issue)

`components/home/Label.tsx` and the new `components/shared/Label.tsx` are
byte-identical duplicates. Normally the homepage would just be pointed at
the shared one and the duplicate deleted, but `device_bash` (the tool that
can delete files on your machine) has been down all session — see below.
Doesn't affect how anything looks or works; worth a 30-second cleanup
(delete `components/home/Label.tsx`, repoint `app/page.tsx`'s import)
once `device_bash` is back, or just leave it, it's harmless either way.

### Deliberate (non-visual) fixes made during the port

These don't change how any page looks — they fix a functional bug that existed in the Figma Make source itself, where `mailto:hello@insightcurry.com` was passed to react-router's client-side `<Link>` (which would have tried to navigate to it as an internal route instead of opening mail). Fixed in `OrangeBtn`/`PlatformOrangeBtn`/`PlatformSecondaryBtn` and in `Footer`'s Contact links by rendering a plain `<a>` for `mailto:`/`#` hrefs instead of `Link`/`next/link`. `ComingSoon.tsx`'s own mailto: link was already a plain `<a>` in the source, so no fix was needed there. Flagging this rather than silently changing it, per the "no adjustment" instruction — shout if you'd rather it matched the source exactly, bug included.

### Next.js implementation choices worth knowing about

- Used plain `<img>` tags (not `next/image`) to stay closest to the source markup — no image-domain config needed, and it avoids introducing new behavior beyond what's in the design.
- Kept the Tailwind v3 + CSS-variable token setup already in the base template rather than switching to the source's Tailwind v4 syntax — the source's classes (`bg-orange-500`, `text-gray-900`, etc.) are Tailwind's own stock palette, so they work unchanged under v3 with no token remapping.
- Added Inter via `next/font/google` (self-hosted, no render-blocking Google Fonts `@import`) instead of the source's CSS `@import url(...)` — same font, same weights (300–800), better loading behavior.
- Dev/start scripts run on port **3010** (was 3000) — see checkpoint above.
- `package.json` has an `overrides` entry pinning `eslint-visitor-keys` to `^3.4.3` to silence the `EBADENGINE` warning from `npm install` — mirrored into the `nextjs-base` template.
- Each product page (`InsignAI`, `SegmentIQ`, `PersonaAI`, `ConceptAI`, `EnspeeK`) and each `ComingSoon` route has its own `export const metadata = buildMetadata({...})`, built from the Figma source's per-page `<title>` text — the homepage still relies on the site-wide default from `app/layout.tsx` (unchanged from the earlier build).

## Current Figma Make file (use this one)

https://www.figma.com/make/jTfvSmGoAdC1U0W2VgPmjs/Insight-Curry-Website?p=f&t=q8lIrp7QLnqnbGTb-0

fileKey: `jTfvSmGoAdC1U0W2VgPmjs`. Full generated source is readable via the
Figma MCP (`get_design_context`, `excludeScreenshot: true` returned resource
links straight away — no `get_design_context`-per-node walk needed).

Source tree (all now ported):

- `src/App.tsx`, `src/main.tsx`, `src/routes.tsx` — app shell + routing
- `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Root.tsx`
- `src/pages/Home.tsx`, `InsignAI.tsx`, `SegmentIQ.tsx`, `PersonaAI.tsx`, `ConceptAI.tsx`, `EnspeeK.tsx`, `ComingSoon.tsx` — all built
- `src/index.css`
- `src/imports/IC-Logo-Color__1_.svg` — real logo asset, in `public/logo.svg`
- `src/imports/*.docx` — source content docs per product (not yet reviewed independently of the page source — the page components already carry the copy)
- `src/imports/pasted_text/insightcurry-website-prompt.md` — the original prompt used to generate this Figma Make site, not yet reviewed
- Two image assets (hashed filenames) — pages currently use Unsplash stock photo URLs from the Figma source directly; swap for the real assets if you want those instead

Note: EnspeeK is a fifth product not in the original four-page design
review (Homepage, SegmentIQ, InsignAI, Custom Technology) — the review
should probably be extended to cover PersonaAI, ConceptAI and EnspeeK too.

## Build constraints

- **Figma fidelity**: when building pages from the Figma, replicate exactly
  — no adjustments or deviations from the design.

## Open items (not yet confirmed)

- Contract status — not logged here yet.
- Whether the design-review priority items (LLM→showstopper language,
  SegmentIQ stat validation, name/logo consistency) get resolved before or
  during launch.
- Hero/feature images on the product pages are still the Figma source's
  Unsplash stock placeholders (`images.unsplash.com/...`) — worth
  swapping for real product screenshots or brand photography before
  launch.
- Contact form (2026-10-08): working end to end locally. Resend key is on the account where insightscurry.com is verified; sends from support@insightscurry.com to nitika.rathore@knowledgeexcel.com. On the server, `.env.production` must be present (git-ignored) with `RESEND_API_KEY` set.
- npm audit (12 issues): the critical one is Next 14.x (about 23 advisories; only Next 16 is listed as fixed, which needs React 19). Decision pending on upgrading Next. The Tailwind/lint-tool ones (braces, micromatch, fast-glob, chokidar, glob) are build-time only; leave alone, do NOT run `npm audit fix --force`.
- Clean reinstall (`Remove-Item -Recurse -Force node_modules, package-lock.json` then `npm install`) was given to fix the stale nested `eslint-visitor-keys@5.0.1` warning; audit count dropped 13 to 12 afterwards.
- New Figma design: file `VNbsAkwBr5d6fVgd5arVgg` (readable now). Its "Component" page has IC_Logo and "Section 4" (Our Work tabs: Research Solutions / Custom Development / AI & Data Science; variants RS, CD, AI). Not built yet. The 23-screen prototype `shDZub7b5Ui9SBiicN1KK8` is a separate file (viewable in Chrome only; Figma connection refused it for view-only seat).
- Animation to replicate: location not yet given. No keyframe data in the new file; likely in the prototype. Waiting on Swarn for which element and where else it is needed.
- CTA information from Swarn: pending.
- Font: Neue Montreal (Regular, Medium, Bold used). Zip is in the project root (`Neue Montreal.zip`, 8 .otf files); not yet unzipped into `public/fonts/` or wired up. Both are git-ignored (licensed font).

## Checkpoint 2026-10-07 (part 2)

Done:
- Email centralised: `lib/site-config.ts` reads `NEXT_PUBLIC_CONTACT_EMAIL` (`support@insightscurry.com`); every mailto link and the contact page use it; the contact API route defaults its recipient to the same value. Added to `.env.example` and `.env.local`. Type-check clean; verified in the browser on localhost:3010.
- `.gitignore`: added `*.zip` and `public/fonts/` (licensed font).

Redesign build (new Figma file `VNbsAkwBr5d6fVgd5arVgg`, page "Website Flow", 25 frames: Home/About, 7 Product, 10 Solutions, 4 Blog/Event). Building page by page, Homepage first.
- Done (code, type-check clean, NOT yet seen in browser: dev server was stopped): Neue Montreal wired via next/font/local (`public/fonts/`, 3 weights, committed on purpose so Vercel can build; only the zip is git-ignored); brand colour tokens (heading, para, cta, insight-blue, navy, cyan, surface) in globals.css + tailwind.config.ts; `.text-gradient-orange/teal`; `components/ui/CtaButton.tsx` (pill CTA, arrow is a stand-in icon until Figma icon is exported); `lib/nav.ts` (one nav list for header+footer); new `Header.tsx` and `Footer.tsx` from the Figma frames.
- Assets: Figma asset links are blocked from the cloud and device VM, so images were saved via Chrome (a JSON pack in Downloads) and copied into `public/images/{home,work,blog,cta}` and `public/icons`. Original files remain in Downloads as `ic-*`. The hero "PNG" is really an animated GIF (844x844, 75 frames x 60 ms = 4.5 s loop, infinite) saved as `public/images/home/hero-diagram.gif`; Our Work / blog images are 1774x887 PNGs; connection image is 1254x1254.
- Homepage BUILT (2026-10-07): `app/page.tsx` + `components/home/{HeroSection,ConnectionSection,BringTogetherSection,OurWorkTabs,BuiltBySection,InsightsLabSection}.tsx`, `components/shared/CtaBand.tsx`, `components/ui/{Section,SectionHeading,CtaButton}.tsx`, `data/home.ts`, `data/blogs.ts`. Type-check clean. Section heights measured at 1728 px match the Figma frames (720/488/524/746/718/731/470; header 100, footer 355). Seen in browser and OK: header, hero, Bring Together, Our Work (Research tab), Connection band. NOT yet eyeballed: Our Work tab switching (CD / AI), Built By, Insights Lab, CTA band, footer, header dropdowns, mobile widths. `next lint` not run (timed out once).
- Old homepage components in `components/home/` (AudienceItem, Constellation, IntelligenceFlow, Label, ProductCard, WorkCard) are now unused; deleting needs delete permission, so left in place.
- NEXT: (1) replace the hero GIF with a coded, reusable animation component (config-driven so one fix covers every page; waiting on designer for the other locations); (2) pages in order: About Us, Product pages (7), Solutions (10), Blog / Blog Internal / Event; header links `/about-us`, `/blogs`, `/blogs/[slug]`, `/events` do not exist yet (404 until built).
- Assumptions to confirm: hero CTA scrolls to the "No Shortage of Data" band; "When these connect..." CTA scrolls to "Built by"; "Meet the Insights Curry products" goes to InsignAI (no products index page in Figma); "Request a demo" / "Start a conversation" still use the mailto link (await CTA info from Swarn).
- Homepage sections read from Figma (frame 129:1761): Header, Section 1 hero (diagram image + animation), Section 2 (No Shortage of Data), Section 3 (What we bring together), Section 4 (Our Work tabs, RS/CD/AI), Section 6 (Built by Insights Curry), Section 9 (Insights Lab, 3 blogs), CTA band, Footer. Not yet built.
- Design inconsistencies to confirm with designer: footer says "Customer Development" / "AI Search" while the header says "Custom Development" / "AI & Data Science"; Resources dropdown has no frame (header uses Blogs, Events; footer uses Blogs, Case Studies); header "Company" links to /about-us (page not built yet).

## How to use this file

Mention this project ("InsightCurry", "InsightsCurry", etc.) and expect a
status readout against this tracker rather than having to restate where
things stand. Say things like "I emailed the client" or "contract signed
[date]" and expect it logged here as a checkpoint.

## Hero animation (coded) — added this session
- `components/shared/ConnectionDiagram/` rebuilds the designer's hero GIF as live code: `config.ts` (cards, copy, colours, link points, timing as fractions of a 4.5 s loop), `animate.ts` (Web Animations: card fade-ins, dashed links drawing, travelling dots, AI-card orbit/glow, ambient twinkle, loop fade-out), `ConnectionDiagram.tsx` (renderer; sized with container-query units, pauses off-screen, static when `prefers-reduced-motion`).
- Reuse elsewhere: `<ConnectionDiagram config={...} />`; to change look/timing edit `config.ts` / `animate.ts` once and every page updates. Awaiting designer's other locations.
- `HeroSection.tsx` now uses it. `public/images/home/hero-diagram.gif` is no longer referenced (kept for reference; safe to delete). Avatars cropped from the GIF: `diagram-people.png`, `diagram-business.png` (replace with Figma originals if designer supplies them).
- Verified in a headless Chromium test render (frames match the GIF); still to eyeball in the live site.

## About Us page (`/about-us`) — built from a PNG export
- Figma MCP hit the Starter-plan call limit, so the page was built from the user's PNG export of frame 216:2310 (`Downloads/About Us.png`, 1728x4122). Layout/copy/colours come from the picture; fonts/spacing are approximate until checked against Figma when the limit resets.
- Files: `app/about-us/page.tsx`, `components/about/{AboutHero,BeliefSection,WhatWeBuildSection,TeamSection,WhySection,LifeSection,LifeGallery}.tsx`, `data/about.ts`, images in `public/images/about/`.
- Hero reuses `<ConnectionDiagram />` (second location of the animation).
- Placeholders to replace: team photos (`team-1..4.png`) and life photos (`life-1..3.png`) are crops from the export — get originals from Figma; `life-2/3` are partial crops. "Why InsightsCurry" video: no file supplied (`<WhySection videoSrc=... />`).
- Not yet checked in the browser (Chrome extension was offline). `app/sitemap.ts` is still the template (only `/`).

## Full redesign build — checkpoint 2026-10-07 (part 3)

All Figma "Website Flow" pages are now built in code (from the PNG exports + original rasters; Figma MCP limit reached). `tsc --noEmit` and `next lint` are clean; every route returns 200; no horizontal overflow at 390 and 1440 px; every internal link resolves; `app/sitemap.ts` lists all routes. NOT eyeballed in a browser by me except Home, About, InsignAI, PersonaAI hero (Chrome tab was hidden, screenshots time out) — please do a visual pass.

Routes: `/platforms/{insignai,personaai,segmentiq,enspeek,conceptai,talk-n-act}`, `/solutions/{research-services,custom-development,ai-services}`, `/solutions/ai-services/{ai-data-advisory,data-cloud-architecture,predictive-ai-ml,generative-ai-llms,agentic-ai-automation,production-ai-mlops}`, `/blogs`, `/blogs/[slug]` (3 slugs), `/events`.

Code layout: product kit `components/product/` (+ `components/product-extra/` for page-specific layouts), solutions `components/solutions/` (Sol* and AiSvc* prefixes), blog `components/blog/`, events `components/events/`. Copy lives in `data/products/*`, `data/solutions/*`, `data/blog-posts.ts`, `data/blogs.ts`, `data/events.ts`. All CTA targets come from `lib/cta-links.ts` (change once, applies everywhere).

Cleanup done: removed `tmp_pages/`, old design components (`components/{insignai,personaai,segmentiq,enspeek,conceptai}`), unused `ui/button`, `ComingSoon`, `FAQItem`, `PlatformOrangeBtn`, `PlatformSecondaryBtn`. `tmp_figma_images/` is git-ignored and can be deleted.

Needs the client / designer:
- Icons are generic stand-ins (`components/product/Icon.tsx`); export the Figma SVGs for exact glyphs.
- Cloud Architecture hero reuses the Predictive illustration (Figma does too); Concept AI story photo is a low-res crop (no original); Talk n Act architecture diagram image should be confirmed.
- Placeholder/duplicate copy in the designs: Research "What are you trying to solve" repeats one question; Research testimonial card is a placeholder (omitted); Talk n Act feature 04 repeats feature 02 bullets and has a duplicated heading; Enspeek "Research Analytics" text was clipped; Events 3 and 4 descriptions repeat event 1.
- Claims to validate: InsignAI stats, SegmentIQ 90%/80% claims, "weeks to minutes" claims, "no hallucinations", AI Opportunity Score formula, AI-to-Impact model, Concept "80% faster", GenAI privacy line, customer-story quotes ("Customer Success Story" unattributed).
- Naming: "InsightCurry" / "Insights Curry" / "Insightscurry" vary across the design; footer "Customer Development"/"AI Search" vs header "Custom Development"/"AI & Data Science".
- Content to supply: author/date/read time, case-study and event detail pages/URLs, real video (About "Why" section placeholder), "Meet the IC products" vs "All Products" CTA target.
- "Discover ..." hero buttons (PersonaAI, SegmentIQ, Concept, Enspeek, Talk n Act) link to that platform's case studies on /blogs (`CTA.caseStudiesFor`); Concept has no category, so it uses `?category=all`.

## Research Services hero animation (2026-10-08)
- `components/solutions/diagrams/`: `ResearchNetworkDiagram.tsx` (SVG, 1200x800 design space), `researchNetwork.config.ts` (nodes, lines, charts, timing), `researchNetwork.animate.ts` (motion), `spline.ts` (curves through points). Researcher photo cropped from the Figma picture: `public/images/solutions/research-services/researcher.webp`.
- Shared start/pause/reduced-motion logic is now `hooks/useLoopingAnimations.ts`, used by this diagram and by the home `ConnectionDiagram`.
- `SolHero` takes an optional `visual` prop that replaces the picture. To animate another solution page: copy the config + animate files, redraw nodes/lines from that page's hero picture, pass `visual={<YourDiagram />}`.

### Solution hero animations (2026-10-08)
- The 8 other solution pages (Custom Development, AI Services, AI & Data Advisory, Data & Cloud, Predictive AI, GenAI, Agentic, MLOps) keep their hero picture (3D illustrations cannot be redrawn) and get animation laid on top: `components/solutions/diagrams/HeroOverlay.tsx` + `heroOverlay.*` engine, one config per page in `diagrams/overlays/` (coordinates in picture pixels; helpers `relay`, `arrivalPulse`, `circlePts`).
- Data & Cloud and Predictive share the same picture, so they share `predictiveFlow.ts`.
- `ProductHero` gained an optional `visual` prop. Reduced motion shows the plain picture. To revert one page, remove its `visual=` prop.
- Checked in Chrome: dots sit on the drawn lines on all 8 pages; no horizontal overflow; tsc and lint clean.

### Platform hero animations (2026-10-08)
- All 6 platform pages (InsignAI, PersonaAI, Segment IQ, Enspeek, Concept AI, Talk n Act) now use `HeroOverlay` on their hero picture, configs in `components/solutions/diagrams/overlays/` (`insignAi`, `personaAi`, `segmentIq`, `enspeek`, `conceptAi`, `talkNAct`). Wired through the `visual` prop of `ProductHero`; the old `imageClassName="mix-blend-multiply"` on PersonaAI and Segment IQ was removed because `HeroOverlay` already blends the picture.
- Segment IQ's picture has no lines, so it animates as a sequence (AI answers, each segment pulses, its bar fills).
- tsc and lint clean; dots checked on the drawn lines in Chrome. To revert one page, remove its `visual=` line.

### Blog articles 2 and 3 (2026-10-08)
- Full text for `ai-customer-segmentation-explained` and `attitudinal-vs-behavioral-segmentation` added to `data/blog-posts.ts`, taken from the client's Google Doc "IC - Product Page Blogs - Case Studies" (SegmentIQ tab, Blog 2 and Blog 3). Each has intro, section headings, paragraphs and 7 FAQs. Article 2 now shows its full title (the listing card keeps the shortened design title).
- The doc's closing line for each blog ("Book a demo at (LINK) ...") is not used: the link is a placeholder, and the page already has the shared closing banner. Needs the real link and a decision from the client.
- No images, author, date or read time were supplied; heroes reuse the listing card pictures.
- The remaining tabs are covered in the next section.

### Blogs for every section (2026-10-08)
- Imported 21 more articles (3 each for Custom Technology, AI Solutions, PersonaAI, InsignAI, Enspeek, Research and TalkNAct) from the same Google Doc into `data/section-blogs.ts` (intro, headings, paragraphs, lists, FAQs). Listing cards and article pages are derived from it (`data/blogs.ts` builds the teasers, `data/blog-posts.ts` the posts); all 24 article URLs are in the sitemap and return 200.
- New "TalkNAct" filter tab (the client's doc has a TalkNAct section, the Figma tabs do not; its pill colour is a guess).
- Listing shows the first 3 blogs of a section; a "More blogs (n)" button reveals the rest in place (no section has more than 3 yet, so it appears only on the "all blogs" view). Home "Insights Lab" always shows 3. Article pages list same-section blogs first under "More Blogs".
- Copy cleanup done at import: closing "Book a demo ... (Link)" lines dropped (placeholders), "Other title options" lists dropped (AI Solutions blog 2 uses the title the doc places right after the options; blog 3 uses the first option), "Reading time: 7 minutes" kept as `readTime` where the doc had it.
- Still needed from the client: pictures per blog (the three design pictures are reused), author and date, real demo links, final titles for AI Solutions blog 2, and whether TalkNAct belongs in the blog filter.

### Case studies (2026-10-08)
- Imported all 16 case studies from the Google Doc (two per section: SegmentIQ, PersonaAI, Custom Technology, InsignAI, AI Solutions, Enspeek, TalkNAct, Research) into `data/case-study-content.ts`. The "another Option" tabs turned out to be a second, different story each, not alternative versions.
- New page `/case-studies/[slug]` (not in Figma, so it reuses the blog article layout plus a key-facts card with Category / Team / Question / Time / What changed). Layout needs client confirmation. All 16 pages are in the sitemap and return 200.
- The listing's "Read Our Case Studies" now follows the selected section tab (2 per section); with no tab selected it shows 4 and a "More case studies (n)" button reveals the rest. Cards link to the detail pages (they went to the contact page before).
- The AI Solutions case studies come in a different format in the doc (Challenge / Approach / Outcome, no Team or Question), so their facts card shows Industry / Service / Capabilities.
- Case study titles are the full titles from the doc; the old design cards used shortened ones ("From a spreadsheet no one trusted to a...").
- Needed from the client: one picture per case study (the four design pictures repeat), confirmation that the numbers in the stories are real or illustrative (the AI Solutions Vehicle Demand story says its figures are illustrative), and the real names/permissions if they want named clients.
