import { BottomNav } from "@/components/BottomNav";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-200/80 md:bg-[#e8e8e8] md:py-8 md:px-4">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-none md:min-h-[844px] md:max-h-[900px] md:rounded-[2.5rem] md:border md:border-neutral-300 md:shadow-2xl">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
