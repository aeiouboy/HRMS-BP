// ============= MODULE 2: BENEFIT CLAIMED (Manager + Admin) =============

// 2B · MANAGER — อนุมัติเบิกของทีม
function BN_Manager() {
  const I = window.PI;
  const queue = [
    { c:"CLM-09921", n:"มาริสา สงวนศักดิ์", id:"E-58231", t:"ค่ารักษา · บำรุงราษฎร์",       a:1840, dt:"2 ชม.ก่อน",  cat:"hospital", auto: true,  cov:"100%" },
    { c:"CLM-09918", n:"ธีรพัฒน์ มงคล",      id:"E-49102", t:"ทันตกรรม · ฟันใส",            a:1200, dt:"3 ชม.ก่อน",  cat:"tooth",    auto: true,  cov:"100%" },
    { c:"CLM-09915", n:"กัลยา ภูวดล",         id:"E-61480", t:"ค่ายา · เภสัชกรรม",            a: 480, dt:"5 ชม.ก่อน",  cat:"pill",     auto: true,  cov:"100%" },
    { c:"CLM-09910", n:"นิภาพร แสนสุข",      id:"E-58102", t:"ค่ารักษา · พญาไท 2",          a:4200, dt:"เมื่อวาน",     cat:"hospital", auto: false, cov:"เกินวงเงิน 1,200" },
    { c:"CLM-09905", n:"อัมพร โพธิ์ทอง",     id:"E-66770", t:"แว่นตา · เลนส์โปรเกรสซีฟ",    a: 740, dt:"เมื่อวาน",     cat:"glasses",  auto: false, cov:"ใบเสร็จไม่ชัด" },
  ];
  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Benefit Claimed · มุมผู้จัดการ"
        title="อนุมัติคำเบิกของทีม"
        subtitle="5 คำเบิกรอคุณ · 3 ในวงเงินอนุมัติได้เลย · 2 ต้องตัดสินใจ"
        actions={<>
          <button className="humi-button humi-button--ghost">ตั้งกฎอัตโนมัติ</button>
          <button className="humi-button humi-button--primary"><I.check size={14}/> อนุมัติทั้งหมดในวงเงิน (3)</button>
        </>}/>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 20}}>
        <window.StatCard label="คำเบิกเดือนนี้" value="42" sub="ทั้งทีม 14 คน" icon="receipt"/>
        <window.StatCard label="ยอดรอคุณ" value="฿8,460" sub="5 รายการ" accent="var(--color-warning)" icon="baht"/>
        <window.StatCard label="อนุมัติแล้ว · เดือนนี้" value="37" sub="฿58,420" icon="check"/>
        <window.StatCard label="SLA เฉลี่ย" value="1.2 วัน" sub="เป้า ≤ 2 วัน" accent="var(--color-accent)" icon="clock"/>
      </div>

      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
          <div className="humi-row">
            <h3 className="humi-section-title">รออนุมัติ</h3>
            <span className="humi-spacer"/>
            <window.SegTabs active="all" tabs={[
              {id:"all", label:"ทั้งหมด", count:5},
              {id:"auto", label:"ในวงเงิน", count:3},
              {id:"manual", label:"ต้องดู", count:2},
            ]}/>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"36px 44px 1.8fr 1.8fr 1fr 1.2fr 160px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
          <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
          <div></div>
          <div>พนักงาน</div>
          <div>คำเบิก</div>
          <div style={{textAlign:"right"}}>จำนวน</div>
          <div>สถานะวงเงิน</div>
          <div></div>
        </div>

        {queue.map(q => {
          const Glyph = I[q.cat];
          return (
            <div key={q.c} style={{display:"grid", gridTemplateColumns:"36px 44px 1.8fr 1.8fr 1fr 1.2fr 160px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
              <input type="checkbox" defaultChecked={q.auto} style={{accentColor:"var(--color-accent)"}}/>
              <div style={{width: 34, height: 34, borderRadius: 9, background:"var(--color-canvas-soft)", color: q.auto ? "var(--color-accent)" : "var(--color-warning)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}><Glyph size={16}/></div>
              <div>
                <div style={{fontWeight: 600, fontSize: 14}}>{q.n}</div>
                <div style={{fontSize: 11, color:"var(--color-ink-faint)", letterSpacing:".04em"}}>{q.id} · {q.dt}</div>
              </div>
              <div>
                <div style={{fontSize: 13, fontWeight: 500}}>{q.t}</div>
                <div style={{fontFamily:"ui-monospace, monospace", fontSize: 11, color:"var(--color-ink-muted)", marginTop: 2}}>{q.c}</div>
              </div>
              <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontSize: 17, fontWeight: 700}}>฿{q.a.toLocaleString()}</div>
              <div>
                {q.auto
                  ? <span className="humi-tag humi-tag--accent"><I.check size={11}/> {q.cov}</span>
                  : <span className="humi-tag humi-tag--coral"><I.warn size={11}/> {q.cov}</span>
                }
              </div>
              <div className="humi-row" style={{gap: 6, justifyContent:"flex-end"}}>
                <button className="humi-button humi-button--ghost" style={{padding:"6px 10px", fontSize: 12, minHeight: 32}}>ดู</button>
                <button className="humi-button humi-button--primary" style={{padding:"6px 10px", fontSize: 12, minHeight: 32}}><I.check size={12}/> อนุมัติ</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.BN_Manager = BN_Manager;

// 2C · ADMIN — คิวอนุมัติรวม + ภาพรวม + แผนสวัสดิการ + เกณฑ์สิทธิ
function BN_Admin({ initialView = "overview" }) {
  const I = window.PI;
  const [view, setView] = React.useState(initialView);

  const headerActions = {
    overview: <>
      <button className="humi-button humi-button--ghost"><I.download size={14}/> Export รายงาน</button>
      <button className="humi-button humi-button--primary"><I.link size={14}/> Sync กับ Payroll</button>
    </>,
    plans: <>
      <button className="humi-button humi-button--ghost"><I.refresh size={14}/> Sync จาก HRIS</button>
      <button className="humi-button humi-button--ghost"><I.upload size={14}/> นำเข้า CSV</button>
      <button className="humi-button humi-button--primary"><I.plus size={14}/> มอบสิทธิเฉพาะกลุ่ม</button>
    </>,
    rules: <>
      <button className="humi-button humi-button--ghost"><I.copy size={14}/> ดู Audit log</button>
      <button className="humi-button humi-button--ghost"><I.eye size={14}/> Preview ผลกฎ</button>
      <button className="humi-button humi-button--primary"><I.save size={14}/> เผยแพร่กฎ (2 ร่าง)</button>
    </>,
  };

  const headerCopy = {
    overview: { title: "ศูนย์การเบิกสวัสดิการ", sub: "ภาพรวมทั่วประเทศ · คิวอนุมัติขั้นสุดท้าย · เชื่อมต่อกับ Payroll รอบ 25 พ.ค." },
    plans:    { title: "แผนสวัสดิการและการมอบสิทธิ", sub: "บริหารแผน 5 ชุด · 3,241 พนักงานครอบคลุม · ปรับสิทธิตามเหตุการณ์ (ผ่านทดลองงาน เลื่อนระดับ ฯลฯ)" },
    rules:    { title: "เกณฑ์สิทธิ · Eligibility Rules", sub: "ตั้งกฎว่าใครเข้าแผนใด เบิกอะไรได้ และเงื่อนไขอนุมัติอัตโนมัติ — กฎที่ล็อค 🔒 ตั้งจาก HRIS" },
  };

  return (
    <div style={{paddingBottom: 32}}>
      <window.PageHead
        eyebrow="Benefit Claimed · มุม HR Admin"
        title={headerCopy[view].title}
        subtitle={headerCopy[view].sub}
        actions={headerActions[view]}/>

      <window.BN_Admin_Tabs active={view} onChange={setView}/>

      {view === "plans" && <window.BN_Admin_Plans/>}
      {view === "rules" && <window.BN_Admin_Rules/>}
      {view === "overview" && <></>}

      {view === "overview" && (
      <>
      {/* Overview cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 24}}>
        <window.StatCard label="คำเบิกเดือนนี้" value="1,284" sub="+18% จากเดือนก่อน" icon="receipt"/>
        <window.StatCard label="ยอดอนุมัติแล้ว" value="฿2.84M" sub="งบประมาณคงเหลือ 64%" accent="var(--color-accent)" icon="baht"/>
        <window.StatCard label="รออนุมัติขั้นสุดท้าย" value="42" sub="หลังผู้จัดการอนุมัติ" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="ตีกลับเดือนนี้" value="28" sub="2.2% ของทั้งหมด" icon="refresh"/>
      </div>

      {/* Two-column: chart + breakdown */}
      <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr", gap: 20, marginBottom: 20}}>
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 14}}>
            <div>
              <div className="humi-eyebrow">12 เดือนล่าสุด</div>
              <h3 className="humi-section-title" style={{marginTop: 4}}>การใช้สวัสดิการตามประเภท</h3>
            </div>
            <span className="humi-spacer"/>
            <window.SegTabs active="amt" tabs={[{id:"amt", label:"บาท"},{id:"cnt", label:"จำนวน"}]}/>
          </div>

          {/* Stacked bar chart */}
          <div style={{display:"flex", alignItems:"flex-end", gap: 10, height: 180, marginTop: 12}}>
            {["มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.","ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค."].map((m, i) => {
              const h = [120, 140, 110, 100, 130, 150, 170, 90, 100, 145, 158, 175][i];
              const segs = [
                { c:"var(--color-accent)", p: 55 },
                { c:"var(--color-sage)",   p: 18 },
                { c:"var(--color-butter)", p: 14 },
                { c:"var(--color-info)",   p: 13 },
              ];
              return (
                <div key={m} style={{flex: 1, display:"flex", flexDirection:"column", alignItems:"center", gap: 8}}>
                  <div style={{height: h, width:"100%", borderRadius: 6, display:"flex", flexDirection:"column", overflow:"hidden", border:"1px solid var(--color-hairline-soft)"}}>
                    {segs.map((s, si) => <div key={si} style={{height: s.p + "%", background: s.c}}/>)}
                  </div>
                  <span style={{fontSize: 11, color:"var(--color-ink-muted)"}}>{m}</span>
                </div>
              );
            })}
          </div>

          <div className="humi-row" style={{gap: 16, marginTop: 16, paddingTop: 14, borderTop:"1px solid var(--color-hairline-soft)", flexWrap:"wrap"}}>
            {[
              ["ค่ารักษา", "var(--color-accent)", "฿1.56M"],
              ["ทันตกรรม", "var(--color-sage)", "฿512K"],
              ["แว่นตา", "var(--color-butter)", "฿398K"],
              ["คลอดบุตร/อื่นๆ", "var(--color-info)", "฿370K"],
            ].map(([l,c,v]) => (
              <div key={l} className="humi-row" style={{gap: 8}}>
                <span style={{width: 10, height: 10, borderRadius: 3, background: c}}/>
                <span style={{fontSize: 12, fontWeight: 500}}>{l}</span>
                <span style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="humi-card">
          <h3 className="humi-section-title">สาขาที่ใช้สูงสุด</h3>
          <div className="humi-section-sub">เดือนนี้ · เรียงตามจำนวนเงิน</div>
          <div style={{marginTop: 14}}>
            {[
              ["Central World", 312, 612000, 0.92],
              ["Chidlom",       248, 484000, 0.74],
              ["Embassy",       198, 392000, 0.59],
              ["Lardprao",      167, 318000, 0.48],
              ["Bangna",        142, 264000, 0.40],
            ].map(([n,cnt,amt,p]) => (
              <div key={n} style={{padding:"10px 0", borderBottom:"1px solid var(--color-hairline-soft)"}}>
                <div className="humi-row" style={{marginBottom: 6}}>
                  <span style={{fontSize: 13, fontWeight: 600}}>{n}</span>
                  <span className="humi-spacer"/>
                  <span style={{fontFamily:"var(--font-display)", fontSize: 14, fontWeight: 700}}>฿{(amt/1000).toFixed(0)}K</span>
                </div>
                <div style={{display:"flex", alignItems:"center", gap: 10}}>
                  <div style={{flex: 1, height: 5, background:"var(--color-hairline-soft)", borderRadius: 99, overflow:"hidden"}}>
                    <div style={{width: (p*100)+"%", height:"100%", background:"var(--color-accent)", borderRadius: 99}}/>
                  </div>
                  <span style={{fontSize: 11, color:"var(--color-ink-muted)", minWidth: 38, textAlign:"right"}}>{cnt} คน</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final approval queue */}
      <div className="humi-card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{padding: 18, borderBottom:"1px solid var(--color-hairline-soft)"}}>
          <div className="humi-row">
            <h3 className="humi-section-title">รออนุมัติขั้นสุดท้าย (Final Approval)</h3>
            <span className="humi-spacer"/>
            <span className="humi-tag humi-tag--cream">รอบจ่าย 25 พ.ค.</span>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"36px 1.4fr 1.6fr 1fr 1fr 1.2fr 140px", padding:"12px 18px", background:"var(--color-canvas-soft)", borderBottom:"1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color:"var(--color-ink-muted)", letterSpacing:".06em", textTransform:"uppercase"}}>
          <input type="checkbox" style={{accentColor:"var(--color-accent)"}}/>
          <div>พนักงาน · สาขา</div>
          <div>คำเบิก</div>
          <div style={{textAlign:"right"}}>จำนวน</div>
          <div>SPD ตรวจแล้ว</div>
          <div>ผู้จัดการ</div>
          <div></div>
        </div>

        {[
          { n:"มาริสา สงวนศักดิ์", b:"CTW",      t:"ค่ารักษา · บำรุงราษฎร์", a:1840, spd:"✓ พ.ท. · 1 ชม.",   m:"✓ อาทิตย์ ช." },
          { n:"ธีรพัฒน์ มงคล",      b:"CTW",      t:"ทันตกรรม · ฟันใส",       a:1200, spd:"✓ พ.ท. · 2 ชม.",   m:"✓ อาทิตย์ ช." },
          { n:"นภัสรา ธารทอง",     b:"Chidlom",  t:"ค่ารักษา · พญาไท 2",     a:4200, spd:"✓ น.ว. · 3 ชม.",   m:"✓ วรพล จ." },
          { n:"สมศักดิ์ ไทยใจดี",   b:"Embassy",  t:"คลอดบุตร · BNH",         a:8200, spd:"✓ น.ว. · 4 ชม.",   m:"✓ จิรา ป." },
          { n:"อัมพร โพธิ์ทอง",     b:"CTW",      t:"แว่นตา · โปรเกรสซีฟ",    a: 740, spd:"✓ พ.ท. · 4 ชม.",   m:"✓ อาทิตย์ ช." },
        ].map((r, i) => (
          <div key={i} style={{display:"grid", gridTemplateColumns:"36px 1.4fr 1.6fr 1fr 1fr 1.2fr 140px", padding:"14px 18px", borderBottom:"1px solid var(--color-hairline-soft)", alignItems:"center"}}>
            <input type="checkbox" defaultChecked style={{accentColor:"var(--color-accent)"}}/>
            <div>
              <div style={{fontWeight: 600, fontSize: 14}}>{r.n}</div>
              <div style={{fontSize: 11, color:"var(--color-ink-faint)"}}>{r.b}</div>
            </div>
            <div style={{fontSize: 13}}>{r.t}</div>
            <div style={{textAlign:"right", fontFamily:"var(--font-display)", fontSize: 16, fontWeight: 700}}>฿{r.a.toLocaleString()}</div>
            <div style={{fontSize: 12, color:"var(--color-accent)"}}>{r.spd}</div>
            <div style={{fontSize: 12, color:"var(--color-accent)"}}>{r.m}</div>
            <div className="humi-row" style={{gap: 6, justifyContent:"flex-end"}}>
              <button className="humi-button humi-button--primary" style={{padding:"6px 10px", fontSize: 12, minHeight: 32}}><I.check size={12}/> อนุมัติ</button>
            </div>
          </div>
        ))}

        <div className="humi-row" style={{padding:"14px 18px", background:"var(--color-canvas-soft)"}}>
          <span style={{fontSize: 13}}>เลือกแล้ว <b>5 จาก 42</b> รายการ · ยอดรวม <b>฿16,180</b></span>
          <span className="humi-spacer"/>
          <button className="humi-button humi-button--ghost">ส่งกลับ SPD</button>
          <button className="humi-button humi-button--primary"><I.check size={13}/> อนุมัติชุด · ส่ง Payroll</button>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
window.BN_Admin = BN_Admin;
