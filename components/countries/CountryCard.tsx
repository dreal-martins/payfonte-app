"use client";

import { useTranslation } from "@/hooks/useTranslate";
import { Country } from "@/types/country";
import { ArrowUpRight } from "lucide-react";

interface CountryCardProps {
  country: Country;
  onClick: (c: Country) => void;
  locale: string;
}

export function CountryCard({ country, onClick, locale }: CountryCardProps) {
  const { t } = useTranslation();

  let sample = "";
  try {
    sample = new Intl.NumberFormat(locale || country.currencyCode || "en-US", {
      style: "currency",
      currency: country.currencyCode || "USD",
      maximumFractionDigits: 0,
    }).format(1000);
  } catch {
    sample = `${country.currencyCode}1,000`;
  }

  return (
    <button
      onClick={() => onClick(country)}
      className="group relative text-left w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5
        hover:border-emerald-500/40 hover:bg-zinc-900 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
      aria-label={`View details for ${country.countryName}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/0 group-hover:bg-emerald-500/3 transition-colors duration-300" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-3xl leading-none"
            role="img"
            aria-label={`Flag of ${country.countryName}`}
          >
            {country.flag || "🌐"}
          </span>
          <div>
            <h3 className="font-semibold text-zinc-100 text-sm leading-tight font-display line-clamp-1">
              {country.countryName}
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              {country.countryCode}
            </span>
          </div>
        </div>
        <ArrowUpRight
          size={14}
          className="text-zinc-700 group-hover:text-emerald-500 transition-colors mt-0.5 shrink-0"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Chip label={t("app.currency_label")} value={country.currency} accent />
        <Chip label={t("app.locale_label")} value={country.currencyCode} />
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">{t("app.sample")}</p>
        <p className="text-sm font-mono text-emerald-400 font-medium">
          {sample}
        </p>
      </div>
    </button>
  );
}

function Chip({
  label,
  value,
  accent,
}: {
  label: string;
  value?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs w-fit ${
        accent
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
      }`}
    >
      <span className="text-[10px] uppercase tracking-wider opacity-60">
        {label}
      </span>
      <span className="font-mono text-[12px] font-medium capitalize truncate">
        {value || "—"}
      </span>
    </div>
  );
}
