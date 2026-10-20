import { PAIN_POINTS } from "../data/content";
import { scrollTo } from "../utils/scroll";

export default function PainPoints({ onWorkbook }) {
  return (
    <section id="why" className="zz-why">
      <div className="zz-why-head">
        <h2>Halal investing in India is harder than it should be</h2>
        <p>
          You want to grow your money and keep it clean. The market makes that difficult, and the gaps are where people lose either their savings or their peace of mind.
        </p>
        <div className="zz-why-actions">
          <button className="btn gold" onClick={() => scrollTo("comparison")}>View Comparision Chart</button>
          <button className="btn outline" onClick={() => scrollTo("plan")}>Calculate my plan</button>
        </div>
      </div>
      <ul className="zz-why-list">
        {PAIN_POINTS.map((p) => (
          <li key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
