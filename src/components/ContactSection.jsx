import { useState } from "react";
import { FORMS, ZAMZAM_PHONE, ZAMZAM_PHONE_TEL } from "../config";
import { useOffer } from "../offer";
import { fire } from "../utils/pixel";
import { submitToSheet } from "../utils/sheets";
import { newSessionId } from "../utils/tracking";
import { isEmail, isPhone } from "../utils/validate";
import OfferWon from "./OfferWon";

export default function ContactSection() {
  const { claim } = useOffer();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", q: "", website: "" });
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  // "Call or WhatsApp Us" button
  const onCall = () => {
    fire("contact", { content_name: "Call or WhatsApp button" });
    claim();
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Enter your name";
    if (!isEmail(form.email)) errs.email = "Enter a valid email so we can send your offer details";
    if (!isPhone(form.phone)) errs.phone = "Enter a valid mobile number (add + and country code if outside India)";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (form.website) return; // honeypot

    setLoading(true);
    fire("contact", { content_name: "Contact form" });
    claim();
    await submitToSheet({
      form: FORMS.contact,
      sessionId: newSessionId("ct"),
      status: "Submitted",
      data: {
        "Name": form.name.trim(),
        "Email": form.email.trim(),
        "Phone": form.phone.trim(),
        "Question": form.q.trim(),
        "Consent to contact": "Yes",
      },
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="zz-contact">
      <h2>Have a question? Talk to us</h2>
      <div className="zz-contact-call">
        <a href={`tel:${ZAMZAM_PHONE_TEL}`} className="btn gold" onClick={onCall}>Call or WhatsApp Us ({ZAMZAM_PHONE})</a>
      </div>
      {sent ? (
        <div className="zz-contact-success">
          <p>Thanks {form.name.trim().split(" ")[0]}! We'll call you soon.</p>
          <OfferWon />
        </div>
      ) : (
        <form onSubmit={submit} className="zz-contact-form" noValidate>
          <div className={"zz-field" + (errors.name ? " has-error" : "")}>
            <input id="ct-name" placeholder="Name" autoComplete="name" value={form.name} onChange={set("name")} aria-label="Name" aria-invalid={!!errors.name} />
            {errors.name && <p className="zz-error" role="alert">{errors.name}</p>}
          </div>
          <div className={"zz-field" + (errors.email ? " has-error" : "")}>
            <input id="ct-email" type="email" inputMode="email" placeholder="Email" autoComplete="email" value={form.email} onChange={set("email")} aria-label="Email" aria-invalid={!!errors.email} />
            {errors.email && <p className="zz-error" role="alert">{errors.email}</p>}
          </div>
          <div className={"zz-field" + (errors.phone ? " has-error" : "")}>
            <input id="ct-phone" type="tel" inputMode="tel" placeholder="Mobile number" autoComplete="tel" value={form.phone} onChange={set("phone")} aria-label="Mobile number" aria-invalid={!!errors.phone} />
            {errors.phone && <p className="zz-error" role="alert">{errors.phone}</p>}
          </div>
          <textarea rows="3" placeholder="Your question (Optional)" value={form.q} onChange={set("q")} aria-label="Your question" />
          <div className="zz-hp" aria-hidden="true">
            <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
          </div>
          <button className="btn gold btn-block" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send question & Lock your offer"}
          </button>
          <p className="zz-contact-fine">By sending this you agree to be contacted by Zamzam Capital by phone, email and WhatsApp.</p>
        </form>
      )}
    </section>
  );
}
