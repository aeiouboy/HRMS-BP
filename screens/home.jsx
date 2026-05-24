// HomeScreen.jsx — one-click action hub
// Design intent: every tile is a direct entry to a real task, not a generic menu.
// Layout:
//   1. Greeting + smart context strip (4 mini KPIs you can click)
//   2. Pinned actions — 6 most-used, oversized, instant
//   3. Inbox / things waiting on you — each row a one-click resolve
//   4. Full action grid — every menu broken into specific actions
//   5. News + calendar + birthdays — secondary, compact
function HomeScreen({ onNav }) {
  const Ic = window.I;
  const [quickQuery, setQuickQuery] = React.useState("");
  const [pinFilter, setPinFilter] = React.useState("ทั้งหมด");

  // ---------- Inbox: tasks waiting on user ----------
  const TASKS = [
    {
      id: "t1", priority: "high",
      title: "อนุมัติคำขอลา 2 รายการ",
      detail: "มาร์คัส เคลลี่ · พริยะ ชาห์",
      due: "วันนี้", action: "อนุมัติ", target: "timeoff",
      ico: "calendar", c: "var(--coral)"
    },
    {
      id: "t2", priority: "high",
      title: "ยืนยันแผนสวัสดิการปี 2568",
      detail: "Flex Plus หรือ Flex Core",
      due: "ครบกำหนด 6 วัน", action: "เลือกแผน", target: "benefits",
      ico: "heart", c: "var(--coral)"
    },
    {
      id: "t3", priority: "med",
      title: "การประเมินศักยภาพประจำปี",
      detail: "คงเหลือ 4 หัวข้อ · ~12 นาที",
      due: "32 วันค้าง", action: "ทำต่อ", target: "goals",
      ico: "shield", c: "var(--butter)"
    },
    {
      id: "t4", priority: "med",
      title: "เตือนทีม 2 คนเรื่องคอร์สค้าง",
      detail: "การจัดการขยะ · 4 คนยังไม่เริ่ม",
      due: "สัปดาห์นี้", action: "ส่งเตือน", target: "learning",
      ico: "book", c: "var(--butter)"
    },
  ];

  // ---------- Pinned (most-used direct actions) ----------
  const PINNED = [
    { l: "ขอลางาน", sub: "พักร้อน · ป่วย · กิจ", ic: "calendar", target: "timeoff", color: "teal" },
    { l: "ดูสลิปเงินเดือน", sub: "เม.ย. · ฿42,800", ic: "doc", target: "profile", color: "coral" },
    { l: "เบิกค่ารักษา", sub: "เหลือ ฿8,200", ic: "heart", target: "benefits", color: "sage" },
    { l: "ลงเวลาเข้างาน", sub: "เริ่มกะ 09:00", ic: "clock", target: "timeoff", color: "butter" },
    { l: "ขอเอกสาร", sub: "หนังสือรับรอง · สลิป", ic: "download", target: "requests", color: "teal" },
    { l: "ประกาศใหม่", sub: "3 รายการสัปดาห์นี้", ic: "mega", target: "announce", color: "coral" },
  ];

  // ---------- Full action grid — every menu, broken into 1-click tasks ----------
  const SECTIONS = [
    {
      group: "งานของฉัน",
      tint: "teal",
      items: [
        { l: "โปรไฟล์และข้อมูลส่วนตัว",  s: "ดู / แก้ไข", ic: "people",   target: "profile" },
        { l: "ลางาน · ตารางกะ",         s: "ขอลา · ดูปฏิทิน", ic: "calendar", target: "timeoff", badge: "2" },
        { l: "เงินเดือน · สวัสดิการ",    s: "สลิป · เบิก · กองทุน", ic: "heart",    target: "benefits", badge: "1" },
        { l: "คำร้องและแบบฟอร์ม",       s: "ขอเอกสาร · ขอแก้ไข", ic: "doc",     target: "requests", badge: "1" },
        { l: "เป้าหมายและผลงาน",        s: "OKRs · ประเมิน", ic: "shield",  target: "goals" },
        { l: "การเรียนรู้",             s: "คอร์ส · ใบรับรอง", ic: "book",    target: "learning" },
      ]
    },
    {
      group: "ทีมและบุคลากร",
      tint: "coral",
      items: [
        { l: "ผังองค์กร",               s: "ค้นหาคน · แผนก", ic: "globe",   target: "directory" },
        { l: "ทีมของฉัน",               s: "16 คน · 11 ทำงาน", ic: "people",  target: "directory" },
        { l: "อนุมัติงานทีม",            s: "ลา · ค่าใช้จ่าย", ic: "check",   target: "timeoff", badge: "2" },
        { l: "ส่งคำชม · ฟีดแบ็ก",        s: "ทันที · อิงค่านิยม", ic: "smile",   target: "goals" },
      ]
    },
    {
      group: "บริษัทและการสื่อสาร",
      tint: "sage",
      items: [
        { l: "ประกาศและฟีด",            s: "ปักหมุด · ประจำสัปดาห์", ic: "mega",    target: "announce" },
        { l: "คู่มือพนักงาน",           s: "นโยบาย · ระเบียบ", ic: "book",    target: "announce" },
        { l: "กิจกรรมและอีเวนต์",        s: "ลงทะเบียน", ic: "party",   target: "announce" },
        { l: "ตำแหน่งงานภายใน",         s: "Career path", ic: "send",    target: "directory" },
      ]
    },
    {
      group: "เครื่องมือและการตั้งค่า",
      tint: "butter",
      items: [
        { l: "ศูนย์รวม Admin",          s: "เฉพาะหัวหน้างาน", ic: "shield",  target: "admin" },
        { l: "เชื่อมต่อระบบ",           s: "Slack · Google · Slack", ic: "plug",    target: "integrations" },
        { l: "การตั้งค่าบัญชี",         s: "รหัสผ่าน · 2FA", ic: "cog",     target: "profile" },
        { l: "ความช่วยเหลือ",           s: "ติดต่อ HR · FAQ", ic: "smile",   target: "announce" },
      ]
    },
  ];

  return (
    <>
      <window.Topbar title="หน้าหลัก" onNav={onNav}/>

      {/* ============ HERO ============ */}
      <div className="card grain" style={{overflow:"hidden", padding: "26px 28px", marginBottom: 18, position:"relative"}}>
        <div className="row" style={{alignItems:"flex-start", gap: 24}}>
          <div style={{flex: 1, minWidth: 0}}>
            <div className="eyebrow" style={{marginBottom: 8}}>วันอังคาร · 21 เมษายน 2568 · 09:42</div>
            <h1 style={{fontSize: 30, fontWeight: 600, color:"var(--ink)", letterSpacing:"-0.01em", maxWidth: 640}}>
              สวัสดี คุณจงรักษ์ — <span style={{color:"var(--ink-3)"}}>มี <b style={{color:"var(--ink)"}}>4 เรื่อง</b>รอคุณดำเนินการ</span>
            </h1>

            {/* Action-shaped search */}
            <div style={{marginTop: 16, padding:"12px 16px", background:"#fff", borderRadius: 12, border:"1px solid var(--line)", display:"flex", alignItems:"center", gap: 10, maxWidth: 580}}>
              <Ic.search size={15}/>
              <input
                value={quickQuery}
                onChange={e => setQuickQuery(e.target.value)}
                placeholder='พิมพ์ "ขอลา", "สลิป", "เบิกค่ารักษา" หรือชื่อเพื่อน…'
                style={{border: 0, outline:"none", background:"transparent", flex: 1, fontFamily:"inherit", fontSize: 14, color:"var(--ink-2)"}}
              />
              <span style={{padding:"3px 7px", border:"1px solid var(--line)", borderRadius: 6, fontSize: 11, color:"var(--ink-3)", fontFamily:"monospace"}}>⌘K</span>
            </div>
          </div>

          {/* Today-at-a-glance — clickable mini KPIs */}
          <div className="row" style={{gap: 8, flexShrink: 0}}>
            {[
              { v: "09:00", l: "เริ่มกะวันนี้", target: "timeoff", c: "var(--accent)" },
              { v: "11/16", l: "ทีมในกะ",     target: "directory", c: "var(--coral)" },
              { v: "฿8.2k", l: "วงเงินเบิก",   target: "benefits", c: "var(--sage)" },
              { v: "4",     l: "งานค้าง",     target: "requests", c: "var(--butter)" },
            ].map(k => (
              <div key={k.l} onClick={() => onNav(k.target)} className="kpi-mini" style={{
                background:"#fff", border:"1px solid var(--line)", borderRadius: 12,
                padding:"12px 14px", cursor:"pointer", minWidth: 96, textAlign:"center",
                transition: "all .15s ease"
              }}>
                <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing:"-0.02em", color: k.c}}>{k.v}</div>
                <div style={{fontSize: 11, color:"var(--ink-3)", marginTop: 2, letterSpacing:".04em"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="blob teal"  style={{width: 110, height: 140, right: -40, top: -40, opacity: .55}}/>
        <div className="blob coral" style={{width: 70,  height: 90,  right: 80,  bottom: -30, opacity: .5}}/>
      </div>

      {/* ============ PINNED — oversized, one-click ============ */}
      <div style={{marginBottom: 22}}>
        <div className="row" style={{marginBottom: 12, alignItems:"flex-end"}}>
          <div>
            <div className="eyebrow" style={{color:"var(--accent)"}}><Ic.pin size={11} style={{display:"inline-block", verticalAlign:-1, marginRight: 4}}/> ปักหมุดของคุณ</div>
            <h3 style={{marginTop: 4, fontSize: 18}}>ใช้บ่อย · กดครั้งเดียวเริ่มทำงาน</h3>
          </div>
          <div className="spacer"/>
          <div className="tabs" style={{margin: 0}}>
            {["ทั้งหมด","พนักงาน","หัวหน้า"].map(t => (
              <div key={t} className={"tab" + (pinFilter===t ? " active" : "")} onClick={() => setPinFilter(t)}
                   style={{padding:"6px 12px", fontSize: 13}}>{t}</div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{fontSize: 13, padding:"6px 12px"}}><Ic.plus size={13}/> ปรับแต่ง</button>
        </div>

        <div className="grid" style={{gridTemplateColumns:"repeat(6, 1fr)", gap: 10}}>
          {PINNED.map(p => {
            const Glyph = Ic[p.ic];
            return (
              <button key={p.l} className="pin-tile" onClick={() => onNav(p.target)}>
                <div className={"pin-ico " + p.color}><Glyph size={18}/></div>
                <div style={{marginTop: 14}}>
                  <div style={{fontSize: 14, fontWeight: 600, letterSpacing:"-0.01em", lineHeight: 1.25}}>{p.l}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2, lineHeight: 1.4}}>{p.sub}</div>
                </div>
                <div className="pin-arrow"><Ic.arrow size={13}/></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ INBOX — 1-click resolve ============ */}
      <div className="card" style={{padding: 0, overflow:"hidden", marginBottom: 22, border:"1px solid var(--line)"}}>
        <div style={{padding:"16px 20px", borderBottom:"1px solid var(--line-2)", display:"flex", alignItems:"center", gap: 12}}>
          <div>
            <div className="eyebrow" style={{color:"var(--coral)"}}>กล่องงานเข้า</div>
            <h3 style={{marginTop: 4, fontSize: 18}}>4 รายการรอคุณ · จัดการได้ทันทีจากที่นี่</h3>
          </div>
          <div className="spacer"/>
          <div className="tabs" style={{margin: 0}}>
            <div className="tab active" style={{padding:"6px 12px", fontSize: 13}}>ทั้งหมด · 4</div>
            <div className="tab" style={{padding:"6px 12px", fontSize: 13}}>เร่งด่วน · 2</div>
            <div className="tab" style={{padding:"6px 12px", fontSize: 13}}>ค้างเก่า · 1</div>
          </div>
        </div>
        {TASKS.map((t, i) => {
          const Glyph = Ic[t.ico];
          return (
            <div key={t.id} style={{padding:"14px 20px", borderBottom: i < TASKS.length - 1 ? "1px solid var(--line-2)" : "", display:"flex", gap: 14, alignItems:"center"}}>
              <div style={{width: 4, alignSelf:"stretch", borderRadius: 2, background: t.c, flexShrink: 0}}/>
              <div style={{width: 36, height: 36, borderRadius: 10, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", color: t.c, flexShrink: 0}}>
                <Glyph size={16}/>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div className="row" style={{gap: 10, marginBottom: 2}}>
                  <div style={{fontSize: 14.5, fontWeight: 600, letterSpacing:"-0.01em"}}>{t.title}</div>
                  {t.priority === "high" && <span className="tag coral" style={{fontSize: 10}}>เร่งด่วน</span>}
                </div>
                <div style={{fontSize: 13, color:"var(--ink-3)", lineHeight: 1.5}}>{t.detail}</div>
              </div>
              <div style={{textAlign:"right", flexShrink: 0}}>
                <div style={{fontSize: 12, color: t.priority === "high" ? "var(--coral)" : "var(--ink-3)", fontWeight: 500, marginBottom: 6}}>{t.due}</div>
                <div className="row" style={{gap: 6, justifyContent:"flex-end"}}>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}>เลื่อน</button>
                  <button className="btn btn-primary" style={{padding:"6px 12px", fontSize: 12}} onClick={() => onNav(t.target)}>
                    {t.action} <Ic.arrow size={11}/>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============ FULL ACTION GRID — every menu, broken into specific tasks ============ */}
      <div style={{marginBottom: 22}}>
        <div className="row" style={{marginBottom: 14, alignItems:"flex-end"}}>
          <div>
            <div className="eyebrow">เมนูทั้งหมด</div>
            <h3 style={{marginTop: 4, fontSize: 18}}>เข้าถึงทุกฟีเจอร์ใน 1 คลิก</h3>
          </div>
          <div className="spacer"/>
          <div style={{fontSize: 13, color:"var(--ink-3)"}}>กดที่หัวข้อเพื่อเปิดเมนูเต็ม · กดที่การ์ดเพื่อเริ่มงาน</div>
        </div>

        <div className="action-grid">
          {SECTIONS.map(sec => (
            <div key={sec.group} className={"action-section " + sec.tint}>
              <div className="row" style={{marginBottom: 12, alignItems:"baseline"}}>
                <div className={"section-pip " + sec.tint}/>
                <div style={{fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700, letterSpacing:"-0.01em"}}>{sec.group}</div>
                <div className="spacer"/>
                <div style={{fontSize: 11, color:"var(--ink-4)", letterSpacing:".06em", textTransform:"uppercase"}}>{sec.items.length} รายการ</div>
              </div>
              <div className="grid" style={{gridTemplateColumns:"repeat(2, 1fr)", gap: 8}}>
                {sec.items.map(it => {
                  const Glyph = Ic[it.ic];
                  return (
                    <button key={it.l} className="action-tile" onClick={() => onNav(it.target)}>
                      <div className="action-ico"><Glyph size={15}/></div>
                      <div style={{flex: 1, minWidth: 0, textAlign:"left"}}>
                        <div style={{fontSize: 13.5, fontWeight: 600, letterSpacing:"-0.01em", lineHeight: 1.25, display:"flex", alignItems:"center", gap: 6}}>
                          {it.l}
                          {it.badge && <span style={{fontSize: 10, fontWeight: 700, padding:"1px 6px", borderRadius: 999, background:"var(--coral)", color:"#fff"}}>{it.badge}</span>}
                        </div>
                        <div style={{fontSize: 11.5, color:"var(--ink-3)", marginTop: 1, lineHeight: 1.3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{it.s}</div>
                      </div>
                      <div className="action-arrow"><Ic.chevron size={12}/></div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ Secondary: News + Calendar + Birthdays ============ */}
      <div className="grid" style={{gridTemplateColumns: "1.3fr 1fr", gap: 18, marginBottom: 18}}>
        <div className="card">
          <div className="row" style={{marginBottom: 10}}>
            <div>
              <div className="eyebrow">ประกาศ</div>
              <h3 style={{marginTop: 4, fontSize: 17}}>สำคัญสำหรับคุณ</h3>
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
              <h4 style={{fontFamily:"var(--font-display)", fontSize: 16, marginTop: 8, fontWeight: 600, letterSpacing:"-0.01em"}}>{p.title}</h4>
              <p style={{color:"var(--ink-2)", fontSize: 13, marginTop: 6, lineHeight: 1.55}}>{p.body}</p>
              <div className="row" style={{marginTop: 10, gap: 8}}>
                {p.r.map(x => <span key={x} className="tag" style={{fontSize: 11}}>{x}</span>)}
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{padding:"4px 8px", fontSize: 12}}>ตอบกลับ</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col" style={{gap: 18}}>
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">เมษายน 2568</div>
                <h3 style={{marginTop: 4, fontSize: 17}}>ปฏิทินทีม</h3>
              </div>
              <div className="spacer"/>
              <button className="icon-btn" style={{width: 30, height: 30}}><Ic.chevron size={13} style={{transform:"rotate(180deg)"}}/></button>
              <button className="icon-btn" style={{width: 30, height: 30, marginLeft: 4}}><Ic.chevron size={13}/></button>
            </div>
            <div className="cal" style={{marginTop: 12}}>
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
            <h3 style={{marginTop: 6, fontSize: 17}}>วันเกิด 2 คน · ครบรอบ 1 คน</h3>
            <div className="row" style={{marginTop: 12, gap: -6}}>
              <div className="avatar teal" style={{border:"2px solid var(--ink)"}}>TS</div>
              <div className="avatar coral" style={{border:"2px solid var(--ink)", marginLeft: -8}}>RP</div>
              <div className="avatar sage" style={{border:"2px solid var(--ink)", marginLeft: -8}}>JC</div>
              <button className="btn btn-accent" style={{marginLeft:"auto"}}>ส่งคำอวยพร</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.HomeScreen = HomeScreen;
