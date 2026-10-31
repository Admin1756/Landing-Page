import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { OFFER_CLAIMED_KEY, OFFER_DEADLINE_KEY, OFFER_MS } from "./config";

/* Countdown + "offer won" state, shared by every offer button on the page.
   claim() stops the countdown for good (remembered in this browser) and switches the
   top bar to the congratulations message. */

const OfferContext = createContext({ left: 0, claimed: false, claim: () => {} });

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } };

export function OfferProvider({ children }) {
  const [claimed, setClaimed] = useState(() => read(OFFER_CLAIMED_KEY) === "1");
  const [deadline] = useState(() => {
    let d = parseInt(read(OFFER_DEADLINE_KEY), 10);
    if (!d || isNaN(d)) {
      d = Date.now() + OFFER_MS;
      write(OFFER_DEADLINE_KEY, String(d));
    }
    return d;
  });
  const [left, setLeft] = useState(Math.max(0, deadline - Date.now()));

  useEffect(() => {
    if (claimed) return undefined; // timer stopped
    const t = setInterval(() => setLeft(Math.max(0, deadline - Date.now())), 1000);
    return () => clearInterval(t);
  }, [deadline, claimed]);

  const claim = useCallback(() => {
    setClaimed(true);
    write(OFFER_CLAIMED_KEY, "1");
  }, []);

  const value = useMemo(() => ({ left, claimed, claim }), [left, claimed, claim]);
  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
}

export const useOffer = () => useContext(OfferContext);
