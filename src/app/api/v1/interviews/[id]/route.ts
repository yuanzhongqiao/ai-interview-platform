import {
  apiError,
  isAuthError,
  validateApiKey,
} from "@/lib/api-key-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (auth.projectIds.length === 0) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  const { data: interview, error } = await supabaseAdmin
    .from("interviews")
    .select("*, questions(*), sessions(id)")
    .eq("id", id)
    .in("projectId", auth.projectIds)
    .order("order", { referencedTable: "questions", ascending: true })
    .maybeSingle();

  if (error) {
    return apiError("INTERNAL_ERROR", error.message, 500);
  }
  if (!interview) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  const copy = { ...(interview as Record<string, unknown>) };
  const sessions = copy.sessions as { id: string }[] | null | undefined;
  delete copy.sessions;

  return Response.json({
    data: {
      ...copy,
      _count: {
        sessions: sessions?.length ?? 0,
      },
    },
  });
}

const PATCH_FIELDS = [
  "title",
  "description",
  "objective",
  "assessmentCriteria",
  "chatEnabled",
  "voiceEnabled",
  "videoEnabled",
  "aiName",
  "aiTone",
  "followUpDepth",
  "language",
  "timeLimitMinutes",
  "antiCheatingEnabled",
] as const;

type PatchField = (typeof PATCH_FIELDS)[number];

function isAssessmentCriteria(
  v: unknown,
): v is { name: string; description: string }[] {
  if (!Array.isArray(v)) return false;
  return v.every(
    (x) =>
      x &&
      typeof x === "object" &&
      typeof (x as { name: string }).name === "string" &&
      typeof (x as { description: string }).description === "string",
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (auth.projectIds.length === 0) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return apiError("BAD_REQUEST", "Invalid JSON body.", 400);
  }

  const patch: Record<string, unknown> = {};

  for (const key of PATCH_FIELDS) {
    if (!(key in body)) continue;
    const val = body[key];
    if (key === "title") {
      if (typeof val !== "string" || !val.trim()) {
        return apiError("BAD_REQUEST", "title must be a non-empty string.", 400);
      }
      patch.title = val.trim();
      continue;
    }
    if (key === "assessmentCriteria") {
      if (val === null) {
        patch.assessmentCriteria = null;
        continue;
      }
      if (!isAssessmentCriteria(val)) {
        return apiError(
          "BAD_REQUEST",
          "assessmentCriteria must be an array of { name, description }.",
          400,
        );
      }
      patch.assessmentCriteria = val;
      continue;
    }
    if (
      key === "chatEnabled" ||
      key === "voiceEnabled" ||
      key === "videoEnabled" ||
      key === "antiCheatingEnabled"
    ) {
      if (typeof val !== "boolean") {
        return apiError("BAD_REQUEST", `${key} must be a boolean.`, 400);
      }
      patch[key] = val;
      continue;
    }
    if (key === "aiTone") {
      if (
        val !== "CASUAL" &&
        val !== "PROFESSIONAL" &&
        val !== "FORMAL" &&
        val !== "FRIENDLY"
      ) {
        return apiError("BAD_REQUEST", "Invalid aiTone.", 400);
      }
      patch.aiTone = val;
      continue;
    }
    if (key === "followUpDepth") {
      if (val !== "LIGHT" && val !== "MODERATE" && val !== "DEEP") {
        return apiError("BAD_REQUEST", "Invalid followUpDepth.", 400);
      }
      patch.followUpDepth = val;
      continue;
    }
    if (key === "timeLimitMinutes") {
      if (val === null) {
        patch.timeLimitMinutes = null;
        continue;
      }
      if (
        typeof val !== "number" ||
        !Number.isInteger(val) ||
        val < 1
      ) {
        return apiError(
          "BAD_REQUEST",
          "timeLimitMinutes must be a positive integer or null.",
          400,
        );
      }
      patch.timeLimitMinutes = val;
      continue;
    }
    if (key === "description" || key === "objective" || key === "aiName" || key === "language") {
      if (val !== null && typeof val !== "string") {
        return apiError("BAD_REQUEST", `${key} must be a string or null.`, 400);
      }
      patch[key as PatchField] = val;
      continue;
    }
  }

  if (Object.keys(patch).length === 0) {
    return apiError("BAD_REQUEST", "No valid fields to update.", 400);
  }

  const { data: updated, error } = await supabaseAdmin
    .from("interviews")
    .update(patch)
    .eq("id", id)
    .in("projectId", auth.projectIds)
    .select()
    .maybeSingle();

  if (error) {
    return apiError("INTERNAL_ERROR", error.message, 500);
  }
  if (!updated) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  return Response.json({ data: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (auth.projectIds.length === 0) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  const { data: updated, error } = await supabaseAdmin
    .from("interviews")
    .update({ isActive: false })
    .eq("id", id)
    .in("projectId", auth.projectIds)
    .select("id")
    .maybeSingle();

  if (error) {
    return apiError("INTERNAL_ERROR", error.message, 500);
  }
  if (!updated) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  return Response.json({
    data: { id: updated.id, archived: true },
  });
}
