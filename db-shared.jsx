// ============= MODULE 3: TIME MANAGEMENT — Darwinbox style =============
// Visual signatures: clean white cards, sharp shadows, daily attendance strip,
// "My Pulse" donut, workdesk task lists, tile-based stats.

// Shared tokens — re-aligned to Humi theme (warm canvas, hairlines, larger radii).
// Names kept stable so all db-* files inherit without edits.
//
// ── Status palette (Humi-harmonized, May 2026 retune) ─────────────────
//   Replaces cool generic green/red (#10B981, #D9534A, #22C55E…) with
//   a warm system built from Humi tokens (teal · indigo · sage · butter)
//   plus two custom warm tones that share Humi's chroma.
//
//   Present  · teal       — brand-positive, desired state
//   Late     · deep amber — mild warning (gold)
//   Absent   · terracotta — serious negative (warm red)
//   Leave    · indigo     — planned absence (informational)
//   Holiday  · sage       — rest day (calm)
//   Weekoff  · warm grey  — non-working
//   OT       · coral      — extra hours (distinct warm from late)
const DB = {
  // surfaces — Humi warm cream canvas instead of cool gray
  bg: "var(--color-canvas, #F6F1E8)",
  bgSoft: "var(--color-canvas-soft, #FCFAF5)",
  card: "var(--color-surface, #FFFFFF)",
  // hairlines — warm
  border: "var(--color-hairline, #E7DFD1)",
  borderSoft: "var(--color-hairline-soft, #EFE9DC)",
  // ink — Humi navy ramp
  ink: "var(--color-ink, #0E1B2C)",
  inkSoft: "var(--color-ink-soft, #243447)",
  muted: "var(--color-ink-muted, #5A6A7E)",
  faint: "var(--color-ink-faint, #8A97A8)",

  // ── Status — Humi-aligned warm palette ──
  present:     "#1FA8A0",  presentSoft: "#D6EEEC",   // teal (= brand)
  late:        "#C28932",  lateSoft:    "#F4E4B8",   // deep butter / amber
  absent:      "#B85542",  absentSoft:  "#F4DCD4",   // terracotta
  leave:       "#5B6CE0",  leaveSoft:   "#E1E4FB",   // indigo
  holiday:     "#7F9C84",  holidaySoft: "#DDE7DE",   // sage
  weekoff:     "#B7AC93",  weekoffSoft: "#EFE9DC",   // warm grey
  ot:          "#D97757",  otSoft:      "#F4DDD2",   // coral (extra hours)

  // accent — Humi teal (= present)
  brand: "var(--color-accent, #1FA8A0)",
  brandSoft: "var(--color-accent-soft, #D6EEEC)",

  // attendance heatmap ramp — replaces R-Y-G with warm Humi ladder
  // index 0 (lowest %) → 5 (highest %)
  heatRamp: ["#B85542", "#D97757", "#E8C46B", "#9BB5A0", "#1FA8A0", "#0E7F76"],

  // shared radii — match Humi's softer scale
  rCard: 14,
  rBtn: 10,
  rChip: 8,
  rTile: 10
};

// Container — lets Humi canvas show through (no override).
function DbPage({ children }) {
  return (
    <div style={{
      background: "transparent",
      margin: "0 -32px",
      padding: "0 32px 40px",
      minHeight: "100%",
      color: DB.ink,
      fontFamily: "var(--font-sans)"
    }}>
      {children}
    </div>);

}

// Page head — Darwinbox style: small breadcrumb, tight title, right-aligned actions
function DbPageHead({ crumb, title, sub, actions, chip }) {
  return (
    <div style={{ padding: "20px 0 18px" }}>
      {crumb && <div style={{ fontSize: 12, color: DB.muted, marginBottom: 8, fontWeight: 500 }}>{crumb}</div>}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", color: DB.ink, margin: 0 }}>{title}</h1>
            {chip && <span style={{ padding: "3px 10px", borderRadius: 999, background: DB.brandSoft, color: DB.ink, fontSize: 11, fontWeight: 600, letterSpacing: ".04em" }}>{chip}</span>}
          </div>
          {sub && <div style={{ color: DB.muted, fontSize: 13, marginTop: 4 }}>{sub}</div>}
        </div>
        {actions && <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{actions}</div>}
      </div>
    </div>);

}

// Button — Humi-aligned (softer radii, surface neutral).
function DbBtn({ children, primary, ghost, sm, danger, style, ...rest }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: sm ? "6px 12px" : "9px 16px",
    fontSize: sm ? 12 : 13,
    fontWeight: 600,
    borderRadius: DB.rBtn,
    border: "1px solid transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .15s",
    whiteSpace: "nowrap",
    ...style
  };
  if (primary) Object.assign(base, { background: DB.brand, color: "#fff" });else
  if (danger) Object.assign(base, { background: DB.absent, color: "#fff" });else
  Object.assign(base, { background: DB.card, color: DB.inkSoft, borderColor: DB.border });
  return <button style={base} {...rest}>{children}</button>;
}

// Card — Humi radius (14) + warm hairline.
function DbCard({ children, style, pad = 18, ...rest }) {
  return (
    <div style={{
      background: DB.card,
      border: "1px solid " + DB.border,
      borderRadius: DB.rCard,
      padding: pad,
      ...style
    }} {...rest}>{children}</div>);

}

// Stat tile (Darwinbox: icon left in colored circle, big number, small label)
function DbStat({ icon, label, value, sub, color = DB.brand, soft = DB.brandSoft }) {
  const I = window.PI;
  const Glyph = icon && I[icon];
  return (
    <DbCard pad={16}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {Glyph &&
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: soft, color: color,
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
            <Glyph size={20} />
          </div>
        }
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: DB.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em" }}>{label}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 2 }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: DB.muted, marginTop: 1 }}>{sub}</div>}
        </div>
      </div>
    </DbCard>);

}

// Daily attendance strip — 30 colored bubbles
function DbAttStrip({ days, monthLabel }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: DB.ink }}>การมาทำงาน · {monthLabel}</div>
        <div style={{ display: "flex", gap: 12, fontSize: 11, color: DB.muted }}>
          {[
          ["P", DB.present],
          ["A", DB.absent],
          ["L", DB.leave],
          ["WO", DB.weekoff],
          ["H", DB.holiday]].
          map(([k, c]) =>
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: c }} />
              {k}
            </span>
          )}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(31, 1fr)", gap: 5 }}>
        {days.map((d, i) => {
          const map = {
            P: { bg: DB.presentSoft, fg: DB.present },
            A: { bg: DB.absentSoft, fg: DB.absent },
            L: { bg: DB.leaveSoft, fg: DB.leave },
            WO: { bg: "#F1F5F9", fg: DB.weekoff },
            H: { bg: DB.holidaySoft, fg: DB.holiday },
            LT: { bg: DB.lateSoft, fg: DB.late },
            "": { bg: "transparent", fg: "transparent" }
          };
          const m = map[d.s] || map[""];
          const today = d.today;
          return (
            <div key={i} title={`${d.n} · ${d.s}`} style={{
              aspectRatio: "1",
              borderRadius: 8,
              background: d.s ? m.bg : "transparent",
              border: today ? `2px solid ${DB.brand}` : d.s ? "0" : "1px dashed " + DB.borderSoft,
              color: m.fg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              flexDirection: "column",
              gap: 1
            }}>
              <span style={{ fontSize: 9, color: today ? DB.brand : DB.muted, fontWeight: 600 }}>{d.n}</span>
              {d.s && <span>{d.s === "LT" ? "P" : d.s}</span>}
            </div>);

        })}
      </div>
    </div>);

}

// Donut chart (CSS conic-gradient)
function DbDonut({ size = 120, thick = 16, segments, centerLabel, centerSub }) {
  let acc = 0;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const grad = segments.map((s) => {
    const a = acc / total * 100;
    acc += s.value;
    const b = acc / total * 100;
    return `${s.color} ${a}% ${b}%`;
  }).join(", ");
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `conic-gradient(${grad})`,
      position: "relative",
      display: "inline-flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        position: "absolute", inset: thick, borderRadius: "50%", background: DB.card,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: size > 140 ? 30 : 24, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: DB.ink }}>{centerLabel}</span>
        {centerSub && <span style={{ fontSize: 10, color: DB.muted, marginTop: 3, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>{centerSub}</span>}
      </div>
    </div>);

}

// Section header
function DbSectionHead({ title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", color: DB.ink, margin: 0, fontFamily: "CPN" }}>{title}</h3>
      {action}
    </div>);

}

// ─────────────────────────────────────────────────────────────────────
// Status palette reference — visual chart of every status color, soft
// pair, and where each is used. Drop into any artboard to brief
// engineers/designers on the Humi-aligned attendance system.
// ─────────────────────────────────────────────────────────────────────
function DbStatusPalette() {
  const swatches = [
    { k: "P",  l: "Present",   th: "ทำงาน",         c: DB.present,   s: DB.presentSoft, use: "ลงเวลาเข้า · กะปกติ · งานต่อเนื่อง" },
    { k: "LT", l: "Late",      th: "มาสาย",         c: DB.late,      s: DB.lateSoft,    use: "เข้าหลังเวลายืดหยุ่น · มาช้า ≤ ครึ่งวัน" },
    { k: "A",  l: "Absent",    th: "ขาดงาน",        c: DB.absent,    s: DB.absentSoft,  use: "ไม่ลงเวลา · ไม่มีใบลา · ขาดเอกสาร" },
    { k: "L",  l: "On Leave",  th: "ลา",            c: DB.leave,     s: DB.leaveSoft,   use: "ลาพักร้อน · ลาป่วย · ลากิจ (มีแผน)" },
    { k: "H",  l: "Holiday",   th: "วันหยุดบริษัท", c: DB.holiday,   s: DB.holidaySoft, use: "วันหยุดนักขัตฤกษ์ · วันหยุดประจำปี" },
    { k: "WO", l: "Week off",  th: "วันหยุดประจำสัปดาห์", c: DB.weekoff, s: DB.weekoffSoft, use: "เสาร์/อาทิตย์ตามตารางกะ" },
    { k: "OT", l: "Overtime",  th: "ทำงานล่วงเวลา", c: DB.ot,        s: DB.otSoft,      use: "เกินกะ · งานวันหยุด · เบิก OT" },
  ];

  return (
    <DbCard pad={0}>
      <div style={{ padding: 18, borderBottom: "1px solid " + DB.border }}>
        <div style={{ fontSize: 11, color: DB.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em" }}>Time &amp; Attendance · Color System</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "6px 0 0" }}>Status palette · ปรับให้เข้ากับ Humi</h3>
        <div style={{ fontSize: 13, color: DB.muted, marginTop: 4, maxWidth: 720 }}>
          เปลี่ยนชุดสีจาก Darwinbox (เขียว-แดงเย็น) มาใช้ระบบสีอุ่นของ Humi — เทอร์คอยส์ · อินดิโก้ · sage · butter · terracotta — ให้สื่อสารสถานะแบบเดียวกันแต่เข้ากับ canvas สีครีม
        </div>
      </div>

      {/* Swatch grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, borderBottom: "1px solid " + DB.border }}>
        {swatches.map((sw, i) => (
          <div key={sw.k} style={{ borderLeft: i > 0 ? "1px solid " + DB.borderSoft : "0", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Solid + soft block */}
            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid " + DB.borderSoft }}>
              <div style={{ background: sw.c, height: 64, padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", opacity: 0.9 }}>{sw.k}</span>
                <span style={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace", fontSize: 11, fontWeight: 600 }}>{sw.c.toUpperCase()}</span>
              </div>
              <div style={{ background: sw.s, height: 26, padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "space-between", color: sw.c }}>
                <span style={{ fontSize: 10, fontWeight: 700 }}>SOFT</span>
                <span style={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace", fontSize: 10, fontWeight: 600 }}>{sw.s.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DB.ink }}>{sw.l}</div>
              <div style={{ fontSize: 11, color: DB.muted, marginTop: 1 }}>{sw.th}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sample usages — how the chart looks applied */}
      <div style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {/* 1. Attendance pills (badge style) */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: DB.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>1. Status badge</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {swatches.map(sw => (
              <span key={sw.k} style={{ padding: "4px 10px", borderRadius: 5, background: sw.s, color: sw.c, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>{sw.l}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: DB.muted, marginTop: 12, lineHeight: 1.5 }}>
            ใช้ในตาราง <b>timesheet</b> · workdesk · status column
          </div>
        </div>

        {/* 2. Day bubbles (31-day strip preview) */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: DB.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>2. Attendance strip</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: 4 }}>
            {[
              "P","P","P","P","P","WO","WO",
              "P","LT","P","H","H","P","P",
              "P","L","P","P","WO","WO","A",
              "P","P","P","P","WO","WO","P",
            ].map((s, i) => {
              const m = { P: [DB.presentSoft, DB.present], LT: [DB.lateSoft, DB.late], A: [DB.absentSoft, DB.absent], L: [DB.leaveSoft, DB.leave], H: [DB.holidaySoft, DB.holiday], WO: [DB.weekoffSoft, DB.weekoff] };
              const [bg, fg] = m[s];
              return <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: bg, color: fg, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{s}</div>;
            })}
          </div>
          <div style={{ fontSize: 11, color: DB.muted, marginTop: 12, lineHeight: 1.5 }}>
            แต่ละช่อง = 1 วัน · ใช้ใน <b>My Attendance</b> รายเดือน
          </div>
        </div>

        {/* 3. Donut preview */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: DB.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>3. Donut · My Pulse</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <DbDonut size={84} thick={14}
              segments={[
                { value: 17, color: DB.present },
                { value: 2,  color: DB.leave },
                { value: 1,  color: DB.absent },
                { value: 1,  color: DB.late },
                { value: 6,  color: DB.weekoff },
              ]}
              centerLabel="94%"
            />
            <div style={{ fontSize: 11, lineHeight: 1.7, color: DB.inkSoft }}>
              <div><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: DB.present, marginRight: 6 }}/>Present 17d</div>
              <div><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: DB.leave, marginRight: 6 }}/>On Leave 2d</div>
              <div><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: DB.absent, marginRight: 6 }}/>Absent 1d</div>
              <div><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: DB.late, marginRight: 6 }}/>Late 1d</div>
              <div><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: DB.weekoff, marginRight: 6 }}/>Week off 6d</div>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap ramp */}
      <div style={{ padding: "0 18px 18px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: DB.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>4. Attendance heatmap ramp · 0% → 100%</div>
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid " + DB.borderSoft }}>
          {[
            { c: DB.heatRamp[0], l: "<75%" },
            { c: DB.heatRamp[1], l: "75–79" },
            { c: DB.heatRamp[2], l: "80–84" },
            { c: DB.heatRamp[3], l: "85–89" },
            { c: DB.heatRamp[4], l: "90–94" },
            { c: DB.heatRamp[5], l: "95%+" },
          ].map((b, i) => (
            <div key={i} style={{ flex: 1, background: b.c, padding: "12px 6px", textAlign: "center", color: i >= 4 ? "#fff" : i >= 2 ? DB.ink : "#fff", fontSize: 11, fontWeight: 700, fontFamily: "ui-monospace, SF Mono, Menlo, monospace" }}>{b.l}</div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: DB.muted, marginTop: 8, lineHeight: 1.5 }}>
          ใช้แทน R-Y-G แบบเก่า · ใน <b>org dashboard</b> heatmap (BU × วัน) — โทนอุ่นเข้ากับ canvas ครีมและอ่านง่ายขึ้น
        </div>
      </div>

      {/* Migration note */}
      <div style={{ padding: "14px 18px", background: DB.bgSoft, borderTop: "1px solid " + DB.border, fontSize: 12, color: DB.muted, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <span><b style={{ color: DB.ink }}>Before</b> · <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: "#10B981", verticalAlign: "middle", marginRight: 4 }}/>#10B981 <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: "#D9534A", verticalAlign: "middle", margin: "0 4px 0 8px" }}/>#D9534A <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: "#F59E0B", verticalAlign: "middle", margin: "0 4px 0 8px" }}/>#F59E0B</span>
        <span style={{ color: DB.muted }}>→</span>
        <span><b style={{ color: DB.ink }}>After</b> · <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: DB.present, verticalAlign: "middle", marginRight: 4 }}/>{DB.present} <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: DB.absent, verticalAlign: "middle", margin: "0 4px 0 8px" }}/>{DB.absent} <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: DB.late, verticalAlign: "middle", margin: "0 4px 0 8px" }}/>{DB.late}</span>
        <span style={{ marginLeft: "auto", fontStyle: "italic" }}>Single source: <b style={{ color: DB.ink, fontFamily: "ui-monospace, monospace" }}>db-shared.jsx → window.DB</b></span>
      </div>
    </DbCard>
  );
}

// Export everything
Object.assign(window, { DB, DbPage, DbPageHead, DbBtn, DbCard, DbStat, DbAttStrip, DbDonut, DbSectionHead, DbStatusPalette });