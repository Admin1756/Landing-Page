import { FB_PIXEL_ID, PIXEL_EVENTS } from "../config";

let initialised = false; // guards against React StrictMode double-mount

/** Loads the Meta Pixel, inits it and fires PageView (once per page load). */
export function initPixel() {
  if (typeof window === "undefined" || initialised) return;
  initialised = true;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
}

/**
 * Fire one of the events defined in PIXEL_EVENTS (config.js).
 * key: "ffStarted" | "ffCompleted" | "workbookOpened" | "workbookSubmitted"
 */
export function fire(key, params = {}) {
  const ev = PIXEL_EVENTS[key];
  if (!ev || typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(ev.standard ? "track" : "trackCustom", ev.name, params);
}
