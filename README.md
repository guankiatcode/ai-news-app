# Daily Top 10

Mobile news digest: pull stories from many RSS sources, keep **exactly 10 per day**, and read each one in a conversation-style summary screen.

## Product rules

- Every day has a fixed edition of **10 articles**
- Articles come from multiple public feeds (BBC, NPR, Guardian, Verge, TechCrunch, etc.)
- Ranking diversifies sources (max 2 per source before fill)
- Each article opens like the Conversation Summary UI: title, badges, summary bullets, key points, copy

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or import the GitHub repo at [vercel.com/new](https://vercel.com/new). No API keys required for the default extractive summaries.

## How editions work

1. Feeds are fetched server-side from `src/lib/sources.ts`
2. Items are scored by freshness + substance, then capped at 10
3. Live editions are cached for about an hour (`unstable_cache`)
4. If feeds fail, curated seed editions in `src/lib/seed.ts` keep the app usable

## Routes

| Path | Purpose |
|------|---------|
| `/` | Today’s Top 10 list |
| `/day/[date]/[rank]` | Article summary (conversation layout) |
| `/day/[date]` | That day’s 10 |
| `/archive` | Past days |
| `/sources` | Feed list |
| `/api/today` | JSON for today’s edition |
