'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAS_AGE_LABS, getNasAgeLab } from '../../../lib/bourbon-level-4/nas-age-lab';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { markLabViewed } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialLabId?: string };

export function NasAgeLabTool({ initialLabId }: Props) {
  const [labId, setLabId] = useState(initialLabId ?? NAS_AGE_LABS[0].id);
  const lab = getNasAgeLab(labId) ?? NAS_AGE_LABS[0];
  const nas = getBottle(lab.nasSlug);
  const age = getBottle(lab.ageSlug);
  const anchor = getBottle(lab.anchorSlug);

  useEffect(() => {
    markLabViewed(labId);
  }, [labId]);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        NAS vs age-stated — angel's share economics and when numbers lie.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {NAS_AGE_LABS.map((l) => (
          <button key={l.id} type="button" onClick={() => setLabId(l.id)} style={chip(labId === l.id)}>
            {l.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, textTransform: 'uppercase', margin: 0 }}>{lab.variable}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8 }}>{lab.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10 }}>{lab.prompt}</p>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {[
            { label: 'NAS anchor', b: nas },
            { label: 'Age stated', b: age },
            { label: 'Compare anchor', b: anchor },
          ].map(({ label, b }) => b && (
            <div key={b.slug} style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 8, fontSize: 13 }}>
              <p style={{ margin: 0, color: ACCENT, fontSize: 11 }}>{label}</p>
              <Link href={`/bourbon/bottles/${b.slug}`} style={{ color: 'var(--foundry-text)', textDecoration: 'none' }}>{b.name}</Link>
              <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>{b.ageYears ? `${b.ageYears} yr` : 'NAS'} · {b.proof} proof</span>
            </div>
          ))}
        </div>

        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16 }}>{lab.angelsShareNote}</p>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <Link href="/bourbon/compare-five-lab?preset=nas-vs-age" style={{ color: ACCENT, fontSize: 12 }}>Compare Five →</Link>
          <Link href="/bourbon/academy/age-nas-angels-share" style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Academy →</Link>
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
