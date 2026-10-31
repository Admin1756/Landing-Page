import { useMemo, useState } from "react";
import { SMALLCASES } from "../data/site";
import SmallcaseCard from "./SmallcaseCard";

export default function SmallcaseSection({ onInvest }) {
  const [risk, setRisk] = useState("All");

  // Cards stay mounted; filtering only hides them so the embeds never reload.
  const visible = useMemo(
    () => new Set(SMALLCASES.filter((c) => risk === "All" || c.risk === risk).map((c) => c.scid)),
    [risk]
  );

  return (
    <section id="smallcases" className="zz-smallcases">
      <h2>Choose your smallcase</h2>
      <p className="zz-section-lead">Filter by risk profile. Click <b>Subscribe with 20% off</b> to claim your discount coupon.</p>

      <div className="zz-filters">
        {["All", "Low", "Medium", "High"].map((r) => (
          <button key={r} className={"chip" + (risk === r ? " on" : "")} onClick={() => setRisk(r)}>
            {r === "All" ? "All risk levels" : r + " risk"}
          </button>
        ))}
      </div>

      {visible.size === 0 && (
        <p className="zz-empty">
          No smallcase matches your filters.{" "}
          <button className="chip" onClick={() => setRisk("All")}>Reset filters</button>
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