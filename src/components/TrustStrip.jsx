import { TRUST_ITEMS } from "../data/content";

export default function TrustStrip() {
  return (
    <section className="zz-trust" aria-label="Why people trust Zamzam Capital">
      <div className="zz-trust-grid">
        {TRUST_ITEMS.map((t) => <div key={t} className="zz-trust-item">{t}</div>)}
      </div>
    </section>
  );
}
