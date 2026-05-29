"use client";

import type { Audience } from "@/content/docs/types";
import { useAppLocale } from "@/components/app-locale-provider";
import { getDocsUi } from "@/lib/i18n/docs-ui";
import { cn } from "@/lib/utils";

const styles: Record<
  Audience,
  { className: string; label: (ui: ReturnType<typeof getDocsUi>) => string }
> = {
  creators: {
    className: "bg-primary/10 text-primary border-primary/20",
    label: (ui) => ui.audienceCreators(),
  },
  interviewees: {
    className: "bg-accent/10 text-accent border-accent/30",
    label: (ui) => ui.audienceInterviewees(),
  },
  both: {
    className: "bg-secondary text-secondary-foreground border-border",
    label: (ui) => ui.audienceBoth(),
  },
};

export function AudienceBadge({ audience }: { audience: Audience }) {
  const { locale } = useAppLocale();
  const ui = getDocsUi(locale);
  const style = styles[audience];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        style.className,
      )}
    >
      {style.label(ui)}
    </span>
  );
}
