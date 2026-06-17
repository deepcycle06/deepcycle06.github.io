export const SITE = {
  name: 'Seizoensplanner',
  // Merk-/productdomein (eindbestemming). De site DRAAIT tijdens de validatie-fase
  // op het gratis interim-adres in `url` hieronder; dit blijft het toekomstige domein.
  domain: 'seizoensplanner.be',
  // ── Live-adres van de fake-door ────────────────────────────────────────────
  // Interim gratis host (GitHub Pages, user-site → root-pad). Stuurt canonical,
  // OG-URLs, sitemap en Schema.org aan. Wissel deze ÉNE regel naar
  // 'https://seizoensplanner.be' zodra het echte domein live staat.
  url: 'https://deepcycle06.github.io',
  description:
    'Data-gedreven FTE-forecast voor seizoensgebonden Belgische KMO\'s. Weer, events, historie en sector-benchmarks gecombineerd in één planning-tool.',
  contactEmail: 'hallo@seizoensplanner.be',
  // Verwerkingsverantwoordelijke (GDPR art. 13): bewust generiek/niet-identificerend
  // gehouden — geen entiteits- of persoonsnaam, geen adres. Contactkanaal blijft het
  // site-domein-e-mailadres hierboven.
  controller: 'de uitbater van Seizoensplanner',
  controllerLocation: 'België',
  // KBO/BTW-nummer: bewust niet getoond. Leeg laten — geen registergegeven publiceren
  // dat naar een onderliggende entiteit verwijst.
  kboNumber: '',
  locale: 'nl-BE',
  // ── Gratis meet-stack ───────────────────────────────────────────────────────
  // Formspree endpoint-ID (gratis tier, 50 submissions/mnd). Dit is HET kanaal dat
  // signups + per-segment WtP-signalen vastlegt (segment/intent als hidden fields).
  // TODO (uitbater): maak 1 gratis form op formspree.io en plak het ID na /f/ hier.
  // Zolang dit 'REPLACE_ME' is, toont het formulier een nette "binnenkort"-melding
  // en wordt er niets verstuurd of opgeslagen.
  FORMSPREE_ID: 'REPLACE_ME',
  // Cloudflare Web Analytics beacon-token (gratis, cookieloos — portfolio-standaard).
  // Levert pageviews per pagina (= per segment via /voor/[segment]). Geen custom events.
  // TODO (uitbater): dash.cloudflare.com → Web Analytics → Add a site → vul de live-URL
  // in → kopieer de "token" uit het beacon-snippet → plak hier. Leeg = beacon laadt niet.
  CF_BEACON_TOKEN: '',
} as const;

export type Intent = 'just-interested' | 'starter' | 'pro' | 'team';
export type SegmentSlug = 'homepage' | 'horeca' | 'kust-toerisme' | 'tuinbouw' | 'events';
