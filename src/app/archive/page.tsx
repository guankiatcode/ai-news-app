import Link from "next/link";
import { listEditionDates } from "@/lib/editions";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const days = await listEditionDates();

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col pb-28">
        <TopBar label="Archive" backHref="/" />

        <div className="px-5 pb-2">
          <h1 className="text-[28px] font-bold tracking-tight text-black">
            Past days
          </h1>
          <p className="mt-1 text-[14px] text-neutral-500">
            Each day keeps exactly 10 stories. Nothing piles up.
          </p>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {days.map((day) => (
            <Link
              key={day.date}
              href={`/day/${day.date}`}
              className="flex items-center justify-between rounded-2xl px-3 py-4 transition-colors active:bg-neutral-100"
            >
              <div>
                <h2 className="text-[17px] font-semibold text-black">
                  {day.label}
                </h2>
                <p className="mt-1 text-[13px] text-neutral-500">
                  Top {day.count} edition
                </p>
              </div>
              <span className="text-[13px] font-medium text-neutral-400">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
