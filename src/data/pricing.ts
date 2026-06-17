export interface PricingTier {
  id: 'starter' | 'pro' | 'team' | 'enterprise';
  name: string;
  price: string;
  priceSub: string;
  tagline: string;
  features: string[];
  cta: string;
  intent: 'starter' | 'pro' | 'team';
  highlight?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '€79',
    priceSub: 'eenmalig',
    tagline: 'Excel-template + PDF-handleiding. Voor wie vandaag al in Excel werkt.',
    features: [
      'Excel-template met formules (flexi + student + vast)',
      'PDF-handleiding, Belgisch-fiscaal correct',
      'Voorbeelden per sector (horeca, kust, tuinbouw, events)',
      'Eén keer betalen, voor altijd van jou',
      'Updates op BE-regelgeving tot einde seizoen',
    ],
    cta: 'Reserveer Starter (beta)',
    intent: 'starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '€49',
    priceSub: 'per maand',
    tagline: 'Online forecast-tool met weer, events en jouw historie. Voor groeiende KMO\'s.',
    features: [
      'Maand-per-maand forecast met weer + events',
      'Upload jouw omzet- en personeels-historie',
      'Scenario\'s opslaan (nat/droog, high/low)',
      'Export naar Excel en PDF',
      'Updates BE-regelgeving + e-mail support',
      '1 gebruiker',
    ],
    cta: 'Reserveer Pro (beta)',
    intent: 'pro',
    highlight: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '€99',
    priceSub: 'per maand',
    tagline: 'Voor multi-vestiging of zaakvoerder + boekhouder samen.',
    features: [
      'Alles in Pro',
      '3 gebruikers (zaakvoerder + team + boekhouder)',
      'Multi-vestiging vergelijken (tot 3 locaties)',
      'Versiebeheer scenario\'s',
      'Prioriteit-support',
      'Toegang tot sector-benchmarks (opt-in)',
    ],
    cta: 'Reserveer Team (beta)',
    intent: 'team',
  },
];

export const ENTERPRISE_NOTE =
  'Meer dan 3 vestigingen of API-koppeling met je loonsoftware nodig? Enterprise vanaf €299/mnd — neem contact op.';
