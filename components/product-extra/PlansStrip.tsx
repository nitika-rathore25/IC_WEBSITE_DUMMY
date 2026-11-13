import { PlanBand } from "./PlanBand";

/** Navy band: "Plans" title on the left, a row of outlined plan cards (name, divider, audience) on the right. */
export function PlansStrip({ title, plans }: { title: string; plans: { name: string; audience: string }[] }) {
  return <PlanBand layout="inline" title={title} tiers={plans.map((p) => ({ name: p.name, text: p.audience }))} />;
}
