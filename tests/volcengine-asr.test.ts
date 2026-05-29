import assert from "node:assert/strict";
import test from "node:test";
import { gunzipSync } from "node:zlib";

import {
    buildBigModelFullRequest,
    finalizeBigModelAsrConfig,
    formatAsrHandshakeHint,
    resolveAsrApiKey,
    resolveAsrAuthMode,
    resolveAsrResourceId,
    resolveBigModelAsrLanguage,
} from "../server/volcengine-asr";

function decodeFullRequestPayload(packet: Buffer) {
  const payloadSize = packet.readUInt32BE(8);
  const compressed = packet.subarray(12, 12 + payloadSize);
  return JSON.parse(gunzipSync(compressed).toString("utf8"));
}

test("resolveAsrApiKey prefers DOUBAO_ASR_API_KEY over DOUBAO_API_KEY", () => {
  assert.deepEqual(
    resolveAsrApiKey({ asrApiKey: "asr-only", apiKey: "generic" }),
    { key: "asr-only", source: "DOUBAO_ASR_API_KEY" },
  );
  assert.deepEqual(resolveAsrApiKey({ apiKey: "generic" }), {
    key: "generic",
    source: "DOUBAO_API_KEY",
  });
});

test("resolveAsrAuthMode prefers api_key for ASR 2.0 when API Key is set", () => {
  assert.equal(
    resolveAsrAuthMode({
      resourceId: "volc.seedasr.sauc.duration",
      apiKey: "secret",
      appId: "1",
      accessToken: "tok",
    }),
    "api_key",
  );
});

test("resolveAsrAuthMode uses app_token for ASR 1.0 when both creds exist", () => {
  assert.equal(
    resolveAsrAuthMode({
      resourceId: "volc.bigasr.sauc.duration",
      apiKey: "secret",
      appId: "1",
      accessToken: "tok",
    }),
    "app_token",
  );
});

test("formatAsrHandshakeHint explains 400 with app_token on ASR 2.0", () => {
  const hint = formatAsrHandshakeHint(400, '{"error":"resourceId volc.seedasr.sauc.duration is not allowed"}', {
    resourceId: "volc.seedasr.sauc.duration",
    authMode: "app_token",
  });
  assert.match(hint, /DOUBAO_ASR_API_KEY/);
});

test("formatAsrHandshakeHint explains 401 with api_key", () => {
  const hint = formatAsrHandshakeHint(401, '{"error":"Invalid X-Api-Key"}', {
    resourceId: "volc.seedasr.sauc.duration",
    authMode: "api_key",
  });
  assert.match(hint, /API Key 管理/);
  assert.match(hint, /Secret Key/);
});

test("resolveAsrResourceId rejects console instance ids", () => {
  const warnings: string[] = [];
  assert.equal(
    resolveAsrResourceId(
      "Doubao_Seed_ASR_Streaming_2.02000000775519523778",
      (m) => warnings.push(m),
    ),
    "volc.seedasr.sauc.duration",
  );
  assert.equal(warnings.length, 1);
});

test("resolveAsrResourceId keeps valid volc resource ids", () => {
  assert.equal(
    resolveAsrResourceId("volc.seedasr.sauc.concurrent"),
    "volc.seedasr.sauc.concurrent",
  );
});

test("resolveBigModelAsrLanguage maps English interviews to en-US", () => {
  assert.equal(resolveBigModelAsrLanguage("English"), "en-US");
  assert.equal(resolveBigModelAsrLanguage("english"), "en-US");
  assert.equal(resolveBigModelAsrLanguage("en"), "en-US");
});

test("resolveBigModelAsrLanguage leaves non-English unspecified", () => {
  assert.equal(resolveBigModelAsrLanguage("zh"), undefined);
  assert.equal(resolveBigModelAsrLanguage("Chinese"), undefined);
  assert.equal(resolveBigModelAsrLanguage(""), undefined);
});

test("buildBigModelFullRequest includes ASR language and DDC settings", () => {
  const packet = buildBigModelFullRequest(
    finalizeBigModelAsrConfig("volc.seedasr.sauc.duration", {
      language: "en-US",
      enableDdc: true,
    }),
    "test-user",
  );

  const payload = decodeFullRequestPayload(packet);
  assert.equal(payload.audio.language, "en-US");
  assert.equal(payload.request.enable_ddc, true);
  assert.equal(payload.request.enable_nonstream, true);
  assert.equal(payload.request.ssd_version, "200");
});

test("finalizeBigModelAsrConfig omits ASR 2.0 fields for bigasr 1.0", () => {
  const packet = buildBigModelFullRequest(
    finalizeBigModelAsrConfig("volc.bigasr.sauc.duration", {
      language: "en-US",
      enablePunc: true,
      resultType: "full",
    }),
    "test-user",
  );
  const payload = decodeFullRequestPayload(packet);
  assert.equal(payload.request.enable_nonstream, undefined);
  assert.equal(payload.request.ssd_version, undefined);
  assert.equal(payload.request.enable_ddc, false);
});
