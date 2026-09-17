import Link from "next/link";
import { Calendar, Clock, Newspaper } from "lucide-react";
import { getEdition } from "@/lib/editions";
import { todayKey } from "@/lib/types";
import { MobileShell } from "@/components/MobileShell";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const date = todayKey();
  const edition = await getEdition(date);

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col pb-28">
        <header className="px-5 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-neutral-400">
            Daily digest
          </p>
          <h1 className="mt-1 text-[28px] font-bold tracking-tight text-black">
            Today’s Top 10
          </h1>
          <p className="mt-1 text-[14px] text-neutral-500">
            {edition.label} · exactly 10 stories from many sources
          </p>
        </header>

        <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {edition.articles.map((article) => (
            <Link
              key={article.id}
              href={`/day/${edition.date}/${article.rank}`}
              className="flex gap-3 rounded-2xl px-3 py-3.5 transition-colors active:bg-neutral-100"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[13px] font-bold text-black">
                {article.rank}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold leading-snug tracking-tight text-black">
                  {article.title}
                </h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <Newspaper className="h-3.5 w-3.5" strokeWidth={2} />
                    {article.source}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                    {article.readMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                    #{article.rank} of 10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
