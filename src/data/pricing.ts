export interface PricingTier {
  id: 'season' | 'pro' | 'multi' | 'enterprise';
  name: string;
  price: string;
  priceSub: string;
  tagline: string;
  features: string[];
  cta: string;
  intent: 'starter' | 'pro' | 'team';
  highlight?: boolean;
}

// Currency-neutral, value-based pricing (per location, not per seat). Prices shown in a
// neutral local-currency style; billed in the operator's own currency at signup.
export const PRICING: PricingTier[] = [
  {
    id: 'season',
    name: 'Season Plan',
    price: '~$59',
    priceSub: 'one-time',
    tagline: 'One full season plan for a single site. No subscription — try the whole engine once.',
    features: [
      '12-month demand forecast with planning band',
      'Required-vs-current staffing, gaps & overstaffing',
      'Hiring timeline with "start hiring by" dates',
      'Labor-cost projection + savings vs your plan',
      'Exportable PDF plan to share with co-owners',
      'Credited in full if you upgrade to Pro within 60 days',
    ],
    cta: 'Reserve Season Plan (beta)',
    intent: 'starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '~$39',
    priceSub: 'per location / month',
    tagline: 'A living plan you re-run all year. For single-site seasonal operators.',
    features: [
      'Everything in Season Plan, live & re-runnable',
      'Unlimited saved scenarios (wet vs dry, +event)',
      'Re-forecast as the season firms up; alerts shift',
      'Import your own revenue/headcount to calibrate',
      'Configurable currency & cost-per-staff',
      'Seasonal pause — freeze billing in trough months',
    ],
    cta: 'Reserve Pro (beta)',
    intent: 'pro',
    highlight: true,
  },
  {
    id: 'multi',
    name: 'Multi-Site',
    price: '~$89',
    priceSub: 'per month',
    tagline: 'For several seasonal sites or a small chain, with a shared team.',
    features: [
      'Everything in Pro across up to 5 locations',
      '3 team seats with shared scenarios & history',
      'Portfolio roll-up of cost & hiring timelines',
      'Anonymized sector benchmarks (opt-in)',
      'Priority support + per-site readiness checklist',
    ],
    cta: 'Reserve Multi-Site (beta)',
    intent: 'team',
  },
];

export const ENTERPRISE_NOTE =
  'More than 5 sites, API access, or white-label for a payroll/partner brand? Enterprise from ~$249/month — get in touch.';
