# Tervena Health — landing page and interactive demo

A responsive, dependency-free website built with HTML, CSS, and JavaScript. The landing page presents the patient-first vision and proposed one-clinic pilot. The existing interactive demo is preserved at `/demo.html`.

Routes: `/` for the landing page; `/demo.html` for the demo. No contact email or lead form is configured yet. The landing page audience tabs and FAQ work entirely in the browser.

## Run locally

Use Node.js 20 or newer (Node 24 recommended).

```sh
npm run dev
```

Open http://localhost:4173. No installation or environment variables are required. To use a different port: `PORT=3000 npm run dev`.

```sh
npm test          # Data summaries and sharing/export behavior
npm run build    # Create dist/
npm run preview  # Serve the built dist/ directory
```

## Deploy to Vercel

1. Unzip the project and put its contents in a GitHub repository.
2. In Vercel, choose **Add New → Project**, then import the repository.
3. Select the directory containing `package.json` as the root directory. Choose **Other** as the framework preset if prompted.
4. Use **npm run build** as the build command and **dist** as the output directory. These are already specified in `vercel.json`.
5. Deploy. There are no environment variables, database, API keys, or backend services to configure.

Alternatively, from this directory, run `npx vercel` and follow the Vercel CLI prompts. Run `npx vercel --prod` when ready to publish the production deployment.

Import this repository into Vercel using the settings above. If the repository is already connected, pushing to the configured production branch can trigger a new deployment.

## A 90-second pitch walkthrough

- Open **Walkthrough** for a guided tour, or start in **Patient connections**.
- Show how a patient connects a sample cuff or wearable and adds a note about their routine.
- Open **Clinician workspace**. The weekly blood pressure average changed, but so did the time of measurement. Open **View readings** and the patient note to show the source evidence.
- Open **Interpretation lab**. The demo separates an observed change from possible explanations and incomplete evidence.
- Turn patient sharing off, return to the clinician view, and show that connected measurements and notes disappear.
- Use **Reset demo** before the next presentation.

## Working interactions

- Three linked views, with responsive desktop and mobile navigation.
- Simulated connection/disconnection, sharing control, and editable patient note.
- Seven- and fourteen-day chart views and source evidence dialogs.
- Session-only review status, downloadable text report, reset, and guided walkthrough.
- Sharing and connection controls also govern the exported report.

## Scope

All patients and measurements are fictional. Connections are simulated. The interpretation examples are authored; no AI model runs. There is no Epic/FHIR integration, device authorization, authentication, database, chart writeback, or patient messaging. The app is a public demonstration, not a clinical system or a demonstration of HIPAA compliance. Do not enter real patient data.

State lives only in browser memory and resets on reload. The sharing control demonstrates visibility within the interface; it is not a production access-control boundary. The static JavaScript contains all sample data.

Fonts load from Google Fonts with local sans-serif fallbacks. No analytics or tracking SDK is included.

## Files

- `public/index.html`: public landing page
- `public/landing.css` and `public/landing.js`: landing-page design and audience tabs
- `public/demo.html`: interactive demo shell and metadata
- `public/style.css`: design and responsive layout
- `public/app.js`: rendering and interactions
- `public/model.js`: synthetic readings, summary calculations, report generation
- `scripts/`: local server and static build
- `tests/`: Node test suite
- `vercel.json`: deployment configuration

## Verification

Five automated data and export tests pass. Browser checks covered patient note editing (including literal HTML characters), source dialogs, sharing off, device disconnect/reconnect, chart period selection, review status, the walkthrough, and reset. Layout checked at 1440px and 390px; the 390px page had no horizontal overflow. No browser console errors were observed during these checks.
