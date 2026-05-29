"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { useProject } from "@/components/project-provider";
import {
  PracticeSessionsDashboard,
  type PracticeSessionSummary,
} from "@/components/prep/practice-sessions-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/client";

export default function PracticesPage() {
  const { t } = useAppLocale();
  const { currentProject, isLoading: projectLoading } = useProject();
  const projectId = currentProject?.id;
  const practices = trpc.prep.listSessions.useQuery(
    { projectId: projectId ?? undefined },
    { enabled: !!projectId },
  );

  if (projectLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[420px]" />
      </div>
    );
  }

  const subtitle = currentProject
    ? t("practices.subtitleProject").replace("{name}", currentProject.name)
    : t("practices.subtitleDefault");

  return (
    <PracticeSessionsDashboard
      title={t("practices.title")}
      subtitle={subtitle}
      rows={(practices.data?.sessions ?? []) as PracticeSessionSummary[]}
      isLoading={practices.isLoading}
      showMetrics={false}
    />
  );
}
