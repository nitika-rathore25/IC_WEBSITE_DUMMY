import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LifeGallery } from "@/components/about/LifeGallery";
import { lifePhotos } from "@/data/about";

export function LifeSection() {
  return (
    <Section className="bg-white" py="py-12 lg:py-[60px]">
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeading>Life at Insights Curry</SectionHeading>
          <p className="max-w-[1160px] text-lg text-para lg:text-xl lg:leading-[30px]">
            At Insights Curry, we&apos;re a young, passionate team driven by innovation, bold ideas, and meaningful
            impact. We turn challenges into creative solutions, keep learning, and celebrate every win together. With
            a culture of collaboration, growth, and fun, we&apos;re here to create what&apos;s next.
          </p>
        </div>
      </div>
      {/* Full-bleed gallery: break out of the 120px side padding like the design */}
      <div className="-mx-6 mt-9 md:-mx-12 xl:-mx-[120px]">
        <LifeGallery photos={lifePhotos} />
      </div>
    </Section>
  );
}
