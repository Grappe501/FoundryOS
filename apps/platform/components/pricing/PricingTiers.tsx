'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackValidationEvent, getVisitorId } from '../../lib/validation-tracker';
import { TIER_PRICING, type PaidTier } from '../../lib/billing';

const TIERS = [
  {
    name: 'Explore',
    tier: null as null,
    price: 'Free',
    tagline: 'Assessment, explore, first mission, community view',
    features: ['All world hubs & guides', 'Future-Proof assessment', 'Mission 1 in any world', 'Community view (read-only)'],
    cta: 'Start exploring',
    href: '/explore',
    highlight: false,
  },
  {
    name: 'Build',
    tier: 'build' as PaidTier,
    price: '$4/mo',
    tagline: 'Full academy, portfolios, progress tracking, community participation',
    features: ['Everything in Explore', 'Full academy access', 'Portfolio sync across devices', 'Community participation'],
    cta: 'Upgrade to Build',
    href: '/pricing',
    highlight: true,
  },
  {
    name: 'Mastery',
    tier: 'mastery' as PaidTier,
    price: '$18/mo',
    tagline: 'Mentorship, advanced paths, community leadership, mastery reviews',
    features: ['Everything in Build', 'Mentor pathways', 'Advanced paths', 'Community leadership tools'],
    cta: 'Upgrade to Mastery',
    href: '/pricing',
    highlight: false,
  },
] as const;

export function PricingTiers() {
  const [busyTier, setBusyTier] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const worldFromQuery = searchParams.get('world') ?? undefined;
  const cancelled = searchParams.get('cancelled') === '1';
  const cancelledTier = searchParams.get('tier') ?? undefined;

  useEffect(() => {
    void trackValidationEvent({ event_type: 'pricing_viewed', landing_page: '/pricing', path_slug: worldFromQuery });
  }, [worldFromQuery]);

  useEffect(() => {
    if (cancelled) {
      void trackValidationEvent({
        event_type: 'checkout_cancelled',
        landing_page: '/pricing',
        path_slug: worldFromQuery,
        metadata: { tier: cancelledTier, reason: 'stripe_cancel_url' },
      });
    }
  }, [cancelled, cancelledTier, worldFromQuery]);

  function trackClick(tier: string) {
    const normalized = tier.toLowerCase().includes('mastery') ? 'mastery' : tier.toLowerCase().includes('build') ? 'build' : tier.toLowerCase();
    void trackValidationEvent({ event_type: 'pricing_clicked', landing_page: '/pricing', path_slug: worldFromQuery, metadata: { tier: normalized } });
  }

  async function handlePaidTier(tier: PaidTier) {
    trackClick(tier);
    setBusyTier(tier);

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, context: 'pricing_page', visitor_id: getVisitorId(), world_slug: worldFromQuery }),
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
        window.location.href = '/beta';
        return;
      }
    } finally {
      setBusyTier(null);
    }
  }

  return (
    <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
      {TIERS.map((tier) => (
        <article
          key={tier.name}
          style={{
            padding: 28,
            background: tier.highlight ? '#0F0F12' : '#111114',
            borderRadius: 8,
            border: tier.highlight ? '1px solid #2A4A2A' : '1px solid #1A1A1E',
          }}
        >
          <p style={{ color: tier.highlight ? '#6B9B6B' : '#6B6B70', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            {tier.name}
          </p>
          <p style={{ fontSize: 32, fontWeight: 300, margin: '12px 0 0', color: '#E8E8EC' }}>{tier.price}</p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>{tier.tagline}</p>
          <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 20, paddingLeft: 18, lineHeight: 1.8 }}>
            {tier.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {tier.tier ? (
            <button
              type="button"
              disabled={busyTier === tier.tier}
              onClick={() => handlePaidTier(tier.tier!)}
              style={{
                display: 'inline-block',
                marginTop: 24,
                padding: '12px 20px',
                background: tier.highlight ? '#2A4A2A' : 'transparent',
                border: tier.highlight ? 'none' : '1px solid #1A1A1E',
                borderRadius: 6,
                color: '#E8E8EC',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {busyTier === tier.tier ? 'Starting…' : `${tier.cta} — $${TIER_PRICING[tier.tier].priceUsd}/mo →`}
            </button>
          ) : (
            <Link
              href={tier.href}
              onClick={() => trackClick(tier.name)}
              style={{
                display: 'inline-block',
                marginTop: 24,
                padding: '12px 20px',
                background: 'transparent',
                border: '1px solid #1A1A1E',
                borderRadius: 6,
                color: '#E8E8EC',
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {tier.cta} →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
