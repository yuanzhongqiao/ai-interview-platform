"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Loader2,
  Lock,
} from "lucide-react";
import { useCallback, useState } from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interviewId: string;
  publicSlug: string | null;
  isPublic: boolean;
}

export function ShareModal({
  open,
  onOpenChange,
  interviewId,
  publicSlug,
  isPublic,
}: ShareModalProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [justPublished, setJustPublished] = useState(false);

  const publishMutation = trpc.interview.publish.useMutation();
  const updateMutation = trpc.interview.update.useMutation();

  const published = isPublic || justPublished;
  const shareUrl = publicSlug
    ? `${window.location.origin}/i/${publicSlug}`
    : "";

  const handleCreateLink = useCallback(async () => {
    setPublishing(true);
    try {
      const result = await publishMutation.mutateAsync({ id: interviewId });
      await updateMutation.mutateAsync({ id: interviewId, requireInvite: false });
      utils.interview.getById.invalidate({ id: interviewId });
      setJustPublished(true);

      const url = `${window.location.origin}/i/${result.slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "Shareable link created and copied" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to create link", variant: "destructive" });
    } finally {
      setPublishing(false);
    }
  }, [interviewId, publishMutation, updateMutation, utils, toast]);

  const handleCopy = useCallback(async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl, toast]);

  const handlePreview = useCallback(() => {
    if (publicSlug) {
      window.open(`/i/${publicSlug}?preview=true`, "_blank");
    }
  }, [publicSlug]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setJustPublished(false);
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-md gap-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-base">Share interview</DialogTitle>
          <DialogDescription className="sr-only">
            Share the link or preview the interview.
          </DialogDescription>
        </DialogHeader>

        {!published ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-6 px-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">This interview is invite-only</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Create a shareable link so anyone with the link can start the interview.
                </p>
              </div>
              <Button
                className="mt-1 gap-2"
                onClick={handleCreateLink}
                disabled={publishing}
              >
                {publishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                Create shareable link
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            <div className="relative">
              <Input
                readOnly
                value={shareUrl || "Publishing..."}
                className="pr-24 text-sm bg-muted/50 border-border/60 text-muted-foreground"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-0.5 top-1/2 -translate-y-1/2 h-7 gap-1.5 text-xs"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>

            {publicSlug && (
              <div className="pt-4">
                <button
                  onClick={handlePreview}
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  Preview as candidate
                </button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
