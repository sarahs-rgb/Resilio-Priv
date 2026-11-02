import { count, desc, max } from "drizzle-orm";
import { requireChatGPTUser } from "../chatgpt-auth";
import { getDb } from "../../db";
import { researchSessions, usageEvents } from "../../db/schema";

export const dynamic = "force-dynamic";

export default async function ResearcherDashboard() {
  const user = await requireChatGPTUser("/researcher");
  const db = getDb();
  const [[research], [plans], recent] = await Promise.all([
    db
      .select({ total: count(), lastCompletedAt: max(researchSessions.completedAt) })
      .from(researchSessions),
    db.select({ total: count() }).from(usageEvents),
    db
      .select({
        participantCode: researchSessions.participantCode,
        completedAt: researchSessions.completedAt,
        confidenceBefore: researchSessions.confidenceBefore,
        confidenceAfter: researchSessions.confidenceAfter,
        dailyWh: researchSessions.dailyWh,
        energyMix: researchSessions.energyMix,
        windSharePercent: researchSessions.windSharePercent,
      })
      .from(researchSessions)
      .orderBy(desc(researchSessions.completedAt))
      .limit(10),
  ]);

  return (
    <main className="min-h-screen bg-[#f6f3e9] px-5 py-8 text-[#183638] sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#1d716a]">
              Owner-only while Resilio is private
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Research dashboard</h1>
            <p className="mt-2 text-sm text-[#687a78]">
              Signed in as {user.displayName}. Sessions contain coded study data, not names or exact locations.
            </p>
          </div>
          <div className="flex gap-2">
            <a className="rounded-xl border border-[#bfc9c2] bg-white px-4 py-2 font-bold" href="/">
              Open app
            </a>
            <a className="rounded-xl bg-[#0b3b3c] px-4 py-2 font-bold text-white" href="/api/research/export">
              Export combined CSV
            </a>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#d3dbd3] bg-white p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-[#687a78]">Consented sessions</span>
            <strong className="mt-2 block text-4xl">{research?.total ?? 0}</strong>
          </article>
          <article className="rounded-2xl border border-[#d3dbd3] bg-white p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-[#687a78]">Completed plans</span>
            <strong className="mt-2 block text-4xl">{plans?.total ?? 0}</strong>
            <small className="text-[#687a78]">Anonymous product metric; not “people helped”</small>
          </article>
          <article className="rounded-2xl border border-[#d3dbd3] bg-white p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-[#687a78]">Last study submission</span>
            <strong className="mt-3 block text-base">
              {research?.lastCompletedAt
                ? new Date(research.lastCompletedAt).toLocaleString()
                : "None yet"}
            </strong>
          </article>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-[#d3dbd3] bg-white">
          <div className="border-b border-[#d3dbd3] p-5">
            <h2 className="text-xl font-black">Recent coded sessions</h2>
            <p className="mt-1 text-sm text-[#687a78]">Use the CSV for full analysis and keep the code key separate from Resilio.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#eef2e8] text-xs uppercase tracking-wide text-[#536c69]">
                <tr><th className="p-3">Code</th><th className="p-3">Completed</th><th className="p-3">Confidence</th><th className="p-3">Daily Wh</th><th className="p-3">Energy mix</th></tr>
              </thead>
              <tbody>
                {recent.length ? recent.map((row) => (
                  <tr className="border-t border-[#e3e8e2]" key={`${row.participantCode}-${row.completedAt}`}>
                    <td className="p-3 font-bold">{row.participantCode}</td>
                    <td className="p-3">{new Date(row.completedAt).toLocaleString()}</td>
                    <td className="p-3">{row.confidenceBefore} → {row.confidenceAfter}</td>
                    <td className="p-3">{Math.round(row.dailyWh).toLocaleString()}</td>
                    <td className="p-3 capitalize">{row.energyMix}{row.energyMix === "hybrid" ? ` · ${Math.round(row.windSharePercent)}% wind` : ""}</td>
                  </tr>
                )) : <tr><td className="p-5 text-[#687a78]" colSpan={5}>No consented sessions have been submitted.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="mt-5 rounded-2xl border border-[#e5cf8b] bg-[#fff4d6] p-5 text-sm">
          <strong>Before recruiting participants:</strong> obtain your teacher/school approval, finalize the consent language,
          decide how participant codes are assigned, and confirm any requirements for minors. Do not publish or share raw coded rows.
        </aside>
      </div>
    </main>
  );
}
