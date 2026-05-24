// ============================================================================
// mod-workforce.jsx — Priority 2: retail-specific journeys
//   • Roster_Manager        — weekly schedule builder (Manager)
//   • ShiftSwap_Manager     — approve shift swap requests
//   • Asset_Admin           — inventory + assignments (uniforms, laptops, badges)
// ============================================================================

// ===== 1) ROSTER BUILDER — weekly grid ======================================

function Roster_Manager() {
  const I = window.PI;
  const [week, setWeek] = React.useState("26 พ.ค. – 1 มิ.ย. 2569");

  // Shift palette
  const SHIFTS = {
    M:  { bg:"#D6EEEC",  fg:"#0A6E68", l:"เช้า",   t:"08:00 – 17:00", color:"var(--color-accent)" },
    A:  { bg:"#FEF3C7",  fg:"#92660C", l:"บ่าย",   t:"14:00 – 23:00", color:"var(--color-warning)" },
    N:  { bg:"#E1E4FB",  fg:"#3F4AAB", l:"ดึก",    t:"22:00 – 07:00", color:"var(--color-info)" },
    O:  { bg:"var(--color-canvas)", fg:"var(--color-ink-faint)", l:"หยุด", t:"Off",       color:"var(--color-ink-faint)" },
    L:  { bg:"#FFE4E1",  fg:"#9A3412", l:"ลา",     t:"On leave",     color:"var(--color-danger)" },
    "":  null,
  };

  // Team roster — 7 employees × 7 days
  const TEAM = [
    { n:"อาทิตย์ ชื่นบาน",   r:"Store Manager",        ini:"AC", c:"sage",   hrs: 45, days:["M","M","M","M","M","O","O"], avail:"full" },
    { n:"เบน คิม",            r:"Senior Cashier",       ini:"BK", c:"teal",   hrs: 40, days:["M","M","O","A","A","A","O"], avail:"full" },
    { n:"เจสซิก้า ศรี",        r:"Senior · Buddy",       ini:"JS", c:"coral",  hrs: 36, days:["M","M","M","O","M","O","O"], avail:"full" },
    { n:"พริยะ ชาห์",         r:"Cashier · Senior",     ini:"PS", c:"butter", hrs: 48, days:["A","A","A","M","M","M","O"], avail:"full" },
    { n:"ทารา ซัลลิแวน",      r:"Cashier",              ini:"TS", c:"teal",   hrs: 36, days:["A","A","O","O","A","A","M"], avail:"limited", note:"จันทร์-อังคารเรียน" },
    { n:"มายา พาเทล",         r:"Cashier · part-time",  ini:"MP", c:"sage",   hrs: 24, days:["","","","M","M","A","A"], avail:"part" },
    { n:"ภานุพงศ์ ศรีวิชัย",   r:"Cashier · ใหม่",       ini:"PS", c:"coral",  hrs: 40, days:["M","M","M","M","M","O","O"], avail:"new", note:"Onboarding · ต้อง shadow" },
  ];

  const DOW = ["จ. 26", "อ. 27", "พ. 28", "พฤ. 29", "ศ. 30", "ส. 31", "อา. 1"];

  // Coverage per day
  const cover = DOW.map((_, di) => {
    const cnt = { M: 0, A: 0, N: 0 };
    TEAM.forEach(t => { const s = t.days[di]; if (cnt[s] !== undefined) cnt[s]++; });
    return cnt;
  });
  const targets = { M: 4, A: 3, N: 0 };

  const totalHours = TEAM.reduce((s,t) => s + t.hrs, 0);
  const targetHours = 280;

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Head */}
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">Workforce · Schedule</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>กะการทำงาน · Central World</h1>
          <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>7 คน · ร่างกะแล้วยังไม่ประกาศ · ส่งให้ทีมรับทราบก่อน 25 พ.ค.</p>
        </div>
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <button style={ws_btnGhost}><I.chevL size={14}/></button>
          <span style={{padding:"8px 14px", background:"var(--color-surface)", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)", fontSize: 13, fontWeight: 600}}>{week}</span>
          <button style={ws_btnGhost}><I.chevR size={14}/></button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 18}}>
        <ws_Kpi label="ชั่วโมงรวม" value={totalHours + "h"} sub={`เป้า ${targetHours}h · เหลือ ${targetHours - totalHours}h`} accent={totalHours <= targetHours}/>
        <ws_Kpi label="ค่าแรงประมาณ" value="฿58,400" sub="incl. OT ฿2,800"/>
        <ws_Kpi label="ครอบคลุมกะเช้า" value="100%" sub="4/4 ทุกวัน" color="var(--color-success)"/>
        <ws_Kpi label="ครอบคลุมกะบ่าย" value="71%" sub="ขาด 2 ช่อง (พ-พฤ)" color="var(--color-warning)"/>
      </div>

      {/* Toolbar */}
      <div style={{display:"flex", gap: 10, marginBottom: 12, flexWrap:"wrap"}}>
        <button style={ws_btnPrim}><I.send size={14}/> ประกาศกะ + แจ้งทีม</button>
        <button style={ws_btnGhost}><I.copy size={14}/> Copy from last week</button>
        <button style={ws_btnGhost}><I.refresh size={14}/> Auto-fill (จากความต้องการ)</button>
        <button style={ws_btnGhost}><I.warn size={14}/> ตรวจ conflicts</button>
        <div style={{flex: 1}}/>
        <div style={{display:"flex", alignItems:"center", gap: 8, padding:"6px 12px", background:"var(--color-surface)", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)", fontSize: 12}}>
          {Object.entries(SHIFTS).filter(([k]) => k && SHIFTS[k]).slice(0, 5).map(([k, s]) => (
            <span key={k} style={{display:"inline-flex", alignItems:"center", gap: 4, marginRight: 6}}>
              <span style={{width: 14, height: 14, borderRadius: 4, background: s.bg, color: s.fg, fontSize: 10, fontWeight: 700, display:"inline-flex", alignItems:"center", justifyContent:"center"}}>{k}</span>
              <span style={{color:"var(--color-ink-muted)"}}>{s.l}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"260px repeat(7, 1fr) 90px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
          <div style={{padding:"12px 16px"}}>พนักงาน</div>
          {DOW.map(d => <div key={d} style={{padding:"12px 8px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)"}}>{d}</div>)}
          <div style={{padding:"12px 8px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)"}}>ชั่วโมง</div>
        </div>

        {TEAM.map((t, ri) => (
          <div key={t.n} style={{display:"grid", gridTemplateColumns:"260px repeat(7, 1fr) 90px", borderTop: "1px solid var(--color-hairline-soft)", alignItems:"stretch"}}>
            <div style={{padding:"12px 16px", display:"flex", alignItems:"center", gap: 10, minWidth: 0}}>
              <div className={"humi-avatar humi-avatar--" + t.c} style={{width: 32, height: 32, fontSize: 11, flexShrink: 0}}>{t.ini}</div>
              <div style={{minWidth: 0, flex: 1}}>
                <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.n}</div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.r}</div>
                {t.note && <div style={{fontSize: 10, color:"var(--color-warning)", fontWeight: 600, marginTop: 2}}><I.warn size={10}/> {t.note}</div>}
              </div>
            </div>
            {t.days.map((s, di) => {
              const shift = SHIFTS[s];
              return (
                <div key={di} style={{borderLeft:"1px solid var(--color-hairline-soft)", padding: 6, display:"flex", alignItems:"center", justifyContent:"center", minHeight: 60}}>
                  {shift ? (
                    <div style={{width:"100%", height: 48, background: shift.bg, color: shift.fg, borderRadius: 8, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", border:"1px solid transparent", lineHeight: 1.1}}>
                      <span style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing:"-0.01em"}}>{s}</span>
                      <span style={{fontSize: 9, fontWeight: 600, opacity: 0.85, marginTop: 1}}>{shift.t.split(" – ")[0]}</span>
                    </div>
                  ) : (
                    <button style={{width:"100%", height: 48, background:"transparent", border:"1px dashed var(--color-hairline)", borderRadius: 8, color:"var(--color-ink-faint)", fontSize: 16, cursor:"pointer", fontFamily:"inherit"}}>＋</button>
                  )}
                </div>
              );
            })}
            <div style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"12px 8px", textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <span style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, color:"var(--color-ink)", letterSpacing:"-0.015em"}}>{t.hrs}</span>
              <span style={{fontSize: 10, color:"var(--color-ink-muted)", marginTop: 2}}>{t.avail === "part" ? "part-time" : "ของ 40"}</span>
            </div>
          </div>
        ))}

        {/* Coverage footer */}
        <div style={{display:"grid", gridTemplateColumns:"260px repeat(7, 1fr) 90px", borderTop: "2px solid var(--color-hairline)", background:"var(--color-canvas-soft)"}}>
          <div style={{padding:"10px 16px", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em", display:"flex", alignItems:"center"}}>Coverage</div>
          {DOW.map((_, di) => {
            const c = cover[di];
            const ok = c.M >= targets.M && c.A >= targets.A;
            return (
              <div key={di} style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"8px 6px", textAlign:"center", fontSize: 10, color:"var(--color-ink-soft)", lineHeight: 1.4}}>
                <div style={{color: c.M >= targets.M ? "var(--color-success)" : "var(--color-warning)"}}>M {c.M}/{targets.M}</div>
                <div style={{color: c.A >= targets.A ? "var(--color-success)" : "var(--color-warning)"}}>A {c.A}/{targets.A}</div>
                <span style={{display:"inline-block", marginTop: 2, width: 6, height: 6, borderRadius: 99, background: ok ? "var(--color-success)" : "var(--color-warning)"}}/>
              </div>
            );
          })}
          <div style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"10px 8px", textAlign:"center", fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700}}>{totalHours}h</div>
        </div>
      </div>

      {/* Conflicts panel */}
      <div className="humi-card" style={{marginTop: 18, padding: 18}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
          <h3 className="humi-section-title">Conflicts + คำเตือน · 3 ข้อ</h3>
          <button style={ws_btnGhost}>แก้ไขทั้งหมด</button>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap: 8}}>
          {[
            { st:"warn", l:"ครอบคลุมกะบ่ายขาด 2 ช่อง (พ-พฤ)", sub:"เป้า 3 คน แต่ขณะนี้มี 1 คน · กระทบ peak hour" },
            { st:"warn", l:"ภานุพงศ์ (ใหม่) จัดทำงานเดี่ยวกะบ่าย", sub:"ระเบียบ onboarding ต้องมี senior shadow ก่อน 30 วัน" },
            { st:"info", l:"พริยะ ชาห์ ทำ OT 8h ในสัปดาห์นี้", sub:"ใกล้ limit 12h/wk · ส่งคำขออนุมัติล่วงหน้า" },
          ].map((c, i) => {
            const cfg = c.st === "warn" ? { c:"var(--color-warning)", bg:"var(--color-warning-soft)" } : { c:"var(--color-info)", bg:"var(--color-info-soft)" };
            return (
              <div key={i} style={{display:"flex", alignItems:"flex-start", gap: 12, padding: 12, background: cfg.bg, borderRadius:"var(--radius-md)"}}>
                <span style={{width: 26, height: 26, borderRadius: 99, background:"var(--color-surface)", color: cfg.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}><I.warn size={12}/></span>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{c.l}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-soft)", marginTop: 2}}>{c.sub}</div>
                </div>
                <button style={{...ws_btnGhost, padding:"4px 10px", minHeight: 28, fontSize: 11}}>แก้</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== 2) SHIFT SWAP — Manager approval ====================================

function ShiftSwap_Manager() {
  const I = window.PI;
  const [selected, setSelected] = React.useState("SW-1042");

  const QUEUE = [
    { id:"SW-1042", a:{n:"เบน คิม", ini:"BK", c:"teal"}, b:{n:"มายา พาเทล", ini:"MP", c:"sage"}, date:"พ. 28 พ.ค.", shifts:["A · 14:00-23:00", "M · 08:00-17:00"], submit:"2 ชม.ที่แล้ว", st:"pending", reason:"นัดหมอตอนเช้า", impact:"ok" },
    { id:"SW-1041", a:{n:"ทารา ซัลลิแวน", ini:"TS", c:"teal"}, b:{n:"พริยะ ชาห์", ini:"PS", c:"butter"}, date:"พฤ. 29 พ.ค.", shifts:["M · 08-17", "M · 08-17"], submit:"5 ชม.ที่แล้ว", st:"pending", reason:"ส่วนตัว", impact:"warn", impactNote:"ทั้งคู่กะเช้า — ไม่ใช่ swap แต่เป็น cover" },
    { id:"SW-1040", a:{n:"เจสซิก้า ศรี", ini:"JS", c:"coral"}, b:{n:"เบน คิม", ini:"BK", c:"teal"}, date:"จ. 26 พ.ค.", shifts:["M · 08-17", "O · Off"], submit:"เมื่อวาน", st:"approved", reason:"งานครอบครัว", impact:"ok" },
  ];
  const cur = QUEUE.find(q => q.id === selected) || QUEUE[0];

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">กล่องงาน · ขอสลับกะ</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>คำขอสลับกะ · Central World</h1>
        </div>
        <span className="humi-tag humi-tag--coral" style={{padding:"6px 14px", fontWeight: 600}}><I.warn size={13}/> 2 รออนุมัติ</span>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"340px 1fr", gap: 16}}>
        {/* Queue */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding:"14px 16px", borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <h3 className="humi-section-title">3 คำขอ</h3>
          </div>
          {QUEUE.map(q => {
            const active = q.id === selected;
            return (
              <button key={q.id} onClick={() => setSelected(q.id)} style={{
                display:"block", width:"100%", textAlign:"left",
                padding:"14px 16px", background: active ? "var(--color-accent-soft)" : "var(--color-surface)",
                border: 0, borderTop:"1px solid var(--color-hairline-soft)", borderLeft: active ? "3px solid var(--color-accent)" : "3px solid transparent",
                cursor:"pointer", fontFamily:"inherit",
              }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 6}}>
                  <span style={{fontFamily:"monospace", fontSize: 11, color:"var(--color-ink-muted)"}}>{q.id}</span>
                  {q.st === "pending" ? (
                    <span className="humi-tag humi-tag--coral" style={{padding:"2px 8px", fontSize: 10}}>รออนุมัติ</span>
                  ) : (
                    <span style={{padding:"2px 8px", fontSize: 10, fontWeight: 600, borderRadius: 99, background:"var(--color-success-soft)", color:"var(--color-success)"}}>อนุมัติ</span>
                  )}
                </div>
                <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 6}}>
                  <div className={"humi-avatar humi-avatar--" + q.a.c} style={{width: 22, height: 22, fontSize: 10}}>{q.a.ini}</div>
                  <I.arrowR size={12} style={{color:"var(--color-ink-faint)"}}/>
                  <div className={"humi-avatar humi-avatar--" + q.b.c} style={{width: 22, height: 22, fontSize: 10}}>{q.b.ini}</div>
                  <span style={{fontSize: 12, color:"var(--color-ink-soft)", marginLeft: 4}}>{q.a.n.split(" ")[0]} ↔ {q.b.n.split(" ")[0]}</span>
                </div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{q.date} · {q.submit}</div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          {/* Swap diagram */}
          <div className="humi-card">
            <h3 className="humi-section-title">{cur.id} · ขอสลับกะ {cur.date}</h3>
            <div style={{display:"grid", gridTemplateColumns:"1fr 60px 1fr", gap: 14, marginTop: 16, alignItems:"center"}}>
              <ws_PersonShift person={cur.a} shift={cur.shifts[0]} label="ขอย้ายไป"/>
              <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{width: 44, height: 44, borderRadius: 99, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                  <I.refresh size={20}/>
                </div>
              </div>
              <ws_PersonShift person={cur.b} shift={cur.shifts[1]} label="ขอรับแทน"/>
            </div>
            <div style={{marginTop: 14, padding: 14, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", borderLeft:"3px solid var(--color-accent)", fontSize: 13, color:"var(--color-ink-soft)", lineHeight: 1.6, fontStyle:"italic"}}>
              "{cur.reason}" — {cur.a.n}
            </div>
          </div>

          {/* Impact check */}
          <div className="humi-card">
            <h3 className="humi-section-title">ตรวจผลกระทบอัตโนมัติ</h3>
            <div style={{display:"flex", flexDirection:"column", gap: 10, marginTop: 12}}>
              <ws_ImpactRow ok l="ไม่ทำให้กะเช้าขาดคน" sub="หลังสลับยังครบ 4 คน ตามเป้า"/>
              <ws_ImpactRow ok l="ทั้งคู่ตกลงสลับกัน" sub={cur.b.n + " ตอบรับแล้ว 1 ชม.ที่แล้ว"}/>
              <ws_ImpactRow ok l="ไม่ละเมิดข้อกำหนดพักระหว่างกะ" sub="ห่างกัน > 9 ชม. ตามกฎหมาย"/>
              {cur.impact === "warn" ? (
                <ws_ImpactRow warn l="ทั้งสองกะเป็นเวลาเดียวกัน — ไม่ใช่ swap แต่เป็น cover" sub={cur.impactNote}/>
              ) : (
                <ws_ImpactRow ok l="ชั่วโมงรวมสัปดาห์ของทั้งคู่ไม่เกิน limit" sub="A: 40h → 40h · B: 36h → 36h"/>
              )}
              <ws_ImpactRow ok l="ไม่กระทบงาน OT ที่ approved ไว้" sub="ไม่มี OT ในวันนี้"/>
            </div>
          </div>

          {/* Action */}
          <div style={{padding:"16px 22px", background:"var(--color-surface)", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", display:"flex", alignItems:"center", justifyContent:"space-between", gap: 16, flexWrap:"wrap"}}>
            <div style={{display:"flex", alignItems:"center", gap: 10}}>
              <I.check size={16} style={{color:"var(--color-success)"}}/>
              <span style={{fontSize: 13, color:"var(--color-ink-soft)"}}>ไม่มีผลกระทบรุนแรง · พร้อมอนุมัติ</span>
            </div>
            <div style={{display:"flex", gap: 10}}>
              <button className="humi-button humi-button--ghost"><I.x size={14}/> ปฏิเสธ</button>
              <button className="humi-button humi-button--primary"><I.check size={14}/> อนุมัติสลับกะ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ws_PersonShift({ person, shift, label }) {
  return (
    <div style={{padding: 18, background:"var(--color-canvas-soft)", borderRadius:"var(--radius-md)", border:"1px solid var(--color-hairline-soft)", textAlign:"center"}}>
      <div className={"humi-avatar humi-avatar--" + person.c} style={{width: 48, height: 48, fontSize: 16, margin:"0 auto 10px"}}>{person.ini}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 600, color:"var(--color-ink)"}}>{person.n}</div>
      <div className="humi-eyebrow" style={{marginTop: 10, fontSize: 9}}>{label}</div>
      <div style={{marginTop: 4, padding:"6px 12px", background:"var(--color-surface)", borderRadius: 8, fontSize: 12, fontWeight: 600, color:"var(--color-ink)", display:"inline-block"}}>{shift}</div>
    </div>
  );
}

function ws_ImpactRow({ ok, warn, l, sub }) {
  const I = window.PI;
  const cfg = warn ? { c:"var(--color-warning)", bg:"var(--color-warning-soft)", ic:"warn" } : { c:"var(--color-success)", bg:"var(--color-success-soft)", ic:"check" };
  const Glyph = I[cfg.ic];
  return (
    <div style={{display:"flex", alignItems:"flex-start", gap: 12, padding: 10}}>
      <span style={{width: 24, height: 24, borderRadius: 99, background: cfg.bg, color: cfg.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0, marginTop: 1}}><Glyph size={12}/></span>
      <div>
        <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{l}</div>
        <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{sub}</div>
      </div>
    </div>
  );
}

// ===== 3) ASSET MANAGEMENT — Admin ==========================================

function Asset_Admin() {
  const I = window.PI;
  const [tab, setTab] = React.useState("assignments");

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 22, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">Asset Management</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>อุปกรณ์และเครื่องแบบ</h1>
          <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>จัดการสต็อก เครื่องแบบ และอุปกรณ์ IT ทั้งหมด</p>
        </div>
        <div style={{display:"flex", gap: 10}}>
          <button style={ws_btnGhost}><I.download size={14}/> ส่งออก CSV</button>
          <button style={ws_btnPrim}><I.plus size={14}/> เพิ่มของในสต็อก</button>
        </div>
      </div>

      {/* KPI */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 14, marginBottom: 18}}>
        <ws_Kpi label="ของในสต็อก"        value="3,420" sub="11 ประเภท"/>
        <ws_Kpi label="แจกไปแล้ว"          value="2,847" sub="83% utilization"/>
        <ws_Kpi label="คำขอใหม่"           value="18"    sub="รอ approve" color="var(--color-warning)"/>
        <ws_Kpi label="ของเหลือน้อย"       value="3 sku" sub="ต้องสั่งซื้อ"   color="var(--color-danger)"/>
        <ws_Kpi label="ของรอคืน"            value="42"    sub="จากคนออก"/>
      </div>

      {/* Tabs */}
      <div style={{display:"flex", gap: 4, marginBottom: 14, borderBottom:"1px solid var(--color-hairline)"}}>
        {[
          ["assignments","ของที่แจกออก","users","2,847"],
          ["catalog","Catalog · สต็อก","layers","11"],
          ["requests","คำขอใหม่","inbox","18"],
          ["returns","รอคืน","refresh","42"],
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

      {tab === "catalog"     && <Asset_Catalog/>}
      {tab === "assignments" && <Asset_Assignments/>}
      {tab === "requests"    && <Asset_Requests/>}
      {tab === "returns"     && <Asset_Returns/>}
    </div>
  );
}

function Asset_Catalog() {
  const ITEMS = [
    { cat:"เครื่องแบบ",        ic:"shield",  items:[
      { n:"เสื้อพนักงาน", sku:"UN-SHIRT-01", sizes:"XS-XXL", stock: 1250, out: 1180, low: false },
      { n:"กางเกง / กระโปรง", sku:"UN-PANTS-01", sizes:"XS-XXL", stock: 980, out: 920, low: false },
      { n:"รองเท้ากันลื่น", sku:"UN-SHOES-01", sizes:"35-44", stock: 18, out: 460, low: true },
      { n:"ผ้าพันคอ / Tie",   sku:"UN-TIE-01",   sizes:"One size", stock: 220, out: 195, low: false },
    ]},
    { cat:"อุปกรณ์ IT",         ic:"plug",    items:[
      { n:"Laptop · Dell Latitude 5430", sku:"IT-LAP-01", sizes:"—", stock: 5, out: 380, low: true },
      { n:"คีย์บอร์ด + เมาส์",            sku:"IT-KB-01",  sizes:"—", stock: 42, out: 220, low: false },
      { n:"Headset",                      sku:"IT-HS-01",  sizes:"—", stock: 28, out: 145, low: false },
    ]},
    { cat:"Badge + ID",         ic:"shield",  items:[
      { n:"บัตรพนักงาน",      sku:"ID-BADGE-01", sizes:"—", stock: 850, out: 2847, low: false },
      { n:"บัตรจอดรถ",        sku:"ID-PARK-01",  sizes:"—", stock: 320, out: 1240, low: false },
      { n:"ลูกกุญแจล็อกเกอร์", sku:"ID-LOCK-01", sizes:"—", stock: 4,   out: 1180, low: true },
    ]},
  ];
  const I = window.PI;
  return (
    <div style={{display:"flex", flexDirection:"column", gap: 14}}>
      {ITEMS.map(g => {
        const Glyph = I[g.ic] || I.layers;
        return (
          <div key={g.cat} className="humi-card" style={{padding: 0}}>
            <div style={{padding:"16px 20px", borderBottom:"1px solid var(--color-hairline-soft)", display:"flex", alignItems:"center", gap: 10}}>
              <div style={{width: 32, height: 32, borderRadius: 10, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={15}/></div>
              <h3 className="humi-section-title">{g.cat}</h3>
              <span style={{marginLeft:"auto", fontSize: 12, color:"var(--color-ink-muted)"}}>{g.items.length} รายการ</span>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px", padding:"10px 20px", background:"var(--color-canvas-soft)", fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
              <div>ของ</div><div>SKU</div><div>ขนาด</div><div>สต็อก</div><div>แจกไป</div><div style={{textAlign:"right"}}>Action</div>
            </div>
            {g.items.map((it, i) => (
              <div key={it.sku} style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px", padding:"14px 20px", borderTop:"1px solid var(--color-hairline-soft)", alignItems:"center", fontSize: 13}}>
                <div style={{fontWeight: 600, color:"var(--color-ink)"}}>{it.n}</div>
                <div style={{fontFamily:"monospace", fontSize: 11, color:"var(--color-ink-muted)"}}>{it.sku}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-soft)"}}>{it.sizes}</div>
                <div style={{display:"flex", alignItems:"center", gap: 6}}>
                  <span style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, color: it.low ? "var(--color-danger)" : "var(--color-ink)"}}>{it.stock}</span>
                  {it.low && <span className="humi-tag" style={{padding:"2px 6px", fontSize: 9, background:"var(--color-danger-soft)", color:"#9A3412"}}>ต่ำ</span>}
                </div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{it.out} ชิ้น</div>
                <div style={{textAlign:"right"}}>
                  <button style={{...ws_btnGhost, padding:"4px 10px", minHeight: 28, fontSize: 11}}>{it.low ? "สั่งซื้อ" : "ดู"}</button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Asset_Assignments() {
  const I = window.PI;
  const ASS = [
    { who:"เบน คิม", ini:"BK", c:"teal", branch:"CTW", items: 5, value:"฿42,800", overdue: 0, last:"laptop 12 พ.ค." },
    { who:"พริยะ ชาห์", ini:"PS", c:"butter", branch:"CTW", items: 4, value:"฿2,400", overdue: 0, last:"เครื่องแบบ 2 พ.ค." },
    { who:"ทารา ซัลลิแวน", ini:"TS", c:"teal", branch:"CTW", items: 3, value:"฿1,800", overdue: 1, last:"รองเท้า 1 พ.ค.", overdueNote:"คืนช้า: ป้ายเก่า E-3120" },
    { who:"เจสซิก้า ศรี", ini:"JS", c:"coral", branch:"CTW", items: 5, value:"฿45,200", overdue: 0, last:"laptop 28 เม.ย." },
    { who:"ภานุพงศ์ ศรีวิชัย", ini:"PS", c:"coral", branch:"CTW", items: 2, value:"฿1,200", overdue: 0, last:"ยังไม่ได้รับ laptop" },
  ];
  return (
    <div className="humi-card" style={{padding: 0}}>
      <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 100px 110px 110px 1.5fr 90px", padding:"12px 20px", background:"var(--color-canvas-soft)", fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
        <div>พนักงาน</div><div>สาขา</div><div>จำนวน</div><div>มูลค่า</div><div>เกินกำหนด</div><div>ล่าสุด</div><div style={{textAlign:"right"}}>Action</div>
      </div>
      {ASS.map(a => (
        <div key={a.who} style={{display:"grid", gridTemplateColumns:"2fr 1fr 100px 110px 110px 1.5fr 90px", padding:"14px 20px", borderTop:"1px solid var(--color-hairline-soft)", alignItems:"center", fontSize: 13}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <div className={"humi-avatar humi-avatar--" + a.c} style={{width: 32, height: 32, fontSize: 11}}>{a.ini}</div>
            <span style={{fontWeight: 600, color:"var(--color-ink)"}}>{a.who}</span>
          </div>
          <div style={{color:"var(--color-ink-muted)"}}>{a.branch}</div>
          <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700}}>{a.items}</div>
          <div style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 600, fontVariantNumeric:"tabular-nums"}}>{a.value}</div>
          <div>
            {a.overdue > 0 ? <span className="humi-tag humi-tag--coral" style={{padding:"2px 8px", fontSize: 11}}>{a.overdue} ค้าง</span> : <span style={{fontSize: 11, color:"var(--color-ink-faint)"}}>—</span>}
          </div>
          <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>
            {a.last}
            {a.overdueNote && <div style={{color:"var(--color-danger)", fontWeight: 600, marginTop: 2}}>{a.overdueNote}</div>}
          </div>
          <div style={{textAlign:"right"}}>
            <button style={{...ws_btnGhost, padding:"4px 10px", minHeight: 28, fontSize: 11}}>เปิด</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Asset_Requests() {
  const I = window.PI;
  const REQ = [
    { id:"AS-2502", who:"ภานุพงศ์ ศรีวิชัย", ini:"PS", c:"coral", branch:"CTW", item:"Laptop · Dell Latitude 5430", reason:"พนักงานใหม่ · เริ่มงาน 1 มิ.ย.", date:"วันนี้ 09:14", priority:"high" },
    { id:"AS-2501", who:"สมพร เจริญสุข",    ini:"SC", c:"butter", branch:"EVL", item:"เสื้อพนักงาน L × 2 ตัว",      reason:"เสื้อเก่าฉีก",                  date:"เมื่อวาน 14:22", priority:"normal" },
    { id:"AS-2500", who:"ดานา หลิว",         ini:"DL", c:"sage",   branch:"HQ",  item:"คีย์บอร์ด + เมาส์ wireless", reason:"ของเก่าพัง",                    date:"เมื่อวาน 11:05", priority:"normal" },
    { id:"AS-2499", who:"เกรซ หวง",          ini:"GH", c:"ink",    branch:"EMB", item:"รองเท้ากันลื่น size 39",     reason:"ของเก่าหมดสภาพ",                 date:"2 วันก่อน",      priority:"normal" },
  ];
  return (
    <div className="humi-card" style={{padding: 0}}>
      {REQ.map((r, i) => (
        <div key={r.id} style={{padding:"16px 20px", borderTop: i === 0 ? 0 : "1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"auto 1fr 1fr 110px 200px", gap: 16, alignItems:"center"}}>
          <div className={"humi-avatar humi-avatar--" + r.c} style={{width: 36, height: 36, fontSize: 12}}>{r.ini}</div>
          <div>
            <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{r.who} <span style={{color:"var(--color-ink-muted)", fontWeight: 500}}>· {r.branch}</span></div>
            <div style={{fontSize: 11, color:"var(--color-ink-muted)", fontFamily:"monospace", marginTop: 2}}>{r.id} · {r.date}</div>
          </div>
          <div>
            <div style={{fontSize: 13, fontWeight: 600, color:"var(--color-ink)"}}>{r.item}</div>
            <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2, lineHeight: 1.4}}>{r.reason}</div>
          </div>
          <div>
            {r.priority === "high" ? <span className="humi-tag humi-tag--coral" style={{padding:"3px 10px", fontWeight: 600}}>เร่งด่วน</span> : <span className="humi-tag humi-tag--cream" style={{padding:"3px 10px"}}>ปกติ</span>}
          </div>
          <div style={{display:"flex", gap: 6, justifyContent:"flex-end"}}>
            <button style={{...ws_btnGhost, padding:"6px 12px", minHeight: 32, fontSize: 12}}><I.x size={12}/> ปฏิเสธ</button>
            <button style={{...ws_btnPrim, padding:"6px 14px", minHeight: 32, fontSize: 12}}><I.check size={12}/> อนุมัติ + จ่าย</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Asset_Returns() {
  const I = window.PI;
  const RET = [
    { who:"เบน คิม", ini:"BK", c:"teal", reason:"ลาออก · วันสุดท้าย 15 พ.ค.", items: 4, status:"in-progress", due:"14 พ.ค." },
    { who:"เกรซ หวง", ini:"GH", c:"ink", reason:"ลาออก", items: 3, status:"in-progress", due:"22 พ.ค." },
    { who:"จอห์น สมิธ", ini:"JS", c:"butter", reason:"ลาออก", items: 6, status:"overdue", due:"10 พ.ค.", overdueDays: 14 },
  ];
  return (
    <div style={{display:"flex", flexDirection:"column", gap: 12}}>
      {RET.map(r => (
        <div key={r.who} className="humi-card" style={{padding: 18, display:"grid", gridTemplateColumns:"auto 1fr 1fr 160px 200px", gap: 16, alignItems:"center"}}>
          <div className={"humi-avatar humi-avatar--" + r.c} style={{width: 40, height: 40, fontSize: 13}}>{r.ini}</div>
          <div>
            <div style={{fontSize: 14, fontWeight: 600, color:"var(--color-ink)"}}>{r.who}</div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{r.reason}</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, color:"var(--color-ink)"}}>{r.items} <span style={{fontSize: 12, fontWeight: 500, color:"var(--color-ink-muted)"}}>ของรอคืน</span></div>
          </div>
          <div>
            <div className="humi-eyebrow" style={{fontSize: 9}}>กำหนดคืน</div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 600, marginTop: 2}}>{r.due}</div>
            {r.status === "overdue" && <div style={{fontSize: 11, color:"var(--color-danger)", fontWeight: 600, marginTop: 2}}>เกินกำหนด {r.overdueDays} วัน</div>}
          </div>
          <div style={{display:"flex", gap: 8, justifyContent:"flex-end"}}>
            <button style={{...ws_btnGhost, fontSize: 12}}>ดู checklist</button>
            <button style={{...ws_btnPrim, fontSize: 12}}><I.send size={12}/> เตือน</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== Shared atoms =========================================================

const ws_btnPrim = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6, padding:"9px 16px", background:"var(--color-accent)", color:"#fff", border: 0, borderRadius:"var(--radius-md)", fontFamily:"inherit", fontSize: 13, fontWeight: 600, cursor:"pointer", minHeight: 38 };
const ws_btnGhost = { ...ws_btnPrim, background:"var(--color-surface)", color:"var(--color-ink-soft)", border:"1px solid var(--color-hairline)" };

function ws_Kpi({ label, value, sub, color, accent }) {
  return (
    <div className="humi-card" style={{padding:"18px 22px"}}>
      <div className="humi-eyebrow">{label}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing:"-0.025em", color: color || (accent ? "var(--color-accent)" : "var(--color-ink)"), marginTop: 6, lineHeight: 1}}>{value}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 6}}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Roster_Manager, ShiftSwap_Manager, Asset_Admin });
