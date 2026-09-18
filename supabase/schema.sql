create table if not exists public.articles (
  id text primary key,
  date date not null,
  rank integer not null check (rank between 1 and 10),
  title text not null,
  source text not null,
  url text not null,
  published_at timestamptz not null,
  read_minutes integer not null check (read_minutes > 0),
  summary_title text not null default 'Summary of Article',
  summary jsonb not null default '[]'::jsonb,
  key_points jsonb not null default '[]'::jsonb,
  why_it_matters text,
  constraint articles_date_rank_key unique (date, rank),
  constraint articles_summary_array_check check (jsonb_typeof(summary) = 'array'),
  constraint articles_key_points_array_check check (jsonb_typeof(key_points) = 'array')
);

create index if not exists articles_date_rank_idx
  on public.articles (date desc, rank asc);

alter table public.articles enable row level security;

create policy "Articles are publicly readable"
  on public.articles
  for select
  using (true);
