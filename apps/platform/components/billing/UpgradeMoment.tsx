'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackValidationEvent, getVisitorId } from '../../lib/validation-tracker';
import { TIER_PRICING, type PaidTier } from '../../lib/billing';

type Props = {
  tier: PaidTier;
  headline: string;
  body: string;
  worldSlug?: string;
  missionSlug?: string;
  context: string;
  premiumNext?: string;
  compact?: boolean;
};

export function UpgradeMoment({ tier, headline, body, worldSlug, missionSlug, context, premiumNext, compact }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pricing = TIER_PRICING[tier];

  async function handleUpgrade() {
    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          world_slug: worldSlug,
          context,
          mission_slug: missionSlug,
          visitor_id: getVisitorId(),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.sign_in_required) {
        window.location.href = `/sign-in?next=${encodeURIComponent('/pricing')}`;
        return;
      }
      if (data.billing_not_configured) {
        window.location.href = `/pricing?tier=${tier}`;
        return;
      }
      setError(data.error ?? 'Could not start checkout');
    } catch {
      setError('Network error — try again');
    } finally {
      setBusy(false);
    }
  }

  if (compact) {
    return (
      <div style={{ marginTop: 16, padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{headline}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{body}</p>
        <button type="button" onClick={handleUpgrade} disabled={busy} style={{ marginTop: 12, padding: '10px 16px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', fontSize: 13, cursor: 'pointer' }}>
          {busy ? 'Starting…' : `Upgrade to ${pricing.label} — $${pricing.priceUsd}/mo →`}
        </button>
        {error && <p style={{ color: '#C96B6B', fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>
    );
  }

  return (
    <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8, border: '1px solid #4A4020' }}>
      <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>What comes next</p>
      <h3 style={{ color: '#E8E8EC', fontSize: 17, fontWeight: 400, margin: '10px 0 0' }}>{headline}</h3>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{body}</p>
      {premiumNext && (
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 12 }}>Includes: {premiumNext}</p>
      )}
      <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={handleUpgrade} disabled={busy} style={{ padding: '12px 20px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', fontSize: 14, cursor: 'pointer' }}>
          {busy ? 'Starting checkout…' : `Upgrade to ${pricing.label} — $${pricing.priceUsd}/mo →`}
        </button>
        <Link href="/pricing" style={{ color: '#6B6B70', fontSize: 13 }} onClick={() => void trackValidationEvent({ event_type: 'pricing_clicked', path_slug: worldSlug, metadata: { tier, source: context, world_slug: worldSlug } })}>
          Compare plans
        </Link>
      </div>
      {error && <p style={{ color: '#C96B6B', fontSize: 13, marginTop: 12 }}>{error}</p>}
    </section>
  );
}
