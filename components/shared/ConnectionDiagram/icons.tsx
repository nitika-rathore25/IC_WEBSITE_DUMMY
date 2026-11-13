/** Small inline icons used by the connection diagram. */

export function BarsIcon({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 42 46" style={{ width: size, height: size }} fill="none" aria-hidden>
      <rect x="0" y="32" width="6" height="12" rx="1.5" fill="#12b886" opacity=".55" />
      <rect x="9" y="26" width="6" height="18" rx="1.5" fill="#12b886" opacity=".7" />
      <rect x="18" y="19" width="6" height="25" rx="1.5" fill="#12b886" opacity=".85" />
      <rect x="27" y="11" width="6" height="33" rx="1.5" fill="#12b886" />
      <rect x="36" y="0" width="6" height="44" rx="1.5" fill="#12b886" />
    </svg>
  );
}

export function MonitorIcon({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} fill="none" stroke="#5b3df5" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="6" width="40" height="28" rx="4" />
      <path d="M24 34v7M17 41h14" />
    </svg>
  );
}

export function StarIcon({ size, color }: { size: string; color: string }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M24 5c1.6 10.6 8.4 17.4 19 19-10.6 1.6-17.4 8.4-19 19-1.6-10.6-8.4-17.4-19-19 10.6-1.6 17.4-8.4 19-19Z" />
    </svg>
  );
}
