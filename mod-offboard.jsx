// ============================================================================
// mod-offboard.jsx — Employee Offboarding flow (closes the loop from
// `screens/requests.jsx → resign`). Three persona views:
//   • Manager  — Approve resignation
//   • HR Admin — Offboarding workspace (clearance + final pay)
//   • Employee — Exit interview form
// ============================================================================

// ===== 1) MANAGER — Approve Resignation ====================================

function Offboard_Manager() {
  const I = window.PI;
  const [decision, setDecision] = React.useState(null); // null | "approve" | "discuss"

  // The employee submitting
  const E = {
    nameTh: "เบน คิม",
    nameEn: "Ben Kim",
    role: "พนักงานคลังสินค้า · กะเช้า",
    branch: "Central World",
    tenure: "2 ปี 4 เดือน",
    submitDate: "15 เม.ย. 2568",
    lastDay:    "15 พ.ค. 2568",
    noticePeriod: 30,
    reason: "personal_growth",
    reasonText: "ได้รับโอกาสไปทำงานต่างประเทศ ขอบคุณบริษัทมากครับ",
    avatar: "BK",
  };

  const REASONS = {
    personal_growth: "พัฒนาตนเอง / โอกาสใหม่",
    family:          "ปัญหาครอบครัว",
    health:          "ปัญหาสุขภาพ",
    relocation:      "ย้ายภูมิลำเนา",
    pay:             "ค่าตอบแทน",
    workplace:       "บรรยากาศที่ทำงาน",
    other:           "อื่นๆ",
  };

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Page head */}
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">
            <a href="#" style={{color:"inherit", textDecoration:"none"}}>กล่องงาน</a>
            <span style={{margin:"0 6px"}}>›</span>
            <a href="#" style={{color:"inherit", textDecoration:"none"}}>คำขอลาออก</a>
            <span style={{margin:"0 6px"}}>›</span>
            <span style={{color:"var(--color-ink-soft)"}}>REQ-2491</span>
          </div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>
            อนุมัติการลาออก
            <span className="humi-hero-title-soft" style={{marginLeft: 10}}>· {E.nameTh}</span>
          </h1>
        </div>
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <span className="humi-tag humi-tag--coral"><I.warn size={12}/> รอตอบกลับ 2 วัน</span>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap: 20}}>
        {/* LEFT: case detail */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>

          {/* Employee header card */}
          <div className="humi-card">
            <div style={{display:"flex", alignItems:"center", gap: 16}}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background:"linear-gradient(135deg, #243447, #5A6A7E)",
                color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700,
              }}>{E.avatar}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600, color:"var(--color-ink)", letterSpacing:"-0.015em"}}>
                  {E.nameTh} <span style={{color:"var(--color-ink-muted)", fontWeight: 500}}>· {E.nameEn}</span>
                </div>
                <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 4}}>
                  {E.role} · {E.branch} · ทำงานมา {E.tenure}
                </div>
              </div>
              <a href="#" style={{fontSize: 13, color:"var(--color-accent)", textDecoration:"none", fontWeight: 600}}>
                ดูโปรไฟล์ →
              </a>
            </div>

            {/* Timeline metric strip */}
            <div style={{
              marginTop: 18, padding: 16,
              background:"var(--color-canvas-soft)",
              borderRadius:"var(--radius-md)",
              display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 0,
            }}>
              <Metric l="ส่งคำขอเมื่อ" v={E.submitDate} sub="เมื่อ 2 วันที่แล้ว"/>
              <Metric l="วันสุดท้าย" v={E.lastDay} sub={`อีก ${E.noticePeriod} วัน`} accent/>
              <Metric l="ระยะเวลาแจ้งล่วงหน้า" v={`${E.noticePeriod} วัน`} sub="ตามนโยบาย ≥ 30 วัน ✓"/>
              <Metric l="วันลาคงเหลือ" v="6 วัน" sub="ต้องเคลียร์ก่อน"/>
            </div>
          </div>

          {/* Reason */}
          <div className="humi-card">
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 14}}>
              <h3 className="humi-section-title">เหตุผลที่ลาออก</h3>
              <span className="humi-tag humi-tag--cream">{REASONS[E.reason]}</span>
            </div>
            <div style={{
              padding: 16, background:"var(--color-canvas-soft)",
              borderRadius:"var(--radius-md)", borderLeft:"3px solid var(--color-accent)",
              fontSize: 14, color:"var(--color-ink-soft)", lineHeight: 1.6, fontStyle:"italic",
            }}>
              "{E.reasonText}"
            </div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 12, display:"flex", alignItems:"center", gap: 6}}>
              <I.alert size={13}/> เหตุผลและคำตอบสัมภาษณ์ออกจะถูกแชร์ให้ HR Admin โดยอัตโนมัติ
            </div>
          </div>

          {/* Decision panel */}
          <div className="humi-card">
            <h3 className="humi-section-title">การตัดสินใจของคุณ</h3>
            <p className="humi-section-sub" style={{marginBottom: 14}}>
              คุณสามารถอนุมัติได้เลย หรือขอคุยกับพนักงานก่อน (จะถูกบันทึกเป็น 1-on-1 อัตโนมัติ)
            </p>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
              <DecisionCard
                active={decision === "discuss"}
                onClick={() => setDecision("discuss")}
                title="ขอคุยก่อน"
                sub="นัด 1-on-1 ภายใน 2 วัน · เก็บเป็นคำขออยู่ในระบบ"
                icon="chat"
                color="var(--color-warning)"
              />
              <DecisionCard
                active={decision === "approve"}
                onClick={() => setDecision("approve")}
                title="อนุมัติ"
                sub="ส่งต่อให้ HR Admin · เริ่มกระบวนการ offboarding"
                icon="check"
                color="var(--color-accent)"
              />
            </div>

            {/* Comment */}
            <div style={{marginTop: 18}}>
              <label className="field-label">ข้อความถึงพนักงาน (ไม่บังคับ)</label>
              <textarea className="field-input" rows={3} placeholder="เช่น ขอบคุณสำหรับสิ่งที่ทำมา · ขอให้โชคดี" style={{resize:"vertical"}}/>
              <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 6, display:"flex", alignItems:"center", gap: 4}}>
                <I.alert size={11}/> ข้อความจะถูกส่งถึงพนักงานพร้อมแจ้งผลการอนุมัติ
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: process timeline + replacement */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>

          {/* Process timeline */}
          <div className="humi-card humi-card--cream" style={{position:"sticky", top: 80}}>
            <div className="humi-eyebrow">กระบวนการ Offboarding</div>
            <h3 className="humi-section-title" style={{marginTop: 6, marginBottom: 16}}>4 ขั้นตอน</h3>

            <Step n={1} title="พนักงานส่งคำขอ" sub={`${E.submitDate}`} done/>
            <Step n={2} title="หัวหน้าอนุมัติ" sub="คุณอยู่ขั้นนี้" current/>
            <Step n={3} title="HR Admin จัดการ" sub="Clearance · final pay" pending/>
            <Step n={4} title="วันสุดท้าย + Exit Interview" sub={`${E.lastDay}`} pending last/>
          </div>

          {/* Replacement plan */}
          <div className="humi-card">
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 10}}>
              <h3 className="humi-section-title">แผนทดแทน</h3>
              <I.users size={16} style={{color:"var(--color-ink-muted)"}}/>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap: 10}}>
              <button style={primaryGhostBtn}>
                <I.plus size={14}/> เปิด Job Requisition
              </button>
              <button style={primaryGhostBtn}>
                <I.users size={14}/> ขอโอนย้ายภายใน
              </button>
            </div>
            <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 12, lineHeight: 1.5}}>
              แนะนำเปิดรับสมัครภายใน 7 วัน · ใช้เวลาสรรหา ~ 4 สัปดาห์
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterBar
        leftLabel={decision === "approve" ? "พร้อมส่งต่อ HR Admin" : decision === "discuss" ? "พร้อมนัด 1-on-1" : "กรุณาเลือกการตัดสินใจ"}
        leftOk={!!decision}
        secondary={{ icon: "x", label: "ปฏิเสธ" }}
        primary={{ icon: decision === "discuss" ? "chat" : "check", label: decision === "discuss" ? "นัดคุยก่อน" : "อนุมัติและส่งต่อ HR Admin", disabled: !decision }}
      />
    </div>
  );
}

// ===== 2) HR ADMIN — Offboarding Workspace =================================

function Offboard_AdminWorkspace() {
  const I = window.PI;
  const [tab, setTab] = React.useState("checklist");

  const E = { nameTh: "เบน คิม", nameEn: "Ben Kim", role: "พนักงานคลังสินค้า · กะเช้า", branch: "Central World", lastDay:"15 พ.ค. 2568", tenure:"2 ปี 4 เดือน", empId:"E-3120", avatar:"BK" };

  // Clearance checklist
  const CL = [
    { cat:"คืนของบริษัท", items:[
      { l:"Laptop · Dell Latitude 5430", st:"done", who:"IT", note:"คืน 12 พ.ค."},
      { l:"บัตรพนักงาน + บัตรจอดรถ",     st:"done", who:"Security", note:"คืน 12 พ.ค."},
      { l:"เครื่องแบบ 3 ชุด + รองเท้า",  st:"pending", who:"Store Operations", note:"กำหนดส่ง 14 พ.ค."},
      { l:"ลูกกุญแจล็อกเกอร์ #B-118",     st:"pending", who:"Security", note:""},
    ]},
    { cat:"เคลียร์ระบบ + บัญชี", items:[
      { l:"ลบสิทธิ์เข้าระบบ HRMS",         st:"scheduled", who:"IT", note:"ตั้งเวลา 15 พ.ค. 23:59"},
      { l:"ลบบัญชี Email + Slack",         st:"scheduled", who:"IT", note:"ตั้งเวลา 15 พ.ค. 23:59"},
      { l:"ยกเลิกสิทธิ์ Microsoft 365",   st:"scheduled", who:"IT", note:"ตั้งเวลา 16 พ.ค."},
      { l:"ส่งต่อ task ใน workdesk",       st:"todo", who:"Manager", note:"ยังไม่ได้กำหนด"},
    ]},
    { cat:"ภาษี + การเงิน", items:[
      { l:"คำนวณเงินเดือนสุดท้าย + ค่าชดเชยวันลา 6 วัน", st:"todo", who:"Payroll", note:""},
      { l:"ยื่น ภงด.91 (แทนนายจ้าง)",   st:"todo", who:"Payroll", note:""},
      { l:"แจ้งออกประกันสังคม (สปส.6-09)", st:"todo", who:"HR Admin", note:"ภายใน 7 วันหลังออก"},
      { l:"โอนเงินกองทุนสำรองเลี้ยงชีพ",  st:"todo", who:"Payroll", note:""},
    ]},
    { cat:"เอกสาร + Knowledge transfer", items:[
      { l:"หนังสือรับรองการทำงาน",       st:"todo", who:"HR Admin", note:""},
      { l:"Handover document",            st:"pending", who:"Employee", note:"อัพโหลดแล้ว 1/3"},
      { l:"สัมภาษณ์ออก (Exit Interview)", st:"sent", who:"Employee", note:"ส่งลิงก์ 14 พ.ค."},
    ]},
  ];

  const totalItems = CL.reduce((s,c) => s + c.items.length, 0);
  const doneItems  = CL.reduce((s,c) => s + c.items.filter(i => i.st === "done").length, 0);
  const pct = Math.round(doneItems / totalItems * 100);

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Page head */}
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">
            <a href="#" style={{color:"inherit", textDecoration:"none"}}>Employee Center</a>
            <span style={{margin:"0 6px"}}>›</span>
            <span style={{color:"var(--color-ink-soft)"}}>Offboarding · {E.empId}</span>
          </div>
          <div style={{display:"flex", alignItems:"center", gap: 14, marginTop: 6}}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background:"linear-gradient(135deg, #243447, #5A6A7E)",
              color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center",
              fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 700,
            }}>{E.avatar}</div>
            <div>
              <h1 className="humi-hero-title" style={{marginTop: 0}}>{E.nameTh}</h1>
              <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 2}}>{E.role} · {E.branch} · {E.empId}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap: 8}}>
          <span className="humi-tag humi-tag--coral" style={{padding:"6px 14px", fontWeight: 600}}>
            <I.warn size={13}/> วันสุดท้ายอีก 5 วัน
          </span>
          <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>วันสุดท้าย · {E.lastDay}</span>
        </div>
      </div>

      {/* Progress + KPIs strip */}
      <div style={{display:"grid", gridTemplateColumns:"1.4fr repeat(3, 1fr)", gap: 14, marginBottom: 18}}>
        <div className="humi-card" style={{padding: "18px 22px"}}>
          <div className="humi-eyebrow">ความคืบหน้ารวม</div>
          <div style={{display:"flex", alignItems:"flex-end", gap: 8, marginTop: 8}}>
            <span style={{fontFamily:"var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing:"-0.025em", color: pct === 100 ? "var(--color-success)" : "var(--color-ink)"}}>{pct}%</span>
            <span style={{fontSize: 13, color:"var(--color-ink-muted)", marginBottom: 6}}>{doneItems} / {totalItems} งาน</span>
          </div>
          <div style={{height: 8, background:"var(--color-canvas)", borderRadius: 99, marginTop: 12, overflow:"hidden"}}>
            <div style={{width: pct+"%", height:"100%", background: pct === 100 ? "var(--color-success)" : "var(--color-accent)", transition:"width .3s"}}/>
          </div>
        </div>
        <Kpi label="งานคงค้าง" value="9" sub="ต้องเคลียร์ก่อนวันสุดท้าย" color="var(--color-warning)"/>
        <Kpi label="เงินที่จะจ่ายสุดท้าย" value="฿42,840" sub="incl. ค่าชดเชยวันลา 6 วัน"/>
        <Kpi label="วันที่เหลือ" value="5" sub="วันทำการ" color="var(--color-danger)"/>
      </div>

      {/* Tabs */}
      <div style={{display:"flex", gap: 4, marginBottom: 14, borderBottom:"1px solid var(--color-hairline)"}}>
        {[
          ["checklist","Clearance Checklist","check",doneItems+"/"+totalItems],
          ["finalpay","Final Pay calculation","wallet","฿42,840"],
          ["letters","เอกสาร + จดหมาย","doc","2"],
          ["interview","Exit Interview","chat","ส่งแล้ว"],
        ].map(([k, l, ic, badge]) => {
          const Glyph = I[ic] || I.check;
          const active = tab === k;
          return (
            <button key={k} onClick={() => setTab(k)} style={{
              padding:"10px 16px", background:"transparent", border: 0, borderBottom: "2px solid " + (active ? "var(--color-accent)" : "transparent"),
              marginBottom: -1, cursor:"pointer", fontFamily:"inherit",
              fontSize: 13, fontWeight: active ? 600 : 500,
              color: active ? "var(--color-ink)" : "var(--color-ink-muted)",
              display:"inline-flex", alignItems:"center", gap: 7,
            }}>
              <Glyph size={14}/> {l}
              <span style={{
                marginLeft: 4, padding:"1px 7px", borderRadius: 99,
                background: active ? "var(--color-accent-soft)" : "var(--color-canvas)",
                color: active ? "var(--color-ink)" : "var(--color-ink-muted)",
                fontSize: 10, fontWeight: 600,
              }}>{badge}</span>
            </button>
          );
        })}
      </div>

      {tab === "checklist" && <ClearanceChecklist groups={CL}/>}
      {tab === "finalpay"  && <FinalPayPanel/>}
      {tab === "letters"   && <LettersPanel/>}
      {tab === "interview" && <ExitInterviewPanel/>}
    </div>
  );
}

function ClearanceChecklist({ groups }) {
  const I = window.PI;
  const ST = {
    done:      { l:"เสร็จแล้ว",  bg:"var(--color-success-soft)", fg:"var(--color-success)", ic:"check" },
    pending:   { l:"กำลังทำ",    bg:"var(--color-warning-soft)", fg:"#92660C", ic:"clock" },
    scheduled: { l:"ตั้งเวลา",   bg:"var(--color-accent-soft)",  fg:"var(--color-accent)", ic:"clock" },
    sent:      { l:"ส่งแล้ว",    bg:"var(--color-accent-soft)",  fg:"var(--color-accent)", ic:"send" },
    todo:      { l:"ยังไม่ได้ทำ", bg:"var(--color-canvas)",       fg:"var(--color-ink-muted)", ic:"warn" },
  };

  return (
    <div style={{display:"flex", flexDirection:"column", gap: 14}}>
      {groups.map(g => {
        const cdone = g.items.filter(i => i.st === "done").length;
        return (
          <div key={g.cat} className="humi-card" style={{padding: 0}}>
            <div style={{padding: "16px 20px", borderBottom: "1px solid var(--color-hairline-soft)", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <h3 className="humi-section-title">{g.cat}</h3>
              <span style={{fontSize: 12, color:"var(--color-ink-muted)", fontWeight: 600, fontVariantNumeric:"tabular-nums"}}>
                {cdone}/{g.items.length} เสร็จ
              </span>
            </div>
            <div>
              {g.items.map((it, i) => {
                const s = ST[it.st];
                const SGlyph = I[s.ic] || I.check;
                return (
                  <div key={i} style={{
                    display:"grid", gridTemplateColumns:"32px 1fr 140px 160px 32px",
                    gap: 14, alignItems:"center",
                    padding: "14px 20px",
                    borderTop: i === 0 ? 0 : "1px solid var(--color-hairline-soft)",
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 99,
                      background: s.bg, color: s.fg,
                      display:"inline-flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <SGlyph size={13}/>
                    </span>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)", textDecoration: it.st === "done" ? "line-through" : "none", textDecorationColor:"var(--color-ink-faint)"}}>{it.l}</div>
                      {it.note && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{it.note}</div>}
                    </div>
                    <span className="humi-tag humi-tag--cream" style={{padding:"2px 8px"}}>{it.who}</span>
                    <span style={{fontSize: 11, fontWeight: 600, color: s.fg, padding:"3px 10px", borderRadius: 99, background: s.bg, display:"inline-flex", alignItems:"center", gap: 4, width:"fit-content"}}>
                      <SGlyph size={11}/> {s.l}
                    </span>
                    <button style={{background:"transparent", border:0, color:"var(--color-ink-muted)", cursor:"pointer"}}>
                      <I.more size={16}/>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FinalPayPanel() {
  const I = window.PI;
  const rows = [
    { l:"เงินเดือนงวด 1–15 พ.ค.", v: 12500, kind:"earn" },
    { l:"ค่าชดเชยวันลาคงเหลือ × 6 วัน", v: 5000, kind:"earn" },
    { l:"โบนัส pro-rated (Q2)", v: 8500, kind:"earn" },
    { l:"กองทุนสำรองเลี้ยงชีพ (ส่วนพนักงาน + บริษัท)", v: 18840, kind:"earn" },
    { l:"หัก ภงด.91", v: -1200, kind:"deduct" },
    { l:"หัก ประกันสังคม", v: -750, kind:"deduct" },
    { l:"หัก เงินกู้สวัสดิการคงเหลือ", v: 0, kind:"deduct" },
  ];
  const total = rows.reduce((s,r) => s + r.v, 0);

  return (
    <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 16}}>
      <div className="humi-card" style={{padding: 0}}>
        <div style={{padding:"16px 20px", borderBottom:"1px solid var(--color-hairline-soft)"}}>
          <h3 className="humi-section-title">รายการเงินสุดท้าย · 15 พ.ค. 2568</h3>
          <p className="humi-section-sub">โอนเข้าบัญชีพนักงานในรอบจ่าย 25 พ.ค.</p>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display:"grid", gridTemplateColumns:"1fr 140px",
            padding:"14px 20px",
            borderTop: i === 0 ? 0 : "1px solid var(--color-hairline-soft)",
            alignItems:"center",
          }}>
            <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{r.l}</div>
            <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, fontVariantNumeric:"tabular-nums",
                         color: r.v < 0 ? "var(--color-danger)" : "var(--color-ink)"}}>
              {r.v < 0 ? "-" : ""}฿{Math.abs(r.v).toLocaleString()}
            </div>
          </div>
        ))}
        <div style={{
          padding:"16px 20px",
          background:"var(--color-accent-soft)",
          borderTop:"1px solid var(--color-hairline)",
          display:"grid", gridTemplateColumns:"1fr 160px",
          alignItems:"center",
        }}>
          <div style={{fontSize: 14, fontWeight: 700, color:"var(--color-ink)"}}>รวมโอน</div>
          <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontSize: 24, fontWeight: 700, letterSpacing:"-0.02em", color:"var(--color-ink)", fontVariantNumeric:"tabular-nums"}}>
            ฿{total.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap: 12}}>
        <div className="humi-card">
          <h3 className="humi-section-title">บัญชีปลายทาง</h3>
          <div style={{padding: 14, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", marginTop: 10}}>
            <div style={{fontSize: 11, color:"var(--color-ink-muted)", fontWeight: 700, textTransform:"uppercase", letterSpacing:".1em"}}>ธนาคารกสิกรไทย</div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 6, letterSpacing:"-0.01em"}}>xxx-x-xx218-7</div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 4}}>เบน คิม (KIM, BEN)</div>
          </div>
        </div>

        <div className="humi-card">
          <h3 className="humi-section-title">เอกสารที่ต้องยื่น</h3>
          <div style={{display:"flex", flexDirection:"column", gap: 10, marginTop: 10}}>
            <DocLine l="ภงด.91" sub="ยื่นแทนนายจ้าง · ภายใน 31 มี.ค. ปีถัดไป" status="todo"/>
            <DocLine l="สปส.6-09 (แจ้งออก)" sub="ส่งสำนักงานประกันสังคม · ภายใน 7 วัน" status="todo"/>
            <DocLine l="โอน กสล. ออก" sub="ส่งบริษัทจัดการ" status="todo"/>
          </div>
        </div>

        <button style={primaryFullBtn}>
          <I.send size={14}/> ส่งให้ Payroll ดำเนินการ
        </button>
      </div>
    </div>
  );
}

function LettersPanel() {
  const I = window.PI;
  const letters = [
    { t:"หนังสือรับรองการทำงาน", sub:"ระบุตำแหน่ง · ระยะเวลาทำงาน · ภาษาไทย", st:"draft", date:"ร่าง 13 พ.ค." },
    { t:"Certificate of Employment (EN)", sub:"For visa / overseas employer", st:"todo", date:"" },
    { t:"หนังสือรับรองเงินเดือนสุดท้าย", sub:"แสดงเงินเดือนรวม + ค่าชดเชย", st:"todo", date:"" },
    { t:"จดหมายขอบคุณ", sub:"จากผู้บริหาร · ออปชั่นเสริม", st:"sent", date:"ส่งแล้ว 14 พ.ค." },
  ];
  const ST = {
    sent:  { l:"ส่งแล้ว",   bg:"var(--color-success-soft)", fg:"var(--color-success)", ic:"check" },
    draft: { l:"ร่าง",      bg:"var(--color-warning-soft)", fg:"#92660C", ic:"edit" },
    todo:  { l:"ยังไม่สร้าง", bg:"var(--color-canvas)",     fg:"var(--color-ink-muted)", ic:"plus" },
  };
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: 14}}>
      {letters.map(L => {
        const s = ST[L.st];
        const SGlyph = window.PI[s.ic] || I.fileText;
        return (
          <div key={L.t} className="humi-card" style={{padding: 18}}>
            <div style={{display:"flex", alignItems:"flex-start", gap: 14}}>
              <div style={{width: 44, height: 56, borderRadius: 6, background:"var(--color-canvas-soft)", border:"1px solid var(--color-hairline)", display:"inline-flex", alignItems:"center", justifyContent:"center", color:"var(--color-ink-muted)", flexShrink: 0}}>
                <I.fileText size={20}/>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 600, color:"var(--color-ink)", lineHeight: 1.3}}>{L.t}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 4, lineHeight: 1.5}}>{L.sub}</div>
                <div style={{display:"flex", alignItems:"center", gap: 8, marginTop: 12}}>
                  <span style={{padding:"3px 10px", borderRadius: 99, background: s.bg, color: s.fg, fontSize: 11, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 4}}>
                    <SGlyph size={11}/> {s.l}
                  </span>
                  {L.date && <span style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{L.date}</span>}
                </div>
              </div>
            </div>
            <div style={{display:"flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop:"1px solid var(--color-hairline-soft)"}}>
              <button style={{...primaryGhostBtn, flex: 1, minHeight: 34, fontSize: 12}}>
                <I.eye size={12}/> ดูตัวอย่าง
              </button>
              <button style={{...primaryGhostBtn, flex: 1, minHeight: 34, fontSize: 12}}>
                {L.st === "todo" ? <><I.plus size={12}/> สร้าง</> : <><I.send size={12}/> ส่ง</>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExitInterviewPanel() {
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16}}>
      <div className="humi-card">
        <h3 className="humi-section-title">สถานะแบบสอบถาม</h3>
        <p className="humi-section-sub" style={{marginBottom: 14}}>ส่งให้พนักงาน 14 พ.ค. · ยังไม่ตอบ</p>
        <div style={{
          padding: 18, borderRadius:"var(--radius-md)",
          background:"var(--color-canvas-soft)", textAlign:"center",
        }}>
          <div style={{fontFamily:"var(--font-display)", fontSize: 32, fontWeight: 600, color:"var(--color-warning)", letterSpacing:"-0.025em"}}>กำลังรอ</div>
          <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 6}}>เตือนซ้ำได้ครั้งเดียว · ส่งครั้งสุดท้าย 14 พ.ค.</div>
          <button style={{...primaryGhostBtn, marginTop: 14}}>ส่งเตือนซ้ำ</button>
        </div>

        <div style={{marginTop: 14}}>
          <div className="humi-eyebrow" style={{marginBottom: 8}}>คำถาม 6 หัวข้อ</div>
          {[
            "เหตุผลหลักที่ตัดสินใจลาออก",
            "ความพึงพอใจกับบทบาท / ทีม",
            "ผู้บริหาร / หัวหน้าให้การสนับสนุนแค่ไหน",
            "ค่าตอบแทน + สวัสดิการ",
            "จะแนะนำให้คนรู้จักมาทำงานที่นี่หรือไม่ (eNPS)",
            "ข้อเสนอแนะให้ปรับปรุง",
          ].map((q, i) => (
            <div key={i} style={{display:"flex", alignItems:"flex-start", gap: 8, padding:"6px 0", fontSize: 12, color:"var(--color-ink-soft)"}}>
              <span style={{color:"var(--color-ink-faint)", fontFamily:"var(--font-display)", fontWeight: 600, minWidth: 16}}>{i+1}.</span>
              {q}
            </div>
          ))}
        </div>
      </div>

      <div className="humi-card humi-card--cream">
        <h3 className="humi-section-title">เก็บคำตอบไปที่ไหน</h3>
        <p className="humi-section-sub" style={{marginBottom: 14}}>คำตอบจะถูกใช้ภายในสำหรับวิเคราะห์ retention</p>

        <div style={{display:"flex", flexDirection:"column", gap: 12}}>
          <BulletLine ic="lock" l="คำตอบเป็นความลับ" sub="ผู้บริหารระดับ HRD ขึ้นไปดูได้"/>
          <BulletLine ic="users" l="ไม่แชร์ให้ direct manager" sub="ป้องกัน bias ในการตอบ"/>
          <BulletLine ic="trending" l="รวมเข้า attrition analytics" sub="แสดงใน CHRO dashboard รายไตรมาส"/>
          <BulletLine ic="layers" l="เก็บไว้ในระบบ 3 ปี" sub="ตามกฎหมายแรงงาน"/>
        </div>

        <div style={{
          marginTop: 16, padding: 14,
          background:"var(--color-surface)",
          border:"1px solid var(--color-hairline)",
          borderRadius:"var(--radius-md)",
          fontSize: 12, color:"var(--color-ink-soft)", lineHeight: 1.5,
        }}>
          <b style={{color:"var(--color-ink)"}}>ใครเห็นบ้าง:</b> HRD, CHRO, HR Business Partner (HQ เท่านั้น) · ไม่รวมหัวหน้าโดยตรงและผู้จัดการสาขา
        </div>
      </div>
    </div>
  );
}

// ===== 3) EMPLOYEE — Exit Interview Form ===================================

function Offboard_ExitInterview() {
  const I = window.PI;
  const [answers, setAnswers] = React.useState({
    primary_reason: "growth",
    overall_satisfaction: 4,
    manager_support: 5,
    pay: 3,
    enps: 8,
    feedback: "",
  });
  const set = (k, v) => setAnswers({ ...answers, [k]: v });

  return (
    <div style={{padding:"6px 0 28px", maxWidth: 880, margin: "0 auto"}}>
      {/* Hero */}
      <div style={{
        padding: 28,
        background:"linear-gradient(135deg, var(--color-canvas-soft), var(--color-accent-soft))",
        borderRadius:"var(--radius-lg)",
        border:"1px solid var(--color-hairline)",
        marginBottom: 24,
      }}>
        <div className="humi-eyebrow" style={{color:"var(--color-ink-soft)"}}>แบบสอบถามก่อนลาออก · Exit Interview</div>
        <h1 className="humi-hero-title" style={{marginTop: 10, fontSize: 30, maxWidth: 640}}>
          ขอบคุณสำหรับทุกอย่างที่ทำให้กับ Central Retail นะครับ
        </h1>
        <p style={{fontSize: 14, color:"var(--color-ink-soft)", marginTop: 12, lineHeight: 1.6, maxWidth: 640}}>
          คำตอบของคุณจะช่วยให้เราปรับปรุงให้คนรุ่นต่อไปดีขึ้น
          <b style={{color:"var(--color-ink)"}}> คำตอบทั้งหมดเป็นความลับ </b>
          และไม่ส่งให้หัวหน้าโดยตรงของคุณ
        </p>
        <div style={{display:"flex", gap: 16, marginTop: 16, fontSize: 12, color:"var(--color-ink-muted)"}}>
          <span style={{display:"inline-flex", alignItems:"center", gap: 5}}><I.clock size={13}/> ใช้เวลา ~ 5 นาที</span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 5}}><I.save size={13}/> บันทึก draft อัตโนมัติ</span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 5}}><I.shield size={13}/> ความลับ</span>
        </div>
      </div>

      {/* Q1 — Primary reason */}
      <div className="humi-card" style={{marginBottom: 14}}>
        <QHead n={1} title="เหตุผลหลักที่ตัดสินใจลาออก" sub="เลือกข้อเดียวที่ตรงที่สุด"/>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: 10, marginTop: 14}}>
          {[
            { v:"growth",     l:"พัฒนาตนเอง / โอกาสใหม่",   ic:"trending" },
            { v:"pay",        l:"ค่าตอบแทน",                ic:"baht" },
            { v:"workplace",  l:"บรรยากาศ / ทีม",          ic:"users" },
            { v:"workload",   l:"ภาระงาน / ความเครียด",     ic:"warn" },
            { v:"family",     l:"ครอบครัว",                ic:"heart" },
            { v:"health",     l:"สุขภาพ",                  ic:"pill" },
            { v:"relocation", l:"ย้ายภูมิลำเนา",            ic:"mapPin" },
            { v:"other",      l:"อื่นๆ",                   ic:"more" },
          ].map(o => {
            const Glyph = I[o.ic] || I.check;
            const active = answers.primary_reason === o.v;
            return (
              <button key={o.v} onClick={() => set("primary_reason", o.v)} style={{
                display:"flex", alignItems:"center", gap: 10,
                padding:"12px 14px",
                background: active ? "var(--color-accent-soft)" : "var(--color-surface)",
                border:"1.5px solid " + (active ? "var(--color-accent)" : "var(--color-hairline)"),
                borderRadius:"var(--radius-md)",
                cursor:"pointer", fontFamily:"inherit", textAlign:"left",
                color: active ? "var(--color-ink)" : "var(--color-ink-soft)",
                fontSize: 13, fontWeight: 600,
              }}>
                <Glyph size={16} style={{color: active ? "var(--color-accent)" : "var(--color-ink-muted)"}}/> {o.l}
                {active && <I.check size={14} style={{marginLeft:"auto", color:"var(--color-accent)"}}/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q2-4 — Rating questions */}
      {[
        { k:"overall_satisfaction", n:2, t:"ความพึงพอใจในบทบาทที่ทำ",       sub:"1 = ไม่พอใจมาก · 5 = พอใจมาก" },
        { k:"manager_support",      n:3, t:"หัวหน้างานสนับสนุนคุณดีแค่ไหน", sub:"1 = ไม่ช่วยเลย · 5 = ช่วยเต็มที่" },
        { k:"pay",                  n:4, t:"ค่าตอบแทน + สวัสดิการ",         sub:"1 = น้อยมาก · 5 = ดีมาก" },
      ].map(q => (
        <div key={q.k} className="humi-card" style={{marginBottom: 14}}>
          <QHead n={q.n} title={q.t} sub={q.sub}/>
          <div style={{display:"flex", gap: 10, marginTop: 16, justifyContent:"center"}}>
            {[1,2,3,4,5].map(n => {
              const active = answers[q.k] === n;
              return (
                <button key={n} onClick={() => set(q.k, n)} style={{
                  width: 60, height: 60, borderRadius: 14,
                  background: active ? "var(--color-accent)" : "var(--color-canvas-soft)",
                  border:"1.5px solid " + (active ? "var(--color-accent)" : "var(--color-hairline)"),
                  color: active ? "#fff" : "var(--color-ink-soft)",
                  fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700,
                  cursor:"pointer", transition:"all .15s",
                }}>{n}</button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Q5 — eNPS */}
      <div className="humi-card" style={{marginBottom: 14}}>
        <QHead n={5} title="คุณจะแนะนำให้คนรู้จักมาทำงานที่ Central Retail ไหม?" sub="0 = ไม่แนะนำ · 10 = แนะนำแน่นอน"/>
        <div style={{display:"flex", gap: 6, marginTop: 16, justifyContent:"center"}}>
          {Array.from({length:11},(_,i)=>i).map(n => {
            const active = answers.enps === n;
            const bg = n <= 6 ? "var(--color-danger-soft)" : n <= 8 ? "var(--color-warning-soft)" : "var(--color-success-soft)";
            const fg = n <= 6 ? "var(--color-danger)" : n <= 8 ? "#92660C" : "var(--color-success)";
            return (
              <button key={n} onClick={() => set("enps", n)} style={{
                width: 48, height: 48, borderRadius: 10,
                background: active ? fg : bg,
                color: active ? "#fff" : fg,
                border: 0, fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 700,
                cursor:"pointer", transition:"all .15s",
              }}>{n}</button>
            );
          })}
        </div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop: 8, fontSize: 11, color:"var(--color-ink-muted)"}}>
          <span>ไม่แนะนำเลย</span>
          <span>แนะนำแน่นอน</span>
        </div>
      </div>

      {/* Q6 — Open feedback */}
      <div className="humi-card" style={{marginBottom: 18}}>
        <QHead n={6} title="ข้อเสนอแนะให้บริษัทปรับปรุง" sub="พิมพ์อะไรก็ได้ที่อยากบอก — ไม่ใส่ก็ได้"/>
        <textarea
          value={answers.feedback}
          onChange={(e) => set("feedback", e.target.value)}
          rows={5}
          className="field-input"
          style={{marginTop: 14, resize:"vertical", lineHeight: 1.6}}
          placeholder="เช่น สิ่งที่อยากให้ปรับปรุง · สิ่งที่ทำได้ดีอยู่แล้ว · ข้อเสนอแนะกับผู้บริหาร…"
        />
      </div>

      {/* Submit */}
      <div style={{
        padding: "16px 22px",
        background:"var(--color-surface)",
        border:"1px solid var(--color-hairline)",
        borderRadius:"var(--radius-lg)",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap: 16, flexWrap:"wrap",
      }}>
        <div style={{display:"flex", alignItems:"center", gap: 12}}>
          <I.shield size={16} style={{color:"var(--color-ink-muted)"}}/>
          <span style={{fontSize: 13, color:"var(--color-ink-soft)"}}>คำตอบของคุณเป็นความลับ · เก็บใน HQ เท่านั้น</span>
        </div>
        <div style={{display:"flex", gap: 10}}>
          <button className="humi-button humi-button--ghost"><I.save size={14}/> บันทึก draft</button>
          <button className="humi-button humi-button--primary"><I.send size={14}/> ส่งคำตอบ</button>
        </div>
      </div>
    </div>
  );
}

// ===== Local atoms =========================================================

const primaryGhostBtn = {
  display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6,
  padding:"9px 14px", background:"var(--color-surface)",
  border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)",
  fontFamily:"inherit", fontSize: 13, fontWeight: 600, color:"var(--color-ink-soft)",
  cursor:"pointer", minHeight: 36,
};
const primaryFullBtn = {
  ...primaryGhostBtn,
  background:"var(--color-accent)", color:"#fff", borderColor:"transparent",
};

function Metric({ l, v, sub, accent }) {
  return (
    <div style={{padding:"0 14px", borderRight:"1px solid var(--color-hairline-soft)", lineHeight: 1.3}}>
      <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing:"-0.015em", color: accent ? "var(--color-accent)" : "var(--color-ink)"}}>{v}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>}
    </div>
  );
}

function Kpi({ label, value, sub, color }) {
  return (
    <div className="humi-card" style={{padding:"18px 22px"}}>
      <div className="humi-eyebrow">{label}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 600, letterSpacing:"-0.025em", color: color || "var(--color-ink)", marginTop: 6, lineHeight: 1}}>{value}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 6}}>{sub}</div>}
    </div>
  );
}

function DecisionCard({ active, onClick, title, sub, icon, color }) {
  const I = window.PI;
  const Glyph = I[icon] || I.check;
  return (
    <button onClick={onClick} style={{
      display:"flex", flexDirection:"column", alignItems:"flex-start", gap: 6,
      padding:"16px 18px", textAlign:"left",
      background: active ? (color === "var(--color-warning)" ? "var(--color-warning-soft)" : "var(--color-accent-soft)") : "var(--color-surface)",
      border:"1.5px solid " + (active ? color : "var(--color-hairline)"),
      borderRadius:"var(--radius-md)",
      cursor:"pointer", fontFamily:"inherit",
      transition:"all .15s",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: active ? color : "var(--color-canvas-soft)",
        color: active ? "#fff" : color,
        display:"inline-flex", alignItems:"center", justifyContent:"center",
      }}><Glyph size={16}/></div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, color:"var(--color-ink)", marginTop: 4}}>{title}</div>
      <div style={{fontSize: 12, color:"var(--color-ink-muted)", lineHeight: 1.4}}>{sub}</div>
    </button>
  );
}

function Step({ n, title, sub, done, current, pending, last }) {
  const I = window.PI;
  const bg = done ? "var(--color-success)" : current ? "var(--color-accent)" : "var(--color-surface)";
  const fg = (done || current) ? "#fff" : "var(--color-ink-muted)";
  const border = (done || current) ? "transparent" : "var(--color-hairline)";
  return (
    <div style={{display:"grid", gridTemplateColumns:"28px 1fr", gap: 12, position:"relative"}}>
      <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
        <div style={{
          width: 28, height: 28, borderRadius: 99,
          background: bg, color: fg, border:"1px solid " + border,
          display:"inline-flex", alignItems:"center", justifyContent:"center",
          fontFamily:"var(--font-display)", fontSize: 12, fontWeight: 700,
          zIndex: 1,
        }}>{done ? <I.check size={13}/> : n}</div>
        {!last && <div style={{position:"absolute", top: 28, bottom: -10, width: 2, background:"var(--color-hairline)", left:"50%", transform:"translateX(-50%)"}}/>}
      </div>
      <div style={{paddingBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: current ? "var(--color-ink)" : (done ? "var(--color-ink-soft)" : "var(--color-ink-muted)")}}>{title}</div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>
      </div>
    </div>
  );
}

function DocLine({ l, sub, status }) {
  const I = window.PI;
  const c = { todo:"var(--color-ink-faint)", done:"var(--color-success)" }[status] || "var(--color-ink-faint)";
  return (
    <div style={{display:"flex", alignItems:"flex-start", gap: 10}}>
      <span style={{width: 16, height: 16, borderRadius: 99, background: c, marginTop: 3, flexShrink: 0, opacity: status === "done" ? 1 : 0.3}}/>
      <div>
        <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{l}</div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>
      </div>
    </div>
  );
}

function BulletLine({ ic, l, sub }) {
  const I = window.PI;
  const Glyph = I[ic] || I.check;
  return (
    <div style={{display:"flex", gap: 12, alignItems:"flex-start"}}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background:"var(--color-surface)", color:"var(--color-accent)",
        display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0,
      }}><Glyph size={14}/></div>
      <div>
        <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{l}</div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2, lineHeight: 1.4}}>{sub}</div>
      </div>
    </div>
  );
}

function QHead({ n, title, sub }) {
  return (
    <div style={{display:"flex", alignItems:"flex-start", gap: 12}}>
      <span style={{
        width: 28, height: 28, borderRadius: 99,
        background:"var(--color-accent-soft)", color:"var(--color-accent)",
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        fontFamily:"var(--font-display)", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1,
      }}>{n}</span>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 600, color:"var(--color-ink)", letterSpacing:"-0.01em", lineHeight: 1.3}}>{title}</div>
        <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 3}}>{sub}</div>
      </div>
    </div>
  );
}

function FooterBar({ leftLabel, leftOk, secondary, primary }) {
  const I = window.PI;
  const SGlyph = I[secondary?.icon] || I.x;
  const PGlyph = I[primary?.icon] || I.check;
  return (
    <div style={{
      marginTop: 22, padding: "16px 22px",
      background:"var(--color-surface)",
      border:"1px solid var(--color-hairline)",
      borderRadius:"var(--radius-lg)",
      display:"flex", alignItems:"center", justifyContent:"space-between", gap: 16, flexWrap:"wrap",
    }}>
      <div style={{display:"flex", alignItems:"center", gap: 10}}>
        <I.check size={16} style={{color: leftOk ? "var(--color-success)" : "var(--color-ink-faint)"}}/>
        <span style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{leftLabel}</span>
      </div>
      <div style={{display:"flex", gap: 10}}>
        {secondary && <button className="humi-button humi-button--ghost"><SGlyph size={14}/> {secondary.label}</button>}
        {primary && (
          <button className="humi-button humi-button--primary" disabled={primary.disabled} style={primary.disabled ? {opacity: 0.5, cursor:"not-allowed"} : null}>
            <PGlyph size={14}/> {primary.label}
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Offboard_Manager, Offboard_AdminWorkspace, Offboard_ExitInterview });
