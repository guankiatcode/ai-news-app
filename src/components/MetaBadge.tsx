import type { LucideIcon } from "lucide-react";

type MetaBadgeProps = {
  icon: LucideIcon;
  label: string;
};

export function MetaBadge({ icon: Icon, label }: MetaBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F0F0F0] px-2.5 py-1.5 text-[12px] font-medium leading-none text-neutral-700">
      <Icon className="h-3.5 w-3.5 shrink-0 text-neutral-600" strokeWidth={2} />
      {label}
    </span>
  );
}
