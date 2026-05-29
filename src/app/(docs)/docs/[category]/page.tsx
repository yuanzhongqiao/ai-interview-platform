import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/docs";
import { DocsCategoryContent } from "@/components/docs/docs-category-content";
import { getBrandName } from "@/lib/brand";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.title} | ${getBrandName("en")} Docs`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  if (!getCategory(slug)) notFound();

  return <DocsCategoryContent categorySlug={slug} />;
}
