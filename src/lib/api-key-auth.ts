import { checkRateLimit } from "@/lib/api-rate-limit";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { filterAccessibleProjectIds } from "@/server/trpc";

export interface ApiKeyAuth {
  userId: string;
  organizationId: string;
  projectIds: string[];
}

export async function validateApiKey(
  request: Request,
): Promise<ApiKeyAuth | Response> {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer dlv_")) {
    return Response.json(
      {
        error: {
          code: "UNAUTHORIZED",
          message:
            "Missing or invalid API key. Use: Authorization: Bearer dlv_xxx",
        },
      },
      { status: 401 },
    );
  }

  const key = auth.slice(7);

  const { data: apiKey } = await supabaseAdmin
    .from("api_keys")
    .select("userId, isActive, expiresAt")
    .eq("key", key)
    .single();

  if (!apiKey || !apiKey.isActive) {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid or revoked API key." } },
      { status: 401 },
    );
  }

  if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "API key has expired." } },
      { status: 401 },
    );
  }

  const rateLimited = checkRateLimit(key);
  if (rateLimited) return rateLimited;

  supabaseAdmin
    .from("api_keys")
    .update({ lastUsedAt: new Date().toISOString() })
    .eq("key", key)
    .then();

  const userId: string = apiKey.userId;

  const { data: membership } = await supabaseAdmin
    .from("organization_members")
    .select("workspaceId")
    .eq("userId", userId)
    .order("workspaceId")
    .limit(1)
    .single();

  if (!membership?.workspaceId) {
    return Response.json(
      {
        error: {
          code: "FORBIDDEN",
          message: "No organization found for this API key user.",
        },
      },
      { status: 403 },
    );
  }

  const organizationId: string = membership.workspaceId;

  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("organizationId", organizationId);

  const allProjectIds = (projects ?? []).map((p) => p.id);
  const projectIds = await filterAccessibleProjectIds(
    supabaseAdmin,
    allProjectIds,
    userId,
  );

  return { userId, organizationId, projectIds };
}

export function isAuthError(
  result: ApiKeyAuth | Response,
): result is Response {
  return result instanceof Response;
}

export function apiError(
  code: string,
  message: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return Response.json({ error: { code, message, ...extra } }, { status });
}
