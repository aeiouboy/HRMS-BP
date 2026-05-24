# Port Plan · ฟีเจอร์ที่ยังไม่ครบ

จาก audit prototype เดิม (`screens/*.jsx`, `prod-*.jsx`, `HRMS Modules.html`) เทียบกับ Humi Prototype ปัจจุบัน — ฟีเจอร์ที่ยัง port มาไม่ครบ

---

## 🟥 Critical · ยังไม่มีเลย

### 1. Benefit Plan Catalog (HR Admin)
Prototype เดิมมีหน้าจัดการ **catalog ของ plan template** เต็มรูปแบบ ปัจจุบันมีแค่ list สั้นๆ:

**ต้องเพิ่ม:**
- **Plan template editor** — สร้าง/แก้ plan template (carrier, cap, tier eligibility, claim rules)
- **Eligibility rules builder** — drag/drop conditions (เช่น "Tier B + tenure ≥ 6 months + FT only")
- **Carrier directory** — รายการ carrier (AIA / FWD / K-Asset) + contact / SLA / claim portal URL
- **Plan utilization dashboard** — chart % enrolled, claim volume, cap exhaustion ต่อ plan
- **Cost forecasting** — รวมต้นทุน plan ทั้งหมด vs budget

### 2. Benefit Rules Engine
รายละเอียดที่ต้อง config ต่อ plan แต่ละตัว:

- **Claim caps**: per-claim limit, per-month limit, per-year limit, per-lifetime limit
- **Co-pay**: % co-insurance, deductible amount
- **Dependent coverage**: spouse / children (≤ age 18 / 23 / unlimited)
- **Waiting period**: 0 / 30 / 60 / 90 / 180 days after hire
- **Exclusions**: list of conditions / providers not covered
- **Documentation requirements**: receipt only / receipt + diagnosis / pre-auth required
- **Auto-routing rules**: amount thresholds → manager / HR / SPD / external adjudicator

### 3. Leave Policy Builder
Prototype เดิมมี **policy builder** สำหรับ leave types ที่ละเอียดกว่าปัจจุบัน:

- **Per-leave-type config**: name, code, paid/unpaid, deducts from balance?
- **Accrual rules**: lump sum at start / monthly accrual / yearly grant
- **Carry-over rules**: max days, expiry date, expires on rollover
- **Approval workflow per type**: who approves (mgr only / mgr + HR / auto), SLA hours
- **Eligibility**: tenure threshold, employment type, locations
- **Blackout dates**: dates where leave can't be requested
- **Documentation**: medical cert required after X days
- **Annual reset date**: calendar Jan 1 / hire anniversary / fiscal year

### 4. Time & Attendance Policy
ปัจจุบันมี skeleton ใน "Policy Builder" แต่ไม่ลึก:

- **Shift definitions**: morning/swing/night templates with default break rules
- **Overtime rules**:
  - weekday rate (1.5×) · holiday rate (2×) · sunday rate
  - night premium (+25% for 22:00–06:00)
  - hard cap per week / per month (legal compliance)
  - pre-approval required above X hrs
- **Clock-in rules**:
  - grace period before late (10 min default)
  - geofence radius
  - require photo / signature
  - require manager attest if no clock-in
- **Auto-clock-out**: time threshold for forgotten sessions
- **Break rules**:
  - auto-deduct above X hours
  - meal break required for shifts ≥ 6h
  - paid vs unpaid breaks
- **Tardiness escalation**: 3 strikes → warning → coaching

---

## 🟧 Major · มีบางส่วนแต่ตื้น

### 5. Compensation Detail
ปัจจุบัน Comp tab ใน Employee Detail Page เป็น placeholder. ต้อง port:

- **Salary history table** with reasons (annual review / promo / market adj / merit)
- **Salary adjustment inline form** — new amount + effective date + reason + approver chain
- **Bonus tracking** — target % / actual % / payout history
- **Stock/equity** (if applicable) — grants, vesting schedule
- **Allowances breakdown** — housing / transport / meal / phone
- **Tax-related fields** — tax bracket, deduction allowances declared
- **Payroll-affecting elements** — court orders, garnishments, advances outstanding

### 6. Time & Leave Detail
Tab placeholder. ต้องการ:

- **Attendance log** — daily clock-in/out for entire history with edit/correction trail
- **Leave balance adjustment** (HR override) — credit/debit balance with reason
- **Pending leave requests** — inline approve from emp detail
- **Leave forecasting** — show future approved leaves + scheduled OT
- **Shift assignment history** — past 90 days roster

### 7. Documents Tab
ปัจจุบันมีแค่ list 7 docs. ต้องการ:

- **Document categories**: Contract / ID / Tax / Visa / Performance / Other
- **Upload with metadata**: doc type, expiry date, tags, visibility
- **Expiry alerts**: visa renewal, work permit, certifications
- **Generate letters**: certificate of employment / salary cert / income tax letter / NDA / promotion letter — pre-filled templates with sign + send
- **E-signature flow**: send to employee for signature, track status
- **Audit per doc**: who uploaded / viewed / downloaded / changed

### 8. Performance Tab
มีแค่ goals table. ต้องการ:

- **Goals tab**: SMART goals with progress %, weight, alignment with team OKRs
- **Reviews tab**: 1:1 check-ins, mid-year, annual reviews with rating + comments
- **360 feedback**: peer / report / customer feedback collection
- **PIP (Performance Improvement Plan)**: when triggered, milestones, timeline
- **Promotion readiness**: criteria checklist
- **Calibration**: team-level review comparison

### 9. Audit Tab
มีแค่ 8 events. ต้องการ:

- **Filter by**: date range, actor, action type, target field
- **Export to CSV**
- **Drill into each event**: who, when, before/after values, IP, device
- **Sensitive action highlighting**: salary changes, terminations, permission changes

---

## 🟨 Nice-to-have · prototype เดิมมี

### 10. Hire Wizard add-ons
- **Work permit section** (conditional on non-TH nationality) — passport, visa, expiry, work permit number
- **Dependents section** — for spouse/children that affect benefits
- **Forward-date warning** — when hire date is in future, banner about SPD approval
- **Auto username generation** — based on name with collision check
- **Photo upload** for ID badge
- **Bank account capture** — for payroll setup
- **Tax setup** — withholding allowances, dependents claimed

### 11. Roster add-ons
- **Multi-week view** — 1-day / 7-day / 14-day toggle
- **Shift templates** — save common patterns
- **Drag to reschedule** — currently only click-to-edit
- **Conflict warnings** — overlapping shifts, max hours violation
- **Auto-fill from forecast** — accept system recommendation
- **Publish roster** — lock + notify staff once approved
- **Print roster** — print-friendly weekly view

### 12. Org Chart add-ons
- **Department view** vs **reporting view** toggle
- **Vacancy markers** — empty positions in tree
- **Open req attachment** — link req to position
- **Drill-down to team detail** when clicking manager

---

### 12. Org Chart Tree (มีโครงแต่บางมาก)

ปัจจุบันเป็น tree แบบ static 14 node + click ดู detail ขวา · ต้อง port ของจริงเพิ่ม:

**โครงสร้าง:**
- **Full company tree** — ไม่ใช่แค่ 14 node แต่ทั้ง 248 พนักงาน · auto-collapse beyond depth 3
- **Department view ↔ Reporting view** toggle — ผังหน่วยงาน vs ผังสายบังคับบัญชา
- **Location filter** — slice ดูเฉพาะสาขาเดียว (BKK-03, CNX-01 ฯลฯ)
- **Search-to-focus** — พิมพ์ชื่อ → node ที่เกี่ยวเด้งและ pan/zoom ไป

**Vacancy & req:**
- **Vacancy markers** — ตำแหน่งว่างแสดงเป็น dashed node + "Open req"
- **Click vacancy** → ลิงก์ไป Recruitment leaf · แสดง candidates ของ req นั้น
- **Backfill needed** — ตำแหน่งที่เพิ่งมีคนลาออก marker สีส้ม

**Interactive controls:**
- **Drag เพื่อจัดเส้น** — manager override ผังก่อน publish (HRIS only)
- **Drill into team** — คลิก manager node → expand all reports + open in side panel
- **Span of control overlay** — สีแสดงทีมที่ใหญ่/เล็กเกินไป (heatmap)
- **Tenure overlay** — สีตามระยะเวลาทำงาน
- **Cost overlay** — สีตาม cost บริษัทต่อ node (HR Admin only)

**Export:**
- **PDF / PNG export** ของ tree (สำหรับ all-hands deck)
- **CSV export** structure (manager_id → employee_id mapping)

**Side panel เพิ่มเติม (ตอน focus node):**
- **Direct reports** list (chip layout)
- **Skip-level reports** count
- **Salary band coverage** — ทีมนี้กระจาย band อะไรบ้าง
- **Diversity stats** — gender, tenure ranges, locations
- **Recent changes** — ลาออก / เข้าใหม่ / promoted ใน 90 วัน

**Mobile:**
- Compress to **list-tree** (indent-based) แทน graphical tree เพราะ pan/zoom ทำยากบนมือถือ

---

## Round H · Org Chart Tree (เลื่อนเป็น Critical ตามที่ user ขอ)
1. Full 248-employee tree (generate synthetic)
2. Department ↔ Reporting toggle
3. Search-to-focus
4. Vacancy markers + req linking
5. Span/tenure/cost overlays
6. Side panel เพิ่ม direct reports list + recent changes
7. Export PDF/CSV
8. Mobile list-tree fallback

---

## Updated build sequence

| Round | Focus | Why |
|---|---|---|
| **A** | Benefit Plan Catalog | User asked first |
| **B** | Benefit Rules Engine | Continues A |
| **H** | **Org Chart Tree (elevated)** | User just asked |
| C | Leave Policy Builder | Foundation for leave flows |
| D | Time & Attendance Policy | Foundation for roster/OT |
| E | Employee Detail tabs C/D | Compensation + Time + Docs + Perf + Audit |
| F | Hire wizard add-ons | Work permit + dependents + bank |
| G | Roster + (rest of Org) polish | Multi-week view, drag, publish |

---

## Each round contract
- Functional state (no static)
- Inline editing (no modals per user pref)
- Toast + undo
- Keyboard support (Esc closes, Enter submits)
- Mobile-friendly

Estimated rounds: 7 (~3-4 user interactions each)
