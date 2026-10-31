import { PLAN, RECOMMENDATIONS } from "../config";
import { QUESTIONS } from "../data/questions";
import { SMALLCASES } from "../data/planSmallcases";

const LEVELS = ["Low", "Medium", "High"];

/* ---------- formatting ---------- */
export function inr(n) {
  const v = Math.round(n);
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(v >= 1e8 ? 1 : 2).replace(/\.?0+$/, "")} crore`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2).replace(/\.?0+$/, "")} lakh`;
  return `₹${v.toLocaleString("en-IN")}`;
}
const ceilTo = (n, step) => Math.ceil(n / step) * step;

/* ---------- answers ----------
   answers[id] = { label, other (text or ""), value (number|undefined), risk (number|undefined) } */

export function riskFromAnswers(answers, years, questions = QUESTIONS) {
  let got = 0, max = 0;
  questions.filter((q) => q.scored).forEach((q) => {
    const a = answers[q.id];
    if (!a) return;
    const w = q.weight || 1;
    const top = Math.max(...q.options.map((o) => o.risk || 0), q.otherRisk || 0);
    got += (a.risk || 0) * w;
    max += top * w;
  });
  const score = max ? Math.round((got / max) * 100) : 50;
  let level = score <= PLAN.riskBands.lowMax ? "Low" : score <= PLAN.riskBands.mediumMax ? "Medium" : "High";
  let cappedBy = null;
  const cap = [...PLAN.horizonCaps].sort((a, b) => a.underYears - b.underYears).find((c) => years < c.underYears);
  if (cap && LEVELS.indexOf(level) > LEVELS.indexOf(cap.maxLevel)) {
    level = cap.maxLevel;
    cappedBy = `your goal is only ${years} year${years === 1 ? "" : "s"} away`;
  }
  return { score, level, cappedBy };
}

const valueOf = (answers, role, questions = QUESTIONS) => {
  const q = questions.find((x) => x.role === role);
  const v = q && answers[q.id] ? answers[q.id].value : undefined;
  return Number.isFinite(v) ? v : undefined;
};

export function buildPlan({ age, answers }, questions = QUESTIONS) {
  const monthlyExpenses = valueOf(answers, "monthlyExpenses", questions) ?? 50000;
  const freedomAge = valueOf(answers, "freedomAge", questions) ?? 55;
  const existing = valueOf(answers, "currentInvestments", questions) ?? 0;
  const capacity = valueOf(answers, "monthlyInvestable", questions) ?? 0;

  const years = Math.max(1, Math.round(freedomAge - age));
  const risk = riskFromAnswers(answers, years, questions);
  const r = PLAN.returnPct[risk.level] / 100;
  const inf = PLAN.inflationPct / 100;
  const swr = PLAN.withdrawalRatePct / 100;
  const rm = Math.pow(1 + r, 1 / 12) - 1; // effective monthly rate

  const corpusAt = (y) => (monthlyExpenses * 12 * Math.pow(1 + inf, y)) / swr;
  const sipFV = (sip, y) => (sip * (Math.pow(1 + rm, y * 12) - 1) / rm) * (1 + rm); // paid at start of month
  const existingFV = (y) => existing * Math.pow(1 + r, y);

  const corpus = corpusAt(years);
  const gap = Math.max(0, corpus - existingFV(years));
  const sipNeeded = gap > 0 ? (gap * rm) / ((Math.pow(1 + rm, years * 12) - 1) * (1 + rm)) : 0;
  const lumpNow = gap / Math.pow(1 + r, years);
  const onTrack = sipNeeded <= capacity;

  // With the monthly amount they said they can invest, when would they get there?
  let reachYears = null;
  if (!onTrack && capacity > 0) {
    for (let y = years + 1; y <= 50; y++) {
      if (existingFV(y) + sipFV(capacity, y) >= corpusAt(y)) { reachYears = y; break; }
    }
  }

  const sc = SMALLCASES.find((s) => s.scid === RECOMMENDATIONS[risk.level]);
  if (!sc) {
    // eslint-disable-next-line no-console
    console.error(`[plan] RECOMMENDATIONS.${risk.level} = "${RECOMMENDATIONS[risk.level]}" is not listed in src/data/planSmallcases.js`);
  }
  const smallcase = sc || SMALLCASES[0];

  // Extra outputs that mirror the model's Summary tab
  const fundedShare = corpus > 0 ? Math.min(1, existingFV(years) / corpus) : 0;
  const surplus = capacity - sipNeeded; // + surplus, - shortfall, per month (exact, before rounding)

  return {
    age, freedomAge, years, monthlyExpenses, existing, capacity,
    riskScore: risk.score, riskLevel: risk.level, riskCappedBy: risk.cappedBy,
    assumedReturnPct: PLAN.returnPct[risk.level],
    corpus: ceilTo(corpus, 100000),
    sipNeeded: sipNeeded > 0 ? ceilTo(sipNeeded, 500) : 0,
    lumpNow: lumpNow > 0 ? ceilTo(lumpNow, 10000) : 0,
    onTrack,
    gap, fundedSharePct: Math.round(fundedShare * 1000) / 10, surplus,
    reachAge: reachYears ? Math.round(age + reachYears) : null,
    smallcase,
  };
}
