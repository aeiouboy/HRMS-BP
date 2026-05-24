# HR Admin → Employee Journey · Plan

## Current state (จุดที่ user บอกว่า "ยังไม่ดีพอ")

ตอนนี้ HR Admin คลิกชื่อ employee ใน Directory → **drawer slide ขวา 720px** (EmployeeHub) 9 tabs

ปัญหา:
- ดู/แก้ไขข้อมูลในกล่องเล็กลำบาก
- เปลี่ยน tab ไป-มาแล้ว state ไม่ persist ใน URL
- แก้ไขฟิลด์จริงไม่ได้ (read-only ทั้งหมด)
- Benefits tab โชว์แค่ enrolled plans · ไม่มี enroll/change tier / view claims drilldown
- ไม่มี action history / audit แยกตามหมวด
- ไม่ scale กับ table actions (เช่น bulk edit, terminate)

## เป้าหมายใหม่ — Employee Detail Page (full-screen)

แทน drawer ด้วย **full page** เมื่อคลิกชื่อใน Directory:

### Layout
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Directory                                      │
├─────────────────────────────────────────────────────────┤
│ [Avatar lg] Somchai K.                  [···]  [Edit]   │
│             Shift Lead · FOH · EMP-00204                │
│             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│             Active · 2y 9m · band C2 · ฿38,500/mo       │
├──────────────┬──────────────────────────────────────────┤
│ SIDE TABS    │ MAIN CONTENT                             │
│              │                                          │
│ Overview     │ 4-up KPI strip                          │
│ Profile      │ + section cards (Activity, Notes ฯลฯ)   │
│ Job & Comp   │                                          │
│ Benefits     │                                          │
│ Time & Leave │                                          │
│ Documents    │                                          │
│ Performance  │                                          │
│ Audit        │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Key flows ที่ต้อง functional

#### 1. Overview tab (default)
- 4 KPI: ทำงานสะสม / leave balance / OT YTD / claim YTD
- Activity feed (recent 10 events) — clickable → jump to tab
- Quick actions: Adjust salary · Change role · Enroll plan · Issue document
- Alerts card: ต้อง review probation / ใบรับรองหมดอายุ / leave balance ต่ำ

#### 2. Profile tab (editable)
- KV grid 12 fields แต่ละ row มี "Edit" pencil icon
- คลิก → inline edit + Save/Cancel
- บันทึก → toast + audit log entry

#### 3. Job & Comp tab
- Current job card (position/dept/manager/location) + "Change role" CTA → modal
- Salary history table — แต่ละ row คลิกดู breakdown
- "Adjust salary" CTA → modal (new amount + effective date + reason + ส่งอนุมัติ)
- Promotion / band-change CTA

#### 4. **Benefits tab (focus ตามที่ user ขอ)**
- **Enrolled plans table** — ดู cap, used, remaining + ปุ่ม "Change tier" + "Drop"
- **Available plans** ที่ยังไม่ enroll — ปุ่ม "Enroll" → modal เลือก effective date
- **Claim history** — ตาราง claims เคยทำ + status + amount
- **Provident fund** card — contribution rate slider (5–15%) + projection
- **Benefit modal** เปิดได้จาก ปุ่ม "Add plan" ที่บนขวา:
   - เลือก plan template
   - effective date
   - tier (auto จาก employee class)
   - dependents (toggle if applicable)
   - confirm → audit log + toast

#### 5. Time & Leave tab
- ตาราง attendance log
- Leave balance per type + ปุ่ม "Adjust balance" (admin override)
- Pending leave requests inline approve

#### 6. Documents tab
- Grid ของ files + ปุ่ม Upload
- Each file: download/replace/delete
- "Generate letter" CTA (certificate of employment, salary cert) → modal

#### 7. Performance tab
- Goals table + scores
- Last review summary
- "Start review" CTA

#### 8. Audit tab
- Full activity log per action
- Filter by date range + actor + action type

### URL structure
- `/employees/EMP-00204` (overview)
- `/employees/EMP-00204/benefits`
- `/employees/EMP-00204/job`
- ฯลฯ

แต่เนื่องจาก prototype ใช้ state-based routing ไม่ใช่ real URL จะใช้ activeLeaf = `"emp-detail"` + state `empPageId` + `empPageTab`

### Implementation phases

**Phase A · Container + Overview tab** (this round)
- เปลี่ยน Directory คลิก row → setEmpPageId แทน setEmpHubName
- สร้าง EmployeeDetailPage component (full screen)
- Side tab nav + header section
- Implement Overview tab พร้อม activity feed + KPIs + quick actions

**Phase B · Benefits tab focus**
- Enrolled plans table with edit/drop
- Available plans + enroll modal
- Claim history table
- PF contribution editor

**Phase C · Profile + Job & Comp tabs**
- Editable fields with inline save
- Change role modal
- Salary adjustment modal

**Phase D · Time/Documents/Performance/Audit tabs**
- Port from existing hub + add admin actions

### Keep the old EmployeeHub drawer?
- Yes — สำหรับ quick peek จาก Roster Gantt / Approval lists (small contexts)
- Directory click → ไป full page เท่านั้น

---

## What I'll build in next round

1. **EmployeeDetailPage** component (full screen, side tabs)
2. **Overview tab** เสร็จสมบูรณ์ (KPIs · activity · quick actions · alerts)
3. **Benefits tab** เสร็จสมบูรณ์ (enrolled table · enroll modal · claim history · PF editor)
4. Wire Directory click → setEmpPageId

Phase A + B รวดเดียวประมาณ ~500 บรรทัด jsx + ~150 บรรทัด css
