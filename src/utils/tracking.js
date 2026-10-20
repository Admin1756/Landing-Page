/* Captures where a lead came from (UTMs, Facebook click id) once per visit. */
const KEY = "zz_attribution_v1";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

function cookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

export function captureAttribution() {
  try {
    const url = new URLSearchParams(window.location.search);
    const found = {};
    PARAMS.forEach((p) => { if (url.get(p)) found[p] = url.get(p); });
    if (Object.keys(found).length || !sessionStorage.getItem(KEY)) {
      const prev = JSON.parse(sessionStorage.getItem(KEY) || "{}");
      sessionStorage.setItem(KEY, JSON.stringify({ ...prev, ...found, landing_page: window.location.href.split("#")[0], referrer: document.referrer || "" }));
    }
  } catch (e) { /* storage blocked: ignore */ }
}

export function getAttribution() {
  let a = {};
  try { a = JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch (e) { /* ignore */ }
  return { ...a, fbp: cookie("_fbp"), fbc: cookie("_fbc") };
}

export function newSessionId(prefix = "ff") {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
