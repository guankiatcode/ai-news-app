import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Newspaper } from "lucide-react";
import { getEdition } from "@/lib/editions";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ date: string }>;
};

export default async function DayListPage({ params }: PageProps) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const edition = await getEdition(date);

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col pb-28">
        <TopBar label="Archive" backHref="/archive" />

        <div className="px-5 pb-2">
          <h1 className="text-[28px] font-bold tracking-tight text-black">
            {edition.label}
          </h1>
          <p className="mt-1 text-[14px] text-neutral-500">
            Exactly {edition.articles.length} stories for this day
          </p>
        </div>

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
                <div className="mt-1.5 flex flex-wrap gap-3 text-[12px] text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <Newspaper className="h-3.5 w-3.5" strokeWidth={2} />
                    {article.source}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                    {article.readMinutes} min
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
