import { SEBI_REG_NUMBER } from "../config";

export default function TopBar() {
  return (
    <div className="zz-sebi-bar">
      SEBI Registration Number: <span>{SEBI_REG_NUMBER}</span>
    </div>
  );
}
