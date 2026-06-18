// Industry seasonal presets — the COLD-START shape only.
// These are honest, hand-built typical seasonal curves (demand index 0-100, Jan..Dec,
// northern-hemisphere). They are a starting point a user tweaks or replaces with their
// own 12 numbers — never presented as a per-business prediction.

export interface IndustryPreset {
  slug: string;
  name: string;
  short: string;
  /** 12 demand-index values 0-100, Jan..Dec (northern hemisphere). */
  monthlyCurve: number[];
  /** Hint shown to the operator for what "demand" means in their world. */
  demandUnit: string;
  note: string;
}

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    slug: 'resort-hospitality',
    name: 'Resort hotels, restaurants & bars',
    short: 'Hospitality',
    monthlyCurve: [15, 18, 28, 42, 60, 80, 95, 98, 72, 48, 30, 38],
    demandUnit: 'covers / occupancy',
    note: 'Summer-peak coastal & leisure hospitality. Strong Jul–Aug peak, soft May & Sep shoulders, small December bump.',
  },
  {
    slug: 'tourism-leisure',
    name: 'Rentals, attractions, tours & campsites',
    short: 'Tourism & leisure',
    monthlyCurve: [10, 12, 22, 40, 58, 78, 92, 96, 70, 42, 20, 16],
    demandUnit: 'bookings / visitors',
    note: 'Outdoor tourism: bike/boat rental, attractions, tours, campsites. Very weather-sensitive — set unpredictability higher.',
  },
  {
    slug: 'agriculture-harvest',
    name: 'Agriculture & harvest (pick / pack)',
    short: 'Agriculture',
    monthlyCurve: [8, 8, 12, 20, 55, 90, 85, 70, 60, 75, 30, 10],
    demandUnit: 'yield / kg picked',
    note: 'Crop-driven, not tourist-driven: a sharp harvest window. Set your peak month to match your crop.',
  },
  {
    slug: 'events-festivals',
    name: 'Events, festivals & catering crew',
    short: 'Events',
    monthlyCurve: [20, 22, 30, 45, 65, 85, 90, 82, 70, 55, 40, 60],
    demandUnit: 'events / guests',
    note: 'Spiky and booking-keyed. The base curve is moderate — add each festival or large booking as an event spike.',
  },
  {
    slug: 'seasonal-retail',
    name: 'Seasonal retail & gifting',
    short: 'Seasonal retail',
    monthlyCurve: [30, 28, 32, 38, 42, 45, 48, 50, 55, 68, 88, 100],
    demandUnit: 'sales / transactions',
    note: 'Inverse of the leisure curves: the peak is Nov–Dec. Hire-by dates land in Sep–Oct because the whole year rides on a 6-week window.',
  },
  {
    slug: 'winter-sports',
    name: 'Winter sports & alpine hospitality',
    short: 'Winter sports',
    monthlyCurve: [95, 90, 75, 40, 18, 12, 15, 18, 22, 35, 60, 88],
    demandUnit: 'guests / lift passes',
    note: 'Winter-peak: busy Dec–Mar, quiet summer. The explicit cold-season option without using the hemisphere toggle.',
  },
];

export function getPreset(slug: string): IndustryPreset {
  return INDUSTRY_PRESETS.find((p) => p.slug === slug) ?? INDUSTRY_PRESETS[0];
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: '$', label: 'USD' },
  EUR: { symbol: '€', label: 'EUR' },
  GBP: { symbol: '£', label: 'GBP' },
  AUD: { symbol: 'A$', label: 'AUD' },
  CAD: { symbol: 'C$', label: 'CAD' },
  NZD: { symbol: 'NZ$', label: 'NZD' },
};
