import { useEffect, useMemo, useRef, useState } from "react";
import { FORMS } from "../config";
import { QUESTIONS } from "../data/questions";
import { fire } from "../utils/pixel";
import { buildPlan } from "../utils/plan";
import { submitToSheet } from "../utils/sheets";
import { leadRow } from "./FinancialFreedomForm";
import Modal from "./Modal";
import ResultScreen from "./ResultScreen";

const parseNumber = (s) => {
  const n = parseFloat(String(s).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

/** Sheet-friendly version of the answers: { "Column name": "Answer" } */
const answersRow = (answers) => {
  const row = {};
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a) row[q.column] = a.idx === -1 ? `Other: ${a.other}` : a.label;
  });
  return row;
};

export default function AssessmentModal({ profile, onClose, onWorkbook }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const headingRef = useRef(null);

  // Questions the person actually sees (freedom-age choices already behind them are hidden)
  const questions = useMemo(() => QUESTIONS.map((q) => {
    if (q.role !== "freedomAge") return q;
    const later = q.options.filter((o) => o.value > profile.age);
    return { ...q, options: later.length ? later : q.allowOther ? [] : q.options };
  }), [profile.age]);

  const q = questions[i];
  const a = q && answers[q.id];
  const total = questions.length;

  useEffect(() => { headingRef.current && headingRef.current.focus(); }, [i, plan]);

  const choose = (idx) => {
    const o = q.options[idx];
    setError("");
    setAnswers((s) => ({ ...s, [q.id]: { idx, label: o.label, other: "", value: o.value, risk: o.risk } }));
  };
  const chooseOther = () => {
    setError("");
    setAnswers((s) => ({ ...s, [q.id]: { idx: -1, label: "Other", other: (s[q.id] && s[q.id].other) || "", value: undefined, risk: q.otherRisk ?? 1 } }));
  };
  const typeOther = (text) => {
    setError("");
    setAnswers((s) => ({
      ...s,
      [q.id]: { ...s[q.id], other: text, value: q.otherType === "number" ? parseNumber(text) : undefined },
    }));
  };

  const validateCurrent = () => {
    if (!a) return "Choose an answer to continue";
    if (a.idx === -1) {
      if (!a.other.trim()) return "Fill in your answer to continue";
      if (q.otherType === "number") {
        if (a.value === undefined) return "Enter numbers only";
        if (q.role === "freedomAge" && (a.value <= profile.age || a.value > 90)) return `Enter an age above ${profile.age} and up to 90`;
      }
    }
    return "";
  };

  const base = () => ({ ...leadRow(profile), ...answersRow(answers) });

  const next = () => {
    const msg = validateCurrent();
    if (msg) { setError(msg); return; }
    if (i < total - 1) {
      submitToSheet({
        form: FORMS.financialFreedom, sessionId: profile.sessionId, step: i + 1,
        status: "In progress", data: { ...base(), "Last question answered": q.column },
      }, 0);
      setI(i + 1);
      return;
    }
    // last question: build the plan, save everything, show the result
    const p = buildPlan({ age: profile.age, answers }, questions);
    setPlan(p);
    submitToSheet({
      form: FORMS.financialFreedom, sessionId: profile.sessionId, step: total + 1, status: "Completed",
      data: {
        ...base(),
        "Last question answered": q.column,
        "Risk score (0-100)": p.riskScore,
        "Risk level": p.riskLevel,
        "Years to freedom": p.years,
        "Target corpus (₹)": p.corpus,
        "Monthly investment needed (₹)": p.sipNeeded,
        "Lump sum needed today (₹)": p.lumpNow,
        "On track at stated monthly amount": p.onTrack ? "Yes" : "No",
        "Age reachable at stated monthly amount": p.reachAge || "",
        "Assumed yearly return (%)": p.assumedReturnPct,
        "Funding gap at goal date (₹)": Math.round(p.gap),
        "Share of corpus already funded (%)": p.fundedSharePct,
        "Capacity vs requirement (₹ / month)": Math.round(p.surplus),
        "Capacity status": p.onTrack ? "Funded" : "Shortfall",
        "Recommended smallcase": p.smallcase.name,
        "Smallcase ID": p.smallcase.scid,
      },
    }, 0);
    fire("ffCompleted", { content_name: "Financial Freedom Plan", status: true });
  };

  const back = () => { setError(""); setI((x) => Math.max(0, x - 1)); };

  if (plan) {
    return (
      <Modal onClose={onClose} wide labelId="ff-result-title">
        <ResultScreen plan={plan} profile={profile} headingRef={headingRef} onWorkbook={onWorkbook} />
      </Modal>
    );
  }

  const pct = Math.round((i / total) * 100);

  return (
    <Modal onClose={onClose} wide labelId="ff-q-title">
      <div className="zz-dialog-body">
        <div className="zz-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + 1} aria-label={`Question ${i + 1} of ${total}`}>
          <div className="zz-progress-bar" style={{ width: `${pct}%` }} />
        </div>
        <p className="zz-step-count">Question {i + 1} of {total}</p>
        <h2 id="ff-q-title" className="zz-q-title" tabIndex={-1} ref={headingRef}>{q.text}</h2>
        {q.hint && <p className="zz-q-hint">{q.hint}</p>}

        <fieldset className="zz-options">
          <legend className="sr-only">{q.text}</legend>
          {q.options.map((o, idx) => (
            <label key={o.label} className={"zz-opt" + (a && a.idx === idx ? " on" : "")}>
              <input type="radio" name={q.id} checked={!!a && a.idx === idx} onChange={() => choose(idx)} />
              <span>{o.label}</span>
            </label>
          ))}
          {q.allowOther && (
            <label className={"zz-opt" + (a && a.idx === -1 ? " on" : "")}>
              <input type="radio" name={q.id} checked={!!a && a.idx === -1} onChange={chooseOther} />
              <span>Other</span>
            </label>
          )}
        </fieldset>

        {a && a.idx === -1 && (
          <div className="zz-other">
            <label htmlFor="zz-other-input" className="sr-only">{q.otherLabel || "Your answer"}</label>
            <input
              id="zz-other-input"
              autoFocus
              value={a.other}
              onChange={(e) => typeOther(e.target.value)}
              inputMode={q.otherType === "number" ? "numeric" : "text"}
              placeholder={q.otherLabel || "Type your answer"}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); next(); } }}
            />
          </div>
        )}

        {error && <p className="zz-error" role="alert">{error}</p>}

        <div className="zz-q-nav">
          <button type="button" className="btn ghost-dark" onClick={back} disabled={i === 0}>Back</button>
          <button type="button" className="btn gold" onClick={next}>{i === total - 1 ? "See my plan" : "Next"}</button>
        </div>
      </div>
    </Modal>
  );
}
