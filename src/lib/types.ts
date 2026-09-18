export type Article = {
  id: string;
  rank: number; // 1–10
  title: string;
  source: string;
  url: string;
  publishedAt: string; // ISO
  readMinutes: number;
  summaryTitle: string;
  summary: string[];
  keyPoints: string[];
  whyItMatters?: string;
};

export type DailyEdition = {
  date: string; // YYYY-MM-DD
  label: string; // e.g. Sep 17, 2026
  articles: Article[]; // exactly 10
};

export function formatDayLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function todayKey(now = new Date()): string {
  const timeZone = process.env.APP_TIME_ZONE ?? "Asia/Singapore";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

export function articleCopyText(article: Article): string {
  const lines = [
    article.title,
    `${article.source} · ${formatDayLabel(article.publishedAt.slice(0, 10))}`,
    "",
    article.summaryTitle,
    ...article.summary.map((s) => `• ${s}`),
    "",
    "Key Points:",
    ...article.keyPoints.map((k) => `• ${k}`),
  ];
  if (article.whyItMatters) {
    lines.push("", "Why it matters:", article.whyItMatters);
  }
  if (article.url) {
    lines.push("", article.url);
  }
  return lines.join("\n");
}
