import { OFFER_WON_DETAIL, OFFER_WON_TITLE } from "../config";

/** The congratulations message. Used in the top bar, the coupon pop-up, the contact form and the plan result. */
export default function OfferWon({ compact = false, className = "" }) {
  return (
    <div className={`zz-won ${compact ? "compact" : ""} ${className}`.trim()} role="status">
      <strong>{OFFER_WON_TITLE}</strong>{" "}
      <span>{OFFER_WON_DETAIL}</span>
    </div>
  );
}
