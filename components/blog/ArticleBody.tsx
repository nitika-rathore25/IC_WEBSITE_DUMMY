import Image from "next/image";
import { Rich } from "@/components/product/Rich";
import type { ArticleBlock, ArticleImage } from "@/data/blog-posts";

const bodyText = "text-lg text-para lg:text-xl lg:leading-[30px]";
const frame = "overflow-hidden rounded-[32px]";

function Picture({ image, className = "", sizes }: { image: ArticleImage; className?: string; sizes: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={`w-full object-cover ${className}`}
    />
  );
}

/**
 * Renders a list of article blocks. Consecutive paragraphs sit 12px apart;
 * everything else (headings, images, columns) is 36px from its neighbours,
 * as in the Figma spacing.
 */
const isText = (b: ArticleBlock | undefined) => b?.type === "paragraph" || b?.type === "list";

function Blocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        const prev = blocks[i - 1];
        const gap = i === 0 ? "" : isText(prev) && isText(b) ? "mt-3" : "mt-6 lg:mt-9";
        switch (b.type) {
          case "heading":
            return (
              <h2
                key={i}
                className={`${gap} text-2xl font-medium leading-snug text-heading lg:text-[32px] lg:leading-[48px]`}
              >
                {b.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className={`${gap} ${bodyText}`}>
                <Rich>{b.text}</Rich>
              </p>
            );
          case "list": {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`${gap} ${bodyText} flex flex-col gap-2 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-cta`}
              >
                {b.items.map((it) => (
                  <li key={it}>
                    <Rich>{it}</Rich>
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <aside key={i} className={`${gap} rounded-3xl border border-cta/30 bg-cta/5 p-6`}>
                {b.title && <p className="mb-2 text-xl font-medium text-heading lg:text-2xl lg:leading-9">{b.title}</p>}
                <p className={bodyText}>
                  <Rich>{b.text}</Rich>
                </p>
              </aside>
            );
          case "image":
            return (
              <figure key={i} className={gap}>
                <div className={frame}>
                  <Picture image={b.image} sizes="(min-width: 1728px) 1488px, 100vw" />
                </div>
                {b.caption && <figcaption className="mt-3 text-base text-para">{b.caption}</figcaption>}
              </figure>
            );
          case "split": {
            const left = b.imageSide === "left";
            return (
              <div
                key={i}
                className={`${gap} grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,700px)] lg:gap-[68px]`}
              >
                <div className={left ? "lg:order-2" : ""}>
                  <Blocks blocks={b.blocks} />
                </div>
                <div className={`${frame} ${left ? "lg:order-1" : ""}`}>
                  <Picture image={b.image} className="aspect-[700/449]" sizes="(min-width: 1024px) 700px, 100vw" />
                </div>
              </div>
            );
          }
          case "columns":
            return (
              <div
                key={i}
                className={`${gap} grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,700px)] lg:gap-[68px]`}
              >
                {b.columns.map((col, ci) => (
                  <Blocks key={ci} blocks={col} />
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  // Long-form reading text stays left-aligned on phones (see .mobile-center in globals.css).
  return (
    <div className="mobile-center-off">
      <Blocks blocks={blocks} />
    </div>
  );
}
