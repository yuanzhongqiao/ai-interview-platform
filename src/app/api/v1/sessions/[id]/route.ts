import {
    apiError,
    isAuthError,
    validateApiKey,
} from "@/lib/api-key-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

type InterviewJoin = {
  id: string;
  title: string;
  objective: string | null;
  projectId: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await validateApiKey(request);
  if (isAuthError(auth)) return auth;

  const { id: sessionId } = await params;

  const { data: session, error } = await supabaseAdmin
    .from("sessions")
    .select(
      "id, status, participantName, participantEmail, summary, insights, themes, sentiment, totalDurationSeconds, createdAt, interview:interviews!inner(id, title, objective, projectId), messages(id, role, content, timestamp)",
    )
    .eq("id", sessionId)
    .order("timestamp", { ascending: true, foreignTable: "messages" })
    .maybeSingle();

  if (error) {
    return apiError("INTERNAL_ERROR", error.message, 500);
  }

  if (!session) {
    return apiError("NOT_FOUND", "Session not found", 404);
  }

  const rawInterview = session.interview;
  const interview = (
    Array.isArray(rawInterview) ? rawInterview[0] : rawInterview
  ) as InterviewJoin | undefined;

  if (!interview) {
    return apiError("NOT_FOUND", "Session not found", 404);
  }

  if (!auth.projectIds.includes(interview.projectId)) {
    return apiError("FORBIDDEN", "You do not have access to this session", 403);
  }

  const messages = (session.messages ?? []) as {
    id: string;
    role: string;
    content: string;
    timestamp: string;
  }[];

  return Response.json({
    data: {
      id: session.id,
      status: session.status,
      participantName: session.participantName,
      participantEmail: session.participantEmail,
      summary: session.summary,
      insights: session.insights,
      themes: session.themes,
      sentiment: session.sentiment,
      totalDurationSeconds: session.totalDurationSeconds,
      createdAt: session.createdAt,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
      })),
      interview: {
        id: interview.id,
        title: interview.title,
        objective: interview.objective,
      },
    },
  });
}
