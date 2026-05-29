import { type LLMProvider } from "./types";
import { OpenAIProvider } from "./providers/openai";
import { GeminiProvider } from "./providers/gemini";
import { KimiProvider } from "./providers/kimi";
import { MinimaxProvider } from "./providers/minimax";

const providers = new Map<string, LLMProvider>();

function registerProvider(provider: LLMProvider) {
  providers.set(provider.id, provider);
}

function isConfiguredKey(value: string | undefined): boolean {
  const trimmed = value?.trim();
  if (!trimmed) return false;
  if (trimmed.toLowerCase() === "dummy") return false;
  return true;
}

/** Only instantiate providers with valid keys (OpenAI SDK throws on empty apiKey). */
if (isConfiguredKey(process.env.OPENAI_API_KEY)) {
  registerProvider(new OpenAIProvider());
}
if (isConfiguredKey(process.env.GEMINI_API_KEY)) {
  registerProvider(new GeminiProvider());
}
if (isConfiguredKey(process.env.KIMI_API_KEY)) {
  registerProvider(new KimiProvider());
}
if (isConfiguredKey(process.env.MINIMAX_API_KEY)) {
  registerProvider(new MinimaxProvider());
}

/** Resolve the right provider for a given model name or provider id. */
export function getProvider(idOrModel?: string | null): LLMProvider {
  if (idOrModel) {
    if (providers.has(idOrModel)) return providers.get(idOrModel)!;
    const allProviders = Array.from(providers.values());
    for (const p of allProviders) {
      if (p.models.some((m: string) => m.toLowerCase() === idOrModel.toLowerCase())) {
        return p;
      }
    }
    // Custom model id (e.g. deepseek-v4-flash via OPENAI-compatible API)
    if (providers.has("openai")) return providers.get("openai")!;
  }
  // Default fallback order: openai → gemini → kimi → minimax
  if (providers.has("openai")) return providers.get("openai")!;
  if (providers.has("gemini")) return providers.get("gemini")!;
  if (providers.has("kimi")) return providers.get("kimi")!;
  if (providers.has("minimax")) return providers.get("minimax")!;
  throw new Error("No LLM provider configured. Set OPENAI_API_KEY, GEMINI_API_KEY, KIMI_API_KEY, or MINIMAX_API_KEY.");
}

export function listProviders(): LLMProvider[] {
  return Array.from(providers.values());
}

/**
 * Model used for post-interview report generation.
 * Falls back through available providers.
 */
export const REPORT_MODEL =
  process.env.AI_REPORT_MODEL?.trim() ||
  (isConfiguredKey(process.env.OPENAI_API_KEY)
    ? "gpt-4o"
    : isConfiguredKey(process.env.GEMINI_API_KEY)
      ? "gemini-3.1-flash-lite"
      : isConfiguredKey(process.env.KIMI_API_KEY)
        ? "kimi-k2.5"
        : "MiniMax-M2.1-lightning");

/**
 * Model used for interview question generation and refinement.
 */
export const GENERATOR_MODEL =
  process.env.AI_GENERATOR_MODEL?.trim() ||
  (isConfiguredKey(process.env.OPENAI_API_KEY)
    ? "gpt-4o-mini"
    : isConfiguredKey(process.env.GEMINI_API_KEY)
      ? "gemini-3.1-flash-lite"
      : isConfiguredKey(process.env.KIMI_API_KEY)
        ? "moonshot-v1-8k"
        : "MiniMax-M2.1-lightning");

export const PRIMARY_GENERATOR_MODEL = GENERATOR_MODEL;

export const FALLBACK_GENERATOR_MODEL = process.env.MINIMAX_API_KEY
  ? "MiniMax-M2.1-lightning"
  : process.env.KIMI_API_KEY
    ? "moonshot-v1-8k"
    : GENERATOR_MODEL;
