import { HERO_FOOTNOTE } from "../config";
import { fire } from "../utils/pixel";
import { scrollTo } from "../utils/scroll";
import FinancialFreedomForm from "./FinancialFreedomForm";

export default function Hero({ onStart, onWatch }) {
  const viewComparison = () => {
    fire("viewComparison", { content_name: "Comparison Chart" });
    scrollTo("comparison");
  };

  return (
    <header className="zz-hero">
      <div className="zz-hero-inner">
        <div className="zz-hero-copy">
          <h1>
            Build wealth without compromising Your <span className="zz-yellow">Akhirah</span>
          </h1>
          <p className="zz-hero-sub">
            Invest in our Halal smallcases that have earned over 20%* return in the past year. Every stock in our portfolio is 100% Shariah-compliant
          </p>
          <div className="zz-hero-actions">
            <button className="btn gold" onClick={() => scrollTo("smallcases")}>Pick a smallcase</button>
            <button className="btn ghost" onClick={viewComparison}>View Comparison Chart</button>
          </div>
          <div className="zz-hero-watch">
            <button className="btn ghost" onClick={onWatch}>Watch Yusuf's Story</button>
          </div>
          <p className="zz-hero-footnote"><i>{HERO_FOOTNOTE}</i></p>
        </div>

        <div className="zz-hero-form">
          <FinancialFreedomForm onStart={onStart} />
        </div>
      </div>
    </header>
  );
}
