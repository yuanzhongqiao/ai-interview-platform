import type { ReactNode } from "react";
import { isValidElement, Children } from "react";
import type { DocCategory, DocArticle } from "./types";
import type { DocsLocale } from "@/lib/docs/locale";
import {
  resolveArticleDescription,
  resolveArticleTitle,
  resolveArticleContent,
} from "@/lib/docs/locale";

import { gettingStartedArticles } from "./getting-started";
import { creatingInterviewsArticles } from "./creating-interviews";
import { managingCandidatesArticles } from "./managing-candidates";
import { practicesArticles } from "./practices";
import { takingAnInterviewArticles } from "./taking-an-interview";
import { resultsAnalyticsArticles } from "./results-analytics";
import { teamsOrganizationsArticles } from "./teams-organizations";
import { accountSecurityArticles } from "./account-security";
import { troubleshootingArticles } from "./troubleshooting";
import { faqArticles } from "./faq";

export const categories: DocCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    titleZh: "快速入门",
    titleJa: "はじめに",
    description: "Learn the basics of Lingwu and set up your first interview",
    descriptionZh: "了解聆悟基础能力，并完成第一次 AI 面试配置",
    descriptionJa: "Lingwu の基本と最初の AI 面接のセットアップ",
    iconName: "Rocket",
    audience: "both",
    order: 1,
  },
  {
    slug: "creating-interviews",
    title: "Creating Interviews",
    titleZh: "创建面试",
    titleJa: "面接の作成",
    description: "Design interviews with AI or build them manually",
    descriptionZh: "使用 AI 生成或手动设计结构化面试",
    descriptionJa: "AI または手動で構造化面接を設計",
    iconName: "PenTool",
    audience: "creators",
    order: 2,
  },
  {
    slug: "managing-candidates",
    title: "Managing Candidates",
    titleZh: "候选人管理",
    titleJa: "候補者管理",
    description: "Add candidates, share links, and track sessions",
    descriptionZh: "添加候选人、分享链接并跟踪面试进度",
    descriptionJa: "候補者の追加、リンク共有、セッション追跡",
    iconName: "Users",
    audience: "creators",
    order: 3,
  },
  {
    slug: "taking-an-interview",
    title: "Taking an Interview",
    titleZh: "参加面试",
    titleJa: "面接を受ける",
    description: "Guide for interviewees on voice, chat, and video sessions",
    descriptionZh: "候选人语音、文字与视频面试操作指南",
    descriptionJa: "候補者向け：音声・チャット・動画面接ガイド",
    iconName: "Mic",
    audience: "interviewees",
    order: 4,
  },
  {
    slug: "practices",
    title: "Practices",
    titleZh: "模拟练习",
    titleJa: "練習",
    description: "Rehearse existing interviews with voice coaching, AI feedback, suggested answers, and progress tracking",
    descriptionZh: "语音陪练、AI 反馈、参考答案与进度跟踪",
    descriptionJa: "音声コーチング、AI フィードバック、模範回答、進捗管理",
    iconName: "BrainCircuit",
    audience: "creators",
    order: 5,
  },
  {
    slug: "results-analytics",
    title: "Results & Analytics",
    titleZh: "结果与分析",
    titleJa: "結果と分析",
    description: "Review transcripts, AI insights, and export reports",
    descriptionZh: "查看转录、AI 洞察并导出报告",
    descriptionJa: "文字起こし、AI インサイト、レポートエクスポート",
    iconName: "BarChart3",
    audience: "creators",
    order: 6,
  },
  {
    slug: "teams-organizations",
    title: "Teams & Organizations",
    titleZh: "团队与组织",
    titleJa: "チームと組織",
    description: "Collaborate with your team and manage projects",
    descriptionZh: "团队协作与项目管理",
    descriptionJa: "チーム協業とプロジェクト管理",
    iconName: "Building2",
    audience: "creators",
    order: 7,
  },
  {
    slug: "account-security",
    title: "Account & Security",
    titleZh: "账户与安全",
    titleJa: "アカウントとセキュリティ",
    description: "Manage your profile, password, and data privacy",
    descriptionZh: "管理个人资料、密码与数据隐私",
    descriptionJa: "プロフィール、パスワード、データプライバシーの管理",
    iconName: "Shield",
    audience: "both",
    order: 8,
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    titleZh: "故障排查",
    titleJa: "トラブルシューティング",
    description: "Fix common issues with audio, video, and connectivity",
    descriptionZh: "解决音频、视频与连接常见问题",
    descriptionJa: "音声・動画・接続の一般的な問題の解決",
    iconName: "Wrench",
    audience: "both",
    order: 9,
  },
  {
    slug: "faq",
    title: "FAQ",
    titleZh: "常见问题",
    titleJa: "よくある質問",
    description: "Answers to frequently asked questions",
    descriptionZh: "关于聆悟的常见问题解答",
    descriptionJa: "Lingwu に関するよくある質問",
    iconName: "HelpCircle",
    audience: "both",
    order: 10,
  },
];

const allArticles: DocArticle[] = [
  ...gettingStartedArticles,
  ...creatingInterviewsArticles,
  ...managingCandidatesArticles,
  ...takingAnInterviewArticles,
  ...practicesArticles,
  ...resultsAnalyticsArticles,
  ...teamsOrganizationsArticles,
  ...accountSecurityArticles,
  ...troubleshootingArticles,
  ...faqArticles,
];

export function getCategory(slug: string): DocCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryArticles(categorySlug: string): DocArticle[] {
  return allArticles
    .filter((a) => a.categorySlug === categorySlug)
    .sort((a, b) => a.order - b.order);
}

export function getArticle(
  categorySlug: string,
  articleSlug: string
): DocArticle | undefined {
  return allArticles.find(
    (a) => a.categorySlug === categorySlug && a.slug === articleSlug
  );
}

export interface SearchResult {
  article: DocArticle;
  snippet?: string;
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (isValidElement(node)) {
    const { children, title, alt } = node.props as Record<string, unknown>;
    const parts: string[] = [];
    if (typeof title === "string") parts.push(title);
    if (typeof alt === "string") parts.push(alt);
    if (children != null) {
      Children.forEach(children as ReactNode, (child) => {
        parts.push(extractText(child));
      });
    }
    return parts.join(" ");
  }
  return "";
}

const textCache = new Map<string, string>();

function getArticleText(article: DocArticle, locale: DocsLocale = "en"): string {
  const key = `${article.categorySlug}/${article.slug}/${locale}`;
  let text = textCache.get(key);
  if (text == null) {
    text = extractText(resolveArticleContent(article, locale)())
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    textCache.set(key, text);
  }
  return text;
}

function buildSnippet(text: string, query: string): string | undefined {
  const idx = text.indexOf(query);
  if (idx === -1) return undefined;
  const radius = 60;
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet += "...";
  return snippet;
}

export function searchArticles(
  query: string,
  locale: DocsLocale = "en",
): SearchResult[] {
  const lower = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const article of allArticles) {
    const titleMatch = resolveArticleTitle(article, locale)
      .toLowerCase()
      .includes(lower);
    const descMatch = resolveArticleDescription(article, locale)
      .toLowerCase()
      .includes(lower);
    if (titleMatch || descMatch) {
      results.push({ article });
      continue;
    }

    const bodyText = getArticleText(article, locale);
    const snippet = buildSnippet(bodyText, lower);
    if (snippet) {
      results.push({ article, snippet });
    }
  }

  return results;
}
