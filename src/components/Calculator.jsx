import { useState } from "react";
import { CALC_SCENARIOS } from "../data/site";

export default function Calculator() {
  const [amount, setAmount] = useState(100000);

  return (
    <section id="calc" className="zz-calc">
      <div className="zz-calc-inner">
        <h2>See what ₹{amount.toLocaleString("en-IN")} could become</h2>
        <input type="range" min="5000" max="1000000" step="5000" value={amount} onChange={(e) => setAmount(+e.target.value)} />
        <div className="zz-calc-grid">
          {CALC_SCENARIOS.map(([r, label]) => (
            <div key={r} className="zz-calc-card">
              <div>{label} at {r}% for 5 years</div>
              <div className="num">₹{Math.round(amount * Math.pow(1 + r / 100, 5)).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
