/* =====================================================================
   ONE FILE TO CONFIGURE THE WHOLE PAGE
   Questions for the Financial Freedom app live in src/data/questions.js
   ===================================================================== */

/* ---------- Business ---------- */
export const ZAMZAM_URL = "https://zamzam-capital.com/";
export const ZAMZAM_PHONE = "+91 8694010200";      // shown on the page
export const ZAMZAM_PHONE_TEL = "+918694010200";   // used in tel: links
export const ZAMZAM_WHATSAPP = "918694010200";     // digits only, used in wa.me links
export const SEBI_REG_NUMBER = "INH000016199";
export const YOUTUBE_VIDEO_ID = "-OjKbz_P-tQ";

/* ---------- Workbook (PDF lives in Google Drive) ----------
   1. Upload the PDF to Google Drive.
   2. Right-click > Share > General access > "Anyone with the link" (Viewer).
   3. Copy the file ID from the link: drive.google.com/file/d/THIS_PART/view
   After the visitor submits the form they are redirected to this file automatically. */
export const WORKBOOK_DRIVE_FILE_ID = "https://drive.google.com/file/d/1YZMvy85_EUiO7LbGfaFs0G9Q1bm1XZ98/view?usp=sharing";
// "view" opens the PDF in Drive's viewer (reliable on every phone). "download" starts the download straight away.
export const WORKBOOK_OPEN_MODE = "view";
export const WORKBOOK_REDIRECT_DELAY_MS = 1500; // pause on the thank-you message before redirecting

const driveReady = WORKBOOK_DRIVE_FILE_ID && !WORKBOOK_DRIVE_FILE_ID.startsWith("YOUR_");
export const WORKBOOK_URL = !driveReady
  ? ""
  : WORKBOOK_OPEN_MODE === "download"
    ? `https://drive.google.com/uc?export=download&id=${WORKBOOK_DRIVE_FILE_ID}`
    : `https://drive.google.com/file/d/${WORKBOOK_DRIVE_FILE_ID}/view`;

/* ---------- Meta (Facebook) Pixel ---------- */
export const FB_PIXEL_ID = "1794235171612183";

// Rename any event here. standard:true => fbq('track'), standard:false => fbq('trackCustom').
export const PIXEL_EVENTS = {
  ffStarted:         { name: "FinancialFreedom_Started",   standard: false }, // header form submitted, app opens
  ffCompleted:       { name: "CompleteRegistration",       standard: true  }, // thank-you / result screen shown
  workbookOpened:    { name: "Workbook_FormOpened",        standard: false }, // workbook form opened / first touched
  workbookSubmitted: { name: "Lead",                       standard: true  }, // workbook form filled + submitted
};

/* ---------- Google Sheets (Apps Script web app) ---------- */
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEkHo_yTJlLR38ppBmpekHmmyXOEVNLLrjlY63WrhaKU_a3Nwbc2hVQI5CnQzSQnPM/exec";
export const APPS_SCRIPT_SECRET = "VtOvatYL6rqTsUPrwEmrwJoH5SIhgqMi5ehOXegC0J0="; // must match SECRET in apps-script/Code.gs

// Form keys. Each one gets its own tab (or its own spreadsheet) via apps-script/Code.gs
export const FORMS = {
  workbook: "workbook",
  financialFreedom: "financialFreedom",
};

/* ---------- Occupation drop-down (both forms) ---------- */
export const OCCUPATIONS = [
  "Salaried (private sector)",
  "Salaried (government / PSU)",
  "Business owner",
  "Self-employed professional",
  "Homemaker",
  "Retired",
  "Student",
  "Other",
];

/* ---------- Financial Freedom plan assumptions (illustrative, edit with care) ---------- */
export const PLAN = {
  inflationPct: 6,            // yearly rise in living costs
  withdrawalRatePct: 3.5,     // share of the corpus you can live on each year
  // Assumed yearly return used for the estimate, by risk level. These are planning
  // assumptions, NOT forecasts or promises. Have your compliance reviewer sign off.
  // MODEL: Assumptions!D15:D17
  returnPct: { Low: 12, Medium: 14, High: 16 },
  // Risk score (0-100) cut-offs. MODEL: Assumptions!E15:E16 (Low <= 45, Medium <= 75, else High)
  riskBands: { lowMax: 45, mediumMax: 75 },
  // Short horizons cap the risk level whatever the score says
  horizonCaps: [
    { underYears: 3, maxLevel: "Low" },
    { underYears: 7, maxLevel: "Medium" },
  ],
  minAge: 18,
  maxAge: 70,
};

/* ---------- Which smallcase for which risk level ----------
   MODEL: Assumptions!F15:F17. Every id here must exist in src/data/smallcases.js. */
export const RECOMMENDATIONS = {
  Low: "ZMZMSB_0001",    // Zamzam Shariah Leaders Smart Beta
  Medium: "ZMZMTR_0004", // Zamzam Shariah Pharma & Healthcare Tracker
  High: "ZMZMNM_0001",   // Zamzam Shariah New India Theme
};

/* ---------- Editable copy ---------- */
export const COMPARISON_SUBTEXT = "How Zamzam Capital's smallcases compare with other Shariah-compliant funds in the market.";
export const COMPARISON_NOTE = "Source: www.groww.in, www.smallcase.com. Last 12M returns as of 20/10/2026. Past performance is not a guarantee of future returns.";
export const FOUNDER_TAGLINE = "25 years of Islamic Banking & Finance experience";
