import {
    apiError,
    isAuthError,
    validateApiKey,
} from "@/lib/api-key-auth";
import { nanoid } from "@/lib/id";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { id } = await params;

  if (auth.projectIds.length === 0) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  const { data: current, error: fetchError } = await supabaseAdmin
    .from("interviews")
    .select("id, publicSlug")
    .eq("id", id)
    .in("projectId", auth.projectIds)
    .maybeSingle();

  if (fetchError) {
    return apiError("INTERNAL_ERROR", fetchError.message, 500);
  }
  if (!current) {
    return apiError("NOT_FOUND", "Interview not found.", 404);
  }

  const publicSlug =
    current.publicSlug && String(current.publicSlug).trim()
      ? String(current.publicSlug)
      : nanoid(10);

  const { error: updateError } = await supabaseAdmin
    .from("interviews")
    .update({
      isActive: true,
      requireInvite: false,
      publicSlug,
    })
    .eq("id", id)
    .in("projectId", auth.projectIds);

  if (updateError) {
    return apiError("INTERNAL_ERROR", updateError.message, 500);
  }

  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "https://aural-ai.com").replace(
    /\/$/,
    "",
  );
  const url = `${base}/i/${publicSlug}`;

  return Response.json({
    data: { id, publicSlug, url },
  });
}
