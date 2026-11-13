"use client";

import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs a set of Web Animations on an element and looks after them:
 * - does nothing if the browser has no Web Animations or the visitor prefers
 *   reduced motion (the element then shows its finished, static state);
 * - pauses while the element is off-screen or the tab is hidden;
 * - cancels everything on unmount.
 *
 * Shared by every animated diagram on the site, so the "start / pause /
 * clean up" rules live in one place.
 */
export function useLoopingAnimations<T extends Element>(
  ref: RefObject<T>,
  build: (root: T) => Animation[],
  deps: DependencyList,
) {
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root || typeof root.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anims = build(root);
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      anims.forEach((a) => (visible ? a.play() : a.pause()));
    });
    io.observe(root);
    const onVis = () => anims.forEach((a) => (document.hidden || !visible ? a.pause() : a.play()));
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      anims.forEach((a) => a.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
