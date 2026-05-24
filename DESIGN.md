# System Design — HRMS Blueprint (Humi)

This document describes the **architecture** of the prototype: how it runs in the browser, how files share state, how the shells/navigation/RBAC work, the design-token system, cross-cutting runtime concerns, the presentation tooling, and the intended production shape.

For *what* the screens are and *how to run* them, see [README.md](README.md) and [CLAUDE.md](CLAUDE.md). For *scope and decisions*, see `plan.md`, `plan-port.md`, `plan-emp-detail.md`.

---

## 1. Architecture at a glance

This is a **zero-build, browser-native React prototype**. There is no compiler, bundler, package manager, or server-side code. An HTML entry file pulls React + Babel from a CDN and transpiles `.jsx` in the browser at page load.

```
                         ┌─────────────────────────────────────────────┐
                         │  Entry HTML  (e.g. "Humi Prototype.html")     │
                         │  ───────────────────────────────────────────│
   <link> prod-tokens.css│  • <link> design tokens + fonts (@font-face) │
   CDN: react / react-dom│  • React 18.3.1 UMD  (window.React)          │
   CDN: @babel/standalone│  • ReactDOM 18.3.1 UMD  (window.ReactDOM)    │
                         │  • Babel Standalone 7.29.0                    │
   inline <script>       │  • window.__resources shim (asset paths)     │
   money-mask.js         │  • money-mask.js (currency blur runtime)     │
                         │                                               │
   <script type=         │  • ordered <script type="text/babel"          │
    "text/babel" src=…>  │       src="*.jsx"> tags                       │
                         └───────────────────┬───────────────────────────┘
                                             │  Babel transpiles in-browser
                                             ▼
                         ┌─────────────────────────────────────────────┐
                         │  Global namespace (window.*)                  │
                         │  Each .jsx attaches its exports; consumers    │
                         │  read them back. No ES imports.               │
                         └───────────────────┬───────────────────────────┘
                                             ▼
                         ReactDOM.createRoot(#root).render(<App/> or <DesignCanvas/>)
```

**Consequence:** the unit of composition is the **entry HTML file**, not a build graph. Each HTML picks a subset of `.jsx` files and an order. Editing a `.jsx`/`.css` and reloading is the whole dev loop.

### Runtime dependencies (pinned, from unpkg with SRI)

| Dependency | Version | Global |
|------------|---------|--------|
| React | 18.3.1 (UMD dev build) | `window.React` |
| ReactDOM | 18.3.1 (UMD dev build) | `window.ReactDOM` |
| @babel/standalone | 7.29.0 | (transpiles `text/babel` scripts) |

Hooks are destructured from the UMD global at the top of each file:
```js
const { useState, useEffect, useMemo, useRef } = React;   // never `import React`
```

---

## 2. The cross-file module system (`window.*`)

`.jsx` files are **not** ES modules and do not import one another. They communicate through three mechanisms:

1. **Component/data exports** — each file assigns its public symbols to `window.*` at the bottom:
   ```js
   window.ProdShell = ProdShell;
   window.PERSONA_PROFILES = PERSONA_PROFILES;
   ```
2. **Consumption** — other files reference them off `window`, often directly in JSX:
   ```jsx
   <window.ProdShell persona="admin">…</window.ProdShell>
   const I = window.PI;   // icon set
   ```
3. **Load order is the dependency graph.** A symbol must be defined by an earlier `<script>` tag before a later one references it. There is no resolver — order in the entry HTML *is* the contract.

### Export inventory (selected)

| Family | Exports | Defined in |
|--------|---------|-----------|
| Shells | `ProdShell`, `PERSONA_PROFILES` · `PersonaShell`, `PERSONAS`, `PERSONA_THEME` · `Sidebar`, `Topbar`, `SidebarFullPoster` | `prod-shell.jsx` · `mod-extras.jsx` · `mod-sidebar-full.jsx` |
| Icons | `I` (full set), `PI` (prod set) | `icons.jsx`, `prod-icons.jsx` |
| Screens | `ProdHome`, `ProdHire`, `EmployeeDetail`, `ProbationInbox`, `OrgChartView`, `PR_*` (payroll), `TM_*` (time), `BN_*` (benefit), `EC_*` (employee center) | `prod-*`, `mod-*` |
| Primitives | `StatCard`, `SegTabs`, `PageHead` | `mod-extras.jsx` |
| Data | `ORG_PEOPLE`, `PERSONA_PROFILES` | `mod-orgchart.jsx`, `prod-shell.jsx` |

> Naming convention: `PR_` = payroll, `TM_` = time management, `BN_` = benefit, `EC_` = employee center; a trailing `_DB` is the dashboard variant, and the persona suffix (`_Employee`, `_Manager`, `_Admin`, `_Hris`, `_Spd`) selects the role view.

When adding a component: **define it → assign `window.X` → add its `<script>` tag** to the entry HTML(s) that should show it, after its dependencies.

---

## 3. Two shell systems + one self-contained app

There are **three** top-level composition roots; do not assume one shell.

### 3a. `ProdShell` — the Blueprint "production" shell (`prod-shell.jsx`)
- Props: `{ page, persona = "admin", defaultPanel, children }`.
- Owns `PERSONA_PROFILES` (5 personas: `employee · manager · admin · hris · spd`), each with `initials/name/role`, `accent` color, `avatarGrad`, and a `homeNav` landing target.
- **Nav is declared inline** as `NAV_FULL` groups, each item carrying a `show: [persona…]` allow-list. The visible tree is computed by filtering items by the active persona, then dropping empty groups (`prod-shell.jsx:64`).
- Renders the dark sidebar (`#0E1B2C`), a persona **accent stripe**, the brand logo (`window.__resources.humiLogo`), a sticky blur topbar with search/⌘K, `InboxButton`, `BellButton`, and a designer-only **"Canvas Preview" ribbon** that is explicitly *not* shown in production (`prod-shell.jsx:132`).

### 3b. `PersonaShell` + theme map (`mod-extras.jsx`)
- A thinner wrapper keyed by `persona`, driven by `window.PERSONAS` (identity) and `window.PERSONA_THEME` (a hue per persona: teal/sage/coral/butter/slate) used for the sidebar accent, active nav state, and topbar ribbon chip.
- Used primarily by the **Design Canvas** artboards (`HRMS Modules.html`).

> Both `PERSONA_PROFILES` (prod-shell) and `PERSONAS`/`PERSONA_THEME` (mod-extras) describe the *same five personas*, but are separate objects serving the two shells. Keep them in sync when editing persona identity.

### 3c. The live prototype's own `App` (`humi-prototype.jsx`)
The main single-file prototype (`Humi Prototype.html`) does **not** use `ProdShell`. It is a self-contained team/roster management app with its own root `App` and inline state (`humi-prototype.jsx:4715`):

```js
const [personaId, setPersonaId]   = useState("manager");  // active role
const [activeLeaf, setActiveLeaf] = useState("roster");   // current screen
const [openGroup, setOpenGroup]   = useState("team");     // expanded nav group
const [imp, setImp]               = useState(true);       // impersonation banner
const [team, setTeam]             = useState(INITIAL_TEAM);
const [approvals, setApprovals]   = useState(INITIAL_APPROVALS);
const [toasts, setToasts]         = useState([]);
// + drawer/modal flags: psOpen, paletteOpen, settingsOpen, showBulk, editingShiftId, empHubName…
```

It mounts once: `ReactDOM.createRoot(document.getElementById("root")).render(<App/>)` (`humi-prototype.jsx:5093`).

---

## 4. Personas & RBAC

Six personas (CLAUDE.md lists **Employee · Manager · HR Admin · HRIS · SPD · System Admin**) gated by access tiers **A/B/C/D**. The prototype data defines five active role objects; "System Admin" is the implied top tier.

### Identity vs. access vs. theme — three separate concerns
| Concern | Where | Shape |
|---------|-------|-------|
| **Identity** | `PERSONAS` (mod-extras), `PERSONA_PROFILES` (prod-shell) | initials, name, role, tone |
| **Access (RBAC)** | `persona.access` array | list of module/tier keys the persona may see |
| **Theme** | `PERSONA_THEME` | accent hue, soft fill, glow, short label |

### How RBAC actually filters the UI
Two patterns are used:

- **Declarative allow-list (ProdShell):** every nav item has `show: ["employee","manager",…]`; the tree is filtered per persona (`prod-shell.jsx:45–65`).
- **Tier intersection (live App):** modules carry a group key `g`; visible leaves are the intersection of `MODULES` with `persona.access`:
  ```js
  const visibleLeaves = MODULES
    .filter(m => persona.access.includes(m.g))
    .flatMap(m => m.leaves.map(l => l.id));
  ```
  On persona switch, a `useEffect` recomputes visible leaves and **resets `activeLeaf`** if the current screen is no longer permitted (`humi-prototype.jsx:4780`) — so switching role can never strand you on a forbidden screen.

### Impersonation
Switching persona (via `PersonaSwitcher` or the ⌘K command palette) raises an **amber impersonation banner** and a toast announcing the new role + its access tiers. The designer-only "Canvas Preview" ribbon in `ProdShell` is a separate affordance that names the persona being previewed and is stripped in production.

### Bilingual contract
Every nav leaf carries both `label` (EN) and `labelTh` (TH). The production port formalizes this through `next-intl` `[locale]` routing (see §8).

---

## 5. Design-token system (`prod-tokens.css`)

A single CSS file is the design system's source of truth. It was **ported from the production globals** (`/* ported from aeiouboy/hr@master src/frontend/src/app/globals.css */`), which makes the prototype and the eventual Next.js app share one token vocabulary.

### Layers
1. **Fonts** — `@font-face` for the **CPN** family (Central's brand: Light/Regular/Bold + italics) and **CPN Condensed** (display), loaded from `fonts/`. Fallback chain includes `IBM Plex Sans Thai` for Thai glyphs.
2. **Color tokens** — `--color-canvas` (`#F6F1E8` cream), inks (`--color-ink…faint`), hairlines, the teal **`--color-accent` `#1FA8A0`**, an indigo `--color-accent-alt` (edit mode), and semantic sage/butter/coral/success/warning/danger/info pairs (each with a `-soft` variant).
3. **Type roles** — `--font-sans` (CPN) for body, `--font-display` (CPN Condensed) for headings; `h1–h4` are forced to display.
4. **Geometry** — `--radius-xs…xl` (6→28px), `--shadow-sm/md/lg`.
5. **Component classes** — `humi-*` for the shell/cards/tags/buttons/lists/calendar/ring, `wizard-*` + `step-*` for the multi-step wizard, `field-*` for forms.

### Design language ("Blueprint")
Cream canvas, dark-ink sidebar, monospace eyebrow labels, teal accent, amber impersonation, indigo edit-mode. Interaction conventions baked into the components: **inline editing over modals**, **toast + undo** on reversible actions, **Enter-to-submit / Esc-to-cancel**, **drawers dismiss on backdrop-click + Esc**.

---

## 6. Cross-cutting runtime concerns

### 6a. Resource injection (`window.__resources`)
Assets are referenced indirectly so the same `.jsx` works both unbundled and inside the production bundler:
```js
// Entry HTML shim — relative-path fallback
window.__resources = window.__resources || {};
if (!window.__resources.humiLogo) window.__resources.humiLogo = "humi-logo-final-2.png";
```
Every logo render reads `window.__resources.humiLogo` (`prod-shell.jsx:87`, and all `mod-pattern-d-*`, `mod-sidebar-full`). The production bundler is expected to **replace `window.__resources`** with hashed asset URLs at runtime.

### 6b. Money masking (`money-mask.js` + `prod-tokens.css`)
Sensitive currency is privacy-masked by default:
- `money-mask.js` wraps currency values at runtime in `<span data-money>`, stashing the real value on `data-money-real`.
- `body.mask-money` (default-on) swaps the text to a monospaced `฿*****`.
- Hover on a value, or the **eye toggle in the topbar**, reveals it globally.
- Loaded as **plain JS**, *not* `text/babel`.

### 6c. Keyboard model
- **⌘K** opens the `CommandPalette` (`humi-prototype.jsx:1297`) for nav + persona switching.
- A global `keydown` `useEffect` implements layered **Esc** dismissal — closing the topmost open surface first (shift editor → bulk → inbox/notifs → persona switcher), so Esc never closes two things at once (`humi-prototype.jsx:4757`).
- Fullscreen artboard navigation uses ←/→/Esc (Design Canvas).

---

## 7. Presentation tooling (separate from the HRMS app)

These are reusable utilities for *presenting* the screens; they are `dc-`/web-component-scoped to avoid colliding with the hosted design.

### 7a. Design Canvas (`design-canvas.jsx`)
A Figma-ish infinite canvas: `DesignCanvas` › `DCSection` › `DCArtboard`.
- **Viewport** (`DCViewport`) — pan/zoom transform; transform persisted to `localStorage`; broadcasts zoom/present events to the host via `window.parent.postMessage`.
- **Persistence** — section/artboard ordering and inline edits save to a **`.design-canvas.state.json` sidecar** next to the HTML. Reads go through plain `fetch('./.design-canvas.state.json')`; **writes require the host `window.omelette.writeFile` bridge** (`design-canvas.jsx:166`) — editing only works inside that runtime, otherwise it degrades to read-only.
- **Export** — artboards export to PNG by inlining linked CSS and rasterizing (`toDataURL`, `design-canvas.jsx:561`).
- **Focus mode** — `DCFocusOverlay` opens an artboard fullscreen with ←/→/Esc.
- All classes are `dc-`prefixed.

### 7b. Deck stage (`deck-stage.js`)
A `<deck-stage>` **custom element** (Shadow DOM) for HTML slide decks (`Humi System Design.html`, the Blueprint decks):
- `observedAttributes = ['width','height','noscale']`; auto-scales authored-size slides to the viewport unless `noscale` is set.
- Keyboard navigation + speaker notes.
- **Print-to-PDF**: an injected `@media print` block lays each slide out as its own page at authored size with `print-color-adjust: exact`.
- **PPTX export**: sets `noscale` so DOM capture sees authored dimensions.
- Slides are **hidden, not unmounted**, so per-slide React state survives navigation.

### 7c. Live tweaks (`tweaks-panel.jsx`)
`TweakColor` / `TweakRadio` / `TweakToggle` + `useTweaks` — runtime controls for design exploration.

---

## 8. The production target (`src/frontend/`) — reference, not running

`src/frontend/` is an **incomplete extraction** toward a real Next.js App Router build. It has **no `package.json` or config** and many `@/…` imports point to files not present here. Treat it as the intended production shape, not a runnable app.

Observed structure:
```
src/frontend/
├── public/                          humi-logo{,-white}.png
└── src/
    ├── app/
    │   ├── globals.css               ← canonical token source (prod-tokens.css is ported from this)
    │   └── [locale]/                 next-intl i18n routing (EN/TH)
    │       ├── home/page.tsx
    │       └── admin/hire/
    │           ├── page.tsx
    │           └── clusters/         ClusterJob · ClusterWho · ClusterReview
    └── components/admin/wizard/      WizardShell · Stepper · SectionHeader
                                      CollapsibleSectionCard · WizardFooter
```

Intended stack (per CLAUDE.md): **Next.js App Router**, `[locale]` i18n via **next-intl**, **Tailwind**, **lucide-react**, **zustand** stores, and a `@/components/humi` design system.

### Migration mapping (prototype → production)
| Prototype concept | Production equivalent |
|-------------------|-----------------------|
| `window.*` exports + load order | ES modules + bundler graph |
| `<script type="text/babel">` in-browser transpile | Next.js build |
| Inline `App` state (`humi-prototype.jsx`) | zustand stores (`@/stores/*`) |
| `label`/`labelTh` per leaf | next-intl `[locale]` messages |
| `prod-tokens.css` CSS vars | Tailwind theme + `globals.css` (shared vocabulary) |
| `window.__resources.humiLogo` | bundler asset imports / `public/` |
| Multi-step `wizard-*` CSS | `components/admin/wizard/*` (`WizardShell`, `Stepper`, …) |

---

## 9. Entry-point map

| Entry HTML | Mounts | Purpose |
|------------|--------|---------|
| `Humi Prototype.html` | `humi-prototype.jsx` → `<App/>` | Main live prototype (self-contained `App`) |
| `HRMS · Standalone.html` | everything inlined (~2 MB) | Fully portable single file |
| `HRMS Modules.html` | `design-canvas.jsx` + all `mod-*`/`prod-*`/`pattern-d-*` | Design Canvas of 50+ artboards |
| `Humi System Design.html` | `deck-stage.js` + slides | Spec/design deck |
| `HRMS · Redesign Blueprint{,v1}.html` | deck | Redesign blueprint decks |

---

## 10. Design principles & invariants

1. **No build step is a feature, not a gap.** Keep the prototype runnable by `python3 -m http.server` + reload. Don't add a bundler to the prototype itself — that's what `src/frontend/` is for.
2. **Globals over imports.** New components follow define → `window.X` → `<script>`. Respect load order.
3. **One token vocabulary.** `prod-tokens.css` mirrors the production `globals.css`; change tokens in lockstep so the port stays cheap.
4. **Persona-first.** Every screen is viewed *as* a persona; RBAC filtering and the impersonation banner are not optional decoration.
5. **Reversible, inline, keyboard-friendly.** Inline edit > modal; toast + undo on reversible actions; Enter/Esc on every form; backdrop + Esc on every drawer.
6. **Legacy `screens/*.jsx` are not reused.** Rebuild inline in Blueprint style (per `plan.md`).
