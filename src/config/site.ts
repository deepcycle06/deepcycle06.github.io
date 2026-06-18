export const SITE = {
  name: 'Aheadcount',
  // Brand/product domain (future). The prototype RUNS on the free interim host in `url`.
  domain: 'aheadcount.com',
  // ── Live address of the prototype ───────────────────────────────────────────
  // Interim free host (GitHub Pages user-site → root path). Drives canonical, OG,
  // sitemap and Schema.org. Swap this ONE line to 'https://aheadcount.com' when the
  // real domain goes live.
  url: 'https://deepcycle06.github.io',
  tagline: 'Know your peak-season crew size and hire-by dates, months ahead.',
  description:
    'Aheadcount forecasts your seasonal demand 12 months out, sizes the crew you need each month, and tells you exactly when to start hiring — the planning layer above your scheduling app.',
  contactEmail: 'hello@aheadcount.com',
  // Data controller (privacy): kept generic — no entity/person name, no address.
  controller: 'the operator of Aheadcount',
  controllerLocation: 'the EU/EEA',
  locale: 'en',
  // ── Free measurement stack ──────────────────────────────────────────────────
  // Formspree endpoint-ID (free tier). The channel that captures sign-ups + per-segment
  // intent (segment/intent hidden fields).
  // TODO (operator): create 1 free form at formspree.io and paste the ID after /f/ here.
  // While this is 'REPLACE_ME' the form shows an honest "opening soon" note and stores nothing.
  FORMSPREE_ID: 'REPLACE_ME',
  // Cloudflare Web Analytics beacon-token (free, cookieless). Pageviews per page.
  // TODO (operator): dash.cloudflare.com → Web Analytics → Add a site → paste the token.
  CF_BEACON_TOKEN: '',
} as const;

export type Intent = 'just-interested' | 'starter' | 'pro' | 'team';
