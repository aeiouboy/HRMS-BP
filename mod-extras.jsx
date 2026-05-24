// Extra icons + persona-aware shell wrapper for module designs

const SvgIcon2 = ({ size = 18, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>{children}</svg>
);

const PI2 = {
  upload:      (p) => <SvgIcon2 {...p}><path d="M12 21V9M7 14l5-5 5 5"/><path d="M4 3h16"/></SvgIcon2>,
  receipt:     (p) => <SvgIcon2 {...p}><path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-2z"/><path d="M9 8h6M9 12h6M9 16h4"/></SvgIcon2>,
  dollar:      (p) => <SvgIcon2 {...p}><path d="M12 3v18M17 6.5c0-1.4-2.2-2.5-5-2.5s-5 1.1-5 2.5S9.2 9 12 9s5 1.1 5 2.5S14.8 14 12 14s-5 1.1-5 2.5S9.2 19 12 19s5-1.1 5-2.5"/></SvgIcon2>,
  baht:        (p) => <SvgIcon2 {...p}><path d="M8 3v18M8 5h6a3 3 0 0 1 0 6H8M8 11h7a3 3 0 0 1 0 6H8M11 1v3M11 20v3"/></SvgIcon2>,
  trending:    (p) => <SvgIcon2 {...p}><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></SvgIcon2>,
  pieChart:    (p) => <SvgIcon2 {...p}><path d="M21 12a9 9 0 1 1-9-9v9z"/><path d="M21 12a9 9 0 0 0-9-9"/></SvgIcon2>,
  filter:      (p) => <SvgIcon2 {...p}><path d="M3 5h18l-7 8v7l-4-2v-5z"/></SvgIcon2>,
  sliders:     (p) => <SvgIcon2 {...p}><path d="M4 6h11M19 6h1M4 12h5M13 12h7M4 18h13M21 18h-1"/><circle cx="17" cy="6" r="2"/><circle cx="11" cy="12" r="2"/><circle cx="19" cy="18" r="2"/></SvgIcon2>,
  more:        (p) => <SvgIcon2 {...p}><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></SvgIcon2>,
  eye:         (p) => <SvgIcon2 {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></SvgIcon2>,
  edit:        (p) => <SvgIcon2 {...p}><path d="M4 20h4l11-11-4-4L4 16zM14 6l4 4"/></SvgIcon2>,
  printer:     (p) => <SvgIcon2 {...p}><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"/></SvgIcon2>,
  pdf:         (p) => <SvgIcon2 {...p}><path d="M7 3h8l4 4v14H7z"/><path d="M14 3v5h5"/><text x="9" y="18" fontSize="6" fontWeight="700" fill="currentColor" stroke="none" fontFamily="sans-serif">PDF</text></SvgIcon2>,
  refresh:     (p) => <SvgIcon2 {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></SvgIcon2>,
  hospital:    (p) => <SvgIcon2 {...p}><path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-6h6v6M12 9v4M10 11h4"/></SvgIcon2>,
  pill:        (p) => <SvgIcon2 {...p}><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="m9 6 6 12" transform="rotate(-30 12 12)"/></SvgIcon2>,
  baby:        (p) => <SvgIcon2 {...p}><circle cx="12" cy="8" r="4"/><path d="M9 8h.01M15 8h.01M10 11s.5 1 2 1 2-1 2-1"/><path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6"/></SvgIcon2>,
  tooth:       (p) => <SvgIcon2 {...p}><path d="M12 3a6 6 0 0 0-6 6c0 4 2 6 3 12 .3 1.8 1 2 1.5 2s1-.5 1.2-2L12 16l.3 5c.2 1.5.7 2 1.2 2s1.2-.2 1.5-2c1-6 3-8 3-12a6 6 0 0 0-6-6z"/></SvgIcon2>,
  glasses:     (p) => <SvgIcon2 {...p}><circle cx="6" cy="14" r="4"/><circle cx="18" cy="14" r="4"/><path d="M10 14h4"/></SvgIcon2>,
  loginIn:     (p) => <SvgIcon2 {...p}><path d="M10 3H5v18h5"/><path d="M15 8l4 4-4 4M19 12H9"/></SvgIcon2>,
  logoutOut:   (p) => <SvgIcon2 {...p}><path d="M14 3h5v18h-5"/><path d="M9 8l-4 4 4 4M5 12h10"/></SvgIcon2>,
  mapPin:      (p) => <SvgIcon2 {...p}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></SvgIcon2>,
  qr:          (p) => <SvgIcon2 {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4h-4"/></SvgIcon2>,
  star:        (p) => <SvgIcon2 {...p}><path d="m12 3 3 6 6 .8-4.4 4.2 1 6.4L12 17l-5.6 3.4 1-6.4L3 9.8 9 9z"/></SvgIcon2>,
  warn:        (p) => <SvgIcon2 {...p}><path d="m12 3 10 18H2z"/><path d="M12 10v5M12 18h.01"/></SvgIcon2>,
  send:        (p) => <SvgIcon2 {...p}><path d="m4 12 16-8-6 18-3-7z"/></SvgIcon2>,
  link:        (p) => <SvgIcon2 {...p}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></SvgIcon2>,
  flag:        (p) => <SvgIcon2 {...p}><path d="M4 21V4M4 4h12l-2 4 2 4H4"/></SvgIcon2>,
  layers:      (p) => <SvgIcon2 {...p}><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 18l9 5 9-5"/></SvgIcon2>,
  beach:       (p) => <SvgIcon2 {...p}><circle cx="17" cy="6" r="3"/><path d="M3 21h18M5 21l5-12M11 9c-2-2-5-2-7 0M11 9c1-3 4-4 6-2M11 9c3 0 5 2 5 5"/></SvgIcon2>,
  scan:        (p) => <SvgIcon2 {...p}><path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 0-2 2h-3M3 12h18"/></SvgIcon2>,
  trash:       (p) => <SvgIcon2 {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></SvgIcon2>,
  copy:        (p) => <SvgIcon2 {...p}><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></SvgIcon2>,
  bookmark:    (p) => <SvgIcon2 {...p}><path d="M6 3h12v18l-6-4-6 4z"/></SvgIcon2>,
  inbox:       (p) => <SvgIcon2 {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5 7 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6L19 7z"/></SvgIcon2>,
};
Object.assign(window.PI, PI2);

// Persona definitions
window.PERSONAS = {
  employee: { initials: "MS", color: "teal",   name: "มาริสา สงวนศักดิ์",   role: "Cashier · CTW",          tone: "Employee" },
  manager:  { initials: "AC", color: "sage",   name: "อาทิตย์ ชื่นบาน",      role: "Store Manager · CTW",    tone: "Manager"  },
  admin:    { initials: "JR", color: "coral",  name: "คุณจงรักษ์",          role: "HR Admin · CEN",         tone: "Admin"    },
  hris:     { initials: "NV", color: "butter", name: "ณัฐวุฒิ วัฒนกูล",      role: "HRIS Specialist · HQ",   tone: "HRIS"     },
  spd:      { initials: "PT", color: "ink",    name: "พรทิพย์ เจริญสุข",     role: "SPD Officer · HQ",       tone: "SPD"      },
};

// Persona THEME — maps each persona to a hue from the Humi palette.
// Used for: sidebar top accent bar · active nav state · topbar ribbon chip.
window.PERSONA_THEME = {
  employee: { accent: "#1FA8A0", soft: "rgba(31,168,160,0.18)",  ink: "#0E1B2C", glow: "rgba(31,168,160,0.45)",  shortLabel: "Employee" },  // teal
  manager:  { accent: "#7DA084", soft: "rgba(125,160,132,0.22)", ink: "#0E1B2C", glow: "rgba(125,160,132,0.45)", shortLabel: "Manager"  },  // sage
  admin:    { accent: "#E08864", soft: "rgba(224,136,100,0.20)", ink: "#0E1B2C", glow: "rgba(224,136,100,0.45)", shortLabel: "HR Admin" },  // coral
  hris:     { accent: "#D4A53A", soft: "rgba(212,165,58,0.20)",  ink: "#0E1B2C", glow: "rgba(212,165,58,0.45)",  shortLabel: "HRIS"     },  // butter
  spd:      { accent: "#5F7689", soft: "rgba(95,118,137,0.22)",  ink: "#0E1B2C", glow: "rgba(95,118,137,0.45)",  shortLabel: "SPD"      },  // slate
};

// ProdShell wrapper that takes a `persona` key
function PersonaShell({ persona, activeNav, pageBadge, children }) {
  const I = window.PI;
  const P = window.PERSONAS[persona] || window.PERSONAS.employee;
  const T = window.PERSONA_THEME[persona] || window.PERSONA_THEME.employee;

  // Different nav set per persona — employee-style vs admin-style
  const NAV_EMPLOYEE = [
    { group: "พื้นที่ทำงาน", items: [
      { id: "home", label: "หน้าหลัก", icon: "home" },
      { id: "employee-center", label: "Employee Center", icon: "user" },
      { id: "time", label: "Time Management", icon: "clock", badge: persona==="manager"?"5":null },
      { id: "benefit", label: "Benefit Claimed", icon: "heart" },
      { id: "payroll", label: "Payroll", icon: "wallet" },
    ]},
    { group: "อื่นๆ", items: [
      { id: "requests", label: "คำร้องและแบบฟอร์ม", icon: "fileText" },
      { id: "learning", label: "การเรียนรู้", icon: "book" },
      { id: "org", label: "ผังองค์กร", icon: "globe" },
    ]},
  ];

  const NAV_BACKOFFICE = [
    { group: "พื้นที่ทำงาน", items: [
      { id: "home", label: "หน้าหลัก", icon: "home" },
      { id: "inbox", label: "กล่องงาน", icon: "inbox", badge: persona==="admin"?"12":persona==="spd"?"38":null },
    ]},
    { group: persona==="hris" ? "ระบบและข้อมูลแม่บท" : "โมดูล HR", items: [
      { id: "employee-center", label: "Employee Center", icon: "users" },
      { id: "time", label: "Time Management", icon: "clock" },
      { id: "benefit", label: "Benefit Claimed", icon: "heart" },
      { id: "payroll", label: "Payroll", icon: "wallet" },
    ]},
    { group: "บริษัท", items: [
      { id: "reports", label: "รายงาน", icon: "barChart" },
      { id: "config", label: persona==="hris" ? "ตั้งค่าระบบ" : "จัดการระบบ", icon: "cog" },
    ]},
  ];

  const NAV = (persona === "employee" || persona === "manager") ? NAV_EMPLOYEE : NAV_BACKOFFICE;

  return (
    <div className="humi-app">
      <aside className="humi-sidebar" style={{ fontFamily: "CPN", position:"relative" }}>
        {/* Persona accent bar — 4px at top of sidebar */}
        <div style={{
          position:"absolute", top: 0, left: 0, right: 0, height: 4,
          background: T.accent,
          boxShadow: `0 0 18px ${T.glow}`,
        }}/>
        <div className="humi-brand" style={{ padding: "8px 10px 18px", alignItems:"center" }}>
          <img src={window.__resources.humiLogo} alt="Humi" style={{height: 60, width: "auto", objectFit:"contain", display: "block"}}/>
        </div>

        {NAV.map((group) =>
          <React.Fragment key={group.group}>
            <div className="humi-nav-label" style={{color: T.accent, opacity: 0.85, fontWeight: 600}}>{group.group}</div>
            {group.items.map((item) => {
              const Glyph = I[item.icon];
              const isActive = item.id === activeNav;
              return (
                <div key={item.id}
                     className={"humi-nav-item" + (isActive ? " active" : "")}
                     style={isActive ? {
                       background: T.soft,
                       boxShadow: `inset 3px 0 0 ${T.accent}`,
                     } : null}>
                  <span className="humi-nav-icon" style={isActive ? {color: T.accent} : null}><Glyph size={16} /></span>
                  {item.label}
                  {item.badge && <span className="humi-pill" style={{background: T.accent, color:"#0E1B2C"}}>{item.badge}</span>}
                </div>
              );
            })}
          </React.Fragment>
        )}

        <div className="humi-user">
          <div className={"humi-avatar humi-avatar--" + P.color}>{P.initials}</div>
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div className="humi-user-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{P.name}</div>
            <div className="humi-user-role">{P.role}</div>
          </div>
        </div>
      </aside>

      <main className="humi-main">
        <div className="humi-topbar">
          <div className="humi-search" style={{maxWidth: 320}}>
            <I.search size={15} />
            <span style={{ flex: 1 }}>ค้นหา…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="humi-spacer" />
          {pageBadge && (
            <span className="humi-tag humi-tag--cream" style={{padding:"6px 12px", fontWeight: 600}}>
              {pageBadge}
            </span>
          )}
          <window.InboxButton persona={persona}/>
          <window.BellButton/>
          <MoneyToggle/>
          <button className="humi-icon-btn" aria-label="ตั้งค่า"><I.cog size={18} /></button>
        </div>
        {children}
      </main>
    </div>
  );
}

window.PersonaShell = PersonaShell;

// Topbar toggle for money masking. Reads body class, listens to global event
// so it stays in sync even if toggled from elsewhere.
function MoneyToggle() {
  const I = window.PI;
  const [masked, setMasked] = React.useState(() =>
    typeof document !== "undefined" && document.body?.classList.contains("mask-money")
  );
  React.useEffect(() => {
    const onChange = (e) => setMasked(!!(e.detail && e.detail.masked));
    window.addEventListener("money-mask-change", onChange);
    // Sync once on mount in case body class was set before this component existed
    setMasked(!!document.body?.classList.contains("mask-money"));
    return () => window.removeEventListener("money-mask-change", onChange);
  }, []);
  return (
    <button
      className="humi-icon-btn"
      title={masked ? "แสดงยอดเงิน" : "ซ่อนยอดเงิน"}
      onClick={() => window.toggleMoneyMask && window.toggleMoneyMask()}
      style={masked ? null : { background: "var(--color-accent-soft)", color: "var(--color-accent)", borderColor: "transparent" }}
    >
      {masked
        ? <I.eye size={18}/>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7c2 0 3.7.6 5.2 1.5M22 12s-4 7-10 7c-2 0-3.7-.6-5.2-1.5"/><path d="M3 3l18 18"/><path d="M9.5 9.5a3 3 0 0 0 4 4"/></svg>
      }
    </button>
  );
}

// Reusable atoms
function PageHead({ eyebrow, title, subtitle, actions }) {
  return (
    <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap: 20, marginBottom: 24, flexWrap:"wrap"}}>
      <div>
        {eyebrow && <div className="humi-eyebrow" style={{marginBottom: 8}}>{eyebrow}</div>}
        <h1 className="humi-hero-title" style={{fontSize: 30}}>{title}</h1>
        {subtitle && <div style={{color:"var(--color-ink-muted)", fontSize: 14, marginTop: 8, maxWidth: 720, lineHeight: 1.55}}>{subtitle}</div>}
      </div>
      {actions && <div className="humi-row" style={{gap: 10, flexWrap:"wrap"}}>{actions}</div>}
    </div>
  );
}
window.PageHead = PageHead;

function StatCard({ label, value, sub, accent, icon }) {
  const I = window.PI;
  const Glyph = icon && I[icon];
  return (
    <div className="humi-card" style={{padding: 18}}>
      <div className="humi-row" style={{alignItems:"flex-start"}}>
        <div style={{flex: 1}}>
          <div className="humi-eyebrow" style={{fontSize: 10, marginBottom: 6}}>{label}</div>
          <div style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing:"-0.02em", color: accent || "var(--color-ink)"}}>{value}</div>
          {sub && <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 4}}>{sub}</div>}
        </div>
        {Glyph && (
          <div style={{width: 36, height: 36, borderRadius: 10, background: "var(--color-canvas-soft)", color: "var(--color-ink-soft)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
            <Glyph size={18}/>
          </div>
        )}
      </div>
    </div>
  );
}
window.StatCard = StatCard;

function SegTabs({ tabs, active, onChange }) {
  return (
    <div style={{display:"inline-flex", background:"var(--color-canvas-soft)", border:"1px solid var(--color-hairline)", padding: 4, borderRadius: 12, gap: 2}}>
      {tabs.map(t => (
        <button key={t.id}
          onClick={() => onChange && onChange(t.id)}
          style={{
            padding: "8px 14px",
            border: 0,
            background: t.id === active ? "var(--color-surface)" : "transparent",
            color: t.id === active ? "var(--color-ink)" : "var(--color-ink-muted)",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 9,
            cursor: "pointer",
            boxShadow: t.id === active ? "var(--shadow-sm)" : "none",
            fontFamily: "inherit"
          }}>
          {t.label}{t.count != null && <span style={{marginLeft: 6, color: t.id===active ? "var(--color-accent)" : "var(--color-ink-faint)", fontWeight: 700}}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
window.SegTabs = SegTabs;
