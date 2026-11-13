/**
 * Section title: 60/70 Bold with an optional gradient-highlighted word, as
 * used across the Figma pages ("Our Work", "Built by Insights Curry", ...).
 * `sub` renders the 24px Medium line under it.
 */
type Gradient = "orange" | "teal";

export function SectionHeading({
  children,
  highlight,
  gradient = "orange",
  sub,
  subClassName = "text-insight-blue",
  className = "",
  tone = "dark",
  joined = false,
}: {
  children?: React.ReactNode;
  highlight?: string;
  gradient?: Gradient;
  sub?: React.ReactNode;
  subClassName?: string;
  className?: string;
  tone?: "dark" | "light";
  /** true = highlight directly after the text with no space ("InsightsLab"). */
  joined?: boolean;
}) {
  const gradientClass = gradient === "orange" ? "text-gradient-orange" : "text-gradient-teal";
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <h2
        className={`text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px] ${
          tone === "light" ? "text-white" : "text-heading"
        }`}
      >
        {children}
        {highlight && (
          <>
            {children && !joined ? " " : ""}
            <span className={gradientClass}>{highlight}</span>
          </>
        )}
      </h2>
      {sub && <p className={`text-xl font-medium lg:text-2xl lg:leading-9 ${subClassName}`}>{sub}</p>}
    </div>
  );
}
