import { useEffect, useState } from "react";
import { COUPON_CODE } from "../config";
import OfferWon from "./OfferWon";

/** Opens when "Subscribe with 20% off" is clicked on a card. `onProceed` fires the final-button pixel events. */
export default function CouponModal({ item, onProceed, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleProceed = async () => {
    if (copied) return;
    setCopied(true);
    onProceed(item);
    // Open the tab straight away, inside the click, so phones and Safari don't treat it as a pop-up.
    window.open(item.link, "_blank", "noopener,noreferrer");
    try { await navigator.clipboard.writeText(COUPON_CODE); } catch { /* clipboard blocked: code is on screen */ }
    setTimeout(onClose, 1500);
  };

  return (
    <div className="zz-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="zz-modal" role="dialog" aria-modal="true" aria-labelledby="zz-coupon-title">
        <button className="zz-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <h3 id="zz-coupon-title">Claim Your 20% Discount</h3>
        <OfferWon compact />
        <p>Use this offer code while paying for the subscription to <b>{item.name}</b>.</p>
        <div className="zz-coupon">
          <span className="zz-coupon-code">{COUPON_CODE}</span>
          <button className="btn gold" onClick={handleProceed}>{copied ? "Copied! Opening…" : "Copy code & subscribe"}</button>
        </div>
      </div>
    </div>
  );
}
