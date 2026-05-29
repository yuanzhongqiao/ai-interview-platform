/**
 * Volcengine Big-Model streaming ASR (Speech-to-Text) binary protocol.
 *
 * Endpoint: wss://openspeech.bytedance.com/api/v3/sauc/bigmodel
 * Docs:     https://www.volcengine.com/docs/6561/1354869
 *
 * Key differences from the standard /api/v2/asr:
 *   - Auth via X-Api-Resource-Id / X-Api-Access-Key / X-Api-App-Key headers
 *   - Sequence numbers in both client and server packets
 *   - SERVER_ACK (0b1011) message type
 *   - No app.appid/token/cluster in JSON; uses model_name in request
 */
import { randomUUID } from "crypto";
import { gunzipSync, gzipSync } from "zlib";

const PROTOCOL_VERSION = 0b0001;
const HEADER_SIZE_UNITS = 0b0001;

const CLIENT_FULL_REQUEST = 0b0001;
const CLIENT_AUDIO_ONLY = 0b0010;
const SERVER_FULL_RESPONSE = 0b1001;
const SERVER_ACK = 0b1011;
const SERVER_ERROR = 0b1111;

const FLAG_POS_SEQ = 0b0001;
const FLAG_NEG_WITH_SEQ = 0b0011;

const SERIAL_NONE = 0b0000;
const SERIAL_JSON = 0b0001;

const COMP_GZIP = 0b0001;

export const BIGMODEL_ASR_URL = "wss://openspeech.bytedance.com/api/v3/sauc/bigmodel";

/** Allowed X-Api-Resource-Id values per https://www.volcengine.com/docs/6561/1354869 */
export const ALLOWED_ASR_RESOURCE_IDS = [
  "volc.seedasr.sauc.duration",
  "volc.seedasr.sauc.concurrent",
  "volc.bigasr.sauc.duration",
  "volc.bigasr.sauc.concurrent",
] as const;

export type AsrResourceId = (typeof ALLOWED_ASR_RESOURCE_IDS)[number];

/**
 * Maps DOUBAO_ASR_RESOURCE_ID to a valid API resource id.
 * Console instance names (e.g. Doubao_Seed_ASR_Streaming_2.0…) must NOT be used here.
 */
export function resolveAsrResourceId(
  raw?: string,
  onWarn?: (message: string) => void,
): AsrResourceId {
  const trimmed = (raw || "").trim();
  const fallback: AsrResourceId = "volc.seedasr.sauc.duration";
  if (!trimmed) return fallback;
  if ((ALLOWED_ASR_RESOURCE_IDS as readonly string[]).includes(trimmed)) {
    return trimmed as AsrResourceId;
  }
  onWarn?.(
    `DOUBAO_ASR_RESOURCE_ID="${trimmed}" is not a valid API resource id ` +
      `(use volc.seedasr.sauc.duration for 豆包流式语音识别 2.0 小时版; ` +
      `do not paste the console instance id). Falling back to ${fallback}.`,
  );
  return fallback;
}

export function isAsr20ResourceId(resourceId: string): boolean {
  return resourceId.includes("seedasr");
}

/** Volc BigModel SERVER_ACK (0b1011). */
export const ASR_MSG_SERVER_ACK = SERVER_ACK;

/** Business codes that mean success in ASR JSON / ACK payloads. */
export function isAsrBusinessCodeOk(code?: number): boolean {
  return code == null || code === 0 || code === 1000 || code === 20000000;
}

/**
 * ASR 2.0-only request fields (enable_nonstream, ssd_version) break recognition on
 * volc.bigasr.* (ASR 1.0). Strip them unless resource id is seedasr.
 */
export function finalizeBigModelAsrConfig(
  resourceId: string,
  config: BigModelAsrConfig,
): BigModelAsrConfig {
  const out: BigModelAsrConfig = { ...config };
  if (isAsr20ResourceId(resourceId)) {
    out.enableNonstream = true;
    out.ssdVersion = "200";
    if (out.enableDdc === undefined) out.enableDdc = true;
  } else {
    delete out.enableNonstream;
    delete out.ssdVersion;
    if (out.enableDdc === undefined) out.enableDdc = false;
  }
  return out;
}

/**
 * API Key for ASR `X-Api-Key` (新版控制台).
 * Prefer DOUBAO_ASR_API_KEY from 控制台 → API Key 管理 — NOT 实例页 Secret Key.
 * @see https://www.volcengine.com/docs/6561/1816214
 */
export function resolveAsrApiKey(env: {
  asrApiKey?: string;
  apiKey?: string;
}): { key: string; source: "DOUBAO_ASR_API_KEY" | "DOUBAO_API_KEY" | "" } {
  const dedicated = (env.asrApiKey || "").trim();
  if (dedicated) return { key: dedicated, source: "DOUBAO_ASR_API_KEY" };
  const fallback = (env.apiKey || "").trim();
  if (fallback) return { key: fallback, source: "DOUBAO_API_KEY" };
  return { key: "", source: "" };
}

/**
 * Choose ASR handshake auth per https://www.volcengine.com/docs/6561/1354869
 * - 新版控制台 + ASR 2.0: X-Api-Key (API Key 管理) only
 * - 旧版控制台 / ASR 1.0: X-Api-App-Key + X-Api-Access-Key
 */
export function resolveAsrAuthMode(input: {
  authMode?: string;
  resourceId: string;
  apiKey?: string;
  appId?: string;
  accessToken?: string;
}): "api_key" | "app_token" {
  const authMode = (input.authMode || "auto").trim().toLowerCase();
  const apiKey = (input.apiKey || "").trim();
  const appId = (input.appId || "").trim();
  const accessToken = (input.accessToken || "").trim();
  const hasAppPair = !!(appId && accessToken);
  const isAsr20 = isAsr20ResourceId(input.resourceId);

  if (authMode === "api_key") return apiKey ? "api_key" : "app_token";
  if (authMode === "app_token") return "app_token";

  if (isAsr20 && apiKey) return "api_key";
  if (!hasAppPair && apiKey) return "api_key";
  return "app_token";
}

/** Actionable hint after failed WebSocket handshake. */
export function formatAsrHandshakeHint(
  statusCode: number,
  body: string,
  opts: { resourceId: string; authMode: "api_key" | "app_token" },
): string {
  const snippet = body.slice(0, 200);
  const lines = [`HTTP ${statusCode} — ${snippet}`];

  if (
    statusCode === 400 &&
    snippet.includes("not allowed") &&
    opts.authMode === "app_token" &&
    isAsr20ResourceId(opts.resourceId)
  ) {
    lines.push(
      "→ 新版控制台 + ASR 2.0 不能用 AppId+AccessToken；请设 DOUBAO_ASR_AUTH=api_key，" +
        "DOUBAO_ASR_API_KEY=控制台「API Key 管理」中的密钥",
    );
    lines.push("→ 文档: https://www.volcengine.com/docs/6561/1354869");
  } else if (statusCode === 401 && opts.authMode === "api_key") {
    lines.push(
      "→ X-Api-Key 无效：在豆包语音控制台「API Key 管理」创建/复制 API Key 到 DOUBAO_ASR_API_KEY",
    );
    lines.push(
      "→ 实例详情里的 Secret Key ≠ API Key；App ID / Access Token 也不能作为 X-Api-Key",
    );
    lines.push("→ 文档: https://www.volcengine.com/docs/6561/1816214");
  } else if (statusCode === 403 && snippet.includes("not granted")) {
    lines.push(
      "→ 账号未开通该资源：在控制台开通豆包流式语音识别 2.0 小时版，或改用 volc.bigasr.sauc.duration（仅 1.0）",
    );
  }

  return lines.join("\n");
}

export interface BigModelAsrConfig {
  language?: string;
  format?: string;
  rate?: number;
  bits?: number;
  channels?: number;
  codec?: string;
  modelName?: string;
  enableItn?: boolean;
  enablePunc?: boolean;
  enableDdc?: boolean;
  showUtterance?: boolean;
  resultType?: string;
  vadSegmentDuration?: number;
  endWindowSize?: number;
  forceToSpeechTime?: number;
  enableNonstream?: boolean;
  ssdVersion?: string;
  corpus?: Record<string, unknown>;
}

export function resolveBigModelAsrLanguage(language?: string): string | undefined {
  const normalized = language?.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized.startsWith("english") || normalized === "en" || normalized.startsWith("en-")) {
    return "en-US";
  }
  if (normalized.startsWith("ja") || normalized.includes("japanese") || normalized.includes("日本語")) {
    return "ja-JP";
  }
  return undefined;
}

export function buildBigModelHeaders(
  appId: string,
  accessToken: string,
  reqid: string,
  resourceId?: string,
  apiKey?: string,
): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Api-Resource-Id": resourceId || "volc.seedasr.sauc.duration",
    "X-Api-Request-Id": reqid,
    "X-Api-Connect-Id": randomUUID(),
  };
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  } else {
    headers["X-Api-Access-Key"] = accessToken;
    headers["X-Api-App-Key"] = appId;
  }
  return headers;
}

function buildHeader(
  messageType: number,
  flags: number,
  serialMethod: number,
  compression: number,
): Buffer {
  const buf = Buffer.alloc(4);
  buf[0] = (PROTOCOL_VERSION << 4) | HEADER_SIZE_UNITS;
  buf[1] = (messageType << 4) | flags;
  buf[2] = (serialMethod << 4) | compression;
  buf[3] = 0x00;
  return buf;
}

export function buildBigModelFullRequest(config: BigModelAsrConfig, uid: string): Buffer {
  const header = buildHeader(CLIENT_FULL_REQUEST, FLAG_POS_SEQ, SERIAL_JSON, COMP_GZIP);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const request: Record<string, any> = {
    model_name: config.modelName || "bigmodel",
    enable_itn: config.enableItn ?? false,
    enable_punc: config.enablePunc ?? true,
    enable_ddc: config.enableDdc ?? false,
    show_utterance: config.showUtterance ?? true,
    result_type: config.resultType || "single",
    vad_segment_duration: config.vadSegmentDuration ?? 3000,
    end_window_size: config.endWindowSize ?? 500,
    force_to_speech_time: config.forceToSpeechTime ?? 1000,
  };
  if (config.enableNonstream) request.enable_nonstream = true;
  if (config.ssdVersion) request.ssd_version = config.ssdVersion;
  if (config.corpus) request.corpus = config.corpus;

  const audio: Record<string, unknown> = {
    format: config.format || "pcm",
    rate: config.rate || 16000,
    bits: config.bits || 16,
    channels: config.channels || 1,
    codec: config.codec || "raw",
  };
  if (config.language) audio.language = config.language;

  const payload = {
    user: { uid },
    audio,
    request,
  };

  const compressed = gzipSync(Buffer.from(JSON.stringify(payload)));

  const seqBuf = Buffer.alloc(4);
  seqBuf.writeInt32BE(1);

  const sizeBuf = Buffer.alloc(4);
  sizeBuf.writeUInt32BE(compressed.length);

  return Buffer.concat([header, seqBuf, sizeBuf, compressed]);
}

/**
 * Wraps PCM audio in a Big-Model audio-only request with sequence number.
 * The final packet should set `isLast=true` and the sequence will be negated.
 */
export function buildBigModelAudioRequest(
  audioData: Buffer,
  sequence: number,
  isLast = false,
): Buffer {
  const flags = isLast ? FLAG_NEG_WITH_SEQ : FLAG_POS_SEQ;
  const header = buildHeader(CLIENT_AUDIO_ONLY, flags, SERIAL_NONE, COMP_GZIP);

  const compressed = gzipSync(audioData);

  const seqBuf = Buffer.alloc(4);
  seqBuf.writeInt32BE(isLast ? -sequence : sequence);

  const sizeBuf = Buffer.alloc(4);
  sizeBuf.writeUInt32BE(compressed.length);

  return Buffer.concat([header, seqBuf, sizeBuf, compressed]);
}

export interface AsrUtterance {
  text: string;
  definite: boolean;
  start_time?: number;
  end_time?: number;
}

export interface AsrResponse {
  messageType: number;
  isLastPackage?: boolean;
  sequence?: number;
  reqid?: string;
  code?: number;
  message?: string;
  text?: string;
  utterances?: AsrUtterance[];
  errorCode?: number;
  errorMessage?: string;
}

export function parseAsrResponse(data: Buffer): AsrResponse {
  if (!data || data.length < 4) return { messageType: 0 };

  const messageType = data[1] >> 4;
  const flags = data[1] & 0x0f;
  const compressionMethod = data[2] & 0x0f;
  const headerBytes = (data[0] & 0x0f) * 4;

  let body = data.subarray(headerBytes);
  const hasSeq = !!(flags & 0x01);
  const isLast = !!(flags & 0x02);

  let sequence: number | undefined;
  if (hasSeq && body.length >= 4) {
    sequence = body.readInt32BE(0);
    body = body.subarray(4);
  }

  if (messageType === SERVER_ACK) {
    let ackPayload: Record<string, unknown> | undefined;
    if (body.length >= 4) {
      const payloadSize = body.readUInt32BE(0);
      if (payloadSize > 0) {
        let payloadBuf = body.subarray(4, 4 + payloadSize);
        if (compressionMethod === COMP_GZIP && payloadBuf.length > 0) {
          try { payloadBuf = gunzipSync(payloadBuf); } catch { /* use raw */ }
        }
        try { ackPayload = JSON.parse(payloadBuf.toString("utf-8")); } catch { /* ignore */ }
      }
    }
    return {
      messageType,
      sequence,
      isLastPackage: isLast,
      code: ackPayload?.code as number | undefined,
      message: ackPayload?.message as string | undefined,
    };
  }

  if (messageType === SERVER_ERROR) {
    if (body.length >= 8) {
      const errorCode = body.readUInt32BE(0);
      const msgSize = body.readUInt32BE(4);
      let msgBuf = body.subarray(8, 8 + msgSize);
      if (compressionMethod === COMP_GZIP && msgBuf.length > 0) {
        try { msgBuf = gunzipSync(msgBuf); } catch { /* use raw */ }
      }
      return { messageType, errorCode, errorMessage: msgBuf.toString("utf-8"), sequence };
    }
    return { messageType, errorCode: -1, sequence };
  }

  if (messageType === SERVER_FULL_RESPONSE && body.length >= 4) {
    const payloadSize = body.readUInt32BE(0);
    let payloadBuf = body.subarray(4, 4 + payloadSize);

    if (compressionMethod === COMP_GZIP && payloadBuf.length > 0) {
      try { payloadBuf = gunzipSync(payloadBuf); } catch {
        return { messageType, errorCode: -2, errorMessage: "gzip decompression failed", sequence };
      }
    }

    try {
      const json = JSON.parse(payloadBuf.toString("utf-8"));
      return {
        messageType,
        isLastPackage: isLast,
        sequence,
        reqid: json.reqid,
        code: json.code,
        message: typeof json.message === "string" ? json.message : JSON.stringify(json.message),
        text: json.result?.text,
        utterances: json.result?.utterances,
      };
    } catch {
      return { messageType, errorCode: -3, errorMessage: `unparseable payload (${payloadBuf.length}B)`, sequence };
    }
  }

  return { messageType, sequence, isLastPackage: isLast };
}
