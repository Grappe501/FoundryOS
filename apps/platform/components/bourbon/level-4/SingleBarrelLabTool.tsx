'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SINGLE_BARREL_LABS, getSingleBarrelLab } from '../../../lib/bourbon-level-4/single-barrel-lab';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { markLabViewed } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

const PRESET_BY_LAB: Record<string, string> = {
  'four-roses-ladder': 'single-barrel-four-roses',
};

type Props = { initialLabId?: string };

export function SingleBarrelLabTool({ initialLabId }: Props) {
  const [labId, setLabId] = useState(initialLabId ?? SINGLE_BARREL_LABS[0].id);
  const lab = getSingleBarrelLab(labId) ?? SINGLE_BARREL_LABS[0];
  const standard = getBottle(lab.standardSlug);
  const stepUp = getBottle(lab.stepUpSlug);
  const sb = getBottle(lab.singleBarrelSlug);

  useEffect(() => {
    markLabViewed(labId);
  }, [labId]);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Single barrel variance — standard, step-up, and SB on one campus.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SINGLE_BARREL_LABS.map((l) => (
          <button key={l.id} type="button" onClick={() => setLabId(l.id)} style={chip(labId === l.id)}>
            {l.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, textTransform: 'uppercase', margin: 0 }}>{lab.variable}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8 }}>{lab.title}</h2>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {[standard, stepUp, sb].filter(Boolean).map((b) => (
            <Link key={b!.slug} href={`/bourbon/bottles/${b!.slug}`} style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 8, textDecoration: 'none', color: 'var(--foundry-text)', fontSize: 13 }}>
              {b!.name} · ${b!.priceUsd} · {b!.proof} proof
            </Link>
          ))}
        </div>

        <ol style={{ marginTop: 16, paddingLeft: 20, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.7 }}>
          {lab.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>

        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16, fontStyle: 'italic' }}>{lab.whatToNotice}</p>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          {PRESET_BY_LAB[labId] && (
            <Link href={`/bourbon/compare-five-lab?preset=${PRESET_BY_LAB[labId]}`} style={{ color: ACCENT, fontSize: 12 }}>Compare Five preset →</Link>
          )}
          <Link href="/bourbon/academy/single-barrel-variance" style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Academy lesson →</Link>
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
