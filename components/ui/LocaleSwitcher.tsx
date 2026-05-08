"use client";

import { Globe } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const LOCALES = [
  { code: "en-US", label: "English" },
  { code: "fr-FR", label: "Français" },
  { code: "ar-SA", label: "العربية" },
  { code: "zh-CN", label: "中文" },
  { code: "de-DE", label: "Deutsch" },
  { code: "es-ES", label: "Español" },
];

export function LocaleSwitcher() {
  const { activeLocale, setLocale } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      <Globe size={14} className="text-zinc-500" />
      <select
        value={activeLocale}
        onChange={(e) => setLocale(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-2 py-1.5
          focus:outline-none focus:border-emerald-500/50 transition-colors cursor-pointer"
        aria-label="Switch locale"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
