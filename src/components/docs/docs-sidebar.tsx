"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { categories, getCategoryArticles } from "@/content/docs";
import { useAppLocale } from "@/components/app-locale-provider";
import {
  resolveArticleTitle,
  resolveCategoryTitle,
} from "@/lib/docs/locale";

const SCROLL_KEY = "docs-sidebar-scroll";

export function DocsSidebar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { locale } = useAppLocale();

  useEffect(() => {
    const el = navRef.current?.parentElement;
    if (!el) return;

    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) el.scrollTop = Number(saved);

    const onScroll = () =>
      sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className="space-y-6">
      {categories.map((category) => {
        const articles = getCategoryArticles(category.slug);
        const categoryActive = pathname.startsWith(`/docs/${category.slug}`);
        const categoryTitle = resolveCategoryTitle(category, locale);

        return (
          <div key={category.slug}>
            <Link
              href={`/docs/${category.slug}`}
              className={cn(
                "block font-heading text-xs font-semibold tracking-[1px] mb-2 transition-colors",
                categoryActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              {categoryTitle.toUpperCase()}
            </Link>
            <ul className="space-y-0.5">
              {articles.map((article) => {
                const articleActive =
                  pathname === `/docs/${category.slug}/${article.slug}`;
                const articleTitle = resolveArticleTitle(article, locale);
                return (
                  <li key={article.slug}>
                    <Link
                      href={`/docs/${category.slug}/${article.slug}`}
                      className={cn(
                        "block text-sm py-1.5 pl-3 border-l-2 transition-colors",
                        articleActive
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                      )}
                    >
                      {articleTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
