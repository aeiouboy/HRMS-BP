// Home — faithful port of src/frontend/src/app/[locale]/home/page.tsx
function ProdHome() {
  const I = window.PI;

  // Organisational Updates — Central Retail intranet tiles (Humi brand palette)
  // Cycles through 5 brand-aligned duotones: teal · coral · butter · sage · ink
  const BRAND_PALETTES = [
    ["#1FA8A0","#D6EEEC"],   // teal duo
    ["#E08864","#FBE7DC"],   // coral duo
    ["#D4A53A","#F4E4B8"],   // butter duo
    ["#7DA084","#D6EEEC"],   // sage duo
    ["#0E1B2C","#5F7689"],   // ink duo
  ];
  const ORG_UPDATES = [
    { kind: "link", l: "People Portal",                  thumb: "people-portal"    },
    { kind: "news", l: "CNEXT | LINE",                   thumb: "cnext-line",  badge: "ใหม่" },
    { kind: "link", l: "AI Academy",                     thumb: "ai-academy"       },
    { kind: "link", l: "User Manual",                    thumb: "user-manual"      },
    { kind: "link", l: "สมัครกองทุนสำรองเลี้ยงชีพ",         thumb: "provident-fund"   },
    { kind: "link", l: "Download documents",             thumb: "download-docs"    },
    { kind: "link", l: "Mobile (TAM)",                   thumb: "mobile-tam"       },
    { kind: "news", l: "Tax Deduction",                  thumb: "tax-deduction"    },
    { kind: "link", l: "E-Patient Transfer Document",    thumb: "patient-transfer" },
    { kind: "news", l: "Tops Care Telehealth Transfer",  thumb: "tops-care"        },
    { kind: "link", l: "Central Career Opportunities",   thumb: "career"           },
    { kind: "link", l: "People Care Portal",             thumb: "people-care"      },
  ].map((u, i) => ({ ...u, palette: BRAND_PALETTES[i % BRAND_PALETTES.length] }));
  const [updFilter, setUpdFilter] = React.useState("all");
  const filteredUpd = updFilter === "all" ? ORG_UPDATES : ORG_UPDATES.filter(u => u.kind === updFilter);
  const countNews = ORG_UPDATES.filter(u => u.kind === "news").length;
  const countLink = ORG_UPDATES.filter(u => u.kind === "link").length;

  return (
    <div style={{paddingBottom: 32}}>
      {/* Top action bar */}
      <div style={{marginBottom: 20, display:"flex", justifyContent:"flex-end"}}>
        <button className="humi-button humi-button--primary"><I.plus size={16}/> ส่งคำร้องใหม่</button>
      </div>

      {/* Row 1: Hero + Today */}
      <div style={{display:"grid", gap: 20, gridTemplateColumns: "1.35fr 1fr"}}>
        <div className="humi-card humi-grain" style={{overflow:"hidden", paddingRight: 100}}>
          <div className="humi-blob humi-blob--teal" style={{width: 120, height: 150, right: -30, top: -30, opacity: 0.85}}/>
          <div className="humi-blob humi-blob--coral" style={{width: 80, height: 100, right: 60, bottom: -20, opacity: 0.7}}/>
          <div className="humi-blob humi-blob--butter" style={{width: 44, height: 56, right: 110, top: 80, opacity: 0.9}}/>
          <div className="humi-eyebrow" style={{marginBottom: 10}}>วันอังคาร · 21 เมษายน 2568</div>
          <h1 className="humi-hero-title" style={{maxWidth: 460}}>
            สวัสดีตอนเช้า คุณจงรักษ์<br/>
            <span className="humi-hero-title-soft">มีคำขอ 2 รายการรอคุณวันนี้</span>
          </h1>
          <div className="humi-row" style={{marginTop: 22, gap: 10, flexWrap:"wrap"}}>
            <a className="humi-button humi-button--primary"><I.check size={16}/> ตรวจคำขอลา</a>
            <a className="humi-button humi-button--ghost"><I.mega size={16}/> ดูประกาศ</a>
          </div>
        </div>

        <div className="humi-card">
          <div className="humi-row" style={{alignItems:"flex-start"}}>
            <div>
              <div className="humi-eyebrow">วันนี้</div>
              <h3 style={{marginTop: 6, fontSize: 20, fontFamily:"var(--font-display)", fontWeight: 600, letterSpacing:"-0.015em"}}>การมาทำงาน · 247 คน</h3>
            </div>
            <span className="humi-tag humi-tag--accent" style={{marginLeft:"auto"}}>สด</span>
          </div>
          <div className="humi-row" style={{marginTop: 18, gap: 20}}>
            <div className="humi-ring" style={{"--p": 78}}>
              <div style={{position:"relative", textAlign:"center", zIndex: 1}}>
                <div className="humi-ring-val">193</div>
                <div style={{fontSize: 10, letterSpacing:".1em", textTransform:"uppercase", color:"var(--color-ink-muted)"}}>ทำงาน</div>
              </div>
            </div>
            <div className="humi-col" style={{gap: 10, flex: 1}}>
              {[
                {l:"เข้างาน",  v: 193, c: "var(--color-accent)"},
                {l:"ลางาน",    v:  32, c: "var(--color-warning)"},
                {l:"นอกกะ",    v:  22, c: "var(--color-hairline)"},
              ].map(r => (
                <div key={r.l} className="humi-row" style={{justifyContent:"space-between"}}>
                  <div className="humi-row"><span style={{width:8,height:8,borderRadius:999,background:r.c}}/><span style={{fontSize:13,color:"var(--color-ink-soft)"}}>{r.l}</span></div>
                  <b style={{fontSize:14}}>{r.v}</b>
                </div>
              ))}
            </div>
          </div>
          <hr className="humi-divider"/>
          <div className="humi-row" style={{gap: 0}}>
            {["TS","RP","JC","MK","AP"].map((i, idx) => (
              <span key={i} className={"humi-avatar humi-avatar--" + ["teal","sage","butter","ink","teal"][idx]}
                    style={{marginLeft: idx===0?0:-8, border:"2px solid var(--color-surface)", width:30, height:30, fontSize:11}}>
                {i}
              </span>
            ))}
            <span style={{fontSize: 13, color:"var(--color-ink-muted)", marginLeft: 8}}>+188 คนทำงานอยู่</span>
          </div>
        </div>
      </div>

      {/* Row 1.5: Organisational Updates (Central Retail intranet tiles) */}
      <div className="humi-card humi-card--cream" style={{marginTop: 20, padding:"22px 24px", position:"relative", overflow:"hidden"}}>
        <div className="humi-blob humi-blob--teal" style={{width: 100, height: 130, right: -30, top: -40, opacity: 0.4}}/>
        <div className="humi-row" style={{marginBottom: 18, gap: 12, flexWrap:"wrap", position:"relative"}}>
          <div>
            <div className="humi-eyebrow">ลิงก์องค์กร · Central Retail</div>
            <h3 style={{fontSize: 20, fontFamily:"var(--font-display)", fontWeight: 600, color:"var(--color-ink)", margin: "4px 0 0", letterSpacing:"-0.015em"}}>
              Organisational Updates
            </h3>
          </div>
          <div className="humi-spacer"/>
          {[
            { id: "all",  l: `All (${ORG_UPDATES.length})` },
            { id: "news", l: `News (${countNews})` },
            { id: "link", l: `Quick link (${countLink})` },
          ].map(t => (
            <button key={t.id} onClick={() => setUpdFilter(t.id)}
              style={{
                padding:"6px 14px", borderRadius: 999, fontFamily:"inherit",
                fontSize: 12, fontWeight: 600, cursor:"pointer",
                background: updFilter === t.id ? "var(--color-accent)" : "transparent",
                color:      updFilter === t.id ? "#fff" : "var(--color-ink-soft)",
                border:"1px solid " + (updFilter === t.id ? "var(--color-accent)" : "var(--color-hairline)"),
                transition:"all .15s",
              }}>{t.l}</button>
          ))}
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, position:"relative"}}>
          {filteredUpd.map(u => <OrgUpdateTile key={u.l} item={u}/>)}
        </div>
      </div>

      {/* Row 2: Approvals + Pending docs */}
      <div style={{display:"grid", gap: 20, gridTemplateColumns:"1.35fr 1fr", marginTop: 20}}>
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 6}}>
            <div>
              <div className="humi-eyebrow">รออนุมัติ</div>
              <h3 style={{marginTop: 6, fontSize: 20, fontFamily:"var(--font-display)", fontWeight: 600}}>คำขอลางาน</h3>
            </div>
            <span className="humi-tag humi-tag--coral" style={{marginLeft:"auto"}}>2 รายการ</span>
          </div>
          <ul className="humi-list" style={{padding: 0, margin: 0, listStyle:"none"}}>
            {[
              { i:"MK", c:"teal",  n:"มาร์คัส เคลลี่", t:"ลาพักร้อน 5 วัน", w:"28 เม.ย. – 2 พ.ค.", d:"ยื่นเมื่อวาน"},
              { i:"PS", c:"butter", n:"พริยะ ชาห์",     t:"ลาป่วย 1 วัน",   w:"พรุ่งนี้",          d:"1 ชม.ก่อน"},
            ].map(r => (
              <li key={r.n} className="humi-row-item">
                <span className={"humi-avatar humi-avatar--" + r.c}>{r.i}</span>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{r.n} <span style={{color:"var(--color-ink-muted)", fontWeight: 400}}>· {r.t}</span></div>
                  <div style={{fontSize: 13, color:"var(--color-ink-muted)", marginTop: 2}}>{r.w} · {r.d}</div>
                </div>
                <div className="humi-row" style={{gap: 8}}>
                  <button className="humi-button humi-button--ghost" style={{padding:"6px 12px", fontSize: 13, minHeight: 36}}><I.x size={14}/> ปฏิเสธ</button>
                  <button className="humi-button humi-button--primary" style={{padding:"6px 12px", fontSize: 13, minHeight: 36}}><I.check size={14}/> อนุมัติ</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="humi-card humi-card--cream">
          <div className="humi-eyebrow">เอกสารค้าง</div>
          <h3 style={{marginTop: 6, fontSize: 20, fontFamily:"var(--font-display)", fontWeight: 600, marginBottom: 14}}>ต้องทำให้เสร็จ</h3>
          {[
            {t:"แบบฟอร์ม PND91 ปี 2567", s:"ภาษีเงินได้ประจำปี · กรอกรายได้", near: true},
            {t:"เอกสารยืนยันที่อยู่",    s:"ตรงตามทะเบียนบ้าน · รูปถ่าย",  near: false},
            {t:"กองทุนสำรองเลี้ยงชีพ",   s:"เลือกสัดส่วนเงินสมทบ",         near: false},
          ].map(d => (
            <div key={d.t} className="humi-row" style={{padding:"12px 0", borderTop:"1px solid var(--color-hairline-soft)"}}>
              <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--color-surface)", border:"1px solid var(--color-hairline)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--color-ink-muted)"}}><I.fileText size={18}/></div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: 14}}>{d.t}</div>
                <div style={{fontSize: 12, color:"var(--color-ink-muted)"}}>{d.s}</div>
              </div>
              {d.near && <span className="humi-tag humi-tag--butter">ใกล้ครบกำหนด</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Announcements + Calendar */}
      <div style={{display:"grid", gap: 20, gridTemplateColumns:"1.35fr 1fr", marginTop: 20}}>
        <div className="humi-card">
          <div className="humi-row" style={{marginBottom: 12}}>
            <div>
              <div className="humi-eyebrow">ประกาศ</div>
              <h3 style={{marginTop: 6, fontSize: 20, fontFamily:"var(--font-display)", fontWeight: 600}}>สำคัญสำหรับคุณ</h3>
            </div>
            <span className="humi-spacer"/>
            <a style={{color:"var(--color-accent)", fontSize: 13, fontWeight: 600, display:"inline-flex", alignItems:"center", gap: 6}}>เปิดฟีด <I.arrowR size={13}/></a>
          </div>

          {[
            {who:"จอร์แดน เหมย · ฝ่ายบุคคล", i:"JM", c:"sage", w:"เมื่อวาน", pin: true,
             t:"นโยบายลาคลอดใหม่ · เริ่มใช้ 1 พ.ค.",
             b:"ขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยรับค่าจ้างเต็ม · เซสชันถามตอบพฤหัสบดี 15:00",
             r:["❤️ 42","🎉 21"]},
            {who:"ฝ่ายปฏิบัติการ", i:"OP", c:"teal", w:"2 วันก่อน",
             t:"ตรวจนับสินค้าฤดูใบไม้ผลิ · เสาร์ 25 เม.ย.",
             b:"ปิดก่อนกำหนด 30 นาที · ค่าแรงตามอัตรากะ + อาหาร",
             r:["👍 14","🙌 6"]},
          ].map(p => (
            <article key={p.t} className={"humi-post" + (p.pin ? " humi-post--pin" : "")}>
              <div className="humi-row">
                <span className={"humi-avatar humi-avatar--" + p.c} style={{width: 30, height: 30, fontSize: 11}}>{p.i}</span>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 13}}><b>{p.who}</b> <span style={{color:"var(--color-ink-muted)"}}>· {p.w}</span></div>
                </div>
                {p.pin && <span className="humi-tag humi-tag--ink"><I.pin size={11}/> ปักหมุด</span>}
              </div>
              <h4 style={{fontFamily:"var(--font-display)", fontSize: 18, marginTop: 10, fontWeight: 600}}>{p.t}</h4>
              <p style={{color:"var(--color-ink-soft)", fontSize: 14, marginTop: 6, lineHeight: 1.6}}>{p.b}</p>
              <div className="humi-row" style={{marginTop: 12, gap: 10}}>
                {p.r.map(x => <span key={x} className="humi-tag">{x}</span>)}
                <span className="humi-spacer"/>
                <button className="humi-button humi-button--ghost" style={{padding:"4px 10px", fontSize: 12, minHeight: 32}}>ตอบกลับ</button>
              </div>
            </article>
          ))}
        </div>

        <div className="humi-col" style={{gap: 20}}>
          <div className="humi-card humi-card--ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="humi-blob humi-blob--teal" style={{width: 90, height: 110, right: -20, bottom: -30, opacity: 0.55}}/>
            <div className="humi-eyebrow" style={{color:"var(--color-accent)"}}><I.party size={12} style={{display:"inline-block", verticalAlign:-2, marginRight: 4}}/> สัปดาห์นี้</div>
            <h3 style={{marginTop: 8, fontSize: 20, color:"var(--color-canvas-soft)", fontFamily:"var(--font-display)", fontWeight: 600}}>วันเกิด 2 คน · ครบรอบ 1 คน</h3>
            <div className="humi-row" style={{marginTop: 14, gap: 0}}>
              <span className="humi-avatar humi-avatar--teal" style={{border:"2px solid var(--color-ink)"}}>TS</span>
              <span className="humi-avatar humi-avatar--coral" style={{border:"2px solid var(--color-ink)", marginLeft:-8}}>RP</span>
              <span className="humi-avatar humi-avatar--sage" style={{border:"2px solid var(--color-ink)", marginLeft:-8}}>JC</span>
              <span className="humi-spacer"/>
              <button className="humi-button humi-button--primary">ส่งคำอวยพร</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ProdHome = ProdHome;

// ── OrgUpdateTile ─────────────────────────────────────────────────────
// Card with illustrated thumbnail on the left + title on the right.
// Thumbnails are SVG placeholders styled per palette — replace with real
// uploaded artwork in production.
function OrgUpdateTile({ item }) {
  const [c1, c2] = item.palette;
  return (
    <a href="#" style={{
      display:"flex", gap: 0, alignItems:"stretch",
      background:"var(--color-surface)",
      borderRadius: 14,
      border:"1px solid var(--color-hairline)",
      overflow:"hidden",
      textDecoration:"none",
      transition:"transform .15s, box-shadow .15s, border-color .15s",
      minHeight: 92,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(14,27,44,0.10)";
      e.currentTarget.style.borderColor = c1;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = "";
      e.currentTarget.style.borderColor = "var(--color-hairline)";
    }}>
      {/* Thumbnail panel — flat brand tint */}
      <div style={{
        flexShrink: 0,
        width: 96,
        background: c2,
        position:"relative",
        display:"flex", alignItems:"center", justifyContent:"center",
        borderRight: `1px solid ${c1}22`,
      }}>
        <OrgThumb kind={item.thumb} c1={c1} c2={c2}/>
        {item.badge && (
          <span style={{
            position:"absolute", top: 6, left: 6,
            background:"var(--color-accent)", color:"#fff",
            padding:"2px 8px", borderRadius: 4,
            fontSize: 9, fontWeight: 700, letterSpacing:".08em", textTransform:"uppercase",
          }}>{item.badge}</span>
        )}
        {/* Brand accent stripe */}
        <span style={{
          position:"absolute", left: 0, top: 0, bottom: 0,
          width: 3, background: c1,
        }}/>
      </div>

      {/* Title panel */}
      <div style={{
        flex: 1, minWidth: 0,
        padding:"12px 14px",
        display:"flex", alignItems:"center",
      }}>
        <span style={{
          fontSize: 13, fontWeight: 600,
          color:"var(--color-ink)",
          lineHeight: 1.35,
          letterSpacing:"-0.005em",
        }}>{item.l}</span>
      </div>
    </a>
  );
}

// Brand-aligned mono-color illustrations — single foreground (c1) on tinted bg (c2)
function OrgThumb({ kind, c1, c2 }) {
  const fg = c1;
  const common = { width: 52, height: 52, viewBox: "0 0 64 64", fill: "none" };
  switch (kind) {
    case "people-portal":
      return <svg {...common}><rect x="8" y="14" width="48" height="36" rx="3" fill={fg} opacity="0.12"/><rect x="8" y="14" width="48" height="36" rx="3" stroke={fg} strokeWidth="2"/><rect x="12" y="18" width="40" height="3" rx="1" fill={fg}/><circle cx="20" cy="34" r="3.5" fill={fg}/><circle cx="32" cy="34" r="3.5" fill={fg} opacity="0.6"/><circle cx="44" cy="34" r="3.5" fill={fg} opacity="0.35"/></svg>;
    case "cnext-line":
      return <svg {...common}><rect x="10" y="14" width="44" height="32" rx="10" fill={fg} opacity="0.12"/><rect x="10" y="14" width="44" height="32" rx="10" stroke={fg} strokeWidth="2"/><circle cx="22" cy="30" r="2.5" fill={fg}/><circle cx="32" cy="30" r="2.5" fill={fg}/><circle cx="42" cy="30" r="2.5" fill={fg}/><path d="M 26 46 l 4 6 l 4 -6" fill={fg}/></svg>;
    case "ai-academy":
      return <svg {...common}><circle cx="32" cy="32" r="18" fill={fg} opacity="0.12"/><circle cx="32" cy="32" r="18" stroke={fg} strokeWidth="2"/><text x="32" y="38" textAnchor="middle" fontSize="14" fontWeight="800" fill={fg} fontFamily="sans-serif">AI</text><circle cx="48" cy="18" r="2" fill={fg}/><circle cx="16" cy="46" r="2" fill={fg}/></svg>;
    case "user-manual":
      return <svg {...common}><rect x="16" y="12" width="32" height="40" rx="2" fill={fg} opacity="0.12"/><rect x="16" y="12" width="32" height="40" rx="2" stroke={fg} strokeWidth="2"/><rect x="16" y="12" width="5" height="40" fill={fg}/><rect x="26" y="22" width="18" height="2" rx="1" fill={fg} opacity="0.6"/><rect x="26" y="28" width="14" height="2" rx="1" fill={fg} opacity="0.6"/><rect x="26" y="34" width="18" height="2" rx="1" fill={fg} opacity="0.6"/></svg>;
    case "provident-fund":
      return <svg {...common}><circle cx="32" cy="32" r="18" fill={fg} opacity="0.12"/><circle cx="32" cy="32" r="18" stroke={fg} strokeWidth="2"/><text x="32" y="40" textAnchor="middle" fontSize="22" fontWeight="800" fill={fg} fontFamily="sans-serif">฿</text></svg>;
    case "download-docs":
      return <svg {...common}><rect x="14" y="12" width="28" height="36" rx="2" fill={fg} opacity="0.12"/><rect x="14" y="12" width="28" height="36" rx="2" stroke={fg} strokeWidth="2"/><path d="M 28 22 v 14 m -5 -5 l 5 5 l 5 -5" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><rect x="20" y="42" width="16" height="2" rx="1" fill={fg}/></svg>;
    case "mobile-tam":
      return <svg {...common}><rect x="22" y="10" width="20" height="42" rx="4" fill={fg} opacity="0.12"/><rect x="22" y="10" width="20" height="42" rx="4" stroke={fg} strokeWidth="2"/><circle cx="32" cy="48" r="1.5" fill={fg}/><path d="M 26 26 l 4 4 l 8 -8" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "tax-deduction":
      return <svg {...common}><rect x="12" y="14" width="28" height="36" rx="2" fill={fg} opacity="0.12"/><rect x="12" y="14" width="28" height="36" rx="2" stroke={fg} strokeWidth="2"/><rect x="16" y="20" width="16" height="2" rx="1" fill={fg}/><rect x="16" y="26" width="20" height="2" rx="1" fill={fg} opacity="0.5"/><rect x="16" y="32" width="14" height="2" rx="1" fill={fg} opacity="0.5"/><circle cx="46" cy="42" r="9" fill={fg}/><text x="46" y="45" textAnchor="middle" fontSize="8" fontWeight="800" fill={c2} fontFamily="sans-serif">TAX</text></svg>;
    case "patient-transfer":
      return <svg {...common}><rect x="12" y="14" width="26" height="36" rx="2" fill={fg} opacity="0.12"/><rect x="12" y="14" width="26" height="36" rx="2" stroke={fg} strokeWidth="2"/><rect x="23" y="22" width="4" height="14" fill={fg}/><rect x="18" y="27" width="14" height="4" fill={fg}/><path d="M 44 32 l 6 -4 v 8 z" fill={fg}/></svg>;
    case "tops-care":
      return <svg {...common}><circle cx="32" cy="28" r="12" fill={fg} opacity="0.12"/><circle cx="32" cy="28" r="12" stroke={fg} strokeWidth="2"/><path d="M 32 35 q -7 -3 -7 -10 q 0 -3 3 -3 q 2 0 4 2 q 2 -2 4 -2 q 3 0 3 3 q 0 7 -7 10 z" fill={fg}/><rect x="14" y="44" width="36" height="5" rx="2.5" fill={fg} opacity="0.5"/></svg>;
    case "career":
      return <svg {...common}><rect x="10" y="22" width="44" height="26" rx="3" fill={fg} opacity="0.12"/><rect x="10" y="22" width="44" height="26" rx="3" stroke={fg} strokeWidth="2"/><path d="M 24 22 v -4 q 0 -2 2 -2 h 12 q 2 0 2 2 v 4" stroke={fg} strokeWidth="2" fill="none"/><circle cx="32" cy="34" r="5" stroke={fg} strokeWidth="2" fill="none"/><path d="M 35.5 37.5 l 4 4" stroke={fg} strokeWidth="2.5" strokeLinecap="round"/></svg>;
    case "people-care":
      return <svg {...common}><path d="M 32 48 q -14 -7 -14 -19 q 0 -5 5 -5 q 4 0 9 4 q 5 -4 9 -4 q 5 0 5 5 q 0 12 -14 19 z" fill={fg} opacity="0.12" stroke={fg} strokeWidth="2"/><circle cx="27" cy="26" r="1.8" fill={fg}/><circle cx="37" cy="26" r="1.8" fill={fg}/></svg>;
    default:
      return <svg {...common}><rect x="14" y="14" width="36" height="36" rx="4" fill={fg}/></svg>;
  }
}
