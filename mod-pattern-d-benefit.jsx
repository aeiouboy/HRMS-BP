// mod-pattern-d-benefit.jsx — Pattern D mockup applied to Benefit module
// Employee persona · "เบิกใหม่" sub-page selected by default.

const PDB_NAV = [
  { group: "พื้นที่ทำงาน", items: [
    { id:"home",     l:"หน้าหลัก",            ico:"home" },
    { id:"profile",  l:"โปรไฟล์ของฉัน",       ico:"user" },
    { id:"timeoff",  l:"การลา",                ico:"calendar" },
    { id:"time",     l:"ลงเวลา · ตารางกะ",     ico:"calendarPlus" },
    { id:"benefit",  l:"สวัสดิการ",            ico:"heart", active:true },
    { id:"payroll",  l:"เงินเดือน",            ico:"wallet" },
    { id:"requests", l:"คำร้องและแบบฟอร์ม",   ico:"fileText" },
  ]},
  { group: "บุคลากร", items: [
    { id:"goals",    l:"เป้าหมาย · ผลงาน",     ico:"barChart" },
    { id:"learning", l:"การเรียนรู้",          ico:"book" },
    { id:"org",      l:"ผังองค์กร",            ico:"network" },
  ]},
  { group: "บริษัท", items: [
    { id:"announce", l:"ประกาศและข่าวสาร",   ico:"mega" },
  ]},
];

const PDB_TABS = [
  { id:"new",      l:"เบิกใหม่",         sub:"สร้างคำขอเบิกสวัสดิการ" },
  { id:"balance",  l:"วงเงินคงเหลือ",    sub:"สิทธิประจำปีของคุณ" },
  { id:"history",  l:"ประวัติการเบิก",    sub:"12 เดือนล่าสุด", badge:3 },
  { id:"plans",    l:"แผนของฉัน",         sub:"แผนสวัสดิการที่ได้รับ" },
  { id:"faq",      l:"คำถามที่พบบ่อย",    sub:"วิธีเบิก · เอกสาร · เงื่อนไข" },
];

const PDB_PERSONA = { name:"คุณกฤษณ์ ส.", role:"พนักงานขาย · CWO", initials:"กษ", accent:"#1FA8A0" };

// ─── Body: "เบิกใหม่" form ─────────────────────────────────────────────

function PDB_NewClaim() {
  const I = window.PI;
  const CATEGORIES = [
    { id:"med",      ico:"heart",    l:"ค่ารักษาพยาบาล",      sub:"ผู้ป่วยนอก · IPD · ทันตกรรม", left:"฿18,500 / ฿30,000", color:"#1FA8A0" },
    { id:"eye",      ico:"shield",   l:"แว่นสายตา",            sub:"ทุก 2 ปี",                       left:"฿0 / ฿4,500",      color:"#5B6CE0" },
    { id:"edu",      ico:"book",     l:"การศึกษาบุตร",         sub:"อนุบาล – ม.6",                  left:"฿12,000 / ฿15,000", color:"#7DA084" },
    { id:"dental",   ico:"heart",    l:"ทันตกรรม",             sub:"แยกจากค่ารักษาทั่วไป",         left:"฿2,800 / ฿5,000",  color:"#E08864" },
    { id:"travel",   ico:"globe",    l:"ค่าเดินทาง",           sub:"ออกต่างจังหวัด · ติดต่องาน",   left:"฿3,200 / ฿8,000",  color:"#D4A53A" },
    { id:"other",    ico:"fileText", l:"อื่นๆ",                sub:"กิจกรรมพิเศษ · ของขวัญลูก",     left:"—",                 color:"#8A97A8" },
  ];

  return (
    <>
      {/* Hero card */}
      <div style={{
        background: "linear-gradient(135deg, #D6EEEC 0%, #F6F1E8 100%)",
        border: "1px solid #BCDFDB",
        borderRadius: 14, padding: "20px 24px",
        marginBottom: 18,
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#0A6E68", fontWeight: 700 }}>วงเงินรวมปีนี้</div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 32, fontWeight: 700, color: "#0E1B2C", marginTop: 4, letterSpacing: "-0.02em" }}>
            ฿36,500 <span style={{ fontSize: 16, color: "#5A6A7E", fontWeight: 500 }}>/ ฿62,500</span>
          </div>
          <div style={{ fontSize: 12, color: "#5A6A7E", marginTop: 4 }}>เหลือใช้ ฿26,000 · 58% ของวงเงิน</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: "#5A6A7E", textAlign: "right" }}>
          <span>วันหมดเขตเบิก</span>
          <span style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 17, color: "#0E1B2C", fontWeight: 700 }}>31 ธ.ค. 2569</span>
          <span style={{ fontSize: 10, color: "#8A97A8" }}>เหลือ 224 วัน</span>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{
        display: "flex", gap: 10, marginBottom: 18, padding: "12px 16px",
        background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 10,
        alignItems: "center",
      }}>
        <span style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>ขั้นตอน</span>
        {["เลือกประเภท","กรอกข้อมูล","แนบเอกสาร","ตรวจสอบ"].map((s, i) => (
          <React.Fragment key={s}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? "#0E1B2C" : "#8A97A8",
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                background: i === 0 ? "#1FA8A0" : "#E7DFD1",
                color: i === 0 ? "#fff" : "#8A97A8",
                fontSize: 10, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{i + 1}</span>
              {s}
            </span>
            {i < 3 && <span style={{ color: "#C9BFAE" }}>›</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Category grid */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0E1B2C", marginBottom: 10 }}>เลือกประเภทที่ต้องการเบิก</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {CATEGORIES.map(c => {
            const Glyph = I[c.ico] || I.heart;
            return (
              <button key={c.id} style={{
                background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 12,
                padding: "16px 18px", textAlign: "left",
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: c.color + "1F", color: c.color,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}><Glyph size={16}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0E1B2C", marginBottom: 2 }}>{c.l}</div>
                  <div style={{ fontSize: 11, color: "#5A6A7E", lineHeight: 1.4 }}>{c.sub}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: c.color, fontWeight: 600 }}>เหลือ {c.left}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Body: "วงเงินคงเหลือ" ────────────────────────────────────────────

function PDB_Balance() {
  const BALANCES = [
    { l:"ค่ารักษาพยาบาล",      used:18500, max:30000, color:"#1FA8A0" },
    { l:"แว่นสายตา",             used:0,     max:4500,  color:"#5B6CE0" },
    { l:"การศึกษาบุตร",          used:12000, max:15000, color:"#7DA084" },
    { l:"ทันตกรรม",              used:2800,  max:5000,  color:"#E08864" },
    { l:"ค่าเดินทาง",            used:3200,  max:8000,  color:"#D4A53A" },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 24 }}>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        วงเงินสวัสดิการประจำปี 2569
      </div>
      {BALANCES.map((b, i) => {
        const pct = (b.used / b.max) * 100;
        return (
          <div key={i} style={{ padding: "14px 0", borderTop: i === 0 ? 0 : "1px solid #F1ECDF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0E1B2C" }}>{b.l}</span>
              <span style={{ fontSize: 13, color: "#5A6A7E", fontFamily: "ui-monospace, monospace" }}>
                <b style={{ color: b.color }}>฿{b.used.toLocaleString()}</b> / ฿{b.max.toLocaleString()}
              </span>
            </div>
            <div style={{ height: 8, background: "#F6F1E8", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: b.color, borderRadius: 999 }}/>
            </div>
            <div style={{ fontSize: 10, color: "#8A97A8", marginTop: 4 }}>เหลือ ฿{(b.max - b.used).toLocaleString()} · {(100-pct).toFixed(0)}%</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Body: "ประวัติการเบิก" ────────────────────────────────────────────

function PDB_History() {
  const ITEMS = [
    { date:"15 พ.ค. 69", cat:"ค่ารักษาพยาบาล", desc:"รพ.บำรุงราษฎร์ · ตรวจประจำปี",        amount:4200, status:"approved" },
    { date:"22 เม.ย. 69", cat:"การศึกษาบุตร",   desc:"เทอม 1/2569 · ลูกชาย",                amount:12000, status:"approved" },
    { date:"8 เม.ย. 69",  cat:"ทันตกรรม",        desc:"คลินิกฟัน Smile · ขูดหินปูน",         amount:1800,  status:"approved" },
    { date:"30 มี.ค. 69", cat:"ค่ารักษาพยาบาล", desc:"รพ.สมิติเวช · ลูกป่วย",                amount:6800,  status:"approved" },
    { date:"18 มี.ค. 69", cat:"ค่าเดินทาง",      desc:"ออกต่างจังหวัด · ประชุมสาขา Lopburi", amount:3200,  status:"pending", note:"รออนุมัติจากหัวหน้า" },
    { date:"5 มี.ค. 69",  cat:"ทันตกรรม",        desc:"คลินิกฟัน Smile · อุดฟัน",            amount:1000,  status:"approved" },
  ];
  const STATUS = {
    approved: { l:"อนุมัติแล้ว", bg:"#D1FAE5", fg:"#065F46" },
    pending:  { l:"รอตรวจ",      bg:"#FEF3C7", fg:"#92400E" },
    rejected: { l:"ปฏิเสธ",      bg:"#FFE4E1", fg:"#9A3412" },
  };
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, overflow: "hidden" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "110px 160px 1fr 120px 120px",
        padding: "12px 20px", background: "#FCFAF5", borderBottom: "1px solid #E7DFD1",
        fontSize: 10, fontWeight: 700, color: "#5A6A7E", letterSpacing: ".08em", textTransform: "uppercase",
      }}>
        <div>วันที่</div>
        <div>ประเภท</div>
        <div>รายละเอียด</div>
        <div style={{ textAlign:"right" }}>จำนวน</div>
        <div>สถานะ</div>
      </div>
      {ITEMS.map((it, i) => {
        const st = STATUS[it.status];
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "110px 160px 1fr 120px 120px",
            padding: "12px 20px", borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
            fontSize: 12.5, alignItems: "center",
          }}>
            <div style={{ color: "#5A6A7E" }}>{it.date}</div>
            <div style={{ fontWeight: 600 }}>{it.cat}</div>
            <div>{it.desc} {it.note && <span style={{ color:"#92400E", fontSize: 11 }}>· {it.note}</span>}</div>
            <div style={{ textAlign: "right", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>฿{it.amount.toLocaleString()}</div>
            <div>
              <span style={{ padding: "3px 9px", borderRadius: 999, background: st.bg, color: st.fg, fontSize: 10.5, fontWeight: 700 }}>{st.l}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PDB_Placeholder({ tab }) {
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

// ─── Main shell ──────────────────────────────────────────────────────

function PatternD_Benefit() {
  const I = window.PI;
  const [tab, setTab] = React.useState("new");
  const P = PDB_PERSONA;
  const current = PDB_TABS.find(t => t.id === tab);

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
        {PDB_NAV.map(group => (
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
          <button style={iconBtn} aria-label="To-Do"><I.inbox size={18}/></button>
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
            {tab === "new" && (
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 16px", borderRadius: 10,
                background: P.accent, color: "#fff", border: 0,
                fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                <I.plus size={14}/> เริ่มเบิกใหม่
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #E7DFD1", marginLeft: -4 }}>
            {PDB_TABS.map(t => {
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
          {tab === "new"     && <PDB_NewClaim/>}
          {tab === "balance" && <PDB_Balance/>}
          {tab === "history" && <PDB_History/>}
          {(tab === "plans" || tab === "faq") && <PDB_Placeholder tab={current}/>}
        </div>
      </main>
    </div>
  );
}

window.PatternD_Benefit = PatternD_Benefit;

