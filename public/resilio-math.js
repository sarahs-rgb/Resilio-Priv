(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ResilioMath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function finiteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function computePlan(input) {
    const dailyWh = Math.max(0, finiteNumber(input.dailyWh, 0));
    const backupDays = clamp(finiteNumber(input.backupDays, 1), 1, 14);
    const peakSunHours = clamp(finiteNumber(input.peakSunHours, 1), 0.1, 24);
    const usableFraction = clamp(finiteNumber(input.usableFraction, 0.8), 0.01, 1);
    const systemEfficiency = clamp(finiteNumber(input.systemEfficiency, 0.8), 0.01, 1);
    const planningMargin = clamp(finiteNumber(input.planningMargin, 0.2), 0, 1);
    const systemVoltage = clamp(finiteNumber(input.systemVoltage, 12), 1, 1000);
    const chargeFraction = clamp(finiteNumber(input.chargePercent, 0) / 100, 0, 1);
    const windShare = clamp(finiteNumber(input.windShare, 0), 0, 1);
    const windCapacityFactor = clamp(finiteNumber(input.windCapacityFactor, 0.15), 0.01, 0.8);
    const solarDailyWh = dailyWh * (1 - windShare);
    const windDailyWh = dailyWh * windShare;

    const ratedBatteryWh = dailyWh * backupDays / (usableFraction * systemEfficiency);
    const solarArrayW = solarDailyWh / (peakSunHours * systemEfficiency) * (1 + planningMargin);
    const windRatedW = windDailyWh / (24 * windCapacityFactor * systemEfficiency) * (1 + planningMargin);
    const batteryAh = ratedBatteryWh / systemVoltage;
    const emptyToFullPeakSunHours = solarArrayW > 0
      ? ratedBatteryWh / (solarArrayW * systemEfficiency)
      : 0;
    const storedWh = ratedBatteryWh * chargeFraction;
    const reserveFraction = 1 - usableFraction;
    const availableFraction = chargeFraction <= reserveFraction + 1e-9
      ? 0
      : chargeFraction - reserveFraction;
    const remainingUsableWh = ratedBatteryWh
      * availableFraction
      * systemEfficiency;
    const runtimeHours = dailyWh > 0 ? remainingUsableWh / dailyWh * 24 : 0;

    return {
      dailyWh,
      backupDays,
      peakSunHours,
      usableFraction,
      systemEfficiency,
      planningMargin,
      systemVoltage,
      windShare,
      windCapacityFactor,
      solarDailyWh,
      windDailyWh,
      chargePercent: chargeFraction * 100,
      ratedBatteryWh,
      solarArrayW,
      windRatedW,
      batteryAh,
      emptyToFullPeakSunHours,
      storedWh,
      remainingUsableWh,
      runtimeHours
    };
  }

  function computeBudget(input) {
    const batteryWh = Math.max(0, finiteNumber(input.batteryWh, 0));
    const solarW = Math.max(0, finiteNumber(input.solarW, 0));
    const windW = Math.max(0, finiteNumber(input.windW, 0));
    const sourcePerKwh = Math.max(0, finiteNumber(input.sourcePerKwh, 0));
    const solarPerW = Math.max(0, finiteNumber(input.solarPerW, 0));
    const windQuote = Math.max(0, finiteNumber(input.windQuote, 0));
    const protectionAndCables = Math.max(0, finiteNumber(input.protectionAndCables, 0));
    const qualifiedReview = Math.max(0, finiteNumber(input.qualifiedReview, 0));
    const structure = Math.max(0, finiteNumber(input.structure, 0));
    const donatedStation = input.donatedStation === true;
    const donatedPanels = input.donatedPanels === true;
    const reusedStructure = input.reusedStructure === true;
    const sourceCost = batteryWh / 1000 * sourcePerKwh;
    const solarCost = solarW * solarPerW;
    const requiredWindCost = windW > 0 ? windQuote : 0;
    const allNewTotal = sourceCost + solarCost + requiredWindCost
      + protectionAndCables + qualifiedReview + structure;
    const reuseAssistedTotal = (donatedStation ? 0 : sourceCost)
      + (donatedPanels ? 0 : solarCost)
      + requiredWindCost
      + protectionAndCables
      + qualifiedReview
      + (reusedStructure ? 0 : structure);
    return {
      sourceCost,
      solarCost,
      requiredWindCost,
      allNewTotal,
      reuseAssistedTotal,
      donationSavings: Math.max(0, allNewTotal - reuseAssistedTotal)
    };
  }

  function compareExternalSolar(input) {
    const resilioW = Math.max(0, finiteNumber(input.resilioW, 0));
    const independentW = Math.max(0, finiteNumber(input.independentW, 0));
    if (independentW === 0) {
      return {
        valid: false,
        resilioW,
        independentW,
        signedDifferencePercent: 0,
        absoluteDifferencePercent: 0
      };
    }
    const signedDifferencePercent = (resilioW - independentW) / independentW * 100;
    return {
      valid: true,
      resilioW,
      independentW,
      signedDifferencePercent,
      absoluteDifferencePercent: Math.abs(signedDifferencePercent)
    };
  }

  return { computePlan, computeBudget, compareExternalSolar };
});
