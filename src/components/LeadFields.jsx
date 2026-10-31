import { useState } from "react";
import { OCCUPATIONS } from "../config";

export const emptyLead = {
  name: "", email: "", phone: "", occupation: "", occupationOther: "", age: "", consent: false, website: "",
};

export function useLeadForm(initial = {}) {
  const [values, setValues] = useState({ ...emptyLead, ...initial });
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((s) => (s[key] ? { ...s, [key]: undefined } : s));
  };
  return { values, setValues, errors, setErrors, set };
}

function Field({ id, label, error, children }) {
  return (
    <div className={"zz-field" + (error ? " has-error" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="zz-error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

/** Name, email, phone, (age), occupation, consent. Shared by both forms. */
export default function LeadFields({ form, idPrefix, withAge = false, onFirstFocus }) {
  const { values, errors, set } = form;
  const [touched, setTouched] = useState(false);
  const focus = () => { if (!touched) { setTouched(true); onFirstFocus && onFirstFocus(); } };
  const id = (k) => `${idPrefix}-${k}`;
  const common = (k) => ({
    id: id(k), value: values[k], onChange: set(k), onFocus: focus,
    "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
  });

  return (
    <>
      <Field id={id("name")} label="Full name" error={errors.name}>
        <input {...common("name")} autoComplete="name" placeholder="Your name" />
      </Field>
      <Field id={id("email")} label="Email" error={errors.email}>
        <input {...common("email")} type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" />
      </Field>
      <div className={withAge ? "zz-field-row" : undefined}>
        <Field id={id("phone")} label="WhatsApp number" error={errors.phone}>
          <input {...common("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="98765 43210" />
        </Field>
        {withAge && (
          <Field id={id("age")} label="Your age" error={errors.age}>
            <input {...common("age")} type="number" inputMode="numeric" min="18" max="70" placeholder="32" />
          </Field>
        )}
      </div>
      <Field id={id("occupation")} label="Occupation" error={errors.occupation}>
        <select {...common("occupation")} autoComplete="organization-title">
          <option value="">Select</option>
          {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
      {values.occupation === "Other" && (
        <Field id={id("occupationOther")} label="Your occupation" error={errors.occupationOther}>
          <input {...common("occupationOther")} placeholder="e.g. Doctor, Teacher" />
        </Field>
      )}

      {/* honeypot: real people never see or fill this */}
      <div className="zz-hp" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label>
      </div>

      <div className={"zz-consent" + (errors.consent ? " has-error" : "")}>
        <label>
          <input type="checkbox" checked={values.consent} onChange={set("consent")} onFocus={focus} />
          <span>I agree to be contacted by Zamzam Capital about my plan, the 20% offer and updates by phone, email and WhatsApp.</span>
        </label>
        {errors.consent && <p className="zz-error" role="alert">{errors.consent}</p>}
      </div>
    </>
  );
}
