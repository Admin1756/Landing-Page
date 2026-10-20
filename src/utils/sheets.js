import { APPS_SCRIPT_URL, APPS_SCRIPT_SECRET } from "../config";
import { getAttribution } from "./tracking";

const isConfigured = () => APPS_SCRIPT_URL && !APPS_SCRIPT_URL.startsWith("YOUR_");

/**
 * Sends one record to the Apps Script web app.
 *   form      key from FORMS in config.js (decides which sheet it lands in)
 *   sessionId same id on every call for one person => the row is updated, not duplicated
 *   step      number; the sheet ignores older steps arriving late
 *   status    free text shown in the sheet ("Started", "In progress", "Completed" ...)
 *   data      { "Column name": value, ... } - new columns are created automatically
 * Resolves after at most `waitMs` so the UI never hangs; the request itself keeps going.
 */
export function submitToSheet({ form, sessionId, step = 0, status = "", data = {} }, waitMs = 3000) {
  if (!isConfigured()) {
    // eslint-disable-next-line no-console
    console.info("[sheets] APPS_SCRIPT_URL not set, skipping:", form, status, data);
    return Promise.resolve();
  }
  const body = JSON.stringify({
    secret: APPS_SCRIPT_SECRET,
    form,
    sessionId,
    step,
    status,
    data,
    tracking: getAttribution(),
  });
  const send = fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  }).catch((err) => console.error("[sheets]", err));
  return Promise.race([send, new Promise((r) => setTimeout(r, waitMs))]);
}
