import { useMemo, useState } from "react";
import { SMALLCASES } from "../data/site";
import SmallcaseCard from "./SmallcaseCard";

const STEP = 2;
// Slider starts at the lowest return in the data (or 0) so negative cards aren't filtered out by default
const SLIDER_MIN = Math.floor(Math.min(0, ...SMALLCASES.map((c) => c.ret)) / STEP) * STEP;

export default function SmallcaseSection({ onInvest }) {
  const [risk, setRisk] = useState("All");
  const [minRet, setMinRet] = useState(SLIDER_MIN);

  // Cards stay mounted; filtering only hides them so the embeds never reload.
  const visible = useMemo(
    () => new Set(SMALLCASES.filter((c) => (risk === "All" || c.risk === risk) && c.ret >= minRet).map((c) => c.scid)),
    [risk, minRet]
  );

  return (
    <section id="smallcases" className="zz-smallcases">
      <h2>Choose your smallcase</h2>
      <p className="zz-section-lead">Filter by risk and returns. Click <b>Subscribe with 20% off</b> to claim your discount coupon.</p>

      <div className="zz-filters">
        {["All", "Low", "Medium", "High"].map((r) => (
          <button key={r} className={"chip" + (risk === r ? " on" : "")} onClick={() => setRisk(r)}>
            {r === "All" ? "All risk levels" : r + " risk"}
          </button>
        ))}
        <label className="zz-filter-range">
          Min returns {minRet}%
          <input type="range" min={SLIDER_MIN} max="30" step={STEP} value={minRet} onChange={(e) => setMinRet(+e.target.value)} />
        </label>
      </div>

      {visible.size === 0 && (
        <p className="zz-empty">
          No smallcase matches your filters.{" "}
          <button className="chip" onClick={() => { setRisk("All"); setMinRet(SLIDER_MIN); }}>Reset filters</button>
        </p>
      )}

      <div className="zz-centered-grid">
        {SMALLCASES.map((c) => (
          <div
            key={c.scid}
            style={visible.has(c.scid)
              ? { display: "flex", width: "100%", maxWidth: 340 }
              : { display: "none" }}
          >
            <SmallcaseCard item={c} onInvest={onInvest} />
          </div>
        ))}
      </div>
    </section>
  );
}