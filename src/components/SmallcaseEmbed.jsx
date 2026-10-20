import { useEffect, useRef, useState } from "react";

/* Official smallcase card embed: https://developers.gateway.smallcase.com/docs/smt-oembed
   The script scans the page for elements with class "sc-embed" and swaps each for an iframe.
   In a React app the card is added after the script has already run, so we create the element
   ourselves and call scEmbedController.load(). If the card never appears (script blocked, ad
   blocker, CSP, smallcase not public) we show a plain link instead. */

const EMBED_SRC = "https://www.smallcase.com/embed/assets/embed.js";
const GIVE_UP_MS = 6000;

let scriptPromise = null;
function loadEmbedScript() {
  if (window.scEmbedController) return Promise.resolve("ready");
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.async = true;
      s.onload = () => resolve("fresh"); // on a fresh load the script scans the page by itself
      s.onerror = () => { scriptPromise = null; reject(new Error("smallcase embed script blocked")); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function SmallcaseEmbed({ scid, name, link, size = "small" }) {
  const host = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || !scid) return undefined;
    setFailed(false);
    el.innerHTML = "";

    const card = document.createElement("div");
    card.className = "sc-embed";
    card.setAttribute("data-smallcase", "true");
    card.setAttribute("data-scid", scid);
    card.setAttribute("data-cardsize", size);
    card.setAttribute("data-cta", "view");
    card.setAttribute("data-viewoncreatorplatform", "true");
    card.setAttribute("data-source", "zamzam-financial-freedom");
    card.style.cssText = "max-width:100%;min-height:300px;display:flex;align-items:stretch;justify-content:center";
    card.textContent = name || "";
    el.appendChild(card);

    let alive = true;
    loadEmbedScript()
      .then((state) => {
        if (alive && state === "ready" && window.scEmbedController) window.scEmbedController.load();
      })
      .catch(() => alive && setFailed(true));

    const timer = setTimeout(() => {
      if (alive && !el.querySelector("iframe")) setFailed(true);
    }, GIVE_UP_MS);

    return () => { alive = false; clearTimeout(timer); el.innerHTML = ""; };
  }, [scid, name, size]);

  return (
    <div className="zz-embed">
      <div ref={host} hidden={failed} />
      {link && (
        <a className="zz-link" href={link} target="_blank" rel="noopener noreferrer">
          {failed ? `View ${name} on smallcase` : "View on smallcase"}
        </a>
      )}
    </div>
  );
}
