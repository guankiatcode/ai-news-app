import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Article, DailyEdition } from "./types";
import { formatDayLabel } from "./types";

type ArticleRow = {
  id: string | number;
  date: string;
  rank: number;
  title: string;
  source: string;
  url: string;
  published_at: string;
  read_minutes: number;
  summary_title: string | null;
  summary: unknown;
  key_points: unknown;
  why_it_matters: string | null;
};

let client: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = url && key ? createClient(url, key) : null;
  return client;
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapArticle(row: ArticleRow): Article {
  return {
    id: String(row.id),
    rank: row.rank,
    title: row.title,
    source: row.source,
    url: row.url,
    publishedAt: row.published_at,
    readMinutes: row.read_minutes,
    summaryTitle: row.summary_title ?? "Summary of Article",
    summary: stringArray(row.summary),
    keyPoints: stringArray(row.key_points),
    whyItMatters: row.why_it_matters ?? undefined,
  };
}

/** Read a complete edition from Supabase, or return null when unavailable. */
export async function getSupabaseEdition(
  date: string,
): Promise<DailyEdition | null> {
  const supabase = getClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(
      "id,date,rank,title,source,url,published_at,read_minutes,summary_title,summary,key_points,why_it_matters",
    )
    .eq("date", date)
    .order("rank", { ascending: true })
    .limit(10);

  if (error || !data || data.length !== 10) return null;

  return {
    date,
    label: formatDayLabel(date),
    articles: (data as ArticleRow[]).map(mapArticle),
  };
}

/** Return all dates represented in the Supabase article table. */
export async function listSupabaseDates(): Promise<string[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("date")
    .order("date", { ascending: false });

  if (error || !data) return [];
  return [...new Set(data.map((row) => row.date).filter(Boolean))];
}
