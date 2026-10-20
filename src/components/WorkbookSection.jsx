import { WORKBOOK_FACTS, WORKBOOK_PARTS } from "../data/content";
import p06 from "../assets/workbook-p06.jpg";
import p19 from "../assets/workbook-p19.jpg";
import p21 from "../assets/workbook-p21.jpg";

export default function WorkbookSection({ onWorkbook }) {
  return (
    <section id="workbook" className="zz-workbook">
      <div className="zz-wb-grid">
        <div className="zz-wb-pages" aria-label="Sample pages from the workbook">
          <img className="pg pg-a" src={p19} alt="Workbook page: Zamzam's six screening criteria" loading="lazy" />
          <img className="pg pg-b" src={p21} alt="Workbook page: a worked example of two companies through every test" loading="lazy" />
          <img className="pg pg-c" src={p06} alt="Workbook page: the three tests of a halal investment" loading="lazy" />
        </div>
        <div className="zz-wb-copy">
          <h2>The Halal Investor's Workbook</h2>
          <p className="zz-wb-lead">
            Most guides tell you what is halal. This one makes you do the work on paper, with your own money and real company numbers, so that by the last page you can defend every investment you hold.
          </p>
          <ul className="zz-wb-facts">
            {WORKBOOK_FACTS.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <ol className="zz-wb-parts">
            {WORKBOOK_PARTS.map((p) => (
              <li key={p.part}><b>{p.part}.</b> {p.body}</li>
            ))}
          </ol>
          <button className="btn gold" onClick={() => onWorkbook("Workbook section")}>Get the free workbook</button>
        </div>
      </div>
    </section>
  );
}
