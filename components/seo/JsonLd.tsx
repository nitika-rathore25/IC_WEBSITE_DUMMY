/**
 * Renders schema.org structured data (see lib/seo/schema.ts) as one
 * <script type="application/ld+json">. Several entities go out as a single
 * @graph. Invisible on the page; read by search and AI engines only.
 */
export function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  const json = { "@context": "https://schema.org", "@graph": data };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so text inside the data can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
