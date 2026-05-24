/* Humi · HRIS Live Prototype — fully interactive
   - All buttons clickable: persona switch, date nav, filter dropdowns, export, bulk assign, inbox, bell
   - Click any shift bar → opens editor drawer
   - Override times with +/- 30 min steppers, time inputs, add/remove break, or delete the shift
   - Toast feedback for every action
*/

const { useState, useEffect, useMemo, useRef } = React;

/* ── Icons ─────────────────────────────────────────────────────── */
const I = {
  search:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bell:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>,
  inbox:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg>,
  caretDn:  () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  caretR:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  chevL:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevR:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  plus:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  minus:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>,
  x:        () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  filter:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  lock:     () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  calendar: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  trash:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>,
  coffee:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 1 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  check:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  undo:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
  download: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  /* group icons */
  workspace: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  team:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  hr:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  /* pinned-tile icons */
  leave:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
  payslip:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
  heart:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  clock:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  doc:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  mega:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  user:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  target:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  approve:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64"/></svg>,
  roster:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="6" y="13" width="4" height="2"/><rect x="11" y="13" width="6" height="2"/></svg>,
  swap:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  orgnet:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="19" r="3"/><path d="M12 8v3"/><path d="M12 11l-6 5"/><path d="M12 11l6 5"/></svg>,
  /* asset-category icons */
  shirt:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2 12 6 8 2 4 4l2 6-2 12h16l-2-12 2-6z"/></svg>,
  laptop:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  badgeId:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M7 17c1-1.6 2.8-2.5 5-2.5s4 .9 5 2.5"/></svg>,
  key:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="15" r="4"/><path d="m9.8 12.2 11-11"/><path d="m18 5 3 3"/><path d="m15 8 3 3"/></svg>,
  phoneIco: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
  package:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  pin:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>,
  cake:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01M12 4h.01M17 4h.01"/></svg>,
  party:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01"/><path d="m22 2-7.5 13.5L9 10l-7 12"/></svg>,
};

/* ── Personas ─────────────────────────────────────────────────── */
const PERSONAS = {
  employee: { id: "employee", name: "Panji Dwi",  role: "EVERY EMPLOYEE",       short: "EMP", empId: "EMP-04821", av: "PD", avBg: "linear-gradient(135deg,#E08864,#E8C46B)", access: ["A"] },
  manager:  { id: "manager",  name: "Somchai K.", role: "LINE MANAGER · 6 RPT", short: "MGR", empId: "EMP-00204", av: "SK", avBg: "linear-gradient(135deg,#1FA8A0,#5B6CE0)", access: ["A","B"] },
  hradmin:  { id: "hradmin",  name: "Anan S.",    role: "HR ADMIN · OPERATIONS",short: "HR",  empId: "EMP-00014", av: "AS", avBg: "linear-gradient(135deg,#5B6CE0,#9333EA)", access: ["A","B","C"] },
  hris:     { id: "hris",     name: "Wichai R.",  role: "HRIS · MASTER DATA",   short: "HRIS", empId: "EMP-00007", av: "WR", avBg: "linear-gradient(135deg,#9333EA,#5B6CE0)", access: ["A","B","C"] },
  spd:      { id: "spd",      name: "Nat L.",     role: "SPD · DOCUMENT REVIEW",short: "SPD", empId: "EMP-00031", av: "NL", avBg: "linear-gradient(135deg,#2F8A6B,#1FA8A0)", access: ["A","B","C"] },
  sysadmin: { id: "sysadmin", name: "Pim L.",     role: "SYSTEM ADMINISTRATOR", short: "SYS", empId: "EMP-00001", av: "PL", avBg: "linear-gradient(135deg,#243447,#5A6A7E)", access: ["A","B","C","D"] },
};

/* Sidebar IA — mapped from old HRMS Modules.html (bilingual TH/EN) */
const MODULES = [
  { g: "A", id: "workspace", label: "My Workspace", labelTh: "พื้นที่ทำงานของฉัน", ico: I.workspace, leaves: [
      { id: "home",      label: "Home",                 labelTh: "หน้าหลัก" },
      { id: "profile",   label: "My Profile",           labelTh: "โปรไฟล์ของฉัน" },
      { id: "time",      label: "Time & Attendance",    labelTh: "ลงเวลา" },
      { id: "leaves",    label: "Leaves",               labelTh: "ใบลา", badge: "3" },
      { id: "payslips",  label: "Payslips",             labelTh: "สลิปเงินเดือน" },
      { id: "benefits",  label: "Benefits",             labelTh: "สวัสดิการ" },
      { id: "documents", label: "Documents",            labelTh: "เอกสาร" },
      { id: "requests",  label: "Requests",             labelTh: "ใบคำขอ" },
      { id: "announce",  label: "Announcements",        labelTh: "ประกาศ" },
  ]},
  { g: "B", id: "team", label: "Team Management", labelTh: "การจัดการทีม", ico: I.team, leaves: [
      { id: "inbox",     label: "Team Inbox",           labelTh: "กล่องงาน", badge: "12" },
      { id: "roster",    label: "Roster & Shifts",      labelTh: "ตารางกะ" },
      { id: "swap",      label: "Shift Swap",           labelTh: "สลับกะ" },
      { id: "approvals", label: "Approvals",            labelTh: "อนุมัติ" },
      { id: "perf",      label: "Team Performance",     labelTh: "ผลงานทีม" },
      { id: "probation", label: "Probation Reviews",    labelTh: "ทดลองงาน" },
      { id: "team-reports", label: "Team Reports",      labelTh: "รายงานทีม" },
  ]},
  { g: "C", id: "hr", label: "HR Administration", labelTh: "งานบุคคล", ico: I.hr, leaves: [
      { id: "employees", label: "Employees",            labelTh: "ทะเบียนพนักงาน" },
      { id: "orgchart",  label: "Org Chart",            labelTh: "ผังองค์กร" },
      { id: "hire",      label: "Hire & Onboard",       labelTh: "จ้างงาน" },
      { id: "lifecycle", label: "Onboarding",           labelTh: "เริ่มงาน · 90 วันแรก" },
      { id: "confirm",   label: "Confirmation Letter",  labelTh: "หนังสือบรรจุ" },
      { id: "transfer",  label: "Transfer",             labelTh: "โยกย้าย" },
      { id: "offboard",  label: "Offboarding",          labelTh: "ลาออก" },
      { id: "comp",      label: "Compensation",         labelTh: "ค่าตอบแทน" },
      { id: "welfare",   label: "Welfare Plans",        labelTh: "แผนสวัสดิการ" },
      { id: "claims",    label: "Benefit Claims",       labelTh: "เบิกสวัสดิการ", badge: "2" },
      { id: "assets",    label: "Assets",               labelTh: "ทรัพย์สิน" },
      { id: "recruit",   label: "Recruitment",          labelTh: "สรรหา" },
      { id: "org-reports", label: "Org Reports",        labelTh: "รายงานองค์กร" },
      { id: "audit",     label: "Audit Log",            labelTh: "บันทึกตรวจสอบ" },
  ]},
  { g: "D", id: "system", label: "System Settings", labelTh: "ตั้งค่าระบบ", ico: I.settings, leaves: [
      { id: "policy",    label: "Policy Builder",       labelTh: "ตั้งค่านโยบาย" },
      { id: "catalog",   label: "Master Catalog",       labelTh: "ฐานข้อมูลกลาง" },
      { id: "regular",   label: "Regularization Queue", labelTh: "คิวตรวจเวลา" },
      { id: "docreview", label: "Document Review",      labelTh: "คิวตรวจเอกสาร" },
      { id: "roles",     label: "Roles & Permissions",  labelTh: "สิทธิ์ตามบทบาท" },
      { id: "workflows", label: "Approval Workflows",   labelTh: "ขั้นตอนอนุมัติ" },
      { id: "notifs",    label: "Notifications",        labelTh: "แจ้งเตือน" },
      { id: "integrations", label: "Integrations",      labelTh: "เชื่อมต่อระบบ" },
      { id: "branding",  label: "Branding",             labelTh: "ธีม" },
      { id: "security",  label: "Security & SSO",       labelTh: "ความปลอดภัย" },
      { id: "impers",    label: "Impersonation Log",    labelTh: "บันทึก impersonate" },
  ]},
];

/* ── Roster seed data ────────────────────────────────────────── */
const INITIAL_TEAM = [
  { id: "e1", name: "Somchai K.", role: "FT · SHIFT LEAD · FOH",   avBg: "#1FA8A0", iv: "SK", shift: { start: 7,  end: 16, break: [12, 13],     variant: "default" } },
  { id: "e2", name: "Somsri P.",  role: "FT · CASHIER · FOH",      avBg: "#E08864", iv: "SP", shift: { start: 9,  end: 18, break: [13, 14],     variant: "default" } },
  { id: "e3", name: "Panji Dwi",  role: "PT · FLOOR",              avBg: "#5B6CE0", iv: "PD", shift: { start: 13, end: 17,                       variant: "s-pt" } },
  { id: "e4", name: "Anan S.",    role: "MOD · MANAGER ON DUTY",   avBg: "#9333EA", iv: "AS", shift: { start: 10, end: 19, break: [14, 15],     variant: "s-mgr" } },
  { id: "e5", name: "Mali T.",    role: "FT · BARISTA · FOH",      avBg: "#2F8A6B", iv: "MT", shift: { start: 6,  end: 14, break: [10, 10.5],   variant: "default" } },
  { id: "e6", name: "Krit J.",    role: "FT · STOCK · BOH",        avBg: "#5A6A7E", iv: "KJ", shift: { start: 16, end: 23,                       variant: "default" } },
];

function computeCoverage(team) {
  const required = [0,0,0,1,2,3,4,4,4,4,3,2,4,5,5,5,4,3,2,2,1,1,0,0];
  const actual = new Array(24).fill(0);
  team.forEach(e => {
    if (!e.shift) return;
    for (let h = 0; h < 24; h++) {
      const s = e.shift;
      if (h + 1 > s.start && h + 1 <= s.end) {
        if (s.break && h + 1 > s.break[0] && h + 1 <= s.break[1]) continue;
        actual[h]++;
      }
    }
  });
  return { required, actual };
}

/* ── Phase 13 · Additional persona screens ─────────────────────── */

/* Employee · Announcements feed */
function AnnouncementsScreen({ toast }) {
  const items = [
    { tag: "NEW POLICY",   tagKind: "amber", title: "อัพเดทนโยบาย WFH · มีผล 1 มิ.ย. 2026", body: "WFH ได้สูงสุด 8 วัน/เดือน ตามรอบงาน ขอจากหัวหน้าล่วงหน้า 24h", who: "HR Admin · Anan S.", when: "วันนี้ · 09:14", pin: true },
    { tag: "EVENT",         tagKind: "mint",  title: "Q2 Town Hall — พุธ 4 มิ.ย. 14:00 @ HQ Atrium", body: "อัพเดทผลงาน Q1 + roadmap Q2 · มีอาหารว่าง · RSVP ภายในวันที่ 28 พ.ค.", who: "CEO · Krit W.", when: "เมื่อวาน" },
    { tag: "BENEFIT",       tagKind: "mint",  title: "เพิ่มวงเงินทันตกรรมเป็น ฿20,000/ปี", body: "มีผลย้อนหลังตั้งแต่ 1 ม.ค. 2026 · เคลมเก่าจะปรับให้อัตโนมัติในรอบเงินเดือนหน้า", who: "HR Admin · Anan S.", when: "20 พ.ค." },
    { tag: "HOLIDAY",       tagKind: "default", title: "วันหยุดประจำเดือน มิ.ย.", body: "3 มิ.ย. (วันเฉลิมพระชนมพรรษา) · กะวันนั้นจ่ายเพิ่ม 2× ตามนโยบาย OT", who: "HR Admin", when: "18 พ.ค." },
    { tag: "TRAINING",      tagKind: "info",  title: "อบรม Food Safety รอบใหม่ — 27 พ.ค.", body: "บังคับสำหรับพนักงาน FOH/BOH ทุกคน · ลงทะเบียนใน Learning Centre", who: "Anan S.", when: "16 พ.ค." },
  ];
  return (
    <div className="screen">
      <PageHeader eyebrow="ประกาศ · ANNOUNCEMENTS" title="ประกาศจากบริษัท" sub="เรื่องที่ต้องรู้จาก HR · ผู้บริหาร · และทีม"/>
      <div className="card">
        <div className="card-list">
          {items.map((m, i) => (
            <div key={i} className={"card-row" + (m.pin ? " is-pinned" : "")} style={{ alignItems: "flex-start" }}>
              <span className={"humi-tag " + (m.tagKind === "amber" ? "humi-tag--amber" : m.tagKind === "mint" ? "humi-tag--mint" : m.tagKind === "info" ? "" : "")}>{m.tag}</span>
              <div className="card-row-body" style={{ marginLeft: 4 }}>
                <div className="card-row-title">{m.title}{m.pin && <span style={{ marginLeft: 8, fontSize: 10, color: "var(--imp-bg)", letterSpacing: ".1em", fontFamily: "var(--mono)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><I.pin style={{ width: 11, height: 11 }}/> PINNED</span>}</div>
                <div style={{ fontSize: 13, color: "var(--color-ink-soft)", marginTop: 6, lineHeight: 1.5 }}>{m.body}</div>
                <div className="card-row-sub" style={{ marginTop: 8 }}>{m.who} · {m.when}</div>
              </div>
              <button className="mini-btn ghost" onClick={() => toast({ msg: "Marked as read" })}>Got it</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* HR Admin · Confirmation Letter (after probation passes) */
function ConfirmationLetterScreen({ toast, onNav }) {
  const [signedBy, setSignedBy] = useState("Anan S.");
  const [effectiveDate, setEffectiveDate] = useState("28 Jun 2026");
  const [salary, setSalary] = useState("28,500");
  const [sent, setSent] = useState(false);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-04 · CONFIRMATION · หนังสือบรรจุ"
        title="Confirm employment — Panji Dwi"
        sub="120-day probation passed on 28 Jun · ready to convert to full-time."
        actions={
          <button
            className="primary-btn"
            onClick={() => { setSent(true); toast({ kind: "success", msg: "Confirmation letter sent", detail: "Emailed to panji.d@humi.shop + filed in Documents" }); setTimeout(() => onNav("employees"), 800); }}
          ><I.check/> Sign & send</button>
        }
      />

      <div className="screen-grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">LETTER PREVIEW</div>
            <div className="card-title">Confirmation of employment</div>
          </div>
          <div className="confirm-letter">
            <div className="confirm-letter-head">
              <img src="assets/humi-logo-light.png" alt="humi" style={{ height: 28 }}/>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--color-ink-faint)", letterSpacing: ".12em" }}>CENTRAL · BANGKOK 03</div>
            </div>
            <div className="confirm-letter-date">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div className="confirm-letter-recipient">
              <b>Khun Panji Dwi</b><br/>
              EMP-04821 · PT Floor · FOH<br/>
              123/45 Sukhumvit Rd, Bangkok 10110
            </div>
            <div className="confirm-letter-subject"><b>Re: Confirmation of Employment</b></div>
            <p>Dear Khun Panji,</p>
            <p>We are pleased to confirm that you have successfully completed your 120-day probationary period at Humi (Central · Bangkok 03), effective <b>{effectiveDate}</b>.</p>
            <p>With this letter, your employment is hereby <b>confirmed as permanent and full-time</b>, with the following terms taking effect from {effectiveDate}:</p>
            <ul>
              <li>Position: <b>Floor Associate · FOH</b></li>
              <li>Base salary: <b>฿{salary}/month</b></li>
              <li>Benefits tier: <b>Tier B · FT</b> (health, dental, optical, PF)</li>
              <li>Annual leave: <b>18 days</b> (pro-rated from confirmation)</li>
              <li>Reporting to: <b>Somchai K., Shift Lead</b></li>
            </ul>
            <p>Thank you for your dedication during the probation period. We look forward to your continued contribution.</p>
            <p>Sincerely,</p>
            <div style={{ marginTop: 28 }}>
              {sent ? (
                <div style={{ fontFamily: "Caveat, 'CPN Italic', cursive", fontSize: 28, color: "var(--edit)" }}>{signedBy}</div>
              ) : (
                <div style={{ height: 38, borderBottom: "1px dashed var(--color-hairline)", maxWidth: 180 }}/>
              )}
              <div style={{ fontSize: 12.5, color: "var(--color-ink-soft)", marginTop: 4 }}><b>{signedBy}</b> · HR Admin</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">TERMS</div>
            <div className="card-title">Confirmation details</div>
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Effective date" value={effectiveDate} onChange={setEffectiveDate}/>
            <Field label="New base salary (฿)" value={salary} onChange={setSalary} prefix="฿"/>
            <SelectField label="Signed by" value={signedBy} onChange={setSignedBy}
              options={["Anan S.","Pim L.","Wichai R."]}/>
            <div className="form-callout" style={{ marginTop: 4 }}>
              <div className="form-callout-eyebrow">Auto on send</div>
              <div>· Email + LINE OA to employee</div>
              <div>· Filed to Documents</div>
              <div>· Audit log entry created</div>
              <div>· Position changes pushed to payroll</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HR Admin · Transfer Workspace */
function TransferWorkspace({ toast, onNav }) {
  const [tasks, setTasks] = useState([
    { id: "t1", t: "Confirm new role with employee",    owner: "Manager",     done: true  },
    { id: "t2", t: "Cost-centre code updated",          owner: "HRIS",         done: true  },
    { id: "t3", t: "New manager briefed",                owner: "HR Admin",    done: false },
    { id: "t4", t: "Letter generated & signed",          owner: "HR Admin",    done: false },
    { id: "t5", t: "Handoff doc to current manager",     owner: "Employee",    done: false },
    { id: "t6", t: "Payroll updated · effective 1 Jun",  owner: "HR Admin",    done: false },
    { id: "t7", t: "Door access + system permissions",   owner: "HRIS",         done: false },
    { id: "t8", t: "Final 1:1 with previous manager",    owner: "Manager",     done: false },
  ]);
  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-05 · TRANSFER · โยกย้าย"
        title={<>Somsri P. <em>·</em> FOH → Drive-thru</>}
        sub="Effective 1 Jun · pay stays same · new manager: Achara P. (BKK-07)"
        actions={
          <div className="onboard-progress">
            <div className="onboard-progress-num">{done} / {tasks.length}</div>
            <div className="onboard-progress-bar"><span style={{ width: pct + "%" }}/></div>
            <div className="onboard-progress-pct">{pct}%</div>
          </div>
        }
      />

      <div className="screen-grid">
        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">CLEARANCE CHECKLIST</div>
            <div className="card-title">8 items across 3 owners</div>
          </div>
          <div className="card-list">
            {tasks.map(t => (
              <label key={t.id} className={"check-row" + (t.done ? " is-done" : "")}>
                <input type="checkbox" checked={t.done} onChange={() => { toggle(t.id); toast({ msg: `${t.t} ${t.done ? "reopened" : "completed"}` }); }}/>
                <div className="check-body">
                  <div className="check-title">{t.t}</div>
                  <div className="check-meta"><b>{t.owner}</b></div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">CHANGE SUMMARY</div>
              <div className="card-title">From → To</div>
            </div>
            <div style={{ padding: "12px 18px" }}>
              <div className="transfer-pair">
                <div><div className="hub-tab-sub">FROM</div><b>Cashier · FOH</b><div className="hub-tab-sub">Bangkok 03 · FT</div></div>
                <span style={{ fontSize: 22, color: "var(--color-accent)", fontWeight: 700, alignSelf: "center" }}>→</span>
                <div><div className="hub-tab-sub">TO</div><b>Drive-thru attendant</b><div className="hub-tab-sub">Bangkok 07 · FT</div></div>
              </div>
              <div style={{ marginTop: 12 }}>
                <KV k="Manager"      v="Somchai K. → Achara P."/>
                <KV k="Cost centre" v="FOH-BKK03 → DTH-BKK07"/>
                <KV k="Salary"       v="฿22,500/mo (no change)"/>
                <KV k="Effective"   v="1 Jun 2026"/>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">DOCUMENTS</div>
              <div className="card-title">Auto-generated</div>
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="quick-tile" onClick={() => toast({ kind: "success", msg: "Transfer letter generated" })}>
                <div className="quick-ico" style={{ background: "var(--color-accent-soft)", color: "#06241F" }}>T</div>
                <span>Transfer letter</span><I.download/>
              </button>
              <button className="quick-tile" onClick={() => toast({ kind: "success", msg: "Job description updated" })}>
                <div className="quick-ico" style={{ background: "var(--color-accent-alt-soft)", color: "#2d3a9c" }}>J</div>
                <span>New job description</span><I.download/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HRIS · Policy Builder */
function PolicyBuilderScreen({ toast }) {
  const [domain, setDomain] = useState("attendance");
  const policies = {
    attendance: [
      { k: "Grace period · clock-in",  v: "10 min", note: "Late if past 09:10 for 09:00 shift" },
      { k: "Auto clock-out",            v: "12 hrs", note: "Sessions over 12h auto-clock-out" },
      { k: "Break deduction",           v: "60 min", note: "Auto-deducted for shifts ≥ 6h" },
      { k: "OT threshold",              v: "9 hrs",  note: "Above contracted; needs pre-approval" },
      { k: "OT cap · weekly",           v: "12 hrs", note: "Hard cap per labor law" },
    ],
    leave: [
      { k: "Annual leave · year 1",      v: "12 days", note: "Pro-rated from join date" },
      { k: "Annual leave · year 2+",     v: "18 days", note: "After confirmation" },
      { k: "Sick · without cert",        v: "3 days/yr", note: "Beyond requires medical cert" },
      { k: "Carry-over",                 v: "Max 5 d",  note: "Expires 31 Mar of following year" },
      { k: "Notice · annual leave",      v: "≥7 days",  note: "Manager can override" },
    ],
    ot: [
      { k: "Weekday OT rate",            v: "1.5×",  note: "Mon–Sat after contracted hours" },
      { k: "Holiday OT rate",            v: "2.0×",  note: "Public holidays + Sunday" },
      { k: "Night premium · 22:00–06:00",v: "+25%", note: "On top of base OT rate" },
      { k: "Min OT block",               v: "30 min", note: "Below 30 min not paid" },
    ],
    holiday: [
      { k: "Songkran",                   v: "13–15 Apr",      note: "3 days · paid" },
      { k: "Coronation Day",             v: "4 May",          note: "1 day · paid" },
      { k: "Visakha Bucha",              v: "11 Jun",         note: "1 day · paid" },
      { k: "Asalha Bucha",               v: "20 Jul",         note: "1 day · paid" },
      { k: "Queen's Birthday",           v: "12 Aug",         note: "1 day · paid" },
    ],
  };
  return (
    <div className="screen">
      <PageHeader
        eyebrow="D · POLICY BUILDER · นโยบาย"
        title="Time & leave policies"
        sub="HRIS-only · changes apply to all employees in next pay cycle"
        actions={<button className="primary-btn" onClick={() => toast({ kind: "success", msg: "Policy snapshot saved", detail: "v.2026.05 · audit logged" })}><I.check/> Save snapshot</button>}
      />
      <div className="seg">
        {[["attendance","Attendance"],["leave","Leave"],["ot","Overtime"],["holiday","Public holidays"]].map(([k, l]) => (
          <button key={k} className={"seg-btn" + (domain === k ? " is-active" : "")} onClick={() => setDomain(k)}>{l}</button>
        ))}
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Rule</th><th>Value</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {policies[domain].map((p, i) => (
              <tr key={i}>
                <td><b>{p.k}</b></td>
                <td className="mono-sm"><b>{p.v}</b></td>
                <td>{p.note}</td>
                <td><button className="mini-btn ghost" onClick={() => toast({ msg: `Editing: ${p.k}` })}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* HRIS · Master Catalog */
function MasterCatalogScreen({ toast }) {
  const [tab, setTab] = useState("bands");
  return (
    <div className="screen">
      <PageHeader
        eyebrow="D · MASTER CATALOG · ฐานข้อมูลกลาง"
        title="Reference data"
        sub="Position bands · locations · cost centres · plan templates"
      />
      <div className="tabs">
        {[["bands","Position bands"],["locations","Locations"],["costcentres","Cost centres"],["plans","Plan templates"]].map(([k, l]) => (
          <button key={k} className={"tab" + (tab === k ? " is-active" : "")} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <div className="card">
        <table className="data-table">
          {tab === "bands" && (
            <>
              <thead><tr><th>Band</th><th>Title range</th><th className="num">Min</th><th className="num">Mid</th><th className="num">Max</th></tr></thead>
              <tbody>
                {[["C1","Trainee / PT","฿18,000","฿22,000","฿25,000"],["C2","Associate","฿22,000","฿28,000","฿34,000"],["C3","Shift Lead","฿32,000","฿42,000","฿52,000"],["C4","Manager","฿48,000","฿62,000","฿78,000"],["C5","Senior Manager","฿72,000","฿95,000","฿120,000"]].map(r => (
                  <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td className="num">{r[2]}</td><td className="num"><b>{r[3]}</b></td><td className="num">{r[4]}</td></tr>
                ))}
              </tbody>
            </>
          )}
          {tab === "locations" && (
            <>
              <thead><tr><th>Code</th><th>Name</th><th>Region</th><th className="num">HC</th><th>Manager</th></tr></thead>
              <tbody>
                {[["BKK-03","Central · Bangkok 03","Bangkok","12","Somchai K."],["BKK-07","Central · Bangkok 07","Bangkok","8","Achara P."],["BKK-CW","CentralWorld","Bangkok","16","—"],["CNX-01","Chiang Mai 01","North","6","—"]].map(r => (
                  <tr key={r[0]}><td className="mono-sm">{r[0]}</td><td><b>{r[1]}</b></td><td>{r[2]}</td><td className="num">{r[3]}</td><td>{r[4]}</td></tr>
                ))}
              </tbody>
            </>
          )}
          {tab === "costcentres" && (
            <>
              <thead><tr><th>Code</th><th>Name</th><th>Parent</th><th>Status</th></tr></thead>
              <tbody>
                {[["FOH-BKK03","Front-of-House · BKK 03","BKK-03","Active"],["BOH-BKK03","Back-of-House · BKK 03","BKK-03","Active"],["DTH-BKK07","Drive-thru · BKK 07","BKK-07","Active"],["MGT-CORP","Corporate · Mgmt","—","Active"],["IT-CORP","Corporate · IT","—","Active"]].map(r => (
                  <tr key={r[0]}><td className="mono-sm"><b>{r[0]}</b></td><td>{r[1]}</td><td className="mono-sm">{r[2]}</td><td><span className="humi-tag humi-tag--mint">{r[3]}</span></td></tr>
                ))}
              </tbody>
            </>
          )}
          {tab === "plans" && (
            <>
              <thead><tr><th>Template</th><th>Domain</th><th>Carrier</th><th className="num">Cap</th><th>Tier</th></tr></thead>
              <tbody>
                {[["Health OPD/IPD","Health","AIA","฿12,000/yr","B"],["Dental","Health","AIA","฿8,000/yr","B"],["Optical","Health","AIA","฿4,000/2yr","B"],["Wellness","Lifestyle","Humi","฿6,000/yr","All"],["Provident fund 5%","Retirement","K-Asset","Salary × 5%","All FT"]].map(r => (
                  <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td className="num mono-sm">{r[3]}</td><td className="mono-sm">{r[4]}</td></tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

/* SPD · Regularization Queue */
function RegularizationQueue({ toast }) {
  const [items, setItems] = useState([
    { id: "REG-0421", who: "Mali T.",    iv: "MT", avBg: "#2F8A6B", date: "21 May", original: "06:12 in / 14:08 out", proposed: "06:00 in / 14:00 out", reason: "BTS delay · forgot to clock in early",          status: "Pending" },
    { id: "REG-0420", who: "Krit J.",    iv: "KJ", avBg: "#5A6A7E", date: "20 May", original: "Missing clock-in",      proposed: "16:00 in / 23:30 out", reason: "Phone died · manager attested",                  status: "Pending" },
    { id: "REG-0419", who: "Somsri P.",  iv: "SP", avBg: "#E08864", date: "19 May", original: "09:14 in / 18:20 out",  proposed: "09:00 in / 18:00 out", reason: "Clock terminal glitched at start of shift",       status: "Pending" },
    { id: "REG-0418", who: "Panji Dwi", iv: "PD", avBg: "#5B6CE0", date: "18 May", original: "13:08 in / 17:02 out",  proposed: "13:00 in / 17:00 out", reason: "Lift broken · arrived on time but couldn't clock", status: "Pending" },
    { id: "REG-0417", who: "Somchai K.", iv: "SK", avBg: "#1FA8A0", date: "17 May", original: "07:00 in / 16:00 out", proposed: "07:00 in / 16:00 out", reason: "—",                                                  status: "Approved" },
  ]);
  const action = (id, st) => setItems(is => is.map(i => i.id === id ? { ...i, status: st } : i));
  return (
    <div className="screen">
      <PageHeader
        eyebrow="D · SPD · REGULARIZATION · คิวตรวจเวลา"
        title="Timesheet corrections queue"
        sub={`${items.filter(i => i.status === "Pending").length} corrections awaiting verification.`}
        actions={<button className="primary-btn" onClick={() => { setItems(is => is.map(i => ({ ...i, status: "Approved" }))); toast({ kind: "success", msg: "All pending corrections approved" }); }}><I.check/> Approve all open</button>}
      />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>Employee</th><th>Date</th><th>Original</th><th>Proposed</th><th>Reason</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className={i.status === "Approved" ? "approval-row is-approved" : i.status === "Rejected" ? "approval-row is-rejected" : ""}>
                <td><b>{i.id}</b></td>
                <td><div className="inline-emp"><span className="inline-emp-av" style={{ background: i.avBg }}>{i.iv}</span><span>{i.who}</span></div></td>
                <td className="mono-sm">{i.date}</td>
                <td className="mono-sm">{i.original}</td>
                <td className="mono-sm"><b>{i.proposed}</b></td>
                <td>{i.reason}</td>
                <td><span className={"humi-tag " + statusToTag(i.status)}>{i.status}</span></td>
                <td>
                  {i.status === "Pending" ? (
                    <div className="approve-actions">
                      <button className="mini-btn approve" onClick={() => { action(i.id, "Approved"); toast({ kind: "success", msg: `${i.who}'s correction approved`, undo: () => action(i.id, "Pending") }); }}><I.check/> Approve</button>
                      <button className="mini-btn reject" onClick={() => { action(i.id, "Rejected"); toast({ kind: "warn", msg: `${i.who}'s correction rejected` }); }}><I.x/> Reject</button>
                    </div>
                  ) : (
                    <button className="mini-btn ghost" onClick={() => { action(i.id, "Pending"); toast({ msg: `${i.id} reopened` }); }}><I.undo/> Reopen</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* SPD · Document Review Queue */
function DocumentReviewQueue({ toast }) {
  const [items, setItems] = useState([
    { id: "DOC-0188", who: "Naree S.",    iv: "NS", avBg: "#E08864", doc: "Employment contract", flow: "Hire",   filed: "2 hr ago",  status: "Pending" },
    { id: "DOC-0187", who: "Mali T.",     iv: "MT", avBg: "#2F8A6B", doc: "Medical certificate", flow: "Sick leave", filed: "3 hr ago", status: "Pending" },
    { id: "DOC-0186", who: "Somsri P.",   iv: "SP", avBg: "#E08864", doc: "Receipt · ฿850 dental", flow: "Benefit claim", filed: "5 hr ago", status: "Pending" },
    { id: "DOC-0185", who: "Panji Dwi",   iv: "PD", avBg: "#5B6CE0", doc: "ID card update",      flow: "Profile", filed: "Yesterday", status: "Pending" },
    { id: "DOC-0184", who: "Krit J.",     iv: "KJ", avBg: "#5A6A7E", doc: "Pharmacy receipt · ฿350", flow: "Benefit claim", filed: "Yesterday", status: "Approved" },
    { id: "DOC-0183", who: "Achara P.",   iv: "AP", avBg: "#E08864", doc: "Resignation letter",  flow: "Offboard", filed: "2 days ago", status: "Approved" },
  ]);
  const action = (id, st) => setItems(is => is.map(i => i.id === id ? { ...i, status: st } : i));
  return (
    <div className="screen">
      <PageHeader
        eyebrow="D · SPD · DOCUMENT REVIEW · คิวตรวจเอกสาร"
        title="Documents pending verification"
        sub={`${items.filter(i => i.status === "Pending").length} docs need your sign-off before workflows continue.`}
      />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>Employee</th><th>Document</th><th>Workflow</th><th>Filed</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className={i.status === "Approved" ? "approval-row is-approved" : i.status === "Rejected" ? "approval-row is-rejected" : ""}>
                <td><b>{i.id}</b></td>
                <td><div className="inline-emp"><span className="inline-emp-av" style={{ background: i.avBg }}>{i.iv}</span><span>{i.who}</span></div></td>
                <td><b>{i.doc}</b></td>
                <td><span className="humi-tag">{i.flow}</span></td>
                <td className="mono-sm">{i.filed}</td>
                <td><span className={"humi-tag " + statusToTag(i.status)}>{i.status}</span></td>
                <td>
                  {i.status === "Pending" ? (
                    <div className="approve-actions">
                      <button className="mini-btn approve" onClick={() => { action(i.id, "Approved"); toast({ kind: "success", msg: `Verified · ${i.doc}` }); }}><I.check/> Verify</button>
                      <button className="mini-btn reject" onClick={() => { action(i.id, "Rejected"); toast({ kind: "warn", msg: `Returned to ${i.who}` }); }}><I.x/> Return</button>
                    </div>
                  ) : (
                    <button className="mini-btn ghost" onClick={() => { action(i.id, "Pending"); toast({ msg: `${i.id} reopened` }); }}><I.undo/> Reopen</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Settings drawer ─────────────────────────────────────────── */
function SettingsDrawer({ open, onClose, toast }) {
  const [theme, setTheme] = useState("cream");
  const [density, setDensity] = useState("comfortable");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifLine, setNotifLine] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [lang, setLang] = useState("en");
  if (!open) return null;
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer">
        <header className="drawer-head">
          <div className="drawer-eyebrow">SETTINGS</div>
          <div className="drawer-title">
            <div>
              <div className="emp-name" style={{ fontSize: 18 }}>Preferences</div>
              <div className="emp-meta">Personal · stored on this device</div>
            </div>
          </div>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>
        <div className="drawer-body">
          <div className="presets-label">Theme</div>
          <div className="variant-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {[["cream","Cream","#F6F1E8"],["dark","Dark","#0E1B2C"]].map(([k, l, c]) => (
              <button key={k} className={"variant-chip" + (theme === k ? " sel" : "")} onClick={() => { setTheme(k); toast({ msg: `Theme set to ${l}` }); }}>
                <span className="variant-sw" style={{ background: c, borderColor: c === "#0E1B2C" ? c : "var(--color-hairline)" }}/>{l}
              </button>
            ))}
          </div>

          <div className="presets-label" style={{ marginTop: 16 }}>Density</div>
          <div className="seg" style={{ width: "100%" }}>
            {[["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]].map(([k, l]) => (
              <button key={k} className={"seg-btn" + (density === k ? " is-active" : "")} onClick={() => setDensity(k)} style={{ flex: 1 }}>{l}</button>
            ))}
          </div>

          <div className="presets-label" style={{ marginTop: 16 }}>Language</div>
          <div className="seg" style={{ width: "100%" }}>
            {[["en","English"],["th","ไทย"],["both","Bilingual"]].map(([k, l]) => (
              <button key={k} className={"seg-btn" + (lang === k ? " is-active" : "")} onClick={() => setLang(k)} style={{ flex: 1 }}>{l}</button>
            ))}
          </div>

          <div className="presets-label" style={{ marginTop: 16 }}>Notifications</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="setting-toggle">
              <input type="checkbox" checked={notifEmail} onChange={e => setNotifEmail(e.target.checked)}/>
              <span><b>Email</b><small>panji.d@humi.shop</small></span>
            </label>
            <label className="setting-toggle">
              <input type="checkbox" checked={notifLine} onChange={e => setNotifLine(e.target.checked)}/>
              <span><b>LINE OA</b><small>@humi-hr · linked</small></span>
            </label>
            <label className="setting-toggle">
              <input type="checkbox" checked={notifPush} onChange={e => setNotifPush(e.target.checked)}/>
              <span><b>Browser push</b><small>Requires permission</small></span>
            </label>
          </div>

          <div className="presets-label" style={{ marginTop: 16 }}>Session</div>
          <div className="kv-grid" style={{ padding: 0, gridTemplateColumns: "1fr" }}>
            <KV k="Signed in"     v="Today · 08:42 from BKK"/>
            <KV k="Device"        v="MacBook Pro · Safari 17"/>
            <KV k="2FA"           v="Enrolled · Google Authenticator"/>
            <KV k="Last password" v="Rotated 84 days ago"/>
          </div>
        </div>
        <footer className="drawer-foot">
          <button className="ghost-btn danger" onClick={() => toast({ kind: "warn", msg: "Signed out · session ended" })}>Sign out</button>
          <div style={{ flex: 1 }}/>
          <button className="primary-btn" onClick={() => { onClose(); toast({ kind: "success", msg: "Settings saved" }); }}><I.check/> Save</button>
        </footer>
      </aside>
    </>
  );
}

/* ── Employee Detail Page (full screen, side-tab nav) ─────────── */
const EMPLOYEE_BENEFITS = {
  enrolled: [
    { id: "health",   plan: "Health · OPD/IPD",      carrier: "AIA",    tier: "B · FT",  effective: "1 Aug 2023", renews: "31 Dec 2026", cap: 12000, used: 4200, deps: "None",          unit: "year" },
    { id: "dental",   plan: "Dental",                 carrier: "AIA",    tier: "B · FT",  effective: "1 Aug 2023", renews: "31 Dec 2026", cap: 8000,  used: 1500, deps: "Spouse",         unit: "year" },
    { id: "optical",  plan: "Optical",                carrier: "AIA",    tier: "B · FT",  effective: "1 Aug 2023", renews: "31 Dec 2027", cap: 4000,  used: 0,    deps: "None",          unit: "2yr" },
    { id: "wellness", plan: "Wellness · gym",         carrier: "Humi",   tier: "All",     effective: "1 Jan 2025", renews: "31 Dec 2026", cap: 6000,  used: 2400, deps: "None",          unit: "year" },
  ],
  available: [
    { id: "life",      plan: "Life insurance · 12× salary", carrier: "FWD",     cap: 0,    tier: "All FT",   note: "ใช้คำนวณจากเงินเดือนปัจจุบัน" },
    { id: "ad-d",      plan: "Accidental D&D",              carrier: "FWD",     cap: 0,    tier: "All FT",   note: "เพิ่มเติม ฿200,000 cover" },
    { id: "child-edu", plan: "Child education subsidy",      carrier: "Humi",    cap: 25000,tier: "FT · มีลูก", note: "฿25,000/ปี ต่อบุตร 1 คน" },
  ],
  claims: [
    { id: "CLM-0421", date: "18 May 2026", plan: "Dental",   merchant: "Dental Clinic BKK", amount: 850,  status: "Pending"  },
    { id: "CLM-0418", date: "12 May 2026", plan: "Health",   merchant: "Bumrungrad OPD",    amount: 2400, status: "Approved" },
    { id: "CLM-0412", date: "1 May 2026",  plan: "Wellness", merchant: "Fitness First",     amount: 1800, status: "Approved" },
    { id: "CLM-0405", date: "10 Apr 2026", plan: "Health",   merchant: "Pharmacy Plus",     amount: 350,  status: "Approved" },
    { id: "CLM-0388", date: "22 Mar 2026", plan: "Dental",   merchant: "Smile Dental",      amount: 1200, status: "Approved" },
  ],
};

function EmployeeDetailPage({ name, onClose, toast, onNav }) {
  const [tab, setTab] = useState("benefits");
  const emp = EMPLOYEE_DETAILS[name];
  const [enrolled, setEnrolled] = useState(EMPLOYEE_BENEFITS.enrolled);
  const [available, setAvailable] = useState(EMPLOYEE_BENEFITS.available);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [confirmDrop, setConfirmDrop] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addingPlanId, setAddingPlanId] = useState(null);
  const [addEffective, setAddEffective] = useState("1 Jun 2026");
  const [pfRate, setPfRate] = useState(5);
  const [expandedClaim, setExpandedClaim] = useState(null);
  const [planDraft, setPlanDraft] = useState({});

  if (!emp) return null;

  const claimYtd = EMPLOYEE_BENEFITS.claims.filter(c => c.status === "Approved").reduce((s, c) => s + c.amount, 0);
  const monthlyPf = Math.round((emp.salary * pfRate) / 100);
  const projectionAt60 = Math.round(monthlyPf * 2 * 12 * 25 * 1.5);

  const tabs = [
    { id: "overview",  label: "Overview",    icon: I.user },
    { id: "profile",   label: "Profile",     icon: I.user },
    { id: "job",       label: "Job & Comp",  icon: I.payslip },
    { id: "benefits",  label: "Benefits",    icon: I.heart },
    { id: "time",      label: "Time & Leave", icon: I.clock },
    { id: "documents", label: "Documents",   icon: I.doc },
    { id: "performance", label: "Performance", icon: I.target },
    { id: "audit",     label: "Audit",       icon: I.approve },
  ];

  const startEdit = (planId) => {
    const p = enrolled.find(x => x.id === planId);
    setPlanDraft({ tier: p.tier, deps: p.deps, effective: p.effective });
    setExpandedPlan(planId);
  };
  const savePlanChanges = (planId) => {
    setEnrolled(es => es.map(e => e.id === planId ? { ...e, ...planDraft } : e));
    setExpandedPlan(null);
    toast({ kind: "success", msg: `Updated ${enrolled.find(e => e.id === planId).plan}`, undo: () => setEnrolled(EMPLOYEE_BENEFITS.enrolled) });
  };
  const dropPlan = (planId) => {
    const p = enrolled.find(e => e.id === planId);
    setEnrolled(es => es.filter(e => e.id !== planId));
    setAvailable(av => [...av, { id: p.id, plan: p.plan, carrier: p.carrier, cap: p.cap, tier: p.tier, note: "Previously enrolled" }]);
    setConfirmDrop(null);
    toast({ kind: "warn", msg: `Dropped ${p.plan}`, undo: () => { setEnrolled(EMPLOYEE_BENEFITS.enrolled); setAvailable(EMPLOYEE_BENEFITS.available); } });
  };
  const enrollPlan = (planId) => {
    const p = available.find(e => e.id === planId);
    setAvailable(av => av.filter(e => e.id !== planId));
    setEnrolled(es => [...es, { id: p.id, plan: p.plan, carrier: p.carrier, tier: emp.salary > 50000 ? "A · Mgmt" : "B · FT", effective: addEffective, renews: "31 Dec 2026", cap: p.cap || 12000, used: 0, deps: "None", unit: "year" }]);
    setAddingPlanId(null);
    setAddOpen(false);
    toast({ kind: "success", msg: `Enrolled in ${p.plan}`, detail: `Effective ${addEffective}` });
  };

  return (
    <div className="screen emp-page">
      {/* Breadcrumb back */}
      <button className="emp-back" onClick={onClose}>← Back to Directory</button>

      {/* Header */}
      <div className="emp-header">
        <span className="emp-header-av" style={{ background: emp.avBg }}>{emp.iv}</span>
        <div className="emp-header-body">
          <div className="emp-header-name">{name}</div>
          <div className="emp-header-meta">{emp.role} · <b>{emp.id}</b></div>
          <div className="emp-header-strip">
            <span className={"humi-tag " + (emp.status === "Active" ? "humi-tag--mint" : "humi-tag--amber")}>{emp.status}</span>
            <span>· {emp.tenure} · band {emp.band} · ฿{emp.salary.toLocaleString()}/mo</span>
          </div>
        </div>
        <div className="emp-header-actions">
          <button className="ghost-btn" onClick={() => toast({ msg: `Messaging ${name}` })}>Message</button>
          <button className="ghost-btn" onClick={() => toast({ msg: "Impersonation started" })}>Impersonate</button>
          <button className="primary-btn" onClick={() => toast({ msg: "Edit mode enabled" })}>Edit</button>
        </div>
      </div>

      {/* Tab + content split */}
      <div className="emp-split">
        <nav className="emp-tabs">
          {tabs.map(t => (
            <button key={t.id} className={"emp-tab" + (tab === t.id ? " is-active" : "")} onClick={() => setTab(t.id)}>
              <t.icon/>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="emp-content">
          {tab === "benefits" && (
            <div className="emp-benefits">
              {/* Summary strip */}
              <div className="benefit-summary-strip">
                <div><div className="benefit-summary-lbl">Tier</div><div className="benefit-summary-val">B · FT</div></div>
                <div><div className="benefit-summary-lbl">Active plans</div><div className="benefit-summary-val">{enrolled.length}</div></div>
                <div><div className="benefit-summary-lbl">Claims YTD</div><div className="benefit-summary-val">฿{claimYtd.toLocaleString()}</div></div>
                <div><div className="benefit-summary-lbl">PF rate</div><div className="benefit-summary-val">{pfRate}%</div></div>
              </div>

              {/* Enrolled plans */}
              <section className="emp-bsec">
                <div className="emp-bsec-head">
                  <div>
                    <div className="screen-eyebrow">ENROLLED</div>
                    <h3 className="emp-bsec-title">Active plans · {enrolled.length}</h3>
                  </div>
                  <button className={"ghost-btn" + (addOpen ? " is-active" : "")} onClick={() => setAddOpen(o => !o)}>
                    <I.plus/> {addOpen ? "Cancel add" : "Add plan"}
                  </button>
                </div>

                {/* Inline add (not modal) */}
                {addOpen && (
                  <div className="add-plan-inline">
                    <div className="presets-label">Available plans · click to enroll</div>
                    <div className="add-plan-grid">
                      {available.length === 0 && <div style={{ padding: 16, color: "var(--color-ink-faint)" }}>No additional plans available for this employee tier.</div>}
                      {available.map(p => (
                        <button key={p.id} className={"add-plan-chip" + (addingPlanId === p.id ? " is-selected" : "")} onClick={() => setAddingPlanId(p.id)}>
                          <div className="add-plan-name">{p.plan}</div>
                          <div className="add-plan-meta">{p.carrier} · {p.tier}</div>
                          <div className="add-plan-note">{p.note}</div>
                        </button>
                      ))}
                    </div>
                    {addingPlanId && (
                      <div className="add-plan-confirm">
                        <HireField label="Effective date" value={addEffective} onChange={setAddEffective}/>
                        <div style={{ flex: 1 }}/>
                        <button className="ghost-btn" onClick={() => setAddingPlanId(null)}>Cancel</button>
                        <button className="primary-btn" onClick={() => enrollPlan(addingPlanId)}><I.check/> Enroll {available.find(a => a.id === addingPlanId).plan}</button>
                      </div>
                    )}
                  </div>
                )}

                {/* Plan rows */}
                <div className="plan-list">
                  {enrolled.map(p => {
                    const open = expandedPlan === p.id;
                    const dropping = confirmDrop === p.id;
                    return (
                      <div key={p.id} className={"plan-row" + (open ? " is-open" : "")}>
                        <button className="plan-row-summary" onClick={() => open ? setExpandedPlan(null) : startEdit(p.id)}>
                          <div className="plan-row-main">
                            <div className="plan-row-name">{p.plan} <span className="plan-row-carrier">· {p.carrier}</span></div>
                            <div className="plan-row-meta">Tier {p.tier} · deps: {p.deps} · effective {p.effective}</div>
                          </div>
                          {p.cap > 0 && (
                            <div className="plan-row-usage">
                              <div className="benefit-bar"><span style={{ width: ((p.used / p.cap) * 100) + "%", background: p.used / p.cap > 0.75 ? "var(--imp-bg)" : "var(--color-accent)" }}/></div>
                              <div className="plan-row-usage-text">฿{p.used.toLocaleString()} / ฿{p.cap.toLocaleString()}</div>
                            </div>
                          )}
                          <span className={"plan-row-chev" + (open ? " is-open" : "")}><I.caretDn/></span>
                        </button>

                        {open && !dropping && (
                          <div className="plan-row-editor">
                            <div className="hire-grid">
                              <HireSelect label="Tier" value={planDraft.tier} onChange={x => setPlanDraft(d => ({ ...d, tier: x }))} options={["A · Mgmt","B · FT","C · PT","D · Intern"]}/>
                              <HireSelect label="Dependents covered" value={planDraft.deps} onChange={x => setPlanDraft(d => ({ ...d, deps: x }))} options={["None","Spouse","Spouse + 1 child","Spouse + 2 children","Family (all)"]}/>
                              <HireField label="Effective date" value={planDraft.effective} onChange={x => setPlanDraft(d => ({ ...d, effective: x }))}/>
                            </div>
                            <div className="plan-row-actions">
                              <button className="ghost-btn danger" onClick={() => setConfirmDrop(p.id)}><I.trash/> Drop plan</button>
                              <div style={{ flex: 1 }}/>
                              <button className="ghost-btn" onClick={() => setExpandedPlan(null)}>Cancel</button>
                              <button className="primary-btn" onClick={() => savePlanChanges(p.id)}><I.check/> Save changes</button>
                            </div>
                          </div>
                        )}

                        {dropping && (
                          <div className="plan-row-confirm">
                            <I.warn style={{ display: "none" }}/>
                            <div className="plan-row-confirm-text">
                              <b>Drop {p.plan}?</b>
                              <small>Active coverage ends 30 days after effective date. Used balance cannot be claimed back.</small>
                            </div>
                            <button className="ghost-btn" onClick={() => setConfirmDrop(null)}>Keep plan</button>
                            <button className="mini-btn reject" onClick={() => dropPlan(p.id)}><I.trash/> Confirm drop</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Provident fund */}
              <section className="emp-bsec">
                <div className="emp-bsec-head">
                  <div>
                    <div className="screen-eyebrow">PROVIDENT FUND</div>
                    <h3 className="emp-bsec-title">Contribution rate</h3>
                  </div>
                </div>
                <div className="pf-editor">
                  <div className="pf-rate-seg">
                    {[5, 7, 10, 15].map(r => (
                      <button key={r} className={"pf-rate-btn" + (pfRate === r ? " is-active" : "")} onClick={() => { setPfRate(r); toast({ msg: `PF rate set to ${r}%` }); }}>{r}%</button>
                    ))}
                  </div>
                  <div className="pf-stats">
                    <div><div className="pf-stat-lbl">Employee · monthly</div><div className="pf-stat-val">฿{monthlyPf.toLocaleString()}</div></div>
                    <div><div className="pf-stat-lbl">Employer match (5%)</div><div className="pf-stat-val">฿{Math.round((emp.salary * 5) / 100).toLocaleString()}</div></div>
                    <div><div className="pf-stat-lbl">Projected at age 60</div><div className="pf-stat-val pf-stat-val-big">฿{(projectionAt60 / 1000000).toFixed(1)}M</div><div className="pf-stat-sub">assuming 5% growth · 25y to retirement</div></div>
                  </div>
                </div>
              </section>

              {/* Claim history */}
              <section className="emp-bsec">
                <div className="emp-bsec-head">
                  <div>
                    <div className="screen-eyebrow">CLAIM HISTORY</div>
                    <h3 className="emp-bsec-title">{EMPLOYEE_BENEFITS.claims.length} claims · ฿{EMPLOYEE_BENEFITS.claims.reduce((s, c) => s + c.amount, 0).toLocaleString()} total</h3>
                  </div>
                  <button className="ghost-btn" onClick={() => toast({ kind: "success", msg: "Claims exported" })}><I.download/> Export</button>
                </div>
                <table className="data-table">
                  <thead><tr><th>Ref</th><th>Date</th><th>Plan</th><th>Merchant</th><th className="num">Amount</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {EMPLOYEE_BENEFITS.claims.map(c => (
                      <React.Fragment key={c.id}>
                        <tr onClick={() => setExpandedClaim(expandedClaim === c.id ? null : c.id)} style={{ cursor: "pointer" }}>
                          <td><b>{c.id}</b></td>
                          <td className="mono-sm">{c.date}</td>
                          <td>{c.plan}</td>
                          <td>{c.merchant}</td>
                          <td className="num"><b>฿{c.amount.toLocaleString()}</b></td>
                          <td><span className={"humi-tag " + statusToTag(c.status)}>{c.status}</span></td>
                          <td><span className={"plan-row-chev" + (expandedClaim === c.id ? " is-open" : "")}><I.caretDn/></span></td>
                        </tr>
                        {expandedClaim === c.id && (
                          <tr><td colSpan={7} style={{ background: "var(--color-canvas-soft)", padding: 0 }}>
                            <div className="claim-drill">
                              <div className="receipt-preview" style={{ maxWidth: 280 }}>
                                <div className="receipt-preview-header">
                                  <span className="receipt-preview-merchant">{c.merchant}</span>
                                  <span className="receipt-preview-date">{c.date}</span>
                                </div>
                                <div className="receipt-preview-lines">
                                  <div><span>{c.plan} service</span><b>฿{c.amount.toLocaleString()}</b></div>
                                  <div className="receipt-preview-divider"/>
                                  <div className="receipt-preview-total"><span>TOTAL</span><b>฿{c.amount.toLocaleString()}</b></div>
                                </div>
                              </div>
                              <div style={{ flex: 1 }}>
                                <KV k="Routing" v={c.amount <= 2000 ? "Manager only · 1d SLA" : "Manager + HR · 2d SLA"}/>
                                <KV k="Filed by" v={name}/>
                                <KV k="Cap impact" v={`Used ฿${c.amount.toLocaleString()} of ฿${(enrolled.find(e => e.plan.startsWith(c.plan))?.cap || 12000).toLocaleString()}`}/>
                              </div>
                              {c.status === "Pending" && (
                                <div className="approve-actions">
                                  <button className="mini-btn approve" onClick={(e) => { e.stopPropagation(); toast({ kind: "success", msg: `Claim ${c.id} approved` }); }}><I.check/> Approve</button>
                                  <button className="mini-btn reject" onClick={(e) => { e.stopPropagation(); toast({ kind: "warn", msg: `Claim ${c.id} rejected` }); }}><I.x/> Reject</button>
                                </div>
                              )}
                            </div>
                          </td></tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          )}

          {tab === "overview" && (
            <div className="emp-overview">
              <div className="stat-row">
                <StatCard eyebrow="Hours YTD"     value="824h"           sub="22 weeks · 38.4h avg"/>
                <StatCard eyebrow="Leave balance" value="14 / 18 d"      sub="Annual · 4 used"/>
                <StatCard eyebrow="OT YTD"        value="46.5h · ฿5,375" sub="vs 60h cap"/>
                <StatCard eyebrow="Claims YTD"    value={`฿${claimYtd.toLocaleString()}`} sub="4 claims · all approved"/>
              </div>
              <div className="screen-grid">
                <div className="card">
                  <div className="card-head"><div className="card-eyebrow">ACTIVITY</div><div className="card-title">Recent 10 events</div></div>
                  <div className="card-list">
                    {[
                      ["Today 14:24", "Clocked in",            "Self-service mobile"],
                      ["Today 09:02", "Clocked in",            "Time terminal · BKK-03"],
                      ["18 May",      "Filed claim · ฿850",    "Dental · awaiting approval"],
                      ["15 May",      "Performance check-in",  "With Anan S. · score 4.2"],
                      ["12 May",      "Filed claim · ฿2,400",  "Health · approved"],
                      ["1 May",       "Salary increase",       `+5% to ฿${emp.salary.toLocaleString()}`],
                    ].map((a, i) => (
                      <div key={i} className="card-row">
                        <span className="card-row-time" style={{ minWidth: 90 }}>{a[0]}</span>
                        <div className="card-row-body"><div className="card-row-title">{a[1]}</div><div className="card-row-sub">{a[2]}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="card">
                    <div className="card-head"><div className="card-eyebrow">QUICK ACTIONS</div><div className="card-title">Admin tools</div></div>
                    <div className="quick-grid">
                      <button className="quick-tile" onClick={() => setTab("job")}><div className="quick-ico" style={{ background: "var(--color-accent-soft)", color: "#06241F" }}>S</div>Adjust salary</button>
                      <button className="quick-tile" onClick={() => setTab("benefits")}><div className="quick-ico" style={{ background: "var(--color-accent-alt-soft)", color: "#2d3a9c" }}>B</div>Manage benefits</button>
                      <button className="quick-tile" onClick={() => setTab("documents")}><div className="quick-ico" style={{ background: "#FEF3C7", color: "#6B4E14" }}>D</div>Generate letter</button>
                      <button className="quick-tile" onClick={() => onNav("offboard")}><div className="quick-ico" style={{ background: "#FCE0DD", color: "#8b2b25" }}>O</div>Start offboarding</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-head"><div className="card-eyebrow">ALERTS</div><div className="card-title">Needs attention</div></div>
                    <div className="card-list">
                      <div className="card-row"><span className="humi-tag humi-tag--amber">Soon</span><div className="card-row-body"><div className="card-row-title">Visa renewal due in 60 days</div><div className="card-row-sub">Expires 22 Jul 2026</div></div></div>
                      <div className="card-row"><span className="humi-tag humi-tag--coral">Action</span><div className="card-row-body"><div className="card-row-title">1 pending claim</div><div className="card-row-sub">Dental · ฿850 · 5 days old</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab !== "benefits" && tab !== "overview" && (
            <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--color-ink-muted)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>{tabs.find(t => t.id === tab)?.label}</h3>
              <p style={{ fontSize: 13.5 }}>Phase {tab === "profile" || tab === "job" ? "C" : "D"} · ใช้ EmployeeHub drawer ชั่วคราว — กำลังพัฒนา full-page version</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Employee Hub (clickable from many places) ──────────── */
const EMPLOYEE_DETAILS = {
  "Somchai K.":  { id: "EMP-00204", iv: "SK", avBg: "#1FA8A0", role: "Shift Lead · FOH", dept: "Front-of-House", location: "Central · Bangkok 03", manager: "Anan S.", hired: "1 Aug 2023", tenure: "2y 9m", status: "Active",    salary: 38500, band: "C2", phone: "+66 81 234 5678", email: "somchai.k@humi.shop" },
  "Somsri P.":   { id: "EMP-00212", iv: "SP", avBg: "#E08864", role: "Cashier",          dept: "Front-of-House", location: "Central · Bangkok 03", manager: "Somchai K.", hired: "1 Jan 2024", tenure: "1y 4m", status: "Active",    salary: 22500, band: "C1", phone: "+66 81 234 1212", email: "somsri.p@humi.shop" },
  "Panji Dwi":   { id: "EMP-04821", iv: "PD", avBg: "#5B6CE0", role: "PT Floor",         dept: "Front-of-House", location: "Central · Bangkok 03", manager: "Somchai K.", hired: "15 Mar 2026", tenure: "2m",   status: "Probation", salary: 18000, band: "C1", phone: "+66 82 100 4421", email: "panji.d@humi.shop" },
  "Anan S.":     { id: "EMP-00014", iv: "AS", avBg: "#9333EA", role: "HR Admin · MOD",   dept: "Management",     location: "Central · Bangkok 03", manager: "Pim L.",     hired: "10 Jul 2021", tenure: "4y 10m", status: "Active",    salary: 58000, band: "C4", phone: "+66 81 919 2003", email: "anan.s@humi.shop" },
  "Mali T.":     { id: "EMP-00198", iv: "MT", avBg: "#2F8A6B", role: "Barista",          dept: "Front-of-House", location: "Central · Bangkok 03", manager: "Somchai K.", hired: "12 Oct 2023", tenure: "2y 7m", status: "Active",    salary: 24500, band: "C2", phone: "+66 81 778 4422", email: "mali.t@humi.shop" },
  "Krit J.":     { id: "EMP-00177", iv: "KJ", avBg: "#5A6A7E", role: "Stock",            dept: "Back-of-House",  location: "Central · Bangkok 03", manager: "Somchai K.", hired: "15 Feb 2024", tenure: "1y 3m", status: "Active",    salary: 23000, band: "C2", phone: "+66 81 991 0033", email: "krit.j@humi.shop" },
  "Pim L.":      { id: "EMP-00001", iv: "PL", avBg: "#243447", role: "Sys Admin · COO",  dept: "IT",             location: "Central · Bangkok 03", manager: "Krit Wattanachai", hired: "1 Mar 2019", tenure: "7y 2m", status: "Active", salary: 95000, band: "C5", phone: "+66 81 100 0001", email: "pim.l@humi.shop" },
};

function EmployeeHub({ name, onClose, toast, onNav }) {
  const [tab, setTab] = useState("profile");
  const emp = EMPLOYEE_DETAILS[name];
  if (!emp) return null;

  const tabs = [
    { id: "profile",    label: "Profile",    sub: "Personal + contact" },
    { id: "job",        label: "Job history", sub: "Roles + transfers" },
    { id: "comp",       label: "Compensation", sub: "Salary + history" },
    { id: "benefits",   label: "Benefits",   sub: "Enrollment + claims" },
    { id: "time",       label: "Time",       sub: "Attendance + leaves" },
    { id: "documents",  label: "Documents",  sub: "Contracts + files" },
    { id: "performance",label: "Performance", sub: "Goals + reviews" },
    { id: "notes",      label: "Notes",      sub: "Private HR notes" },
    { id: "audit",      label: "Audit",      sub: "Activity log" },
  ];

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer drawer-x-wide">
        <header className="drawer-head">
          <div className="drawer-eyebrow">EMPLOYEE · {emp.id}</div>
          <div className="drawer-title">
            <span className="emp-av drawer-av" style={{ background: emp.avBg, width: 48, height: 48, fontSize: 16 }}>{emp.iv}</span>
            <div>
              <div className="emp-name" style={{ fontSize: 20 }}>{emp.name || name}</div>
              <div className="emp-meta">{emp.role} · {emp.dept}</div>
            </div>
            <span className={"humi-tag " + (emp.status === "Active" ? "humi-tag--mint" : "humi-tag--amber")} style={{ marginLeft: 10 }}>{emp.status}</span>
          </div>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>

        <div className="hub-tabs">
          {tabs.map(t => (
            <button key={t.id} className={"hub-tab" + (tab === t.id ? " is-active" : "")} onClick={() => setTab(t.id)}>
              <div className="hub-tab-label">{t.label}</div>
              <div className="hub-tab-sub">{t.sub}</div>
            </button>
          ))}
        </div>

        <div className="drawer-body">
          {tab === "profile" && (
            <div className="kv-grid" style={{ padding: 0, gridTemplateColumns: "1fr 1fr" }}>
              <KV k="Employee ID"   v={emp.id}/>
              <KV k="Full name"     v={name}/>
              <KV k="Position"      v={emp.role}/>
              <KV k="Department"    v={emp.dept}/>
              <KV k="Location"      v={emp.location}/>
              <KV k="Manager"       v={emp.manager}/>
              <KV k="Hire date"     v={emp.hired}/>
              <KV k="Tenure"        v={emp.tenure}/>
              <KV k="Email"         v={emp.email}/>
              <KV k="Phone"         v={emp.phone}/>
              <KV k="National ID"   v="1-1014-•••••-37-2"/>
              <KV k="Date of birth" v="14 Mar 1992"/>
            </div>
          )}

          {tab === "job" && (
            <div className="hub-timeline">
              {[
                { d: emp.hired,    icon: "▲", title: "Hired · " + emp.role, sub: `Manager: ${emp.manager} · ${emp.location}` },
                { d: "1 Jan 2024", icon: "+", title: "Salary review · +8%",  sub: `฿${(emp.salary * 0.92).toLocaleString()} → ฿${emp.salary.toLocaleString()}` },
                { d: "1 Aug 2024", icon: "↗", title: "Promoted",             sub: `New band ${emp.band}` },
                { d: "1 Jan 2025", icon: "+", title: "Annual review · +5%",  sub: "Met all goals" },
                { d: "Now",        icon: "●", title: "Current",              sub: `${emp.role} · ${emp.band}` },
              ].map((e, i) => (
                <div key={i} className="hub-timeline-item">
                  <span className="hub-timeline-dot">{e.icon}</span>
                  <div className="hub-timeline-body">
                    <div className="hub-timeline-date">{e.d}</div>
                    <div className="hub-timeline-title">{e.title}</div>
                    <div className="hub-timeline-sub">{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "comp" && (
            <>
              <div className="stat-row">
                <StatCard eyebrow="Current salary" value={`฿${emp.salary.toLocaleString()}`} sub={`Band ${emp.band} · monthly`}/>
                <StatCard eyebrow="Last review"   value="+5%" sub="1 Jan 2026"/>
                <StatCard eyebrow="Next review"   value="1 Jan 2027" sub="In 7 months"/>
                <StatCard eyebrow="YTD earnings"  value={`฿${(emp.salary * 5).toLocaleString()}`} sub="5 months"/>
              </div>
              <table className="data-table" style={{ marginTop: 16 }}>
                <thead><tr><th>Effective</th><th>Change</th><th className="num">Base</th><th>Reason</th></tr></thead>
                <tbody>
                  <tr><td className="mono-sm">1 Jan 2026</td><td><span className="humi-tag humi-tag--mint">+5%</span></td><td className="num"><b>฿{emp.salary.toLocaleString()}</b></td><td>Annual review · met goals</td></tr>
                  <tr><td className="mono-sm">1 Aug 2024</td><td><span className="humi-tag humi-tag--mint">+12%</span></td><td className="num">฿{Math.round(emp.salary * 0.952).toLocaleString()}</td><td>Promotion to {emp.band}</td></tr>
                  <tr><td className="mono-sm">1 Jan 2024</td><td><span className="humi-tag humi-tag--mint">+8%</span></td><td className="num">฿{Math.round(emp.salary * 0.85).toLocaleString()}</td><td>Annual review · exceeded</td></tr>
                  <tr><td className="mono-sm">{emp.hired}</td><td><span className="humi-tag">Initial</span></td><td className="num">฿{Math.round(emp.salary * 0.78).toLocaleString()}</td><td>Hired at band C1</td></tr>
                </tbody>
              </table>
            </>
          )}

          {tab === "benefits" && (
            <>
              <div className="presets-label">Enrolled plans</div>
              <div className="hub-plan-list">
                {[
                  { plan: "Health · OPD/IPD",   cap: 12000, used: 4200, status: "Active" },
                  { plan: "Dental",             cap: 8000,  used: 1500, status: "Active" },
                  { plan: "Optical",            cap: 4000,  used: 0,    status: "Active" },
                  { plan: "Wellness · gym",     cap: 6000,  used: 2400, status: "Active" },
                  { plan: "Provident fund · 5%", cap: 0,    used: 0,    status: "Active", note: `฿${Math.round(emp.salary * 0.05).toLocaleString()}/mo` },
                ].map((p, i) => (
                  <div key={i} className="hub-plan">
                    <div className="hub-plan-name">{p.plan}</div>
                    {p.cap > 0 ? (
                      <>
                        <div className="benefit-bar"><span style={{ width: ((p.used / p.cap) * 100) + "%" }}/></div>
                        <div className="hub-plan-cap">฿{(p.cap - p.used).toLocaleString()}<small> of ฿{p.cap.toLocaleString()} left</small></div>
                      </>
                    ) : (
                      <div className="hub-plan-cap">{p.note}</div>
                    )}
                    <span className="humi-tag humi-tag--mint" style={{ marginLeft: "auto", alignSelf: "center" }}>{p.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "time" && (
            <>
              <div className="stat-row">
                <StatCard eyebrow="This week"   value="38.4h" sub="vs 40h scheduled"/>
                <StatCard eyebrow="YTD hours"   value="824h"  sub="22 weeks worked"/>
                <StatCard eyebrow="OT this month" value="14h" sub="฿1,575 earned"/>
                <StatCard eyebrow="Leave balance" value="14d"  sub="Annual remaining"/>
              </div>
              <div className="presets-label" style={{ marginTop: 16 }}>Recent activity</div>
              <table className="data-table" style={{ marginTop: 6 }}>
                <thead><tr><th>Date</th><th>In</th><th>Out</th><th className="num">Hours</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>Today</td><td className="mono-sm">09:02</td><td className="mono-sm">In progress</td><td className="num">5:22</td><td><span className="humi-tag humi-tag--mint">On shift</span></td></tr>
                  <tr><td>22 May</td><td className="mono-sm">07:00</td><td className="mono-sm">16:05</td><td className="num">9:05</td><td><span className="humi-tag humi-tag--mint">Complete</span></td></tr>
                  <tr><td>21 May</td><td className="mono-sm">07:08</td><td className="mono-sm">16:12</td><td className="num">9:04</td><td><span className="humi-tag humi-tag--amber">Late 8m</span></td></tr>
                  <tr><td>20 May</td><td className="mono-sm">06:58</td><td className="mono-sm">16:02</td><td className="num">9:04</td><td><span className="humi-tag humi-tag--mint">Complete</span></td></tr>
                  <tr><td>19 May</td><td colSpan={2} className="mono-sm" style={{ textAlign: "center" }}>Annual leave</td><td className="num">—</td><td><span className="humi-tag">Leave</span></td></tr>
                </tbody>
              </table>
            </>
          )}

          {tab === "documents" && (
            <div className="hub-docs">
              {[
                ["Employment contract", "PDF · 1.2 MB", "Signed " + emp.hired],
                ["NDA",                 "PDF · 412 KB", "Signed " + emp.hired],
                ["Code of conduct",     "PDF · 380 KB", "Acknowledged 14 Jan 2026"],
                ["ID copy",             "PDF · 220 KB", "Uploaded " + emp.hired],
                ["Bank statement",      "PDF · 180 KB", "Uploaded " + emp.hired],
                ["Promotion letter · " + emp.band, "PDF · 240 KB", "Issued 1 Aug 2024"],
                ["Tax form ภ.ง.ด.91 · 2025", "PDF · 320 KB", "Filed 28 Feb 2026"],
              ].map((d, i) => (
                <button key={i} className="hub-doc" onClick={() => toast({ kind: "success", msg: "Downloading " + d[0] })}>
                  <span className="hub-doc-icon"><I.doc/></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="hub-doc-title">{d[0]}</div>
                    <div className="hub-doc-sub">{d[1]} · {d[2]}</div>
                  </div>
                  <I.download/>
                </button>
              ))}
            </div>
          )}

          {tab === "performance" && (
            <>
              <div className="stat-row">
                <StatCard eyebrow="Last score"   value="4.2" sub="of 5.0 · 1 Jan 2026"/>
                <StatCard eyebrow="Goals · Q2"   value="3/4" sub="75% complete"/>
                <StatCard eyebrow="1:1 cadence" value="Weekly" sub="Last: 18 May"/>
                <StatCard eyebrow="Tenure rank" value="Top 30%" sub="among FOH"/>
              </div>
              <div className="presets-label" style={{ marginTop: 16 }}>Q2 2026 goals</div>
              <div className="hub-goals">
                {[
                  { g: "Reduce shift turnover by 15%",       p: 80,  status: "On track" },
                  { g: "Cross-train 2 staff on POS",         p: 100, status: "Complete" },
                  { g: "Customer NPS ≥ 75",                  p: 95,  status: "On track" },
                  { g: "Mentor 1 new hire through probation", p: 30, status: "Behind" },
                ].map((g, i) => (
                  <div key={i} className="hub-goal">
                    <div className="hub-goal-row">
                      <div className="hub-goal-text">{g.g}</div>
                      <span className={"humi-tag " + (g.status === "Complete" ? "humi-tag--mint" : g.status === "Behind" ? "humi-tag--coral" : "humi-tag--amber")}>{g.status}</span>
                    </div>
                    <div className="benefit-bar"><span style={{ width: g.p + "%", background: g.status === "Behind" ? "var(--imp-bg)" : "var(--color-accent)" }}/></div>
                    <div className="hub-goal-pct mono-sm">{g.p}%</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "notes" && (
            <>
              <div className="form-callout" style={{ background: "#FEF3C7", borderColor: "#EBD58A", color: "#6B4E14" }}>
                <div className="form-callout-eyebrow" style={{ color: "#6B4E14" }}>HR Private</div>
                <div>Visible only to HR Admin and System Admin. Not visible to manager or the employee.</div>
              </div>
              <div className="hub-notes">
                {[
                  { who: "Anan S.", d: "18 May 2026", t: "Mentioned wanting to move into a Shift Lead role next year. Discussed development plan in 1:1." },
                  { who: "Anan S.", d: "2 Apr 2026",  t: "Performance concern resolved — adjusted commute schedule resolved late clock-ins." },
                  { who: "Pim L.",  d: "15 Jan 2026", t: "Reset password after lost phone incident. Re-enrolled in 2FA." },
                ].map((n, i) => (
                  <div key={i} className="hub-note">
                    <div className="hub-note-head">
                      <b>{n.who}</b>
                      <span className="mono-sm">{n.d}</span>
                    </div>
                    <div>{n.t}</div>
                  </div>
                ))}
                <textarea className="textarea" placeholder="Add a private note…" style={{ marginTop: 8 }}/>
              </div>
            </>
          )}

          {tab === "audit" && (
            <div className="hub-audit">
              {[
                ["Today 14:24", "Clocked in",          "Self-service via mobile"],
                ["Today 09:02", "Clocked in",          "Time terminal · Bangkok 03"],
                ["Yesterday",   "Approved by manager", "REQ-2026-0188 · equipment"],
                ["20 May",      "Profile updated",     "Phone changed by Anan S."],
                ["19 May",      "Took leave",          "Annual · 1 day"],
                ["15 May",      "Performance check-in","With Anan S. · score 4.2"],
                ["10 May",      "Logged in",           "Web · IP 10.2.4.92"],
                ["1 May",       "Salary increase",     "+5% to ฿" + emp.salary.toLocaleString()],
              ].map((a, i) => (
                <div key={i} className="hub-audit-item">
                  <span className="mono-sm" style={{ minWidth: 92 }}>{a[0]}</span>
                  <b>{a[1]}</b>
                  <span style={{ color: "var(--color-ink-muted)", flex: 1 }}>{a[2]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="drawer-foot">
          <button className="ghost-btn" onClick={() => { onClose(); toast({ msg: `Messaging ${name}` }); }}>Message</button>
          <div style={{ flex: 1 }}/>
          <button className="ghost-btn" onClick={onClose}>Close</button>
          <button className="primary-btn" onClick={() => { onClose(); onNav("hire"); toast({ msg: "Open Hire to edit employment terms" }); }}><I.check/> Edit employment</button>
        </footer>
      </aside>
    </>
  );
}

/* ── Command Palette (⌘K) ─────────────────────────────────────── */
function CommandPalette({ open, onClose, onNav, openShiftEditor, setPersonaId, toast }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = React.useRef();

  useEffect(() => {
    if (open) {
      setQ(""); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const allItems = useMemo(() => {
    const navItems = MODULES.flatMap(m => m.leaves.map(l => ({
      kind: "Navigate",
      label: l.label,
      sub: m.label,
      ico: m.ico,
      action: () => onNav(l.id),
    })));
    const personaItems = Object.values(PERSONAS).map(p => ({
      kind: "Switch persona",
      label: p.name,
      sub: p.role,
      ico: I.team,
      action: () => { setPersonaId(p.id); toast({ msg: `Now viewing as ${p.name}` }); },
    }));
    const actionItems = [
      { kind: "Action", label: "Clock in/out",         sub: "Time tracking",      ico: I.calendar, action: () => { onNav("time"); toast({ msg: "Time & Attendance opened" }); } },
      { kind: "Action", label: "Request leave",        sub: "New leave request",  ico: I.plus,    action: () => { onNav("leaves"); toast({ msg: "Open Leaves to file new request" }); } },
      { kind: "Action", label: "File a claim",         sub: "Benefits",           ico: I.plus,    action: () => { onNav("benefits"); toast({ msg: "Open Benefits to file new claim" }); } },
      { kind: "Action", label: "Hire someone",         sub: "New hire wizard",    ico: I.plus,    action: () => onNav("hire") },
      { kind: "Action", label: "Run payroll",          sub: "Start a payroll cycle", ico: I.plus, action: () => onNav("comp") },
      { kind: "Action", label: "Open shift editor",    sub: "Edit Somchai K.'s shift", ico: I.calendar, action: () => { onNav("roster"); setTimeout(() => openShiftEditor("e1"), 100); } },
      { kind: "Action", label: "Export roster CSV",    sub: "Today's roster",     ico: I.download, action: () => toast({ kind: "success", msg: "Exporting roster.csv" }) },
    ];
    return [...actionItems, ...navItems, ...personaItems];
  }, [onNav, setPersonaId, toast, openShiftEditor]);

  const filtered = q
    ? allItems.filter(it => (it.label + " " + it.sub + " " + it.kind).toLowerCase().includes(q.toLowerCase())).slice(0, 12)
    : allItems.slice(0, 8);

  useEffect(() => { if (sel >= filtered.length) setSel(0); }, [filtered.length, sel]);

  const exec = (it) => { it.action(); onClose(); };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
    else if (e.key === "Enter")     { e.preventDefault(); if (filtered[sel]) exec(filtered[sel]); }
    else if (e.key === "Escape")    { e.preventDefault(); onClose(); }
  };

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette" onClick={e => e.stopPropagation()}>
        <div className="palette-input-wrap">
          <I.search/>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command, page, or person…"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="palette-results">
          {filtered.length === 0 && (
            <div className="palette-empty">No matches for "{q}"</div>
          )}
          {filtered.map((it, i) => (
            <button
              key={i}
              className={"palette-item" + (i === sel ? " is-selected" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => exec(it)}
            >
              <span className="palette-kind">{it.kind}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="palette-label">{it.label}</div>
                <div className="palette-sub">{it.sub}</div>
              </div>
              <span className="palette-enter">↵</span>
            </button>
          ))}
        </div>
        <div className="palette-foot">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

/* ── Asset Management ─────────────────────────────────────────── */
const ASSET_CATEGORIES = [
  { id: "uniform", label: "Uniform",   Ico: I.shirt,    count: 248, issued: 232, on_order: 16 },
  { id: "it",      label: "IT",        Ico: I.laptop,   count: 86,  issued: 78,  on_order: 4 },
  { id: "badge",   label: "Badge",     Ico: I.badgeId,  count: 248, issued: 248, on_order: 0 },
  { id: "key",     label: "Keys",      Ico: I.key,      count: 32,  issued: 28,  on_order: 0 },
  { id: "phone",   label: "Phone/SIM", Ico: I.phoneIco, count: 14,  issued: 12,  on_order: 0 },
];

const ASSETS_INITIAL = [
  { id: "ASSET-2104", cat: "IT",      item: "MacBook Air M2 · 13\"",  serial: "C02XL0NMQ6L4", assigned: "Anan S.",    iv: "AS", avBg: "#9333EA", issued: "12 Jan 2024", state: "Assigned" },
  { id: "ASSET-2103", cat: "IT",      item: "iPad Pro · POS terminal", serial: "DMPZX8K2Q3", assigned: "Somchai K.",  iv: "SK", avBg: "#1FA8A0", issued: "1 Aug 2023",  state: "Assigned" },
  { id: "ASSET-2102", cat: "IT",      item: "Bluetooth scanner",       serial: "BT-4421",    assigned: "Krit J.",     iv: "KJ", avBg: "#5A6A7E", issued: "15 Feb 2024", state: "Assigned" },
  { id: "ASSET-2098", cat: "IT",      item: "MacBook Pro M3 · 14\"",  serial: "C02ZP1NLQ8L7", assigned: "Pim L.",      iv: "PL", avBg: "#243447", issued: "10 Jan 2024", state: "Assigned" },
  { id: "ASSET-1844", cat: "Uniform", item: "FOH apron · M",          serial: "U-FOH-M-184", assigned: "Mali T.",     iv: "MT", avBg: "#2F8A6B", issued: "12 Oct 2023", state: "Assigned" },
  { id: "ASSET-1845", cat: "Uniform", item: "FOH shirt · L · ×3",     serial: "U-FOH-L-185", assigned: "Mali T.",     iv: "MT", avBg: "#2F8A6B", issued: "12 Oct 2023", state: "Assigned" },
  { id: "ASSET-1903", cat: "Badge",   item: "Access badge",           serial: "BDG-04821",   assigned: "Panji Dwi",   iv: "PD", avBg: "#5B6CE0", issued: "15 Mar 2026", state: "Assigned" },
  { id: "ASSET-1788", cat: "Keys",    item: "BOH stockroom · key #4", serial: "KEY-BOH-04",  assigned: "Krit J.",     iv: "KJ", avBg: "#5A6A7E", issued: "15 Feb 2024", state: "Assigned" },
  { id: "ASSET-2099", cat: "IT",      item: "MacBook Air M2 · 13\"",  serial: "C02XV9NMR2L8", assigned: null,         iv: "—",  avBg: "#5A6A7E", issued: "—",            state: "In stock" },
  { id: "ASSET-2100", cat: "IT",      item: "Bluetooth scanner",      serial: "BT-4422",    assigned: null,         iv: "—",  avBg: "#5A6A7E", issued: "—",            state: "In stock" },
  { id: "ASSET-1899", cat: "Uniform", item: "FOH apron · L",          serial: "U-FOH-L-189", assigned: null,         iv: "—",  avBg: "#5A6A7E", issued: "—",            state: "Damaged" },
];

function AssetsScreen({ toast }) {
  const [filter, setFilter] = useState("all");
  const [openIssue, setOpenIssue] = useState(false);
  const [assets, setAssets] = useState(ASSETS_INITIAL);

  const filtered = assets.filter(a => filter === "all" || a.cat.toLowerCase() === filter);

  const stateTag = (state) => {
    if (state === "Assigned")  return "humi-tag--mint";
    if (state === "In stock")  return "humi-tag--amber";
    if (state === "Damaged")   return "humi-tag--coral";
    return "";
  };

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-07 · ASSETS"
        title="Asset management"
        sub={`${assets.length} tracked · ${assets.filter(a => a.state === "Assigned").length} assigned · ${assets.filter(a => a.state === "In stock").length} in stock`}
        actions={
          <>
            <button className="ghost-btn" onClick={() => toast({ kind: "success", msg: "Inventory CSV exported" })}><I.download/> Export</button>
            <button className="primary-btn" onClick={() => setOpenIssue(true)}><I.plus/> Issue asset</button>
          </>
        }
      />

      <div className="asset-cats">
        <button className={"asset-cat" + (filter === "all" ? " is-active" : "")} onClick={() => setFilter("all")}>
          <div className="asset-cat-ico"><I.package/></div>
          <div className="asset-cat-label">All</div>
          <div className="asset-cat-count">{assets.length}</div>
        </button>
        {ASSET_CATEGORIES.map(c => (
          <button key={c.id} className={"asset-cat" + (filter === c.id ? " is-active" : "")} onClick={() => setFilter(c.id)}>
            <div className="asset-cat-ico"><c.Ico/></div>
            <div className="asset-cat-label">{c.label}</div>
            <div className="asset-cat-count">{c.issued}<small>/{c.count}</small></div>
            {c.on_order > 0 && <div className="asset-cat-order">{c.on_order} on order</div>}
          </button>
        ))}
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>Asset ID</th><th>Category</th><th>Item</th><th>Serial</th><th>Assigned to</th><th>Issued</th><th>State</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td><b>{a.id}</b></td>
                <td>{a.cat}</td>
                <td>{a.item}</td>
                <td className="mono-sm">{a.serial}</td>
                <td>
                  {a.assigned ? (
                    <div className="inline-emp"><span className="inline-emp-av" style={{ background: a.avBg }}>{a.iv}</span><span>{a.assigned}</span></div>
                  ) : <span className="mono-sm" style={{ color: "var(--color-ink-faint)" }}>—</span>}
                </td>
                <td className="mono-sm">{a.issued}</td>
                <td><span className={"humi-tag " + stateTag(a.state)}>{a.state}</span></td>
                <td>
                  {a.state === "Assigned" && <button className="mini-btn ghost" onClick={() => { setAssets(as => as.map(x => x.id === a.id ? { ...x, state: "In stock", assigned: null, iv: "—", issued: "—" } : x)); toast({ kind: "success", msg: `${a.item} returned`, undo: () => setAssets(as => as.map(x => x.id === a.id ? a : x)) }); }}><I.undo/> Return</button>}
                  {a.state === "In stock" && <button className="mini-btn approve" onClick={() => setOpenIssue(true)}>Issue</button>}
                  {a.state === "Damaged" && <button className="mini-btn reject" onClick={() => toast({ kind: "warn", msg: "Replacement ordered" })}>Replace</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openIssue && (
        <div className="modal-overlay" onClick={() => setOpenIssue(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <header className="modal-head">
              <div className="eyebrow">C-07 · ISSUE ASSET</div>
              <h3>Issue an asset to an employee</h3>
              <button className="drawer-x" onClick={() => setOpenIssue(false)}><I.x/></button>
            </header>
            <div className="modal-body">
              <div className="form-grid-2">
                <SelectField label="Asset *"      value="ASSET-2099 · MacBook Air M2" options={["ASSET-2099 · MacBook Air M2","ASSET-2100 · Bluetooth scanner","ASSET-2105 · iPad Pro POS"]} onChange={()=>{}}/>
                <SelectField label="Assign to *"  value="Niran W." options={["Niran W.","Naree S.","Achara P.","Krit J."]} onChange={()=>{}}/>
                <Field label="Issue date *"       value="23 May 2026" onChange={()=>{}}/>
                <Field label="Expected return"    value="On termination" onChange={()=>{}}/>
              </div>
              <div className="presets-label" style={{ marginTop: 12 }}>Note</div>
              <textarea className="textarea" placeholder="e.g. for new hire onboarding · laptop must be returned on offboarding"/>
            </div>
            <footer className="modal-foot">
              <button className="ghost-btn" onClick={() => setOpenIssue(false)}>Cancel</button>
              <button className="primary-btn" onClick={() => { setOpenIssue(false); toast({ kind: "success", msg: "Asset issued", detail: "MacBook Air M2 → Niran W. · auto-added to offboard checklist" }); }}><I.check/> Issue asset</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Org Chart ─────────────────────────────────────────────────── */
const ORG_TREE = {
  id: "ceo", name: "Krit Wattanachai", role: "CEO", iv: "KW", avBg: "#0E1B2C", reports: 4, children: [
    { id: "coo", name: "Pim L.", role: "COO · System Admin", iv: "PL", avBg: "#243447", reports: 3, children: [
      { id: "it",  name: "Wichai R.", role: "HRIS Lead", iv: "WR", avBg: "#9333EA", reports: 2 },
      { id: "ops", name: "Anan S.",   role: "HR Admin",  iv: "AS", avBg: "#5B6CE0", reports: 5, children: [
        { id: "mgr1", name: "Somchai K.", role: "Shift Lead · BKK-03", iv: "SK", avBg: "#1FA8A0", reports: 6, children: [
          { id: "e1", name: "Mali T.",   role: "Barista",  iv: "MT", avBg: "#2F8A6B" },
          { id: "e2", name: "Krit J.",   role: "Stock",    iv: "KJ", avBg: "#5A6A7E" },
          { id: "e3", name: "Somsri P.", role: "Cashier",  iv: "SP", avBg: "#E08864" },
          { id: "e4", name: "Panji Dwi", role: "PT Floor", iv: "PD", avBg: "#5B6CE0" },
        ]},
        { id: "mgr2", name: "Achara P.", role: "Shift Lead · BKK-07", iv: "AP", avBg: "#E08864", reports: 4 },
      ]},
      { id: "spd", name: "Nat L.", role: "SPD", iv: "NL", avBg: "#2F8A6B", reports: 1 },
    ]},
    { id: "cfo", name: "Sasitorn V.", role: "CFO", iv: "SV", avBg: "#9333EA", reports: 2 },
    { id: "cmo", name: "Tanawat C.",  role: "CMO", iv: "TC", avBg: "#E08864", reports: 3 },
    { id: "cto", name: "Veera N.",    role: "CTO", iv: "VN", avBg: "#1FA8A0", reports: 4 },
  ]
};

function OrgNode({ node, depth = 0, focusId, setFocusId }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isFocused = node.id === focusId;
  return (
    <div className={"org-node" + (depth === 0 ? " is-root" : "")}>
      <div
        className={"org-card" + (isFocused ? " is-focused" : "")}
        onClick={() => setFocusId(node.id)}
        style={{ borderColor: isFocused ? node.avBg : undefined }}
      >
        <span className="org-av" style={{ background: node.avBg }}>{node.iv}</span>
        <div className="org-card-body">
          <div className="org-name">{node.name}</div>
          <div className="org-role">{node.role}</div>
          {node.reports != null && <div className="org-reports">{node.reports} report{node.reports !== 1 ? "s" : ""}</div>}
        </div>
        {hasChildren && (
          <button className="org-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(x => !x); }}>
            {expanded ? "−" : "+"}
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="org-children">
          {node.children.map(c => <OrgNode key={c.id} node={c} depth={depth + 1} focusId={focusId} setFocusId={setFocusId}/>)}
        </div>
      )}
    </div>
  );
}

function OrgChartScreen({ persona, toast, openEmpHub }) {
  const [focusId, setFocusId] = useState("ceo");
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState("");

  // Find focused node from the tree
  const findNode = (node, id) => {
    if (node.id === id) return node;
    if (!node.children) return null;
    for (const c of node.children) {
      const found = findNode(c, id);
      if (found) return found;
    }
    return null;
  };
  const focused = findNode(ORG_TREE, focusId);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-08 · ORG CHART"
        title="Company directory"
        sub="248 employees · 12 locations · tap any node to focus"
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="text-input-wrap" style={{ width: 220 }}>
              <input placeholder="Find someone…" value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <div className="zoom-controls">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>−</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}>+</button>
              <button onClick={() => setZoom(1)} className="zoom-reset">Fit</button>
            </div>
          </div>
        }
      />

      <div className="screen-grid" style={{ gridTemplateColumns: "1fr 320px" }}>
        <div className="card org-canvas-card">
          <div className="org-canvas" style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
            <OrgNode node={ORG_TREE} focusId={focusId} setFocusId={setFocusId}/>
          </div>
        </div>

        {focused && (
          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">SELECTED</div>
              <div className="card-title">{focused.name}</div>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="emp-av" style={{ background: focused.avBg, width: 56, height: 56, fontSize: 18 }}>{focused.iv}</span>
                <div>
                  <div className="emp-name" style={{ fontSize: 16 }}>{focused.name}</div>
                  <div className="emp-meta">{focused.role}</div>
                </div>
              </div>
              <div className="kv-grid" style={{ padding: 0, gridTemplateColumns: "1fr" }}>
                <KV k="Employee ID"   v={"EMP-" + String(Math.floor(Math.random() * 9000) + 100).padStart(5, "0")}/>
                <KV k="Department"    v={focused.role}/>
                <KV k="Location"      v="Central · Bangkok 03"/>
                <KV k="Direct reports" v={(focused.reports ?? 0) + " people"}/>
                <KV k="Tenure"        v="2 yrs 8 mo"/>
                <KV k="Manager"       v={focused.id === "ceo" ? "Board of Directors" : "(view chart)"}/>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <button className="ghost-btn" onClick={() => openEmpHub && openEmpHub(focused.name)}>Open profile</button>
                <button className="ghost-btn" onClick={() => toast({ msg: `Messaging ${focused.name}` })}>Message</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Benefits / Claims ────────────────────────────────────────── */
const BENEFIT_PLANS = [
  { id: "health",  name: "Health · OPD/IPD",  carrier: "AIA",   cap: 12000, used: 4200,  unit: "/year", note: "฿1.2M annual cap · co-pay 10%" },
  { id: "dental",  name: "Dental",            carrier: "AIA",   cap: 8000,  used: 1500,  unit: "/year", note: "฿8K cap on cleanings + restoration" },
  { id: "optical", name: "Optical",           carrier: "AIA",   cap: 4000,  used: 0,     unit: "/2 yrs",note: "Frames + lenses combined" },
  { id: "wellness",name: "Wellness · gym",    carrier: "Humi",  cap: 6000,  used: 2400,  unit: "/year", note: "Gym memberships + retreats" },
];

const CLAIMS_INITIAL = [
  { id: "CLM-0421", plan: "Dental",   amount: 850,  who: "Panji Dwi", iv: "PD", avBg: "#5B6CE0", filed: "20 May", date: "18 May", merchant: "Dental Clinic BKK", status: "Pending",  note: "Cleaning + check-up" },
  { id: "CLM-0418", plan: "Health",   amount: 2400, who: "Mali T.",   iv: "MT", avBg: "#2F8A6B", filed: "19 May", date: "17 May", merchant: "Bumrungrad OPD",    status: "Pending",  note: "Doctor visit + meds" },
  { id: "CLM-0412", plan: "Wellness", amount: 1800, who: "Somchai K.",iv: "SK", avBg: "#1FA8A0", filed: "16 May", date: "1 May",  merchant: "Fitness First",     status: "Approved", note: "Q2 membership" },
  { id: "CLM-0405", plan: "Health",   amount: 350,  who: "Krit J.",   iv: "KJ", avBg: "#5A6A7E", filed: "11 May", date: "10 May", merchant: "Pharmacy Plus",     status: "Approved", note: "Prescription" },
];

/* Employee — file a claim wizard */
function BenefitsScreen({ persona, toast, onNav }) {
  const [openClaim, setOpenClaim] = useState(false);

  if (persona && (persona.id === "manager" || persona.id === "hradmin" || persona.id === "sysadmin")) {
    return <ClaimsManager toast={toast} persona={persona}/>;
  }

  return (
    <div className="screen">
      <PageHeader
        eyebrow="BENEFITS"
        title="Your benefits"
        sub="Tier B · enrolled 1 Aug 2023"
        actions={<button className="primary-btn" onClick={() => setOpenClaim(true)}><I.plus/> File a claim</button>}
      />

      <div className="stat-row">
        {BENEFIT_PLANS.map(p => {
          const remaining = p.cap - p.used;
          const pct = (p.used / p.cap) * 100;
          return (
            <div key={p.id} className="stat-card">
              <div className="stat-card-eyebrow">{p.name.toUpperCase()}</div>
              <div className="stat-card-value">฿{remaining.toLocaleString()}</div>
              <div className="stat-card-sub">of ฿{p.cap.toLocaleString()} {p.unit} left</div>
              <div className="benefit-bar" style={{ marginTop: 8 }}>
                <span style={{ width: pct + "%", background: pct > 75 ? "var(--imp-bg)" : pct > 50 ? "#EBD58A" : "var(--color-accent)" }}/>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-eyebrow">A-06 · CLAIMS</div>
          <div className="card-title">My claim history</div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Ref</th><th>Plan</th><th>Merchant</th><th>Service date</th><th className="num">Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {CLAIMS_INITIAL.filter(c => c.who === "Panji Dwi" || c.who === persona.name).slice(0, 6).map(c => (
              <tr key={c.id}>
                <td><b>{c.id}</b></td>
                <td>{c.plan}</td>
                <td>{c.merchant}</td>
                <td className="mono-sm">{c.date}</td>
                <td className="num">฿{c.amount.toLocaleString()}</td>
                <td><span className={"humi-tag " + statusToTag(c.status)}>{c.status}</span></td>
              </tr>
            ))}
            <tr><td><b>CLM-0388</b></td><td>Health</td><td>Bumrungrad OPD</td><td className="mono-sm">22 Apr</td><td className="num">฿1,200</td><td><span className="humi-tag humi-tag--mint">Approved</span></td></tr>
            <tr><td><b>CLM-0374</b></td><td>Wellness</td><td>Yoga BKK</td><td className="mono-sm">15 Apr</td><td className="num">฿600</td><td><span className="humi-tag humi-tag--mint">Approved</span></td></tr>
          </tbody>
        </table>
      </div>

      {openClaim && <ClaimWizard onClose={() => setOpenClaim(false)} toast={toast}/>}
    </div>
  );
}

/* Claim wizard — file new claim */
function ClaimWizard({ onClose, toast }) {
  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState("dental");
  const [date, setDate] = useState("22 May 2026");
  const [merchant, setMerchant] = useState("Dental Clinic BKK");
  const [amount, setAmount] = useState("1,200");
  const [note, setNote] = useState("");
  const [hasReceipt, setHasReceipt] = useState(false);

  const plan = BENEFIT_PLANS.find(p => p.id === planId);
  const amountNum = parseInt(amount.replace(/,/g, "")) || 0;
  const remaining = plan ? plan.cap - plan.used : 0;
  const overCap = amountNum > remaining;

  const routing = amountNum <= 2000 ? "Manager only · 1 day SLA" : "Manager + HR · 2 day SLA";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <div className="eyebrow">A-06 · NEW CLAIM</div>
          <h3>File a benefit claim</h3>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>

        <div className="wizard-steps" style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}>
          {[["1","Plan"],["2","Receipt"],["3","Amount"],["4","Submit"]].map(([n, l]) => {
            const sn = parseInt(n);
            const state = step === sn ? "current" : step > sn ? "done" : "todo";
            return (
              <button key={n} className={"wiz-step is-" + state} onClick={() => setStep(sn)}>
                <span className="wiz-step-num">{step > sn ? <I.check/> : n}</span>
                <div><div className="wiz-step-lbl">{l}</div></div>
              </button>
            );
          })}
        </div>

        <div className="modal-body">
          {step === 1 && (
            <>
              <div className="presets-label">Choose plan</div>
              <div className="claim-plan-grid">
                {BENEFIT_PLANS.map(p => {
                  const rem = p.cap - p.used;
                  return (
                    <button
                      key={p.id}
                      className={"claim-plan" + (planId === p.id ? " is-selected" : "")}
                      onClick={() => setPlanId(p.id)}
                    >
                      <div className="claim-plan-head">
                        <div className="claim-plan-name">{p.name}</div>
                        <div className="claim-plan-carrier">{p.carrier}</div>
                      </div>
                      <div className="claim-plan-cap">
                        <b>฿{rem.toLocaleString()}</b><small>of ฿{p.cap.toLocaleString()} left</small>
                      </div>
                      <div className="benefit-bar"><span style={{ width: ((p.used / p.cap) * 100) + "%", background: "var(--color-accent)" }}/></div>
                      <div className="claim-plan-note">{p.note}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-eyebrow">Upload receipt</div>
              <div className={"receipt-drop" + (hasReceipt ? " has-file" : "")} onClick={() => setHasReceipt(true)}>
                {hasReceipt ? (
                  <>
                    <div className="receipt-thumb">
                      <div className="receipt-thumb-icon"><I.doc/></div>
                      <div>
                        <div className="receipt-name">receipt-dental-220526.jpg</div>
                        <div className="receipt-size">1.2 MB · uploaded just now</div>
                      </div>
                      <button className="mini-btn ghost" onClick={(e) => { e.stopPropagation(); setHasReceipt(false); }}>Remove</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="receipt-drop-icon"><I.download style={{ transform: "rotate(180deg)" }}/></div>
                    <div className="receipt-drop-title">Drop receipt or click to upload</div>
                    <div className="receipt-drop-sub">PDF, JPG, PNG · max 5 MB</div>
                  </>
                )}
              </div>
              <div className="form-callout" style={{ marginTop: 14 }}>
                <div className="form-callout-eyebrow">Required</div>
                <div>Original receipt with merchant name, date, service description, and amount visible.</div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-grid-2">
                <Field label="Service date *" value={date} onChange={setDate}/>
                <Field label="Amount (฿) *"  value={amount} onChange={setAmount} prefix="฿"/>
                <Field label="Merchant *"     value={merchant} onChange={setMerchant} full/>
              </div>
              <div className="presets-label" style={{ marginTop: 12 }}>Note (optional)</div>
              <textarea className="textarea" value={note} onChange={e => setNote(e.target.value)} placeholder="Context for the approver…"/>

              <div className="form-callout" style={{ marginTop: 14, background: overCap ? "#FCE0DD" : "var(--color-accent-soft)", borderColor: overCap ? "#f0c6b3" : "#93D6CF", color: overCap ? "#8b2b25" : "#06241F" }}>
                <div className="form-callout-eyebrow" style={{ color: overCap ? "#8b2b25" : "#06241F" }}>{overCap ? "Over cap" : "Within cap"}</div>
                {overCap ? (
                  <div>Amount ฿{amountNum.toLocaleString()} exceeds remaining balance ฿{remaining.toLocaleString()}. Reduce or split across years.</div>
                ) : (
                  <>
                    <div>Amount ฿{amountNum.toLocaleString()} · Plan balance after claim: <b>฿{(remaining - amountNum).toLocaleString()}</b></div>
                    <div>Routing: <b>{routing}</b></div>
                  </>
                )}
              </div>
            </>
          )}

          {step === 4 && (
            <div className="review-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div className="review-section-head">Claim details</div>
                <KV k="Plan"          v={plan.name + " · " + plan.carrier}/>
                <KV k="Merchant"      v={merchant}/>
                <KV k="Service date"  v={date}/>
                <KV k="Amount"        v={"฿" + amountNum.toLocaleString()}/>
                <KV k="Receipt"       v={hasReceipt ? "Attached" : "—"}/>
                <KV k="Note"          v={note || "—"}/>
              </div>
              <div>
                <div className="review-section-head">What happens next</div>
                <div className="pipe-step done"><span className="pipe-num"><I.check/></span>Claim submitted</div>
                <div className="pipe-step"><span className="pipe-num">2</span>Manager review · 1 day SLA</div>
                {amountNum > 2000 && <div className="pipe-step"><span className="pipe-num">3</span>HR final approval · 1 day SLA</div>}
                <div className="pipe-step"><span className="pipe-num">{amountNum > 2000 ? "4" : "3"}</span>SPD verifies receipt</div>
                <div className="pipe-step"><span className="pipe-num">{amountNum > 2000 ? "5" : "4"}</span>Reimbursed in next payroll</div>
              </div>
            </div>
          )}
        </div>

        <footer className="modal-foot">
          {step > 1 && <button className="ghost-btn" onClick={() => setStep(step - 1)}><I.chevL/> Back</button>}
          <div style={{ flex: 1 }}/>
          <button className="ghost-btn" onClick={onClose}>Cancel</button>
          {step < 4 && (
            <button
              className="primary-btn"
              disabled={(step === 2 && !hasReceipt) || (step === 3 && overCap)}
              style={((step === 2 && !hasReceipt) || (step === 3 && overCap)) ? { opacity: .45, cursor: "not-allowed" } : undefined}
              onClick={() => setStep(step + 1)}
            >Next <I.chevR/></button>
          )}
          {step === 4 && (
            <button className="primary-btn" onClick={() => { onClose(); toast({ kind: "success", msg: "Claim submitted", detail: `${plan.name} · ฿${amountNum.toLocaleString()} · routed to ${routing.split(" · ")[0]}` }); }}>
              <I.check/> Submit claim
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

/* Manager view — approve claims with receipt thumbnail */
function ClaimsManager({ toast, persona }) {
  const [claims, setClaims] = useState(CLAIMS_INITIAL);
  const [focusId, setFocusId] = useState(null);
  const pending = claims.filter(c => c.status === "Pending").length;
  const focus = claims.find(c => c.id === focusId);

  const action = (id, status) => setClaims(cs => cs.map(c => c.id === id ? { ...c, status } : c));

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-05 · BENEFITS · CLAIMS"
        title={<>Claims queue <em>·</em> {pending} pending</>}
        sub="Reimburse staff for approved benefit categories."
      />

      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>Ref</th><th>Employee</th><th>Plan</th><th>Merchant</th><th className="num">Amount</th><th>Filed</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {claims.map(c => (
              <tr key={c.id} className={c.status === "Approved" ? "approval-row is-approved" : c.status === "Rejected" ? "approval-row is-rejected" : ""}>
                <td><b>{c.id}</b></td>
                <td><div className="inline-emp"><span className="inline-emp-av" style={{ background: c.avBg }}>{c.iv}</span><span>{c.who}</span></div></td>
                <td>{c.plan}</td>
                <td>{c.merchant}</td>
                <td className="num"><b>฿{c.amount.toLocaleString()}</b></td>
                <td className="mono-sm">{c.filed}</td>
                <td><span className={"humi-tag " + statusToTag(c.status)}>{c.status}</span></td>
                <td>
                  {c.status === "Pending" ? (
                    <div className="approve-actions">
                      <button className="mini-btn approve" onClick={() => { action(c.id, "Approved"); toast({ kind: "success", msg: `${c.who}'s claim approved`, detail: `฿${c.amount.toLocaleString()} · ${c.plan}`, undo: () => action(c.id, "Pending") }); }}><I.check/> Approve</button>
                      <button className="mini-btn reject" onClick={() => { action(c.id, "Rejected"); toast({ kind: "warn", msg: `${c.who}'s claim rejected` }); }}><I.x/> Reject</button>
                      <button className="mini-btn ghost" onClick={() => setFocusId(c.id)}>View</button>
                    </div>
                  ) : (
                    <button className="mini-btn ghost" onClick={() => setFocusId(c.id)}>View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {focus && (
        <>
          <div className="drawer-backdrop" onClick={() => setFocusId(null)}/>
          <aside className="drawer drawer-wide">
            <header className="drawer-head">
              <div className="drawer-eyebrow">C-05 · CLAIM DETAIL</div>
              <div className="drawer-title">
                <span className="emp-av drawer-av" style={{ background: focus.avBg }}>{focus.iv}</span>
                <div>
                  <div className="emp-name" style={{ fontSize: 17 }}>{focus.who} · {focus.plan}</div>
                  <div className="emp-meta">{focus.id} · filed {focus.filed}</div>
                </div>
              </div>
              <button className="drawer-x" onClick={() => setFocusId(null)}><I.x/></button>
            </header>
            <div className="drawer-body">
              <div className="receipt-preview">
                <div className="receipt-preview-header">
                  <span className="receipt-preview-merchant">{focus.merchant}</span>
                  <span className="receipt-preview-date">{focus.date} 2026</span>
                </div>
                <div className="receipt-preview-lines">
                  <div><span>{focus.note}</span><b>฿{focus.amount.toLocaleString()}</b></div>
                  <div className="receipt-preview-divider"/>
                  <div className="receipt-preview-total"><span>TOTAL</span><b>฿{focus.amount.toLocaleString()}</b></div>
                </div>
              </div>

              <div className="payslip-section">
                <div className="payslip-section-head">Claim details</div>
                <KV k="Plan"          v={focus.plan}/>
                <KV k="Service date"  v={focus.date + " 2026"}/>
                <KV k="Merchant"      v={focus.merchant}/>
                <KV k="Amount"        v={"฿" + focus.amount.toLocaleString()}/>
                <KV k="Routing"       v={focus.amount <= 2000 ? "Manager only" : "Manager + HR"}/>
                <KV k="Note"          v={focus.note}/>
              </div>
            </div>
            <footer className="drawer-foot">
              {focus.status === "Pending" ? (
                <>
                  <button className="ghost-btn danger" onClick={() => { action(focus.id, "Rejected"); setFocusId(null); toast({ kind: "warn", msg: `${focus.who}'s claim rejected` }); }}><I.x/> Reject</button>
                  <div style={{ flex: 1 }}/>
                  <button className="ghost-btn" onClick={() => setFocusId(null)}>Cancel</button>
                  <button className="primary-btn" onClick={() => { action(focus.id, "Approved"); setFocusId(null); toast({ kind: "success", msg: `${focus.who}'s claim approved` }); }}><I.check/> Approve</button>
                </>
              ) : (
                <>
                  <button className="ghost-btn" onClick={() => { action(focus.id, "Pending"); setFocusId(null); toast({ msg: `${focus.id} reopened` }); }}><I.undo/> Reopen</button>
                  <div style={{ flex: 1 }}/>
                  <button className="primary-btn" onClick={() => setFocusId(null)}>Close</button>
                </>
              )}
            </footer>
          </aside>
        </>
      )}
    </div>
  );
}

/* ── Shift Swap flow ──────────────────────────────────────────── */
function ShiftSwapScreen({ toast, onNav }) {
  const [step, setStep] = useState(1);
  const [target, setTarget] = useState("Mali T.");
  const [myDate, setMyDate] = useState("24 May · 09:00–18:00");
  const [theirDate, setTheirDate] = useState("25 May · 14:00–22:00");
  const [reason, setReason] = useState("");

  return (
    <div className="screen">
      <PageHeader
        eyebrow="B-02 · SHIFT SWAP"
        title="Request a shift swap"
        sub="Coworker accepts, then manager approves. Roster auto-updates."
        actions={<button className="ghost-btn" onClick={() => onNav("roster")}>Cancel</button>}
      />

      <div className="wizard-steps">
        {[["1","Pick coworker"],["2","Match shifts"],["3","Send"]].map(([n, l]) => {
          const sn = parseInt(n);
          const state = step === sn ? "current" : step > sn ? "done" : "todo";
          return (
            <button key={n} className={"wiz-step is-" + state} onClick={() => setStep(sn)}>
              <span className="wiz-step-num">{step > sn ? <I.check/> : n}</span>
              <div><div className="wiz-step-lbl">{l}</div></div>
            </button>
          );
        })}
      </div>

      <div className="card">
        {step === 1 && (
          <div className="form-pane">
            <div className="form-eyebrow">A · COWORKER</div>
            <div className="form-title">Who do you want to swap with?</div>
            <div className="swap-coworker-grid">
              {[
                { name: "Mali T.",    iv: "MT", avBg: "#2F8A6B", role: "Barista · FOH",     hours: "32/40h" },
                { name: "Krit J.",    iv: "KJ", avBg: "#5A6A7E", role: "Stock · BOH",       hours: "36/40h" },
                { name: "Somsri P.",  iv: "SP", avBg: "#E08864", role: "Cashier · FOH",     hours: "40/40h" },
                { name: "Panji Dwi",  iv: "PD", avBg: "#5B6CE0", role: "Floor · PT",        hours: "24/24h" },
              ].map(p => (
                <button
                  key={p.name}
                  className={"swap-coworker" + (target === p.name ? " is-selected" : "")}
                  onClick={() => setTarget(p.name)}
                >
                  <span className="swap-coworker-av" style={{ background: p.avBg }}>{p.iv}</span>
                  <div>
                    <div className="swap-coworker-name">{p.name}</div>
                    <div className="swap-coworker-role">{p.role}</div>
                    <div className="swap-coworker-hours">{p.hours} scheduled</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-pane">
            <div className="form-eyebrow">B · MATCH</div>
            <div className="form-title">Pick the two shifts to swap</div>
            <div className="swap-match">
              <div className="swap-side">
                <div className="swap-side-head">
                  <div className="swap-side-eyebrow">Your shift</div>
                  <div className="swap-side-name">Panji Dwi (you)</div>
                </div>
                <button className="swap-shift is-selected">
                  <span className="swap-shift-day">Saturday</span>
                  <b>{myDate}</b>
                </button>
                <div className="swap-side-shifts">
                  {["25 May · 09:00–18:00","26 May · 13:00–17:00"].map(s => (
                    <button key={s} className="swap-shift" onClick={() => setMyDate(s)}>
                      <span className="swap-shift-day">{s.split(" · ")[0]}</span>
                      <span>{s.split(" · ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="swap-arrow"><I.swap/></div>
              <div className="swap-side">
                <div className="swap-side-head">
                  <div className="swap-side-eyebrow">Their shift</div>
                  <div className="swap-side-name">{target}</div>
                </div>
                <button className="swap-shift is-selected">
                  <span className="swap-shift-day">Sunday</span>
                  <b>{theirDate}</b>
                </button>
                <div className="swap-side-shifts">
                  {["26 May · 14:00–22:00","27 May · 09:00–18:00"].map(s => (
                    <button key={s} className="swap-shift" onClick={() => setTheirDate(s)}>
                      <span className="swap-shift-day">{s.split(" · ")[0]}</span>
                      <span>{s.split(" · ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-callout" style={{ marginTop: 8 }}>
              <div className="form-callout-eyebrow">Conflict check</div>
              <div className="conflict-row"><I.check/> No overlapping shifts after swap</div>
              <div className="conflict-row"><I.check/> Within 40h max weekly cap for both employees</div>
              <div className="conflict-row"><I.check/> Both certified for required roles (FOH ↔ FOH)</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-pane">
            <div className="form-eyebrow">C · CONFIRM</div>
            <div className="form-title">Send swap request to {target}</div>

            <div className="swap-summary">
              <div className="swap-summary-row">
                <span className="swap-summary-lbl">You give up</span>
                <b>{myDate}</b>
              </div>
              <div className="swap-summary-row">
                <span className="swap-summary-lbl">You take</span>
                <b>{theirDate}</b>
              </div>
              <div className="swap-summary-row">
                <span className="swap-summary-lbl">Net hours</span>
                <b>+0 (even swap)</b>
              </div>
            </div>

            <div className="presets-label" style={{ marginTop: 14 }}>Message to {target} (optional)</div>
            <textarea className="textarea" value={reason} onChange={e => setReason(e.target.value)} placeholder={`Hey ${target.split(" ")[0]}, are you free to swap?`}/>

            <div className="review-section-head" style={{ marginTop: 16 }}>What happens next</div>
            <div className="pipe-step done"><span className="pipe-num"><I.check/></span>You send the request</div>
            <div className="pipe-step"><span className="pipe-num">2</span>{target} accepts or declines (24h)</div>
            <div className="pipe-step"><span className="pipe-num">3</span>Manager approves the swap</div>
            <div className="pipe-step"><span className="pipe-num">4</span>Roster auto-updates · both notified</div>
          </div>
        )}
      </div>

      <div className="wizard-foot">
        {step > 1 && <button className="ghost-btn" onClick={() => setStep(step - 1)}><I.chevL/> Back</button>}
        <div style={{ flex: 1 }}/>
        {step < 3 && <button className="primary-btn" onClick={() => setStep(step + 1)}>Next <I.chevR/></button>}
        {step === 3 && <button className="primary-btn" onClick={() => { onNav("roster"); toast({ kind: "success", msg: `Swap request sent to ${target}`, detail: "They'll see it in their inbox · expires in 24h" }); }}><I.check/> Send request</button>}
      </div>
    </div>
  );
}

/* ── Offboarding flow ─────────────────────────────────────────── */
function OffboardingScreen({ toast, onNav }) {
  const [target, setTarget] = useState("Achara P.");
  const [tasks, setTasks] = useState([
    { id: "off1", t: "Submit resignation letter",      owner: "Employee", due: "Day −30", done: true },
    { id: "off2", t: "Acknowledged by manager",        owner: "Manager",  due: "Day −30", done: true },
    { id: "off3", t: "Exit interview booked",          owner: "HR Admin", due: "Day −14", done: true },
    { id: "off4", t: "Knowledge handoff document",     owner: "Employee", due: "Day −7",  done: false },
    { id: "off5", t: "Return uniform + name badge",    owner: "Employee", due: "Day −1",  done: false },
    { id: "off6", t: "Return laptop + access card",    owner: "Employee", due: "Day −1",  done: false },
    { id: "off7", t: "Revoke system access",           owner: "HRIS",     due: "Day 0",   done: false },
    { id: "off8", t: "Final pay calculation",          owner: "HR Admin", due: "Day 0",   done: false },
    { id: "off9", t: "Certificate of employment",      owner: "SPD",      due: "Day +3",  done: false },
    { id: "off10",t: "PF withdrawal initiated",        owner: "HR Admin", due: "Day +7",  done: false },
  ]);
  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-03 · OFFBOARDING"
        title={<>{target} <em>·</em> last day 30 May 2026</>}
        sub="7 days remaining · resignation accepted · final pay being calculated"
        actions={
          <div className="onboard-progress">
            <div className="onboard-progress-num">{done} / {tasks.length}</div>
            <div className="onboard-progress-bar"><span style={{ width: pct + "%" }}/></div>
            <div className="onboard-progress-pct">{pct}%</div>
          </div>
        }
      />

      <div className="screen-grid">
        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">CLEARANCE CHECKLIST</div>
            <div className="card-title">10 items across 4 owners</div>
          </div>
          <div className="card-list">
            {tasks.map(t => (
              <label key={t.id} className={"check-row" + (t.done ? " is-done" : "")}>
                <input type="checkbox" checked={t.done} onChange={() => { toggle(t.id); toast({ msg: `${t.t} ${t.done ? "reopened" : "completed"}` }); }}/>
                <div className="check-body">
                  <div className="check-title">{t.t}</div>
                  <div className="check-meta"><b>{t.owner}</b> · {t.due}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">FINAL PAY</div>
              <div className="card-title">Calculated 28 May</div>
            </div>
            <div style={{ padding: "12px 18px" }}>
              <div className="payslip-line"><span>Pro-rated salary · 30 days</span><b>฿28,500</b></div>
              <div className="payslip-line"><span>Unused leave · 8.5 days</span><b>฿9,690</b></div>
              <div className="payslip-line"><span>Severance · 4 years tenure</span><b>฿85,500</b></div>
              <div className="payslip-line"><span>Bonus · pro-rated YTD</span><b>฿11,400</b></div>
              <div className="payslip-line"><span>− Income tax</span><b style={{ color: "var(--imp-bg)" }}>−฿4,210</b></div>
              <div className="payslip-line payslip-total"><span>Final pay</span><b style={{ color: "var(--save)" }}>฿130,880</b></div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">DOCUMENTS</div>
              <div className="card-title">Auto-generated</div>
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="quick-tile" onClick={() => toast({ kind: "success", msg: "Certificate of employment generated" })}>
                <div className="quick-ico" style={{ background: "var(--color-accent-soft)", color: "#06241F" }}>C</div>
                <span>Certificate of employment</span>
                <I.download/>
              </button>
              <button className="quick-tile" onClick={() => toast({ kind: "success", msg: "Tax form ภ.ง.ด.91 generated" })}>
                <div className="quick-ico" style={{ background: "var(--color-accent-alt-soft)", color: "#2d3a9c" }}>T</div>
                <span>Tax form ภ.ง.ด.91</span>
                <I.download/>
              </button>
              <button className="quick-tile" onClick={() => toast({ kind: "success", msg: "PF withdrawal form generated" })}>
                <div className="quick-ico" style={{ background: "#FEF3C7", color: "#6B4E14" }}>P</div>
                <span>PF withdrawal form</span>
                <I.download/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Payslip detail drawer ────────────────────────────────────── */
function PayslipDrawer({ slip, onClose, toast }) {
  if (!slip) return null;
  const lines = {
    earnings: [
      ["Base salary",        28500],
      ["Overtime · 1.5×",    1500],
      ["Overtime · 2.0×",    375],
      ["Position allowance", 1500],
      ["Transport",          800],
    ],
    deductions: [
      ["Personal income tax", 1140],
      ["Social security",     750],
      ["Provident fund · 5%", 1425],
      ["Health insurance",    0],
    ],
  };
  const earn = lines.earnings.reduce((s, [, v]) => s + v, 0);
  const ded  = lines.deductions.reduce((s, [, v]) => s + v, 0);
  const nett = earn - ded;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer drawer-wide">
        <header className="drawer-head">
          <div className="drawer-eyebrow">A-05 · PAYSLIP</div>
          <div className="drawer-title">
            <span className="emp-av drawer-av" style={{ background: "linear-gradient(135deg,#1FA8A0,#5B6CE0)" }}>SK</span>
            <div>
              <div className="emp-name" style={{ fontSize: 17 }}>{slip.m} payslip</div>
              <div className="emp-meta">Somchai K. · EMP-00204 · Released {slip.status === "Released" ? slip.m : "Pending"}</div>
            </div>
          </div>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>
        <div className="drawer-body">
          <div className="payslip-summary">
            <div>
              <div className="payslip-summary-lbl">Gross earnings</div>
              <div className="payslip-summary-val">฿{earn.toLocaleString()}</div>
            </div>
            <div className="payslip-summary-op">−</div>
            <div>
              <div className="payslip-summary-lbl">Deductions</div>
              <div className="payslip-summary-val" style={{ color: "var(--imp-bg)" }}>฿{ded.toLocaleString()}</div>
            </div>
            <div className="payslip-summary-op">=</div>
            <div>
              <div className="payslip-summary-lbl">Nett pay</div>
              <div className="payslip-summary-val" style={{ color: "var(--save)", fontSize: 22 }}>฿{nett.toLocaleString()}</div>
            </div>
          </div>

          <div className="payslip-section">
            <div className="payslip-section-head">Earnings</div>
            {lines.earnings.map(([l, v]) => (
              <div key={l} className="payslip-line">
                <span>{l}</span>
                <b>฿{v.toLocaleString()}</b>
              </div>
            ))}
            <div className="payslip-line payslip-total">
              <span>Subtotal</span>
              <b>฿{earn.toLocaleString()}</b>
            </div>
          </div>

          <div className="payslip-section">
            <div className="payslip-section-head">Deductions</div>
            {lines.deductions.map(([l, v]) => (
              <div key={l} className="payslip-line">
                <span>{l}</span>
                <b style={{ color: v > 0 ? "var(--imp-bg)" : "var(--color-ink-faint)" }}>−฿{v.toLocaleString()}</b>
              </div>
            ))}
            <div className="payslip-line payslip-total">
              <span>Subtotal</span>
              <b style={{ color: "var(--imp-bg)" }}>−฿{ded.toLocaleString()}</b>
            </div>
          </div>

          <div className="payslip-section">
            <div className="payslip-section-head">Disbursement</div>
            <KV k="Bank"          v="Kasikorn Bank · 0123-•••-678"/>
            <KV k="Pay date"      v="31 May 2026"/>
            <KV k="Method"        v="Direct deposit · ACH"/>
            <KV k="Reference"     v={`PAY-${slip.m.replace(/\s/g, "").toUpperCase()}-204`}/>
          </div>

          <div className="payslip-section">
            <div className="payslip-section-head">YTD running totals</div>
            <KV k="Gross YTD"     v="฿165,775"/>
            <KV k="Tax YTD"       v="฿5,375"/>
            <KV k="Social YTD"    v="฿3,750"/>
            <KV k="PF YTD"        v="฿7,125 (employee) + ฿7,125 (employer)"/>
          </div>
        </div>
        <footer className="drawer-foot">
          <button className="ghost-btn" onClick={() => toast({ msg: "Reporting issue to HR" })}>Report issue</button>
          <div style={{ flex: 1 }}/>
          <button className="ghost-btn" onClick={onClose}>Close</button>
          <button className="primary-btn" onClick={() => toast({ kind: "success", msg: `${slip.m} payslip downloaded` })}><I.download/> Download PDF</button>
        </footer>
      </aside>
    </>
  );
}

/* ── HR Admin · Run Payroll flow ───────────────────────────────── */
const PAYROLL_DIFFS = [
  { who: "Somchai K.", iv: "SK", avBg: "#1FA8A0", change: "+฿1,500 OT",         reason: "5h OT on coverage gap days",   flag: null },
  { who: "Somsri P.",  iv: "SP", avBg: "#E08864", change: "+฿0",                reason: "Standard month",                flag: null },
  { who: "Panji Dwi",  iv: "PD", avBg: "#5B6CE0", change: "+฿8,200 (new hire)", reason: "Pro-rated from 15 Mar · PT × 6 weeks", flag: "review" },
  { who: "Anan S.",    iv: "AS", avBg: "#9333EA", change: "−฿2,400",            reason: "1.5 days unpaid leave",         flag: "review" },
  { who: "Mali T.",    iv: "MT", avBg: "#2F8A6B", change: "+฿700",              reason: "Position allowance",            flag: null },
  { who: "Krit J.",    iv: "KJ", avBg: "#5A6A7E", change: "+฿4,200 OT",         reason: "Night shift bonus 16–23",       flag: "anomaly" },
];

function PayrollRunScreen({ toast, onNav }) {
  const [step, setStep] = useState(1);
  const [acked, setAcked] = useState(new Set());
  const steps = [
    { n: 1, label: "Lock",      sub: "Close period" },
    { n: 2, label: "Variance",  sub: "Review diffs" },
    { n: 3, label: "Approve",   sub: "Final review" },
    { n: 4, label: "Disburse",  sub: "Send to bank" },
  ];
  const flagged = PAYROLL_DIFFS.filter(d => d.flag);
  const canNext = step !== 2 || acked.size >= flagged.length;

  return (
    <div className="screen">
      <PageHeader
        eyebrow="C-04 · PAYROLL · MAY 2026"
        title={<>Run payroll <em>·</em> 248 employees</>}
        sub="Period 1 May → 31 May · disbursement on 31 May · 09:00"
        actions={<button className="ghost-btn" onClick={() => onNav("payslips")}>Save & exit</button>}
      />

      <div className="wizard-steps">
        {steps.map((s, i) => {
          const state = step === s.n ? "current" : step > s.n ? "done" : "todo";
          return (
            <button key={s.n} className={"wiz-step is-" + state} onClick={() => setStep(s.n)}>
              <span className="wiz-step-num">{step > s.n ? <I.check/> : s.n}</span>
              <div>
                <div className="wiz-step-lbl">{s.label}</div>
                <div className="wiz-step-sub">{s.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="card">
        {step === 1 && (
          <div className="form-pane">
            <div className="form-eyebrow">A · LOCK PERIOD</div>
            <div className="form-title">Close timesheet collection</div>
            <div className="stat-row">
              <StatCard eyebrow="Period" value="May 2026" sub="1 May → 31 May"/>
              <StatCard eyebrow="Timesheets" value="248 / 248" sub="100% submitted" accent="var(--save)"/>
              <StatCard eyebrow="Pending corrections" value="2" sub="Mali · Krit · awaiting SPD" accent="var(--imp-bg)"/>
              <StatCard eyebrow="Total hours" value="42,840" sub="+128 vs last month"/>
            </div>
            <div className="form-callout">
              <div className="form-callout-eyebrow">After locking</div>
              <div>· Timesheets become read-only for managers and employees</div>
              <div>· Two outstanding correction requests will be flagged in variance review</div>
              <div>· Audit log entry: <b>"Period locked by {`{`}you{`}`}"</b></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-pane">
            <div className="form-eyebrow">B · VARIANCE</div>
            <div className="form-title">Acknowledge each anomaly · {acked.size}/{flagged.length} reviewed</div>
            <table className="data-table">
              <thead>
                <tr><th>Employee</th><th>Change</th><th>Reason</th><th>Flag</th><th></th></tr>
              </thead>
              <tbody>
                {PAYROLL_DIFFS.map((d, i) => {
                  const isAcked = acked.has(i);
                  return (
                    <tr key={i} className={isAcked ? "approval-row is-approved" : ""}>
                      <td>
                        <div className="inline-emp">
                          <span className="inline-emp-av" style={{ background: d.avBg }}>{d.iv}</span>
                          <b>{d.who}</b>
                        </div>
                      </td>
                      <td className="num"><b>{d.change}</b></td>
                      <td className="mono-sm">{d.reason}</td>
                      <td>
                        {d.flag === "anomaly" && <span className="humi-tag humi-tag--coral">Anomaly</span>}
                        {d.flag === "review"  && <span className="humi-tag humi-tag--amber">Review</span>}
                        {!d.flag             && <span className="humi-tag humi-tag--mint">OK</span>}
                      </td>
                      <td>
                        {d.flag ? (
                          isAcked ? (
                            <button className="mini-btn ghost" onClick={() => setAcked(s => { const n = new Set(s); n.delete(i); return n; })}><I.undo/> Reopen</button>
                          ) : (
                            <button className="mini-btn approve" onClick={() => setAcked(s => new Set(s).add(i))}><I.check/> Acknowledge</button>
                          )
                        ) : <span className="mono-sm" style={{ color: "var(--color-ink-faint)" }}>auto-ok</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {acked.size < flagged.length && (
              <div className="form-callout" style={{ background: "#FEF3C7", borderColor: "#EBD58A", color: "#6B4E14" }}>
                <div className="form-callout-eyebrow" style={{ color: "#6B4E14" }}>Required before next step</div>
                <div>Acknowledge all {flagged.length} flagged rows — review reasons and confirm they're expected.</div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="form-pane">
            <div className="form-eyebrow">C · APPROVE</div>
            <div className="form-title">Final review before disbursement</div>
            <div className="stat-row">
              <StatCard eyebrow="Total gross"   value="฿7,184,250" sub="248 employees"/>
              <StatCard eyebrow="Total tax"     value="฿412,840"   sub="ภ.ง.ด.91"/>
              <StatCard eyebrow="Total PF"      value="฿359,212"   sub="5% + 5%"/>
              <StatCard eyebrow="Total nett"    value="฿6,412,198" sub="To 248 accounts" accent="var(--save)"/>
            </div>
            <div className="review-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div className="review-section-head">Period summary</div>
                <KV k="Period"          v="1 May 2026 → 31 May 2026"/>
                <KV k="Pay date"        v="31 May 2026 · 09:00"/>
                <KV k="Cycle"           v="Monthly · last working day"/>
                <KV k="Working days"    v="22"/>
                <KV k="Total hours"     v="42,840 (incl. 624 OT)"/>
              </div>
              <div>
                <div className="review-section-head">Approval chain</div>
                <div className="pipe-step done"><span className="pipe-num"><I.check/></span>You · HR Admin</div>
                <div className="pipe-step"><span className="pipe-num">2</span>CFO sign-off (auto-routed)</div>
                <div className="pipe-step"><span className="pipe-num">3</span>Bank file generated · KBank ACH</div>
                <div className="pipe-step"><span className="pipe-num">4</span>Disbursement 31 May 09:00</div>
                <div className="pipe-step"><span className="pipe-num">5</span>Payslips released to employees</div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-pane" style={{ alignItems: "center", textAlign: "center", padding: "60px 24px" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--color-accent-soft)", color: "var(--save)", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="form-eyebrow">D · DISBURSED</div>
            <h2 className="form-title" style={{ fontSize: 26 }}>Payroll sent to bank</h2>
            <p style={{ color: "var(--color-ink-muted)", fontSize: 13.5, maxWidth: 460 }}>
              KBank ACH file <code>PAYRUN-2026-05-248.csv</code> queued for 31 May 09:00. Payslips will release to employees at the same time. Audit log entry recorded.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <button className="ghost-btn" onClick={() => onNav("audit")}>View audit log</button>
              <button className="primary-btn" onClick={() => onNav("payslips")}>Done</button>
            </div>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="wizard-foot">
          {step > 1 && <button className="ghost-btn" onClick={() => setStep(step - 1)}><I.chevL/> Back</button>}
          <div style={{ flex: 1 }}/>
          <button
            className="primary-btn"
            disabled={!canNext}
            style={!canNext ? { opacity: .45, cursor: "not-allowed" } : undefined}
            onClick={() => {
              if (!canNext) return;
              if (step === 1) toast({ kind: "success", msg: "Period locked · timesheets now read-only" });
              if (step === 2) toast({ kind: "success", msg: `${flagged.length} variances acknowledged` });
              if (step === 3) toast({ kind: "success", msg: "Payroll approved · ACH file generated" });
              setStep(step + 1);
            }}
          >
            {step === 1 && <>Lock period <I.chevR/></>}
            {step === 2 && <>Continue to approval <I.chevR/></>}
            {step === 3 && <><I.check/> Approve & disburse</>}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Hire Wizard · 3-cluster Who/Job/Review with collapsible sections ── */
function HireSection({ id, icon, titleTh, titleEn, sub, collapsed, onToggle, isValid, children }) {
  return (
    <section className="hire-section">
      <button type="button" className="hire-section-head" onClick={onToggle}>
        <span className="hire-section-ico">{icon}</span>
        <div className="hire-section-titles">
          <div className="hire-section-title-th">{titleTh}</div>
          {titleEn && <div className="hire-section-title-en">{titleEn}</div>}
          {sub && <div className="hire-section-sub">{sub}</div>}
        </div>
        {isValid && <span className="hire-section-check"><I.check/></span>}
        <span className={"hire-section-chev" + (collapsed ? "" : " is-open")}><I.caretDn/></span>
      </button>
      {!collapsed && <div className="hire-section-body">{children}</div>}
    </section>
  );
}

function HireField({ label, placeholder, required, optional, readOnly, hint, warning, value, onChange, type = "text", full }) {
  return (
    <div className={"hire-field" + (full ? " is-full" : "")}>
      <label>
        {label}
        {required && <span className="hire-required">*</span>}
        {optional && <span className="hire-optional">optional</span>}
      </label>
      <input
        type={type}
        className={"hire-input" + (readOnly ? " is-readonly" : "")}
        placeholder={placeholder}
        value={value || ""}
        onChange={e => onChange && onChange(e.target.value)}
        readOnly={readOnly}
      />
      {warning && <div className="hire-warning">⚠ {warning}</div>}
      {hint && !warning && <div className="hire-hint">{hint}</div>}
    </div>
  );
}
function HireSelect({ label, required, options, value, onChange, hint, full }) {
  return (
    <div className={"hire-field" + (full ? " is-full" : "")}>
      <label>{label}{required && <span className="hire-required">*</span>}</label>
      <select className="hire-input" value={value || ""} onChange={e => onChange && onChange(e.target.value)}>
        <option value="">— เลือก —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {hint && <div className="hire-hint">{hint}</div>}
    </div>
  );
}
function HireReadOnly({ label, value, hint }) {
  return (
    <div className="hire-field">
      <label>{label} <span className="hire-optional">({hint || "ระบบสร้างให้อัตโนมัติ"})</span></label>
      <div className="hire-readonly-val">{value}</div>
    </div>
  );
}

function HireWizard({ toast, onNav }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    hireDate: "2026-06-15",
    prevId: "",
    company: "CEN — Central Retail Corporation",
    eventReason: "NEW_HIRE — จ้างใหม่",
    salutationEn: "Ms.",
    firstNameEn: "", middleNameEn: "", lastNameEn: "",
    dob: "1995-03-14",
    salutationTh: "นางสาว",
    firstNameTh: "", lastNameTh: "", nickname: "",
    natIdType: "NATIONAL_ID — บัตรประชาชนไทย",
    natIdCountry: "TH — ไทย",
    natId: "",
    isPrimary: "YES — บัตรหลัก",
    gender: "",
    phone: "", email: "", address: "",
    emergencyName: "", emergencyRelation: "", emergencyPhone: "",
    nationality: "TH — ไทย",
    language: "TH — ไทย",
    employeeClass: "",
    position: "",
    businessUnit: "",
    branch: "",
    hrZone: "",
    directManager: "",
    baseSalary: "",
    payFrequency: "MONTHLY — รายเดือน",
    bonusTier: "",
    benefitTier: "",
    probation: "120 — 120 วัน",
    hrbp: "",
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const [collapsed, setCollapsed] = useState({
    "who.identity": false, "who.biographical": true, "who.contact": true,
    "who.emergencyContacts": true, "who.globalInfo": true,
    "job.employeeInfo": false, "job.assignment": true, "job.compensation": true,
  });
  const toggle = (id) => setCollapsed(s => ({ ...s, [id]: !s[id] }));

  // simple validity
  const v = {
    identity: data.hireDate && data.firstNameEn && data.lastNameEn && data.dob,
    biographical: data.firstNameTh && data.lastNameTh && data.natId && data.gender,
    contact: data.phone && data.email,
    emergencyContacts: data.emergencyName && data.emergencyPhone,
    globalInfo: data.nationality,
    employeeInfo: data.employeeClass,
    job: data.position && data.businessUnit && data.branch,
    compensation: data.baseSalary && data.bonusTier && data.benefitTier,
  };

  const today = new Date().toISOString().slice(0, 10);

  const STEPS = [
    { n: 1, labelTh: "ข้อมูลบุคคล",     descTh: "ตัวตน · ชื่อ · บัตรประชาชน · ติดต่อ" },
    { n: 2, labelTh: "ข้อมูลงาน",        descTh: "การจ้างงาน · ตำแหน่ง · ค่าตอบแทน" },
    { n: 3, labelTh: "ตรวจสอบและส่ง",  descTh: "ยืนยัน · เลือก HRBP · สรุปก่อนส่ง" },
  ];

  return (
    <div className="screen">
      <PageHeader
        eyebrow="HR · HIRE · เพิ่มพนักงานใหม่"
        title={<>เพิ่มพนักงานใหม่ <em>·</em> ขั้นตอนที่ {step} จาก 3</>}
        sub={STEPS[step - 1].descTh}
        actions={<button className="ghost-btn" onClick={() => onNav("employees")}>บันทึกแล้วออก</button>}
      />

      <div className="wizard-steps">
        {STEPS.map((s) => {
          const state = step === s.n ? "current" : step > s.n ? "done" : "todo";
          return (
            <button key={s.n} className={"wiz-step is-" + state} onClick={() => setStep(s.n)}>
              <span className="wiz-step-num">{step > s.n ? <I.check/> : s.n}</span>
              <div>
                <div className="wiz-step-lbl">{s.labelTh}</div>
                <div className="wiz-step-sub">{s.descTh}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── STEP 1 · WHO ── */}
      {step === 1 && (
        <div className="hire-sections">
          <HireSection id="who.identity" icon={<I.user/>} titleTh="ระบุตัวตน" titleEn="Identity"
            sub="วันที่เริ่มงาน · บริษัท · ชื่อภาษาอังกฤษ · วันเกิด"
            collapsed={collapsed["who.identity"]} onToggle={() => toggle("who.identity")} isValid={v.identity}>
            <div className="hire-prev-id">
              <HireField
                label="รหัสพนักงานเดิม (DVT)"
                placeholder="กรอกหากเคยทำงานในเครือ (รับ rehire / ฝึกงาน)"
                optional
                value={data.prevId}
                onChange={x => set("prevId", x)}
                hint="ใช้สำหรับ rehire หรือเคยฝึกงาน — ระบบจะดึงประวัติเดิมมาใช้อัตโนมัติ"
                full
              />
            </div>
            <div className="hire-grid">
              <HireField label="วันที่เริ่มงาน / Hire Date" type="date" required value={data.hireDate} onChange={x => set("hireDate", x)}
                warning={data.hireDate > today ? "วันที่เริ่มงานล่วงหน้า — ต้อง SPD อนุมัติก่อนใช้งาน" : null}/>
              <HireSelect label="บริษัท / Company" required value={data.company} onChange={x => set("company", x)}
                options={["CEN — Central Retail Corporation","TOPS — Tops Online","PWB — Power Buy","RBS — Robinson"]}/>
              <HireSelect label="เหตุผลการจ้าง / Event Reason" required value={data.eventReason} onChange={x => set("eventReason", x)}
                options={["NEW_HIRE — จ้างใหม่","REHIRE — จ้างกลับ","TRANSFER_IN — โอนย้ายเข้า","CONVERSION — เปลี่ยนสถานะ"]}/>
              <HireSelect label="คำนำหน้า (EN) / Salutation" required value={data.salutationEn} onChange={x => set("salutationEn", x)}
                options={["Mr.","Ms.","Mrs.","Dr."]}/>
              <HireField label="ชื่อ (EN) / First Name" placeholder="First name" required value={data.firstNameEn} onChange={x => set("firstNameEn", x)}/>
              <HireField label="ชื่อกลาง (EN) / Middle Name" placeholder="Middle name" optional value={data.middleNameEn} onChange={x => set("middleNameEn", x)}/>
              <HireField label="นามสกุล (EN) / Last Name" placeholder="Last name" required value={data.lastNameEn} onChange={x => set("lastNameEn", x)}/>
              <HireField label="วันเกิด / Date of Birth" type="date" required value={data.dob} onChange={x => set("dob", x)}
                hint={`อายุ: ${data.dob ? (new Date().getFullYear() - parseInt(data.dob.slice(0,4))) : "—"} ปี`}/>
            </div>
          </HireSection>

          <HireSection id="who.biographical" icon={<I.user/>} titleTh="ข้อมูลส่วนตัว" titleEn="Biographical"
            sub="รหัสพนักงาน · บัตรประชาชน · เพศ · ชื่อภาษาไทย"
            collapsed={collapsed["who.biographical"]} onToggle={() => toggle("who.biographical")} isValid={v.biographical}>
            <div className="hire-grid">
              <HireReadOnly label="รหัสพนักงาน / Employee ID" value="สร้างหลัง Submit"/>
              <HireSelect label="คำนำหน้า (ไทย)" required value={data.salutationTh} onChange={x => set("salutationTh", x)}
                options={["นาย","นาง","นางสาว","ดร."]}/>
              <HireField label="ชื่อ (ไทย)" placeholder="ชื่อจริง" required value={data.firstNameTh} onChange={x => set("firstNameTh", x)}/>
              <HireField label="นามสกุล (ไทย)" placeholder="นามสกุล" required value={data.lastNameTh} onChange={x => set("lastNameTh", x)}/>
              <HireField label="ชื่อเล่น / Nickname" placeholder="ชื่อเล่น" optional value={data.nickname} onChange={x => set("nickname", x)}/>
              <HireSelect label="เพศ / Gender" required value={data.gender} onChange={x => set("gender", x)}
                options={["MALE — ชาย","FEMALE — หญิง","OTHER — อื่นๆ"]}/>
              <HireSelect label="ประเภทบัตร / National ID Card Type" required value={data.natIdType} onChange={x => set("natIdType", x)}
                options={["NATIONAL_ID — บัตรประชาชนไทย","PASSPORT — หนังสือเดินทาง","WORK_PERMIT — ใบอนุญาตทำงาน"]}/>
              <HireSelect label="ประเทศที่ออกบัตร" required value={data.natIdCountry} onChange={x => set("natIdCountry", x)}
                options={["TH — ไทย","KH — กัมพูชา","MM — เมียนมา","LA — ลาว","อื่นๆ…"]}/>
              <HireField label="เลขบัตรประชาชน / National ID" placeholder="X-XXXX-XXXXX-XX-X" required
                value={data.natId} onChange={x => set("natId", x)}
                hint="ตรวจสอบ mod-11 อัตโนมัติเมื่อเป็นบัตรไทย"/>
              <HireSelect label="บัตรหลัก / Is Primary" required value={data.isPrimary} onChange={x => set("isPrimary", x)}
                options={["YES — บัตรหลัก","NO — บัตรรอง"]}
                hint="ตั้ง YES เมื่อทำงานบริษัทเดียว · NO หาก dual-employment"/>
            </div>
          </HireSection>

          <HireSection id="who.contact" icon={<I.user/>} titleTh="ข้อมูลติดต่อ" titleEn="Contact"
            sub="โทรศัพท์ · อีเมล · ที่อยู่"
            collapsed={collapsed["who.contact"]} onToggle={() => toggle("who.contact")} isValid={v.contact}>
            <div className="hire-grid">
              <HireField label="เบอร์โทรศัพท์ / Phone" placeholder="+66 8X XXX XXXX" required value={data.phone} onChange={x => set("phone", x)}/>
              <HireField label="อีเมลส่วนตัว / Personal Email" type="email" placeholder="name@example.com" required value={data.email} onChange={x => set("email", x)}/>
              <HireField label="ที่อยู่ปัจจุบัน / Current Address" placeholder="บ้านเลขที่ · ถนน · ตำบล · อำเภอ · จังหวัด · รหัสไปรษณีย์" required value={data.address} onChange={x => set("address", x)} full/>
            </div>
          </HireSection>

          <HireSection id="who.emergencyContacts" icon={<I.user/>} titleTh="ผู้ติดต่อฉุกเฉิน" titleEn="Emergency Contacts"
            sub="อย่างน้อย 1 คน"
            collapsed={collapsed["who.emergencyContacts"]} onToggle={() => toggle("who.emergencyContacts")} isValid={v.emergencyContacts}>
            <div className="hire-grid">
              <HireField label="ชื่อ-นามสกุล" placeholder="ชื่อเต็ม" required value={data.emergencyName} onChange={x => set("emergencyName", x)}/>
              <HireSelect label="ความสัมพันธ์" required value={data.emergencyRelation} onChange={x => set("emergencyRelation", x)}
                options={["FATHER — บิดา","MOTHER — มารดา","SPOUSE — คู่สมรส","SIBLING — พี่/น้อง","FRIEND — เพื่อน","OTHER — อื่นๆ"]}/>
              <HireField label="เบอร์โทรศัพท์" placeholder="+66 8X XXX XXXX" required value={data.emergencyPhone} onChange={x => set("emergencyPhone", x)}/>
            </div>
          </HireSection>

          <HireSection id="who.globalInfo" icon={<I.user/>} titleTh="ข้อมูลทั่วไป" titleEn="Global Info"
            sub="สัญชาติ · ภาษา"
            collapsed={collapsed["who.globalInfo"]} onToggle={() => toggle("who.globalInfo")} isValid={v.globalInfo}>
            <div className="hire-grid">
              <HireSelect label="สัญชาติ / Nationality" required value={data.nationality} onChange={x => set("nationality", x)}
                options={["TH — ไทย","KH — กัมพูชา","MM — เมียนมา","LA — ลาว","JP — ญี่ปุ่น","KR — เกาหลีใต้","อื่นๆ…"]}/>
              <HireSelect label="ภาษาหลัก / Primary Language" value={data.language} onChange={x => set("language", x)}
                options={["TH — ไทย","EN — อังกฤษ","JP — ญี่ปุ่น","KR — เกาหลี"]}/>
            </div>
          </HireSection>
        </div>
      )}

      {/* ── STEP 2 · JOB ── */}
      {step === 2 && (
        <div className="hire-sections">
          <HireSection id="job.employeeInfo" icon={<I.user/>} titleTh="ประเภทการจ้างงาน" titleEn="Employee Class"
            sub="กำหนดระดับและประเภทพนักงาน"
            collapsed={collapsed["job.employeeInfo"]} onToggle={() => toggle("job.employeeInfo")} isValid={v.employeeInfo}>
            <div className="hire-grid">
              <HireReadOnly label="รหัสพนักงาน" value="สร้างหลัง Submit"/>
              <HireSelect label="Employee Class" required value={data.employeeClass} onChange={x => set("employeeClass", x)} options={[
                "A — Executive","B — Senior Management","C — Management","D — Officer",
                "E — Operations","F — Part-time","G — Contract","H — Intern"
              ]}/>
            </div>
          </HireSection>

          <HireSection id="job.assignment" icon={<I.team/>} titleTh="ตำแหน่งและสังกัด" titleEn="Assignment"
            sub="ตำแหน่ง · หน่วยธุรกิจ · สาขา · เขต HR"
            collapsed={collapsed["job.assignment"]} onToggle={() => toggle("job.assignment")} isValid={v.job}>
            <div className="hire-grid">
              <HireField label="ตำแหน่งงาน" placeholder="ค้นหาตำแหน่ง…" required value={data.position} onChange={x => set("position", x)}/>
              <HireField label="หน่วยธุรกิจ" placeholder="CEN / TOPS / Power Buy …" required value={data.businessUnit} onChange={x => set("businessUnit", x)}/>
              <HireField label="สาขา/หน่วยงาน" placeholder="ทองหล่อ" required value={data.branch} onChange={x => set("branch", x)}/>
              <HireField label="เขต HR" placeholder="กรุงเทพฯ ตอนกลาง" value={data.hrZone} onChange={x => set("hrZone", x)}/>
              <HireField label="Direct Manager" placeholder="ระบบดึงจากตำแหน่ง" optional value={data.directManager} onChange={x => set("directManager", x)}/>
            </div>
          </HireSection>

          <HireSection id="job.compensation" icon={<I.payslip/>} titleTh="ค่าตอบแทน" titleEn="Compensation"
            sub="เงินเดือน · โบนัส · สวัสดิการ · ทดลองงาน"
            collapsed={collapsed["job.compensation"]} onToggle={() => toggle("job.compensation")} isValid={v.compensation}>
            <div className="hire-grid">
              <HireField label="เงินเดือนเริ่มต้น (THB)" placeholder="22,500" required value={data.baseSalary} onChange={x => set("baseSalary", x)}/>
              <HireSelect label="รอบจ่ายเงินเดือน" required value={data.payFrequency} onChange={x => set("payFrequency", x)}
                options={["MONTHLY — รายเดือน","BIWEEKLY — สองสัปดาห์","WEEKLY — รายสัปดาห์"]}/>
              <HireSelect label="ระดับโบนัส / Bonus Tier" required value={data.bonusTier} onChange={x => set("bonusTier", x)}
                options={["A — 1.5× target","B — 1.2× target","C — 1.0× target","NONE — ไม่มี"]}/>
              <HireSelect label="ระดับสวัสดิการ / Benefit Tier" required value={data.benefitTier} onChange={x => set("benefitTier", x)}
                options={["Tier A — Mgmt","Tier B — FT","Tier C — PT","Tier D — Intern"]}/>
              <HireSelect label="ทดลองงาน / Probation Period" value={data.probation} onChange={x => set("probation", x)}
                options={["90 — 90 วัน","120 — 120 วัน","180 — 180 วัน","NONE — ไม่มี"]}/>
            </div>
            <div className="form-callout">
              <div className="form-callout-eyebrow">คำนวณอัตโนมัติ</div>
              <div>กองทุนสำรอง 5% นายจ้าง + 5% ลูกจ้าง · ฿{Math.round((parseInt((data.baseSalary || "0").replace(/,/g, "")) || 0) * 0.05).toLocaleString()}/เดือน</div>
              <div>เงินเดือนงวดแรก · 30 มิ.ย. 2569 (คำนวณตามวันทำงาน)</div>
              <div>ประกันสุขภาพ {data.benefitTier || "—"} เริ่มมีผล {data.hireDate}</div>
            </div>
          </HireSection>
        </div>
      )}

      {/* ── STEP 3 · REVIEW ── */}
      {step === 3 && (
        <div className="hire-sections">
          <section className="hire-section">
            <div className="hire-section-head" style={{ cursor: "default" }}>
              <span className="hire-section-ico"><I.user/></span>
              <div className="hire-section-titles">
                <div className="hire-section-title-th">ชื่อ-นามสกุลภาษาอังกฤษ</div>
                <div className="hire-section-title-en">English Name (read-only)</div>
                <div className="hire-section-sub">ยืนยันก่อนส่งอนุมัติ · ดึงจาก Cluster 1</div>
              </div>
            </div>
            <div className="hire-section-body">
              <div className="hire-grid">
                <HireField label="คำนำหน้า (EN)" value={data.salutationEn} readOnly/>
                <HireField label="ชื่อ (EN)" value={data.firstNameEn} readOnly/>
                <HireField label="ชื่อกลาง (EN)" value={data.middleNameEn} readOnly/>
                <HireField label="นามสกุล (EN)" value={data.lastNameEn} readOnly/>
              </div>
            </div>
          </section>

          <section className="hire-section">
            <div className="hire-section-head" style={{ cursor: "default" }}>
              <span className="hire-section-ico"><I.approve/></span>
              <div className="hire-section-titles">
                <div className="hire-section-title-th">อนุมัติโดย Direct Manager + HRBP</div>
                <div className="hire-section-title-en">Approval Routing</div>
                <div className="hire-section-sub">Direct Manager ดึงจากตำแหน่งใน Cluster 2 · เลือก HRBP ที่จะรับการแจ้งเตือน</div>
              </div>
            </div>
            <div className="hire-section-body">
              <div className="hire-grid">
                <HireField label="Direct Manager (Approver)" required
                  value={data.directManager || "ยังไม่ได้เลือก — กรุณาเลือกตำแหน่งใน Cluster 2"}
                  readOnly hint="ระบบดึงอัตโนมัติจากตำแหน่งที่เลือก"/>
                <HireSelect label="HRBP (Notifier)" required value={data.hrbp} onChange={x => set("hrbp", x)}
                  options={["Anan S. — HR Admin","Wichai R. — HRIS","Nat L. — SPD"]}/>
              </div>
            </div>
          </section>

          <section className="hire-section">
            <div className="hire-section-head" style={{ cursor: "default" }}>
              <span className="hire-section-ico"><I.doc/></span>
              <div className="hire-section-titles">
                <div className="hire-section-title-th">สรุปข้อมูลก่อนส่ง</div>
                <div className="hire-section-title-en">Summary</div>
                <div className="hire-section-sub">ตรวจสอบความครบถ้วนของทุกหัวข้อ</div>
              </div>
            </div>
            <div className="hire-section-body" style={{ padding: 0 }}>
              {[
                ["วันที่เริ่มงาน", data.hireDate, !!data.hireDate],
                ["บริษัท", data.company, !!data.company],
                ["เหตุผลการจ้าง", data.eventReason, !!data.eventReason],
                ["คำนำหน้า (EN)", data.salutationEn, !!data.salutationEn],
                ["ชื่อ-นามสกุล (EN)", [data.firstNameEn, data.middleNameEn, data.lastNameEn].filter(Boolean).join(" ") || "—", !!(data.firstNameEn && data.lastNameEn)],
                ["วันเกิด", data.dob, !!data.dob],
                ["รหัสพนักงาน", "สร้างหลัง Submit", true],
                ["ประเภทบัตร", data.natIdType, !!data.natIdType],
                ["เลขบัตรประชาชน", data.natId || "—", !!data.natId],
                ["ประเทศที่ออกบัตร", data.natIdCountry, !!data.natIdCountry],
                ["บัตรหลัก", data.isPrimary, !!data.isPrimary],
                ["คำนำหน้า (ไทย)", data.salutationTh, !!data.salutationTh],
                ["ชื่อ-นามสกุล (ไทย)", [data.firstNameTh, data.lastNameTh].filter(Boolean).join(" ") || "—", !!(data.firstNameTh && data.lastNameTh)],
                ["ชื่อเล่น", data.nickname || "—", true],
                ["เพศ", data.gender || "—", !!data.gender],
                ["โทรศัพท์", data.phone || "—", !!data.phone],
                ["อีเมล", data.email || "—", !!data.email],
                ["ที่อยู่", data.address || "—", !!data.address],
                ["ผู้ติดต่อฉุกเฉิน", data.emergencyName ? `${data.emergencyName} (${data.emergencyRelation}) · ${data.emergencyPhone}` : "—", !!(data.emergencyName && data.emergencyPhone)],
                ["สัญชาติ", data.nationality, !!data.nationality],
                ["Employee Class", data.employeeClass || "—", !!data.employeeClass],
                ["ตำแหน่งงาน", data.position || "—", !!data.position],
                ["หน่วยธุรกิจ", data.businessUnit || "—", !!data.businessUnit],
                ["สาขา/หน่วยงาน", data.branch || "—", !!data.branch],
                ["เงินเดือน", data.baseSalary ? `฿${data.baseSalary}/เดือน` : "—", !!data.baseSalary],
                ["ระดับโบนัส", data.bonusTier || "—", !!data.bonusTier],
                ["ระดับสวัสดิการ", data.benefitTier || "—", !!data.benefitTier],
                ["ทดลองงาน", data.probation, !!data.probation],
                ["HRBP", data.hrbp || "—", !!data.hrbp],
              ].map(([label, value, ok], i) => (
                <div key={i} className="hire-summary-row">
                  <span className={"hire-summary-pip" + (ok ? " is-ok" : "")}>{ok ? <I.check/> : "·"}</span>
                  <span className="hire-summary-label">{label}</span>
                  <span className={"hire-summary-value" + (ok ? "" : " is-missing")}>{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="wizard-foot">
        {step > 1 && <button className="ghost-btn" onClick={() => setStep(step - 1)}><I.chevL/> ย้อนกลับ</button>}
        <div style={{ flex: 1 }}/>
        <span className="hire-foot-hint">กรอกข้อมูลที่จำเป็นให้ครบก่อนดำเนินการต่อ</span>
        {step < 3 && <button className="primary-btn" onClick={() => setStep(step + 1)}>ถัดไป <I.chevR/></button>}
        {step === 3 && (
          <button className="primary-btn" onClick={() => {
            onNav("employees");
            toast({ kind: "success", msg: `เพิ่มพนักงาน ${data.firstNameTh} ${data.lastNameTh} เรียบร้อย`, detail: `เริ่มงาน ${data.hireDate} · ส่งไปยัง ${data.hrbp || "HRBP"} อนุมัติ` });
          }}><I.check/> ส่งอนุมัติ</button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, prefix, full }) {
  return (
    <div className={"text-field" + (full ? " is-full" : "")}>
      <label>{label}</label>
      <div className={"text-input-wrap" + (prefix ? " has-prefix" : "")}>
        {prefix && <span className="text-prefix">{prefix}</span>}
        <input type="text" value={value} onChange={e => onChange(e.target.value)}/>
      </div>
    </div>
  );
}
function SelectField({ label, value, options, onChange }) {
  return (
    <div className="text-field">
      <label>{label}</label>
      <div className="text-input-wrap">
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

/* ── Onboarding checklist (Day 1 → 90) ─────────────────────────── */
const ONBOARDING_INITIAL = [
  { phase: "Day 1",   tasks: [
    { id: "o1", t: "Sign employment contract",       owner: "Employee",   due: "1 Jun" },
    { id: "o2", t: "Submit ID + bank account",       owner: "Employee",   due: "1 Jun" },
    { id: "o3", t: "Receive uniform + name badge",   owner: "Manager",    due: "1 Jun", done: true },
    { id: "o4", t: "Office + facility tour",         owner: "Manager",    due: "1 Jun" },
    { id: "o5", t: "Issue laptop + LINE OA access",  owner: "HRIS",       due: "1 Jun", done: true },
  ]},
  { phase: "Week 1",  tasks: [
    { id: "o6", t: "Complete e-learning · Code of Conduct", owner: "Employee", due: "7 Jun" },
    { id: "o7", t: "POS system training",                   owner: "Manager",  due: "7 Jun" },
    { id: "o8", t: "Meet 1:1 with manager",                 owner: "Manager",  due: "5 Jun" },
    { id: "o9", t: "Set Q1 goals (2-3 objectives)",         owner: "Employee", due: "7 Jun" },
  ]},
  { phase: "Day 30",  tasks: [
    { id: "o10", t: "Shadow shift lead × 5 shifts",   owner: "Manager",  due: "30 Jun" },
    { id: "o11", t: "Health insurance enrollment",    owner: "HR Admin", due: "30 Jun" },
    { id: "o12", t: "First performance check-in",     owner: "Manager",  due: "1 Jul" },
    { id: "o13", t: "Food safety certification",      owner: "Employee", due: "30 Jun" },
  ]},
  { phase: "Day 90",  tasks: [
    { id: "o14", t: "Mid-probation review meeting",   owner: "Manager",  due: "31 Aug" },
    { id: "o15", t: "Customer service evaluation",    owner: "Manager",  due: "31 Aug" },
    { id: "o16", t: "Self-assessment submission",     owner: "Employee", due: "28 Aug" },
  ]},
];

function OnboardingScreen({ toast }) {
  const [phases, setPhases] = useState(ONBOARDING_INITIAL);
  const toggle = (taskId) => {
    setPhases(phs => phs.map(p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t),
    })));
  };
  const all = phases.flatMap(p => p.tasks);
  const done = all.filter(t => t.done).length;
  const pct = Math.round((done / all.length) * 100);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="HR · ONBOARDING"
        title={<>Naree's onboarding plan</>}
        sub="Cashier · FOH · started 1 Jun 2026 · probation ends 28 Sep"
        actions={
          <div className="onboard-progress">
            <div className="onboard-progress-num">{done} / {all.length}</div>
            <div className="onboard-progress-bar"><span style={{ width: pct + "%" }}/></div>
            <div className="onboard-progress-pct">{pct}%</div>
          </div>
        }
      />

      <div className="onboard-grid">
        {phases.map(p => {
          const phaseDone = p.tasks.filter(t => t.done).length;
          return (
            <div key={p.phase} className="card">
              <div className="card-head">
                <div className="card-eyebrow">{p.phase}</div>
                <div className="card-title">{phaseDone} / {p.tasks.length} complete</div>
              </div>
              <div className="card-list">
                {p.tasks.map(t => (
                  <label key={t.id} className={"check-row" + (t.done ? " is-done" : "")}>
                    <input type="checkbox" checked={!!t.done} onChange={() => { toggle(t.id); toast({ msg: `${t.t} ${t.done ? "reopened" : "completed"}` }); }}/>
                    <div className="check-body">
                      <div className="check-title">{t.t}</div>
                      <div className="check-meta"><b>{t.owner}</b> · due {t.due}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Probation review form ────────────────────────────────────── */
const PROBATION_CRITERIA = [
  { id: "p1", label: "Quality of work",        desc: "Accuracy of POS, food prep standards, cleanliness." },
  { id: "p2", label: "Reliability & attendance", desc: "On-time clock-in rate, sick leave usage, shift coverage." },
  { id: "p3", label: "Customer service",       desc: "Net guest feedback, recovery handling, demeanour." },
  { id: "p4", label: "Teamwork",               desc: "Coordination with FOH/BOH, handoffs, peer feedback." },
  { id: "p5", label: "Learning velocity",      desc: "Time to certify, e-learning completion, ramp on new menu." },
];

function ProbationScreen({ toast, onNav }) {
  const [ratings, setRatings] = useState({});
  const [decision, setDecision] = useState(null);  // "pass" | "extend" | "fail"
  const [notes, setNotes] = useState("");
  const setRating = (id, v) => setRatings(r => ({ ...r, [id]: v }));
  const avg = (() => {
    const vals = Object.values(ratings);
    if (vals.length === 0) return null;
    return (vals.reduce((s, n) => s + n, 0) / vals.length).toFixed(1);
  })();
  const complete = Object.keys(ratings).length === PROBATION_CRITERIA.length && decision;

  return (
    <div className="screen">
      <PageHeader
        eyebrow="B-04 · PROBATION REVIEW"
        title="Panji Dwi · 120-day probation"
        sub="Hired 1 Mar 2026 · review due 28 Jun · today is day 84"
        actions={
          <div className="form-stat" style={{ margin: 0 }}>
            <span className="lbl">Average</span> <b style={{ fontSize: 18, marginLeft: 6 }}>{avg ?? "—"}</b>
            <span style={{ color: "var(--color-ink-faint)", fontSize: 11 }}>/ 5</span>
          </div>
        }
      />

      <div className="screen-grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">5 CRITERIA</div>
            <div className="card-title">Rate each criterion</div>
          </div>
          <div className="card-list">
            {PROBATION_CRITERIA.map(c => (
              <div key={c.id} className="prob-row">
                <div className="prob-row-body">
                  <div className="prob-row-label">{c.label}</div>
                  <div className="prob-row-desc">{c.desc}</div>
                </div>
                <div className="prob-row-rating">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      className={"rating-btn" + (ratings[c.id] >= n ? " is-active" : "")}
                      onClick={() => setRating(c.id, n)}
                    >{n}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-eyebrow">DECISION</div>
            <div className="card-title">Outcome</div>
          </div>
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["pass",   "Pass probation",      "Convert to full-time · effective 28 Jun",          "var(--color-accent)"],
              ["extend", "Extend probation",    "Add 30 days · review again 28 Jul",                "var(--color-accent-alt)"],
              ["fail",   "Fail probation",      "End employment · 14-day notice required",          "var(--imp-bg)"],
            ].map(([k, l, sub, c]) => (
              <button
                key={k}
                className={"decision-btn" + (decision === k ? " is-selected" : "")}
                style={decision === k ? { borderColor: c, background: c + "12" } : undefined}
                onClick={() => setDecision(k)}
              >
                <div className="decision-pip" style={{ borderColor: c, background: decision === k ? c : "transparent" }}/>
                <div>
                  <div className="decision-label">{l}</div>
                  <div className="decision-sub">{sub}</div>
                </div>
              </button>
            ))}
            <div className="presets-label" style={{ marginTop: 10 }}>Manager note</div>
            <textarea className="textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes visible to HR…"/>
          </div>
        </div>
      </div>

      <div className="wizard-foot">
        <button className="ghost-btn" onClick={() => onNav("perf")}>Cancel</button>
        <div style={{ flex: 1 }}/>
        <button
          className="primary-btn"
          disabled={!complete}
          style={!complete ? { opacity: .45, cursor: "not-allowed" } : undefined}
          onClick={() => { if (complete) { onNav("perf"); toast({ kind: "success", msg: `Probation review submitted`, detail: `Decision: ${decision} · average ${avg}/5 · sent to HR` }); } }}
        >
          <I.check/> Submit review {complete ? "" : `(${Object.keys(ratings).length}/5 + decision)`}
        </button>
      </div>
    </div>
  );
}

/* ── Approvals queue (live state, persisted in App) ───────────── */
const INITIAL_APPROVALS = [
  { id: "REQ-0204", who: "Somsri P.",  iv: "SP", avBg: "#E08864", type: "Leave swap",     filed: "21 May · 09:14", detail: "Swap 24 May → 25 May",         days: 1, status: "Pending", reason: "Family obligation on 24 May; happy to cover Sunday." },
  { id: "REQ-0203", who: "Mali T.",    iv: "MT", avBg: "#2F8A6B", type: "Late clock-in",  filed: "21 May · 06:18", detail: "06:12 · −12 min · BTS delay", days: 0, status: "Review",  reason: "BTS Sukhumvit delayed 18 min; clock-in app pinged at 06:12." },
  { id: "REQ-0202", who: "Panji Dwi", iv: "PD", avBg: "#5B6CE0", type: "Overtime",       filed: "20 May · 22:04", detail: "+4h on 19 May · ฿1,200",      days: 0, status: "Pending", reason: "Covered Mali T.'s sick shift; 18:00–22:00 on the floor." },
  { id: "REQ-0201", who: "Krit J.",   iv: "KJ", avBg: "#5A6A7E", type: "Sick leave",     filed: "20 May · 07:30", detail: "1 day · 20 May · medical cert", days: 1, status: "Pending", reason: "Fever 38.5°C. Medical certificate attached." },
  { id: "REQ-0200", who: "Mali T.",    iv: "MT", avBg: "#2F8A6B", type: "Shift change",   filed: "19 May · 14:00", detail: "06–14 → 09–17 · 23 May",      days: 0, status: "Pending", reason: "Doctor's appointment 07:30; one-time change." },
  { id: "REQ-0199", who: "Somsri P.",  iv: "SP", avBg: "#E08864", type: "Reimbursement", filed: "18 May · 11:42", detail: "฿420 · staff meal Friday",     days: 0, status: "Pending", reason: "Closing shift meal not provided; receipt attached." },
  { id: "REQ-0198", who: "Anan S.",   iv: "AS", avBg: "#9333EA", type: "Expense",        filed: "17 May · 16:30", detail: "฿2,150 · training materials",  days: 0, status: "Pending", reason: "Whiteboard markers + flipchart for 22 May training." },
];

function statusToTag(status) {
  if (status === "Approved") return "humi-tag--mint";
  if (status === "Rejected") return "humi-tag--coral";
  if (status === "Review")   return "humi-tag--amber";
  return "humi-tag--amber";
}

function ApprovalsScreen({ approvals, onAction, toast }) {
  const [filter, setFilter] = useState("all");
  const [focusId, setFocusId] = useState(null);

  const visible = approvals.filter(a => {
    if (filter === "pending")  return a.status === "Pending" || a.status === "Review";
    if (filter === "approved") return a.status === "Approved";
    if (filter === "rejected") return a.status === "Rejected";
    return true;
  });

  const counts = {
    pending:  approvals.filter(a => a.status === "Pending" || a.status === "Review").length,
    approved: approvals.filter(a => a.status === "Approved").length,
    rejected: approvals.filter(a => a.status === "Rejected").length,
  };

  const focus = approvals.find(a => a.id === focusId);

  return (
    <div className="screen">
      <PageHeader
        eyebrow="B-01 · TEAM INBOX"
        title="Approvals queue"
        sub={`${counts.pending} item${counts.pending !== 1 ? "s" : ""} pending your decision.`}
        actions={
          <div className="seg">
            {[
              ["all",      `All · ${approvals.length}`],
              ["pending",  `Pending · ${counts.pending}`],
              ["approved", `Approved · ${counts.approved}`],
              ["rejected", `Rejected · ${counts.rejected}`],
            ].map(([k, l]) => (
              <button key={k} className={"seg-btn" + (filter === k ? " is-active" : "")} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        }
      />

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Filed</th>
              <th>Detail</th>
              <th>Status</th>
              <th style={{ width: 240 }}></th>
            </tr>
          </thead>
          <tbody>
            {visible.map(a => (
              <tr key={a.id} className={"approval-row " + (a.status === "Approved" ? "is-approved" : a.status === "Rejected" ? "is-rejected" : "")}>
                <td><b>{a.id}</b></td>
                <td>
                  <div className="inline-emp">
                    <span className="inline-emp-av" style={{ background: a.avBg }}>{a.iv}</span>
                    <span>{a.who}</span>
                  </div>
                </td>
                <td>{a.type}</td>
                <td className="mono-sm">{a.filed}</td>
                <td>{a.detail}</td>
                <td><span className={"humi-tag " + statusToTag(a.status)}>{a.status}</span></td>
                <td>
                  {a.status === "Pending" || a.status === "Review" ? (
                    <div className="approve-actions">
                      <button className="mini-btn approve" onClick={() => { onAction(a.id, "Approved"); toast({ kind: "success", msg: `${a.who}'s ${a.type.toLowerCase()} approved`, undo: () => onAction(a.id, a.status) }); }}>
                        <I.check/> Approve
                      </button>
                      <button className="mini-btn reject" onClick={() => { onAction(a.id, "Rejected"); toast({ kind: "warn", msg: `${a.who}'s ${a.type.toLowerCase()} rejected`, undo: () => onAction(a.id, a.status) }); }}>
                        <I.x/> Reject
                      </button>
                      <button className="mini-btn ghost" onClick={() => setFocusId(a.id)}>View</button>
                    </div>
                  ) : (
                    <div className="approve-actions">
                      <button className="mini-btn ghost" onClick={() => { onAction(a.id, "Pending"); toast({ msg: `${a.id} returned to pending` }); }}>
                        <I.undo/> Reopen
                      </button>
                      <button className="mini-btn ghost" onClick={() => setFocusId(a.id)}>View</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--color-ink-faint)" }}>No items in this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {focus && (
        <ApprovalDrawer
          a={focus}
          onClose={() => setFocusId(null)}
          onAction={(status) => { onAction(focus.id, status); setFocusId(null); toast({ kind: status === "Approved" ? "success" : "warn", msg: `${focus.who}'s ${focus.type.toLowerCase()} ${status.toLowerCase()}`, undo: () => onAction(focus.id, focus.status) }); }}
        />
      )}
    </div>
  );
}

function ApprovalDrawer({ a, onClose, onAction }) {
  const [note, setNote] = useState("");
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer">
        <header className="drawer-head">
          <div className="drawer-eyebrow">B-01 · APPROVAL DETAIL</div>
          <div className="drawer-title">
            <span className="emp-av drawer-av" style={{ background: a.avBg }}>{a.iv}</span>
            <div>
              <div className="emp-name" style={{ fontSize: 17 }}>{a.who} · {a.type}</div>
              <div className="emp-meta">{a.id} · filed {a.filed}</div>
            </div>
          </div>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>
        <div className="drawer-body">
          <div className="kv-grid" style={{ padding: 0, gridTemplateColumns: "1fr" }}>
            <KV k="Type" v={a.type}/>
            <KV k="Detail" v={a.detail}/>
            <KV k="Reason given" v={a.reason}/>
            <KV k="Approval chain" v="You → HR (auto)"/>
            <KV k="SLA" v="2 days · 1 day 14h remaining"/>
          </div>

          <div className="presets-label" style={{ marginTop: 16 }}>Approval note (optional)</div>
          <textarea
            className="textarea"
            placeholder="Add context — visible to the requester and HR…"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
        <footer className="drawer-foot">
          <button className="ghost-btn danger" onClick={() => onAction("Rejected")}>
            <I.x/> Reject
          </button>
          <div style={{ flex: 1 }}/>
          <button className="ghost-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={() => onAction("Approved")}><I.check/> Approve</button>
        </footer>
      </aside>
    </>
  );
}
function ToastHost({ toasts, dismiss }) {
  return (
    <div className="toast-host">
      {toasts.map(t => (
        <div key={t.id} className={"toast toast-" + (t.kind || "info")}>
          <span className="toast-ico">
            {t.kind === "success" ? <I.check/> : t.kind === "warn" ? "⚠" : t.kind === "undo" ? <I.undo/> : "·"}
          </span>
          <div className="toast-body">
            <div className="toast-msg">{t.msg}</div>
            {t.detail && <div className="toast-detail">{t.detail}</div>}
          </div>
          {t.undo && <button className="toast-action" onClick={() => { t.undo(); dismiss(t.id); }}>Undo</button>}
          <button className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss"><I.x/></button>
        </div>
      ))}
    </div>
  );
}

/* ── Time helpers ─────────────────────────────────────────────── */
const hh = h => `${String(Math.floor(h)).padStart(2,"0")}:${String(Math.round((h - Math.floor(h)) * 60)).padStart(2,"0")}`;
const parseHH = (str) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(str || "");
  if (!m) return null;
  const h = +m[1], mm = +m[2];
  if (h < 0 || h > 24 || mm < 0 || mm >= 60) return null;
  return h + mm / 60;
};

/* ── Shift Editor Drawer ──────────────────────────────────────── */
function ShiftEditor({ emp, onClose, onSave, onDelete, toast }) {
  const [draft, setDraft] = useState(emp ? { ...emp.shift } : null);
  useEffect(() => { setDraft(emp ? { ...emp.shift } : null); }, [emp?.id]);

  if (!emp || !draft) return null;

  const setStart = (v) => setDraft(d => ({ ...d, start: Math.max(0, Math.min(d.end - 0.5, v)) }));
  const setEnd   = (v) => setDraft(d => ({ ...d, end:   Math.max(d.start + 0.5, Math.min(24, v)) }));
  const dur = draft.end - draft.start;

  const handleSave = () => {
    onSave(emp.id, draft);
    toast({ kind: "success", msg: `${emp.name}'s shift updated`, detail: `${hh(draft.start)} – ${hh(draft.end)} · ${dur}h${draft.break ? ` · break ${hh(draft.break[0])}–${hh(draft.break[1])}` : ""}`, undo: () => onSave(emp.id, emp.shift) });
    onClose();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <aside className="drawer">
        <header className="drawer-head">
          <div className="drawer-eyebrow">B-02 · OVERRIDE SHIFT</div>
          <div className="drawer-title">
            <span className="emp-av drawer-av" style={{ background: emp.avBg }}>{emp.iv}</span>
            <div>
              <div className="emp-name" style={{ fontSize: 17 }}>{emp.name}</div>
              <div className="emp-meta">{emp.role}</div>
            </div>
          </div>
          <button className="drawer-x" onClick={onClose}><I.x/></button>
        </header>

        <div className="drawer-body">
          {/* Live preview */}
          <div className="drawer-preview">
            <div className="drawer-preview-bar" style={{ left: `${(draft.start/24)*100}%`, width: `${(dur/24)*100}%` }}>
              {hh(draft.start)} – {hh(draft.end)}
              {draft.break && <div className="drawer-preview-brk" style={{ left: `${((draft.break[0]-draft.start)/dur)*100}%`, width: `${((draft.break[1]-draft.break[0])/dur)*100}%` }}/>}
            </div>
            <div className="drawer-preview-axis">
              {[0,6,12,18,24].map(t => <span key={t} style={{ left: `${(t/24)*100}%` }}>{String(t).padStart(2,"0")}</span>)}
            </div>
          </div>

          {/* Start / End steppers */}
          <div className="form-grid">
            <TimeField label="Start" value={draft.start} onChange={setStart}/>
            <TimeField label="End"   value={draft.end}   onChange={setEnd}/>
          </div>

          <div className="form-stat">
            <div><span className="lbl">Duration</span> <b>{dur.toFixed(1)} hrs</b></div>
            <div>
              <span className="lbl">Premium</span>{" "}
              <b>{draft.start < 6 || draft.end > 22 ? "Night +25%" : "Standard"}</b>
            </div>
          </div>

          {/* Quick presets */}
          <div className="presets">
            <div className="presets-label">Quick override</div>
            <div className="presets-row">
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, start: d.start - 0.5 }))}>Start −30</button>
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, start: d.start + 0.5 }))}>Start +30</button>
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, end: d.end - 0.5 }))}>End −30</button>
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, end: d.end + 0.5 }))}>End +30</button>
            </div>
            <div className="presets-row">
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, start: Math.max(0, d.start - 1), end: Math.max(d.start, d.end - 1) }))}>Shift −1h</button>
              <button className="preset-btn" onClick={() => setDraft(d => ({ ...d, start: d.start + 1, end: Math.min(24, d.end + 1) }))}>Shift +1h</button>
              <button className="preset-btn" onClick={() => setDraft({ start: 7, end: 16, break: [12, 13], variant: draft.variant })}>FT 7–16</button>
              <button className="preset-btn" onClick={() => setDraft({ start: 16, end: 23, variant: draft.variant })}>Night 16–23</button>
            </div>
          </div>

          {/* Break */}
          <div className="break-block">
            <div className="break-head">
              <I.coffee/> <span>Meal break</span>
              {draft.break ? (
                <button className="break-toggle off" onClick={() => setDraft(d => { const c = { ...d }; delete c.break; return c; })}>Remove</button>
              ) : (
                <button className="break-toggle on" onClick={() => setDraft(d => ({ ...d, break: [Math.floor((d.start + d.end) / 2), Math.floor((d.start + d.end) / 2) + 1] }))}>Add break</button>
              )}
            </div>
            {draft.break && (
              <div className="form-grid">
                <TimeField label="Break start" value={draft.break[0]} onChange={v => setDraft(d => ({ ...d, break: [Math.max(d.start, Math.min(d.end - 0.5, v)), d.break[1]] }))}/>
                <TimeField label="Break end"   value={draft.break[1]} onChange={v => setDraft(d => ({ ...d, break: [d.break[0], Math.max(d.break[0] + 0.5, Math.min(d.end, v))] }))}/>
              </div>
            )}
          </div>

          {/* Variant picker */}
          <div className="variant-block">
            <div className="presets-label">Shift type</div>
            <div className="variant-row">
              {[
                ["default", "Full-time", "var(--color-accent-soft)", "#93D6CF"],
                ["s-mgr",   "Manager",   "var(--color-accent-alt-soft)", "#B5BBF1"],
                ["s-pt",    "Part-time", "#FEF3C7", "#EBD58A"],
                ["s-night", "Night",     "#1d2b48", "#1d2b48"],
              ].map(([v, label, bg, border]) => (
                <button
                  key={v}
                  className={"variant-chip" + (draft.variant === v ? " sel" : "")}
                  onClick={() => setDraft(d => ({ ...d, variant: v }))}
                >
                  <span className="variant-sw" style={{ background: bg, borderColor: border }}/>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="drawer-foot">
          <button className="ghost-btn danger" onClick={() => { onDelete(emp.id); onClose(); toast({ kind: "warn", msg: `${emp.name}'s shift removed`, undo: () => onSave(emp.id, emp.shift) }); }}>
            <I.trash/> Delete shift
          </button>
          <div style={{ flex: 1 }}/>
          <button className="ghost-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSave}><I.check/> Save override</button>
        </footer>
      </aside>
    </>
  );
}

function TimeField({ label, value, onChange }) {
  const txt = hh(value);
  const [local, setLocal] = useState(txt);
  useEffect(() => { setLocal(hh(value)); }, [value]);
  const commit = () => {
    const v = parseHH(local);
    if (v != null) onChange(v);
    else setLocal(hh(value));
  };
  return (
    <div className="time-field">
      <label>{label}</label>
      <div className="time-input-wrap">
        <button className="step" onClick={() => onChange(value - 0.5)} aria-label="−30 min"><I.minus/></button>
        <input
          type="text"
          value={local}
          onChange={e => setLocal(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === "Enter") { commit(); e.target.blur(); } }}
        />
        <button className="step" onClick={() => onChange(value + 0.5)} aria-label="+30 min"><I.plus/></button>
      </div>
    </div>
  );
}

/* ── Persona Switcher ────────────────────────────────────────── */
function PersonaSwitcher({ open, onClose, current, onSelect }) {
  return (
    <div className={"ps-overlay" + (open ? " open" : "")} onClick={onClose}>
      <div className="ps-panel" onClick={e => e.stopPropagation()}>
        <div className="ps-head">
          <div className="eyebrow">RBAC · 4 tiers</div>
          <h3>Switch persona</h3>
        </div>
        <div className="ps-list">
          {Object.values(PERSONAS).map(p => (
            <button
              key={p.id}
              className={"ps-opt" + (p.id === current ? " sel" : "")}
              onClick={() => { onSelect(p.id); onClose(); }}
            >
              <span className="ps-av" style={{ background: p.avBg }}>{p.av}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ps-nm">{p.name}</div>
                <div className="ps-rl">{p.role} · {p.empId}</div>
                <div className="ps-access">
                  {["A","B","C","D"].map(g => (
                    <span key={g} className={"ac-chip" + (p.access.includes(g) ? " on" : "")}>{g}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="ps-foot">
          <I.lock/> RBAC enforced on the client + server
        </div>
      </div>
    </div>
  );
}

/* ── Filter Menu (dropdown) ──────────────────────────────────── */
function FilterChip({ label, options, selected, onSelect, leadingIcon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div className="chip-wrap" ref={ref}>
      <button className={"chip" + (open ? " open" : "")} onClick={() => setOpen(o => !o)}>
        {leadingIcon}{selected || label}<I.caretDn/>
      </button>
      {open && (
        <div className="chip-menu">
          {options.map(o => (
            <button
              key={o}
              className={"chip-menu-item" + (o === selected ? " sel" : "")}
              onClick={() => { onSelect(o); setOpen(false); }}
            >
              {o === selected && <I.check/>}
              <span style={{ flex: 1, textAlign: "left" }}>{o}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────── */
function Sidebar({ persona, openGroup, setOpenGroup, activeLeaf, setActiveLeaf }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div>
          <img className="wordmark-img" src="assets/humi-logo-dark.png" alt="humi"/>
          <div className="tenant">CENTRAL · BANGKOK 03</div>
        </div>
      </div>

      {MODULES.map(m => {
        const isOpen = openGroup === m.id;
        const locked = !persona.access.includes(m.g);
        return (
          <div key={m.id} className={"nav-group" + (isOpen ? " open" : "") + (locked ? " locked" : "")}>
            <button
              className="nav-trigger"
              onClick={() => { if (!locked) setOpenGroup(isOpen ? null : m.id); }}
              aria-expanded={isOpen}
              disabled={locked}
            >
              <span className="icon"><m.ico/></span>
              <span>{m.label}</span>
              <span className="count">{locked ? "—" : m.leaves.length}</span>
              <span className="chev"><I.caretR/></span>
            </button>
            <div className="nav-panel">
              <div>
                <div className="nav-children">
                  {m.leaves.map(l => (
                    <div
                      key={l.id}
                      className={"nav-child" + (activeLeaf === l.id ? " is-active" : "")}
                      onClick={() => setActiveLeaf(l.id)}
                      title={l.labelTh || undefined}
                    >
                      <span>{l.label}</span>
                      {l.badge && <span className="badge">{l.badge}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="sb-user">
        <div className="av" style={{ background: persona.avBg }}>{persona.av}</div>
        <div style={{ minWidth: 0 }}>
          <div className="nm">{persona.name}</div>
          <div className="rl">{persona.empId}</div>
        </div>
      </div>
    </aside>
  );
}

/* ── Roster Gantt ────────────────────────────────────────────── */
function RosterGantt({ team, onShiftClick, onSave, onDelete, toast }) {
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  const cov = useMemo(() => computeCoverage(team), [team]);
  const NOW_HOUR = 14.4;
  const hourPct = h => (h / 24) * 100;
  const totalHrs = team.reduce((s, e) => s + (e.shift ? e.shift.end - e.shift.start - (e.shift.break ? e.shift.break[1] - e.shift.break[0] : 0) : 0), 0);

  return (
    <div className="gantt-card">
      <div className="gantt-head">
        <div>
          <div className="title">Hourly schedule</div>
        </div>
        <div className="meta">{team.filter(e => e.shift).length} STAFF · {totalHrs.toFixed(1)} HRS · NOW 14:24</div>
      </div>

      <div className="gantt">
        <div className="gantt-h">
          <div>Employee</div>
          <div>Total</div>
          <div className="hour-row">
            {hours.map(h => (
              <span key={h} className={h >= 7 && h <= 18 ? "" : "shade"}>{String(h).padStart(2,"0")}</span>
            ))}
          </div>
        </div>

        {team.map(emp => {
          const s = emp.shift;
          return (
            <div key={emp.id} className="gantt-row">
              <div className="emp-cell">
                <span className="emp-av" style={{ background: emp.avBg }}>{emp.iv}</span>
                <div>
                  <div className="emp-name">{emp.name}</div>
                  <div className="emp-meta">{emp.role}</div>
                </div>
              </div>
              <div className={"total-cell" + (s && (s.end - s.start) < 8 && s.variant !== "s-pt" ? " under" : "")}>
                {s ? `${(s.end - s.start).toFixed(1)} hrs` : <span style={{ color: "var(--color-ink-faint)" }}>off</span>}
              </div>
              <div className="timeline">
                <div className="grid">
                  {hours.map(h => <span key={h} className={h >= 7 && h <= 18 ? "" : "shade"}/>)}
                </div>
                <div className="now" style={{ left: `${hourPct(NOW_HOUR)}%` }}/>
                {s ? (
                  <button
                    className={"shift " + (s.variant === "default" ? "" : s.variant)}
                    style={{ left: `${hourPct(s.start)}%`, width: `${hourPct(s.end - s.start)}%` }}
                    onClick={() => onShiftClick(emp.id)}
                    title="Click to override"
                  >
                    <span>{hh(s.start)} – {hh(s.end)}</span>
                    <span className="h">{(s.end - s.start).toFixed(1)}h</span>
                    {s.break && (
                      <div
                        className="brk"
                        style={{
                          left:  `${((s.break[0] - s.start) / (s.end - s.start)) * 100}%`,
                          width: `${((s.break[1] - s.break[0]) / (s.end - s.start)) * 100}%`,
                        }}
                      />
                    )}
                  </button>
                ) : (
                  <button className="shift-add" onClick={() => onSave(emp.id, { start: 9, end: 17, variant: "default" })}>
                    <I.plus/> Add shift
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Coverage strip */}
        <div className="cov-strip-row">
          <div className="cov-strip-label">
            <div className="cov-strip-eyebrow">Coverage</div>
            <div className="cov-strip-summary">
              {(() => {
                const gaps = cov.actual.filter((a, i) => a < cov.required[i]).length;
                return gaps > 0
                  ? <><b style={{ color: "var(--imp-bg)" }}>{gaps} gap{gaps > 1 ? "s" : ""}</b> · <b>Peak</b> 13–16</>
                  : <><b style={{ color: "var(--save)" }}>All hours covered</b> · <b>Peak</b> 13–16</>;
              })()}
            </div>
          </div>
          <div className="cov-strip-total">
            {(() => {
              const delta = cov.actual.reduce((s, n) => s + n, 0) - cov.required.reduce((s, n) => s + n, 0);
              return (
                <>
                  <b style={{ color: delta < 0 ? "var(--imp-bg)" : "var(--save)" }}>{delta > 0 ? "+" : ""}{delta}</b>
                  <small>hrs</small>
                </>
              );
            })()}
          </div>
          <div className="cov-strip">
            {cov.required.map((r, i) => {
              const a = cov.actual[i];
              let cls = "ok", t;
              if (r === 0 && a === 0) { cls = "off"; t = "off-hours"; }
              else if (a < r) { cls = "gap"; t = `gap −${r - a}`; }
              else if (a > r) { cls = "over"; t = `over +${a - r}`; }
              else t = "met";
              return <div key={i} className={"cov-cell " + cls} title={`${String(i+1).padStart(2,"0")}:00 · ${t}`}/>;
            })}
          </div>
        </div>
      </div>

      <div className="legend">
        <span className="lg-item" style={{ color: "var(--color-ink-faint)" }}>
          Click a shift to override
        </span>
      </div>
    </div>
  );
}

/* ── Mobile stacked timeline ─────────────────────────────────── */
function MobileRoster({ team }) {
  const cov = useMemo(() => computeCoverage(team), [team]);
  const gaps = cov.actual.filter((a, i) => a < cov.required[i]).length;
  const total = team.reduce((s, e) => s + (e.shift ? e.shift.end - e.shift.start : 0), 0);
  return (
    <>
      <div className="mob-card">
        <div className="eyebrow">B-02 · COVERAGE</div>
        <h4>Hourly summary</h4>
        <div className="mob-stat"><span>Peak window</span><span className="val">13:00 – 16:00 · 5 STAFF</span></div>
        <div className="mob-stat"><span>Gap hours</span><span className={"val" + (gaps > 0 ? " warn" : "")}>{gaps > 0 ? `${gaps}H · MORNING` : "NONE"}</span></div>
        <div className="mob-stat"><span>Total scheduled</span><span className="val">{total.toFixed(1)} HRS</span></div>
      </div>

      <div className="mob-card">
        <div className="eyebrow">TEAM MEMBERS</div>
        <h4>{team.filter(e => e.shift).length} active</h4>
        {team.map(emp => {
          const s = emp.shift;
          if (!s) return null;
          const startPct = (s.start / 24) * 100;
          const widthPct = ((s.end - s.start) / 24) * 100;
          return (
            <div key={emp.id} className="mob-emp">
              <div className="head">
                <span className="av" style={{ background: emp.avBg }}>{emp.iv}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="nm">{emp.name}</div>
                  <div className="meta">{emp.role}</div>
                </div>
                <span className="tl-tag">{(s.end - s.start).toFixed(1)}H</span>
              </div>
              <div className="tl">
                <div className="tl-bar" style={{ left: `${startPct}%`, width: `${widthPct}%` }}>
                  <span>{hh(s.start)}</span>
                  <span>{hh(s.end)}</span>
                </div>
              </div>
              <div className="tl-scale">
                <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ── Inline screens ─────────────────────────────────────────── */

function PageHeader({ eyebrow, title, sub, actions }) {
  return (
    <div className="screen-head">
      <div>
        {eyebrow && <div className="screen-eyebrow">{eyebrow}</div>}
        <h2 className="screen-title">{title}</h2>
        {sub && <div className="screen-sub">{sub}</div>}
      </div>
      <div className="screen-actions">{actions}</div>
    </div>
  );
}

function StatCard({ eyebrow, value, sub, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-card-eyebrow">{eyebrow}</div>
      <div className="stat-card-value" style={accent ? { color: accent } : undefined}>{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}

function HomeScreen({ persona, onNav, toast }) {
  const [pinFilter, setPinFilter] = useState("all");
  const [tasks, setTasks] = useState([
    { id: "t1", kind: "urgent", title: "อนุมัติคำขอลา 2 รายการ",      detail: "Somsri P. · Mali T.",             due: "วันนี้",         action: "Approve", target: "approvals", ico: "📅" },
    { id: "t2", kind: "urgent", title: "ยืนยันแผนสวัสดิการปี 2568",    detail: "Flex Plus · Flex Core",          due: "ครบกำหนด 6 วัน", action: "Choose plan", target: "benefits", ico: "❤" },
    { id: "t3", kind: "med",    title: "ประเมินศักยภาพประจำปี",         detail: "คงเหลือ 4 หัวข้อ · ~12 นาที",     due: "32 วันค้าง",     action: "Continue",  target: "perf",     ico: "🛡" },
    { id: "t4", kind: "med",    title: "เตือนทีม 2 คน เรื่องคอร์สค้าง", detail: "Food Safety · 4 คนยังไม่เริ่ม",  due: "สัปดาห์นี้",    action: "Send reminder", target: "perf", ico: "📚" },
  ]);

  const pinned = [
    { id: "p1",  group: "all",     label: "ขอลางาน",       sub: "พักร้อน · ป่วย · กิจ",  Ico: I.leave,    color: "var(--color-accent)",        target: "leaves" },
    { id: "p2",  group: "all",     label: "สลิปเงินเดือน",  sub: "เม.ย. · ฿42,800",       Ico: I.payslip,  color: "var(--imp-bg)",               target: "payslips" },
    { id: "p3",  group: "all",     label: "เบิกค่ารักษา",   sub: "เหลือ ฿8,200",          Ico: I.heart,    color: "#2F8A6B",                     target: "benefits" },
    { id: "p4",  group: "all",     label: "ลงเวลา",        sub: "เริ่มกะ 09:00",          Ico: I.clock,    color: "#9333EA",                     target: "time" },
    { id: "p5",  group: "all",     label: "ขอเอกสาร",       sub: "หนังสือรับรอง · สลิป",  Ico: I.doc,      color: "var(--color-accent)",        target: "requests" },
    { id: "p6",  group: "all",     label: "ประกาศใหม่",     sub: "3 รายการสัปดาห์นี้",    Ico: I.mega,     color: "var(--imp-bg)",               target: "announce", badge: "3" },
    { id: "p7",  group: "all",     label: "โปรไฟล์",        sub: "ดู · แก้ไข",            Ico: I.user,     color: "#9333EA",                     target: "profile" },
    { id: "p8",  group: "all",     label: "เป้าหมาย OKRs",  sub: "Q2 · 3 of 4",           Ico: I.target,   color: "#2F8A6B",                     target: "perf" },
    { id: "p9",  group: "manager", label: "อนุมัติทีม",     sub: "12 รายการรอ",           Ico: I.approve,  color: "var(--color-accent-alt)",    target: "approvals", badge: "12" },
    { id: "p10", group: "manager", label: "จัดกะทีม",       sub: "Roster วันนี้ · 6 คน",  Ico: I.roster,   color: "#9333EA",                     target: "roster" },
    { id: "p11", group: "manager", label: "Shift Swap",     sub: "เปลี่ยนกะ",              Ico: I.swap,     color: "var(--color-accent)",        target: "swap" },
    { id: "p12", group: "manager", label: "ผังองค์กร",       sub: "248 พนักงาน",           Ico: I.orgnet,   color: "var(--imp-bg)",               target: "orgchart" },
  ];

  const filteredPins = pinFilter === "all" ? pinned : pinned.filter(p => p.group === pinFilter || (pinFilter === "employee" && p.group === "all"));

  const sections = [
    {
      group: "งานของฉัน", tint: "teal",
      items: [
        { l: "โปรไฟล์ · ข้อมูลส่วนตัว", s: "ดู / แก้ไข",        target: "profile" },
        { l: "ลางาน · ตารางกะ",         s: "ขอลา · ดูปฏิทิน",   target: "leaves",  badge: "2" },
        { l: "เงินเดือน · สวัสดิการ",   s: "สลิป · เบิก · กองทุน", target: "benefits", badge: "1" },
        { l: "คำร้อง · แบบฟอร์ม",       s: "ขอเอกสาร · แก้ไข",  target: "requests", badge: "1" },
        { l: "เป้าหมาย · ผลงาน",        s: "OKRs · ประเมิน",    target: "perf" },
        { l: "Time & Attendance",        s: "Clock · OT · timesheet", target: "time" },
      ]
    },
    {
      group: "ทีมและบุคลากร", tint: "coral",
      items: [
        { l: "ผังองค์กร",     s: "ค้นหาคน · แผนก",        target: "orgchart" },
        { l: "ทีมของฉัน",     s: "6 คน · 4 ทำงาน",        target: "roster" },
        { l: "อนุมัติงานทีม", s: "ลา · ค่าใช้จ่าย",      target: "approvals", badge: "12" },
        { l: "Shift Swap",   s: "เปลี่ยนกะกับเพื่อน",     target: "swap" },
      ]
    },
    {
      group: "บริษัท · การสื่อสาร", tint: "sage",
      items: [
        { l: "ประกาศและฟีด",   s: "ปักหมุด · ประจำสัปดาห์", target: "announce" },
        { l: "คู่มือพนักงาน",   s: "นโยบาย · ระเบียบ",       target: "documents" },
        { l: "Org chart",      s: "ดูทั้งบริษัท",            target: "orgchart" },
        { l: "Directory",      s: "248 พนักงาน",            target: "employees" },
      ]
    },
    {
      group: "เครื่องมือ · ตั้งค่า", tint: "butter",
      items: [
        { l: "Admin Hub",       s: "เฉพาะหัวหน้างาน",      target: "audit" },
        { l: "Integrations",    s: "Slack · LINE · KBank", target: "integrations" },
        { l: "Roles & Permissions", s: "RBAC settings",     target: "roles" },
        { l: "ความช่วยเหลือ",     s: "ติดต่อ HR · FAQ",     target: "documents" },
      ]
    },
  ];

  const news = [
    { tag: "NEW POLICY", k: "amber", title: "อัพเดทนโยบาย WFH",   sub: "8 วัน/เดือน · เริ่ม 1 มิ.ย.", time: "วันนี้" },
    { tag: "EVENT",      k: "mint",  title: "Q2 Town Hall",          sub: "พุธ 4 มิ.ย. · 14:00 @ HQ", time: "เมื่อวาน" },
    { tag: "BENEFIT",    k: "mint",  title: "วงเงินทันตกรรม +",      sub: "฿20,000/ปี ย้อนหลัง ม.ค.", time: "20 พ.ค." },
  ];

  const calendar = [
    { d: "วันนี้", e: "Stand-up · FOH",     t: "14:30 · 30 นาที",   c: "var(--color-accent)" },
    { d: "วันนี้", e: "1:1 กับ Anan S.",    t: "16:00 · 45 นาที",   c: "var(--color-accent-alt)" },
    { d: "จันทร์", e: "Compliance training", t: "ครบกำหนด · 25 นาที", c: "#EBD58A" },
    { d: "พุธ 4",   e: "Q2 Town Hall",       t: "14:00 · 1 ชม.",     c: "var(--imp-bg)" },
  ];

  const birthdays = [
    { who: "Somsri P.",  iv: "SP", avBg: "#E08864", d: "พรุ่งนี้",  age: 31 },
    { who: "Mali T.",    iv: "MT", avBg: "#2F8A6B", d: "อาทิตย์",    age: 28 },
    { who: "Krit J.",    iv: "KJ", avBg: "#5A6A7E", d: "จันทร์",    age: 35 },
  ];

  const resolveTask = (t) => { setTasks(ts => ts.filter(x => x.id !== t.id)); toast({ kind: "success", msg: `${t.title} เสร็จแล้ว`, undo: () => setTasks(ts => [...ts, t]) }); onNav(t.target); };
  const snoozeTask = (t) => { setTasks(ts => ts.filter(x => x.id !== t.id)); toast({ msg: `${t.title} เลื่อน 1 วัน`, undo: () => setTasks(ts => [...ts, t]) }); };

  return (
    <div className="screen">
      {/* ── Hero ─────────────────────────────── */}
      <div className="home-hero">
        <div className="home-hero-main">
          <div className="home-hero-eyebrow">วันเสาร์ · 23 พฤษภาคม 2569 · 14:24</div>
          <h1 className="home-hero-title">
            สวัสดี <em>{persona.name.split(" ")[0]}</em> —
            <span style={{ color: "var(--color-ink-muted)" }}> มี <b style={{ color: "var(--color-ink)" }}>{tasks.length} เรื่อง</b>รอคุณดำเนินการ</span>
          </h1>
          <div className="home-hero-search" onClick={() => { const k = new KeyboardEvent("keydown", { key: "k", metaKey: true }); document.dispatchEvent(k); }}>
            <I.search/>
            <input placeholder='พิมพ์ "ขอลา" "สลิป" "เบิกค่ารักษา" หรือชื่อเพื่อน…' readOnly/>
            <kbd>⌘K</kbd>
          </div>
        </div>
        <div className="home-hero-kpis">
          {[
            { v: "6:42",   l: "ทำงานวันนี้",  target: "time",     c: "var(--color-accent)" },
            { v: "12.5",   l: "วันลาเหลือ",   target: "leaves",   c: "var(--imp-bg)" },
            { v: "฿8.2k",  l: "วงเงินเบิก",   target: "benefits", c: "#2F8A6B" },
            { v: tasks.length, l: "งานค้าง", target: "requests", c: "#9333EA" },
          ].map((k, i) => (
            <button key={i} className="home-kpi" onClick={() => onNav(k.target)}>
              <div className="home-kpi-val" style={{ color: k.c }}>{k.v}</div>
              <div className="home-kpi-lbl">{k.l}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Pinned ───────────────────────────── */}
      <div className="home-section">
        <div className="home-section-head">
          <div>
            <div className="screen-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.pin/> ปักหมุดของคุณ</div>
            <h3 className="home-section-title">ใช้บ่อย · กดครั้งเดียวเริ่มทำงาน</h3>
          </div>
          <div className="seg">
            {[["all","ทั้งหมด"],["employee","พนักงาน"],["manager","หัวหน้า"]].map(([k, l]) => (
              <button key={k} className={"seg-btn" + (pinFilter === k ? " is-active" : "")} onClick={() => setPinFilter(k)}>{l}</button>
            ))}
          </div>
          <button className="ghost-btn" onClick={() => toast({ msg: "ปรับแต่ง pinned" })}><I.plus/> ปรับแต่ง</button>
        </div>
        <div className="home-pin-grid">
          {filteredPins.map(p => (
            <button key={p.id} className="home-pin" onClick={() => onNav(p.target)}>
              <div className="home-pin-ico" style={{ background: p.color + "1f", color: p.color }}><p.Ico/></div>
              <div className="home-pin-label">{p.label}</div>
              <div className="home-pin-sub">{p.sub}</div>
              {p.badge && <span className="home-pin-badge">{p.badge}</span>}
              <span className="home-pin-arrow">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Inbox ────────────────────────────── */}
      <div className="home-section">
        <div className="card">
          <div className="card-head" style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            <div>
              <div className="card-eyebrow" style={{ color: "var(--imp-bg)" }}>กล่องงานเข้า</div>
              <div className="card-title">{tasks.length} รายการรอคุณ · จัดการได้ทันทีจากที่นี่</div>
            </div>
            <div style={{ flex: 1 }}/>
            <div className="seg">
              <button className="seg-btn is-active">ทั้งหมด · {tasks.length}</button>
              <button className="seg-btn">เร่งด่วน · {tasks.filter(t => t.kind === "urgent").length}</button>
            </div>
          </div>
          {tasks.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--color-ink-faint)" }}>เคลียร์หมดแล้ว · งานค้าง 0 รายการ ✨</div>
          ) : (
            <div className="card-list">
              {tasks.map(t => (
                <div key={t.id} className="card-row" style={{ alignItems: "flex-start" }}>
                  <span className={"home-inbox-ico " + (t.kind === "urgent" ? "is-urgent" : "")}>{t.ico}</span>
                  <div className="card-row-body">
                    <div className="card-row-title">
                      {t.title}
                      {t.kind === "urgent" && <span className="humi-tag humi-tag--coral" style={{ marginLeft: 8 }}>เร่งด่วน</span>}
                    </div>
                    <div className="card-row-sub">{t.detail}</div>
                  </div>
                  <div className="home-inbox-due" style={{ color: t.kind === "urgent" ? "var(--imp-bg)" : "var(--color-ink-muted)" }}>{t.due}</div>
                  <div className="approve-actions">
                    <button className="mini-btn ghost" onClick={() => snoozeTask(t)}>เลื่อน</button>
                    <button className="mini-btn approve" onClick={() => resolveTask(t)}>{t.action} →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Full Action Grid ─────────────────── */}
      <div className="home-section">
        <div className="home-section-head">
          <div>
            <div className="screen-eyebrow">เมนูทั้งหมด</div>
            <h3 className="home-section-title">เข้าถึงทุกฟีเจอร์ใน 1 คลิก</h3>
          </div>
          <div style={{ flex: 1 }}/>
          <div className="screen-sub" style={{ marginTop: 0 }}>กดที่หัวข้อเพื่อเปิดเมนูเต็ม</div>
        </div>
        <div className="home-action-grid">
          {sections.map(sec => (
            <div key={sec.group} className={"home-action-section is-" + sec.tint}>
              <div className="home-action-head">
                <span className={"home-action-pip is-" + sec.tint}/>
                <div className="home-action-group">{sec.group}</div>
                <span className="home-action-count">{sec.items.length} รายการ</span>
              </div>
              <div className="home-action-tiles">
                {sec.items.map(it => (
                  <button key={it.l} className="home-action-tile" onClick={() => onNav(it.target)}>
                    <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <div className="home-action-l">
                        {it.l}
                        {it.badge && <span className="home-action-badge">{it.badge}</span>}
                      </div>
                      <div className="home-action-s">{it.s}</div>
                    </div>
                    <span className="home-action-arrow">›</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── News + Calendar + Birthdays ──────── */}
      <div className="home-section">
        <div className="screen-grid" style={{ gridTemplateColumns: "1.3fr 1fr 0.9fr" }}>
          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">ประกาศ</div>
              <div className="card-title">สำคัญสำหรับคุณ</div>
            </div>
            <div className="card-list">
              {news.map((n, i) => (
                <div key={i} className="card-row" style={{ alignItems: "flex-start", cursor: "pointer" }} onClick={() => onNav("announce")}>
                  <span className={"humi-tag humi-tag--" + n.k}>{n.tag}</span>
                  <div className="card-row-body">
                    <div className="card-row-title">{n.title}</div>
                    <div className="card-row-sub">{n.sub}</div>
                  </div>
                  <div className="card-row-time">{n.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow">ปฏิทิน</div>
              <div className="card-title">วันนี้และที่จะถึง</div>
            </div>
            <div className="card-list">
              {calendar.map((c, i) => (
                <div key={i} className="card-row">
                  <div className="card-row-time" style={{ minWidth: 60, color: "var(--color-ink-faint)" }}>{c.d}</div>
                  <span style={{ width: 4, alignSelf: "stretch", background: c.c, borderRadius: 2, margin: "2px 0" }}/>
                  <div className="card-row-body">
                    <div className="card-row-title">{c.e}</div>
                    <div className="card-row-sub">{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.cake/> วันเกิด</div>
              <div className="card-title">สัปดาห์นี้</div>
            </div>
            <div className="card-list">
              {birthdays.map((b, i) => (
                <div key={i} className="card-row" style={{ cursor: "pointer" }} onClick={() => toast({ msg: `ส่งคำอวยพรให้ ${b.who}` })}>
                  <span className="inline-emp-av" style={{ background: b.avBg, width: 30, height: 30, fontSize: 11 }}>{b.iv}</span>
                  <div className="card-row-body">
                    <div className="card-row-title">{b.who}</div>
                    <div className="card-row-sub">{b.d} · อายุ {b.age}</div>
                  </div>
                  <button className="mini-btn ghost"><I.party style={{ marginRight: 4 }}/> อวยพร</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ persona, toast }) {
  const [tab, setTab] = useState("personal");
  return (
    <div className="screen">
      <PageHeader
        eyebrow="MY PROFILE"
        title={persona.name}
        sub={`${persona.role} · ${persona.empId}`}
        actions={<button className="ghost-btn" onClick={() => toast({ msg: "Edit mode enabled" })}>Edit</button>}
      />
      <div className="tabs">
        {[
          ["personal", "Personal"],
          ["employment", "Employment"],
          ["compensation", "Compensation"],
          ["documents", "Documents"],
        ].map(([k, l]) => (
          <button key={k} className={"tab" + (tab === k ? " is-active" : "")} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <div className="card">
        <div className="kv-grid">
          {tab === "personal" && [
            ["Full name", persona.name],
            ["Employee ID", persona.empId],
            ["Date of birth", "14 Mar 1992"],
            ["National ID", "1-1014-•••••-37-2"],
            ["Email", `${persona.name.toLowerCase().split(" ")[0]}@humi.shop`],
            ["Phone", "+66 8• ••• 4421"],
            ["Address", "21/4 Sukhumvit Soi 39, Bangkok 10110"],
            ["Emergency contact", "Nat T. · +66 8• ••• 2230"],
          ].map(([k, v]) => <KV key={k} k={k} v={v}/>)}
          {tab === "employment" && [
            ["Position", persona.role],
            ["Department", "Front-of-House"],
            ["Location", "Central · Bangkok 03"],
            ["Manager", "Anan S."],
            ["Hire date", "1 Aug 2023"],
            ["Probation end", "31 Oct 2023 · completed"],
            ["Employment type", "Full-time"],
            ["Cost centre", "FOH-BKK-03"],
          ].map(([k, v]) => <KV key={k} k={k} v={v}/>)}
          {tab === "compensation" && [
            ["Base salary", "฿28,500 / month"],
            ["Pay schedule", "Monthly · last working day"],
            ["Last review", "1 Jan 2026 · +6%"],
            ["Next review", "1 Jan 2027"],
            ["Bonus eligibility", "Annual · target 1.0× salary"],
            ["Benefits tier", "Tier B · Health + Dental"],
          ].map(([k, v]) => <KV key={k} k={k} v={v}/>)}
          {tab === "documents" && [
            ["Employment contract", "Signed · 31 Jul 2023"],
            ["NDA", "Signed · 31 Jul 2023"],
            ["Code of conduct", "Acknowledged · 14 Jan 2026"],
            ["Tax forms (ภ.ง.ด.91)", "Filed · 28 Feb 2026"],
            ["Provident fund", "Member · 5% contribution"],
          ].map(([k, v]) => <KV key={k} k={k} v={v}/>)}
        </div>
      </div>
    </div>
  );
}

function KV({ k, v }) {
  return (
    <div className="kv">
      <div className="kv-k">{k}</div>
      <div className="kv-v">{v}</div>
    </div>
  );
}

function LeavesScreen({ toast }) {
  const [open, setOpen] = useState(false);
  const requests = [
    { id: 1, type: "Annual",   from: "27 May", to: "29 May", days: 3, status: "Pending",  reason: "Family trip" },
    { id: 2, type: "Sick",     from: "12 May", to: "12 May", days: 1, status: "Approved", reason: "Flu" },
    { id: 3, type: "Personal", from: "2 May",  to: "2 May",  days: 1, status: "Approved", reason: "Bank appointment" },
    { id: 4, type: "Annual",   from: "8 Apr",  to: "12 Apr", days: 5, status: "Approved", reason: "Songkran" },
  ];
  return (
    <div className="screen">
      <PageHeader
        eyebrow="LEAVES"
        title="Time off"
        sub="14 days remaining of 18 days annual."
        actions={<button className="primary-btn" onClick={() => setOpen(true)}><I.plus/> Request leave</button>}
      />
      <div className="stat-row">
        <StatCard eyebrow="Annual"   value="14 / 18" sub="4 used this year"/>
        <StatCard eyebrow="Sick"     value="29 / 30" sub="1 used"/>
        <StatCard eyebrow="Personal" value="2 / 3"   sub="1 used"/>
        <StatCard eyebrow="Pending"  value="3 days"  sub="1 request awaiting" accent="var(--imp-bg)"/>
      </div>
      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>Type</th><th>Dates</th><th>Days</th><th>Reason</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td><b>{r.type}</b></td>
                <td>{r.from} – {r.to}</td>
                <td>{r.days}</td>
                <td>{r.reason}</td>
                <td><span className={"humi-tag " + (r.status === "Approved" ? "humi-tag--mint" : r.status === "Pending" ? "humi-tag--amber" : "")}>{r.status}</span></td>
                <td><button className="row-link" onClick={() => toast({ msg: `${r.type} request opened` })}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <header className="modal-head">
              <div className="eyebrow">A-04 · NEW REQUEST</div>
              <h3>Request leave</h3>
              <button className="drawer-x" onClick={() => setOpen(false)}><I.x/></button>
            </header>
            <div className="modal-body">
              <div className="presets-label">Leave type</div>
              <div className="variant-row" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 16 }}>
                {["Annual", "Sick", "Personal"].map(t => (
                  <button key={t} className="variant-chip sel"><span className="variant-sw" style={{ background: "var(--color-accent-soft)", borderColor: "#93D6CF" }}/>{t}</button>
                ))}
              </div>
              <div className="form-grid">
                <div className="time-field"><label>From</label><div className="time-input-wrap"><input type="text" defaultValue="27 May 2026"/></div></div>
                <div className="time-field"><label>To</label><div className="time-input-wrap"><input type="text" defaultValue="29 May 2026"/></div></div>
              </div>
              <div className="time-field" style={{ marginTop: 12 }}>
                <label>Reason</label>
                <textarea className="textarea" defaultValue="Family trip to Chiang Mai"/>
              </div>
            </div>
            <footer className="modal-foot">
              <button className="ghost-btn" onClick={() => setOpen(false)}>Cancel</button>
              <button className="primary-btn" onClick={() => { setOpen(false); toast({ kind: "success", msg: "Leave request submitted" }); }}><I.check/> Submit request</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

function PayslipsScreen({ toast, persona }) {
  const [openSlip, setOpenSlip] = useState(null);
  const isAdmin = persona && (persona.id === "hradmin" || persona.id === "sysadmin");
  const slips = [
    { m: "May 2026",   gross: 28500, ot: 1875, tax: 1140, nett: 27360, status: "Pending"  },
    { m: "April 2026", gross: 28500, ot: 2400, tax: 1340, nett: 27860, status: "Released" },
    { m: "Mar 2026",   gross: 28500, ot: 0,    tax: 980,  nett: 26995, status: "Released" },
    { m: "Feb 2026",   gross: 28500, ot: 1100, tax: 1010, nett: 27190, status: "Released" },
    { m: "Jan 2026",   gross: 26880, ot: 0,    tax: 905,  nett: 25450, status: "Released" },
  ];
  return (
    <div className="screen">
      <PageHeader
        eyebrow="PAYSLIPS"
        title="Pay history"
        sub="Last 12 months · monthly cycle, last working day."
        actions={isAdmin ? <button className="primary-btn" onClick={() => toast({ msg: "Open Compensation → Run Payroll to start a new cycle" })}><I.plus/> Run payroll</button> : null}
      />
      <div className="stat-row">
        <StatCard eyebrow="YTD gross"   value="฿140,400" sub="5 months"/>
        <StatCard eyebrow="YTD tax"     value="฿5,375"   sub="ภ.ง.ด.91 filed"/>
        <StatCard eyebrow="OT this year" value="฿5,375"  sub="46.5 hours"/>
        <StatCard eyebrow="Next payday" value="31 May"   sub="−16 hrs OT pending"/>
      </div>
      <div className="card">
        <table className="data-table">
          <thead>
            <tr><th>Period</th><th className="num">Gross</th><th className="num">OT</th><th className="num">Tax</th><th className="num">Nett</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {slips.map(s => (
              <tr key={s.m} onClick={() => setOpenSlip(s)} style={{ cursor: "pointer" }}>
                <td><b>{s.m}</b></td>
                <td className="num">฿{s.gross.toLocaleString()}</td>
                <td className="num">฿{s.ot.toLocaleString()}</td>
                <td className="num">฿{s.tax.toLocaleString()}</td>
                <td className="num"><b>฿{s.nett.toLocaleString()}</b></td>
                <td><span className={"humi-tag " + (s.status === "Released" ? "humi-tag--mint" : "humi-tag--amber")}>{s.status}</span></td>
                <td><button className="row-link" onClick={e => { e.stopPropagation(); setOpenSlip(s); }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openSlip && <PayslipDrawer slip={openSlip} onClose={() => setOpenSlip(null)} toast={toast}/>}
    </div>
  );
}

function ListScreen({ eyebrow, title, sub, rows, columns, accent, primaryAction, toast }) {
  return (
    <div className="screen">
      <PageHeader eyebrow={eyebrow} title={title} sub={sub} actions={primaryAction}/>
      <div className="card">
        <table className="data-table">
          <thead><tr>{columns.map(c => <th key={c.k} className={c.num ? "num" : ""}>{c.l}</th>)}<th></th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map(c => (
                  <td key={c.k} className={c.num ? "num" : ""}>
                    {c.tag ? <span className={"humi-tag " + (typeof c.tag === "function" ? c.tag(r[c.k]) : c.tag)}>{r[c.k]}</span> :
                     c.bold ? <b>{r[c.k]}</b> : r[c.k]}
                  </td>
                ))}
                <td><button className="row-link" onClick={() => toast({ msg: `Opened ${r[columns[0].k]}` })}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function leafStatusTag(v) {
  if (v === "Approved" || v === "Active" || v === "Live" || v === "Released" || v === "Pass") return "humi-tag--mint";
  if (v === "Pending"  || v === "Draft"  || v === "Review" || v === "Probation")              return "humi-tag--amber";
  if (v === "Rejected" || v === "Inactive" || v === "Failed" || v === "Off-track")            return "humi-tag--coral";
  return "";
}

function EmployeesDirectory({ openEmpHub, openEmpPage, toast, onNav }) {
  const [q, setQ] = useState("");
  const rows = [
    { name: "Somchai K.", id: "EMP-00204", dept: "FOH",  role: "Shift Lead",   since: "Aug 2023", status: "Active"    },
    { name: "Somsri P.",  id: "EMP-00212", dept: "FOH",  role: "Cashier",      since: "Jan 2024", status: "Active"    },
    { name: "Panji Dwi",  id: "EMP-04821", dept: "FOH",  role: "PT Floor",     since: "Mar 2026", status: "Probation" },
    { name: "Anan S.",    id: "EMP-00014", dept: "Mgmt", role: "HR Admin/MOD", since: "Jul 2021", status: "Active"    },
    { name: "Mali T.",    id: "EMP-00198", dept: "FOH",  role: "Barista",      since: "Oct 2023", status: "Active"    },
    { name: "Krit J.",    id: "EMP-00177", dept: "BOH",  role: "Stock",        since: "Feb 2023", status: "Active"    },
    { name: "Pim L.",     id: "EMP-00001", dept: "IT",   role: "Sys Admin",    since: "Mar 2019", status: "Active"    },
  ];
  const filtered = q
    ? rows.filter(r => (r.name + " " + r.id + " " + r.role + " " + r.dept).toLowerCase().includes(q.toLowerCase()))
    : rows;
  return (
    <div className="screen">
      <PageHeader
        eyebrow="HR · EMPLOYEES"
        title="Directory"
        sub="248 employees · 12 locations · click any row to view detail"
        actions={
          <>
            <div className="text-input-wrap" style={{ width: 220 }}>
              <input placeholder="Search by name, ID, dept…" value={q} onChange={e => setQ(e.target.value)}/>
            </div>
            <button className="primary-btn" onClick={() => onNav("hire")}><I.plus/> Hire</button>
          </>
        }
      />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>ID</th><th>Dept</th><th>Role</th><th>Since</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} onClick={() => openEmpPage(r.name)} style={{ cursor: "pointer" }}>
                <td><b>{r.name}</b></td>
                <td className="mono-sm">{r.id}</td>
                <td>{r.dept}</td>
                <td>{r.role}</td>
                <td className="mono-sm">{r.since}</td>
                <td><span className={"humi-tag " + leafStatusTag(r.status)}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getScreen(leafId, { persona, onNav, toast, approvals, setApprovalStatus, openEmpHub, openEmpPage }) {
  switch (leafId) {
    case "home":     return <HomeScreen persona={persona} onNav={onNav} toast={toast}/>;
    case "profile":
    case "documents": return <ProfileScreen persona={persona} toast={toast}/>;
    case "time":
    case "leaves":   return <LeavesScreen toast={toast}/>;
    case "payslips": return <PayslipsScreen toast={toast} persona={persona}/>;
    case "comp":     return <PayrollRunScreen toast={toast} onNav={onNav}/>;
    case "inbox":
    case "approvals": return <ApprovalsScreen approvals={approvals} onAction={setApprovalStatus} toast={toast}/>;
    case "benefits": return <BenefitsScreen persona={persona} toast={toast} onNav={onNav}/>;
    case "announce": return <AnnouncementsScreen toast={toast}/>;
    case "confirm":  return <ConfirmationLetterScreen toast={toast} onNav={onNav}/>;
    case "transfer": return <TransferWorkspace toast={toast} onNav={onNav}/>;
    case "policy":   return <PolicyBuilderScreen toast={toast}/>;
    case "catalog":  return <MasterCatalogScreen toast={toast}/>;
    case "regular":  return <RegularizationQueue toast={toast}/>;
    case "docreview": return <DocumentReviewQueue toast={toast}/>;
    case "assets":   return <AssetsScreen toast={toast}/>;
    case "orgchart":
    case "directory": return <OrgChartScreen persona={persona} toast={toast} openEmpHub={openEmpHub}/>;
    case "ben-admin":
    case "claims":   return <ClaimsManager toast={toast} persona={persona}/>;
    case "swap":     return <ShiftSwapScreen toast={toast} onNav={onNav}/>;
    case "offboard": return <OffboardingScreen toast={toast} onNav={onNav}/>;
    case "requests": return <ListScreen
      eyebrow="REQUESTS" title="My requests" sub="Forms filed in the last 90 days"
      primaryAction={<button className="primary-btn" onClick={() => toast({ msg: "Opening request catalog" })}><I.plus/> New request</button>}
      columns={[
        { k: "ref", l: "Ref", bold: true },
        { k: "type", l: "Type" },
        { k: "filed", l: "Filed" },
        { k: "approver", l: "Approver" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { ref: "REQ-2026-0204", type: "Salary advance",    filed: "21 May", approver: "Anan S.",  status: "Pending"  },
        { ref: "REQ-2026-0188", type: "Equipment · laptop",filed: "12 May", approver: "Pim L.",   status: "Approved" },
        { ref: "REQ-2026-0174", type: "Letter · embassy",  filed: "4 May",  approver: "Anan S.",  status: "Approved" },
        { ref: "REQ-2026-0152", type: "Reimburse · meal",  filed: "29 Apr", approver: "Anan S.",  status: "Rejected" },
      ]}
      toast={toast}/>;
    case "perf":     return <ListScreen
      eyebrow="TEAM PERFORMANCE" title="6 direct reports" sub="Q2 review cycle · due 30 Jun"
      columns={[
        { k: "who", l: "Employee", bold: true },
        { k: "role", l: "Role" },
        { k: "goals", l: "Goals", num: true },
        { k: "review", l: "Last 1:1" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { who: "Somsri P.", role: "Cashier",     goals: "3/4", review: "12 May", status: "Active"    },
        { who: "Mali T.",   role: "Barista",     goals: "2/4", review: "8 May",  status: "Off-track" },
        { who: "Panji Dwi", role: "PT · Floor",  goals: "—",   review: "—",      status: "Probation" },
        { who: "Krit J.",   role: "Stock · BOH", goals: "4/4", review: "14 May", status: "Pass"      },
        { who: "Anan S.",   role: "MOD",         goals: "3/3", review: "15 May", status: "Active"    },
      ]}
      toast={toast}/>;
    case "team-reports":
    case "org-reports": return <ListScreen
      eyebrow="REPORTS" title="Team analytics" sub="Updated 5 min ago"
      columns={[
        { k: "name", l: "Report", bold: true },
        { k: "owner", l: "Owner" },
        { k: "rows", l: "Rows", num: true },
        { k: "updated", l: "Updated" },
      ]}
      rows={[
        { name: "Headcount by department", owner: "HR Admin", rows: "248", updated: "5 min ago" },
        { name: "Attrition · trailing 12m", owner: "HR Admin", rows: "248", updated: "1 hr ago" },
        { name: "Overtime · this month",   owner: "Manager",  rows: "6",   updated: "Live" },
        { name: "Leave balances",          owner: "HR Admin", rows: "248", updated: "Live" },
        { name: "Payroll variance · YoY",  owner: "HR Admin", rows: "248", updated: "Yesterday" },
      ]}
      toast={toast}/>;
    case "lifecycle": return <OnboardingScreen toast={toast}/>;
    case "probation": return <ProbationScreen toast={toast} onNav={onNav}/>;
    case "employees": return <EmployeesDirectory openEmpHub={openEmpHub} openEmpPage={openEmpPage} toast={toast} onNav={onNav}/>;
    case "hire":     return <HireWizard toast={toast} onNav={onNav}/>;
    case "recruit":  return <ListScreen
      eyebrow="HIRE & ONBOARD" title="Open roles" sub="4 reqs open · 28 candidates in pipeline"
      primaryAction={<button className="primary-btn" onClick={() => toast({ kind: "success", msg: "New req draft created" })}><I.plus/> Open req</button>}
      columns={[
        { k: "title", l: "Role", bold: true },
        { k: "dept", l: "Dept" },
        { k: "location", l: "Location" },
        { k: "cand", l: "Candidates", num: true },
        { k: "stage", l: "Stage" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { title: "Barista · FT",       dept: "FOH",  location: "BKK-03",  cand: "12", stage: "Interview · R2", status: "Active" },
        { title: "Cashier · PT",       dept: "FOH",  location: "BKK-03",  cand: "8",  stage: "Screening",      status: "Active" },
        { title: "Stock · FT",         dept: "BOH",  location: "BKK-07",  cand: "5",  stage: "Offer",          status: "Active" },
        { title: "Assistant Manager",  dept: "Mgmt", location: "CNX-01",  cand: "3",  stage: "Interview · R3", status: "Active" },
      ]}
      toast={toast}/>;
    case "welfare": return <ListScreen
      eyebrow="WELFARE PLANS" title="Plan catalog" sub="6 plans across 3 tiers"
      primaryAction={<button className="primary-btn" onClick={() => toast({ kind: "success", msg: "New plan draft" })}><I.plus/> New plan</button>}
      columns={[
        { k: "plan", l: "Plan", bold: true },
        { k: "tier", l: "Tier" },
        { k: "carrier", l: "Carrier" },
        { k: "members", l: "Members", num: true },
        { k: "cost", l: "Annual cost", num: true },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { plan: "Health · OPD/IPD",  tier: "Tier A · Mgmt",   carrier: "AIA",    members: "14",  cost: "฿840K",  status: "Live" },
        { plan: "Health · OPD/IPD",  tier: "Tier B · FT",     carrier: "AIA",    members: "168", cost: "฿4.2M",  status: "Live" },
        { plan: "Dental",            tier: "Tier B · FT",     carrier: "AIA",    members: "168", cost: "฿672K",  status: "Live" },
        { plan: "Provident fund",    tier: "All FT",          carrier: "K-Asset",members: "182", cost: "฿2.1M",  status: "Live" },
        { plan: "Life · 12× salary", tier: "All FT",          carrier: "FWD",    members: "182", cost: "฿420K",  status: "Live" },
      ]}
      toast={toast}/>;
    case "audit": return <ListScreen
      eyebrow="AUDIT LOG" title="Recent activity" sub="Filtered · last 24 hours"
      columns={[
        { k: "t", l: "Time", bold: true },
        { k: "who", l: "Actor" },
        { k: "action", l: "Action" },
        { k: "target", l: "Target" },
        { k: "ip", l: "IP" },
      ]}
      rows={[
        { t: "14:22", who: "Pim L.",  action: "Updated permissions",    target: "Role · HR Admin",          ip: "10.2.4.18" },
        { t: "14:08", who: "Anan S.", action: "Approved leave request", target: "REQ-2026-0204 · Somsri P.", ip: "10.2.4.92" },
        { t: "13:54", who: "System",  action: "Payroll run started",    target: "Cycle · May 2026",          ip: "—" },
        { t: "13:21", who: "Pim L.",  action: "Impersonated user",      target: "Somchai K. · 12 min",       ip: "10.2.4.18" },
        { t: "12:40", who: "Anan S.", action: "Created plan",           target: "Welfare · Dental Tier B",   ip: "10.2.4.92" },
        { t: "10:14", who: "System",  action: "Backup completed",       target: "humi-prod-db",              ip: "—" },
      ]}
      toast={toast}/>;
    case "roles": return <ListScreen
      eyebrow="ROLES & PERMISSIONS" title="System roles" sub="4 base roles · 12 custom"
      primaryAction={<button className="primary-btn" onClick={() => toast({ kind: "success", msg: "New role draft" })}><I.plus/> New role</button>}
      columns={[
        { k: "role", l: "Role", bold: true },
        { k: "tier", l: "Access tier" },
        { k: "members", l: "Members", num: true },
        { k: "scope", l: "Scope" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { role: "Employee",      tier: "A",         members: "248", scope: "Self-service only",  status: "Active" },
        { role: "Line Manager",  tier: "A + B",     members: "32",  scope: "Direct reports",     status: "Active" },
        { role: "HR Admin",      tier: "A + B + C", members: "5",   scope: "All employees",      status: "Active" },
        { role: "System Admin",  tier: "A → D",     members: "2",   scope: "Full system",        status: "Active" },
        { role: "Payroll Admin", tier: "C",         members: "3",   scope: "Comp + payroll",     status: "Active" },
        { role: "Recruiter",     tier: "C",         members: "4",   scope: "Hire pipeline only", status: "Active" },
      ]}
      toast={toast}/>;
    case "workflows": return <ListScreen
      eyebrow="WORKFLOWS" title="Approval chains" sub="12 active workflows"
      columns={[
        { k: "name", l: "Workflow", bold: true },
        { k: "trigger", l: "Trigger" },
        { k: "approvers", l: "Approvers" },
        { k: "sla", l: "SLA" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { name: "Leave · annual",   trigger: "Leave request",   approvers: "Manager → HR",      sla: "2 days", status: "Active" },
        { name: "Leave · sick",     trigger: "Leave request",   approvers: "Manager",           sla: "1 day",  status: "Active" },
        { name: "Overtime",         trigger: "OT request",      approvers: "Manager",           sla: "1 day",  status: "Active" },
        { name: "Expense · meal",   trigger: "Expense ≤ ฿2K",   approvers: "Manager",           sla: "3 days", status: "Active" },
        { name: "Expense · travel", trigger: "Expense > ฿2K",   approvers: "Manager → HR",      sla: "5 days", status: "Active" },
        { name: "Hire offer",       trigger: "Offer letter",    approvers: "HR → Finance → CEO", sla: "5 days", status: "Active" },
      ]}
      toast={toast}/>;
    case "notifs": return <ListScreen
      eyebrow="NOTIFICATIONS" title="Channel configuration" sub="Email + LINE + in-app"
      columns={[
        { k: "event", l: "Event", bold: true },
        { k: "channel", l: "Channel" },
        { k: "audience", l: "Audience" },
        { k: "frequency", l: "Frequency" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { event: "Leave approved",   channel: "Email + LINE", audience: "Requester",      frequency: "Immediate", status: "Active"   },
        { event: "Payslip released", channel: "Email",         audience: "All employees",  frequency: "Monthly",   status: "Active"   },
        { event: "Coverage gap",     channel: "LINE",          audience: "Managers",       frequency: "Daily 08:00", status: "Active" },
        { event: "Birthday",         channel: "In-app",        audience: "Team",           frequency: "On day",    status: "Inactive" },
        { event: "Probation due",    channel: "Email",         audience: "Manager + HR",   frequency: "14 days before", status: "Active" },
      ]}
      toast={toast}/>;
    case "integrations": return <ListScreen
      eyebrow="INTEGRATIONS" title="Connected systems" sub="6 active · 2 available"
      columns={[
        { k: "name", l: "Integration", bold: true },
        { k: "purpose", l: "Purpose" },
        { k: "synced", l: "Last sync" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { name: "Slack",            purpose: "Team notifications",       synced: "2 min ago",  status: "Active"   },
        { name: "LINE OA",          purpose: "Employee broadcasts",      synced: "5 min ago",  status: "Active"   },
        { name: "K-Bank · Payroll", purpose: "Payroll disbursement",     synced: "1 hr ago",   status: "Active"   },
        { name: "Google Workspace", purpose: "SSO + calendar",           synced: "Live",       status: "Active"   },
        { name: "QuickBooks",       purpose: "GL export",                synced: "Yesterday",  status: "Active"   },
        { name: "DocuSign",         purpose: "Contract e-signature",     synced: "Yesterday",  status: "Active"   },
        { name: "Greenhouse",       purpose: "ATS",                      synced: "—",          status: "Inactive" },
        { name: "Workday",          purpose: "HRIS replication",         synced: "—",          status: "Inactive" },
      ]}
      toast={toast}/>;
    case "branding": return <ListScreen
      eyebrow="BRANDING" title="Tenant theme" sub="Central · Bangkok 03"
      columns={[
        { k: "k", l: "Setting", bold: true },
        { k: "v", l: "Value" },
        { k: "by", l: "Updated by" },
        { k: "on", l: "Updated" },
      ]}
      rows={[
        { k: "Tenant name",     v: "Central · Bangkok 03",    by: "Pim L.",  on: "14 Jan 2026" },
        { k: "Primary colour",  v: "#1FA8A0 (Humi teal)",      by: "Pim L.",  on: "14 Jan 2026" },
        { k: "Display font",    v: "CPN Condensed",            by: "Pim L.",  on: "14 Jan 2026" },
        { k: "Body font",       v: "CPN Sans",                 by: "Pim L.",  on: "14 Jan 2026" },
        { k: "Email sender",    v: "humi@central-bkk03.shop",  by: "Anan S.", on: "8 Mar 2026"  },
        { k: "Locale",          v: "th-TH · ฿ THB",            by: "Pim L.",  on: "14 Jan 2026" },
      ]}
      toast={toast}/>;
    case "security": return <ListScreen
      eyebrow="SECURITY & SSO" title="Identity & access" sub="SSO via Google Workspace"
      columns={[
        { k: "k", l: "Setting", bold: true },
        { k: "v", l: "Value" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { k: "SSO provider",       v: "Google Workspace · SAML 2.0", status: "Active"   },
        { k: "MFA enforcement",    v: "Required for HR + System",    status: "Active"   },
        { k: "Session timeout",    v: "8 hours · sliding",           status: "Active"   },
        { k: "Password policy",    v: "Min 12 chars · rotate 90 d",  status: "Active"   },
        { k: "IP allow-list",      v: "Disabled",                    status: "Inactive" },
        { k: "Failed-login alerts",v: "≥ 3 attempts in 5 min",       status: "Active"   },
      ]}
      toast={toast}/>;
    case "impers": return <ListScreen
      eyebrow="IMPERSONATION LOG" title="Recent sessions" sub="Trailing 30 days"
      columns={[
        { k: "started", l: "Started", bold: true },
        { k: "admin", l: "Admin" },
        { k: "target", l: "Acted as" },
        { k: "dur", l: "Duration" },
        { k: "reason", l: "Reason" },
        { k: "status", l: "Status", tag: leafStatusTag },
      ]}
      rows={[
        { started: "23 May · 13:21", admin: "Pim L.",  target: "Somchai K.", dur: "12 min", reason: "Support ticket",  status: "Active"   },
        { started: "22 May · 09:14", admin: "Anan S.", target: "Mali T.",    dur: "8 min",  reason: "Onboard help",    status: "Released" },
        { started: "21 May · 16:40", admin: "Pim L.",  target: "Krit J.",    dur: "4 min",  reason: "Reset clock-in",  status: "Released" },
        { started: "19 May · 11:02", admin: "Anan S.", target: "Panji Dwi",  dur: "22 min", reason: "Probation review",status: "Released" },
      ]}
      toast={toast}/>;
    default:
      return <EmptyLeaf leafId={leafId}/>;
  }
}

/* ── Empty leaf ──────────────────────────────────────────────── */
function EmptyLeaf({ leafId }) {
  const all = MODULES.flatMap(m => m.leaves.map(l => ({ ...l, parent: m.label, g: m.g })));
  const leaf = all.find(l => l.id === leafId);
  return (
    <div className="empty-page">
      <div className="eyebrow">{leaf ? `${leaf.g} · ${leaf.parent.toUpperCase()}` : "Module"}</div>
      <h4>{leaf ? leaf.label : "Welcome to Humi"}</h4>
      <p>The live prototype is on <b>Team Management → Roster &amp; Shifts</b> — open it from the sidebar to see the hourly Gantt.</p>
    </div>
  );
}

/* ── App ─────────────────────────────────────────────────────── */
function App() {
  const [personaId, setPersonaId] = useState("manager");
  const [openGroup, setOpenGroup] = useState("team");
  const [activeLeaf, setActiveLeaf] = useState("roster");
  const [psOpen, setPsOpen] = useState(false);
  const [imp, setImp] = useState(true);
  const [mobSheet, setMobSheet] = useState(null);
  const [mobLeaf, setMobLeaf] = useState("roster");

  const [team, setTeam] = useState(INITIAL_TEAM);
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);
  const setApprovalStatus = (id, status) => setApprovals(as => as.map(a => a.id === id ? { ...a, status } : a));
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [date, setDate] = useState(new Date("2026-05-23T12:00:00"));
  const [dept, setDept] = useState("All departments");
  const [zone, setZone] = useState("Front-of-House");
  const [week, setWeek] = useState("Week of 19–25 May");
  const [showBulk, setShowBulk] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [empHubName, setEmpHubName] = useState(null);
  const [empPageName, setEmpPageName] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [toasts, setToasts] = useState([]);
  const toast = (t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { ...t, id }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 5500);
  };
  const dismiss = (id) => setToasts(ts => ts.filter(t => t.id !== id));

  const persona = PERSONAS[personaId];
  const editingEmp = team.find(e => e.id === editingShiftId) || null;

  const saveShift = (empId, newShift) => {
    setTeam(t => t.map(e => e.id === empId ? { ...e, shift: newShift } : e));
  };
  const deleteShift = (empId) => {
    setTeam(t => t.map(e => e.id === empId ? { ...e, shift: null } : e));
  };

  useEffect(() => {
    const onKey = e => {
      // ⌘K / Ctrl+K opens palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(o => !o);
        return;
      }
      if (e.key === "Escape") {
        if (settingsOpen) setSettingsOpen(false);
        else if (empHubName) setEmpHubName(null);
        else if (editingShiftId) setEditingShiftId(null);
        else if (showBulk) setShowBulk(false);
        else if (showInbox) setShowInbox(false);
        else if (showNotifs) setShowNotifs(false);
        else if (psOpen) setPsOpen(false);
        else if (mobSheet) setMobSheet(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [editingShiftId, psOpen, mobSheet, showBulk, showInbox, showNotifs]);

  useEffect(() => {
    const visibleLeaves = MODULES.filter(m => persona.access.includes(m.g)).flatMap(m => m.leaves.map(l => l.id));
    if (!visibleLeaves.includes(activeLeaf)) {
      setActiveLeaf("home");
      setOpenGroup("workspace");
    }
    if (!visibleLeaves.includes(mobLeaf)) setMobLeaf("home");
  }, [personaId]);

  const allLeaves = MODULES.flatMap(m => m.leaves.map(l => ({ ...l, parent: m.label, g: m.g })));
  const currentLeaf = allLeaves.find(l => l.id === activeLeaf);
  const mobCurrentLeaf = allLeaves.find(l => l.id === mobLeaf);

  const dayLabel = date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const dayLabelLong = date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const isToday = (() => {
    const today = new Date("2026-05-23T12:00:00");
    return date.toDateString() === today.toDateString();
  })();
  const shiftDate = (delta) => {
    const d = new Date(date); d.setDate(d.getDate() + delta); setDate(d);
    toast({ msg: `Moved to ${d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}` });
  };

  return (
    <div className="app">
      {imp && (
        <div className="imp" role="alert">
          <span className="label">Acting as</span>
          <span className="target">{persona.name} <small>{persona.empId}</small></span>
          <span className="scope">SCOPE · {persona.access.join(" + ")}</span>
          <button className="exit" onClick={() => { setImp(false); setPersonaId("sysadmin"); toast({ kind: "success", msg: "Returned to admin session", detail: "Now viewing as Pim L. · SYS" }); }}>Switch back to admin</button>
        </div>
      )}

      <div className="shell">
        <Sidebar
          persona={persona}
          openGroup={openGroup}
          setOpenGroup={setOpenGroup}
          activeLeaf={activeLeaf}
          setActiveLeaf={setActiveLeaf}
        />

        <main className="main">
          <header className="topbar">
            <div className="search" onClick={() => setPaletteOpen(true)} style={{ cursor: "pointer" }}>
              <I.search/>
              <span>ค้นหา / search anything…</span>
              <kbd>⌘K</kbd>
            </div>
            <div style={{ flex: 1 }}/>
            <button className="persona-hub" onClick={() => setPsOpen(true)}>
              <span className="ph-chip">{persona.short}</span>
              <span className="ph-label">{persona.name}</span>
              <I.caretDn/>
            </button>
            <div className="popover-wrap">
              <button className="tb-btn" onClick={() => { setShowInbox(s => !s); setShowNotifs(false); }} aria-label="Inbox">
                <I.inbox/><span className="dot"/>
              </button>
              {showInbox && (
                <div className="popover">
                  <div className="popover-head">Team inbox <span className="popover-tag">12 new</span></div>
                  {[
                    ["Somsri P.", "Requested leave swap on 24 May", "warn"],
                    ["Mali T.",   "Clock-in late notice · 06:12",   "info"],
                    ["Anan S.",   "Approved your timesheet",        "ok"],
                  ].map(([who, what, kind], i) => (
                    <button key={i} className={"popover-row " + kind} onClick={() => { setShowInbox(false); setActiveLeaf("inbox"); toast({ msg: `Opening message from ${who}` }); }}>
                      <div className="popover-row-title">{who}</div>
                      <div className="popover-row-sub">{what}</div>
                    </button>
                  ))}
                  <button className="popover-foot" onClick={() => { setShowInbox(false); setActiveLeaf("inbox"); }}>View all in Team Inbox →</button>
                </div>
              )}
            </div>
            <div className="popover-wrap">
              <button className="tb-btn" onClick={() => { setShowNotifs(s => !s); setShowInbox(false); }} aria-label="Notifications">
                <I.bell/>
              </button>
              {showNotifs && (
                <div className="popover">
                  <div className="popover-head">Notifications</div>
                  <button className="popover-row info" onClick={() => setShowNotifs(false)}>
                    <div className="popover-row-title">Coverage gap detected</div>
                    <div className="popover-row-sub">06:00–07:00 needs +1 staff today</div>
                  </button>
                  <button className="popover-row ok" onClick={() => setShowNotifs(false)}>
                    <div className="popover-row-title">Payroll closed</div>
                    <div className="popover-row-sub">May cycle posted at 09:14</div>
                  </button>
                  <button className="popover-foot" onClick={() => setShowNotifs(false)}>Mark all as read</button>
                </div>
              )}
            </div>
            <button className="tb-avatar" style={{ background: persona.avBg, color: "#fff" }} onClick={() => setPsOpen(true)}>{persona.av}</button>
          </header>

          <div className="crumb">
            <span>HUMI</span><span className="sep"/>
            <span>{(currentLeaf?.parent || "Workspace").toUpperCase()}</span><span className="sep"/>
            <b>{(currentLeaf?.label || "Home").toUpperCase()}</b>
          </div>

          <div className="page-head">
            <div>
              <h1 className="page-title">
                {activeLeaf === "roster" ? <>Roster <em>&amp; Shifts</em></> : (currentLeaf?.label || "Welcome")}
              </h1>
              <div className="page-sub">
                {activeLeaf === "roster" ? "Click a shift to override times." : ""}
              </div>
            </div>
          </div>

          {activeLeaf === "roster" && (
            <>
              <div className="filterbar">
                <FilterChip label="Department" leadingIcon={<I.filter/>} selected={dept} options={["All departments", "Front-of-House", "Back-of-House", "Management", "Stock"]} onSelect={v => { setDept(v); toast({ msg: `Filtered by ${v}` }); }}/>
                <FilterChip label="Week"       selected={week} options={["Week of 12–18 May", "Week of 19–25 May", "Week of 26 May – 1 Jun"]} onSelect={v => { setWeek(v); toast({ msg: `Loading ${v}` }); }}/>
                <div style={{ flex: 1 }}/>
                <button className="ghost-btn" onClick={() => toast({ kind: "success", msg: "Exporting roster.csv" })}>
                  <I.download/> Export
                </button>
                <button className="primary-btn" onClick={() => setShowBulk(true)}><I.plus/> Bulk assign</button>
              </div>

              <RosterGantt
                team={team}
                onShiftClick={id => setEditingShiftId(id)}
                onSave={saveShift}
                onDelete={deleteShift}
                toast={toast}
              />
            </>
          )}

          {activeLeaf !== "roster" && !empPageName && getScreen(activeLeaf, { persona, onNav: setActiveLeaf, toast, approvals, setApprovalStatus, openEmpHub: setEmpHubName, openEmpPage: setEmpPageName })}
          {empPageName && <EmployeeDetailPage name={empPageName} onClose={() => setEmpPageName(null)} toast={toast} onNav={setActiveLeaf}/>}

          {/* ── Mobile shell ── */}
          <header className="mob-topbar">
            <div className="brand">
              <img className="wordmark-img" src="assets/humi-logo-light.png" alt="humi"/>
            </div>
            <div className="right">
              <button className="persona-hub" onClick={() => setPsOpen(true)}>
                <span className="ph-chip">{persona.short}</span>
                <I.caretDn/>
              </button>
              <button className="tb-avatar" style={{ background: persona.avBg, color: "#fff" }} onClick={() => setPsOpen(true)}>{persona.av}</button>
            </div>
          </header>

          <div className="mob-page">
            <div className="mob-date">
              <div>
                <div className="lbl">Roster · day</div>
                <strong>{dayLabel}</strong>
              </div>
              <div className="nav">
                <button onClick={() => shiftDate(-1)} aria-label="Previous day"><I.chevL/></button>
                <button className="today" onClick={() => setDate(new Date("2026-05-23T12:00:00"))}>Today</button>
                <button onClick={() => shiftDate(1)} aria-label="Next day"><I.chevR/></button>
              </div>
            </div>

            {mobLeaf === "roster" ? <MobileRoster team={team}/> : (
              <div className="mob-card" style={{ textAlign: "center", padding: "40px 16px" }}>
                <div className="eyebrow">{mobCurrentLeaf?.g} · {mobCurrentLeaf?.parent?.toUpperCase()}</div>
                <h4 style={{ margin: "6px 0" }}>{mobCurrentLeaf?.label || "Humi"}</h4>
                <p style={{ fontSize: 12.5, color: "var(--color-ink-muted)", margin: 0 }}>Tap <b>Team</b> → <b>Roster &amp; Shifts</b> to see the live timeline.</p>
              </div>
            )}
          </div>

          <nav className="bottom-nav">
            {MODULES.map(m => {
              const locked = !persona.access.includes(m.g);
              const active = mobSheet?.id === m.id;
              return (
                <button
                  key={m.id}
                  className={"bn-tab" + (active ? " active" : "") + (locked ? " locked" : "")}
                  onClick={() => !locked && setMobSheet(active ? null : m)}
                  disabled={locked}
                >
                  {locked && <span className="lock-ico"><I.lock/></span>}
                  <m.ico/>
                  <span>{m.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>

          <div className={"mob-sheet-backdrop" + (mobSheet ? " open" : "")} onClick={() => setMobSheet(null)}/>
          <div className={"mob-sheet" + (mobSheet ? " open" : "")}>
            <div className="handle"/>
            {mobSheet && (
              <>
                <div className="sh-head">
                  <span className="sh-ico"><mobSheet.ico/></span>
                  <div>
                    <div className="sh-eyebrow">Track · {mobSheet.g}</div>
                    <div className="sh-title">{mobSheet.label}</div>
                  </div>
                  <span className="sh-pill">Active</span>
                  <button className="sh-close" onClick={() => setMobSheet(null)}><I.x/></button>
                </div>
                <div className="sh-list">
                  {mobSheet.leaves.map(l => (
                    <div
                      key={l.id}
                      className={"sh-leaf" + (mobLeaf === l.id ? " active" : "")}
                      onClick={() => { setMobLeaf(l.id); setMobSheet(null); toast({ msg: `Opened ${l.label}` }); }}
                    >
                      <span className="pip"/>
                      <span>{l.label}</span>
                      {l.badge && <span className="b">{l.badge}</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* ── Bulk assign modal ── */}
      {showBulk && (
        <div className="modal-overlay" onClick={() => setShowBulk(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <header className="modal-head">
              <div>
                <div className="eyebrow">B-02 · BULK ASSIGN</div>
                <h3>Assign shifts to multiple staff</h3>
              </div>
              <button className="drawer-x" onClick={() => setShowBulk(false)}><I.x/></button>
            </header>
            <div className="modal-body">
              <div className="form-grid">
                <TimeField label="Start" value={9} onChange={() => {}}/>
                <TimeField label="End"   value={17} onChange={() => {}}/>
              </div>
              <div className="presets-label" style={{ marginTop: 14 }}>Apply to</div>
              <div className="bulk-staff">
                {team.map(e => (
                  <label key={e.id} className="bulk-row">
                    <input type="checkbox" defaultChecked={!e.shift}/>
                    <span className="emp-av" style={{ background: e.avBg, width: 26, height: 26, fontSize: 10 }}>{e.iv}</span>
                    <div style={{ flex: 1 }}>
                      <div className="emp-name" style={{ fontSize: 13 }}>{e.name}</div>
                      <div className="emp-meta">{e.role}</div>
                    </div>
                    <span className="bulk-current">{e.shift ? `${hh(e.shift.start)}–${hh(e.shift.end)}` : "no shift"}</span>
                  </label>
                ))}
              </div>
            </div>
            <footer className="modal-foot">
              <button className="ghost-btn" onClick={() => setShowBulk(false)}>Cancel</button>
              <button className="primary-btn" onClick={() => {
                setTeam(t => t.map(e => e.shift ? e : { ...e, shift: { start: 9, end: 17, variant: "default" } }));
                setShowBulk(false);
                toast({ kind: "success", msg: "Bulk shifts assigned", detail: "9:00–17:00 applied to off-shift staff" });
              }}><I.check/> Apply to selected</button>
            </footer>
          </div>
        </div>
      )}

      <PersonaSwitcher
        open={psOpen}
        onClose={() => setPsOpen(false)}
        current={personaId}
        onSelect={(id) => { setPersonaId(id); toast({ msg: `Switched to ${PERSONAS[id].name}`, detail: `Access tiers: ${PERSONAS[id].access.join(" · ")}` }); }}
      />

      {empHubName && (
        <EmployeeHub
          name={empHubName}
          onClose={() => setEmpHubName(null)}
          toast={toast}
          onNav={setActiveLeaf}
        />
      )}

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} toast={toast}/>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNav={setActiveLeaf}
        openShiftEditor={setEditingShiftId}
        setPersonaId={setPersonaId}
        toast={toast}
      />

      <ShiftEditor
        emp={editingEmp}
        onClose={() => setEditingShiftId(null)}
        onSave={saveShift}
        onDelete={deleteShift}
        toast={toast}
      />

      <ToastHost toasts={toasts} dismiss={dismiss}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
