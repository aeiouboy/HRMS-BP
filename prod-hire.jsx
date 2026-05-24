// ========================================================================
// prod-hire.jsx — Hire Wizard (faithful port of latest aeiouboy/hr@master)
// - 3-cluster Who/Job/Review with HireCheckpointSidebar (grouped chips + nav)
// - CollapsibleSectionCard w/ green ✓ when slice valid
// - Step 1: DVT prev ID, age auto-calc, "ประเทศที่เกิด" toggle pill,
//           conditional WorkPermit + Dependents sections, forward-date banner
// - Step 3: EN-name mirror, HRBP+DirectManager approval, structured summary
// ========================================================================

function ProdHire({ startStep = 1 }) {
  const I = window.PI;
  const [currentStep, setCurrentStep] = React.useState(startStep);
  const [maxUnlockedStep, setMaxUnlockedStep] = React.useState(Math.max(startStep, 1));
  const [collapsed, setCollapsed] = React.useState({
    "who.identity": false, "who.biographical": true, "who.contact": true,
    "who.emergencyContacts": true, "who.globalInfo": true,
    "who.workPermit": true, "who.dependents": true,
    "job.employeeInfo": false, "job.assignment": true, "job.compensation": true,
  });
  const toggle = (k) => setCollapsed((s) => ({ ...s, [k]: !s[k] }));

  // Section validity — drives ✓ in sidebar + section header
  const validity = { identity: true, biographical: false, contact: false, emergencyContacts: false,
                     globalInfo: false, workPermit: false, dependents: false,
                     employeeInfo: false, job: false, compensation: false };

  // Conditional section logic (matches conditional-sections.ts in repo)
  // Default: Thai national + unmarried + 0 children → both hidden
  const showWorkPermit = false;
  const showDependents = false;

  const STEPS = [
    { n: 1, labelTh: "ข้อมูลบุคคล",      descTh: "ระบุตัวตน • ชื่อ • บัตรประชาชน • ประวัติ" },
    { n: 2, labelTh: "ข้อมูลงาน",         descTh: "ประเภทการจ้างงาน • ตำแหน่ง • ค่าตอบแทน" },
    { n: 3, labelTh: "ตรวจสอบและส่ง",   descTh: "ข้อมูลติดต่อ • ตรวจสอบก่อนส่ง" }
  ];

  return (
    <div className="wizard-shell" style={{ minHeight: 1400 }}>
      <div className="wizard-head">
        <div>
          <div className="humi-eyebrow">ขั้นตอนการจ้างงาน</div>
          <h1 className="wizard-flow-title">เพิ่มพนักงานใหม่</h1>
          <p style={{ marginTop: 4, fontSize: 13, color: "var(--color-ink-muted)" }}>
            ขั้นตอนที่ {currentStep} จาก 3 · {STEPS[currentStep - 1].labelTh}
          </p>
        </div>
        <span className="wizard-draft-chip"><I.save size={12} /> บันทึกร่างอัตโนมัติ · 14:32</span>
      </div>

      <div className="wizard-body">
        <aside className="wizard-rail" style={{ width: 280, padding: "20px 16px", background:"var(--color-canvas-soft)" }}>
          <CheckpointSidebar
            currentStep={currentStep}
            validity={validity}
            showWorkPermit={showWorkPermit}
            showDependents={showDependents}
            onJump={(step, sectionId) => {
              setCurrentStep(step);
              setMaxUnlockedStep(Math.max(maxUnlockedStep, step));
              if (sectionId && step !== 3) {
                setCollapsed((s) => ({ ...s, [sectionId]: false }));
              }
            }}
          />
        </aside>

        <div className="wizard-content" style={{ padding: "28px 36px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {currentStep === 1 && <ClusterWho collapsed={collapsed} toggle={toggle} validity={validity}
                                               showWorkPermit={showWorkPermit} showDependents={showDependents}/>}
            {currentStep === 2 && <ClusterJob collapsed={collapsed} toggle={toggle} validity={validity}/>}
            {currentStep === 3 && <ClusterReview/>}
          </div>
        </div>
      </div>

      <div className="wizard-foot">
        <div>
          {currentStep > 1 && (
            <button className="humi-button humi-button--ghost" onClick={() => setCurrentStep(currentStep - 1)}>
              <I.arrowL size={14} /> ย้อนกลับ
            </button>
          )}
        </div>
        <div className="humi-row" style={{ gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--color-ink-muted)" }}>กรอกข้อมูลที่จำเป็นให้ครบก่อนดำเนินการต่อ</span>
          {currentStep < 3 ? (
            <button className="humi-button humi-button--primary" onClick={() => {
              const next = currentStep + 1;
              setCurrentStep(next);
              setMaxUnlockedStep(Math.max(maxUnlockedStep, next));
            }}>ถัดไป <I.arrowR size={16} /></button>
          ) : (
            <button className="humi-button humi-button--primary"><I.check size={16} /> บันทึกและส่ง</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Checkpoint Sidebar ──────────────────────────────────────────────────
function CheckpointSidebar({ currentStep, validity, showWorkPermit, showDependents, onJump }) {
  const I = window.PI;
  const GROUPS = [
    { step: 1, labelTh: "ข้อมูลบุคคล", sections: [
      { id: "who.identity",          vk: "identity",          icon: I.fingerprint, labelTh: "ระบุตัวตน" },
      { id: "who.biographical",      vk: "biographical",      icon: I.user,        labelTh: "ข้อมูลส่วนตัว" },
      { id: "who.contact",           vk: "contact",           icon: I.phone,       labelTh: "ข้อมูลติดต่อ" },
      { id: "who.emergencyContacts", vk: "emergencyContacts", icon: I.alert,       labelTh: "ผู้ติดต่อฉุกเฉิน" },
      { id: "who.globalInfo",        vk: "globalInfo",        icon: I.globe,       labelTh: "ข้อมูลทั่วไป" },
      { id: "who.workPermit",        vk: "workPermit",        icon: I.fileText,    labelTh: "ใบอนุญาตทำงาน", cond: "workPermit" },
      { id: "who.dependents",        vk: "dependents",        icon: I.users,       labelTh: "บุคคลในอุปการะ", cond: "dependents" }
    ]},
    { step: 2, labelTh: "ข้อมูลงาน", sections: [
      { id: "job.employeeInfo", vk: "employeeInfo", icon: I.briefcase, labelTh: "ประเภทการจ้างงาน" },
      { id: "job.assignment",   vk: "job",          icon: I.building,  labelTh: "ตำแหน่งและสังกัด" },
      { id: "job.compensation", vk: "compensation", icon: I.wallet,    labelTh: "ค่าตอบแทน" }
    ]},
    { step: 3, labelTh: "ตรวจสอบและส่ง", sections: [
      { id: "review.enName",  vk: null, icon: I.user,     labelTh: "ชื่อ-นามสกุลภาษาอังกฤษ" },
      { id: "review.hrbp",    vk: null, icon: I.user,     labelTh: "อนุมัติโดย Direct Manager + HRBP" },
      { id: "review.summary", vk: null, icon: I.fileText, labelTh: "สรุปข้อมูลก่อนส่ง" }
    ]}
  ];
  return (
    <nav aria-label="หัวข้อการกรอกข้อมูล" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-ink-muted)", padding: "0 4px", margin: 0 }}>
        หัวข้อย่อย
      </p>
      {GROUPS.map((group) => {
        const isCurrent = group.step === currentStep;
        return (
          <div key={group.step} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="humi-row" style={{ gap: 8, padding: "2px 4px", alignItems: "center" }}>
              <span style={{
                display: "inline-flex", width: 18, height: 18,
                alignItems: "center", justifyContent: "center", borderRadius: "50%",
                fontSize: 10, fontWeight: 700,
                background: isCurrent ? "var(--color-accent)" : "var(--color-accent-soft)",
                color: isCurrent ? "#fff" : "var(--color-accent)"
              }}>{group.step}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700,
                             color: isCurrent ? "var(--color-accent)" : "var(--color-ink-soft)" }}>
                {group.labelTh}
              </span>
            </div>
            <div style={{ marginLeft: 11, paddingLeft: 10, borderLeft: "1px solid var(--color-hairline)", display: "flex", flexDirection: "column", gap: 2 }}>
              {group.sections
                .filter((s) => s.cond === "workPermit" ? showWorkPermit : s.cond === "dependents" ? showDependents : true)
                .map((s) => {
                  const valid = s.vk && validity[s.vk];
                  const Icon = s.icon;
                  return (
                    <button key={s.id} type="button" onClick={() => onJump(group.step, s.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
                        border: 0, background: "transparent", borderRadius: 7,
                        cursor: "pointer", color: "var(--color-ink-soft)",
                        fontFamily: "inherit", textAlign: "left",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface)"; e.currentTarget.style.color = "var(--color-ink)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-ink-soft)"; }}>
                      <Icon size={11} style={{ color: "var(--color-ink-muted)", flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12, lineHeight: 1.35 }}>{s.labelTh}</span>
                      {valid && <I.check size={11} style={{ color: "var(--color-success)", flexShrink: 0 }} />}
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// ── Collapsible card with ✓ indicator ──────────────────────────────────
function Section({ id, icon, eyebrow, title, sub, collapsed, onToggle, isValid, children }) {
  const I = window.PI;
  const Glyph = icon;
  return (
    <section id={id} className="humi-card" style={{ marginBottom: 20, borderRadius: 22 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div className="humi-row" style={{ alignItems: "flex-start", gap: 12, flex: 1, minWidth: 0 }}>
          <div className="section-icon-wrap"><Glyph size={20} /></div>
          <div style={{ minWidth: 0 }}>
            <div className="humi-eyebrow">{eyebrow}</div>
            <h3 className="humi-section-title">{title}</h3>
            <p className="humi-section-sub" style={{ marginBottom: 0 }}>{sub}</p>
          </div>
        </div>
        {isValid && (
          <span style={{ marginTop: 4, color: "var(--color-success)", flexShrink: 0 }} aria-label="ส่วนนี้ครบถ้วน">
            <I.check size={18} />
          </span>
        )}
        <button className="collapse-btn" onClick={onToggle} aria-expanded={!collapsed}>
          {collapsed ? "ขยาย" : "ย่อ"}
          <I.chevD size={14} style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0)", transition: "transform .2s" }} />
        </button>
      </div>
      {!collapsed && <div style={{ marginTop: 14 }}>{children}</div>}
    </section>
  );
}

// ── Field primitives ───────────────────────────────────────────────────
function F({ label, placeholder, required, optional, className, type = "text", hint, value, warning, readOnly }) {
  return (
    <div className={className || ""}>
      <label className="field-label">
        {label}
        {required && <span className="field-required">*</span>}
        {optional && <span style={{ color: "var(--color-ink-faint)", fontSize: 11, fontWeight: 400, marginLeft: 6 }}>optional</span>}
      </label>
      <input className="field-input" type={type} placeholder={placeholder} defaultValue={value} readOnly={readOnly}
             style={readOnly ? { background:"var(--color-canvas-soft)", cursor:"not-allowed" } : {}}/>
      {warning && <p style={{ marginTop: 4, fontSize: 11, color: "var(--color-warning)" }}>{warning}</p>}
      {hint && !warning && <div style={{ fontSize: 11, color: "var(--color-ink-faint)", marginTop: 4 }}>{hint}</div>}
    </div>
  );
}
function S({ label, required, options, className, hint, value }) {
  return (
    <div className={className || ""}>
      <label className="field-label">{label}{required && <span className="field-required">*</span>}</label>
      <select className="field-input" defaultValue={value || ""}>
        <option value="">— เลือก —</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {hint && <div style={{ fontSize: 11, color: "var(--color-ink-faint)", marginTop: 4 }}>{hint}</div>}
    </div>
  );
}
function ReadOnly({ label, value, hint }) {
  return (
    <div>
      <label className="field-label">{label} <span style={{ color: "var(--color-ink-faint)", fontSize: 11, fontWeight: 400 }}>({hint || "ระบบสร้างให้อัตโนมัติ"})</span></label>
      <div style={{ padding: "10px 12px", background: "var(--color-canvas-soft)", border: "1px solid var(--color-hairline)", borderRadius: "var(--radius-md)", color: "var(--color-ink)", fontFamily: "ui-monospace, monospace", fontSize: 14 }}>{value}</div>
    </div>
  );
}

window.ProdHire = ProdHire;
