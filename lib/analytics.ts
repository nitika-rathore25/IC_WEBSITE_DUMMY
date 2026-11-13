/**
 * Google Analytics 4. The Measurement ID comes from NEXT_PUBLIC_GA_ID in
 * .env.local / .env.production — leave it empty to turn analytics off.
 * Only loaded in production builds, so local testing doesn't add fake
 * traffic to the reports.
 */
export const GA_ID =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GA_ID || ""
    : "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event; does nothing when analytics is off. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.("event", name, params);
}
