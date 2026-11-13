/**
 * Page section wrapper for the redesign: full-width background, content
 * centred at the Figma 1728px frame with 120px side padding on desktop.
 * Pass `className="lg:min-h-[..]"` to match a Figma frame's fixed height.
 */
export function Section({
  children,
  className = "",
  innerClassName = "",
  py = "py-12 lg:py-[60px]",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Vertical padding classes. Override (e.g. "py-12 lg:py-0") instead of adding a clashing py-* class. */
  py?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div
        className={`mx-auto max-w-[1728px] px-6 md:px-12 xl:px-[120px] ${py} ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
