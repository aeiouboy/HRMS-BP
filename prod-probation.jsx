// Probation: Manager Approve View — STA-23
// Two views: Inbox (queue) + Detail (single approval)

const CASES = [
  { id:"PRB-2456", n:"ปริยา ตันธีรพล", ne:"Priya Tanthiraphon", ec:"EMP-02458", c:"PT", t:"teal",
    pos:"ผู้ช่วยร้าน · ทองหล่อ", hire:"15 ม.ค. 2569", tenure:"3 เดือน 29 วัน",
    days: 10, manager:"คุณจงรักษ์ · CEN/Ops", note:"อาวุโสในกะเช้า · ขายเข้าทีมได้ดี"},
  { id:"PRB-2461", n:"นพดล สุขสวัสดิ์", ne:"Noppadol Sukhsawat", ec:"EMP-02463", c:"NS", t:"butter",
    pos:"บาริสต้า · เอกมัย", hire:"22 ม.ค. 2569", tenure:"3 เดือน 22 วัน",
    days: 17, manager:"คุณจงรักษ์ · CEN/Ops", note:"ผ่านการอบรม Barista Level 1"},
  { id:"PRB-2467", n:"สาธิต บุญมี", ne:"Sathit Boonmee", ec:"EMP-02471", c:"SB", t:"sage",
    pos:"แคชเชียร์ · สีลม", hire:"3 ก.พ. 2569", tenure:"3 เดือน 11 วัน",
    days: 28, manager:"คุณจงรักษ์ · CEN/Ops", note:"ต้องตามให้ครบ"},
  { id:"PRB-2470", n:"กชกร พงษ์ศักดิ์", ne:"Kotchakorn Pongsak", ec:"EMP-02475", c:"KP", t:"coral",
    pos:"ผู้ช่วยผู้จัดการสาขา · อโศก", hire:"19 ก.พ. 2569", tenure:"2 เดือน 25 วัน",
    days: 41, manager:"คุณจงรักษ์ · CEN/Ops", note:"—"},
];

// ---- INBOX ----
function ProbationInbox() {
  const I = window.PI;
  const [filter, setFilter] = React.useState("all");
  const [selected, setSelected] = React.useState({});

  const counts = {
    all: CASES.length,
    urgent: CASES.filter(c => c.days <= 14).length,
    warn: CASES.filter(c => c.days > 14 && c.days <= 29).length,
    soon: CASES.filter(c => c.days > 29).length,
  };

  const visible = CASES.filter(c => {
    if (filter === "urgent") return c.days <= 14;
    if (filter === "warn") return c.days > 14 && c.days <= 29;
    if (filter === "soon") return c.days > 29;
    return true;
  });

  const checkedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div style={{paddingBottom: 32}}>
      {/* Breadcrumb + title */}
      <div style={{marginBottom: 18}}>
        <div className="humi-row" style={{gap: 8, fontSize: 13, color:"var(--color-ink-muted)", marginBottom: 8}}>
          <span>ศูนย์รวม Admin</span>
          <I.chevR size={12}/>
          <span>การประเมิน</span>
          <I.chevR size={12}/>
          <span style={{color:"var(--color-ink)"}}>ทดลองงาน · รออนุมัติ</span>
        </div>
        <div className="humi-row" style={{alignItems:"flex-start"}}>
          <div>
            <div className="humi-eyebrow">EC · Probation Workflow</div>
            <h1 style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 600, letterSpacing:"-0.02em", marginTop: 4}}>
              ประเมินทดลองงาน
            </h1>
            <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>
              4 ทีมงานในความดูแล · 1 รายการต้องดำเนินการภายใน 14 วัน
            </p>
          </div>
          <div className="humi-spacer"/>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> ส่งออก</button>
        </div>
      </div>

      {/* Tier summary cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 18}}>
        {[
          { l:"ทั้งหมด",        v: counts.all,    sub:"ในความดูแล",            tone:"ink",    target:"all"},
          { l:"เร่งด่วน",        v: counts.urgent, sub:"≤ 14 วัน · ใกล้ครบกำหนด", tone:"danger", target:"urgent"},
          { l:"ใกล้ครบ",         v: counts.warn,   sub:"15–29 วัน",              tone:"warn",   target:"warn"},
          { l:"ทดลองงานปกติ",     v: counts.soon,   sub:"≥ 30 วัน",              tone:"sage",   target:"soon"},
        ].map(k => (
          <button key={k.l} onClick={() => setFilter(k.target)}
                  style={{
                    background: filter === k.target ? "var(--color-canvas-soft)" : "var(--color-surface)",
                    border: "1px solid " + (filter === k.target ? "var(--color-ink)" : "var(--color-hairline)"),
                    borderRadius: 14, padding: "16px 18px", textAlign: "left", cursor: "pointer",
                    fontFamily: "inherit", transition: "all .15s",
                  }}>
            <div className="humi-eyebrow" style={{
              color: k.tone === "danger" ? "#B91C1C" :
                     k.tone === "warn"   ? "#92400E" :
                     k.tone === "sage"   ? "#2F5840" : "var(--color-ink-muted)"
            }}>{k.l}</div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 32, fontWeight: 700, letterSpacing:"-0.02em", marginTop: 4, color:"var(--color-ink)"}}>{k.v}</div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{k.sub}</div>
          </button>
        ))}
      </div>

      {/* Bulk action bar (visible when selected) */}
      {checkedCount > 0 && (
        <div className="humi-card" style={{padding:"12px 18px", marginBottom: 14, background:"var(--color-ink)", color:"#E7E3D8", borderColor:"var(--color-ink)"}}>
          <div className="humi-row">
            <span style={{fontSize: 14, fontWeight: 600}}>{checkedCount} รายการถูกเลือก</span>
            <div className="humi-spacer"/>
            <button className="humi-button" style={{background:"transparent", border:"1px solid rgba(255,255,255,0.3)", color:"#fff"}}>เปิดประเมินรวม</button>
            <button className="humi-button humi-button--primary"><I.check size={14}/> อนุมัติทั้งหมด (Pass)</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"40px 2.2fr 1.4fr 1fr 1.4fr 160px",
          padding:"12px 18px",
          background:"var(--color-canvas-soft)",
          borderBottom:"1px solid var(--color-hairline)",
          fontSize: 11, color:"var(--color-ink-muted)",
          textTransform:"uppercase", letterSpacing:".08em", fontWeight: 600,
          alignItems:"center"
        }}>
          <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
          <div>พนักงาน</div>
          <div>ตำแหน่ง · สาขา</div>
          <div>ครบกำหนด</div>
          <div>หมายเหตุล่าสุด</div>
          <div></div>
        </div>

        {visible.map(c => {
          const isUrgent = c.days <= 14;
          const isWarn = c.days > 14 && c.days <= 29;
          return (
            <div key={c.id}
                 style={{
                   display:"grid",
                   gridTemplateColumns:"40px 2.2fr 1.4fr 1fr 1.4fr 160px",
                   padding:"16px 18px",
                   borderBottom:"1px solid var(--color-hairline-soft)",
                   alignItems:"center",
                   gap: 8,
                   cursor:"pointer"
                 }}>
              <input type="checkbox" checked={!!selected[c.id]} onChange={e => setSelected(s => ({...s, [c.id]: e.target.checked}))}
                     style={{accentColor:"var(--color-accent)"}}/>
              <div className="humi-row" style={{gap: 12, minWidth: 0}}>
                <div className={"humi-avatar humi-avatar--" + c.t} style={{width: 36, height: 36, fontSize: 12, flexShrink: 0}}>{c.c}</div>
                <div style={{minWidth: 0}}>
                  <div style={{fontSize: 14, fontWeight: 600, letterSpacing:"-0.01em"}}>{c.n}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{c.ec} · {c.ne}</div>
                </div>
              </div>
              <div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{c.pos}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>เริ่ม {c.hire}</div>
              </div>
              <div>
                <div style={{fontSize: 13, fontWeight: 600,
                             color: isUrgent ? "#B91C1C" : isWarn ? "#92400E" : "var(--color-ink-soft)"}}>
                  {c.days} วัน
                </div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{c.tenure}</div>
              </div>
              <div style={{fontSize: 12, color:"var(--color-ink-muted)", lineHeight: 1.5}}>{c.note}</div>
              <div className="humi-row" style={{gap: 6, justifyContent:"flex-end"}}>
                {isUrgent && <span className="humi-tag" style={{background:"#FEF2F2", color:"#B91C1C", border:"1px solid #FECACA", fontSize: 10}}>เร่งด่วน</span>}
                {isWarn && <span className="humi-tag humi-tag--butter" style={{fontSize: 10}}>ใกล้ครบ</span>}
                <button className="humi-button humi-button--ghost" style={{padding:"6px 12px", fontSize: 12, minHeight: 32}}>เปิดเคส <I.arrowR size={12}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- DETAIL / APPROVE ----
function ProbationApprove() {
  const I = window.PI;
  const [outcome, setOutcome] = React.useState("pass");
  const [rating, setRating] = React.useState(4);
  const c = CASES[0]; // ปริยา (urgent)

  return (
    <div style={{paddingBottom: 32}}>
      {/* Back nav */}
      <div className="humi-row" style={{gap: 6, marginBottom: 14, fontSize: 13, color:"var(--color-ink-muted)"}}>
        <I.arrowL size={14}/> <span>กลับไปคิวประเมิน</span>
      </div>

      {/* Title */}
      <div className="humi-row" style={{gap: 12, alignItems:"flex-start", marginBottom: 22}}>
        <div style={{width: 40, height: 40, borderRadius: 11, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}>
          <I.shield size={20}/>
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ · {c.id}</div>
          <h1 style={{fontFamily:"var(--font-display)", fontSize: 24, fontWeight: 600, letterSpacing:"-0.02em", marginTop: 4}}>ประเมินทดลองงาน</h1>
        </div>
      </div>

      {/* Days remaining banner */}
      <div role="status" style={{background:"#FEF2F2", border:"1.5px solid #EF4444", borderRadius: 12, padding:"14px 18px", marginBottom: 20, color:"#B91C1C", display:"flex", gap: 12, alignItems:"center"}}>
        <I.alert size={20}/>
        <div>
          <div style={{fontSize: 14, fontWeight: 600}}>ใกล้ครบกำหนด — เหลือ {c.days} วัน</div>
          <div style={{fontSize: 12, marginTop: 2, color:"#9F1D1D"}}>กรุณาบันทึกการประเมินก่อนวันที่ 24 พ.ค. 2569 · หลังจากนั้นระบบจะ auto-pass อัตโนมัติ</div>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.6fr 1fr", gap: 20}}>
        {/* LEFT — main form */}
        <div className="humi-col" style={{gap: 20}}>
          {/* Employee snapshot */}
          <div className="humi-card humi-card--cream">
            <div className="humi-row" style={{gap: 14, alignItems:"flex-start"}}>
              <div className={"humi-avatar humi-avatar--" + c.t} style={{width: 56, height: 56, fontSize: 17, flexShrink: 0}}>{c.c}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div className="humi-eyebrow" style={{marginBottom: 2}}>{c.ec}</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing:"-0.015em"}}>{c.n}</div>
                <div style={{fontSize: 13, color:"var(--color-ink-muted)"}}>{c.ne}</div>
              </div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginTop: 18, paddingTop: 16, borderTop:"1px solid var(--color-hairline-soft)"}}>
              <div><div className="humi-eyebrow">ตำแหน่ง</div><div style={{fontSize: 13, fontWeight: 600, marginTop: 4}}>{c.pos}</div></div>
              <div><div className="humi-eyebrow">วันเริ่มงาน</div><div style={{fontSize: 13, fontWeight: 600, marginTop: 4}}>{c.hire}</div></div>
              <div><div className="humi-eyebrow">อายุงาน</div><div style={{fontSize: 13, fontWeight: 600, marginTop: 4}}>{c.tenure}</div></div>
              <div><div className="humi-eyebrow">หัวหน้าโดยตรง</div><div style={{fontSize: 13, fontWeight: 600, marginTop: 4}}>{c.manager}</div></div>
            </div>
          </div>

          {/* Outcome selector */}
          <div className="humi-card">
            <div className="humi-eyebrow" style={{marginBottom: 8}}>ขั้นที่ 1 จาก 3</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing:"-0.015em", marginBottom: 14}}>ผลการประเมิน <span style={{color:"var(--color-accent)"}}>*</span></h3>

            <div role="radiogroup" style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 10}}>
              {[
                { v:"pass",    l:"ผ่านทดลองงาน", s:"พนักงานจะถูกบรรจุเป็น Permanent", ic:"check",  c:"var(--color-accent)" },
                { v:"extend",  l:"ขยายเวลา",      s:"ทดลองต่ออีก 30–60 วัน",         ic:"clock",   c:"var(--color-warning)" },
                { v:"no_pass", l:"ไม่ผ่าน",        s:"พนักงานจะสิ้นสภาพหลังบันทึก",     ic:"x",       c:"var(--color-danger)" },
              ].map(o => {
                const Glyph = I[o.ic];
                const sel = outcome === o.v;
                return (
                  <label key={o.v}
                         onClick={() => setOutcome(o.v)}
                         style={{
                           cursor: "pointer",
                           border: "1.5px solid " + (sel ? o.c : "var(--color-hairline)"),
                           background: sel ? "var(--color-canvas-soft)" : "var(--color-surface)",
                           borderRadius: 14, padding: 16,
                           display: "flex", flexDirection: "column", gap: 8,
                           transition: "all .15s"
                         }}>
                    <div className="humi-row" style={{justifyContent:"space-between"}}>
                      <div style={{width: 32, height: 32, borderRadius: 8, background: sel ? o.c : "var(--color-canvas-soft)", color: sel ? "#fff" : o.c, display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                        <Glyph size={16}/>
                      </div>
                      <input type="radio" name="outcome" checked={sel} onChange={() => setOutcome(o.v)} style={{accentColor: o.c}}/>
                    </div>
                    <div>
                      <div style={{fontSize: 14, fontWeight: 600, letterSpacing:"-0.01em"}}>{o.l}</div>
                      <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 4, lineHeight: 1.4}}>{o.s}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Conditional fields */}
            {outcome === "extend" && (
              <div style={{marginTop: 18, padding: 14, background:"#FFFBEB", border:"1px solid #FCD34D", borderRadius: 10}}>
                <div className="field-grid">
                  <F label="ขยายถึงวันที่" type="date" required value="2026-06-25" hint="ต้องไม่เกินวันเริ่มงาน + 119 วัน"/>
                  <S label="ระยะเวลา" required options={["30 วัน","45 วัน","60 วัน"]}/>
                </div>
              </div>
            )}

            {outcome === "pass" && (
              <div style={{marginTop: 18}}>
                <div className="field-grid">
                  <F label="วันที่บรรจุ (effective)" type="date" required value="2026-05-15"/>
                  <F label="Allowance (ถ้ามี)" type="number" optional placeholder="0" hint="จะส่ง Payroll อัตโนมัติ"/>
                </div>
              </div>
            )}
          </div>

          {/* Evaluation */}
          <div className="humi-card">
            <div className="humi-eyebrow" style={{marginBottom: 8}}>ขั้นที่ 2 จาก 3</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing:"-0.015em", marginBottom: 14}}>ผลการประเมินเชิงคุณภาพ</h3>

            <div style={{marginBottom: 16}}>
              <label className="field-label">คะแนนรวม <span className="field-required">*</span></label>
              <div className="humi-row" style={{gap: 4, alignItems: "center"}}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setRating(n)}
                          style={{background:"none", border:"none", cursor:"pointer", padding: 2, color: n <= rating ? "var(--color-warning)" : "var(--color-hairline)", fontSize: 28, lineHeight: 1}}>
                    ★
                  </button>
                ))}
                <span style={{fontSize: 13, color:"var(--color-ink-muted)", marginLeft: 8}}>{rating}/5 — เกินมาตรฐาน</span>
              </div>
            </div>

            <div className="field-grid">
              <div className="full">
                <label className="field-label">จุดเด่น <span className="field-required">*</span></label>
                <textarea className="field-input" rows={2} defaultValue="ทำงานเร็ว ใส่ใจลูกค้า · ขายเข้าทีมได้ดี · มีอาวุโสในกะเช้า"/>
              </div>
              <div className="full">
                <label className="field-label">จุดที่ต้องพัฒนา <span className="field-required">*</span></label>
                <textarea className="field-input" rows={2} defaultValue="การจัดการสต็อกหลังร้าน · ต้องอบรมระบบ POS เพิ่ม"/>
              </div>
              <div className="full">
                <label className="field-label">ข้อเสนอแนะ <span className="field-required">*</span></label>
                <textarea className="field-input" rows={2} placeholder="ข้อเสนอแนะโดยรวมต่อ HR..."/>
              </div>
            </div>
          </div>

          {/* Attachment */}
          <div className="humi-card">
            <div className="humi-eyebrow" style={{marginBottom: 8}}>ขั้นที่ 3 จาก 3</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing:"-0.015em", marginBottom: 14}}>เอกสารแนบ (ถ้ามี)</h3>
            <div style={{padding:"22px 18px", background:"var(--color-canvas-soft)", border:"1.5px dashed var(--color-hairline)", borderRadius: 12, textAlign:"center", color:"var(--color-ink-muted)"}}>
              <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink-soft)"}}>ลากเอกสารมาวาง หรือ <span style={{color:"var(--color-accent)"}}>เลือกไฟล์</span></div>
              <div style={{fontSize: 11, marginTop: 4}}>เช่น บันทึกการสนทนา · ผลงาน · PDF / JPG / PNG · ไม่เกิน 10 MB</div>
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar: approval chain + history */}
        <div className="humi-col" style={{gap: 20}}>
          {/* Approval chain */}
          <div className="humi-card">
            <div className="humi-eyebrow" style={{marginBottom: 12}}>ขั้นตอนอนุมัติ</div>
            <div className="humi-col" style={{gap: 0}}>
              {[
                { l:"หัวหน้างาน", s:"คุณจงรักษ์", st:"current", ic:"user" },
                { l:"HR Admin",   s:"จอร์แดน เหมย", st:"pending", ic:"shield" },
                { l:"Payroll",    s:"ส่งเข้าระบบจ่ายเงิน", st:"pending", ic:"wallet" },
              ].map((step, i, arr) => {
                const isCurrent = step.st === "current";
                const isDone = step.st === "done";
                const Glyph = I[step.ic];
                return (
                  <div key={i} className="humi-row" style={{alignItems:"flex-start", gap: 12, padding:"4px 0", position:"relative"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", flexShrink: 0}}>
                      <div style={{width: 32, height: 32, borderRadius: 50, display:"flex", alignItems:"center", justifyContent:"center",
                                   background: isCurrent ? "var(--color-accent)" : isDone ? "var(--color-success)" : "var(--color-surface)",
                                   color: isCurrent || isDone ? "#fff" : "var(--color-ink-faint)",
                                   border: "1.5px solid " + (isCurrent ? "var(--color-accent)" : isDone ? "var(--color-success)" : "var(--color-hairline)"),
                                   zIndex: 1}}>
                        {isDone ? <I.check size={14}/> : <Glyph size={14}/>}
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{width: 2, flex: 1, minHeight: 28, background: isDone ? "var(--color-success)" : "var(--color-hairline)", margin:"-1px 0"}}/>
                      )}
                    </div>
                    <div style={{paddingBottom: 18, flex: 1, minWidth: 0}}>
                      <div style={{fontSize: 13, fontWeight: 600, color: isCurrent ? "var(--color-accent)" : "var(--color-ink)"}}>
                        {step.l} {isCurrent && <span className="humi-tag humi-tag--accent" style={{fontSize: 10, marginLeft: 6}}>กำลังดำเนินการ</span>}
                      </div>
                      <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{step.s}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History */}
          <div className="humi-card humi-card--cream">
            <div className="humi-eyebrow" style={{marginBottom: 10}}>ประวัติเคส</div>
            <div className="humi-col" style={{gap: 12}}>
              {[
                { t:"เคสถูกสร้าง", w:"15 เม.ย. · ระบบ Auto", c:"var(--color-ink-faint)"},
                { t:"แจ้งเตือนหัวหน้างาน (14 วัน)", w:"4 พ.ค. · ระบบ Auto", c:"var(--color-warning)"},
                { t:"เปิดดูโดยคุณจงรักษ์", w:"14 พ.ค. · 09:42", c:"var(--color-accent)"},
              ].map((h, i) => (
                <div key={i} className="humi-row" style={{gap: 10, alignItems:"flex-start"}}>
                  <div style={{width: 8, height: 8, borderRadius: 50, background: h.c, marginTop: 6, flexShrink: 0}}/>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 13, fontWeight: 500}}>{h.t}</div>
                    <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{h.w}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick reference */}
          <div className="humi-card humi-card--ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="humi-blob humi-blob--teal" style={{width: 80, height: 100, right: -25, bottom: -30, opacity: 0.5}}/>
            <div className="humi-eyebrow" style={{color:"var(--color-accent)"}}>เกณฑ์อ้างอิง</div>
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 15, marginTop: 8, color:"var(--color-canvas-soft)"}}>นโยบายทดลองงาน · ฉบับ 2569</h4>
            <ul style={{margin:"10px 0 0 0", padding: 0, listStyle:"none", fontSize: 12, color:"rgba(231,227,216,0.85)", display:"flex", flexDirection:"column", gap: 6}}>
              <li>• ระยะทดลอง 119 วัน (4 เดือน)</li>
              <li>• ขยายเวลาได้สูงสุด 60 วัน</li>
              <li>• ไม่ผ่าน → แจ้งล่วงหน้า 1 รอบจ่ายเงินเดือน</li>
              <li>• ผ่าน → Allowance ตามสัญญา</li>
            </ul>
            <a style={{display:"inline-flex", alignItems:"center", gap: 6, fontSize: 12, color:"var(--color-accent)", marginTop: 12, fontWeight: 600}}>ดูฉบับเต็ม <I.arrowR size={11}/></a>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div style={{position:"sticky", bottom: 0, marginTop: 20, marginLeft: -32, marginRight: -32, padding:"14px 32px", background:"var(--color-surface)", borderTop:"1px solid var(--color-hairline)", display:"flex", alignItems:"center", gap: 12, boxShadow:"0 -6px 20px rgba(14,27,44,0.05)"}}>
        <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>
          บันทึกร่างอัตโนมัติ · 14:32 · กรอก 9 จาก 12 ช่อง
        </div>
        <div className="humi-spacer"/>
        <button className="humi-button humi-button--ghost">ยกเลิก</button>
        <button className="humi-button humi-button--ghost">บันทึกร่าง</button>
        {outcome === "no_pass" ? (
          <button className="humi-button" style={{background:"var(--color-danger)", color:"#fff"}}>
            <I.x size={14}/> ยืนยัน ไม่ผ่านทดลองงาน
          </button>
        ) : (
          <button className="humi-button humi-button--primary">
            <I.check size={14}/> อนุมัติและส่งให้ HR Admin
          </button>
        )}
      </div>
    </div>
  );
}

window.ProbationInbox = ProbationInbox;
window.ProbationApprove = ProbationApprove;
