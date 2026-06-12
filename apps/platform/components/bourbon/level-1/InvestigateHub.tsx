'use client';

import Link from 'next/link';

const ACCENT = '#C8A96E';

const INTELLIGENCE_TOOLS = [
  { href: '/bourbon/watchtower', icon: '📡', title: 'Watchtower', hook: 'What people are talking about — signals not ratings' },
  { href: '/bourbon/rabbit-hole', icon: '🕳', title: 'Rabbit Hole of the Day', hook: 'One weird thing — five minutes — return tomorrow' },
  { href: '/bourbon/hunt', icon: '🎯', title: "This Month's Hunt", hook: 'Check off missions — participate, not consume' },
  { href: '/bourbon/shelf-intelligence', icon: '🧠', title: 'Shelf Intelligence', hook: 'Gaps, next bottle, blind spots — shelf talks back' },
  { href: '/bourbon/chains', icon: '⛓', title: 'Progression Chains', hook: 'WT101 → Rare Breed → Russell\'s — purpose ladders' },
];

const AGENCY_TOOLS = [
  { href: '/bourbon/detective', icon: '🔍', title: 'Bourbon Detective', hook: 'Investigate — Eagle Rare pricing, Weller ghosts, DSP truth' },
  { href: '/bourbon/x-ray', icon: '📡', title: 'Bottle X-Ray', hook: 'Analyst breakdown — mashbill, proof, warehouse, flavor sources' },
  { href: '/bourbon/compare', icon: '⚖', title: 'Compare 5 Bottles', hook: 'Bookmark tool — price, proof, value, best use' },
  { href: '/bourbon/shelf-psychology', icon: '🪞', title: 'Shelf Psychology', hook: 'What your shelf says about you — fun, shareable' },
  { href: '/bourbon/personalities', icon: '🎭', title: 'Bourbon Personalities', hook: 'Hunter, Historian, Host — people like you enjoy…' },
  { href: '/bourbon/store-picks', icon: '🏪', title: 'Store Pick Academy', hook: 'Whole track — what picks are, when worth it' },
  { href: '/bourbon/economy', icon: '💰', title: 'Bourbon Economy', hook: 'Allocation, MSRP, secondary — why it costs what it costs' },
  { href: '/bourbon/campus', icon: '🗺', title: 'Distillery Campus Maps', hook: 'Click rickhouse, still, bottling — why it matters' },
  { href: '/bourbon/flavor-wheel', icon: '🎡', title: 'Flavor Wheel Builder', hook: 'Build profile — saves into Bourbon DNA' },
  { href: '/bourbon/league', icon: '🏆', title: 'Blind Tasting League', hook: 'Monthly challenges — return every month' },
  { href: '/bourbon/trail-planner', icon: '🛣', title: 'Trail Planner', hook: 'Trip builder — days, budget, traveler type' },
  { href: '/bourbon/bottles', icon: '🥃', title: 'Bottle Progression', hook: 'What it teaches, who it is for, what comes next' },
];

export function InvestigateHub() {
  return (
    <div>
      <header>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Agency layer
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
          Stop consuming. Start investigating.
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
          Discover, collect, predict, track, hunt — living intelligence for obsessed lurkers.
        </p>
      </header>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Living intelligence
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {INTELLIGENCE_TOOLS.map((t) => (
            <Link key={t.href} href={t.href} style={{ display: 'block', padding: 18, background: '#141418', borderRadius: 10, border: `1px solid ${ACCENT}33`, textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: '10px 0 0' }}>{t.title}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{t.hook}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Investigate
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {AGENCY_TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
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
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <p style={{ color: '#E8E8EC', fontSize: 15, margin: '10px 0 0' }}>{t.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{t.hook}</p>
          </Link>
        ))}
        </div>
      </section>
    </div>
  );
}
