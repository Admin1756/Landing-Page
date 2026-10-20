import { HOW_IT_WORKS } from "../data/content";

export default function HowItWorks() {
  return (
    <section className="zz-how" aria-labelledby="how-h">
      <h2 id="how-h">From confusion to a plan in three steps</h2>
      <ol className="zz-how-list">
        {HOW_IT_WORKS.map((s) => (
          <li key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
