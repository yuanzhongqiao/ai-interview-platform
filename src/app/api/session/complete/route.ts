import {
  computeMessageBasedDuration,
  computeSegmentDuration,
  effectiveNowForSession,
  type ActivitySegment,
} from "@/app/api/voice/save/logic";
import { createLogger } from "@/lib/logger";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

const log = createLogger("api/session/complete");

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const sessionId = body?.sessionId;
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const { data: session } = await supabaseAdmin
      .from("sessions")
      .select("id, status, startedAt, lastActivityAt, interviewId, activitySegments")
      .eq("id", sessionId)
      .single();

    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (session.status === "COMPLETED") {
      return NextResponse.json({ ok: true, alreadyCompleted: true });
    }

    const now = new Date();
    const cappedNowMs = effectiveNowForSession(session.lastActivityAt as string | null, now.getTime());
    const cappedNowIso = new Date(cappedNowMs).toISOString();
    const segments = ((session.activitySegments ?? []) as ActivitySegment[]);
    const closed = segments.map((s) =>
      s.leftAt === null ? { ...s, leftAt: cappedNowIso } : s,
    );

    let duration: number;
    if (closed.length > 0) {
      duration = computeSegmentDuration(closed, cappedNowMs);
    } else {
      const { data: msgRows } = await supabaseAdmin
        .from("messages")
        .select("timestamp")
        .eq("sessionId", sessionId)
        .order("timestamp", { ascending: true });
      const msgTimesMs = (msgRows ?? []).map((r) => new Date(r.timestamp as string).getTime());
      duration = computeMessageBasedDuration(
        new Date(session.startedAt as string).getTime(),
        msgTimesMs,
        cappedNowMs,
      );
    }

    await supabaseAdmin
      .from("sessions")
      .update({
        status: "COMPLETED" as const,
        completedAt: now.toISOString(),
        activitySegments: closed,
        totalDurationSeconds: duration,
      })
      .eq("id", sessionId);

    log.info(`Session ${sessionId} completed via safety-net (${duration}s)`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
