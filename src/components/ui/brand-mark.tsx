"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { AuralLogo } from "@/components/ui/aural-logo";
import { getBrandMark } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: number;
  showName?: boolean;
  className?: string;
  nameClassName?: string;
  /** Interview / page language override (e.g. from interview settings). */
  language?: string | null;
}

export function BrandMark({
  size = 28,
  showName = true,
  className,
  nameClassName,
  language,
}: BrandMarkProps) {
  const { locale } = useAppLocale();
  const mark = getBrandMark(
    language ?? (locale === "zh" ? "zh" : locale === "ja" ? "ja" : "en"),
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <AuralLogo size={size} className="shrink-0" language={language} />
      {showName ? (
        <span
          className={cn(
            "font-heading text-base font-bold tracking-tight",
            nameClassName,
          )}
        >
          {mark}
        </span>
      ) : null}
    </div>
  );
}
