'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { trackValidationEvent } from '../../lib/validation-tracker';

const TIERS = [
  {
    name: 'Explore',
    price: 'Free',
    tagline: 'Browse worlds, take assessments, try Mission 1',
    features: ['All world hubs & guides', 'Future-Proof assessment', 'Mission 1 in any world', 'Local progress on this device'],
    cta: 'Start exploring',
    href: '/explore',
    highlight: false,
  },
  {
    name: 'Build',
    price: '$4/mo',
    tagline: 'Save progress, portfolios, and parent views',
    features: ['Everything in Explore', 'Account sync across devices', 'Full mission portfolio', 'Personal notes & rankings'],
    cta: 'Join beta for Build',
    href: '/beta',
    highlight: true,
  },
  {
    name: 'Mastery',
    price: '$18/mo',
    tagline: 'Communities, mentors, and shared mastery',
    features: ['Everything in Build', 'Community circles', 'Peer feedback & showcases', 'Mentor pathways'],
    cta: 'Join beta for Mastery',
    href: '/beta',
    highlight: false,
  },
] as const;

export function PricingTiers() {
  useEffect(() => {
    void trackValidationEvent({ event_type: 'pricing_viewed', landing_page: '/pricing' });
  }, []);

  function trackClick(tier: string) {
    void trackValidationEvent({ event_type: 'pricing_clicked', landing_page: '/pricing', metadata: { tier } });
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
          <Link
            href={tier.href}
            onClick={() => trackClick(tier.name)}
            style={{
              display: 'inline-block',
              marginTop: 24,
              padding: '12px 20px',
              background: tier.highlight ? '#2A4A2A' : 'transparent',
              border: tier.highlight ? 'none' : '1px solid #1A1A1E',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            {tier.cta} →
          </Link>
        </article>
      ))}
    </div>
  );
}
