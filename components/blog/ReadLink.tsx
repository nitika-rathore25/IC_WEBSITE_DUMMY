/** Orange "Read the full blog" label with the soft round arrow badge (visual only; wrap in a link). */
export function ReadLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-lg font-medium text-cta lg:text-2xl lg:leading-9">
      {children}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta/10 transition group-hover:bg-cta/20">
        <svg className="h-6 w-6" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
          <path d="M19.175 16H7V14H19.175L13.575 8.4L15 7L23 15L15 23L13.575 21.6L19.175 16Z" />
        </svg>
      </span>
    </span>
  );
}
