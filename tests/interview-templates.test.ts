import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  INTERVIEW_TEMPLATES,
  type TemplateQuestion,
} from "../src/lib/interview-templates";

const QUESTION_TYPES = new Set<TemplateQuestion["type"]>([
  "OPEN_ENDED",
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "CODING",
  "WHITEBOARD",
]);

describe("INTERVIEW_TEMPLATES", () => {
  it("assigns a unique id to every template", () => {
    const ids = INTERVIEW_TEMPLATES.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("includes required top-level fields on every template", () => {
    for (const t of INTERVIEW_TEMPLATES) {
      assert.ok(typeof t.title === "string" && t.title.length > 0, t.id);
      assert.ok(
        typeof t.description === "string" && t.description.length > 0,
        t.id,
      );
      assert.ok(typeof t.icon === "string" && t.icon.length > 0, t.id);
      assert.ok(Array.isArray(t.questions) && t.questions.length > 0, t.id);
    }
  });

  it("only uses supported question types", () => {
    for (const t of INTERVIEW_TEMPLATES) {
      for (const q of t.questions) {
        assert.ok(
          QUESTION_TYPES.has(q.type),
          `${t.id}: invalid type ${String(q.type)}`,
        );
      }
    }
  });

  it("uses sequential question order values starting at 0 within each template", () => {
    for (const t of INTERVIEW_TEMPLATES) {
      const orders = t.questions.map((q) => q.order).sort((a, b) => a - b);
      const expected = t.questions.map((_, i) => i);
      assert.deepEqual(orders, expected, t.id);
    }
  });

  it("requires options arrays for choice-style questions", () => {
    for (const t of INTERVIEW_TEMPLATES) {
      for (const q of t.questions) {
        if (q.type !== "SINGLE_CHOICE" && q.type !== "MULTIPLE_CHOICE") {
          continue;
        }
        assert.ok(Array.isArray(q.options), `${t.id} order ${q.order}`);
        assert.ok(
          (q.options as unknown[]).length > 0,
          `${t.id} order ${q.order} options empty`,
        );
      }
    }
  });

  it("uses a positive timeLimitMinutes when the field is present", () => {
    for (const t of INTERVIEW_TEMPLATES) {
      if (t.timeLimitMinutes === undefined) continue;
      assert.ok(
        typeof t.timeLimitMinutes === "number" && t.timeLimitMinutes > 0,
        t.id,
      );
    }
  });
});
