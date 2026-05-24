// admin_overview.jsx — Overview tab with Admin Alerts + Action Search
function AdminOverview({ Ic, onOpenInbox, onOpenEmployee, onActionSearch, plansMap, planKeys }) {
  return (
    <>
      {/* Hero with action search */}
      <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 80%)", border: 0, padding: 26, marginBottom: 20, overflow:"hidden", position:"relative"}}>
        <div className="blob teal"   style={{width: 130, height: 160, right: -30, top: -40, opacity: .55}}/>
        <div className="blob butter" style={{width: 70, height: 88, right: 110, top: 60, opacity: .75}}/>
        <div className="eyebrow">ฤดูลงทะเบียน · เปิดรับถึง 3 พ.ค. 2568</div>
        <h1 style={{fontSize: 34, marginTop: 10, maxWidth: 620, color:"var(--ink)", letterSpacing:"-0.01em"}}>72% ของทีมยืนยันแผนสวัสดิการแล้ว</h1>
        <p style={{fontSize: 15, color:"var(--ink-2)", marginTop: 8, maxWidth: 560, lineHeight: 1.6}}>
          คงเหลือ 178 คนต้องเลือกหรือยืนยันแผน · ส่งการแจ้งเตือนซ้ำให้ผู้ที่ยังไม่ดำเนินการ หรือกำหนดแผนเริ่มต้นโดยอัตโนมัติ
        </p>

        {/* Action Search — command palette feel */}
        <div onClick={onActionSearch} style={{marginTop: 18, padding:"12px 16px", background:"#fff", borderRadius: 12, border:"1px solid var(--line)", display:"flex", alignItems:"center", gap: 10, cursor:"pointer", maxWidth: 540, boxShadow:"0 1px 2px rgba(0,0,0,0.03)"}}>
          <Ic.search size={16}/>
          <span style={{flex: 1, color:"var(--ink-3)", fontSize: 14}}>ค้นหาเครื่องมือผู้ดูแล · "เพิ่มพนักงาน", "ปรับเงินเดือน", "ดูคำขอรอ"…</span>
          <span style={{padding:"3px 7px", border:"1px solid var(--line)", borderRadius: 6, fontSize: 11, color:"var(--ink-3)", fontFamily:"monospace"}}>⌘K</span>
        </div>
      </div>

      {/* Admin Alerts — SuccessFactors pattern */}
      <div className="card" style={{padding: 0, marginBottom: 20, overflow:"hidden", border:"1px solid var(--line)"}}>
        <div style={{padding:"14px 18px", background:"var(--cream-2)", borderBottom:"1px solid var(--line)"}}>
          <div className="row">
            <div>
              <div className="eyebrow" style={{color:"var(--coral)"}}>การแจ้งเตือนผู้ดูแล · ต้องดำเนินการ</div>
              <h3 style={{marginTop: 4}}>มี 7 รายการที่อาจกระทบกระบวนการ HR</h3>
            </div>
            <div className="spacer"/>
            <button className="btn btn-ghost" style={{fontSize: 13}}>ปิดทั้งหมดที่อ่านแล้ว</button>
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)"}}>
          {[
            {sev:"high", ic:"shield", t:"คำขออนุมัติเกิน SLA", d:"WF-1043 · จ้างงานใหม่ ค้างเกิน 24 ชม.", action:"ดูคำขอ", c:"var(--coral)"},
            {sev:"high", ic:"doc", t:"3 พนักงานยังไม่ส่งเอกสารภาษี", d:"ครบกำหนด 5 พ.ค. · จะกระทบเปย์โรลรอบหน้า", action:"ส่งเตือน", c:"var(--coral)"},
            {sev:"med", ic:"people", t:"178 คนยังไม่ยืนยันสวัสดิการ", d:"ฤดูลงทะเบียนปิด 3 พ.ค. · 13 วันที่เหลือ", action:"ส่งกลุ่ม", c:"var(--butter)"},
            {sev:"med", ic:"heart", t:"แผน Flex Plus เกินงบ 4%", d:"ลงทะเบียน 184 จาก cap 320 · ค่าใช้จ่ายโตเร็วกว่าคาด", action:"ดูรายงาน", c:"var(--butter)"},
            {sev:"low", ic:"download", t:"การซิงก์ Bupa ค้าง 2 รายการ", d:"ลองอีกครั้งใน 6 ชม. หรือดำเนินการเอง", action:"แก้ไข", c:""},
            {sev:"low", ic:"mega", t:"กฎอัตโนมัติใหม่ 1 ข้อรอเปิดใช้", d:"ถ้าอายุงาน ≥ 1 ปี → ปรับสมทบกองทุน +1%", action:"เปิดใช้", c:""},
          ].map((a, i) => {
            const Glyph = Ic[a.ic];
            return (
              <div key={i} style={{padding:"14px 18px", borderBottom: i < 4 ? "1px solid var(--line-2)" : "", borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "", display:"flex", gap: 12, alignItems:"flex-start"}}>
                <div style={{width: 32, height: 32, borderRadius: 8, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", color: a.c || "var(--ink-3)", flexShrink: 0}}>
                  <Glyph size={15}/>
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div className="row" style={{gap: 8}}>
                    <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.3, flex: 1}}>{a.t}</div>
                    {a.sev === "high" && <span className="tag coral" style={{fontSize: 10}}>เร่งด่วน</span>}
                  </div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 4, lineHeight: 1.5}}>{a.d}</div>
                  <button className="btn btn-ghost" style={{padding:"4px 0", fontSize: 12, marginTop: 6, color:"var(--accent)", fontWeight: 600}}>{a.action} →</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid" style={{gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        {[
          {l:"พนักงานทั้งหมด", v:"642", sub:"+18 เดือนนี้", c:"var(--accent)", ic:"people"},
          {l:"คำขอรออนุมัติ", v:"14", sub:"4 เกิน SLA", c:"var(--coral)", ic:"doc"},
          {l:"แผนสวัสดิการที่ใช้งาน", v:"12", sub:"4 ประเภทหลัก", c:"var(--sage)", ic:"heart"},
          {l:"ค่าใช้จ่าย/เดือน", v:"฿2.84M", sub:"-3.1% เทียบเดือนก่อน", c:"var(--butter)", ic:"shield"},
        ].map(s => {
          const Glyph = Ic[s.ic];
          return (
            <div key={s.l} className="card tight" style={{borderLeft:`4px solid ${s.c}`}}>
              <div className="row" style={{alignItems:"flex-start"}}>
                <div>
                  <div className="eyebrow">{s.l}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 700, marginTop: 6, letterSpacing:"-0.02em"}}>{s.v}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 4}}>{s.sub}</div>
                </div>
                <div className="spacer"/>
                <div style={{width:34, height:34, borderRadius: 10, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", color: s.c}}>
                  <Glyph size={16}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid" style={{gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 20}}>
        <div className="card">
          <div className="row">
            <div>
              <div className="eyebrow">การลงทะเบียนตามแผน</div>
              <h3 style={{marginTop: 6}}>สถานะลงทะเบียน · ปี 2568</h3>
            </div>
            <div className="spacer"/>
            <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>ดูรายละเอียด</button>
          </div>
          <div className="col" style={{gap: 14, marginTop: 16}}>
            {planKeys.map(k => {
              const p = plansMap[k];
              const pct = Math.round(p.enrolled / p.cap * 100);
              return (
                <div key={k}>
                  <div className="row" style={{marginBottom: 6}}>
                    <span style={{width: 8, height: 8, borderRadius: 4, background: p.c, marginRight: 8}}/>
                    <span style={{fontSize: 14, fontWeight: 500}}>{p.name}</span>
                    <span style={{fontSize: 12, color:"var(--ink-3)", marginLeft: 8}}>{p.cat}</span>
                    <div className="spacer"/>
                    <span style={{fontSize: 13, color:"var(--ink-2)"}}><b>{p.enrolled}</b> / {p.cap} <span style={{color:"var(--ink-3)"}}>· {pct}%</span></span>
                  </div>
                  <div className="progress"><span style={{width: pct+"%", background: p.c}}/></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Inbox preview */}
        <div className="card">
          <div className="row">
            <div>
              <div className="eyebrow">คำขออนุมัติของฉัน</div>
              <h3 style={{marginTop: 6}}>กล่องขาเข้า Workflow</h3>
            </div>
            <div className="spacer"/>
            <span className="tag butter">14</span>
          </div>
          <div className="col" style={{gap: 0, marginTop: 8}}>
            {[
              {n:"เพิ่มผู้อุปการะ", who:"พริยะ ชาห์ · E-4012", c:"PS", t:"coral", time:"2 ชม.", id:"WF-1042"},
              {n:"จ้างงานใหม่ · พาร์ทไทม์", who:"นภา จิตรเมตตา · E-4612", c:"NJ", t:"sage", time:"24 ชม. ⚠", id:"WF-1043"},
              {n:"ปรับเงินเดือน +5.95%", who:"มาร์คัส เคลลี่ · E-3812", c:"MK", t:"teal", time:"3 วัน", id:"WF-1044"},
              {n:"ลาออก · กำหนด 31 พ.ค.", who:"กิตติ ชัยศรี · E-3340", c:"กช", t:"butter", time:"4 วัน", id:"WF-1045"},
            ].map(a => (
              <div key={a.id} onClick={() => onOpenInbox(a.id)} className="row" style={{padding:"12px 0", borderBottom:"1px solid var(--line-2)", gap: 10, cursor:"pointer"}}>
                <div className={"avatar " + a.t} style={{width: 30, height: 30, fontSize: 11}}>{a.c}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.3}}>{a.n}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{a.who}</div>
                </div>
                <span style={{fontSize: 11, color: a.time.includes("⚠") ? "var(--coral)" : "var(--ink-4)", whiteSpace:"nowrap"}}>{a.time}</span>
              </div>
            ))}
          </div>
          <button onClick={() => onOpenInbox()} className="btn btn-ghost" style={{marginTop: 12, width:"100%"}}>ดูทั้งหมด 14 รายการ <Ic.arrow size={13}/></button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="row" style={{marginBottom: 14}}>
          <div>
            <div className="eyebrow">การกระทำด่วน</div>
            <h3 style={{marginTop: 6}}>เครื่องมือผู้ดูแลที่ใช้บ่อย</h3>
          </div>
        </div>
        <div className="grid" style={{gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
          {[
            {l:"เพิ่มพนักงาน", d:"เริ่ม Hire workflow", ic:"plus", c:"var(--accent)"},
            {l:"นำเข้า CSV", d:"อัปโหลดทีมแบบกลุ่ม", ic:"download", c:"var(--coral)"},
            {l:"สร้างแผนใหม่", d:"กำหนดเงื่อนไขสวัสดิการ", ic:"shield", c:"var(--sage)"},
            {l:"ส่งประกาศ", d:"แจ้งเตือนถึงทุกสาขา", ic:"mega", c:"var(--butter)"},
          ].map(q => {
            const Glyph = Ic[q.ic];
            return (
              <div key={q.l} className="row" style={{padding: 14, border:"1px solid var(--line)", borderRadius: 14, gap: 12, cursor:"pointer"}}>
                <div style={{width: 38, height: 38, borderRadius: 10, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", color: q.c, flexShrink: 0}}>
                  <Glyph size={18}/>
                </div>
                <div>
                  <div style={{fontSize: 14, fontWeight: 600}}>{q.l}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2, lineHeight: 1.4}}>{q.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
window.AdminOverview = AdminOverview;
