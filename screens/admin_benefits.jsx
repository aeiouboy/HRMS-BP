// admin_benefits.jsx — Benefit Plans, Eligibility, Enrollment, Audit
function AdminBenefits({ Ic }) {
  const [tab, setTab] = React.useState("plans");

  const PLANS = [
    {n:"Flex Plus", t:"สุขภาพ + ทันตกรรม + สายตา", elig:"พนักงานประจำ · อายุงาน ≥ 90 วัน", enrolled: 1142, cost:"฿2,400/เดือน", win:"1–30 พ.ย. ของทุกปี", c:"var(--accent)"},
    {n:"Flex Core", t:"สุขภาพ (พื้นฐาน)", elig:"พนักงานประจำ · ตั้งแต่วันแรก", enrolled: 287, cost:"฿1,200/เดือน", win:"1–30 พ.ย. ของทุกปี", c:"var(--teal)"},
    {n:"Wellness Stipend", t:"คืนเงินค่าฟิตเนส/สุขภาพจิต ฿600/ปี", elig:"พนักงานประจำ · ตั้งแต่วันแรก", enrolled: 1389, cost:"฿0", win:"ตลอดปี", c:"var(--sage)"},
    {n:"กองทุนสำรองเลี้ยงชีพ", t:"สมทบ 5% · พอร์ต Conservative/Balanced/Growth", elig:"พนักงานประจำ · อายุงาน ≥ 180 วัน", enrolled: 998, cost:"฿0", win:"ทุกไตรมาส", c:"var(--butter)"},
  ];

  return (
    <>
      <div className="tabs" style={{marginBottom: 16}}>
        {[["plans","แผนทั้งหมด"],["eligibility","กฎสิทธิ์ (Eligibility)"],["window","รอบลงทะเบียน"],["lifeevents","Life Events"],["audit","ประวัติการเปลี่ยนแปลง"]].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      {tab === "plans" && (
        <div className="col" style={{gap: 16}}>
          <div className="row">
            <h2>แผนสวัสดิการ · 4 แผน</h2>
            <div className="spacer"/>
            <button className="btn btn-ghost" style={{fontSize: 13}}><Ic.copy size={13}/> ทำสำเนาจากปีก่อน</button>
            <button className="btn btn-primary" style={{fontSize: 13}}>+ สร้างแผนใหม่</button>
          </div>
          <div className="grid" style={{gridTemplateColumns:"repeat(2, 1fr)", gap: 14}}>
            {PLANS.map(p => (
              <div key={p.n} className="card" style={{padding: 18}}>
                <div className="row" style={{alignItems:"flex-start"}}>
                  <div style={{flex: 1}}>
                    <div className="row" style={{gap: 8, marginBottom: 6}}>
                      <span style={{width: 8, height: 8, borderRadius: 4, background: p.c}}/>
                      <h3 style={{fontSize: 17}}>{p.n}</h3>
                    </div>
                    <div style={{fontSize: 13, color:"var(--ink-2)", lineHeight: 1.5}}>{p.t}</div>
                  </div>
                  <span className="tag sage" style={{fontSize: 11}}>เปิดใช้งาน</span>
                </div>
                <div style={{marginTop: 14, padding: 12, background:"var(--cream-2)", borderRadius: 10, fontSize: 12, lineHeight: 1.7}}>
                  <div><b style={{color:"var(--ink-3)"}}>คุณสมบัติ:</b> {p.elig}</div>
                  <div><b style={{color:"var(--ink-3)"}}>รอบ:</b> {p.win}</div>
                  <div><b style={{color:"var(--ink-3)"}}>ต้นทุนบริษัท:</b> {p.cost}</div>
                </div>
                <div className="row" style={{marginTop: 12, gap: 18}}>
                  <div>
                    <div className="eyebrow">ลงทะเบียนแล้ว</div>
                    <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 2}}>{p.enrolled.toLocaleString()}</div>
                  </div>
                  <div className="spacer"/>
                  <button className="btn btn-ghost" style={{fontSize: 13}}>แก้ไข</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "eligibility" && (
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="eyebrow">กฎสิทธิ์ · Rule Builder</div>
            <h2 style={{marginTop: 6}}>กำหนดว่าใครมีสิทธิ์ในแต่ละแผน</h2>
            <div style={{marginTop: 16, padding: 16, border:"1px dashed var(--line)", borderRadius: 12, background:"var(--cream-2)"}}>
              <div style={{fontSize: 13, color:"var(--ink-3)", marginBottom: 12}}>กฎสำหรับแผน <b style={{color:"var(--ink)"}}>Flex Plus</b></div>
              <div className="col" style={{gap: 10}}>
                <RuleRow Ic={Ic} field="ประเภทพนักงาน" op="เท่ากับ" val="ประจำ"/>
                <RuleRow Ic={Ic} field="อายุงาน (วัน)" op="≥" val="90"/>
                <RuleRow Ic={Ic} field="ประเทศที่ทำงาน" op="ใน" val="ไทย, สิงคโปร์, ฮ่องกง"/>
                <RuleRow Ic={Ic} field="สาขา" op="ไม่ใช่" val="สำนักงานใหญ่ (ใช้แผนต่างหาก)"/>
              </div>
              <button className="btn btn-ghost" style={{marginTop: 12, fontSize: 13}}>+ เพิ่มเงื่อนไข</button>
            </div>
            <div className="row" style={{marginTop: 14, padding: 12, background:"var(--accent-soft)", borderRadius: 10}}>
              <Ic.shield size={14}/>
              <span style={{fontSize: 13, marginLeft: 8}}>ผลลัพธ์: <b>1,142 คน</b> เข้าเกณฑ์ · 247 คนไม่เข้าเกณฑ์ · <a style={{color:"var(--accent)"}}>ดูรายชื่อ</a></span>
            </div>
          </div>
        </div>
      )}

      {tab === "window" && (
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="eyebrow">รอบลงทะเบียนเปิด · Open Enrollment 2568</div>
            <h2 style={{marginTop: 6}}>1 – 30 พฤศจิกายน 2568</h2>
            <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 6}}>พนักงานทุกคนต้องยืนยันแผนสวัสดิการของตน · ระบบจะส่งอีเมลและพุชแจ้งเตือนอัตโนมัติ</div>

            <div style={{marginTop: 18, height: 8, borderRadius: 4, background:"var(--line-2)", overflow:"hidden"}}>
              <div style={{height:"100%", width:"68%", background:"linear-gradient(90deg, var(--accent), var(--teal))"}}/>
            </div>
            <div className="row" style={{marginTop: 8, fontSize: 12, color:"var(--ink-3)"}}>
              <span>ลงทะเบียนแล้ว 972 / 1,431 คน · 68%</span>
              <div className="spacer"/>
              <span>เหลือ 6 วัน</span>
            </div>

            <div className="grid" style={{gridTemplateColumns:"repeat(3, 1fr)", gap: 12, marginTop: 18}}>
              <Step n="1" l="ส่งคำเชิญ" d="ส่งไปแล้ว 1,431 ราย" done/>
              <Step n="2" l="ติดตามคนค้าง" d="ส่งซ้ำ 459 ราย" current/>
              <Step n="3" l="ปิดรอบและล็อก" d="30 พ.ย. 23:59"/>
            </div>

            <div className="row" style={{marginTop: 16, gap: 8}}>
              <button className="btn btn-ghost" style={{fontSize: 13}}>ส่งเตือนคนค้าง 459 ราย</button>
              <button className="btn btn-ghost" style={{fontSize: 13}}>ส่งออกรายงาน CSV</button>
              <div className="spacer"/>
              <button className="btn btn-primary" style={{fontSize: 13}}>ตั้งค่ารอบถัดไป</button>
            </div>
          </div>
        </div>
      )}

      {tab === "lifeevents" && (
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="eyebrow">Life Events</div>
            <h2 style={{marginTop: 6}}>เหตุการณ์ที่อนุญาตให้แก้ไขสวัสดิการนอกรอบ</h2>
            <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 6}}>เมื่อพนักงานยืนยันเหตุการณ์เหล่านี้ ระบบจะเปิดหน้าต่าง 30 วันให้แก้แผนได้</div>
            <div className="col" style={{gap: 0, marginTop: 16}}>
              {[
                {l:"สมรส", n:"ต้องแนบทะเบียนสมรส", count: 4, on: true},
                {l:"คลอดบุตรหรือรับบุตรบุญธรรม", n:"ต้องแนบสูติบัตร", count: 2, on: true},
                {l:"คู่สมรสเปลี่ยนงาน", n:"ต้องแนบเอกสารยืนยันสิทธิ์เดิม", count: 1, on: true},
                {l:"การหย่า", n:"ต้องแนบใบหย่า", count: 0, on: true},
                {l:"การเสียชีวิตของผู้อุปการะ", n:"ต้องแนบใบมรณบัตร", count: 0, on: true},
              ].map((ev, i) => (
                <div key={ev.l} className="row" style={{padding:"14px 0", borderBottom: i < 4 ? "1px solid var(--line-2)" : ""}}>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: 14, fontWeight: 600}}>{ev.l}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{ev.n}</div>
                  </div>
                  <span className="tag" style={{fontSize: 11, marginRight: 12}}>ใน 90 วันที่ผ่านมา · {ev.count}</span>
                  <span className={"tag " + (ev.on ? "sage" : "")} style={{fontSize: 11}}>{ev.on ? "เปิด" : "ปิด"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "audit" && (
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">Audit Log</div>
                <h2 style={{marginTop: 6}}>ประวัติการเปลี่ยนแปลงทั้งหมด</h2>
              </div>
              <div className="spacer"/>
              <input placeholder="ค้นพนักงาน, ฟิลด์, ผู้แก้ไข…" className="card" style={{padding:"8px 12px", border:"1px solid var(--line)", fontSize: 13, width: 280, fontFamily:"inherit"}}/>
              <button className="btn btn-ghost" style={{fontSize: 13}}><Ic.doc size={13}/> ส่งออก CSV</button>
            </div>
            <div style={{marginTop: 16}}>
              <div className="grid" style={{gridTemplateColumns:"160px 200px 1fr 200px 120px", gap: 0, padding:"10px 12px", background:"var(--cream-2)", borderRadius:"8px 8px 0 0", fontSize: 11, letterSpacing:".08em", textTransform:"uppercase", color:"var(--ink-3)", fontWeight: 600}}>
                <span>เวลา</span><span>Event · Reason</span><span>ฟิลด์ที่เปลี่ยน</span><span>ผู้แก้ไข</span><span>สถานะ</span>
              </div>
              {AUDIT_LOG.map((a, i) => (
                <div key={i} className="grid" style={{gridTemplateColumns:"160px 200px 1fr 200px 120px", gap: 0, padding:"14px 12px", borderBottom:"1px solid var(--line-2)", fontSize: 13, alignItems:"center"}}>
                  <span style={{color:"var(--ink-3)", fontFamily:"monospace", fontSize: 12}}>{a.when}</span>
                  <span>
                    <div style={{fontWeight: 600}}>{a.event}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{a.reason}</div>
                  </span>
                  <span style={{color:"var(--ink-2)", lineHeight: 1.5}}>
                    <span style={{color:"var(--ink-3)"}}>{a.subject} · {a.field}:</span> <span style={{textDecoration:"line-through", color:"var(--coral)"}}>{a.from}</span> → <b>{a.to}</b>
                  </span>
                  <span style={{color:"var(--ink-2)"}}>{a.who}</span>
                  <span><span className={"tag " + (a.s === "อนุมัติ" ? "sage" : a.s === "รอ" ? "butter" : "")} style={{fontSize: 11}}>{a.s}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const AUDIT_LOG = [
  {when:"30 เม.ย. 16:42", event:"แก้ไขสวัสดิการ", reason:"เพิ่มผู้อุปการะ", subject:"พริยะ ชาห์", field:"ผู้อุปการะ", from:"1 คน", to:"2 คน", who:"จงรักษ์ ทานากะ", s:"รอ"},
  {when:"30 เม.ย. 14:15", event:"ปรับเงินเดือน", reason:"ทบทวนกลางปี", subject:"นิโคล ฮวาง", field:"เงินเดือน", from:"฿38,000", to:"฿40,400", who:"ระบบ (อัตโนมัติ)", s:"อนุมัติ"},
  {when:"30 เม.ย. 11:08", event:"เปลี่ยนตำแหน่ง", reason:"การจัดโครงสร้างใหม่", subject:"จาเร็ด คิม", field:"ผู้จัดการ", from:"ส. โอเฮรา", to:"จ. ทานากะ", who:"จอร์แดน เหมย", s:"อนุมัติ"},
  {when:"29 เม.ย. 18:30", event:"จ้างใหม่", reason:"ตำแหน่งทดแทน", subject:"นิโคล ฮวาง", field:"สถานะ", from:"-", to:"พนักงานประจำ", who:"จอร์แดน เหมย", s:"อนุมัติ"},
  {when:"29 เม.ย. 09:11", event:"แก้ไขข้อมูลส่วนตัว", reason:"คำขอจากพนักงาน", subject:"มาร์คัส เคลลี่", field:"เบอร์โทร", from:"080-111-2222", to:"081-555-3333", who:"ตัวพนักงานเอง", s:"อนุมัติ"},
  {when:"28 เม.ย. 22:00", event:"ปิดบัญชี", reason:"ลาออก", subject:"พ. ราเชล", field:"สถานะ", from:"ทำงาน", to:"ออก", who:"จอร์แดน เหมย", s:"อนุมัติ"},
];

function RuleRow({ Ic, field, op, val }) {
  return (
    <div className="row" style={{padding:"10px 12px", background:"#fff", border:"1px solid var(--line-2)", borderRadius: 10, gap: 10}}>
      <span style={{padding:"4px 10px", background:"var(--cream-2)", borderRadius: 6, fontSize: 12, fontWeight: 600}}>{field}</span>
      <span style={{padding:"4px 8px", background:"var(--accent-soft)", borderRadius: 6, fontSize: 12, color:"var(--accent)", fontFamily:"monospace"}}>{op}</span>
      <span style={{padding:"4px 10px", border:"1px solid var(--line)", borderRadius: 6, fontSize: 12}}>{val}</span>
      <div className="spacer"/>
      <button className="icon-btn" style={{width: 28, height: 28}}><Ic.close size={11}/></button>
    </div>
  );
}

function Step({ n, l, d, done, current }) {
  return (
    <div style={{padding: 14, background: done ? "var(--sage-soft, var(--cream-2))" : current ? "var(--accent-soft)" : "var(--cream-2)", borderRadius: 12, border:"1px solid " + (current ? "var(--accent)" : "var(--line-2)")}}>
      <div className="row" style={{gap: 8, marginBottom: 8}}>
        <div style={{width: 22, height: 22, borderRadius: 11, background: done ? "var(--sage)" : current ? "var(--accent)" : "var(--ink-4)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize: 11, fontWeight: 700}}>{n}</div>
        <span style={{fontSize: 14, fontWeight: 600}}>{l}</span>
      </div>
      <div style={{fontSize: 12, color:"var(--ink-3)"}}>{d}</div>
    </div>
  );
}

window.AdminBenefits = AdminBenefits;
