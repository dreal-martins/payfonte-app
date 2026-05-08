"use client";

import { translations } from "@/messages";
import { useAppStore } from "@/store/appStore";

export function useTranslation() {
  const { activeLocale } = useAppStore();

  const locale = activeLocale as keyof typeof translations;

  const messages = translations[locale] || translations["en-US"];

  const t = (path: string, variables?: Record<string, string | number>) => {
    const value = path
      .split(".")
      .reduce<any>((obj, key) => obj?.[key], messages);

    if (!value) return path;

    if (!variables) return value;

    return Object.entries(variables).reduce(
      (text, [key, val]) => text.replace(`{${key}}`, String(val)),
      value,
    );
  };

  return { t };
}
