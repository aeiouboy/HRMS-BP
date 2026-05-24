// prod-employee-detail.jsx — Employee Detail hub
// Port of src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx (aeiouboy/hr@master)
// Sections: A1 Personal · A2 Employment · Job-Grade & BU history · Years-in-X chips
//           · Workflow snapshot · Timeline log · 9 Action cards (status-gated)

function EmployeeDetail() {
  const I = window.PI;

  // ── Mock employee record (matches /lib/employees mock-1k snake_case schema) ──
  const emp = {
    employee_id: "30048829",
    employment_id: "EJ-30048829-01",
    first_name_th: "ภานุพงศ์", last_name_th: "ศรีวิชัย",
    first_name_en: "Phanupong", last_name_en: "Sriwichai",
    status: "active", empl_status_code: "5581", emplStatusDisplay: "ทำงานอยู่ (Active)",
    employee_class: "PERMANENT",
    hire_date: "2024-03-15",
    seniority_start_date: "2024-03-15",
    company: "CEN — Central Retail Corporation",
    org_unit: "Store Operations",
    position_title: "Cashier",
    corporate_title: "Officer",
    position_code: "9999C002",
    pay_grade: "08", regular_temporary: "R",
    store_branch_code: "Central World",
    hr_district: "กรุงเทพฯ ตอนกลาง",
    date_of_birth: "1995-03-14",
  };
  const nameTh = `${emp.first_name_th} ${emp.last_name_th}`;
  const nameEn = `${emp.first_name_en} ${emp.last_name_en}`;

  // Computed (faithful mock — calculations from /lib/calculations)
  const age          = { display: "31 ปี" };
  const generation   = "Gen Y (Millennial)";
  const yearsOfSvc   = { display: "2 ปี 2 เดือน" };
  const collapsed    = true; // no transfers/promotions → all counters identical

  // ── Mock timeline (sorted newest first) ──────────────────────────────────
  const events = [
    { id: "evt-3", kind: "probation_assess", effectiveDate: "2024-09-15", recordedAt: "2024-09-16", notes: "ผ่านทดลองงาน · ประเมิน 4.2/5.0 (ผู้จัดการสาขา)" },
    { id: "evt-2", kind: "transfer",         effectiveDate: "2024-06-01", recordedAt: "2024-05-28", notes: "ย้ายจาก Central Ladprao → Central World" },
    { id: "evt-1", kind: "hire",             effectiveDate: "2024-03-15", recordedAt: "2024-03-15", notes: null },
  ];

  // Action-availability map (matches /lib/admin/actionAvailability)
  const avail = {
    probation:        { ok: false, reason: "ประเมินทดลองงานผ่านเรียบร้อยแล้วเมื่อ 15 ก.ย. 2567" },
    edit:             { ok: true },
    transfer:         { ok: true },
    terminate:        { ok: true },
    contract_renewal: { ok: false, reason: "ใช้กับพนักงานสัญญาจ้าง (PARTIME) เท่านั้น" },
    rehire:           { ok: false, reason: "ใช้เมื่อพนักงานสิ้นสุดสภาพแล้ว" },
    change_type:      { ok: true },
    payRateChange:    { ok: true },
    acting:           { ok: true },
  };

  return (
    <div style={{padding: "6px 0 32px", display:"flex", flexDirection:"column", gap: 20}}>
      {/* Back nav */}
      <div>
        <a href="#" style={{
          display:"inline-flex", alignItems:"center", gap: 6,
          fontSize: 13, color:"var(--color-ink-muted)", textDecoration:"none",
        }}>
          <I.arrowL size={14}/> รายการพนักงาน
        </a>
      </div>

      {/* ── A1 · ข้อมูลส่วนตัว ─────────────────────────────────── */}
      <div className="humi-card" style={{overflow:"hidden", position:"relative"}}>
        <div className="humi-eyebrow" style={{marginBottom: 12}}>ข้อมูลส่วนตัว</div>

        <div style={{display:"flex", alignItems:"flex-start", gap: 16, flexWrap:"wrap"}}>
          <div className="humi-avatar humi-avatar--teal" style={{width: 56, height: 56, fontSize: 20, flexShrink: 0}}>
            ภศ
          </div>
          <div style={{flex: 1, minWidth: 200}}>
            <div className="humi-eyebrow" style={{marginBottom: 4}}>
              {emp.employee_id}
              <span style={{color:"var(--color-ink-faint)", marginLeft: 8}}>· EJ: {emp.employment_id}</span>
            </div>
            <h1 style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600, lineHeight: 1.15, color:"var(--color-ink)", margin: 0}}>
              {nameTh}
            </h1>
            <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 2}}>{nameEn}</div>
            <div style={{marginTop: 10, display:"flex", gap: 8, flexWrap:"wrap"}}>
              <span className="humi-tag humi-tag--accent">{emp.emplStatusDisplay}</span>
              <span className="humi-tag humi-tag--sage">Permanent</span>
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap: 4, flexShrink: 0}}>
            <button className="humi-button humi-button--ghost"><I.plug size={13}/> SAP SuccessFactors</button>
            <span style={{fontSize: 10.5, color:"var(--color-ink-faint)"}}>sync ล่าสุด · 14:32 วันนี้</span>
          </div>
        </div>

        <hr className="humi-divider"/>
        <div style={{display:"flex", gap: 12, flexWrap:"wrap"}}>
          <Chip label="อายุ" value={age.display}/>
          <Chip label="Generation" value={generation}/>
        </div>
      </div>

      {/* ── A2 · ข้อมูลการจ้างงาน ──────────────────────────────── */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{marginBottom: 12}}>ข้อมูลการจ้างงาน</div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 18}}>
          <Field icon={I.calendar} label="วันที่เริ่มงาน" value="15 มี.ค. 2567"/>
          <Field icon={I.building} label="บริษัท" value={emp.company} sub={`หน่วยงาน ${emp.org_unit}`}/>
          <Field icon={I.briefcase} label="ตำแหน่ง" value={emp.position_title}
                 sub={`ระดับ ${emp.corporate_title} · รหัส ${emp.position_code}`}/>
          <Field label="Pay Grade / ประเภท" value={`PG-${emp.pay_grade}`} sub="Regular (ประจำ)"/>
          <Field icon={I.calendar} label="สาขา/หน่วยงาน" value={emp.store_branch_code}/>
          <Field icon={I.globe} label="เขต HR" value={emp.hr_district}/>
        </div>

        {/* Acting chip — none currently */}

        <hr className="humi-divider"/>
        <details>
          <summary className="humi-eyebrow" style={{cursor:"pointer", userSelect:"none", marginBottom: 8}}>
            ประวัติ Job Grade (3 รายการ)
          </summary>
          <div style={{display:"flex", flexDirection:"column", gap: 6, marginTop: 8}}>
            {[
              { grade: "PG-08", from: "1 มิ.ย. 2568", seq: 3 },
              { grade: "PG-07", from: "15 มี.ค. 2567", seq: 2 },
              { grade: "PG-06", from: "1 ม.ค. 2566", seq: 1 },
            ].map(g => (
              <div key={g.seq} style={{display:"flex", alignItems:"center", gap: 12, padding:"6px 10px", borderRadius: 6, background:"var(--color-canvas-soft)"}}>
                <span className="humi-tag">{g.grade}</span>
                <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>มีผลตั้งแต่ {g.from}</span>
                <span style={{fontSize: 11, color:"var(--color-ink-faint)", marginLeft:"auto"}}>seq {g.seq}</span>
              </div>
            ))}
          </div>
        </details>

        <hr className="humi-divider"/>
        <div style={{display:"flex", gap: 12, flexWrap:"wrap"}}>
          <Chip label="อายุงาน" value={yearsOfSvc.display}/>
        </div>
        <p style={{fontSize: 11, color:"var(--color-ink-faint)", marginTop: 12, lineHeight: 1.5}}>
          ตัวเลขนับจาก event ล่าสุดของแต่ละประเภท — โอนย้าย/เปลี่ยนตำแหน่ง/เลื่อนระดับ จะ reset counter ที่เกี่ยวข้องอัตโนมัติ
        </p>
      </div>

      {/* ── Workflow status snapshot ──────────────────────────── */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{marginBottom: 12}}>คำขอที่เกี่ยวข้อง</div>
        <div style={{display:"flex", flexDirection:"column", gap: 10}}>
          <WorkflowRow eyebrow="คำขอเลื่อนตำแหน่ง (BRD #103)" title="Cashier → Senior Cashier"
                       sub="มีผล: 1 ก.ค. 2569" status="pending_review" label="รอ Direct Manager รีวิว"/>
        </div>
      </div>

      {/* ── Section B · Timeline ──────────────────────────────── */}
      <div className="humi-card">
        <div style={{display:"flex", alignItems:"center", gap: 12, marginBottom: 14}}>
          <div>
            <div className="humi-eyebrow">ประวัติการเปลี่ยนแปลง</div>
            <h2 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, color:"var(--color-ink)", margin:"4px 0 0", letterSpacing:"-0.01em"}}>
              Timeline
            </h2>
          </div>
          <span style={{marginLeft:"auto"}} className="humi-tag">{events.length} รายการ</span>
        </div>
        <div style={{maxHeight: 320, overflowY: "auto"}}>
          {events.map(evt => <TimelineRow key={evt.id} event={evt}/>)}
        </div>
      </div>

      {/* ── Section C · 9 Action cards ────────────────────────── */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{marginBottom: 14}}>การดำเนินการ</div>
        <p style={{fontSize: 12, color:"var(--color-ink-soft)", lineHeight: 1.5, padding: 12, marginBottom: 16,
                   background:"var(--color-canvas-soft)", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)"}}>
          Employee Center แสดง 9 core lifecycle surfaces — promotion + pay rate ใช้ route เดียวเพื่อเล่า chain HR Admin → Comp/SPD review
        </p>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 12}}>
          <ActionCard icon={I.clipboard} label="ประเมินทดลองงาน" desc="บันทึกผลการประเมินช่วงทดลองงาน" avail={avail.probation}/>
          <ActionCard icon={I.user}      label="แก้ไขข้อมูลส่วนตัว" desc="อัปเดตข้อมูลชื่อ ที่อยู่ และข้อมูลส่วนตัว" avail={avail.edit}/>
          <ActionCard icon={I.arrowR}    label="โอนย้าย" desc="เปลี่ยนบริษัท หน่วยงาน ตำแหน่ง" avail={avail.transfer}/>
          <ActionCard icon={I.userX}     label="สิ้นสุดสภาพพนักงาน" desc="บันทึกการลาออกหรือสิ้นสุดการจ้างงาน" avail={avail.terminate}/>
          <ActionCard icon={I.fileText}  label="ต่อสัญญา" desc="ต่ออายุสัญญาการจ้างงาน" avail={avail.contract_renewal}/>
          <ActionCard icon={I.userPlus}  label="จ้างซ้ำ" desc="รับกลับเข้าทำงานหลังสิ้นสุดสภาพ" avail={avail.rehire}/>
          <ActionCard icon={I.refresh}   label="เปลี่ยนประเภทการจ้าง" desc="เปลี่ยนระหว่างพนักงานประจำกับพนักงานบางเวลา" avail={avail.change_type}/>
          <ActionCard icon={I.trendUp}   label="เลื่อนตำแหน่ง / ปรับเงินเดือน" desc="เลื่อนระดับ ปรับตำแหน่ง หรือปรับเงินเดือน" avail={avail.payRateChange}/>
          <ActionCard icon={I.star}      label="มอบหมายปฏิบัติการ" desc="กำหนดรักษาการตำแหน่ง" avail={avail.acting}/>
        </div>
      </div>
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────
function Chip({ label, value }) {
  return (
    <div className="humi-card humi-card--cream" style={{padding:"8px 14px", minWidth: 110, borderRadius: 12}}>
      <div className="humi-eyebrow" style={{marginBottom: 2}}>{label}</div>
      <div style={{fontSize: 14, fontWeight: 600, color:"var(--color-ink)"}}>{value}</div>
    </div>
  );
}

// ─── Field (icon + label + value + optional sub) ───────────────────────
function Field({ icon: Glyph, label, value, sub }) {
  return (
    <div>
      <div className="humi-eyebrow" style={{marginBottom: 4, display:"inline-flex", alignItems:"center", gap: 5}}>
        {Glyph && <Glyph size={10}/>}
        {label}
      </div>
      <div style={{fontSize: 14, fontWeight: 500, color:"var(--color-ink)"}}>{value}</div>
      {sub && <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>}
    </div>
  );
}

// ─── Timeline row ──────────────────────────────────────────────────────
const EVENT_LABELS = {
  hire: "เริ่มงาน", probation_assess: "ประเมินทดลองงาน", transfer: "โอนย้าย",
  terminate: "ออกจากงาน", rehire: "รับกลับเข้าทำงาน", contract_renewal: "ต่อสัญญา",
  promotion: "เลื่อนตำแหน่ง", acting_start: "เริ่มรักษาการ", acting_end: "สิ้นสุดรักษาการ",
};
const EVENT_COLORS = {
  hire: "#1FA8A0", probation_assess: "#5B6CE0", transfer: "#D4A53A",
  terminate: "#C2553A", rehire: "#2F8A6B", contract_renewal: "#7DA084",
  promotion: "#E8C46B", acting_start: "#1FA8A0", acting_end: "#A8B0BC",
};
function TimelineRow({ event }) {
  const label = EVENT_LABELS[event.kind] || event.kind;
  const dot = EVENT_COLORS[event.kind] || "#8A97A8";
  const effective = new Date(event.effectiveDate).toLocaleDateString("th-TH", { year:"numeric", month:"long", day:"numeric" });
  const recorded  = new Date(event.recordedAt).toLocaleDateString("th-TH", { year:"numeric", month:"short", day:"numeric" });
  return (
    <div style={{display:"flex", gap: 12, padding:"12px 0", borderBottom:"1px solid var(--color-hairline-soft)"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", paddingTop: 5}}>
        <span style={{width: 10, height: 10, borderRadius: 99, background: dot, flexShrink: 0}}/>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display:"flex", gap: 10, flexWrap:"wrap", alignItems:"baseline"}}>
          <span style={{fontSize: 14, fontWeight: 600, color:"var(--color-ink)"}}>{label}</span>
          <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>วันที่มีผล: {effective}</span>
        </div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>บันทึกเมื่อ: {recorded}</div>
        {event.notes && <div style={{marginTop: 4, fontSize: 12, color:"var(--color-ink-soft)", fontStyle:"italic"}}>{event.notes}</div>}
      </div>
    </div>
  );
}

// ─── Workflow row ──────────────────────────────────────────────────────
function WorkflowRow({ eyebrow, title, sub, status, label }) {
  const cls = status === "approved" ? "humi-tag humi-tag--accent"
            : status === "rejected" ? "humi-tag humi-tag--coral"
            : "humi-tag humi-tag--butter";
  return (
    <div style={{display:"flex", gap: 12, padding: "12px 14px", borderRadius: 10,
                  background:"var(--color-canvas-soft)", flexWrap:"wrap", alignItems:"center"}}>
      <div style={{flex: 1, minWidth: 200}}>
        <div className="humi-eyebrow" style={{marginBottom: 2}}>{eyebrow}</div>
        <div style={{fontSize: 14, fontWeight: 500, color:"var(--color-ink)"}}>{title}</div>
        <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{sub}</div>
      </div>
      <span className={cls}>{label}</span>
    </div>
  );
}

// ─── Action card ───────────────────────────────────────────────────────
function ActionCard({ icon: Glyph, label, desc, avail }) {
  const I = window.PI;
  const locked = !avail.ok;
  const base = {
    padding: 16, borderRadius: 14,
    border: "1px solid var(--color-hairline)",
    background: locked ? "var(--color-canvas-soft)" : "var(--color-surface)",
    cursor: locked ? "not-allowed" : "pointer",
    opacity: locked ? 0.7 : 1,
    transition: "transform .15s, box-shadow .15s",
    display: "flex", gap: 12, alignItems:"flex-start",
    textDecoration:"none",
  };
  return (
    <a href="#" style={base} title={avail.reason || ""}
       onClick={e => locked && e.preventDefault()}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: locked ? "var(--color-hairline-soft)" : "var(--color-accent-soft)",
        color:      locked ? "var(--color-ink-faint)"     : "var(--color-accent)",
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink: 0,
      }}><Glyph size={18}/></div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display:"flex", gap: 6, alignItems:"center"}}>
          <span style={{fontSize: 13.5, fontWeight: 600, color: locked ? "var(--color-ink-muted)" : "var(--color-ink)"}}>{label}</span>
          {locked && <I.lock size={11} style={{color:"var(--color-ink-faint)"}}/>}
        </div>
        <div style={{fontSize: 12, color: locked ? "var(--color-ink-faint)" : "var(--color-ink-soft)", marginTop: 4, lineHeight: 1.45}}>
          {desc}
        </div>
        {locked && avail.reason && (
          <div style={{marginTop: 6, fontSize: 11, color:"var(--color-ink-muted)", lineHeight: 1.4}}>
            {avail.reason}
          </div>
        )}
      </div>
    </a>
  );
}

window.EmployeeDetail = EmployeeDetail;
