import { PLAN } from "../config";

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());

/** Indian mobile (10 digits starting 6-9, optional 91/+91) or international number (+ and 8-15 digits). */
export function isPhone(v) {
  const raw = String(v).trim();
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+") && !raw.startsWith("+91")) return digits.length >= 8 && digits.length <= 15;
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
}

export function validateLead(values, { withAge = false } = {}) {
  const e = {};
  if (values.name.trim().length < 2) e.name = "Enter your full name";
  if (!isEmail(values.email)) e.email = "Enter a valid email address";
  if (!isPhone(values.phone)) e.phone = "Enter a valid mobile number (add + and country code if outside India)";
  if (!values.occupation) e.occupation = "Choose your occupation";
  if (values.occupation === "Other" && values.occupationOther.trim().length < 2) e.occupationOther = "Tell us your occupation";
  if (withAge) {
    const a = Number(values.age);
    if (!a || a < PLAN.minAge || a > PLAN.maxAge) e.age = `Enter an age between ${PLAN.minAge} and ${PLAN.maxAge}`;
  }
  if (!values.consent) e.consent = "Please tick to continue";
  return e;
}

export const occupationOf = (v) => (v.occupation === "Other" ? `Other: ${v.occupationOther.trim()}` : v.occupation);
