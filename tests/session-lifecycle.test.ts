import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  computeMessageBasedDuration,
  computeSegmentDuration,
  effectiveNowForSession,
  type ActivitySegment,
} from "@/app/api/voice/save/logic";

const TEN_MIN_MS = 10 * 60 * 1000;

describe("effectiveNowForSession", () => {
  it("returns the real now when lastActivityAt is absent", () => {
    const now = 1_800_000_000_000;
    assert.equal(effectiveNowForSession(undefined, now), now);
    assert.equal(effectiveNowForSession(null, now), now);
  });

  it("caps now to lastActivity plus grace when activity is far in the past", () => {
    const nowMs = 1_800_000_000_000;
    const lastMs = nowMs - 3 * 60 * 60 * 1000;
    const lastIso = new Date(lastMs).toISOString();
    assert.equal(effectiveNowForSession(lastIso, nowMs), lastMs + TEN_MIN_MS);
  });

  it("returns real now when last activity is recent", () => {
    const nowMs = 1_800_000_000_000;
    const lastMs = nowMs - 60_000;
    const lastIso = new Date(lastMs).toISOString();
    assert.equal(effectiveNowForSession(lastIso, nowMs), nowMs);
  });

  it("falls back to real now when lastActivityAt is not a valid date", () => {
    const nowMs = 1_800_000_000_000;
    assert.equal(effectiveNowForSession("not-a-date", nowMs), nowMs);
  });
});

describe("computeSegmentDuration", () => {
  it("returns 0 for an empty segment list", () => {
    assert.equal(computeSegmentDuration([], 1_800_000_000_000), 0);
  });

  it("sums a single open segment up to now", () => {
    const start = 1_800_000_000_000;
    const now = start + 45_000;
    const segments: ActivitySegment[] = [
      { enteredAt: new Date(start).toISOString(), leftAt: null },
    ];
    assert.equal(computeSegmentDuration(segments, now), 45);
  });

  it("sums multiple closed segments", () => {
    const t0 = 1_800_000_000_000;
    const segments: ActivitySegment[] = [
      {
        enteredAt: new Date(t0).toISOString(),
        leftAt: new Date(t0 + 30_000).toISOString(),
      },
      {
        enteredAt: new Date(t0 + 40_000).toISOString(),
        leftAt: new Date(t0 + 70_000).toISOString(),
      },
    ];
    assert.equal(computeSegmentDuration(segments, t0 + 120_000), 60);
  });

  it("uses now for segments that are still open while ignoring zero/negative spans", () => {
    const t0 = 1_800_000_000_000;
    const segments: ActivitySegment[] = [
      {
        enteredAt: new Date(t0 + 5_000).toISOString(),
        leftAt: new Date(t0 + 5_000).toISOString(),
      },
      {
        enteredAt: new Date(t0 + 10_000).toISOString(),
        leftAt: null,
      },
    ];
    assert.equal(computeSegmentDuration(segments, t0 + 25_000), 15);
  });

  it("treats all-closed segments without referencing now beyond closed ends", () => {
    const t0 = 1_800_000_000_000;
    const segments: ActivitySegment[] = [
      {
        enteredAt: new Date(t0).toISOString(),
        leftAt: new Date(t0 + 10_000).toISOString(),
      },
    ];
    assert.equal(computeSegmentDuration(segments, t0 + 9_999_999), 10);
  });
});

describe("computeMessageBasedDuration", () => {
  it("sums capped gaps between session start, messages, and end", () => {
    const sessionStart = 0;
    const messages = [30_000, 45_000];
    const end = 60_000;
    assert.equal(computeMessageBasedDuration(sessionStart, messages, end), 60);
  });

  it("caps each gap at five minutes", () => {
    const sessionStart = 0;
    const gap = 6 * 60 * 1000;
    const end = sessionStart + gap;
    assert.equal(computeMessageBasedDuration(sessionStart, [], end), 300);
  });

  it("sorts message timestamps with session bounds before summing", () => {
    const sessionStart = 0;
    const messages = [30_000, 10_000];
    const end = 40_000;
    assert.equal(computeMessageBasedDuration(sessionStart, messages, end), 40);
  });
});
