'use client';

import Link from 'next/link';
import { STORE_PICK_LESSONS, STORE_PICK_PROGRAMS } from '../../../lib/bourbon-level-1/agency/store-picks';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function StorePickAcademy() {
  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        The rabbit hole most enthusiasts fall into eventually. Store picks — what, why, when worth it.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {STORE_PICK_LESSONS.map((l) => (
          <article key={l.id} style={{ padding: 20, background: '#111114', borderRadius: 10 }}>
            <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{l.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.65 }}>{l.body}</p>
            {l.detectiveLink && (
              <Link href={l.detectiveLink} style={{ display: 'inline-block', marginTop: 12, color: ACCENT, fontSize: 13 }}>
                Open detective case →
              </Link>
            )}
          </article>
        ))}
      </div>
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Active pick programs</h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {STORE_PICK_PROGRAMS.map((p) => (
            <div key={p.producerSlug} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{p.name}</p>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>Typical proof: {p.typicalProof}</p>
              </div>
              <p style={{ color: '#8A8A8E', fontSize: 12, maxWidth: 280 }}>Ask: {p.whatToAsk}</p>
              <Link href={`/bourbon/producers/${p.producerSlug}`} style={{ color: ACCENT, fontSize: 12 }}>Producer atlas →</Link>
            </div>
          ))}
        </div>
      </section>
      <RabbitHoleFooter seed="store-picks" />
    </div>
  );
}
