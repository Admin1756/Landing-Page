import { COMPARISON_NOTE, COMPARISON_SUBTEXT } from "../config";
import { COMPARISON_COLUMNS } from "../data/site";

const ROWS = [
  { label: "Last 12M Returns", key: "retPerYear", isReturn: true },
  { label: "Fee Structure", key: "fee" },
  { label: "Shariah Screening", key: "screen" },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="zz-comparison">
      <div className="zz-section-head">
        <span className="zz-eyebrow">Market Intelligence</span>
        <h2>Comparative Analysis</h2>
        <p className="zz-section-sub">{COMPARISON_SUBTEXT}</p>
      </div>

      <div className="zz-table-wrap">
        <table>
          <thead>
            <tr className="zz-table-head-row">
              <th>Metric / Feature</th>
              {COMPARISON_COLUMNS.map((col) => (
                <th key={col.label} className={col.isUs ? "is-us" : ""}>
                  {col.label}
                  {col.isUs && <span className="zz-pick-badge">Our Pick</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key}>
                <td className="row-label">{row.label}</td>
                {COMPARISON_COLUMNS.map((col) => {
                  const value = col[row.key];
                  const cls = [
                    col.isUs ? "is-us" : "",
                    row.isReturn ? "is-return" : "",
                    row.isReturn && value.startsWith("-") ? "is-negative" : "",
                  ].join(" ");
                  return <td key={col.label} className={cls}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <i><p className="zz-table-note">{COMPARISON_NOTE}</p> </i>
    </section>
  );
}
