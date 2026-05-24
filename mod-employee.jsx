// ============= MODULE 1: EMPLOYEE CENTER =============

// 1A · EMPLOYEE — โปรไฟล์ของฉัน
function EC_Employee({ initialTab = "personal" }) {
  const I = window.PI;
  const [tab, setTab] = React.useState(initialTab);
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Employee Center · มุมพนักงาน"
        title="โปรไฟล์ของฉัน"
        subtitle="ดูและแก้ไขข้อมูลส่วนตัว เอกสาร และการตั้งค่าบัญชี"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> ดาวน์โหลด PDF</button>
          <button className="humi-button humi-button--primary"><I.edit size={14}/> แก้ไขโปรไฟล์</button>
        </>}/>

      {/* Hero card */}
      <div className="humi-card humi-grain" style={{display:"grid", gridTemplateColumns:"auto 1fr auto", gap: 24, alignItems:"center", overflow:"hidden", position:"relative"}}>
        <div className="humi-blob humi-blob--teal" style={{width: 130, height: 160, right: -40, top: -40, opacity: 0.5}}/>
        <div style={{width: 96, height: 96, borderRadius: "50%", background:"linear-gradient(135deg,#1FA8A0,#9BB5A0)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize: 34, fontWeight: 700}}>MS</div>
        <div>
          <div className="humi-eyebrow">Employee ID · E-58231</div>
          <h2 style={{fontFamily:"var(--font-display)", fontSize: 26, marginTop: 4, fontWeight: 600}}>มาริสา สงวนศักดิ์ <span style={{color:"var(--color-ink-muted)", fontWeight: 400, fontSize: 18}}>· Marisa Sa-nguansak</span></h2>
          <div className="humi-row" style={{marginTop: 10, gap: 18, fontSize: 14, color:"var(--color-ink-soft)"}}>
            <span><b>ตำแหน่ง</b> · Cashier · ระดับ 3</span>
            <span style={{width: 1, height: 14, background:"var(--color-hairline)"}}/>
            <span><b>สาขา</b> · Central World</span>
            <span style={{width: 1, height: 14, background:"var(--color-hairline)"}}/>
            <span><b>เริ่มงาน</b> · 12 ก.ย. 2566</span>
          </div>
          <div className="humi-row" style={{marginTop: 10, gap: 6}}>
            <span className="humi-tag humi-tag--accent">พนักงานประจำ</span>
            <span className="humi-tag humi-tag--cream">ผ่านทดลองงาน</span>
            <span className="humi-tag humi-tag--butter">รออัปเดต PND91</span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="humi-eyebrow">อายุงาน</div>
          <div style={{fontFamily:"var(--font-display)", fontSize: 32, fontWeight: 700, color:"var(--color-accent)"}}>2 ปี 7 ด.</div>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{marginTop: 24, marginBottom: 18}}>
        <window.SegTabs active={tab} onChange={setTab} tabs={[
          {id:"personal", label:"ข้อมูลส่วนตัว"},
          {id:"job", label:"ข้อมูลงาน"},
          {id:"docs", label:"เอกสาร", count: 14},
          {id:"benefits", label:"สิทธิประโยชน์"},
          {id:"emergency", label:"ผู้ติดต่อฉุกเฉิน"},
          {id:"org", label:"ผังองค์กร"},
        ]}/>
      </div>

      {tab === "org" && (
        <window.OrgChartView focusedId="marisa" embed/>
      )}

      {tab !== "org" && (
      <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
        {/* Personal Info */}
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 16}}>
            <h3 className="humi-section-title">ข้อมูลส่วนตัว</h3>
            <span className="humi-spacer"/>
            <span className="humi-tag humi-tag--cream"><I.shield size={11}/> เข้ารหัส</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", rowGap: 16, columnGap: 24}}>
            {[
              ["ชื่อ-สกุล (TH)", "นางสาว มาริสา สงวนศักดิ์"],
              ["ชื่อ-สกุล (EN)", "Ms. Marisa Sa-nguansak"],
              ["วันเกิด", "14 มีนาคม 2538 (อายุ 30)"],
              ["เลขประจำตัวประชาชน", "1-1014-•••••-3-9"],
              ["เพศ", "หญิง"],
              ["สัญชาติ", "ไทย"],
              ["ศาสนา", "พุทธ"],
              ["สถานภาพสมรส", "โสด"],
            ].map(([l,v]) => (
              <div key={l}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
                <div style={{fontSize: 14, marginTop: 4, fontWeight: 500}}>{v}</div>
              </div>
            ))}
          </div>
          <hr className="humi-divider"/>
          <h4 style={{fontSize: 15, marginBottom: 12, fontFamily:"var(--font-display)", fontWeight: 600}}>ที่อยู่และการติดต่อ</h4>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", rowGap: 16, columnGap: 24}}>
            {[
              ["เบอร์โทร", "+66 89-•••-4521"],
              ["อีเมล", "marisa.s@central.co.th"],
              ["ที่อยู่ตามบัตร", "245/11 ซ.รัชดาภิเษก 32, ดินแดง, กรุงเทพฯ 10400"],
              ["ที่อยู่ปัจจุบัน", "ตรงกับที่อยู่ตามบัตร"],
            ].map(([l,v]) => (
              <div key={l} style={{gridColumn: l.startsWith("ที่อยู่") ? "1 / -1" : "auto"}}>
                <div className="humi-eyebrow" style={{fontSize: 10}}>{l}</div>
                <div style={{fontSize: 14, marginTop: 4, fontWeight: 500}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tasks + Quick links */}
        <div className="humi-col" style={{gap: 20}}>
          <div className="humi-card humi-card--cream">
            <div className="humi-eyebrow">ต้องอัปเดต</div>
            <h3 style={{marginTop: 6, fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 12}}>2 รายการรอคุณ</h3>
            {[
              {t:"PND91 ปี 2567 · ยืนยันรายได้", s:"ครบกำหนด 30 เม.ย.", urgent: true},
              {t:"ที่อยู่ปัจจุบันยังตรงกับบัตร?", s:"ทบทวนทุก 6 เดือน", urgent: false},
            ].map(d => (
              <div key={d.t} className="humi-row" style={{padding:"12px 0", borderTop:"1px solid var(--color-hairline-soft)"}}>
                <div style={{width: 32, height: 32, borderRadius: 8, background:"var(--color-surface)", border:"1px solid var(--color-hairline)", display:"flex", alignItems:"center", justifyContent:"center", color: d.urgent ? "var(--color-warning)" : "var(--color-ink-muted)"}}>
                  {d.urgent ? <I.warn size={15}/> : <I.fileText size={15}/>}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>{d.t}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{d.s}</div>
                </div>
                <I.chevR size={14} style={{color:"var(--color-ink-muted)"}}/>
              </div>
            ))}
          </div>

          <div className="humi-card">
            <h3 className="humi-section-title">เอกสาร · ล่าสุด</h3>
            <div className="humi-section-sub">14 ฉบับในแฟ้ม · เก็บถาวร 5 ปี</div>
            <div style={{marginTop: 12}}>
              {[
                {n:"สัญญาจ้างงาน 2566.pdf", d:"12 ก.ย. 66", ic:"pdf"},
                {n:"ใบรับรองเงินเดือน_มี.ค.68.pdf", d:"05 มี.ค. 68", ic:"pdf"},
                {n:"PND91_ปี66.pdf", d:"30 มี.ค. 67", ic:"pdf"},
              ].map(f => (
                <div key={f.n} className="humi-row" style={{padding:"10px 0", borderTop:"1px solid var(--color-hairline-soft)"}}>
                  <div style={{width: 28, height: 32, borderRadius: 5, background:"var(--color-warning-soft)", color:"var(--color-warning)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <I.fileText size={13}/>
                  </div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 13, fontWeight: 600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{f.n}</div>
                    <div style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{f.d}</div>
                  </div>
                  <button className="humi-icon-btn" style={{width: 30, height: 30}}><I.download size={13}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
window.EC_Employee = EC_Employee;

// 1B · MANAGER — ทีมของฉัน
function EC_Manager() {
  const I = window.PI;
  const team = [
    { id:"E-58231", n:"มาริสา สงวนศักดิ์",  r:"Cashier",        s:"ทำงาน", c:"teal",   y:"2 ปี 7 ด.", review:"กลางปี", rating:4.2 },
    { id:"E-49102", n:"ธีรพัฒน์ มงคล",      r:"Senior Cashier", s:"ทำงาน", c:"sage",   y:"4 ปี 1 ด.", review:"ปลายปี", rating:4.5 },
    { id:"E-61480", n:"กัลยา ภูวดล",         r:"Sales Asst.",    s:"ลาป่วย", c:"butter", y:"1 ปี 3 ด.", review:"กลางปี", rating:3.8 },
    { id:"E-72915", n:"ปรีชา วรพงษ์",       r:"Floor Staff",     s:"ทำงาน", c:"ink",    y:"7 ด.",      review:"ทดลองงาน", rating: null },
    { id:"E-58102", n:"นิภาพร แสนสุข",      r:"Cashier",        s:"ทำงาน", c:"coral",  y:"3 ปี 4 ด.", review:"กลางปี", rating:4.0 },
    { id:"E-66770", n:"อัมพร โพธิ์ทอง",     r:"Sales Asst.",    s:"OT",     c:"teal",   y:"2 ปี",       review:"กลางปี", rating:4.1 },
  ];
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Employee Center · มุมผู้จัดการ"
        title="ทีมของฉัน · CTW Floor 1"
        subtitle="14 คนในทีม · 12 อยู่ทำงานวันนี้ · 1 ลาป่วย · 1 ลาพักร้อน"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> Export</button>
          <button className="humi-button humi-button--primary"><I.send size={14}/> ส่งข้อความถึงทีม</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="หัวคนในทีม" value="14" sub="+2 จากเดือนก่อน" icon="users"/>
        <window.StatCard label="อยู่ทำงานวันนี้" value="12" sub="86% ของทีม" accent="var(--color-accent)" icon="check"/>
        <window.StatCard label="คะแนนเฉลี่ย" value="4.1" sub="รอบกลางปี · จาก 13 คน" icon="star"/>
        <window.StatCard label="รออนุมัติ" value="3" sub="ลา 2 · OT 1" accent="var(--color-warning)" icon="bell"/>
      </div>

      <div className="humi-card">
        <div className="humi-row" style={{marginBottom: 16}}>
          <h3 className="humi-section-title">รายชื่อทีม</h3>
          <span className="humi-spacer"/>
          <div style={{position:"relative"}}>
            <input className="field-input" placeholder="ค้นหาในทีม…" style={{padding:"8px 12px 8px 34px", width: 240}}/>
            <I.search size={14} style={{position:"absolute", left: 11, top: "50%", transform:"translateY(-50%)", color:"var(--color-ink-muted)"}}/>
          </div>
          <button className="humi-button humi-button--ghost" style={{padding:"8px 12px"}}><I.filter size={13}/> กรอง</button>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"60px 2fr 1.4fr 1fr 1fr 1fr 80px", padding:"10px 14px", borderTop:"1px solid var(--color-hairline-soft)", borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)", borderRadius: 8, fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".08em", textTransform:"uppercase"}}>
          <div></div>
          <div>ชื่อ · รหัส</div>
          <div>ตำแหน่ง</div>
          <div>สถานะวันนี้</div>
          <div>อายุงาน</div>
          <div>รอบประเมิน</div>
          <div style={{textAlign:"right"}}>คะแนน</div>
        </div>
        {team.map(t => (
          <div key={t.id} style={{display:"grid", gridTemplateColumns:"60px 2fr 1.4fr 1fr 1fr 1fr 80px", padding:"14px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
            <span className={"humi-avatar humi-avatar--" + t.c} style={{width: 36, height: 36, fontSize: 13}}>{t.n.split(" ")[0].slice(0,2)}</span>
            <div>
              <div style={{fontWeight: 600, fontSize: 14}}>{t.n}</div>
              <div style={{fontSize: 11, color:"var(--color-ink-faint)", letterSpacing:".04em"}}>{t.id}</div>
            </div>
            <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{t.r}</div>
            <div>
              <span className={"humi-tag " + (t.s==="ทำงาน" ? "humi-tag--accent" : t.s==="OT" ? "humi-tag--butter" : "humi-tag--coral")}>
                {t.s === "ทำงาน" && <span style={{width:6,height:6,borderRadius:99,background:"var(--color-accent)"}}/>}
                {t.s}
              </span>
            </div>
            <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{t.y}</div>
            <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{t.review}</div>
            <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontWeight: 700, fontSize: 16, color: t.rating ? "var(--color-ink)" : "var(--color-ink-faint)"}}>
              {t.rating != null ? t.rating.toFixed(1) : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.EC_Manager = EC_Manager;

// 1C · ADMIN — ทะเบียนพนักงาน (directory)
function EC_Admin() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Employee Center · มุม HR Admin"
        title="ทะเบียนพนักงาน"
        subtitle="2,847 คนทั่วประเทศ · ใช้งานอยู่ 2,791 · พ้นสภาพปีนี้ 56"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.upload size={14}/> นำเข้า CSV</button>
          <button className="humi-button humi-button--ghost"><I.download size={14}/> Export</button>
          <button className="humi-button humi-button--primary"><I.plus size={14}/> เพิ่มพนักงานใหม่</button>
        </>}/>

      {/* Filter rail + table */}
      <div style={{display:"grid", gridTemplateColumns:"240px 1fr", gap: 20}}>
        <aside className="humi-card" style={{padding: 18, alignSelf:"start"}}>
          <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginBottom: 12, fontWeight: 600}}>กรอง</h4>
          {[
            {l:"สถานะ", opts:[["ใช้งาน", 2791, true], ["พ้นสภาพ", 56], ["ทดลองงาน", 138]]},
            {l:"ประเภทพนักงาน", opts:[["ประจำ", 2104, true], ["รายวัน/PT", 612], ["Outsource", 75]]},
            {l:"สาขา/หน่วยงาน", opts:[["CTW", 312], ["Chidlom", 287], ["Embassy", 198], ["+ 28 แห่ง"]]},
          ].map(g => (
            <div key={g.l} style={{marginBottom: 18}}>
              <div className="humi-eyebrow" style={{fontSize: 10, marginBottom: 8}}>{g.l}</div>
              {g.opts.map(o => (
                <label key={o[0]} className="humi-row" style={{padding:"6px 0", cursor:"pointer", fontSize: 13}}>
                  <input type="checkbox" defaultChecked={o[2]} style={{accentColor:"var(--color-accent)"}}/>
                  <span style={{flex: 1, color:"var(--color-ink-soft)"}}>{o[0]}</span>
                  {o[1] && <span style={{fontSize: 11, color:"var(--color-ink-faint)", fontWeight: 600}}>{o[1].toLocaleString()}</span>}
                </label>
              ))}
            </div>
          ))}
          <hr className="humi-divider"/>
          <button className="humi-button humi-button--ghost" style={{width: "100%", justifyContent:"center"}}>ล้างตัวกรอง</button>
        </aside>

        <div>
          <div className="humi-row" style={{marginBottom: 14}}>
            <div className="humi-row" style={{gap: 8, flexWrap:"wrap"}}>
              <span className="humi-tag humi-tag--ink">ใช้งาน <I.x size={11} style={{marginLeft: 2}}/></span>
              <span className="humi-tag humi-tag--ink">ประจำ <I.x size={11} style={{marginLeft: 2}}/></span>
              <span style={{fontSize: 13, color:"var(--color-ink-muted)"}}>2,104 คน</span>
            </div>
            <span className="humi-spacer"/>
            <window.SegTabs active="table" tabs={[{id:"table", label:"ตาราง"},{id:"card", label:"การ์ด"},{id:"org", label:"ผังองค์กร"}]}/>
          </div>

          <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
            <div style={{display:"grid", gridTemplateColumns:"36px 56px 2fr 1.4fr 1.2fr 1fr 1fr 40px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase", alignItems:"center"}}>
              <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
              <div></div>
              <div>ชื่อ · รหัส</div>
              <div>ตำแหน่ง · สาขา</div>
              <div>ผู้จัดการ</div>
              <div>เริ่มงาน</div>
              <div>สถานะ</div>
              <div></div>
            </div>
            {[
              { id:"E-58231", n:"มาริสา สงวนศักดิ์", r:"Cashier · CTW",         m:"อาทิตย์ ช.",  d:"12 ก.ย. 66", s:"ใช้งาน",   c:"teal" },
              { id:"E-72915", n:"ปรีชา วรพงษ์",      r:"Floor Staff · CTW",     m:"อาทิตย์ ช.",  d:"22 ต.ค. 67", s:"ทดลองงาน", c:"butter" },
              { id:"E-49102", n:"ธีรพัฒน์ มงคล",      r:"Senior Cashier · CTW",  m:"อาทิตย์ ช.",  d:"05 มี.ค. 64", s:"ใช้งาน",   c:"sage" },
              { id:"E-61480", n:"กัลยา ภูวดล",         r:"Sales Asst. · CTW",     m:"อาทิตย์ ช.",  d:"18 ม.ค. 67", s:"ใช้งาน",   c:"coral" },
              { id:"E-58102", n:"นิภาพร แสนสุข",      r:"Cashier · Chidlom",     m:"วรพล จ.",     d:"02 พ.ย. 64", s:"ใช้งาน",   c:"ink" },
              { id:"E-44210", n:"สมศักดิ์ ไทยใจดี",   r:"Stockroom · Embassy",   m:"จิรา ป.",     d:"15 มิ.ย. 63", s:"ใช้งาน",   c:"teal" },
              { id:"E-66770", n:"อัมพร โพธิ์ทอง",     r:"Sales Asst. · CTW",     m:"อาทิตย์ ช.",  d:"08 พ.ค. 66", s:"ใช้งาน",   c:"butter" },
            ].map(r => (
              <div key={r.id} style={{display:"grid", gridTemplateColumns:"36px 56px 2fr 1.4fr 1.2fr 1fr 1fr 40px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
                <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
                <span className={"humi-avatar humi-avatar--" + r.c} style={{width: 36, height: 36, fontSize: 12}}>{r.n.split(" ")[0].slice(0,2)}</span>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{r.n}</div>
                  <div style={{fontSize: 11, color:"var(--color-ink-faint)", letterSpacing:".04em"}}>{r.id}</div>
                </div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{r.r}</div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{r.m}</div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{r.d}</div>
                <div>
                  <span className={"humi-tag " + (r.s === "ทดลองงาน" ? "humi-tag--butter" : "humi-tag--accent")}>{r.s}</span>
                </div>
                <button className="humi-icon-btn" style={{width: 30, height: 30}}><I.more size={14}/></button>
              </div>
            ))}
            <div className="humi-row" style={{padding:"14px 18px", background:"var(--color-canvas-soft)"}}>
              <span style={{fontSize: 13, color:"var(--color-ink-muted)"}}>แสดง 1–7 จาก 2,104</span>
              <span className="humi-spacer"/>
              <button className="humi-icon-btn" style={{width: 32, height: 32}}><I.chevL size={13}/></button>
              <button className="humi-icon-btn" style={{width: 32, height: 32, marginLeft: 4}}><I.chevR size={13}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.EC_Admin = EC_Admin;

// 1D · HRIS — Master data configuration
function EC_Hris() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Employee Center · มุม HRIS"
        title="ข้อมูลแม่บท · โครงสร้างพนักงาน"
        subtitle="กำหนดแบบฟอร์ม รหัสตำแหน่ง โครงสร้างองค์กร และ field ที่ใช้ในระบบ HR ทั้งหมด"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.copy size={14}/> ดู Audit log</button>
          <button className="humi-button humi-button--primary"><I.save size={14}/> เผยแพร่การเปลี่ยนแปลง</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"280px 1fr", gap: 20}}>
        <aside style={{position:"sticky", top: 90, alignSelf:"start"}}>
          {[
            {l:"โครงสร้าง", items:[
              {n:"Job Catalog", c:"342 ตำแหน่ง", active: true},
              {n:"Org Tree", c:"6 BU · 38 สาขา"},
              {n:"Pay Grade", c:"12 ระดับ"},
              {n:"Cost Center", c:"148 รายการ"},
            ]},
            {l:"ฟิลด์และแบบฟอร์ม", items:[
              {n:"Employee Fields", c:"86 ฟิลด์"},
              {n:"Custom Forms", c:"24 ฟอร์ม"},
              {n:"Code Tables", c:"54 ตาราง"},
            ]},
            {l:"การเข้าถึง", items:[
              {n:"Roles & Permissions", c:"18 บทบาท"},
              {n:"Audit & Compliance"},
            ]},
          ].map(g => (
            <div key={g.l} style={{marginBottom: 22}}>
              <div className="humi-eyebrow" style={{fontSize: 10, marginBottom: 8}}>{g.l}</div>
              <div className="humi-col" style={{gap: 2}}>
                {g.items.map(it => (
                  <div key={it.n} className="humi-row" style={{padding:"10px 12px", borderRadius: 8, background: it.active ? "var(--color-accent-soft)" : "transparent", cursor:"pointer"}}>
                    <span style={{flex: 1}}>
                      <div style={{fontSize: 13, fontWeight: 600, color: it.active ? "var(--color-ink)" : "var(--color-ink-soft)"}}>{it.n}</div>
                      {it.c && <div style={{fontSize: 11, color:"var(--color-ink-muted)", marginTop: 1}}>{it.c}</div>}
                    </span>
                    {it.active && <I.chevR size={12} style={{color:"var(--color-accent)"}}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <div>
          <div className="humi-card" style={{marginBottom: 20}}>
            <div className="humi-row" style={{marginBottom: 4}}>
              <div>
                <div className="humi-eyebrow">/ โครงสร้าง / Job Catalog</div>
                <h3 style={{marginTop: 6, fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 600}}>Job Catalog</h3>
                <div className="humi-section-sub">342 ตำแหน่ง · เผยแพร่ล่าสุด 12 พ.ค. 68 · มี 4 รายการรอเผยแพร่</div>
              </div>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--ghost"><I.upload size={14}/> นำเข้า</button>
              <button className="humi-button humi-button--primary"><I.plus size={14}/> เพิ่มตำแหน่ง</button>
            </div>
          </div>

          <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
            <div style={{display:"grid", gridTemplateColumns:"120px 2fr 1fr 1fr 1.2fr 100px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
              <div>Job Code</div>
              <div>ตำแหน่ง</div>
              <div>Pay Grade</div>
              <div>Family</div>
              <div>ใช้งานโดย</div>
              <div></div>
            </div>
            {[
              {c:"CSH-L1", n:"Cashier · L1",         g:"G2", f:"Store Ops", u:"612 คน", status:"published"},
              {c:"CSH-L2", n:"Senior Cashier · L2",  g:"G3", f:"Store Ops", u:"248 คน", status:"published"},
              {c:"CSH-L3", n:"Cashier Lead · L3",    g:"G4", f:"Store Ops", u:"42 คน",  status:"draft"},
              {c:"SAL-L1", n:"Sales Associate · L1", g:"G2", f:"Store Ops", u:"884 คน", status:"published"},
              {c:"SAL-L2", n:"Senior Sales · L2",    g:"G3", f:"Store Ops", u:"196 คน", status:"published"},
              {c:"STK-L1", n:"Stockroom · L1",       g:"G2", f:"Store Ops", u:"312 คน", status:"published"},
            ].map(j => (
              <div key={j.c} style={{display:"grid", gridTemplateColumns:"120px 2fr 1fr 1fr 1.2fr 100px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
                <div style={{fontFamily:"ui-monospace, SF Mono, monospace", fontSize: 12, fontWeight: 600, color:"var(--color-accent)"}}>{j.c}</div>
                <div style={{fontWeight: 600, fontSize: 14}}>{j.n}</div>
                <div style={{fontSize: 13}}><span className="humi-tag humi-tag--cream" style={{padding:"2px 8px"}}>{j.g}</span></div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{j.f}</div>
                <div style={{fontSize: 13, color:"var(--color-ink-soft)"}}>{j.u}</div>
                <div>
                  {j.status === "draft"
                    ? <span className="humi-tag humi-tag--butter">รอเผยแพร่</span>
                    : <span className="humi-tag humi-tag--cream" style={{color:"var(--color-ink-muted)"}}>เผยแพร่แล้ว</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="humi-card humi-card--cream" style={{marginTop: 20, padding: 18}}>
            <div className="humi-row" style={{alignItems:"flex-start"}}>
              <div style={{width: 40, height: 40, borderRadius: 10, background:"var(--color-warning-soft)", color:"var(--color-warning)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}><I.warn size={18}/></div>
              <div style={{flex: 1}}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 15, fontWeight: 600}}>4 รายการรอเผยแพร่ · จะส่งผลต่อ 42 พนักงาน</div>
                <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 4}}>
                  CSH-L3 (ใหม่), SAL-L2 (แก้คำอธิบาย), STK-L2 (เปลี่ยน Pay Grade), DM-L1 (ลบ) — ตรวจการเปลี่ยนแปลงก่อนเผยแพร่
                </div>
              </div>
              <button className="humi-button humi-button--ghost">ตรวจรายการ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.EC_Hris = EC_Hris;

// 1E · SPD — ตรวจสอบเอกสาร
function EC_Spd() {
  const I = window.PI;
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Employee Center · มุม SPD"
        title="คิวตรวจเอกสารพนักงาน"
        subtitle="38 เคสรอตรวจ · SLA 24 ชม. · ตรวจเสร็จวันนี้ 14 เคส"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.refresh size={14}/> รีเฟรช</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> รับเคสถัดไป</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="รอตรวจ" value="38" sub="ของ SPD ทีม" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="เกิน SLA" value="3" sub="ต้องเร่ง" accent="var(--color-danger)" icon="warn"/>
        <window.StatCard label="ตรวจวันนี้" value="14" sub="ฉัน 6 · ทีม 8" icon="check"/>
        <window.StatCard label="ตีกลับ" value="2" sub="รออัปโหลดใหม่" icon="refresh"/>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap: 20}}>
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
            <div className="humi-row">
              <h3 className="humi-section-title">คิวของฉัน</h3>
              <span className="humi-spacer"/>
              <window.SegTabs active="all" tabs={[
                {id:"all", label:"ทั้งหมด", count: 38},
                {id:"new", label:"ใหม่", count: 12},
                {id:"overdue", label:"เกินกำหนด", count: 3},
              ]}/>
            </div>
          </div>
          {[
            { c:"DOC-2891", n:"ปรีชา วรพงษ์",     id:"E-72915", t:"สำเนาบัตรประชาชน",     a:"2 ชม.ก่อน",   sla:"22 ชม.",  p:"new" },
            { c:"DOC-2890", n:"กาญจนา ใจดี",      id:"E-71204", t:"สำเนาทะเบียนบ้าน",      a:"3 ชม.ก่อน",   sla:"21 ชม.",  p:"new" },
            { c:"DOC-2872", n:"วันชัย วชิรา",     id:"E-69912", t:"PND91 ปี 2567",         a:"1 วันก่อน",   sla:"เกิน 2 ชม.", p:"overdue" },
            { c:"DOC-2855", n:"นภัสรา ธารทอง",   id:"E-67830", t:"ใบรับรองแพทย์",          a:"1 วันก่อน",   sla:"5 ชม.",   p:"normal" },
            { c:"DOC-2849", n:"พีรพล ตั้งศิริ",   id:"E-66012", t:"ใบประกอบโรคศิลปะ",       a:"2 วันก่อน",   sla:"เกิน 1 วัน", p:"overdue" },
          ].map(c => (
            <div key={c.c} style={{padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", display:"grid", gridTemplateColumns:"auto 1fr auto", gap: 14, alignItems:"center"}}>
              <div style={{width: 40, height: 50, borderRadius: 6, background:"var(--color-warning-soft)", color:"var(--color-warning)", display:"flex", alignItems:"center", justifyContent:"center"}}><I.fileText size={18}/></div>
              <div>
                <div className="humi-row" style={{gap: 8}}>
                  <span style={{fontFamily:"ui-monospace, monospace", fontSize: 11, color:"var(--color-ink-muted)", fontWeight: 600}}>{c.c}</span>
                  <span style={{fontWeight: 600, fontSize: 14}}>{c.t}</span>
                </div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)", marginTop: 3}}>
                  {c.n} · {c.id} · ส่งเมื่อ {c.a}
                </div>
              </div>
              <div className="humi-row" style={{gap: 10}}>
                <span className={"humi-tag " + (c.p === "overdue" ? "humi-tag--coral" : c.p === "new" ? "humi-tag--accent" : "humi-tag--cream")}>SLA {c.sla}</span>
                <button className="humi-button humi-button--primary" style={{padding:"6px 12px", fontSize: 12, minHeight: 32}}>ตรวจ</button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification panel preview */}
        <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)", background:"var(--color-canvas-soft)"}}>
            <div className="humi-eyebrow">เคสที่เปิดอยู่</div>
            <h3 style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 4}}>DOC-2891 · สำเนาบัตรประชาชน</h3>
            <div className="humi-row" style={{gap: 10, marginTop: 10, fontSize: 13, color:"var(--color-ink-soft)"}}>
              <span><b>ปรีชา วรพงษ์</b> · E-72915</span>
              <span style={{width: 1, height: 12, background:"var(--color-hairline)"}}/>
              <span>Floor Staff · CTW</span>
            </div>
          </div>

          {/* Doc preview */}
          <div style={{padding: 18}}>
            <div style={{background:"var(--color-canvas)", borderRadius: 10, border:"1px dashed var(--color-hairline)", height: 200, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", color:"var(--color-ink-muted)", fontFamily:"ui-monospace, monospace", fontSize: 12}}>
              <I.fileText size={28} style={{marginBottom: 8}}/>
              ภาพสแกนบัตรประชาชน · หน้า 1/1
              <div style={{marginTop: 6}}>1080 × 1620 · 2.4 MB</div>
            </div>

            <h4 style={{fontFamily:"var(--font-display)", fontSize: 14, marginTop: 18, marginBottom: 10, fontWeight: 600}}>เช็คลิสต์การตรวจ</h4>
            {[
              ["ภาพชัด อ่านได้ครบทุกฟิลด์", true],
              ["ชื่อ-สกุล ตรงกับระบบ (มาริสา/Marisa)", true],
              ["เลขประจำตัวประชาชนตรงกับที่บันทึก", true],
              ["บัตรยังไม่หมดอายุ (>30 วัน)", false],
              ["ไม่มีรอยตัด/แต่ง", true],
            ].map(([l, ok], i) => (
              <label key={i} className="humi-row" style={{padding:"8px 0", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 13}}>
                <input type="checkbox" defaultChecked={ok} style={{accentColor: "var(--color-accent)"}}/>
                <span style={{flex: 1, color: ok ? "var(--color-ink)" : "var(--color-warning)"}}>{l}</span>
                {!ok && <I.warn size={13} style={{color:"var(--color-warning)"}}/>}
              </label>
            ))}
          </div>

          <div style={{padding: 14, background:"var(--color-canvas-soft)", borderTop:"1px solid var(--color-hairline-soft)", display:"flex", gap: 8}}>
            <button className="humi-button humi-button--ghost" style={{flex: 1}}><I.x size={14}/> ตีกลับ · ขอใหม่</button>
            <button className="humi-button humi-button--primary" style={{flex: 1.5}}><I.check size={14}/> อนุมัติ · ส่งต่อ HRIS</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.EC_Spd = EC_Spd;
