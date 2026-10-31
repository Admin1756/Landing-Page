import { useState } from "react";
import { FORMS, ZAMZAM_PHONE, ZAMZAM_PHONE_TEL } from "../config";
import { useOffer } from "../offer";
import { fire } from "../utils/pixel";
import { submitToSheet } from "../utils/sheets";
import { newSessionId } from "../utils/tracking";
import { isPhone } from "../utils/validate";
import OfferWon from "./OfferWon";

function Field({ id, label, error, children }) {
  return (
    <div className={"zz-field" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="zz-error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

/** Contact form. Same look as the old workbook form (dark band, white card, labelled fields, consent tick). */
export default function ContactSection() {
  const { claim } = useOffer();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", q: "", consent: false, website: "" });
  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((s) => (s[k] ? { ...s, [k]: undefined } : s));
  };

  // "Call or WhatsApp" link
  const onCall = () => {
    fire("contact", { content_name: "Call or WhatsApp link" });
    claim();
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Enter your name";
    if (!isPhone(form.phone)) errs.phone = "Enter a valid mobile number (add + and country code if outside India)";
    if (!form.consent) errs.consent = "Please tick to continue";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const el = document.getElementById(`ct-${Object.keys(errs)[0]}`);
      if (el) el.focus();
      return;
    }
    if (form.website) { setSent(true); return; } // honeypot

    setLoading(true);
    fire("contact", { content_name: "Contact form" });
    claim();
    await submitToSheet({
      form: FORMS.contact,
      sessionId: newSessionId("ct"),
      status: "Submitted",
      data: {
        "Name": form.name.trim(),
        "Phone": form.phone.trim(),
        "Question": form.q.trim(),
        "Consent to contact": "Yes",
      },
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="zz-final">
      <div className="zz-final-inner">
        <div>
          <h2>Have a question? Talk to us</h2>
          <p>
            Send us your question and our team will call you.<br />
            Prefer to talk now? Call or WhatsApp us at{" "}
            <a href={`tel:${ZAMZAM_PHONE_TEL}`} onClick={onCall}>{ZAMZAM_PHONE}</a>.
          </p>
        </div>
        <div className="zz-final-card">
          {sent ? (
            <div className="zz-wb-done" role="status">
              <h3>Thank you, {form.name.trim().split(" ")[0] || "friend"}</h3>
              <p>We have your details and will call you soon.</p>
              <OfferWon />
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="zz-wb-form" aria-label="Contact us">
              <Field id="ct-name" label="Full name" error={errors.name}>
                <input id="ct-name" value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} />
              </Field>
              <Field id="ct-phone" label="Mobile number" error={errors.phone}>
                <input id="ct-phone" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="98765 43210" aria-invalid={!!errors.phone} />
              </Field>
              <Field id="ct-q" label="Your question (optional)">
                <textarea id="ct-q" rows="3" value={form.q} onChange={set("q")} placeholder="What would you like to ask?" />
              </Field>

              <div className="zz-hp" aria-hidden="true">
                <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
              </div>

              <div className={"zz-consent" + (errors.consent ? " has-error" : "")}>
                <label>
                  <input id="ct-consent" type="checkbox" checked={form.consent} onChange={set("consent")} />
                  <span>I agree to be contacted by Zamzam Capital about my question, the 20% offer and updates by phone, email and WhatsApp.</span>
                </label>
                {errors.consent && <p className="zz-error" role="alert">{errors.consent}</p>}
              </div>

              <button className="btn gold btn-block" type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Send question & lock your offer"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
