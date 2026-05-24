// ============= MODULE 2 · BENEFIT — ADMIN: Plans & Eligibility Rules =============
// Two operational views for HR Admin:
//   - BN_Admin_Plans  : บริหารแผนสวัสดิการ (assign / enroll / track usage)
//   - BN_Admin_Rules  : เกณฑ์สิทธิ์ (eligibility rules engine)
//
// HRIS sets the catalog (master); HR Admin operates the day-to-day plan assignment
// and tunes eligibility rules within the bands HRIS allows.

// ---------- Shared header with view tabs ----------
window.BN_Admin_Tabs = function ({ active, onChange }) {
  return (
    <div className="humi-row" style={{ marginBottom: 18, gap: 0, borderBottom: "1px solid var(--color-hairline)", paddingBottom: 0 }}>
      {[
        { id: "overview", label: "ภาพรวม · คิวอนุมัติ" },
        { id: "plans",    label: "แผนสวัสดิการ", count: 5 },
        { id: "rules",    label: "เกณฑ์สิทธิ", count: 14 },
      ].map(t => (
        <button key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "12px 18px",
            border: 0,
            background: "transparent",
            borderBottom: "2px solid " + (t.id === active ? "var(--color-accent)" : "transparent"),
            color: t.id === active ? "var(--color-ink)" : "var(--color-ink-muted)",
            fontWeight: t.id === active ? 700 : 500,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
            marginBottom: -1,
          }}>
          {t.label}
          {t.count != null && (
            <span style={{ marginLeft: 8, fontSize: 11, padding: "2px 7px", borderRadius: 99, background: t.id === active ? "var(--color-accent-soft)" : "var(--color-canvas-soft)", color: t.id === active ? "var(--color-accent)" : "var(--color-ink-muted)", fontWeight: 700 }}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// ==================== PLANS VIEW ====================
window.BN_Admin_Plans = function () {
  const I = window.PI;
  const plans = [
    {
      key: "std",  name: "Standard", sub: "พนักงานประจำ ทุกระดับ",
      members: 2104, eligible: 2160, budget: 4800000, used: 3072000, status: "active",
      pkgIcon: "users", tint: "accent",
      benefits: [
        { ic: "hospital", n: "ค่ารักษา", y: 30000 },
        { ic: "tooth",    n: "ทันตกรรม", y: 4000 },
        { ic: "glasses",  n: "แว่นตา", y: 3500 },
        { ic: "baby",     n: "คลอดบุตร", y: 15000 },
        { ic: "pill",     n: "ค่ายา", y: 6000 },
      ],
      lastSync: "วันนี้ 09:12",
    },
    {
      key: "pre",  name: "Premium", sub: "ระดับ G5+ และผู้บริหาร",
      members: 312, eligible: 320, budget: 1800000, used: 982000, status: "active",
      pkgIcon: "star", tint: "butter",
      benefits: [
        { ic: "hospital", n: "ค่ารักษา", y: 80000 },
        { ic: "tooth",    n: "ทันตกรรม", y: 8000 },
        { ic: "glasses",  n: "แว่นตา", y: 6000 },
        { ic: "baby",     n: "คลอดบุตร", y: 30000 },
        { ic: "pill",     n: "ค่ายา", y: 12000 },
        { ic: "shield",   n: "ประกันชีวิต", y: 500000 },
      ],
      lastSync: "วันนี้ 09:12",
    },
    {
      key: "pt",   name: "Part-Time", sub: "รายชั่วโมง · มากกว่า 80 ชม./เดือน",
      members: 612, eligible: 712, budget: 720000, used: 384000, status: "active",
      pkgIcon: "clock", tint: "sage",
      benefits: [
        { ic: "hospital", n: "ค่ารักษา", y: 8000 },
        { ic: "pill",     n: "ค่ายา", y: 2000 },
      ],
      lastSync: "เมื่อวาน",
    },
    {
      key: "out",  name: "Outsource · 6 เดือน", sub: "สัญญาจ้างชั่วคราว",
      members: 75, eligible: 75, budget: 90000, used: 41000, status: "active",
      pkgIcon: "link", tint: "ink",
      benefits: [
        { ic: "hospital", n: "ค่ารักษา (ส่วนต่าง ปกส.)", y: 6000 },
      ],
      lastSync: "12 พ.ค.",
    },
    {
      key: "prob", name: "Probation", sub: "ทดลองงาน 119 วันแรก",
      members: 138, eligible: 138, budget: 165000, used: 12000, status: "limited",
      pkgIcon: "warn", tint: "coral",
      benefits: [
        { ic: "hospital", n: "เฉพาะอุบัติเหตุ", y: 5000 },
      ],
      lastSync: "วันนี้ 09:12",
    },
  ];

  return (
    <div>
      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <window.StatCard label="แผนที่เปิดใช้" value="5" sub="3,241 พนักงานครอบคลุม" icon="layers"/>
        <window.StatCard label="งบประมาณรวม" value="฿7.58M" sub="ใช้ไป 60% (12 เดือน)" icon="baht"/>
        <window.StatCard label="รอจัดสิทธิ" value="56" sub="พ้นทดลองงานเดือนนี้" accent="var(--color-warning)" icon="inbox"/>
        <window.StatCard label="แผนที่ Sync" value="วันนี้ 09:12" sub="HRIS catalog v12.4" icon="refresh"/>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
        {plans.map(p => {
          const Icon = I[p.pkgIcon] || I.heart;
          const pct = Math.round((p.used / p.budget) * 100);
          const cover = Math.round((p.members / p.eligible) * 100);
          return (
            <div key={p.key} className="humi-card" style={{ padding: 0, overflow: "hidden" }}>
              {/* head */}
              <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--color-hairline-soft)" }}>
                <div className="humi-row" style={{ alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `var(--color-${p.tint}-soft)`, color: `var(--color-${p.tint === "ink" ? "ink" : p.tint})`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
                    <div className="humi-row" style={{ gap: 8, flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>{p.name}</h3>
                      {p.status === "limited"
                        ? <span className="humi-tag humi-tag--butter">จำกัดสิทธิ</span>
                        : <span className="humi-tag humi-tag--accent">เปิดใช้</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-ink-muted)", marginTop: 3 }}>{p.sub}</div>
                  </div>
                  <button className="humi-icon-btn"><I.more size={14}/></button>
                </div>

                {/* stat row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 16 }}>
                  <div>
                    <div className="humi-eyebrow" style={{ fontSize: 10 }}>สมาชิก / ที่ผ่านเกณฑ์</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                      {p.members.toLocaleString()}<span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-ink-muted)" }}> / {p.eligible.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 4, background: "var(--color-hairline-soft)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                      <div style={{ width: cover + "%", height: "100%", background: "var(--color-accent)" }}/>
                    </div>
                  </div>
                  <div>
                    <div className="humi-eyebrow" style={{ fontSize: 10 }}>ใช้ / งบประมาณ</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                      ฿{(p.used / 1000).toFixed(0)}K<span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-ink-muted)" }}> / ฿{(p.budget / 1000000).toFixed(1)}M</span>
                    </div>
                    <div style={{ height: 4, background: "var(--color-hairline-soft)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                      <div style={{ width: pct + "%", height: "100%", background: pct > 80 ? "var(--color-warning)" : "var(--color-sage)" }}/>
                    </div>
                  </div>
                  <div>
                    <div className="humi-eyebrow" style={{ fontSize: 10 }}>Sync ล่าสุด</div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{p.lastSync}</div>
                    <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 3 }}>HRIS v12.4</div>
                  </div>
                </div>
              </div>

              {/* benefits chips */}
              <div style={{ padding: "14px 20px" }}>
                <div className="humi-eyebrow" style={{ fontSize: 10, marginBottom: 10 }}>สวัสดิการในแผน · {p.benefits.length} รายการ</div>
                <div className="humi-row" style={{ gap: 6, flexWrap: "wrap" }}>
                  {p.benefits.map(b => {
                    const G = I[b.ic] || I.heart;
                    return (
                      <span key={b.n} className="humi-tag humi-tag--cream" style={{ gap: 6, padding: "5px 10px" }}>
                        <G size={11}/>{b.n} <span style={{ color: "var(--color-ink-muted)", fontWeight: 500 }}>· ฿{(b.y / 1000).toFixed(0)}K</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ padding: 12, background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-hairline-soft)", display: "flex", gap: 8 }}>
                <button className="humi-button humi-button--ghost" style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}><I.users size={12}/> ดูสมาชิก</button>
                <button className="humi-button humi-button--ghost" style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}><I.upload size={12}/> นำเข้า/ส่งออก</button>
                <button className="humi-button humi-button--primary" style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}><I.edit size={12}/> จัดการ</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending assignment queue */}
      <div className="humi-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: 18, borderBottom: "1px solid var(--color-hairline-soft)" }}>
          <div className="humi-row">
            <div>
              <h3 className="humi-section-title">รอจัดสิทธิเข้าแผน</h3>
              <div className="humi-section-sub">พนักงานที่สถานะเปลี่ยนเดือนนี้ ต้องอัปเดตแผนตามเกณฑ์</div>
            </div>
            <span className="humi-spacer"/>
            <button className="humi-button humi-button--ghost"><I.filter size={13}/> กรอง</button>
            <button className="humi-button humi-button--primary"><I.check size={13}/> ยืนยันทั้งหมด (56)</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.4fr 1.4fr 1fr 1fr 120px", padding: "12px 18px", background: "var(--color-canvas-soft)", borderBottom: "1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color: "var(--color-ink-muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
          <input type="checkbox" style={{ accentColor: "var(--color-accent)" }}/>
          <div>พนักงาน</div>
          <div>เหตุการณ์</div>
          <div>แผนปัจจุบัน → ใหม่</div>
          <div>มีผล</div>
          <div>ตรวจกฎ</div>
          <div></div>
        </div>

        {[
          { n: "ปรีชา วรพงษ์",     id: "E-72915", evt: "ผ่านทดลองงาน",          from: "Probation",      to: "Standard", on: "01 มิ.ย. 68", rule: "ครบ 120 วัน · ผ่านประเมิน",       ok: true,  c: "ink" },
          { n: "กัลยา ภูวดล",       id: "E-61480", evt: "เลื่อนระดับ G3 → G5",   from: "Standard",       to: "Premium",  on: "16 พ.ค. 68", rule: "ระดับ G5+ → Premium",             ok: true,  c: "butter" },
          { n: "สมพร ใจกล้า",       id: "E-73420", evt: "เพิ่มผู้พึ่งพา (บุตร)", from: "Standard",       to: "Standard +บุตร", on: "10 พ.ค. 68", rule: "ผู้พึ่งพา → เพิ่มสิทธิคลอด/รักษา", ok: true,  c: "teal" },
          { n: "วรรณา ศรีสุข",      id: "E-71109", evt: "เปลี่ยน FT → PT",       from: "Standard",       to: "Part-Time", on: "01 มิ.ย. 68", rule: "ชั่วโมง <80 → ลดสิทธิ",         ok: false, c: "coral" },
          { n: "ภาคภูมิ ตั้งใจ",    id: "E-75002", evt: "หมดสัญญา Outsource",    from: "Outsource",      to: "—",         on: "31 พ.ค. 68", rule: "สิ้นสุดสัญญา",                  ok: true,  c: "sage" },
        ].map(r => (
          <div key={r.id} style={{ display: "grid", gridTemplateColumns: "36px 1.8fr 1.4fr 1.4fr 1fr 1fr 120px", padding: "14px 18px", borderBottom: "1px solid var(--color-hairline-soft)", alignItems: "center" }}>
            <input type="checkbox" defaultChecked={r.ok} style={{ accentColor: "var(--color-accent)" }}/>
            <div className="humi-row" style={{ gap: 10 }}>
              <span className={"humi-avatar humi-avatar--" + r.c} style={{ width: 32, height: 32, fontSize: 11 }}>{r.n.split(" ")[0].slice(0, 2)}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{r.n}</div>
                <div style={{ fontSize: 11, color: "var(--color-ink-faint)" }}>{r.id}</div>
              </div>
            </div>
            <div style={{ fontSize: 13 }}>{r.evt}</div>
            <div style={{ fontSize: 12, color: "var(--color-ink-soft)" }}>
              <span style={{ color: "var(--color-ink-faint)" }}>{r.from}</span>
              <span style={{ margin: "0 6px", color: "var(--color-ink-faint)" }}>→</span>
              <span style={{ fontWeight: 600 }}>{r.to}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-ink-soft)" }}>{r.on}</div>
            <div>
              {r.ok
                ? <span className="humi-tag humi-tag--accent" style={{ fontSize: 11 }}><I.check size={10}/> ตรงเกณฑ์</span>
                : <span className="humi-tag humi-tag--coral" style={{ fontSize: 11 }}><I.warn size={10}/> ตรวจสอบ</span>}
              <div style={{ fontSize: 10, color: "var(--color-ink-muted)", marginTop: 4 }}>{r.rule}</div>
            </div>
            <div className="humi-row" style={{ justifyContent: "flex-end" }}>
              <button className="humi-button humi-button--ghost" style={{ padding: "6px 10px", fontSize: 11, minHeight: 30 }}>ดู</button>
            </div>
          </div>
        ))}

        <div className="humi-row" style={{ padding: "14px 18px", background: "var(--color-canvas-soft)" }}>
          <span style={{ fontSize: 13, color: "var(--color-ink-muted)" }}>แสดง 5 จาก 56 รายการ</span>
          <span className="humi-spacer"/>
          <button className="humi-icon-btn" style={{ width: 32, height: 32 }}><I.chevL size={13}/></button>
          <button className="humi-icon-btn" style={{ width: 32, height: 32, marginLeft: 4 }}><I.chevR size={13}/></button>
        </div>
      </div>
    </div>
  );
};

// ==================== ELIGIBILITY RULES VIEW ====================
window.BN_Admin_Rules = function () {
  const I = window.PI;
  const ruleGroups = [
    {
      cat: "เกณฑ์ตามสถานะการจ้างงาน",
      icon: "users",
      tint: "accent",
      rules: [
        { id: "R-101", if: "ประเภท = พนักงานประจำ", then: "เข้าแผน Standard ทันที", scope: "2,104 คน", lock: true },
        { id: "R-102", if: "ประเภท = Part-Time AND ชั่วโมง/เดือน ≥ 80", then: "เข้าแผน Part-Time", scope: "612 คน", lock: true },
        { id: "R-103", if: "ประเภท = Outsource AND สัญญา ≥ 6 เดือน", then: "เข้าแผน Outsource", scope: "75 คน", lock: false },
      ],
    },
    {
      cat: "เกณฑ์ตามอายุงาน · ระยะเวลา",
      icon: "clock",
      tint: "sage",
      rules: [
        { id: "R-201", if: "อายุงาน < 120 วัน", then: "อยู่ที่แผน Probation (เฉพาะอุบัติเหตุ)", scope: "138 คน", lock: true },
        { id: "R-202", if: "อายุงาน ≥ 120 วัน AND ผ่านประเมิน = ใช่", then: "ย้ายเข้า Standard อัตโนมัติ", scope: "56 คนเดือนนี้", lock: false, auto: true },
        { id: "R-203", if: "อายุงาน ≥ 5 ปี", then: "เพิ่มวงเงินค่ารักษา +20%", scope: "418 คน", lock: false },
      ],
    },
    {
      cat: "เกณฑ์ตามระดับ / ตำแหน่ง",
      icon: "star",
      tint: "butter",
      rules: [
        { id: "R-301", if: "ระดับ ≥ G5", then: "เข้าแผน Premium", scope: "312 คน", lock: true },
        { id: "R-302", if: "ตำแหน่ง = ผู้จัดการสาขา OR สูงกว่า", then: "เพิ่มประกันชีวิต + Annual Health Check", scope: "84 คน", lock: false },
      ],
    },
    {
      cat: "เกณฑ์ผู้พึ่งพา (Dependents)",
      icon: "baby",
      tint: "coral",
      rules: [
        { id: "R-401", if: "คู่สมรส (จดทะเบียน)", then: "เบิกค่ารักษาได้ 50% ของวงเงินผู้เบิก", scope: "612 คน", lock: false },
        { id: "R-402", if: "บุตร อายุ ≤ 20 ปี (≤ 25 ถ้ายังเรียน)", then: "เบิกค่ารักษา + คลอดบุตรได้", scope: "1,148 คน", lock: false },
        { id: "R-403", if: "บิดามารดา · ใน Standard", then: "ไม่ครอบคลุม", scope: "—", lock: true },
        { id: "R-404", if: "บิดามารดา · ใน Premium", then: "ค่ารักษา ฿10,000/ปี", scope: "312 คน", lock: false },
      ],
    },
    {
      cat: "เกณฑ์อนุมัติอัตโนมัติ (Auto-approve)",
      icon: "check",
      tint: "accent",
      rules: [
        { id: "R-501", if: "ค่ารักษา · ในเครือข่าย AND ยอด ≤ ฿2,000", then: "อนุมัติอัตโนมัติ ไม่ผ่าน SPD", scope: "เฉลี่ย 42% ของเคส", lock: false, auto: true },
        { id: "R-502", if: "ทันตกรรม · ยอด ≤ ฿1,500", then: "อนุมัติอัตโนมัติ", scope: "เฉลี่ย 78%", lock: false, auto: true },
        { id: "R-503", if: "ใบเสร็จ > 60 วัน OR OCR ไม่ชัด", then: "ส่ง SPD ตรวจมือเสมอ", scope: "—", lock: true },
      ],
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" }}>
      {/* MAIN — rule groups */}
      <div>
        {/* Toolbar */}
        <div className="humi-row" style={{ marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <I.search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-ink-muted)" }}/>
            <input className="field-input" placeholder="ค้นหากฎ…" style={{ padding: "9px 12px 9px 34px", width: 280, borderRadius: 10, border: "1px solid var(--color-hairline)" }}/>
          </div>
          <span className="humi-spacer"/>
          <window.SegTabs active="all" tabs={[
            { id: "all",  label: "ทั้งหมด", count: 14 },
            { id: "auto", label: "อัตโนมัติ", count: 4 },
            { id: "draft", label: "ร่าง", count: 2 },
          ]}/>
          <button className="humi-button humi-button--primary"><I.plus size={13}/> สร้างกฎใหม่</button>
        </div>

        {ruleGroups.map(g => {
          const Icon = I[g.icon];
          return (
            <div key={g.cat} className="humi-card" style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
              <div className="humi-row" style={{ padding: "14px 18px", borderBottom: "1px solid var(--color-hairline-soft)", background: "var(--color-canvas-soft)" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `var(--color-${g.tint}-soft)`, color: `var(--color-${g.tint === "ink" ? "ink" : g.tint})`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15}/>
                </div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, marginLeft: 12 }}>{g.cat}</h4>
                <span className="humi-spacer"/>
                <span style={{ fontSize: 11, color: "var(--color-ink-muted)" }}>{g.rules.length} กฎ</span>
              </div>

              {g.rules.map(r => (
                <div key={r.id} style={{ padding: "14px 18px", borderBottom: "1px solid var(--color-hairline-soft)", display: "grid", gridTemplateColumns: "70px 1fr 1.2fr 110px 120px", gap: 16, alignItems: "center" }}>
                  <div style={{ fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 11, fontWeight: 700, color: "var(--color-accent)" }}>{r.id}</div>

                  {/* IF */}
                  <div>
                    <div className="humi-eyebrow" style={{ fontSize: 9, color: "var(--color-info)", marginBottom: 4 }}>IF · ถ้า</div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{r.if}</div>
                  </div>

                  {/* THEN */}
                  <div style={{ position: "relative", paddingLeft: 20 }}>
                    <div style={{ position: "absolute", left: -10, top: "50%", transform: "translateY(-50%)", color: "var(--color-ink-faint)", fontSize: 18, lineHeight: 1 }}>→</div>
                    <div className="humi-eyebrow" style={{ fontSize: 9, color: "var(--color-accent)", marginBottom: 4 }}>THEN · จึง</div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{r.then}</div>
                  </div>

                  {/* Scope */}
                  <div>
                    <div className="humi-eyebrow" style={{ fontSize: 9, marginBottom: 4 }}>ผลกระทบ</div>
                    <div style={{ fontSize: 12, color: "var(--color-ink-soft)", fontWeight: 600 }}>{r.scope}</div>
                  </div>

                  {/* Status / actions */}
                  <div className="humi-row" style={{ gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                    {r.auto && <span className="humi-tag humi-tag--accent" style={{ fontSize: 10, padding: "2px 7px" }}>อัตโนมัติ</span>}
                    {r.lock
                      ? <span title="กำหนดจาก HRIS · แก้ไม่ได้" style={{ fontSize: 10, color: "var(--color-ink-faint)", fontWeight: 600 }}>🔒 HRIS</span>
                      : <button className="humi-icon-btn" style={{ width: 30, height: 30 }}><I.edit size={12}/></button>}
                    <button className="humi-icon-btn" style={{ width: 30, height: 30 }}><I.more size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* SIDE — simulator + history */}
      <div style={{ position: "sticky", top: 90, alignSelf: "start" }}>
        <div className="humi-card" style={{ marginBottom: 16 }}>
          <div className="humi-row">
            <I.flag size={14} style={{ color: "var(--color-accent)" }}/>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, marginLeft: 8 }}>จำลองเกณฑ์ · Simulator</h4>
          </div>
          <div className="humi-section-sub" style={{ marginTop: 6 }}>ทดสอบว่าพนักงานคนหนึ่งจะได้สิทธิอะไรบ้าง</div>

          <div className="humi-col" style={{ gap: 12, marginTop: 14 }}>
            <div>
              <div className="field-label">พนักงาน</div>
              <div className="humi-row" style={{ padding: "8px 10px", border: "1px solid var(--color-hairline)", borderRadius: 8, background: "var(--color-canvas-soft)" }}>
                <span className="humi-avatar humi-avatar--teal" style={{ width: 26, height: 26, fontSize: 10 }}>MS</span>
                <span style={{ fontSize: 13, fontWeight: 600, marginLeft: 8 }}>มาริสา สงวนศักดิ์</span>
                <span className="humi-spacer"/>
                <I.x size={12} style={{ color: "var(--color-ink-muted)", cursor: "pointer" }}/>
              </div>
            </div>

            <div className="humi-card humi-card--cream" style={{ padding: 14, marginTop: 4 }}>
              <div className="humi-eyebrow" style={{ marginBottom: 8 }}>ผลการประเมินกฎ</div>
              {[
                { r: "R-101", n: "ประเภท = ประจำ", ok: true },
                { r: "R-202", n: "อายุงาน ≥ 120 วัน", ok: true },
                { r: "R-301", n: "ระดับ G5+", ok: false },
                { r: "R-402", n: "มีบุตร ≤ 20 ปี", ok: false },
              ].map(rr => (
                <div key={rr.r} className="humi-row" style={{ padding: "6px 0", fontSize: 12, borderBottom: "1px solid var(--color-hairline-soft)" }}>
                  {rr.ok
                    ? <I.check size={13} style={{ color: "var(--color-accent)" }}/>
                    : <I.x size={13} style={{ color: "var(--color-ink-faint)" }}/>}
                  <span style={{ marginLeft: 8, color: rr.ok ? "var(--color-ink)" : "var(--color-ink-faint)" }}>{rr.r}</span>
                  <span style={{ marginLeft: 6, color: "var(--color-ink-muted)" }}>{rr.n}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--color-hairline-soft)" }}>
                <div className="humi-eyebrow" style={{ fontSize: 10 }}>ผลสรุป</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, marginTop: 4 }}>เข้าแผน Standard</div>
                <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 4 }}>3 จาก 14 กฎตรง · ไม่มีกฎที่ขัดกัน</div>
              </div>
            </div>
          </div>
        </div>

        <div className="humi-card">
          <div className="humi-row" style={{ marginBottom: 10 }}>
            <I.refresh size={14} style={{ color: "var(--color-ink-muted)" }}/>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, marginLeft: 8 }}>แก้ไขล่าสุด</h4>
          </div>
          {[
            { who: "คุณ", w: "R-202 ปรับเป็น 120 วัน", t: "2 ชม.ก่อน" },
            { who: "คุณ", w: "เปิดใช้ R-502 ทันตกรรม Auto", t: "เมื่อวาน" },
            { who: "HRIS · ณัฐวุฒิ", w: "ล็อค R-101 (master)", t: "12 พ.ค." },
            { who: "คุณ", w: "เพิ่ม R-404 บิดามารดา Premium", t: "08 พ.ค." },
          ].map((h, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--color-hairline-soft)" : 0, fontSize: 12 }}>
              <div style={{ fontWeight: 600 }}>{h.w}</div>
              <div style={{ color: "var(--color-ink-muted)", marginTop: 2 }}>{h.who} · {h.t}</div>
            </div>
          ))}
          <button className="humi-button humi-button--ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10, padding: "8px 12px", fontSize: 12 }}>ดู Audit log ทั้งหมด</button>
        </div>
      </div>
    </div>
  );
};
