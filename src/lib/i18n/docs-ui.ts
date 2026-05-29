import { pickBiText, type BiText, type LangKey } from "@/lib/i18n";
import type { DocsLocale } from "@/lib/docs/locale";

const copy = {
  docLabel: {
    en: "DOCUMENTATION",
    zh: "文档中心",
    ja: "ドキュメント",
  } satisfies BiText,
  homeTitle: {
    en: "How can we help?",
    zh: "需要什么帮助？",
    ja: "お困りのことはありますか？",
  } satisfies BiText,
  homeSubtitle: {
    en: "Guides and answers for interview creators and interviewees.",
    zh: "为面试创建者与候选人提供的使用指南与常见问题。",
    ja: "面接作成者と候補者向けのガイドと FAQ。",
  } satisfies BiText,
  searchPlaceholder: {
    en: "Search...",
    zh: "搜索文档...",
    ja: "ドキュメントを検索...",
  } satisfies BiText,
  searchEmpty: {
    en: 'No articles found for "{query}"',
    zh: "未找到与「{query}」相关的文章",
    ja: "「{query}」に一致する記事はありません",
  } satisfies BiText,
  articleCountOne: { en: "article", zh: "篇文章", ja: "件の記事" } satisfies BiText,
  articleCountMany: { en: "articles", zh: "篇文章", ja: "件の記事" } satisfies BiText,
  home: { en: "Home", zh: "返回首页", ja: "ホーム" } satisfies BiText,
  getStarted: { en: "Get Started", zh: "立即开始", ja: "始める" } satisfies BiText,
  docsHome: { en: "Docs", zh: "文档", ja: "ドキュメント" } satisfies BiText,
  copyright: {
    en: "All rights reserved.",
    zh: "保留所有权利。",
    ja: "無断転載を禁じます。",
  } satisfies BiText,
  prevArticle: { en: "Previous", zh: "上一篇", ja: "前へ" } satisfies BiText,
  nextArticle: { en: "Next", zh: "下一篇", ja: "次へ" } satisfies BiText,
  audienceCreators: { en: "Creators", zh: "创建者", ja: "作成者" } satisfies BiText,
  audienceInterviewees: {
    en: "Interviewees",
    zh: "候选人",
    ja: "候補者",
  } satisfies BiText,
  audienceBoth: { en: "Everyone", zh: "通用", ja: "すべて" } satisfies BiText,
} as const;

function docsLocaleToLang(locale: DocsLocale): LangKey {
  if (locale === "zh") return "zh";
  if (locale === "ja") return "ja";
  return "en";
}

export function getDocsUi(locale: DocsLocale) {
  const lang = docsLocaleToLang(locale);
  const pick = (b: BiText) => pickBiText(lang, b);

  return {
    docLabel: () => pick(copy.docLabel),
    homeTitle: () => pick(copy.homeTitle),
    homeSubtitle: () => pick(copy.homeSubtitle),
    searchPlaceholder: () => pick(copy.searchPlaceholder),
    searchEmpty: (query: string) =>
      pick(copy.searchEmpty).replace("{query}", query),
    articleCount: (count: number) =>
      `${count} ${count === 1 ? pick(copy.articleCountOne) : pick(copy.articleCountMany)}`,
    home: () => pick(copy.home),
    getStarted: () => pick(copy.getStarted),
    docsHome: () => pick(copy.docsHome),
    copyright: () => pick(copy.copyright),
    prevArticle: () => pick(copy.prevArticle),
    nextArticle: () => pick(copy.nextArticle),
    audienceCreators: () => pick(copy.audienceCreators),
    audienceInterviewees: () => pick(copy.audienceInterviewees),
    audienceBoth: () => pick(copy.audienceBoth),
  };
}
