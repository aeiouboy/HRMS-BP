// ============================================================================
// mod-lifecycle-2.jsx — Priority 1: close-the-loop lifecycle journeys
//   • Transfer_Manager        — approve internal transfer
//   • Transfer_Admin          — process + transfer letter
//   • Onboarding_Day1         — new hire's Day-1 → Day-90 checklist
//   • Confirmation_Admin      — confirmation letter after probation
// All share visual vocabulary with mod-offboard.jsx for consistency.
// ============================================================================

// ===== Small atoms shared in this file =====================================

const LC2_btnPrim = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6, padding:"9px 16px", background:"var(--color-accent)", color:"#fff", border: 0, borderRadius: "var(--radius-md)", fontFamily:"inherit", fontSize: 13, fontWeight: 600, cursor:"pointer", minHeight: 38 };
const LC2_btnGhost = { ...LC2_btnPrim, background:"var(--color-surface)", color:"var(--color-ink-soft)", border:"1px solid var(--color-hairline)" };

function LC2_Metric({ l, v, sub, accent }) {
  return (
    <div style={{padding:"0 14px", borderRight:"1px solid var(--color-hairline-soft)", lineHeight: 1.3}}>
      <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing:"-0.015em", color: accent ? "var(--color-accent)" : "var(--color-ink)"}}>{v}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>}
    </div>
  );
}

function LC2_Step({ n, title, sub, done, current, last }) {
  const I = window.PI;
  const bg = done ? "var(--color-success)" : current ? "var(--color-accent)" : "var(--color-surface)";
  const fg = (done || current) ? "#fff" : "var(--color-ink-muted)";
  const border = (done || current) ? "transparent" : "var(--color-hairline)";
  return (
    <div style={{display:"grid", gridTemplateColumns:"28px 1fr", gap: 12, position:"relative"}}>
      <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
        <div style={{width: 28, height: 28, borderRadius: 99, background: bg, color: fg, border:"1px solid "+border, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 12, fontWeight: 700, zIndex: 1}}>{done ? <I.check size={13}/> : n}</div>
        {!last && <div style={{position:"absolute", top: 28, bottom: -10, width: 2, background:"var(--color-hairline)", left:"50%", transform:"translateX(-50%)"}}/>}
      </div>
      <div style={{paddingBottom: 18}}>
        <div style={{fontSize: 13, fontWeight: 600, color: current ? "var(--color-ink)" : (done ? "var(--color-ink-soft)" : "var(--color-ink-muted)")}}>{title}</div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>
      </div>
    </div>
  );
}

function LC2_SummaryRow({ l, v, accent }) {
  return (
    <div style={{display:"flex", justifyContent:"space-between", gap: 12, fontSize: 12, padding:"6px 0"}}>
      <span style={{color:"var(--color-ink-muted)"}}>{l}</span>
      <span style={{color: accent ? "var(--color-accent)" : "var(--color-ink)", fontWeight: 600, textAlign:"right", maxWidth:"60%"}}>{v || "—"}</span>
    </div>
  );
}

// ============================================================================
// 1) TRANSFER — Manager approve view
// ============================================================================

function Transfer_Manager() {
  const I = window.PI;
  const [decision, setDecision] = React.useState(null);

  const E = {
    nameTh: "พิมพา จันทร์ฉาย", nameEn: "Pimpa J.",
    role: "Cashier", branch: "Central Ladprao",
    fromBranch: "Central Ladprao · Store Ops",
    toBranch: "Central World · Store Ops",
    fromManager: "อาทิตย์ ชื่นบาน",
    toManager: "วิรัช เกษมสุข",
    requestedDate: "1 มิ.ย. 2569",
    reason: "ใกล้บ้านใหม่ + อยากเปลี่ยนทีม",
    tenure: "1 ปี 8 เดือน",
    submitDate: "12 พ.ค. 2569",
    avatar: "PJ",
  };

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">
            <span>กล่องงาน</span><span style={{margin:"0 6px"}}>›</span>
            <span>คำขอโอนย้าย</span><span style={{margin:"0 6px"}}>›</span>
            <span style={{color:"var(--color-ink-soft)"}}>REQ-2502</span>
          </div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>
            อนุมัติการโอนย้ายสาขา<span className="humi-hero-title-soft" style={{marginLeft: 10}}>· {E.nameTh}</span>
          </h1>
        </div>
        <span className="humi-tag humi-tag--coral"><I.warn size={12}/> รอตอบกลับ 5 วัน</span>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap: 20}}>
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          {/* Employee header */}
          <div className="humi-card">
            <div style={{display:"flex", alignItems:"center", gap: 16}}>
              <div style={{width: 64, height: 64, borderRadius: 16, background:"linear-gradient(135deg, #1FA8A0, #9BB5A0)", color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700}}>{E.avatar}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600, color:"var(--color-ink)", letterSpacing:"-0.015em"}}>{E.nameTh} <span style={{color:"var(--color-ink-muted)", fontWeight: 500}}>· {E.nameEn}</span></div>
                <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 4}}>{E.role} · {E.branch} · ทำงานมา {E.tenure}</div>
              </div>
              <a href="#" style={{fontSize: 13, color:"var(--color-accent)", textDecoration:"none", fontWeight: 600}}>ดูโปรไฟล์ →</a>
            </div>
            <div style={{marginTop: 18, padding: 16, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", display:"grid", gridTemplateColumns:"repeat(4, 1fr)"}}>
              <LC2_Metric l="ส่งคำขอเมื่อ" v={E.submitDate} sub="2 วันที่แล้ว"/>
              <LC2_Metric l="วันที่ขอย้าย" v={E.requestedDate} accent/>
              <LC2_Metric l="ระยะเวลาแจ้งล่วงหน้า" v="20 วัน" sub="ตามนโยบาย ≥ 14 ✓"/>
              <LC2_Metric l="งานคงค้าง" v="0" sub="ส่งมอบครบแล้ว"/>
            </div>
          </div>

          {/* Branch comparison */}
          <div className="humi-card">
            <h3 className="humi-section-title">การเปลี่ยนแปลง</h3>
            <div style={{display:"grid", gridTemplateColumns:"1fr 40px 1fr", gap: 14, marginTop: 14, alignItems:"center"}}>
              <div style={{padding: 16, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", border:"1px solid var(--color-hairline-soft)"}}>
                <div className="humi-eyebrow" style={{color:"var(--color-ink-muted)"}}>จาก</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, marginTop: 8, color:"var(--color-ink)"}}>{E.fromBranch}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 8, lineHeight: 1.6}}>
                  หัวหน้า: {E.fromManager}<br/>
                  ทีม: 8 คน · กะเช้า + บ่าย<br/>
                  ระยะทางจากบ้าน: 18 km
                </div>
              </div>
              <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{width: 36, height: 36, borderRadius: 99, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><I.arrowR size={18}/></div>
              </div>
              <div style={{padding: 16, background:"var(--color-accent-soft)", borderRadius:"var(--radius-md)", border:"1px solid transparent"}}>
                <div className="humi-eyebrow" style={{color:"var(--color-accent)"}}>ไป</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, marginTop: 8, color:"var(--color-ink)"}}>{E.toBranch}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-soft)", marginTop: 8, lineHeight: 1.6}}>
                  หัวหน้าใหม่: {E.toManager}<br/>
                  ทีม: 12 คน · กะเช้า + บ่าย + ดึก<br/>
                  ระยะทางจากบ้าน: 3 km
                </div>
              </div>
            </div>
            <div style={{marginTop: 14, padding:"10px 14px", background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", fontSize: 12, color:"var(--color-ink-soft)", display:"flex", gap: 16, flexWrap:"wrap"}}>
              <span><b style={{color:"var(--color-ink)"}}>ตำแหน่ง:</b> ไม่เปลี่ยน</span>
              <span><b style={{color:"var(--color-ink)"}}>เงินเดือน:</b> ไม่เปลี่ยน</span>
              <span><b style={{color:"var(--color-ink)"}}>ประเภทจ้าง:</b> ไม่เปลี่ยน</span>
              <span><b style={{color:"var(--color-success)"}}>หัวหน้าใหม่ตกลงรับ ✓</b></span>
            </div>
          </div>

          {/* Reason */}
          <div className="humi-card">
            <h3 className="humi-section-title">เหตุผล</h3>
            <div style={{padding: 16, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", borderLeft:"3px solid var(--color-accent)", fontSize: 14, color:"var(--color-ink-soft)", lineHeight: 1.6, fontStyle:"italic", marginTop: 12}}>
              "{E.reason}"
            </div>
          </div>

          {/* Decision */}
          <div className="humi-card">
            <h3 className="humi-section-title">การตัดสินใจ</h3>
            <p className="humi-section-sub" style={{marginBottom: 14}}>หัวหน้าสาขาใหม่ตอบรับแล้ว — กดอนุมัติเพื่อให้ HR Admin ดำเนินการต่อ</p>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
              {[
                { v:"discuss", t:"ขอคุยก่อน", sub:"นัด 1-on-1 ใน 3 วัน", ic:"msgSquare", c:"var(--color-warning)" },
                { v:"approve", t:"อนุมัติ", sub:"ส่งต่อ HR Admin", ic:"check", c:"var(--color-accent)" },
              ].map(o => {
                const Glyph = window.PI[o.ic];
                const active = decision === o.v;
                return (
                  <button key={o.v} onClick={() => setDecision(o.v)} style={{
                    display:"flex", flexDirection:"column", alignItems:"flex-start", gap: 6,
                    padding:"16px 18px", textAlign:"left",
                    background: active ? (o.c === "var(--color-warning)" ? "var(--color-warning-soft)" : "var(--color-accent-soft)") : "var(--color-surface)",
                    border:"1.5px solid " + (active ? o.c : "var(--color-hairline)"),
                    borderRadius:"var(--radius-md)", cursor:"pointer", fontFamily:"inherit",
                  }}>
                    <div style={{width: 36, height: 36, borderRadius: 10, background: active ? o.c : "var(--color-canvas-soft)", color: active ? "#fff" : o.c, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={16}/></div>
                    <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, color:"var(--color-ink)", marginTop: 4}}>{o.t}</div>
                    <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{o.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: timeline */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          <div className="humi-card humi-card--cream" style={{position:"sticky", top: 80}}>
            <div className="humi-eyebrow">กระบวนการ Transfer</div>
            <h3 className="humi-section-title" style={{marginTop: 6, marginBottom: 16}}>5 ขั้นตอน</h3>
            <LC2_Step n={1} title="พนักงานส่งคำขอ" sub={E.submitDate} done/>
            <LC2_Step n={2} title="หัวหน้าสาขาใหม่รับ" sub="13 พ.ค." done/>
            <LC2_Step n={3} title="หัวหน้าสาขาเดิมอนุมัติ" sub="คุณอยู่ขั้นนี้" current/>
            <LC2_Step n={4} title="HR Admin จัดการ" sub="ออกหนังสือ + update master"/>
            <LC2_Step n={5} title="วันที่ย้าย" sub={E.requestedDate} last/>
          </div>
          <div className="humi-card">
            <h3 className="humi-section-title">หาคนทดแทน</h3>
            <div style={{display:"flex", flexDirection:"column", gap: 8, marginTop: 10}}>
              <button style={LC2_btnGhost}><I.plus size={14}/> เปิด Job Requisition</button>
              <button style={LC2_btnGhost}><I.users size={14}/> ขอโอนย้ายภายใน</button>
            </div>
          </div>
        </div>
      </div>

      <LC2_Foot ok={!!decision} primary={decision === "discuss" ? "นัดคุยก่อน" : "อนุมัติและส่งต่อ HR Admin"} primaryIc={decision === "discuss" ? "msgSquare" : "check"} disabled={!decision}/>
    </div>
  );
}

// ============================================================================
// 2) TRANSFER — Admin process workspace
// ============================================================================

function Transfer_Admin() {
  const I = window.PI;
  const [tab, setTab] = React.useState("checklist");

  const E = { nameTh:"พิมพา จันทร์ฉาย", role:"Cashier", from:"Central Ladprao", to:"Central World", effective:"1 มิ.ย. 2569", empId:"E-3845", avatar:"PJ" };

  const CL = [
    { cat:"Master data", items:[
      { l:"อัปเดต Branch ในระบบ HRMS",       st:"done", who:"HR Admin", note:"อัปเดต 14 พ.ค." },
      { l:"เปลี่ยน Manager · Cost Center",   st:"done", who:"HR Admin", note:"เปลี่ยน 14 พ.ค." },
      { l:"อัปเดต Org Chart",                st:"done", who:"System",   note:"" },
    ]},
    { cat:"ระบบและสิทธิ์", items:[
      { l:"เปลี่ยน Location ใน Time tracking", st:"pending", who:"IT", note:"กำหนด 30 พ.ค." },
      { l:"ย้าย Group Chat (Line OA · Slack)", st:"pending", who:"Manager · CTW", note:"" },
      { l:"อัปเดต Badge access",               st:"todo",    who:"Security", note:"นัด 31 พ.ค." },
    ]},
    { cat:"เอกสาร + จดหมาย", items:[
      { l:"หนังสือโอนย้าย (Transfer Letter)", st:"draft",   who:"HR Admin", note:"ร่างแล้ว — รอลงนาม" },
      { l:"แจ้งสาขาเก่า + สาขาใหม่",          st:"sent",    who:"System",   note:"ส่งอัตโนมัติ" },
      { l:"แจ้งทีมเดิม + ทีมใหม่",            st:"sent",    who:"Manager",  note:"แจ้งแล้ว" },
    ]},
    { cat:"Knowledge Transfer", items:[
      { l:"Handover document",                 st:"pending", who:"Employee", note:"อัปโหลด 1/2" },
      { l:"นัด introduce ทีมใหม่",             st:"todo",    who:"Manager · CTW", note:"30 พ.ค." },
    ]},
  ];

  const totalItems = CL.reduce((s,c) => s + c.items.length, 0);
  const doneItems  = CL.reduce((s,c) => s + c.items.filter(i => i.st === "done").length, 0);
  const pct = Math.round(doneItems / totalItems * 100);

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow"><span>Employee Center</span><span style={{margin:"0 6px"}}>›</span><span style={{color:"var(--color-ink-soft)"}}>Transfer · {E.empId}</span></div>
          <div style={{display:"flex", alignItems:"center", gap: 14, marginTop: 6}}>
            <div style={{width: 56, height: 56, borderRadius: 14, background:"linear-gradient(135deg, #1FA8A0, #9BB5A0)", color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 700}}>{E.avatar}</div>
            <div>
              <h1 className="humi-hero-title" style={{marginTop: 0}}>{E.nameTh}</h1>
              <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 2}}>{E.role} · ย้าย {E.from} → <b style={{color:"var(--color-accent)"}}>{E.to}</b> · {E.empId}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap: 8}}>
          <span className="humi-tag humi-tag--coral" style={{padding:"6px 14px", fontWeight: 600}}><I.warn size={13}/> วันที่ย้ายอีก 12 วัน</span>
          <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>วันที่ย้าย · {E.effective}</span>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr repeat(3, 1fr)", gap: 14, marginBottom: 18}}>
        <div className="humi-card" style={{padding:"18px 22px"}}>
          <div className="humi-eyebrow">ความคืบหน้ารวม</div>
          <div style={{display:"flex", alignItems:"flex-end", gap: 8, marginTop: 8}}>
            <span style={{fontFamily:"var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing:"-0.025em", color: pct === 100 ? "var(--color-success)" : "var(--color-ink)"}}>{pct}%</span>
            <span style={{fontSize: 13, color:"var(--color-ink-muted)", marginBottom: 6}}>{doneItems} / {totalItems} งาน</span>
          </div>
          <div style={{height: 8, background:"var(--color-canvas)", borderRadius: 99, marginTop: 12, overflow:"hidden"}}>
            <div style={{width: pct+"%", height:"100%", background:"var(--color-accent)"}}/>
          </div>
        </div>
        <LC2_Kpi label="งานคงค้าง" value={String(totalItems - doneItems)} sub="ต้องเคลียร์ก่อน 1 มิ.ย." color="var(--color-warning)"/>
        <LC2_Kpi label="ระยะเวลา" value="20 วัน" sub="แจ้งล่วงหน้า"/>
        <LC2_Kpi label="ค่าใช้จ่ายย้าย" value="฿0" sub="ใช้ที่พักของบริษัท"/>
      </div>

      <div style={{display:"flex", gap: 4, marginBottom: 14, borderBottom:"1px solid var(--color-hairline)"}}>
        {[
          ["checklist","Transfer Checklist","check",doneItems+"/"+totalItems],
          ["letter","หนังสือโอนย้าย","fileText","ร่าง"],
          ["compare","เปรียบเทียบก่อน-หลัง","trending","อัปเดตแล้ว"],
        ].map(([k, l, ic, badge]) => {
          const Glyph = I[ic] || I.check;
          const active = tab === k;
          return (
            <button key={k} onClick={() => setTab(k)} style={{padding:"10px 16px", background:"transparent", border: 0, borderBottom: "2px solid " + (active ? "var(--color-accent)" : "transparent"), marginBottom: -1, cursor:"pointer", fontFamily:"inherit", fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "var(--color-ink)" : "var(--color-ink-muted)", display:"inline-flex", alignItems:"center", gap: 7}}>
              <Glyph size={14}/> {l}
              <span style={{marginLeft: 4, padding:"1px 7px", borderRadius: 99, background: active ? "var(--color-accent-soft)" : "var(--color-canvas)", color: active ? "var(--color-ink)" : "var(--color-ink-muted)", fontSize: 10, fontWeight: 600}}>{badge}</span>
            </button>
          );
        })}
      </div>

      {tab === "checklist" && <Transfer_Checklist groups={CL}/>}
      {tab === "letter"    && <Transfer_LetterPreview E={E}/>}
      {tab === "compare"   && <Transfer_Compare E={E}/>}
    </div>
  );
}

function Transfer_Checklist({ groups }) {
  const I = window.PI;
  const ST = {
    done:    { l:"เสร็จแล้ว",  bg:"var(--color-success-soft)", fg:"var(--color-success)", ic:"check" },
    pending: { l:"กำลังทำ",    bg:"var(--color-warning-soft)", fg:"#92660C", ic:"clock" },
    draft:   { l:"ร่าง",       bg:"var(--color-warning-soft)", fg:"#92660C", ic:"edit" },
    sent:    { l:"ส่งแล้ว",    bg:"var(--color-accent-soft)",  fg:"var(--color-accent)", ic:"send" },
    todo:    { l:"ยังไม่ได้ทำ", bg:"var(--color-canvas)",       fg:"var(--color-ink-muted)", ic:"warn" },
  };
  return (
    <div style={{display:"flex", flexDirection:"column", gap: 14}}>
      {groups.map(g => {
        const cdone = g.items.filter(i => i.st === "done").length;
        return (
          <div key={g.cat} className="humi-card" style={{padding: 0}}>
            <div style={{padding:"16px 20px", borderBottom:"1px solid var(--color-hairline-soft)", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <h3 className="humi-section-title">{g.cat}</h3>
              <span style={{fontSize: 12, color:"var(--color-ink-muted)", fontWeight: 600, fontVariantNumeric:"tabular-nums"}}>{cdone}/{g.items.length} เสร็จ</span>
            </div>
            {g.items.map((it, i) => {
              const s = ST[it.st];
              const SGlyph = I[s.ic] || I.check;
              return (
                <div key={i} style={{display:"grid", gridTemplateColumns:"32px 1fr 140px 160px 32px", gap: 14, alignItems:"center", padding:"14px 20px", borderTop: i === 0 ? 0 : "1px solid var(--color-hairline-soft)"}}>
                  <span style={{width: 26, height: 26, borderRadius: 99, background: s.bg, color: s.fg, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><SGlyph size={13}/></span>
                  <div>
                    <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)", textDecoration: it.st === "done" ? "line-through" : "none"}}>{it.l}</div>
                    {it.note && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{it.note}</div>}
                  </div>
                  <span className="humi-tag humi-tag--cream" style={{padding:"2px 8px"}}>{it.who}</span>
                  <span style={{fontSize: 11, fontWeight: 600, color: s.fg, padding:"3px 10px", borderRadius: 99, background: s.bg, display:"inline-flex", alignItems:"center", gap: 4, width:"fit-content"}}><SGlyph size={11}/> {s.l}</span>
                  <button style={{background:"transparent", border:0, color:"var(--color-ink-muted)", cursor:"pointer"}}><I.more size={16}/></button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Transfer_LetterPreview({ E }) {
  const I = window.PI;
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap: 16}}>
      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{padding:"14px 20px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <span style={{fontSize: 12, color:"var(--color-ink-muted)", fontWeight: 600}}>หนังสือโอนย้าย · ร่าง</span>
          <span className="humi-tag humi-tag--cream"><I.edit size={11}/> แก้ไขได้</span>
        </div>
        <div style={{padding:"40px 60px", background:"#fff", minHeight: 500, fontFamily:"var(--font-sans)", color:"var(--color-ink)"}}>
          <div style={{textAlign:"right", fontSize: 12, color:"var(--color-ink-muted)"}}>เลขที่ HR-2569/485 · 14 พ.ค. 2569</div>
          <h2 style={{textAlign:"center", marginTop: 30, marginBottom: 24, letterSpacing:"-0.01em"}}>หนังสือโอนย้ายภายในองค์กร</h2>
          <p style={{lineHeight: 1.9, fontSize: 14}}>
            เรียน <b>คุณ{E.nameTh}</b><br/>
            พนักงานรหัส {E.empId}
          </p>
          <p style={{lineHeight: 1.9, fontSize: 14, marginTop: 20}}>
            บริษัทขอแจ้งให้ทราบว่า เนื่องด้วยเหตุผลด้านการบริหารทรัพยากรบุคคลและตามคำขอของท่าน บริษัทมีคำสั่งโอนย้ายท่านดังนี้
          </p>
          <div style={{margin:"20px 0", padding: 18, background:"var(--color-canvas-soft)", borderRadius: 8, fontSize: 14, lineHeight: 1.9}}>
            <div><b>จากสาขา:</b> {E.from}</div>
            <div><b>ไปสาขา:</b> {E.to}</div>
            <div><b>ตำแหน่ง:</b> {E.role} (คงเดิม)</div>
            <div><b>ค่าตอบแทน:</b> คงเดิม</div>
            <div><b>มีผลตั้งแต่:</b> {E.effective}</div>
          </div>
          <p style={{lineHeight: 1.9, fontSize: 14}}>
            ขอให้ท่านปฏิบัติหน้าที่ในตำแหน่งและสาขาใหม่ด้วยความตั้งใจและประสิทธิภาพ บริษัทเชื่อมั่นว่าท่านจะสามารถปรับตัวและเติบโตในสายงานต่อไป
          </p>
          <div style={{marginTop: 40, fontSize: 14, lineHeight: 1.9}}>
            ขอแสดงความนับถือ<br/><br/>
            ___________________________<br/>
            ฝ่ายทรัพยากรบุคคล<br/>
            Central Retail Corporation
          </div>
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap: 12}}>
        <div className="humi-card">
          <h3 className="humi-section-title">การลงนาม</h3>
          <div style={{display:"flex", flexDirection:"column", gap: 12, marginTop: 12}}>
            <Transfer_Signer who="HR Manager · สำนักงานใหญ่" name="ดานา หลิว" st="signed"/>
            <Transfer_Signer who="ผจก.สาขาเดิม" name="อาทิตย์ ชื่นบาน" st="pending"/>
            <Transfer_Signer who="ผจก.สาขาใหม่" name="วิรัช เกษมสุข" st="pending"/>
          </div>
        </div>
        <button style={LC2_btnPrim}><I.send size={14}/> ส่งให้ลงนาม</button>
        <button style={LC2_btnGhost}><I.pdf size={14}/> ดาวน์โหลด PDF</button>
      </div>
    </div>
  );
}

function Transfer_Signer({ who, name, st }) {
  const I = window.PI;
  const cfg = st === "signed" ? { c:"var(--color-success)", bg:"var(--color-success-soft)", l:"ลงแล้ว" } : { c:"var(--color-ink-faint)", bg:"var(--color-canvas)", l:"รอลงนาม" };
  return (
    <div style={{display:"flex", alignItems:"center", gap: 10}}>
      <span style={{width: 28, height: 28, borderRadius: 99, background: cfg.bg, color: cfg.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}>
        {st === "signed" ? <I.check size={13}/> : <I.clock size={13}/>}
      </span>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{who}</div>
        <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{name}</div>
      </div>
      <span style={{fontSize: 11, fontWeight: 600, color: cfg.c}}>{cfg.l}</span>
    </div>
  );
}

function Transfer_Compare({ E }) {
  const rows = [
    ["Branch / สาขา",        E.from,            E.to,                 true],
    ["Manager",              "อาทิตย์ ชื่นบาน", "วิรัช เกษมสุข",       true],
    ["Cost Center",          "CC-LP-OPS",       "CC-CTW-OPS",          true],
    ["Team",                 "Store Ops A",     "Store Ops B",          true],
    ["Role / ตำแหน่ง",       E.role,            E.role,                 false],
    ["เงินเดือน",            "฿18,000",         "฿18,000",              false],
    ["ประเภทจ้าง",           "เต็มเวลา",        "เต็มเวลา",             false],
    ["Email · เบอร์",        "ไม่เปลี่ยน",      "ไม่เปลี่ยน",            false],
  ];
  return (
    <div className="humi-card" style={{padding: 0}}>
      <div style={{padding:"14px 20px", borderBottom:"1px solid var(--color-hairline-soft)"}}>
        <h3 className="humi-section-title">เปรียบเทียบก่อน-หลัง</h3>
        <p className="humi-section-sub">ทุกข้อจะ apply พร้อมกันเมื่อถึง {E.effective}</p>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 80px", padding:"12px 20px", background:"var(--color-canvas-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
        <div>Field</div><div>เดิม</div><div>ใหม่</div><div style={{textAlign:"right"}}>เปลี่ยน?</div>
      </div>
      {rows.map(([l, a, b, changed], i) => (
        <div key={i} style={{display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 80px", padding:"14px 20px", borderTop:"1px solid var(--color-hairline-soft)", alignItems:"center", fontSize: 13}}>
          <div style={{color:"var(--color-ink-muted)", fontWeight: 500}}>{l}</div>
          <div style={{color:"var(--color-ink)", textDecoration: changed ? "line-through" : "none", textDecorationColor:"var(--color-ink-faint)"}}>{a}</div>
          <div style={{color: changed ? "var(--color-accent)" : "var(--color-ink)", fontWeight: changed ? 600 : 500}}>{b}</div>
          <div style={{textAlign:"right"}}>
            {changed ? <span className="humi-tag humi-tag--accent" style={{padding:"2px 8px", fontSize: 10}}>เปลี่ยน</span> : <span style={{fontSize: 11, color:"var(--color-ink-faint)"}}>—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function LC2_Kpi({ label, value, sub, color }) {
  return (
    <div className="humi-card" style={{padding:"18px 22px"}}>
      <div className="humi-eyebrow">{label}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 600, letterSpacing:"-0.025em", color: color || "var(--color-ink)", marginTop: 6, lineHeight: 1}}>{value}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 6}}>{sub}</div>}
    </div>
  );
}

function LC2_Foot({ ok, primary, primaryIc, disabled }) {
  const I = window.PI;
  const PGlyph = I[primaryIc] || I.check;
  return (
    <div style={{marginTop: 22, padding:"16px 22px", background:"var(--color-surface)", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", display:"flex", alignItems:"center", justifyContent:"space-between", gap: 16, flexWrap:"wrap"}}>
      <div style={{display:"flex", alignItems:"center", gap: 10}}>
        <I.check size={16} style={{color: ok ? "var(--color-success)" : "var(--color-ink-faint)"}}/>
        <span style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{ok ? "พร้อมดำเนินการ" : "กรุณาเลือกการตัดสินใจ"}</span>
      </div>
      <div style={{display:"flex", gap: 10}}>
        <button className="humi-button humi-button--ghost"><I.x size={14}/> ปฏิเสธ</button>
        <button className="humi-button humi-button--primary" disabled={disabled} style={disabled ? {opacity:0.5, cursor:"not-allowed"} : null}><PGlyph size={14}/> {primary}</button>
      </div>
    </div>
  );
}

// ============================================================================
// 3) ONBOARDING — Employee Day-1 → Day-90 checklist
// ============================================================================

function Onboarding_Day1() {
  const I = window.PI;

  const PHASES = [
    { id:"day1", l:"Day 1 · วันแรก", date:"1 มิ.ย. 2569 · จันทร์", done: 3, total: 5, current: true, items:[
      { l:"ลงทะเบียนเข้าระบบ HRMS",       st:"done", action:"เสร็จแล้ว", who:"ตัวเอง" },
      { l:"กรอกข้อมูลส่วนตัวที่เหลือ",   st:"done", action:"เสร็จแล้ว", who:"ตัวเอง", sub:"บัตรประชาชน · ที่อยู่ · ผู้อุปการะ" },
      { l:"อัปโหลดบัญชีธนาคาร + สำเนา",  st:"done", action:"เสร็จแล้ว", who:"ตัวเอง" },
      { l:"นัดปฐมนิเทศ + ทำความรู้จักทีม", st:"current", action:"14:00 วันนี้ · ห้อง 12B", who:"HR + Manager", sub:"30 นาที" },
      { l:"รับ Laptop + อุปกรณ์",         st:"todo", action:"รอ IT แจ้ง", who:"IT" },
    ]},
    { id:"week1", l:"สัปดาห์แรก · Day 2-5", date:"2-5 มิ.ย.", done: 1, total: 6, items:[
      { l:"อ่านนโยบาย + Code of Conduct",   st:"current", action:"กำลังอ่าน · เหลือ 2 หัวข้อ", who:"ตัวเอง" },
      { l:"e-Learning: Brand 101",          st:"todo", action:"45 นาที", who:"ตัวเอง" },
      { l:"e-Learning: ระบบ POS",            st:"todo", action:"60 นาที", who:"ตัวเอง" },
      { l:"e-Learning: ความปลอดภัย",         st:"todo", action:"30 นาที", who:"ตัวเอง" },
      { l:"พบ Buddy / Mentor",              st:"done", action:"พบแล้ว 1 มิ.ย.", who:"Mentor: เจสซิก้า ศรี" },
      { l:"Shadow shifts กับหัวหน้า",        st:"todo", action:"3-5 มิ.ย.", who:"Manager" },
    ]},
    { id:"month1", l:"เดือนแรก · Week 2-4", date:"8-30 มิ.ย.", done: 0, total: 4, items:[
      { l:"ทำ checklist ครบทุกระบบ",         st:"todo", action:"", who:"ตัวเอง" },
      { l:"1-on-1 สัปดาห์ละครั้งกับหัวหน้า", st:"todo", action:"นัดทุกศุกร์ 16:00", who:"Manager" },
      { l:"30-day check-in",                  st:"todo", action:"30 มิ.ย.", who:"HR" },
      { l:"กำหนดเป้าหมาย Q3",                 st:"todo", action:"", who:"Manager" },
    ]},
    { id:"day90", l:"Probation review · Day 90", date:"30 ส.ค.", done: 0, total: 3, items:[
      { l:"Self-assessment",                  st:"todo", action:"", who:"ตัวเอง" },
      { l:"Manager review",                   st:"todo", action:"", who:"Manager" },
      { l:"Probation result + Confirmation",  st:"todo", action:"", who:"HR Admin" },
    ]},
  ];

  const ST = {
    done:    { c:"var(--color-success)", bg:"var(--color-success-soft)", ic:"check" },
    current: { c:"var(--color-accent)",  bg:"var(--color-accent-soft)",  ic:"clock" },
    todo:    { c:"var(--color-ink-faint)", bg:"var(--color-canvas)",     ic:"layers" },
  };

  const totalDone = PHASES.reduce((s,p) => s + p.done, 0);
  const totalAll  = PHASES.reduce((s,p) => s + p.total, 0);

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Hero */}
      <div style={{padding: 28, background:"linear-gradient(135deg, var(--color-canvas-soft), var(--color-accent-soft))", borderRadius:"var(--radius-lg)", border:"1px solid var(--color-hairline)", marginBottom: 22}}>
        <div className="humi-eyebrow" style={{color:"var(--color-ink-soft)"}}>Onboarding · Day 1 → 90</div>
        <h1 className="humi-hero-title" style={{marginTop: 8, fontSize: 30, maxWidth: 680}}>ยินดีต้อนรับเข้าทีม Central Retail นะคะ คุณภานุพงศ์</h1>
        <p style={{fontSize: 14, color:"var(--color-ink-soft)", marginTop: 12, lineHeight: 1.6, maxWidth: 640}}>
          ทุกอย่างที่ต้องทำใน 90 วันแรก รวมอยู่ที่นี่ — กรอกเรื่อย ๆ บันทึกอัตโนมัติ · ถ้ามีคำถาม ทักไปที่ <b style={{color:"var(--color-ink)"}}>Buddy</b> ของคุณ คุณเจสซิก้าได้เลย
        </p>
        <div style={{display:"flex", gap: 20, marginTop: 18, alignItems:"center"}}>
          <div style={{flex: 1}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom: 8, fontSize: 12, color:"var(--color-ink-soft)"}}>
              <span style={{fontWeight: 600}}>ความคืบหน้ารวม</span>
              <span style={{fontVariantNumeric:"tabular-nums", fontWeight: 700, color:"var(--color-ink)"}}>{totalDone} / {totalAll} งาน</span>
            </div>
            <div style={{height: 10, background:"rgba(14,27,44,0.08)", borderRadius: 99, overflow:"hidden"}}>
              <div style={{width: (totalDone/totalAll*100)+"%", height:"100%", background:"var(--color-accent)"}}/>
            </div>
          </div>
          <button style={{...LC2_btnGhost, padding:"10px 16px"}}><I.users size={14}/> ทักไปหา Buddy</button>
        </div>
      </div>

      {/* Phases */}
      <div style={{display:"flex", flexDirection:"column", gap: 16}}>
        {PHASES.map(p => {
          const phaseDone = p.done === p.total;
          return (
            <div key={p.id} className="humi-card" style={{padding: 0, opacity: p.current || p.done > 0 ? 1 : 0.85}}>
              <div style={{padding:"18px 22px", borderBottom: "1px solid var(--color-hairline-soft)", display:"flex", alignItems:"center", gap: 14, background: p.current ? "var(--color-accent-soft)" : "transparent"}}>
                <div style={{width: 44, height: 44, borderRadius: 12, background: phaseDone ? "var(--color-success)" : p.current ? "var(--color-accent)" : "var(--color-canvas)", color: (phaseDone || p.current) ? "#fff" : "var(--color-ink-muted)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, flexShrink: 0}}>
                  {phaseDone ? <I.check size={20}/> : p.done + "/" + p.total}
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, color:"var(--color-ink)", letterSpacing:"-0.01em"}}>{p.l}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{p.date}</div>
                </div>
                {p.current && <span className="humi-tag humi-tag--accent" style={{padding:"4px 12px", fontWeight: 600}}>กำลังอยู่ในช่วงนี้</span>}
              </div>
              <div>
                {p.items.map((it, i) => {
                  const s = ST[it.st];
                  const SGlyph = I[s.ic] || I.check;
                  return (
                    <div key={i} style={{display:"grid", gridTemplateColumns:"34px 1fr 200px 130px", gap: 14, alignItems:"center", padding:"14px 22px", borderTop: i === 0 ? 0 : "1px solid var(--color-hairline-soft)"}}>
                      <span style={{width: 28, height: 28, borderRadius: 99, background: s.bg, color: s.c, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><SGlyph size={14}/></span>
                      <div>
                        <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)", textDecoration: it.st === "done" ? "line-through" : "none", textDecorationColor:"var(--color-ink-faint)"}}>{it.l}</div>
                        {it.sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{it.sub}</div>}
                      </div>
                      <span className="humi-tag humi-tag--cream" style={{padding:"2px 8px", width:"fit-content"}}>{it.who}</span>
                      {it.st === "current" ? (
                        <button style={{...LC2_btnPrim, padding:"6px 12px", minHeight: 30, fontSize: 12}}>{it.action || "ทำเลย"}</button>
                      ) : (
                        <span style={{fontSize: 11, color: s.c, fontWeight: 600, textAlign:"right"}}>{it.action}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resources */}
      <div className="humi-card" style={{marginTop: 18, padding: 22}}>
        <h3 className="humi-section-title">ทรัพยากรที่ช่วยคุณ</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12, marginTop: 14}}>
          {[
            { ic:"book",  t:"Employee Handbook", sub:"PDF · 48 หน้า" },
            { ic:"users", t:"Buddy: เจสซิก้า ศรี", sub:"Senior Cashier · 3 ปี" },
            { ic:"phone", t:"IT Helpdesk", sub:"02-555-0123 ext.4" },
            { ic:"globe", t:"Org Chart",   sub:"ดูทีม + สาขาทั้งหมด" },
          ].map(r => {
            const Glyph = I[r.ic] || I.book;
            return (
              <button key={r.t} style={{display:"flex", flexDirection:"column", alignItems:"flex-start", gap: 8, padding:"14px 16px", background:"var(--color-canvas-soft)", border:"1px solid transparent", borderRadius:"var(--radius-md)", cursor:"pointer", fontFamily:"inherit", textAlign:"left"}}>
                <div style={{width: 36, height: 36, borderRadius: 10, background:"var(--color-surface)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={16}/></div>
                <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{r.t}</div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{r.sub}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4) CONFIRMATION — Admin issues confirmation letter after probation
// ============================================================================

function Confirmation_Admin() {
  const I = window.PI;

  const E = { nameTh:"สมพร เจริญสุข", nameEn:"Somporn C.", role:"Sales Associate", branch:"Central EastVille", empId:"E-3920", startDate:"1 มี.ค. 2569", confirmDate:"1 มิ.ย. 2569", manager:"เจสซิก้า ศรี", avatar:"SC", probationScore: 4.6 };

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow"><span>Employee Center</span><span style={{margin:"0 6px"}}>›</span><span>Probation</span><span style={{margin:"0 6px"}}>›</span><span style={{color:"var(--color-ink-soft)"}}>Confirmation · {E.empId}</span></div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>ออกหนังสือบรรจุพนักงาน<span className="humi-hero-title-soft" style={{marginLeft: 10}}>· หลังผ่านทดลองงาน</span></h1>
        </div>
        <span className="humi-tag" style={{padding:"6px 14px", background:"var(--color-success-soft)", color:"var(--color-success)", fontWeight: 600}}><I.check size={13}/> ผ่านการประเมิน {E.probationScore}/5</span>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap: 20}}>
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          {/* Employee header */}
          <div className="humi-card">
            <div style={{display:"flex", alignItems:"center", gap: 16}}>
              <div style={{width: 64, height: 64, borderRadius: 16, background:"linear-gradient(135deg, #E08864, #F4E4B8)", color:"var(--color-ink)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700}}>{E.avatar}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600, color:"var(--color-ink)"}}>{E.nameTh} <span style={{color:"var(--color-ink-muted)", fontWeight: 500}}>· {E.nameEn}</span></div>
                <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 4}}>{E.role} · {E.branch} · เริ่มงาน {E.startDate} (90 วันครบ)</div>
              </div>
            </div>
            <div style={{marginTop: 18, padding: 16, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", display:"grid", gridTemplateColumns:"repeat(4, 1fr)"}}>
              <LC2_Metric l="คะแนนประเมิน" v={E.probationScore + "/5"} sub="โดย " accent/>
              <LC2_Metric l="วันที่บรรจุ" v={E.confirmDate} sub="วันถัดไปจาก probation"/>
              <LC2_Metric l="ผู้ประเมิน" v={E.manager} sub="Direct Manager"/>
              <LC2_Metric l="สถานะปัจจุบัน" v="ทดลองงาน" sub="จะเปลี่ยนเป็น 'พนักงานประจำ'"/>
            </div>
          </div>

          {/* Probation review summary */}
          <div className="humi-card">
            <h3 className="humi-section-title">สรุปผลการประเมิน</h3>
            <p className="humi-section-sub">จาก Probation review โดย {E.manager} เมื่อ 28 พ.ค. 2569</p>
            <div style={{marginTop: 16, display:"grid", gridTemplateColumns:"1fr 1fr", gap: 14}}>
              {[
                { l:"ความรู้ด้านงาน", v: 5 },
                { l:"ทักษะการบริการ", v: 5 },
                { l:"การทำงานเป็นทีม", v: 4 },
                { l:"ทัศนคติ", v: 5 },
                { l:"ความตรงต่อเวลา", v: 4 },
                { l:"ความรับผิดชอบ", v: 5 },
              ].map(c => (
                <div key={c.l} style={{display:"flex", alignItems:"center", gap: 12, padding: 10, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)"}}>
                  <span style={{fontSize: 13, color:"var(--color-ink-soft)", flex: 1}}>{c.l}</span>
                  <div style={{display:"flex", gap: 3}}>
                    {[1,2,3,4,5].map(n => (
                      <span key={n} style={{width: 8, height: 8, borderRadius: 99, background: n <= c.v ? "var(--color-accent)" : "var(--color-hairline)"}}/>
                    ))}
                  </div>
                  <span style={{fontSize: 13, fontWeight: 700, color:"var(--color-ink)", width: 24, textAlign:"right"}}>{c.v}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop: 14, padding: 14, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", borderLeft:"3px solid var(--color-accent)", fontSize: 13, color:"var(--color-ink-soft)", lineHeight: 1.6, fontStyle:"italic"}}>
              "ทำงานได้ดี เรียนรู้เร็ว ทัศนคติดีกับลูกค้า แนะนำให้บรรจุเข้าทำงานประจำ"
              <div style={{marginTop: 6, fontStyle:"normal", fontSize: 11, color:"var(--color-ink-muted)"}}>— {E.manager}</div>
            </div>
          </div>

          {/* What will change */}
          <div className="humi-card">
            <h3 className="humi-section-title">การเปลี่ยนแปลงเมื่อบรรจุ</h3>
            <div style={{display:"flex", flexDirection:"column", gap: 10, marginTop: 12}}>
              {[
                { l:"สถานะ", from:"ทดลองงาน (Probation)", to:"พนักงานประจำ (Permanent)" },
                { l:"เงินเดือน", from:"฿16,000", to:"฿16,000 (คงเดิม)", same: true },
                { l:"สิทธิประกันสุขภาพ", from:"พื้นฐาน", to:"แบบเต็ม + บุตร" },
                { l:"วันลาพักร้อน", from:"3 วัน/ปี (prorate)", to:"6 วัน/ปี (เต็มสิทธิ)" },
                { l:"กองทุนสำรอง", from:"ยังไม่เข้าร่วม", to:"เปิดให้สมัครได้" },
              ].map((r, i) => (
                <div key={i} style={{display:"grid", gridTemplateColumns:"180px 1fr 40px 1fr", gap: 10, alignItems:"center", padding:"8px 0", borderBottom: i === 4 ? 0 : "1px solid var(--color-hairline-soft)"}}>
                  <span style={{fontSize: 13, color:"var(--color-ink-muted)", fontWeight: 500}}>{r.l}</span>
                  <span style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{r.from}</span>
                  <span style={{textAlign:"center", color:"var(--color-ink-faint)"}}>→</span>
                  <span style={{fontSize: 13, color: r.same ? "var(--color-ink-soft)" : "var(--color-accent)", fontWeight: r.same ? 500 : 600}}>{r.to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Letter preview + actions */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          <div className="humi-card" style={{padding: 0, overflow:"hidden", position:"sticky", top: 80}}>
            <div style={{padding:"12px 16px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <span style={{fontSize: 11, color:"var(--color-ink-muted)", fontWeight: 600, textTransform:"uppercase", letterSpacing:".06em"}}>ตัวอย่างหนังสือ</span>
              <I.fileText size={14} style={{color:"var(--color-ink-muted)"}}/>
            </div>
            <div style={{padding: 18, background:"#fff", fontSize: 11, lineHeight: 1.7, color:"var(--color-ink)"}}>
              <div style={{textAlign:"right", fontSize: 10, color:"var(--color-ink-muted)"}}>HR-2569/512</div>
              <h4 style={{textAlign:"center", margin:"12px 0 16px", fontSize: 13, letterSpacing:"-0.01em"}}>หนังสือบรรจุพนักงาน</h4>
              <p>เรียน คุณ{E.nameTh}</p>
              <p style={{marginTop: 10}}>บริษัทขอแสดงความยินดี และขอแจ้งให้ทราบว่า ท่านได้ผ่านช่วงทดลองงาน 90 วัน และได้รับการ<b> บรรจุเป็นพนักงานประจำ </b>มีผลตั้งแต่ <b>{E.confirmDate}</b></p>
              <p style={{marginTop: 10}}>คะแนนการประเมิน {E.probationScore}/5 จากผู้บังคับบัญชา…</p>
              <p style={{marginTop: 14}}>ขอแสดงความนับถือ<br/>ฝ่ายทรัพยากรบุคคล</p>
            </div>
          </div>

          <button style={LC2_btnPrim}><I.send size={14}/> ส่งให้พนักงาน + บรรจุ</button>
          <button style={LC2_btnGhost}><I.edit size={14}/> แก้ไขก่อนส่ง</button>
          <button style={LC2_btnGhost}><I.pdf size={14}/> ดาวน์โหลด PDF</button>

          <div style={{padding: 14, background:"var(--color-accent-soft)", borderRadius:"var(--radius-md)", fontSize: 12, color:"var(--color-ink-soft)", lineHeight: 1.5}}>
            <div style={{display:"flex", alignItems:"center", gap: 6, fontSize: 11, fontWeight: 700, color:"var(--color-ink)", marginBottom: 6, textTransform:"uppercase", letterSpacing:".1em"}}>
              <I.alert size={13} style={{color:"var(--color-accent)"}}/> หลังกดส่ง
            </div>
            ระบบจะเปลี่ยนสถานะเป็น "พนักงานประจำ" · เปิดสิทธิประกันเต็ม · ปรับวันลา · แจ้ง Payroll · ส่ง email + จดหมาย PDF ให้พนักงาน
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Transfer_Manager, Transfer_Admin, Onboarding_Day1, Confirmation_Admin });
