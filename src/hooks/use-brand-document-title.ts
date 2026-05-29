"use client";

import { formatPageTitle, isChineseBrandLocale } from "@/lib/brand";
import { useEffect } from "react";

/** Sync browser tab title with interview/page context and brand name. */
export function useBrandDocumentTitle(
  pageTitle?: string | null,
  language?: string | null,
) {
  useEffect(() => {
    const previous = document.title;
    document.title = formatPageTitle(pageTitle, language);
    return () => {
      document.title = previous;
    };
  }, [pageTitle, language]);
}

export { isChineseBrandLocale };
