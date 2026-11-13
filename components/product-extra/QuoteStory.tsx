import { StoryPanel } from "./StoryPanel";

/**
 * "Customer Story" with a pull quote: title on the left; on the right the Figma 748x330 panel where the
 * photo fades into the quote and an orange attribution line (same panel as StoryPanel).
 */
export function QuoteStory({
  eyebrow = "Customer Story",
  title,
  image,
  quote,
  attribution,
}: {
  eyebrow?: string;
  title: string;
  image: { src: string; alt: string; panel?: string };
  quote: string;
  attribution: string;
}) {
  return <StoryPanel eyebrow={eyebrow} title={title} image={image.src} panelImage={image.panel} quote={{ text: quote, attribution }} panelHeight="lg:h-[330px]" />;
}
