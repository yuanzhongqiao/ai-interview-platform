"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AudienceBadge } from "@/components/docs/audience-badge";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { getCategory, getCategoryArticles } from "@/content/docs";
import { useAppLocale } from "@/components/app-locale-provider";
import {
  resolveArticleDescription,
  resolveArticleTitle,
  resolveCategoryDescription,
  resolveCategoryTitle,
} from "@/lib/docs/locale";

export function DocsCategoryContent({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const { locale } = useAppLocale();
  const category = getCategory(categorySlug);
  if (!category) return null;

  const articles = getCategoryArticles(categorySlug);
  const title = resolveCategoryTitle(category, locale);
  const description = resolveCategoryDescription(category, locale);

  return (
    <>
      <DocsBreadcrumbs crumbs={[{ label: title }]} />
      <div className="mt-6 mb-10">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/docs/${category.slug}/${article.slug}`}
            className="group flex items-center justify-between bg-card border border-border rounded-lg p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            <div className="min-w-0 flex-1 pr-4">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {resolveArticleTitle(article, locale)}
                </span>
                <AudienceBadge audience={article.audience} />
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {resolveArticleDescription(article, locale)}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </>
  );
}
