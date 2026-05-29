"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticle, getCategory, getCategoryArticles } from "@/content/docs";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { AudienceBadge } from "@/components/docs/audience-badge";
import { ArticleContent } from "@/components/docs/article-content";
import { useAppLocale } from "@/components/app-locale-provider";
import {
  resolveArticleContent,
  resolveArticleDescription,
  resolveArticleTitle,
  resolveCategoryTitle,
} from "@/lib/docs/locale";

export function DocsArticleContent({
  categorySlug,
  articleSlug,
}: {
  categorySlug: string;
  articleSlug: string;
}) {
  const { locale } = useAppLocale();
  const category = getCategory(categorySlug);
  const article = getArticle(categorySlug, articleSlug);

  if (!category || !article) {
    return null;
  }

  const articles = getCategoryArticles(categorySlug);
  const currentIndex = articles.findIndex((a) => a.slug === articleSlug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const categoryTitle = resolveCategoryTitle(category, locale);
  const articleTitle = resolveArticleTitle(article, locale);
  const articleDescription = resolveArticleDescription(article, locale);
  const Content = resolveArticleContent(article, locale);

  return (
    <>
      <DocsBreadcrumbs
        crumbs={[
          { label: categoryTitle, href: `/docs/${category.slug}` },
          { label: articleTitle },
        ]}
      />

      <div className="mt-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <AudienceBadge audience={article.audience} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          {articleTitle}
        </h1>
        <p className="text-muted-foreground">{articleDescription}</p>
      </div>

      <hr className="border-border mb-8" />

      <ArticleContent>
        <Content />
      </ArticleContent>

      <hr className="border-border my-10" />

      <div className="flex items-center justify-between gap-4 pb-4">
        {prev ? (
          <Link
            href={`/docs/${category.slug}/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors max-w-[45%]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="truncate">
              {resolveArticleTitle(prev, locale)}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/docs/${category.slug}/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors max-w-[45%] text-right"
          >
            <span className="truncate">
              {resolveArticleTitle(next, locale)}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
