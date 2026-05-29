#!/usr/bin/env node
/**
 * Stream PCM to Volcengine BigModel ASR and print recognition events.
 * Verifies volc.bigasr (1.0) works without ASR 2.0-only request fields.
 *
 * Usage: pnpm run check:doubao-asr-stream
 */
import { config } from "dotenv";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import WebSocket from "ws";

const require = createRequire(import.meta.url);
const {
  BIGMODEL_ASR_URL,
  buildBigModelAudioRequest,
  buildBigModelFullRequest,
  buildBigModelHeaders,
  finalizeBigModelAsrConfig,
  isAsrBusinessCodeOk,
  parseAsrResponse,
  resolveAsrApiKey,
  resolveAsrAuthMode,
  resolveAsrResourceId,
  ASR_MSG_SERVER_ACK,
} = require("../server/volcengine-asr.ts");

config({ path: ".env.local", override: true });
config({ path: ".env" });

const appId = (process.env.DOUBAO_APP_ID || "").trim();
const accessToken = (process.env.DOUBAO_ACCESS_TOKEN || "").trim();
const apiKeyResolved = resolveAsrApiKey({
  asrApiKey: process.env.DOUBAO_ASR_API_KEY,
  apiKey: process.env.DOUBAO_API_KEY,
});
const resourceId = resolveAsrResourceId(process.env.DOUBAO_ASR_RESOURCE_ID, (m) =>
  console.warn(m),
);
const authMode = resolveAsrAuthMode({
  authMode: process.env.DOUBAO_ASR_AUTH,
  resourceId,
  apiKey: apiKeyResolved.key,
  appId,
  accessToken,
});

function buildHeaders(reqid) {
  if (authMode === "api_key" && apiKeyResolved.key) {
    return buildBigModelHeaders("", "", reqid, resourceId, apiKeyResolved.key);
  }
  return buildBigModelHeaders(appId, accessToken, reqid, resourceId, "");
}

/** ~0.25s of 440Hz tone at 16kHz int16 — enough to trigger VAD on most accounts. */
function makeTonePcm(durationMs = 250) {
  const sampleRate = 16000;
  const n = Math.floor((sampleRate * durationMs) / 1000);
  const buf = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * 440 * t) * 0.25;
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(sample * 32767))), i * 2);
  }
  return buf;
}

async function main() {
  console.log("=== Doubao ASR streaming probe ===\n");
  console.log(`resource=${resourceId} auth=${authMode} asr20=${resourceId.includes("seedasr")}\n`);

  if (authMode === "api_key" && !apiKeyResolved.key) {
    console.error("Missing API key for api_key auth");
    process.exit(1);
  }
  if (authMode === "app_token" && !(appId && accessToken)) {
    console.error("Missing DOUBAO_APP_ID / DOUBAO_ACCESS_TOKEN");
    process.exit(1);
  }

  const reqid = randomUUID().replace(/-/g, "");
  const headers = buildHeaders(reqid);
  const asrConfig = finalizeBigModelAsrConfig(resourceId, {
    format: "pcm",
    rate: 16000,
    bits: 16,
    channels: 1,
    codec: "raw",
    showUtterance: true,
    resultType: "full",
    enablePunc: true,
    endWindowSize: 800,
    forceToSpeechTime: 0,
  });

  const ws = new WebSocket(BIGMODEL_ASR_URL, { headers });
  let seq = 1;
  let textEvents = 0;
  let inbound = 0;

  const done = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      ws.close();
      resolve({ timedOut: true });
    }, 15000);

    ws.on("open", () => {
      console.log("WebSocket open — sending init");
      ws.send(buildBigModelFullRequest(asrConfig, reqid));

      const tone = makeTonePcm(400);
      let sent = 0;
      const sendInterval = setInterval(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          clearInterval(sendInterval);
          return;
        }
        sent++;
        seq++;
        ws.send(buildBigModelAudioRequest(tone, seq));
        if (sent >= 8) {
          clearInterval(sendInterval);
          seq++;
          ws.send(buildBigModelAudioRequest(Buffer.alloc(0), seq, true));
          console.log("Sent end-of-stream packet");
        }
      }, 300);
    });

    ws.on("message", (data) => {
      inbound++;
      const resp = parseAsrResponse(Buffer.from(data));
      const type = resp.messageType;

      if (type === ASR_MSG_SERVER_ACK) {
        const ok = isAsrBusinessCodeOk(resp.code);
        console.log(`ACK #${inbound}: code=${resp.code ?? "-"} ${ok ? "ok" : "ERROR"} ${resp.message ?? ""}`);
        if (!ok) {
          clearTimeout(timer);
          ws.close();
          reject(new Error(`ASR ACK error code=${resp.code}`));
        }
        return;
      }

      if (resp.errorCode != null) {
        console.error(`Protocol error: ${resp.errorCode} ${resp.errorMessage}`);
        return;
      }

      if (resp.code != null && !isAsrBusinessCodeOk(resp.code)) {
        console.error(`Business error: code=${resp.code} ${resp.message}`);
        return;
      }

      const parts = [];
      if (resp.utterances) {
        for (const u of resp.utterances) {
          if (u.text) parts.push({ text: u.text, definite: !!u.definite });
        }
      } else if (resp.text) {
        parts.push({ text: resp.text, definite: !!resp.isLastPackage });
      }

      if (parts.length) {
        textEvents++;
        for (const p of parts) {
          console.log(`TEXT #${textEvents}: definite=${p.definite} "${p.text}"`);
        }
      } else {
        console.log(`MSG #${inbound}: type=${type} code=${resp.code ?? "-"}`);
      }

      if (resp.isLastPackage) {
        clearTimeout(timer);
        ws.close();
        resolve({ timedOut: false, textEvents, inbound });
      }
    });

    ws.on("unexpected-response", (_req, res) => {
      clearTimeout(timer);
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
      });
    });

    ws.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });

  try {
    const result = await done;
    console.log("\n--- Result ---");
    console.log(`inboundMessages=${result.inbound} textEvents=${result.textEvents} timedOut=${!!result.timedOut}`);
    if (result.textEvents > 0) {
      console.log("OK: ASR returned recognition text");
      process.exit(0);
    }
    console.warn(
      "WARN: No text from ASR (tone may not count as speech — try voice interview in browser)",
    );
    process.exit(result.timedOut ? 1 : 0);
  } catch (err) {
    console.error("FAIL:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
