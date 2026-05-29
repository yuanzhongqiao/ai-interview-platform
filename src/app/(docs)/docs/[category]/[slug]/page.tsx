import { notFound } from "next/navigation";
import {
  categories,
  getCategory,
  getCategoryArticles,
  getArticle,
} from "@/content/docs";
import { DocsArticleContent } from "@/components/docs/docs-article-content";
import { getBrandName } from "@/lib/brand";

export function generateStaticParams() {
  return categories.flatMap((c) =>
    getCategoryArticles(c.slug).map((a) => ({
      category: c.slug,
      slug: a.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: catSlug, slug } = await params;
  const article = getArticle(catSlug, slug);
  if (!article) return {};
  const category = getCategory(catSlug);
  return {
    title: `${article.title} | ${category?.title} | ${getBrandName("en")} Docs`,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: catSlug, slug } = await params;
  if (!getCategory(catSlug) || !getArticle(catSlug, slug)) {
    notFound();
  }

  return <DocsArticleContent categorySlug={catSlug} articleSlug={slug} />;
}
