#!/usr/bin/env node
/**
 * Probe Volcengine BigModel ASR credentials / resource IDs.
 * @see https://www.volcengine.com/docs/6561/1354869
 *
 * Usage: pnpm run check:doubao-asr
 */
import { config } from "dotenv";
import { randomUUID } from "node:crypto";
import WebSocket from "ws";
import { maskHeaders, maskSecret } from "./lib/volc-mask.mjs";

config({ path: ".env.local", override: true });
config({ path: ".env" });

const appId = (process.env.DOUBAO_APP_ID || "").trim();
const accessToken = (process.env.DOUBAO_ACCESS_TOKEN || "").trim();
const asrApiKey = (process.env.DOUBAO_ASR_API_KEY || "").trim();
const genericApiKey = (process.env.DOUBAO_API_KEY || "").trim();
const apiKey = asrApiKey || genericApiKey;
const asrAuth = (process.env.DOUBAO_ASR_AUTH || "auto").trim();
const asrResourceEnv = (process.env.DOUBAO_ASR_RESOURCE_ID || "").trim();
const url = "wss://openspeech.bytedance.com/api/v3/sauc/bigmodel";

const resourceIds = [
  "volc.seedasr.sauc.duration",
  "volc.seedasr.sauc.concurrent",
  "volc.bigasr.sauc.duration",
  "volc.bigasr.sauc.concurrent",
];

function printEnvSummary() {
  console.log("=== Doubao ASR WebSocket probe ===");
  console.log("Doc: https://www.volcengine.com/docs/6561/1354869\n");
  console.log("Env (masked):");
  console.log(`  DOUBAO_APP_ID=${maskSecret(appId)}`);
  console.log(`  DOUBAO_ACCESS_TOKEN=${maskSecret(accessToken)}`);
  console.log(`  DOUBAO_ASR_API_KEY=${maskSecret(asrApiKey)}${asrApiKey ? "" : " (empty)"}`);
  console.log(`  DOUBAO_API_KEY=${maskSecret(genericApiKey)}${genericApiKey ? "" : " (empty)"}`);
  console.log(`  effective X-Api-Key source=${asrApiKey ? "DOUBAO_ASR_API_KEY" : genericApiKey ? "DOUBAO_API_KEY" : "none"}`);
  console.log(`  DOUBAO_ASR_AUTH=${asrAuth || "(auto)"}`);
  console.log(`  DOUBAO_ASR_RESOURCE_ID=${asrResourceEnv || "(default volc.seedasr.sauc.duration)"}`);
  console.log(`  WebSocket URL=${url}\n`);
}

function buildHeaders(resourceId, mode) {
  const reqid = randomUUID().replace(/-/g, "");
  const connectId = randomUUID();
  const h = {
    "X-Api-Resource-Id": resourceId,
    "X-Api-Request-Id": reqid,
    "X-Api-Connect-Id": connectId,
  };
  if (mode === "api_key" && apiKey) {
    h["X-Api-Key"] = apiKey;
  } else if (appId && accessToken) {
    h["X-Api-App-Key"] = appId;
    h["X-Api-Access-Key"] = accessToken;
  } else if (apiKey) {
    h["X-Api-Key"] = apiKey;
  }
  return { headers: h, reqid, connectId };
}

function probe(resourceId, mode) {
  const { headers, reqid, connectId } = buildHeaders(resourceId, mode);
  console.log(`\n--- Probe [${mode}] ${resourceId} ---`);
  console.log("Request headers:", JSON.stringify(maskHeaders(headers), null, 2));

  return new Promise((resolve) => {
    const ws = new WebSocket(url, { headers });
    const timer = setTimeout(() => {
      ws.terminate();
      resolve({ resourceId, mode, ok: false, status: "timeout", reqid, connectId });
    }, 8000);
    ws.on("open", () => {
      clearTimeout(timer);
      ws.close();
      resolve({ resourceId, mode, ok: true, reqid, connectId });
    });
    ws.on("unexpected-response", (_req, res) => {
      clearTimeout(timer);
      const logid = res.headers["x-tt-logid"] || res.headers["X-Tt-Logid"];
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        resolve({
          resourceId,
          mode,
          ok: false,
          status: res.statusCode,
          body: body.slice(0, 220),
          logid,
          reqid,
          connectId,
        });
      });
    });
    ws.on("error", (err) => {
      clearTimeout(timer);
      resolve({
        resourceId,
        mode,
        ok: false,
        status: "error",
        body: String(err.message),
        reqid,
        connectId,
      });
    });
  });
}

if (!apiKey && !(appId && accessToken)) {
  console.error(
    "Need DOUBAO_ASR_API_KEY (preferred) or DOUBAO_APP_ID+DOUBAO_ACCESS_TOKEN in .env.local",
  );
  process.exit(1);
}

printEnvSummary();

if (!asrApiKey && genericApiKey) {
  console.warn(
    "Warning: DOUBAO_ASR_API_KEY empty — probing DOUBAO_API_KEY (实例 Secret Key 常会 401)\n",
  );
}

const modes = [];
if (apiKey) modes.push("api_key");
if (appId && accessToken) modes.push("app_token");

console.log("Probing modes: %s\n", modes.join(", "));

const results = [];
for (const mode of modes) {
  for (const id of resourceIds) {
    const r = await probe(id, mode);
    results.push(r);
    const mark = r.ok ? "OK" : `FAIL ${r.status}`;
    console.log(`Result: ${mark}`);
    if (r.logid) console.log(`  X-Tt-Logid: ${r.logid}`);
    if (r.body) console.log(`  body: ${r.body}`);
    if (!r.ok) {
      console.log(`  reqid=${r.reqid} connectId=${r.connectId}`);
    }
  }
}

console.log("\n=== Summary ===");
for (const r of results) {
  const mark = r.ok ? "OK" : `FAIL ${r.status}`;
  console.log(`  ${mark.padEnd(12)} [${r.mode}] ${r.resourceId}`);
}

const winner = results.find((r) => r.ok);
if (winner) {
  console.log(`
Recommended .env.local:
  DOUBAO_ASR_RESOURCE_ID=${winner.resourceId}
  DOUBAO_ASR_AUTH=${winner.mode}
`);
  process.exit(0);
}

console.log(`
All probes failed.

ASR 2.0 (新版): DOUBAO_ASR_AUTH=api_key + DOUBAO_ASR_API_KEY from API Key 管理
  https://www.volcengine.com/docs/6561/1816214

TTS v1 HTTP (AppId+AccessToken): pnpm run check:doubao-tts-v1
  https://www.volcengine.com/docs/6561/1257584?lang=zh
`);
process.exit(1);
