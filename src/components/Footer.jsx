import { ZAMZAM_PHONE, ZAMZAM_PHONE_TEL, ZAMZAM_URL } from "../config";

export default function Footer() {
  return (
    <footer className="zz-footer">
      <div className="zz-footer-inner">
        <p><a href={ZAMZAM_URL}>www.zamzam-capital.com</a> · <a href={`tel:${ZAMZAM_PHONE_TEL}`}>{ZAMZAM_PHONE}</a> · <a href="mailto:info@zamzam-capital.com">info@zamzam-capital.com</a></p>
        <p><i><b>Disclaimer:</b> </i>&ldquo;Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.&rdquo;</p>
        <p><i><b>Standard warning:</b> </i>&ldquo;Investment in securities market are subject to market risks. Read all the related documents carefully before investing.&rdquo;</p>
        <p>The Halal Investor's Workbook and the Financial Freedom plan are for education and illustration. They are not investment advice, a recommendation or a fatwa. Shariah screening thresholds vary between scholars and providers. Consult a qualified scholar and a SEBI-registered adviser before acting.</p>
      </div>
    </footer>
  );
}
