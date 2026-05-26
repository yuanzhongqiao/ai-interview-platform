import { isAuthError, validateApiKey } from "@/lib/api-key-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { count: templateCount } = await supabaseAdmin
    .from("interviews")
    .select("id", { count: "exact", head: true })
    .in("projectId", auth.projectIds);

  const { count: seatCount } = await supabaseAdmin
    .from("organization_members")
    .select("id", { count: "exact", head: true })
    .eq("workspaceId", auth.organizationId);

  return Response.json({
    data: {
      plan: "self-hosted",
      templates: { used: templateCount ?? 0, limit: null },
      session_hours: { used: 0, limit: null },
      ai_tokens: { used: 0, limit: null },
      seats: { used: seatCount ?? 0, limit: null },
    },
  });
}
