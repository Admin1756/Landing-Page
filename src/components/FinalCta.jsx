import { ZAMZAM_PHONE, ZAMZAM_PHONE_TEL } from "../config";
import WorkbookForm from "./WorkbookForm";

export default function FinalCta() {
  return (
    <section id="get-workbook" className="zz-final">
      <div className="zz-final-inner">
        <div>
          <h2>Start with the workbook. Keep your earnings clean.</h2>
          <p>
            Enter your details and open The Halal Investor's Workbook instantly <br />Prefer to talk first? Call or Whatsapp at <a href={`tel:${ZAMZAM_PHONE_TEL}`}>{ZAMZAM_PHONE}</a>.
          </p>
        </div>
        <div className="zz-final-card">
          <WorkbookForm idPrefix="wbi" source="Page footer form" />
        </div>
      </div>
    </section>
  );
}
