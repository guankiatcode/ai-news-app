import { unstable_cache } from "next/cache";
import { buildLiveEdition } from "./feeds";
import { getSupabaseEdition, listSupabaseDates } from "./supabase";
import type { Article, DailyEdition } from "./types";
import { formatDayLabel, todayKey } from "./types";

function ensureTen(edition: DailyEdition): DailyEdition {
  const articles = edition.articles.slice(0, 10);
  return { ...edition, articles };
}

const getCachedLiveEdition = unstable_cache(
  async (date: string) => buildLiveEdition(date),
  ["daily-top10-live"],
  { revalidate: 3600 },
);

/** Resolve a day's edition: Supabase, then live RSS. */
export async function getEdition(date = todayKey()): Promise<DailyEdition> {
  try {
    const stored = await getSupabaseEdition(date);
    if (stored) return ensureTen(stored);
  } catch {
    // fall through to live RSS
  }

  try {
    const live = await getCachedLiveEdition(date);
    if (live && live.articles.length === 10) return ensureTen(live);
  } catch {
    // fall through to an empty edition
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
