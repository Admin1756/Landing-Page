import { useEffect, useRef } from "react";
import { ZAMZAM_URL } from "../config";
import { loadSmallcaseEmbed } from "../utils/smallcaseEmbed";

const DEFAULT_PERIOD = "12m"; // overridden per smallcase via `period` in data.js

export default function SmallcaseCard({ item, onInvest }) {
  const containerRef = useRef(null);
  const period = item.period || DEFAULT_PERIOD; // per-card override, e.g. "10m"

  // Runs once per card (cards are never unmounted when filtering)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = "";

    const pTag = document.createElement("p");
    pTag.className = "sc-embed zz-embed-p";
    pTag.setAttribute("data-smallcase", "true");
    pTag.setAttribute("data-cta", "view");
    pTag.setAttribute("data-cardsize", "small");
    pTag.setAttribute("data-scid", item.scid);
    pTag.innerText = `${item.name} smallcase by Zamzam Capital`;
    el.appendChild(pTag);

    loadSmallcaseEmbed(() => {
      el.innerHTML = `<div class="zz-embed-fallback">Smallcase preview widget unavailable. Click below to invest directly.</div>`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="zz-card">
      <div className="zz-card-head">
        <div>
          <h3 className="zz-card-title">{item.name}</h3>
          <span className={`zz-card-risk risk-${item.risk.toLowerCase()}`}>{item.risk} risk</span>
        </div>
        <div className="zz-card-return">
          <div className="num" style={item.ret < 0 ? { color: "#b83232" } : undefined}>{item.ret}%</div>
          <div className="zz-card-return-label">{period} return</div>
        </div>
      </div>

      <div ref={containerRef} className="zz-card-embed" />

      <div className="zz-card-foot">
        <button className="btn gold" onClick={() => onInvest({ ...item, link: item.link || ZAMZAM_URL })}>
          Subscribe with 20% off
        </button>
      </div>
    </article>
  );
}