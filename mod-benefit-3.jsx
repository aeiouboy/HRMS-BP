// ============= MODULE 2: BENEFIT CLAIMED (HRIS + SPD) =============

// 2D · HRIS — ตั้งวงเงิน/แพ็กเกจสวัสดิการ
function BN_Hris() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Benefit Claimed · มุม HRIS"
        title="ตั้งค่าแพ็กเกจสวัสดิการ"
        subtitle="กำหนดวงเงิน เงื่อนไข และผังอนุมัติของสวัสดิการแต่ละประเภท ตามระดับและประเภทพนักงาน"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.copy size={14}/> Audit log</button>
          <button className="humi-button humi-button--primary"><I.save size={14}/> เผยแพร่ (3 รายการ)</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap: 20}}>
        {/* Plan list */}
        <aside>
          <div className="humi-card" style={{padding: 14}}>
            <div className="humi-row" style={{marginBottom: 12}}>
              <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 600}}>แพ็กเกจ</h4>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost" style={{padding:"4px 8px", minHeight: 28, fontSize: 12}}><I.plus size={12}/></button>
            </div>
            {[
              {n:"Standard · พนักงานประจำ", t:"2,104 คน", active: true},
              {n:"Premium · ระดับ G5+",     t:"312 คน"},
              {n:"Outsource · 6 เดือน",     t:"75 คน"},
              {n:"PT · รายชั่วโมง",         t:"612 คน"},
              {n:"Probation · ทดลองงาน",    t:"138 คน"},
            ].map(p => (
              <div key={p.n} className="humi-row" style={{padding:"10px 12px", borderRadius: 8, background: p.active ? "var(--color-accent-soft)" : "transparent", cursor:"pointer", marginBottom: 2}}>
                <div style={{width: 6, height: 24, borderRadius: 3, background: p.active ? "var(--color-accent)" : "transparent"}}/>
                <div style={{flex: 1, marginLeft: 4}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>{p.n}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{p.t}</div>
                </div>
                {p.active && <I.chevR size={12} style={{color:"var(--color-accent)"}}/>}
              </div>
            ))}
          </div>
        </aside>

        <div>
          <div className="humi-card" style={{marginBottom: 16}}>
            <div className="humi-row" style={{alignItems:"flex-start"}}>
              <div>
                <div className="humi-eyebrow">แก้ไขแพ็กเกจ</div>
                <h3 style={{marginTop: 6, fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600}}>Standard · พนักงานประจำ</h3>
                <div className="humi-section-sub">บังคับใช้ตั้งแต่ 1 ม.ค. 2568 · มีพนักงาน 2,104 คนใช้แพ็กเกจนี้</div>
              </div>
              <span className="humi-spacer"/>
              <span className="humi-tag humi-tag--butter">3 รายการรอเผยแพร่</span>
            </div>
          </div>

          {/* Benefit rows */}
          <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
            <div style={{display:"grid", gridTemplateColumns:"44px 1.6fr 1fr 1fr 1.2fr 1fr 100px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
              <div></div>
              <div>สวัสดิการ</div>
              <div style={{textAlign:"right"}}>วงเงิน/ปี</div>
              <div style={{textAlign:"right"}}>ต่อครั้ง</div>
              <div>ผังอนุมัติ</div>
              <div>เอกสาร</div>
              <div></div>
            </div>
            {[
              { ic:"hospital", n:"ค่ารักษาพยาบาล",  y:30000, t:"ไม่จำกัด",  flow:"ผจก. → SPD → Admin", doc:"ใบเสร็จ + Dx", st:"" },
              { ic:"tooth",    n:"ทันตกรรม",         y:4000,  t:2000,        flow:"ผจก. → SPD",          doc:"ใบเสร็จ",     st:"" },
              { ic:"glasses",  n:"แว่นตา",           y:3500,  t:3500,        flow:"ผจก. → SPD",          doc:"ใบเสร็จ + Rx", st:"draft" },
              { ic:"baby",     n:"คลอดบุตร",         y:15000, t:"เหมา",       flow:"SPD → Admin",         doc:"สูจิบัตร",    st:"" },
              { ic:"pill",     n:"ค่ายา",            y:6000,  t:1000,        flow:"อัตโนมัติ",            doc:"ใบเสร็จ",     st:"draft" },
              { ic:"hospital", n:"ค่ารักษาพ่อแม่",   y:10000, t:"ไม่จำกัด",  flow:"ผจก. → SPD → Admin", doc:"+ ทะเบียนบ้าน", st:"new" },
            ].map((b, i) => {
              const Glyph = I[b.ic];
              return (
                <div key={i} style={{display:"grid", gridTemplateColumns:"44px 1.6fr 1fr 1fr 1.2fr 1fr 100px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
                  <div style={{width: 34, height: 34, borderRadius: 9, background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={16}/></div>
                  <div style={{fontSize: 14, fontWeight: 600}}>{b.n}</div>
                  <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>฿{b.y.toLocaleString()}</div>
                  <div style={{textAlign:"right", fontSize: 13, color:"var(--color-ink-soft)"}}>{typeof b.t === "number" ? "฿" + b.t.toLocaleString() : b.t}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-soft)", fontFamily:"ui-monospace, monospace"}}>{b.flow}</div>
                  <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{b.doc}</div>
                  <div>
                    {b.st === "draft" && <span className="humi-tag humi-tag--butter">แก้ไข</span>}
                    {b.st === "new"   && <span className="humi-tag humi-tag--accent">ใหม่</span>}
                    {!b.st && <button className="humi-icon-btn" style={{width: 30, height: 30}}><I.edit size={13}/></button>}
                  </div>
                </div>
              );
            })}
            <div style={{padding: 14, textAlign:"center", background:"var(--color-canvas-soft)"}}>
              <button className="humi-button humi-button--ghost"><I.plus size={13}/> เพิ่มสวัสดิการในแพ็กเกจ</button>
            </div>
          </div>

          {/* Detail card for selected benefit */}
          <div className="humi-card" style={{marginTop: 20}}>
            <div className="humi-row" style={{marginBottom: 16, alignItems:"flex-start"}}>
              <div>
                <div className="humi-eyebrow">รายละเอียด · ค่ารักษาพยาบาล</div>
                <h4 style={{fontFamily:"var(--font-display)", fontSize: 18, marginTop: 4, fontWeight: 600}}>เงื่อนไขและกฎอัตโนมัติ</h4>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost"><I.eye size={13}/> Preview ฟอร์ม</button>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 18}}>
              <div>
                <div className="field-label">ผู้มีสิทธิ</div>
                <div className="humi-row" style={{gap: 6, flexWrap:"wrap"}}>
                  <span className="humi-tag humi-tag--accent">ตนเอง</span>
                  <span className="humi-tag humi-tag--accent">คู่สมรส</span>
                  <span className="humi-tag humi-tag--accent">บุตร ≤ 20 ปี</span>
                  <span className="humi-tag humi-tag--cream">+ บิดามารดา</span>
                </div>
              </div>
              <div>
                <div className="field-label">ผู้ให้บริการที่รองรับ</div>
                <div style={{fontSize: 13}}>เครือข่ายโรงพยาบาลคู่สัญญา <b>132 แห่ง</b> · นอกเครือข่ายเบิก 80%</div>
              </div>
              <div>
                <div className="field-label">อนุมัติอัตโนมัติเมื่อ</div>
                <div style={{fontSize: 13, lineHeight: 1.6, color:"var(--color-ink-soft)"}}>
                  • ยอดต่อครั้ง ≤ ฿2,000<br/>
                  • วงเงินคงเหลือ ≥ 50% ของปี<br/>
                  • ใบเสร็จไม่เกิน 30 วัน
                </div>
              </div>
              <div>
                <div className="field-label">ต้องดูด้วยมือเมื่อ</div>
                <div style={{fontSize: 13, lineHeight: 1.6, color:"var(--color-ink-soft)"}}>
                  • ยอดต่อครั้ง > ฿5,000<br/>
                  • ใบเสร็จเกิน 60 วัน<br/>
                  • OCR อ่านไม่ชัด
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.BN_Hris = BN_Hris;

// 2E · SPD — ตรวจใบเสร็จ
function BN_Spd() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Benefit Claimed · มุม SPD"
        title="ตรวจใบเสร็จและเอกสารเบิก"
        subtitle="62 ใบเสร็จรอตรวจวันนี้ · SLA 8 ชม. · ตรวจเสร็จแล้ว 24 ใบ"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.scan size={14}/> สแกนใบเสร็จ</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> รับเคสถัดไป</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="รอตรวจ" value="62" sub="ของฉัน 12 · ทีม 50" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="เกิน SLA" value="5" sub="> 8 ชม." accent="var(--color-danger)" icon="warn"/>
        <window.StatCard label="ตรวจวันนี้" value="24" sub="เฉลี่ย 12 นาที/เคส" icon="check"/>
        <window.StatCard label="ตีกลับ" value="8" sub="ใบเสร็จไม่ชัด 5 · เลย 90 วัน 3" icon="refresh"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
        {/* Receipt viewer */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 16, borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <div className="humi-row">
              <div>
                <div className="humi-eyebrow">เคสที่เปิดอยู่</div>
                <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 4}}>CLM-09921 · ค่ารักษาพยาบาล</h3>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-icon-btn"><I.chevL size={14}/></button>
              <button className="humi-icon-btn" style={{marginLeft: 4}}><I.chevR size={14}/></button>
            </div>
          </div>

          {/* Receipt preview */}
          <div style={{background:"#2A2A2A", padding: 24, display:"flex", justifyContent:"center"}}>
            <div style={{width: 280, background:"#FFFCF6", padding: 20, fontFamily:"ui-monospace, monospace", fontSize: 11, lineHeight: 1.6, color:"#2A2A2A", boxShadow:"0 12px 30px rgba(0,0,0,0.3)"}}>
              <div style={{textAlign:"center", fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700, marginBottom: 2}}>โรงพยาบาลบำรุงราษฎร์</div>
              <div style={{textAlign:"center", fontSize: 9}}>เลขที่ใบกำกับภาษี 0105538014706</div>
              <div style={{borderTop:"1px dashed #999", margin:"10px 0"}}/>
              <div>ใบเสร็จ #BR-2025-008291</div>
              <div>วันที่ 24 พ.ค. 2568 · 14:32</div>
              <div>ผู้ป่วย มาริสา สงวนศักดิ์</div>
              <div>HN 04-58231</div>
              <div style={{borderTop:"1px dashed #999", margin:"10px 0"}}/>
              <div style={{display:"flex", justifyContent:"space-between"}}><span>ค่าตรวจ</span><span>500.00</span></div>
              <div style={{display:"flex", justifyContent:"space-between"}}><span>ค่ายา</span><span>840.00</span></div>
              <div style={{display:"flex", justifyContent:"space-between"}}><span>ค่าบริการ</span><span>500.00</span></div>
              <div style={{borderTop:"1px solid #2A2A2A", margin:"8px 0", paddingTop: 4, display:"flex", justifyContent:"space-between", fontWeight: 700}}>
                <span>รวม</span><span>1,840.00</span>
              </div>
              <div style={{borderTop:"1px dashed #999", margin:"10px 0"}}/>
              <div style={{textAlign:"center"}}>Dx: J06.9 · URI</div>
              <div style={{textAlign:"center", fontSize: 9, marginTop: 8}}>นพ. สมศักดิ์ อมรรัตน์</div>
              <div style={{textAlign:"center", fontSize: 9}}>ว.12453</div>
            </div>
          </div>

          {/* Viewer toolbar */}
          <div className="humi-row" style={{padding: 14, background:"var(--color-canvas-soft)", borderTop:"1px solid var(--color-hairline-soft)", gap: 6}}>
            <button className="humi-icon-btn"><I.search size={14}/></button>
            <button className="humi-icon-btn"><I.refresh size={14}/></button>
            <button className="humi-icon-btn"><I.download size={14}/></button>
            <span className="humi-spacer"/>
            <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>1/1 หน้า · 1080×1620 · OCR สำเร็จ</span>
          </div>
        </div>

        {/* Verification panel */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <div className="humi-row">
              <h3 className="humi-section-title">ตรวจสอบ</h3>
              <span className="humi-spacer"/>
              <span className="humi-tag humi-tag--accent"><I.clock size={11}/> เหลือ 6 ชม.</span>
            </div>
          </div>

          <div style={{padding: 18}}>
            {/* Auto-extracted */}
            <div className="humi-eyebrow" style={{marginBottom: 10}}>OCR · อ่านอัตโนมัติ</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", rowGap: 12, columnGap: 16}}>
              {[
                ["โรงพยาบาล", "บำรุงราษฎร์ ✓"],
                ["ในเครือข่าย", "ใช่ ✓"],
                ["ใบเสร็จ #", "BR-2025-008291"],
                ["วันที่", "24 พ.ค. 68 (5 วัน) ✓"],
                ["ยอด", "฿1,840 ✓"],
                ["Dx", "J06.9 ✓"],
              ].map(([l,v]) => (
                <div key={l}>
                  <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
                  <div style={{fontSize: 13, fontWeight: 500, marginTop: 2}}>{v}</div>
                </div>
              ))}
            </div>

            <hr className="humi-divider"/>

            <div className="humi-eyebrow" style={{marginBottom: 10}}>เช็คลิสต์</div>
            {[
              ["ใบเสร็จมีลายเซ็นแพทย์/ตราสถานพยาบาล", true],
              ["ชื่อผู้ป่วยตรงกับผู้เบิก", true],
              ["ใบเสร็จไม่เกิน 90 วัน", true],
              ["รายการที่เบิกได้ตามรายการแพ็กเกจ", true],
              ["ไม่ซ้ำกับเคสที่เคยเบิก", true],
            ].map(([l, ok], i) => (
              <label key={i} className="humi-row" style={{padding:"8px 0", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 13}}>
                <input type="checkbox" defaultChecked={ok} style={{accentColor:"var(--color-accent)"}}/>
                <span style={{flex: 1}}>{l}</span>
                <I.check size={13} style={{color:"var(--color-accent)"}}/>
              </label>
            ))}

            <div style={{marginTop: 16}}>
              <div className="field-label">หมายเหตุ (ภายใน)</div>
              <textarea className="field-input" rows={2} defaultValue="OCR ครบ ตรวจตรงเอกสารต้นฉบับ ผ่าน"/>
            </div>
          </div>

          <div style={{padding: 14, background:"var(--color-canvas-soft)", borderTop:"1px solid var(--color-hairline-soft)", display:"flex", gap: 8}}>
            <button className="humi-button humi-button--ghost" style={{flex: 1}}><I.x size={14}/> ตีกลับ</button>
            <button className="humi-button humi-button--primary" style={{flex: 1.5}}><I.check size={14}/> ผ่าน · ส่งต่อ Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.BN_Spd = BN_Spd;
