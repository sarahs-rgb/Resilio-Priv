import { asc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { researchSessions } from "../../../../db/schema";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  if (!request.headers.get("oai-authenticated-user-id")) {
    return Response.json({ error: "Researcher sign-in required" }, { status: 401 });
  }

  try {
    const rows = await getDb()
      .select()
      .from(researchSessions)
      .orderBy(asc(researchSessions.completedAt), asc(researchSessions.id));
    const columns = Object.keys(rows[0] || {
      id: "",
      participantCode: "",
      studyVersion: "",
      studyGroup: "",
      consentVersion: "",
      consentedAt: "",
      startedAt: "",
      completedAt: "",
    });
    const csv = [
      columns.map(csvCell).join(","),
      ...rows.map((row) => columns.map((column) => csvCell(row[column as keyof typeof row])).join(",")),
    ].join("\n");
    return new Response(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": 'attachment; filename="resilio-research-data.csv"',
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Export unavailable";
    return Response.json({ error: message }, { status: 500 });
  }
}
