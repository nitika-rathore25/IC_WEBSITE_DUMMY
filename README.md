# InsightCurry Website

Client project for InsightCurry, scaffolded from the shared `nextjs-base`
template (`C:\GitSource\Claude\templates\nextjs-base`). Follows the
`nextjs-dev-standards` skill for structure, DRY, theming, and SEO — see
`C:\GitSource\Claude\Skills\nextjs-dev-standards.md` for the full standard.

## What's here

- App Router, TypeScript, Tailwind CSS.
- Theme tokens in `app/globals.css` — swap in InsightCurry's real palette
  before building real pages.
- SEO wired in by default: `lib/seo/metadata.ts`, `app/sitemap.ts`,
  `app/robots.ts`.
- Placeholder homepage in `app/page.tsx` — replace with real content.

## Confirmed decisions

- **Hosting/deployment target**: own server (Node.js — `npm run build` then `npm run start`).
- **Data layer**: static/hardcoded content, no database or CMS.

## Reference

- Design review of the four pages analyzed so far (Homepage, SegmentIQ,
  InsignAI, Custom Technology): `C:\GitSource\Claude\Claude outputs\insightcurry-design-review.md`.
  Priority items from that review to resolve before/while building:
  1. Decide the InsignAI "Market Research LLM" language (currently
     contradicts the firm's own AI-in-the-middle positioning).
  2. Validate or soften the SegmentIQ 90%/80% stat claims.
  3. Pick one spelling of the company name (InsightCurry vs "INSIGHTS
     CURRY") and one logo lockup, and apply it everywhere.
  4. Decide if the "not X, we do Y" line pattern is a deliberate voice
     signature or should be varied.
  5. Longer-term: consider making the People-Data-AI-Technology-Business
     pentagon the throughline across all product pages, not just the
     homepage.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in real values once the
   data layer is confirmed.
3. This folder does not have git history yet — see note below.

## Git

This was written in via the device bridge while the local shell tool was
unavailable, so git wasn't initialized here. Run, once, from this folder:

```
git init
git add -A
git commit -m "Initial commit: InsightCurry site scaffolded from nextjs-base"
```
