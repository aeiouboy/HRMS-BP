// AdminScreen.jsx — orchestrates Admin sub-screens (Thai)
function AdminScreen({ onNav }) {
  const Ic = window.I;
  const D = window.AdminData;
  const [tab, setTab] = React.useState("overview");
  const [drawerEmp, setDrawerEmp] = React.useState(null);
  const [inboxFocus, setInboxFocus] = React.useState(null);
  const [empQuery, setEmpQuery] = React.useState("");
  const [empFilter, setEmpFilter] = React.useState("all");
  const [hireOpen, setHireOpen] = React.useState(false);

  const PLAN_KEYS = Object.keys(D.PLANS);

  const filteredEmp = D.EMPLOYEES.filter(e => {
    if (empFilter !== "all" && e.s !== empFilter) return false;
    if (empQuery && !(e.n + e.id + e.b + e.r).toLowerCase().includes(empQuery.toLowerCase())) return false;
    return true;
  });

  const openInbox = (wfId) => {
    setInboxFocus(wfId || null);
    setTab("inbox");
  };

  return (
    <>
      <window.Topbar
        title="ศูนย์รวม Admin"
        subtitle="จัดการพนักงาน · สวัสดิการ · Workflow · นโยบาย"
        onNav={onNav}
        actions={
          <>
            <button className="btn btn-ghost"><Ic.download size={14}/> ส่งออก CSV</button>
            <button className="btn btn-primary" onClick={() => setHireOpen(true)}><Ic.plus size={14}/> เพิ่มพนักงาน</button>
          </>
        }
      />

      <div className="tabs" style={{marginBottom: 20, flexWrap:"wrap"}}>
        {[
          ["overview","ภาพรวม"],
          ["inbox","กล่องขาเข้า · 14"],
          ["employees","พนักงาน"],
          ["benefits","แผนสวัสดิการ"],
          ["permissions","สิทธิ์ · RBP"],
          ["audit","ประวัติการเปลี่ยนแปลง"],
        ].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      {tab === "overview" && (
        <window.AdminOverview
          Ic={Ic}
          plansMap={D.PLANS}
          planKeys={PLAN_KEYS}
          onOpenInbox={openInbox}
          onOpenEmployee={(id) => setDrawerEmp(D.EMPLOYEES.find(e => e.id === id))}
          onActionSearch={() => {}}
        />
      )}

      {tab === "inbox" && (
        <window.AdminInbox
          Ic={Ic}
          workflows={D.WORKFLOWS}
          focusedId={inboxFocus}
          onClose={() => setTab("overview")}
        />
      )}

      {tab === "employees" && (
        <>
          <div className="card" style={{padding: 14, marginBottom: 16}}>
            <div className="row" style={{gap: 10, flexWrap:"wrap"}}>
              <div className="search" style={{flex: "1 1 280px", minWidth: 240, maxWidth: 380}}>
                <Ic.search size={14}/>
                <input value={empQuery} onChange={e => setEmpQuery(e.target.value)} placeholder="ค้นหาชื่อ รหัส สาขา…" style={{border: 0, outline:"none", background:"transparent", flex: 1, fontFamily:"inherit", fontSize: 14}}/>
              </div>
              <div className="tabs" style={{margin: 0}}>
                {[
                  ["all", `ทั้งหมด · ${D.EMPLOYEES.length}`],
                  ["active", `ทำงาน · ${D.EMPLOYEES.filter(e=>e.s==="active").length}`],
                  ["onboarding", `เริ่มงาน · ${D.EMPLOYEES.filter(e=>e.s==="onboarding").length}`],
                  ["leave", `ลางาน · ${D.EMPLOYEES.filter(e=>e.s==="leave").length}`],
                  ["pending", `รอเอกสาร · ${D.EMPLOYEES.filter(e=>e.s==="pending").length}`],
                ].map(([k,l]) => (
                  <div key={k} className={"tab " + (empFilter===k?"active":"")} onClick={() => setEmpFilter(k)}>{l}</div>
                ))}
              </div>
              <div className="spacer"/>
              <button className="btn btn-ghost" style={{fontSize: 13}}><Ic.download size={13}/> ส่งออก</button>
              <button className="btn btn-primary" style={{fontSize: 13}} onClick={() => setHireOpen(true)}><Ic.plus size={13}/> เพิ่มพนักงาน</button>
            </div>
          </div>

          <div className="card" style={{padding: 0, overflow:"hidden"}}>
            <div style={{display:"grid", gridTemplateColumns:"36px 2fr 1.4fr 1.2fr 1fr 1fr 90px", padding:"12px 18px", background:"var(--cream-2)", borderBottom:"1px solid var(--line)", fontSize: 11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".08em", fontWeight: 600}}>
              <div></div><div>พนักงาน</div><div>บทบาท · สาขา</div><div>ประเภท</div><div>แผนสวัสดิการ</div><div>สถานะ</div><div></div>
            </div>
            {filteredEmp.map(e => (
              <div key={e.id} onClick={() => setDrawerEmp(e)} style={{display:"grid", gridTemplateColumns:"36px 2fr 1.4fr 1.2fr 1fr 1fr 90px", padding:"14px 18px", borderBottom:"1px solid var(--line-2)", alignItems:"center", gap: 8, cursor:"pointer"}}>
                <input type="checkbox" style={{accentColor:"var(--accent)"}} onClick={ev => ev.stopPropagation()}/>
                <div className="row" style={{gap: 10, minWidth: 0}}>
                  <div className={"avatar " + e.col} style={{width: 32, height: 32, fontSize: 11, flexShrink: 0}}>{e.c}</div>
                  <div style={{minWidth: 0}}>
                    <div style={{fontSize: 14, fontWeight: 600, letterSpacing:"-0.01em"}}>{e.n}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{e.id} · เริ่ม {e.join}</div>
                  </div>
                </div>
                <div>
                  <div style={{fontSize: 13, color:"var(--ink-2)"}}>{e.r}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{e.b}</div>
                </div>
                <div style={{fontSize: 13, color:"var(--ink-2)"}}>{e.t}</div>
                <div style={{fontSize: 13, color: e.plan === "—" ? "var(--ink-4)" : "var(--ink-2)"}}>{e.plan}</div>
                <div><span className={"tag " + D.STATUS[e.s].t}>{D.STATUS[e.s].l}</span></div>
                <div className="row" style={{justifyContent:"flex-end"}}>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}} onClick={ev => {ev.stopPropagation(); setDrawerEmp(e);}}>เปิด</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "benefits" && <window.AdminBenefits Ic={Ic}/>}
      {tab === "permissions" && <window.AdminPermissions Ic={Ic}/>}

      {tab === "audit" && (
        <div className="card">
          <div className="row" style={{marginBottom: 14}}>
            <div>
              <div className="eyebrow">Audit Log · Event-based · 30 วันล่าสุด</div>
              <h3 style={{marginTop: 6}}>ประวัติการเปลี่ยนแปลงทั้งระบบ</h3>
            </div>
            <div className="spacer"/>
            <select style={{padding:"6px 10px", border:"1px solid var(--line)", borderRadius: 8, fontSize: 12, fontFamily:"inherit"}}>
              <option>ทุกเหตุการณ์</option>
              {Object.entries(D.EVENT_META).map(([k,v]) => <option key={k}>{v.l}</option>)}
            </select>
            <button className="btn btn-ghost" style={{fontSize: 13}}><Ic.download size={13}/> ส่งออก</button>
          </div>
          <div className="list">
            {D.AUDIT.map((a, i) => {
              const meta = D.EVENT_META[a.event] || {l: a.event, c:""};
              return (
                <div key={i} className="row-item">
                  <div className={"avatar " + a.t} style={{width: 32, height: 32, fontSize: 11}}>{a.c}</div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div className="row" style={{gap: 8, marginBottom: 4}}>
                      <span className={"tag " + meta.c} style={{fontSize: 10}}>{meta.l}</span>
                      <span style={{fontSize: 12, color:"var(--ink-3)"}}>· {a.reason}</span>
                    </div>
                    <div style={{fontSize: 14}}><b>{a.who}</b> <span style={{color:"var(--ink-2)"}}>→ {a.target}</span></div>
                    {a.before !== undefined && (
                      <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 4, fontFamily:"monospace"}}>
                        <span style={{textDecoration:"line-through", color:"var(--coral)"}}>{a.before}</span> → <b style={{color:"var(--ink)"}}>{a.after}</b>
                      </div>
                    )}
                  </div>
                  <span style={{fontSize: 12, color:"var(--ink-3)", whiteSpace:"nowrap"}}>{a.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {drawerEmp && <window.AdminEmployeeDrawer Ic={Ic} employee={drawerEmp} onClose={() => setDrawerEmp(null)}/>}
      <window.AdminHire open={hireOpen} onClose={() => setHireOpen(false)}/>
    </>
  );
}
window.AdminScreen = AdminScreen;
