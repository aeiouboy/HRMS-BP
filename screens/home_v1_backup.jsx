// HomeScreen.jsx — action-first dashboard (Thai, SF-inspired)
function HomeScreen({ onNav }) {
  const Ic = window.I;
  const [quickQuery, setQuickQuery] = React.useState("");

  // Tasks user must act on — front and center
  const TASKS = [
    {
      id:"t1", priority:"high",
      title:"อนุมัติคำขอลา 2 รายการ",
      detail:"มาร์คัส เคลลี่ (พักร้อน 28 เม.ย.) · พริยะ ชาห์ (ลาป่วย พรุ่งนี้)",
      due:"วันนี้", action:"ดูคำขอ", target:"timeoff", c:"var(--coral)"
    },
    {
      id:"t2", priority:"high",
      title:"ยืนยันแผนสวัสดิการปี 2568",
      detail:"เลือก Flex Plus หรือ Flex Core · ตรวจสอบผู้อุปการะ",
      due:"ครบกำหนด 6 วัน", action:"เลือกแผน", target:"benefits", c:"var(--coral)"
    },
    {
      id:"t3", priority:"med",
      title:"กรอกการประเมินศักยภาพประจำปี 2568",
      detail:"คงเหลือ 4 หัวข้อ · ใช้เวลาประมาณ 12 นาที",
      due:"32 วันค้าง", action:"ทำต่อ", target:"goals", c:"var(--butter)"
    },
    {
      id:"t4", priority:"med",
      title:"เตือนทีม 2 คนให้ทำงานค้าง",
      detail:"การจัดการขยะ · 4 คนค้างเรียน",
      due:"สัปดาห์นี้", action:"ส่งเตือน", target:"learning", c:"var(--butter)"
    },
  ];

  return (
    <>
      <window.Topbar title="หน้าหลัก" onNav={onNav}/>

      {/* Hero — clean greeting + CTA based on actual context */}
      <div className="card hero grain" style={{overflow:"hidden", padding: 28, marginBottom: 20, position:"relative"}}>
        <div className="eyebrow" style={{marginBottom: 10}}>วันอังคาร · 21 เมษายน 2568</div>
        <h1 style={{fontSize: 34, fontWeight: 600, maxWidth: 620, color:"var(--ink)", letterSpacing:"-0.01em"}}>
          สวัสดี คุณจงรักษ์ · <span style={{color:"var(--ink-3)"}}>มี <b style={{color:"var(--ink)"}}>4 เรื่อง</b>ที่ต้องดำเนินการสัปดาห์นี้</span>
        </h1>
        <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 8, maxWidth: 560, lineHeight: 1.6}}>
          เคลียร์งานค้างก่อน · จากนั้นค่อยตรวจประกาศและกิจกรรมทีม
        </p>

        {/* Action-shaped search — not just "search" */}
        <div style={{marginTop: 20, padding:"14px 18px", background:"#fff", borderRadius: 14, border:"1px solid var(--line)", display:"flex", alignItems:"center", gap: 12, maxWidth: 620, boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <Ic.search size={16}/>
          <input
            value={quickQuery}
            onChange={e => setQuickQuery(e.target.value)}
            placeholder='ค้นหาคน หรือ "ขอลา", "เบิกค่ารักษา", "ดูสลิปเงินเดือน"…'
            style={{border: 0, outline:"none", background:"transparent", flex: 1, fontFamily:"inherit", fontSize: 14, color:"var(--ink-2)"}}
          />
          <span style={{padding:"3px 7px", border:"1px solid var(--line)", borderRadius: 6, fontSize: 11, color:"var(--ink-3)", fontFamily:"monospace"}}>⌘K</span>
        </div>

        <div className="blob teal"  style={{width: 120, height: 150, right: -30, top: -30, opacity: .85}}/>
        <div className="blob coral" style={{width: 80,  height: 100, right: 60,  bottom: -20, opacity: .7}}/>
        <div className="blob butter" style={{width: 44, height: 56, right: 110, top: 80, opacity: .9}}/>
      </div>

      {/* TO-DO STACK — the most important block, full width */}
      <div className="card" style={{padding: 0, overflow:"hidden", marginBottom: 20, border:"1px solid var(--line)"}}>
        <div style={{padding:"16px 20px", borderBottom:"1px solid var(--line-2)"}}>
          <div className="row">
            <div>
              <div className="eyebrow" style={{color:"var(--accent)"}}>สิ่งที่ต้องทำ</div>
              <h3 style={{marginTop: 4, fontSize: 18}}>4 รายการรอคุณดำเนินการ</h3>
            </div>
            <div className="spacer"/>
            <div className="tabs" style={{margin: 0}}>
              <div className="tab active" style={{padding:"6px 12px", fontSize: 13}}>ทั้งหมด · 4</div>
              <div className="tab" style={{padding:"6px 12px", fontSize: 13}}>เร่งด่วน · 2</div>
              <div className="tab" style={{padding:"6px 12px", fontSize: 13}}>ค้างเก่า · 1</div>
            </div>
          </div>
        </div>
        {TASKS.map((t, i) => (
          <div key={t.id} style={{padding:"16px 20px", borderBottom: i < TASKS.length - 1 ? "1px solid var(--line-2)" : "", display:"flex", gap: 14, alignItems:"center"}}>
            <div style={{width: 4, alignSelf:"stretch", borderRadius: 2, background: t.c, flexShrink: 0}}/>
            <div style={{flex: 1, minWidth: 0}}>
              <div className="row" style={{gap: 10, marginBottom: 4}}>
                <div style={{fontSize: 15, fontWeight: 600, letterSpacing:"-0.01em"}}>{t.title}</div>
                {t.priority === "high" && <span className="tag coral" style={{fontSize: 10}}>เร่งด่วน</span>}
              </div>
              <div style={{fontSize: 13, color:"var(--ink-3)", lineHeight: 1.5}}>{t.detail}</div>
            </div>
            <div style={{textAlign:"right", flexShrink: 0}}>
              <div style={{fontSize: 12, color: t.priority === "high" ? "var(--coral)" : "var(--ink-3)", fontWeight: 500, marginBottom: 8}}>{t.due}</div>
              <button className="btn btn-primary" style={{fontSize: 13}} onClick={() => onNav(t.target)}>{t.action} <Ic.arrow size={12}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct access — actually labeled actions, not generic widgets */}
      <div style={{marginBottom: 20}}>
        <div className="row" style={{marginBottom: 14}}>
          <div>
            <div className="eyebrow">เข้าถึงด่วน</div>
            <h3 style={{marginTop: 4, fontSize: 18}}>สิ่งที่คุณใช้บ่อย</h3>
          </div>
          <div className="spacer"/>
          <button className="btn btn-ghost" style={{fontSize: 13}}>ปรับแต่ง</button>
        </div>
        <div className="grid" style={{gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
          {[
            {l:"ขอลา", d:"พักร้อน · ป่วย · ลากิจ", ic:"check", c:"var(--accent)", target:"timeoff"},
            {l:"ดูสลิปเงินเดือน", d:"รอบนี้ · ฿42,800", ic:"doc", c:"var(--coral)", target:"profile"},
            {l:"เบิกค่ารักษา", d:"คงเหลือ ฿8,200/ปี", ic:"heart", c:"var(--sage)", target:"benefits"},
            {l:"ดูทีมของฉัน", d:"16 คน · 11 ทำงาน", ic:"people", c:"var(--butter)", target:"directory"},
          ].map(q => {
            const Glyph = Ic[q.ic];
            return (
              <div key={q.l} onClick={() => onNav(q.target)} className="card tight" style={{cursor:"pointer", padding: 16}}>
                <div className="row" style={{gap: 12, alignItems:"center"}}>
                  <div style={{width: 40, height: 40, borderRadius: 10, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", color: q.c, flexShrink: 0}}>
                    <Glyph size={18}/>
                  </div>
                  <div style={{minWidth: 0, flex: 1}}>
                    <div style={{fontSize: 14, fontWeight: 600, letterSpacing:"-0.01em"}}>{q.l}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2, lineHeight: 1.4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{q.d}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-col: Today's team + Pending leave approvals */}
      <div className="grid" style={{gridTemplateColumns: "1fr 1.1fr", gap: 20, marginBottom: 20}}>
        {/* Team status — but framed as "you can take action" */}
        <div className="card">
          <div className="row" style={{alignItems:"flex-start"}}>
            <div>
              <div className="eyebrow">ทีมวันนี้ · สาขาทองหล่อ</div>
              <h3 style={{marginTop: 6}}>11 จาก 16 คนทำงาน</h3>
            </div>
            <span className="tag accent" style={{marginLeft:"auto"}}>สด</span>
          </div>
          <div className="row" style={{marginTop: 18, gap: 20}}>
            <div className="ring" style={{"--p": 68}}>
              <div style={{position:"relative", textAlign:"center", zIndex: 1}}>
                <div className="val">11/16</div>
                <div style={{fontSize: 10, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-3)"}}>กำลังทำงาน</div>
              </div>
            </div>
            <div className="col" style={{gap: 10, flex: 1}}>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--accent)"}}/> <span>เข้างานแล้ว</span></div>
                <b>11</b>
              </div>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--coral)"}}/> <span>ลางาน</span></div>
                <b>3</b>
              </div>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--line)"}}/> <span>นอกกะ</span></div>
                <b>2</b>
              </div>
            </div>
          </div>
          <hr className="divider"/>
          <button className="btn btn-ghost" style={{width:"100%"}} onClick={() => onNav("directory")}>ดูตารางกะทีม <Ic.arrow size={14}/></button>
        </div>

        {/* Pending leave inline */}
        <div className="card">
          <div className="row" style={{marginBottom: 6}}>
            <div>
              <div className="eyebrow">รออนุมัติจากคุณ</div>
              <h3 style={{marginTop: 6}}>คำขอลางาน · 2</h3>
            </div>
            <button className="btn btn-ghost" style={{marginLeft:"auto", fontSize: 13}} onClick={() => onNav("timeoff")}>เปิดทั้งหมด <Ic.arrow size={13}/></button>
          </div>
          <div className="list">
            {[
              {n:"มาร์คัส เคลลี่", r:"ลาพักร้อน 5 วัน", w:"28 เม.ย. – 2 พ.ค.", c:"MK", t:"teal", d:"ยื่นเมื่อวาน"},
              {n:"พริยะ ชาห์", r:"ลาป่วย 1 วัน", w:"พรุ่งนี้", c:"PS", t:"coral", d:"1 ชม.ก่อน"},
            ].map(row => (
              <div key={row.n} className="row-item">
                <div className={"avatar " + row.t}>{row.c}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontWeight:600, fontSize: 14}}>{row.n} <span style={{color:"var(--ink-3)", fontWeight: 400, fontSize: 13}}>· {row.r}</span></div>
                  <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 2}}>{row.w} · {row.d}</div>
                </div>
                <div className="row" style={{gap: 6}}>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}>ปฏิเสธ</button>
                  <button className="btn btn-accent" style={{padding:"6px 10px", fontSize: 12}}>อนุมัติ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News + Calendar — compact, secondary */}
      <div className="grid" style={{gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 20}}>
        <div className="card">
          <div className="row" style={{marginBottom: 12}}>
            <div>
              <div className="eyebrow">ประกาศ</div>
              <h3 style={{marginTop: 6}}>สำคัญสำหรับคุณ</h3>
            </div>
            <button className="btn btn-ghost" style={{marginLeft:"auto", fontSize: 13}} onClick={() => onNav("announce")}>เปิดฟีด <Ic.arrow size={13}/></button>
          </div>

          {[
            {who:"จอร์แดน เหมย · ฝ่ายบุคคล", av:"JM", color:"sage", when:"เมื่อวาน", pin: true,
             title:"นโยบายลาคลอดใหม่ · เริ่มใช้ 1 พ.ค.",
             body:"ขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยรับค่าจ้างเต็ม · เซสชันถามตอบพฤหัสบดี 15:00",
             r:["❤️ 42","🎉 21"]},
            {who:"ฝ่ายปฏิบัติการร้าน", av:"SO", color:"teal", when:"2 วันก่อน",
             title:"ตรวจนับสินค้าฤดูใบไม้ผลิ · เสาร์ 25 เม.ย.",
             body:"ปิดก่อนกำหนด 30 นาที · ค่าแรงตามอัตรากะ + อาหาร",
             r:["👍 14","🙌 6"]},
          ].map(p => (
            <div key={p.title} className="post" style={p.pin ? {borderColor:"transparent", background:"var(--accent-soft)"} : {}}>
              <div className="row">
                <div className={"avatar " + p.color} style={{width: 30, height: 30, fontSize: 11}}>{p.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13}}><b>{p.who}</b> <span style={{color:"var(--ink-3)"}}>· {p.when}</span></div>
                </div>
                {p.pin && <span className="tag ink" style={{fontSize: 11}}><Ic.pin size={10}/> ปักหมุด</span>}
              </div>
              <h4 style={{fontFamily:"var(--font-display)", fontSize: 17, marginTop: 8, fontWeight: 600, letterSpacing:"-0.01em"}}>{p.title}</h4>
              <p style={{color:"var(--ink-2)", fontSize: 13, marginTop: 6, lineHeight: 1.6}}>{p.body}</p>
              <div className="row" style={{marginTop: 10, gap: 8}}>
                {p.r.map(x => <span key={x} className="tag" style={{fontSize: 11}}>{x}</span>)}
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{padding:"4px 8px", fontSize: 12}}>ตอบกลับ</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col" style={{gap: 20}}>
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">เมษายน 2568</div>
                <h3 style={{marginTop: 6}}>ปฏิทินทีม</h3>
              </div>
              <div className="spacer"/>
              <button className="icon-btn" style={{width: 32, height: 32}}><Ic.chevron size={14} style={{transform:"rotate(180deg)"}}/></button>
              <button className="icon-btn" style={{width: 32, height: 32, marginLeft: 4}}><Ic.chevron size={14}/></button>
            </div>
            <div className="cal" style={{marginTop: 14}}>
              {["อา","จ","อ","พ","พฤ","ศ","ส"].map((d, i) => <div key={i} className="dow">{d}</div>)}
              {Array.from({length: 35}).map((_, i) => {
                const day = i - 2;
                const off = day < 1 || day > 30;
                const has = [8, 14, 17, 21, 28].includes(day);
                const sel = day === 21;
                const range = [28, 29, 30].includes(day);
                return (
                  <div key={i} className={"day " + (off?"off ":"") + (has?"has ":"") + (sel?"sel ":"") + (range?"range ":"")}>
                    {off ? "" : day}
                  </div>
                );
              })}
            </div>
            <hr className="divider"/>
            <div className="col" style={{gap: 10}}>
              <div className="row">
                <div style={{width: 6, height: 26, borderRadius: 3, background:"var(--accent)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>ตรวจนับสินค้าทุกสาขา</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>เสาร์ 25 · 9:00–14:00</div>
                </div>
              </div>
              <div className="row">
                <div style={{width: 6, height: 26, borderRadius: 3, background:"var(--coral)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>มาร์คัส เค. · ลาพักร้อน</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>28 เม.ย. – 2 พ.ค.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="blob teal"  style={{width: 90, height: 110, right: -20, bottom: -30, opacity:.55}}/>
            <div className="eyebrow" style={{color:"var(--accent)"}}><Ic.party size={12} style={{display:"inline-block", verticalAlign:-2}}/> สัปดาห์นี้</div>
            <h3 style={{marginTop: 8}}>วันเกิด 2 คน · ครบรอบทำงาน 1 คน</h3>
            <div className="row" style={{marginTop: 14, gap: -6}}>
              <div className="avatar teal" style={{border:"2px solid var(--ink)"}}>TS</div>
              <div className="avatar coral" style={{border:"2px solid var(--ink)", marginLeft: -8}}>RP</div>
              <div className="avatar sage" style={{border:"2px solid var(--ink)", marginLeft: -8}}>JC</div>
              <button className="btn btn-accent" style={{marginLeft:"auto"}}>ส่งข้อความอวยพร</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.HomeScreen = HomeScreen;
