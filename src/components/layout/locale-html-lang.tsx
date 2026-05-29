"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { useEffect } from "react";

/** Syncs <html lang> with the active app locale. */
export function LocaleHtmlLang() {
  const { locale } = useAppLocale();

  useEffect(() => {
    document.documentElement.lang =
      locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en";
  }, [locale]);

  return null;
}
