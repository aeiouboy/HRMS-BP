// AdminHire.jsx — minimal-feel hire flow.
// Design intent: feel small. 4 steps, each with ≤5 fields, smart defaults, encouraging copy.
// "Type-ahead" style with chips, big tap targets, only required fields starred.
function AdminHire({ open, onClose, onDone }) {
  const Ic = window.I;
  const [step, setStep] = React.useState(1);
  const TOTAL = 4;

  // Form state — kept flat. All fields optional except those marked req.
  const [f, setF] = React.useState({
    firstName: "", lastName: "", nickname: "",
    email: "", phone: "", lineId: "",
    role: "", branch: "ทองหล่อ", employmentType: "ประจำ", startDate: "",
    salary: "", planKey: "flex_plus", referredBy: "",
  });
  const set = (k, v) => setF(s => ({...s, [k]: v}));

  // Reset when reopened
  React.useEffect(() => { if (open) { setStep(1); } }, [open]);

  if (!open) return null;

  const STEPS = [
    { n: 1, k: "ใครคือพนักงานใหม่",   sub: "แค่ชื่อกับวิธีติดต่อ ไว้เติมที่เหลือทีหลังได้" },
    { n: 2, k: "ทำงานตำแหน่งไหน",    sub: "เลือกจากที่มีอยู่ หรือพิมพ์ใหม่ก็ได้" },
    { n: 3, k: "เริ่มงานวันไหน",      sub: "เราจะเตรียมระบบและคอร์สเริ่มงานให้อัตโนมัติ" },
    { n: 4, k: "เงินเดือนและสวัสดิการ", sub: "ส่วนนี้แก้ไขภายหลังได้ ไม่ต้องเป๊ะตอนนี้" },
  ];

  const canNext = () => {
    if (step === 1) return f.firstName.trim() && f.lastName.trim() && f.email.trim();
    if (step === 2) return f.role.trim() && f.branch.trim();
    if (step === 3) return f.startDate.trim();
    return true;
  };

  const next = () => {
    if (step < TOTAL) setStep(step + 1);
    else { onDone && onDone(f); onClose(); }
  };

  const ROLES = ["ผู้ช่วยร้าน", "หัวหน้ากะ", "บาริสต้า", "พนักงานครัว", "ผู้จัดการสาขา", "ฝ่ายปฏิบัติการ"];
  const BRANCHES = ["ทองหล่อ", "เอกมัย", "อโศก", "สีลม", "เซ็นทรัลเวิลด์", "EmQuartier"];
  const TYPES = ["ประจำ", "พาร์ทไทม์", "สัญญาจ้าง", "ฝึกงาน"];

  // Quick-pick start dates
  const today = new Date();
  const fmt = (d) => d.toISOString().slice(0,10);
  const inDays = (n) => { const d = new Date(today); d.setDate(d.getDate()+n); return d; };
  const QUICK_DATES = [
    { l: "พรุ่งนี้",     v: fmt(inDays(1)) },
    { l: "ต้นสัปดาห์หน้า", v: fmt(inDays(7 - today.getDay() + 1)) },
    { l: "อีก 2 สัปดาห์",  v: fmt(inDays(14)) },
    { l: "ต้นเดือนหน้า",  v: fmt(new Date(today.getFullYear(), today.getMonth()+1, 1)) },
  ];

  const PLANS = [
    { k: "flex_plus", l: "Flex Plus",  d: "วงเงินเบิก ฿12,000/ปี · ทันตกรรม · ครอบครัว" },
    { k: "flex_core", l: "Flex Core",  d: "วงเงินเบิก ฿8,000/ปี · พื้นฐาน" },
    { k: "none",      l: "ยังไม่กำหนด", d: "เลือกภายหลังหลังเริ่มงาน" },
  ];

  return (
    <div className="hire-overlay" onClick={onClose}>
      <div className="hire-panel" onClick={e => e.stopPropagation()}>
        {/* Header — minimal, big breathing room */}
        <div className="hire-head">
          <button className="icon-btn" onClick={onClose} aria-label="ปิด" style={{width: 36, height: 36}}>
            <span style={{fontSize: 18, lineHeight: 1, color:"var(--ink-2)"}}>×</span>
          </button>
          <div style={{flex: 1}}>
            <div className="eyebrow" style={{color:"var(--accent)"}}>เพิ่มพนักงาน · ขั้นที่ {step} จาก {TOTAL}</div>
          </div>
          <div style={{fontSize: 12, color:"var(--ink-3)"}}>ใช้เวลาเฉลี่ย ~90 วินาที</div>
        </div>

        {/* Progress strip — segmented */}
        <div className="hire-progress">
          {STEPS.map(s => (
            <div key={s.n} className={"seg " + (step >= s.n ? "done " : "") + (step === s.n ? "active" : "")}>
              <div className="seg-bar"/>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="hire-body">
          <div style={{maxWidth: 540, margin:"0 auto"}}>
            <h2 style={{fontSize: 26, letterSpacing:"-0.02em", marginBottom: 6}}>{STEPS[step-1].k}</h2>
            <p style={{color:"var(--ink-3)", fontSize: 14, marginBottom: 28}}>{STEPS[step-1].sub}</p>

            {step === 1 && (
              <div className="hire-fields">
                <div className="row" style={{gap: 12}}>
                  <BigField label="ชื่อ" required value={f.firstName} onChange={v => set("firstName", v)} placeholder="เช่น นภัสสร"/>
                  <BigField label="นามสกุล" required value={f.lastName} onChange={v => set("lastName", v)} placeholder="เช่น วงศ์สวัสดิ์"/>
                </div>
                <BigField label="ชื่อเล่น" optional value={f.nickname} onChange={v => set("nickname", v)} placeholder="ชื่อที่ใช้เรียกในทีม (ไม่บังคับ)"/>
                <BigField label="อีเมล" required value={f.email} onChange={v => set("email", v)} placeholder="ส่งคำเชิญและ onboarding ไปที่นี่"/>
                <div className="row" style={{gap: 12}}>
                  <BigField label="เบอร์มือถือ" optional value={f.phone} onChange={v => set("phone", v)} placeholder="08x-xxx-xxxx"/>
                  <BigField label="LINE ID" optional value={f.lineId} onChange={v => set("lineId", v)} placeholder="@…"/>
                </div>
                <div className="hire-hint">
                  <Ic.smile size={14}/> เริ่มจากแค่นี้ก่อน · พนักงานจะกรอกข้อมูลส่วนตัวที่เหลือเองในวันแรก
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="hire-fields">
                <div>
                  <div className="hire-label">ตำแหน่ง <span className="req">*</span></div>
                  <input className="hire-input" type="text" value={f.role} onChange={e => set("role", e.target.value)} placeholder="พิมพ์เพื่อค้นหาหรือสร้างใหม่…"/>
                  <div className="chip-row" style={{marginTop: 10}}>
                    {ROLES.map(r => (
                      <button key={r} type="button" className={"chip " + (f.role === r ? "selected" : "")} onClick={() => set("role", r)}>{r}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="hire-label">สาขา <span className="req">*</span></div>
                  <div className="chip-row">
                    {BRANCHES.map(b => (
                      <button key={b} type="button" className={"chip " + (f.branch === b ? "selected" : "")} onClick={() => set("branch", b)}>{b}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="hire-label">ประเภทการจ้าง</div>
                  <div className="chip-row">
                    {TYPES.map(t => (
                      <button key={t} type="button" className={"chip " + (f.employmentType === t ? "selected" : "")} onClick={() => set("employmentType", t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="hire-fields">
                <div>
                  <div className="hire-label">วันที่เริ่มงาน <span className="req">*</span></div>
                  <div className="chip-row" style={{marginBottom: 10}}>
                    {QUICK_DATES.map(d => (
                      <button key={d.l} type="button" className={"chip " + (f.startDate === d.v ? "selected" : "")} onClick={() => set("startDate", d.v)}>
                        <Ic.calendar size={12} style={{marginRight: 4}}/> {d.l}
                      </button>
                    ))}
                  </div>
                  <input className="hire-input" type="date" value={f.startDate} onChange={e => set("startDate", e.target.value)}/>
                </div>

                <div className="hire-summary">
                  <div className="eyebrow" style={{marginBottom: 8}}>เราจะเตรียมให้อัตโนมัติ</div>
                  <div className="col" style={{gap: 8}}>
                    <SummaryRow ic="check" l="สร้างบัญชีและส่งคำเชิญทางอีเมล"/>
                    <SummaryRow ic="check" l="กำหนดสิทธิ์เข้าใช้ระบบตามตำแหน่ง"/>
                    <SummaryRow ic="check" l="ลงคอร์ส onboarding 3 รายการอัตโนมัติ"/>
                    <SummaryRow ic="check" l="แจ้งหัวหน้าสาขาและทีม"/>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="hire-fields">
                <BigField
                  label="เงินเดือน (บาท/เดือน)" optional
                  value={f.salary}
                  onChange={v => set("salary", v.replace(/[^0-9]/g, ""))}
                  placeholder="กรอกหรือข้ามไปก็ได้ — เพิ่มภายหลังก่อนวันจ่ายแรก"
                  prefix="฿"
                />

                <div>
                  <div className="hire-label">แผนสวัสดิการ</div>
                  <div className="plan-row">
                    {PLANS.map(p => (
                      <button key={p.k} type="button" className={"plan-card " + (f.planKey === p.k ? "selected" : "")} onClick={() => set("planKey", p.k)}>
                        <div style={{fontSize: 14, fontWeight: 700, letterSpacing:"-0.01em"}}>{p.l}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 4, lineHeight: 1.4}}>{p.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <BigField label="แนะนำโดย" optional value={f.referredBy} onChange={v => set("referredBy", v)} placeholder="ชื่อผู้แนะนำ (ถ้ามี)"/>

                <div className="hire-summary" style={{background:"var(--accent-soft)", borderColor:"transparent"}}>
                  <div className="row" style={{gap: 10, alignItems:"flex-start"}}>
                    <Ic.smile size={18} style={{color:"var(--accent)", flexShrink: 0, marginTop: 2}}/>
                    <div>
                      <div style={{fontSize: 14, fontWeight: 600, marginBottom: 2}}>เกือบเสร็จแล้ว</div>
                      <div style={{fontSize: 13, color:"var(--ink-2)", lineHeight: 1.5}}>
                        เรามีข้อมูลพอเริ่ม onboarding · ส่วนที่เหลือ (เลขบัตร ปชช. · ที่อยู่ · บัญชีธนาคาร) ให้พนักงานกรอกเองในวันแรก
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="hire-foot">
          <button className="btn btn-ghost" onClick={() => step > 1 ? setStep(step-1) : onClose()}>
            {step > 1 ? "ย้อนกลับ" : "ยกเลิก"}
          </button>

          <div className="spacer"/>

          <div style={{fontSize: 12, color:"var(--ink-3)", marginRight: 12}}>
            {step < TOTAL ? `เหลืออีก ${TOTAL - step} ขั้น` : "พร้อมส่งคำเชิญแล้ว"}
          </div>

          {step < TOTAL && step !== 1 && (
            <button className="btn btn-ghost" onClick={() => setStep(step+1)} style={{marginRight: 8}}>
              ข้ามขั้นนี้
            </button>
          )}

          <button className="btn btn-primary" disabled={!canNext()} onClick={next}>
            {step < TOTAL ? <>ถัดไป <Ic.arrow size={13}/></> : <>ส่งคำเชิญและเริ่มงาน <Ic.send size={13}/></>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Subcomponents ----
function BigField({ label, value, onChange, placeholder, required, optional, prefix }) {
  return (
    <div className="big-field" style={{flex: 1}}>
      <div className="hire-label">
        {label}
        {required && <span className="req"> *</span>}
        {optional && <span className="opt"> · ไม่บังคับ</span>}
      </div>
      <div className="hire-input-wrap">
        {prefix && <span className="hire-prefix">{prefix}</span>}
        <input
          className="hire-input"
          style={prefix ? {paddingLeft: 32} : {}}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function SummaryRow({ ic, l }) {
  const Ic = window.I;
  const Glyph = Ic[ic];
  return (
    <div className="row" style={{gap: 10}}>
      <div style={{width: 22, height: 22, borderRadius: 7, background:"var(--accent-soft)", color:"var(--accent)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}>
        <Glyph size={12}/>
      </div>
      <div style={{fontSize: 13.5, color:"var(--ink-2)"}}>{l}</div>
    </div>
  );
}

window.AdminHire = AdminHire;
