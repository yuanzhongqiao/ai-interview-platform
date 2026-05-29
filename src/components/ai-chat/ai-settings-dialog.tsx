"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OPEN_SOURCE_COMMUNITY_URL } from "@/lib/brand";
import { useEffect, useState } from "react";

export const AI_CONFIG_STORAGE_KEY = "aural.ai.chat.config";

export type AiChatConfig = {
  baseUrl: string;
  apiKey: string;
  model: string;
  systemName: string;
};

function defaultSystemName() {
  return process.env.NEXT_PUBLIC_AI_SYSTEM_NAME ?? "聆悟";
}

const DEFAULT_CONFIG: AiChatConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_AI_API_BASE_URL ??
    process.env.OPENAI_BASE_URL ??
    "https://api.openai.com/v1",
  apiKey: process.env.NEXT_PUBLIC_AI_API_KEY ?? "",
  model: process.env.NEXT_PUBLIC_AI_MODEL ?? "gpt-4.1",
  systemName: defaultSystemName(),
};

export function loadAiConfig(): AiChatConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw =
      localStorage.getItem(AI_CONFIG_STORAGE_KEY) ??
      localStorage.getItem("lingwu.ai.chat.config");
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveAiConfig(config: AiChatConfig) {
  localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config));
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export function AiSettingsDialog({ open, onOpenChange, onSaved }: Props) {
  const { t } = useAppLocale();
  const [config, setConfig] = useState<AiChatConfig>(DEFAULT_CONFIG);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    if (open) setConfig(loadAiConfig());
  }, [open]);

  const handleSave = () => {
    saveAiConfig(config);
    onSaved?.();
    onOpenChange(false);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `${config.baseUrl.replace(/\/$/, "")}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify({
            model: config.model,
            messages: [{ role: "user", content: "ping" }],
            max_tokens: 5,
          }),
        },
      );
      setTestResult(
        res.ok ? t("aiChat.testOk") : `${t("aiChat.testFail")}: ${res.status}`,
      );
    } catch (e) {
      setTestResult(
        e instanceof Error ? e.message : t("aiChat.testFail"),
      );
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("aiChat.settingsTitle")}</DialogTitle>
          <DialogDescription>{t("aiChat.settingsDesc")}</DialogDescription>
        </DialogHeader>
        <div className="api-key-tip rounded-lg border border-dashed bg-muted/40 p-3 text-sm">
          <p className="font-medium">{t("aiChat.apiKeyTipTitle")}</p>
          <p className="mt-1 text-muted-foreground">
            {t("aiChat.apiKeyTipBody")}{" "}
            <a
              href={OPEN_SOURCE_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {t("aiChat.communityLink")}
            </a>
          </p>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="ai-base">API Base URL</Label>
            <Input
              id="ai-base"
              value={config.baseUrl}
              onChange={(e) =>
                setConfig((c) => ({ ...c, baseUrl: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ai-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="ai-key"
                type={showKey ? "text" : "password"}
                value={config.apiKey}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, apiKey: e.target.value }))
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowKey((v) => !v)}
              >
                {showKey ? t("aiChat.hideKey") : t("aiChat.showKey")}
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Model</Label>
            <Select
              value={config.model}
              onValueChange={(model) => setConfig((c) => ({ ...c, model }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "gpt-4.1",
                  "gpt-3.5-turbo",
                  "deepseek-r1-distill-qwen-1.5b",
                  "moonshot-v1-32k",
                  "moonshot-v1-128k",
                  "glm-4",
                ].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {testResult && (
            <p className="text-sm text-muted-foreground">{testResult}</p>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleTest}
            disabled={testing}
          >
            {testing ? t("aiChat.testing") : t("aiChat.testConnection")}
          </Button>
          <Button type="button" onClick={handleSave}>
            {t("aiChat.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
