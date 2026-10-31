const ITEMS = ["100% Shariah-compliant screening", "10 CR+ AUM", "Invest from ₹25,000", "SEBI Regd. Research Analyst", "Free Halal Stocks List & Screener updated for IPOs", "Flat Subscription fee model with free & unlimited SIP options"];

export default function TrustStrip() {
  return (
    <section className="zz-trust">
      <div className="zz-trust-grid">
        {ITEMS.map((t) => (
          <div key={t} className="zz-trust-item">{t}</div>
        ))}
      </div>
    </section>
  );
}
