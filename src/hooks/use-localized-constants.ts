"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { useMemo } from "react";

export function useLocalizedConstants() {
  const { t } = useAppLocale();

  return useMemo(
    () => ({
      languages: [
        { value: "en", label: t("constants.lang.en") },
        { value: "zh", label: t("constants.lang.zh") },
        { value: "ja", label: t("constants.lang.ja") },
        { value: "es", label: t("constants.lang.es") },
        { value: "fr", label: t("constants.lang.fr") },
      ],
      tones: [
        { value: "CASUAL", label: t("constants.tone.casual") },
        { value: "PROFESSIONAL", label: t("constants.tone.professional") },
        { value: "FORMAL", label: t("constants.tone.formal") },
        { value: "FRIENDLY", label: t("constants.tone.friendly") },
      ],
      followUpDepths: [
        {
          value: "LIGHT",
          label: t("constants.followUp.light"),
          description: t("constants.followUp.lightDesc"),
        },
        {
          value: "MODERATE",
          label: t("constants.followUp.moderate"),
          description: t("constants.followUp.moderateDesc"),
        },
        {
          value: "DEEP",
          label: t("constants.followUp.deep"),
          description: t("constants.followUp.deepDesc"),
        },
      ],
    }),
    [t],
  );
}
