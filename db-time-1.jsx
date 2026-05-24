// ============= TIME MANAGEMENT — Darwinbox style — EMPLOYEE + MANAGER =============

// Generate 31-day strip with realistic statuses
function makeDays(currentDay) {
  const arr = [];
  for (let i = 1; i <= 31; i++) {
    if (i > 31) { arr.push({ n: i, s: "" }); continue; }
    const dow = (i + 2) % 7; // Wed=1
    let s = "P";
    if (dow === 0 || dow === 6) s = "WO";
    if ([13, 14].includes(i)) s = "H";
    if (i === 8) s = "L";
    if (i === 21) s = "L";
    if (i === 17) s = "A";
    if (i === 24) s = "LT";
    if (i > currentDay) s = "";
    arr.push({ n: i, s, today: i === currentDay });
  }
  return arr;
}

// 3A · EMPLOYEE — Darwinbox style
function TM_Employee_DB() {
  const I = window.PI;
  const DB = window.DB;
  const [clockedIn, setClockedIn] = React.useState(true);
  const days = makeDays(27);

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Time & Attendance / My Attendance"
        title="My Attendance"
        sub="Shift: General · 09:00 to 18:00 · Reporting to Aditya Chuenban"
        actions={<>
          <window.DbBtn><I.calendar size={13}/> Apply Leave</window.DbBtn>
          <window.DbBtn><I.clock size={13}/> Regularize</window.DbBtn>
          <window.DbBtn primary><I.plus size={13}/> Request OT</window.DbBtn>
        </>}/>

      {/* Row 1: Punch hero + My Pulse */}
      <div style={{display:"grid", gridTemplateColumns:"1.3fr 1fr", gap: 16, marginBottom: 16}}>
        {/* Punch / Clock-in hero — Darwinbox signature */}
        <window.DbCard pad={0} style={{overflow:"hidden", position:"relative"}}>
          <div style={{
            background: `linear-gradient(135deg, ${DB.brand} 0%, #2A8A85 100%)`,
            padding: "22px 24px",
            color: "#fff",
            position:"relative",
            overflow:"hidden",
          }}>
            <div style={{position:"absolute", right: -40, top: -40, width: 180, height: 180, borderRadius:"50%", background:"rgba(255,255,255,0.08)"}}/>
            <div style={{position:"absolute", right: 40, bottom: -60, width: 120, height: 120, borderRadius:"50%", background:"rgba(255,255,255,0.06)"}}/>

            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative"}}>
              <div>
                <div style={{fontSize: 12, opacity: 0.85, fontWeight: 500}}>Tuesday, 27 May 2025</div>
                <div style={{display:"flex", alignItems:"baseline", gap: 6, marginTop: 6}}>
                  <span style={{fontFamily:"var(--font-display)", fontSize: 52, fontWeight: 700, letterSpacing:"-0.04em", lineHeight: 1}}>14:32</span>
                  <span style={{fontSize: 18, opacity: 0.7}}>:18</span>
                </div>
                <div style={{display:"flex", gap: 8, marginTop: 12, flexWrap:"wrap"}}>
                  <span style={{padding:"3px 10px", borderRadius: 99, background:"rgba(255,255,255,0.18)", fontSize: 11, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 5}}>
                    <span style={{width: 6, height: 6, borderRadius: 99, background: DB.present}}/> Clocked in · 09:02
                  </span>
                  <span style={{padding:"3px 10px", borderRadius: 99, background:"rgba(255,255,255,0.18)", fontSize: 11, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 5}}>
                    <I.mapPin size={11}/> CTW Floor 1
                  </span>
                </div>
              </div>

              <div style={{textAlign:"right"}}>
                <div style={{fontSize: 10, opacity: 0.7, textTransform:"uppercase", letterSpacing:".08em", fontWeight: 700}}>Total worked</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 2}}>5h 30m</div>
                <div style={{fontSize: 11, opacity: 0.75, marginTop: 2}}>of 9h target</div>
              </div>
            </div>
          </div>

          <div style={{padding: "16px 24px", display:"flex", gap: 10, alignItems:"center"}}>
            <button onClick={() => setClockedIn(!clockedIn)} style={{
              flex: 1,
              padding: "12px 18px",
              borderRadius: 8,
              background: clockedIn ? DB.absentSoft : DB.brand,
              color: clockedIn ? DB.absent : "#fff",
              border: 0,
              fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 8,
            }}>
              <I.logoutOut size={16}/> Web Sign-out
            </button>
            <button style={{
              padding: "12px 14px", borderRadius: 8, border: "1px solid " + DB.border, background: "#fff",
              cursor: "pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap: 6, fontSize: 13, fontWeight: 600, color: DB.inkSoft,
            }}>
              <I.qr size={15}/> QR Punch
            </button>
            <button style={{
              padding: "12px 14px", borderRadius: 8, border: "1px solid " + DB.border, background: "#fff",
              cursor: "pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap: 6, fontSize: 13, fontWeight: 600, color: DB.inkSoft,
            }}>
              <I.fingerprint size={15}/> Bio
            </button>
          </div>

          <div style={{padding: "0 24px 18px"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 0, background: "var(--color-canvas-soft, #FCFAF5)", borderRadius: 8, padding: 12, border: "1px solid " + DB.borderSoft}}>
              {[
                { l:"First in", v:"09:02", c: DB.present },
                { l:"Break", v:"60 min", c: DB.muted },
                { l:"Last out", v:"—", c: DB.faint },
                { l:"Total punches", v:"3", c: DB.ink },
              ].map((s, i) => (
                <div key={s.l} style={{textAlign:"center", borderLeft: i > 0 ? "1px solid " + DB.borderSoft : 0, padding:"2px 8px"}}>
                  <div style={{fontSize: 10, color: DB.muted, fontWeight: 600, textTransform:"uppercase", letterSpacing:".06em"}}>{s.l}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, marginTop: 4, color: s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </window.DbCard>

        {/* My Pulse — donut */}
        <window.DbCard>
          <window.DbSectionHead title="My Pulse · May 2025" action={
            <button style={{background:"none", border:0, color: DB.brand, fontSize: 12, fontWeight: 600, cursor:"pointer"}}>View report →</button>
          }/>
          <div style={{display:"flex", gap: 18, alignItems:"center"}}>
            <window.DbDonut
              size={140} thick={20}
              segments={[
                { value: 17, color: DB.present },
                { value: 2,  color: DB.leave },
                { value: 1,  color: DB.absent },
                { value: 1,  color: DB.late },
                { value: 6,  color: "var(--color-canvas, #F6F1E8)" },
              ]}
              centerLabel="94%"
              centerSub="Att. score"
            />
            <div style={{flex: 1}}>
              {[
                ["Present",   17, DB.present],
                ["On Leave",  2,  DB.leave],
                ["Absent",    1,  DB.absent],
                ["Late mark", 1,  DB.late],
                ["Week Off",  6,  DB.weekoff],
              ].map(([l, v, c]) => (
                <div key={l} style={{display:"flex", alignItems:"center", padding:"4px 0", fontSize: 12}}>
                  <span style={{width: 8, height: 8, borderRadius: 99, background: c, marginRight: 8}}/>
                  <span style={{flex: 1, color: DB.inkSoft}}>{l}</span>
                  <span style={{fontWeight: 700, color: DB.ink}}>{v}d</span>
                </div>
              ))}
            </div>
          </div>
        </window.DbCard>
      </div>

      {/* Row 2: 31-day strip */}
      <window.DbCard style={{marginBottom: 16}}>
        <window.DbAttStrip days={days} monthLabel="May 2025"/>
      </window.DbCard>

      {/* Row 3: Leave balance + Quick links */}
      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 16, marginBottom: 16}}>
        <window.DbCard>
          <window.DbSectionHead title="Leave Balance · 2025" action={
            <button style={{background:"none", border:0, color: DB.brand, fontSize: 12, fontWeight: 600, cursor:"pointer"}}>Apply leave →</button>
          }/>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
            {[
              { l:"Earned",   used: 4,   total: 12,  c: DB.brand,   ic:"beach" },
              { l:"Sick",     used: 2,   total: 30,  c: DB.absent,  ic:"pill" },
              { l:"Casual",   used: 1.5, total: 5,   c: DB.leave,   ic:"calendar" },
              { l:"Comp Off", used: 0,   total: 3,   c: DB.holiday, ic:"star" },
            ].map(b => {
              const Glyph = I[b.ic];
              const remain = b.total - b.used;
              return (
                <div key={b.l} style={{padding: 14, borderRadius: 8, background: "var(--color-canvas-soft, #FCFAF5)", border: "1px solid " + DB.borderSoft}}>
                  <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 10}}>
                    <div style={{width: 28, height: 28, borderRadius: 7, background: "#fff", color: b.c, display:"inline-flex", alignItems:"center", justifyContent:"center", border: "1px solid " + DB.borderSoft}}><Glyph size={14}/></div>
                    <span style={{fontSize: 12, fontWeight: 600, color: DB.inkSoft}}>{b.l}</span>
                  </div>
                  <div style={{display:"flex", alignItems:"baseline", gap: 4}}>
                    <span style={{fontFamily:"var(--font-display)", fontSize: 24, fontWeight: 700, letterSpacing:"-0.02em"}}>{remain}</span>
                    <span style={{fontSize: 11, color: DB.muted}}>/ {b.total}</span>
                  </div>
                  <div style={{height: 4, background: "#fff", borderRadius: 99, marginTop: 8, overflow:"hidden"}}>
                    <div style={{width: (b.used/b.total*100)+"%", height:"100%", background: b.c}}/>
                  </div>
                  <div style={{fontSize: 10, color: DB.muted, marginTop: 6}}>Used {b.used} · Remaining {remain}</div>
                </div>
              );
            })}
          </div>
        </window.DbCard>

        <window.DbCard>
          <window.DbSectionHead title="Quick Links"/>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 8}}>
            {[
              {ic:"calendar", l:"Apply Leave"},
              {ic:"clock", l:"Regularize"},
              {ic:"refresh", l:"Shift Swap"},
              {ic:"fileText", l:"Timesheet"},
              {ic:"beach", l:"Holidays"},
              {ic:"download", l:"My Report"},
            ].map(q => {
              const Glyph = I[q.ic];
              return (
                <button key={q.l} style={{
                  padding: "14px 8px", borderRadius: 8, border: "1px solid " + DB.borderSoft, background: "#fff",
                  cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap: 6, fontFamily:"inherit",
                }}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: DB.brandSoft, color: DB.brand, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={15}/></div>
                  <span style={{fontSize: 11, fontWeight: 600, color: DB.inkSoft, textAlign:"center", lineHeight: 1.2}}>{q.l}</span>
                </button>
              );
            })}
          </div>
        </window.DbCard>
      </div>

      {/* Row 4: Recent activity log */}
      <window.DbCard pad={0}>
        <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, margin: 0}}>Recent Punches</h3>
          <button style={{background:"none", border:0, color: DB.brand, fontSize: 12, fontWeight: 600, cursor:"pointer"}}>View all →</button>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"110px 110px 1.5fr 100px 100px 100px 80px", padding: "10px 16px", background: "var(--color-canvas-soft, #FCFAF5)", fontSize: 10, fontWeight: 700, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em"}}>
          <div>Date</div><div>Day</div><div>Shift</div><div>In</div><div>Out</div><div>Hours</div><div>Status</div>
        </div>
        {[
          { d:"27 May 25", w:"Tue", k:"General · 09–18", in:"09:02", out:"—",     hrs:"5h 30m",  st:"In Progress",     c: DB.brand },
          { d:"26 May 25", w:"Mon", k:"General · 09–18", in:"08:58", out:"19:14", hrs:"10h 16m", st:"Present + OT 1h", c: DB.present },
          { d:"24 May 25", w:"Sat", k:"General · 09–18", in:"09:08", out:"18:02", hrs:"8h 54m",  st:"Late by 8 min",   c: DB.late },
          { d:"23 May 25", w:"Fri", k:"General · 09–18", in:"09:01", out:"18:00", hrs:"8h 59m",  st:"Present",         c: DB.present },
          { d:"22 May 25", w:"Thu", k:"Earned Leave",    in:"—",     out:"—",     hrs:"—",       st:"On Leave",        c: DB.leave },
          { d:"21 May 25", w:"Wed", k:"General · 09–18", in:"08:54", out:"18:03", hrs:"9h 9m",   st:"Present",         c: DB.present },
        ].map((r, i) => (
          <div key={i} style={{display:"grid", gridTemplateColumns:"110px 110px 1.5fr 100px 100px 100px 80px", padding: "14px 16px", borderTop: "1px solid " + DB.borderSoft, alignItems:"center", fontSize: 13}}>
            <div style={{fontWeight: 600}}>{r.d}</div>
            <div style={{color: DB.muted}}>{r.w}</div>
            <div style={{color: DB.inkSoft}}>{r.k}</div>
            <div style={{fontWeight: 600}}>{r.in}</div>
            <div style={{fontWeight: 600}}>{r.out}</div>
            <div style={{fontWeight: 600, color: DB.inkSoft}}>{r.hrs}</div>
            <div>
              <span style={{padding:"3px 8px", borderRadius: 5, background: r.c + "22", color: r.c, fontSize: 10, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>{r.st}</span>
            </div>
          </div>
        ))}
      </window.DbCard>
    </window.DbPage>
  );
}
window.TM_Employee_DB = TM_Employee_DB;

// 3B · MANAGER — Darwinbox style
function TM_Manager_DB() {
  const I = window.PI;
  const DB = window.DB;

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Time & Attendance / Team Attendance"
        title="Team Attendance"
        chip="14 reportees"
        sub="Today, Tue 27 May 2025 · Live snapshot of CTW Floor 1"
        actions={<>
          <window.DbBtn><I.download size={13}/> Export</window.DbBtn>
          <window.DbBtn><I.layers size={13}/> Roster</window.DbBtn>
          <window.DbBtn primary><I.plus size={13}/> Assign Shift</window.DbBtn>
        </>}/>

      {/* Stats row */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 12, marginBottom: 16}}>
        <window.DbStat icon="users"   label="Headcount"   value="14"   sub="Active reportees" color={DB.brand}   soft={DB.brandSoft}/>
        <window.DbStat icon="check"   label="Present"     value="12"   sub="86% attendance"   color={DB.present} soft={DB.presentSoft}/>
        <window.DbStat icon="beach"   label="On Leave"    value="2"    sub="1 sick · 1 EL"    color={DB.leave}   soft={DB.leaveSoft}/>
        <window.DbStat icon="clock"   label="Late comers" value="1"    sub="Marisa (+8 min)"  color={DB.late}    soft={DB.lateSoft}/>
        <window.DbStat icon="warn"    label="Pending"     value="5"    sub="Approvals to act" color={DB.ot}      soft={DB.otSoft}/>
      </div>

      {/* Row 2: Today's pulse + Workdesk */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap: 16, marginBottom: 16}}>
        <window.DbCard>
          <window.DbSectionHead title="Today's Pulse · 27 May"/>
          <div style={{display:"flex", gap: 18, alignItems:"center"}}>
            <window.DbDonut
              size={150} thick={22}
              segments={[
                { value: 12, color: DB.present },
                { value: 2,  color: DB.leave },
                { value: 0,  color: DB.absent },
              ]}
              centerLabel="86%"
              centerSub="Attendance"
            />
            <div style={{flex: 1}}>
              {[
                ["Clocked in", 12, DB.present, "by 09:15"],
                ["Late mark",  1,  DB.late,    "Marisa S."],
                ["On Leave",   2,  DB.leave,   "Nipaporn · Kanlaya"],
                ["Yet to punch", 0,  DB.absent, "All marked"],
                ["Working OT", 1,  DB.ot,      "Amphorn (+2h)"],
              ].map(([l, v, c, sub]) => (
                <div key={l} style={{padding:"6px 0", borderBottom: "1px solid " + DB.borderSoft, display:"flex", alignItems:"center", fontSize: 12}}>
                  <span style={{width: 8, height: 8, borderRadius: 99, background: c, marginRight: 8}}/>
                  <span style={{flex: 1, color: DB.inkSoft}}>{l}</span>
                  <span style={{color: DB.muted, fontSize: 11, marginRight: 12}}>{sub}</span>
                  <span style={{fontWeight: 700}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </window.DbCard>

        <window.DbCard pad={0}>
          <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, margin: 0}}>Workdesk · 5 actions</h3>
            <div style={{display:"flex", gap: 4}}>
              {["All 5", "Leave 2", "OT 1", "Reg 2"].map((t, i) => (
                <span key={t} style={{padding:"3px 10px", borderRadius: 5, background: i === 0 ? DB.brand : "var(--color-canvas, #F6F1E8)", color: i === 0 ? "#fff" : DB.inkSoft, fontSize: 11, fontWeight: 600}}>{t}</span>
              ))}
            </div>
          </div>
          {[
            { t:"Overtime · 28 May", n:"Amphorn Phothong", who:"E-66770", d:"19:00–21:00 (2h)", r:"Stock-take support", c: DB.ot, ic:"clock", soft: DB.otSoft },
            { t:"Earned Leave · 3 days", n:"Nipaporn Saensook", who:"E-58102", d:"28–30 May", r:"Family visit", c: DB.leave, ic:"beach", soft: DB.leaveSoft },
            { t:"Sick Leave · backdated", n:"Kanlaya Phuwadon", who:"E-61480", d:"27 May (1 day)", r:"+ Medical cert.", c: DB.absent, ic:"pill", soft: DB.absentSoft },
            { t:"Regularize · forgot to punch out", n:"Marisa Sa-nguansak", who:"E-58231", d:"24 May", r:"Web sign-out at 18:02", c: DB.late, ic:"refresh", soft: DB.lateSoft },
            { t:"Regularize · GPS mismatch", n:"Preecha Worapong", who:"E-72915", d:"26 May", r:"On-site training", c: DB.brand, ic:"mapPin", soft: DB.brandSoft },
          ].map((req, i) => {
            const Glyph = I[req.ic];
            return (
              <div key={i} style={{padding: 14, borderTop: i > 0 ? "1px solid " + DB.borderSoft : 0}}>
                <div style={{display:"flex", gap: 10, alignItems:"flex-start"}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: req.soft, color: req.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}><Glyph size={15}/></div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 13, fontWeight: 700}}>{req.t}</div>
                    <div style={{fontSize: 11, color: DB.muted, marginTop: 2}}>{req.n} · {req.who} · {req.d}</div>
                    <div style={{fontSize: 12, color: DB.inkSoft, marginTop: 6, fontStyle:"italic"}}>"{req.r}"</div>
                  </div>
                  <div style={{display:"flex", gap: 6, flexShrink: 0}}>
                    <window.DbBtn sm><I.x size={11}/></window.DbBtn>
                    <window.DbBtn sm primary><I.check size={11}/> Approve</window.DbBtn>
                  </div>
                </div>
              </div>
            );
          })}
        </window.DbCard>
      </div>

      {/* Row 3: Team roster grid (week view) */}
      <window.DbCard pad={0}>
        <div style={{padding: 16, borderBottom: "1px solid " + DB.borderSoft, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h3 style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 700, margin: 0}}>Roster · 26 May – 1 Jun</h3>
          <div style={{display:"flex", gap: 6, alignItems:"center"}}>
            <window.DbBtn sm><I.chevL size={12}/></window.DbBtn>
            <span style={{fontSize: 12, color: DB.inkSoft, padding:"0 8px"}}>Week 22</span>
            <window.DbBtn sm><I.chevR size={12}/></window.DbBtn>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"200px repeat(7, 1fr)", background: "var(--color-canvas-soft, #FCFAF5)"}}>
          <div style={{padding:"10px 14px", fontSize: 10, fontWeight: 700, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em"}}>Member</div>
          {[
            {d:26, w:"Mon"},{d:27, w:"Tue", today:true},{d:28, w:"Wed"},{d:29, w:"Thu"},{d:30, w:"Fri"},
            {d:31, w:"Sat", we:true},{d:1, w:"Sun", we:true},
          ].map(d => (
            <div key={d.d} style={{padding:"10px 8px", textAlign:"center", borderLeft: "1px solid " + DB.borderSoft, background: d.today ? DB.brandSoft : d.we ? "var(--color-canvas, #F6F1E8)" : "transparent"}}>
              <div style={{fontSize: 10, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em"}}>{d.w}</div>
              <div style={{fontSize: 14, fontWeight: 700, marginTop: 2, color: d.today ? DB.brand : DB.ink}}>{d.d}</div>
            </div>
          ))}
        </div>

        {[
          { n:"Marisa Sa-nguansak", r:"Cashier · L1", id:"E-58231",
            d:[{t:"M", l:"09–18"}, {t:"M", l:"09–18", act:true}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"E", l:"14–22"}, "off", "off"] },
          { n:"Teerapat Mongkol", r:"Sr Cashier · L2", id:"E-49102",
            d:[{t:"E", l:"14–22"}, {t:"E", l:"14–22"}, {t:"E", l:"14–22"}, "off", {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, "off"] },
          { n:"Kanlaya Phuwadon", r:"Sales Asst · L1", id:"E-61480",
            d:[{t:"M", l:"09–18"}, {t:"sick"}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, "off", "off"] },
          { n:"Nipaporn Saensook", r:"Cashier · L1", id:"E-58102",
            d:[{t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"el"}, {t:"el"}, {t:"el"}, "off", "off"] },
          { n:"Amphorn Phothong", r:"Sales Asst · L1", id:"E-66770",
            d:[{t:"E", l:"14–22"}, {t:"E", l:"14–22", ot:true}, {t:"E", l:"14–22"}, {t:"E", l:"14–22"}, "off", {t:"M", l:"09–18"}, {t:"M", l:"09–18"}] },
          { n:"Preecha Worapong", r:"Floor Staff · L1", id:"E-72915",
            d:[{t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, {t:"M", l:"09–18"}, "off", "off"] },
        ].map((row, i) => (
          <div key={i} style={{display:"grid", gridTemplateColumns:"200px repeat(7, 1fr)", borderTop: "1px solid " + DB.borderSoft, minHeight: 56}}>
            <div style={{padding:"12px 14px", display:"flex", gap: 10, alignItems:"center"}}>
              <div style={{width: 30, height: 30, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 700, flexShrink: 0}}>{row.n.slice(0,2)}</div>
              <div style={{minWidth: 0}}>
                <div style={{fontSize: 12, fontWeight: 600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{row.n}</div>
                <div style={{fontSize: 10, color: DB.muted}}>{row.r}</div>
              </div>
            </div>
            {row.d.map((cell, j) => {
              const isToday = j === 1;
              const we = j === 5 || j === 6;
              if (cell === "off") return <div key={j} style={{borderLeft:"1px solid "+DB.borderSoft, background: we ? "var(--color-canvas, #F6F1E8)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize: 10, color: DB.faint, fontWeight: 600}}>OFF</div>;
              if (cell.t === "sick") return <div key={j} style={{borderLeft:"1px solid "+DB.borderSoft, padding: 6, display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{padding:"6px 4px", background: DB.absentSoft, color: DB.absent, fontSize: 10, fontWeight: 700, borderRadius: 5, width:"100%", textAlign:"center"}}>SICK</div></div>;
              if (cell.t === "el")   return <div key={j} style={{borderLeft:"1px solid "+DB.borderSoft, padding: 6, display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{padding:"6px 4px", background: DB.leaveSoft, color: DB.leave, fontSize: 10, fontWeight: 700, borderRadius: 5, width:"100%", textAlign:"center"}}>LEAVE</div></div>;
              const c = cell.t === "M" ? DB.brandSoft : DB.otSoft;
              const fg = cell.t === "M" ? DB.brand : DB.ot;
              return (
                <div key={j} style={{borderLeft:"1px solid "+DB.borderSoft, padding: 6, background: isToday ? "rgba(31,168,160,0.04)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <div style={{padding:"6px 4px", background: c, color: fg, fontSize: 10, fontWeight: 700, borderRadius: 5, width:"100%", textAlign:"center", border: cell.act ? `1.5px solid ${DB.brand}` : "0"}}>
                    {cell.t}<br/>{cell.l}
                    {cell.ot && <div style={{color: DB.late, fontSize: 9, marginTop: 1}}>+2h OT</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </window.DbCard>
    </window.DbPage>
  );
}
window.TM_Manager_DB = TM_Manager_DB;
