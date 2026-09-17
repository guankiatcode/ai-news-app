import Link from "next/link";
import { ChevronLeft, MoreVertical } from "lucide-react";

type TopBarProps = {
  label: string;
  backHref?: string;
};

export function TopBar({ label, backHref = "/" }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <Link
        href={backHref}
        className="flex items-center gap-0.5 text-[17px] font-medium text-black"
      >
        <ChevronLeft className="h-6 w-6 -ml-1" strokeWidth={2} />
        <span>{label}</span>
      </Link>
      <button
        type="button"
        aria-label="More options"
        className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500"
      >
        <MoreVertical className="h-5 w-5" strokeWidth={2} />
      </button>
    </header>
  );
}
