// ============= MODULE 2: BENEFIT CLAIMED =============

// 2A · EMPLOYEE — เบิกสวัสดิการ
function BN_Employee() {
  const I = window.PI;
  const wallets = [
    { ic:"hospital", l:"ค่ารักษาพยาบาล", used: 8400,  total: 30000, c:"var(--color-accent)" },
    { ic:"tooth",    l:"ทันตกรรม",      used: 2000,  total: 4000,  c:"var(--color-sage)" },
    { ic:"glasses",  l:"แว่นตา",        used: 0,     total: 3500,  c:"var(--color-info)" },
    { ic:"baby",     l:"คลอดบุตร",      used: 0,     total: 15000, c:"var(--color-butter)" },
  ];
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Benefit Claimed · มุมพนักงาน"
        title="สวัสดิการของฉัน"
        subtitle="วงเงินคงเหลือปี 2568 · ใช้ไปแล้ว 10,400 บาท จากทั้งหมด 52,500 บาท"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.fileText size={14}/> ประวัติเบิก</button>
          <button className="humi-button humi-button--primary"><I.plus size={14}/> เบิกใหม่</button>
        </>}/>

      {/* Wallets */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 24}}>
        {wallets.map(b => {
          const Glyph = I[b.ic];
          const pct = b.used / b.total * 100;
          return (
            <div key={b.l} className="humi-card" style={{padding: 18}}>
              <div className="humi-row" style={{marginBottom: 10}}>
                <div style={{width: 36, height: 36, borderRadius: 9, background:"var(--color-canvas-soft)", color: b.c, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={18}/></div>
                <span className="humi-spacer"/>
                <span style={{fontSize: 11, color:"var(--color-ink-muted)", fontWeight: 600}}>{Math.round(pct)}%</span>
              </div>
              <div className="humi-eyebrow" style={{fontSize: 10}}>{b.l}</div>
              <div style={{display:"flex", alignItems:"baseline", gap: 6, marginTop: 4}}>
                <span style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700}}>฿{b.used.toLocaleString()}</span>
                <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>/ ฿{b.total.toLocaleString()}</span>
              </div>
              <div style={{height: 6, background:"var(--color-hairline-soft)", borderRadius: 99, marginTop: 12, overflow:"hidden"}}>
                <div style={{width: pct + "%", height:"100%", background: b.c, borderRadius: 99}}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
        {/* Active claims */}
        <div>
          <div className="humi-row" style={{marginBottom: 14}}>
            <h3 className="humi-section-title">คำเบิกของฉัน</h3>
            <span className="humi-spacer"/>
            <window.SegTabs active="active" tabs={[
              {id:"active", label:"กำลังดำเนินการ", count: 2},
              {id:"approved", label:"อนุมัติแล้ว", count: 11},
              {id:"rejected", label:"ตีกลับ", count: 1},
            ]}/>
          </div>

          {[
            { c:"CLM-09921", t:"ค่ารักษา · รพ.บำรุงราษฎร์", a:1840, dt:"ยื่นเมื่อ 2 ชม.ก่อน", status:"SPD ตรวจใบเสร็จ", step: 2 },
            { c:"CLM-09908", t:"ทันตกรรม · คลินิกฟันใส",    a:1200, dt:"ยื่นเมื่อวาน",         status:"ผู้จัดการอนุมัติแล้ว", step: 3 },
          ].map(c => (
            <div key={c.c} className="humi-card" style={{padding: 18, marginBottom: 12}}>
              <div className="humi-row" style={{marginBottom: 14, alignItems:"flex-start"}}>
                <div>
                  <span style={{fontFamily:"ui-monospace, monospace", fontSize: 11, color:"var(--color-ink-muted)", fontWeight: 600}}>{c.c}</span>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 600, marginTop: 3}}>{c.t}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{c.dt}</div>
                </div>
                <span className="humi-spacer"/>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700}}>฿{c.a.toLocaleString()}</div>
                  <span className="humi-tag humi-tag--butter" style={{marginTop: 4}}>{c.status}</span>
                </div>
              </div>

              <div className="humi-row" style={{gap: 0}}>
                {["ยื่น","ตรวจ","ผจก.","Admin","จ่ายเงิน"].map((s, i) => {
                  const done = i < c.step;
                  const active = i === c.step;
                  return (
                    <React.Fragment key={s}>
                      <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 4, flex:"0 0 auto"}}>
                        <div style={{width: 22, height: 22, borderRadius:"50%", background: done ? "var(--color-accent)" : "var(--color-surface)", border: active ? "2px solid var(--color-warning)" : "1px solid var(--color-hairline)", color: done ? "#fff" : "var(--color-ink-muted)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 700}}>
                          {done ? <I.check size={11}/> : i + 1}
                        </div>
                        <span style={{fontSize: 11, fontWeight: 500, color: active ? "var(--color-warning)" : done ? "var(--color-ink-soft)" : "var(--color-ink-muted)"}}>{s}</span>
                      </div>
                      {i < 4 && <div style={{flex: 1, height: 1, background: i < c.step - 1 ? "var(--color-accent)" : "var(--color-hairline)", marginTop: -14}}/>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="humi-col" style={{gap: 16}}>
          <div className="humi-card humi-grain" style={{overflow:"hidden", position:"relative"}}>
            <div className="humi-blob humi-blob--teal" style={{width: 100, height: 130, right: -30, top: -30, opacity: 0.4}}/>
            <div className="humi-eyebrow">เริ่มเบิกใหม่</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, marginTop: 6, fontWeight: 600}}>เลือกประเภท</h3>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10, marginTop: 14}}>
              {[
                {ic:"hospital", l:"ค่ารักษา"},
                {ic:"tooth", l:"ทันตกรรม"},
                {ic:"glasses", l:"แว่นตา"},
                {ic:"baby", l:"คลอดบุตร"},
                {ic:"pill", l:"ค่ายา"},
                {ic:"more", l:"อื่นๆ"},
              ].map(q => {
                const Glyph = I[q.ic];
                return (
                  <button key={q.l} style={{padding: 14, border:"1px solid var(--color-hairline)", borderRadius: 12, background:"var(--color-surface)", display:"flex", flexDirection:"column", alignItems:"center", gap: 6, cursor:"pointer", fontFamily:"inherit"}}>
                    <div style={{width: 36, height: 36, borderRadius: 9, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={18}/></div>
                    <span style={{fontSize: 12, fontWeight: 600}}>{q.l}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="humi-card humi-card--cream">
            <div className="humi-eyebrow">รู้หรือไม่</div>
            <div style={{fontSize: 14, marginTop: 6, lineHeight: 1.55, color:"var(--color-ink-soft)"}}>
              ใบเสร็จต้องไม่เก่ากว่า <b>90 วัน</b> และมีลายเซ็นแพทย์ · ถ่ายให้ครบหน้าเอกสารพร้อมเลขใบรับรอง
            </div>
            <a style={{color:"var(--color-accent)", fontSize: 13, fontWeight: 600, marginTop: 10, display:"inline-block"}}>อ่านคู่มือฉบับเต็ม →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
window.BN_Employee = BN_Employee;
