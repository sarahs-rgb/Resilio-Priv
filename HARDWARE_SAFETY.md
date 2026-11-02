# V14 stand-alone solar + wind safety boundary

## Included connection path

- Default: compatible appliances plug directly into a listed standalone power station or inverter output.
- Large-load standalone: allowed only when appliance and source documentation match voltage, phase,
  frequency, connector, grounding method, continuous power, and starting/surge demand.
- Household outlets, panels, fixed circuits, and transfer equipment are outside Resilio's scope.
- Never connect a Resilio-planned source to building wiring.

V14 has no Bluetooth, live hardware transport, or equipment-control path. Monitoring is manual.

Portable plug-in air conditioners may be screened only as direct stand-alone loads. The exact appliance manual must provide voltage, frequency, running power, compressor-starting or surge power, connection, grounding, phase, and waveform requirements. Central, fixed, and hardwired HVAC is never supported. A modular battery-and-inverter combination remains under professional review until the exact set is in the verified component database or reviewed by a qualified professional.
The training animation is simulated and must never be described as hardware data.

Solar and wind generation must not be paralleled into one controller unless the exact equipment
manufacturers document that configuration. A wind system needs its documented turbine controller,
braking or overspeed protection, diversion load when required, tower/anchor design, grounding,
lightning protection, disconnects, clearances, and qualified review. The seven-day 10 m wind model
is only a site screen and cannot replace long-term hub-height measurements or a turbine power curve.

The included firmware is a low-voltage simulation. It is not a battery charger, BMS, disconnect, protective relay, or certified monitoring device.

For a real stand-alone prototype:

1. Select the exact battery, BMS, and charge controller first.
2. Obtain their official communication documentation and charging-temperature limits.
3. Do not place a hobby current sensor, development board, or improvised conductor in the battery's high-current path.
4. Keep the original BMS, manufacturer-approved charge controller, correctly rated fuse, and manual disconnect.
5. Have a qualified installer review enclosure, conductor, grounding, overcurrent, and commissioning decisions.
6. Treat manual and simulated readings as unknown—not safe. The physical equipment must remain safe when the phone or app fails.

The enclosure display is informational. Any emergency shutdown must be performed by certified hardware according to the manufacturer design, not by an unreviewed app command.

The legacy firmware example is retained only as deferred research material. It is not connected to the V12 app and is not part of the Shipathon demonstration.
