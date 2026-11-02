import { getDb } from "../../../../db";
import { researchSessions } from "../../../../db/schema";

const numericBounds = {
  confidence_before: [1, 5],
  confidence_after: [1, 5],
  device_count: [1, 100],
  daily_wh: [0.01, 1_000_000],
  backup_days: [0.1, 30],
  peak_sun_hours: [0.1, 24],
  usable_capacity_assumption_percent: [1, 100],
  efficiency_assumption_percent: [1, 100],
  planning_margin_percent: [0, 300],
  system_voltage_v: [1, 1000],
  battery_wh: [0.01, 100_000_000],
  battery_charge_percent: [0, 100],
  stored_energy_wh: [0, 100_000_000],
  remaining_usable_wh: [0, 100_000_000],
  estimated_runtime_hours: [0, 100_000],
  solar_w: [0, 10_000_000],
  wind_share_percent: [0, 100],
  wind_capacity_factor_percent: [1, 80],
  wind_w: [0, 10_000_000],
  battery_ah: [0.01, 10_000_000],
  estimated_empty_to_full_peak_sun_hours: [0, 100_000],
  completion_seconds: [1, 86_400],
} as const;

function boundedNumber(payload: Record<string, unknown>, key: keyof typeof numericBounds) {
  const value = Number(payload[key]);
  const [minimum, maximum] = numericBounds[key];
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new Error(`${key} is outside its accepted range`);
  }
  return value;
}

function validIso(value: unknown, label: string) {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) {
    throw new Error(`${label} must be an ISO date`);
  }
  return new Date(value).toISOString();
}

export async function POST(request: Request) {
  try {
    if (!(request.headers.get("content-type") || "").includes("application/json")) {
      return Response.json({ error: "JSON required" }, { status: 415 });
    }
    const raw = await request.text();
    if (raw.length > 12_000) {
      return Response.json({ error: "Payload too large" }, { status: 413 });
    }
    const payload = JSON.parse(raw) as Record<string, unknown>;
    if (payload.consent_confirmed !== true) {
      return Response.json({ error: "Documented consent is required" }, { status: 400 });
    }
    const participantCode = String(payload.participant_code || "").trim();
    if (!/^[A-Za-z0-9_-]{2,32}$/.test(participantCode)) {
      return Response.json(
        { error: "Participant code must be 2–32 letters, numbers, underscores, or hyphens" },
        { status: 400 },
      );
    }
    const id = String(payload.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) {
      return Response.json({ error: "Invalid session id" }, { status: 400 });
    }
    const startedAt = validIso(payload.started_at, "started_at");
    const completedAt = validIso(payload.completed_at, "completed_at");
    if (Date.parse(completedAt) < Date.parse(startedAt)) {
      return Response.json({ error: "Completion cannot precede start" }, { status: 400 });
    }

    await getDb()
      .insert(researchSessions)
      .values({
        id,
        participantCode,
        studyVersion: "resilio-ap-v1",
        studyGroup: "app",
        consentVersion: "2026-09-20-v1",
        consentedAt: validIso(payload.consented_at, "consented_at"),
        startedAt,
        completedAt,
        completionSeconds: Math.round(boundedNumber(payload, "completion_seconds")),
        confidenceBefore: Math.round(boundedNumber(payload, "confidence_before")),
        confidenceAfter: Math.round(boundedNumber(payload, "confidence_after")),
        deviceCount: Math.round(boundedNumber(payload, "device_count")),
        dailyWh: boundedNumber(payload, "daily_wh"),
        backupDays: boundedNumber(payload, "backup_days"),
        peakSunHours: boundedNumber(payload, "peak_sun_hours"),
        usableCapacityPercent: boundedNumber(payload, "usable_capacity_assumption_percent"),
        efficiencyPercent: boundedNumber(payload, "efficiency_assumption_percent"),
        planningMarginPercent: boundedNumber(payload, "planning_margin_percent"),
        systemVoltageV: boundedNumber(payload, "system_voltage_v"),
        batteryWh: boundedNumber(payload, "battery_wh"),
        batteryChargePercent: boundedNumber(payload, "battery_charge_percent"),
        storedEnergyWh: boundedNumber(payload, "stored_energy_wh"),
        remainingUsableWh: boundedNumber(payload, "remaining_usable_wh"),
        estimatedRuntimeHours: boundedNumber(payload, "estimated_runtime_hours"),
        solarW: boundedNumber(payload, "solar_w"),
        energyMix: ["solar", "hybrid", "wind"].includes(String(payload.energy_mix))
          ? String(payload.energy_mix)
          : "solar",
        windSharePercent: boundedNumber(payload, "wind_share_percent"),
        windCapacityFactorPercent: boundedNumber(payload, "wind_capacity_factor_percent"),
        windW: boundedNumber(payload, "wind_w"),
        batteryAh: boundedNumber(payload, "battery_ah"),
        estimatedRechargeHours: boundedNumber(payload, "estimated_empty_to_full_peak_sun_hours"),
      })
      .onConflictDoNothing();

    return Response.json({ saved: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save research session";
    return Response.json({ error: message }, { status: 400 });
  }
}
