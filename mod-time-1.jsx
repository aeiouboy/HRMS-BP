// ============= MODULE 3: TIME MANAGEMENT (Employee + Manager) =============

// 3A · EMPLOYEE — ลงเวลา + ลา
function TM_Employee() {
  const I = window.PI;
  const [clockedIn, setClockedIn] = React.useState(true);
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Time Management · มุมพนักงาน"
        title="เวลาทำงานของฉัน"
        subtitle="กะปกติ 09:00–18:00 · พฤษภาคม 2568 · ทำงาน 19 วัน · OT 6 ชม."
        actions={<>
          <button className="humi-button humi-button--ghost"><I.calendar size={14}/> ขอลา</button>
          <button className="humi-button humi-button--primary"><I.clock size={14}/> ขอ OT</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"1.1fr 1fr", gap: 20, marginBottom: 24}}>
        {/* Clock in/out */}
        <div className="humi-card humi-grain" style={{overflow:"hidden", position:"relative", padding: 24}}>
          <div className="humi-blob humi-blob--teal" style={{width: 140, height: 170, right: -40, top: -50, opacity: 0.4}}/>
          <div className="humi-blob humi-blob--butter" style={{width: 60, height: 80, right: 100, bottom: -20, opacity: 0.65}}/>

          <div className="humi-eyebrow">วันอังคารที่ 27 พ.ค. 2568</div>
          <div style={{display:"flex", alignItems:"baseline", gap: 12, marginTop: 8}}>
            <div style={{fontFamily:"var(--font-display)", fontSize: 56, fontWeight: 700, letterSpacing:"-0.03em", lineHeight: 1}}>14:32</div>
            <div style={{fontSize: 16, color:"var(--color-ink-muted)"}}>:18</div>
          </div>

          <div className="humi-row" style={{gap: 10, marginTop: 18}}>
            <span className="humi-tag humi-tag--accent">
              <span style={{width: 7, height: 7, borderRadius: 99, background:"var(--color-accent)", display:"inline-block", animation:"pulse 1.5s infinite"}}/>
              เข้างานแล้ว · 09:02
            </span>
            <span className="humi-tag humi-tag--cream">CTW Floor 1 · GPS ตรงพิกัด</span>
          </div>

          <div className="humi-row" style={{marginTop: 22, gap: 10}}>
            <button onClick={() => setClockedIn(false)} className="humi-button humi-button--primary" style={{flex: 1, padding:"14px 20px", minHeight: 52, fontSize: 15}}>
              <I.logoutOut size={18}/> ลงเวลาออกงาน
            </button>
            <button className="humi-icon-btn" style={{width: 52, height: 52}}><I.qr size={20}/></button>
            <button className="humi-icon-btn" style={{width: 52, height: 52}}><I.fingerprint size={20}/></button>
          </div>

          <div style={{marginTop: 18, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 12}}>
            {[
              ["เข้างาน", "09:02", "var(--color-accent)"],
              ["พักเที่ยง", "12:00–13:00", "var(--color-ink-muted)"],
              ["ออกตามกะ", "18:00", "var(--color-ink-faint)"],
            ].map(([l, v, c]) => (
              <div key={l} style={{padding: 12, background:"rgba(255,255,255,0.7)", borderRadius: 10, backdropFilter:"blur(8px)"}}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 700, marginTop: 2, color: c}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave balance */}
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 16}}>
            <div>
              <div className="humi-eyebrow">วันลาคงเหลือ · ปี 2568</div>
              <h3 style={{fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 600, marginTop: 4}}>วันหยุดของฉัน</h3>
            </div>
            <span className="humi-spacer"/>
            <span className="humi-tag humi-tag--accent">ใช้ได้ 12.5 วัน</span>
          </div>

          {[
            { l:"ลาพักร้อน",   used: 4,  total: 12, c:"var(--color-accent)", ic:"beach" },
            { l:"ลาป่วย",      used: 2,  total: 30, c:"var(--color-warning)", ic:"pill" },
            { l:"ลากิจ",       used: 1.5, total: 5,  c:"var(--color-info)",   ic:"calendar" },
            { l:"ลาพักผ่อนสะสม", used: 0, total: 3,  c:"var(--color-sage)",   ic:"star" },
          ].map(b => {
            const remain = b.total - b.used;
            const Glyph = I[b.ic];
            return (
              <div key={b.l} style={{padding:"12px 0", borderBottom:"1px solid var(--color-hairline-soft)"}}>
                <div className="humi-row" style={{marginBottom: 6}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background:"var(--color-canvas-soft)", color: b.c, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={14}/></div>
                  <span style={{fontSize: 13, fontWeight: 600}}>{b.l}</span>
                  <span className="humi-spacer"/>
                  <span style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>{remain}</span>
                  <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>/{b.total} วัน</span>
                </div>
                <div style={{height: 5, background:"var(--color-hairline-soft)", borderRadius: 99, overflow:"hidden"}}>
                  <div style={{width: (b.used/b.total*100)+"%", height:"100%", background: b.c, borderRadius: 99}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent timesheet */}
      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
          <div className="humi-row">
            <h3 className="humi-section-title">เวลาทำงานล่าสุด</h3>
            <span className="humi-spacer"/>
            <window.SegTabs active="week" tabs={[{id:"week", label:"สัปดาห์นี้"},{id:"month", label:"พ.ค. 68"},{id:"year", label:"ปี 68"}]}/>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"100px 1fr 1fr 1fr 1fr 1fr 80px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
          <div>วันที่</div>
          <div>กะ</div>
          <div>เข้างาน</div>
          <div>พัก</div>
          <div>ออกงาน</div>
          <div>OT</div>
          <div style={{textAlign:"right"}}>รวม</div>
        </div>
        {[
          { d:"อ. 27 พ.ค.", k:"09:00–18:00", in:"09:02", brk:"12:00–13:00", out:"—", ot:"—", tot:"กำลังทำงาน", active:true },
          { d:"จ. 26 พ.ค.", k:"09:00–18:00", in:"08:58", brk:"12:05–13:00", out:"19:14", ot:"+1.2 ชม.", tot:"10.2 ชม.", ok:true },
          { d:"อา 25 พ.ค.", k:"OFF", in:"—", brk:"—", out:"—", ot:"—", tot:"วันหยุด", off:true },
          { d:"ส. 24 พ.ค.", k:"09:00–18:00", in:"09:08", brk:"12:00–12:55", out:"18:02", ot:"—", tot:"8.9 ชม.", ok:true, late:true },
          { d:"ศ. 23 พ.ค.", k:"09:00–18:00", in:"09:01", brk:"12:00–13:00", out:"18:00", ot:"—", tot:"9.0 ชม.", ok:true },
          { d:"พฤ 22 พ.ค.", k:"ลาพักร้อน", in:"—", brk:"—", out:"—", ot:"—", tot:"ลา 1 วัน", leave:true },
        ].map((d, i) => (
          <div key={i} style={{display:"grid", gridTemplateColumns:"100px 1fr 1fr 1fr 1fr 1fr 80px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center", background: d.active ? "var(--color-accent-soft)" : "transparent"}}>
            <div style={{fontSize: 13, fontWeight: 600}}>{d.d}</div>
            <div style={{fontSize: 13, color: d.off ? "var(--color-ink-faint)" : "var(--color-ink-soft)"}}>{d.k}</div>
            <div style={{fontSize: 13, fontWeight: 500, color: d.late ? "var(--color-warning)" : "var(--color-ink)"}}>{d.in}{d.late && <span style={{fontSize:10, marginLeft: 4, color:"var(--color-warning)"}}>+8 นาที</span>}</div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{d.brk}</div>
            <div style={{fontSize: 13}}>{d.out}</div>
            <div style={{fontSize: 13, color: d.ot !== "—" ? "var(--color-accent)" : "var(--color-ink-muted)"}}>{d.ot}</div>
            <div style={{textAlign:"right", fontSize: 13, fontWeight: 600, color: d.leave ? "var(--color-info)" : d.off ? "var(--color-ink-faint)" : "var(--color-ink)"}}>{d.tot}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }`}</style>
    </div>
  );
}
window.TM_Employee = TM_Employee;

// 3B · MANAGER — ปฏิทินทีม + อนุมัติลา/OT
function TM_Manager() {
  const I = window.PI;
  const today = 27;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Time Management · มุมผู้จัดการ"
        title="ปฏิทินและเวลาทำงานทีม"
        subtitle="14 คนในทีม · 12 ทำงานวันนี้ · 1 ลาป่วย · 1 ลาพักร้อน · OT รออนุมัติ 3"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> Export กะ</button>
          <button className="humi-button humi-button--primary"><I.plus size={14}/> จัดกะ/มอบหมาย</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="ทำงานวันนี้" value="12/14" sub="86%" accent="var(--color-accent)" icon="check"/>
        <window.StatCard label="ลา/ขาดวันนี้" value="2" sub="ลาป่วย 1 · พักร้อน 1" accent="var(--color-warning)" icon="beach"/>
        <window.StatCard label="OT รออนุมัติ" value="3" sub="รวม 9 ชม." icon="clock"/>
        <window.StatCard label="มาสาย · เดือนนี้" value="4" sub="ของทั้งทีม" icon="warn"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
        {/* Team calendar (Gantt-like) */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <div className="humi-row">
              <h3 className="humi-section-title">ตารางทีม · 26 พ.ค. – 1 มิ.ย.</h3>
              <span className="humi-spacer"/>
              <button className="humi-icon-btn" style={{width: 32, height: 32}}><I.chevL size={13}/></button>
              <button className="humi-icon-btn" style={{width: 32, height: 32, marginLeft: 4}}><I.chevR size={13}/></button>
            </div>
          </div>

          {/* Header row */}
          <div style={{display:"grid", gridTemplateColumns:"180px repeat(7, 1fr)", borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <div style={{padding:"10px 14px", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>พนักงาน</div>
            {[
              {d:26, w:"จ"},{d:27, w:"อ", today:true},{d:28, w:"พ"},{d:29, w:"พฤ"},{d:30, w:"ศ"},
              {d:31, w:"ส", we:true},{d:1, w:"อา", we:true},
            ].map(d => (
              <div key={d.d} style={{padding:"10px 8px", textAlign:"center", borderLeft:"1px solid var(--color-hairline-soft)", background: d.today ? "var(--color-accent-soft)" : d.we ? "rgba(0,0,0,0.02)" : "transparent"}}>
                <div style={{fontSize: 10, color:"var(--color-ink-muted)", letterSpacing:".06em"}}>{d.w}</div>
                <div style={{fontSize: 14, fontWeight: 700, marginTop: 2}}>{d.d}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            { n:"มาริสา ส.", r:"Cashier", c:"teal",
              days:[{t:"shift",l:"M"}, {t:"shift",l:"M",act:true}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"shift",l:"E"}, {t:"off"}, {t:"off"}] },
            { n:"ธีรพัฒน์ ม.", r:"Senior Cashier", c:"sage",
              days:[{t:"shift",l:"E"}, {t:"shift",l:"E"}, {t:"shift",l:"E"}, {t:"off"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"off"}] },
            { n:"กัลยา ภ.", r:"Sales Asst.", c:"butter",
              days:[{t:"shift",l:"M"}, {t:"sick"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"off"}, {t:"off"}] },
            { n:"นิภาพร ส.", r:"Cashier", c:"coral",
              days:[{t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"vac",l:"พักร้อน"}, {t:"vac"}, {t:"vac"}, {t:"off"}, {t:"off"}] },
            { n:"อัมพร พ.", r:"Sales Asst.", c:"teal",
              days:[{t:"shift",l:"E"}, {t:"shift",l:"E",ot:true}, {t:"shift",l:"E"}, {t:"shift",l:"E"}, {t:"off"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}] },
            { n:"ปรีชา ว.", r:"Floor Staff", c:"ink",
              days:[{t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"shift",l:"M"}, {t:"off"}, {t:"off"}] },
          ].map((row, i) => (
            <div key={i} style={{display:"grid", gridTemplateColumns:"180px repeat(7, 1fr)", borderBottom:"1px solid var(--color-hairline-soft)", minHeight: 56}}>
              <div className="humi-row" style={{padding:"10px 14px"}}>
                <span className={"humi-avatar humi-avatar--" + row.c} style={{width: 30, height: 30, fontSize: 11}}>{row.n.slice(0,2)}</span>
                <div style={{minWidth: 0}}>
                  <div style={{fontSize: 13, fontWeight: 600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{row.n}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{row.r}</div>
                </div>
              </div>
              {row.days.map((d, j) => {
                const isToday = j === 1;
                return (
                  <div key={j} style={{padding: 6, borderLeft:"1px solid var(--color-hairline-soft)", background: isToday ? "rgba(31,168,160,0.06)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {d.t === "shift" && (
                      <div style={{width:"100%", padding:"8px 4px", borderRadius: 6, background: d.l === "M" ? "var(--color-accent-soft)" : "var(--color-butter-soft)", color: d.l === "M" ? "var(--color-accent)" : "#6B4E14", fontSize: 11, fontWeight: 600, textAlign:"center", border: d.act ? "1.5px solid var(--color-accent)" : "0"}}>
                        {d.l === "M" ? "M 09–18" : "E 14–22"}
                        {d.ot && <div style={{fontSize: 10, marginTop: 2, color:"var(--color-warning)", fontWeight: 700}}>+OT 2h</div>}
                      </div>
                    )}
                    {d.t === "off"  && <span style={{fontSize: 11, color:"var(--color-ink-faint)"}}>OFF</span>}
                    {d.t === "sick" && <div style={{width:"100%", padding:"8px 4px", borderRadius: 6, background:"var(--color-warning-soft)", color:"#6B4E14", fontSize: 11, fontWeight: 600, textAlign:"center"}}>ป่วย</div>}
                    {d.t === "vac"  && <div style={{width:"100%", padding:"8px 4px", borderRadius: 6, background:"var(--color-info-soft)", color:"var(--color-info)", fontSize: 11, fontWeight: 600, textAlign:"center"}}>{d.l || "•••"}</div>}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="humi-row" style={{padding: 14, background:"var(--color-canvas-soft)", gap: 16, fontSize: 11, flexWrap:"wrap"}}>
            <span className="humi-row"><span style={{width: 12, height: 12, borderRadius: 3, background:"var(--color-accent-soft)"}}/> กะเช้า</span>
            <span className="humi-row"><span style={{width: 12, height: 12, borderRadius: 3, background:"var(--color-butter-soft)"}}/> กะบ่าย</span>
            <span className="humi-row"><span style={{width: 12, height: 12, borderRadius: 3, background:"var(--color-warning-soft)"}}/> ลาป่วย</span>
            <span className="humi-row"><span style={{width: 12, height: 12, borderRadius: 3, background:"var(--color-info-soft)"}}/> พักร้อน</span>
          </div>
        </div>

        {/* Pending approvals */}
        <div>
          <div className="humi-card" style={{padding: 0, overflow:"hidden", marginBottom: 16}}>
            <div style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)"}}>
              <h3 className="humi-section-title">รออนุมัติ</h3>
            </div>
            {[
              { t:"OT · พุธ 28 พ.ค.", n:"อัมพร พ.", d:"19:00–21:00 (2 ชม.)", r:"จัดเรียงสต๊อกพิเศษ", ic:"clock", c:"butter" },
              { t:"ลาพักร้อน 3 วัน",  n:"นิภาพร ส.", d:"28–30 พ.ค.",          r:"ครอบครัวมาเที่ยว",   ic:"beach", c:"info" },
              { t:"ลาป่วย ย้อนหลัง",  n:"กัลยา ภ.",  d:"27 พ.ค. (1 วัน)",     r:"+ ใบรับรองแพทย์",   ic:"pill",  c:"warning" },
            ].map((req, i) => {
              const Glyph = I[req.ic];
              return (
                <div key={i} style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)"}}>
                  <div className="humi-row" style={{marginBottom: 8}}>
                    <div style={{width: 32, height: 32, borderRadius: 8, background:"var(--color-canvas-soft)", color:`var(--color-${req.c})`, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={15}/></div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 600}}>{req.t}</div>
                      <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{req.n} · {req.d}</div>
                    </div>
                  </div>
                  <div style={{fontSize: 12, color:"var(--color-ink-soft)", marginLeft: 44, marginBottom: 10}}>"{req.r}"</div>
                  <div className="humi-row" style={{gap: 6, marginLeft: 44}}>
                    <button className="humi-button humi-button--ghost" style={{padding:"4px 10px", fontSize: 12, minHeight: 30}}>ปฏิเสธ</button>
                    <button className="humi-button humi-button--primary" style={{padding:"4px 10px", fontSize: 12, minHeight: 30}}>อนุมัติ</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="humi-card humi-card--ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="humi-blob humi-blob--teal" style={{width: 80, height: 110, right: -20, top: -30, opacity: 0.4}}/>
            <div className="humi-eyebrow" style={{color:"var(--color-accent)"}}>กะวันนี้</div>
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 16, color:"var(--color-canvas-soft)", marginTop: 8, fontWeight: 600}}>กะเช้า 8 คน · กะบ่าย 4 คน</h4>
            <div style={{fontSize: 12, color:"rgba(231,227,216,0.7)", marginTop: 6}}>คาดการณ์ลูกค้า: 1,240 · อัตรา 103 คน/พนักงาน</div>
            <button className="humi-button humi-button--primary" style={{marginTop: 12, width:"100%"}}>ดูแผนกะรายวัน</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.TM_Manager = TM_Manager;
