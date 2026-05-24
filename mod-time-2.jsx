// ============= MODULE 3: TIME MANAGEMENT (Admin + HRIS + SPD) =============

// 3C · ADMIN — Dashboard เข้างานทั้งบริษัท
function TM_Admin() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Time Management · มุม HR Admin"
        title="ภาพรวมเวลาทำงานทั้งบริษัท"
        subtitle="2,847 พนักงาน · 38 สาขา · เวลาประมวลผลล่าสุด 14:30"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.refresh size={14}/> Sync นาฬิกาเครื่อง</button>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> Export Payroll</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> ปิดงวด พ.ค.</button>
        </>}/>

      {/* KPI row */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="ลงเวลาวันนี้" value="2,418" sub="85% ของกำลังพล" accent="var(--color-accent)" icon="check"/>
        <window.StatCard label="ลา/ขาด" value="237" sub="ป่วย 142 · กิจ 95" icon="beach"/>
        <window.StatCard label="มาสาย" value="58" sub="2.0% · ลด 0.4 จากเดือนก่อน" accent="var(--color-warning)" icon="warn"/>
        <window.StatCard label="OT เดือนนี้" value="14,820 ชม." sub="฿1.82M งบ" icon="clock"/>
        <window.StatCard label="เคสที่ต้องดู" value="62" sub="แก้เวลา 38 · ขาดเอกสาร 24" accent="var(--color-danger)" icon="inbox"/>
      </div>

      {/* Heat map by branch + Today's anomalies */}
      <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr", gap: 20, marginBottom: 20}}>
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 14}}>
            <div>
              <div className="humi-eyebrow">การเข้างานตามชั่วโมง · วันนี้</div>
              <h3 className="humi-section-title" style={{marginTop: 4}}>เปรียบเทียบสาขา</h3>
            </div>
            <span className="humi-spacer"/>
            <window.SegTabs active="att" tabs={[{id:"att", label:"การเข้างาน"},{id:"late", label:"มาสาย"},{id:"ot", label:"OT"}]}/>
          </div>

          {/* Heatmap grid */}
          <div style={{display:"grid", gridTemplateColumns:"100px repeat(12, 1fr)", gap: 3, marginTop: 8}}>
            <div></div>
            {[8,9,10,11,12,13,14,15,16,17,18,19].map(h => (
              <div key={h} style={{textAlign:"center", fontSize: 10, color:"var(--color-ink-muted)", fontWeight: 600}}>{h}</div>
            ))}
            {[
              { n:"CTW",      v:[10,98,99,99,90,99,99,99,99,99,94,82] },
              { n:"Chidlom",  v:[ 8,95,98,99,88,98,99,99,99,98,90,72] },
              { n:"Embassy",  v:[ 5,90,96,98,85,96,98,98,98,96,84,60] },
              { n:"Lardprao", v:[12,92,97,98,86,97,98,98,98,97,87,68] },
              { n:"Bangna",   v:[ 8,86,94,96,82,94,96,96,96,94,80,58] },
              { n:"Pinklao",  v:[ 6,82,92,95,80,92,95,95,95,92,76,54] },
            ].map((row, i) => (
              <React.Fragment key={i}>
                <div style={{fontSize: 12, color:"var(--color-ink-soft)", padding:"6px 0", fontWeight: 500}}>{row.n}</div>
                {row.v.map((v, j) => (
                  <div key={j} style={{
                    aspectRatio: "1",
                    borderRadius: 4,
                    background: v < 30 ? "var(--color-hairline-soft)" :
                                v < 60 ? "rgba(31,168,160,0.18)" :
                                v < 80 ? "rgba(31,168,160,0.42)" :
                                v < 95 ? "rgba(31,168,160,0.72)" : "var(--color-accent)",
                    fontSize: 9,
                    color: v >= 80 ? "#fff" : "var(--color-ink-soft)",
                    fontWeight: 600,
                    display:"inline-flex",
                    alignItems:"center",
                    justifyContent:"center",
                  }}>{v}%</div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="humi-row" style={{gap: 12, marginTop: 16, fontSize: 11, color:"var(--color-ink-muted)"}}>
            <span>การเข้างาน:</span>
            <span className="humi-row"><span style={{width: 14, height: 14, background:"var(--color-hairline-soft)", borderRadius: 3}}/> &lt;30%</span>
            <span className="humi-row"><span style={{width: 14, height: 14, background:"rgba(31,168,160,0.42)", borderRadius: 3}}/> 60%</span>
            <span className="humi-row"><span style={{width: 14, height: 14, background:"var(--color-accent)", borderRadius: 3}}/> 95%+</span>
          </div>
        </div>

        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <h3 className="humi-section-title">ความผิดปกติ · วันนี้</h3>
            <div className="humi-section-sub">เรียงตามความเร่งด่วน</div>
          </div>
          {[
            { ic:"warn",  c:"danger",  t:"นาฬิกาเครื่อง CTW Floor 3 ไม่ส่งข้อมูล", s:"38 คนยังไม่บันทึก · ตั้งแต่ 09:00", a:"แก้ไข" },
            { ic:"warn",  c:"warning", t:"Embassy · ขาดงาน 8 คน (ปกติ ~3)",         s:"ตรวจกะหรือเหตุการณ์",          a:"ดู" },
            { ic:"clock", c:"butter",  t:"OT เกินงบ Bangna",                          s:"ใช้ไป 108% ของงบรายเดือน",     a:"รีวิว" },
            { ic:"warn",  c:"warning", t:"พนักงาน 12 คนไม่ลงออกงาน เมื่อวาน",     s:"ระบบ Auto-out 22:00",          a:"ตรวจ" },
            { ic:"warn",  c:"danger",  t:"3 คน เข้างาน > 50 ชม./สัปดาห์",            s:"ฝ่าฝืน กม.แรงงาน",              a:"แจ้ง" },
          ].map((a, i) => {
            const Glyph = I[a.ic];
            return (
              <div key={i} style={{padding:"14px 16px", borderBottom:"1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"32px 1fr auto", gap: 12, alignItems:"center"}}>
                <div style={{width: 32, height: 32, borderRadius: 8, background:`var(--color-${a.c}-soft)`, color:`var(--color-${a.c})`, display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={14}/></div>
                <div>
                  <div style={{fontSize: 13, fontWeight: 600}}>{a.t}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{a.s}</div>
                </div>
                <button className="humi-button humi-button--ghost" style={{padding:"4px 12px", fontSize: 12, minHeight: 30}}>{a.a}</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-payroll summary */}
      <div className="humi-card">
        <div className="humi-row" style={{marginBottom: 16}}>
          <div>
            <div className="humi-eyebrow">เตรียมส่ง Payroll · งวด พ.ค. 2568</div>
            <h3 className="humi-section-title" style={{marginTop: 4}}>สรุปเวลาทำงาน · พร้อมส่งเข้าระบบจ่ายเงิน</h3>
          </div>
          <span className="humi-spacer"/>
          <span className="humi-tag humi-tag--butter">62 เคสยังไม่ปิด</span>
          <button className="humi-button humi-button--primary" style={{marginLeft: 10}}><I.send size={13}/> ส่งให้ Payroll</button>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"100px 1fr 1fr 1fr 1fr 1fr 1fr 80px", padding:"10px 14px", background:"var(--color-canvas-soft)", borderRadius: 8, fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase", marginBottom: 4}}>
          <div>สาขา</div>
          <div style={{textAlign:"right"}}>คน</div>
          <div style={{textAlign:"right"}}>วันทำงาน</div>
          <div style={{textAlign:"right"}}>OT (ชม.)</div>
          <div style={{textAlign:"right"}}>ลาป่วย</div>
          <div style={{textAlign:"right"}}>ลากิจ/อื่นๆ</div>
          <div style={{textAlign:"right"}}>เคสค้าง</div>
          <div></div>
        </div>
        {[
          ["Central World", 312, 6088, 1842, 84, 62,  6, "ok"],
          ["Chidlom",       287, 5602, 1568,121, 48, 12, "warn"],
          ["Embassy",       198, 3864,  920, 56, 34,  8, "ok"],
          ["Lardprao",      167, 3257,  814, 48, 28, 14, "warn"],
          ["Bangna",        142, 2772,  686, 38, 18,  4, "ok"],
          ["Pinklao",       128, 2496,  584, 32, 14, 18, "warn"],
        ].map((r, i) => (
          <div key={i} style={{display:"grid", gridTemplateColumns:"100px 1fr 1fr 1fr 1fr 1fr 1fr 80px", padding:"12px 14px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center", fontSize: 13}}>
            <div style={{fontWeight: 600}}>{r[0]}</div>
            <div style={{textAlign:"right"}}>{r[1]}</div>
            <div style={{textAlign:"right"}}>{r[2].toLocaleString()}</div>
            <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontWeight: 700, color:"var(--color-warning)"}}>{r[3].toLocaleString()}</div>
            <div style={{textAlign:"right"}}>{r[4]}</div>
            <div style={{textAlign:"right"}}>{r[5]}</div>
            <div style={{textAlign:"right"}}>
              {r[7] === "warn"
                ? <span className="humi-tag humi-tag--butter" style={{fontWeight: 700}}>{r[6]}</span>
                : <span style={{color:"var(--color-accent)"}}>✓ {r[6]}</span>
              }
            </div>
            <div style={{textAlign:"right"}}>
              <I.chevR size={14} style={{color:"var(--color-ink-muted)"}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.TM_Admin = TM_Admin;

// 3D · HRIS — กะและนโยบายเวลา
function TM_Hris() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Time Management · มุม HRIS"
        title="กะและนโยบายเวลาทำงาน"
        subtitle="กำหนดประเภทกะ ตารางเวลา และนโยบายการคิด OT/ลา ที่ใช้ทั่วบริษัท"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.copy size={14}/> Audit log</button>
          <button className="humi-button humi-button--primary"><I.save size={14}/> เผยแพร่</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap: 20, marginBottom: 20}}>
        {/* Shift catalog */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <div className="humi-row">
              <h3 className="humi-section-title">กะมาตรฐาน</h3>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost"><I.plus size={13}/> เพิ่มกะ</button>
            </div>
            <div className="humi-section-sub">8 กะใช้งาน · 2 กะแก้ไข · 1 กะใหม่</div>
          </div>

          {[
            { code:"M-STD",  n:"กะเช้า · มาตรฐาน",     t:"09:00–18:00 · พัก 12:00–13:00", days:"จ–ศ", u:"1,824 คน", st:"" },
            { code:"E-STD",  n:"กะบ่าย · มาตรฐาน",     t:"14:00–22:00 · พัก 18:00–18:30", days:"จ–ส", u:"612 คน",   st:"" },
            { code:"N-STD",  n:"กะดึก",                t:"22:00–06:00 · พัก 02:00–03:00", days:"จ–อา", u:"248 คน",   st:"" },
            { code:"M-WKD",  n:"กะเช้า · เสาร์",       t:"10:00–18:00",                    days:"ส",   u:"612 คน",   st:"edit" },
            { code:"M-HOL",  n:"กะวันหยุดนักขัตฤกษ์",  t:"10:00–19:00 · OT x1.5",          days:"-",   u:"—",        st:"new" },
            { code:"PT-4",   n:"พาร์ทไทม์ 4 ชม.",      t:"ยืดหยุ่น 4 ชม./วัน",             days:"-",   u:"248 คน",   st:"" },
          ].map(s => (
            <div key={s.code} style={{padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"100px 1.8fr 1fr 1fr 80px", gap: 14, alignItems:"center"}}>
              <div style={{fontFamily:"ui-monospace, monospace", fontSize: 12, fontWeight: 600, color:"var(--color-accent)"}}>{s.code}</div>
              <div>
                <div style={{fontSize: 14, fontWeight: 600}}>{s.n}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{s.t}</div>
              </div>
              <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{s.days}</div>
              <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{s.u}</div>
              <div style={{textAlign:"right"}}>
                {s.st === "edit" && <span className="humi-tag humi-tag--butter">แก้</span>}
                {s.st === "new"  && <span className="humi-tag humi-tag--accent">ใหม่</span>}
                {!s.st && <button className="humi-icon-btn" style={{width: 28, height: 28}}><I.edit size={12}/></button>}
              </div>
            </div>
          ))}
        </div>

        {/* OT Rules */}
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 14}}>
            <h3 className="humi-section-title">นโยบาย OT</h3>
            <span className="humi-spacer"/>
            <span className="humi-tag humi-tag--cream">มาตรฐาน กม.แรงงาน</span>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr auto", rowGap: 14, columnGap: 12, alignItems:"center"}}>
            {[
              ["OT วันทำงาน · หลังเลิกกะ", "x 1.5"],
              ["OT วันหยุด · ในกะ",        "x 1.0"],
              ["OT วันหยุด · เกินกะ",      "x 3.0"],
              ["OT วันหยุดนักขัตฤกษ์",     "x 2.0"],
              ["พักเที่ยงขั้นต่ำ",          "60 นาที"],
              ["OT ขั้นต่ำต่อครั้ง",        "30 นาที"],
              ["OT สูงสุดต่อสัปดาห์",      "36 ชม."],
            ].map(([l,v]) => (
              <React.Fragment key={l}>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{l}</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, color:"var(--color-accent)"}}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          <hr className="humi-divider"/>
          <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginBottom: 10, fontWeight: 600}}>นโยบายลา</h4>
          <div style={{display:"grid", gridTemplateColumns:"1fr auto", rowGap: 10, columnGap: 12}}>
            {[
              ["ลาพักร้อน (ปกติ)", "12 วัน/ปี"],
              ["ลาพักร้อน (อายุงาน 5 ปี+)", "15 วัน/ปี"],
              ["ลาป่วย ≤ 3 วัน", "ไม่ต้องใบรับรอง"],
              ["ลาคลอดบุตร",  "98 วัน"],
              ["ลากิจส่วนตัว", "5 วัน/ปี"],
            ].map(([l,v]) => (
              <React.Fragment key={l}>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{l}</div>
                <div style={{fontSize: 13, fontWeight: 600}}>{v}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Visual shift timeline */}
      <div className="humi-card">
        <div className="humi-row" style={{marginBottom: 16}}>
          <h3 className="humi-section-title">ผังกะตลอด 24 ชม.</h3>
          <span className="humi-spacer"/>
          <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>แสดงกะที่ใช้งานเทียบกับเวลา</span>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"120px 1fr", gap: 14, alignItems:"center"}}>
          {/* hour scale */}
          <div></div>
          <div style={{display:"flex", height: 22, borderBottom:"1px dashed var(--color-hairline)", marginBottom: 4}}>
            {[0,2,4,6,8,10,12,14,16,18,20,22].map(h => (
              <div key={h} style={{flex: 1, fontSize: 10, color:"var(--color-ink-muted)", borderLeft:"1px solid var(--color-hairline-soft)", paddingLeft: 4}}>{String(h).padStart(2,"0")}:00</div>
            ))}
          </div>

          {[
            { n:"M-STD",  c:"var(--color-accent)", s: 9,  e: 18, bs:12, be:13 },
            { n:"E-STD",  c:"var(--color-butter)", s:14,  e: 22, bs:18, be:18.5 },
            { n:"N-STD",  c:"var(--color-info)",   s:22,  e: 30, bs:26, be:27 },
            { n:"M-WKD",  c:"var(--color-sage)",   s:10,  e: 18 },
            { n:"PT-4",   c:"var(--color-warning)",s:10,  e: 14 },
          ].map(b => (
            <React.Fragment key={b.n}>
              <div style={{fontFamily:"ui-monospace, monospace", fontSize: 12, fontWeight: 600}}>{b.n}</div>
              <div style={{position:"relative", height: 26, background:"var(--color-canvas-soft)", borderRadius: 6}}>
                <div style={{position:"absolute", top: 4, bottom: 4, left: `${b.s/24*100}%`, width: `${(b.e-b.s)/24*100}%`, background: b.c, borderRadius: 4, color:"#fff", fontSize: 11, fontWeight: 600, display:"flex", alignItems:"center", paddingLeft: 8}}>
                  {String(b.s % 24).padStart(2,"0")}:00 → {String(b.e % 24).padStart(2,"0")}:00
                </div>
                {b.bs && (
                  <div style={{position:"absolute", top: 4, bottom: 4, left: `${b.bs/24*100}%`, width: `${(b.be-b.bs)/24*100}%`, background:"rgba(0,0,0,0.25)", borderRadius: 4}}/>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
window.TM_Hris = TM_Hris;
