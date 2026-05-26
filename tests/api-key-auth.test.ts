import assert from "node:assert/strict";
import { before, describe, it } from "node:test";

import type { ApiKeyAuth } from "@/lib/api-key-auth";

let apiError: (typeof import("@/lib/api-key-auth"))["apiError"];
let isAuthError: (typeof import("@/lib/api-key-auth"))["isAuthError"];
let validateApiKey: (typeof import("@/lib/api-key-auth"))["validateApiKey"];

before(async () => {
  process.env.SUPABASE_URL ??= "http://127.0.0.1:54321";
  process.env.SUPABASE_SERVICE_ROLE_KEY ??= "test-service-role-key";
  const mod = await import("@/lib/api-key-auth");
  apiError = mod.apiError;
  isAuthError = mod.isAuthError;
  validateApiKey = mod.validateApiKey;
});

function req(headers: Record<string, string>) {
  return new Request("https://example.test/api", { headers });
}

describe("isAuthError", () => {
  it("returns true for Response objects", () => {
    const res = Response.json({ ok: true });
    assert.equal(isAuthError(res), true);
  });

  it("returns false for ApiKeyAuth objects", () => {
    const auth: ApiKeyAuth = {
      userId: "u1",
      organizationId: "o1",
      projectIds: ["p1"],
    };
    assert.equal(isAuthError(auth), false);
  });
});

describe("apiError", () => {
  it("builds JSON with error.code, error.message, and HTTP status", async () => {
    const res = apiError("TEST_CODE", "Something went wrong", 418);
    assert.equal(res.status, 418);
    const body = (await res.json()) as {
      error: { code: string; message: string };
    };
    assert.deepEqual(body, {
      error: { code: "TEST_CODE", message: "Something went wrong" },
    });
  });

  it("merges extra fields onto the error object", async () => {
    const res = apiError("WITH_EXTRA", "msg", 400, {
      details: ["a"],
      hint: "try again",
    });
    const body = (await res.json()) as {
      error: { code: string; message: string; details: string[]; hint: string };
    };
    assert.equal(body.error.code, "WITH_EXTRA");
    assert.equal(body.error.message, "msg");
    assert.deepEqual(body.error.details, ["a"]);
    assert.equal(body.error.hint, "try again");
  });
});

describe("validateApiKey (early validation)", () => {
  it("returns 401 when Authorization is missing", async () => {
    const result = await validateApiKey(req({}));
    assert.ok(result instanceof Response);
    assert.equal(result.status, 401);
    const body = (await result.json()) as { error: { code: string } };
    assert.equal(body.error.code, "UNAUTHORIZED");
  });

  it("returns 401 for non-Bearer schemes", async () => {
    const result = await validateApiKey(
      req({ authorization: "Basic dGVzdA==" }),
    );
    assert.ok(result instanceof Response);
    assert.equal(result.status, 401);
  });

  it("returns 401 when Bearer token does not use the dlv_ prefix", async () => {
    const result = await validateApiKey(
      req({ authorization: "Bearer sk_live_abc" }),
    );
    assert.ok(result instanceof Response);
    assert.equal(result.status, 401);
    const body = (await result.json()) as { error: { message: string } };
    assert.ok(body.error.message.includes("dlv_"));
  });
});
