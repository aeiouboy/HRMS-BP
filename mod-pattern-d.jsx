// mod-pattern-d.jsx — Pattern D mockup: compact sidebar + in-module tabs + ⌘K
// Time module · Manager persona · "จัดกะทีม" sub-page selected by default.

const PD_NAV = [
  { group: "พื้นที่ทำงาน", items: [
    { id:"home",     l:"หน้าหลัก",            ico:"home" },
    { id:"todo",     l:"To-Do",                ico:"checkSquare", badge:5 },
    { id:"profile",  l:"โปรไฟล์ของฉัน",       ico:"user" },
    { id:"timeoff",  l:"การลา",                ico:"calendar" },
    { id:"time",     l:"ลงเวลา · ตารางกะ",     ico:"calendarPlus", active:true },
    { id:"benefit",  l:"สวัสดิการ",            ico:"heart" },
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

const PD_TABS = [
  { id:"punch",    l:"ตอกบัตร",         sub:"เข้า-ออก วันนี้" },
  { id:"my",       l:"ตารางกะของฉัน",   sub:"กะของตัวเอง" },
  { id:"roster",   l:"จัดกะทีม",         sub:"7 คน · สัปดาห์นี้" },
  { id:"requests", l:"ขอแก้เวลา",        sub:"คำขอจากทีม", badge:3 },
  { id:"ot",       l:"OT",               sub:"ขออนุมัติล่วงเวลา" },
  { id:"reports",  l:"รายงาน",           sub:"สรุปเวลาทำงาน" },
];

const PD_PERSONA = { name:"คุณสมชาย ช.", role:"Store Manager · CWO", initials:"สม", accent:"#7DA084" };

const pd_iconBtn = {
  width: 40, height: 40, borderRadius: 10,
  background: "#FFFFFF", border: "1px solid #E7DFD1",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  color: "#243447", cursor: "pointer", position: "relative",
};
const pd_btnPrim = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "9px 16px", borderRadius: 10,
  background: "#1FA8A0", color: "#fff", border: 0,
  fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
};
const pd_btnGhost = { ...pd_btnPrim, background: "#FFFFFF", color: "#243447", border: "1px solid #E7DFD1" };

// ─── Body sub-components ─────────────────────────────────────────────

function PD_Kpi({ label, value, sub, color }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: "16px 20px" }}>
      <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 26, fontWeight: 700, color: color || "#0E1B2C", marginTop: 6, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

function PD_Roster() {
  const SHIFTS = {
    M: { bg:"#D6EEEC", fg:"#0A6E68", l:"เช้า" },
    A: { bg:"#FEF3C7", fg:"#92660C", l:"บ่าย" },
    O: { bg:"#F6F1E8", fg:"#8A97A8", l:"หยุด" },
    L: { bg:"#FFE4E1", fg:"#9A3412", l:"ลา" },
  };
  const TEAM = [
    { n:"สมศักดิ์ ช.",   ini:"สม", days:["M","M","M","M","M","O","O"] },
    { n:"กฤษณ์ ส.",      ini:"กษ", days:["M","M","M","O","M","O","O"] },
    { n:"ปริยา ส.",      ini:"ปร", days:["A","A","A","M","M","M","O"] },
    { n:"ศิรินภา ท.",    ini:"ศน", days:["A","A","L","O","A","A","M"] },
    { n:"ณัฐกานต์ พ.",   ini:"ณก", days:["M","M","O","A","A","A","O"] },
    { n:"อัครเดช ม.",    ini:"อด", days:["M","M","M","M","O","O","M"] },
    { n:"ธนากร พ.",      ini:"ธก", days:["O","M","M","M","M","M","O"] },
  ];
  const DOW = ["จ. 18","อ. 19","พ. 20","พฤ. 21","ศ. 22","ส. 23","อา. 24"];

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 }}>
        <PD_Kpi label="ชั่วโมงรวม" value="301h" sub="เป้า 280h · เกิน 21h" color="#F59E0B"/>
        <PD_Kpi label="ค่าแรงประมาณ" value="฿62,180" sub="incl. OT ฿4,200"/>
        <PD_Kpi label="ครอบคลุมกะเช้า" value="100%" sub="4+/วัน ทุกวัน" color="#10B981"/>
        <PD_Kpi label="ครอบคลุมกะบ่าย" value="57%" sub="ขาด 2 ช่อง (พ-พฤ)" color="#F59E0B"/>
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "200px repeat(7, 1fr)",
          background: "#FCFAF5", borderBottom: "1px solid #E7DFD1",
          fontSize: 10, fontWeight: 700, color: "#5A6A7E", letterSpacing: ".08em", textTransform: "uppercase",
        }}>
          <div style={{ padding: "12px 16px" }}>พนักงาน</div>
          {DOW.map(d => <div key={d} style={{ padding: "12px 6px", textAlign: "center", borderLeft: "1px solid #F1ECDF" }}>{d}</div>)}
        </div>
        {TEAM.map(t => (
          <div key={t.n} style={{ display: "grid", gridTemplateColumns: "200px repeat(7, 1fr)", borderTop: "1px solid #F1ECDF", alignItems: "stretch" }}>
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: "linear-gradient(135deg, #7DA084, #9BB5A0)", color: "#fff",
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{t.ini}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t.n}</div>
            </div>
            {t.days.map((s, i) => {
              const sh = SHIFTS[s];
              return (
                <div key={i} style={{ borderLeft: "1px solid #F1ECDF", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52 }}>
                  <div style={{
                    width: "100%", height: 40,
                    background: sh.bg, color: sh.fg,
                    borderRadius: 6,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", lineHeight: 1.1,
                  }}>
                    <span style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 13, fontWeight: 700 }}>{s}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 600, opacity: 0.85 }}>{sh.l}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function PD_Placeholder({ tab }) {
  return (
    <div style={{
      padding: "60px 24px", background: "#FFFFFF",
      border: "1px dashed #E7DFD1", borderRadius: 14,
      textAlign: "center",
    }}>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: "#0E1B2C", marginBottom: 6 }}>
        {tab.l}
      </div>
      <div style={{ fontSize: 13, color: "#5A6A7E" }}>
        {tab.sub} · กดที่ tab "จัดกะทีม" เพื่อดูตัวอย่างเต็ม
      </div>
    </div>
  );
}

// ─── Main mockup ─────────────────────────────────────────────────────

function PatternD_Time() {
  const I = window.PI;
  const [tab, setTab] = React.useState("roster");
  const P = PD_PERSONA;
  const current = PD_TABS.find(t => t.id === tab);

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "240px 1fr",
      minHeight: 900, height: "100%",
      background: "#F6F1E8",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      color: "#0E1B2C",
    }}>
      {/* SIDEBAR */}
      <aside style={{
        background: "#0E1B2C", color: "#E7E3D8",
        padding: "16px 12px 14px",
        display: "flex", flexDirection: "column", gap: 2,
        borderTop: `3px solid ${P.accent}`,
      }}>
        <div style={{ padding: "4px 8px 12px" }}>
          <img src={window.__resources.humiLogo} alt="Humi" style={{ height: 38, width: "auto", filter: "brightness(1.1)" }}/>
        </div>
        {PD_NAV.map(group => (
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
                    <span style={{
                      background: "#E11D48", color: "#fff",
                      fontSize: 9, fontWeight: 700,
                      padding: "1px 6px", borderRadius: 999,
                    }}>{it.badge}</span>
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
            <div style={{ fontSize: 11.5, color: "#FCFAF5", fontWeight: 600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{P.name}</div>
            <div style={{ fontSize: 9.5, color: "rgba(231,227,216,0.5)" }}>{P.role}</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <div style={{
          padding: "14px 28px",
          borderBottom: "1px solid #E7DFD1",
          background: "#FCFAF5",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ color: "#8A97A8" }}>ลงเวลา · ตารางกะ</span>
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
          <button style={pd_iconBtn} aria-label="To-Do">
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
          <button style={pd_iconBtn} aria-label="แจ้งเตือน">
            <I.bell size={18}/>
            <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 999, background: "#1FA8A0", border: "1.5px solid #FCFAF5" }}/>
          </button>
          <button style={pd_iconBtn} aria-label="ตั้งค่า"><I.cog size={18}/></button>
        </div>

        {/* MODULE HEADER + TABS */}
        <div style={{ padding: "22px 28px 0", background: "#F6F1E8" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 18, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700, marginBottom: 4 }}>
                ลงเวลา · ตารางกะ
              </div>
              <h1 style={{
                fontFamily: "'CPN Condensed', sans-serif",
                fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em",
                lineHeight: 1.1, margin: 0,
              }}>{current?.l}</h1>
              <div style={{ fontSize: 13, color: "#5A6A7E", marginTop: 4 }}>{current?.sub}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={pd_btnGhost}><I.copy size={14}/> Copy สัปดาห์ที่แล้ว</button>
              <button style={pd_btnPrim}><I.send size={14}/> ประกาศกะ + แจ้งทีม</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #E7DFD1", marginLeft: -4 }}>
            {PD_TABS.map(t => {
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

        {/* BODY */}
        <div style={{ padding: "20px 28px 32px", flex: 1, background: "#F6F1E8" }}>
          {tab === "roster" ? <PD_Roster/> : <PD_Placeholder tab={current}/>}
        </div>
      </main>
    </div>
  );
}

window.PatternD_Time = PatternD_Time;
