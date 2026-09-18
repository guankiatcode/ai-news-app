"use client";

import { Database, Radio, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { DataSource } from "@/lib/data-source";

type DataSourceToggleProps = {
  value: DataSource;
};

export function DataSourceToggle({ value }: DataSourceToggleProps) {
  const router = useRouter();

  function selectSource(source: DataSource) {
    if (source === value) return;
    document.cookie = `news_source=${source}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="mt-5 rounded-2xl bg-neutral-100 p-1">
      <div className="grid grid-cols-3 gap-1" role="group" aria-label="News source">
        <button
          type="button"
          aria-pressed={value === "supabase"}
          onClick={() => selectSource("supabase")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${
            value === "supabase"
              ? "bg-white text-black shadow-sm"
              : "text-neutral-500"
          }`}
        >
          <Database className="h-4 w-4" strokeWidth={2} />
          Supabase
        </button>
        <button
          type="button"
          aria-pressed={value === "rss"}
          onClick={() => selectSource("rss")}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${
            value === "rss"
              ? "bg-white text-black shadow-sm"
              : "text-neutral-500"
          }`}
        >
          <Radio className="h-4 w-4" strokeWidth={2} />
          Live RSS
        </button>
        <button
          type="button"
          aria-pressed={value === "both"}
          onClick={() => selectSource("both")}
          className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[13px] font-semibold transition-colors ${
            value === "both"
              ? "bg-white text-black shadow-sm"
              : "text-neutral-500"
          }`}
        >
          <Shuffle className="h-4 w-4" strokeWidth={2} />
          Both
        </button>
      </div>
    </div>
  );
}
