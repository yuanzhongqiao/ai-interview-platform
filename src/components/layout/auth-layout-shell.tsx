"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useAppLocale } from "@/components/app-locale-provider";
import Image from "next/image";
import { OPEN_SOURCE_COMMUNITY_URL } from "@/lib/brand";
import Link from "next/link";

export function AuthLayoutShell({ children }: { children: React.ReactNode }) {
  const { t } = useAppLocale();

  return (
    <div className="relative flex min-h-screen">
      <div className="relative hidden flex-1 lg:block" aria-hidden>
        <Image
          src="/images/login-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/45 to-background/95" />
        <div className="absolute bottom-12 left-12 max-w-md text-primary-foreground">
          <p className="font-heading text-3xl font-bold">{t("brand.fullName")}</p>
          <p className="mt-2 text-sm opacity-90">{t("brand.tagline")}</p>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center bg-muted/30 px-4 py-12">
        <div className="absolute right-4 top-4 flex flex-wrap items-center justify-end gap-3 text-sm">
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
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
