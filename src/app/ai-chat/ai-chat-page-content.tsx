"use client";

import { AiChatPanel } from "@/components/ai-chat/ai-chat-panel";
import { useAppLocale } from "@/components/app-locale-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { BrandMark } from "@/components/ui/brand-mark";
import { OPEN_SOURCE_COMMUNITY_URL } from "@/lib/brand";
import Link from "next/link";

export function AiChatPageContent() {
  const { t } = useAppLocale();

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BrandMark size={28} nameClassName="text-sm" />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm">
            <LanguageSwitcher compact />
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary"
            >
              {t("sidebar.about")}
            </Link>
            <a
              href={OPEN_SOURCE_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label={t("sidebar.openSource")}
            >
              {t("sidebar.openSource")}
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <AiChatPanel />
      </main>
    </div>
  );
}
