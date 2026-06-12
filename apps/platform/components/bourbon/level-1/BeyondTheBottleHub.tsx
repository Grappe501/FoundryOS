'use client';

import Link from 'next/link';
import { WILD_TOPICS } from '../../../lib/bourbon-level-1/wild/wild-topics';
import { DidYouKnowStrip } from './DidYouKnowStrip';

const ACCENT = 'var(--foundry-primary)';

const BEYOND_LINKS = [
  { href: '/bourbon/lore', title: 'World Lore', hook: 'Pappy, rivalries, mysteries, timeline — mythology not curriculum' },
  { href: '/bourbon/origins', title: 'Origins Map', hook: 'House of Bourbon → whiskey vs Bourbon Street' },
  { href: '/bourbon/pop-culture', title: 'Pop Culture', hook: 'Movies, music, Derby, presidents' },
  { href: '/bourbon/connections', title: 'Connections Graph', hook: 'Click bourbon — wander for an hour' },
  { href: '/bourbon/pour-guide', title: 'Pour Impact Guide', hook: 'Neat, rocks, cola, julep — by bottle type' },
  { href: '/bourbon/where-to-buy', title: 'Where to Buy', hook: 'Kentucky, NYC, Texas, online — regional tips' },
];

export function BeyondTheBottleHub() {
  return (
    <div>
      <header>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Beyond the Bottle
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
          Bourbon in the wild
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
          Unexpected connections — Bourbon Street was not named after whiskey. The Derby serves juleps for a reason.
          Explore the universe, not the syllabus.
        </p>
      </header>

      <DidYouKnowStrip />

      <section style={{ marginTop: 28, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {BEYOND_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: 'block',
              padding: 18,
              background: '#111114',
              borderRadius: 10,
              border: '1px solid #1A1A1E',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{l.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{l.hook}</p>
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          How is this connected to bourbon?
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {WILD_TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/bourbon/wild/${t.slug}`}
              style={{
                display: 'block',
                padding: 18,
                background: '#0F0F12',
                borderRadius: 8,
                textDecoration: 'none',
                border: '1px solid #1A1A1E',
              }}
            >
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{t.title}</p>
              <p style={{ color: ACCENT, fontSize: 13, marginTop: 6 }}>{t.hook}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
