import { PIXEL_EVENTS } from "../config";

/* The Meta Pixel itself (base code + PageView) is in public/index.html.
   This file only sends events, and never throws if the Pixel is blocked by an ad-blocker. */

function send(standard, name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq(standard ? "track" : "trackCustom", name, params);
    }
  } catch (e) { /* tracking must never break the page */ }
}

/** Fire one of the events defined in PIXEL_EVENTS (config.js). */
export function fire(key, params = {}) {
  const ev = PIXEL_EVENTS[key];
  if (ev) send(ev.standard, ev.name, params);
}

/** Per-smallcase custom event, e.g. Subscribe_ZMZMSB_0001 */
export function fireSmallcase(scid, params = {}) {
  send(false, `Subscribe_${String(scid).replace(/[^A-Za-z0-9_]/g, "_")}`, params);
}
