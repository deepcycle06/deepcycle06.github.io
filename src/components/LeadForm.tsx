import { useEffect, useMemo, useState } from 'react';
import { SITE } from '../config/site';

interface LeadFormProps {
  segment?: string;
  heading?: string;
  subheading?: string;
}

interface UtmFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

function readUtm(): UtmFields {
  if (typeof window === 'undefined') {
    return { utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
  };
}

function readIntent(): string {
  if (typeof window === 'undefined') return 'just-interested';
  const params = new URLSearchParams(window.location.search);
  const p = params.get('intent');
  if (p && ['starter', 'pro', 'team', 'just-interested'].includes(p)) return p;
  try {
    const stored = window.localStorage.getItem('sp_last_intent');
    if (stored) return stored;
  } catch {
    /* ignore */
  }
  return 'just-interested';
}

export default function LeadForm({
  segment = 'homepage',
  heading = 'Krijg vroege toegang',
  subheading = 'Laat je e-mail achter en we verwittigen je zodra de beta open gaat. Geen spam, geen verkoop aan derden.',
}: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error' | 'placeholder'>('idle');
  const [email, setEmail] = useState('');
  const [intent, setIntent] = useState('just-interested');
  const [effectiveSegment, setEffectiveSegment] = useState(segment);
  const [referrer, setReferrer] = useState('');
  const [utm, setUtm] = useState<UtmFields>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  useEffect(() => {
    setIntent(readIntent());
    setUtm(readUtm());
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('segment');
      if (s) setEffectiveSegment(s);
      setReferrer(document.referrer || '');
    }
  }, []);

  // Reageer op een pricing-CTA-klik op dezelfde pagina: het formulier is al gemonteerd
  // vóór de klik, dus zonder dit zou het 'just-interested' submitten i.p.v. de tier.
  useEffect(() => {
    function onIntent(e: Event) {
      const detail = (e as CustomEvent<{ intent?: string; segment?: string }>).detail;
      if (detail?.intent) setIntent(detail.intent);
      if (detail?.segment) setEffectiveSegment(detail.segment);
    }
    function onNav() {
      setIntent(readIntent());
    }
    window.addEventListener('sp:intent', onIntent as EventListener);
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('sp:intent', onIntent as EventListener);
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, []);

  const endpoint = useMemo(
    () => `https://formspree.io/f/${SITE.FORMSPREE_ID}`,
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      if (SITE.FORMSPREE_ID === 'REPLACE_ME') {
        // Formspree nog niet geconfigureerd: niets versturen/opslaan en eerlijk een
        // "binnenkort"-melding tonen i.p.v. een valse succesbevestiging.
        // eslint-disable-next-line no-console
        console.info('[LeadForm] Formspree niet geconfigureerd — submit genegeerd', Object.fromEntries(data.entries()));
        setStatus('placeholder');
        return;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('ok');
        (window as unknown as { plausible?: (e: string, o?: unknown) => void }).plausible?.(
          'signup_form_submit',
          { props: { segment: effectiveSegment, intent } }
        );
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-6 text-sm text-primary">
        <h3 className="text-lg font-semibold text-success">Bedankt — je staat op de lijst.</h3>
        <p className="mt-2 text-primary/80">
          Je hoort van ons zodra we de beta openen. Geen spam, geen verkoop aan derden.
          Eventueel vragen we je om één keer kort mee te denken (10 min call, volledig vrijblijvend).
        </p>
      </div>
    );
  }

  if (status === 'placeholder') {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-sm text-primary">
        <h3 className="text-lg font-semibold text-accent">Inschrijvingen openen binnenkort</h3>
        <p className="mt-2 text-primary/80">
          We zetten de wachtlijst zo open. Kom straks nog eens terug om je in te schrijven —
          dan verwittigen we je zodra de beta start.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
      <div>
        <h3 className="text-xl font-semibold text-primary">{heading}</h3>
        <p className="mt-1 text-sm text-primary/70">{subheading}</p>
      </div>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-primary/80">E-mail</span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="rounded-lg border border-primary/20 px-3 py-2 text-base text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          placeholder="jij@bedrijf.be"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-primary/80">Bedrijf / sector (optioneel)</span>
        <input
          type="text"
          name="company"
          className="rounded-lg border border-primary/20 px-3 py-2 text-base text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          placeholder="Bv. strandbar De Haan, 8 wn"
        />
      </label>

      {/* Hidden tracking fields */}
      <input type="hidden" name="segment" value={effectiveSegment} />
      <input type="hidden" name="source" value={segment === 'homepage' ? 'homepage' : 'segment-page'} />
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="referrer" value={referrer} />
      <input type="hidden" name="utm_source" value={utm.utm_source} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
      <input type="hidden" name="utm_term" value={utm.utm_term} />
      <input type="hidden" name="utm_content" value={utm.utm_content} />
      {/* Formspree honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary disabled:opacity-60"
      >
        {status === 'loading' ? 'Versturen…' : 'Schrijf me in voor vroege toegang'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-warning">Er ging iets mis. Probeer opnieuw of mail naar {SITE.contactEmail}.</p>
      )}
      <p className="text-xs text-primary/50">
        Door in te schrijven ga je akkoord met ons <a className="underline" href="/privacy/">privacy-beleid</a>.
        Je kan je op elk moment uitschrijven.
      </p>
    </form>
  );
}
