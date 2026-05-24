// ============= TIME MANAGEMENT — Darwinbox style — APPLY LEAVE (Employee) =============
// Mini-flow: select type → pick dates → details → review approval chain → submit

function TM_Employee_ApplyLeave() {
  const I = window.PI;
  const DB = window.DB;

  // ----- state -----
  const [type, setType]       = React.useState("earned");
  const [from, setFrom]       = React.useState(28);
  const [to, setTo]           = React.useState(30);
  const [halfDay, setHalfDay] = React.useState(false);
  const [reason, setReason]   = React.useState("เดินทางต่างจังหวัด ไปงานแต่งญาติ");
  const [notify, setNotify]   = React.useState(["Aditya", "Marisa"]);

  const LT = {
    earned:  { label:"Earned Leave (ลาพักร้อน)", color: DB.brand,   soft: DB.brandSoft,  ic:"beach",    bal: 8,   used: 4,   total: 12, accrual:"+1 day / month" },
    sick:    { label:"Sick Leave (ลาป่วย)",       color: DB.absent,  soft: DB.absentSoft, ic:"pill",     bal: 28,  used: 2,   total: 30, accrual:"30 days / year, certs req. > 3 days" },
    casual:  { label:"Casual Leave (ลากิจ)",      color: DB.leave,   soft: DB.leaveSoft,  ic:"calendar", bal: 3.5, used: 1.5, total: 5,  accrual:"5 days / year" },
    bday:    { label:"Birthday Leave",            color: DB.ot,      soft: DB.otSoft,     ic:"party",    bal: 1,   used: 0,   total: 1,  accrual:"1 day / year, in birth month" },
    comp:    { label:"Comp-off (ชดเชย)",          color: DB.holiday, soft: DB.holidaySoft,ic:"star",     bal: 3,   used: 0,   total: 3,  accrual:"From approved OT" },
  };
  const lt = LT[type];
  const totalDays = halfDay ? 0.5 : (to - from + 1);
  const willBal = lt.bal - totalDays;

  // ----- mini calendar (May 2025) -----
  const month = "May 2025";
  const grid = []; // build 6×7
  // 1 May 2025 = Thursday => offset 4 (Sun=0)
  for (let i = 0; i < 4; i++) grid.push({ blank: true });
  for (let d = 1; d <= 31; d++) {
    const dow = (4 + d - 1) % 7;
    const we = dow === 0 || dow === 6;
    grid.push({ d, dow, we });
  }
  while (grid.length < 42) grid.push({ blank: true });

  const inRange = (d) => d >= from && d <= to;
  const onCell = (d) => {
    if (!d) return;
    if (d < from) setFrom(d);
    else if (d > to) setTo(d);
    else { setFrom(d); setTo(d); }
  };

  return (
    <window.DbPage>
      <window.DbPageHead
        crumb="Time & Attendance / My Attendance / Apply Leave"
        title="Apply Leave"
        sub="กรอกข้อมูลการลา · ระบบจะส่งให้หัวหน้างานอนุมัติอัตโนมัติ"
        actions={<>
          <window.DbBtn><I.fileText size={13}/> Save as Draft</window.DbBtn>
          <window.DbBtn><I.x size={13}/> Cancel</window.DbBtn>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"1.55fr 1fr", gap: 16, alignItems:"start"}}>

        {/* ============ LEFT: FORM ============ */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>

          {/* Step 1: Leave type */}
          <window.DbCard pad={0}>
            <div style={{padding:"14px 18px", borderBottom:"1px solid "+DB.borderSoft, display:"flex", alignItems:"center", gap: 10}}>
              <span style={{width: 22, height: 22, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 800}}>1</span>
              <h3 style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, margin: 0}}>Leave Type · เลือกประเภทการลา</h3>
            </div>
            <div style={{padding: 16, display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 8}}>
              {Object.entries(LT).map(([k, v]) => {
                const Glyph = I[v.ic];
                const active = type === k;
                const dis = v.bal <= 0;
                return (
                  <button key={k} onClick={() => !dis && setType(k)} disabled={dis} style={{
                    border: active ? `1.5px solid ${v.color}` : `1px solid ${DB.border}`,
                    background: active ? v.soft : "#fff",
                    borderRadius: 10, padding: "12px 10px",
                    cursor: dis ? "not-allowed" : "pointer", fontFamily:"inherit",
                    textAlign:"left", opacity: dis ? 0.5 : 1, position:"relative",
                  }}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <div style={{width: 26, height: 26, borderRadius: 7, background: v.soft, color: v.color, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={13}/></div>
                      {active && <I.check size={14} style={{color: v.color}}/>}
                    </div>
                    <div style={{fontSize: 11, fontWeight: 700, color: DB.ink, marginTop: 8, lineHeight: 1.25}}>{v.label.split(" (")[0]}</div>
                    <div style={{fontSize: 10, color: DB.muted, marginTop: 2}}>คงเหลือ <b style={{color: v.color}}>{v.bal}</b> / {v.total} วัน</div>
                  </button>
                );
              })}
            </div>
            <div style={{padding:"12px 18px", borderTop:"1px solid "+DB.borderSoft, background:"var(--color-canvas-soft, #FCFAF5)", borderRadius:"0 0 10px 10px", display:"flex", gap: 16, fontSize: 11, color: DB.muted}}>
              <div><b style={{color: DB.inkSoft}}>นโยบาย:</b> {lt.accrual}</div>
              <div>·</div>
              <div>ลาล่วงหน้าได้ <b style={{color: DB.inkSoft}}>1–60 วัน</b></div>
              <div>·</div>
              <div>ส่งให้อนุมัติภายใน <b style={{color: DB.inkSoft}}>24 ชั่วโมง</b></div>
            </div>
          </window.DbCard>

          {/* Step 2: Dates */}
          <window.DbCard pad={0}>
            <div style={{padding:"14px 18px", borderBottom:"1px solid "+DB.borderSoft, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <div style={{display:"flex", alignItems:"center", gap: 10}}>
                <span style={{width: 22, height: 22, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 800}}>2</span>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, margin: 0}}>เลือกวัน · {month}</h3>
              </div>
              <div style={{display:"flex", gap: 6}}>
                <window.DbBtn sm><I.chevL size={12}/></window.DbBtn>
                <window.DbBtn sm>{month}</window.DbBtn>
                <window.DbBtn sm><I.chevR size={12}/></window.DbBtn>
              </div>
            </div>

            <div style={{padding: 16, display:"grid", gridTemplateColumns:"1.1fr 1fr", gap: 18}}>

              {/* Calendar */}
              <div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", marginBottom: 6}}>
                  {["S","M","T","W","T","F","S"].map((d, i) => (
                    <div key={i} style={{textAlign:"center", fontSize: 10, color: DB.muted, fontWeight: 700, textTransform:"uppercase", letterSpacing:".06em", padding: "4px 0"}}>{d}</div>
                  ))}
                </div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap: 3}}>
                  {grid.map((c, i) => {
                    if (c.blank) return <div key={i} style={{aspectRatio: "1"}}/>;
                    const isRange = inRange(c.d);
                    const isStart = c.d === from;
                    const isEnd = c.d === to;
                    const isHoliday = [13, 14].includes(c.d);
                    return (
                      <button key={i} onClick={() => onCell(c.d)} style={{
                        aspectRatio:"1", border: 0, cursor:"pointer", fontFamily:"inherit", padding: 0,
                        background: isRange ? (isStart || isEnd ? lt.color : lt.soft) : "transparent",
                        color: isRange ? (isStart || isEnd ? "#fff" : lt.color) : (c.we ? DB.faint : isHoliday ? DB.absent : DB.ink),
                        fontSize: 12, fontWeight: isRange ? 700 : 600,
                        borderRadius: isStart && isEnd ? 8 : isStart ? "8px 0 0 8px" : isEnd ? "0 8px 8px 0" : isRange ? 0 : 6,
                        position:"relative",
                      }}>
                        {c.d}
                        {isHoliday && !isRange && <span style={{position:"absolute", bottom: 2, left:"50%", transform:"translateX(-50%)", width: 4, height: 4, borderRadius: 99, background: DB.absent}}/>}
                      </button>
                    );
                  })}
                </div>
                <div style={{display:"flex", gap: 12, fontSize: 10, color: DB.muted, marginTop: 10}}>
                  <span style={{display:"inline-flex", alignItems:"center", gap: 4}}><span style={{width: 8, height: 8, borderRadius: 99, background: lt.color}}/> Selected</span>
                  <span style={{display:"inline-flex", alignItems:"center", gap: 4}}><span style={{width: 8, height: 8, borderRadius: 99, background: DB.absent}}/> Holiday</span>
                  <span style={{display:"inline-flex", alignItems:"center", gap: 4}}><span style={{width: 8, height: 8, borderRadius: 99, background: DB.weekoff}}/> Weekend</span>
                </div>
              </div>

              {/* Range summary */}
              <div style={{display:"flex", flexDirection:"column", gap: 12}}>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8}}>
                  <div style={{padding: 12, background: "var(--color-canvas-soft, #FCFAF5)", borderRadius: 8, border: "1px solid "+DB.borderSoft}}>
                    <div style={{fontSize: 10, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em", fontWeight: 700}}>From</div>
                    <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 4}}>{from} May</div>
                    <div style={{fontSize: 11, color: DB.muted, marginTop: 2}}>Wednesday</div>
                  </div>
                  <div style={{padding: 12, background: "var(--color-canvas-soft, #FCFAF5)", borderRadius: 8, border: "1px solid "+DB.borderSoft}}>
                    <div style={{fontSize: 10, color: DB.muted, textTransform:"uppercase", letterSpacing:".06em", fontWeight: 700}}>To</div>
                    <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 4}}>{to} May</div>
                    <div style={{fontSize: 11, color: DB.muted, marginTop: 2}}>Friday</div>
                  </div>
                </div>

                {/* Half day toggle */}
                <div style={{padding: 12, border:"1px solid "+DB.borderSoft, borderRadius: 8, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize: 12, fontWeight: 700, color: DB.ink}}>ลาครึ่งวัน · Half-day</div>
                    <div style={{fontSize: 11, color: DB.muted, marginTop: 2}}>เฉพาะวันเดียว เลือกช่วงเช้า/บ่าย</div>
                  </div>
                  <button onClick={() => setHalfDay(!halfDay)} style={{
                    width: 38, height: 22, borderRadius: 99, border: 0, padding: 2,
                    background: halfDay ? lt.color : "#E5E7EB", cursor:"pointer", display:"flex", alignItems:"center",
                  }}>
                    <div style={{width: 18, height: 18, borderRadius:99, background:"#fff", transform: halfDay ? "translateX(16px)" : "translateX(0)", transition:"transform .15s"}}/>
                  </button>
                </div>

                {halfDay && (
                  <div style={{display:"flex", gap: 6}}>
                    {["เช้า · 09–13", "บ่าย · 13–18"].map((s, i) => (
                      <button key={i} style={{
                        flex: 1, padding:"10px 8px", border: i === 0 ? `1.5px solid ${lt.color}` : `1px solid ${DB.border}`,
                        background: i === 0 ? lt.soft : "#fff", borderRadius: 7, cursor:"pointer", fontFamily:"inherit",
                        color: i === 0 ? lt.color : DB.inkSoft, fontSize: 12, fontWeight: 600,
                      }}>{s}</button>
                    ))}
                  </div>
                )}

                {/* Total chip */}
                <div style={{padding: 14, background: lt.soft, borderRadius: 8, border: `1px solid ${lt.color}33`}}>
                  <div style={{fontSize: 10, color: lt.color, textTransform:"uppercase", letterSpacing:".06em", fontWeight: 700}}>รวมที่จะลา</div>
                  <div style={{display:"flex", alignItems:"baseline", gap: 6, marginTop: 4}}>
                    <span style={{fontFamily:"var(--font-display)", fontSize: 28, fontWeight: 800, letterSpacing:"-0.03em", color: lt.color}}>{totalDays}</span>
                    <span style={{fontSize: 13, color: DB.inkSoft, fontWeight: 600}}>วันทำการ</span>
                  </div>
                  <div style={{fontSize: 11, color: DB.muted, marginTop: 4}}>
                    คงเหลือหลังลา: <b style={{color: willBal < 0 ? DB.absent : DB.ink}}>{willBal} วัน</b>
                    {willBal < 0 && <span style={{color: DB.absent}}> · เกินสิทธิ</span>}
                  </div>
                </div>
              </div>
            </div>
          </window.DbCard>

          {/* Step 3: Reason + Attach */}
          <window.DbCard pad={0}>
            <div style={{padding:"14px 18px", borderBottom:"1px solid "+DB.borderSoft, display:"flex", alignItems:"center", gap: 10}}>
              <span style={{width: 22, height: 22, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 800}}>3</span>
              <h3 style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, margin: 0}}>รายละเอียด</h3>
            </div>
            <div style={{padding: 16, display:"flex", flexDirection:"column", gap: 14}}>

              {/* Reason */}
              <div>
                <label style={{fontSize: 12, fontWeight: 700, color: DB.inkSoft, marginBottom: 6, display:"block"}}>เหตุผลการลา <span style={{color: DB.absent}}>*</span></label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} style={{
                  width:"100%", padding: 12, borderRadius: 8, border:"1px solid "+DB.border,
                  fontFamily:"inherit", fontSize: 13, color: DB.ink, resize:"vertical", boxSizing:"border-box",
                }}/>
                <div style={{fontSize: 10, color: DB.muted, marginTop: 4}}>{reason.length} / 500 ตัวอักษร</div>
              </div>

              {/* Attach */}
              <div>
                <label style={{fontSize: 12, fontWeight: 700, color: DB.inkSoft, marginBottom: 6, display:"block"}}>
                  ไฟล์แนบ {type === "sick" && totalDays > 3 && <span style={{color: DB.absent}}>* ต้องมีใบรับรองแพทย์</span>}
                </label>
                <div style={{display:"flex", gap: 10, flexWrap:"wrap"}}>
                  <div style={{
                    flex: "0 0 auto", padding:"10px 14px", borderRadius: 8, border:`1.5px dashed ${DB.border}`,
                    background:"var(--color-canvas-soft, #FCFAF5)", display:"inline-flex", alignItems:"center", gap: 8, cursor:"pointer", color: DB.inkSoft, fontSize: 12, fontWeight: 600,
                  }}>
                    <I.plus size={14}/> เพิ่มไฟล์
                  </div>
                  {type === "sick" && (
                    <div style={{padding:"8px 12px", borderRadius: 8, border:"1px solid "+DB.borderSoft, background:"#fff", display:"inline-flex", alignItems:"center", gap: 10}}>
                      <div style={{width: 32, height: 32, borderRadius: 6, background: DB.leaveSoft, color: DB.leave, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><I.fileText size={14}/></div>
                      <div>
                        <div style={{fontSize: 12, fontWeight: 600}}>medical-cert-may28.pdf</div>
                        <div style={{fontSize: 10, color: DB.muted}}>248 KB · just now</div>
                      </div>
                      <button style={{background:"none", border:0, color: DB.muted, cursor:"pointer", padding: 4}}><I.x size={14}/></button>
                    </div>
                  )}
                </div>
                <div style={{fontSize: 10, color: DB.muted, marginTop: 6}}>รองรับ PDF, JPG, PNG · สูงสุด 5 MB / ไฟล์</div>
              </div>

              {/* Notify */}
              <div>
                <label style={{fontSize: 12, fontWeight: 700, color: DB.inkSoft, marginBottom: 6, display:"block"}}>แจ้งเตือนเพิ่มเติม (CC)</label>
                <div style={{display:"flex", gap: 6, flexWrap:"wrap", alignItems:"center"}}>
                  {notify.map(n => (
                    <span key={n} style={{padding:"5px 10px 5px 5px", borderRadius: 99, background: DB.brandSoft, color: DB.brand, fontSize: 11, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 6}}>
                      <span style={{width: 18, height: 18, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 9, fontWeight: 700}}>{n[0]}</span>
                      {n}
                      <button onClick={() => setNotify(notify.filter(x => x !== n))} style={{background:"none", border:0, color:"inherit", cursor:"pointer", padding:0, display:"inline-flex"}}><I.x size={10}/></button>
                    </span>
                  ))}
                  <button style={{padding:"5px 10px", borderRadius: 99, border:`1px dashed ${DB.border}`, background:"#fff", color: DB.muted, fontSize: 11, fontWeight: 600, cursor:"pointer", display:"inline-flex", alignItems:"center", gap: 4, fontFamily:"inherit"}}>
                    <I.plus size={11}/> เพิ่ม
                  </button>
                </div>
              </div>

              {/* Contact during leave */}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
                <div>
                  <label style={{fontSize: 12, fontWeight: 700, color: DB.inkSoft, marginBottom: 6, display:"block"}}>เบอร์ติดต่อระหว่างลา</label>
                  <input defaultValue="081-234-5678" style={{
                    width:"100%", padding: "10px 12px", borderRadius: 8, border:"1px solid "+DB.border,
                    fontFamily:"inherit", fontSize: 13, boxSizing:"border-box",
                  }}/>
                </div>
                <div>
                  <label style={{fontSize: 12, fontWeight: 700, color: DB.inkSoft, marginBottom: 6, display:"block"}}>ผู้รับงานแทน</label>
                  <select style={{
                    width:"100%", padding: "10px 12px", borderRadius: 8, border:"1px solid "+DB.border,
                    fontFamily:"inherit", fontSize: 13, boxSizing:"border-box", background:"#fff",
                  }}>
                    <option>Teerapat Mongkol · Sr Cashier</option>
                    <option>Amphorn Phothong · Sales Asst</option>
                  </select>
                </div>
              </div>
            </div>
          </window.DbCard>

          {/* Submit bar */}
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"#fff", border:"1px solid "+DB.border, borderRadius: 10, position:"sticky", bottom: 16}}>
            <div style={{fontSize: 12, color: DB.muted}}>
              <I.shield size={12} style={{display:"inline", verticalAlign:"middle", marginRight: 4}}/>
              บันทึกอัตโนมัติ · 14:33
            </div>
            <div style={{display:"flex", gap: 8}}>
              <window.DbBtn>ยกเลิก</window.DbBtn>
              <window.DbBtn>Save as Draft</window.DbBtn>
              <window.DbBtn primary><I.check size={13}/> ส่งคำขอลา ({totalDays} วัน)</window.DbBtn>
            </div>
          </div>
        </div>

        {/* ============ RIGHT: PREVIEW + BALANCE + RECENT ============ */}
        <div style={{display:"flex", flexDirection:"column", gap: 16, position:"sticky", top: 16}}>

          {/* Approval chain preview */}
          <window.DbCard>
            <window.DbSectionHead title="เส้นทางอนุมัติ"/>
            <div style={{display:"flex", flexDirection:"column", gap: 0, position:"relative"}}>
              {[
                { who:"คุณ · Marisa Sa-nguansak", role:"พนักงาน · ส่งคำขอ",   st:"ส่งคำขอ",     done: true, c: DB.present, ic:"user" },
                { who:"Aditya Chuenban",          role:"Line Manager · L2",     st:"รออนุมัติ",    done: false, c: DB.brand,   ic:"user", current: true },
                { who:"Sunisa Worapong",          role:"HR Admin · ตรวจสิทธิ", st:"คิวถัดไป",     done: false, c: DB.faint,   ic:"shield" },
                { who:"ระบบ · Auto-update",       role:"Time module + Payroll", st:"อัปเดตยอดลา", done: false, c: DB.faint,   ic:"cog" },
              ].map((s, i, arr) => {
                const Glyph = I[s.ic];
                return (
                  <div key={i} style={{display:"flex", gap: 12, position:"relative", paddingBottom: i < arr.length - 1 ? 14 : 0}}>
                    {/* Line */}
                    {i < arr.length - 1 && (
                      <div style={{position:"absolute", left: 15, top: 30, width: 2, bottom: 0, background: s.done ? DB.present : DB.borderSoft}}/>
                    )}
                    {/* Dot */}
                    <div style={{width: 32, height: 32, borderRadius: 99, background: s.done ? s.c : s.current ? "#fff" : "var(--color-canvas, #F6F1E8)", border: s.current ? `2px solid ${s.c}` : "0", color: s.done ? "#fff" : s.c, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0, zIndex: 1, position:"relative"}}>
                      {s.done ? <I.check size={15}/> : <Glyph size={14}/>}
                      {s.current && (
                        <span style={{position:"absolute", inset:-4, borderRadius:99, border:`2px solid ${s.c}33`, animation:"pulse 2s infinite"}}/>
                      )}
                    </div>
                    <div style={{flex: 1, paddingTop: 2}}>
                      <div style={{fontSize: 12, fontWeight: 700}}>{s.who}</div>
                      <div style={{fontSize: 11, color: DB.muted, marginTop: 1}}>{s.role}</div>
                      <span style={{display:"inline-block", marginTop: 4, padding:"2px 8px", borderRadius: 4, background: s.done ? DB.presentSoft : s.current ? DB.brandSoft : "var(--color-canvas, #F6F1E8)", color: s.done ? DB.present : s.current ? DB.brand : DB.muted, fontSize: 10, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>{s.st}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop: 14, padding: 10, background: "var(--color-canvas-soft, #FCFAF5)", borderRadius: 7, fontSize: 11, color: DB.muted, display:"flex", gap: 8}}>
              <I.bell size={12} style={{flexShrink: 0, marginTop: 1}}/>
              <span>โดยปกติ Aditya ตอบภายใน <b style={{color: DB.inkSoft}}>4 ชม.</b> · SLA สูงสุด 24 ชม.</span>
            </div>
          </window.DbCard>

          {/* Balance after this leave */}
          <window.DbCard>
            <window.DbSectionHead title={`${lt.label.split(" (")[0]} · Balance`}/>
            <div style={{display:"flex", gap: 18, alignItems:"center"}}>
              <window.DbDonut
                size={120} thick={16}
                segments={[
                  { value: lt.used, color: lt.color },
                  { value: totalDays, color: lt.color + "55" },
                  { value: Math.max(0, willBal), color: "var(--color-canvas, #F6F1E8)" },
                ]}
                centerLabel={String(Math.max(0, willBal))}
                centerSub="คงเหลือ"
              />
              <div style={{flex: 1, fontSize: 12}}>
                {[
                  ["ใช้ไปแล้ว",     lt.used,      lt.color],
                  ["คำขอนี้",       totalDays,    lt.color + "AA"],
                  ["คงเหลือหลังลา", Math.max(0, willBal), DB.ink],
                  ["สิทธิ์ทั้งหมด", lt.total,      DB.muted],
                ].map(([l, v, c]) => (
                  <div key={l} style={{display:"flex", padding:"4px 0", borderBottom:"1px solid "+DB.borderSoft, alignItems:"center"}}>
                    <span style={{width: 8, height: 8, borderRadius: 99, background: c, marginRight: 8}}/>
                    <span style={{flex: 1, color: DB.inkSoft}}>{l}</span>
                    <span style={{fontWeight: 700, fontVariantNumeric:"tabular-nums"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </window.DbCard>

          {/* Team on leave during these dates */}
          <window.DbCard>
            <window.DbSectionHead title="ทีมที่ลาตรงกัน · 28–30 May"/>
            {[
              { n:"Nipaporn Saensook", who:"Cashier · L1",    d:"28–30 May", t:"Earned",  c: DB.brand },
              { n:"Preecha Worapong",  who:"Floor Staff · L1", d:"29 May",    t:"Casual",  c: DB.leave },
            ].map((p, i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap: 10, padding:"8px 0", borderTop: i > 0 ? "1px solid "+DB.borderSoft : 0}}>
                <div style={{width: 32, height: 32, borderRadius: 99, background: DB.brand, color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 700}}>{p.n.slice(0,2)}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 12, fontWeight: 600}}>{p.n}</div>
                  <div style={{fontSize: 10, color: DB.muted}}>{p.who} · {p.d}</div>
                </div>
                <span style={{padding:"2px 8px", borderRadius: 4, background: p.c + "22", color: p.c, fontSize: 10, fontWeight: 700}}>{p.t}</span>
              </div>
            ))}
            <div style={{marginTop: 12, padding: 10, background: DB.leaveSoft, borderRadius: 7, fontSize: 11, color: DB.leave, display:"flex", gap: 8, alignItems:"flex-start"}}>
              <I.warn size={13} style={{flexShrink: 0, marginTop: 1}}/>
              <span><b>หมายเหตุ:</b> ทีมเหลือ 11/14 คน วันที่ 28–30 · ผ่านเกณฑ์ขั้นต่ำ 70%</span>
            </div>
          </window.DbCard>

          {/* Recent leaves */}
          <window.DbCard pad={0}>
            <div style={{padding:"14px 18px", borderBottom:"1px solid "+DB.borderSoft, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <h3 style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, margin: 0}}>คำขอย้อนหลัง</h3>
              <button style={{background:"none", border:0, color: DB.brand, fontSize: 11, fontWeight: 600, cursor:"pointer"}}>View all →</button>
            </div>
            {[
              { d:"22 May 25",    t:"Earned",  days: 1, st:"Approved",  c: DB.present },
              { d:"08 May 25",    t:"Sick",    days: 1, st:"Approved",  c: DB.present },
              { d:"02 May 25",    t:"Casual",  days: 0.5, st:"Approved", c: DB.present },
              { d:"15 Apr 25",    t:"Casual",  days: 1, st:"Rejected",  c: DB.absent },
            ].map((r, i) => (
              <div key={i} style={{padding:"10px 18px", borderTop: "1px solid "+DB.borderSoft, display:"flex", alignItems:"center", gap: 10}}>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 12, fontWeight: 600}}>{r.t} · {r.days} วัน</div>
                  <div style={{fontSize: 10, color: DB.muted}}>{r.d}</div>
                </div>
                <span style={{padding:"2px 8px", borderRadius: 4, background: r.c + "22", color: r.c, fontSize: 10, fontWeight: 700, textTransform:"uppercase", letterSpacing:".04em"}}>{r.st}</span>
              </div>
            ))}
          </window.DbCard>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }
      `}</style>
    </window.DbPage>
  );
}
window.TM_Employee_ApplyLeave = TM_Employee_ApplyLeave;
