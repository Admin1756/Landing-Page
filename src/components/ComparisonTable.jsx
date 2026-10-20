import { COMPARISON_NOTE, COMPARISON_SUBTEXT } from "../config";
import { COMPARISON_COLUMNS } from "../data/proof";

const ROWS = [
  { label: "Last 12M returns", key: "retPerYear", isReturn: true },
  { label: "Fee structure", key: "fee" },
  { label: "Shariah screening", key: "screen" },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="zz-comparison">
      <div className="zz-section-head">
        <h2>Where most Halal options fall short</h2>
        <p className="zz-section-sub">{COMPARISON_SUBTEXT}</p>
      </div>
      <div className="zz-table-wrap" tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways on small screens">
        <table>
          <thead>
            <tr className="zz-table-head-row">
              <th scope="col">Metric</th>
              {COMPARISON_COLUMNS.map((col, i) => (
                <th scope="col" key={i} className={col.isUs ? "is-us" : ""}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" className="row-label">{row.label}</th>
                {COMPARISON_COLUMNS.map((col, i) => {
                  const value = col[row.key];
                  const cls = [col.isUs ? "is-us" : "", row.isReturn ? "is-return" : "", row.isReturn && value.startsWith("-") ? "is-negative" : ""].join(" ");
                  return <td key={i} className={cls}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="zz-table-note"><i>{COMPARISON_NOTE}</i></p>
    </section>
  );
}
