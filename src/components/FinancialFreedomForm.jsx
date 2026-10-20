import { FORMS } from "../config";
import { fire } from "../utils/pixel";
import { submitToSheet } from "../utils/sheets";
import { newSessionId } from "../utils/tracking";
import { occupationOf, validateLead } from "../utils/validate";
import LeadFields, { useLeadForm } from "./LeadFields";

/** Header form. Submitting it opens the Financial Freedom app. */
export default function FinancialFreedomForm({ onStart }) {
  const form = useLeadForm();

  const submit = (e) => {
    e.preventDefault();
    const errs = validateLead(form.values, { withAge: true });
    form.setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      const el = document.getElementById(`ff-${first}`);
      if (el) el.focus();
      return;
    }
    if (form.values.website) return; // honeypot

    const v = form.values;
    const profile = {
      sessionId: newSessionId("ff"),
      name: v.name.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      occupation: occupationOf(v),
      age: Number(v.age),
    };

    fire("ffStarted", { content_name: "Financial Freedom Plan" });
    submitToSheet({
      form: FORMS.financialFreedom,
      sessionId: profile.sessionId,
      step: 0,
      status: "Started",
      data: leadRow(profile),
    }, 0);
    onStart(profile);
  };

  return (
    <form className="zz-ff-card" onSubmit={submit} noValidate id="plan" aria-labelledby="ff-title">
      <h2 id="ff-title">Find your path to financial freedom</h2>
      <p className="zz-ff-sub">Give 2 minutes to see how much you would need to invest and which Halal portfolio fits your risk profile for free</p>
      <LeadFields form={form} idPrefix="ff" withAge />
      <button className="btn gold btn-block" type="submit">Calculate my plan</button>
    </form>
  );
}

export const leadRow = (p) => ({
  "Name": p.name,
  "Email": p.email,
  "Phone": p.phone,
  "Occupation": p.occupation,
  "Age": p.age,
  "Consent to contact": "Yes",
});
