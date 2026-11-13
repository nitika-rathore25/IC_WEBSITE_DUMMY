import { GA_ID } from "@/lib/analytics";

/**
 * GA4 tag, rendered as plain <script> tags in <head> (not next/script) so
 * the tracking code is in the page's HTML. Search Console's "Google
 * Analytics" verification method looks for it there, which lets any GA
 * admin verify the site without a DNS record or code change.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`,
        }}
      />
    </>
  );
}
