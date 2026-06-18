# Aheadcount — seasonal staffing forecast (prototype)

The planning layer above your scheduler: forecast seasonal demand 12 months out,
size the crew you need each month, and get hire-by dates — with a live, in-browser
forecasting engine (not a mockup).

## Stack

- **Astro 5** (static site) + **React islands** + **Tailwind CSS 3**
- **Hosting:** GitHub Pages (free), auto-deploy via GitHub Actions
- **Analytics:** Cloudflare Web Analytics (free, cookieless)
- **Form:** Formspree (free tier)

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Deploy

Every push to `main` builds the site and publishes `dist/` to GitHub Pages via
`.github/workflows/deploy.yml`. No manual step.

## Configuration

One file drives host + measurement stack: [`src/config/site.ts`](src/config/site.ts).

- `url` — live address (canonical / OG / sitemap)
- `FORMSPREE_ID` — Formspree endpoint ID for sign-ups
- `CF_BEACON_TOKEN` — Cloudflare Web Analytics beacon token

The forecasting engine lives in `src/lib/engine.ts` (pure, client-side) and the
interactive demo in `src/components/DemoPlanner.tsx`.

## License

Private project. All rights reserved.
