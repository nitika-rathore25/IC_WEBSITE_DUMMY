/**
 * Single source of truth for the site's public origin. Canonicals, Open
 * Graph, JSON-LD, robots.txt and the sitemap all read from here.
 *
 * `||` on purpose, not `??` — an env var that's set but left blank (empty
 * string) still needs to fall through to the default. `??` only catches
 * undefined/null, not "", and `new URL("")` throws, taking the whole build
 * down with it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
).replace(/\/+$/, "");

