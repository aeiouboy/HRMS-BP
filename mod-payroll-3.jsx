// ============= MODULE 4: PAYROLL MANAGEMENT (HRIS + SPD) =============

// 4D · HRIS — สูตรคำนวณและคอมโพเนนต์เงินเดือน
function PR_Hris() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Payroll · มุม HRIS"
        title="สูตรคำนวณและคอมโพเนนต์เงินเดือน"
        subtitle="กำหนดรายการรายได้ การหัก และสูตรคำนวณภาษี · ใช้ในระบบ Payroll ทั้งบริษัท"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.copy size={14}/> Sandbox ทดสอบ</button>
          <button className="humi-button humi-button--primary"><I.save size={14}/> เผยแพร่ (4 รายการ)</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"260px 1fr", gap: 20}}>
        <aside style={{alignSelf:"start"}}>
          {[
            { l:"รายได้ (Earnings)",   c: 12, active: true },
            { l:"การหัก (Deductions)", c:  8 },
            { l:"การจ่ายอื่น",          c:  4 },
            { l:"สูตรภาษี",            c:  2 },
            { l:"กองทุน · ประกันสังคม", c:  3 },
            { l:"การปัดเศษ · เพดาน",   c:  6 },
          ].map((g, i) => (
            <div key={i} className="humi-row" style={{padding:"12px 14px", borderRadius: 10, background: g.active ? "var(--color-accent-soft)" : "transparent", marginBottom: 4, cursor:"pointer"}}>
              <div style={{flex: 1, fontSize: 13, fontWeight: 600, color: g.active ? "var(--color-ink)" : "var(--color-ink-soft)"}}>{g.l}</div>
              <span style={{fontSize: 11, color: g.active ? "var(--color-accent)" : "var(--color-ink-muted)", fontWeight: 700}}>{g.c}</span>
            </div>
          ))}
          <hr className="humi-divider"/>
          <button className="humi-button humi-button--ghost" style={{width:"100%"}}><I.plus size={13}/> เพิ่มหมวด</button>
        </aside>

        <div>
          <div className="humi-card" style={{marginBottom: 16}}>
            <div className="humi-row" style={{alignItems:"flex-start"}}>
              <div>
                <div className="humi-eyebrow">/ คอมโพเนนต์ / รายได้</div>
                <h3 style={{marginTop: 6, fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600}}>Earnings · รายการรายได้</h3>
                <div className="humi-section-sub">12 คอมโพเนนต์ · 2 กำลังแก้ไข · เผยแพร่ล่าสุด 5 พ.ค. 68</div>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost"><I.plus size={13}/> เพิ่มคอมโพเนนต์</button>
            </div>
          </div>

          <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
            <div style={{display:"grid", gridTemplateColumns:"120px 1.5fr 1.4fr 1fr 1fr 60px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
              <div>Code</div>
              <div>ชื่อ</div>
              <div>สูตร</div>
              <div>คิดภาษี</div>
              <div>คิด SS</div>
              <div></div>
            </div>
            {[
              { c:"BASE",    n:"เงินเดือนพื้นฐาน",       f:"BASE_SALARY",                 tax: true, ss: true,  st:"" },
              { c:"COL",     n:"ค่าครองชีพ",             f:"FIXED_AMOUNT (฿2,000)",      tax: true, ss: true,  st:"" },
              { c:"OT15",    n:"OT × 1.5",               f:"OT_HOURS × (BASE/240) × 1.5", tax: true, ss: false, st:"" },
              { c:"OT30",    n:"OT × 3.0 (วันหยุด)",     f:"OT_HOURS × (BASE/240) × 3",   tax: true, ss: false, st:"" },
              { c:"ATT",     n:"เบี้ยขยัน",              f:"IF(LATE=0,500,0)",            tax: true, ss: true,  st:"" },
              { c:"BONUS_Q", n:"โบนัสรายไตรมาส",         f:"PERFORMANCE_SCORE × BASE × 0.05", tax: true, ss: false, st:"edit" },
              { c:"DIL",     n:"เบี้ยขยันสาขา",          f:"TABLE_LOOKUP(BRANCH_TIER)",  tax: true, ss: false, st:"new" },
              { c:"COM",     n:"คอมมิชชั่นยอดขาย",        f:"SALES × 1.2%",                tax: true, ss: false, st:"" },
            ].map(r => (
              <div key={r.c} style={{display:"grid", gridTemplateColumns:"120px 1.5fr 1.4fr 1fr 1fr 60px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
                <div style={{fontFamily:"ui-monospace, monospace", fontSize: 12, fontWeight: 600, color:"var(--color-accent)"}}>{r.c}</div>
                <div style={{fontSize: 14, fontWeight: 600}}>{r.n}</div>
                <div style={{fontFamily:"ui-monospace, monospace", fontSize: 11, color:"var(--color-ink-soft)", background:"var(--color-canvas-soft)", padding:"4px 8px", borderRadius: 5, display:"inline-block", justifySelf:"start"}}>{r.f}</div>
                <div style={{fontSize: 12, color: r.tax ? "var(--color-accent)" : "var(--color-ink-faint)"}}>{r.tax ? "✓ ใช่" : "—"}</div>
                <div style={{fontSize: 12, color: r.ss ? "var(--color-accent)" : "var(--color-ink-faint)"}}>{r.ss ? "✓ ใช่" : "—"}</div>
                <div style={{textAlign:"right"}}>
                  {r.st === "edit" && <span className="humi-tag humi-tag--butter" style={{fontSize:10}}>แก้</span>}
                  {r.st === "new" && <span className="humi-tag humi-tag--accent" style={{fontSize:10}}>ใหม่</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Tax formula card */}
          <div className="humi-card" style={{marginTop: 20}}>
            <div className="humi-row" style={{marginBottom: 14}}>
              <div>
                <div className="humi-eyebrow">/ คอมโพเนนต์ / สูตรภาษี</div>
                <h4 style={{fontFamily:"var(--font-display)", fontSize: 17, marginTop: 4, fontWeight: 600}}>ภงด.1 หัก ณ ที่จ่าย · ปี 2568</h4>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost"><I.copy size={13}/> ทดสอบ</button>
            </div>

            {/* Tax brackets */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(8, 1fr)", gap: 4, marginBottom: 12}}>
              {[
                ["0–150K", "ยกเว้น", "#E5E5E5"],
                ["150–300K", "5%",   "rgba(31,168,160,0.18)"],
                ["300–500K", "10%",  "rgba(31,168,160,0.32)"],
                ["500–750K", "15%",  "rgba(31,168,160,0.46)"],
                ["750K–1M",  "20%",  "rgba(31,168,160,0.60)"],
                ["1–2M",     "25%",  "rgba(31,168,160,0.74)"],
                ["2–5M",     "30%",  "rgba(31,168,160,0.88)"],
                ["5M+",      "35%",  "var(--color-accent)"],
              ].map(([r, p, c], i) => (
                <div key={i} style={{padding: 10, background: c, borderRadius: 6, textAlign:"center"}}>
                  <div style={{fontSize: 10, color: i > 4 ? "#fff" : "var(--color-ink-soft)", fontWeight: 500}}>{r}</div>
                  <div style={{fontFamily:"var(--font-display)", fontWeight: 700, fontSize: 14, marginTop: 2, color: i > 4 ? "#fff" : "var(--color-ink)"}}>{p}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 12, marginTop: 16}}>
              <div style={{padding: 12, background:"var(--color-canvas-soft)", borderRadius: 8}}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>ลดหย่อนส่วนตัว</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4}}>฿60,000</div>
              </div>
              <div style={{padding: 12, background:"var(--color-canvas-soft)", borderRadius: 8}}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>หักค่าใช้จ่าย</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4}}>50% / สูงสุด ฿100K</div>
              </div>
              <div style={{padding: 12, background:"var(--color-canvas-soft)", borderRadius: 8}}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>ประกันสังคม</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4}}>5% · สูงสุด ฿750/ด.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.PR_Hris = PR_Hris;

// 4E · SPD — กระทบยอด + แก้รายการเงินเดือน
function PR_Spd() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Payroll · มุม SPD"
        title="กระทบยอดและแก้รายการเงินเดือน"
        subtitle="รอบ พ.ค. 68 · 28 เคสรอตรวจ · 12 ข้อโต้แย้งจากพนักงาน · 6 รายการต้องคำนวณใหม่"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> Export GL</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> รับเคสถัดไป</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="คิวรอตรวจ" value="28" sub="ของฉัน 8" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="ข้อโต้แย้ง" value="12" sub="จากพนักงาน · SLA 3 วัน" accent="var(--color-danger)" icon="msgSquare"/>
        <window.StatCard label="ต้องคำนวณใหม่" value="6" sub="แก้สูตร · ย้อนหลัง" icon="refresh"/>
        <window.StatCard label="GL ยังไม่บาลานซ์" value="฿2,840" sub="ต้องค้นหา" accent="var(--color-danger)" icon="alert"/>
      </div>

      {/* Main: Reconciliation list + selected case */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1.3fr", gap: 20}}>
        <div className="humi-card" style={{padding: 0, overflow:"hidden", alignSelf:"start"}}>
          <div style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <window.SegTabs active="dispute" tabs={[
              {id:"dispute", label:"ข้อโต้แย้ง", count: 12},
              {id:"recalc",  label:"คำนวณใหม่", count: 6},
              {id:"gl",      label:"กระทบยอด", count: 10},
            ]}/>
          </div>

          {[
            { c:"PR-DSP-3201", n:"นิภาพร แสนสุข",   id:"E-58102", t:"OT 2 ชม. หายไป",        d:"24 พ.ค.",  sla:"1 วัน",   active: true,  c2: "danger" },
            { c:"PR-DSP-3198", n:"พีรพล ตั้งศิริ",   id:"E-66012", t:"โบนัส Q1 ไม่ตรง",       d:"22 พ.ค.",  sla:"2 วัน",   c2: "warning" },
            { c:"PR-DSP-3192", n:"กาญจนา ใจดี",     id:"E-71204", t:"หักภาษีเกิน",             d:"21 พ.ค.",  sla:"เกิน 1 ว.",c2: "danger" },
            { c:"PR-DSP-3187", n:"วรพล จันทรา",     id:"E-44120", t:"เงินสะสมกองทุนผิด",        d:"19 พ.ค.",  sla:"3 วัน",   c2: "warning" },
            { c:"PR-DSP-3184", n:"สุนีย์ ธรรมรักษ์", id:"E-52201", t:"ลายเซ็นเปลี่ยนบัญชี",     d:"18 พ.ค.",  sla:"3 วัน",   c2: "ink" },
          ].map(q => (
            <div key={q.c} style={{padding: 14, borderBottom:"1px solid var(--color-hairline-soft)", background: q.active ? "var(--color-accent-soft)" : "transparent", cursor:"pointer"}}>
              <div className="humi-row" style={{marginBottom: 6}}>
                <span style={{fontFamily:"ui-monospace, monospace", fontSize: 10, color:"var(--color-ink-muted)", fontWeight: 600}}>{q.c}</span>
                {q.active && <span className="humi-tag humi-tag--accent" style={{fontSize: 10, padding:"1px 6px", marginLeft: 6}}>กำลังทำ</span>}
                <span className="humi-spacer"/>
                <span className={"humi-tag humi-tag--" + (q.c2 === "danger" ? "coral" : q.c2 === "warning" ? "butter" : "cream")} style={{fontSize: 10}}>SLA {q.sla}</span>
              </div>
              <div style={{fontSize: 14, fontWeight: 600}}>{q.t}</div>
              <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 3}}>{q.n} · {q.id} · {q.d}</div>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <div className="humi-row">
              <div>
                <div className="humi-eyebrow">เคสที่เปิด · PR-DSP-3201</div>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 600, marginTop: 4}}>OT 2 ชั่วโมงหายไป · นิภาพร แสนสุข</h3>
              </div>
              <span className="humi-spacer"/>
              <span className="humi-tag humi-tag--coral"><I.clock size={11}/> SLA 1 วัน</span>
            </div>
            <div className="humi-row" style={{gap: 12, fontSize: 13, color:"var(--color-ink-soft)", marginTop: 8}}>
              <span><b>E-58102</b> · Cashier · Chidlom</span>
              <span style={{width: 1, height: 12, background:"var(--color-hairline)"}}/>
              <span>เปิดเคสโดย: พนักงาน · 24 พ.ค.</span>
            </div>
          </div>

          <div style={{padding: 18}}>
            {/* Employee complaint */}
            <div style={{padding: 14, background:"var(--color-warning-soft)", borderRadius: 12, marginBottom: 18, borderLeft:"4px solid var(--color-warning)"}}>
              <div className="humi-row" style={{gap: 8, marginBottom: 6}}>
                <span className="humi-avatar humi-avatar--ink" style={{width: 26, height: 26, fontSize: 10}}>นภ</span>
                <span style={{fontSize: 12, fontWeight: 600}}>คำร้องจากพนักงาน</span>
                <span style={{fontSize: 11, color:"var(--color-ink-muted)"}}>· 24 พ.ค. 14:30</span>
              </div>
              <div style={{fontSize: 13, lineHeight: 1.6}}>
                สลิป เม.ย. ของฉัน OT มี <b>4 ชม.</b> แต่จริงๆ ฉันทำ <b>6 ชม.</b> · มี 2 ชม. ตอน 27 เม.ย. ที่ยังไม่เห็นในสลิป รบกวนตรวจสอบให้ด้วยค่ะ
              </div>
            </div>

            {/* Reconciliation */}
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginBottom: 10, fontWeight: 600}}>กระทบยอด OT · เม.ย. 2568</h4>
            <div style={{padding: 0, border:"1px solid var(--color-hairline-soft)", borderRadius: 10, overflow:"hidden"}}>
              <div style={{display:"grid", gridTemplateColumns:"100px 1fr 80px 80px 100px", padding:"10px 14px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 10, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
                <div>วันที่</div>
                <div>เหตุการณ์</div>
                <div style={{textAlign:"right"}}>TM</div>
                <div style={{textAlign:"right"}}>Payroll</div>
                <div style={{textAlign:"right"}}>ส่วนต่าง</div>
              </div>
              {[
                ["8 เม.ย.",  "OT 1 ชม. · อนุมัติ", 1, 1, 0],
                ["15 เม.ย.", "OT 1 ชม. · อนุมัติ", 1, 1, 0],
                ["27 เม.ย.", "OT 2 ชม. · อนุมัติย้อนหลัง 28 เม.ย.", 2, 0, -2],
                ["29 เม.ย.", "OT 2 ชม. · อนุมัติ", 2, 2, 0],
              ].map((r, i) => (
                <div key={i} style={{display:"grid", gridTemplateColumns:"100px 1fr 80px 80px 100px", padding:"10px 14px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center", fontSize: 13, background: r[4] !== 0 ? "var(--color-warning-soft)" : "transparent"}}>
                  <div style={{fontWeight: 600}}>{r[0]}</div>
                  <div style={{color:"var(--color-ink-soft)"}}>{r[1]}</div>
                  <div style={{textAlign:"right", fontFamily:"ui-monospace, monospace"}}>{r[2]} ชม.</div>
                  <div style={{textAlign:"right", fontFamily:"ui-monospace, monospace"}}>{r[3]} ชม.</div>
                  <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontWeight: 700, color: r[4] !== 0 ? "var(--color-warning)" : "var(--color-ink-faint)"}}>{r[4]} ชม.</div>
                </div>
              ))}
              <div className="humi-row" style={{padding:"10px 14px", background:"var(--color-canvas-soft)", fontSize: 13}}>
                <span style={{fontWeight: 600}}>รวม</span>
                <span className="humi-spacer"/>
                <span style={{fontFamily:"ui-monospace, monospace"}}>6 ชม.</span>
                <span style={{fontFamily:"ui-monospace, monospace", marginLeft: 24}}>4 ชม.</span>
                <span style={{fontFamily:"var(--font-display)", fontWeight: 700, color:"var(--color-warning)", marginLeft: 24, minWidth: 80, textAlign:"right"}}>–2 ชม.</span>
              </div>
            </div>

            {/* Cause analysis */}
            <div style={{marginTop: 16, padding: 12, background:"var(--color-canvas-soft)", borderRadius: 10, fontSize: 13, lineHeight: 1.55}}>
              <b>วิเคราะห์สาเหตุ:</b> OT 2 ชม. วันที่ 27 เม.ย. ถูกอนุมัติย้อนหลังโดย SPD เมื่อ 28 เม.ย. <b>หลังจาก</b> รอบ Payroll เม.ย. ปิด (25 เม.ย.) · ระบบจึงไม่ได้รวมเข้างวด
            </div>

            {/* Resolution */}
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginTop: 18, marginBottom: 10, fontWeight: 600}}>การแก้ไข</h4>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
              <label style={{padding: 14, border:"2px solid var(--color-accent)", borderRadius: 10, background:"var(--color-accent-soft)", cursor:"pointer"}}>
                <div className="humi-row" style={{gap: 8, marginBottom: 4}}>
                  <input type="radio" name="fix" defaultChecked style={{accentColor:"var(--color-accent)"}}/>
                  <b style={{fontSize: 13}}>ปรับเพิ่มในงวด พ.ค.</b>
                </div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginLeft: 24}}>+ ฿450 (OT × 1.5 × 2 ชม.) ในสลิป พ.ค.</div>
              </label>
              <label style={{padding: 14, border:"1px solid var(--color-hairline)", borderRadius: 10, background:"var(--color-surface)", cursor:"pointer"}}>
                <div className="humi-row" style={{gap: 8, marginBottom: 4}}>
                  <input type="radio" name="fix" style={{accentColor:"var(--color-accent)"}}/>
                  <b style={{fontSize: 13}}>ออกสลิปเสริมงวด เม.ย.</b>
                </div>
                <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginLeft: 24}}>ต้องอนุมัติ Admin · ใช้เวลา 3–5 วัน</div>
              </label>
            </div>
          </div>

          <div style={{padding: 14, background:"var(--color-canvas-soft)", borderTop:"1px solid var(--color-hairline-soft)", display:"flex", gap: 8}}>
            <button className="humi-button humi-button--ghost"><I.msgSquare size={14}/> ตอบพนักงาน</button>
            <span className="humi-spacer"/>
            <button className="humi-button humi-button--ghost">บันทึกร่าง</button>
            <button className="humi-button humi-button--primary"><I.check size={14}/> ยืนยัน · ส่ง Admin อนุมัติ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.PR_Spd = PR_Spd;
