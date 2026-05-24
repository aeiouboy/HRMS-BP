// admin_employee_drawer.jsx — slide-in detail drawer (SF Employee File pattern)
function AdminEmployeeDrawer({ Ic, employee, onClose }) {
  const [tab, setTab] = React.useState("personal");
  if (!employee) return null;
  const e = employee;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:"fixed", inset: 0, background:"rgba(20, 18, 14, 0.4)", zIndex: 90, animation:"fadeIn .15s"}}/>

      {/* Drawer */}
      <div style={{position:"fixed", top: 0, right: 0, bottom: 0, width: "min(720px, 92vw)", background:"var(--paper)", zIndex: 91, boxShadow:"-12px 0 40px rgba(0,0,0,0.12)", display:"flex", flexDirection:"column", animation:"slideInRight .2s ease-out"}}>

        {/* Header */}
        <div style={{padding: "18px 24px", borderBottom:"1px solid var(--line-2)", background:`linear-gradient(110deg, var(--accent-soft) 0%, var(--cream-2) 100%)`}}>
          <div className="row">
            <div className="row" style={{gap: 14, flex: 1, minWidth: 0}}>
              <div className={"avatar " + e.col} style={{width: 56, height: 56, fontSize: 18, flexShrink: 0}}>{e.c}</div>
              <div style={{minWidth: 0}}>
                <div className="row" style={{gap: 8, marginBottom: 4}}>
                  <span style={{fontFamily:"monospace", fontSize: 12, color:"var(--ink-3)"}}>{e.id}</span>
                  <span className={"tag " + (window.AdminData.STATUS[e.s].t)} style={{fontSize: 11}}>{window.AdminData.STATUS[e.s].l}</span>
                </div>
                <h2 style={{fontSize: 24, letterSpacing:"-0.01em"}}>{e.n}</h2>
                <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 2}}>{e.r} · {e.b}</div>
              </div>
            </div>
            <button onClick={onClose} className="icon-btn" style={{width: 32, height: 32}}><Ic.close size={14}/></button>
          </div>
          <div className="row" style={{marginTop: 14, gap: 8}}>
            <button className="btn btn-primary" style={{fontSize: 13}}><Ic.edit size={13}/> แก้ไขโปรไฟล์</button>
            <button className="btn btn-ghost" style={{fontSize: 13}}><Ic.send size={13}/> ส่งข้อความ</button>
            <button className="btn btn-ghost" style={{fontSize: 13}}>เริ่ม Workflow</button>
            <div className="spacer"/>
            <button className="btn btn-ghost" style={{fontSize: 13, color:"var(--coral)"}}>ปิดบัญชี</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{padding: "0 24px", borderBottom:"1px solid var(--line-2)", background:"var(--paper)"}}>
          <div className="tabs" style={{margin: 0}}>
            {[
              ["personal","ข้อมูลส่วนตัว"],
              ["job","งาน · เงินเดือน"],
              ["benefits","สวัสดิการ"],
              ["history","ประวัติ Workflow"],
              ["permissions","สิทธิ์การเข้าถึง"],
            ].map(([k,l]) => (
              <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)} style={{padding:"12px 4px", fontSize: 13}}>{l}</div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{flex: 1, overflow:"auto", padding: "20px 24px"}}>
          {tab === "personal" && (
            <div className="col" style={{gap: 16}}>
              <Section title="ข้อมูลติดต่อ">
                <Field label="อีเมล" value={e.e}/>
                <Field label="เบอร์โทร" value="081-234-5678"/>
                <Field label="ที่อยู่" value="123 ซ.ทองหล่อ 12 กรุงเทพฯ 10110"/>
                <Field label="ผู้ติดต่อฉุกเฉิน" value="สุภาพร ทานากะ · 089-456-7890"/>
              </Section>
              <Section title="ข้อมูลส่วนตัว">
                <Field label="วันเกิด" value="14 มี.ค. 2535 (อายุ 33)"/>
                <Field label="สัญชาติ" value="ไทย"/>
                <Field label="เลขประจำตัวประชาชน" value="••••••••5478"/>
                <Field label="สถานภาพสมรส" value="สมรส"/>
              </Section>
              <Section title="ผู้อุปการะ · 2 คน">
                <div className="col" style={{gap: 8}}>
                  {[
                    {n:"สุภาพร ทานากะ", r:"คู่สมรส", dob:"22 ก.ค. 2536"},
                    {n:"ด.ช. คาเซะ ทานากะ", r:"บุตร · ชาย", dob:"3 พ.ค. 2563"},
                  ].map(d => (
                    <div key={d.n} className="row" style={{padding: 12, border:"1px solid var(--line-2)", borderRadius: 10}}>
                      <div className="avatar coral" style={{width: 32, height: 32, fontSize: 11}}>{d.n[0]}</div>
                      <div style={{flex: 1}}>
                        <div style={{fontSize: 13, fontWeight: 600}}>{d.n}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)"}}>{d.r} · {d.dob}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {tab === "job" && (
            <div className="col" style={{gap: 16}}>
              <Section title="ตำแหน่งและสาขา">
                <Field label="ตำแหน่ง" value={e.r}/>
                <Field label="สาขา" value={e.b}/>
                <Field label="ผู้จัดการ" value={e.mgr || "-"}/>
                <Field label="ประเภท" value={e.t}/>
                <Field label="วันที่เริ่มงาน" value={e.join}/>
              </Section>
              <Section title="ค่าตอบแทน">
                <Field label="เงินเดือน · เดือนปัจจุบัน" value={`฿${(e.salary || 0).toLocaleString()}`}/>
                <Field label="งวดจ่าย" value="รายเดือน · วันสิ้นเดือน"/>
                <Field label="โบนัสครั้งล่าสุด" value="฿24,000 · ม.ค. 2568"/>
                <Field label="การปรับครั้งล่าสุด" value="+5% · ม.ค. 2568"/>
              </Section>
              <Section title="ตำแหน่งย้อนหลัง">
                <div className="col" style={{gap: 0}}>
                  {[
                    {role:"ผู้จัดการร้าน II", date:"ม.ค. 2568 – ปัจจุบัน", reason:"เลื่อนตำแหน่ง"},
                    {role:"ผู้จัดการร้าน", date:"ก.ค. 2566 – ธ.ค. 2567", reason:"เลื่อนตำแหน่ง"},
                    {role:"ผู้ช่วยผู้จัดการ", date:"ก.ค. 2565 – มิ.ย. 2566", reason:"จ้างครั้งแรก"},
                  ].map((h, i) => (
                    <div key={i} className="row" style={{padding:"10px 0", borderBottom: i < 2 ? "1px solid var(--line-2)" : "none"}}>
                      <div style={{width: 8, height: 8, borderRadius: 4, background: i === 0 ? "var(--accent)" : "var(--line)", marginRight: 12, flexShrink: 0}}/>
                      <div style={{flex: 1}}>
                        <div style={{fontSize: 13, fontWeight: 600}}>{h.role}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{h.date}</div>
                      </div>
                      <span className="tag" style={{fontSize: 11}}>{h.reason}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {tab === "benefits" && (
            <div className="col" style={{gap: 16}}>
              <Section title="แผนสวัสดิการที่ใช้งาน">
                <div className="col" style={{gap: 10}}>
                  {[
                    {n:"Flex Plus", c:"สุขภาพและทันตกรรม · ครอบครัว", since:"1 ม.ค. 2568", color:"var(--accent)"},
                    {n:"กองทุนสำรองเลี้ยงชีพ", c:"5% สมทบ · พอร์ต Balanced", since:"1 ส.ค. 2566", color:"var(--sage)"},
                    {n:"สุขภาวะองค์รวม", c:"ใช้ไปแล้ว ฿380 / ฿600", since:"ปี 2568", color:"var(--butter)"},
                  ].map(b => (
                    <div key={b.n} className="row" style={{padding: 14, border:"1px solid var(--line-2)", borderRadius: 12, gap: 12}}>
                      <div style={{width: 4, alignSelf:"stretch", borderRadius: 2, background: b.color}}/>
                      <div style={{flex: 1}}>
                        <div style={{fontSize: 14, fontWeight: 600}}>{b.n}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{b.c}</div>
                        <div style={{fontSize: 11, color:"var(--ink-4)", marginTop: 4}}>เริ่มใช้ {b.since}</div>
                      </div>
                      <button className="btn btn-ghost" style={{fontSize: 12}}>จัดการ</button>
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="วันลาคงเหลือ · 2568">
                <div className="grid" style={{gridTemplateColumns:"repeat(3, 1fr)", gap: 10}}>
                  {[
                    {l:"พักร้อน", v:"12 / 18 วัน"},
                    {l:"ป่วย", v:"3 / 30 วัน"},
                    {l:"กิจ", v:"2 / 6 วัน"},
                  ].map(s => (
                    <div key={s.l} style={{padding: 12, background:"var(--cream-2)", borderRadius: 10}}>
                      <div className="eyebrow">{s.l}</div>
                      <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4, letterSpacing:"-0.01em"}}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {tab === "history" && (
            <div className="col" style={{gap: 4}}>
              <div className="eyebrow">ประวัติ Workflow · 12 รายการ</div>
              <div className="col" style={{marginTop: 14, gap: 0}}>
                {[
                  {ev:"แก้ไขสวัสดิการ", reason:"เพิ่มผู้อุปการะ", state:"กำลังพิจารณา", date:"30 เม.ย. 2568", t:"butter"},
                  {ev:"ปรับเงินเดือน", reason:"ทบทวนกลางปี", state:"อนุมัติ", date:"1 ม.ค. 2568", t:"sage"},
                  {ev:"เลื่อนตำแหน่ง", reason:"จากผู้จัดการ → ผู้จัดการ II", state:"อนุมัติ", date:"1 ม.ค. 2568", t:"sage"},
                  {ev:"แก้ไขข้อมูลส่วนตัว", reason:"เปลี่ยนเบอร์โทร", state:"เสร็จสิ้น", date:"15 ต.ค. 2567", t:""},
                  {ev:"จ้างงาน", reason:"จ้างครั้งแรก", state:"เสร็จสิ้น", date:"4 ก.ค. 2565", t:""},
                ].map((h, i) => (
                  <div key={i} style={{padding:"14px 0", borderBottom: i < 4 ? "1px solid var(--line-2)" : "", display:"flex", gap: 14, alignItems:"center"}}>
                    <div style={{width: 10, height: 10, borderRadius: 5, background: h.t === "sage" ? "var(--sage)" : h.t === "butter" ? "var(--butter)" : "var(--line)", flexShrink: 0}}/>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 14, fontWeight: 600}}>{h.ev}</div>
                      <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{h.reason} · {h.date}</div>
                    </div>
                    <span className={"tag " + h.t} style={{fontSize: 11}}>{h.state}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "permissions" && (
            <div className="col" style={{gap: 16}}>
              <Section title="บทบาท (Role-Based Permissions)">
                <div className="col" style={{gap: 8}}>
                  {[
                    {l:"พนักงานสาขา", d:"ดู/แก้ไขโปรไฟล์ตัวเอง · ขอลา", on: true},
                    {l:"ผู้จัดการสาขา", d:"อนุมัติคำขอลาในทีม · ดูเงินเดือนทีม", on: e.r.includes("ผู้จัดการ")},
                    {l:"ผู้ดูแลแผน Wellness", d:"อนุมัติเบิกค่าฟิตเนส < ฿2,000", on: false},
                  ].map(r => (
                    <div key={r.l} className="row" style={{padding: 12, border:"1px solid var(--line-2)", borderRadius: 10}}>
                      <div style={{flex: 1}}>
                        <div style={{fontSize: 14, fontWeight: 600}}>{r.l}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{r.d}</div>
                      </div>
                      <span className={"tag " + (r.on ? "sage" : "")}>{r.on ? "เปิดใช้" : "ปิด"}</span>
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="การเข้าถึงระบบครั้งล่าสุด">
                <div className="col" style={{gap: 8, fontSize: 13}}>
                  <div className="row"><span style={{color:"var(--ink-3)", flex: 1}}>เว็บ · เบราว์เซอร์ Chrome</span><span>30 เม.ย. 13:42</span></div>
                  <div className="row"><span style={{color:"var(--ink-3)", flex: 1}}>มือถือ · iOS App</span><span>30 เม.ย. 08:11</span></div>
                  <div className="row"><span style={{color:"var(--ink-3)", flex: 1}}>POS Terminal · สาขาทองหล่อ</span><span>29 เม.ย. 22:00</span></div>
                </div>
              </Section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="eyebrow" style={{marginBottom: 10}}>{title}</div>
      <div className="card" style={{padding: 16}}>{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="row" style={{padding:"8px 0", borderBottom:"1px solid var(--line-2)", fontSize: 13}}>
      <span style={{color:"var(--ink-3)", width: 160, flexShrink: 0}}>{label}</span>
      <span style={{color:"var(--ink-2)", fontWeight: 500}}>{value}</span>
    </div>
  );
}

window.AdminEmployeeDrawer = AdminEmployeeDrawer;
