import Image from "next/image";
import Link from "next/link";
import type { BlogTeaser } from "@/data/blogs";
import { ReadLink } from "./ReadLink";

/** Small blog card used in the "More Blogs" grid and the article's related posts. */
export function BlogCard({ blog }: { blog: BlogTeaser }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-para/25 bg-white"
    >
      <div className="relative aspect-[2/1] w-full">
        <Image
          src={blog.image}
          alt=""
          width={1774}
          height={887}
          sizes="(min-width: 1024px) 479px, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-medium leading-8 text-heading lg:text-2xl lg:leading-9">{blog.title}</h3>
        <p className="text-lg text-para lg:text-xl lg:leading-[30px]">{blog.excerpt}</p>
        <span className="mt-auto pt-0">
          <ReadLink>Read the full blog</ReadLink>
        </span>
      </div>
    </Link>
  );
}
