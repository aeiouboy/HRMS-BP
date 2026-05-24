// admin_permissions.jsx — Role-Based Permissions (RBP) editor
function AdminPermissions({ Ic }) {
  const [selectedRole, setSelectedRole] = React.useState("manager");

  const ROLES = [
    {id:"emp", l:"พนักงาน", users: 1289, c:"var(--teal)"},
    {id:"manager", l:"ผู้จัดการสาขา", users: 84, c:"var(--accent)"},
    {id:"hrbp", l:"HR Business Partner", users: 12, c:"var(--sage)"},
    {id:"payroll", l:"Payroll Admin", users: 3, c:"var(--butter)"},
    {id:"super", l:"Super Admin", users: 2, c:"var(--coral)"},
  ];

  const PERMS = {
    "ดูข้อมูลพนักงาน": {emp:"ตัวเองเท่านั้น", manager:"ทีมตัวเอง", hrbp:"ทุกคน", payroll:"ทุกคน", super:"ทุกคน"},
    "แก้ไขข้อมูลส่วนตัว": {emp:"ของตัวเอง · ผ่าน Workflow", manager:"-", hrbp:"ทุกคน · มี Workflow", payroll:"-", super:"ทุกคน"},
    "ดูเงินเดือน": {emp:"ของตัวเอง", manager:"ทีมตัวเอง", hrbp:"ทุกคน (ยกเว้น C-level)", payroll:"ทุกคน", super:"ทุกคน"},
    "ปรับเงินเดือน": {emp:"-", manager:"เสนอได้ · รออนุมัติ", hrbp:"อนุมัติได้ ≤ 10%", payroll:"-", super:"ไม่จำกัด"},
    "อนุมัติคำขอลา": {emp:"-", manager:"ทีมตัวเอง", hrbp:"ทุกคน", payroll:"-", super:"ทุกคน"},
    "เริ่ม Workflow ปิดบัญชี": {emp:"-", manager:"ทีมตัวเอง · รออนุมัติ", hrbp:"ทุกคน", payroll:"-", super:"ทุกคน"},
    "ดู Audit Log": {emp:"-", manager:"ทีมตัวเอง", hrbp:"แผนกที่ดูแล", payroll:"การจ่ายเงินเท่านั้น", super:"ทั้งระบบ"},
    "แก้ไขแผนสวัสดิการ": {emp:"-", manager:"-", hrbp:"-", payroll:"-", super:"ทุกแผน"},
    "ตั้งค่ากฎสิทธิ์ (RBP)": {emp:"-", manager:"-", hrbp:"-", payroll:"-", super:"ใช่"},
  };

  const role = ROLES.find(r => r.id === selectedRole);

  return (
    <>
      <div className="grid" style={{gridTemplateColumns:"320px 1fr", gap: 16, alignItems:"flex-start"}}>
        {/* Roles list */}
        <div className="card" style={{padding: 0}}>
          <div style={{padding:"14px 16px", borderBottom:"1px solid var(--line-2)"}}>
            <div className="eyebrow">บทบาท · 5 บทบาท</div>
            <h3 style={{marginTop: 4, fontSize: 16}}>เลือกเพื่อดูสิทธิ์</h3>
          </div>
          {ROLES.map(r => (
            <div key={r.id} onClick={() => setSelectedRole(r.id)}
              style={{padding:"14px 16px", borderBottom:"1px solid var(--line-2)", cursor:"pointer", background: r.id === selectedRole ? "var(--accent-soft)" : "transparent", borderLeft: r.id === selectedRole ? "3px solid var(--accent)" : "3px solid transparent"}}>
              <div className="row">
                <span style={{width: 8, height: 8, borderRadius: 4, background: r.c}}/>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 14, fontWeight: 600}}>{r.l}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{r.users.toLocaleString()} คน</div>
                </div>
                <Ic.chevron size={14}/>
              </div>
            </div>
          ))}
          <div style={{padding: 14}}>
            <button className="btn btn-ghost" style={{width:"100%", fontSize: 13}}>+ สร้างบทบาทใหม่</button>
          </div>
        </div>

        {/* Permission matrix */}
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">สิทธิ์ของบทบาท</div>
                <h2 style={{marginTop: 6}}>{role.l} · <span style={{color:"var(--ink-3)", fontWeight: 400}}>{role.users.toLocaleString()} คน</span></h2>
              </div>
              <div className="spacer"/>
              <button className="btn btn-ghost" style={{fontSize: 13}}>ดูรายชื่อผู้ถือบทบาท</button>
              <button className="btn btn-primary" style={{fontSize: 13}}><Ic.edit size={13}/> แก้ไขสิทธิ์</button>
            </div>
          </div>

          {/* Scope (who they can act on) */}
          <div className="card">
            <div className="eyebrow">ขอบเขต (Target Population)</div>
            <h3 style={{marginTop: 6, marginBottom: 14}}>{role.l} ดำเนินการกับใครได้บ้าง</h3>
            <div className="col" style={{gap: 10}}>
              {[
                {l:"พนักงานในทีมโดยตรง", on: true},
                {l:"พนักงานในสาขาเดียวกัน", on: selectedRole === "manager" || selectedRole === "hrbp" || selectedRole === "super"},
                {l:"พนักงานทั้งบริษัท", on: selectedRole === "hrbp" || selectedRole === "super"},
                {l:"ผู้บริหารระดับสูง (C-level)", on: selectedRole === "super"},
                {l:"พนักงานที่ปิดบัญชีไปแล้ว", on: selectedRole === "hrbp" || selectedRole === "super"},
              ].map(s => (
                <div key={s.l} className="row" style={{padding:"10px 12px", border:"1px solid var(--line-2)", borderRadius: 10}}>
                  <div style={{flex: 1, fontSize: 14}}>{s.l}</div>
                  <span className={"tag " + (s.on ? "sage" : "")} style={{fontSize: 11}}>{s.on ? "✓ มีสิทธิ์" : "ไม่มีสิทธิ์"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions list */}
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">สิทธิ์การทำงาน · 9 รายการ</div>
                <h3 style={{marginTop: 6}}>สิ่งที่ {role.l} ทำได้</h3>
              </div>
              <div className="spacer"/>
              <input placeholder="กรอง…" style={{padding:"6px 10px", border:"1px solid var(--line)", borderRadius: 8, fontSize: 12, width: 180, fontFamily:"inherit"}}/>
            </div>
            <div style={{marginTop: 14}}>
              {Object.entries(PERMS).map(([action, byRole], i) => {
                const v = byRole[selectedRole];
                const enabled = v && v !== "-";
                return (
                  <div key={action} className="row" style={{padding:"14px 0", borderBottom: i < 8 ? "1px solid var(--line-2)" : "", gap: 14}}>
                    <div style={{width: 22, height: 22, borderRadius: 11, background: enabled ? "var(--sage)" : "var(--line)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink: 0}}>
                      {enabled ? <Ic.check size={11}/> : <Ic.close size={10}/>}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontSize: 14, fontWeight: 600}}>{action}</div>
                      <div style={{fontSize: 12, color: enabled ? "var(--ink-3)" : "var(--ink-4)", marginTop: 2}}>{v}</div>
                    </div>
                    <button className="btn btn-ghost" style={{fontSize: 12, padding:"6px 10px"}}>ปรับ</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.AdminPermissions = AdminPermissions;
