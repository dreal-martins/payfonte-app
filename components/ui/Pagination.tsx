"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const { page, setPage } = useAppStore();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={cn(
          "p-2 rounded-lg border border-zinc-800 text-zinc-400",
          "hover:border-emerald-500/50 hover:text-emerald-400 transition-all",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((p, idx) => {
        const prev = visiblePages[idx - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <div key={p} className="flex items-center gap-1.5">
            {showEllipsis && (
              <span className="text-zinc-600 text-sm px-1">…</span>
            )}
            <button
              onClick={() => setPage(p)}
              className={cn(
                "w-9 h-9 rounded-lg text-sm font-medium transition-all border",
                p === page
                  ? "bg-emerald-500 text-black border-emerald-500 font-bold"
                  : "border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-400"
              )}
            >
              {p}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "p-2 rounded-lg border border-zinc-800 text-zinc-400",
          "hover:border-emerald-500/50 hover:text-emerald-400 transition-all",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
