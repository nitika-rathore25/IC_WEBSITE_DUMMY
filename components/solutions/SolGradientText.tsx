export type SolTone = "purple" | "violet" | "ocean" | "aqua" | "fuchsia" | "blue" | "teal" | "magenta" | "orange";

const tones: Record<SolTone, string> = {
  purple: "bg-gradient-to-r from-[#7a2cf0] to-[#b23cf2]",
  violet: "bg-gradient-to-b from-[#aa33f9] to-[#862af9]",
  // Lower half of the teal gradient, as on the AI Services hero.
  ocean: "bg-gradient-to-b from-[#2890ba] to-[#3c48b7]",
  // Upper half of the teal gradient ("Proprietary Framework:" on AI Services).
  aqua: "bg-gradient-to-b from-[#13d8bd] to-[#2890ba]",
  // "Six Capabilities." on AI Services.
  fuchsia: "bg-gradient-to-b from-[#f746fc] to-[#7d29f9]",
  blue: "bg-gradient-to-r from-[#2062ad] to-[#4a45c8]",
  magenta: "bg-gradient-to-r from-[#a83cf0] to-[#e23fd0]",
  teal: "bg-gradient-to-b from-[#13d8bd] to-[#3c48b7]",
  orange: "bg-gradient-to-b from-[#ffd33d] to-[#fd6446]",
};

/** Heading highlight: gradient-filled text, as in the Figma solution pages. */
export function SolGradientText({ tone = "purple", className = "", children }: { tone?: SolTone; className?: string; children: React.ReactNode }) {
  return <span className={`${tones[tone]} bg-clip-text text-transparent ${className}`}>{children}</span>;
}

/**
 * Standard 60/70 section title with an optional gradient lead
 * ("Six Capabilities." + " One connected AI journey."). `leadBlock` puts the
 * lead on its own line.
 */
export function SolTitle({
  lead,
  tone = "purple",
  leadBlock = false,
  children,
  as: Tag = "h2",
  tone2 = "dark",
  className = "",
}: {
  lead?: string;
  tone?: SolTone;
  leadBlock?: boolean;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  tone2?: "dark" | "light";
  className?: string;
}) {
  return (
    <Tag className={`text-4xl font-bold leading-tight lg:text-[60px] lg:leading-[70px] ${tone2 === "light" ? "text-white" : "text-heading"} ${className}`}>
      {lead && <SolGradientText tone={tone} className={leadBlock ? "block w-fit" : ""}>{lead}</SolGradientText>}
      {lead && children && !leadBlock && " "}
      {children}
    </Tag>
  );
}
