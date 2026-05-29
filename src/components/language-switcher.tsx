"use client";

import { useAppLocale, type AppLocale } from "@/components/app-locale-provider";
import { cn } from "@/lib/utils";

const LOCALE_OPTIONS: AppLocale[] = ["en", "zh", "ja"];

const LOCALE_LABEL_KEYS: Record<AppLocale, string> = {
  en: "common.english",
  zh: "common.chinese",
  ja: "common.japanese",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useAppLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border bg-background p-1",
        compact && "scale-95",
      )}
    >
      {LOCALE_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            locale === option
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(LOCALE_LABEL_KEYS[option])}
        </button>
      ))}
    </div>
  );
}
