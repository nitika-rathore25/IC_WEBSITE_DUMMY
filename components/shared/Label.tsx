/**
 * Small uppercase eyebrow label used above section headings on the
 * product pages (InsignAI, SegmentIQ, PersonaAI, ConceptAI, EnspeeK) and
 * the contact page.
 */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">
      {children}
    </p>
  );
}
