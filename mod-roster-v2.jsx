// mod-roster-v2.jsx — Enhanced Roster Builder
// Addresses feedback: "ลูกน้องอยู่คนละหน้า ต้องทำทีละคน"
//
// Three variants:
//   1. Roster_BulkSelect   — multi-cell selection + floating action bar + patterns
//   2. Roster_Regional     — Regional Manager: 3 stores · 20+ คน · one page
//
// Principles
// ─────────────
//   • Everyone visible at once (no drill-downs to assign)
//   • Bulk by default — single-cell edit is the fallback, not the path
//   • Pattern library lives WITH the grid (no popup)
//   • Conflicts surface inline, fix inline

// ════════════════════════════════════════════════════════════════════════
// 1) Roster_BulkSelect — Same team, bulk-first interactions
// ════════════════════════════════════════════════════════════════════════

function Roster_BulkSelect() {
  const I = window.PI;

  // Shift palette — same as v1 for consistency
  const SHIFTS = {
    M: { bg:"#D6EEEC", fg:"#0A6E68", l:"เช้า",  t:"08:00–17:00" },
    A: { bg:"#FEF3C7", fg:"#92660C", l:"บ่าย",  t:"14:00–23:00" },
    N: { bg:"#E1E4FB", fg:"#3F4AAB", l:"ดึก",   t:"22:00–07:00" },
    O: { bg:"#F6F1E8", fg:"#8A97A8", l:"หยุด",  t:"Off" },
    L: { bg:"#FFE4E1", fg:"#9A3412", l:"ลา",    t:"On leave" },
  };

  const TEAM = [
    { id:"E1832", n:"สมศักดิ์ ชยพันธ์",   r:"Store Manager",     ini:"สศ", c:"sage",   hrs:45, days:["M","M","M","M","M","O","O"] },
    { id:"E1719", n:"ณัฐกานต์ พรรณราย",   r:"Floor Supervisor",  ini:"ณก", c:"teal",   hrs:40, days:["M","M","O","A","A","A","O"] },
    { id:"E2204", n:"กฤษณ์ สิริวงศ์",     r:"PC-2 · Estée",       ini:"กษ", c:"coral",  hrs:36, days:["M","M","M","O","M","O","O"] },
    { id:"E3094", n:"ปริยา สุวรรณภูมิ",  r:"PC-3 · SK-II",       ini:"ปร", c:"butter", hrs:48, days:["A","A","A","M","M","M","O"] },
    { id:"E2451", n:"ศิรินภา ทองอ่อน",   r:"PC-3 · MAC",          ini:"ศน", c:"teal",   hrs:36, days:["A","A","O","O","A","A","M"] },
    { id:"E2854", n:"อัครเดช มากศรี",    r:"PC-2 · Sports",      ini:"อด", c:"sage",   hrs:24, days:["","","","M","M","A","A"] },
    { id:"E2789", n:"ธนากร พรหมจรรย์",   r:"Cashier · ใหม่",      ini:"ธก", c:"coral",  hrs:40, days:["M","M","M","M","M","O","O"], note:"Onboarding · ต้อง shadow" },
    { id:"E3058", n:"ธีระพงษ์ คงดี",      r:"PC-1 · B2S",          ini:"ธพ", c:"butter", hrs:32, days:["M","M","O","M","A","A","O"] },
  ];

  const DOW = ["จ. 18", "อ. 19", "พ. 20", "พฤ. 21", "ศ. 22", "ส. 23", "อา. 24"];

  // Demo selection state — show what bulk-select looks like
  // Selected cells: ปริยา + ศิรินภา + อัครเดช, days พ-พฤ (the gap days)
  const SELECTED = new Set([
    "E3094-2","E3094-3",
    "E2451-2","E2451-3",
    "E2854-2","E2854-3",
  ]);

  // Pattern library — applied to a whole row
  const PATTERNS = [
    { id:"5-2-morning",  label:"4 วัน เช้า + 2 หยุด",   ico:"☀", days:["M","M","M","M","O","O","M"], color:"#1FA8A0" },
    { id:"5-2-afternoon",label:"4 วัน บ่าย + 2 หยุด",   ico:"☼", days:["A","A","A","A","O","O","A"], color:"#F59E0B" },
    { id:"split-week",   label:"สลับ เช้า/บ่าย",         ico:"⟷", days:["M","A","M","A","M","O","O"], color:"#5B6CE0" },
    { id:"weekend-heavy",label:"เน้นเสาร์-อาทิตย์",      ico:"★", days:["O","O","M","M","M","M","M"], color:"#7DA084" },
  ];

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Header */}
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 18, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">Workforce · Schedule</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>กะการทำงาน · Central World</h1>
          <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>
            <b>ทุกคนในหน้าเดียว</b> · เลือกหลายช่อง ทำพร้อมกันได้ · ใช้ pattern เพื่อจัดทั้งสัปดาห์ใน 1 คลิก
          </p>
        </div>
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <button style={rv_btnGhost}><I.chevL size={14}/></button>
          <span style={{padding:"8px 14px", background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)", fontSize: 13, fontWeight: 600}}>18 – 24 พ.ค. 2569</span>
          <button style={rv_btnGhost}><I.chevR size={14}/></button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 16}}>
        <rv_Kpi label="ชั่วโมงรวม" value="301h" sub="เป้า 280h · เกิน 21h"     color="var(--color-warning)"/>
        <rv_Kpi label="ค่าแรงประมาณ" value="฿62,180" sub="incl. OT ฿4,200"/>
        <rv_Kpi label="ครอบคลุมกะเช้า" value="100%" sub="4+/วัน ทุกวัน"          color="var(--color-success)"/>
        <rv_Kpi label="ครอบคลุมกะบ่าย" value="57%" sub="ขาด 2 ช่อง (พ-พฤ) · ดูด้านล่าง" color="var(--color-warning)"/>
      </div>

      {/* Top tool bar */}
      <div style={{display:"flex", gap: 10, marginBottom: 12, flexWrap:"wrap", alignItems:"center"}}>
        <button style={rv_btnPrim}><I.send size={14}/> ประกาศกะ + แจ้งทีม</button>
        <button style={rv_btnGhost}><I.copy size={14}/> Copy สัปดาห์ที่แล้ว</button>
        <button style={rv_btnGhost}><I.refresh size={14}/> Auto-fill</button>
        <div style={{flex: 1}}/>
        <span style={{fontSize: 11, color:"var(--color-ink-muted)"}}>คีย์ลัด:</span>
        {["M","A","N","O","L"].map(k => (
          <kbd key={k} style={{padding:"2px 7px", background:"#fff", border:"1px solid var(--color-hairline)", borderRadius: 5, fontSize: 11, fontWeight: 700, fontFamily:"ui-monospace, monospace"}}>{k}</kbd>
        ))}
        <span style={{fontSize: 11, color:"var(--color-ink-muted)"}}>กด ก่อนคลิก = ตั้งกะทันที</span>
      </div>

      {/* Grid + Pattern library — side by side */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 260px", gap: 16}}>
        {/* MAIN GRID */}
        <div style={{position:"relative"}}>
          {/* Floating bulk-action bar — shown when selection > 0 */}
          <div style={{
            position:"sticky", top: 0, zIndex: 5,
            marginBottom: 8,
            padding:"10px 14px",
            background:"#0E1B2C", color:"#fff",
            borderRadius: 10,
            display:"flex", alignItems:"center", gap: 12,
            boxShadow:"0 6px 20px rgba(14,27,44,0.15)",
          }}>
            <span style={{
              padding:"3px 9px", borderRadius: 999,
              background:"#1FA8A0", color:"#0E1B2C",
              fontSize: 11, fontWeight: 700, letterSpacing:".06em",
            }}>{SELECTED.size} ช่องเลือก</span>
            <span style={{fontSize: 13, color:"#E7E3D8"}}>
              3 คน · 2 วัน (พ-พฤ) · ตั้งกะพร้อมกัน:
            </span>
            <div style={{display:"flex", gap: 6, marginLeft: 4}}>
              {Object.entries(SHIFTS).map(([k, s]) => (
                <button key={k} style={{
                  width: 36, height: 32,
                  background: s.bg, color: s.fg,
                  border:"0", borderRadius: 6,
                  fontFamily:"inherit", fontWeight: 700, fontSize: 13,
                  cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  lineHeight: 1,
                }}>
                  <span>{k}</span>
                  <span style={{fontSize: 7, fontWeight: 600, opacity: 0.7}}>{s.l}</span>
                </button>
              ))}
            </div>
            <div style={{flex: 1}}/>
            <button style={{background:"transparent", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", padding:"6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor:"pointer", fontFamily:"inherit"}}>
              ล้างที่เลือก
            </button>
          </div>

          {/* Grid */}
          <div style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
            {/* Header row — clickable columns */}
            <div style={{display:"grid", gridTemplateColumns:"240px repeat(7, 1fr) 80px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
              <div style={{padding:"12px 16px", display:"flex", alignItems:"center", gap: 8}}>
                <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
                พนักงาน
              </div>
              {DOW.map((d, i) => (
                <div key={d} style={{
                  padding:"10px 6px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)",
                  cursor:"pointer", position:"relative",
                  background: (i === 2 || i === 3) ? "#FEF3C7" : "transparent",
                }}>
                  <div style={{fontSize: 11, fontWeight: 700}}>{d}</div>
                  <div style={{fontSize: 9, fontWeight: 500, color:"var(--color-ink-faint)", marginTop: 2, textTransform:"none", letterSpacing: 0}}>
                    คลิก หัวคอลัมน์ = เลือกทั้งวัน
                  </div>
                </div>
              ))}
              <div style={{padding:"12px 8px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)"}}>ชั่วโมง</div>
            </div>

            {TEAM.map((t, ri) => (
              <div key={t.id} style={{display:"grid", gridTemplateColumns:"240px repeat(7, 1fr) 80px", borderTop:"1px solid var(--color-hairline-soft)"}}>
                {/* Row label */}
                <div style={{padding:"10px 16px", display:"flex", alignItems:"center", gap: 10, minWidth: 0}}>
                  <input type="checkbox" style={{accentColor:"var(--color-accent)", flexShrink: 0}}/>
                  <div className={"humi-avatar humi-avatar--" + t.c} style={{width: 30, height: 30, fontSize: 11, flexShrink: 0}}>{t.ini}</div>
                  <div style={{minWidth: 0, flex: 1}}>
                    <div style={{fontSize: 12.5, fontWeight: 600, color:"var(--color-ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.n}</div>
                    <div style={{fontSize: 10, color:"var(--color-ink-muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.r}</div>
                  </div>
                </div>

                {t.days.map((s, di) => {
                  const sel = SELECTED.has(`${t.id}-${di}`);
                  const shift = SHIFTS[s];
                  return (
                    <div key={di} style={{
                      borderLeft:"1px solid var(--color-hairline-soft)",
                      padding: 4,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      minHeight: 54,
                      background: sel ? "#1FA8A015" : "transparent",
                      outline: sel ? "2px solid #1FA8A0" : "none",
                      outlineOffset: -2,
                      position:"relative",
                    }}>
                      {shift ? (
                        <div style={{
                          width:"100%", height: 42,
                          background: shift.bg, color: shift.fg,
                          borderRadius: 6,
                          display:"flex", flexDirection:"column",
                          alignItems:"center", justifyContent:"center",
                          lineHeight: 1.1, cursor:"pointer",
                        }}>
                          <span style={{fontFamily:"var(--font-display)", fontSize: 13, fontWeight: 700}}>{s}</span>
                          <span style={{fontSize: 8.5, fontWeight: 600, opacity: 0.85}}>{shift.t.split("–")[0]}</span>
                        </div>
                      ) : (
                        <button style={{
                          width:"100%", height: 42,
                          background:"transparent", border:"1px dashed var(--color-hairline)",
                          borderRadius: 6, color:"var(--color-ink-faint)",
                          fontSize: 16, cursor:"pointer", fontFamily:"inherit",
                        }}>＋</button>
                      )}
                    </div>
                  );
                })}

                <div style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"10px 8px", textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                  <span style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>{t.hrs}</span>
                  <span style={{fontSize: 9, color:"var(--color-ink-muted)"}}>ของ 40</span>
                </div>
              </div>
            ))}

            {/* Coverage footer */}
            <div style={{display:"grid", gridTemplateColumns:"240px repeat(7, 1fr) 80px", borderTop:"2px solid var(--color-hairline)", background:"var(--color-canvas-soft)"}}>
              <div style={{padding:"10px 16px", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em", display:"flex", alignItems:"center"}}>Coverage</div>
              {[
                {M:4,A:3},{M:4,A:3},{M:3,A:1},{M:3,A:1},{M:4,A:3},{M:0,A:2},{M:1,A:1},
              ].map((c, di) => {
                const ok = c.M >= 4 && c.A >= 3;
                return (
                  <div key={di} style={{
                    borderLeft:"1px solid var(--color-hairline-soft)", padding:"8px 6px", textAlign:"center",
                    fontSize: 10, lineHeight: 1.4,
                    background: (di === 2 || di === 3) ? "#FEF3C7" : "transparent",
                  }}>
                    <div style={{color: c.M >= 4 ? "var(--color-success)" : "var(--color-warning)"}}>M {c.M}/4</div>
                    <div style={{color: c.A >= 3 ? "var(--color-success)" : "var(--color-warning)"}}>A {c.A}/3</div>
                  </div>
                );
              })}
              <div style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"10px 8px", textAlign:"center", fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700}}>301h</div>
            </div>
          </div>

          {/* Selection callout — explains what's happening */}
          <div style={{
            marginTop: 12, padding:"12px 16px",
            background:"#E1E4FB", borderRadius: 10,
            borderLeft:"3px solid #5B6CE0",
            display:"flex", alignItems:"center", gap: 12,
            fontSize: 12, color:"#243447",
          }}>
            <span style={{
              padding:"2px 8px", borderRadius: 999,
              background:"#5B6CE0", color:"#fff",
              fontSize: 10, fontWeight: 700, letterSpacing:".08em",
            }}>HOW</span>
            <span><b>Shift+คลิก</b> เพื่อเลือกช่วง · <b>Cmd+คลิก</b> เพื่อเลือกแบบเลือกได้ · คลิกหัวคอลัมน์เพื่อเลือกทั้งวัน · คลิกหัวแถวเพื่อเลือกทั้งสัปดาห์ของคนนั้น</span>
          </div>
        </div>

        {/* PATTERN LIBRARY (right rail) */}
        <div style={{position:"sticky", top: 60, alignSelf:"flex-start"}}>
          <div style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", padding: 14, marginBottom: 12}}>
            <div className="humi-eyebrow" style={{marginBottom: 8}}>Pattern library</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 4}}>ลากใส่แถว = ตั้งทั้งสัปดาห์</h3>
            <p style={{fontSize: 11, color:"var(--color-ink-muted)", lineHeight: 1.5, marginBottom: 12}}>
              เลือก pattern · ลากไปทับชื่อพนักงาน · ทั้งสัปดาห์ของคนนั้นถูกตั้งให้อัตโนมัติ
            </p>
            <div style={{display:"flex", flexDirection:"column", gap: 8}}>
              {PATTERNS.map(p => (
                <div key={p.id} style={{
                  padding:"10px 12px",
                  background:"var(--color-canvas-soft)",
                  border:"1px solid var(--color-hairline-soft)",
                  borderRadius: 10,
                  cursor:"grab",
                  borderLeft: `3px solid ${p.color}`,
                }}>
                  <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 6}}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 5,
                      background: p.color + "1F", color: p.color,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: 13,
                    }}>{p.ico}</span>
                    <span style={{fontSize: 12, fontWeight: 600, color:"var(--color-ink)"}}>{p.label}</span>
                  </div>
                  <div style={{display:"flex", gap: 2}}>
                    {p.days.map((d, i) => {
                      const s = SHIFTS[d];
                      return (
                        <div key={i} style={{
                          flex: 1, height: 18,
                          background: s ? s.bg : "transparent",
                          border: s ? "0" : "1px dashed var(--color-hairline)",
                          color: s ? s.fg : "transparent",
                          borderRadius: 3,
                          fontSize: 9, fontWeight: 700,
                          display:"flex", alignItems:"center", justifyContent:"center",
                        }}>{d || "·"}</div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button style={{
                padding:"10px 12px",
                background:"transparent",
                border:"1px dashed var(--color-hairline)",
                borderRadius: 10,
                color:"var(--color-ink-muted)",
                fontFamily:"inherit", fontSize: 12, fontWeight: 600,
                cursor:"pointer",
              }}>+ บันทึก pattern จากแถวที่เลือก</button>
            </div>
          </div>

          {/* Quick row actions */}
          <div style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", padding: 14}}>
            <div className="humi-eyebrow" style={{marginBottom: 8}}>Row actions</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 10}}>เมื่อเลือก 1 คน</h3>
            <div style={{display:"flex", flexDirection:"column", gap: 6, fontSize: 12}}>
              {[
                ["copy",    "Copy สัปดาห์ของคนนี้"],
                ["users",   "ใช้กับหลายคนพร้อมกัน"],
                ["refresh", "สลับสัปดาห์กับคนอื่น"],
                ["x",       "ล้างทั้งสัปดาห์"],
              ].map(([ic, l]) => {
                const Glyph = I[ic] || I.check;
                return (
                  <button key={ic} style={{
                    padding:"8px 10px", textAlign:"left",
                    background:"var(--color-canvas-soft)", border:"1px solid var(--color-hairline-soft)",
                    borderRadius: 8, cursor:"pointer", fontFamily:"inherit",
                    fontSize: 12, color:"var(--color-ink-soft)",
                    display:"flex", alignItems:"center", gap: 8,
                  }}>
                    <Glyph size={13}/> {l}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inline conflicts panel */}
      <div style={{marginTop: 18, background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", padding: 18}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
          <div>
            <h3 className="humi-section-title">3 ปัญหาที่ตรวจพบ · ดู+แก้ ใน <b>หน้าเดียวกัน</b></h3>
            <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>คลิก "ดูช่อง" เพื่อ scroll ไปเซลล์ที่เป็นปัญหา · คลิก "แก้" เพื่อ apply fix อัตโนมัติ</div>
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 10}}>
          <rv_Conflict
            color="#F59E0B"
            title="กะบ่ายขาดคน 2 ช่อง"
            sub="พ-พฤ · ต้องการ 3 มี 1"
            fix="ย้าย ปริยา + ศิรินภา จาก M → A"
            cells="6 ช่อง"
          />
          <rv_Conflict
            color="#F59E0B"
            title="ธนากร (ใหม่) ยังไม่มี shadow"
            sub="ทำงานคนเดียวกะเช้า 5 วัน"
            fix="ใส่ กฤษณ์ shadow วันแรก"
            cells="1 ช่อง"
          />
          <rv_Conflict
            color="#5B6CE0"
            title="ปริยา OT 8h"
            sub="ใกล้ limit · ต้อง pre-approve"
            fix="ส่งคำขอ OT ให้หัวหน้า"
            cells="3 ช่อง"
          />
        </div>
      </div>
    </div>
  );
}

function rv_Conflict({ color, title, sub, fix, cells }) {
  const I = window.PI;
  return (
    <div style={{
      padding:"12px 14px",
      background: color + "14", borderLeft: `3px solid ${color}`,
      borderRadius: 10,
    }}>
      <div style={{display:"flex", alignItems:"center", gap: 6, marginBottom: 4}}>
        <I.warn size={12} style={{color}}/>
        <span style={{fontSize: 9, fontWeight: 700, letterSpacing:".1em", textTransform:"uppercase", color}}>{cells}</span>
      </div>
      <div style={{fontSize: 13, fontWeight: 700, color:"var(--color-ink)", lineHeight: 1.3}}>{title}</div>
      <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 3}}>{sub}</div>
      <div style={{marginTop: 8, padding:"6px 8px", background:"#fff", borderRadius: 6, fontSize: 11, color:"var(--color-ink-soft)", border:"1px solid var(--color-hairline-soft)"}}>
        <span style={{fontWeight: 700}}>แก้แบบ auto:</span> {fix}
      </div>
      <div style={{display:"flex", gap: 6, marginTop: 8}}>
        <button style={{flex: 1, padding:"5px 8px", background:"transparent", border:"1px solid var(--color-hairline)", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor:"pointer", fontFamily:"inherit"}}>ดูช่อง</button>
        <button style={{flex: 1, padding:"5px 8px", background:"var(--color-ink)", color:"#fff", border: 0, borderRadius: 5, fontSize: 11, fontWeight: 600, cursor:"pointer", fontFamily:"inherit"}}>แก้</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 2) Roster_Regional — 3 stores · 20+ คน · ONE PAGE for Regional Manager
// ════════════════════════════════════════════════════════════════════════

function Roster_Regional() {
  const I = window.PI;

  const SHIFTS = {
    M: { bg:"#D6EEEC", fg:"#0A6E68" },
    A: { bg:"#FEF3C7", fg:"#92660C" },
    N: { bg:"#E1E4FB", fg:"#3F4AAB" },
    O: { bg:"#F6F1E8", fg:"#8A97A8" },
    L: { bg:"#FFE4E1", fg:"#9A3412" },
  };

  // 3 stores, mini-rosters
  const STORES = [
    {
      code:"CWO", name:"Central World", manager:"สมศักดิ์ ชยพันธ์", coverage:"good", headcount: 8, hrs: 301,
      staff: [
        { n:"กฤษณ์ ส.",     d:["M","M","M","O","M","O","O"] },
        { n:"ปริยา ส.",     d:["A","A","A","M","M","M","O"] },
        { n:"ศิรินภา ท.",   d:["A","A","O","O","A","A","M"] },
        { n:"ณัฐกานต์ พ.",  d:["M","M","O","A","A","A","O"] },
        { n:"+ 4 คน",       d:[null,null,null,null,null,null,null] },
      ],
    },
    {
      code:"CCL", name:"Central ChidLom", manager:"อรอุมา ทิพย์โสภณ", coverage:"warn", headcount: 6, hrs: 220,
      staff: [
        { n:"ธนากร พ.",     d:["M","M","M","M","M","O","O"] },
        { n:"พิมพ์ใจ ว.",   d:["M","M","O","M","A","A","O"] },
        { n:"ฝน อ.",        d:["A","A","A","M","M","O","O"] },
        { n:"+ 3 คน",       d:[null,null,null,null,null,null,null] },
      ],
    },
    {
      code:"CEV", name:"Central EastVille", manager:"ปริญญา แดงเพ็ง", coverage:"good", headcount: 6, hrs: 268,
      staff: [
        { n:"ปวีณา ต.",     d:["M","M","O","M","A","A","O"] },
        { n:"นัท ภ.",       d:["A","A","A","O","M","M","M"] },
        { n:"ตูน ป.",       d:["M","M","M","M","O","O","M"] },
        { n:"+ 3 คน",       d:[null,null,null,null,null,null,null] },
      ],
    },
  ];

  const DOW = ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."];

  return (
    <div style={{padding:"6px 0 28px"}}>
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 18, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">Workforce · Regional view</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>กะการทำงาน 3 สาขา · BKK-Central</h1>
          <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>
            20 คน · 3 สาขา · <b>ดูและจัดได้บนหน้าเดียว</b> · ใช้สำหรับ Regional Manager ตรวจคูณกะทุกสาขาพร้อมกัน
          </p>
        </div>
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <button style={rv_btnGhost}><I.chevL size={14}/></button>
          <span style={{padding:"8px 14px", background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)", fontSize: 13, fontWeight: 600}}>18 – 24 พ.ค. 2569</span>
          <button style={rv_btnGhost}><I.chevR size={14}/></button>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 18}}>
        <rv_Kpi label="พนักงานทั้งหมด" value="20 คน"  sub="ใน 3 สาขา"/>
        <rv_Kpi label="ชั่วโมงรวม"      value="789h"  sub="ค่าแรง ฿156,400"/>
        <rv_Kpi label="สาขาครอบคลุม OK" value="2 / 3" sub="CCL ขาด · ดูด้านล่าง"  color="var(--color-warning)"/>
        <rv_Kpi label="คำขอลาในสัปดาห์"  value="4"     sub="3 อนุมัติ · 1 รอ"/>
      </div>

      {/* Stack of stores · each is mini-grid */}
      <div style={{display:"flex", flexDirection:"column", gap: 16}}>
        {STORES.map((s) => (
          <div key={s.code} style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
            {/* Store header */}
            <div style={{
              padding:"14px 18px",
              background:"var(--color-canvas-soft)",
              borderBottom:"1px solid var(--color-hairline)",
              display:"flex", alignItems:"center", gap: 14, flexWrap:"wrap",
            }}>
              <span style={{
                padding:"3px 10px", borderRadius: 6,
                background:"#0E1B2C", color:"#F4E4B8",
                fontFamily:"ui-monospace, monospace", fontSize: 11, fontWeight: 700, letterSpacing:".06em",
              }}>{s.code}</span>
              <div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 700, lineHeight: 1.1}}>{s.name}</div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>Store Manager: {s.manager} · {s.headcount} คน · {s.hrs}h</div>
              </div>
              <div style={{flex: 1}}/>
              <span style={{
                padding:"4px 10px", borderRadius: 999,
                background: s.coverage === "good" ? "var(--color-success-soft)" : "var(--color-warning-soft)",
                color: s.coverage === "good" ? "var(--color-success)" : "#92400E",
                fontSize: 11, fontWeight: 700, letterSpacing:".04em",
                display:"inline-flex", alignItems:"center", gap: 4,
              }}>
                {s.coverage === "good" ? "● ครอบคลุม OK" : "▲ ครอบคลุมมีปัญหา"}
              </span>
              <button style={{...rv_btnGhost, fontSize: 12, minHeight: 32}}>เปิดดูเต็มสาขา →</button>
            </div>

            {/* Compact roster */}
            <div style={{display:"grid", gridTemplateColumns:"160px repeat(7, 1fr)", fontSize: 12}}>
              <div style={{padding:"8px 14px", fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase", background:"var(--color-canvas-soft)"}}>พนักงาน</div>
              {DOW.map((d, i) => (
                <div key={d} style={{
                  padding:"8px 6px", textAlign:"center", fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)",
                  borderLeft:"1px solid var(--color-hairline-soft)",
                  background:"var(--color-canvas-soft)",
                }}>{d}</div>
              ))}

              {s.staff.map((p, ri) => (
                <React.Fragment key={ri}>
                  <div style={{
                    padding:"8px 14px",
                    fontSize: 12,
                    color: p.n.startsWith("+") ? "var(--color-ink-muted)" : "var(--color-ink)",
                    borderTop:"1px solid var(--color-hairline-soft)",
                    fontWeight: 500,
                    fontStyle: p.n.startsWith("+") ? "italic" : "normal",
                  }}>{p.n}</div>
                  {p.d.map((sh, di) => {
                    const cfg = SHIFTS[sh];
                    return (
                      <div key={di} style={{
                        padding: 4,
                        borderTop:"1px solid var(--color-hairline-soft)",
                        borderLeft:"1px solid var(--color-hairline-soft)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        minHeight: 32,
                      }}>
                        {sh === null ? (
                          <span style={{color:"var(--color-ink-faint)", fontSize: 11}}>…</span>
                        ) : cfg ? (
                          <div style={{
                            width:"100%", height: 24,
                            background: cfg.bg, color: cfg.fg,
                            borderRadius: 4,
                            fontFamily:"var(--font-display)", fontSize: 11, fontWeight: 700,
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }}>{sh}</div>
                        ) : null}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-store actions */}
      <div style={{marginTop: 18, padding:"16px 22px", background:"#0E1B2C", color:"#E7E3D8", borderRadius:"var(--radius-lg)", display:"grid", gridTemplateColumns:"auto 1fr auto", gap: 18, alignItems:"center"}}>
        <div style={{
          fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700,
          padding:"4px 12px", borderRadius: 999,
          background:"#1FA8A0", color:"#0E1B2C", letterSpacing:".06em",
        }}>Cross-store</div>
        <div style={{fontSize: 13, lineHeight: 1.5}}>
          เห็นสาขา CCL ขาดคน → ส่งคำขอยืมพนักงานจาก CWO หรือ CEV ได้ <b style={{color:"#fff"}}>จากหน้านี้</b> ·
          ไม่ต้องเปิดสาขาทีละหน้า
        </div>
        <div style={{display:"flex", gap: 8}}>
          <button style={{padding:"8px 14px", background:"transparent", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor:"pointer", fontFamily:"inherit"}}>ยืมคนข้ามสาขา</button>
          <button style={{padding:"8px 14px", background:"#1FA8A0", color:"#0E1B2C", border: 0, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor:"pointer", fontFamily:"inherit"}}>ประกาศกะทั้ง 3 สาขา</button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared atoms ──────────────────────────────────────────────────────

const rv_btnPrim = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6, padding:"9px 16px", background:"var(--color-accent)", color:"#fff", border: 0, borderRadius:"var(--radius-md)", fontFamily:"inherit", fontSize: 13, fontWeight: 600, cursor:"pointer", minHeight: 38 };
const rv_btnGhost = { ...rv_btnPrim, background:"#fff", color:"var(--color-ink-soft)", border:"1px solid var(--color-hairline)" };

function rv_Kpi({ label, value, sub, color }) {
  return (
    <div style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", padding:"16px 20px"}}>
      <div className="humi-eyebrow">{label}</div>
      <div style={{fontFamily:"var(--font-display)", fontSize: 24, fontWeight: 600, letterSpacing:"-0.025em", color: color || "var(--color-ink)", marginTop: 6, lineHeight: 1}}>{value}</div>
      {sub && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 5}}>{sub}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 3) Roster_TimeFirst — Time-first editing
//    Feedback: "แสดงเป็นเวลา + กรอก override จาก default + ทีม/สาขาพร้อมกัน"
// ════════════════════════════════════════════════════════════════════════

function Roster_TimeFirst() {
  const I = window.PI;

  // Shift defaults — type carries the default time window
  const SHIFTS = {
    M: { bg:"#D6EEEC", fg:"#0A6E68", l:"เช้า",  start:"08:00", end:"17:00" },
    A: { bg:"#FEF3C7", fg:"#92660C", l:"บ่าย",  start:"14:00", end:"23:00" },
    N: { bg:"#E1E4FB", fg:"#3F4AAB", l:"ดึก",   start:"22:00", end:"07:00" },
    O: { bg:"#F6F1E8", fg:"#8A97A8", l:"หยุด",  start:"",      end:""      },
    L: { bg:"#FFE4E1", fg:"#9A3412", l:"ลา",    start:"",      end:""      },
  };

  // Team — each cell carries shift type + actual times. When times match defaults
  // the cell is "default" (gray text); when they differ it's "override" (ink + dot).
  const initialTeam = [
    { id:"E1832", n:"สมศักดิ์ ชยพันธ์",  r:"Store Manager",     ini:"สศ", c:"sage",   hrs:45,
      days:[
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"M", s:"09:00", e:"18:00"}, // override
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"O"}, {t:"O"},
      ]},
    { id:"E1719", n:"ณัฐกานต์ พรรณราย", r:"Floor Supervisor",  ini:"ณก", c:"teal",   hrs:40,
      days:[
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"O"},
        {t:"A", s:"14:00", e:"23:00"}, {t:"A", s:"14:00", e:"23:00"}, {t:"A", s:"14:00", e:"23:00"},
        {t:"O"},
      ]},
    { id:"E2204", n:"กฤษณ์ สิริวงศ์",   r:"PC-2 · Estée",       ini:"กษ", c:"coral",  hrs:36,
      days:[
        {t:"M", s:"10:00", e:"19:00"}, // override (เปิดเคาน์เตอร์สาย)
        {t:"M", s:"10:00", e:"19:00"}, {t:"M", s:"10:00", e:"19:00"},
        {t:"O"},
        {t:"M", s:"10:00", e:"19:00"},
        {t:"O"}, {t:"O"},
      ]},
    { id:"E3094", n:"ปริยา สุวรรณภูมิ", r:"PC-3 · SK-II",       ini:"ปร", c:"butter", hrs:48,
      days:[
        {t:"A", s:"14:00", e:"23:00"}, {t:"A", s:"14:00", e:"23:00"}, {t:"A", s:"14:00", e:"23:00"},
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"O"},
      ]},
    { id:"E2451", n:"ศิรินภา ทองอ่อน",  r:"PC-3 · MAC",          ini:"ศน", c:"teal",   hrs:36,
      days:[
        {t:"A", s:"14:00", e:"23:00"}, {t:"A", s:"14:00", e:"23:00"},
        {t:"O"}, {t:"O"},
        {t:"A", s:"15:30", e:"00:30"}, // override (event ดึก)
        {t:"A", s:"14:00", e:"23:00"}, {t:"M", s:"08:00", e:"17:00"},
      ]},
    { id:"E2789", n:"ธนากร พรหมจรรย์", r:"Cashier · ใหม่",      ini:"ธก", c:"coral",  hrs:40,
      days:[
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"M", s:"08:00", e:"17:00"}, {t:"M", s:"08:00", e:"17:00"},
        {t:"O"}, {t:"O"},
      ]},
  ];

  const [team, setTeam] = React.useState(initialTeam);
  const [editing, setEditing] = React.useState(null); // {rowId, dayIdx} | null
  const DOW = ["จ. 18", "อ. 19", "พ. 20", "พฤ. 21", "ศ. 22", "ส. 23", "อา. 24"];

  // Branch filter — same view layout, different scope. "ทีม" = current store team.
  const [branch, setBranch] = React.useState("CWO");

  const updateCell = (rowId, dayIdx, patch) => {
    setTeam(prev => prev.map(p => p.id !== rowId ? p : ({
      ...p,
      days: p.days.map((d, i) => i !== dayIdx ? d : ({...d, ...patch}))
    })));
  };

  const isOverride = (cell) => {
    if (!cell || !cell.t) return false;
    const def = SHIFTS[cell.t];
    if (!def || !def.start) return false;
    return cell.s !== def.start || cell.e !== def.end;
  };

  // Aggregate counts for top bar
  const overrideCount = team.reduce((sum, p) =>
    sum + p.days.filter(d => isOverride(d)).length, 0);

  return (
    <div style={{padding:"6px 0 28px"}}>
      {/* Header */}
      <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 24, marginBottom: 18, flexWrap:"wrap"}}>
        <div>
          <div className="humi-eyebrow">Workforce · Schedule · time-first</div>
          <h1 className="humi-hero-title" style={{marginTop: 6}}>กะการทำงาน · แสดงเวลา + override ได้</h1>
          <p style={{fontSize: 14, color:"var(--color-ink-muted)", marginTop: 6}}>
            <b>เห็นเวลาเข้า-ออกของทุกคนพร้อมกัน</b> · ค่าตามประเภทกะเป็น default · <b>คลิกที่เวลา</b> เพื่อ override สำหรับวันนั้น
          </p>
        </div>
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <button style={rv_btnGhost}><I.chevL size={14}/></button>
          <span style={{padding:"8px 14px", background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-md)", fontSize: 13, fontWeight: 600}}>18 – 24 พ.ค. 2569</span>
          <button style={rv_btnGhost}><I.chevR size={14}/></button>
        </div>
      </div>

      {/* Scope switch + override count */}
      <div style={{display:"flex", gap: 12, alignItems:"center", marginBottom: 16, flexWrap:"wrap"}}>
        <div style={{display:"flex", gap: 0, background:"#fff", border:"1px solid var(--color-hairline)", borderRadius: 10, padding: 3}}>
          {[
            { id:"CWO", l:"ทีม Central World (6 คน)" },
            { id:"ALL", l:"ทุกสาขา BKK-Central (20 คน)" },
          ].map(b => (
            <button key={b.id} onClick={() => setBranch(b.id)} style={{
              padding:"7px 14px", borderRadius: 7,
              background: branch === b.id ? "var(--color-accent)" : "transparent",
              color: branch === b.id ? "#fff" : "var(--color-ink-soft)",
              border: 0, fontFamily:"inherit", fontSize: 12.5, fontWeight: 600, cursor:"pointer",
            }}>{b.l}</button>
          ))}
        </div>
        <div style={{flex: 1}}/>
        {overrideCount > 0 && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap: 8,
            padding:"6px 12px", borderRadius: 999,
            background:"#5B6CE015", color:"#3F4AAB",
            fontSize: 12, fontWeight: 600,
            border:"1px solid #5B6CE026",
          }}>
            <span style={{width: 6, height: 6, borderRadius:"50%", background:"#5B6CE0"}}/>
            {overrideCount} ช่อง override จาก default
          </span>
        )}
        <button style={rv_btnGhost}><I.refresh size={14}/> รีเซ็ตเป็น default ทั้งหมด</button>
        <button style={rv_btnPrim}><I.send size={14}/> ประกาศกะ + แจ้งทีม</button>
      </div>

      {/* Shift defaults legend */}
      <div style={{
        padding:"12px 16px", marginBottom: 14,
        background:"#fff", border:"1px solid var(--color-hairline)", borderRadius: 10,
        display:"flex", gap: 14, alignItems:"center", flexWrap:"wrap",
        fontSize: 11.5,
      }}>
        <span style={{fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".08em", textTransform:"uppercase"}}>เวลา default</span>
        {Object.entries(SHIFTS).filter(([k, s]) => s.start).map(([k, s]) => (
          <span key={k} style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 18, height: 18, borderRadius: 4, background: s.bg, color: s.fg, fontWeight: 700, fontSize: 10, display:"inline-flex", alignItems:"center", justifyContent:"center"}}>{k}</span>
            <span style={{color:"var(--color-ink-soft)", fontWeight: 600}}>{s.l}</span>
            <span style={{color:"var(--color-ink-muted)", fontFamily:"ui-monospace, monospace"}}>{s.start}–{s.end}</span>
          </span>
        ))}
        <span style={{flex: 1}}/>
        <span style={{color:"var(--color-ink-muted)"}}>
          <span style={{width: 6, height: 6, borderRadius:"50%", background:"#5B6CE0", display:"inline-block", marginRight: 5, verticalAlign:"middle"}}/>
          จุดน้ำเงิน = override จาก default · คลิกเซลล์ใดก็ได้เพื่อแก้เวลา
        </span>
      </div>

      {/* MAIN GRID */}
      <div style={{background:"#fff", border:"1px solid var(--color-hairline)", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
        {/* Header */}
        <div style={{display:"grid", gridTemplateColumns:"220px repeat(7, 1fr) 80px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", textTransform:"uppercase", letterSpacing:".06em"}}>
          <div style={{padding:"12px 16px"}}>พนักงาน</div>
          {DOW.map((d) => (
            <div key={d} style={{padding:"10px 6px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)"}}>{d}</div>
          ))}
          <div style={{padding:"12px 8px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)"}}>ชั่วโมง</div>
        </div>

        {team.map((t) => (
          <div key={t.id} style={{display:"grid", gridTemplateColumns:"220px repeat(7, 1fr) 80px", borderTop:"1px solid var(--color-hairline-soft)"}}>
            {/* Row label */}
            <div style={{padding:"10px 16px", display:"flex", alignItems:"center", gap: 10, minWidth: 0}}>
              <div className={"humi-avatar humi-avatar--" + t.c} style={{width: 30, height: 30, fontSize: 11, flexShrink: 0}}>{t.ini}</div>
              <div style={{minWidth: 0, flex: 1}}>
                <div style={{fontSize: 12.5, fontWeight: 600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.n}</div>
                <div style={{fontSize: 10, color:"var(--color-ink-muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{t.r}</div>
              </div>
            </div>

            {t.days.map((cell, di) => {
              const shift = cell ? SHIFTS[cell.t] : null;
              const isEditing = editing && editing.rowId === t.id && editing.dayIdx === di;
              const override = isOverride(cell);

              return (
                <div key={di} style={{
                  borderLeft:"1px solid var(--color-hairline-soft)",
                  padding: 4,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  minHeight: 64,
                  position:"relative",
                }}>
                  {!shift || !shift.start ? (
                    // OFF / LEAVE / empty
                    <button
                      onClick={() => setEditing({rowId: t.id, dayIdx: di})}
                      style={{
                        width:"100%", height: 56,
                        background: shift ? shift.bg : "transparent",
                        color: shift ? shift.fg : "var(--color-ink-faint)",
                        border: shift ? 0 : "1px dashed var(--color-hairline)",
                        borderRadius: 6, cursor:"pointer", fontFamily:"inherit",
                        fontWeight: 700, fontSize: 12,
                        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 2,
                      }}>
                      {shift ? <>
                        <span>{cell.t}</span>
                        <span style={{fontSize: 9, fontWeight: 600, opacity: 0.85}}>{shift.l}</span>
                      </> : "＋"}
                    </button>
                  ) : isEditing ? (
                    // Inline edit mode — two time inputs + shift type dropdown
                    <div
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setEditing(null);
                      }}
                      style={{
                        width:"100%", height: 56,
                        background: shift.bg, color: shift.fg,
                        borderRadius: 6,
                        border: "2px solid #1FA8A0",
                        padding: "3px 4px",
                        display:"flex", flexDirection:"column", gap: 2,
                      }}>
                      <select
                        value={cell.t}
                        autoFocus
                        onChange={(e) => {
                          const newType = e.target.value;
                          const def = SHIFTS[newType];
                          updateCell(t.id, di, { t: newType, s: def.start, e: def.end });
                        }}
                        style={{
                          fontFamily:"var(--font-display)", fontSize: 11, fontWeight: 700,
                          background:"rgba(255,255,255,0.5)", color: shift.fg,
                          border: 0, borderRadius: 3, padding:"1px 3px",
                          textAlign:"center", cursor:"pointer",
                        }}>
                        {Object.entries(SHIFTS).map(([k, s]) => (
                          <option key={k} value={k}>{k} · {s.l}</option>
                        ))}
                      </select>
                      <div style={{display:"flex", gap: 2, alignItems:"center"}}>
                        <input
                          type="time"
                          value={cell.s}
                          onChange={(e) => updateCell(t.id, di, { s: e.target.value })}
                          style={{
                            flex: 1, width: 0, minWidth: 0,
                            fontFamily:"ui-monospace, monospace", fontSize: 10, fontWeight: 700,
                            color: shift.fg, background:"#fff",
                            border: 0, borderRadius: 3, padding:"2px 3px",
                          }}/>
                        <span style={{fontSize: 9, color: shift.fg, opacity: 0.6}}>–</span>
                        <input
                          type="time"
                          value={cell.e}
                          onChange={(e) => updateCell(t.id, di, { e: e.target.value })}
                          style={{
                            flex: 1, width: 0, minWidth: 0,
                            fontFamily:"ui-monospace, monospace", fontSize: 10, fontWeight: 700,
                            color: shift.fg, background:"#fff",
                            border: 0, borderRadius: 3, padding:"2px 3px",
                          }}/>
                      </div>
                    </div>
                  ) : (
                    // Default display — time-first
                    <button
                      onClick={() => setEditing({rowId: t.id, dayIdx: di})}
                      style={{
                        width:"100%", height: 56,
                        background: shift.bg, color: shift.fg,
                        borderRadius: 6,
                        border: 0,
                        padding: "4px 6px",
                        cursor:"pointer", fontFamily:"inherit",
                        display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center", gap: 2,
                        position:"relative",
                      }}>
                      <span style={{
                        fontFamily:"ui-monospace, 'SF Mono', monospace",
                        fontSize: 12.5, fontWeight: 700,
                        letterSpacing:"-0.01em",
                        lineHeight: 1.1,
                      }}>{cell.s}</span>
                      <span style={{
                        fontFamily:"ui-monospace, 'SF Mono', monospace",
                        fontSize: 11, fontWeight: 600,
                        opacity: 0.7,
                        lineHeight: 1.1,
                      }}>{cell.e}</span>
                      {override && (
                        <span style={{
                          position:"absolute", top: 4, right: 4,
                          width: 6, height: 6, borderRadius:"50%",
                          background:"#5B6CE0",
                          boxShadow:"0 0 0 1.5px #fff",
                        }} title="Override จาก default"/>
                      )}
                    </button>
                  )}
                </div>
              );
            })}

            <div style={{borderLeft:"1px solid var(--color-hairline-soft)", padding:"10px 8px", textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <span style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>{t.hrs}</span>
              <span style={{fontSize: 9, color:"var(--color-ink-muted)"}}>ของ 40</span>
            </div>
          </div>
        ))}
      </div>

      {/* Helper note */}
      <div style={{
        marginTop: 12, padding:"12px 16px",
        background:"#E1E4FB", borderRadius: 10,
        borderLeft:"3px solid #5B6CE0",
        display:"flex", alignItems:"center", gap: 12,
        fontSize: 12, color:"#243447",
      }}>
        <span style={{
          padding:"2px 8px", borderRadius: 999,
          background:"#5B6CE0", color:"#fff",
          fontSize: 10, fontWeight: 700, letterSpacing:".08em",
        }}>วิธี</span>
        <span>
          <b>คลิกเซลล์</b> เพื่อเปลี่ยนประเภทกะ (M/A/N/O/L) ทันที + แก้เวลาเข้า/ออก · ค่าจาก default ใช้แทนได้ทันที · เวลาที่ override จะมี <b style={{color:"#5B6CE0"}}>จุดน้ำเงิน</b> ที่มุมเซลล์
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { Roster_BulkSelect, Roster_Regional, Roster_TimeFirst });
