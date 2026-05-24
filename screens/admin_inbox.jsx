// admin_inbox.jsx — Workflow Inbox (SuccessFactors-style approval queue)
function AdminInbox({ Ic, workflows, focusedId, onClose }) {
  const [filter, setFilter] = React.useState("pending");
  const [selectedId, setSelectedId] = React.useState(focusedId || (workflows[0] && workflows[0].id));

  React.useEffect(() => {
    if (focusedId) setSelectedId(focusedId);
  }, [focusedId]);

  const PRIO = {
    high: {l:"เร่งด่วน", t:"coral"},
    normal: {l:"ปกติ", t:""},
    low: {l:"ภายหลัง", t:""},
  };

  const selected = workflows.find(w => w.id === selectedId) || workflows[0];

  return (
    <div className="grid" style={{gridTemplateColumns:"360px 1fr", gap: 16, alignItems:"flex-start"}}>
      {/* Left: workflow list */}
      <div className="card" style={{padding: 0, overflow:"hidden"}}>
        <div style={{padding:"14px 16px", borderBottom:"1px solid var(--line)", background:"var(--cream-2)"}}>
          <div className="row">
            <div>
              <div className="eyebrow">กล่องขาเข้า Workflow</div>
              <h3 style={{marginTop: 4, fontSize: 16}}>{workflows.length} คำขอที่ต้องดำเนินการ</h3>
            </div>
          </div>
          <div className="tabs" style={{marginTop: 12, marginBottom: 0}}>
            {[["pending", "รอ"],["mine", "ของฉัน"],["all", "ทั้งหมด"]].map(([k,l]) => (
              <div key={k} className={"tab " + (filter===k?"active":"")} onClick={() => setFilter(k)} style={{padding:"6px 12px", fontSize: 13}}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{maxHeight: 640, overflow:"auto"}}>
          {workflows.map(w => {
            const isSel = w.id === selectedId;
            const overdue = w.priority === "high";
            return (
              <div key={w.id} onClick={() => setSelectedId(w.id)}
                style={{padding:"14px 16px", borderBottom:"1px solid var(--line-2)", cursor:"pointer", background: isSel ? "var(--accent-soft)" : "transparent", borderLeft: isSel ? "3px solid var(--accent)" : "3px solid transparent"}}>
                <div className="row" style={{gap: 8, marginBottom: 6}}>
                  <span style={{fontFamily:"monospace", fontSize: 11, color:"var(--ink-3)"}}>{w.id}</span>
                  <div className="spacer"/>
                  {overdue && <span className="tag coral" style={{fontSize: 10}}>⚠ เกิน SLA</span>}
                  <span style={{fontSize: 11, color:"var(--ink-4)"}}>{w.submitted}</span>
                </div>
                <div className="row" style={{gap: 10}}>
                  <div className={"avatar " + w.col} style={{width: 32, height: 32, fontSize: 11, flexShrink: 0}}>{w.subjectInit}</div>
                  <div style={{minWidth: 0, flex: 1}}>
                    <div style={{fontSize: 13, fontWeight: 600}}>{w.event}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{w.subject} · {w.reason}</div>
                  </div>
                </div>
                <div className="row" style={{marginTop: 8, gap: 4}}>
                  {w.chain.map((s, i) => (
                    <span key={i} style={{flex: 1, height: 4, borderRadius: 2, background: s.state === "done" ? "var(--sage)" : s.state === "current" ? "var(--accent)" : "var(--line)"}}/>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: workflow detail */}
      {selected && (
        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="row" style={{flexWrap:"wrap", gap: 12, alignItems:"flex-start"}}>
              <div style={{flex: "1 1 320px", minWidth: 0}}>
                <div className="row" style={{gap: 8, marginBottom: 6}}>
                  <span style={{fontFamily:"monospace", fontSize: 12, color:"var(--ink-3)"}}>{selected.id}</span>
                  <span className={"tag " + PRIO[selected.priority].t} style={{fontSize: 11}}>{PRIO[selected.priority].l}</span>
                  <span style={{fontSize: 12, color:"var(--ink-3)"}}>· SLA: {selected.sla}</span>
                </div>
                <h2 style={{fontSize: 22, letterSpacing:"-0.01em"}}>{selected.event}</h2>
                <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 4}}>เหตุผล (Event Reason): <b>{selected.reason}</b></div>
              </div>
              <div className="row" style={{gap: 6}}>
                <button className="btn btn-ghost" style={{fontSize: 13}}>มอบหมายให้ผู้อื่น</button>
                <button className="btn btn-ghost" style={{fontSize: 13, color:"var(--coral)"}}>ตีกลับ</button>
                <button className="btn btn-primary" style={{fontSize: 13}}><Ic.check size={13}/> อนุมัติ</button>
              </div>
            </div>

            {/* Subject panel */}
            <div className="row" style={{marginTop: 18, padding: 14, background:"var(--cream-2)", borderRadius: 12, gap: 12}}>
              <div className={"avatar " + selected.col} style={{width: 44, height: 44}}>{selected.subjectInit}</div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 15, fontWeight: 600}}>{selected.subject}</div>
                <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{selected.subjectId} · ผู้รับผลของคำขอนี้</div>
              </div>
              <button className="btn btn-ghost" style={{fontSize: 13}}>เปิดโปรไฟล์</button>
            </div>
          </div>

          {/* Approval Chain */}
          <div className="card">
            <div className="eyebrow">เส้นทางอนุมัติ · {selected.chain.length} ขั้น</div>
            <h3 style={{marginTop: 6, marginBottom: 18}}>กำลังดำเนินการที่ขั้นที่ {selected.chain.findIndex(s => s.state === "current") + 1}</h3>
            <div style={{position:"relative"}}>
              {selected.chain.map((step, i) => {
                const isDone = step.state === "done";
                const isCur = step.state === "current";
                const color = isDone ? "var(--sage)" : isCur ? "var(--accent)" : "var(--line)";
                return (
                  <div key={i} className="row" style={{gap: 14, paddingBottom: i === selected.chain.length - 1 ? 0 : 22, position:"relative"}}>
                    {i < selected.chain.length - 1 && (
                      <div style={{position:"absolute", left: 14, top: 28, bottom: 0, width: 2, background: isDone ? "var(--sage)" : "var(--line)"}}/>
                    )}
                    <div style={{width: 30, height: 30, borderRadius: 15, background: isCur ? "var(--accent)" : isDone ? "var(--sage)" : "var(--cream-2)", border: isDone || isCur ? 0 : "2px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center", color: isDone || isCur ? "#fff" : "var(--ink-3)", fontSize: 12, fontWeight: 600, flexShrink: 0, position:"relative", zIndex: 1}}>
                      {isDone ? <Ic.check size={13}/> : i + 1}
                    </div>
                    <div style={{flex: 1, paddingTop: 4}}>
                      <div className="row" style={{gap: 8}}>
                        <div style={{fontSize: 14, fontWeight: 600}}>{step.role}</div>
                        {isCur && <span className="tag" style={{background:"var(--accent-soft)", color:"var(--accent)", fontSize: 11}}>กำลังพิจารณา</span>}
                      </div>
                      <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 2}}>{step.who}</div>
                      {step.time && <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{step.time}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payload */}
          <div className="card">
            <div className="eyebrow">รายละเอียดคำขอ</div>
            <h3 style={{marginTop: 6, marginBottom: 14}}>ข้อมูลที่จะเปลี่ยนแปลงเมื่ออนุมัติ</h3>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: 14}}>
              {Object.entries(selected.payload).map(([k, v]) => (
                <div key={k} style={{padding: 12, border:"1px solid var(--line-2)", borderRadius: 10}}>
                  <div className="eyebrow">{k}</div>
                  <div style={{fontSize: 14, fontWeight: 600, marginTop: 4, letterSpacing:"-0.01em"}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop: 14, padding: 12, background:"var(--cream-2)", borderRadius: 10, fontSize: 12, color:"var(--ink-3)", lineHeight: 1.5}}>
              <Ic.shield size={13}/> <b>หมายเหตุระบบ:</b> หากอนุมัติ ระบบจะอัปเดตโปรไฟล์พนักงาน · ผูกกับเปย์โรลรอบหน้า · และส่งอีเมลยืนยันถึงผู้เกี่ยวข้องทั้งหมด
            </div>
          </div>

          {/* Comments */}
          <div className="card">
            <div className="eyebrow">ความคิดเห็น</div>
            <h3 style={{marginTop: 6, marginBottom: 14}}>การสนทนาในคำขอนี้</h3>
            <div className="col" style={{gap: 12}}>
              <div className="row" style={{gap: 10, alignItems:"flex-start"}}>
                <div className="avatar teal" style={{width: 30, height: 30, fontSize: 11}}>JT</div>
                <div style={{flex: 1, padding: 12, background:"var(--cream-2)", borderRadius: 10}}>
                  <div className="row" style={{gap: 8, marginBottom: 4}}>
                    <span style={{fontSize: 13, fontWeight: 600}}>จงรักษ์ ทานากะ · ผู้จัดการ</span>
                    <span style={{fontSize: 11, color:"var(--ink-4)"}}>30 เม.ย. 16:01</span>
                  </div>
                  <div style={{fontSize: 13, color:"var(--ink-2)", lineHeight: 1.5}}>ตรวจสอบเอกสารแล้ว · ยินดีรับรอง พริยะเป็นพนักงานดีและรับผิดชอบ</div>
                </div>
              </div>
              <textarea placeholder="เพิ่มความคิดเห็น…" rows={3} style={{width:"100%", padding: 12, border:"1px solid var(--line)", borderRadius: 10, fontFamily:"inherit", fontSize: 13, resize:"vertical", background:"#fff"}}/>
              <div className="row">
                <span style={{fontSize: 12, color:"var(--ink-3)"}}>@ ผู้อื่นเพื่อเรียกความสนใจ</span>
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{fontSize: 13}}>ส่งความคิดเห็น</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.AdminInbox = AdminInbox;
