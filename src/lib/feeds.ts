import Parser from "rss-parser";
import { NEWS_SOURCES } from "./sources";
import { summarizeArticle } from "./summarize";
import type { Article, DailyEdition } from "./types";
import { formatDayLabel } from "./types";

export type RawItem = {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  content: string;
};

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "DailyTop10/1.0 (+https://vercel.com)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

async function fetchFeed(
  sourceName: string,
  feedUrl: string,
): Promise<RawItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return (feed.items || [])
      .slice(0, 8)
      .map((item) => {
        const title = (item.title || "").trim();
        const url = (item.link || item.guid || "").trim();
        if (!title || !url) return null;
        const publishedAt = item.isoDate
          ? new Date(item.isoDate).toISOString()
          : item.pubDate
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString();
        const content = [
          item.contentSnippet,
          item.content,
          item.summary,
          typeof item["content:encoded"] === "string"
            ? item["content:encoded"]
            : "",
        ]
          .filter(Boolean)
          .join("\n");
        return {
          title,
          source: sourceName,
          url,
          publishedAt,
          content: content || title,
        } satisfies RawItem;
      })
      .filter((x): x is RawItem => Boolean(x));
  } catch {
    return [];
  }
}

/** Pull recent items from every configured source in parallel. */
export async function fetchAllSources(): Promise<RawItem[]> {
  const batches = await Promise.all(
    NEWS_SOURCES.map((s) => fetchFeed(s.name, s.feedUrl)),
  );
  const all = batches.flat();
  const seen = new Set<string>();
  const unique: RawItem[] = [];
  for (const item of all) {
    const key = item.url.replace(/\/$/, "").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

function scoreItem(item: RawItem, now: number): number {
  const ageHours = Math.max(
    0,
    (now - new Date(item.publishedAt).getTime()) / 3_600_000,
  );
  const freshness = Math.max(0, 48 - ageHours);
  const lengthBonus = Math.min(12, (item.content || "").length / 400);
  const titleBonus = item.title.length > 28 && item.title.length < 90 ? 4 : 0;
  return freshness + lengthBonus + titleBonus;
}

/**
 * Diversify across sources, then take the best 10.
 * Prefers at most 2 items per source before filling remaining slots.
 */
export function pickTop10(items: RawItem[], date: string): Article[] {
  const now = Date.now();
  const ranked = [...items].sort(
    (a, b) => scoreItem(b, now) - scoreItem(a, now),
  );

  const picked: RawItem[] = [];
  const perSource = new Map<string, number>();

  for (const item of ranked) {
    if (picked.length >= 10) break;
    const count = perSource.get(item.source) || 0;
    if (count >= 2) continue;
    picked.push(item);
    perSource.set(item.source, count + 1);
  }

  for (const item of ranked) {
    if (picked.length >= 10) break;
    if (picked.includes(item)) continue;
    picked.push(item);
  }

  return picked.slice(0, 10).map((item, index) => {
    const digest = summarizeArticle({
      title: item.title,
      content: item.content,
    });
    return {
      id: `${date}-${index + 1}`,
      rank: index + 1,
      title: item.title,
      source: item.source,
      url: item.url,
      publishedAt: item.publishedAt,
      readMinutes: digest.readMinutes,
      summaryTitle: "Summary of Article",
      summary: digest.summary,
      keyPoints: digest.keyPoints,
    } satisfies Article;
  });
}

export async function buildLiveEdition(date: string): Promise<DailyEdition | null> {
  const items = await fetchAllSources();
  if (items.length < 5) return null;
  const articles = pickTop10(items, date);
  if (articles.length < 10) return null;
  return {
    date,
    label: formatDayLabel(date),
    articles,
  };
}
