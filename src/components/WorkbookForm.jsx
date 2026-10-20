import { useEffect, useRef, useState } from "react";
import { FORMS, WORKBOOK_REDIRECT_DELAY_MS, WORKBOOK_URL } from "../config";
import { fire } from "../utils/pixel";
import { submitToSheet } from "../utils/sheets";
import { newSessionId } from "../utils/tracking";
import { occupationOf, validateLead } from "../utils/validate";
import { scrollTo } from "../utils/scroll";
import LeadFields, { useLeadForm } from "./LeadFields";

/**
 * Workbook lead form. Used in the modal and in the page footer section.
 *  source        where it was opened (saved to the sheet)
 *  fireOnMount   true in the modal: "form opened" fires as soon as it appears.
 *                false inline: fires on the first field the person touches.
 */
export default function WorkbookForm({ idPrefix, source, initial, fireOnMount = false, onDone }) {
  const form = useLeadForm(initial);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const opened = useRef(false);
  const sessionId = useRef(newSessionId("wb"));

  const markOpened = () => {
    if (opened.current) return;
    opened.current = true;
    fire("workbookOpened", { content_name: "Halal Investor's Workbook", source });
  };
  // modal: "form opened" fires once as soon as the form appears
  useEffect(() => { if (fireOnMount) markOpened(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateLead(form.values);
    form.setErrors(errs);
    if (Object.keys(errs).length) {
      const el = document.getElementById(`${idPrefix}-${Object.keys(errs)[0]}`);
      if (el) el.focus();
      return;
    }
    if (form.values.website) { setDone(true); return; } // honeypot: looks done to a bot, but no link and no redirect
    const v = form.values;
    setSending(true);
    fire("workbookSubmitted", { content_name: "Halal Investor's Workbook", source });
    await submitToSheet({
      form: FORMS.workbook,
      sessionId: sessionId.current,
      step: 1,
      status: "Submitted",
      data: {
        "Name": v.name.trim(),
        "Email": v.email.trim(),
        "Phone": v.phone.trim(),
        "Occupation": occupationOf(v),
        "Consent to contact": "Yes",
        "Source": source,
      },
    });
    setSending(false);
    setDone(true);
    onDone && onDone();
    if (WORKBOOK_URL) {
      setRedirecting(true);
      // Same-tab redirect to the PDF in Google Drive. The button below is the fallback if it is blocked.
      setTimeout(() => window.location.assign(WORKBOOK_URL), WORKBOOK_REDIRECT_DELAY_MS);
    } else {
      // eslint-disable-next-line no-console
      console.warn("[workbook] WORKBOOK_DRIVE_FILE_ID is not set in src/config.js, so there is nothing to redirect to.");
    }
  };

  if (done) {
    return (
      <div className="zz-wb-done" role="status">
        <h3>{WORKBOOK_URL ? "Thank you. Opening your workbook" : "Thank you"}</h3>
        <p>
          {redirecting
            ? "You are being taken to the workbook now. If nothing happens in a few seconds, use the button below."
            : WORKBOOK_URL
              ? "Use the button below to open your workbook."
              : "We have your details and our team will be in touch."}
        </p>
        {WORKBOOK_URL && <a className="btn gold" href={WORKBOOK_URL}>Open the workbook</a>}
        <button type="button" className="zz-link" onClick={() => { onDone && onDone("close"); setTimeout(() => scrollTo("plan"), 60); }}>
          Next: work out your financial freedom number
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="zz-wb-form" aria-label="Get the free workbook">
      <LeadFields form={form} idPrefix={idPrefix} onFirstFocus={fireOnMount ? undefined : markOpened} />
      <button className="btn gold btn-block" type="submit" disabled={sending}>
        {sending ? "Please wait..." : "Get the free workbook"}
      </button>
    </form>
  );
}
