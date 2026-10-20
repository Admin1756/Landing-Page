import { scrollTo } from "../utils/scroll";
import FinancialFreedomForm from "./FinancialFreedomForm";

export default function Hero({ onStart, onWorkbook }) {
  return (
    <header className="zz-hero">
      <div className="zz-hero-inner">
        <div className="zz-hero-copy">
          <h1>
            You shouldn't have to choose between your <span style={{ color: "#facc15" }}>Akhirah</span> and your returns
          </h1>
          <p className="zz-hero-sub">
          Most so-called “Halal” investment options in India lack clear regulatory authorization, do not fully meet Shariah requirements, or are limited in number and have struggled to keep pace with the broader market. <br/> <br/>
          <b><span style={{ color: "#facc15" }}> Zamzam Capital is different</span></b>. As a SEBI-registered Research Analyst firm, we apply a rigorous, three-stage Shariah screening process to identify compliant stocks so that you invest with the satisfaction of knowing your investments are fully Halal and well researched.
          </p>
          <ul className="zz-hero-points">
            <li>See what you would need to invest to stop depending on a salary</li>
            <li>Get our Halal Investor's Workbook free, instantly</li>
          </ul>
          <div className="zz-hero-actions">
            <button className="btn gold" onClick={() => onWorkbook("Hero button")}>Get the free Workbook</button>
            <button className="btn ghost" onClick={() => scrollTo("why")}>Why is this so hard?</button>
          </div>
        </div>
        <div className="zz-hero-form">
          <FinancialFreedomForm onStart={onStart} />
        </div>
      </div>
    </header>
  );
}
