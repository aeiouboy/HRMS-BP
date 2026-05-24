// data-cast.jsx — Central source of truth for mock data across all HRMS screens
// One cast, used everywhere. Edit here = ripples through every screen.
//
// Today anchor: 21 พ.ค. 2569 (Thursday, 2026-05-21)
// All dates are ISO; convert via thaiDate(iso) for display

// ─── Time anchor ────────────────────────────────────────────────────────
const TODAY_ISO = "2026-05-21";
const TODAY = new Date(TODAY_ISO + "T09:30:00+07:00");

// ─── Branches ───────────────────────────────────────────────────────────
const BRANCHES = [
  { code: "CWO", name: "Central World",       region: "BKK-Central", hours: "10:00–22:00", headcount: 142 },
  { code: "CCL", name: "Central ChidLom",     region: "BKK-Central", hours: "10:00–22:00", headcount: 118 },
  { code: "CEV", name: "Central EastVille",   region: "BKK-East",    hours: "10:00–22:00", headcount: 76  },
  { code: "CWG", name: "Central WestGate",    region: "BKK-West",    hours: "10:00–22:00", headcount: 92  },
  { code: "CBN", name: "Central Bangna",      region: "BKK-East",    hours: "10:00–22:00", headcount: 88  },
  { code: "CEM", name: "Central EmQuartier",  region: "BKK-Central", hours: "10:00–22:00", headcount: 64  },
  { code: "CLP", name: "Central LardPrao",    region: "BKK-North",   hours: "10:00–22:00", headcount: 102 },
  { code: "CPL", name: "Central PinkLao",     region: "BKK-West",    hours: "10:00–22:00", headcount: 71  },
  { code: "HQ",  name: "CRG Headquarter",     region: "BKK-Central", hours: "08:30–17:30", headcount: 240 },
];

// ─── Cast · 25 people, real-looking, with intentional imperfections ─────
// Flags (machine-readable) drive realistic edge cases in screens:
//   probation-d105     · in probation, day 105 of 120
//   probation-overdue  · past probation date, mgr hasn't approved
//   resigning          · resignation submitted, awaiting clearance
//   maternity-soon     · expecting · upcoming long leave
//   missing-emergency  · emergency contact blank (data hygiene)
//   ot-frequent        · 30+ OT hours/month consistently
//   frequent-late      · 4+ late check-ins this month
//   approver-backlog   · has pending approvals
//   recurring-claim    · monthly claim pattern (chronic condition)
//   top-seller         · top sales rank
//   study-leave-pending· pending study leave request
//   on-training        · away on training this week
//   primary-persona    · this person IS the demo persona for that role

const CAST = [
  // ─── Employees (พนักงานหน้าร้าน) ───
  { id: "E2204", name: "กฤษณ์ สิริวงศ์",    nick: "หนุ่ม", gender: "M", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-2",  branch: "CWO", dept: "เครื่องสำอาง · Estée Lauder",    managerId: "E1832", salary: 18750, salaryGrade: "S03", hireDate: "2023-06-19", status: "active",    bankLast4: "4192", phone: "081-XXX-3408", lineId: "noom.sw",   hue: 12,  persona: "employee", primary: true, flags: ["top-seller","primary-persona"] },
  { id: "E2451", name: "ศิรินภา ทองอ่อน",   nick: "เมย์",  gender: "F", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-3",  branch: "CWO", dept: "เครื่องสำอาง · MAC",            managerId: "E1832", salary: 21300, salaryGrade: "S04", hireDate: "2021-11-08", status: "active",    bankLast4: "8021", phone: "089-XXX-1107", lineId: null,        hue: 340, persona: "employee",                 flags: ["maternity-soon","missing-emergency"] },
  { id: "E2789", name: "ธนากร พรหมจรรย์",  nick: "บอย",   gender: "M", role: "พนักงานแคชเชียร์",  roleEn: "Cashier",             level: "C-2",   branch: "CCL", dept: "Tops Market · Chidlom B1",       managerId: "E1547", salary: 16480, salaryGrade: "S02", hireDate: "2024-03-04", status: "probation", bankLast4: "5536", phone: "062-XXX-9921", lineId: "boy_tk",    hue: 200, persona: "employee", probationEnd: "2026-09-04", flags: ["probation-d105"] },
  { id: "E2812", name: "ปวีณา ตันสกุล",     nick: "นุ่น",  gender: "F", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-1",  branch: "CEV", dept: "Power Buy · Audio",              managerId: "E1612", salary: 17920, salaryGrade: "S02", hireDate: "2024-08-15", status: "active",    bankLast4: "2207", phone: "083-XXX-4456", lineId: "nun_pv",    hue: 280, persona: "employee",                 flags: [] },
  { id: "E2854", name: "อัครเดช มากศรี",   nick: "เอก",   gender: "M", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-2",  branch: "CWG", dept: "Supersports · Running",          managerId: "E1719", salary: 18200, salaryGrade: "S03", hireDate: "2024-01-22", status: "active",    bankLast4: "9314", phone: "095-XXX-2280", lineId: "ake_run",   hue: 110, persona: "employee",                 flags: ["ot-frequent"] },
  { id: "E2901", name: "วรรณวิภา จรรยา",   nick: "วาว",   gender: "F", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-2",  branch: "CBN", dept: "Robinson · เครื่องครัว",        managerId: "E1804", salary: 18650, salaryGrade: "S03", hireDate: "2023-09-11", status: "active",    bankLast4: "1148", phone: "081-XXX-7763", lineId: "wow.j",     hue: 25,  persona: "employee",                 flags: ["recurring-claim"] },
  { id: "E2945", name: "ภาณุพงศ์ ศรีสุวรรณ", nick: "นัท", gender: "M", role: "Visual Merchandiser", roleEn: "VM",                level: "VM-1",  branch: "CEM", dept: "Window Display Team",            managerId: "E1612", salary: 22400, salaryGrade: "S04", hireDate: "2022-04-18", status: "active",    bankLast4: "6017", phone: "090-XXX-3322", lineId: "nut.vm",    hue: 220, persona: "employee", resignDate: "2026-06-15", flags: ["resigning"] },
  { id: "E3012", name: "ชนิกานต์ บุญเลิศ",  nick: "แก้ม",  gender: "F", role: "พนักงานแคชเชียร์",  roleEn: "Cashier",             level: "C-1",   branch: "CLP", dept: "Tops Market · LardPrao",         managerId: "E1872", salary: 15780, salaryGrade: "S01", hireDate: "2025-10-01", status: "probation", bankLast4: "3392", phone: "088-XXX-5510", lineId: null,        hue: 320, persona: "employee", probationEnd: "2026-04-01", flags: ["probation-overdue"] },
  { id: "E3058", name: "ธีระพงษ์ คงดี",     nick: "บอม",   gender: "M", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-1",  branch: "CPL", dept: "B2S · เครื่องเขียน",            managerId: "E1804", salary: 16100, salaryGrade: "S02", hireDate: "2025-02-17", status: "active",    bankLast4: "7745", phone: "092-XXX-1903", lineId: "bombom",    hue: 160, persona: "employee",                 flags: ["frequent-late"] },
  { id: "E3094", name: "ปริยา สุวรรณภูมิ",  nick: "ปุ๊ก",  gender: "F", role: "พนักงานขาย",        roleEn: "Product Consultant",  level: "PC-3",  branch: "CWO", dept: "เครื่องสำอาง · SK-II",          managerId: "E1832", salary: 23800, salaryGrade: "S04", hireDate: "2020-07-06", status: "active",    bankLast4: "0428", phone: "086-XXX-8829", lineId: "puk.sk",    hue: 350, persona: "employee",                 flags: ["top-seller","study-leave-pending"] },

  // ─── Floor Supervisors ───
  { id: "E1719", name: "ณัฐกานต์ พรรณราย",  nick: "เก๋",   gender: "F", role: "Floor Supervisor", roleEn: "Floor Supervisor",     level: "FS-2",  branch: "CWG", dept: "Supersports",                    managerId: "E1245", salary: 34500, salaryGrade: "M01", hireDate: "2017-03-20", status: "active",    bankLast4: "9921", phone: "081-XXX-5602", lineId: "ke_ss",     hue: 100, persona: "manager",                  flags: ["approver-backlog"] },
  { id: "E1804", name: "สมชาย ชนาวงศ์",     nick: "ชาย",   gender: "M", role: "Floor Supervisor", roleEn: "Floor Supervisor",     level: "FS-3",  branch: "CBN", dept: "Robinson · Home",                managerId: "E1245", salary: 38900, salaryGrade: "M02", hireDate: "2014-11-04", status: "active",    bankLast4: "1156", phone: "089-XXX-7790", lineId: "somchai",   hue: 215, persona: "manager",                  flags: [] },
  { id: "E1872", name: "พิมพ์ใจ วิรุฬห์",   nick: "ใจ",    gender: "F", role: "Floor Supervisor", roleEn: "Floor Supervisor",     level: "FS-2",  branch: "CLP", dept: "Tops Market · Fresh",            managerId: "E1248", salary: 33200, salaryGrade: "M01", hireDate: "2018-06-25", status: "active",    bankLast4: "5587", phone: "088-XXX-2210", lineId: "jai_tops",  hue: 30,  persona: "manager",                  flags: ["on-training"] },
  { id: "E1612", name: "ปริญญา แดงเพ็ง",    nick: "ตูน",   gender: "M", role: "Floor Supervisor", roleEn: "Floor Supervisor",     level: "FS-2",  branch: "CEV", dept: "Power Buy",                      managerId: "E1245", salary: 35100, salaryGrade: "M01", hireDate: "2018-09-10", status: "active",    bankLast4: "8814", phone: "081-XXX-3320", lineId: "toon.pb",   hue: 250, persona: "manager",                  flags: [] },
  { id: "E1547", name: "อรอุมา ทิพย์โสภณ",  nick: "ฝน",    gender: "F", role: "Floor Supervisor", roleEn: "Floor Supervisor",     level: "FS-3",  branch: "CCL", dept: "Tops Market · Chidlom",          managerId: "E1248", salary: 39600, salaryGrade: "M02", hireDate: "2015-04-13", status: "active",    bankLast4: "4470", phone: "092-XXX-9985", lineId: "fon.tops",  hue: 195, persona: "manager",                  flags: [] },

  // ─── Store / Regional Managers ───
  { id: "E1832", name: "สมศักดิ์ ชยพันธ์",  nick: "ศักดิ์", gender: "M", role: "Store Manager",   roleEn: "Store Manager",        level: "SM-1",  branch: "CWO", dept: "Central World · All",            managerId: "E1245", salary: 78400, salaryGrade: "M04", hireDate: "2012-08-22", status: "active",    bankLast4: "1107", phone: "081-XXX-1188", lineId: "sak_cwo",   hue: 220, persona: "manager", primary: true,    flags: ["primary-persona"] },
  { id: "E1245", name: "วิภาวี ตรีรัตน์",   nick: "วิ",    gender: "F", role: "Regional Manager", roleEn: "Regional Manager",     level: "RM",    branch: "HQ",  dept: "Ops · BKK Region 1",             managerId: "E0822", salary: 142000, salaryGrade: "D01", hireDate: "2008-02-04", status: "active",    bankLast4: "0028", phone: "081-XXX-0001", lineId: "viv.crg",   hue: 280, persona: "manager",                  flags: [] },
  { id: "E1248", name: "ประภัสสร เลิศวงษ์", nick: "ก้อย",  gender: "F", role: "Regional Manager", roleEn: "Regional Manager",     level: "RM",    branch: "HQ",  dept: "Ops · BKK Region 2",             managerId: "E0822", salary: 138500, salaryGrade: "D01", hireDate: "2009-07-12", status: "active",    bankLast4: "3309", phone: "081-XXX-0002", lineId: "koi.crg",   hue: 50,  persona: "manager",                  flags: [] },

  // ─── HR Admin / HRIS / SPD ───
  { id: "E0941", name: "จงรักษ์ พงศ์ภัทร์", nick: "จง",    gender: "F", role: "HR Admin · HRBP",  roleEn: "HR Business Partner",  level: "HR-2",  branch: "HQ",  dept: "HR · BKK R1 HRBP",               managerId: "E0512", salary: 58200, salaryGrade: "M03", hireDate: "2016-10-17", status: "active",    bankLast4: "7711", phone: "086-XXX-4422", lineId: "jong.hrbp", hue: 18,  persona: "admin",   primary: true,   flags: ["primary-persona"] },
  { id: "E0982", name: "อาทิตยา ศรีนวล",    nick: "เอ้",   gender: "F", role: "HR Officer",       roleEn: "HR Officer",           level: "HR-1",  branch: "HQ",  dept: "HR · Employee Records",          managerId: "E0512", salary: 42800, salaryGrade: "M02", hireDate: "2020-01-13", status: "active",    bankLast4: "5582", phone: "081-XXX-3344", lineId: null,        hue: 290, persona: "admin",                    flags: [] },
  { id: "E0512", name: "พรวลัย กิตติพงศ์",  nick: "พร",    gender: "F", role: "HRIS Manager",     roleEn: "HRIS Manager",         level: "M-3",   branch: "HQ",  dept: "HR Technology",                  managerId: "E0301", salary: 88500, salaryGrade: "M04", hireDate: "2013-05-06", status: "active",    bankLast4: "1029", phone: "081-XXX-0107", lineId: "porn.hris", hue: 45,  persona: "hris",    primary: true,   flags: ["primary-persona"] },
  { id: "E0738", name: "นภสร ทับทิม",       nick: "เอม",   gender: "F", role: "SPD Officer",      roleEn: "Document Control",     level: "SPD-1", branch: "HQ",  dept: "SPD · Personnel Docs",           managerId: "E0512", salary: 36400, salaryGrade: "M01", hireDate: "2019-08-14", status: "active",    bankLast4: "8806", phone: "082-XXX-1190", lineId: "aim.spd",   hue: 200, persona: "spd",     primary: true,   flags: ["primary-persona"] },

  // ─── Top of org (referenced by managers but rarely shown directly) ───
  { id: "E0822", name: "ธนพร เจริญวัฒน์",  nick: "ธน",    gender: "F", role: "VP Operations",    roleEn: "VP Operations",        level: "VP",    branch: "HQ",  dept: "Operations BKK",                 managerId: "E0301", salary: 245000, salaryGrade: "D03", hireDate: "2001-06-10", status: "active",    bankLast4: "0001", phone: "081-XXX-0011", lineId: null,        hue: 5,   persona: "manager",                  flags: [] },
  { id: "E0301", name: "ปกรณ์ สิทธิโชค",    nick: "ป็อก",  gender: "M", role: "CHRO",             roleEn: "Chief HR Officer",     level: "C",     branch: "HQ",  dept: "Human Resources",                managerId: null,    salary: 312000, salaryGrade: "C01", hireDate: "1998-03-04", status: "active",    bankLast4: "0002", phone: "081-XXX-0099", lineId: null,        hue: 240, persona: "admin",                    flags: [] },
];

// ─── Holidays · TH 2569 (selected, realistic) ───────────────────────────
const HOLIDAYS_2569 = [
  { date: "2026-01-01", name: "วันขึ้นปีใหม่",                    type: "public" },
  { date: "2026-02-12", name: "วันมาฆบูชา (ชดเชย 13)",            type: "public" },
  { date: "2026-04-06", name: "วันจักรี",                         type: "public" },
  { date: "2026-04-13", name: "วันสงกรานต์",                      type: "public" },
  { date: "2026-04-14", name: "วันสงกรานต์",                      type: "public" },
  { date: "2026-04-15", name: "วันสงกรานต์",                      type: "public" },
  { date: "2026-05-01", name: "วันแรงงาน",                        type: "public" },
  { date: "2026-05-04", name: "วันฉัตรมงคล",                      type: "public" },
  { date: "2026-05-11", name: "วันพืชมงคล",                       type: "public" },
  { date: "2026-06-01", name: "วันวิสาขบูชา",                     type: "public" },
  { date: "2026-06-03", name: "วันเฉลิมพระชนมพรรษา ราชินี",       type: "public" },
  { date: "2026-07-29", name: "วันอาสาฬหบูชา",                    type: "public" },
  { date: "2026-07-30", name: "วันเข้าพรรษา (ชดเชย)",             type: "public" },
  { date: "2026-07-28", name: "วันเฉลิมพระชนมพรรษา ร.10",         type: "public" },
  { date: "2026-08-12", name: "วันแม่",                            type: "public" },
  { date: "2026-10-13", name: "วันคล้ายวันสวรรคต ร.9",            type: "public" },
  { date: "2026-10-23", name: "วันปิยมหาราช",                     type: "public" },
  { date: "2026-12-05", name: "วันคล้ายวันพระบรมราชสมภพ ร.9 · วันพ่อ", type: "public" },
  { date: "2026-12-10", name: "วันรัฐธรรมนูญ",                    type: "public" },
  { date: "2026-12-31", name: "วันสิ้นปี",                        type: "public" },
  { date: "2026-07-06", name: "Half-Year Closing (CRG)",          type: "company" },
  { date: "2026-12-28", name: "Year-End Closing (CRG)",           type: "company" },
];

// ─── Hospitals · Central Retail panel hospitals (real, plausible) ───────
const HOSPITALS_PANEL = [
  { code: "BHO",  name: "โรงพยาบาลบำรุงราษฎร์",     tier: "premium",  city: "BKK", panelSince: "2018" },
  { code: "SVH",  name: "โรงพยาบาลสมิติเวช สุขุมวิท", tier: "premium", city: "BKK", panelSince: "2015" },
  { code: "BGH",  name: "โรงพยาบาลกรุงเทพ",         tier: "premium",  city: "BKK", panelSince: "2012" },
  { code: "CHU",  name: "โรงพยาบาลจุฬาลงกรณ์",      tier: "standard", city: "BKK", panelSince: "2020" },
  { code: "RAM",  name: "โรงพยาบาลรามคำแหง",        tier: "standard", city: "BKK", panelSince: "2017" },
  { code: "PHY",  name: "โรงพยาบาลพญาไท 2",         tier: "standard", city: "BKK", panelSince: "2019" },
  { code: "VTH",  name: "โรงพยาบาลวิภาวดี",          tier: "standard", city: "BKK", panelSince: "2016" },
  { code: "SRT",  name: "โรงพยาบาลศิริราช",         tier: "standard", city: "BKK", panelSince: "2021" },
];

// ─── Leave types & balances per cast person (in days, accrual-based) ────
// Pattern: total - used = remaining
const LEAVE_TYPES = [
  { code: "AL",  th: "ลาพักร้อน",   en: "Annual Leave",     yearly: 10, color: "#1FA8A0" },
  { code: "SL",  th: "ลาป่วย",      en: "Sick Leave",       yearly: 30, color: "#FB923C" },
  { code: "PL",  th: "ลากิจ",       en: "Personal Leave",   yearly: 6,  color: "#5B6CE0" },
  { code: "ML",  th: "ลาคลอด",      en: "Maternity Leave",  yearly: 98, color: "#9333EA" },
  { code: "STL", th: "ลาเพื่อศึกษา", en: "Study Leave",      yearly: 5,  color: "#D4A53A" },
  { code: "UPL", th: "ลาไม่รับค่าจ้าง", en: "Unpaid Leave", yearly: null, color: "#8A97A8" },
];

// ─── Helpers ────────────────────────────────────────────────────────────

const _personById = id => CAST.find(p => p.id === id);

// Thai date display: "21 พ.ค. 2569" or "พฤหัสบดี 21 พฤษภาคม 2569"
const THAI_MONTH_SHORT = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
const THAI_MONTH_FULL  = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const THAI_DOW_SHORT   = ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."];
const THAI_DOW_FULL    = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];

function thaiDate(iso, format = "short") {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00+07:00" : ""));
  const day = d.getDate(), mo = d.getMonth(), yr = d.getFullYear() + 543, dow = d.getDay();
  if (format === "short")  return `${day} ${THAI_MONTH_SHORT[mo]} ${yr}`;
  if (format === "long")   return `${day} ${THAI_MONTH_FULL[mo]} ${yr}`;
  if (format === "full")   return `${THAI_DOW_FULL[dow]}ที่ ${day} ${THAI_MONTH_FULL[mo]} ${yr}`;
  if (format === "compact") return `${day}/${(mo+1).toString().padStart(2,"0")}/${(yr%100).toString().padStart(2,"0")}`;
  if (format === "dow")    return THAI_DOW_SHORT[dow];
  return iso;
}

// Currency: ฿28,750 — never round to 1000s for retail tier
function baht(n, opts = {}) {
  if (n == null) return "—";
  const fixed = opts.cents ? n.toFixed(2) : Math.round(n).toString();
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "฿" + withCommas + (decPart ? "." + decPart : "");
}

// Tenure: "5 ปี 8 เดือน" from hire date
function tenure(hireDate, fromIso = TODAY_ISO) {
  const a = new Date(hireDate + "T00:00:00+07:00");
  const b = new Date(fromIso  + "T00:00:00+07:00");
  let years = b.getFullYear() - a.getFullYear();
  let months = b.getMonth() - a.getMonth();
  if (b.getDate() < a.getDate()) months--;
  if (months < 0) { years--; months += 12; }
  if (years <= 0) return `${months} เดือน`;
  if (months === 0) return `${years} ปี`;
  return `${years} ปี ${months} เดือน`;
}

// Days from / to today, signed (positive = future, negative = past)
function daysFromToday(iso) {
  const d = new Date(iso + "T00:00:00+07:00");
  const t = new Date(TODAY_ISO + "T00:00:00+07:00");
  return Math.round((d - t) / 86400000);
}

// "3 วันที่แล้ว" / "อีก 5 วัน" / "วันนี้"
function relTime(iso) {
  const n = daysFromToday(iso);
  if (n === 0) return "วันนี้";
  if (n === 1) return "พรุ่งนี้";
  if (n === -1) return "เมื่อวาน";
  if (n > 0) return `อีก ${n} วัน`;
  return `${Math.abs(n)} วันที่แล้ว`;
}

// Pick a person (or several) by flag — used by screens to populate scenarios
function findByFlag(flag) { return CAST.filter(p => p.flags.includes(flag)); }
function findByPersona(persona, primaryOnly = false) {
  return CAST.filter(p => p.persona === persona && (!primaryOnly || p.primary));
}
function person(id) { return _personById(id); }
function branch(code) { return BRANCHES.find(b => b.code === code); }

// Deterministic "random" — same seed → same result. For shift schedules, IDs, etc.
function seededPick(seed, arr) {
  let h = 2166136261;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return arr[Math.abs(h) % arr.length];
}

// Avatar gradient from `hue` (HSL-based, retail-warm)
function avatarGradient(hue) {
  return `linear-gradient(135deg, hsl(${hue}, 60%, 62%), hsl(${(hue+30)%360}, 55%, 70%))`;
}

// Initials from Thai name (2 chars of nick, or first chars of given+family)
function initials(person) {
  if (!person) return "—";
  if (person.nick) return person.nick.slice(0, 2);
  const parts = (person.name || "").split(" ");
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
}

// ─── Realistic scenario seeds — what's "in flight" today ───────────────
// These are pre-built records that any screen can import directly.
// All reference real cast IDs + real branches + real dates.

const PENDING_LEAVE_REQUESTS = [
  { id: "LR-2026-0418", employeeId: "E2204", type: "AL", from: "2026-05-26", to: "2026-05-28", days: 3,   reason: "เดินทางต่างจังหวัด งานบวชน้องชาย", submittedAt: "2026-05-19T14:22", status: "pending", approverId: "E1832" },
  { id: "LR-2026-0421", employeeId: "E2451", type: "ML", from: "2026-07-01", to: "2026-10-06", days: 98,  reason: "ลาคลอด (98 วัน) เอกสารแพทย์แนบ", submittedAt: "2026-05-20T09:08", status: "pending", approverId: "E1832", attachments: 2 },
  { id: "LR-2026-0423", employeeId: "E3094", type: "STL",from: "2026-06-15", to: "2026-06-19", days: 5,   reason: "อบรม Brand Trainer หลักสูตร SK-II APAC",  submittedAt: "2026-05-20T16:45", status: "pending", approverId: "E1832", attachments: 1 },
  { id: "LR-2026-0419", employeeId: "E2854", type: "SL", from: "2026-05-20", to: "2026-05-21", days: 2,   reason: "ป่วยไข้หวัด ใบรับรองแพทย์แนบ", submittedAt: "2026-05-20T08:12", status: "pending", approverId: "E1719", attachments: 1 },
  { id: "LR-2026-0420", employeeId: "E2901", type: "PL", from: "2026-05-23", to: "2026-05-23", days: 1,   reason: "ติดต่อราชการ ทำใบขับขี่",   submittedAt: "2026-05-19T18:30", status: "pending", approverId: "E1804" },
];

const PENDING_CLAIMS = [
  { id: "CL-2026-0892", employeeId: "E2901", category: "ค่ารักษาพยาบาล", subType: "OPD", amount: 1840,  hospital: "BHO", visitDate: "2026-05-15", submittedAt: "2026-05-17T19:22", status: "pending-admin", attachments: 2, note: "เบิกประจำเดือน · เบาหวาน" },
  { id: "CL-2026-0894", employeeId: "E2204", category: "ค่ารักษาพยาบาล", subType: "IPD", amount: 24500, hospital: "SVH", visitDate: "2026-05-11", submittedAt: "2026-05-13T10:15", status: "pending-spd",   attachments: 5, note: "ผ่าตัดไส้เลื่อน · บางส่วนเกินวงเงิน" },
  { id: "CL-2026-0895", employeeId: "E2812", category: "ค่าทันตกรรม",    subType: "ขูดหินปูน",  amount: 800,   hospital: "VTH", visitDate: "2026-05-18", submittedAt: "2026-05-19T12:00", status: "pending-admin", attachments: 1 },
  { id: "CL-2026-0897", employeeId: "E2854", category: "ค่าตัดแว่น",     subType: "เลนส์สายตา",  amount: 4200, hospital: null,  visitDate: "2026-05-14", submittedAt: "2026-05-15T11:30", status: "pending-mgr",   attachments: 2, note: "ใช้สิทธิ์รอบ 2 ปี" },
  { id: "CL-2026-0898", employeeId: "E3094", category: "ค่ารักษาพยาบาล", subType: "OPD", amount: 2150,  hospital: "BGH", visitDate: "2026-05-16", submittedAt: "2026-05-19T20:05", status: "pending-admin", attachments: 2 },
];

const TODAYS_ATTENDANCE_EXCEPTIONS = [
  { employeeId: "E2204", clockIn: "08:58", clockOut: null,    status: "on-shift",        shift: "10:00-19:00" },
  { employeeId: "E2451", clockIn: "10:02", clockOut: null,    status: "late-2min",       shift: "10:00-19:00" },
  { employeeId: "E2789", clockIn: null,    clockOut: null,    status: "absent",          shift: "10:00-19:00", note: "ไม่ตอกบัตร · ติดต่อไม่ได้" },
  { employeeId: "E2812", clockIn: "09:55", clockOut: null,    status: "on-shift",        shift: "10:00-19:00" },
  { employeeId: "E2854", clockIn: null,    clockOut: null,    status: "on-leave",        shift: "10:00-19:00", note: "ลาป่วย LR-2026-0419" },
  { employeeId: "E2901", clockIn: "13:01", clockOut: null,    status: "late-shift-2",    shift: "13:00-22:00" },
  { employeeId: "E3058", clockIn: "10:23", clockOut: null,    status: "late-23min",      shift: "10:00-19:00", note: "สายเป็นรอบ 5 ในเดือนนี้" },
  { employeeId: "E3094", clockIn: "09:58", clockOut: null,    status: "on-shift",        shift: "10:00-19:00" },
];

// ─── Export ─────────────────────────────────────────────────────────────
Object.assign(window, {
  // anchors
  TODAY_ISO, TODAY,
  // data
  BRANCHES, CAST, HOLIDAYS_2569, HOSPITALS_PANEL, LEAVE_TYPES,
  PENDING_LEAVE_REQUESTS, PENDING_CLAIMS, TODAYS_ATTENDANCE_EXCEPTIONS,
  // helpers
  thaiDate, baht, tenure, daysFromToday, relTime,
  findByFlag, findByPersona, person, branch,
  seededPick, avatarGradient, initials,
});
