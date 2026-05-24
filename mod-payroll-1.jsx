// ============= MODULE 4: PAYROLL MANAGEMENT (Employee + Manager) =============

// 4A · EMPLOYEE — สลิปเงินเดือนของฉัน
function PR_Employee() {
  const I = window.PI;
  return (
    <div style={{ paddingBottom: 32 }}>
      <window.PageHead
        eyebrow="Payroll · มุมพนักงาน"
        title="เงินเดือนและสลิป"
        subtitle="งวดล่าสุด เมษายน 2568 · จ่ายแล้ว 25 เม.ย. · ปีนี้สะสม 4 งวด"
        actions={<>
          <button className="humi-button humi-button--ghost"><I.printer size={14} /> พิมพ์สลิป</button>
          <button className="humi-button humi-button--primary"><I.download size={14} /> ดาวน์โหลด PDF</button>
        </>} />

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        {/* Payslip */}
        <div className="humi-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: 22, background: "var(--color-ink)", color: "var(--color-canvas-soft)", position: "relative", overflow: "hidden" }}>
            <div className="humi-blob humi-blob--teal" style={{ width: 80, height: 100, right: -20, top: -30, opacity: 0.4 }} />
            <div className="humi-row">
              <div>
                <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>สลิปเงินเดือน · งวด 04/2568</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginTop: 6, fontWeight: 600, color: "var(--color-canvas-soft)" }}>1 – 30 เมษายน 2568</h3>
                <div style={{ fontSize: 12, color: "rgba(231,227,216,0.7)", marginTop: 4 }}>มาริสา สงวนศักดิ์ · E-58231 · Cashier</div>
              </div>
              <span className="humi-spacer" />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(231,227,216,0.6)", letterSpacing: ".08em", textTransform: "uppercase" }}>เงินสุทธิ</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-canvas-soft)", marginTop: 4 }}>฿24,418</div>
                <div style={{ fontSize: 11, color: "var(--color-accent)", marginTop: 2 }}>โอน 25 เม.ย. · กรุงเทพฯ ••3401</div>
              </div>
            </div>
          </div>

          <div style={{ padding: 22 }}>
            {/* Earnings */}
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, marginBottom: 12, fontWeight: 600, color: "var(--color-accent)" }}>รายได้</h4>
            {[
            ["เงินเดือนพื้นฐาน", 24000, ""],
            ["ค่าครองชีพ", 2000, ""],
            ["OT 6 ชม. × 1.5", 1080, "(225/ชม.)"],
            ["เบี้ยขยัน", 500, ""],
            ["โบนัสตามผลงาน Q1", 3500, ""]].
            map(([l, v, s]) =>
            <div key={l} className="humi-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--color-hairline-soft)" }}>
                <div style={{ fontSize: 13 }}>{l}</div>
                {s && <span style={{ fontSize: 11, color: "var(--color-ink-muted)", marginLeft: 6 }}>{s}</span>}
                <span className="humi-spacer" />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>฿{v.toLocaleString()}</div>
              </div>
            )}
            <div className="humi-row" style={{ padding: "10px 0", marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)" }}>รวมรายได้</span>
              <span className="humi-spacer" />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--color-accent)" }}>฿31,080</span>
            </div>

            <hr className="humi-divider" />

            {/* Deductions */}
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, marginBottom: 12, fontWeight: 600, color: "var(--color-warning)" }}>รายการหัก</h4>
            {[
            ["ภาษีเงินได้ ภงด.1", 1842, "หัก ณ ที่จ่าย"],
            ["ประกันสังคม", 750, "5% สูงสุด"],
            ["กองทุนสำรองเลี้ยงชีพ", 1200, "4% (บริษัทสมทบ 4%)"],
            ["สหกรณ์ออมทรัพย์", 2000, "ออมประจำเดือน"],
            ["ขาดงาน 0.5 วัน", 870, "เมื่อ 14 เม.ย."]].
            map(([l, v, s]) =>
            <div key={l} className="humi-row" style={{ padding: "10px 0", borderBottom: "1px solid var(--color-hairline-soft)" }}>
                <div>
                  <div style={{ fontSize: 13 }}>{l}</div>
                  {s && <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 1 }}>{s}</div>}
                </div>
                <span className="humi-spacer" />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--color-ink-soft)" }}>–฿{v.toLocaleString()}</div>
              </div>
            )}
            <div className="humi-row" style={{ padding: "10px 0", marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-warning)" }}>รวมรายการหัก</span>
              <span className="humi-spacer" />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--color-warning)" }}>–฿6,662</span>
            </div>

            <div style={{ marginTop: 16, padding: 14, background: "var(--color-accent-soft)", borderRadius: 12 }}>
              <div className="humi-row">
                <div style={{ fontSize: 14, fontWeight: 700 }}>เงินสุทธิที่ได้รับ</div>
                <span className="humi-spacer" />
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-accent)" }}>฿24,418</div>
              </div>
            </div>
          </div>
        </div>

        {/* Side: YTD + history + bank */}
        <div className="humi-col" style={{ gap: 16 }}>
          <div className="humi-card">
            <div className="humi-eyebrow">สะสมตั้งแต่ต้นปี (YTD)</div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 4, fontWeight: 600 }}>4 งวด · ม.ค. – เม.ย.</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
              {[
              ["รายได้รวม", 124320, "var(--color-accent)"],
              ["ภาษีหักไป", 7368, "var(--color-warning)"],
              ["ประกันสังคม", 3000, "var(--color-ink-soft)"],
              ["สะสม PVD", 4800, "var(--color-sage)"]].
              map(([l, v, c]) =>
              <div key={l} style={{ padding: 12, background: "var(--color-canvas-soft)", borderRadius: 10 }}>
                  <div className="humi-eyebrow" style={{ fontSize: 10 }}>{l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4, color: c }}>฿{(v / 1000).toFixed(1)}K</div>
                </div>
              )}
            </div>
          </div>

          <div className="humi-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: 16, borderBottom: "1px solid var(--color-hairline-soft)" }}>
              <h4 className="humi-section-title">งวดก่อนหน้า</h4>
            </div>
            {[
            ["เม.ย. 68", "24,418", "25 เม.ย. 68", true],
            ["มี.ค. 68", "22,840", "25 มี.ค. 68"],
            ["ก.พ. 68", "23,120", "25 ก.พ. 68"],
            ["ม.ค. 68", "22,300", "25 ม.ค. 68"]].
            map(([m, v, d, cur], i) =>
            <div key={i} className="humi-row" style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-hairline-soft)", background: cur ? "var(--color-accent-soft)" : "transparent" }}>
                <div style={{ width: 36, height: 44, borderRadius: 6, background: "var(--color-warning-soft)", color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I.fileText size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>สลิป {m}</div>
                  <div style={{ fontSize: 11, color: "var(--color-ink-muted)" }}>{d}</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>฿{v}</div>
                <button className="humi-icon-btn" style={{ width: 30, height: 30, marginLeft: 8 }}><I.download size={13} /></button>
              </div>
            )}
            <div style={{ padding: 12, textAlign: "center", background: "var(--color-canvas-soft)" }}>
              <a style={{ color: "var(--color-accent)", fontSize: 13, fontWeight: 600 }}>ดูสลิปย้อนหลังทั้งหมด →</a>
            </div>
          </div>

          <div className="humi-card humi-card--cream">
            <div className="humi-row">
              <div>
                <div className="humi-eyebrow">บัญชีเงินเดือน</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>กรุงเทพฯ · ออมทรัพย์</div>
                <div style={{ fontSize: 13, color: "var(--color-ink-muted)", fontFamily: "ui-monospace, monospace" }}>•••• •••• 3401</div>
              </div>
              <span className="humi-spacer" />
              <button className="humi-button humi-button--ghost" style={{ padding: "6px 12px" }}>เปลี่ยนบัญชี</button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
window.PR_Employee = PR_Employee;

// 4B · MANAGER — สรุปทีม + อนุมัติ OT/โบนัส
function PR_Manager() {
  const I = window.PI;
  return (
    <div style={{ paddingBottom: 32 }}>
      <window.PageHead
        eyebrow="Payroll · มุมผู้จัดการ"
        title="ค่าใช้จ่ายบุคลากร · ทีม CTW Floor 1"
        subtitle="งบประมาณรายเดือน ฿840,000 · ใช้ไป 92% · เสนอ OT/โบนัสได้ก่อนปิดงวด 25 พ.ค."
        actions={<>
          <button className="humi-button humi-button--ghost"><I.download size={14} /> รายงานทีม</button>
          <button className="humi-button humi-button--primary"><I.send size={14} /> ส่งข้อเสนอโบนัส</button>
        </>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <window.StatCard label="ค่าจ้างเดือนนี้" value="฿772K" sub="92% ของงบ" accent="var(--color-warning)" icon="baht" />
        <window.StatCard label="OT เดือนนี้" value="฿58K" sub="120 ชม. ทีม 14 คน" icon="clock" />
        <window.StatCard label="โบนัสค้างเสนอ" value="3 คน" sub="รอ ผจก.อนุมัติ" icon="star" />
        <window.StatCard label="ค่าจ้างเฉลี่ย/คน" value="฿55,140" sub="รวม OT · สูงกว่าเฉลี่ยบริษัท 4%" icon="trending" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        <div className="humi-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: 18, borderBottom: "1px solid var(--color-hairline-soft)" }}>
            <div className="humi-row">
              <h3 className="humi-section-title">รายชื่อทีม · งวด พ.ค. 2568</h3>
              <span className="humi-spacer" />
              <window.SegTabs active="month" tabs={[{ id: "month", label: "เดือนนี้" }, { id: "q", label: "ไตรมาส" }, { id: "ytd", label: "YTD" }]} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "40px 1.8fr 1fr 1fr 1fr 1fr 100px", padding: "12px 18px", background: "var(--color-canvas-soft)", borderBottom: "1px solid var(--color-hairline-soft)", fontSize: 11, fontWeight: 700, color: "var(--color-ink-muted)", letterSpacing: ".06em", textTransform: "uppercase" }}>
            <div></div>
            <div>พนักงาน</div>
            <div style={{ textAlign: "right" }}>ฐาน</div>
            <div style={{ textAlign: "right" }}>OT</div>
            <div style={{ textAlign: "right" }}>โบนัส</div>
            <div style={{ textAlign: "right" }}>รวม</div>
            <div></div>
          </div>

          {[
          { n: "ธีรพัฒน์ มงคล", r: "Senior Cashier", c: "sage", b: 32000, ot: 6720, bn: 5000, p: "top" },
          { n: "มาริสา สงวนศักดิ์", r: "Cashier", c: "teal", b: 24000, ot: 1080, bn: 3500, p: "ok" },
          { n: "นิภาพร แสนสุข", r: "Cashier", c: "coral", b: 24000, ot: 1620, bn: 3500, p: "ok" },
          { n: "กัลยา ภูวดล", r: "Sales Asst.", c: "butter", b: 18000, ot: 0, bn: 1500, p: "ok" },
          { n: "อัมพร โพธิ์ทอง", r: "Sales Asst.", c: "teal", b: 18000, ot: 2160, bn: 2500, p: "top" },
          { n: "ปรีชา วรพงษ์", r: "Floor Staff", c: "ink", b: 14000, ot: 0, bn: 0, p: "new" }].
          map((m, i) => {
            const tot = m.b + m.ot + m.bn;
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1.8fr 1fr 1fr 1fr 1fr 100px", padding: "14px 18px", borderBottom: "1px solid var(--color-hairline-soft)", alignItems: "center" }}>
                <span className={"humi-avatar humi-avatar--" + m.c} style={{ width: 30, height: 30, fontSize: 11 }}>{m.n.slice(0, 2)}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.n}</div>
                  <div style={{ fontSize: 11, color: "var(--color-ink-faint)" }}>{m.r}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 13 }}>฿{m.b.toLocaleString()}</div>
                <div style={{ textAlign: "right", fontSize: 13, color: m.ot > 0 ? "var(--color-warning)" : "var(--color-ink-faint)" }}>{m.ot > 0 ? "฿" + m.ot.toLocaleString() : "—"}</div>
                <div style={{ textAlign: "right", fontSize: 13, color: m.bn > 0 ? "var(--color-accent)" : "var(--color-ink-faint)" }}>{m.bn > 0 ? "฿" + m.bn.toLocaleString() : "—"}</div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>฿{tot.toLocaleString()}</div>
                <div style={{ textAlign: "right" }}>
                  {m.p === "top" && <span className="humi-tag humi-tag--accent" style={{ fontSize: 10 }}><I.star size={10} /> Top</span>}
                  {m.p === "new" && <span className="humi-tag humi-tag--butter" style={{ fontSize: 10 }}>ทดลอง</span>}
                </div>
              </div>);

          })}

          <div className="humi-row" style={{ padding: "14px 18px", background: "var(--color-canvas-soft)" }}>
            <span style={{ fontSize: 13, color: "var(--color-ink-muted)" }}>รวม 14 คน · งบคงเหลือ <b style={{ color: "var(--color-warning)" }}>฿68,000</b></span>
            <span className="humi-spacer" />
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>฿772,000</span>
          </div>
        </div>

        {/* Right: Bonus proposal */}
        <div className="humi-col" style={{ gap: 16 }}>
          <div className="humi-card">
            <div className="humi-row" style={{ marginBottom: 14 }}>
              <div>
                <div className="humi-eyebrow">ข้อเสนอโบนัสรอบ Q2</div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginTop: 4 }}>ใช้งบ ฿62K / ฿80K</h4>
              </div>
              <span className="humi-spacer" />
              <span className="humi-tag humi-tag--cream">3 คน</span>
            </div>

            {[
            { n: "ธีรพัฒน์ ม.", c: "sage", r: "ยอดขายเกินเป้า 18%", v: 5000 },
            { n: "อัมพร พ.", c: "teal", r: "ลูกค้าให้ 5 ดาว 14 ครั้ง", v: 2500 },
            { n: "นิภาพร ส.", c: "coral", r: "ช่วยทีมข้ามสาขา 6 ครั้ง", v: 3500 }].
            map((b) =>
            <div key={b.n} style={{ padding: "12px 0", borderTop: "1px solid var(--color-hairline-soft)", display: "grid", gridTemplateColumns: "34px 1fr auto", gap: 10, alignItems: "center" }}>
                <span className={"humi-avatar humi-avatar--" + b.c} style={{ width: 34, height: 34, fontSize: 12 }}>{b.n.slice(0, 2)}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{b.n}</div>
                  <div style={{ fontSize: 11, color: "var(--color-ink-muted)", marginTop: 2 }}>{b.r}</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--color-accent)" }}>฿{b.v.toLocaleString()}</div>
              </div>
            )}

            <button className="humi-button humi-button--ghost" style={{ width: "100%", marginTop: 12 }}><I.plus size={13} /> เสนอเพิ่ม</button>
          </div>

          <div className="humi-card humi-card--ink" style={{ overflow: "hidden", position: "relative" }}>
            <div className="humi-blob humi-blob--teal" style={{ width: 80, height: 110, right: -20, top: -30, opacity: 0.4 }} />
            <div className="humi-eyebrow" style={{ color: "var(--color-accent)" }}>ปิดงวดในอีก</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--color-canvas-soft)", marginTop: 6 }}>3 วัน 14 ชม.</h3>
            <div style={{ fontSize: 12, color: "rgba(231,227,216,0.7)", marginTop: 4 }}>ส่งข้อเสนอก่อน 25 พ.ค. 12:00</div>
            <button className="humi-button humi-button--primary" style={{ marginTop: 14, width: "100%" }}>ตรวจรายการสุดท้าย</button>
          </div>
        </div>
      </div>
    </div>);

}
window.PR_Manager = PR_Manager;