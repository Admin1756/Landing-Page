/* Smallcases the plan can recommend. `scid` must match RECOMMENDATIONS in config.js.
   The three that are mapped to a risk level come from the model (Assumptions!F15:H17).
   No performance figures are shown in the plan result on purpose. */
export const SMALLCASES = [
  {
    scid: "ZMZMSB_0001",
    name: "Zamzam Shariah Leaders Smart Beta",
    risk: "Low",
    link: "https://www.smallcase.com/smallcase/ZMZMSB_0001",
    blurb: "A balanced mix of market leaders chosen for quality and momentum, all screened for Shariah compliance.",
  },
  {
    scid: "ZMZMTR_0004",
    name: "Zamzam Shariah Pharma & Healthcare Tracker",
    risk: "Medium",
    link: "https://www.smallcase.com/smallcase/ZMZMTR_0004",
    blurb: "A balanced mix of companies in the pharma and healthcare sectors chosen for quality and momentum, all screened for Shariah compliance.",
  },
  {
    scid: "ZMZMNM_0001",
    name: "Zamzam Shariah New India Theme",
    risk: "High",
    link: "https://www.smallcase.com/smallcase/ZMZMNM_0001",
    blurb: "Mid and small-cap companies in new-age sectors. Built for long horizons and the ability to sit through big swings.",
  },
  // Not mapped to any risk level in the model, so it is never recommended. Kept for reference.
  // {
  //   scid: "ZMZMSB_0002",
  //   name: "Zamzam Shariah Nifty 50 Smart Beta",
  //   risk: "Low",
  //   link: "https://www.smallcase.com/smallcase/ZMZMSB_0002",
  //   blurb: "Large, established Nifty 50 companies that pass the Zamzam Shariah screen. The steadiest of our portfolios.",
  // },
];
