// mod-notifications.jsx — Clickable Inbox + Bell with dropdown previews
// Replaces the static buttons in ProdShell/PersonaShell. Shows real content
// on click so reviewers can SEE the difference between the two surfaces.

const I_ = () => window.PI;

// ─── Sample content ────────────────────────────────────────────────────
// STRICT separation:
//   To-Do (Inbox)     = งานอนุมัติเท่านั้น — ลา, ออก, เบิก, OT, swap, etc.
//   Alert (Bell)      = ข่าวสาร / ประกาศ / trending / events — ไม่มีอะไรต้องอนุมัติ
//
// If an item has an "approve / reject" decision → Inbox.
// If an item is FYI (status update, news, mention, system event) → Bell.

const BELL_ITEMS_DEFAULT = [
  { time: "5 น.",   read: false, type: "trending", title: "ยอดขาย Estee Lauder พุ่งนี้ทะลุ +18%",       sub: "Trending ใน Central World · ขึ้น Top 5",          icon: "barChart",  color: "#1FA8A0" },
  { time: "30 น.",  read: false, type: "announce", title: "ข่าวด่วน: ปิดระบบ payroll ชั่วคราว 18-20 น.",  sub: "ฝ่ายไอทีแจ้ง · จะรีสตาร์ทหลัง 20:00 น.",   icon: "mega",      color: "#E11D48" },
  { time: "1 ชม.",  read: false, type: "announce", title: "ประกาศ: หยุดงานแห่งชาติ 1 มิ.ย.",        sub: "บริษัทแจ้งทุกคน",                                icon: "calendar",  color: "#5B6CE0" },
  { time: "3 ชม.",  read: false, type: "trending", title: "พอล 'O ของขวัญชอบที่สุด' ได้รับ 482 โหวต",     sub: "3 อันดับแรกในฝ่าย",                              icon: "thumbsUp",  color: "#1FA8A0" },
  { time: "เมื่อวาน", read: true,  type: "news",     title: "ข่าว: CRG เปิดสาขาใหม่ที่ EmSphere",        sub: "มิ.ย. 2569 · รับสมัครได้",                       icon: "network",   color: "#8A97A8" },
  { time: "เมื่อวาน", read: true,  type: "mention",  title: "หัวหน้า mention คุณในประกาศร้าน",     sub: "'ขอบคุณกฤษณ์ ที่ยอดขายติดอันดับ 1...'",      icon: "msgSquare", color: "#5B6CE0" },
  { time: "2 วัน",   read: true,  type: "event",    title: "พรุ่งนี้ทีมมีงาน town hall ไตรมาส 2",  sub: "ศ. 23 พ.ค. · 14:00 · ออนไลน์ + Live",         icon: "calendarPlus", color: "#7DA084" },
];

const INBOX_BY_PERSONA = {
  // Employee: only approvals THEY need to make on items addressed to them (rare)
  // Most employees rarely have approval tasks — show empty-ish state
  employee: [
    { due: "พรุ่งนี้", urgent: false, type: "approve", title: "ยืนยันรับเครื่องแบบใหม่ (size M)", sub: "ส่งจากลังสต็อก · ต้องเซ็นรับบนระบบภายใน 3 วัน", sla: "3 วัน", icon: "check",       color: "#F59E0B" },
  ],
  manager: [
    { due: "วันนี้",  urgent: true,  type: "approve", title: "อนุมัติใบลาของ กฤษณ์ ส.",                 sub: "ลาพักร้อน 22 พ.ค. · 1 วัน · ส่งมา 2 ชม.ที่แล้ว",      sla: "4 ชม.",   icon: "calendar",    color: "#E11D48" },
    { due: "วันนี้",  urgent: true,  type: "approve", title: "อนุมัติการลาออกของ ภาณุพงศ์ ศ.",          sub: "วันสุดท้าย 15 มิ.ย.",                                          sla: "วันนี้",  icon: "users",       color: "#E11D48" },
    { due: "พรุ่งนี้", urgent: false, type: "approve", title: "อนุมัติสลับกะ · เบน K. ↔ มายา P.",         sub: "พ. 28 พ.ค. · A ↔ M",                                                     sla: "1 วัน",   icon: "refresh",     color: "#F59E0B" },
    { due: "2 วัน",   urgent: false, type: "approve", title: "อนุมัติเบิกค่ารักษา · ปริยา ส.",            sub: "฿2,400 · รพ.บำรุงราษฎร์",                                          sla: "2 วัน",   icon: "heart",       color: "#F59E0B" },
    { due: "3 วัน",   urgent: false, type: "approve", title: "อนุมัติ OT · อัครเดช ม.",                           sub: "วันเสาร์ 23 พ.ค. · 6 ชม.",                                            sla: "3 วัน",   icon: "calendar",    color: "#F59E0B" },
  ],
  admin: [
    { due: "วันนี้",  urgent: true,  type: "approve", title: "อนุมัติเอกสาร onboarding × 3 คน",          sub: "พนักงานใหม่เริ่มงาน 1 มิ.ย. · ต้องเซ็นก่อน",            sla: "วันนี้",  icon: "fileText",    color: "#E11D48" },
    { due: "วันนี้",  urgent: true,  type: "approve", title: "อนุมัติ payroll run · พ.ค. 69",          sub: "ก่อนปิดรอบจ่ายวันที่ 31 พ.ค.",                          sla: "วันนี้",  icon: "wallet",      color: "#E11D48" },
    { due: "พรุ่งนี้", urgent: false, type: "approve", title: "อนุมัติ confirmation letter × 2",          sub: "พนักงานผ่านทดลองงาน · รอออกหนังสือ",                  sla: "1 วัน",   icon: "check",       color: "#F59E0B" },
    { due: "2 วัน",   urgent: false, type: "approve", title: "อนุมัติ transfer workflow · ภาณุพงศ์ ศ.",    sub: "ย้าย CEM → CWO · checklist 60%",                                              sla: "2 วัน",   icon: "users",       color: "#F59E0B" },
  ],
  hris: [
    { due: "วันนี้",  urgent: false, type: "approve", title: "อนุมัติ policy version v2.4 (Attendance)",  sub: "HR Admin ส่ง draft · รอ publish",                                              sla: "3 วัน",   icon: "shield",      color: "#F59E0B" },
    { due: "พรุ่งนี้", urgent: false, type: "approve", title: "อนุมัติการปรับ master data · 12 records", sub: "SPD ตรวจแล้ว · รอยืนยัน",                                                   sla: "5 วัน",   icon: "barChart",    color: "#5B6CE0" },
  ],
  spd: [
    { due: "วันนี้",  urgent: true,  type: "approve", title: "อนุมัติเอกสารเบิกค่ารักษา 8 รายการ",          sub: "queue ค้างเก่าสุด 3 ชม.",                                              sla: "วันนี้",  icon: "fileText",    color: "#E11D48" },
    { due: "วันนี้",  urgent: false, type: "approve", title: "อนุมัติการแก้เลขบัญชี × 4 คน",                  sub: "ก่อนปิดรอบ payroll",                                                            sla: "2 วัน",   icon: "wallet",      color: "#F59E0B" },
    { due: "พรุ่งนี้", urgent: false, type: "approve", title: "อนุมัติ update สำเนาบัตร × 6 คน",                 sub: "หมดอายุภายในเดือน",                                                       sla: "7 วัน",   icon: "fileText",    color: "#5B6CE0" },
  ],
};

// ─── Bell dropdown ─────────────────────────────────────────────────────

function BellPanel({ onClose }) {
  const I = window.PI;
  const items = BELL_ITEMS_DEFAULT;
  const unread = items.filter(b => !b.read).length;

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0,
      width: 380,
      background: "#FFFFFF",
      border: "1px solid #E7DFD1",
      borderRadius: 12,
      boxShadow: "0 16px 40px rgba(14,27,44,0.16), 0 4px 8px rgba(14,27,44,0.04)",
      zIndex: 50,
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -7, right: 16,
        width: 12, height: 12, background: "#FFFFFF",
        borderLeft: "1px solid #E7DFD1", borderTop: "1px solid #E7DFD1",
        transform: "rotate(45deg)",
      }}/>
      {/* Header */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #E7DFD1",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: "#0E1B2C" }}>แจ้งเตือน</div>
          <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 1 }}>ข่าวสาร · ประกาศ · trending · ไม่ต้องอนุมัติ</div>
        </div>
        <button onClick={onClose} style={{
          background: "transparent", border: 0, color: "#8A97A8",
          cursor: "pointer", padding: 4,
        }}><I.x size={16}/></button>
      </div>
      {/* Items */}
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {items.map((item, i) => {
          const Glyph = I[item.icon] || I.bell;
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "28px 1fr auto",
              gap: 10, padding: "11px 16px",
              background: item.read ? "transparent" : "#FCFAF5",
              borderBottom: i < items.length - 1 ? "1px solid #F1ECDF" : 0,
              cursor: "pointer",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: item.color + "1F", color: item.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 2,
              }}><Glyph size={13}/></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "#0E1B2C", lineHeight: 1.35, fontWeight: item.read ? 500 : 600 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 2 }}>{item.sub}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: "#8A97A8", whiteSpace: "nowrap" }}>{item.time}</span>
                {!item.read && <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--color-accent)" }}/>}
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div style={{ padding: "10px 18px", borderTop: "1px solid #E7DFD1",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#FCFAF5",
      }}>
        <button style={{ background: "transparent", border: 0, color: "#5A6A7E",
          fontFamily: "inherit", fontSize: 11.5, cursor: "pointer", fontWeight: 500 }}>
          อ่านทั้งหมด
        </button>
        <button style={{ background: "transparent", border: 0, color: "var(--color-accent)",
          fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>
          ดูทั้งหมด →
        </button>
      </div>
    </div>
  );
}

// ─── Inbox dropdown ────────────────────────────────────────────────────

function InboxPanel({ onClose, persona = "manager" }) {
  const I = window.PI;
  const items = INBOX_BY_PERSONA[persona] || INBOX_BY_PERSONA.manager;
  const urgent = items.filter(i => i.urgent).length;

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0,
      width: 420,
      background: "#FFFFFF",
      border: "1px solid #E7DFD1",
      borderRadius: 12,
      boxShadow: "0 16px 40px rgba(14,27,44,0.16), 0 4px 8px rgba(14,27,44,0.04)",
      zIndex: 50,
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -7, right: 16,
        width: 12, height: 12, background: "#FFFFFF",
        borderLeft: "1px solid #E7DFD1", borderTop: "1px solid #E7DFD1",
        transform: "rotate(45deg)",
      }}/>
      {/* Header */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #E7DFD1",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: "#0E1B2C" }}>To-Do · งานรออนุมัติ</div>
          <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 1 }}>{items.length} รายการ · {urgent} เร่งด่วน · รอการตัดสินของคุณ</div>
        </div>
        <button onClick={onClose} style={{
          background: "transparent", border: 0, color: "#8A97A8",
          cursor: "pointer", padding: 4,
        }}><I.x size={16}/></button>
      </div>
      {/* Items */}
      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        {items.length === 0 ? (
          <div style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#5A6A7E",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              background: "#D6EEEC", color: "#1FA8A0",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
            }}><I.check size={22}/></div>
            <div style={{ fontFamily: "'CPN Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: "#0E1B2C" }}>ไม่มีงานรออนุมัติ</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>ทุกอย่างเคลียร์แล้ว · กลับมาเช็คเมื่อมีคำขอใหม่</div>
          </div>
        ) : items.map((item, i) => {
          const Glyph = I[item.icon] || I.inbox;
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: 10, padding: "12px 16px",
              borderBottom: i < items.length - 1 ? "1px solid #F1ECDF" : 0,
              borderLeft: `3px solid ${item.color}`,
              background: item.urgent ? "#FEF3F2" : "#FFFFFF",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: item.color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}><Glyph size={14}/></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                  {item.urgent && (
                    <span style={{
                      padding: "2px 6px", borderRadius: 3,
                      background: item.color, color: "#fff",
                      fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                    }}>เร่งด่วน</span>
                  )}
                  <span style={{ fontSize: 10, color: "#5A6A7E", fontWeight: 600 }}>SLA · {item.sla}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0E1B2C", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#5A6A7E", marginTop: 3, lineHeight: 1.4 }}>{item.sub}</div>
                {item.type === "approve" && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button style={{
                      padding: "4px 10px", borderRadius: 5,
                      background: "var(--color-accent)", color: "#fff",
                      border: 0, fontFamily: "inherit", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}>✓ อนุมัติ</button>
                    <button style={{
                      padding: "4px 10px", borderRadius: 5,
                      background: "transparent", color: "#9F1239",
                      border: "1px solid #FECDD3", fontFamily: "inherit", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}>✕ ปฏิเสธ</button>
                    <button style={{
                      padding: "4px 10px", borderRadius: 5,
                      background: "transparent", color: "#5A6A7E",
                      border: "1px solid #E7DFD1", fontFamily: "inherit", fontSize: 11, fontWeight: 600, cursor: "pointer",
                    }}>ดูรายละเอียด</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div style={{ padding: "10px 18px", borderTop: "1px solid #E7DFD1",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#FCFAF5",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ padding: "3px 8px", background: "#fff", border: "1px solid #E7DFD1",
            borderRadius: 5, fontSize: 10.5, color: "#5A6A7E", fontFamily: "inherit", cursor: "pointer" }}>เรียง: SLA</button>
          <button style={{ padding: "3px 8px", background: "#fff", border: "1px solid #E7DFD1",
            borderRadius: 5, fontSize: 10.5, color: "#5A6A7E", fontFamily: "inherit", cursor: "pointer" }}>ทุกประเภท</button>
        </div>
        <button style={{ background: "transparent", border: 0, color: "#E11D48",
          fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>
          เปิดเต็มหน้า →
        </button>
      </div>
    </div>
  );
}

// ─── Trigger button shells (controlled by parent) ──────────────────────

function InboxButton({ persona = "manager", showBadge = true, defaultOpen = false }) {
  const I = window.PI;
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const items = INBOX_BY_PERSONA[persona] || [];
  const count = items.length;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} className="humi-icon-btn"
              aria-label="To-Do · งานรออนุมัติ"
              style={{
                position: "relative",
                background: open ? "var(--color-accent-soft)" : undefined,
                borderColor: open ? "var(--color-accent)" : undefined,
              }}>
        <I.inbox size={18} />
        {showBadge && count > 0 && (
          <span style={{
            position: "absolute", top: 6, right: 6,
            minWidth: 16, height: 16, borderRadius: 999,
            background: "#E11D48", color: "#fff",
            fontSize: 9, fontWeight: 700,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "0 4px",
            border: "1.5px solid var(--color-surface)",
          }}>{count}</span>
        )}
      </button>
      {open && <InboxPanel onClose={() => setOpen(false)} persona={persona}/>}
    </div>
  );
}

function BellButton({ defaultOpen = false } = {}) {
  const I = window.PI;
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} className="humi-icon-btn"
              aria-label="แจ้งเตือน"
              style={{
                position: "relative",
                background: open ? "var(--color-accent-soft)" : undefined,
                borderColor: open ? "var(--color-accent)" : undefined,
              }}>
        <I.bell size={18} />
        <span style={{
          position: "absolute", top: 8, right: 8,
          width: 7, height: 7, borderRadius: 999,
          background: "var(--color-accent)",
          border: "1.5px solid var(--color-surface)",
        }}/>
      </button>
      {open && <BellPanel onClose={() => setOpen(false)}/>}
    </div>
  );
}

Object.assign(window, { InboxButton, BellButton });
