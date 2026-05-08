"use client";

import { CountryGrid } from "@/components/countries/CountryGrid";
import { SearchBar } from "@/components/ui/SearchBar";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { useTranslation } from "@/hooks/useTranslate";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-zinc-950 bg-grid">
      <div className="relative overflow-hidden border-b border-zinc-800/60">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">
                  PayFronte API
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight font-display">
                {t("app.title")}
              </h1>
              <p className="text-zinc-500 mt-2 text-base">
                {t("app.subtitle")}
              </p>
            </div>
            <LocaleSwitcher />
          </div>

          <div className="mt-6 max-w-xl">
            <SearchBar placeholder={t("app.search_placeholder")} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CountryGrid />
      </div>
    </main>
  );
}
