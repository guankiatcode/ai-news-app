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
  return now.toISOString().slice(0, 10);
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
