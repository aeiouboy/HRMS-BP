# Humi · Live Prototype — Functional Build Plan

Goal: every menu in the prototype is fully functional (state, validation, multi-step flows, undo, drawers), matching the feature scope of `HRMS Modules.html` (50+ canvas artboards across 5 personas × 6 modules).

Status legend: ✅ done · 🔨 in progress · ⏳ todo

---

## Phase 13 · Field mapping from old HRMS Modules.html → new prototype (🔨 in progress)

The original `HRMS Modules.html` is a Design Canvas with 50+ artboards. Each artboard renders a screen from one of these source files:
- `mod-pd-*` (Pattern D shell + home)
- `mod-pattern-d-*` (Time/Benefit by persona)
- `mod-payroll-*`, `mod-time-*`, `mod-benefit-*`
- `mod-lifecycle-*`, `mod-offboard`, `mod-workforce`
- `prod-hire`, `prod-probation`, `prod-employee-detail`
- `screens/*` (legacy v1 — requests, announcements, admin permissions, inbox)

### 13.1 · Bilingual sidebar (✅ done)
- Every leaf now has both `label` (EN) and `labelTh` (TH).
- 4 new leaves added per old IA: Announcements (A), Confirmation Letter, Transfer (C), and 4 system-admin leaves (Policy Builder, Master Catalog, Regularization Queue, Document Review under D).

### 13.2 · Persona-specific screens to add (⏳)
Each persona's screen list mirrors what HRMS Modules.html surfaced:

#### Employee (A)
- `announce` — Announcements feed (port from legacy `screens/announcements.jsx`)

#### Manager (B)
- *No new screens — Roster, Swap, Inbox, Probation, Perf all done*

#### HR Admin (C)
- `confirm` — Confirmation Letter (after probation passes) — letter preview + sign + send
- `transfer` — Transfer Workspace — checklist + new role offer + effective date + letter

#### HRIS (D access via C in old IA — moving to D)
- `policy` — Policy Builder (Attendance / Leave / OT / Holiday rules)
- `catalog` — Master Catalog (Plan templates, position bands, location hierarchy, cost centres)

#### SPD (D access)
- `regular` — Regularization Queue (timesheet correction approvals)
- `docreview` — Document Review Queue (hire/leave/claim docs needing SPD verification)

### 13.3 · Field-level mappings from old data → my new screens (⏳)
Pull richer field structures from the old code:

- **Hire wizard** — old had 3 clusters; my 4-step covers them. Already mapped:
  - Cluster 1 "Who" → my step 1
  - Cluster 2 "Job" → my step 2
  - Cluster 3 "Review" → my step 4
  - + I added step 3 "Comp"

- **Roster** — old had 3 variants (time-first, bulk-select v2, regional 3-store).
  - My current single-store hourly Gantt covers time-first.
  - Optional: add Regional 3-store view as a tweak/toggle.

- **Benefit** — old separates Plans / Eligibility Rules / Master catalog into 3 views.
  - My current single page mixes them. Optional: tab them apart.

- **Onboarding** — old "Day 1 → 90" map matches mine. ✅

- **Exit interview** — old had a separate employee form. Mine has Offboarding workspace only. Add Exit interview as employee-facing form in Requests or as separate route.

### 13.4 · Build order
1. ✅ Bilingual sidebar (TH labels)
2. ⏳ Announcements feed (1 screen)
3. ⏳ HRIS · Policy Builder + Master Catalog (2 screens)
4. ⏳ SPD · Regularization Queue + Document Review (2 screens)
5. ⏳ HR Admin · Confirmation Letter + Transfer Workspace (2 screens)
6. ⏳ Employee · Exit Interview form (1 screen, in Requests)
7. ⏳ Show TH labels alongside EN in sidebar (toggle)

Total: ~8 new screens + sidebar visual polish.

---

## Phases 0–12 · ✅ Complete (see below for reference)

- **Phase 0** Foundation (Blueprint design language, persona switcher, mobile shell, toasts)
- **Phase 1** Roster & Shifts (Gantt, editor, coverage strip, bulk assign)
- **Phase 2** 6-persona RBAC
- **Phase 3** Approvals queue (segmented filter, approve/reject, drawer)
- **Phase 4** Lifecycle — Hire wizard, Onboarding, Probation review
- **Phase 5** Payroll — payslip drawer, run-payroll 4-step wizard
- **Phase 6** Benefit Claims — wizard + manager approve
- **Phase 7** Shift Swap (3-step)
- **Phase 8** Offboarding (clearance + final pay + docs)
- **Phase 9** Asset Management
- **Phase 10** Org Chart
- **Phase 11** Employee Hub (9 tabs)
- **Phase 12** Polish — ⌘K palette, Settings drawer, mobile parity, print stylesheet

---

## Engineering notes

- All state in root `App` component.
- Every flow gets toast + (where reversible) undo.
- Every form gets keyboard support (Enter to submit, Esc to cancel).
- Every drawer/modal: backdrop-click and Esc both dismiss.
- TH labels live on each leaf as `labelTh`; UI uses `label` (EN) primarily, with `labelTh` shown as a secondary subtitle under nav-trigger and child rows.


- ✅ Blueprint design language (cream canvas, CPN Condensed, mono eyebrows, amber ribbon)
- ✅ Real Humi logo (dark + light variants)
- ✅ Sidebar accordion + RBAC tree filtering by persona access tier
- ✅ Impersonation banner with "switch back" action
- ✅ Mobile shell: bottom nav (4 macro folders) + bottom sheet (leaves) + locked tabs
- ✅ Toast system with undo
- ✅ Persona switcher panel (top-right hub)
- ✅ Top-bar popovers: Inbox + Notifications
- ✅ Date nav (◀ Today ▶) with persistent state
- ✅ Filter chip dropdowns

## Phase 1 · Roster & Shifts (✅ complete — flagship flow)

- ✅ 24-hour Gantt with shift bars + break hatching
- ✅ Coverage strip (single row, color-coded)
- ✅ Click bar → editor drawer slides in
- ✅ Time override: ±30min steppers, direct HH:MM input, presets (Shift ±1h, FT 7–16, Night 16–23)
- ✅ Add/remove break with time inputs
- ✅ Shift type variant picker (FT / Manager / PT / Night)
- ✅ Delete shift → "Add shift" placeholder returns
- ✅ Bulk assign modal with per-employee toggle
- ✅ Mobile: stacked timeline node cards

## Phase 2 · 5-persona RBAC (✅ complete)

- ✅ Employee · Manager · HR Admin · HRIS · SPD · System Admin (6 total with sysadmin)
- ✅ Access tiers A/B/C/D enforce visible modules
- ✅ Persona switch persists across navigation

## Phase 3 · Approvals (✅ complete)

- ✅ Live state for 7 sample requests
- ✅ Segmented filter (All · Pending · Approved · Rejected) with live counts
- ✅ Inline Approve/Reject/View buttons per row
- ✅ Status badge updates, row dims when resolved
- ✅ Reopen button on resolved rows
- ✅ Detail drawer: reason, approval chain, SLA, manager note textarea, action footer
- ✅ Toast with undo on every action

## Phase 4 · Lifecycle (✅ complete)

- ✅ **Hire wizard** — 4 steps (Who/Job/Comp/Review) with auto-calc PF & pro-rated first payroll
- ✅ **Onboarding checklist** — 4 phases × 16 tasks with owner + due date + progress bar
- ✅ **Probation review** — 5 criteria × 1–5 rating + 3-way decision + manager note + submit gate

---

## Phase 5 · Payroll (⏳ next)

### 5.1 · Employee payslip detail drawer
- Click any payslip row → drawer with line-item breakdown
- Sections: Earnings (base, OT, allowances) · Deductions (tax, PF, SSO) · Nett
- Bank deposit detail · YTD running totals · PDF download

### 5.2 · HR Admin · Run Payroll flow
- 4-step run: **Lock period → Variance review → Approve → Disburse**
- Variance report: anomalies vs last month (OT spikes, new hires, terminations)
- Per-employee diff preview with drilldown
- Audit log entry per run

### 5.3 · HRIS · Payroll config
- Pay components catalog (base, OT 1.5×, OT 2×, allowances, deductions)
- Tax brackets editor (Thailand ภ.ง.ด.91)
- Pay calendar (lock date, pay date, cutoff)

### 5.4 · SPD · Payroll review
- Spot-check queue: random sample of payslips
- Per-slip checklist (Tax/PF/SSO/Allowance correct?)
- Flag-and-return loop back to HR Admin

## Phase 6 · Benefit claims (⏳)

### 6.1 · Employee · File a claim
- Multi-step: **Plan select → Receipt upload → Amount/date → Submit**
- Show remaining annual cap per category
- Validate amount ≤ cap
- Smart routing (≤ ฿2K = manager, > ฿2K = manager + HR)

### 6.2 · Manager · Approve claims
- Same drawer pattern as Approvals but with receipt thumbnail preview
- Caps showing per direct-report
- Bulk approve for small-amount claims

### 6.3 · HR Admin · Benefit plan catalog
- Plans list, click → edit drawer
- Eligibility rules editor (drag/drop conditions)
- Per-plan utilization chart

### 6.4 · HRIS · Master catalog
- Carrier setup, plan templates, tier definitions

### 6.5 · SPD · Document review
- Queue of submitted claims awaiting doc verification
- Side-by-side receipt + claim form
- Approve / send back with note

## Phase 7 · Shift Swap (⏳)

- Employee initiates swap with named coworker
- Coworker accepts/rejects → manager final approval
- Roster auto-updates on approve
- Conflict detection (overlapping shifts, max hours)

## Phase 8 · Offboarding (⏳)

### 8.1 · Employee · Submit resignation
- Reason picker · last day · exit interview form
- Auto-calculate notice period compliance

### 8.2 · Manager · Approve resignation
- Drawer with reason, replacement need, knowledge handoff checklist

### 8.3 · HR Admin · Offboarding workspace
- Clearance checklist (return uniform, laptop, badge, keys, library books)
- Final pay calculation (unused leave, severance, prorated bonus)
- Letter generation (cert of employment)
- Exit interview review

## Phase 9 · Asset Management (⏳)

- Asset categories: Uniform · IT · Badge · Keys · Other
- Per-employee assignment table
- Issue / return / damage report flows
- Inventory overview with low-stock alerts

## Phase 10 · Org Chart (⏳)

- Tree view of 248 employees
- Click node → drawer with employee detail
- Zoom / pan / fit-to-screen controls
- Filter by department, location, level
- Persona-specific focus (Manager sees direct reports, HRIS sees whole company)

## Phase 11 · Employee Detail Hub (⏳)

- 9 action buttons per spec: Profile · Job history · Comp · Benefits · Time · Documents · Performance · Notes · Audit
- Each action opens an inline panel or drawer
- Edit mode with field-level history

## Phase 12 · Polish (⏳)

- ⌘K command palette (jump to any leaf, action, employee)
- Settings drawer (theme, density, notifications)
- Login / logout flow
- Empty states with helpful next-action prompts
- Loading shimmer for tables
- Print stylesheet for payslips / certificates
- Mobile parity for every flow (currently desktop-first)

---

## Build order (recommended sequencing)

| Round | Phases | Why |
|---|---|---|
| ✅ 1 | Foundation + Roster | Flagship flow, sets visual language |
| ✅ 2 | RBAC personas + Approvals | Unlocks manager workflows |
| ✅ 3 | Lifecycle (Hire/Onboard/Probation) | High-value HR flows |
| 🔨 4 | Payroll (5.1, 5.2) | Touches every employee |
| 5 | Benefits (6.1, 6.2) | Daily-use flow for staff |
| 6 | Shift Swap | Closes the roster loop |
| 7 | Offboarding | Completes the lifecycle arc |
| 8 | Asset + Org Chart | Lower-frequency but visible |
| 9 | Employee Detail Hub | Connective tissue (linked from many flows) |
| 10 | Polish (⌘K, settings, mobile parity) | Pro-level finish |

Per-round contract: **functional**, not visual only — state persists, undo works, validation gates submission, toasts confirm every action.

---

## Engineering notes

- All state lives in the root `App` component for now; if file grows past ~2500 lines, split into per-module JSX files and import via script tags.
- Avoid React context for now (small app); pass props.
- Every flow gets a toast + (where reversible) an undo.
- Every form gets keyboard support (Enter to submit, Esc to cancel).
- Every drawer/modal: backdrop-click and Esc both dismiss.
- Existing screens in `screens/*.jsx` are Thai-only / depend on the old v1 shell; **not reused** — rebuild inline in Blueprint style.
