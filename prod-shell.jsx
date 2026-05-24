// prod-shell.jsx — Sidebar + topbar with persona awareness
// Each persona gets a distinct identity (accent stripe, avatar, name, ribbon)
// so the user always knows which role they're viewing the screen as.

const PERSONA_PROFILES = {
  employee: {
    initials: "KS",  name: "คุณกฤษณ์ ส.",     role: "พนักงานขาย · Central World",
    labelTh: "พนักงาน",     labelEn: "EMPLOYEE",
    accent: "#1FA8A0", soft: "rgba(31,168,160,0.18)",  avatarGrad: "linear-gradient(135deg, #1FA8A0, #9BB5A0)",
    homeNav: "home",
  },
  manager: {
    initials: "SC",  name: "คุณสมชาย ช.",    role: "Store Manager · Central World",
    labelTh: "หัวหน้างาน",    labelEn: "MANAGER",
    accent: "#7DA084", soft: "rgba(125,160,132,0.22)", avatarGrad: "linear-gradient(135deg, #7DA084, #9BB5A0)",
    homeNav: "home",
  },
  admin: {
    initials: "JR",  name: "คุณจงรักษ์ พ.",  role: "HR Admin · CEN",
    labelTh: "ฝ่ายบุคคล",     labelEn: "HR ADMIN",
    accent: "#E08864", soft: "rgba(224,136,100,0.20)", avatarGrad: "linear-gradient(135deg, #E08864, #E8C46B)",
    homeNav: "admin",
  },
  hris: {
    initials: "PW",  name: "คุณพรวลัย ก.",   role: "HRIS Manager · CRG",
    labelTh: "HRIS",          labelEn: "HRIS",
    accent: "#D4A53A", soft: "rgba(212,165,58,0.20)",  avatarGrad: "linear-gradient(135deg, #D4A53A, #E8C46B)",
    homeNav: "integrations",
  },
  spd: {
    initials: "NT",  name: "คุณนภสร ท.",    role: "SPD Officer · Document Control",
    labelTh: "SPD",           labelEn: "SPD",
    accent: "#5F7689", soft: "rgba(95,118,137,0.22)",  avatarGrad: "linear-gradient(135deg, #5F7689, #8D9BAA)",
    homeNav: "admin",
  },
};

function ProdShell({ page, persona = "admin", defaultPanel, children }) {
  const I = window.PI;
  const P = PERSONA_PROFILES[persona] || PERSONA_PROFILES.admin;

  // Visible nav per persona (admin-only items are filtered out for emp/mgr/spd)
  const NAV_FULL = [
    { group: "พื้นที่ทำงาน", items: [
      { id: "home", label: "หน้าหลัก", icon: "home", show: ["employee","manager","admin","hris","spd"] },
      { id: "profile", label: "โปรไฟล์ของฉัน", icon: "user", show: ["employee","manager","admin","hris","spd"] },
      { id: "timeoff", label: "ลางาน", icon: "calendar", badge: "2", show: ["employee","manager","admin"] },
      { id: "benefits", label: "เงินเดือน · สวัสดิการ", icon: "heart", show: ["employee","manager","admin"] },
      { id: "requests", label: "คำร้องและแบบฟอร์ม", icon: "fileText", show: ["employee","manager","admin","spd"] },
    ]},
    { group: "บุคลากร", items: [
      { id: "team", label: "ทีมของฉัน", icon: "users", show: ["manager"] },
      { id: "goals", label: "เป้าหมาย · ผลงาน", icon: "barChart", show: ["employee","manager","admin"] },
      { id: "learning", label: "การเรียนรู้", icon: "book", show: ["employee","manager","admin"] },
      { id: "org", label: "ผังองค์กร", icon: "globe", show: ["employee","manager","admin","hris","spd"] },
    ]},
    { group: "บริษัท", items: [
      { id: "announce", label: "ประกาศ", icon: "mega", show: ["employee","manager","admin","hris","spd"] },
      { id: "admin", label: "ศูนย์รวม Admin", icon: "shield", show: ["admin","hris","spd"] },
      { id: "integrations", label: "จัดการระบบ", icon: "cog", show: ["admin","hris"] },
    ]},
  ];

  const NAV = NAV_FULL
    .map(g => ({ ...g, items: g.items.filter(it => it.show.includes(persona)) }))
    .filter(g => g.items.length > 0)
    .map(g => ({ ...g, items: g.items.map(it => ({
      ...it,
      active:
        (page === "home"  && it.id === "home") ||
        (page === "hire"  && it.id === "admin") ||
        (page === "admin" && it.id === "admin") ||
        (page === "team"  && it.id === "team"),
    })) }));

  return (
    <div className="humi-app">
      <aside className="humi-sidebar" style={{ fontFamily: "CPN", position: "relative" }}>
        {/* Persona accent stripe — top of sidebar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: P.accent,
        }}/>

        <div className="humi-brand" style={{ padding: "4px 10px 18px" }}>
          <img
            src={window.__resources.humiLogo}
            alt="Humi"
            style={{ height: 78, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {NAV.map((group) =>
          <React.Fragment key={group.group}>
            <div className="humi-nav-label">{group.group}</div>
            {group.items.map((item) => {
              const Glyph = I[item.icon];
              return (
                <div key={item.id} className={"humi-nav-item" + (item.active ? " active" : "")}
                     style={item.active ? { background: P.soft, color: "#fff" } : null}>
                  <span className="humi-nav-icon"><Glyph size={16} /></span>
                  {item.label}
                  {item.badge && <span className="humi-pill">{item.badge}</span>}
                </div>
              );
            })}
          </React.Fragment>
        )}

        <div className="humi-user">
          <div className="humi-avatar" style={{ background: P.avatarGrad, color: "#fff" }}>{P.initials}</div>
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div className="humi-user-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{P.name}</div>
            <div className="humi-user-role">{P.role}</div>
          </div>
        </div>
      </aside>

      <main className="humi-main">
        <div className="humi-topbar">
          <div className="humi-search">
            <I.search size={15} />
            <span style={{ flex: 1 }}>ค้นหา…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="humi-spacer" />
          <window.InboxButton persona={persona} defaultOpen={defaultPanel === "inbox"}/>
          <window.BellButton defaultOpen={defaultPanel === "bell"}/>
          <button className="humi-icon-btn" aria-label="ตั้งค่า"><I.cog size={18} /></button>
        </div>

        {/* Canvas preview ribbon — designer-only affordance.
            Sits in flow between topbar and content. NOT shown in production. */}
        <div style={{
          margin: "0 -32px 20px",
          padding: "10px 28px",
          background: `linear-gradient(90deg, ${P.accent}14 0%, ${P.accent}06 60%, transparent 100%)`,
          borderTop: `1px solid ${P.accent}26`,
          borderBottom: `1px solid ${P.accent}26`,
          position: "relative",
          display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
        }}>
          {/* Left accent stripe */}
          <span style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 3, background: P.accent,
          }}/>
          {/* Eye / preview icon */}
          <span style={{
            width: 28, height: 28, borderRadius: 999,
            background: P.accent, color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, flexShrink: 0,
            boxShadow: `0 0 0 4px ${P.accent}1F`,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </span>
          {/* Persona avatar */}
          <div className="humi-avatar"
               style={{ background: P.avatarGrad, color: "#fff", width: 32, height: 32, fontSize: 11, flexShrink: 0 }}>
            {P.initials}
          </div>
          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, minWidth: 0 }}>
            <div style={{
              fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase",
              color: "var(--color-ink-faint)", fontWeight: 700,
            }}>Canvas Preview · มุมมองของ</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", fontFamily: "var(--font-display)" }}>{P.name}</span>
              <span style={{ fontSize: 11, color: "var(--color-ink-muted)" }}>·</span>
              <span style={{ fontSize: 12, color: "var(--color-ink-muted)" }}>{P.role}</span>
            </div>
          </div>
          {/* Role pill */}
          <span style={{
            padding: "4px 12px", borderRadius: 999,
            background: P.accent, color: "#fff",
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
          }}>{P.labelEn}</span>
          {/* Right side — production note */}
          <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--color-ink-faint)", fontStyle: "italic" }}>
            * แถบนี้ปรากฏเฉพาะใน canvas · production ไม่มี
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}

window.ProdShell = ProdShell;
window.PERSONA_PROFILES = PERSONA_PROFILES;
