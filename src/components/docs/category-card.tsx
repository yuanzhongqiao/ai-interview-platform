"use client";

import Link from "next/link";
import {
  Rocket,
  PenTool,
  Users,
  Mic,
  BarChart3,
  BrainCircuit,
  Building2,
  Shield,
  Wrench,
  HelpCircle,
} from "lucide-react";
import type { DocCategory } from "@/content/docs/types";
import { useAppLocale } from "@/components/app-locale-provider";
import {
  resolveCategoryDescription,
  resolveCategoryTitle,
} from "@/lib/docs/locale";
import { getDocsUi } from "@/lib/i18n/docs-ui";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  PenTool,
  Users,
  Mic,
  BrainCircuit,
  BarChart3,
  Building2,
  Shield,
  Wrench,
  HelpCircle,
};

export function CategoryCard({
  category,
  articleCount,
}: {
  category: DocCategory;
  articleCount: number;
}) {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);
  const Icon = iconMap[category.iconName] ?? HelpCircle;
  const title = resolveCategoryTitle(category, locale);
  const description = resolveCategoryDescription(category, locale);

  return (
    <Link
      href={`/docs/${category.slug}`}
      className="group flex flex-col bg-card border border-border rounded-lg p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
    >
      <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300 overflow-hidden">
        <Icon size={20} className="text-primary" />
      </div>
      <h3 className="font-heading text-base font-bold text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
        {description}
      </p>
      <span className="text-xs text-muted-foreground">
        {ui.articleCount(articleCount)}
      </span>
    </Link>
  );
}
