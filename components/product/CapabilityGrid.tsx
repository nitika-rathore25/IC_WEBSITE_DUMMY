import { Icon, IconAsset, isIconAsset } from "./Icon";

export interface CapabilityItem {
  icon: string;
  title: string;
  body?: string;
}

/**
 * Feature cards beside the copy on the product pages (FeatureBlock / FeatureSplit).
 * Text stays at a readable size; the grid changes column count instead: 1 on phones,
 * 2 from 640px, and 3 (`cols={3}`) only from 1600px, where the side column is wide enough.
 */
export function CapabilityGrid({ items, cols = 3 }: { items: CapabilityItem[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 ${cols === 3 ? "min-[1600px]:grid-cols-3" : ""}`}>
      {items.map((c) => (
        <li
          key={c.title}
          className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-para/15 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-insight-blue/30 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
        >
          {/* Thin brand line along the top edge, drawn in on hover. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-insight-blue to-cta transition-transform duration-300 group-hover:scale-x-100"
          />
          {/* Figma icon files carry their own tinted tile; plain icon names get one here. */}
          {isIconAsset(c.icon) ? (
            <IconAsset src={c.icon} size={36} className="h-9 w-9 max-md:self-center" />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-insight-blue/10 text-insight-blue max-md:self-center">
              <Icon name={c.icon} size={20} />
            </span>
          )}
          <h3 className="text-lg font-semibold leading-snug text-heading">{c.title}</h3>
          {c.body && <p className="text-base leading-6 text-para">{c.body}</p>}
        </li>
      ))}
    </ul>
  );
}
