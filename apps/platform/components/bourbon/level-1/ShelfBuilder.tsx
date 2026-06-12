'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildShelf, type ShelfTier } from '../../../lib/bourbon-level-1/shelf-builder';
import { saveShelfBuilt } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function ShelfBuilder() {
  const [budget, setBudget] = useState<100 | 200 | 300>(200);
  const [tier, setTier] = useState<ShelfTier>('starter');
  const [built, setBuilt] = useState<ReturnType<typeof buildShelf> | null>(null);

  function build() {
    const shelf = buildShelf(budget, tier);
    setBuilt(shelf);
    saveShelfBuilt(shelf.map((s) => ({ bottleSlug: s.bottle.slug, tier, at: new Date().toISOString() })));
  }

  const total = built?.reduce((s, r) => s + r.bottle.priceUsd, 0) ?? 0;

  return (
    <div>
      <Question label="Total shelf budget">
        {([100, 200, 300] as const).map((b) => (
          <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>${b}</Chip>
        ))}
      </Question>
      <Question label="Shelf type">
        <Chip active={tier === 'starter'} onClick={() => setTier('starter')}>Starter shelf</Chip>
        <Chip active={tier === 'advanced'} onClick={() => setTier('advanced')}>Advanced shelf</Chip>
        <Chip active={tier === 'collector'} onClick={() => setTier('collector')}>Collector shelf</Chip>
      </Question>
      <button type="button" onClick={build} style={{ marginTop: 20, padding: '12px 22px', background: 'var(--foundry-primary-border-dim)', border: 'none', borderRadius: 8, color: 'var(--foundry-text)', cursor: 'pointer' }}>
        Build my shelf →
      </button>

      {built && (
        <section style={{ marginTop: 28 }}>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>Estimated total ~${total} (budget ${budget})</p>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {built.map(({ bottle, slot, why }) => (
              <article key={bottle.slug + slot} style={{ padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
                <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{slot}</p>
                <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 6 }}>{bottle.name}</p>
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>${bottle.priceUsd} · {bottle.proof} proof</p>
                <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{why}</p>
              </article>
            ))}
          </div>
          <Link href="/bourbon/portfolio" style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
            Track what you own →
          </Link>
        </section>
      )}
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginBottom: 10 }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{ padding: '8px 16px', borderRadius: 999, border: `1px solid ${active ? ACCENT : 'var(--foundry-border)'}`, background: active ? 'var(--foundry-primary-border-dim)' : 'transparent', color: active ? 'var(--foundry-text)' : 'var(--foundry-text-muted)', fontSize: 13, cursor: 'pointer' }}>
      {children}
    </button>
  );
}
