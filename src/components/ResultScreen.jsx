import { PLAN, ZAMZAM_PHONE, ZAMZAM_PHONE_TEL, ZAMZAM_WHATSAPP } from "../config";
import { inr } from "../utils/plan";
import OfferWon from "./OfferWon";
import SmallcaseEmbed from "./SmallcaseEmbed";

const LEVELS = ["Low", "Medium", "High"];

export default function ResultScreen({ plan, profile, headingRef }) {
  const first = profile.name.split(" ")[0];
  const msg = `Hi Zamzam Capital, I'm ${profile.name}. I just ran the Financial Freedom plan: ${inr(plan.corpus)} by age ${plan.freedomAge}, about ${inr(plan.sipNeeded)} a month, ${plan.riskLevel} risk profile. I'd like to talk.`;
  const wa = `https://wa.me/${ZAMZAM_WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="zz-dialog-body zz-result">
      <h2 id="ff-result-title" className="zz-q-title" tabIndex={-1} ref={headingRef}>
        {first}, here is your plan for financial freedom at {plan.freedomAge}
      </h2>

      <OfferWon />

      <div className="zz-result-main">
        {plan.sipNeeded > 0 ? (
          <>
            <div className="zz-result-label">To get there, invest about</div>
            <div className="num zz-result-big">{inr(plan.sipNeeded)}<span> a month</span></div>
            <div className="zz-result-alt">for {plan.years} years, or about {inr(plan.lumpNow)} as a one-time amount today.</div>
          </>
        ) : (
          <>
            <div className="zz-result-label">Good news</div>
            <div className="num zz-result-big">You are already on track</div>
            <div className="zz-result-alt">What you have invested today could be enough on its own, if it stays invested.</div>
          </>
        )}
      </div>

      <dl className="zz-result-stats">
        <div><dt>Target corpus at age {plan.freedomAge}</dt><dd>{inr(plan.corpus)}</dd></div>
        <div><dt>Time to go</dt><dd>{plan.years} years</dd></div>
        <div><dt>Return assumed</dt><dd>{plan.assumedReturnPct}% a year</dd></div>
      </dl>

      {plan.sipNeeded > 0 && plan.capacity > 0 && (
        <p className="zz-result-note">
          {plan.onTrack
            ? `You said you can invest ${inr(plan.capacity)} a month, which covers it.`
            : plan.reachAge
              ? `You said you can invest ${inr(plan.capacity)} a month. At that pace you would reach the same goal at around age ${plan.reachAge}. Our team can show you ways to close the gap.`
              : `You said you can invest ${inr(plan.capacity)} a month. At that pace this goal stays out of reach, so it is worth talking through the options.`}
        </p>
      )}

      <div className="zz-result-split">
        <section aria-labelledby="risk-h">
          <h3 id="risk-h">Your risk profile</h3>
          <div className="zz-meter" aria-hidden="true">
            {LEVELS.map((l) => <span key={l} className={l === plan.riskLevel ? "on " + l : ""}>{l}</span>)}
          </div>
          <p>
            <b>{plan.riskLevel} risk</b> (score {plan.riskScore} out of 100).
            {plan.riskCappedBy && ` We held it at ${plan.riskLevel} because ${plan.riskCappedBy}.`}
          </p>
        </section>
        <section aria-labelledby="sc-h" className="zz-reco">
          <h3 id="sc-h">Portfolio that fits</h3>
          <div className="zz-reco-name">{plan.smallcase.name}</div>
          <p>{plan.smallcase.blurb}</p>
          <SmallcaseEmbed scid={plan.smallcase.scid} name={plan.smallcase.name} link={plan.smallcase.link} />
        </section>
      </div>

      <div className="zz-result-cta">
        <p className="zz-result-cta-text">Next step: a short call with a SEBI-registered analyst to turn this into a portfolio.</p>
        <a className="btn gold" href={`tel:${ZAMZAM_PHONE_TEL}`}>Call us on {ZAMZAM_PHONE}</a>
        <a className="btn outline" href={wa} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
      </div>

      <p className="zz-fine">
        An illustration, not a forecast or a promise. It assumes {PLAN.inflationPct}% yearly inflation, living on {PLAN.withdrawalRatePct}% of the corpus each year, and an assumed {plan.assumedReturnPct}% yearly return for a {plan.riskLevel.toLowerCase()} risk portfolio. Markets can fall and returns are not guaranteed. Not investment advice or a fatwa. Investments in securities market are subject to market risks. Read all related documents carefully before investing.
      </p>
    </div>
  );
}
