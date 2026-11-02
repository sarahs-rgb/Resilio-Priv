# Resilio V20 safety and calculation audit

## V20 addendum

- Added a device-local external solar comparison worksheet rather than presenting internal tests as independent validation.
- The worksheet requires a genuinely independent result and its method, assumptions, and non-identifying city/region before saving.
- It reports the numerical difference without automatic acceptance, certification, equipment approval, or installation approval.
- Added two automated tests for signed difference math and invalid independent results.
- Pinned an outreach order that requires school research approval before recruitment or collection and labels every listed organization as an independent prospect, not a partner.

## V19 addendum

- Added a budget comparison without converting the app into a bill-of-materials or equipment-approval tool.
- A donation checkbox is a record of the user's documented review status, not an app finding that equipment is safe.
- Only a complete listed power station, documented professionally tested panels, and reviewed non-energized structure may reduce the reuse-assisted estimate.
- Loose or rebuilt batteries, fuses, breakers, disconnects, damaged cable, unknown connectors, and failed or uncertain equipment never reduce the estimate.
- Zero-dollar protection or professional-review allowances create explicit warnings and never remove those requirements.
- Wind cost remains incomplete until a complete system quote is entered.
- Country/region and ISO currency are recorded with the estimate. The app performs no offline exchange conversion, and a currency change stays flagged until the user explicitly reviews the amounts.
- Exported budget records include all assumptions, confirmations, incomplete warnings, and safety limits for external review.
- Added automated checks proving that donation flags cannot remove protection, professional review, or wind-system quote costs and that negative inputs cannot create negative totals.

## V18 addendum

- Added nine Node test groups covering reference calculations, invalid inputs, clamping, reserve behavior, voltage scaling, monotonicity, and a deterministic 100-case matrix.
- Added eight matching in-app calculation checks with a downloadable dated report.
- The solar reference case independently verifies 1,200 Wh/day, three backup days, four peak-sun hours, 80% usable capacity, 80% efficiency, and a 20% generation margin.
- The hybrid reference case independently verifies conservation of a 2,000 Wh/day load split between 60% solar and 40% wind.
- Passing status is labeled as internal equation/regression checking only. It is not represented as independent validation, site-production modeling, certification, or installation approval.
- Added a role-specific nonprofit review map so disaster-response, community-training, urban-education, and solar-training reviewers receive different questions.

Reviewed: September 30, 2026

## V16 addendum

- Added a recovered-part condition gate. Unknown, cracked, wet, corroded, burnt, melted, swollen, leaking, hissing, punctured, modified, or failed parts receive a **Do not reuse or energize** result.
- Used batteries can never receive app approval. Even an intact, labeled, professionally tested battery remains subject to manufacturer reuse permission and qualified battery-system review.
- Fuses, breakers, and disconnects are treated as new, traceable, design-specific purchases rather than salvage candidates.
- Recovered electrical equipment requires readable ratings, the official manual, and documented qualified testing before it can proceed to system review. Passing those gates still does not constitute approval.
- Large-load checks now compare simultaneous running demand against temperature-derated continuous output, surge wattage and duration, and appliance/source ambient-temperature limits.
- Compatibility results are reflected in the 3D build as green (documented label match), yellow (review or missing evidence), or red (do not connect). Green still does not mean installation approval.
- Added device-local research-backup deletion and explicit notice that local deletion does not remove an already submitted server record.

## V14 addendum

- Portable plug-in AC is no longer rejected by name; it proceeds to exact running-power and compressor-starting-power screening.
- Central, fixed, and hardwired HVAC remains blocked.
- Added three explicit outcomes: Documented match, Professional review required, and Do not connect.
- Added a documentation lock requiring exact models, official manual URLs, and system documentation before a green result.
- Modular battery-and-inverter combinations remain under professional review pending a verified database entry or qualified review.

## V13 addendum

- Removed the fixed-home integration pathway. V12 is stand-alone only.
- Added name-based screening for HVAC, central air, compressors, motors, and other large loads.
- Name screening never establishes safety; it only escalates required checks.
- Added an exact-label screen for voltage, frequency, continuous/startup power, connector, and grounding needs.
- Added sampled elevation plus seven-day solar/wind screening and device-local caching.
- Added Offline Crisis Mode; live research submission and new site-data retrieval still require a connection.
- Removed Bluetooth and live hardware integration from the shipping version.
- Added solar-only, wind-only, and hybrid energy splits while keeping full-load battery sizing unchanged.
- Wind nameplate screening uses wind-share Wh ÷ 24 h ÷ capacity factor ÷ system efficiency, with the selected planning margin applied.
- The interface states that capacity factor must be replaced by evidence derived from the exact turbine power curve and long-term hub-height wind data.
- Added wind-specific gates for tower structure, clearances, overspeed/braking, diversion loads, grounding, lightning, and separate matched controllers.
- Automatic research collection is isolated from hardware monitoring and requires documented consent.
- “Completed plans” is not represented as “people helped.”

## Audit standard

Safety-critical statements were checked against primary or authoritative public sources. Product-specific limits are not generalized. Where a value is selected by Resilio rather than imposed by a source, the interface labels it as an app planning assumption or alert.

This review is not a professional engineering stamp, product certification, code approval, legal opinion, or site inspection. A qualified professional must validate a real system using the exact equipment manuals, site conditions, adopted codes, utility rules, and permit authority requirements.

## Material corrections in V10

1. Corrected the ideal empty-to-full recharge estimate so efficiency increases required input time rather than decreasing it.
2. Corrected remaining-runtime logic at partial charge. The non-usable reserve is subtracted from current state of charge before efficiency is applied.
3. Added a numerical tolerance so exactly reaching the reserve cutoff returns zero usable runtime.
4. Replaced the fixed 12 V amp-hour conversion with selectable 12 V, 24 V, or 48 V nominal planning voltage.
5. Labeled usable capacity, system efficiency, solar margin, the 5 °C early-review buffer, and the 15% low-energy reminder as assumptions or app choices.
6. Removed the claim that a manual or simulated reading is “SAFE.” Without trustworthy real telemetry and system validation, status remains unverified.
7. Stopped treating a 100% state-of-charge entry as proof of overcharge. It now prompts the user to confirm that the matched BMS and controller report charging complete.
8. Reworded build guidance so orientation, placement, protection, shutdown, and commissioning follow the exact manual and qualified review.
9. Updated research export fields to preserve voltage, efficiency, usable-capacity, planning-margin, and remaining-usable-energy assumptions.

## Calculation definitions

- Daily energy: sum of device watts × hours per day.
- Rated battery Wh: daily Wh × backup days ÷ usable-capacity assumption ÷ efficiency assumption.
- Solar planning W: daily Wh ÷ peak-sun hours ÷ efficiency × (1 + planning margin).
- Battery Ah: rated battery Wh ÷ selected nominal system voltage.
- Stored Wh: rated battery Wh × entered state of charge.
- Remaining usable Wh: rated battery Wh × max(0, entered charge fraction − reserved fraction) × efficiency.
- Runtime hours: remaining usable Wh ÷ daily Wh × 24.
- Ideal empty-to-full peak-sun hours: rated battery Wh ÷ solar array W ÷ efficiency. This assumes no simultaneous loads and is not clock time or a site-production guarantee.

## Authoritative sources

- U.S. Fire Administration, Battery Fire Safety: https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/batteries/
- OSHA, Using Portable Generators Safely: https://www.osha.gov/sites/default/files/publications/OSHA3286.pdf
- U.S. Department of Energy / NREL PVWatts catalog: https://catalog.data.gov/dataset/pvwatts-calculator
- UL Solutions, Energy Storage System Testing and Certification: https://www.ul.com/services/energy-storage-system-testing-and-certification
- NFPA 855 standard development: https://www.nfpa.org/codes-and-standards/nfpa-855-standard-development/855
- Massachusetts Department of Fire Services, Lithium-Ion Battery Safety: https://www.mass.gov/info-details/lithium-ion-battery-safety
- U.S. EPA, Used Lithium-Ion Batteries: https://www.epa.gov/recycle/used-lithium-ion-batteries
- U.S. EPA, Frequent Questions on Lithium-Ion Batteries: https://www.epa.gov/recycle/frequent-questions-lithium-ion-batteries
- OSHA, Facilities Management Electrical Safety: https://www.osha.gov/etools/hospitals/facilities-management/electrical-safety

## Still required before real-world use

- Exact battery, BMS, controller, inverter, sensor, disconnect, and protective-device models.
- Manufacturer manuals and permitted system combinations.
- Site structural, electrical, environmental, fire, ventilation, and access assessment.
- Calculation and design review by qualified electrical/solar and fire-safety professionals.
- Local permit, inspection, utility, and authority-having-jurisdiction review.
- Hardware fault testing, stale/missing-data behavior, alarm testing, and commissioning.
- Legal and privacy review before public launch.
