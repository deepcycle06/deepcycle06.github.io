// Aheadcount forecasting engine — pure, deterministic, client-side. No backend, no
// "AI", no training. Every number is traceable arithmetic over 12 months, calibrated
// from the operator's OWN inputs. This transparency is the product's credibility.

import { getPreset, MONTHS_LONG } from '../data/industries';

export interface EventSpike {
  month: number; // 0-11
  liftPercent: number;
  label: string;
}

export interface PlannerInputs {
  // Demand shape ----------------------------------------------------------
  demandSource: 'preset' | 'own';
  presetSlug: string;
  ownDemand: number[] | null; // 12 raw numbers in the operator's own unit (own mode)
  hemisphere: 'north' | 'south';
  peakMonth: number; // 0-11 (preset mode)
  peakIntensity: number; // 0.5 - 2.0 (preset mode)
  volatility: number; // 0.05 - 0.40 -> width of the planning band
  eventSpikes: EventSpike[];
  // Staffing calibration (two real points the operator knows) --------------
  baselineStaff: number; // heads in the quietest month
  peakStaff: number; // heads in the busiest month
  // Current plan + hiring + cost ------------------------------------------
  currentStaffByMonth: number[] | null; // 12 values, or null -> flat baseline
  hiringLeadTimeWeeks: number;
  rampWeeks: number; // training / time-to-productive
  costPerStaffPerMonth: number;
  planningYear: number;
}

export interface HireAlert {
  hireByISO: string;
  hireByLabel: string;
  addStaff: number; // peak shortage across the run
  fromLabel: string; // month the shortage begins
  toLabel: string; // month the shortage ends (may equal fromLabel)
}

export interface PlannerResult {
  demand: number[];
  lower: number[];
  upper: number[];
  required: number[]; // integer heads
  requiredRaw: number[];
  current: number[];
  delta: number[]; // required - current (>0 gap, <0 overstaffed)
  baselineDemand: number;
  peakDemand: number;
  core: number; // staff at baseline demand
  slope: number; // extra staff per +1 demand index point
  hires: HireAlert[];
  peakMonth: number;
  peakRequired: number;
  cost: {
    plannedByMonth: number[];
    currentByMonth: number[] | null;
    plannedAnnual: number;
    currentAnnual: number | null;
    naiveFlatPeakAnnual: number;
    savingsVsCurrent: number | null;
    savingsVsNaive: number;
    savingsVsNaivePct: number;
  };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

/** Build the 12-month demand index (0..~120) from a preset + adjustments. */
function buildPresetDemand(inp: PlannerInputs): number[] {
  const preset = getPreset(inp.presetSlug).monthlyCurve;
  // 1. Hemisphere rotation (southern peaks land 6 months apart).
  const base = inp.hemisphere === 'south'
    ? preset.map((_, i) => preset[(i + 6) % 12])
    : preset.slice();
  // 2. Phase-shift so the preset's own peak lands on the user's stated peak month.
  const p0 = base.indexOf(Math.max(...base));
  const shift = (((inp.peakMonth - p0) % 12) + 12) % 12;
  const shifted = base.map((_, i) => base[(((i - shift) % 12) + 12) % 12]);
  // 3. Stretch around the mean by peak intensity.
  const m = sum(shifted) / 12;
  const intense = shifted.map((v) => clamp(m + (v - m) * inp.peakIntensity, 0, 100));
  // 4. Apply event spikes.
  const demand = intense.slice();
  for (const e of inp.eventSpikes) {
    if (e.month >= 0 && e.month < 12) {
      demand[e.month] = clamp(demand[e.month] * (1 + e.liftPercent / 100), 0, 120);
    }
  }
  return demand;
}

/** Normalize the operator's own 12 numbers to a 0..100 index (peak = 100). */
function buildOwnDemand(inp: PlannerInputs): number[] {
  const raw = inp.ownDemand && inp.ownDemand.length === 12 ? inp.ownDemand : new Array(12).fill(0);
  const max = Math.max(...raw, 1);
  const demand = raw.map((v) => clamp((v / max) * 100, 0, 100));
  // Event spikes still apply on top of own data.
  for (const e of inp.eventSpikes) {
    if (e.month >= 0 && e.month < 12) {
      demand[e.month] = clamp(demand[e.month] * (1 + e.liftPercent / 100), 0, 120);
    }
  }
  return demand;
}

export function runEngine(inp: PlannerInputs): PlannerResult {
  const demand = inp.demandSource === 'own' ? buildOwnDemand(inp) : buildPresetDemand(inp);

  // Planning band: an 80% heuristic range (z = 1.28) scaled by the user's volatility.
  // It is wider where demand is higher — honest about peak uncertainty, not a flat ±10.
  const z = 1.28;
  const lower = demand.map((d) => clamp(d - z * inp.volatility * d, 0, 120));
  const upper = demand.map((d) => clamp(d + z * inp.volatility * d, 0, 130));

  // Calibrate staffing from TWO real points: (baselineDemand, baselineStaff) and
  // (peakDemand, peakStaff). This gives a fixed core + variable slope — the
  // multiplier is the operator's own number, which is the whole credibility argument.
  const baselineDemand = Math.min(...demand);
  const peakDemand = Math.max(...demand);
  const span = Math.max(peakDemand - baselineDemand, 1);
  const slope = (inp.peakStaff - inp.baselineStaff) / span;
  const core = inp.baselineStaff;

  const requiredRaw = demand.map((d) => Math.max(0, core + slope * (d - baselineDemand)));
  const required = requiredRaw.map((r) => Math.max(0, Math.round(r)));

  const current = inp.currentStaffByMonth && inp.currentStaffByMonth.length === 12
    ? inp.currentStaffByMonth.slice()
    : new Array(12).fill(inp.baselineStaff);

  const delta = required.map((r, i) => r - current[i]);

  // Hiring waves: collapse each contiguous understaffed run (where required > current)
  // into ONE clear alert — be ready by the start of the shortage, sized to the run's
  // peak gap. Hire-by = that month's start minus your lead + ramp time.
  const hires: HireAlert[] = [];
  const msWeek = 7 * 86400000;
  const leadMs = (inp.hiringLeadTimeWeeks + inp.rampWeeks) * msWeek;
  let i = 0;
  while (i < 12) {
    if (delta[i] > 0) {
      let j = i;
      let maxGap = 0;
      while (j < 12 && delta[j] > 0) {
        if (delta[j] > maxGap) maxGap = delta[j];
        j++;
      }
      const monthStart = Date.UTC(inp.planningYear, i, 1);
      const hireBy = new Date(monthStart - leadMs);
      hires.push({
        hireByISO: hireBy.toISOString().slice(0, 10),
        hireByLabel: hireBy.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
        addStaff: maxGap,
        fromLabel: MONTHS_LONG[i],
        toLabel: MONTHS_LONG[j - 1],
      });
      i = j;
    } else {
      i++;
    }
  }

  const peakRequired = Math.max(...required);
  const peakMonth = required.indexOf(peakRequired);

  // Cost: pay whole heads. Compare against the operator's own plan (primary, honest)
  // and against a clearly-labelled naive "staff for peak all year" upper bound.
  const c = inp.costPerStaffPerMonth;
  const plannedByMonth = required.map((r) => r * c);
  const plannedAnnual = sum(plannedByMonth);
  const hasCurrent = !!inp.currentStaffByMonth;
  const currentByMonth = hasCurrent ? current.map((r) => r * c) : null;
  const currentAnnual = currentByMonth ? sum(currentByMonth) : null;
  const naiveFlatPeakAnnual = peakRequired * 12 * c;
  const savingsVsCurrent = currentAnnual != null ? currentAnnual - plannedAnnual : null;
  const savingsVsNaive = naiveFlatPeakAnnual - plannedAnnual;
  const savingsVsNaivePct = naiveFlatPeakAnnual > 0 ? savingsVsNaive / naiveFlatPeakAnnual : 0;

  return {
    demand, lower, upper, required, requiredRaw, current, delta,
    baselineDemand, peakDemand, core, slope,
    hires, peakMonth, peakRequired,
    cost: {
      plannedByMonth, currentByMonth, plannedAnnual, currentAnnual,
      naiveFlatPeakAnnual, savingsVsCurrent, savingsVsNaive, savingsVsNaivePct,
    },
  };
}

export function fmtMoney(n: number, symbol: string): string {
  const rounded = Math.round(n);
  return symbol + rounded.toLocaleString('en-US');
}
