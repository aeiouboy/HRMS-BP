// ============= MODULE 3: TIME MANAGEMENT (SPD) =============

// 3E · SPD — แก้เวลา/บันทึกย้อนหลังให้พนักงาน
function TM_Spd() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Time Management · มุม SPD"
        title="แก้ไขเวลาทำงาน · บันทึกย้อนหลัง"
        subtitle="38 คำขอแก้เวลารอตรวจ · 12 ขอจดเวลาย้อนหลัง · 8 ลืมลงออกงาน"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.fileText size={14}/> คู่มือ SOP</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> รับเคสถัดไป</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="คิวรอตรวจ" value="38" sub="ของฉัน 8" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="ลืมลงออก" value="8" sub="auto-out 22:00 · ต้องยืนยัน" icon="logoutOut"/>
        <window.StatCard label="ขอย้อนหลัง" value="12" sub="ต้องเอกสารแนบ" icon="refresh"/>
        <window.StatCard label="ทำเสร็จวันนี้" value="22" sub="เฉลี่ย 4 นาที/เคส" accent="var(--color-accent)" icon="check"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1.3fr", gap: 20}}>
        {/* Queue */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden", alignSelf:"start"}}>
          <div style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <window.SegTabs active="all" tabs={[
              {id:"all",  label:"ทั้งหมด", count: 38},
              {id:"back", label:"ย้อนหลัง", count: 12},
              {id:"miss", label:"ลืมลงออก", count: 8},
              {id:"corr", label:"แก้ผิด",   count: 18},
            ]}/>
          </div>

          {[
            { c:"TX-44219", n:"ปรีชา วรพงษ์",     id:"E-72915", t:"ลืมลงออกงาน",      d:"26 พ.ค. (เมื่อวาน)",  sla:"2 ชม.", urg: true,  ic:"logoutOut" },
            { c:"TX-44215", n:"นภัสรา ธารทอง",   id:"E-67830", t:"ขอจดเวลาย้อนหลัง", d:"24 พ.ค. (3 วันก่อน)", sla:"4 ชม.", urg: false, ic:"refresh" },
            { c:"TX-44210", n:"สมศักดิ์ ไทยใจดี", id:"E-44210", t:"แก้เวลาเข้าผิด",   d:"27 พ.ค. (วันนี้)",     sla:"6 ชม.", urg: false, ic:"edit" },
            { c:"TX-44205", n:"พีรพล ตั้งศิริ",   id:"E-66012", t:"ลืมลงออก + OT",    d:"26 พ.ค.",              sla:"เกิน",  urg: true,  ic:"warn" },
            { c:"TX-44200", n:"กัลยา ภูวดล",      id:"E-61480", t:"เคลมเวลาประชุม",   d:"23 พ.ค.",              sla:"8 ชม.", urg: false, ic:"calendar" },
          ].map(q => {
            const Glyph = I[q.ic];
            const active = q.c === "TX-44219";
            return (
              <div key={q.c} style={{padding: 14, borderBottom:"1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"34px 1fr auto", gap: 12, alignItems:"center", background: active ? "var(--color-accent-soft)" : "transparent", cursor:"pointer"}}>
                <div style={{width: 34, height: 34, borderRadius: 9, background: active ? "var(--color-accent)" : "var(--color-canvas-soft)", color: active ? "#fff" : q.urg ? "var(--color-danger)" : "var(--color-ink-soft)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                  <Glyph size={15}/>
                </div>
                <div style={{minWidth: 0}}>
                  <div className="humi-row" style={{gap: 8}}>
                    <span style={{fontSize: 13, fontWeight: 600}}>{q.t}</span>
                    {active && <span className="humi-tag humi-tag--accent" style={{fontSize: 10, padding:"1px 6px"}}>กำลังทำ</span>}
                  </div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                    {q.n} · {q.id} · {q.d}
                  </div>
                </div>
                <span className={"humi-tag " + (q.urg ? "humi-tag--coral" : "humi-tag--cream")} style={{fontSize: 10, padding:"2px 8px"}}>SLA {q.sla}</span>
              </div>
            );
          })}
        </div>

        {/* Active case detail */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <div className="humi-row" style={{marginBottom: 8}}>
              <div>
                <div className="humi-eyebrow">เคสที่เปิด · TX-44219</div>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 600, marginTop: 4}}>ลืมลงออกงาน · ปรีชา วรพงษ์</h3>
              </div>
              <span className="humi-spacer"/>
              <span className="humi-tag humi-tag--coral"><I.clock size={11}/> SLA 2 ชม.</span>
            </div>
            <div className="humi-row" style={{gap: 12, fontSize: 13, color:"var(--color-ink-soft)"}}>
              <span><b>E-72915</b> · Floor Staff · CTW</span>
              <span style={{width: 1, height: 12, background:"var(--color-hairline)"}}/>
              <span>ผู้จัดการ: อาทิตย์ ช.</span>
            </div>
          </div>

          {/* Body */}
          <div style={{padding: 18}}>
            {/* Side-by-side: System log vs Request */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16, marginBottom: 18}}>
              <div style={{padding: 14, background:"var(--color-canvas-soft)", borderRadius: 12, border:"1px solid var(--color-hairline-soft)"}}>
                <div className="humi-eyebrow" style={{fontSize: 10, marginBottom: 10}}>ข้อมูลจากระบบ · 26 พ.ค.</div>
                <div style={{fontFamily:"ui-monospace, monospace", fontSize: 12, lineHeight: 1.7, color:"var(--color-ink-soft)"}}>
                  <div className="humi-row" style={{gap: 6}}><I.loginIn size={12} style={{color:"var(--color-accent)"}}/> <b>09:58</b> เข้างาน (QR · CTW)</div>
                  <div className="humi-row" style={{gap: 6, color:"var(--color-ink-faint)"}}>12:01 → 12:58 พักเที่ยง</div>
                  <div className="humi-row" style={{gap: 6, color:"var(--color-warning)"}}><I.warn size={12}/> <b>22:00</b> auto-out (ระบบบังคับ)</div>
                  <hr className="humi-divider" style={{margin:"10px 0"}}/>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>เวลารวมที่บันทึก: <b style={{color:"var(--color-ink)"}}>11.0 ชม.</b></div>
                </div>
              </div>

              <div style={{padding: 14, background:"var(--color-accent-soft)", borderRadius: 12}}>
                <div className="humi-eyebrow" style={{fontSize: 10, marginBottom: 10}}>คำขอจากพนักงาน</div>
                <div style={{fontSize: 13, lineHeight: 1.6}}>
                  ผมลืมลงเวลาออกครับ จริงๆ ออก <b>18:30</b> ขอแก้เวลาให้ตรงด้วยครับ · ในวันนั้นมีลูกค้าเข้าเยอะตอนเย็น เลยเลิกช้านิดหน่อย
                </div>
                <div style={{marginTop: 12, fontFamily:"ui-monospace, monospace", fontSize: 12, color:"var(--color-ink-soft)"}}>
                  <div>เวลาที่ขอ: <b>09:58 → 18:30</b></div>
                  <div>ระยะ: <b>8 ชม. 32 นาที</b> (+0.5 OT)</div>
                </div>
              </div>
            </div>

            {/* Cross-reference */}
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginBottom: 10, fontWeight: 600}}>หลักฐานข้ามระบบ</h4>
            {[
              { l:"กล้อง POS · CTW Floor 3", v:"ตรวจสอบเจอใบเสร็จ #248 · 18:24", ok: true },
              { l:"GPS เครื่องลงเวลา",        v:"อยู่ในรัศมี 09:55–18:31",      ok: true },
              { l:"ผู้จัดการรับรอง",          v:"อาทิตย์ ช. รับรองว่าออก 18:30",  ok: true },
              { l:"การขออนุมัติ OT ล่วงหน้า", v:"ไม่มี (OT ฉุกเฉิน 30 นาที)",    ok: false },
            ].map((c, i) => (
              <div key={i} className="humi-row" style={{padding:"10px 0", borderBottom:"1px solid var(--color-hairline-soft)"}}>
                <div style={{width: 24, height: 24, borderRadius:"50%", background: c.ok ? "var(--color-accent-soft)" : "var(--color-warning-soft)", color: c.ok ? "var(--color-accent)" : "var(--color-warning)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                  {c.ok ? <I.check size={13}/> : <I.warn size={13}/>}
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 13, fontWeight: 500}}>{c.l}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 2}}>{c.v}</div>
                </div>
              </div>
            ))}

            {/* Decision */}
            <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginTop: 18, marginBottom: 10, fontWeight: 600}}>การตัดสินใจ</h4>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 14}}>
              <div>
                <div className="field-label">เวลาออกที่ใช้บันทึก</div>
                <input className="field-input" defaultValue="18:30"/>
              </div>
              <div>
                <div className="field-label">OT (30 นาที)</div>
                <select className="field-input" defaultValue="approve">
                  <option value="approve">อนุมัติ · นับเป็น OT</option>
                  <option value="reject">ไม่นับเป็น OT</option>
                </select>
              </div>
              <div className="full" style={{gridColumn:"1/-1"}}>
                <div className="field-label">หมายเหตุภายใน</div>
                <textarea className="field-input" rows={2} defaultValue="มีหลักฐานครบ · ผจก.รับรอง · OT 30 นาที ฉุกเฉินรับได้"/>
              </div>
            </div>
          </div>

          <div style={{padding: 14, background:"var(--color-canvas-soft)", borderTop:"1px solid var(--color-hairline-soft)", display:"flex", gap: 8}}>
            <button className="humi-button humi-button--ghost"><I.x size={14}/> ปฏิเสธคำขอ</button>
            <button className="humi-button humi-button--ghost">บันทึกร่าง</button>
            <span className="humi-spacer"/>
            <button className="humi-button humi-button--primary" style={{minWidth: 200}}><I.check size={14}/> บันทึก · เคสถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.TM_Spd = TM_Spd;
