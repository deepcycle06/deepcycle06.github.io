import type { MouseEvent } from 'react';

interface IntentTrackerProps {
  intent: 'starter' | 'pro' | 'team';
  segment?: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

/**
 * Klikbare CTA op pricing-cards. Dispatcht plausible-event +
 * localStorage-backup, scrollt dan naar #lead met query-parameters
 * zodat het LeadForm-island hidden fields correct invult.
 */
export default function IntentTracker({
  intent,
  segment = 'homepage',
  label,
  variant = 'primary',
}: IntentTrackerProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const eventName = `intent_click_${intent}`;

    try {
      (window as unknown as { plausible?: (e: string, o?: unknown) => void }).plausible?.(
        eventName,
        { props: { segment } }
      );
    } catch {
      /* ignore */
    }

    try {
      const entry = {
        ts: new Date().toISOString(),
        event: eventName,
        segment,
        intent,
      };
      const raw = window.localStorage.getItem('sp_intents') ?? '[]';
      const arr = JSON.parse(raw);
      arr.push(entry);
      window.localStorage.setItem('sp_intents', JSON.stringify(arr.slice(-50)));
      window.localStorage.setItem('sp_last_intent', intent);
    } catch {
      /* ignore */
    }

    // Update URL + scroll
    const url = new URL(window.location.href);
    url.searchParams.set('intent', intent);
    url.searchParams.set('segment', segment);
    url.hash = 'lead';
    window.history.replaceState({}, '', url.toString());

    const target = document.getElementById('lead');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const cls = variant === 'primary' ? 'btn-primary w-full' : 'btn-secondary w-full';

  return (
    <a href="#lead" onClick={handleClick} className={cls} data-intent={intent} data-segment={segment}>
      {label}
    </a>
  );
}
