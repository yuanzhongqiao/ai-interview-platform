"use client";

import Link from "next/link";
import { useAppLocale } from "@/components/app-locale-provider";
import { getBrandName } from "@/lib/brand";
import { getDocsUi } from "@/lib/i18n/docs-ui";

export function DocsFooter({ className }: { className?: string }) {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);
  const brand = getBrandName(locale);

  return (
    <footer
      className={`border-t border-border/60 px-8 py-5 ${className ?? ""}`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
        <span>
          &copy; {new Date().getFullYear()} {brand}. {ui.copyright()}
        </span>
        <Link
          href="/"
          className="hover:text-primary transition-colors font-medium"
        >
          {ui.home()}
        </Link>
      </div>
    </footer>
  );
}
