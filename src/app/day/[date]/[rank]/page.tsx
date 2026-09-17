import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Newspaper, Timer } from "lucide-react";
import { getArticle } from "@/lib/editions";
import { articleCopyText, formatDayLabel } from "@/lib/types";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { MetaBadge } from "@/components/MetaBadge";
import { CopyButton } from "@/components/CopyButton";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ date: string; rank: string }>;
};

export default async function ArticlePage({ params }: PageProps) {
  const { date, rank: rankStr } = await params;
  const rank = Number(rankStr);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isInteger(rank) || rank < 1 || rank > 10) {
    notFound();
  }

  const result = await getArticle(date, rank);
  if (!result) notFound();

  const { edition, article } = result;
  const prev = edition.articles.find((a) => a.rank === rank - 1);
  const next = edition.articles.find((a) => a.rank === rank + 1);
  const publishedLabel = formatDayLabel(article.publishedAt.slice(0, 10));

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col pb-28">
        <TopBar label="Article" backHref="/" />

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <p className="text-[13px] font-medium text-neutral-400">
            #{article.rank} of 10 · {edition.label}
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.15] tracking-tight text-black">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <MetaBadge icon={Calendar} label={publishedLabel} />
            <MetaBadge icon={Newspaper} label={article.source} />
            <MetaBadge
              icon={Timer}
              label={`${article.readMinutes} min read`}
            />
            <MetaBadge icon={Clock} label={`Rank ${article.rank}/10`} />
          </div>

          <div className="mt-6 border-t border-neutral-200" />

          <div className="mt-5 flex items-center justify-between">
            <h2 className="text-[20px] font-bold tracking-tight text-black">
              Summary
            </h2>
            <CopyButton text={articleCopyText(article)} />
          </div>

          <h3 className="mt-4 text-[15px] font-semibold text-black">
            {article.summaryTitle}
          </h3>

          <ul className="mt-3 space-y-3">
            {article.summary.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14px] leading-[1.55] text-neutral-500"
              >
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-[15px] font-semibold text-black">
            Key Points:
          </h3>
          <ul className="mt-3 space-y-2.5">
            {article.keyPoints.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14px] leading-[1.55] text-neutral-500"
              >
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {article.whyItMatters ? (
            <>
              <h3 className="mt-8 text-[15px] font-semibold text-black">
                Why it matters
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-neutral-500">
                {article.whyItMatters}
              </p>
            </>
          ) : null}

          {article.url ? (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex text-[14px] font-medium text-black underline underline-offset-4"
            >
              Open original article ↗
            </a>
          ) : null}

          <div className="mt-10 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                href={`/day/${date}/${prev.rank}`}
                className="rounded-full bg-neutral-100 px-4 py-2 text-[13px] font-medium text-black"
              >
                ← #{prev.rank}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/day/${date}/${next.rank}`}
                className="rounded-full bg-black px-4 py-2 text-[13px] font-medium text-white"
              >
                #{next.rank} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
