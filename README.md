# Zamzam Capital landing page + Financial Freedom plan

React (Create React App). Hosted on Cloudflare Pages. Leads are saved to Google Sheets through Google Apps Script.
After the workbook form is submitted the visitor is redirected to the PDF in Google Drive.

You only need to update the 3 external things below. Everything else is ready.

## 1. Google Drive: the workbook PDF
1. Upload `upload-to-google-drive/Zamzam_Halal_Investors_Workbook.pdf` to Google Drive.
2. Share > General access > **Anyone with the link** > Viewer.
3. Copy the file ID from the link `drive.google.com/file/d/FILE_ID/view`.
4. Put it in `src/config.js` as `WORKBOOK_DRIVE_FILE_ID`.

## 2. Google Sheets: where leads are saved (free)
1. Create a Google Sheet. Extensions > Apps Script.
2. Paste all of `apps-script/Code.gs`. Change `SECRET` to a long random string. Optionally set `NOTIFY_EMAIL`.
3. Run `setupSheets` once and accept the permissions.
4. Deploy > New deployment > Web app. Execute as **Me**, access **Anyone**. Copy the URL ending in `/exec`.
5. In `src/config.js` set `APPS_SCRIPT_URL` (that URL) and `APPS_SCRIPT_SECRET` (same secret as step 2).
6. Whenever you change `Code.gs`: Deploy > Manage deployments > edit > New version.
7. Opening the URL in a browser should say "Zamzam lead capture is running."

## 3. Cloudflare Pages
1. Push this folder to GitHub (the PDF folder and `node_modules` are git-ignored).
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick the repo.
3. Framework preset **Create React App**. Build command `npm run build`. Output directory `build`.
4. Environment variable `NODE_VERSION` = `20` (the `.nvmrc` file also sets this).
5. Save and deploy. Add your domain under Custom domains.

## Other things you may want to change
- `src/config.js`: phone, WhatsApp number, Meta Pixel ID, plan assumptions, risk-to-smallcase mapping.
- These must stay in sync with the Excel model (cells are named in comments): returns, risk cut-offs, smallcase IDs.
- `src/data/questions.js`: the Financial Freedom questions.
- smallcase card: needs `https://www.smallcase.com` to be allowed by any Content Security Policy you add on Cloudflare.

## Run locally
```
npm install
npm start
```
