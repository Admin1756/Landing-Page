const SRC = "https://www.smallcase.com/embed/assets/embed.js";
let script = null;
let failed = false;
const errorListeners = [];

/** Loads the smallcase embed script exactly once for the whole page. */
export function loadSmallcaseEmbed(onError) {
  if (failed) { onError?.(); return; }
  if (onError) errorListeners.push(onError);
  if (script) return;
  script = document.createElement("script");
  script.src = SRC;
  script.async = true;
  script.onerror = () => {
    failed = true;
    errorListeners.splice(0).forEach((fn) => fn());
  };
  document.body.appendChild(script);
}