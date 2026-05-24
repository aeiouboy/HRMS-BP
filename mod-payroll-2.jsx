// ============= MODULE 4: PAYROLL MANAGEMENT (Admin) =============

// 4C · ADMIN — รอบจ่ายเงินเดือน (Run Payroll)
function PR_Admin() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Payroll · มุม HR Admin"
        title="รอบจ่ายเงินเดือน · พ.ค. 2568"
        subtitle="งวดที่ 5 ของปี · จ่ายวันที่ 25 พ.ค. · 2,847 พนักงาน · ฿58.4M"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.copy size={14}/> ก๊อปจากงวดก่อน</button>
          <button className="humi-button humi-button--ghost">ดู Variance</button>
          <button className="humi-button humi-button--primary"><I.send size={14}/> ประมวลผล · ส่งธนาคาร</button>
        </>}/>

      {/* Pipeline */}
      <div className="humi-card" style={{padding: 22, marginBottom: 20}}>
        <div className="humi-eyebrow" style={{marginBottom: 14}}>ขั้นตอนของรอบจ่าย</div>
        <div className="humi-row" style={{gap: 0, alignItems:"stretch"}}>
          {[
            { n:"รวบรวมเวลา", s:"ปิดงวด TM · 2,847/2,847", done: true },
            { n:"คำนวณเงิน",  s:"คำนวณแล้ว · 2,847 คน",   done: true },
            { n:"ตรวจ Variance", s:"พบ 12 เคสผิดปกติ",      done: true, warn: true },
            { n:"อนุมัติขั้นสุดท้าย", s:"รอ HR Director",     active: true },
            { n:"ส่งธนาคาร",  s:"กรุงเทพฯ · กสิกร · ไทยพาณิชย์", future: true },
            { n:"ออกสลิป",    s:"PDF · 2,847 ฉบับ",         future: true },
          ].map((s, i) => (
            <div key={i} style={{flex: 1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative"}}>
              <div style={{width: 44, height: 44, borderRadius:"50%", background: s.done ? (s.warn ? "var(--color-warning)" : "var(--color-accent)") : s.active ? "var(--color-surface)" : "var(--color-canvas-soft)", border: s.active ? "2px solid var(--color-accent)" : s.future ? "1px solid var(--color-hairline)" : "0", color: s.done ? "#fff" : s.active ? "var(--color-accent)" : "var(--color-ink-faint)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, zIndex: 1}}>
                {s.done ? (s.warn ? <I.warn size={18}/> : <I.check size={18}/>) : i + 1}
              </div>
              <div style={{fontSize: 13, fontWeight: 600, marginTop: 10, color: s.active ? "var(--color-accent)" : s.future ? "var(--color-ink-faint)" : "var(--color-ink)"}}>{s.n}</div>
              <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2, textAlign:"center"}}>{s.s}</div>
              {i < 5 && <div style={{position:"absolute", top: 22, left:"50%", width:"100%", height: 2, background: i < 2 || (i === 2 && !s.future) ? "var(--color-accent)" : "var(--color-hairline)"}}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="ค่าจ้างฐาน" value="฿42.4M" sub="2,847 คน" icon="baht"/>
        <window.StatCard label="OT รวม" value="฿1.82M" sub="14,820 ชม." accent="var(--color-warning)" icon="clock"/>
        <window.StatCard label="โบนัส · เบี้ยขยัน" value="฿3.18M" sub="เพิ่ม 12% MoM" accent="var(--color-accent)" icon="star"/>
        <window.StatCard label="หักภาษี · กองทุน" value="฿11.0M" sub="ภงด.1 ฿6.4M" icon="trending"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
        {/* Variance alerts */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <div className="humi-row">
              <div>
                <h3 className="humi-section-title">เคส Variance · ต้องตัดสินใจ</h3>
                <div className="humi-section-sub">เปรียบเทียบกับงวดก่อน · เกิน ±15% หรือพบผิดปกติ</div>
              </div>
              <span className="humi-spacer"/>
              <span className="humi-tag humi-tag--coral">12 เคส</span>
            </div>
          </div>

          {[
            { sev:"hi",  n:"นิภาพร แสนสุข",     b:"Chidlom",  delta:"+฿8,420", pct:"+38%", r:"โบนัสพิเศษ Q1 + OT 22 ชม.", ic:"trending" },
            { sev:"hi",  n:"วันชัย วชิรา",      b:"Lardprao", delta:"–฿4,200", pct:"–18%", r:"ขาดงาน 3 วัน · ไม่มีใบลา",   ic:"warn" },
            { sev:"mid", n:"สมศักดิ์ ไทยใจดี",  b:"Embassy",  delta:"+฿2,800", pct:"+12%", r:"ปรับเงินเดือนกลางเดือน",    ic:"trending" },
            { sev:"mid", n:"พีรพล ตั้งศิริ",   b:"CTW",      delta:"+฿6,200", pct:"+28%", r:"OT 28 ชม. · ตรวจสาเหตุ",     ic:"clock" },
            { sev:"low", n:"กาญจนา ใจดี",      b:"Chidlom",  delta:"–฿1,400", pct:"–8%",  r:"เริ่มงาน 8 พ.ค. (ไม่เต็มเดือน)", ic:"calendar" },
          ].map((v, i) => {
            const Glyph = I[v.ic];
            return (
              <div key={i} style={{padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"36px 1.5fr 1fr 1.5fr 100px", gap: 12, alignItems:"center"}}>
                <div style={{width: 34, height: 34, borderRadius: 9, background: v.sev === "hi" ? "var(--color-danger-soft)" : v.sev === "mid" ? "var(--color-warning-soft)" : "var(--color-canvas-soft)", color: v.sev === "hi" ? "var(--color-danger)" : v.sev === "mid" ? "var(--color-warning)" : "var(--color-ink-soft)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                  <Glyph size={15}/>
                </div>
                <div>
                  <div style={{fontSize: 13, fontWeight: 600}}>{v.n}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-faint)"}}>{v.b}</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, color: v.delta.startsWith("+") ? "var(--color-accent)" : "var(--color-warning)"}}>{v.delta}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{v.pct} vs เม.ย.</div>
                </div>
                <div style={{fontSize: 12, color:"var(--color-ink-soft)"}}>{v.r}</div>
                <div className="humi-row" style={{gap: 6, justifyContent:"flex-end"}}>
                  <button className="humi-button humi-button--ghost" style={{padding:"4px 10px", fontSize: 11, minHeight: 28}}>ดู</button>
                  <button className="humi-button humi-button--primary" style={{padding:"4px 10px", fontSize: 11, minHeight: 28}}>ผ่าน</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary by BU */}
        <div className="humi-card">
          <h3 className="humi-section-title">สรุปตามหน่วยธุรกิจ</h3>
          <div className="humi-section-sub">รอบ พ.ค. 2568 · ฿58.4M รวม</div>
          <div style={{marginTop: 16}}>
            {[
              ["Central Pattana",   18.4, 0.46, "var(--color-accent)"],
              ["Central Restaurants", 12.8, 0.32, "var(--color-sage)"],
              ["Central Department",  9.6, 0.24, "var(--color-butter)"],
              ["Tops Supermarket",    7.8, 0.20, "var(--color-info)"],
              ["Other BUs",           9.8, 0.25, "var(--color-warning)"],
            ].map(([n, m, p, c]) => (
              <div key={n} style={{padding:"12px 0", borderBottom:"1px solid var(--color-hairline-soft)"}}>
                <div className="humi-row" style={{marginBottom: 6}}>
                  <div style={{width: 6, height: 22, borderRadius: 3, background: c}}/>
                  <div style={{fontSize: 13, fontWeight: 500, marginLeft: 4}}>{n}</div>
                  <span className="humi-spacer"/>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>฿{m}M</div>
                </div>
                <div style={{height: 4, background:"var(--color-hairline-soft)", borderRadius: 99, marginLeft: 14}}>
                  <div style={{width: (p/0.46*100)+"%", height:"100%", background: c, borderRadius: 99}}/>
                </div>
              </div>
            ))}
          </div>
          <hr className="humi-divider"/>
          <div className="humi-row">
            <span style={{fontSize: 13, fontWeight: 600}}>เทียบงวดก่อน</span>
            <span className="humi-spacer"/>
            <span className="humi-tag humi-tag--accent">+ ฿1.84M · +3.2%</span>
          </div>
        </div>
      </div>

      {/* Bank batch preview */}
      <div className="humi-card" style={{marginTop: 20, padding: 20, background:"var(--color-ink)", color:"var(--color-canvas-soft)", overflow:"hidden", position:"relative"}}>
        <div className="humi-blob humi-blob--teal" style={{width: 100, height: 130, right: -30, top: -40, opacity: 0.3}}/>
        <div className="humi-row">
          <div style={{flex: 1}}>
            <div style={{fontSize: 11, color:"var(--color-accent)", letterSpacing:".14em", textTransform:"uppercase", fontWeight: 600}}>ไฟล์ที่จะส่งธนาคาร</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 22, marginTop: 8, fontWeight: 600, color:"var(--color-canvas-soft)"}}>PAYROLL-202505.txt · 2,847 transactions</h3>
            <div style={{fontSize: 13, color:"rgba(231,227,216,0.7)", marginTop: 6}}>กรุงเทพฯ 1,842 · กสิกร 612 · ไทยพาณิชย์ 393 · รวม ฿58,418,200 · กำหนดโอน 25 พ.ค. 06:00</div>
          </div>
          <button className="humi-button humi-button--ghost" style={{background:"transparent", borderColor:"rgba(231,227,216,0.3)", color:"var(--color-canvas-soft)"}}><I.eye size={14}/> Preview</button>
          <button className="humi-button humi-button--primary" style={{marginLeft: 10}}>เผยแพร่ · ส่งไฟล์</button>
        </div>
      </div>
    </div>
  );
}
window.PR_Admin = PR_Admin;
