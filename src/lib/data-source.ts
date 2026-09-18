import { cookies } from "next/headers";

export type DataSource = "supabase" | "rss" | "both";

const SOURCE_COOKIE = "news_source";

export async function getPreferredDataSource(): Promise<DataSource> {
  const value = (await cookies()).get(SOURCE_COOKIE)?.value;
  if (value === "rss" || value === "both") return value;
  return "supabase";
}
