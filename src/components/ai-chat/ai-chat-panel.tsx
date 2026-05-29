"use client";

import { AiSettingsDialog, loadAiConfig } from "@/components/ai-chat/ai-settings-dialog";
import { useAppLocale } from "@/components/app-locale-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Settings, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const HISTORY_KEY = "aural.ai.chat.history";

export function AiChatPanel() {
  const { t } = useAppLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const config = loadAiConfig();
    if (!config.apiKey) {
      setError(t("aiChat.needApiKey"));
      setSettingsOpen(true);
      return;
    }
    setError(null);
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    const systemPrompt = t("aiChat.systemPrompt", {
      name: config.systemName || t("brand.name"),
    });
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
            stream: true,
            messages: [
              { role: "system", content: systemPrompt },
              ...next.map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
          signal: AbortSignal.timeout(30_000),
        },
      );
      if (!res.ok || !res.body) {
        throw new Error(`API 错误: ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            assistant += delta;
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "assistant", content: assistant };
              return copy;
            });
          } catch {
            /* partial json */
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "请求失败");
      setMessages((m) => m.filter((_, i) => i !== m.length - 1 || m[m.length - 1].role !== "assistant"));
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, t]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="font-heading text-lg font-semibold">{t("aiChat.title")}</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("aiChat.clearAria")}
            onClick={() => {
              setMessages([]);
              localStorage.removeItem(HISTORY_KEY);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("aiChat.settingsAria")}
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            {t("aiChat.hint")}
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
              m.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted",
            )}
          >
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("aiChat.thinking")}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {error && (
        <p className="px-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="border-t p-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("aiChat.inputPlaceholder")}
          rows={3}
          className="resize-none"
        />
        <Button className="mt-2 w-full" onClick={() => void send()} disabled={loading}>
          {t("aiChat.send")}
        </Button>
      </div>
      <AiSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSaved={() => setError(null)}
      />
    </div>
  );
}
