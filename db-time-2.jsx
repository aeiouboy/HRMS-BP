// ============= TIME MANAGEMENT — Darwinbox style — ADMIN + HRIS + SPD =============

// 3C · HR ADMIN — Org-wide attendance dashboard, Darwinbox style
function TM_Admin_DB() {
  const I = window.PI;
  const DB = window.DB;

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Time & Attendance / Org Dashboard"
        title="Attendance Dashboard"
        chip="2,847 employees · live"
        sub="Tuesday, 27 May 2025 · 14:32 ICT · refreshed 30s ago"
        actions={<>
          <window.DbBtn><I.refresh size={13}/> Refresh</window.DbBtn>
          <window.DbBtn><I.filter size={13}/> Filters</window.DbBtn>
          <window.DbBtn><I.download size={13}/> Export</window.DbBtn>
          <window.DbBtn primary><I.barChart size={13}/> Reports</window.DbBtn>
        </>}/>

      {/* Top metric strip — Darwinbox loves this */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap: 12, marginBottom: 16}}>
        <window.DbStat icon="users"     label="Headcount"     value="2,847" sub="+18 this month" color={DB.brand}   soft={DB.brandSoft}/>
        <window.DbStat icon="check"     label="Present"       value="2,391" sub="84.0%"           color={DB.present} soft={DB.presentSoft}/>
        <window.DbStat icon="clock"     label="Late marks"    value="142"   sub="5.0% of present" color={DB.late}    soft={DB.lateSoft}/>
        <window.DbStat icon="beach"     label="On Leave"      value="184"   sub="6.5%"            color={DB.leave}   soft={DB.leaveSoft}/>
        <window.DbStat icon="warn"      label="Absent / Yet"  value="272"   sub="9.5%"            color={DB.absent}  soft={DB.absentSoft}/>
        <window.DbStat icon="layers"    label="Working OT"    value="48"    sub="approved"        color={DB.ot}      soft={DB.otSoft}/>
      </div>

      {/* Row: Hourly punch trend + Donut by status + Locations */}
      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap: 16, marginBottom: 16}}>
        {/* Hourly attendance curve */}
        <window.DbCard>
          <window.DbSectionHead title="Punch-in distribution · today" action={
            <div style={{display:"flex", gap: 4}}>
              {["Today","Yesterday","Last week"].map((t, i) => (
                <span key={t} style={{padding:"3px 10px", borderRadius: 5, background: i === 0 ? DB.brand : "var(--color-canvas, #F6F1E8)", color: i === 0 ? "#fff" : DB.inkSoft, fontSize: 11, fontWeight: 600, cursor:"pointer"}}>{t}</span>
              ))}
            </div>
          }/>
          {/* Bar chart */}
          <div style={{height: 180, display:"flex", alignItems:"flex-end", gap: 6, padding: "0 4px 22px", position:"relative", borderBottom: "1px solid " + DB.borderSoft}}>
            {[20, 80, 320, 680, 980, 240, 60, 32, 18, 12, 9, 6, 5].map((v, i) => {
              const max = 1000;
              const h = v / max * 100;
              const hour = 6 + i;
              const peak = v >= 500;
              return (
                <div key={i} style={{flex: 1, display:"flex", flexDirection:"column", alignItems:"center", gap: 4, position:"relative"}}>
                  {peak && <span style={{position:"absolute", top: -18, fontSize: 10, fontWeight: 700, color: DB.brand}}>{v}</span>}
                  <div style={{
                    width:"100%",
                    height: h + "%",
                    minHeight: 2,
                    background: peak ? DB.brand : DB.brand + "66",
                    borderRadius: "4px 4px 0 0",
                  }}/>
                  <span style={{position:"absolute", bottom: -18, fontSize: 10, color: DB.muted, fontWeight: 600}}>{hour}:00</span>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop: 14, fontSize: 11, color: DB.muted}}>
            <span><b style={{color: DB.ink}}>Peak in:</b> 09:00–10:00 (980 punches)</span>
            <span><b style={{color: DB.ink}}>Avg in:</b> 08:53</span>
            <span><b style={{color: DB.ink}}>Late after 09:15:</b> 142 (5.0%)</span>
          </div>
        </window.DbCard>

        <window.DbCard>
          <window.DbSectionHead title="Status split"/>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 14}}>
            <window.DbDonut
              size={160} thick={24}
              segments={[
                { value: 2391, color: DB.present },
                { value: 184,  color: DB.leave },
                { value: 142,  color: DB.late },
                { value: 130,  color: DB.absent },
              ]}
              centerLabel="84%"
              centerSub="Present"
            />
            <div style={{width:"100%"}}>
              {[
                ["Present",   2391, DB.present],
                ["On Leave",  184,  DB.leave],
                ["Late",      142,  DB.late],
                ["Absent",    130,  DB.absent],
              ].map(([l, v, c]) => (
                <div key={l} style={{display:"flex", alignItems:"center", padding:"5px 0", fontSize: 12, borderBottom: "1px solid " + DB.borderSoft}}>
                  <span style={{width: 8, height: 8, borderRadius: 99, background: c, marginRight: 8}}/>
                  <span style={{flex: 1, color: DB.inkSoft}}>{l}</span>
                  <span style={{fontWeight: 700}}>{v.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </window.DbCard>

        <window.DbCard pad={0}>
          <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft}}>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, margin: 0}}>By location</h3>
            <div style={{fontSize: 11, color: DB.muted, marginTop: 4}}>28 sites · ranked by presence</div>
          </div>
          {[
            { l:"Central World",     h: 312, p: 287, pct: 92 },
            { l:"Central Chidlom",   h: 287, p: 251, pct: 87 },
            { l:"Central Embassy",   h: 198, p: 178, pct: 90 },
            { l:"Central Bangna",    h: 224, p: 184, pct: 82 },
            { l:"Central Westgate",  h: 198, p: 152, pct: 77 },
            { l:"Central Ladprao",   h: 188, p: 162, pct: 86 },
          ].map((loc, i) => (
            <div key={loc.l} style={{padding: "12px 16px", borderTop: i > 0 ? "1px solid " + DB.borderSoft : 0}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 6}}>
                <span style={{fontSize: 12, fontWeight: 600}}>{loc.l}</span>
                <span style={{fontSize: 11, color: DB.muted}}><b style={{color: DB.ink}}>{loc.p}</b> / {loc.h} · {loc.pct}%</span>
              </div>
              <div style={{height: 5, background: "var(--color-canvas, #F6F1E8)", borderRadius: 99, overflow:"hidden"}}>
                <div style={{width: loc.pct + "%", height:"100%", background: loc.pct > 85 ? DB.present : loc.pct > 78 ? DB.late : DB.absent}}/>
              </div>
            </div>
          ))}
        </window.DbCard>
      </div>

      {/* Bottom row: BU heatmap + Biometric devices */}
      <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap: 16}}>
        <window.DbCard>
          <window.DbSectionHead title="Attendance heatmap · this week" action={
            <span style={{fontSize: 11, color: DB.muted}}>by business unit × day</span>
          }/>
          <div style={{display:"grid", gridTemplateColumns:"180px repeat(7, 1fr)", gap: 4}}>
            <div></div>
            {["Mon 26","Tue 27","Wed 28","Thu 29","Fri 30","Sat 31","Sun 1"].map((d, i) => (
              <div key={d} style={{fontSize: 11, color: DB.muted, fontWeight: 600, textAlign:"center", padding: 4}}>{d}</div>
            ))}
            {[
              { bu:"CRP — Department Store", row:[91, 86, 0, 0, 0, 0, 0] },
              { bu:"CMG — Mall Group",       row:[88, 89, 0, 0, 0, 0, 0] },
              { bu:"FFB — Food",              row:[93, 91, 0, 0, 0, 0, 0] },
              { bu:"FAM — Family",            row:[85, 82, 0, 0, 0, 0, 0] },
              { bu:"HW — Hardware",           row:[79, 78, 0, 0, 0, 0, 0] },
              { bu:"CDG — Digital",           row:[94, 96, 0, 0, 0, 0, 0] },
            ].map(r => (
              <React.Fragment key={r.bu}>
                <div style={{fontSize: 12, fontWeight: 600, padding:"6px 8px", color: DB.inkSoft}}>{r.bu}</div>
                {r.row.map((v, i) => {
                  // Humi warm heatmap ramp — replaces R-Y-G with terracotta → coral → butter → sage → teal → deep teal
                  const ramp = DB.heatRamp;
                  const color = v === 0 ? "var(--color-canvas, #F6F1E8)"
                              : v >= 95 ? ramp[5]
                              : v >= 90 ? ramp[4]
                              : v >= 85 ? ramp[3]
                              : v >= 80 ? ramp[2]
                              : v >= 75 ? ramp[1]
                              :           ramp[0];
                  // Butter & sage are light enough to need dark ink; teal/terracotta want white.
                  const fg = v === 0 ? DB.faint
                           : v >= 85 && v < 90 ? DB.ink   // sage
                           : v >= 80 && v < 85 ? DB.ink   // butter
                           : "#fff";
                  return (
                    <div key={i} style={{
                      aspectRatio: "1.3",
                      maxHeight: 44,
                      background: color,
                      borderRadius: 4,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: fg,
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {v > 0 ? v + "%" : "—"}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div style={{display:"flex", alignItems:"center", gap: 12, marginTop: 16, fontSize: 11, color: DB.muted}}>
            <span>Less</span>
            {DB.heatRamp.map(c => <span key={c} style={{width: 22, height: 12, background: c, borderRadius: 2}}/>)}
            <span>More</span>
          </div>
        </window.DbCard>

        <window.DbCard pad={0}>
          <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft}}>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, margin: 0}}>Biometric devices</h3>
            <div style={{fontSize: 11, color: DB.muted, marginTop: 4}}>62 devices · 3 with issues</div>
          </div>
          {[
            { l:"CTW-FL1-ENT",   loc:"Central World · F1 Entrance", st:"online", last:"30s ago" },
            { l:"CTW-FL1-BACK",  loc:"Central World · F1 Back Door", st:"online", last:"1m ago" },
            { l:"CDM-MAIN",      loc:"Chidlom · Main Lobby",         st:"offline", last:"3h ago" },
            { l:"EMB-FL2",       loc:"Embassy · F2 Entrance",        st:"online", last:"45s ago" },
            { l:"BNA-STAFF",     loc:"Bangna · Staff Entry",         st:"warn",   last:"15m ago", note:"GPS drift > 50m" },
          ].map((d, i) => (
            <div key={d.l} style={{padding: 12, borderTop: i > 0 ? "1px solid " + DB.borderSoft : 0, display:"flex", alignItems:"center", gap: 10}}>
              <div style={{width: 8, height: 8, borderRadius: 99, background: d.st === "online" ? DB.present : d.st === "warn" ? DB.late : DB.absent, flexShrink: 0}}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 12, fontWeight: 700, fontFamily:"ui-monospace, monospace"}}>{d.l}</div>
                <div style={{fontSize: 11, color: DB.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{d.loc}</div>
                {d.note && <div style={{fontSize: 10, color: DB.late, fontWeight: 600, marginTop: 2}}>{d.note}</div>}
              </div>
              <span style={{fontSize: 10, color: DB.muted}}>{d.last}</span>
            </div>
          ))}
        </window.DbCard>
      </div>
    </window.DbPage>
  );
}
window.TM_Admin_DB = TM_Admin_DB;

// 3D · HRIS — Policy / Shift / Rules config, Darwinbox style
function TM_Hris_DB() {
  const I = window.PI;
  const DB = window.DB;

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Configuration / Time & Attendance"
        title="Attendance Policy Builder"
        chip="3 policies live"
        sub="Define shifts, rules, regularization workflow, and weekly off patterns"
        actions={<>
          <window.DbBtn><I.eye size={13}/> Preview impact</window.DbBtn>
          <window.DbBtn><I.copy size={13}/> Clone policy</window.DbBtn>
          <window.DbBtn primary><I.save size={13}/> Publish changes</window.DbBtn>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"260px 1fr", gap: 16}}>
        {/* Left nav */}
        <div>
          {[
            { l: "Configuration", items: [
              { n:"Shifts", c:"12 defined", active: true },
              { n:"Weekly Off Patterns", c:"4 patterns" },
              { n:"Holiday Calendar", c:"15 holidays" },
              { n:"Attendance Rules", c:"8 rules" },
            ]},
            { l: "Workflows", items: [
              { n:"Regularization", c:"2-level approval" },
              { n:"Overtime", c:"manager → HR" },
              { n:"Shift Change Request" },
            ]},
            { l: "Integrations", items: [
              { n:"Biometric Devices", c:"62 connected" },
              { n:"Geo-fences", c:"28 sites" },
              { n:"Mobile Punch", c:"enabled" },
            ]},
          ].map(g => (
            <div key={g.l} style={{marginBottom: 20}}>
              <div style={{fontSize: 10, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".08em", marginBottom: 8, paddingLeft: 4}}>{g.l}</div>
              {g.items.map(it => (
                <div key={it.n} style={{
                  padding: "10px 12px",
                  borderRadius: 7,
                  background: it.active ? DB.brand : "transparent",
                  color: it.active ? "#fff" : DB.inkSoft,
                  marginBottom: 2,
                  cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                }}>
                  <span>
                    <div style={{fontSize: 13, fontWeight: 600}}>{it.n}</div>
                    {it.c && <div style={{fontSize: 11, color: it.active ? "rgba(255,255,255,0.75)" : DB.muted, marginTop: 1}}>{it.c}</div>}
                  </span>
                  {it.active && <I.chevR size={12}/>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div>
          {/* Shift list header */}
          <window.DbCard style={{marginBottom: 14}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
              <div>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, margin: 0}}>Shifts</h3>
                <div style={{fontSize: 12, color: DB.muted, marginTop: 4}}>12 shifts in use · last published 12 May 2025 by Aitthichai N.</div>
              </div>
              <div style={{display:"flex", gap: 8}}>
                <window.DbBtn><I.upload size={13}/> Import</window.DbBtn>
                <window.DbBtn primary><I.plus size={13}/> New shift</window.DbBtn>
              </div>
            </div>
          </window.DbCard>

          {/* Shifts table */}
          <window.DbCard pad={0} style={{marginBottom: 14}}>
            <div style={{display:"grid", gridTemplateColumns:"100px 1.4fr 1.2fr 1fr 1fr 1fr 80px", padding:"12px 16px", background:"var(--color-canvas-soft, #FCFAF5)", borderBottom:"1px solid " + DB.borderSoft, fontSize: 10, fontWeight: 700, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em"}}>
              <div>Code</div><div>Shift name</div><div>Timing</div><div>Break</div><div>Grace</div><div>Used by</div><div>Status</div>
            </div>
            {[
              { c:"GEN", n:"General · 09–18", t:"09:00 → 18:00", b:"60 min", g:"15 min", u:"1,820 emp", s:"active" },
              { c:"MORN", n:"Morning · 07–16", t:"07:00 → 16:00", b:"60 min", g:"10 min", u:"612 emp", s:"active" },
              { c:"EVE", n:"Evening · 14–22", t:"14:00 → 22:00", b:"45 min", g:"10 min", u:"284 emp", s:"active" },
              { c:"NIGHT", n:"Night · 22–07", t:"22:00 → 07:00", b:"60 min", g:"15 min", u:"68 emp", s:"active" },
              { c:"WKND", n:"Weekend half-day", t:"09:00 → 13:00", b:"—", g:"10 min", u:"42 emp", s:"draft" },
              { c:"FLEX", n:"Flexi · 8h", t:"any 8h window", b:"60 min", g:"—", u:"122 emp", s:"active" },
            ].map((s, i) => (
              <div key={s.c} style={{display:"grid", gridTemplateColumns:"100px 1.4fr 1.2fr 1fr 1fr 1fr 80px", padding:"14px 16px", borderTop: i > 0 ? "1px solid " + DB.borderSoft : 0, alignItems:"center"}}>
                <div style={{fontFamily:"ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: DB.brand}}>{s.c}</div>
                <div style={{fontSize: 13, fontWeight: 600}}>{s.n}</div>
                <div style={{fontSize: 12, color: DB.inkSoft, fontFamily:"ui-monospace, monospace"}}>{s.t}</div>
                <div style={{fontSize: 12, color: DB.muted}}>{s.b}</div>
                <div style={{fontSize: 12, color: DB.muted}}>{s.g}</div>
                <div style={{fontSize: 12, color: DB.inkSoft}}>{s.u}</div>
                <div>
                  <span style={{padding:"3px 8px", borderRadius: 5, background: s.s === "active" ? DB.presentSoft : DB.leaveSoft, color: s.s === "active" ? DB.present : DB.leave, fontSize: 10, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>{s.s}</span>
                </div>
              </div>
            ))}
          </window.DbCard>

          {/* Rules card */}
          <window.DbCard pad={0}>
            <div style={{padding: 16, borderBottom:"1px solid " + DB.borderSoft, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, margin: 0}}>Attendance rules · live</h3>
                <div style={{fontSize: 11, color: DB.muted, marginTop: 4}}>Applied to all shifts unless overridden</div>
              </div>
              <window.DbBtn sm><I.plus size={12}/> Add rule</window.DbBtn>
            </div>
            {[
              { l:"Late if punch-in after grace + 5 min", v:"Marks LATE flag",     ic:"clock", c: DB.late },
              { l:"Half-day if worked < 4 hours",         v:"Auto pro-rate salary", ic:"pieChart", c: DB.brand },
              { l:"Absent if no punch by 12:00",          v:"Triggers manager alert", ic:"warn", c: DB.absent },
              { l:"OT only if approved & > 30 min",       v:"Counted from 18:00+",  ic:"trending", c: DB.ot },
              { l:"Max 3 LWP per month",                  v:"Block 4th leave without pay", ic:"flag", c: DB.brand },
            ].map((r, i) => {
              const Glyph = I[r.ic];
              return (
                <div key={i} style={{padding: 14, borderTop: i > 0 ? "1px solid " + DB.borderSoft : 0, display:"flex", alignItems:"center", gap: 12}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: r.c + "22", color: r.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}><Glyph size={15}/></div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: 13, fontWeight: 600}}>{r.l}</div>
                    <div style={{fontSize: 11, color: DB.muted, marginTop: 2}}>{r.v}</div>
                  </div>
                  <label style={{position:"relative", width: 36, height: 20, display:"inline-block"}}>
                    <span style={{position:"absolute", inset: 0, background: DB.brand, borderRadius: 99}}/>
                    <span style={{position:"absolute", top: 2, right: 2, width: 16, height: 16, background:"#fff", borderRadius: 99, boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
                  </label>
                </div>
              );
            })}
          </window.DbCard>
        </div>
      </div>
    </window.DbPage>
  );
}
window.TM_Hris_DB = TM_Hris_DB;

// 3E · SPD — Regularization queue (back-dated punches), Darwinbox style
function TM_Spd_DB() {
  const I = window.PI;
  const DB = window.DB;

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Time & Attendance / Regularization Queue"
        title="Attendance Regularization"
        chip="42 pending"
        sub="Backdated punch requests, GPS mismatches, and missed clock-outs to verify"
        actions={<>
          <window.DbBtn><I.refresh size={13}/> Refresh</window.DbBtn>
          <window.DbBtn><I.filter size={13}/> Filters</window.DbBtn>
          <window.DbBtn primary><I.check size={13}/> Bulk approve (4 selected)</window.DbBtn>
        </>}/>

      {/* Tab bar */}
      <div style={{display:"flex", gap: 4, marginBottom: 16, padding: 4, background:"#fff", border:"1px solid " + DB.border, borderRadius: 8, width:"fit-content"}}>
        {[
          { l:"All", c: 42, active: true },
          { l:"New", c: 18 },
          { l:"Manager-approved", c: 16 },
          { l:"Overdue SLA", c: 6 },
          { l:"Resolved today", c: 24 },
        ].map(t => (
          <button key={t.l} style={{
            padding:"7px 14px", borderRadius: 5, border: 0,
            background: t.active ? DB.brand : "transparent",
            color: t.active ? "#fff" : DB.inkSoft,
            fontSize: 13, fontWeight: 600, cursor:"pointer", fontFamily:"inherit",
          }}>
            {t.l} <span style={{marginLeft: 4, opacity: 0.7, fontSize: 11}}>{t.c}</span>
          </button>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 16}}>
        {/* List */}
        <window.DbCard pad={0}>
          <div style={{display:"grid", gridTemplateColumns:"32px 1.5fr 1fr 1fr 1fr 80px", padding:"12px 16px", background:"var(--color-canvas-soft, #FCFAF5)", borderBottom:"1px solid " + DB.borderSoft, fontSize: 10, fontWeight: 700, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em", alignItems:"center"}}>
            <input type="checkbox"/>
            <div>Employee / Reason</div>
            <div>Date</div>
            <div>Requested</div>
            <div>SLA</div>
            <div></div>
          </div>
          {[
            { sel: true, n:"Marisa Sa-nguansak", id:"E-58231", r:"Forgot to punch out · web sign-out at 18:02",
              d:"24 May", req:"Punch-out 18:02", sla:"2h left", slaC: DB.late, type:"missed-out", c: DB.late, mgr: true },
            { sel: true, n:"Preecha Worapong", id:"E-72915", r:"On-site training · GPS mismatch (vendor office)",
              d:"26 May", req:"Allow off-site punch", sla:"6h left", slaC: DB.brand, type:"gps", c: DB.brand, mgr: true },
            { sel: false, n:"Aphisit Lertsiri", id:"E-49102", r:"Biometric failed · manual entry",
              d:"27 May", req:"Punch-in 09:08", sla:"22h", slaC: DB.muted, type:"manual", c: DB.brand, mgr: false },
            { sel: true, n:"Wanchai Wachira", id:"E-69912", r:"Forgot to punch in · came back from leave",
              d:"23 May", req:"Punch-in 09:00", sla:"OVERDUE 4h", slaC: DB.absent, type:"missed-in", c: DB.late, mgr: true },
            { sel: false, n:"Napatra Tarntong", id:"E-67830", r:"Wrong shift assigned · should be morning",
              d:"27 May", req:"Switch to MORN shift", sla:"18h", slaC: DB.muted, type:"shift", c: DB.ot, mgr: false },
            { sel: true, n:"Peerapol Tangsiri", id:"E-66012", r:"Device offline at CDM-MAIN · manual log",
              d:"26 May", req:"Punch-in 07:54", sla:"OVERDUE 1d", slaC: DB.absent, type:"device", c: DB.absent, mgr: true },
          ].map((c, i) => (
            <div key={i} style={{display:"grid", gridTemplateColumns:"32px 1.5fr 1fr 1fr 1fr 80px", padding:"14px 16px", borderTop:"1px solid " + DB.borderSoft, alignItems:"center"}}>
              <input type="checkbox" defaultChecked={c.sel}/>
              <div>
                <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 4}}>
                  <span style={{fontSize: 13, fontWeight: 700}}>{c.n}</span>
                  <span style={{fontSize: 10, color: DB.muted, fontFamily:"ui-monospace, monospace"}}>{c.id}</span>
                  {c.mgr && <span style={{padding:"2px 7px", borderRadius: 4, background: DB.presentSoft, color: DB.present, fontSize: 9, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>Mgr approved</span>}
                </div>
                <div style={{fontSize: 12, color: DB.inkSoft, lineHeight: 1.4}}>{c.r}</div>
              </div>
              <div style={{fontSize: 12, color: DB.inkSoft}}>{c.d}</div>
              <div style={{fontSize: 12, color: DB.inkSoft, fontFamily:"ui-monospace, monospace"}}>{c.req}</div>
              <div>
                <span style={{padding:"3px 8px", borderRadius: 5, background: c.slaC + "22", color: c.slaC, fontSize: 10, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>{c.sla}</span>
              </div>
              <div style={{display:"flex", gap: 4}}>
                <window.DbBtn sm><I.eye size={11}/></window.DbBtn>
                <window.DbBtn sm primary><I.check size={11}/></window.DbBtn>
              </div>
            </div>
          ))}
          <div style={{padding:"12px 16px", borderTop:"1px solid " + DB.borderSoft, display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--color-canvas-soft, #FCFAF5)"}}>
            <span style={{fontSize: 12, color: DB.muted}}>Showing 1–6 of 42</span>
            <div style={{display:"flex", gap: 4}}>
              <window.DbBtn sm><I.chevL size={11}/></window.DbBtn>
              <window.DbBtn sm><I.chevR size={11}/></window.DbBtn>
            </div>
          </div>
        </window.DbCard>

        {/* Detail panel */}
        <window.DbCard pad={0} style={{position:"sticky", top: 90, alignSelf:"start"}}>
          <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft, background:"var(--color-canvas-soft, #FCFAF5)"}}>
            <div style={{fontSize: 10, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em"}}>Selected request</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 700, margin:"4px 0 0"}}>Marisa Sa-nguansak</h3>
            <div style={{fontSize: 12, color: DB.muted, marginTop: 2}}>E-58231 · Cashier · L1 · CTW Floor 1</div>
          </div>

          <div style={{padding: 16}}>
            {/* Request meta */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12, marginBottom: 16, padding: 12, background: "var(--color-canvas-soft, #FCFAF5)", borderRadius: 8}}>
              {[
                ["Type",  "Missed punch-out"],
                ["Date",  "Sat 24 May 2025"],
                ["Shift", "General · 09–18"],
                ["Requested", "Out at 18:02"],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{fontSize: 10, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em"}}>{l}</div>
                  <div style={{fontSize: 13, fontWeight: 600, marginTop: 2}}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{fontSize: 12, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em", marginBottom: 6}}>Employee note</div>
            <div style={{padding: 12, background: DB.brand + "11", borderRadius: 8, borderLeft: "3px solid " + DB.brand, fontSize: 13, color: DB.inkSoft, lineHeight: 1.55, fontStyle:"italic", marginBottom: 16}}>
              "ลืมแตะออกตอนเลิกงาน เดินขึ้นรถไฟฟ้าไปแล้วถึงนึกได้ค่ะ ลงเวลาออกจริง 18:02 ก่อนขึ้น MRT"
            </div>

            <div style={{fontSize: 12, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em", marginBottom: 8}}>Verification checklist</div>
            {[
              ["Manager approved request",   true,  "Aitthichai · 25 May 09:14"],
              ["Punch-in was on time",       true,  "Clocked in at 08:58"],
              ["No pattern of missed-outs",  true,  "0 in last 90 days"],
              ["Within SLA window",          false, "2 hours remaining"],
            ].map(([l, ok, sub]) => (
              <div key={l} style={{display:"flex", alignItems:"flex-start", gap: 8, padding:"6px 0", borderBottom: "1px solid " + DB.borderSoft}}>
                <div style={{
                  width: 16, height: 16, borderRadius: 99,
                  background: ok ? DB.present : DB.late, color: "#fff",
                  display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0, marginTop: 2,
                }}>
                  {ok ? <I.check size={10}/> : <I.warn size={10}/>}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 12, fontWeight: 600}}>{l}</div>
                  <div style={{fontSize: 11, color: DB.muted}}>{sub}</div>
                </div>
              </div>
            ))}

            <div style={{display:"flex", gap: 8, marginTop: 18}}>
              <window.DbBtn style={{flex: 1}} ghost><I.x size={13}/> Reject</window.DbBtn>
              <window.DbBtn style={{flex: 1.6}} primary><I.check size={13}/> Approve & post</window.DbBtn>
            </div>
            <button style={{
              width:"100%", marginTop: 8, padding:"8px 12px", border: 0,
              background:"transparent", color: DB.muted, fontSize: 12, fontWeight: 600,
              cursor:"pointer", fontFamily:"inherit",
            }}>Send back for more info</button>
          </div>
        </window.DbCard>
      </div>
    </window.DbPage>
  );
}
window.TM_Spd_DB = TM_Spd_DB;
