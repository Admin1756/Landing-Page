import { useEffect, useRef } from "react";
import { ZAMZAM_URL } from "../config";
import { loadSmallcaseEmbed } from "../utils/smallcaseEmbed";

export default function SmallcaseCard({ item, onInvest }) {
  const containerRef = useRef(null);

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
        <h3 className="zz-card-title">{item.name}</h3>
        <div className="zz-card-return">
          <div className={`num zz-card-risk risk-${item.risk.toLowerCase()}`}>{item.risk}</div>
          <div className="zz-card-return-label">risk profile</div>
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