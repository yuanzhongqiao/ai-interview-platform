import type { DocArticle, DocCategory } from "@/content/docs/types";

export type DocsLocale = "en" | "zh" | "ja";

export function isDocsLocale(value: string | null | undefined): value is DocsLocale {
  return value === "en" || value === "zh" || value === "ja";
}

function pickLocalizedField(
  locale: DocsLocale,
  en: string,
  zh?: string,
  ja?: string,
): string {
  if (locale === "zh" && zh) return zh;
  if (locale === "ja" && ja) return ja;
  return en;
}

export function resolveCategoryTitle(
  category: DocCategory,
  locale: DocsLocale,
): string {
  return pickLocalizedField(
    locale,
    category.title,
    category.titleZh,
    category.titleJa,
  );
}

export function resolveCategoryDescription(
  category: DocCategory,
  locale: DocsLocale,
): string {
  return pickLocalizedField(
    locale,
    category.description,
    category.descriptionZh,
    category.descriptionJa,
  );
}

export function resolveArticleTitle(
  article: DocArticle,
  locale: DocsLocale,
): string {
  return pickLocalizedField(
    locale,
    article.title,
    article.titleZh,
    article.titleJa,
  );
}

export function resolveArticleDescription(
  article: DocArticle,
  locale: DocsLocale,
): string {
  return pickLocalizedField(
    locale,
    article.description,
    article.descriptionZh,
    article.descriptionJa,
  );
}

export function resolveArticleContent(
  article: DocArticle,
  locale: DocsLocale,
) {
  if (locale === "zh" && article.contentZh) {
    return article.contentZh;
  }
  if (locale === "ja" && article.contentJa) {
    return article.contentJa;
  }
  return article.content;
}
