// mod-pattern-d-benefit-mgr.jsx — Pattern D, Benefit module, Manager persona.

const PDM_NAV = [
  { group: "พื้นที่ทำงาน", items: [
    { id:"home",     l:"หน้าหลัก",            ico:"home" },
    { id:"todo",     l:"To-Do",                ico:"checkSquare", badge:5 },
    { id:"profile",  l:"โปรไฟล์ของฉัน",       ico:"user" },
    { id:"timeoff",  l:"การลา",                ico:"calendar" },
    { id:"time",     l:"ลงเวลา · ตารางกะ",     ico:"calendarPlus" },
    { id:"benefit",  l:"สวัสดิการ",            ico:"heart", active:true },
    { id:"payroll",  l:"เงินเดือน",            ico:"wallet" },
    { id:"requests", l:"คำร้องและแบบฟอร์ม",   ico:"fileText" },
  ]},
  { group: "บุคลากร", items: [
    { id:"team",     l:"ทีมของฉัน",           ico:"users" },
    { id:"goals",    l:"เป้าหมาย · ผลงาน",     ico:"barChart" },
    { id:"learning", l:"การเรียนรู้",          ico:"book" },
    { id:"org",      l:"ผังองค์กร",            ico:"network" },
  ]},
  { group: "บริษัท", items: [
    { id:"announce", l:"ประกาศและข่าวสาร",   ico:"mega" },
  ]},
];

const PDM_TABS = [
  { id:"approval", l:"รออนุมัติ",        sub:"คำขอเบิกจากลูกทีม", badge:4 },
  { id:"team",     l:"วงเงินของทีม",     sub:"ภาพรวมการใช้ของ 7 คน" },
  { id:"history",  l:"ประวัติของทีม",    sub:"การเบิกย้อนหลัง" },
  { id:"my",       l:"ของฉันเอง",        sub:"เบิกใหม่ · วงเงินคงเหลือ" },
];

const PDM_PERSONA = { name:"คุณสมชาย ช.", role:"Store Manager · CWO", initials:"สม", accent:"#7DA084" };

// ─── Approval queue (the main manager task) ──────────────────────────

function PDM_Approval() {
  const I = window.PI;
  const QUEUE = [
    { id:"BN-2401", who:"กฤษณ์ ส.",     ini:"กษ", date:"15 พ.ค.", cat:"ค่ารักษาพยาบาล", desc:"รพ.บำรุงราษฎร์ · ตรวจประจำปี",                amount:4200, urgent:false, sla:"2 วัน", color:"#1FA8A0", docs:2 },
    { id:"BN-2400", who:"ปริยา ส.",     ini:"ปร", date:"15 พ.ค.", cat:"การศึกษาบุตร",   desc:"เทอม 1/2569 · ลูกสาว 2 คน",                  amount:24000, urgent:true,  sla:"วันนี้", color:"#7DA084", docs:5 },
    { id:"BN-2399", who:"ศิรินภา ท.",   ini:"ศน", date:"14 พ.ค.", cat:"ทันตกรรม",        desc:"คลินิกฟัน Smile · จัดฟัน (ผ่อน 6 เดือน)",  amount:8000,  urgent:false, sla:"1 วัน", color:"#E08864", docs:3 },
    { id:"BN-2397", who:"อัครเดช ม.",   ini:"อด", date:"13 พ.ค.", cat:"ค่ารักษาพยาบาล", desc:"คลินิก ENT · ภูมิแพ้",                       amount:1800,  urgent:false, sla:"4 วัน", color:"#1FA8A0", docs:1 },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, overflow: "hidden" }}>
      <div style={{
        padding: "12px 20px", background: "#FCFAF5", borderBottom: "1px solid #E7DFD1",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#0E1B2C" }}>4 คำขอรออนุมัติ</span>
        <span style={{ fontSize: 11, color: "#9F1239", fontWeight: 600 }}>1 เร่งด่วน · ครบกำหนดวันนี้</span>
        <div style={{ flex: 1 }}/>
        <button style={{ padding:"5px 10px", background:"#FFFFFF", border:"1px solid #E7DFD1", borderRadius: 6, fontSize: 11, color:"#5A6A7E", fontFamily:"inherit", cursor:"pointer" }}>เรียง: SLA</button>
        <button style={{ padding:"5px 10px", background:"#FFFFFF", border:"1px solid #E7DFD1", borderRadius: 6, fontSize: 11, color:"#5A6A7E", fontFamily:"inherit", cursor:"pointer" }}>ทุกประเภท</button>
      </div>
      {QUEUE.map((q, i) => (
        <div key={q.id} style={{
          padding: "16px 20px", borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
          background: q.urgent ? "#FEF3F2" : "#FFFFFF",
          borderLeft: q.urgent ? "3px solid #E11D48" : "3px solid transparent",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 14, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999,
              background: "linear-gradient(135deg, #7DA084, #9BB5A0)", color: "#fff",
              fontSize: 12, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>{q.ini}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                {q.urgent && (
                  <span style={{ padding: "2px 7px", borderRadius: 4, background: "#E11D48", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform:"uppercase" }}>เร่งด่วน</span>
                )}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0E1B2C" }}>{q.who}</span>
                <span style={{ fontSize: 11, color: "#8A97A8", fontFamily: "ui-monospace, monospace" }}>{q.id}</span>
                <span style={{ padding: "2px 8px", borderRadius: 999, background: q.color + "1F", color: q.color, fontSize: 10, fontWeight: 700 }}>{q.cat}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "#243447", marginTop: 4 }}>{q.desc}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 14, fontSize: 11, color: "#5A6A7E" }}>
                <span>📅 ส่งมา {q.date}</span>
                <span>📎 เอกสาร {q.docs} ไฟล์</span>
                <span style={{ color: q.urgent ? "#9F1239" : "#5A6A7E", fontWeight: q.urgent ? 700 : 500 }}>⏱ SLA · {q.sla}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: "#0E1B2C", letterSpacing: "-0.02em" }}>฿{q.amount.toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button style={{ padding: "6px 14px", borderRadius: 6, background: "#1FA8A0", color: "#fff", border: 0, fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ อนุมัติ</button>
              <button style={{ padding: "6px 14px", borderRadius: 6, background: "transparent", color: "#9F1239", border: "1px solid #FECDD3", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✕ ปฏิเสธ</button>
              <button style={{ padding: "6px 14px", borderRadius: 6, background: "transparent", color: "#5A6A7E", border: "1px solid #E7DFD1", fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>ดูรายละเอียด</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Team balances ────────────────────────────────────────────────────

function PDM_TeamBalances() {
  const TEAM = [
    { n:"กฤษณ์ ส.",     ini:"กษ", used:32700, max:62500, alerts:0 },
    { n:"ปริยา ส.",     ini:"ปร", used:48200, max:62500, alerts:1, note:"ใช้เกิน 75% · แจ้งเตือนแล้ว" },
    { n:"ศิรินภา ท.",   ini:"ศน", used:11400, max:62500, alerts:0 },
    { n:"ณัฐกานต์ พ.",  ini:"ณก", used:8200,  max:62500, alerts:0 },
    { n:"อัครเดช ม.",   ini:"อด", used:54100, max:62500, alerts:2, note:"ใช้เกิน 85% · ใกล้หมดสิทธิ" },
    { n:"ธนากร พ.",     ini:"ธก", used:2400,  max:62500, alerts:0 },
    { n:"วรรณวิภา จ.",  ini:"วว", used:18500, max:62500, alerts:0 },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 20 }}>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>วงเงินคงเหลือของทีม</div>
      <div style={{ fontSize: 12, color: "#5A6A7E", marginBottom: 16 }}>7 คน · ประจำปี 2569 · รวมการใช้ ฿175,500 / ฿437,500 (40%)</div>
      {TEAM.map((t, i) => {
        const pct = (t.used / t.max) * 100;
        const high = pct >= 75;
        const critical = pct >= 85;
        const color = critical ? "#E11D48" : high ? "#F59E0B" : "#1FA8A0";
        return (
          <div key={t.n} style={{
            padding: "14px 0",
            borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
            display: "grid", gridTemplateColumns: "180px 1fr 140px",
            gap: 16, alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: "linear-gradient(135deg, #7DA084, #9BB5A0)", color: "#fff",
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{t.ini}</div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t.n}</span>
            </div>
            <div>
              <div style={{ height: 10, background: "#F6F1E8", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 999 }}/>
              </div>
              {t.note && <div style={{ fontSize: 11, color, marginTop: 4, fontWeight: 600 }}>⚠ {t.note}</div>}
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: "#5A6A7E", fontFamily: "ui-monospace, monospace" }}>
              <b style={{ color }}>฿{t.used.toLocaleString()}</b> / ฿{t.max.toLocaleString()}
              <div style={{ fontSize: 10, marginTop: 2 }}>{pct.toFixed(0)}% · เหลือ ฿{(t.max - t.used).toLocaleString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PDM_Placeholder({ tab }) {
  return (
    <div style={{
      padding: "60px 24px", background: "#FFFFFF",
      border: "1px dashed #E7DFD1", borderRadius: 14, textAlign: "center",
    }}>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: "#0E1B2C", marginBottom: 6 }}>{tab.l}</div>
      <div style={{ fontSize: 13, color: "#5A6A7E" }}>{tab.sub}</div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────

function PatternD_BenefitMgr() {
  const I = window.PI;
  const [tab, setTab] = React.useState("approval");
  const P = PDM_PERSONA;
  const current = PDM_TABS.find(t => t.id === tab);

  const iconBtn = {
    width: 40, height: 40, borderRadius: 10,
    background: "#FFFFFF", border: "1px solid #E7DFD1",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "#243447", cursor: "pointer", position: "relative",
  };

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "240px 1fr",
      minHeight: 900, height: "100%",
      background: "#F6F1E8",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      color: "#0E1B2C",
    }}>
      <aside style={{
        background: "#0E1B2C", color: "#E7E3D8",
        padding: "16px 12px 14px",
        display: "flex", flexDirection: "column", gap: 2,
        borderTop: `3px solid ${P.accent}`,
      }}>
        <div style={{ padding: "4px 8px 12px" }}>
          <img src={window.__resources.humiLogo} alt="Humi" style={{ height: 38, width: "auto", filter: "brightness(1.1)" }}/>
        </div>
        {PDM_NAV.map(group => (
          <React.Fragment key={group.group}>
            <div style={{
              fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase",
              color: "rgba(231,227,216,0.4)", fontWeight: 600,
              padding: "12px 10px 4px",
            }}>{group.group}</div>
            {group.items.map(it => {
              const Glyph = I[it.ico] || I.home;
              return (
                <div key={it.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px", borderRadius: 8,
                  fontSize: 12.5, fontWeight: 500,
                  color: it.active ? "#FCFAF5" : "rgba(231,227,216,0.72)",
                  background: it.active ? `${P.accent}26` : "transparent",
                  borderLeft: it.active ? `2px solid ${P.accent}` : "2px solid transparent",
                  paddingLeft: it.active ? 10 : 12,
                  cursor: "pointer",
                }}>
                  <Glyph size={14}/>
                  <span style={{ flex: 1 }}>{it.l}</span>
                  {it.badge && (
                    <span style={{ background: "#E11D48", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 999 }}>{it.badge}</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
        <div style={{
          marginTop: "auto", paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 999,
            background: `linear-gradient(135deg, ${P.accent}, ${P.accent}88)`,
            color: "#fff", fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{P.initials}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, color: "#FCFAF5", fontWeight: 600 }}>{P.name}</div>
            <div style={{ fontSize: 9.5, color: "rgba(231,227,216,0.5)" }}>{P.role}</div>
          </div>
        </div>
      </aside>

      <main style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{
          padding: "14px 28px",
          borderBottom: "1px solid #E7DFD1",
          background: "#FCFAF5",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ color: "#8A97A8" }}>สวัสดิการ</span>
            <span style={{ color: "#C9BFAE" }}>›</span>
            <span style={{ color: "#0E1B2C", fontWeight: 600 }}>{current?.l}</span>
          </div>
          <div style={{ flex: 1 }}/>
          <button style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 14px",
            background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 10,
            fontSize: 12, color: "#5A6A7E",
            fontFamily: "inherit", cursor: "pointer",
            minWidth: 280,
          }}>
            <I.search size={13}/>
            <span style={{ flex: 1, textAlign: "left" }}>กระโดดไปหน้าใดก็ได้ · ค้นหา…</span>
            <kbd style={{ fontSize: 10, padding: "1px 6px", background: "#F6F1E8", border: "1px solid #E7DFD1", borderRadius: 4, color: "#243447", fontFamily: "ui-monospace, monospace" }}>⌘K</kbd>
          </button>
          <button style={iconBtn} aria-label="To-Do">
            <I.inbox size={18}/>
            <span style={{
              position: "absolute", top: 4, right: 4,
              minWidth: 16, height: 16, borderRadius: 999,
              background: "#E11D48", color: "#fff",
              fontSize: 9, fontWeight: 700,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0 4px",
              border: "1.5px solid #FCFAF5",
            }}>5</span>
          </button>
          <button style={iconBtn} aria-label="แจ้งเตือน">
            <I.bell size={18}/>
            <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 999, background: "#1FA8A0", border: "1.5px solid #FCFAF5" }}/>
          </button>
          <button style={iconBtn} aria-label="ตั้งค่า"><I.cog size={18}/></button>
        </div>

        <div style={{ padding: "22px 28px 0", background: "#F6F1E8" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 18, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700, marginBottom: 4 }}>
                สวัสดิการ
              </div>
              <h1 style={{
                fontFamily: "'CPN Condensed', sans-serif",
                fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em",
                lineHeight: 1.1, margin: 0,
              }}>{current?.l}</h1>
              <div style={{ fontSize: 13, color: "#5A6A7E", marginTop: 4 }}>{current?.sub}</div>
            </div>
            {tab === "approval" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "9px 16px", borderRadius: 10,
                  background: "#FFFFFF", color: "#243447", border: "1px solid #E7DFD1",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>เลือกหลายรายการ</button>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "9px 16px", borderRadius: 10,
                  background: "#1FA8A0", color: "#fff", border: 0,
                  fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}><I.check size={14}/> อนุมัติทั้งหมด</button>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #E7DFD1", marginLeft: -4 }}>
            {PDM_TABS.map(t => {
              const active = t.id === tab;
              return (
                <button key={t.id}
                        onClick={() => setTab(t.id)}
                        style={{
                  padding: "10px 16px",
                  background: "transparent", border: 0,
                  borderBottom: active ? `2px solid ${P.accent}` : "2px solid transparent",
                  marginBottom: -1,
                  fontFamily: "inherit", fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#0E1B2C" : "#5A6A7E",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  {t.l}
                  {t.badge && (
                    <span style={{
                      background: active ? P.accent : "#E7DFD1",
                      color: active ? "#fff" : "#5A6A7E",
                      fontSize: 9, fontWeight: 700,
                      padding: "1px 6px", borderRadius: 999,
                    }}>{t.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "20px 28px 32px", flex: 1, background: "#F6F1E8" }}>
          {tab === "approval" && <PDM_Approval/>}
          {tab === "team"     && <PDM_TeamBalances/>}
          {(tab === "history" || tab === "my") && <PDM_Placeholder tab={current}/>}
        </div>
      </main>
    </div>
  );
}

window.PatternD_BenefitMgr = PatternD_BenefitMgr;
