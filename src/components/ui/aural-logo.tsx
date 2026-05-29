import { BRAND_ICON_PATH, getBrandName } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface AuralLogoProps {
  size?: number;
  className?: string;
  language?: string | null;
}

/** 聆悟品牌图标（PNG，全局统一）。 */
export function AuralLogo({ size = 32, className, language }: AuralLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND_ICON_PATH}
      alt={`${getBrandName(language)} logo`}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-lg object-contain", className)}
      role="img"
    />
  );
}
