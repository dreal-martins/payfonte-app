"use client";

import { useTranslation } from "@/hooks/useTranslate";
import { Country } from "@/types/country";
import { DollarSign, Globe, Hash, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface CountryModalProps {
  country: Country | null;
  onClose: () => void;
  locale: string;
}

export function CountryModal({ country, onClose, locale }: CountryModalProps) {
  const { t } = useTranslation();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (country) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [country]);

  if (!country) return null;

  let formatted = "";
  try {
    formatted = new Intl.NumberFormat(
      locale || country.currencyCode || "en-US",
      {
        style: "currency",
        currency: country.currencyCode || "USD",
      },
    ).format(12345.67);
  } catch {
    formatted = `${country.currencyCode} 12,345.67`;
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${country.countryName}`}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl animate-slideUp overflow-hidden">
        <div className="h-1 w-full bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span
                className="text-5xl leading-none"
                role="img"
                aria-label={`Flag of ${country.countryName}`}
              >
                {country.flag || "🌐"}
              </span>
              <div>
                <h2 className="text-xl font-bold text-zinc-100 font-display">
                  {country.countryName}
                </h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {country.countryCode}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <DetailRow
              icon={<DollarSign size={14} />}
              label={t("app.currency_label")}
              value={country.currency}
            />
            <DetailRow
              icon={<Globe size={14} />}
              label={t("app.locale_label")}
              value={country.currencyCode}
            />
            {country.countryCode !== "GLOBAL" && (
              <DetailRow
                icon={<Hash size={14} />}
                label={t("app.country_code")}
                value={country.countryCode}
              />
            )}
          </div>

          <div className="mt-6 rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-xs text-zinc-500 mb-1">
              {t("app.sample_amount", { currency: country.currency })}
            </p>
            <p className="text-2xl font-bold font-mono text-emerald-400">
              {formatted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/60 last:border-0">
      <div className="flex items-center gap-2 text-zinc-500 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-zinc-200 text-sm font-medium font-mono">
        {value || "—"}
      </span>
    </div>
  );
}
