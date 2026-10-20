import { ZAMZAM_URL } from "../config";
import { NAV_LINKS } from "../data/content";
import { scrollTo } from "../utils/scroll";

export default function Navbar({ onWorkbook }) {
  return (
    <nav className="zz-nav" aria-label="Main">
      <a href={ZAMZAM_URL} className="zz-nav-brand">Zamzam Capital</a>
      <div className="zz-nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="zz-nav-link" onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
            {l.label}
          </a>
        ))}
        <button className="btn gold btn-sm" onClick={() => onWorkbook("Navbar")}>Free workbook</button>
      </div>
    </nav>
  );
}
