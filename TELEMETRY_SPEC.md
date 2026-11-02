# Deferred telemetry research — not included in V12

Resilio V12 does not use Bluetooth, accept live hardware packets, or control equipment. The live
product uses manual entries and a clearly labeled training simulation. This document is retained
only as non-shipping research for a later independently reviewed phase.

## Deferred prototype transport

The first supported reference path is monitoring-only: documented Victron VE.Direct telemetry via
official galvanically isolated VE.Direct-to-USB interfaces to a low-voltage bridge computer. Resilio
receives read-only data on the local network after explicit permission. Remote/cloud access remains a
separate opt-in and is not enabled by nearby access.

The hardware bridge emits one UTF-8 JSON object approximately every 1–5 seconds.

```json
{
  "schema_version": 1,
  "source": "demo",
  "sequence": 42,
  "uptime_ms": 63000,
  "soc_pct": 65.0,
  "battery_capacity_wh": 2400.0,
  "stored_energy_wh": 1560.0,
  "battery_temp_c": 26.4,
  "solar_input_w": 318.0,
  "load_output_w": 141.0,
  "safety_state": "safe",
  "alarm_code": "none"
}
```

## Rules

- `source` must be `demo`, `manual`, or a reviewed adapter identifier.
- The app must visibly distinguish simulated/manual data from verified hardware data.
- Missing, stale, malformed, implausible, or out-of-order packets are not treated as safe readings.
- `safety_state` may display a warning, but the app never replaces hardware protection.
- The BMS, charge controller, fuses, disconnects, and their manufacturer-defined limits remain authoritative.
- A real adapter must use only a manufacturer-documented data port and electrical isolation appropriate to that interface.
- Secrets, Wi-Fi credentials, precise location, and personal identifiers must never appear in telemetry packets.

## Deferred Bluetooth LE profile

- Service UUID: `83f10000-7d5a-4c91-b6aa-28d5d8d64001`
- Notify/read characteristic: `83f10001-7d5a-4c91-b6aa-28d5d8d64001`
- Payload: the JSON object above encoded as UTF-8.

Production firmware should use a compact binary or chunked protocol if a JSON packet exceeds the negotiated BLE payload size.
