"use client";

import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { DocsSearch } from "./docs-search";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAppLocale } from "@/components/app-locale-provider";
import { getDocsUi } from "@/lib/i18n/docs-ui";
import { ExternalLink } from "lucide-react";

export function DocsHeader() {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="flex items-center gap-6 px-6 py-3">
        <Link
          href="/docs"
          className="flex items-center gap-1.5 shrink-0 group"
        >
          <BrandMark
            size={30}
            nameClassName="tracking-[1.5px] text-foreground"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        <div className="flex-1 max-w-lg mx-auto">
          <DocsSearch compact />
        </div>

        <div className="md:hidden shrink-0">
          <LanguageSwitcher />
        </div>

        <nav className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {ui.home()}
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="/register"
            className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200"
          >
            {ui.getStarted()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
