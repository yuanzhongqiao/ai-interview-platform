import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

function importFreshRateLimiter() {
  const url = new URL(
    `../src/lib/api-rate-limit.ts?v=${crypto.randomUUID()}`,
    import.meta.url,
  );
  return import(url.href) as Promise<typeof import("../src/lib/api-rate-limit")>;
}

describe("checkRateLimit", () => {
  const originalDateNow = Date.now;

  afterEach(() => {
    Date.now = originalDateNow;
  });

  it("returns null for requests within the per-minute limit", async () => {
    const { checkRateLimit } = await importFreshRateLimiter();
    for (let i = 0; i < 59; i++) {
      assert.equal(checkRateLimit("client-1"), null);
    }
    assert.equal(checkRateLimit("client-1"), null);
  });

  it("returns a 429 Response when the limit (60/min) is exceeded", async () => {
    const { checkRateLimit } = await importFreshRateLimiter();
    for (let i = 0; i < 60; i++) {
      assert.equal(checkRateLimit("heavy-client"), null);
    }
    const blocked = checkRateLimit("heavy-client");
    assert.ok(blocked instanceof Response);
    assert.equal(blocked.status, 429);
  });

  it("includes Retry-After and X-RateLimit-* headers on 429 responses", async () => {
    const { checkRateLimit } = await importFreshRateLimiter();
    for (let i = 0; i < 60; i++) {
      checkRateLimit("hdr-client");
    }
    const blocked = checkRateLimit("hdr-client");
    assert.ok(blocked instanceof Response);
    const retryAfter = blocked.headers.get("Retry-After");
    const limit = blocked.headers.get("X-RateLimit-Limit");
    const remaining = blocked.headers.get("X-RateLimit-Remaining");
    const reset = blocked.headers.get("X-RateLimit-Reset");
    assert.ok(retryAfter && Number(retryAfter) > 0);
    assert.equal(limit, "60");
    assert.equal(remaining, "0");
    assert.ok(reset && Number(reset) > 0);
    const body = (await blocked.json()) as {
      error: { code: string; retry_after: number };
    };
    assert.equal(body.error.code, "RATE_LIMITED");
    assert.equal(body.error.retry_after, Number(retryAfter));
  });

  it("tracks different identifiers independently", async () => {
    const { checkRateLimit } = await importFreshRateLimiter();
    for (let i = 0; i < 60; i++) {
      assert.equal(checkRateLimit("tenant-a"), null);
    }
    assert.ok(checkRateLimit("tenant-a") instanceof Response);
    assert.equal(checkRateLimit("tenant-b"), null);
    assert.equal(checkRateLimit("tenant-b"), null);
  });

  it("resets the window after expiry so traffic is allowed again", async () => {
    let now = 1_765_000_000_000;
    Date.now = () => now;

    const { checkRateLimit } = await importFreshRateLimiter();
    assert.equal(checkRateLimit("rolling"), null);

    now += 61_000;
    assert.equal(checkRateLimit("rolling"), null);
    assert.equal(checkRateLimit("rolling"), null);
  });
});
