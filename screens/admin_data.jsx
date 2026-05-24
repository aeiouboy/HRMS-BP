// admin_data.jsx — shared data for AdminScreen tabs
window.AdminData = {
  EMPLOYEES: [
    {id:"E-4421", n:"จงรักษ์ ทานากะ", r:"ผู้จัดการร้าน II", b:"สาขาทองหล่อ", e:"ava.reyes@humi.shop", t:"เต็มเวลา", s:"active", plan:"Flex Plus", c:"จท", col:"coral", join:"14 ก.ค. 2566", mgr:"เจส โอคอน", salary: 78000, dep: 2},
    {id:"E-3812", n:"มาร์คัส เคลลี่", r:"หัวหน้ากะ", b:"สาขาทองหล่อ", e:"marcus.kelley@humi.shop", t:"เต็มเวลา", s:"active", plan:"Flex Core", c:"MK", col:"teal", join:"14 ก.ค. 2567", mgr:"จงรักษ์ ทานากะ", salary: 42000, dep: 0},
    {id:"E-4012", n:"พริยะ ชาห์", r:"พนักงานอาวุโส", b:"สาขาทองหล่อ", e:"priya.shah@humi.shop", t:"เต็มเวลา", s:"active", plan:"Flex Core", c:"PS", col:"coral", join:"2 ม.ค. 2566", mgr:"จงรักษ์ ทานากะ", salary: 38000, dep: 1},
    {id:"E-4522", n:"เทย์เลอร์ ซิมส์", r:"พนักงาน", b:"สาขาทองหล่อ", e:"taylor.sims@humi.shop", t:"พาร์ทไทม์", s:"onboarding", plan:"—", c:"TS", col:"sage", join:"22 เม.ย. 2568", mgr:"มาร์คัส เคลลี่", salary: 18000, dep: 0},
    {id:"E-4530", n:"จอร์แดน ไนแลนด์", r:"พนักงาน", b:"สาขาทองหล่อ", e:"jordan.nyland@humi.shop", t:"พาร์ทไทม์", s:"active", plan:"Flex Core", c:"JN", col:"ink", join:"3 ก.พ. 2568", mgr:"มาร์คัส เคลลี่", salary: 22000, dep: 0},
    {id:"E-3120", n:"เจส โอคอน", r:"ผู้จัดการร้าน", b:"สาขาสีลม", e:"jess.ocon@humi.shop", t:"เต็มเวลา", s:"active", plan:"Flex Plus", c:"JO", col:"teal", join:"5 พ.ย. 2565", mgr:"ดานา หลิว", salary: 92000, dep: 3},
    {id:"E-3201", n:"อาเมียร์ คาลิล", r:"ผู้จัดการร้าน", b:"สาขาอารีย์", e:"amir.khalil@humi.shop", t:"เต็มเวลา", s:"leave", plan:"Flex Plus", c:"AK", col:"butter", join:"19 ก.ย. 2565", mgr:"ดานา หลิว", salary: 88000, dep: 2},
    {id:"E-2880", n:"ดานา หลิว", r:"ผู้จัดการเขต", b:"เขตทองหล่อ", e:"dana.liu@humi.shop", t:"เต็มเวลา", s:"active", plan:"Exec", c:"DL", col:"coral", join:"1 ส.ค. 2564", mgr:"เกรซ หวง", salary: 145000, dep: 1},
    {id:"E-4612", n:"นภา จิตรเมตตา", r:"พนักงาน", b:"สาขาสีลม", e:"napa.j@humi.shop", t:"พาร์ทไทม์", s:"pending", plan:"—", c:"NJ", col:"sage", join:"1 พ.ค. 2568", mgr:"เจส โอคอน", salary: 17500, dep: 0},
  ],

  PLANS: {
    flex_plus: {
      name:"Flex Plus", code:"HLTH-FP-2568", tier:"แผนพรีเมียม",
      cat:"สุขภาพและทันตกรรม", carrier:"Bupa Thailand", c:"var(--accent)",
      enrolled: 184, cap: 320, monthly: 142, employer: 980, deductible: 5000,
      perks:["ตรวจสุขภาพประจำปี 100%","ทันตกรรม ฿15,000/ปี","สายตา ฿3,000/ปี","ครอบคลุมผู้อุปการะถึง 4 คน"],
      open:"1 มี.ค. – 3 พ.ค. 2568", status:"เปิดรับ",
      eligibility: ["เต็มเวลา ทุกตำแหน่ง", "อายุงาน ≥ 60 วัน", "อายุ 18–69 ปี"],
      lifeEvents: ["แต่งงาน", "มีบุตร", "ย้ายที่อยู่", "เปลี่ยนสถานะคู่สมรส"],
      payrollCode:"DED-FP-001",
      workflow:["พนักงานยื่นเอกสาร", "หัวหน้างานรับทราบ", "HR ตรวจคุณสมบัติ", "อนุมัติและแจ้ง Bupa"]
    },
    flex_core: {
      name:"Flex Core", code:"HLTH-FC-2568", tier:"แผนมาตรฐาน",
      cat:"สุขภาพและทันตกรรม", carrier:"Bupa Thailand", c:"var(--coral)",
      enrolled: 412, cap: 600, monthly: 68, employer: 540, deductible: 8000,
      perks:["ตรวจสุขภาพประจำปี 100%","ทันตกรรม ฿8,000/ปี","ผู้อุปการะ 2 คน","พบแพทย์ออนไลน์ฟรี"],
      open:"1 มี.ค. – 3 พ.ค. 2568", status:"เปิดรับ",
      eligibility: ["เต็มเวลา หรือ พาร์ทไทม์ ≥ 20 ชม./สัปดาห์", "อายุงาน ≥ 30 วัน"],
      lifeEvents: ["แต่งงาน", "มีบุตร"],
      payrollCode:"DED-FC-001",
      workflow:["พนักงานยื่นเอกสาร", "HR ตรวจคุณสมบัติ", "อนุมัติและแจ้ง Bupa"]
    },
    pf: {
      name:"กองทุนสำรองเลี้ยงชีพ", code:"PF-2568", tier:"การเงินระยะยาว",
      cat:"กองทุน", carrier:"Fidelity Thailand", c:"var(--sage)",
      enrolled: 642, cap: 720, monthly: 0, employer: 0, deductible: 0,
      perks:["บริษัทสมทบสูงสุด 5%","ได้รับสิทธิ์ทันที","เลือกพอร์ตได้ 6 แบบ","ภาษีลดหย่อน"],
      open:"ตลอดปี", status:"เปิดถาวร",
      eligibility: ["พนักงานทุกคน", "ลงทะเบียนภายใน 30 วันแรก"],
      lifeEvents: ["เปลี่ยนผู้รับผลประโยชน์"],
      payrollCode:"DED-PF-001",
      workflow:["พนักงานยืนยันอัตราสมทบ", "HR บันทึก", "ส่ง Fidelity"]
    },
    wellness: {
      name:"สุขภาวะองค์รวม", code:"WLN-2568", tier:"ไลฟ์สไตล์",
      cat:"บัญชีไลฟ์สไตล์", carrier:"จัดการภายใน", c:"var(--butter)",
      enrolled: 538, cap: 720, monthly: 0, employer: 50, deductible: 0,
      perks:["฿600/ปี ใช้ได้กับฟิตเนส บำบัด คลาส","ไม่ต้องเสียภาษี","อนุมัติอัตโนมัติ ≤ ฿2,000","เบิกผ่านแอป"],
      open:"ตลอดปี", status:"เปิดถาวร",
      eligibility: ["พนักงานทุกคน อายุงาน ≥ 60 วัน", "ใช้ภายในปีปฏิทิน"],
      lifeEvents: [],
      payrollCode:"REIMB-WLN-001",
      workflow:["พนักงานส่งใบเสร็จ", "ระบบตรวจวงเงิน", "อนุมัติและจ่าย"]
    },
  },

  // Workflow Inbox — pending approvals
  WORKFLOWS: [
    {
      id:"WF-1042", event:"การเปลี่ยนแปลงสวัสดิการ", reason:"เพิ่มผู้อุปการะ · บุตร",
      subject:"พริยะ ชาห์", subjectId:"E-4012", subjectInit:"PS", col:"coral",
      submitted:"30 เม.ย. 14:22", priority:"normal", sla:"ภายใน 3 วัน",
      chain:[
        {role:"ผู้ยื่น", who:"พริยะ ชาห์", state:"done", time:"30 เม.ย. 14:22"},
        {role:"หัวหน้างาน", who:"จงรักษ์ ทานากะ", state:"done", time:"30 เม.ย. 16:01"},
        {role:"HR · กำลังพิจารณา", who:"คุณ (จอร์แดน)", state:"current", time:""},
        {role:"แจ้ง Bupa", who:"ระบบอัตโนมัติ", state:"pending", time:""},
      ],
      payload: {"แผน":"Flex Core", "ผู้อุปการะใหม่":"ด.ญ. ปานเงิน ชาห์ (อายุ 4)", "เริ่มมีผล":"1 มิ.ย. 2568", "ผลกระทบเงินเดือน":"+฿120/เดือน"}
    },
    {
      id:"WF-1043", event:"การจ้างงานใหม่", reason:"เริ่มงานพาร์ทไทม์",
      subject:"นภา จิตรเมตตา", subjectId:"E-4612", subjectInit:"NJ", col:"sage",
      submitted:"29 เม.ย. 09:10", priority:"high", sla:"ภายใน 1 วัน",
      chain:[
        {role:"ผู้สรรหา", who:"คาเรน หลี", state:"done", time:"29 เม.ย. 09:10"},
        {role:"ผู้จัดการร้าน", who:"เจส โอคอน", state:"done", time:"29 เม.ย. 11:30"},
        {role:"HR · กำลังพิจารณา", who:"คุณ (จอร์แดน)", state:"current", time:""},
        {role:"การเงิน · เปิดบัญชีเงินเดือน", who:"ทีมเปย์โรล", state:"pending", time:""},
      ],
      payload:{"ตำแหน่ง":"พนักงาน", "สาขา":"สาขาสีลม", "เริ่มงาน":"1 พ.ค. 2568", "ค่าจ้าง":"฿120/ชม.", "ชม./สัปดาห์":"24"}
    },
    {
      id:"WF-1044", event:"การปรับเงินเดือน", reason:"ทบทวนกลางปี",
      subject:"มาร์คัส เคลลี่", subjectId:"E-3812", subjectInit:"MK", col:"teal",
      submitted:"28 เม.ย. 11:08", priority:"normal", sla:"ภายใน 5 วัน",
      chain:[
        {role:"ผู้จัดการ", who:"จงรักษ์ ทานากะ", state:"done", time:"28 เม.ย. 11:08"},
        {role:"ผู้จัดการเขต", who:"ดานา หลิว", state:"done", time:"28 เม.ย. 14:00"},
        {role:"HR · กำลังพิจารณา", who:"คุณ (จอร์แดน)", state:"current", time:""},
        {role:"การเงิน", who:"ทีมเปย์โรล", state:"pending", time:""},
      ],
      payload:{"เงินเดือนเดิม":"฿42,000", "เงินเดือนใหม่":"฿44,500", "เปลี่ยนแปลง":"+5.95%", "เริ่มมีผล":"1 มิ.ย. 2568"}
    },
    {
      id:"WF-1045", event:"การลาออก", reason:"ลาออกโดยสมัครใจ",
      subject:"กิตติ ชัยศรี", subjectId:"E-3340", subjectInit:"กช", col:"butter",
      submitted:"27 เม.ย. 16:45", priority:"normal", sla:"ภายใน 7 วัน",
      chain:[
        {role:"พนักงาน", who:"กิตติ ชัยศรี", state:"done", time:"27 เม.ย. 16:45"},
        {role:"ผู้จัดการ", who:"เจส โอคอน", state:"done", time:"27 เม.ย. 18:00"},
        {role:"HR · กำลังพิจารณา", who:"คุณ (จอร์แดน)", state:"current", time:""},
        {role:"ปิดสวัสดิการทั้งหมด", who:"ระบบอัตโนมัติ", state:"pending", time:""},
      ],
      payload:{"วันสุดท้าย":"31 พ.ค. 2568", "เหตุผล":"เปลี่ยนสายอาชีพ", "อุปกรณ์ที่ต้องคืน":"iPad, บัตรพนักงาน", "วันลาคงเหลือ":"4 วัน"}
    },
    {
      id:"WF-1046", event:"การเลื่อนตำแหน่ง", reason:"โปรโมท · หัวหน้ากะ",
      subject:"จอร์แดน ไนแลนด์", subjectId:"E-4530", subjectInit:"JN", col:"ink",
      submitted:"26 เม.ย. 10:00", priority:"low", sla:"ภายใน 7 วัน",
      chain:[
        {role:"ผู้จัดการ", who:"มาร์คัส เคลลี่", state:"done", time:"26 เม.ย. 10:00"},
        {role:"ผู้จัดการร้าน", who:"จงรักษ์ ทานากะ", state:"done", time:"26 เม.ย. 14:30"},
        {role:"HR · กำลังพิจารณา", who:"คุณ (จอร์แดน)", state:"current", time:""},
      ],
      payload:{"ตำแหน่งเดิม":"พนักงาน", "ตำแหน่งใหม่":"หัวหน้ากะ", "เริ่มมีผล":"1 มิ.ย. 2568", "เงินเดือน":"+8%"}
    },
  ],

  // Audit log — Event-based
  AUDIT: [
    {who:"จอร์แดน เหมย", c:"JM", t:"sage", event:"PLAN_UPDATED", reason:"แก้ไขเกณฑ์ลดหย่อน", target:"Flex Plus · HLTH-FP-2568", time:"30 เม.ย. 14:22", before:"฿4,500", after:"฿5,000"},
    {who:"เกรซ หวง", c:"GH", t:"ink", event:"HIRE", reason:"เริ่มงานพาร์ทไทม์", target:"นภา จิตรเมตตา · E-4612", time:"30 เม.ย. 11:08"},
    {who:"จอร์แดน เหมย", c:"JM", t:"sage", event:"BULK_NOTIFY", reason:"ส่งคำเชิญลงทะเบียน", target:"178 คน · ฤดูลงทะเบียน 2568", time:"29 เม.ย. 17:45"},
    {who:"ดานา หลิว", c:"DL", t:"coral", event:"COMPENSATION_CHANGE", reason:"ทบทวนกลางปี", target:"มาร์คัส เคลลี่ · E-3812", time:"28 เม.ย. 09:30", before:"฿42,000", after:"฿44,500"},
    {who:"จอร์แดน เหมย", c:"JM", t:"sage", event:"RULE_CREATED", reason:"กฎอัตโนมัติใหม่", target:"ถ้าสาขาในกรุงเทพฯ → เพิ่มสุขภาวะองค์รวม", time:"26 เม.ย. 13:12"},
    {who:"เกรซ หวง", c:"GH", t:"ink", event:"TERMINATION", reason:"ลาออกโดยสมัครใจ", target:"กิตติ ชัยศรี · E-3340", time:"24 เม.ย. 16:00"},
    {who:"ระบบ", c:"SY", t:"butter", event:"AUTO_RENEWAL", reason:"ต่ออายุแผนอัตโนมัติ", target:"412 คน · Flex Core", time:"22 เม.ย. 02:00"},
    {who:"จอร์แดน เหมย", c:"JM", t:"sage", event:"PERMISSION_GRANTED", reason:"กำหนดสิทธิ์ HR Partner", target:"คาเรน หลี · ระดับสาขา", time:"20 เม.ย. 10:15"},
    {who:"ดานา หลิว", c:"DL", t:"coral", event:"PROMOTION", reason:"เลื่อนตำแหน่ง", target:"พริยะ ชาห์ · พนักงานอาวุโส", time:"15 เม.ย. 14:30"},
  ],

  EVENT_META: {
    PLAN_UPDATED: {l:"แก้ไขแผน", c:"butter"},
    HIRE: {l:"จ้างงาน", c:"sage"},
    BULK_NOTIFY: {l:"แจ้งกลุ่ม", c:""},
    COMPENSATION_CHANGE: {l:"ปรับค่าตอบแทน", c:""},
    RULE_CREATED: {l:"สร้างกฎ", c:"sage"},
    TERMINATION: {l:"ลาออก/เลิกจ้าง", c:"coral"},
    AUTO_RENEWAL: {l:"ต่ออายุอัตโนมัติ", c:"butter"},
    PERMISSION_GRANTED: {l:"สิทธิ์ใหม่", c:""},
    PROMOTION: {l:"เลื่อนตำแหน่ง", c:"sage"},
  },

  STATUS: {
    active: {l:"ทำงาน", t:"sage"},
    onboarding: {l:"เริ่มงาน", t:"butter"},
    leave: {l:"ลางาน", t:"coral"},
    pending: {l:"รอเอกสาร", t:""},
  },
};
