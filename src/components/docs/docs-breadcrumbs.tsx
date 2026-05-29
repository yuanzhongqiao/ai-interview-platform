"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAppLocale } from "@/components/app-locale-provider";
import { getDocsUi } from "@/lib/i18n/docs-ui";

export function DocsBreadcrumbs({
  crumbs,
}: {
  crumbs: { label: string; href?: string }[];
}) {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link
        href="/docs"
        className="hover:text-primary transition-colors"
      >
        {ui.docsHome()}
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-primary transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
