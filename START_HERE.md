# Resilio V20 — start here

This archive contains the complete web-app source for the current private Resilio V20 prototype.

## Fastest way to inspect the main app

Open `public/resilio.html` in VS Code. It contains the screens, controls, 3D canvas model, Scavenger Mode, terrain/site interface, safety gates, offline interface, research form, and most browser-side behavior.

The calculation functions are separated into `public/resilio-math.js`, with automated tests in `tests/resilio-math.test.cjs`.

The Build Lab also includes an interactive, conceptual energy-flow walkthrough in `public/resilio-flow.js`. Its arrows explain component roles only; they are not a circuit diagram or wiring instructions.

## Learn web coding by rebuilding a tiny planner

Open `learning-lab/index.html` in a browser to use the standalone coding classroom. It includes a live preview and four beginner lessons for HTML, CSS, click events, and simple math. Lesson drafts are saved in that browser between visits; use **Reset this lesson** to restore a lesson's starter code. The classroom runs without installing packages. Its math example is for coding practice only and does not size or recommend electrical equipment.

## Run locally

Requirements: Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install
pnpm run test:math
pnpm run dev
```

Then open the local address printed in the terminal.

## Important folders

- `public/` — main Resilio interface, calculator module, offline service worker, and web manifest.
- `app/` — Vinext/React wrapper, API routes, and researcher dashboard.
- `db/` and `drizzle/` — research database schema and migrations.
- `tests/` — repeatable calculation tests.
- `README.md`, `SAFETY_AUDIT.md`, and `VALIDATION_PLAN.md` — current capabilities, limitations, and required external review.

## Safety and scope

This is an educational and research prototype. It is not installation approval, product certification, a construction-ready electrical design, or permission to connect equipment to household wiring. Do not remove the safety gates while learning or testing. Use fictional inputs and no real hardware for app testing.

The earlier experimental microcontroller demonstration is intentionally excluded from this web-source package because the current release does not connect to or control hardware.

## Private services

No passwords, write tokens, private environment files, generated dependencies, or build outputs are included. The included `.openai/hosting.json` contains only the non-secret project manifest required by the build configuration. Research API and dashboard features require local database/environment configuration. The browser-only planning interface and math tests can still be studied independently.
