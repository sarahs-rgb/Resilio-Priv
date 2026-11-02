const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const mathSource = fs.readFileSync(path.join(__dirname, '../public/resilio-math.js'), 'utf8');
const sandbox = { module: { exports: {} }, exports: {} };
sandbox.globalThis = sandbox;
vm.runInNewContext(mathSource, sandbox, { filename: 'resilio-math.js' });
const { computePlan, computeBudget, compareExternalSolar } = sandbox.module.exports;

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} was not within ${tolerance} of ${expected}`);
};

test('solar reference case matches independently calculated equations', () => {
  const result = computePlan({
    dailyWh: 1200,
    backupDays: 3,
    peakSunHours: 4,
    usableFraction: 0.8,
    systemEfficiency: 0.8,
    planningMargin: 0.2,
    systemVoltage: 12,
    chargePercent: 65,
    windShare: 0,
    windCapacityFactor: 0.15
  });
  close(result.ratedBatteryWh, 5625);
  close(result.solarArrayW, 450);
  close(result.batteryAh, 468.75);
  close(result.remainingUsableWh, 2025);
  close(result.runtimeHours, 40.5);
});

test('hybrid split conserves daily energy and matches reference values', () => {
  const result = computePlan({
    dailyWh: 2000,
    backupDays: 2,
    peakSunHours: 5,
    usableFraction: 0.8,
    systemEfficiency: 0.85,
    planningMargin: 0.2,
    systemVoltage: 24,
    chargePercent: 80,
    windShare: 0.4,
    windCapacityFactor: 0.2
  });
  close(result.solarDailyWh, 1200);
  close(result.windDailyWh, 800);
  close(result.solarDailyWh + result.windDailyWh, 2000);
  close(result.solarArrayW, 338.8235294117647);
  close(result.windRatedW, 235.2941176470588);
});

test('wind-only planning produces no solar estimate or solar recharge time', () => {
  const result = computePlan({ dailyWh: 900, windShare: 1, windCapacityFactor: 0.15 });
  assert.equal(result.solarDailyWh, 0);
  assert.equal(result.solarArrayW, 0);
  assert.equal(result.emptyToFullPeakSunHours, 0);
  assert.ok(result.windRatedW > 0);
});

test('zero and invalid loads do not create negative or non-finite outputs', () => {
  for (const dailyWh of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = computePlan({ dailyWh });
    assert.equal(result.dailyWh, 0);
    for (const value of Object.values(result)) assert.ok(Number.isFinite(value));
  }
});

test('safety-related input bounds are enforced', () => {
  const result = computePlan({
    dailyWh: 1000,
    backupDays: 99,
    peakSunHours: -2,
    usableFraction: 9,
    systemEfficiency: 9,
    planningMargin: 9,
    systemVoltage: 0,
    chargePercent: 300,
    windShare: 9,
    windCapacityFactor: 9
  });
  assert.equal(result.backupDays, 14);
  assert.equal(result.peakSunHours, 0.1);
  assert.equal(result.usableFraction, 1);
  assert.equal(result.systemEfficiency, 1);
  assert.equal(result.planningMargin, 1);
  assert.equal(result.systemVoltage, 1);
  assert.equal(result.chargePercent, 100);
  assert.equal(result.windShare, 1);
  assert.equal(result.windCapacityFactor, 0.8);
});

test('charge at or below the reserved fraction gives zero usable runtime', () => {
  for (const chargePercent of [0, 10, 20]) {
    const result = computePlan({ dailyWh: 1000, usableFraction: 0.8, chargePercent });
    assert.equal(result.remainingUsableWh, 0);
    assert.equal(result.runtimeHours, 0);
  }
});

test('nominal voltage changes amp-hours, not required battery watt-hours', () => {
  const at12 = computePlan({ dailyWh: 1000, systemVoltage: 12 });
  const at24 = computePlan({ dailyWh: 1000, systemVoltage: 24 });
  assert.equal(at12.ratedBatteryWh, at24.ratedBatteryWh);
  close(at24.batteryAh, at12.batteryAh / 2);
});

test('larger backup duration and planning margin cannot reduce their targets', () => {
  const base = computePlan({ dailyWh: 1000, backupDays: 1, planningMargin: 0.1 });
  const larger = computePlan({ dailyWh: 1000, backupDays: 3, planningMargin: 0.3 });
  assert.ok(larger.ratedBatteryWh > base.ratedBatteryWh);
  assert.ok(larger.solarArrayW > base.solarArrayW);
});

test('deterministic input matrix remains finite and conserves the solar/wind split', () => {
  let count = 0;
  for (const dailyWh of [1, 250, 1200, 5000, 20000]) {
    for (const windShare of [0, 0.2, 0.5, 0.8, 1]) {
      for (const chargePercent of [0, 20, 65, 100]) {
        const result = computePlan({ dailyWh, windShare, chargePercent, backupDays: 3, peakSunHours: 4.5 });
        for (const value of Object.values(result)) assert.ok(Number.isFinite(value));
        close(result.solarDailyWh + result.windDailyWh, dailyWh, 1e-7);
        assert.ok(result.ratedBatteryWh >= 0);
        assert.ok(result.solarArrayW >= 0);
        assert.ok(result.windRatedW >= 0);
        count += 1;
      }
    }
  }
  assert.equal(count, 100);
});

test('budget comparison removes only confirmed eligible donation categories', () => {
  const base = {
    batteryWh: 2000,
    solarW: 400,
    windW: 0,
    sourcePerKwh: 700,
    solarPerW: 2,
    windQuote: 0,
    protectionAndCables: 150,
    qualifiedReview: 300,
    structure: 100
  };
  const allNew = computeBudget(base);
  assert.equal(allNew.allNewTotal, 2750);
  assert.equal(allNew.reuseAssistedTotal, 2750);
  const donated = computeBudget({ ...base, donatedStation: true, donatedPanels: true, reusedStructure: true });
  assert.equal(donated.reuseAssistedTotal, 450);
  assert.equal(donated.donationSavings, 2300);
  assert.equal(donated.allNewTotal, 2750);
});

test('budget comparison keeps wind quote and clamps invalid negative costs', () => {
  const result = computeBudget({
    batteryWh: -10,
    solarW: -20,
    windW: 500,
    windQuote: 1200,
    protectionAndCables: 150,
    qualifiedReview: 300,
    structure: -100,
    donatedStation: true,
    donatedPanels: true,
    reusedStructure: true
  });
  assert.equal(result.requiredWindCost, 1200);
  assert.equal(result.reuseAssistedTotal, 1650);
  for (const value of Object.values(result)) assert.ok(Number.isFinite(value) && value >= 0);
});

test('external solar comparison reports signed differences without implying acceptance', () => {
  const low = compareExternalSolar({ resilioW: 450, independentW: 500 });
  const high = compareExternalSolar({ resilioW: 550, independentW: 500 });
  assert.equal(low.valid, true);
  close(low.signedDifferencePercent, -10);
  close(low.absoluteDifferencePercent, 10);
  close(high.signedDifferencePercent, 10);
  close(high.absoluteDifferencePercent, 10);
});

test('external solar comparison rejects a missing independent result safely', () => {
  for (const independentW of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = compareExternalSolar({ resilioW: 450, independentW });
    assert.equal(result.valid, false);
    for (const value of Object.values(result).filter(value => typeof value === 'number')) {
      assert.ok(Number.isFinite(value) && value >= 0);
    }
  }
});
