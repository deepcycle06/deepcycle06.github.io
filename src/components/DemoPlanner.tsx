import { useMemo, useState } from 'react';
import { INDUSTRY_PRESETS, MONTHS, CURRENCIES } from '../data/industries';
import { runEngine, fmtMoney, type PlannerInputs, type EventSpike } from '../lib/engine';

// ── small UI helpers ─────────────────────────────────────────────────────────
function Labeled({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-primary/80">{label}</span>
      {children}
      {hint && <span className="text-xs text-primary/50">{hint}</span>}
    </label>
  );
}

const inputCls =
  'rounded-lg border border-primary/20 px-3 py-2 text-sm text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

function NumberInput({ value, onChange, min, max, step = 1, suffix }: {
  value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <input type="number" className={`${inputCls} w-28`} value={Number.isFinite(value) ? value : ''}
        min={min} max={max} step={step}
        onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))} />
      {suffix && <span className="text-xs text-primary/50">{suffix}</span>}
    </span>
  );
}

function Slider({ value, onChange, min, max, step, fmt }: {
  value: number; onChange: (n: number) => void; min: number; max: number; step: number; fmt: (v: number) => string;
}) {
  return (
    <span className="flex items-center gap-3">
      <input type="range" className="h-2 w-full cursor-pointer accent-accent" value={value}
        min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} />
      <span className="w-24 flex-none text-right text-xs font-semibold text-primary tabular-nums">{fmt(value)}</span>
    </span>
  );
}

// ── charts (inline SVG, live) ────────────────────────────────────────────────
function DemandChart({ demand, lower, upper, spikes }: { demand: number[]; lower: number[]; upper: number[]; spikes: EventSpike[] }) {
  const W = 480, H = 230, padL = 28, padR = 14, padT = 16, padB = 26;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const maxY = 120;
  const x = (i: number) => padL + (i / 11) * plotW;
  const y = (v: number) => padT + (1 - v / maxY) * plotH;
  const line = demand.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const band =
    upper.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ') + ' ' +
    [...lower].map((v, i) => ({ v, i })).reverse().map(({ v, i }) => `L${x(i)},${y(v)}`).join(' ') + ' Z';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Demand forecast across 12 months with a planning band">
      <rect width={W} height={H} rx="8" fill="#f8fafc" />
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="#e2e8f0" />
          <text x={padL - 5} y={y(g) + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{g}</text>
        </g>
      ))}
      <path d={band} fill="#2563EB" fillOpacity="0.12" />
      <polyline points={line} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
      {demand.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2.4" fill="#2563EB" />)}
      {spikes.map((s, idx) => (
        s.month >= 0 && s.month < 12 ? (
          <g key={idx}>
            <line x1={x(s.month)} y1={padT} x2={x(s.month)} y2={H - padB} stroke="#D97706" strokeDasharray="3 3" strokeWidth="1" />
            <circle cx={x(s.month)} cy={y(demand[s.month])} r="3.5" fill="#D97706" />
          </g>
        ) : null
      ))}
      {MONTHS.map((m, i) => <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="#94a3b8">{m[0]}</text>)}
    </svg>
  );
}

function StaffChart({ required, current }: { required: number[]; current: number[] }) {
  const W = 480, H = 230, padL = 24, padR = 14, padT = 16, padB = 26;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const maxY = Math.max(...required, ...current, 1) * 1.15;
  const bw = (plotW / 12) * 0.62;
  const x = (i: number) => padL + (i + 0.5) / 12 * plotW;
  const y = (v: number) => padT + (1 - v / maxY) * plotH;
  const curLine = current.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Required vs current staffing per month">
      <rect width={W} height={H} rx="8" fill="#f8fafc" />
      {required.map((r, i) => {
        const gap = r - current[i];
        const fill = gap > 0 ? '#D97706' : '#2563EB';
        const op = gap > 0 ? 0.85 : 0.55;
        return <rect key={i} x={x(i) - bw / 2} y={y(r)} width={bw} height={Math.max(0, (H - padB) - y(r))} rx="2" fill={fill} fillOpacity={op} />;
      })}
      <polyline points={curLine} fill="none" stroke="#0F172A" strokeWidth="2" strokeDasharray="4 3" />
      {current.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2" fill="#0F172A" />)}
      {MONTHS.map((m, i) => <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="#94a3b8">{m[0]}</text>)}
    </svg>
  );
}

// ── defaults: a filled-in worked example (credible immediately) ───────────────
const DEFAULTS: PlannerInputs = {
  demandSource: 'preset',
  presetSlug: 'resort-hospitality',
  ownDemand: null,
  hemisphere: 'north',
  peakMonth: 6, // July
  peakIntensity: 1,
  volatility: 0.15,
  eventSpikes: [],
  baselineStaff: 4,
  peakStaff: 12,
  currentStaffByMonth: new Array(12).fill(9), // "carries ~9 most of the year"
  hiringLeadTimeWeeks: 8,
  rampWeeks: 0,
  costPerStaffPerMonth: 3200,
  planningYear: 2026,
};

export default function DemoPlanner() {
  const [inp, setInp] = useState<PlannerInputs>(DEFAULTS);
  const [currentTypical, setCurrentTypical] = useState(9);
  const [currency, setCurrency] = useState('USD');
  const [ownText, setOwnText] = useState('');
  const [ownMsg, setOwnMsg] = useState('');
  const set = <K extends keyof PlannerInputs>(k: K, v: PlannerInputs[K]) => setInp((s) => ({ ...s, [k]: v }));

  const symbol = CURRENCIES[currency]?.symbol ?? '$';

  const inputs: PlannerInputs = useMemo(() => ({
    ...inp,
    currentStaffByMonth: new Array(12).fill(currentTypical),
  }), [inp, currentTypical]);

  const r = useMemo(() => runEngine(inputs), [inputs]);

  const perTenPoints = (r.slope * 10);
  const headline = r.cost.savingsVsCurrent != null && r.cost.savingsVsCurrent > 0
    ? r.cost.savingsVsCurrent
    : r.cost.savingsVsNaive;
  const headlineLabel = r.cost.savingsVsCurrent != null && r.cost.savingsVsCurrent > 0
    ? 'vs your current flat plan'
    : 'vs staffing for peak all year';

  function addSpike() {
    set('eventSpikes', [...inp.eventSpikes, { month: 5, liftPercent: 30, label: 'Event' }]);
  }
  function updateSpike(i: number, patch: Partial<EventSpike>) {
    set('eventSpikes', inp.eventSpikes.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }
  function removeSpike(i: number) {
    set('eventSpikes', inp.eventSpikes.filter((_, idx) => idx !== i));
  }
  function applyOwn() {
    const nums = ownText.split(/[\s,;\t]+/).map(Number).filter((n) => Number.isFinite(n));
    if (nums.length === 12) { set('ownDemand', nums); set('demandSource', 'own'); setOwnMsg(''); }
    else { setOwnMsg(`Need exactly 12 monthly values (Jan→Dec) — found ${nums.length}.`); }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
      {/* ── controls ── */}
      <div className="card h-fit">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary">Your numbers</h3>
          <span className="badge bg-success/10 text-success">~3 min · no login</span>
        </div>
        <p className="mt-1 text-xs text-primary/50">No payroll integration, no history upload — just numbers you already know.</p>

        <div className="mt-4 grid gap-4">
          <Labeled label="Business type" hint="Sets a typical seasonal shape you can tweak or replace.">
            <select className={inputCls} value={inp.presetSlug}
              onChange={(e) => { set('presetSlug', e.target.value); set('demandSource', 'preset'); }}>
              {INDUSTRY_PRESETS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
          </Labeled>

          {inp.demandSource === 'preset' && (
            <>
              <Labeled label="Peak month">
                <select className={inputCls} value={inp.peakMonth} onChange={(e) => set('peakMonth', Number(e.target.value))}>
                  {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
              </Labeled>
              <Labeled label="How extreme is your peak?" hint="Flatter ← → spikier season">
                <Slider value={inp.peakIntensity} onChange={(v) => set('peakIntensity', v)} min={0.5} max={2} step={0.1}
                  fmt={(v) => `${v.toFixed(1)}×`} />
              </Labeled>
              <Labeled label="Hemisphere" hint="Southern flips the curve 6 months so your peak lands in the right season.">
                <div className="flex gap-2">
                  {(['north', 'south'] as const).map((h) => (
                    <button key={h} type="button" onClick={() => set('hemisphere', h)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${inp.hemisphere === h ? 'border-accent bg-accent/10 text-accent' : 'border-primary/20 text-primary/70 hover:bg-primary/5'}`}>
                      {h === 'north' ? 'Northern' : 'Southern'}
                    </button>
                  ))}
                </div>
              </Labeled>
            </>
          )}

          <Labeled label="Demand unpredictability" hint="Drives the width of the planning band.">
            <Slider value={inp.volatility} onChange={(v) => set('volatility', v)} min={0.05} max={0.4} step={0.01}
              fmt={(v) => `±${Math.round(v * 100)}%`} />
          </Labeled>

          <div className="grid grid-cols-2 gap-3">
            <Labeled label="Staff in quiet month">
              <NumberInput value={inp.baselineStaff} onChange={(v) => set('baselineStaff', v)} min={0} />
            </Labeled>
            <Labeled label="Staff at your peak">
              <NumberInput value={inp.peakStaff} onChange={(v) => set('peakStaff', v)} min={0} />
            </Labeled>
          </div>

          <Labeled label="Staff you carry in a typical month now" hint="We compare your forecast against this.">
            <NumberInput value={currentTypical} onChange={setCurrentTypical} min={0} />
          </Labeled>

          <Labeled label="Hiring lead time" hint="Weeks from posting a job to a trained, productive hire (incl. ramp).">
            <Slider value={inp.hiringLeadTimeWeeks} onChange={(v) => set('hiringLeadTimeWeeks', v)} min={1} max={16} step={1}
              fmt={(v) => `${v} wk`} />
          </Labeled>

          <div className="grid grid-cols-2 gap-3">
            <Labeled label="Cost / staff / month" hint="Fully loaded: wages + employer taxes + benefits.">
              <NumberInput value={inp.costPerStaffPerMonth} onChange={(v) => set('costPerStaffPerMonth', v)} min={0} step={100} />
            </Labeled>
            <Labeled label="Currency">
              <select className={inputCls} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {Object.entries(CURRENCIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </Labeled>
          </div>

          {/* event spikes */}
          <div className="rounded-lg border border-primary/10 bg-primary/[0.02] p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary/80">Known event spikes</span>
              <button type="button" onClick={addSpike} className="text-xs font-semibold text-accent hover:underline">+ Add</button>
            </div>
            {inp.eventSpikes.length === 0 && <p className="mt-1 text-xs text-primary/45">e.g. a festival weekend or a big booking.</p>}
            {inp.eventSpikes.map((s, i) => (
              <div key={i} className="mt-2 flex items-center gap-2">
                <select className={`${inputCls} flex-1 py-1`} value={s.month} onChange={(e) => updateSpike(i, { month: Number(e.target.value) })}>
                  {MONTHS.map((m, mi) => <option key={mi} value={mi}>{m}</option>)}
                </select>
                <input type="number" className={`${inputCls} w-20 py-1`} value={s.liftPercent}
                  onChange={(e) => updateSpike(i, { liftPercent: Number(e.target.value) })} />
                <span className="text-xs text-primary/50">%</span>
                <button type="button" onClick={() => removeSpike(i)} aria-label="Remove" className="text-primary/40 hover:text-warning">✕</button>
              </div>
            ))}
          </div>

          {/* own data */}
          <details className="rounded-lg border border-primary/10 p-3">
            <summary className="cursor-pointer text-sm font-medium text-primary/80">Use my own 12 months instead</summary>
            <p className="mt-2 text-xs text-primary/50">Paste last year's monthly revenue, covers, bookings or units (Jan→Dec), comma or space separated.</p>
            <textarea className={`${inputCls} mt-2 h-16 w-full`} value={ownText} placeholder="e.g. 12, 14, 20, 33, 50, 72, 88, 90, 64, 40, 18, 22"
              onChange={(e) => setOwnText(e.target.value)} />
            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={applyOwn} className="btn-secondary px-3 py-1 text-xs">Use these numbers</button>
              {inp.demandSource === 'own' && (
                <button type="button" onClick={() => set('demandSource', 'preset')} className="text-xs text-primary/50 hover:underline">back to preset</button>
              )}
            </div>
            {inp.demandSource === 'own' && <p className="mt-1 text-xs text-success">Using your own data ✓</p>}
            {ownMsg && <p className="mt-1 text-xs text-warning">{ownMsg}</p>}
          </details>
        </div>
      </div>

      {/* ── results ── */}
      <div className="grid gap-5">
        {/* headline summary — visible right after the controls (esp. on mobile) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-primary/10 bg-white p-3 text-center">
            <div className="text-xs text-primary/50">Peak crew</div>
            <div className="text-lg font-bold text-primary tabular-nums">{r.peakRequired}</div>
          </div>
          <div className="rounded-xl border border-primary/10 bg-white p-3 text-center">
            <div className="text-xs text-primary/50">Start hiring by</div>
            <div className="text-base font-bold text-accent tabular-nums">{r.hires.length ? r.hires[0].hireByLabel.replace(/,\s*\d{4}$/, '') : 'covered'}</div>
          </div>
          <div className="rounded-xl border border-primary/10 bg-white p-3 text-center">
            <div className="text-xs text-primary/50">{headline >= 0 ? 'Saving/yr' : 'Extra/yr'}</div>
            <div className="text-base font-bold text-success tabular-nums">{fmtMoney(Math.abs(headline), symbol)}</div>
          </div>
        </div>

        {/* calibration / how it reads */}
        <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-4 text-sm">
          <p className="text-primary/80">
            <strong className="text-primary">How we read this:</strong> we calibrate from your two real numbers —{' '}
            <span className="font-semibold">{inp.baselineStaff} staff</span> in your quiet month and{' '}
            <span className="font-semibold">{inp.peakStaff} at peak</span> — so each <span className="font-semibold">+10</span> points of demand ≈{' '}
            <span className="font-semibold tabular-nums">{perTenPoints >= 0 ? '+' : ''}{perTenPoints.toFixed(1)} staff</span>. It's your ratio, not a black box.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* forecast */}
          <div className="card">
            <h4 className="text-sm font-semibold text-primary">12-month demand forecast</h4>
            <p className="text-xs text-primary/50">Index where your peak = 100. Band = 80% planning range from your volatility — a range, not a guarantee.</p>
            <div className="mt-3"><DemandChart demand={r.demand} lower={r.lower} upper={r.upper} spikes={inp.eventSpikes} /></div>
          </div>
          {/* staffing */}
          <div className="card">
            <h4 className="text-sm font-semibold text-primary">Required vs current staffing</h4>
            <p className="text-xs text-primary/50">Bars = staff you'll need (amber = short of your current plan). Dashed line = what you carry today.</p>
            <div className="mt-3"><StaffChart required={r.required} current={r.current} /></div>
          </div>
        </div>

        {/* hiring timeline */}
        <div className="card">
          <h4 className="text-sm font-semibold text-primary">When to start hiring</h4>
          {r.hires.length === 0 ? (
            <p className="mt-2 text-sm text-primary/60">Your current crew already covers the forecast — no ramp-up hiring needed.</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {r.hires.map((h, i) => (
                <li key={i} className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-primary/10 bg-white px-3 py-2 text-sm">
                  <span className="badge bg-accent/10 text-accent">Start hiring by {h.hireByLabel}</span>
                  <span className="text-primary/80">up to <strong>+{h.addStaff}</strong> {h.addStaff === 1 ? 'person' : 'people'} for <strong>{h.fromLabel}{h.toLabel !== h.fromLabel ? `–${h.toLabel}` : ''}</strong></span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-primary/45">Hire-by = the month your shortage begins − your {inp.hiringLeadTimeWeeks}-week lead time. A planning reminder, not a labor-supply guarantee.</p>
        </div>

        {/* cost */}
        <div className="card">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h4 className="text-sm font-semibold text-primary">Labor-cost projection</h4>
              <p className="mt-1 text-sm text-primary/70">
                Forecast-matched plan: <strong className="tabular-nums">{fmtMoney(r.cost.plannedAnnual, symbol)}</strong>/yr.
                {r.cost.currentAnnual != null && <> Your current flat plan: <strong className="tabular-nums">{fmtMoney(r.cost.currentAnnual, symbol)}</strong>/yr.</>}
                {' '}Staffing for peak all year would cost <strong className="tabular-nums">{fmtMoney(r.cost.naiveFlatPeakAnnual, symbol)}</strong>.
              </p>
            </div>
            <div className="rounded-xl bg-success/10 px-5 py-4 text-center">
              <div className="text-2xl font-bold text-success tabular-nums">{fmtMoney(Math.abs(headline), symbol)}</div>
              <div className="text-xs font-medium text-success/80">{headline >= 0 ? 'potential saving' : 'extra cost'} {headlineLabel}</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-primary/45">
            Compared against a flat current crew of {currentTypical}/month (an illustrative baseline) — per-month current-crew entry is coming in the beta for an exact figure.
          </p>
        </div>

        {/* CTA at the payoff moment */}
        <a href="/#lead" className="btn-primary w-full justify-center">Save &amp; export this plan → Join the beta</a>

        <p className="text-center text-xs text-primary/45">
          Every figure above is computed live from your inputs by a transparent model — no AI black box, no data leaves your browser.
        </p>
      </div>
    </div>
  );
}
