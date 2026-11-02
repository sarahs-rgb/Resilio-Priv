# Resilio V20 calculation and user-validation plan

## What is automated now

The Node test suite and the in-app Validation Lab use the shared `ResilioMath.computePlan` function. They verify:

- independently calculated reference cases for battery Wh, solar W, wind W, Ah, remaining usable Wh, and runtime;
- conservation of daily energy across solar/wind hybrid splits;
- zero-load, wind-only, reserve-cutoff, voltage-scaling, monotonicity, and clamping behavior;
- a deterministic 100-case matrix for finite, nonnegative outputs and split conservation.

Passing these checks means the software matches its stated equations for the cases tested. It does **not** validate the assumptions, certify equipment, predict site production, or approve a design.

## External comparison workflow now

The Nonprofit Review screen includes a device-local worksheet for genuine results produced outside Resilio. It records the Resilio target, independent target, city/region, method, weather dataset, tilt, azimuth, losses, and signed percentage difference. It never invents a benchmark, never automatically accepts a difference, and exports the evidence for professional explanation. At least three fictional test cases should be completed after school approval; do not enter a participant's address or other personal information.

## Independent comparison still required

1. A solar professional should compare multiple Resilio cases with an independent production model such as NREL PVWatts, documenting location, weather dataset, losses, array orientation, and the reason outputs differ.
2. A battery/storage professional should review usable-capacity, efficiency, temperature, reserve, aging, surge, and manufacturer-limit assumptions.
3. A small-wind professional should replace the generic capacity factor with the exact turbine power curve and long-term hub-height wind evidence.
4. Reviewers should test missing, contradictory, extreme, and malformed inputs and confirm they never become an installation approval.
5. All findings should identify reviewer role, test date, app version, exact inputs, independent method, expected result, observed result, and severity.

## Nonprofit and community review roles

- Footprint Project: crisis workflow, offline use, mobile solar, and recovered-equipment safeguards.
- GRID Alternatives: community usability, energy equity, solar-training clarity, and warnings that new users may misunderstand.
- Solar One: urban resilience, educator usability, technical-assistance framing, and New York/New Jersey audience language.
- Solar Energy International: formula terminology, solar-training accuracy, and professional-review boundaries.
- Community testers: comprehension and accessibility only; no hardware interaction and no installation judgments.

These organizations are independent prospects, not Resilio partners. Feedback is not certification or endorsement. Written permission is required before using any organization’s name or logo as a reviewer, supporter, or partner.
