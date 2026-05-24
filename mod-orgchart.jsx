// ============= ORG CHART — reusable view + standalone page =============
// Used in two places:
//   1. Standalone menu item "ผังองค์กร"  → OrgChart_Standalone()
//   2. Tab inside Employee profile        → <OrgChartView focusedId="marisa" embed/>

window.ORG_PEOPLE = {
  // C-suite
  grace:    { n:"เกรซ หวง",            r:"CHRO · ประธานเจ้าหน้าที่ฝ่ายบุคคล", d:"สำนักงานใหญ่ · ชิดลม",  c:"GH", t:"ink",    m:null,        reports:["jordan_m","wirat"],
              email:"grace.h@central.co.th", phone:"+66 2 555 0101", tenure:"4 ปี 2 ด.", loc:"กรุงเทพฯ", hired:"01 ก.พ. 2565", grade:"E-01", emp_type:"ผู้บริหารระดับสูง" },
  jordan_m: { n:"จอร์แดน เหมย",        r:"People Operations Director", d:"สำนักงานใหญ่ · ชิดลม",       c:"JM", t:"sage",   m:"grace",     reports:["dana","simone"],
              email:"jordan.m@central.co.th", phone:"+66 2 555 0112", tenure:"2 ปี 6 ด.", loc:"กรุงเทพฯ", hired:"15 พ.ย. 2566", grade:"E-02" },
  wirat:    { n:"วิรัตน์ พงศ์เกียรติ",  r:"HRIS & Payroll Director",    d:"สำนักงานใหญ่ · ชิดลม",       c:"วร", t:"butter", m:"grace",     reports:[],
              email:"wirat.p@central.co.th", phone:"+66 2 555 0118", tenure:"5 ปี 1 ด.", grade:"E-02" },

  // Regional layer
  dana:     { n:"ดานา หลิว",            r:"ผู้จัดการเขต กรุงเทพฯ กลาง", d:"เขตทองหล่อ-สีลม",            c:"DL", t:"coral",  m:"jordan_m", reports:["ava","jess","amir","arthit"],
              email:"dana.l@central.co.th", phone:"+66 2 555 0133", tenure:"3 ปี 8 ด.", grade:"M-02" },
  simone:   { n:"ซิโมน ฟอง",           r:"ผู้จัดการเขต กรุงเทพฯ ตะวันตก", d:"เขตปิ่นเกล้า-ตลิ่งชัน",   c:"SF", t:"teal",   m:"jordan_m", reports:[],
              email:"simone.f@central.co.th", grade:"M-02" },

  // Store managers (district level)
  ava:      { n:"จงรักษ์ ทานากะ",      r:"ผู้จัดการสาขา II",             d:"Central CTW · ชั้น 1",      c:"จท", t:"coral",  m:"dana",      reports:["arthit"],
              email:"jongruk.t@central.co.th", grade:"M-01" },
  jess:     { n:"เจส โอคอน",           r:"ผู้จัดการสาขา",                d:"Central Silom",             c:"JO", t:"teal",   m:"dana",      reports:[],
              email:"jess.o@central.co.th", grade:"M-01" },
  amir:     { n:"อาเมียร์ คาลิล",      r:"ผู้จัดการสาขา",                d:"Central Ari",                c:"AK", t:"butter", m:"dana",      reports:[],
              email:"amir.k@central.co.th", grade:"M-01" },

  // Floor leadership
  arthit:   { n:"อาทิตย์ ชื่นบาน",      r:"หัวหน้ากะ · Store Manager L1", d:"Central CTW · ชั้น 1",       c:"AC", t:"sage",   m:"ava",       reports:["marisa","tirapat","kanlaya","preecha","nipaporn","amporn"],
              email:"arthit.c@central.co.th", phone:"+66 89-555-0177", tenure:"5 ปี 3 ด.", loc:"กรุงเทพฯ", hired:"22 พ.ค. 2563", grade:"S-04", emp_type:"พนักงานประจำ",
              skills:["ปิดร้านประจำวัน","ตรวจเงินสด","Coach พนักงานใหม่","วางกะ","POS"],
              goals:[{t:"ลด OT 15% ในไตรมาส 2", p:62},{t:"ส่ง 2 คนเข้าโปรแกรม Store Manager Track", p:50}],
              training:[{n:"Loss Prevention 2568", s:"ยังใช้ได้", t:"sage"},{n:"Food Safety L2", s:"ต่ออายุ ส.ค.", t:"butter"}] },

  // Team (Central World floor 1)
  marisa:   { n:"มาริสา สงวนศักดิ์",   r:"Cashier · L1",                 d:"Central CTW · ชั้น 1",       c:"MS", t:"teal",   m:"arthit",    reports:[],
              email:"marisa.s@central.co.th", phone:"+66 89-•••-4521", tenure:"2 ปี 7 ด.", loc:"กรุงเทพฯ", hired:"12 ก.ย. 2566",
              grade:"G2", emp_type:"พนักงานประจำ · รายเดือน", cost:"RTL-CTW-0412",
              comp:"฿18,500 / เดือน", title:"Cashier · L1",
              skills:["จัดการเงินสด","POS","บริการลูกค้า","ตรวจนับสินค้า"],
              goals:[{t:"ผ่านการอบรม Customer Excellence", p:80},{t:"ติดตาม Senior Cashier 6 ครั้ง", p:50}],
              training:[{n:"Loss Prevention 2568", s:"ยังใช้ได้", t:"sage"},{n:"Food Safety L1", s:"ยังใช้ได้", t:"sage"}],
              reviews:{last:"เกินคาด", cycle:"กลางปี 2568"},
              timeoff:{vac:"เหลือ 6.5 วัน", sick:"ใช้ไป 2 วัน"} },
  tirapat:  { n:"ธีรพัฒน์ มงคล",        r:"Senior Cashier · L2",          d:"Central CTW · ชั้น 1",       c:"TM", t:"sage",   m:"arthit",    reports:[],
              email:"tirapat.m@central.co.th", grade:"G3", tenure:"4 ปี 1 ด." },
  kanlaya:  { n:"กัลยา ภูวดล",          r:"Sales Associate · L1",         d:"Central CTW · ชั้น 1",       c:"KP", t:"butter", m:"arthit",    reports:[],
              email:"kanlaya.p@central.co.th", grade:"G2", tenure:"1 ปี 3 ด." },
  preecha:  { n:"ปรีชา วรพงษ์",         r:"Floor Staff · L1",             d:"Central CTW · ชั้น 1",       c:"PV", t:"ink",    m:"arthit",    reports:[],
              email:"preecha.v@central.co.th", grade:"G1", tenure:"7 ด." },
  nipaporn: { n:"นิภาพร แสนสุข",        r:"Cashier · L1",                 d:"Central CTW · ชั้น 1",       c:"NP", t:"coral",  m:"arthit",    reports:[],
              email:"nipaporn.s@central.co.th", grade:"G2", tenure:"3 ปี 4 ด." },
  amporn:   { n:"อัมพร โพธิ์ทอง",       r:"Sales Associate · L1",         d:"Central CTW · ชั้น 1",       c:"AP", t:"teal",   m:"arthit",    reports:[],
              email:"amporn.p@central.co.th", grade:"G2", tenure:"2 ปี" },
};

// ---- Node card ----
function OrgNode({ person, size = "md", highlight, onClick, dim }) {
  const sizes = {
    sm: { w: 144, pad: 10, av: 28, name: 12, role: 11 },
    md: { w: 184, pad: 14, av: 36, name: 13, role: 11 },
    lg: { w: 248, pad: 18, av: 56, name: 16, role: 12 },
  };
  const s = sizes[size];
  return (
    <div
      onClick={onClick}
      style={{
        width: s.w,
        padding: s.pad,
        background: highlight ? "var(--color-accent-soft)" : "var(--color-surface)",
        border: "1px solid " + (highlight ? "transparent" : "var(--color-hairline)"),
        borderRadius: 14,
        cursor: onClick ? "pointer" : "default",
        boxShadow: highlight ? "0 2px 0 rgba(14,27,44,0.06), 0 16px 30px rgba(31,168,160,0.18)" : "var(--shadow-sm)",
        textAlign: "center",
        opacity: dim ? 0.5 : 1,
        transition: "all .15s ease",
        flexShrink: 0,
      }}
    >
      <div
        className={"humi-avatar humi-avatar--" + person.t}
        style={{ width: s.av, height: s.av, margin: "0 auto 8px", fontSize: size === "lg" ? 18 : 12 }}
      >
        {person.c}
      </div>
      <div style={{ fontWeight: 600, fontSize: s.name, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{person.n}</div>
      <div style={{ fontSize: s.role, color: "var(--color-ink-muted)", marginTop: 3, lineHeight: 1.3 }}>{person.r}</div>
      {size === "lg" && (
        <div style={{ fontSize: 11, color: "var(--color-ink-faint)", marginTop: 4 }}>{person.d}</div>
      )}
    </div>
  );
}

function Connector({ h = 22 }) {
  return <div style={{ width: 2, height: h, background: "var(--color-hairline)", margin: "0 auto" }}/>;
}

// ---- Main view (chart + person panel) ----
function OrgChartView({ focusedId = "marisa", embed = false }) {
  const I = window.PI;
  const PEOPLE = window.ORG_PEOPLE;
  const [selected, setSelected] = React.useState(focusedId);
  const [view, setView] = React.useState("chart"); // chart | list
  const [query, setQuery] = React.useState("");

  const p = PEOPLE[selected] || PEOPLE[focusedId];
  const manager = p.m ? PEOPLE[p.m] : null;

  // Manager chain (root → manager)
  const managerChain = [];
  let cur = p.m;
  while (cur && PEOPLE[cur]) { managerChain.unshift({ key: cur, ...PEOPLE[cur] }); cur = PEOPLE[cur].m; }

  const directReports = (p.reports || []).map(k => ({ key: k, ...PEOPLE[k] })).filter(Boolean);
  const peers = manager
    ? (manager.reports || []).filter(k => k !== selected).map(k => ({ key: k, ...PEOPLE[k] })).filter(Boolean)
    : [];

  const matchesQuery = (per) => {
    if (!query) return false;
    return per.n.includes(query) || per.r.includes(query) || per.d.includes(query);
  };
  const searchResults = query
    ? Object.entries(PEOPLE).filter(([, per]) => matchesQuery(per)).slice(0, 6)
    : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 20, alignItems: "start" }}>
      {/* ===== LEFT — chart ===== */}
      <div className="humi-card" style={{ padding: 22, position: "sticky", top: 90, alignSelf: "start" }}>
        <div className="humi-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="humi-eyebrow">สายบังคับบัญชา</div>
            <h3 className="humi-section-title" style={{ marginTop: 4 }}>ผังองค์กร</h3>
          </div>
          <span className="humi-spacer"/>
          <window.SegTabs active={view} onChange={setView} tabs={[
            { id: "chart", label: "ผัง" },
            { id: "list",  label: "รายการ" },
          ]}/>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          <I.search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-ink-muted)" }}/>
          <input
            className="field-input"
            placeholder="ค้นหาชื่อหรือตำแหน่ง…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: "1px solid var(--color-hairline)", background: "var(--color-canvas-soft)", fontSize: 13 }}
          />
          {searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "var(--color-surface)", border: "1px solid var(--color-hairline)", borderRadius: 12, boxShadow: "var(--shadow-md)", zIndex: 5, padding: 6 }}>
              {searchResults.map(([key, per]) => (
                <div key={key} onClick={() => { setSelected(key); setQuery(""); }}
                  className="humi-row" style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", gap: 10 }}>
                  <div className={"humi-avatar humi-avatar--" + per.t} style={{ width: 28, height: 28, fontSize: 11 }}>{per.c}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{per.n}</div>
                    <div style={{ fontSize: 11, color: "var(--color-ink-muted)" }}>{per.r}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {view === "chart" ? (
          <div style={{ textAlign: "center", overflowX: "auto", paddingBottom: 8 }}>
            {/* Manager chain — compact stack */}
            {managerChain.map((m, i) => (
              <React.Fragment key={m.key}>
                <div style={{ display: "inline-block" }}>
                  <OrgNode person={m} size="sm" onClick={() => setSelected(m.key)}/>
                </div>
                <Connector/>
              </React.Fragment>
            ))}

            {/* Selected (large) */}
            <div style={{ display: "inline-block" }}>
              <OrgNode person={p} size="lg" highlight/>
            </div>

            {/* Peers */}
            {peers.length > 0 && (
              <>
                <Connector h={14}/>
                <div style={{ fontSize: 10, color: "var(--color-ink-faint)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 10, fontWeight: 600 }}>
                  เพื่อนร่วมทีม · {peers.length} คน · รายงานต่อ {manager.n}
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  {peers.slice(0, 5).map(pr => (
                    <OrgNode key={pr.key} person={pr} size="sm" onClick={() => setSelected(pr.key)}/>
                  ))}
                  {peers.length > 5 && (
                    <div style={{ width: 80, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--color-hairline)", borderRadius: 14, fontSize: 12, color: "var(--color-ink-muted)" }}>
                      +{peers.length - 5}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Direct reports */}
            {directReports.length > 0 && (
              <>
                <Connector/>
                <div style={{ fontSize: 10, color: "var(--color-ink-faint)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 10, fontWeight: 600 }}>
                  ลูกทีม · {directReports.length} คน
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  {directReports.slice(0, 6).map(pr => (
                    <OrgNode key={pr.key} person={pr} size="sm" onClick={() => setSelected(pr.key)}/>
                  ))}
                  {directReports.length > 6 && (
                    <div style={{ width: 80, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--color-hairline)", borderRadius: 14, fontSize: 12, color: "var(--color-ink-muted)" }}>
                      +{directReports.length - 6}
                    </div>
                  )}
                </div>
              </>
            )}

            {directReports.length === 0 && (
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--color-ink-faint)" }}>— ไม่มีลูกทีม —</div>
            )}
          </div>
        ) : (
          // LIST view
          <div style={{ maxHeight: 540, overflowY: "auto" }}>
            {Object.entries(PEOPLE).map(([key, per]) => (
              <div key={key} onClick={() => setSelected(key)}
                className="humi-row" style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", gap: 10, background: key === selected ? "var(--color-accent-soft)" : "transparent" }}>
                <div className={"humi-avatar humi-avatar--" + per.t} style={{ width: 30, height: 30, fontSize: 11 }}>{per.c}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{per.n}</div>
                  <div style={{ fontSize: 11, color: "var(--color-ink-muted)" }}>{per.r} · {per.d}</div>
                </div>
                {per.reports && per.reports.length > 0 && (
                  <span style={{ fontSize: 10, color: "var(--color-ink-faint)", fontWeight: 600 }}>{per.reports.length} ลูกทีม</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== RIGHT — person panel ===== */}
      <div className="humi-col" style={{ gap: 16 }}>
        {/* header */}
        <div className="humi-card" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ height: 64, background: "linear-gradient(110deg, var(--color-ink) 0%, #1a2b42 100%)", position: "relative", overflow: "hidden" }}>
            <div className="humi-blob humi-blob--teal"  style={{ width: 100, height: 120, right: 30, top: -20, opacity: .55 }}/>
            <div className="humi-blob humi-blob--coral" style={{ width: 70, height: 80, right: 130, top: 20, opacity: .45 }}/>
          </div>
          <div style={{ padding: "20px 22px" }}>
            <div className="humi-row" style={{ gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div className={"humi-avatar humi-avatar--" + p.t} style={{ width: 68, height: 68, fontSize: 22, borderRadius: 16, flexShrink: 0 }}>{p.c}</div>
              <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", fontFamily: "var(--font-display)", fontWeight: 600 }}>{p.n}</h2>
                <div style={{ fontSize: 13, color: "var(--color-ink-muted)", marginTop: 4, lineHeight: 1.55 }}>
                  {p.title || p.r} · {p.d}
                  {manager && <> · รายงานต่อ <b style={{ color: "var(--color-ink-soft)" }}>{manager.n}</b></>}
                </div>
              </div>
            </div>
            <div className="humi-row" style={{ gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              <button className="humi-button humi-button--ghost" style={{ padding: "7px 12px", fontSize: 12 }}><I.send size={12}/> ส่งข้อความ</button>
              <button className="humi-button humi-button--ghost" style={{ padding: "7px 12px", fontSize: 12 }}><I.fileText size={12}/> ดูโปรไฟล์เต็ม</button>
              {!embed && p.reports && p.reports.length > 0 && (
                <button className="humi-button humi-button--primary" style={{ padding: "7px 12px", fontSize: 12 }}><I.users size={12}/> ดูเฉพาะทีม</button>
              )}
            </div>
          </div>

          {/* quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--color-hairline-soft)" }}>
            {[
              { l: "อายุงาน", v: p.tenure || "—" },
              { l: "เกรด",    v: p.grade || "—" },
              { l: "ลูกทีม",  v: p.reports ? p.reports.length + " คน" : "—" },
              { l: "ที่ตั้ง",  v: p.loc || "กรุงเทพฯ" },
            ].map((s, i) => (
              <div key={s.l} style={{ padding: "12px 16px", borderLeft: i === 0 ? 0 : "1px solid var(--color-hairline-soft)" }}>
                <div className="humi-eyebrow" style={{ fontSize: 10 }}>{s.l}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginTop: 4, letterSpacing: "-0.01em" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* contact + employment */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="humi-card">
            <div className="humi-eyebrow">ช่องทางติดต่อ</div>
            <div className="humi-col" style={{ gap: 8, marginTop: 12, fontSize: 13 }}>
              <div className="humi-row" style={{ gap: 8 }}><I.send size={13} style={{ color: "var(--color-ink-muted)" }}/><span style={{ color: "var(--color-ink-soft)" }}>{p.email || "—"}</span></div>
              {p.phone && <div className="humi-row" style={{ gap: 8 }}><I.clock size={13} style={{ color: "var(--color-ink-muted)" }}/><span style={{ color: "var(--color-ink-soft)" }}>{p.phone}</span></div>}
              <div className="humi-row" style={{ gap: 8 }}><I.globe size={13} style={{ color: "var(--color-ink-muted)" }}/><span style={{ color: "var(--color-ink-muted)" }}>ICT · ขณะนี้ {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span></div>
            </div>
          </div>
          <div className="humi-card">
            <div className="humi-eyebrow">การจ้างงาน</div>
            <div className="humi-col" style={{ gap: 8, marginTop: 12, fontSize: 13 }}>
              {[
                ["ประเภท", p.emp_type],
                ["เริ่มงาน", p.hired],
                ["ผลตอบแทน", p.comp],
                ["Cost center", p.cost],
              ].filter(([, v]) => v).map(([l, v]) => (
                <div key={l} className="humi-row" style={{ gap: 8 }}>
                  <span style={{ color: "var(--color-ink-muted)", width: 88, fontSize: 12 }}>{l}</span>
                  <span style={{ color: "var(--color-ink-soft)", fontWeight: 500, fontSize: 13, flex: 1, minWidth: 0 }}>{v}</span>
                </div>
              ))}
              {!p.emp_type && !p.hired && (
                <div style={{ fontSize: 12, color: "var(--color-ink-faint)" }}>— ข้อมูลจำกัด —</div>
              )}
            </div>
          </div>
        </div>

        {/* skills */}
        {p.skills && (
          <div className="humi-card">
            <div className="humi-row">
              <div>
                <div className="humi-eyebrow">ทักษะ</div>
                <h3 className="humi-section-title" style={{ marginTop: 4 }}>สิ่งที่ {p.n.split(" ")[0]} ถนัด</h3>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost" style={{ padding: "6px 10px", fontSize: 12 }}><I.plus size={12}/> รับรองทักษะ</button>
            </div>
            <div className="humi-row" style={{ marginTop: 12, gap: 8, flexWrap: "wrap" }}>
              {p.skills.map(s => <span key={s} className="humi-tag humi-tag--cream">{s}</span>)}
            </div>
          </div>
        )}

        {/* goals */}
        {p.goals && (
          <div className="humi-card">
            <div className="humi-eyebrow">เป้าหมายรอบ {p.reviews ? p.reviews.cycle : "ปัจจุบัน"}</div>
            <h3 className="humi-section-title" style={{ marginTop: 4, marginBottom: 14 }}>ความคืบหน้า</h3>
            <div className="humi-col" style={{ gap: 12 }}>
              {p.goals.map(g => (
                <div key={g.t}>
                  <div className="humi-row"><span style={{ fontSize: 13, fontWeight: 500 }}>{g.t}</span><span className="humi-spacer"/><span style={{ fontSize: 12, color: "var(--color-ink-muted)" }}>{g.p}%</span></div>
                  <div style={{ height: 6, background: "var(--color-hairline-soft)", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                    <div style={{ width: g.p + "%", height: "100%", background: "var(--color-accent)" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* training */}
        {p.training && (
          <div className="humi-card">
            <div className="humi-eyebrow">ใบรับรอง</div>
            <div className="humi-col" style={{ gap: 10, marginTop: 12 }}>
              {p.training.map(t => (
                <div key={t.n} className="humi-row" style={{ fontSize: 13 }}>
                  <span className={"humi-tag humi-tag--" + (t.t === "butter" ? "butter" : "accent")} style={{ padding: "2px 8px", fontSize: 10 }}>●</span>
                  <span style={{ flex: 1 }}>{t.n}</span>
                  <span style={{ color: "var(--color-ink-muted)", fontSize: 12 }}>{t.s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
window.OrgChartView = OrgChartView;

// ---- Standalone page (used by menu "ผังองค์กร") ----
function OrgChart_Standalone({ persona = "employee" }) {
  const I = window.PI;
  // Default focused person per persona
  const PERSONA_FOCUS = {
    employee: "marisa",
    manager:  "arthit",
    admin:    "ava",
    hris:     "grace",
    spd:      "ava",
  };
  return (
    <div style={{ paddingBottom: 32 }}>
      <window.PageHead
        eyebrow="People · ผังองค์กร"
        title="ผังองค์กร"
        subtitle="สำรวจสายบังคับบัญชา ค้นหาเพื่อนร่วมงาน ดูข้อมูลติดต่อและทักษะของคนในทีม"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> ส่งออก PDF</button>
          <button className="humi-button humi-button--ghost"><I.printer size={14}/> พิมพ์</button>
        </>}/>
      <OrgChartView focusedId={PERSONA_FOCUS[persona] || "marisa"}/>
    </div>
  );
}
window.OrgChart_Standalone = OrgChart_Standalone;
