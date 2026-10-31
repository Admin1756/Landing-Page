/* =====================================================================
   ONE FILE TO CONFIGURE THE WHOLE PAGE
   Financial Freedom questions live in src/data/questions.js
   Smallcase cards, comparison table, testimonials: src/data/site.js
   ===================================================================== */

/* ---------- Business ---------- */
export const ZAMZAM_URL = "https://zamzam-capital.com/";
export const ZAMZAM_PHONE = "+91 8694010200";      // shown on the page
export const ZAMZAM_PHONE_TEL = "+918694010200";   // used in tel: links
export const ZAMZAM_WHATSAPP = "918694010200";     // digits only, used in wa.me links
export const SEBI_REG_NUMBER = "INH000016199";
export const YOUTUBE_VIDEO_ID = "-OjKbz_P-tQ";

/* ---------- 20% offer ---------- */
export const COUPON_CODE = "ZAMZAM20";
export const OFFER_MS = 3 * 60 * 60 * 1000;          // countdown length (per visitor)
export const OFFER_DEADLINE_KEY = "zz_offer_deadline_v1";
export const OFFER_CLAIMED_KEY = "zz_offer_claimed_v1";
// Shown once a visitor clicks any offer button (subscribe, contact, finished Financial Freedom plan).
// The countdown stops at the same moment.
export const OFFER_WON_TITLE = "Congratulations! You have won 20% off on all our smallcases.";
export const OFFER_WON_DETAIL = "Details of the offer and some other free Zamzam tools will be delivered to your inbox.";

/* ---------- Meta (Facebook) Pixel ----------
   The Pixel base code (ID 1100861279466232) lives in public/index.html so it loads before React.
   Events are fired through src/utils/pixel.js using the names below.
   standard:true => fbq('track'), standard:false => fbq('trackCustom'). */
export const PIXEL_EVENTS = {
  // Smallcase "Subscribe with 20% off" button on a card -> opens the coupon pop-up
  subscribeClick:   { name: "InitiateCheckout",           standard: true  },
  // Final button in the pop-up (copy code + go to smallcase). Fires this AND a per-smallcase custom
  // event named  Subscribe_<scid>  (e.g. Subscribe_ZMZMSB_0001) so each smallcase can be tracked on its own.
  subscribeFinal:   { name: "Subscribe",                  standard: true  },
  // "Call or WhatsApp Us" button and the contact form button
  contact:          { name: "Contact",                    standard: true  },
  // "View Comparison Chart" button
  viewComparison:   { name: "ViewComparisonChart",        standard: false },
  // Financial Freedom form
  ffStarted:        { name: "FinancialFreedom_Started",   standard: false },
  ffCompleted:      { name: "CompleteRegistration",       standard: true  },
};

/* ---------- Google Sheets (Apps Script web app) ---------- */
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEkHo_yTJlLR38ppBmpekHmmyXOEVNLLrjlY63WrhaKU_a3Nwbc2hVQI5CnQzSQnPM/exec";
export const APPS_SCRIPT_SECRET = "VtOvatYL6rqTsUPrwEmrwJoH5SIhgqMi5ehOXegC0J0="; // must match SECRET in apps-script/Code.gs

// Form keys. Each one gets its own tab via apps-script/Code.gs
export const FORMS = {
  contact: "contact",                 // tab "Contact Us"
  financialFreedom: "financialFreedom", // tab "Financial Freedom"
};

/* ---------- Occupation drop-down (Financial Freedom form) ---------- */
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
  returnPct: { Low: 12, Medium: 14, High: 16 },
  // Risk score (0-100) cut-offs (Low <= 45, Medium <= 75, else High)
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
   Every id here must exist in src/data/planSmallcases.js. */
export const RECOMMENDATIONS = {
  Low: "ZMZMSB_0001",    // Zamzam Shariah Leaders Smart Beta
  Medium: "ZMZMTR_0004", // Zamzam Shariah Pharma & Healthcare Tracker
  High: "ZMZMNM_0001",   // Zamzam Shariah New India Theme
};

/* ---------- Editable copy ---------- */
export const HERO_FOOTNOTE = "*Returns shown are based on last one year performance. Investments in securities are subject to market risk. Read all scheme-related documents carefully before investing.";
export const FOUNDER_TAGLINE = "25 years of Islamic Banking & Finance experience";
export const COMPARISON_SUBTEXT = "See Zamzam Capital's performance as compared to other Shariah-compliant funds as of 16/10/2026";
export const COMPARISON_NOTE = "Source: www.groww.in, www.smallcase.com";
