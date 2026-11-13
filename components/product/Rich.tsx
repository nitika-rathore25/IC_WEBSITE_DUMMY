import { Fragment } from "react";

/** Renders a string where **double-asterisk** segments become <strong>. */
export function Rich({ children, boldClass = "font-medium text-heading" }: { children: string; boldClass?: string }) {
  const parts = children.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className={boldClass}>{p}</strong> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}
