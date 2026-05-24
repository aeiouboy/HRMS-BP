// mod-pd-home-emp.jsx — Pattern D · หน้าหลัก · Employee
// Single-tab landing page (home doesn't need internal tabs).

function PDHomeEmp() {
  const I = window.PI;
  const P = window.PD_PERSONAS.employee;

  return (
    <window.PatternDShell
      persona="employee"
      moduleId="home"
      moduleTitle="หน้าหลัก"
      pageTitle="สวัสดีตอนเช้า คุณกฤษณ์"
      pageSub="วันพฤหัสบดี · 22 พฤษภาคม 2569 · มีกิจกรรม 3 รายการวันนี้"
      tabs={[]}
      actions={[
        <window.PDButton key="leave" icon="calendar">ขอลา</window.PDButton>,
        <window.PDButton key="claim" icon="heart" kind="primary">เบิกสวัสดิการ</window.PDButton>,
      ]}
    >
      {/* Row 1: KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 }}>
        <PDH_Stat label="วันลาคงเหลือ" value="6.5 วัน" sub="พักร้อน 5 · ป่วย 1.5" color="#1FA8A0"/>
        <PDH_Stat label="วงเงินสวัสดิการ" value="฿26,000" sub="ใช้ไป ฿36,500 / ฿62,500"/>
        <PDH_Stat label="สลิปล่าสุด" value="เม.ย. 69" sub="พฤ. 31 พ.ค. รอบใหม่"/>
        <PDH_Stat label="ตอกเข้าวันนี้" value="08:54" sub="ก่อนเวลา 6 นาที" color="#10B981"/>
      </div>

      {/* Row 2: 3-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <PDH_Today/>
        <PDH_Side/>
      </div>

      {/* Row 3: Announcements + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <PDH_Announcements/>
        <PDH_Activity/>
      </div>
    </window.PatternDShell>
  );
}

function PDH_Stat({ label, value, sub, color }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: "16px 20px" }}>
      <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 26, fontWeight: 700, color: color || "#0E1B2C", marginTop: 6, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 5 }}>{sub}</div>
    </div>
  );
}

function PDH_Today() {
  const I = window.PI;
  const ITEMS = [
    { t:"08:54", l:"ตอกบัตรเข้างาน", st:"done",     icon:"check",       color:"#10B981" },
    { t:"10:30", l:"ประชุมประจำสัปดาห์ · ห้องประชุม 2",   st:"upcoming", icon:"users",       color:"#5B6CE0" },
    { t:"14:00", l:"อบรม Compliance ไตรมาส 2 (online)",   st:"upcoming", icon:"book",        color:"#7DA084" },
    { t:"17:00", l:"ลูกค้านัด · เคาน์เตอร์ Estée Lauder",  st:"upcoming", icon:"calendar",    color:"#E08864" },
    { t:"18:00", l:"ตอกบัตรออก",      st:"future",   icon:"calendarPlus", color:"#8A97A8" },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 22 }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>วันนี้</div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 20, fontWeight: 700, marginTop: 4 }}>ตารางและกิจกรรม</div>
        </div>
        <button style={{ background:"transparent", border:0, color:"#1FA8A0", fontSize: 12, fontWeight: 700, cursor:"pointer", fontFamily:"inherit" }}>ดูทั้งหมด →</button>
      </div>
      {ITEMS.map((it, i) => {
        const Glyph = I[it.icon] || I.calendar;
        const done = it.st === "done";
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "60px 32px 1fr auto",
            gap: 12, padding: "12px 0",
            borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
            alignItems: "center",
            opacity: it.st === "future" ? 0.6 : 1,
          }}>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#5A6A7E" }}>{it.t}</div>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: it.color + "1F", color: it.color,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Glyph size={13}/></div>
            <div style={{ fontSize: 13, fontWeight: done ? 500 : 600, color: "#0E1B2C", textDecoration: done ? "line-through" : "none" }}>{it.l}</div>
            <div style={{ fontSize: 10, color: "#8A97A8" }}>{it.st === "done" ? "เสร็จแล้ว" : it.st === "upcoming" ? "ต่อไป" : "ในอนาคต"}</div>
          </div>
        );
      })}
    </div>
  );
}

function PDH_Side() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Punch */}
      <div style={{
        background: "linear-gradient(135deg, #1FA8A0 0%, #0A6E68 100%)",
        color: "#FCFAF5",
        borderRadius: 14, padding: 22,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.7, fontWeight: 700 }}>ตอกบัตร</div>
        <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 6 }}>09:32:14</div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>เข้าเมื่อ 08:54 · ทำงานมาแล้ว 0:38</div>
        <button style={{
          marginTop: 14, padding: "10px 18px", borderRadius: 8,
          background: "rgba(255,255,255,0.18)", color: "#FCFAF5",
          border: "1px solid rgba(255,255,255,0.3)",
          fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer",
          width: "100%",
        }}>ตอกบัตรออก (เหลือ 8:26)</button>
      </div>
      {/* Quick links */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700, marginBottom: 10 }}>ลัด</div>
        {[
          { l:"ขอลาพักร้อน", sub:"3 คลิก", ic:"calendar" },
          { l:"เบิกค่ารักษา", sub:"แนบใบเสร็จได้", ic:"heart" },
          { l:"ดูสลิปเงินเดือน", sub:"เม.ย. 69 พร้อม", ic:"wallet" },
          { l:"ขอเอกสารรับรอง", sub:"3 ประเภท", ic:"fileText" },
        ].map((q, i) => {
          const Glyph = window.PI[q.ic];
          return (
            <button key={i} style={{
              display: "grid", gridTemplateColumns: "28px 1fr auto",
              gap: 10, padding: "10px 8px",
              background: "transparent", border: 0, width: "100%", cursor: "pointer",
              borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
              fontFamily: "inherit", textAlign: "left",
            }}>
              <Glyph size={16} style={{ color: "#5A6A7E" }}/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0E1B2C" }}>{q.l}</div>
                <div style={{ fontSize: 10.5, color: "#8A97A8" }}>{q.sub}</div>
              </div>
              <span style={{ color: "#C9BFAE" }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PDH_Announcements() {
  const POSTS = [
    { pin:true, t:"ปรับปรุงระบบ payroll · 18-20 พ.ค.", sub:"ฝ่ายไอที · 30 นาทีที่แล้ว",  cat:"ระบบ" },
    { pin:false, t:"พรุ่งนี้มีงาน Town Hall ไตรมาส 2", sub:"CEO · เมื่อวาน",                cat:"บริษัท" },
    { pin:false, t:"เปิดสาขา Central EmSphere ก.ค.",   sub:"ฝ่ายการตลาด · 2 วันก่อน",       cat:"ข่าว" },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 22 }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>ประกาศ</div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 4 }}>สำคัญสำหรับคุณ</div>
        </div>
        <button style={{ background:"transparent", border:0, color:"#1FA8A0", fontSize: 12, fontWeight: 700, cursor:"pointer", fontFamily:"inherit" }}>ดูทั้งหมด →</button>
      </div>
      {POSTS.map((p, i) => (
        <div key={i} style={{
          padding: "12px 14px", borderRadius: 10,
          background: p.pin ? "#FEF3C7" : "transparent",
          marginBottom: i < POSTS.length - 1 ? 8 : 0,
          borderLeft: p.pin ? "3px solid #F59E0B" : "3px solid transparent",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            {p.pin && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "#F59E0B", color: "#fff", fontWeight: 700, letterSpacing: ".1em" }}>ปักหมุด</span>}
            <span style={{ fontSize: 9.5, color: "#8A97A8", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>{p.cat}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0E1B2C" }}>{p.t}</div>
          <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 2 }}>{p.sub}</div>
        </div>
      ))}
    </div>
  );
}

function PDH_Activity() {
  const ITEMS = [
    { t:"ใบลาของคุณได้รับการอนุมัติ", sub:"5 นาทีก่อน · 22 พ.ค.",   ic:"check",    color:"#10B981" },
    { t:"สลิปเงินเดือน เม.ย. พร้อมแล้ว", sub:"1 ชม.ก่อน",            ic:"wallet",   color:"#5B6CE0" },
    { t:"วงเงินสวัสดิการเดือนใหม่ +฿5,200", sub:"เมื่อวาน",              ic:"heart",    color:"#1FA8A0" },
    { t:"คอร์ส Compliance Q2 เริ่มแล้ว",     sub:"2 วันก่อน",              ic:"book",     color:"#7DA084" },
  ];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E7DFD1", borderRadius: 14, padding: 22 }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>กิจกรรม</div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 4 }}>ของฉันล่าสุด</div>
        </div>
      </div>
      {ITEMS.map((it, i) => {
        const Glyph = window.PI[it.ic];
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "28px 1fr",
            gap: 10, padding: "10px 0",
            borderTop: i === 0 ? 0 : "1px solid #F1ECDF",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: it.color + "1F", color: it.color,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Glyph size={13}/></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.t}</div>
              <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 2 }}>{it.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

window.PDHomeEmp = PDHomeEmp;
