import { count, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { usageEvents } from "../../../db/schema";

export async function GET() {
  try {
    const [row] = await getDb()
      .select({ value: count() })
      .from(usageEvents)
      .where(eq(usageEvents.eventType, "plan_completed"));
    return Response.json(
      { completed_plans: row?.value ?? 0 },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return Response.json({ completed_plans: null }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const id = String(payload.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id) || payload.event_type !== "plan_completed") {
      return Response.json({ error: "Invalid event" }, { status: 400 });
    }
    const occurredAt = new Date(String(payload.occurred_at || ""));
    if (!Number.isFinite(occurredAt.getTime())) {
      return Response.json({ error: "Invalid timestamp" }, { status: 400 });
    }
    await getDb()
      .insert(usageEvents)
      .values({
        id,
        eventType: "plan_completed",
        appVersion: "11",
        occurredAt: occurredAt.toISOString(),
      })
      .onConflictDoNothing();
    return Response.json({ recorded: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Usage update unavailable" }, { status: 400 });
  }
}
