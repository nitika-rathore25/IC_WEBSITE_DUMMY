/** Centered section heading block: orange eyebrow, 60/70 title, blue sub line. */
export function SectionTitle({
  eyebrow,
  title,
  sub,
  tone = "dark",
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}>
      {eyebrow && <p className="text-xl font-medium text-cta lg:text-2xl lg:leading-9">{eyebrow}</p>}
      <h2 className={`text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px] ${tone === "light" ? "text-white" : "text-heading"}`}>{title}</h2>
      {sub && <p className={`text-xl font-medium lg:text-2xl lg:leading-9 ${tone === "light" ? "text-white" : "text-insight-blue"}`}>{sub}</p>}
    </div>
  );
}
