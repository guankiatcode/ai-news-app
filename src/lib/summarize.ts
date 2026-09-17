/** Lightweight extractive summarizer — no API key required. */

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 320);
}

function wordCount(text: string): number {
  return (text.match(/\S+/g) || []).length;
}

export function summarizeArticle(input: {
  title: string;
  content: string;
}): { summary: string[]; keyPoints: string[]; readMinutes: number } {
  const clean = stripHtml(input.content || "");
  const parts = sentences(clean);
  const summary =
    parts.length >= 3
      ? parts.slice(0, 3)
      : [
          parts[0] ||
            `${input.title} — coverage from today’s multi-source digest.`,
          parts[1] ||
            "Details are still developing; check the original for full context.",
          parts[2] ||
            "This item was ranked into today’s top 10 across major feeds.",
        ];

  const keyPoints = summary.map((s) => {
    const clipped = s.replace(/\s+/g, " ").trim();
    if (clipped.length <= 90) return clipped.replace(/[.!?]$/, "");
    return clipped.slice(0, 87).replace(/\s+\S*$/, "") + "…";
  });

  return {
    summary,
    keyPoints,
    readMinutes: Math.max(2, Math.round(wordCount(clean || input.title) / 230) || 3),
  };
}
