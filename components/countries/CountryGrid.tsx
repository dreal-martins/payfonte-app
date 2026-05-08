"use client";

import { useState } from "react";
import { useCountries } from "@/hooks/useCountries";
import { useAppStore } from "@/store/appStore";
import { CountryCard } from "./CountryCard";
import { CountryModal } from "./CountryModal";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { Country } from "@/types/country";
import { AlertTriangle, RefreshCw, SearchX } from "lucide-react";
import { useId } from "react";
import { useTranslation } from "@/hooks/useTranslate";

export function CountryGrid() {
  const {
    countries,
    filteredCount,
    totalCount,
    totalPages,
    isLoading,
    isError,
    refetch,
  } = useCountries();

  const id = useId();
  const { t } = useTranslation();
  const { searchQuery, activeLocale } = useAppStore();
  const [selected, setSelected] = useState<Country | null>(null);

  if (isLoading) return <SkeletonGrid />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-zinc-200 font-semibold">{t("app.error_title")}</p>
          <p className="text-zinc-500 text-sm mt-1">{t("app.error_hint")}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700
            text-zinc-300 text-sm transition-colors border border-zinc-700"
        >
          <RefreshCw size={14} />
          {t("app.retry")}
        </button>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <SearchX size={24} className="text-zinc-500" />
        </div>
        <div className="text-center">
          <p className="text-zinc-300 font-semibold">
            {t("app.no_countries_found")}
          </p>
          <p className="text-zinc-500 text-sm mt-1">
            {searchQuery
              ? t("app.no_results", { query: searchQuery })
              : t("app.no_data")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-zinc-500 text-sm mb-4">
        {t("app.showing", { count: filteredCount, total: totalCount })}
        {searchQuery && (
          <span className="text-zinc-600">
            {" "}
            for &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard
            key={country.countryId ?? id}
            country={country}
            onClick={setSelected}
            locale={activeLocale}
          />
        ))}
      </div>

      <Pagination totalPages={totalPages} />

      <CountryModal
        country={selected}
        onClose={() => setSelected(null)}
        locale={activeLocale}
      />
    </>
  );
}
