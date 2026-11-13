/**
 * Old insightscurry.com URLs (the previous site) that Google still has
 * indexed, sent to the closest page on this site with a permanent redirect
 * so their search ranking carries over instead of ending in a 404.
 * List taken from the Wayback Machine and Google's index, October 2026.
 * Only paths that don't exist on this site are listed, so no live page is affected.
 */
const legacyRedirects = [
  // Home and company
  ["/index.html", "/"],
  ["/insightscurry.html", "/"],
  ["/company", "/about-us"],
  ["/our-belief.html", "/about-us"],
  ["/contactus.html", "/contact-us"],
  ["/contactDb.html", "/contact-us"],
  ["/sign-up", "/contact-us"],
  // Policy pages: no equivalent on this site yet
  ["/privacy-policy", "/"],
  ["/privacy-policy.html", "/"],
  ["/disclaimer.html", "/"],
  ["/refund-policy.html", "/"],
  ["/term-and-condition.html", "/"],
  // Products and services
  ["/insign-ai", "/platforms/insignai"],
  ["/conversationalAI", "/platforms/enspeek"],
  ["/video-and-text", "/solutions/ai-services"],
  ["/data-box", "/solutions/research-services"],
  ["/optiminer", "/solutions/research-services"],
  ["/maxdiff-optiminer.html", "/solutions/research-services"],
  ["/maxdiff-solutions.html", "/solutions/research-services"],
  ["/conjoint-applications.html", "/solutions/research-services"],
  ["/idea-evaluation.html", "/solutions/research-services"],
  ["/customer-engagement.html", "/platforms/enspeek"],
  ["/customize-development", "/solutions/custom-development"],
  ["/idea-to-platform", "/solutions/custom-development"],
  ["/gen-ai", "/solutions/ai-services/generative-ai-llms"],
  ["/data-science", "/solutions/ai-services"],
  // Blogs and case studies: old articles don't exist here, so send them to the listing;
  // case-study URLs land on its case studies section rather than the blogs at the top.
  ["/blog", "/blogs"],
  ["/blog/:path*", "/blogs"],
  ["/case-studies", "/blogs#case-studies"],
  ["/case", "/blogs#case-studies"],
  ["/case/:path*", "/blogs#case-studies"],
  // Press release pages moved from /pr and /press-releases to /media
  ["/pr", "/media"],
  ["/pr/:slug", "/media/:slug"],
  ["/press-releases", "/media"],
  ["/press-releases/:slug", "/media/:slug"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // One address for search engines: www.insightscurry.com/anything → insightscurry.com/anything.
      // Listed first so an old www URL goes straight to the bare domain, then on to its new page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.insightscurry.com" }],
        destination: "https://insightscurry.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
