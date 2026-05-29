import type { ReactNode } from "react";

export type Audience = "creators" | "interviewees" | "both";

export interface DocCategory {
  slug: string;
  title: string;
  titleZh?: string;
  titleJa?: string;
  description: string;
  descriptionZh?: string;
  descriptionJa?: string;
  iconName: string;
  audience: Audience;
  order: number;
}

export interface DocArticle {
  slug: string;
  categorySlug: string;
  title: string;
  titleZh?: string;
  titleJa?: string;
  description: string;
  descriptionZh?: string;
  descriptionJa?: string;
  audience: Audience;
  order: number;
  content: () => ReactNode;
  contentZh?: () => ReactNode;
  contentJa?: () => ReactNode;
}
