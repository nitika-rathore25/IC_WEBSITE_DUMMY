import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/data/about";

/**
 * One leader card, as on insightscurry.com/company: the photo fills the card with a
 * see-through blue bar holding name and role. On hover (or keyboard focus) the bar
 * grows to cover the photo and adds the short bio and a "Know More" button.
 */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/about-us/team/${member.slug}`}
      aria-label={`${member.name}, ${member.role}: know more`}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 100vw"
        className="object-cover object-[50%_18%] transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-[68px] flex-col justify-center overflow-hidden rounded-2xl bg-insight-blue/75 px-4 lg:h-[72px] lg:px-5 text-white backdrop-blur-[2px] transition-[height] duration-300 ease-in-out group-hover:h-full group-focus-visible:h-full">
        <h3 className="text-xl font-semibold leading-7">{member.name}</h3>
        <p className="text-sm leading-5 lg:text-base lg:leading-6">{member.role}</p>
        {/* Revealed with the full-height overlay. */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <p className="mt-3 line-clamp-4 text-base leading-6 text-white/90">{member.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-base font-semibold text-insight-blue transition-colors group-hover:bg-[#e6eefb]">
              Know More
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
