import { unstable_cache } from "next/cache";
import { buildLiveEdition } from "./feeds";
import { getSupabaseEdition, listSupabaseDates } from "./supabase";
import { getPreferredDataSource, type DataSource } from "./data-source";
import type { Article, DailyEdition } from "./types";
import { formatDayLabel, todayKey } from "./types";

function ensureTen(edition: DailyEdition): DailyEdition {
  const articles = edition.articles.slice(0, 10);
  return { ...edition, articles };
}

function mergeEditions(
  date: string,
  stored: DailyEdition | null,
  live: DailyEdition | null,
): DailyEdition | null {
  const articles = [...(stored?.articles ?? []), ...(live?.articles ?? [])];
  const seen = new Set<string>();
  const unique = articles.filter((article) => {
    const key = article.url.replace(/\/$/, "").toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) return null;

  return ensureTen({
    date,
    label: formatDayLabel(date),
    articles: unique.slice(0, 10).map((article, index) => ({
      ...article,
      id: `${date}-${index + 1}`,
      rank: index + 1,
    })),
  });
}

const getCachedLiveEdition = unstable_cache(
  async (date: string) => buildLiveEdition(date),
  ["daily-top10-live"],
  { revalidate: 3600 },
);

/** Resolve a day's edition from Supabase, RSS, or both sources. */
export async function getEdition(
  date = todayKey(),
  source?: DataSource,
): Promise<DailyEdition> {
  const selectedSource = source ?? (await getPreferredDataSource());

  if (selectedSource === "supabase") {
    try {
      const stored = await getSupabaseEdition(date);
      if (stored) return ensureTen(stored);
    } catch {
      // fall through to an empty edition
    }
  } else if (selectedSource === "both") {
    let stored: DailyEdition | null = null;
    let live: DailyEdition | null = null;
    try {
      stored = await getSupabaseEdition(date);
    } catch {
      // use RSS when Supabase is unavailable
    }
    try {
      live = await getCachedLiveEdition(date);
    } catch {
      // use Supabase rows when RSS is unavailable
    }
    const merged = mergeEditions(date, stored, live);
    if (merged) return merged;
  } else if (selectedSource === "rss") {
    try {
      const live = await getCachedLiveEdition(date);
      if (live && live.articles.length === 10) return ensureTen(live);
    } catch {
      // fall through to an empty edition
    }
  }

  return {
    date,
    label: formatDayLabel(date),
    articles: [],
  };
}

export async function getArticle(
  date: string,
  rank: number,
): Promise<{ edition: DailyEdition; article: Article } | null> {
  const edition = await getEdition(date);
  const article = edition.articles.find((a) => a.rank === rank);
  if (!article) return null;
  return { edition, article };
}

export async function listEditionDates(): Promise<
  { date: string; label: string; count: number }[]
> {
  const today = todayKey();
  let storedDates: string[] = [];
  try {
    storedDates = await listSupabaseDates();
  } catch {
    // keep archive available when Supabase is unavailable
  }
  const dates = new Set<string>([today, ...storedDates]);
  const editions = await Promise.all(
    [...dates].sort((a, b) => b.localeCompare(a)).map(async (date) => {
      const edition = await getEdition(date);
      return {
        date: edition.date,
        label: edition.label,
        count: edition.articles.length,
      };
    }),
  );
  return editions;
}
