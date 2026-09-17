import { unstable_cache } from "next/cache";
import { SEED_EDITIONS } from "./seed";
import { buildLiveEdition } from "./feeds";
import type { Article, DailyEdition } from "./types";
import { formatDayLabel, todayKey } from "./types";

function ensureTen(edition: DailyEdition): DailyEdition {
  const articles = edition.articles.slice(0, 10);
  return { ...edition, articles };
}

function listSeedDates(): string[] {
  return Object.keys(SEED_EDITIONS).sort((a, b) => b.localeCompare(a));
}

const getCachedLiveEdition = unstable_cache(
  async (date: string) => buildLiveEdition(date),
  ["daily-top10-live"],
  { revalidate: 3600 },
);

/** Resolve a day's edition: live RSS when possible, else curated seed. */
export async function getEdition(date = todayKey()): Promise<DailyEdition> {
  if (SEED_EDITIONS[date]) {
    // Prefer live refresh for "today" so sources stay current.
    if (date === todayKey()) {
      try {
        const live = await getCachedLiveEdition(date);
        if (live && live.articles.length === 10) return ensureTen(live);
      } catch {
        // fall through to seed
      }
    }
    return ensureTen(SEED_EDITIONS[date]);
  }

  try {
    const live = await getCachedLiveEdition(date);
    if (live && live.articles.length === 10) return ensureTen(live);
  } catch {
    // fall through
  }

  // Clone nearest seed day and re-stamp ids/date so UI always has 10.
  const fallbackDate = listSeedDates()[0];
  const seed = SEED_EDITIONS[fallbackDate];
  return ensureTen({
    date,
    label: formatDayLabel(date),
    articles: seed.articles.map((article, i) => ({
      ...article,
      id: `${date}-${i + 1}`,
      rank: i + 1,
    })),
  });
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
  const dates = new Set<string>([today, ...listSeedDates()]);
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
