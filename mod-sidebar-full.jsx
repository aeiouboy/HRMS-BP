// mod-sidebar-full.jsx — Full sidebar reference poster
// Real module structure with sub-pages — not floating abstract modules.
// Shows what the actual production sidebar looks like for each persona.

// ─── The complete module tree ──────────────────────────────────────────
// Source: existing prod-shell.jsx nav + canvas artboards.
// Each module has REAL sub-pages, not made up.

const SIDEBAR_TREE = [
  // ════════ พื้นที่ทำงานของฉัน (Workspace) ════════
  {
    group: "พื้นที่ทำงาน",
    groupEn: "Workspace",
    show: ["employee","manager","admin","hris","spd"],
    items: [
      { id:"home", label:"หน้าหลัก", icon:"home",
        show: ["employee","manager","admin","hris","spd"],
        sub: null,
      },
      { id:"todo", label:"To-Do · งานรออนุมัติ", icon:"checkSquare",
        show: ["manager","admin","hris","spd"],
        badge: { manager: 5, admin: 4, hris: 2, spd: 3 },
        sub: [
          { l:"ลา · OT · สลับกะ",       show:["manager"] },
          { l:"เบิกค่ารักษา",           show:["manager","admin","spd"] },
          { l:"Onboarding · Transfer",  show:["admin"] },
          { l:"Payroll · Confirmation", show:["admin"] },
          { l:"Policy · Master data",   show:["hris"] },
          { l:"ตรวจเอกสาร",             show:["spd"] },
          { l:"ประวัติที่อนุมัติแล้ว",     show:["manager","admin","hris","spd"] },
        ],
      },
      { id:"profile", label:"โปรไฟล์ของฉัน", icon:"user",
        show: ["employee","manager","admin","hris","spd"],
        sub: [
          { l:"ข้อมูลส่วนตัว" },
          { l:"ที่อยู่ + ผู้ติดต่อฉุกเฉิน" },
          { l:"เอกสาร + สัญญา" },
          { l:"ครอบครัว + ผู้อุปการะ" },
          { l:"การศึกษา + ประสบการณ์" },
        ],
      },
      { id:"timeoff", label:"การลา", icon:"calendar",
        show: ["employee","manager","admin"],
        sub: [
          { l:"ขอลา (ฟอร์มใหม่)" },
          { l:"ปฏิทินวันลา + ของทีม" },
          { l:"วันลาคงเหลือ" },
          { l:"ประวัติการลา" },
        ],
      },
      { id:"time", label:"ลงเวลา · ตารางกะ", icon:"calendarPlus",
        show: ["employee","manager","admin","spd"],
        sub: [
          { l:"ตอกบัตร · เข้า-ออก", show:["employee","manager"] },
          { l:"ตารางกะของฉัน",     show:["employee","manager"] },
          { l:"ขอแก้เวลา",          show:["employee","manager","admin","spd"] },
          { l:"OT",                  show:["employee","manager","admin"] },
          { l:"จัดกะทีม",           show:["manager","admin"] },
          { l:"รายงานเวลาทำงาน",  show:["manager","admin","spd"] },
        ],
      },
      { id:"benefit", label:"สวัสดิการ", icon:"heart",
        show: ["employee","manager","admin","hris","spd"],
        sub: [
          { l:"เบิกค่ารักษา · ฟอร์ม", show:["employee"] },
          { l:"วงเงินคงเหลือ",         show:["employee","manager"] },
          { l:"ประวัติการเบิก",         show:["employee","manager","admin"] },
          { l:"แผนสวัสดิการ",          show:["admin","hris"] },
          { l:"เกณฑ์สิทธิ (Eligibility)", show:["admin","hris"] },
          { l:"Catalog · Master",      show:["hris"] },
          { l:"ตรวจเอกสารเบิก",      show:["spd"] },
        ],
      },
      { id:"payroll", label:"เงินเดือน", icon:"wallet",
        show: ["employee","manager","admin","hris","spd"],
        sub: [
          { l:"สลิปเงินเดือน", show:["employee","manager","admin","hris"] },
          { l:"ประวัติ 12 เดือน", show:["employee","manager"] },
          { l:"Team Payroll",      show:["manager"] },
          { l:"Run Payroll",        show:["admin"] },
          { l:"ภาษี + ภงด.",         show:["admin"] },
          { l:"ตั้งค่าโครงสร้าง", show:["hris"] },
          { l:"ตรวจสอบ + อนุมัติ", show:["spd"] },
        ],
      },
      { id:"requests", label:"คำร้องและแบบฟอร์ม", icon:"fileText",
        show: ["employee","manager","admin","spd"],
        sub: [
          { l:"ขอลา / ขอแก้เวลา / OT" },
          { l:"เบิกสวัสดิการ" },
          { l:"ขอย้าย / ขอเลื่อน" },
          { l:"ขอเอกสารรับรอง" },
          { l:"ขอลาออก" },
          { l:"คำร้องของฉัน (ติดตามสถานะ)" },
        ],
      },
    ],
  },

  // ════════ บุคลากร (People) ════════
  {
    group: "บุคลากร",
    groupEn: "People",
    show: ["manager","admin","hris","spd"],
    items: [
      { id:"team", label:"ทีมของฉัน", icon:"users",
        show: ["manager"],
        sub: [
          { l:"ภาพรวมทีม + KPI" },
          { l:"การมาทำงาน + ลา" },
          { l:"ทดลองงาน" },
          { l:"การประเมิน · 1-on-1" },
          { l:"คำขอย้าย / ลาออก" },
        ],
      },
      { id:"employees", label:"ทะเบียนพนักงาน", icon:"users",
        show: ["admin","hris","spd"],
        sub: [
          { l:"ค้นหา + รายชื่อทั้งหมด" },
          { l:"พนักงานทดลองงาน" },
          { l:"พนักงานพ้นสภาพ" },
          { l:"นำเข้า / ส่งออก (bulk)" },
        ],
      },
      { id:"hire", label:"จ้างพนักงานใหม่", icon:"plus",
        show: ["admin"],
        sub: [
          { l:"Hire Wizard (3 cluster)" },
          { l:"เอกสาร onboarding" },
          { l:"ตารางเริ่มงาน" },
        ],
      },
      { id:"goals", label:"เป้าหมาย · ผลงาน", icon:"barChart",
        show: ["employee","manager","admin"],
        sub: [
          { l:"OKR / KPI ของฉัน" },
          { l:"การประเมินรอบปัจจุบัน" },
          { l:"ประวัติการประเมิน" },
          { l:"Calibration · ของทีม", show:["manager","admin"] },
        ],
      },
      { id:"learning", label:"การเรียนรู้", icon:"book",
        show: ["employee","manager","admin"],
        sub: [
          { l:"หลักสูตรของฉัน" },
          { l:"Compliance + บังคับอบรม" },
          { l:"Library คอร์ส" },
          { l:"การจัดอบรมในทีม", show:["manager","admin"] },
        ],
      },
      { id:"org", label:"ผังองค์กร", icon:"network",
        show: ["employee","manager","admin","hris","spd"],
        sub: null,
      },
    ],
  },

  // ════════ บริษัท (Company) ════════
  {
    group: "บริษัท",
    groupEn: "Company",
    show: ["employee","manager","admin","hris","spd"],
    items: [
      { id:"announce", label:"ประกาศและข่าวสาร", icon:"mega",
        show: ["employee","manager","admin","hris","spd"],
        sub: [
          { l:"Feed ข่าวบริษัท" },
          { l:"ประกาศของฝ่าย" },
          { l:"Events · Town hall" },
          { l:"สร้างประกาศ", show:["admin","hris"] },
        ],
      },
      { id:"admin-hub", label:"ศูนย์รวม Admin", icon:"shield",
        show: ["admin","hris","spd"],
        sub: [
          { l:"Workflow Inbox" },
          { l:"Approval Chain" },
          { l:"Audit Log" },
          { l:"Letter + Document Center" },
          { l:"Asset Management",  show:["admin"] },
          { l:"Offboarding Workspace", show:["admin"] },
        ],
      },
      { id:"system", label:"จัดการระบบ", icon:"cog",
        show: ["admin","hris"],
        sub: [
          { l:"Master Data (ตำแหน่ง · เกรด · สาขา)", show:["hris"] },
          { l:"นโยบาย + Policy version", show:["hris"] },
          { l:"สิทธิ์ตามบทบาท (RBP)", show:["admin","hris"] },
          { l:"การตั้งค่าระบบ", show:["hris"] },
        ],
      },
    ],
  },
];

// ─── Persona definitions (consistent across system) ────────────────────
const SF_PERSONAS = [
  { id:"employee", name:"กฤษณ์ ส.",     role:"พนักงานขาย · CWO",       initials:"กษ", accent:"#1FA8A0", soft:"#D6EEEC" },
  { id:"manager",  name:"สมชาย ช.",     role:"Store Manager · CWO",     initials:"สม", accent:"#7DA084", soft:"#DDE7DE" },
  { id:"admin",    name:"จงรักษ์ พ.",   role:"HR Admin · HRBP",         initials:"จง", accent:"#E08864", soft:"#FBE7DC" },
  { id:"hris",     name:"พรวลัย ก.",   role:"HRIS Manager",            initials:"พร", accent:"#D4A53A", soft:"#F4E4B8" },
  { id:"spd",      name:"นภสร ท.",     role:"SPD Officer",             initials:"นพ", accent:"#5F7689", soft:"#D7DEE5" },
];

// ─── Single full sidebar rendering ─────────────────────────────────────

function FullSidebar({ persona }) {
  const I = window.PI;
  const P = SF_PERSONAS.find(p => p.id === persona);

  // Filter helper — items with show array
  const visible = (item) => !item.show || item.show.includes(persona);

  return (
    <div style={{
      width: 280,
      background: "#0E1B2C", color: "#E7E3D8",
      borderRadius: 14, padding: "20px 14px 16px",
      display: "flex", flexDirection: "column",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      position: "relative",
      borderTop: `4px solid ${P.accent}`,
    }}>
      {/* Logo */}
      <div style={{ padding: "4px 8px 18px" }}>
        <img src={window.__resources.humiLogo} alt="Humi" style={{ height: 60, width: "auto", filter: "brightness(1.1)" }}/>
      </div>

      {/* Persona label */}
      <div style={{
        marginBottom: 14, padding: "8px 12px",
        background: `${P.accent}1F`,
        borderLeft: `3px solid ${P.accent}`,
        borderRadius: 6,
      }}>
        <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: `${P.accent}`, fontWeight: 700 }}>
          มุมมองของ
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FCFAF5", marginTop: 2 }}>{P.role}</div>
      </div>

      {/* Search */}
      <div style={{
        margin: "0 0 12px",
        padding: "8px 12px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 12, color: "rgba(231,227,216,0.55)",
      }}>
        <I.search size={13}/>
        <span style={{ flex: 1 }}>ค้นหา…</span>
        <kbd style={{ fontSize: 9, padding: "1px 5px", background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>⌘K</kbd>
      </div>

      {/* Nav tree */}
      {SIDEBAR_TREE.filter(g => !g.show || g.show.includes(persona)).map(group => {
        const groupItems = group.items.filter(visible);
        if (groupItems.length === 0) return null;
        return (
          <React.Fragment key={group.group}>
            <div style={{
              fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase",
              color: "rgba(231,227,216,0.45)", fontWeight: 600,
              padding: "14px 10px 6px",
            }}>{group.group}<span style={{ color: "rgba(231,227,216,0.3)", marginLeft: 6 }}>· {group.groupEn}</span></div>
            {groupItems.map(item => {
              const Glyph = I[item.icon] || I.home;
              const badge = item.badge && item.badge[persona];
              const subs = item.sub && item.sub.filter(visible);
              return (
                <div key={item.id}>
                  {/* Item header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 13, color: "#FCFAF5", fontWeight: 600,
                  }}>
                    <Glyph size={15}/>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {badge && (
                      <span style={{
                        background: "#E11D48", color: "#fff",
                        fontSize: 10, fontWeight: 700,
                        padding: "1px 7px", borderRadius: 999,
                      }}>{badge}</span>
                    )}
                  </div>
                  {/* Sub items */}
                  {subs && subs.length > 0 && (
                    <div style={{ paddingLeft: 32, paddingBottom: 2 }}>
                      {subs.map((s, i) => (
                        <div key={i} style={{
                          padding: "4px 10px 4px 0",
                          fontSize: 11.5, color: "rgba(231,227,216,0.6)",
                          lineHeight: 1.4,
                          position: "relative",
                        }}>
                          <span style={{
                            position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)",
                            width: 8, height: 1, background: "rgba(231,227,216,0.2)",
                          }}/>
                          {s.l}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* User block (bottom) */}
      <div style={{
        marginTop: "auto", paddingTop: 14,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 999,
          background: `linear-gradient(135deg, ${P.accent}, ${P.accent}88)`,
          color: "#fff", fontSize: 12, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{P.initials}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, color: "#FCFAF5", fontWeight: 600 }}>{P.name}</div>
          <div style={{ fontSize: 10, color: "rgba(231,227,216,0.55)" }}>{P.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Module-tree column (right of sidebars) ────────────────────────────

function ModuleInventory() {
  // Flat list of all modules with their sub-pages for reference
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E7DFD1",
      borderRadius: 14,
      padding: "22px 24px",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      color: "#0E1B2C",
    }}>
      <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#8A97A8", fontWeight: 700 }}>
        Module inventory
      </div>
      <div style={{
        fontFamily: "'CPN Condensed', sans-serif",
        fontSize: 22, fontWeight: 700, color: "#0E1B2C", marginTop: 4, marginBottom: 16,
        letterSpacing: "-0.01em",
      }}>โมดูลทั้งหมดในระบบ · {SIDEBAR_TREE.reduce((s, g) => s + g.items.length, 0)} โมดูล</div>

      {SIDEBAR_TREE.map(group => (
        <div key={group.group} style={{ marginBottom: 22 }}>
          <div style={{
            fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase",
            color: "#5A6A7E", fontWeight: 700,
            paddingBottom: 6, marginBottom: 8,
            borderBottom: "1px solid #E7DFD1",
          }}>
            {group.group} <span style={{ color: "#8A97A8" }}>· {group.groupEn}</span>
            <span style={{ marginLeft: 8, color: "#8A97A8", fontWeight: 500 }}>({group.items.length})</span>
          </div>
          {group.items.map(item => {
            const seen = item.show || ["employee","manager","admin","hris","spd"];
            return (
              <div key={item.id} style={{
                padding: "10px 0",
                borderBottom: "1px dashed #F1ECDF",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: item.sub ? 6 : 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: "#0E1B2C", flex: 1,
                  }}>{item.label}</div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {SF_PERSONAS.map(p => (
                      <div key={p.id} title={p.name} style={{
                        width: 16, height: 16, borderRadius: 4,
                        background: seen.includes(p.id) ? p.accent : "transparent",
                        border: seen.includes(p.id) ? "0" : `1px solid ${p.accent}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 8, color: "#fff", fontWeight: 700,
                      }}>{seen.includes(p.id) ? p.id[0].toUpperCase() : ""}</div>
                    ))}
                  </div>
                </div>
                {item.sub && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {item.sub.map((s, i) => (
                      <span key={i} style={{
                        padding: "2px 8px", borderRadius: 4,
                        background: "#F6F1E8",
                        fontSize: 11, color: "#243447",
                      }}>{s.l}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── The poster ────────────────────────────────────────────────────────

function SidebarFullPoster() {
  return (
    <div style={{
      padding: 32,
      background: "#F6F1E8",
      minHeight: "100%",
      fontFamily: "'CPN', 'IBM Plex Sans Thai', sans-serif",
      color: "#0E1B2C",
    }}>
      {/* Header */}
      <div style={{
        marginBottom: 28, paddingBottom: 18,
        borderBottom: "1px solid #E7DFD1",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <img src={window.__resources.humiLogo} alt="Humi" style={{ height: 32, width: "auto" }}/>
          <div style={{ width: 1, height: 24, background: "#E7DFD1" }}/>
          <div style={{
            fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
            color: "#8A97A8", fontWeight: 600,
          }}>Sidebar Structure · Production Modules</div>
        </div>
        <div style={{
          fontFamily: "'CPN Condensed', sans-serif",
          fontSize: 38, fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: 900,
        }}>
          โครงสร้าง sidebar ทั้งระบบ · 5 personas
        </div>
        <div style={{ fontSize: 14, color: "#5A6A7E", marginTop: 8, maxWidth: 800, lineHeight: 1.55 }}>
          ทุก module ในระบบ · เห็นโครงสร้าง sub-pages จริง · เปรียบเทียบสิ่งที่แต่ละ persona เห็น
          (ไม่ใช่ module ลอยๆ · เป็น tree ที่ใช้จริงใน production)
        </div>
      </div>

      {/* 5 sidebars side by side */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5, auto)",
        gap: 18, marginBottom: 26, justifyContent: "center",
      }}>
        {SF_PERSONAS.map(p => <FullSidebar key={p.id} persona={p.id}/>)}
      </div>

      {/* Module inventory reference */}
      <ModuleInventory/>

      {/* Bottom principle */}
      <div style={{
        marginTop: 24, padding: "18px 22px",
        background: "#0E1B2C", color: "#E7E3D8",
        borderRadius: 14,
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'CPN Condensed', sans-serif", fontSize: 14, fontWeight: 700,
          padding: "4px 12px", borderRadius: 999,
          background: "#1FA8A0", color: "#0E1B2C", letterSpacing: ".06em",
        }}>หลักการ</div>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(231,227,216,0.9)" }}>
          ทุก persona เห็น sidebar ของตัวเอง — <b style={{ color: "#FCFAF5" }}>ไม่ใช่ menu ตัวเดียวที่ซ่อนของบางอย่างไว้</b> ·
          Sub-pages แสดงให้เห็นว่าแต่ละ module มี surface area จริงเท่าไหร่ · แก้ผิดที่นี่ = ทั้งระบบเปลี่ยน
        </div>
      </div>
    </div>
  );
}

window.SidebarFullPoster = SidebarFullPoster;
