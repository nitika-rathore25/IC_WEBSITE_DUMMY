import { Rich } from "@/components/product/Rich";

/** Rounded blue-outlined call-out box: blue title over a muted paragraph. */
export function Callout({ title, body, className = "" }: { title: string; body: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 rounded-[24px] border border-insight-blue bg-[#e9eff7] p-5 lg:p-6 ${className}`}>
      <p className="text-xl font-medium text-insight-blue lg:text-2xl lg:leading-9">{title}</p>
      <p className="text-lg text-para lg:text-xl lg:leading-[30px]"><Rich>{body}</Rich></p>
    </div>
  );
}
