'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { STORE_PICK_LABS, getStorePickLab } from '../../../lib/bourbon-level-4/store-pick-lab';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { markLabViewed } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialLabId?: string };

export function StorePickLabTool({ initialLabId }: Props) {
  const [labId, setLabId] = useState(initialLabId ?? STORE_PICK_LABS[0].id);
  const lab = getStorePickLab(labId) ?? STORE_PICK_LABS[0];
  const standard = getBottle(lab.standardSlug);
  const pick = getBottle(lab.pickSlug);

  useEffect(() => {
    markLabViewed(labId);
  }, [labId]);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Store picks — markup test, worth-it rules, and when to walk away.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {STORE_PICK_LABS.map((l) => (
          <button key={l.id} type="button" onClick={() => setLabId(l.id)} style={chip(labId === l.id)}>
            {l.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', margin: 0 }}>{lab.title}</h2>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {standard && (
            <div style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 8, fontSize: 13 }}>
              <p style={{ margin: 0, color: ACCENT, fontSize: 11 }}>Standard</p>
              <Link href={`/bourbon/bottles/${standard.slug}`} style={{ color: 'var(--foundry-text)', textDecoration: 'none' }}>{standard.name}</Link>
            </div>
          )}
          {pick && (
            <div style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 8, fontSize: 13 }}>
              <p style={{ margin: 0, color: ACCENT, fontSize: 11 }}>Pick / step-up</p>
              <Link href={`/bourbon/bottles/${pick.slug}`} style={{ color: 'var(--foundry-text)', textDecoration: 'none' }}>{pick.name}</Link>
            </div>
          )}
        </div>

        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16 }}>{lab.markupTest}</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 13, marginTop: 12 }}><strong>Worth it if:</strong> {lab.worthItIf}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}><strong>Skip if:</strong> {lab.skipIf}</p>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <Link href="/bourbon/academy/store-picks-worth-it" style={{ color: ACCENT, fontSize: 12 }}>Academy lesson →</Link>
          <Link href="/bourbon/dsp-scavenger" style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>DSP scavenger →</Link>
        </div>
      </section>
    </div>
  );
}

function chip(active: boolean) {
  return {
    padding: '8px 12px',
    fontSize: 11,
    borderRadius: 6,
    border: `1px solid ${active ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
    background: active ? 'var(--foundry-surface-raised)' : 'transparent',
    color: active ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)',
    cursor: 'pointer' as const,
  };
}
