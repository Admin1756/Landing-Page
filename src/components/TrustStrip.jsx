const ITEMS = ["100% Shariah-compliant", "10 Cr+ AUM", "Invest from ₹25,000", "SEBI Regd. Research Analyst", "Free & Unlimited SIP options", "Flat Subscription fee model"];

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
