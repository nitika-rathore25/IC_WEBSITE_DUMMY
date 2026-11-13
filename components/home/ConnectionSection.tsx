import Image from "next/image";
import { Section } from "@/components/ui/Section";

/** Homepage "There's No Shortage Of Data" band (Figma "Section 2"). */
export function ConnectionSection() {
  return (
    <Section id="connection" className="bg-navy xl:min-h-[488px]" py="py-12 lg:py-[57px]">
      {/* Decorative corner shape from the design */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/connection-shape.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6.5%] -top-[22%] hidden h-[72%] w-auto -rotate-[150deg] xl:block"
      />
      {/* Stacked until xl: side by side, the 748px image leaves too little room for the copy on tablets. */}
      <div className="relative flex flex-col items-center gap-10 xl:flex-row">
        <div className="relative aspect-[2/1] w-full max-w-[748px] mix-blend-lighten xl:w-1/2">
          <Image
            src="/images/home/connection-data.png"
            alt="Scattered data points connecting into one intelligence stream"
            fill
            sizes="(min-width: 768px) 748px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full max-w-[748px] flex-col gap-9 xl:max-w-[700px] xl:flex-1">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl md:leading-tight lg:text-[60px] lg:leading-[70px]">
              {"There’s No Shortage Of Data."}
            </h2>
            <p className="text-xl font-medium text-cyan lg:text-2xl lg:leading-9">
              {"There’s a shortage of connection."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg text-white lg:text-xl lg:leading-[30px]">
              {
                "Customer behaviour lives in one place. Business data in another. AI experiments somewhere else. Technology teams build one thing. Strategy teams ask for another. The opportunity is rarely hidden. It’s usually scattered."
              }
            </p>
            <p className="text-xl font-medium text-cyan lg:text-2xl lg:leading-9">
              We find the connections that change what happens next.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
