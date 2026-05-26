import { apiError } from "@/lib/api-key-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function assertInterviewProjectAccess(
  interviewId: string,
  projectIds: string[],
): Promise<{ projectId: string } | Response> {
  const { data: interview, error } = await supabaseAdmin
    .from("interviews")
    .select("projectId")
    .eq("id", interviewId)
    .single();

  if (error || !interview) {
    return apiError("NOT_FOUND", "Interview not found", 404);
  }

  if (!projectIds.includes(interview.projectId as string)) {
    return apiError("FORBIDDEN", "You do not have access to this interview", 403);
  }

  return { projectId: interview.projectId as string };
}
