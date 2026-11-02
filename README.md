# Resilio V20

Resilio is a safety-first emergency energy planning and research prototype.

## V20 additions

- A pinned after–October 12 outreach order appears in the Nonprofit Review screen and keeps school research approval first.
- An external solar comparison worksheet records genuine NREL PVWatts or qualified-professional results alongside Resilio's estimate.
- The worksheet records only city/region, method, dataset, tilt, azimuth, losses, and the independently produced target; it does not request an exact address.
- Differences are reported, saved device-locally, and exported for review without automatic pass/fail or equipment approval.
- Two automated tests verify signed comparison differences and safely reject a missing or invalid independent result.

## V19 additions

- A Scavenger Budget Builder compares a one-day essential floor, the current plan with confirmed eligible donations, and an all-new planning estimate.
- All price assumptions are editable, device-local, and exported with the results; they are clearly labeled as planning inputs rather than live prices or purchase recommendations.
- Country/region and currency are user-selectable. Amounts are entered directly in the chosen currency so offline mode never guesses an exchange rate; changing currency requires explicit cost review.
- Donation savings are limited to a complete listed power station, documented and professionally tested solar panels, and reviewed non-energized structure.
- Loose or rebuilt batteries, used protective devices, damaged cable, unknown connectors, and failed or uncertain parts are never counted as savings.
- Protection and qualified-review requirements remain visible even when a user enters a zero-dollar donated-service allowance.
- Wind plans require a complete system quote before their budget result is considered complete.
- A downloadable JSON report gives nonprofit and professional reviewers the targets, assumptions, confirmations, estimates, warnings, and non-negotiable limits.
- Two automated budget tests verify that donations remove only eligible categories, wind quotes remain included, and invalid negative costs clamp safely.

## V18 additions

- A Calculation Validation Lab in the Nonprofit Review screen with eight named regression checks and a deterministic 100-case input matrix.
- Independently written reference equations for battery Wh, solar W, wind W, battery Ah, remaining usable Wh, and runtime.
- Automated checks for hybrid energy conservation, invalid inputs, safety bounds, reserve cutoff, voltage scaling, monotonic sizing, and finite/nonnegative results.
- A downloadable dated JSON validation report that explicitly distinguishes internal software checks from independent professional review.
- A Node test suite runnable with `npm run test:math` and a documented external validation plan.
- A role-specific outreach map for Footprint Project, GRID Alternatives, Solar One, and Solar Energy International.

## V17 additions

- A dedicated Nonprofit Review screen with a 20–30 minute app-only testing protocol.
- A hard no-hardware boundary: reviewers must not connect, energize, open, modify, or test real equipment.
- Device-local safety, clarity, usefulness, offline, and 3D feedback with explicit privacy and non-endorsement confirmations.
- Downloadable JSON feedback and a plain-text reviewer packet; review data is not uploaded by this workflow.
- A copyable outreach request that asks for feedback without implying certification, approval, endorsement, or partnership.
- Four possible independent reviewers shown with official contact pages and explicit “not a partner” labels.

## V16 additions

- Separate Home, Solar, Wind + Site, Loads & AC, Build Lab 3D, and Crisis & Research screens.
- Four project-specific 3D build profiles with rotate, zoom, component inspection, and safe-concept/common-hazard views.
- A visible solar project catalog for essential power, portable cooling, refrigeration, and solar-wind hybrid planning.
- Lowest-cost reuse mode with hard rejection of damaged, unknown, modified, wet, burnt, swollen, or failed parts.
- Large-load screening now includes simultaneous demand, derated output, surge duration, and ambient-temperature limits.
- Compatibility results flow into the 3D build status and output-component colors.
- Portable plug-in air conditioners are eligible for screening when their exact running and compressor-starting requirements are documented.
- Central, fixed, and hardwired HVAC remains blocked.
- Compatibility now returns exactly one of three states: Documented match, Professional review required, or Do not connect.
- A documentation lock requires exact models, official manual links, and documented system status before a green result is possible.
- Modular battery-and-inverter combinations remain under professional review until the exact combination is added to the verified database or independently reviewed.

## Earlier capabilities

- Durable, consent-based AP Research session storage in D1.
- Automatic retry with a device-local backup if submission is temporarily unavailable.
- A private researcher dashboard at `/researcher` and combined CSV export.
- Anonymous completed-plan counting kept separate from “people helped.”
- Offline Crisis Mode using a service-worker cache for the planner, safety rules, saved plan, manual log, and last successful site analysis.
- Real location screening using sampled Copernicus elevation data and a seven-day solar/wind model outlook.
- An exact-label stand-alone compatibility screen for voltage, frequency, running power, surge power, connection type, and grounding requirement.
- A high-demand load gate that rejects fixed equipment and escalates motor/compressor loads.
- Manual monitoring and an explicitly simulated training mode; Bluetooth and automatic equipment control are not included.
- Solar-only, wind-only, and solar + wind hybrid planning with one shared battery-load calculation.
- Separate solar-array and wind-turbine nameplate estimates based on an explicit energy split.
- Adjustable wind capacity-factor screening with a hard warning to replace it using the exact turbine power curve and long-term hub-height wind data.
- Site-screen suggestions that can populate a conservative comparison without calling it a purchase recommendation.

## Safety boundary

Resilio does not energize equipment, control charging, replace a BMS, approve an installation,
or design any connection to household outlets, panels, wiring, or fixed circuits. It supports only
stand-alone manufacturer outputs powering compatible plug-in devices. A real system must use matched equipment, physical
overcurrent protection and disconnects, exact manufacturer documentation, and qualified review.
Manual or simulated readings are always unverified. A passing label comparison is not a safety certification.

## Research boundary

The study flow does not request names, addresses, exact location, device identifiers, battery
serial numbers, or telemetry. The researcher must obtain teacher/school approval and any required
parent or guardian permission before recruiting participants. Keep any participant-code key outside
Resilio and do not publish row-level data.

## Development

This is a Vinext/Cloudflare Worker project with a D1 database. The schema is in `db/schema.ts` and
the initial migration is in `drizzle/0000_grey_patch.sql`.
