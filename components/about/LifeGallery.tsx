"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

/**
 * Centre-focus photo strip: the active photo is large, neighbours are smaller
 * and faded and run off the edge of the screen. Advances every few seconds,
 * pauses on hover, and stays still for reduced-motion users.
 */
export function LifeGallery({ photos, startIndex = 1, interval = 4500 }: { photos: Photo[]; startIndex?: number; interval?: number }) {
  const [active, setActive] = useState(startIndex);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % photos.length), interval);
    return () => window.clearInterval(id);
  }, [paused, photos.length, interval]);

  // Slide width + gap drive the centring maths.
  const W = "min(853px, 78vw)";
  const GAP = "48px";

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ul
        className="relative left-1/2 flex w-max items-center transition-transform duration-700 ease-in-out"
        style={{
          gap: GAP,
          transform: `translateX(calc(-1 * ${W} / 2 - ${active} * (${W} + ${GAP})))`,
        }}
      >
        {photos.map((p, i) => (
          <li
            key={p.src}
            className={`relative aspect-[853/480] shrink-0 overflow-hidden rounded-3xl transition-all duration-700 ${
              i === active ? "scale-100 opacity-100" : "scale-[0.75] opacity-50"
            }`}
            style={{ width: W }}
            aria-hidden={i !== active}
          >
            <Image src={p.src} alt={p.alt} fill sizes="853px" className="object-cover" />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Photo gallery">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-insight-blue" : "w-2 bg-para/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
