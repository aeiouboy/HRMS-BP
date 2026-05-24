// prod-hire-clusters.jsx — ClusterWho / ClusterJob / ClusterReview bodies
// Companion to prod-hire.jsx (defines Section, F, S, ReadOnly at module scope)

// ─── ClusterWho — 5 + 2 conditional collapsible sections ─────────────────
function ClusterWho({ collapsed, toggle, validity, showWorkPermit, showDependents }) {
  const I = window.PI;
  const [showBirthDetails, setShowBirthDetails] = React.useState(false);
  const today = "2026-05-15";
  const hireDate = "2026-06-15"; // forward-dated to trigger warning

  // Section completion tally — drives top progress strip
  const sectionKeys = ["identity","biographical","contact","emergencyContacts","globalInfo"];
  if (showWorkPermit) sectionKeys.push("workPermit");
  if (showDependents) sectionKeys.push("dependents");
  const filledSections = sectionKeys.filter(k => validity[k]).length;
  const totalSections = sectionKeys.length;
  const pct = Math.round(filledSections / totalSections * 100);

  return (
    <div>
      {/* ── Cluster progress strip ── */}
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
        padding: "14px 18px",
        marginBottom: 18,
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <span className="humi-eyebrow" style={{color:"var(--color-ink-soft)"}}>ความครบถ้วน · Cluster 1</span>
        <div style={{flex: 1, height: 8, background:"var(--color-canvas)", borderRadius: 99, overflow:"hidden"}}>
          <div style={{
            width: pct+"%", height: "100%",
            background: pct === 100 ? "var(--color-success)" : "var(--color-accent)",
            transition: "width .3s",
          }}/>
        </div>
        <span style={{fontSize: 13, fontWeight: 700, color: pct === 100 ? "var(--color-success)" : "var(--color-ink)", fontVariantNumeric:"tabular-nums"}}>
          {filledSections} / {totalSections} หัวข้อ
        </span>
        {pct === 100 && <span style={{fontSize: 12, color:"var(--color-success)", fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 4}}><I.check size={14}/> พร้อมไปขั้นถัดไป</span>}
      </div>

      {/* ── Identity ── */}
      <Section id="who.identity" icon={I.fingerprint} eyebrow="ระบุตัวตน" title="ข้อมูลระบุตัวตน"
        sub="วันที่เริ่มงาน บริษัท ชื่อ วันเกิด บัตรประชาชน"
        collapsed={collapsed["who.identity"]} onToggle={() => toggle("who.identity")} isValid={validity.identity}>

        {/* DVT prev ID at top */}
        <div style={{ marginBottom: 18 }}>
          <label className="field-label">รหัสพนักงานเดิม (DVT) <span style={{ color:"var(--color-ink-faint)", fontSize: 11, fontWeight: 400, marginLeft: 6 }}>optional</span></label>
          <input className="field-input" placeholder="กรอกหากเคยทำงานในเครือ (รับ rehire / ฝึกงาน)"/>
          <p style={{ marginTop: 4, fontSize: 11, color: "var(--color-ink-faint)" }}>ใช้สำหรับ rehire หรือเคยฝึกงาน — ระบบจะดึงประวัติเดิมมาให้</p>
        </div>

        <div className="field-grid">
          <F label="วันที่เริ่มงาน / Hire Date" type="date" required value={hireDate}
             warning={hireDate > today ? "วันที่เริ่มงานล่วงหน้า — ต้อง SPD อนุมัติก่อนใช้งาน" : null}/>
          <S label="บริษัท / Company" required value="CEN — Central Retail Corporation"
             options={["CEN — Central Retail Corporation","TOPS — Tops Online","PWB — Power Buy","RBS — Robinson"]}/>
          <S label="เหตุผลการจ้าง / Event Reason" required value="NEW_HIRE — จ้างใหม่"
             options={["NEW_HIRE — จ้างใหม่","REHIRE — จ้างกลับ","TRANSFER_IN — โอนย้ายเข้า","CONVERSION — เปลี่ยนสถานะ"]}/>
          <S label="คำนำหน้า (EN) / Salutation" required options={["Mr.","Ms.","Mrs.","Dr."]}/>
          <F label="ชื่อ (EN) / First Name" placeholder="First name" required/>
          <F label="ชื่อกลาง (EN) / Middle Name" placeholder="Middle name" optional/>
          <F label="นามสกุล (EN) / Last Name" placeholder="Last name" required/>
          <F label="วันเกิด / Date of Birth" type="date" required value="1995-03-14"
             hint="อายุ: 31 ปี"/>
        </div>

        {/* Birth-country toggle pill */}
        <div style={{ marginTop: 14 }}>
          <button type="button" onClick={() => setShowBirthDetails(v => !v)}
            style={{ padding:"5px 14px", border:"1px solid var(--color-accent-soft)", background:"rgba(214,238,236,0.5)", color:"var(--color-accent)", borderRadius: 999, fontSize: 12, fontWeight: 500, fontFamily:"inherit", cursor:"pointer" }}>
            {showBirthDetails ? "ซ่อนรายละเอียดเพิ่มเติม" : "รายละเอียดเพิ่มเติม (ประเทศที่เกิด)"}
          </button>
          {showBirthDetails && (
            <div className="field-grid" style={{ marginTop: 14 }}>
              <S label="ประเทศที่เกิด / Country of Birth" options={["TH — ไทย","KH — กัมพูชา","MM — เมียนมา","LA — ลาว","อื่นๆ…"]}/>
              <F label="ภูมิภาคที่เกิด / Region of Birth" placeholder="เช่น ภาคกลาง" optional/>
            </div>
          )}
        </div>

        <div className="field-grid" style={{ marginTop: 14 }}>
          <ReadOnly label="รหัสพนักงาน / Employee ID" value="สร้างหลัง Submit" hint="ระบบสร้างให้อัตโนมัติ"/>
          <S label="คำนำหน้า (ไทย) / Salutation (Local)" required options={["นาย","นาง","นางสาว","ดร."]}/>
          <S label="ประเภทบัตร / National ID Card Type" required value="NATIONAL_ID — บัตรประชาชนไทย"
             options={["NATIONAL_ID — บัตรประชาชนไทย","PASSPORT — หนังสือเดินทาง","WORK_PERMIT — ใบอนุญาตทำงาน"]}/>
          <S label="ประเทศที่ออกบัตร / Country of Issuance" required value="TH — ไทย"
             options={["TH — ไทย","KH — กัมพูชา","MM — เมียนมา","LA — ลาว","อื่นๆ…"]}/>
          <F label="เลขบัตรประชาชน / National ID" placeholder="X-XXXX-XXXXX-XX-X" required
             hint="ตรวจสอบ mod-11 อัตโนมัติเมื่อเป็นบัตรไทย"/>
          <S label="บัตรหลัก / Is Primary" required value="YES — บัตรหลัก"
             options={["YES — บัตรหลัก","NO — บัตรรอง"]}
             hint="ตั้ง YES เมื่อทำงานบริษัทเดียว · NO หาก dual-employment"/>
        </div>

        {/* Attachment dropzone */}
        <div style={{ marginTop: 14 }}>
          <label className="field-label">ไฟล์แนบ National ID / Attachment</label>
          <div style={{ padding: "22px 18px", background: "var(--color-canvas-soft)", border: "1.5px dashed var(--color-hairline)", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--color-ink-muted)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink-soft)" }}>ลากไฟล์มาวาง หรือ <span style={{ color: "var(--color-accent)" }}>เลือกไฟล์</span></div>
            <div style={{ fontSize: 11, marginTop: 4 }}>สูงสุด 5 ไฟล์ · ไฟล์ละไม่เกิน 10 MB · PDF / JPG / PNG</div>
          </div>
        </div>

        <p style={{ fontSize: 12, color:"var(--color-ink-muted)", marginTop: 16 }}>
          <span style={{ color:"var(--color-accent)", fontWeight: 700, marginRight: 4 }}>*</span>ช่องที่บังคับกรอก
        </p>
      </Section>

      {/* ── Biographical ── */}
      <Section id="who.biographical" icon={I.user} eyebrow="ประวัติส่วนตัว" title="ข้อมูลส่วนตัว"
        sub="ชื่อท้องถิ่น ชื่อเล่น เพศ สัญชาติ กรุ๊ปเลือด สถานภาพสมรส"
        collapsed={collapsed["who.biographical"]} onToggle={() => toggle("who.biographical")} isValid={validity.biographical}/>

      <Section id="who.contact" icon={I.phone} eyebrow="ข้อมูลติดต่อ" title="ข้อมูลการติดต่อ"
        sub="เบอร์โทร อีเมล บุคคลที่เกี่ยวข้อง"
        collapsed={collapsed["who.contact"]} onToggle={() => toggle("who.contact")} isValid={validity.contact}/>

      <Section id="who.emergencyContacts" icon={I.alert} eyebrow="ผู้ติดต่อฉุกเฉิน" title="ผู้ติดต่อฉุกเฉิน"
        sub="ชื่อ ความสัมพันธ์ เบอร์โทร ที่อยู่ (ถ้ามี)"
        collapsed={collapsed["who.emergencyContacts"]} onToggle={() => toggle("who.emergencyContacts")} isValid={validity.emergencyContacts}/>

      <Section id="who.globalInfo" icon={I.globe} eyebrow="ข้อมูลทั่วไป" title="ข้อมูลทั่วไป"
        sub="ศาสนา จำนวนบุตร สถานะความพิการ เลขบัตรคู่สมรส ข้อมูลเพิ่มเติม"
        collapsed={collapsed["who.globalInfo"]} onToggle={() => toggle("who.globalInfo")} isValid={validity.globalInfo}/>

      {showWorkPermit && (
        <Section id="who.workPermit" icon={I.fileText} eyebrow="ใบอนุญาตทำงาน" title="ใบอนุญาตทำงาน"
          sub="ประเภทเอกสาร เลขที่ ประเทศ วันออก วันหมดอายุ (สำหรับชาวต่างชาติเท่านั้น)"
          collapsed={collapsed["who.workPermit"]} onToggle={() => toggle("who.workPermit")} isValid={validity.workPermit}/>
      )}

      {!showDependents && (
        <section style={{ marginBottom: 20, borderRadius: 16, border: "1.5px dashed var(--color-hairline)", background: "var(--color-canvas-soft)", padding: 18 }}>
          <div className="humi-eyebrow">ข้อมูลตามกรณี</div>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 4 }}>
            เปิดเฉพาะเมื่อมีข้อมูลเสริมที่เกี่ยวข้อง
          </h3>
          <p style={{ fontSize: 13, color: "var(--color-ink-muted)", marginTop: 6 }}>
            ฟอร์มเสริมจะไม่แสดงเป็นค่าเริ่มต้น เพื่อให้รายการ Hire ตรงกับเคสจริงของพนักงาน
          </p>
          <button type="button" className="humi-button humi-button--ghost" style={{ marginTop: 12 }}>
            <I.plus size={14}/> เพิ่มข้อมูลครอบครัวตามกรณี
          </button>
        </section>
      )}

      {showDependents && (
        <Section id="who.dependents" icon={I.users} eyebrow="บุคคลในอุปการะ" title="บุคคลในอุปการะ"
          sub="คู่สมรส บุตร บิดามารดา (ถ้ามี) — สูงสุด 10 คน"
          collapsed={collapsed["who.dependents"]} onToggle={() => toggle("who.dependents")} isValid={validity.dependents}/>
      )}

      {/* ── Identity snapshot before going to next cluster ── */}
      <section className="humi-card humi-card--cream" style={{ marginBottom: 20, borderRadius: 22 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>ตรวจสอบก่อนไปขั้นถัดไป</div>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 600, lineHeight: 1.2, margin: 0, marginBottom: 14, letterSpacing:"-0.01em" }}>
          Identity Snapshot
        </h3>
        <div style={{
          display:"flex", alignItems:"center", gap: 16,
          padding: "14px 0",
          borderTop: "1px solid var(--color-hairline-soft)",
          borderBottom: "1px solid var(--color-hairline-soft)",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background:"linear-gradient(135deg, #1FA8A0, #9BB5A0)",
            color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center",
            fontFamily:"var(--font-display)", fontSize: 20, fontWeight: 700, flexShrink: 0,
            letterSpacing:"0.04em",
          }}>—</div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 15, fontWeight: 600, color:"var(--color-ink-muted)", fontStyle:"italic"}}>
              รอชื่อจากช่อง "First name (EN) / Last name (EN)"
            </div>
            <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 4, display:"flex", gap: 10, flexWrap:"wrap"}}>
              <span><I.briefcase size={11} style={{verticalAlign:"-1px", marginRight: 4, color:"var(--color-ink-faint)"}}/>CEN — Central Retail</span>
              <span style={{color:"var(--color-ink-faint)"}}>·</span>
              <span><I.calendar size={11} style={{verticalAlign:"-1px", marginRight: 4, color:"var(--color-ink-faint)"}}/>เริ่มงาน 15 มิ.ย. 2569</span>
              <span style={{color:"var(--color-ink-faint)"}}>·</span>
              <span>อายุ 31 ปี</span>
            </div>
          </div>
          <span className="humi-tag humi-tag--accent" style={{ padding:"5px 12px", flexShrink: 0 }}>NEW_HIRE</span>
        </div>
        <div style={{marginTop: 14, display:"flex", gap: 14, fontSize: 12, color:"var(--color-ink-soft)", flexWrap:"wrap"}}>
          <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 6, height: 6, borderRadius: 99, background: validity.identity ? "var(--color-success)" : "var(--color-warning)"}}/>
            ระบุตัวตน
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 6, height: 6, borderRadius: 99, background: validity.biographical ? "var(--color-success)" : "var(--color-warning)"}}/>
            ประวัติส่วนตัว
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 6, height: 6, borderRadius: 99, background: validity.contact ? "var(--color-success)" : "var(--color-warning)"}}/>
            ติดต่อ
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 6, height: 6, borderRadius: 99, background: validity.emergencyContacts ? "var(--color-success)" : "var(--color-warning)"}}/>
            ฉุกเฉิน
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap: 6}}>
            <span style={{width: 6, height: 6, borderRadius: 99, background: validity.globalInfo ? "var(--color-success)" : "var(--color-warning)"}}/>
            ทั่วไป
          </span>
        </div>
      </section>

      <p style={{ fontSize: 12, color:"var(--color-ink-muted)", marginTop: 16 }}>
        <span style={{ color:"var(--color-accent)", fontWeight: 700, marginRight: 4 }}>*</span>ช่องที่บังคับกรอก
      </p>
    </div>
  );
}

// ─── ClusterJob ──────────────────────────────────────────────────────────
function ClusterJob({ collapsed, toggle, validity }) {
  const I = window.PI;
  return (
    <div>
      <Section id="job.employeeInfo" icon={I.briefcase} eyebrow="ข้อมูลพนักงาน" title="ประเภทการจ้างงาน"
        sub="Employee Class ตาม Appendix 3 (A-H)"
        collapsed={collapsed["job.employeeInfo"]} onToggle={() => toggle("job.employeeInfo")} isValid={validity.employeeInfo}>
        <div className="field-grid">
          <ReadOnly label="รหัสพนักงาน" value="สร้างหลัง Submit"/>
          <S label="Employee Class" required options={[
            "A — Executive","B — Senior Management","C — Management","D — Officer",
            "E — Operations","F — Part-time","G — Contract","H — Intern"
          ]}/>
        </div>
      </Section>

      <Section id="job.assignment" icon={I.building} eyebrow="ตำแหน่งและสังกัด" title="ตำแหน่งและสังกัด"
        sub="ตำแหน่งงาน หน่วยธุรกิจ สาขา/หน่วยงาน เขต HR"
        collapsed={collapsed["job.assignment"]} onToggle={() => toggle("job.assignment")} isValid={validity.job}>
        <div className="field-grid">
          <F label="ตำแหน่งงาน" placeholder="ค้นหาตำแหน่ง…" required/>
          <F label="หน่วยธุรกิจ" placeholder="CEN / TOPS / Power Buy …" required/>
          <F label="สาขา/หน่วยงาน" placeholder="ทองหล่อ" required/>
          <F label="เขต HR" placeholder="กรุงเทพฯ ตอนกลาง"/>
        </div>
      </Section>

      <Section id="job.compensation" icon={I.wallet} eyebrow="ค่าตอบแทน" title="ค่าตอบแทน"
        sub="เงินเดือนพื้นฐานสำหรับ Payroll"
        collapsed={collapsed["job.compensation"]} onToggle={() => toggle("job.compensation")} isValid={validity.compensation}/>

      <p style={{ fontSize: 12, color:"var(--color-ink-muted)", marginTop: 16 }}>
        <span style={{ color:"var(--color-accent)", fontWeight: 700, marginRight: 4 }}>*</span>ช่องที่บังคับกรอก
      </p>
    </div>
  );
}

// ─── ClusterReview — 3 checkpoint sections ───────────────────────────────
function ClusterReview() {
  const I = window.PI;

  const SummaryRow = ({ label, value, ok }) => (
    <div className="humi-row" style={{ padding: "10px 0", borderTop: "1px solid var(--color-hairline-soft)" }}>
      <span style={{ display:"inline-flex", width: 20, color: ok ? "var(--color-accent)" : "var(--color-warning)" }} aria-hidden>
        {ok ? <I.check size={16}/> : <I.alert size={16}/>}
      </span>
      <span style={{ fontSize: 13, color:"var(--color-ink-soft)", minWidth: 220 }}>{label}</span>
      <span style={{ flex: 1, fontSize: 14, color: ok ? "var(--color-ink)" : "var(--color-ink-muted)", fontWeight: ok ? 500 : 400 }}>
        {value}
      </span>
    </div>
  );

  const CheckpointHeader = ({ icon: Icon, title, sub }) => (
    <div className="humi-row" style={{ alignItems:"flex-start", gap: 10, marginBottom: 14 }}>
      <div style={{ marginTop: 2, width: 24, height: 24, borderRadius: "50%", background:"var(--color-accent-soft)", color:"var(--color-accent)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0 }}>
        <Icon size={14}/>
      </div>
      <div>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 600, lineHeight: 1.2, margin: 0 }}>{title}</h3>
        {sub && <p style={{ fontSize: 13, color:"var(--color-ink-muted)", marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );

  return (
    <div>
      {/* ── ยืนยันชื่อ (EN) ── */}
      <section id="review.enName" className="humi-card" style={{ marginBottom: 20, borderRadius: 22 }}>
        <CheckpointHeader icon={I.user} title="ชื่อ-นามสกุลภาษาอังกฤษ" sub="ยืนยันก่อนส่งอนุมัติ · ดึงจากข้อมูลระบุตัวตน"/>
        <div className="field-grid">
          <F label="คำนำหน้า (EN)" value="" readOnly/>
          <F label="ชื่อ (EN)"     value="" readOnly/>
          <F label="ชื่อกลาง (EN)" value="" readOnly/>
          <F label="นามสกุล (EN)"  value="" readOnly/>
        </div>
      </section>

      {/* ── HRBP + Direct Manager ── */}
      <section id="review.hrbp" className="humi-card" style={{ marginBottom: 20, borderRadius: 22 }}>
        <CheckpointHeader icon={I.user} title="อนุมัติโดย Direct Manager + แจ้ง HRBP"
          sub="Direct Manager ดึงจากตำแหน่งใน Cluster 2 · เลือก HRBP ที่จะรับการแจ้งเตือน (BRD #109)"/>
        <div className="field-grid">
          <F label="Direct Manager (Approver)" required value="ยังไม่ได้เลือก — กรุณาเลือกตำแหน่งใน Cluster 2" readOnly
             hint="ระบบดึงอัตโนมัติจากตำแหน่งที่เลือก"/>
          <div>
            <label className="field-label">HRBP ผู้รับผิดชอบ<span className="field-required">*</span></label>
            <select className="field-input">
              <option value="">— เลือก HRBP —</option>
              <option>คุณนภสร ว. (HRBP — CEN)</option>
              <option>คุณจรัสกาญจน์ ส. (HRBP — TOPS)</option>
              <option>คุณวิทยา ธ. (HRBP — Power Buy)</option>
            </select>
          </div>
          <label className="humi-row" style={{ gap: 8, gridColumn: "1 / -1" }}>
            <input type="checkbox" defaultChecked readOnly style={{ width: 16, height: 16, accentColor: "var(--color-accent)" }}/>
            <span style={{ fontSize: 14, color: "var(--color-ink)" }}>แจ้งเตือน HRBP ทางอีเมลเมื่อ Hire บันทึกสำเร็จ</span>
          </label>
          <p style={{ fontSize: 11, color: "var(--color-ink-faint)", gridColumn: "1 / -1", margin: 0 }}>
            ระบบจะส่ง email แจ้ง HRBP พร้อม audit trail (Chain 2 · BRD #109)
          </p>
        </div>
      </section>

      {/* ── สรุปข้อมูลก่อนส่ง ── */}
      <section id="review.summary" className="humi-card humi-card--cream" style={{ marginBottom: 20, borderRadius: 22 }}>
        <CheckpointHeader icon={I.fileText} title="สรุปข้อมูลก่อนส่ง" sub="ตรวจสอบความครบถ้วนของทุกหัวข้อ"/>
        <div>
          <SummaryRow label="วันที่เริ่มงาน"        value="15 มิ.ย. 2569"                ok={true}/>
          <SummaryRow label="บริษัท"               value="CEN — Central Retail"        ok={true}/>
          <SummaryRow label="เหตุผลการจ้าง"          value="NEW_HIRE — จ้างใหม่"           ok={true}/>
          <SummaryRow label="คำนำหน้า (EN)"         value="—"                          ok={false}/>
          <SummaryRow label="ชื่อ-นามสกุล (EN)"      value="—"                          ok={false}/>
          <SummaryRow label="วันเกิด"               value="14 มี.ค. 2538 (อายุ 31)"      ok={true}/>
          <SummaryRow label="รหัสพนักงาน"           value="สร้างหลัง Submit"             ok={true}/>
          <SummaryRow label="Username (auto)"       value="—"                          ok={false}/>
          <SummaryRow label="ประเภทบัตร"            value="NATIONAL_ID"                ok={true}/>
          <SummaryRow label="เลขบัตรประชาชน"        value="—"                          ok={false}/>
          <SummaryRow label="ประเทศที่ออกบัตร"      value="TH — ไทย"                    ok={true}/>
          <SummaryRow label="บัตรหลัก"             value="YES"                        ok={true}/>
          <SummaryRow label="คำนำหน้า (ไทย)"        value="—"                          ok={false}/>
          <SummaryRow label="ชื่อ-นามสกุล (ไทย)"     value="—"                          ok={false}/>
          <SummaryRow label="ชื่อเล่น"              value="—"                          ok={false}/>
          <SummaryRow label="เพศ"                  value="—"                          ok={false}/>
          <SummaryRow label="สัญชาติ"              value="—"                          ok={false}/>
          <SummaryRow label="กรุ๊ปเลือด"            value="—"                          ok={false}/>
          <SummaryRow label="สถานภาพสมรส"          value="—"                          ok={false}/>
          <SummaryRow label="Employee Class"       value="—"                          ok={false}/>
          <SummaryRow label="ตำแหน่ง"              value="—"                          ok={false}/>
          <SummaryRow label="ค่าตอบแทน (เงินเดือน)" value="—"                          ok={false}/>
          <SummaryRow label="Direct Manager (Approver)" value="ยังไม่ได้เลือก"          ok={false}/>
          <SummaryRow label="HRBP ผู้รับผิดชอบ"     value="ยังไม่ได้เลือก"               ok={false}/>
        </div>
      </section>
    </div>
  );
}
