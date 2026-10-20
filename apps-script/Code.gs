/**
 * ZAMZAM CAPITAL - LEAD CAPTURE BACKEND (Google Apps Script)
 *
 * What it does
 *  1. Receives both forms from the landing page and saves each in its own sheet (tab).
 *     - "Workbook Leads": one row per submission.
 *     - "Financial Freedom": one row per person, updated after every question,
 *       so you can see where people drop off.
 *  2. Optionally emails your team when someone completes the Financial Freedom plan.
 *
 * The workbook PDF is NOT sent from here. After the form is saved, the website redirects
 * the visitor to the PDF in Google Drive (set WORKBOOK_DRIVE_FILE_ID in src/config.js).
 *
 * New columns are created automatically, so editing the questions on the website
 * never needs a change here. Edit only the CONFIG block below.
 */

const CONFIG = {
  // Must match APPS_SCRIPT_SECRET in src/config.js
  SECRET: "VtOvatYL6rqTsUPrwEmrwJoH5SIhgqMi5ehOXegC0J0=",

  // One entry per form. Leave spreadsheetId "" to use the spreadsheet this script is attached to.
  // Paste a different spreadsheet's ID to keep a form in its own file.
  FORMS: {
    workbook:         { sheetName: "Workbook Leads",    spreadsheetId: "", updateBySession: false },
    financialFreedom: { sheetName: "Financial Freedom", spreadsheetId: "", updateBySession: true  },
  },

  // Alert e-mail when a lead completes the Financial Freedom plan, e.g. "sales@zamzam-capital.com". "" = off.
  NOTIFY_EMAIL: "",

  TIMEZONE: "Asia/Kolkata",
};

/* ===================================================================
   WEB APP ENTRY POINT
   =================================================================== */
function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad json" });
  }
  if (!payload || payload.secret !== CONFIG.SECRET) return json_({ ok: false, error: "forbidden" });

  const form = CONFIG.FORMS[payload.form];
  if (!form) return json_({ ok: false, error: "unknown form" });

  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const row = buildRow_(payload);
    const sheet = getSheet_(form);
    const saved = saveRow_(sheet, row, form.updateBySession ? "Session ID" : null);

    if (payload.form === "financialFreedom" && String(payload.status) === "Completed") {
      try { notifyTeam_(row); } catch (err) { console.error(err); } // never lose the lead over an alert failure
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the web app URL in a browser just shows this, handy to check the deployment.
function doGet() {
  return ContentService.createTextOutput("Zamzam lead capture is running.");
}

/* ===================================================================
   SHEET HELPERS
   =================================================================== */
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function now_() {
  return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
}

function clean_(v) {
  if (v === null || v === undefined) return "";
  return String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, 1000);
}

/** Standard columns first, then whatever the page sent. */
function buildRow_(p) {
  const t = p.tracking || {};
  const row = {
    "Session ID": clean_(p.sessionId),
    "Status": clean_(p.status),
    "Step": Number(p.step) || 0,
  };
  Object.keys(p.data || {}).forEach(function (k) { row[clean_(k).slice(0, 80)] = clean_(p.data[k]); });
  row["utm_source"] = clean_(t.utm_source);
  row["utm_medium"] = clean_(t.utm_medium);
  row["utm_campaign"] = clean_(t.utm_campaign);
  row["utm_content"] = clean_(t.utm_content);
  row["utm_term"] = clean_(t.utm_term);
  row["fbclid"] = clean_(t.fbclid);
  row["fbp"] = clean_(t.fbp);
  row["fbc"] = clean_(t.fbc);
  row["Landing page"] = clean_(t.landing_page);
  row["Referrer"] = clean_(t.referrer);
  return row;
}

function getSheet_(form) {
  const ss = form.spreadsheetId ? SpreadsheetApp.openById(form.spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(form.sheetName) || ss.insertSheet(form.sheetName);
}

/** Makes sure every key has a column; returns the full header list. */
function ensureHeaders_(sheet, keys) {
  const lead = ["Created", "Updated"];
  let headers = [];
  if (sheet.getLastColumn() > 0) {
    headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  }
  const wanted = headers.length ? [] : lead.slice();
  lead.forEach(function (h) { if (headers.indexOf(h) === -1 && wanted.indexOf(h) === -1) wanted.push(h); });
  keys.forEach(function (k) { if (headers.indexOf(k) === -1 && wanted.indexOf(k) === -1) wanted.push(k); });
  if (wanted.length) {
    sheet.getRange(1, headers.length + 1, 1, wanted.length).setValues([wanted]).setFontWeight("bold").setBackground("#e6f6f0");
    headers = headers.concat(wanted);
    sheet.setFrozenRows(1);
  }
  return headers;
}

/**
 * Appends a row, or updates the person's existing row when keyHeader is set.
 * Older steps that arrive late never overwrite newer ones.
 * Returns { rowIndex, created }.
 */
function saveRow_(sheet, row, keyHeader) {
  const headers = ensureHeaders_(sheet, Object.keys(row));
  const col = function (h) { return headers.indexOf(h) + 1; };
  const stamp = now_();
  let rowIndex = 0;
  let existing = null;

  if (keyHeader && row[keyHeader] && sheet.getLastRow() > 1) {
    const ids = sheet.getRange(2, col(keyHeader), sheet.getLastRow() - 1, 1).getValues();
    for (let i = ids.length - 1; i >= 0; i--) {
      if (String(ids[i][0]) === String(row[keyHeader])) { rowIndex = i + 2; break; }
    }
  }

  if (rowIndex) {
    existing = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
    const oldStep = Number(existing[col("Step") - 1]) || 0;
    if (row["Step"] < oldStep) return { rowIndex: rowIndex, created: false }; // stale, ignore
    const merged = existing.slice();
    Object.keys(row).forEach(function (k) {
      // do not wipe a value that is already there with an empty one
      if (row[k] === "" && existing[col(k) - 1] !== "") return;
      merged[col(k) - 1] = row[k];
    });
    merged[col("Updated") - 1] = stamp;
    const range = sheet.getRange(rowIndex, 1, 1, headers.length);
    range.setNumberFormat("@");          // keep everything as plain text (phones, "=..." etc.)
    range.setValues([merged]);
    return { rowIndex: rowIndex, created: false };
  }

  const out = headers.map(function (h) {
    if (h === "Created" || h === "Updated") return stamp;
    return row[h] === undefined ? "" : row[h];
  });
  rowIndex = sheet.getLastRow() + 1;
  const range = sheet.getRange(rowIndex, 1, 1, headers.length);
  range.setNumberFormat("@");
  range.setValues([out]);
  return { rowIndex: rowIndex, created: true };
}

/* ===================================================================
   TEAM ALERT (Financial Freedom completed)
   =================================================================== */
function notifyTeam_(row) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  const lines = Object.keys(row)
    .filter(function (k) { return row[k] !== "" && !/^utm_|^fb|Landing|Referrer/.test(k); })
    .map(function (k) { return k + ": " + row[k]; });
  MailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    "New Financial Freedom lead: " + (row["Name"] || "") + " (" + (row["Risk level"] || "") + " risk)",
    lines.join("\n")
  );
}

/* ===================================================================
   RUN THESE FROM THE EDITOR
   =================================================================== */

/** Run once: creates the sheets, asks for permissions. */
function setupSheets() {
  Object.keys(CONFIG.FORMS).forEach(function (k) {
    const sheet = getSheet_(CONFIG.FORMS[k]);
    ensureHeaders_(sheet, ["Session ID", "Status", "Step"]);
  });
}
