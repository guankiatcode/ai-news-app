"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Newspaper, RefreshCw } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const todayActive = pathname === "/" || pathname.startsWith("/day/");
  const archiveActive = pathname.startsWith("/archive");
  const sourcesActive = pathname.startsWith("/sources");

  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-white via-white/95 to-transparent pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-10">
      <div className="pointer-events-auto mx-auto flex max-w-md items-end justify-between px-10 pb-2">
        <Link
          href="/archive"
          aria-label="Archive"
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            archiveActive ? "text-black" : "text-neutral-400"
          }`}
        >
          <CalendarDays
            className="h-[26px] w-[26px]"
            strokeWidth={archiveActive ? 2.25 : 1.75}
          />
        </Link>

        <Link
          href="/sources"
          aria-label="Sources"
          aria-current={sourcesActive ? "page" : undefined}
          className="relative -mt-6 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform active:scale-95"
        >
          <RefreshCw className="h-7 w-7 text-white" strokeWidth={2.25} />
        </Link>

        <Link
          href="/"
          aria-label="Today"
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            todayActive && !archiveActive && !sourcesActive
              ? "text-black"
              : "text-neutral-400"
          }`}
        >
          <Newspaper
            className="h-[26px] w-[26px]"
            strokeWidth={
              todayActive && !archiveActive && !sourcesActive ? 2.25 : 1.75
            }
          />
        </Link>
      </div>
      <div className="mx-auto mt-1 h-1 w-28 rounded-full bg-black" />
    </nav>
  );
}
