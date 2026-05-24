# HRMS Blueprint — Humi

A design prototype and redesign blueprint for **Humi**, a bilingual (EN/TH) HRMS aimed at Thai retail (Central / CPN group).

> **This is not a built application.** There is no `package.json`, bundler, or test suite. The deliverable is the prototype itself — interactive HTML screens reviewed in a browser. The `src/frontend/` folder holds early, incomplete fragments of an eventual production Next.js port (reference only — it does not run as-is).

## Running the prototype

Everything is **browser-native React 18 + Babel Standalone** — JSX is transpiled in the browser at load time. There is nothing to install, lint, build, or test. The dev loop is: edit a `.jsx`/`.css` file and reload the page.

Serve the repo root over HTTP and open one of the entry HTML files:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/Humi%20Prototype.html
```

Use a **server**, not `file://` — Babel fetches the `.jsx` files via `<script src>`, and Chrome blocks those over `file://`. Relative paths for `.jsx`, `prod-tokens.css`, `styles.css`, and `fonts/` all resolve from the repo root, so serve from there.

## Entry HTML files

Each HTML composes a different subset of the `.jsx` files:

| File | What it is |
|------|------------|
| `Humi Prototype.html` | Main single-file live prototype → loads `humi-prototype.jsx`; all app state lives in a root `App` component. |
| `HRMS · Standalone.html` | Full self-contained prototype (~2 MB), everything inlined. |
| `HRMS Modules.html` | Design Canvas of 50+ artboards; mounts `mod-*`, `prod-*`, `pattern-d-*` screens inside `DCArtboard`s. |
| `Humi System Design.html` | Design / spec deck. |
| `HRMS · Redesign Blueprint.html`, `… v1.html` | Redesign blueprint decks. |

## Cross-file module system

The `.jsx` files are **not** ES modules and do not import each other. They share state through globals:

- Each file attaches its public components to `window.*` at the bottom (e.g. `window.ProdHome = ProdHome;`).
- Consumers read them back off `window` (e.g. `<window.ProdShell>…</window.ProdShell>`).
- React hooks come from the global UMD build: `const { useState, useEffect, useMemo, useRef } = React;` — never `import React`.
- An entry HTML file decides which screens exist by listing `<script type="text/babel" src="…jsx">` tags **in order**. Load order matters: a file's `window.*` exports must be defined before another file references them.

When adding a component: define it, assign it to `window.X`, then add its `<script>` tag to whichever entry HTML should show it.

## Component families

- **`prod-*`** — current "production" Blueprint screens (`prod-shell`, `prod-home`, `prod-hire`, `prod-hire-clusters`, `prod-probation`, `prod-employee-detail`). `prod-tokens.css` holds the design tokens; `prod-icons.jsx` the icon set.
- **`mod-*`** — module screens by domain/persona: payroll, time, benefit, lifecycle, offboard, workforce, org chart, roster, sidebar, notifications.
- **`pattern-d-*` / `mod-pd-*`** — "Pattern D" shell and persona home variants.
- **`db-*`** — leave/time dashboards (`db-leave-apply`, `db-time-1`, `db-time-2`, `db-shared`).
- **`icons.jsx` / `prod-icons.jsx`** — inline-SVG icon objects keyed by name (`I.search`, `I.bell`, …).
- **`screens/*.jsx`** — legacy v1 screens (Thai-only). Per `plan.md` these are **not reused** — rebuild inline in Blueprint style.

## Design Canvas & deck tooling

A small reusable toolkit, separate from the HRMS app, used to present screens:

- **`design-canvas.jsx`** — a Figma-ish canvas (`DesignCanvas` / `DCSection` / `DCArtboard`). Artboards are reorderable, inline-editable, and openable fullscreen (←/→/Esc). State persists to the `.design-canvas.state.json` sidecar. All classes are `dc-`prefixed.
- **`deck-stage.js`** — a `<deck-stage>` web component for HTML slide decks: keyboard nav, speaker notes, auto-scaling, print-to-PDF, and PPTX export.
- **`tweaks-panel.jsx`** — live tweak controls (`TweakColor` / `TweakRadio` / `TweakToggle` / `useTweaks`).
- **`money-mask.js`** — loaded as plain JS (not Babel).

## Personas & RBAC

Six personas drive what every screen shows: **Employee · Manager · HR Admin · HRIS · SPD · System Admin**, gated by access tiers **A/B/C/D**. The sidebar filters its tree by the active persona's tier. Persona definitions live in `window.PERSONAS` / `window.PERSONA_THEME`; an amber impersonation banner appears when viewing as another persona. Every nav leaf carries both `label` (EN) and `labelTh` (TH).

## Design language ("Blueprint")

Cream canvas (`#F6F1E8`), CPN Condensed display type (Central's brand, in `fonts/` + `uploads/`), monospace eyebrow labels, teal accent (`#1FA8A0`), amber impersonation ribbon, indigo edit-mode. Tokens are CSS variables (`--bp-*`, `--color-*`) in `prod-tokens.css`. Conventions: prefer **inline editing over modals**, every reversible action gets a **toast + undo**, every form supports **Enter to submit / Esc to cancel**, and every drawer dismisses on backdrop-click and Esc.

## Planning docs

Consult these before adding features — they record scope, persona ownership, and decisions already made:

- **`plan.md`** — functional build plan for the live prototype (Phases 0–13, status-tracked).
- **`plan-port.md`** — Thai-language audit of features not yet ported from the old prototype.
- **`plan-emp-detail.md`** — redesign of the Employee Detail experience (drawer → full-screen page).

## Brand assets

`fonts/` and `uploads/` include Central's **CPN brand fonts**. These are proprietary to Central Group and included here only to make the prototype render as designed; they are not licensed for redistribution or reuse outside this prototype.
