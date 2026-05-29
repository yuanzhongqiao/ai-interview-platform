#!/usr/bin/env node
/**
 * Probe Volcengine HTTP TTS v1 (历史接口).
 * @see https://www.volcengine.com/docs/6561/1257584?lang=zh
 *
 * Auth: Authorization: Bearer;${DOUBAO_ACCESS_TOKEN}
 * Body: app.appid + app.token (可传任意非空) + cluster volcano_tts
 */
import { config } from "dotenv";
import { randomUUID } from "node:crypto";
import { maskSecret } from "./lib/volc-mask.mjs";

config({ path: ".env.local", override: true });
config({ path: ".env" });

const appId = (process.env.DOUBAO_APP_ID || "").trim();
const accessToken = (process.env.DOUBAO_ACCESS_TOKEN || "").trim();
const voiceZh =
  (process.env.DOUBAO_VOICE_ZH || "").trim() ||
  "zh_female_shuangkuaisisi_uranus_bigtts";
const url = "https://openspeech.bytedance.com/api/v1/tts";
const testText = process.argv[2]?.trim() || "麦克风测试，请说一句话。";

function buildRequest() {
  const reqid = randomUUID();
  return {
    reqid,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer;${accessToken}`,
    },
    body: {
      app: {
        appid: appId,
        token: accessToken,
        cluster: "volcano_tts",
      },
      user: { uid: "lingwu-probe" },
      audio: {
        voice_type: voiceZh,
        encoding: "mp3",
        speed_ratio: 1.0,
        rate: 24000,
      },
      request: {
        reqid,
        text: testText,
        operation: "query",
      },
    },
  };
}

function printConfig() {
  console.log("=== Doubao HTTP TTS v1 probe ===");
  console.log("Doc: https://www.volcengine.com/docs/6561/1257584?lang=zh\n");
  console.log("Env (masked):");
  console.log(`  DOUBAO_APP_ID=${maskSecret(appId)}`);
  console.log(`  DOUBAO_ACCESS_TOKEN=${maskSecret(accessToken)}`);
  console.log(`  DOUBAO_VOICE_ZH=${voiceZh}`);
  console.log(`  test text=${testText}\n`);
}

async function probe() {
  if (!appId || !accessToken) {
    console.error("Need DOUBAO_APP_ID and DOUBAO_ACCESS_TOKEN in .env.local");
    process.exit(1);
  }

  printConfig();
  const { headers, body } = buildRequest();

  console.log("Request URL:", url);
  console.log("Request headers:", {
    "Content-Type": headers["Content-Type"],
    Authorization: `Bearer;${maskSecret(accessToken)}`,
  });
  console.log("Request body:", JSON.stringify(body, null, 2));

  const started = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const elapsed = Date.now() - started;
  const logid = res.headers.get("x-tt-logid") || res.headers.get("X-Tt-Logid");

  console.log("\nResponse:");
  console.log(`  HTTP ${res.status} (${elapsed}ms)`);
  if (logid) console.log(`  X-Tt-Logid: ${logid}`);

  let json;
  try {
    json = await res.json();
  } catch {
    const text = await res.text();
    console.log(`  body(raw): ${text.slice(0, 400)}`);
    process.exit(1);
  }

  console.log(`  code=${json.code} message=${json.message}`);
  if (json.data) {
    console.log(`  audio(base64) length=${json.data.length}`);
  }
  if (json.addition?.duration) {
    console.log(`  duration=${json.addition.duration}ms`);
  }

  if (json.code === 3000 && json.data) {
    console.log("\nOK — TTS v1 works with AppId + Access Token.");
    process.exit(0);
  }

  console.log("\nFAIL — full response:");
  console.log(JSON.stringify(json, null, 2));
  process.exit(1);
}

probe().catch((err) => {
  console.error(err);
  process.exit(1);
});
