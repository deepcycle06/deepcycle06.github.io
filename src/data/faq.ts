export interface FAQ {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FAQ[] = [
  {
    q: 'Isn\'t this just another scheduling app like Deputy or 7shifts?',
    a: 'No — and you probably already have one. Those tools build this week\'s roster from the staff you already have. Aheadcount works months upstream: it forecasts how big your crew needs to get across the season and when to start hiring, then hands the plan off to your scheduler. It\'s the layer above the roster, not another roster.',
  },
  {
    q: 'Where does the forecast actually come from?',
    a: 'From your own numbers. You start from a typical seasonal shape for your industry and tweak it, or paste your own last 12 months. We size staffing from two real figures you give us — how many people you run in your quiet month and at your peak — so the staffing math is your ratio, shown openly. No black box, no "AI" guessing.',
  },
  {
    q: 'Do I need to upload payroll data or connect a POS?',
    a: 'No. The demo runs on a handful of numbers you already know, in about three minutes, with no login or integration. Importing your own history (in Pro) makes the forecast tighter, but it is never required to get a usable plan.',
  },
  {
    q: 'How accurate is a 12-month forecast, really?',
    a: 'We treat it as a planning range, not a prediction. The shaded band is an 80% planning range driven by the unpredictability you set — wider at your volatile peak, narrower in quiet months. The point is to be roughly right early enough to hire on time, then re-check monthly as bookings firm up.',
  },
  {
    q: 'What about the "start hiring by" dates?',
    a: 'We take the month your crew needs to grow and subtract your hiring lead time (posting → hired → trained and productive). It is a planning reminder so you post jobs before the good candidates are gone — not a guarantee that the labor market will deliver them.',
  },
  {
    q: 'Is my data stored anywhere?',
    a: 'The demo computes everything in your browser — nothing you type leaves your device. The only thing we collect is your email, if you choose to join the beta list. No tracking cookies; privacy-friendly aggregate analytics only.',
  },
  {
    q: 'Does it work outside one country or currency?',
    a: 'Yes. There are no country-specific tax or contract rules baked in — it is deliberately global. Pick your currency for the cost projection, and choose your hemisphere so the seasonal curve lands in the right months.',
  },
  {
    q: 'It\'s a prototype — what works today?',
    a: 'The forecasting engine is real and live: every chart, gap, hire-by date and cost figure is computed from your inputs right now. Saving, export, scenarios and your-own-data import are what the paid tiers add. Join the beta and you help decide what we build first.',
  },
];
