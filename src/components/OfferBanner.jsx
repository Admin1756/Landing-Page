import { OFFER_WON_DETAIL, OFFER_WON_TITLE, SEBI_REG_NUMBER } from "../config";
import { useOffer } from "../offer";

const pad = (n) => String(n).padStart(2, "0");

export default function OfferBanner() {
  const { left, claimed } = useOffer();
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);

  return (
    <>
      <div className="zz-sebi-bar">
        SEBI Registration Number: <span>{SEBI_REG_NUMBER}</span>
      </div>
      <div className={"zz-offer-bar" + (claimed ? " won" : "")} role={claimed ? "status" : undefined}>
        {claimed ? (
          <>
            <strong>{OFFER_WON_TITLE}</strong> {OFFER_WON_DETAIL}
          </>
        ) : left > 0 ? (
          <>
            Get 20% off on all smallcases. Ends in{" "}
            <span className="zz-offer-timer">{pad(h)}:{pad(m)}:{pad(s)}</span>
          </>
        ) : (
          <>The 20% offer has ended.</>
        )}
      </div>
    </>
  );
}
