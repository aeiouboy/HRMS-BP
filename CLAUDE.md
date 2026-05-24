# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A design prototype / redesign blueprint for **Humi**, a bilingual (EN/TH) HRMS aimed at Thai retail (Central group — note the CPN brand fonts). It is **not** a built application: there is no package.json, no bundler, no tests, and the directory is not a git repo. The deliverable is the prototype itself — interactive HTML screens reviewed in a browser.

## How it runs (no build step)

Everything is **browser-native React 18 + Babel Standalone** — JSX is transpiled in the browser at load time. To view a prototype, serve the repo root over HTTP and open one of the entry HTML files:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/<file>.html
```

Use a server, not `file://` — Babel fetches the `.jsx` files via `<script src>` and Chrome blocks those over `file://`. Relative paths for `.jsx`, `prod-tokens.css`, `styles.css`, and `fonts/` all resolve from the repo root, so serve from there.

There is nothing to install, lint, build, or test. Editing a `.jsx`/`.css` file and reloading the page is the entire dev loop.

## Cross-file module system

The `.jsx` files are **not** ES modules and do not import each other. They share state through globals:

- Each file attaches its public components to `window.*` at the bottom (e.g. `window.ProdHome = ProdHome;`, `window.ProdShell`, `window.PERSONAS`, `window.PERSONA_THEME`).
- Consumers read them back off `window` (e.g. `<window.ProdShell>…</window.ProdShell>`).
- React hooks come from the global UMD build: `const { useState, useEffect, useMemo, useRef } = React;` — never `import React`.
- An entry HTML file decides which screens exist by listing `<script type="text/babel" src="…jsx">` tags in order. Load order matters: a file's `window.*` exports must be defined before another file references them.

When adding a component, follow this pattern: define it, assign it to `window.X`, then add its `<script>` tag to whichever entry HTML should show it.

## Entry HTML files

Each HTML composes a different subset of the `.jsx` files:

- **`HRMS · Standalone.html`** (~2 MB) — full self-contained prototype, everything inlined.
- **`Humi Prototype.html`** → loads `humi-prototype.jsx` (~296 KB) — the main single-file live prototype; all app state lives in a root `App` component.
- **`HRMS Modules.html`** → a Design Canvas of 50+ artboards. Mounts `mod-*`, `prod-*`, `pattern-d-*` screens inside `DCArtboard`s grouped by `DCSection`.
- **`Humi System Design.html`**, **`HRMS · Redesign Blueprint.html`**, **`HRMS · Redesign Blueprint v1.html`** — design/spec decks.

## Design Canvas & deck tooling

A small reusable toolkit, separate from the HRMS app, used to present screens:

- **`design-canvas.jsx`** — a Figma-ish canvas wrapper (`DesignCanvas` / `DCSection` / `DCArtboard`). Artboards are reorderable, inline-editable, and openable fullscreen (←/→/Esc). State persists to the `.design-canvas.state.json` sidecar via a host bridge. All classes are `dc-`prefixed to avoid colliding with the hosted design's styles.
- **`deck-stage.js`** — a `<deck-stage>` web component for HTML slide decks: keyboard nav, speaker notes, auto-scaling to viewport, print-to-PDF (one slide per page), and PPTX-export support (`noscale` attr). Slides are hidden, not unmounted, so their React state survives navigation.
- **`tweaks-panel.jsx`** — live tweak controls (`TweakColor` / `TweakRadio` / `TweakToggle` / `useTweaks`).
- **`money-mask.js`** — loaded as plain JS (not Babel).

## Component families (root `.jsx` files)

- **`prod-*`** — current "production" Blueprint-style screens (`prod-shell`, `prod-home`, `prod-hire`, `prod-hire-clusters`, `prod-probation`, `prod-employee-detail`). `prod-tokens.css` holds the design tokens; `prod-icons.jsx` the icon set.
- **`mod-*`** — module screens by domain/persona: `mod-payroll-{1,2,3}`, `mod-time-{1,2,3}`, `mod-benefit-{1,2,3,admin}`, `mod-lifecycle-2`, `mod-offboard`, `mod-workforce`, `mod-orgchart`, `mod-roster-v2`, `mod-sidebar-full`, `mod-notifications`, `mod-employee`, `mod-extras`.
- **`pattern-d-*` / `mod-pd-*`** — "Pattern D" shell and persona home variants.
- **`db-*`** — leave/time dashboards (`db-leave-apply`, `db-time-1`, `db-time-2`, `db-shared`).
- **`icons.jsx` / `prod-icons.jsx`** — inline-SVG icon objects keyed by name (`I.search`, `I.bell`, …).
- **`screens/*.jsx`** — legacy v1 screens (Thai-only, depend on the old shell). Per `plan.md` these are **not reused** — rebuild inline in Blueprint style rather than importing them.

## Personas & RBAC

Six personas drive what every screen shows: **Employee · Manager · HR Admin · HRIS · SPD · System Admin**, gated by access tiers **A/B/C/D**. The sidebar filters its tree by the active persona's tier. Persona definitions live in `window.PERSONAS` / `window.PERSONA_THEME`; an impersonation banner (amber) appears when viewing as another persona. Every nav leaf carries both `label` (EN) and `labelTh` (TH).

## Design language ("Blueprint")

Cream canvas (`#F6F1E8`), CPN Condensed display type (Central's brand, in `fonts/` + `uploads/`), monospace eyebrow labels, teal accent (`#1FA8A0`), amber impersonation ribbon, indigo edit-mode. Tokens are CSS variables (`--bp-*`, `--color-*`) in `prod-tokens.css`. Per the plans: prefer **inline editing over modals**, every reversible action gets a **toast + undo**, every form supports **Enter to submit / Esc to cancel**, and every drawer dismisses on backdrop-click and Esc.

## The Next.js port (`src/frontend/`) — fragment, not an app

`src/frontend/` is an **in-progress, incomplete** extraction toward a real Next.js App Router build (`[locale]` i18n via next-intl, Tailwind, lucide-react, zustand stores, a `@/components/humi` design system). It has **no package.json or config**, only ~13 files, and many `@/…` imports (`@/stores/auth-store`, `@/components/humi`, `@/lib/admin/*`) point to files that are **not present here**. Treat it as reference fragments showing the intended production shape — it does not run as-is. Do not assume an import resolves; check first.

## Planning docs

- **`plan.md`** — functional build plan for the live prototype (Phases 0–13, status-tracked).
- **`plan-port.md`** — Thai-language audit of features not yet ported from the old prototype (benefit catalog/rules, leave & time policy builders, employee-detail tabs, org chart).
- **`plan-emp-detail.md`** — redesign of the Employee Detail experience (drawer → full-screen page).

Consult these before adding features — they record scope, persona ownership, and decisions already made.
