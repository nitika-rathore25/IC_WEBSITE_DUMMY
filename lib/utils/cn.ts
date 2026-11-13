import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicts (e.g.
 * "p-2 p-4" -> "p-4"). Use this instead of string-concatenating
 * className props, so a component's default classes and an override
 * passed in via props never fight each other.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
