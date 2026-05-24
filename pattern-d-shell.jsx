// pattern-d-shell.jsx — Central Pattern D shell component
// Use: <PatternDShell persona="..." moduleId="..." tabs={[...]}>{body}</PatternDShell>

// ─── Persona registry ─────────────────────────────────────────────────
const PD_PERSONAS = {
  employee: { name:"คุณกฤษณ์ ส.",  role:"พนักงานขาย · CWO",       initials:"กษ", accent:"#1FA8A0", grad:"linear-gradient(135deg, #1FA8A0, #9BB5A0)" },
  manager:  { name:"คุณสมชาย ช.",  role:"Store Manager · CWO",    initials:"สม", accent:"#7DA084", grad:"linear-gradient(135deg, #7DA084, #9BB5A0)" },
  admin:    { name:"คุณจงรักษ์ พ.", role:"HR Admin · HRBP",         initials:"จง", accent:"#E08864", grad:"linear-gradient(135deg, #E08864, #E8C46B)" },
  hris:     { name:"คุณพรวลัย ก.",  role:"HRIS Manager",            initials:"พร", accent:"#D4A53A", grad:"linear-gradient(135deg, #D4A53A, #E8C46B)" },
  spd:      { name:"คุณนภสร ท.",    role:"SPD Officer",             initials:"นภ", accent:"#5F7689", grad:"linear-gradient(135deg, #5F7689, #8D9BAA)" },
};

// ─── Sidebar config (per persona) ─────────────────────────────────────
// Single source of truth: defines what each persona sees.
const PD_SIDEBAR = [
  { group:"พื้นที่ทำงาน", items: [
    { id:"home",     l:"หน้าหลัก",            ico:"home",         show:["employee","manager","admin","hris","spd"] },
    { id:"todo",     l:"To-Do",                ico:"checkSquare",   show:["manager","admin","hris","spd"], badge:{manager:5,admin:4,hris:2,spd:3} },
    { id:"profile",  l:"โปรไฟล์ของฉัน",       ico:"user",         show:["employee","manager","admin","hris","spd"] },
    { id:"timeoff",  l:"การลา",                ico:"calendar",     show:["employee","manager","admin"] },
    { id:"time",     l:"ลงเวลา · ตารางกะ",     ico:"calendarPlus", show:["employee","manager","admin","spd"] },
    { id:"benefit",  l:"สวัสดิการ",            ico:"heart",        show:["employee","manager","admin","hris","spd"] },
    { id:"payroll",  l:"เงินเดือน",            ico:"wallet",       show:["employee","manager","admin","hris","spd"] },
    { id:"requests", l:"คำร้องและแบบฟอร์ม",   ico:"fileText",     show:["employee","manager","admin","spd"] },
  ]},
  { group:"บุคลากร", items: [
    { id:"team",      l:"ทีมของฉัน",          ico:"users",     show:["manager"] },
    { id:"employees", l:"ทะเบียนพนักงาน",     ico:"users",     show:["admin","hris","spd"] },
    { id:"hire",      l:"จ้างพนักงานใหม่",     ico:"plus",      show:["admin"] },
    { id:"goals",     l:"เป้าหมาย · ผลงาน",    ico:"barChart",  show:["employee","manager","admin"] },
    { id:"learning",  l:"การเรียนรู้",         ico:"book",      show:["employee","manager","admin"] },
    { id:"org",       l:"ผังองค์กร",           ico:"network",   show:["employee","manager","admin","hris","spd"] },
  ]},
  { group:"บริษัท", items: [
    { id:"announce",   l:"ประกาศและข่าวสาร", ico:"mega",   show:["employee","manager","admin","hris","spd"] },
    { id:"admin-hub",  l:"ศูนย์รวม Admin",   ico:"shield", show:["admin","hris","spd"] },
    { id:"system",     l:"จัดการระบบ",       ico:"cog",    show:["admin","hris"] },
  ]},
];

// ─── Topbar ───────────────────────────────────────────────────────────

function PDTopbar({ persona, moduleTitle, tabLabel }) {
  const I = window.PI;
  const inboxCount = persona === "spd" ? "3" : persona === "admin" ? "4"
                    : persona === "manager" ? "5" : persona === "hris" ? "2" : null;
  const iconBtn = {
    width: 40, height: 40, borderRadius: 10,
    background: "#FFFFFF", border: "1px solid #E7DFD1",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "#243447", cursor: "pointer", position: "relative",
  };
  return (
    <div style={{
      padding: "14px 28px",
      borderBottom: "1px solid #E7DFD1",
      background: "#FCFAF5",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
        <span style={{ color: "#8A97A8" }}>{moduleTitle}</span>
        {tabLabel && <span style={{ color: "#C9BFAE" }}>›</span>}
        {tabLabel && <span style={{ color: "#0E1B2C", fontWeight: 600 }}>{tabLabel}</span>}
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
        {inboxCount && (
          <span style={{
            position: "absolute", top: 4, right: 4,
            minWidth: 16, height: 16, borderRadius: 999,
            background: "#E11D48", color: "#fff",
            fontSize: 9, fontWeight: 700,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "0 4px",
            border: "1.5px solid #FCFAF5",
          }}>{inboxCount}</span>
        )}
      </button>
      <button style={iconBtn} aria-label="แจ้งเตือน">
        <I.bell size={18}/>
        <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 999, background: "#1FA8A0", border: "1.5px solid #FCFAF5" }}/>
      </button>
      <button style={iconBtn} aria-label="ตั้งค่า"><I.cog size={18}/></button>
    </div>
  );
}

// ─── Main shell ───────────────────────────────────────────────────────

function PatternDShell({
  persona = "employee",
  moduleId,
  moduleTitle,
  pageTitle,
  pageSub,
  tabs = [],
  activeTab,
  onTabChange,
  actions,
  children,
}) {
  const P = PD_PERSONAS[persona] || PD_PERSONAS.employee;
  const current = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "240px 1fr",
      minHeight: 900, height: "100%",
      background: "#F6F1E8",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      color: "#0E1B2C",
    }}>
      <PDSidebar persona={persona} moduleId={moduleId}/>

      <main style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <PDTopbar persona={persona} moduleTitle={moduleTitle} tabLabel={current?.l || pageTitle}/>

        <div style={{ padding: "22px 28px 0", background: "#F6F1E8" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 18, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700, marginBottom: 4 }}>
                {moduleTitle}
              </div>
              <h1 style={{
                fontFamily: "'CPN Condensed', sans-serif",
                fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em",
                lineHeight: 1.1, margin: 0,
              }}>{pageTitle || current?.l}</h1>
              {(pageSub || current?.sub) && (
                <div style={{ fontSize: 13, color: "#5A6A7E", marginTop: 4 }}>{pageSub || current?.sub}</div>
              )}
            </div>
            {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
          </div>
          {tabs.length > 0 && (
            <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #E7DFD1", marginLeft: -4 }}>
              {tabs.map(t => {
                const active = t.id === activeTab;
                return (
                  <button key={t.id}
                          onClick={() => onTabChange && onTabChange(t.id)}
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
          )}
        </div>

        <div style={{ padding: "20px 28px 32px", flex: 1, background: "#F6F1E8" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

// ─── Atom helpers (shared body building blocks) ──────────────────────

function PDButton({ kind = "ghost", icon, children, onClick }) {
  const I = window.PI;
  const Glyph = icon ? I[icon] : null;
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "9px 16px", borderRadius: 10,
    fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
    border: 0,
  };
  const styles = {
    primary: { ...base, background: "#1FA8A0", color: "#fff" },
    ghost:   { ...base, background: "#FFFFFF", color: "#243447", border: "1px solid #E7DFD1" },
    danger:  { ...base, background: "#E11D48", color: "#fff" },
  };
  return (
    <button style={styles[kind] || styles.ghost} onClick={onClick}>
      {Glyph && <Glyph size={14}/>}
      {children}
    </button>
  );
}

function PDPlaceholder({ tab }) {
  return (
    <div style={{
      padding: "60px 24px", background: "#FFFFFF",
      border: "1px dashed #E7DFD1", borderRadius: 14, textAlign: "center",
    }}>
      <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: "#0E1B2C", marginBottom: 6 }}>{tab?.l}</div>
      <div style={{ fontSize: 13, color: "#5A6A7E" }}>{tab?.sub}</div>
    </div>
  );
}

Object.assign(window, { PatternDShell, PDButton, PDPlaceholder });

// ─── Sidebar (continued) ──────────────────────────────────────────────

function PDSidebar({ persona, moduleId }) {
  const I = window.PI;
  const P = PD_PERSONAS[persona] || PD_PERSONAS.employee;
  return (
    <aside style={{
      background: "#0E1B2C", color: "#E7E3D8",
      padding: "16px 12px 14px",
      display: "flex", flexDirection: "column", gap: 2,
      borderTop: `3px solid ${P.accent}`,
    }}>
      <div style={{ padding: "4px 8px 12px" }}>
        <img src={window.__resources.humiLogo} alt="Humi" style={{ height: 38, width: "auto", filter: "brightness(1.1)" }}/>
      </div>
      {PD_SIDEBAR.map(group => {
        const items = group.items.filter(it => it.show.includes(persona));
        if (items.length === 0) return null;
        return (
          <React.Fragment key={group.group}>
            <div style={{
              fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase",
              color: "rgba(231,227,216,0.4)", fontWeight: 600,
              padding: "12px 10px 4px",
            }}>{group.group}</div>
            {items.map(it => {
              const Glyph = I[it.ico] || I.home;
              const active = it.id === moduleId;
              const badge = it.badge && it.badge[persona];
              return (
                <div key={it.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px", borderRadius: 8,
                  fontSize: 12.5, fontWeight: 500,
                  color: active ? "#FCFAF5" : "rgba(231,227,216,0.72)",
                  background: active ? `${P.accent}26` : "transparent",
                  borderLeft: active ? `2px solid ${P.accent}` : "2px solid transparent",
                  paddingLeft: active ? 10 : 12,
                  cursor: "pointer",
                }}>
                  <Glyph size={14}/>
                  <span style={{ flex: 1 }}>{it.l}</span>
                  {badge && (
                    <span style={{ background:"#E11D48", color:"#fff", fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:999 }}>{badge}</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
      <div style={{
        marginTop: "auto", paddingTop: 12,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: P.grad, color:"#fff", fontSize:11, fontWeight:700,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>{P.initials}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize:11.5, color:"#FCFAF5", fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{P.name}</div>
          <div style={{ fontSize:9.5, color:"rgba(231,227,216,0.5)" }}>{P.role}</div>
        </div>
      </div>
    </aside>
  );
}
