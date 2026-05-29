"use client";

import { BrandMark } from "@/components/ui/brand-mark";
import { useBrandDocumentTitle } from "@/hooks/use-brand-document-title";
import { Loader2 } from "lucide-react";

export function PreparingScreen({
  title = "Preparing your interview...",
  description = "This will only take a moment.",
  pageTitle,
}: {
  title?: string;
  description?: string;
  /** Sets browser tab to `{pageTitle} · {brand}`. */
  pageTitle?: string | null;
}) {
  useBrandDocumentTitle(pageTitle);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-card px-6">
        <BrandMark size={28} />
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
