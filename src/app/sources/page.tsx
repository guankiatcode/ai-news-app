import { NEWS_SOURCES } from "@/lib/sources";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { DataSourceToggle } from "@/components/DataSourceToggle";
import { getPreferredDataSource } from "@/lib/data-source";

export default async function SourcesPage() {
  const selectedSource = await getPreferredDataSource();

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col pb-28">
        <TopBar label="Sources" backHref="/" />

        <div className="px-5 pb-2">
          <h1 className="text-[28px] font-bold tracking-tight text-black">
            Many sources
          </h1>
          <p className="mt-1 text-[14px] leading-relaxed text-neutral-500">
            Choose where your daily edition comes from.
          </p>
          <DataSourceToggle value={selectedSource} />
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {NEWS_SOURCES.map((source, index) => (
            <div
              key={source.id}
              className="flex items-center gap-3 rounded-2xl px-3 py-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[13px] font-bold text-black">
                {index + 1}
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-black">
                  {source.name}
                </h2>
                <p className="mt-0.5 text-[12px] text-neutral-400">
                  RSS · max 2 stories/day before fill
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
