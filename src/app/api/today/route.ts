import { NextResponse } from "next/server";
import { getEdition } from "@/lib/editions";
import { todayKey } from "@/lib/types";

export const dynamic = "force-dynamic";

/** Returns today's capped edition (live RSS when available). */
export async function GET() {
  const edition = await getEdition(todayKey());
  return NextResponse.json({
    date: edition.date,
    label: edition.label,
    count: edition.articles.length,
    articles: edition.articles.map((a) => ({
      rank: a.rank,
      title: a.title,
      source: a.source,
      url: a.url,
      readMinutes: a.readMinutes,
    })),
  });
}
