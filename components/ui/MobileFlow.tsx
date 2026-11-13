/**
 * Phone layout for the arrow flows (chip rows joined by →). Below md the
 * horizontal rows wrap unevenly and leave arrows dangling, so each flow
 * renders this instead: one step per row, centred, a down arrow between
 * steps. `loop` adds a closing "back to <first step>" marker for cycles.
 * The desktop row stays in each component behind `hidden md:flex`.
 */
export function MobileFlow({
  steps,
  chipClass,
  loop = false,
  className = "",
}: {
  steps: string[];
  /** The component's own chip styling, so phone and desktop chips match. */
  chipClass: string;
  loop?: boolean;
  className?: string;
}) {
  return (
    <ol className={`flex w-full flex-col items-center md:hidden ${className}`}>
      {steps.map((s, i) => (
        <li key={s} className="flex w-full flex-col items-center">
          <span className={`w-full max-w-[280px] text-center ${chipClass}`}>{s}</span>
          {(i < steps.length - 1 || loop) && <DownArrow />}
        </li>
      ))}
      {loop && (
        <li className="flex items-center gap-2 text-base font-medium text-cta">
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          Back to {steps[0]}
        </li>
      )}
    </ol>
  );
}

function DownArrow() {
  return (
    <svg className="my-2 shrink-0 text-cta" width="10" height="24" viewBox="0 0 10 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 1v21M1 18l4 4 4-4" />
    </svg>
  );
}
