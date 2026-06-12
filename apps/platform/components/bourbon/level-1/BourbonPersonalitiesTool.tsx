'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BOURBON_PERSONALITIES, getPersonality, inferPersonality, bottlesForPersonality } from '../../../lib/bourbon-level-1/agency/personalities';
import { getCollection, getSavedPersonality, savePersonality } from '../../../lib/bourbon-level-1/storage';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function BourbonPersonalitiesTool() {
  const [activeId, setActiveId] = useState<string>('explorer');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getSavedPersonality();
    if (saved && getPersonality(saved)) {
      setActiveId(saved);
      return;
    }
    const slugs = getCollection().map((c) => c.bottleSlug);
    if (slugs.length > 0) {
      const inferred = inferPersonality(slugs);
      setActiveId(inferred.id);
    }
  }, []);

  const p = getPersonality(activeId)!;
  const recs = bottlesForPersonality(activeId);

  function select(id: string) {
    setActiveId(id);
    savePersonality(id);
  }

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        The Hunter. The Historian. The Host. Which bourbon personality are you building?
      </p>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {BOURBON_PERSONALITIES.map((pers) => (
          <button key={pers.id} type="button" onClick={() => select(pers.id)} style={{ padding: '10px 14px', fontSize: 12, borderRadius: 8, border: `1px solid ${activeId === pers.id ? ACCENT : '#2A2A2E'}`, background: activeId === pers.id ? '#2A2520' : 'transparent', color: activeId === pers.id ? '#E8E8EC' : '#8A8A8E', cursor: 'pointer' }}>
            {pers.name}
          </button>
        ))}
      </div>

      {mounted && (
        <article style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 12 }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{p.name}</p>
          <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 10 }}>{p.tagline}</p>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>Signals</p>
          <ul style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
            {p.signals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>People like you often enjoy</p>
          <p style={{ color: '#E8E8EC', fontSize: 14 }}>{p.youEnjoy.join(' · ')}</p>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recs.map((b) => (
              <Link key={b.slug} href={`/bourbon/bottles/${b.slug}`} style={{ padding: '8px 12px', fontSize: 12, borderRadius: 6, border: '1px solid #2A2A2E', color: ACCENT, textDecoration: 'none' }}>
                {b.name}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {p.nextMoves.map((m) => (
              <Link key={m.href} href={m.href} style={{ color: ACCENT, fontSize: 13 }}>{m.label} →</Link>
            ))}
          </div>
        </article>
      )}
      <RabbitHoleFooter seed={activeId} />
    </div>
  );
}
