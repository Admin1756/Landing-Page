# Zamzam Capital landing page

React (Create React App), hosted on Cloudflare Pages. Leads are saved to Google Sheets through Google Apps Script.

Page flow: offer bar with countdown, **Financial Freedom calculator in the hero banner**, comparison chart,
six smallcase cards (each with *Subscribe with 20% off*), growth calculator, **About the Founder**,
testimonials, FAQs, contact form.

## The 20% offer
The 3-hour countdown **stops and turns into the congratulations message** the moment a visitor clicks any offer button:
- *Subscribe with 20% off* on any smallcase card
- *Call or WhatsApp Us*, or sends the contact form
- finishes the Financial Freedom plan

It stays stopped on reload (stored in the visitor's browser, `zz_offer_claimed_v1`).
Texts are in `src/config.js` (`OFFER_WON_TITLE`, `OFFER_WON_DETAIL`).

## Meta Pixel (ID 1100861279466232)
Base code + `PageView` are in `public/index.html`. Events are in `src/config.js` (`PIXEL_EVENTS`).

| What the visitor does | Event |
|---|---|
| Opens the page | `PageView` |
| Clicks **Subscribe with 20% off** on a smallcase card | `InitiateCheckout` (content_name = smallcase) |
| Clicks **Copy code & subscribe** in the pop-up | `Subscribe` **and** custom `Subscribe_<scid>`, e.g. `Subscribe_ZMZMSB_0001`, `Subscribe_ZMZMNM_0001` (one per smallcase) |
| Clicks **Call or WhatsApp Us**, or sends the contact form | `Contact` |
| Clicks **View Comparison Chart** | custom `ViewComparisonChart` |
| Submits the Financial Freedom form | custom `FinancialFreedom_Started` |
| Reaches the Financial Freedom result | `CompleteRegistration` |

In Events Manager, the per-smallcase events appear under custom events after the first time each fires.

## Google Sheet (leads)
Two tabs, created automatically:
- **Contact Us**: name, mobile, question, consent, UTM / Facebook click ids
- **Financial Freedom**: one row per person, updated after every question

The workbook is no longer collected (no "Workbook Leads" tab).

**After any change to `apps-script/Code.gs` you must redeploy it**: Apps Script > Deploy > Manage deployments > edit (pencil) > Version: *New version* > Deploy. The URL stays the same.

Setup from scratch:
1. Create a Google Sheet. Extensions > Apps Script. Paste all of `apps-script/Code.gs`.
2. Change `SECRET` to a long random string (same value in `src/config.js` as `APPS_SCRIPT_SECRET`). Optionally set `NOTIFY_EMAIL`.
3. Run `setupSheets` once and accept the permissions.
4. Deploy > New deployment > Web app. Execute as **Me**, access **Anyone**. Copy the `/exec` URL into `APPS_SCRIPT_URL` in `src/config.js`.
5. Opening the URL in a browser should say "Zamzam lead capture is running."

## Cloudflare Pages
1. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick this repo.
2. Framework preset **Create React App**. Build command `npm run build`. Output directory `build`.
3. Environment variable `NODE_VERSION` = `20` (`.nvmrc` also sets it).
4. Add the domain under Custom domains.

## Where to edit things
- `src/config.js`: phone, offer text and code, Pixel event names, plan assumptions, which smallcase is recommended for which risk level.
- `src/data/site.js`: smallcase cards, comparison table, testimonials, nav links.
- `src/data/questions.js`: Financial Freedom questions.
- `src/components/Faq.jsx`: FAQs.
- The smallcase card widget needs `https://www.smallcase.com` allowed by any Content Security Policy you add.

## Run locally
```
npm install
npm start
```
