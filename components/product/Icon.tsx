/**
 * Small stroke-icon set for product / solution pages (24x24 grid, Lucide-style).
 * Add a new entry to `paths` rather than inlining SVGs in pages. These stand in
 * for the designer's tiny capability icons — swap an entry for the exact Figma
 * SVG if pixel-exact icons are needed.
 */
const paths: Record<string, string> = {
  shield: "M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z",
  "check-circle": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 3 3 5-6",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  layers: "m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5",
  chart: "M5 20V10M12 20V4M19 20v-7",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  users: "M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0",
  brain: "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1V5a2 2 0 0 1 3-1Z",
  route: "M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 8v4a4 4 0 0 0 4 4h6",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h6",
  message: "M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9Z",
  cloud: "M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9H7Z",
  database: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm8-3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5m16 7c0 1.7-3.6 3-8 3s-8-1.3-8-3",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.5-2-3.5-2.3.9a7.600 7.600 0 0 0-2-1.2L14.600 3h-4l-.4 2.500a7.600 7.600 0 0 0-2 1.200l-2.300-.9-2 3.500 2 1.500a7.400 7.400 0 0 0 0 2.400l-2 1.500 2 3.500 2.300-.9a7.600 7.600 0 0 0 2 1.200l.4 2.500h4l.4-2.500a7.600 7.600 0 0 0 2-1.200l2.300.9 2-3.500-2-1.500c.1-.4.1-.8.1-1.200Z",
  sparkles: "M12 3c.8 4.600 2.400 6.200 7 7-4.600.8-6.200 2.400-7 7-.8-4.600-2.400-6.200-7-7 4.600-.8 6.200-2.400 7-7Zm7 12c.3 1.700.8 2.200 2.500 2.500-1.700.3-2.200.8-2.500 2.500-.3-1.700-.8-2.200-2.500-2.500 1.700-.3 2.200-.8 2.500-2.500Z",
  bulb: "M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.500 10.900c.6.5 1 1.200 1 2.100h5c0-.9.400-1.600 1-2.100A6 6 0 0 0 12 3Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.500 2.700 3.800 5.700 3.800 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3Z",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0V7a4 4 0 0 1 8 0v4",
  refresh: "M20 11a8 8 0 0 0-14.500-3.500L4 9m0-5v5h5M4 13a8 8 0 0 0 14.500 3.500L20 15m0 5v-5h-5",
  grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  play: "M7 4v16l13-8L7 4Z",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16",
  cube: "m12 3 8 4.500v9L12 21l-8-4.500v-9L12 3Zm0 9 8-4.500M12 12v9M12 12 4 7.500",
  flow: "M5 5h5v4H5V5Zm9 10h5v4h-5v-4ZM10 7h2a3 3 0 0 1 3 3v5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.500-12.500-2 5-5 2 2-5 5-2Z",
  trending: "m3 17 6-6 4 4 8-8m0 0h-5m5 0v5",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 1 8 6 8-6",
  chevron: "m9 6 6 6-6 6",
  link: "M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1",
  pie: "M12 3v9h9a9 9 0 1 1-9-9Zm4 0a9 9 0 0 1 5 5h-5V3Z",
  briefcase: "M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm5 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18M11 13v2h2v-2",
  "list-check": "M4 7h9M4 12h9M4 17h6m6-1 2 2 4-4",
  server: "M5 4h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 10h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm3-7h.01M8 17h.01",
  "alert-diamond": "M12 3 21 12l-9 9-9-9 9-9Zm0 5v5m0 3h.01",
  burst: "m12 3 2 4 4-1-1 4 4 2-4 2 1 4-4-1-2 4-2-4-4 1 1-4-4-2 4-2-1-4 4 1 2-4Z",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-12v3m0 12v3M3 12h3m12 0h3M5.600 5.600l2.100 2.100m8.600 8.600 2.100 2.100m0-12.800-2.100 2.100M7.700 16.300l-2.100 2.100",
};

/**
 * Icons exported from Figma live in /public/icons/<page>/ and are referenced by
 * path ("/icons/enspeek/f1-natural-language.svg"). Those files already carry the
 * design's tile (background, radius and colour), so callers render them as-is via
 * <IconAsset> instead of wrapping them in their own tile.
 */
export const isIconAsset = (name: string) => name.startsWith("/");

export function IconAsset({ src, size, className = "" }: { src: string; size: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden="true" width={size} height={size} className={`shrink-0 ${className}`} />;
}

export function Icon({ name, size = 20, className = "", strokeWidth = 1.7 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  if (isIconAsset(name)) return <IconAsset src={name} size={size} className={className} />;
  const d = paths[name] ?? paths.sparkles;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const iconNames = Object.keys(paths);
