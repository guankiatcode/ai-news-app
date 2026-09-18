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

## Supabase data

The app reads complete daily editions from an `articles` table in Supabase. Add
these server environment variables locally or in Vercel:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The table needs these columns:

| Column | Type |
|---------|------|
| `id` | `text` or `uuid` |
| `date` | `date` or `text` (`YYYY-MM-DD`) |
| `rank` | `integer` |
| `title` | `text` |
| `source` | `text` |
| `url` | `text` |
| `published_at` | `timestamptz` or `text` |
| `read_minutes` | `integer` |
| `summary_title` | `text` |
| `summary` | `jsonb` array of strings |
| `key_points` | `jsonb` array of strings |
| `why_it_matters` | `text`, nullable |

Rows are selected by `date` and ordered by `rank`. Any stored rows are shown;
live RSS is used only when Supabase has no rows for that date. If both sources
are unavailable, the edition is empty rather than using local mock data.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or import the GitHub repo at [vercel.com/new](https://vercel.com/new). No API keys required for the default extractive summaries.

## How editions work

1. Stored articles are read server-side from Supabase when configured
2. If no articles exist for a date, feeds are fetched server-side from `src/lib/sources.ts`
3. Items are scored by freshness + substance, then capped at 10
4. Live editions are cached for about an hour (`unstable_cache`)
5. If both sources fail, the app returns an empty edition for that date

## Routes

| Path | Purpose |
|------|---------|
| `/` | Today’s Top 10 list |
| `/day/[date]/[rank]` | Article summary (conversation layout) |
| `/day/[date]` | That day’s 10 |
| `/archive` | Past days |
| `/sources` | Feed list |
| `/api/today` | JSON for today’s edition |
