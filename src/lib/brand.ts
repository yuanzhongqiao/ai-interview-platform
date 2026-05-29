import type { Metadata } from "next";

/** Public brand & link constants (聆悟 / Lingwu). */
export const OPEN_SOURCE_COMMUNITY_URL = "https://www.gitcc.com/";

/** @deprecated Use OPEN_SOURCE_COMMUNITY_URL */
export const AURAL_REPO_URL = OPEN_SOURCE_COMMUNITY_URL;
export const AURAL_REPO_ISSUES_URL = OPEN_SOURCE_COMMUNITY_URL;
export const AURAL_DEMO_EMAIL = "demo@lingwu.local";
export const AURAL_DEMO_PASSWORD = "Demo123456";

/**
 * 聆悟品牌图标（全局写死，勿用环境变量覆盖）。
 * 源文件：public/brand-icons/lingwu-icon-ear-analytics.png
 * 页签图标：src/app/icon.png、src/app/apple-icon.png（与下同图）
 */
export const BRAND_ICON_PATH = "/brand-icons/lingwu-icon-ear-analytics.png";

/** @deprecated Use BRAND_ICON_PATH */
export const BRAND_LOGO_URL = BRAND_ICON_PATH;
/** @deprecated Use BRAND_ICON_PATH */
export const BRAND_MARK_IMAGE_PATH = BRAND_ICON_PATH;
/** @deprecated Use BRAND_ICON_PATH */
export const BRAND_FAVICON_PATH = BRAND_ICON_PATH;

function readPublicEnv(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value || fallback;
}

/** Chinese display name (default). */
export const BRAND_NAME_ZH = readPublicEnv("NEXT_PUBLIC_BRAND_NAME", "聆悟");

/** English / pinyin display name. */
export const BRAND_NAME_EN = readPublicEnv("NEXT_PUBLIC_BRAND_NAME_EN", "Lingwu");

export const BRAND_MARK_ZH = readPublicEnv("NEXT_PUBLIC_BRAND_MARK", BRAND_NAME_ZH);
export const BRAND_MARK_EN = readPublicEnv(
  "NEXT_PUBLIC_BRAND_MARK_EN",
  BRAND_NAME_EN,
);

/** @deprecated Use getBrandName() — kept for SSR defaults (Chinese). */
export const BRAND_NAME = BRAND_NAME_ZH;
/** @deprecated Use getBrandMark() */
export const BRAND_MARK = BRAND_MARK_ZH;

const DEFAULT_TAGLINE_ZH =
  "结构化语音、文字与视频 AI 面试平台";
const DEFAULT_TAGLINE_EN =
  "AI interview platform for structured voice, chat, and video interviews.";

export const BRAND_TAGLINE_ZH = readPublicEnv(
  "NEXT_PUBLIC_BRAND_TAGLINE",
  DEFAULT_TAGLINE_ZH,
);
export const BRAND_TAGLINE_EN = readPublicEnv(
  "NEXT_PUBLIC_BRAND_TAGLINE_EN",
  DEFAULT_TAGLINE_EN,
);

export function isChineseBrandLocale(language?: string | null): boolean {
  if (!language) return true;
  const n = language.trim().toLowerCase();
  return n === "zh" || n.startsWith("zh-") || n.includes("chinese") || n.includes("中文");
}

export function getBrandName(language?: string | null): string {
  return isChineseBrandLocale(language) ? BRAND_NAME_ZH : BRAND_NAME_EN;
}

export function getBrandMark(language?: string | null): string {
  return isChineseBrandLocale(language) ? BRAND_MARK_ZH : BRAND_MARK_EN;
}

export function getBrandTagline(language?: string | null): string {
  return isChineseBrandLocale(language) ? BRAND_TAGLINE_ZH : BRAND_TAGLINE_EN;
}

export function formatPageTitle(
  pageTitle?: string | null,
  language?: string | null,
): string {
  const brand = getBrandName(language);
  const segment = pageTitle?.trim();
  if (segment) return `${segment} · ${brand}`;
  return brand;
}

export function getBrandIcons(): NonNullable<Metadata["icons"]> {
  return {
    icon: [
      { url: BRAND_ICON_PATH, type: "image/png" },
      { url: BRAND_ICON_PATH, sizes: "any" },
    ],
    shortcut: BRAND_ICON_PATH,
    apple: BRAND_ICON_PATH,
  };
}

export function getSiteMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const titleDefault = `${BRAND_NAME_ZH} · ${BRAND_TAGLINE_ZH}`;
  const titleDefaultEn = `${BRAND_NAME_EN} · ${BRAND_TAGLINE_EN}`;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: BRAND_NAME_ZH,
    title: {
      default: titleDefault,
      template: `%s · ${BRAND_NAME_ZH}`,
    },
    description: `${BRAND_NAME_ZH} — ${BRAND_TAGLINE_ZH}`,
    icons: getBrandIcons(),
    keywords: [
      "AI interview platform",
      "聆悟",
      "Lingwu",
      "voice interview",
      "AI interviews",
    ],
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      siteName: BRAND_NAME_ZH,
      title: titleDefault,
      description: titleDefaultEn,
      url: siteUrl,
      images: [
        {
          url: `${siteUrl}/images/marketing/hero-screenshots.webp`,
          width: 1920,
          height: 960,
          alt: `${BRAND_NAME_ZH} AI Interview Platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: BRAND_NAME_ZH,
      description: BRAND_TAGLINE_ZH,
      images: [`${siteUrl}/images/marketing/hero-screenshots.webp`],
    },
  };
}

/** Candidate-facing routes (`/i/*`). */
export function getCandidateMetadata(pageTitle?: string): Metadata {
  return {
    title: formatPageTitle(pageTitle),
    description: BRAND_TAGLINE_ZH,
    applicationName: BRAND_NAME_ZH,
    icons: getBrandIcons(),
  };
}
