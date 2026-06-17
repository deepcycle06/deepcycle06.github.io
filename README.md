# Seizoensplanner — landingspage

Data-gedreven FTE-planning voor seizoensgebonden Belgische KMO's
(horeca, kust-toerisme, tuinbouw, events). Statische fake-door-landingspage
in de validatie-fase.

## Stack

- **Astro 5** (static site) + **React islands** + **Tailwind CSS 3**
- **Hosting:** GitHub Pages (gratis), auto-deploy via GitHub Actions
- **Analytics:** Cloudflare Web Analytics (gratis, cookieloos)
- **Formulier:** Formspree (gratis tier)

## Lokaal draaien

```bash
npm install
npm run dev      # dev-server op http://localhost:4321
npm run build    # productie-build naar dist/
npm run preview  # preview van de build
```

## Deploy

Elke push naar `main` bouwt de site en publiceert `dist/` naar GitHub Pages
via `.github/workflows/deploy.yml`. Geen handmatige stap nodig.

## Configuratie

Eén bestand stuurt host + meet-stack aan: [`src/config/site.ts`](src/config/site.ts).

- `url` — live-adres (canonical / OG / sitemap)
- `FORMSPREE_ID` — Formspree endpoint-ID voor de signups
- `CF_BEACON_TOKEN` — Cloudflare Web Analytics beacon-token

## Licentie

Privaat project. Alle rechten voorbehouden.
