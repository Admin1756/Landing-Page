import { ZAMZAM_URL } from "../config";
import { NAV_LINKS } from "../data/site";
import { scrollTo } from "../utils/scroll";

export default function Navbar() {
  return (
    <nav className="zz-nav">
      <a href={ZAMZAM_URL} className="zz-nav-brand">Zamzam Capital</a>
      <div className="zz-nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
