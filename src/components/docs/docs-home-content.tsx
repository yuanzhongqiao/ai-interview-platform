"use client";

import { CategoryCard } from "@/components/docs/category-card";
import { DocsFooter } from "@/components/docs/docs-footer";
import { DocsSearch } from "@/components/docs/docs-search";
import { useAppLocale } from "@/components/app-locale-provider";
import { categories, getCategoryArticles } from "@/content/docs";
import { getDocsUi } from "@/lib/i18n/docs-ui";

export function DocsHomeContent() {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);

  return (
    <>
      <div className="bg-primary py-16 px-8 lg:px-[120px]">
        <div className="max-w-[1440px] mx-auto text-center space-y-6">
          <span className="block font-heading text-[11px] font-semibold tracking-[2px] text-primary-foreground/80 uppercase">
            {ui.docLabel()}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            {ui.homeTitle()}
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            {ui.homeSubtitle()}
          </p>
          <div className="pt-2">
            <DocsSearch />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              articleCount={getCategoryArticles(category.slug).length}
            />
          ))}
        </div>
      </div>

      <DocsFooter />
    </>
  );
}
