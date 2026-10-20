export default function StickyCta({ onWorkbook, hidden }) {
  if (hidden) return null;
  return (
    <div className="zz-sticky-cta">
      <span>Free Halal Investor's Workbook</span>
      <button className="btn gold btn-sm" onClick={() => onWorkbook("Sticky bar")}>Get it</button>
    </div>
  );
}
