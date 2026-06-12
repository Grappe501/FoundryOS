'use client';

import { useState, useEffect } from 'react';
import { BOURBON_BOTTLES } from '../../../lib/bourbon-level-1/bottles';
import { analyzeShelf } from '../../../lib/bourbon-level-1/agency/shelf-psychology';
import { getCollection } from '../../../lib/bourbon-level-1/storage';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function ShelfPsychologyTool() {
  const [selected, setSelected] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const owned = getCollection().filter((c) => ['owned', 'favorite', 'tasted'].includes(c.status)).map((c) => c.bottleSlug);
    if (owned.length > 0) setSelected([...new Set(owned)].slice(0, 8));
  }, []);

  function toggle(slug: string) {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const insight = mounted ? analyzeShelf(selected) : null;

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Not scientific. Fun. Shareable. Select bottles — Foundry reads your shelf psychology.
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        {mounted && getCollection().length > 0 ? 'Pre-loaded from your shelf — adjust as you like.' : 'Pick bottles manually or add to My Shelf first.'}
      </p>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {BOURBON_BOTTLES.map((b) => (
          <button key={b.slug} type="button" onClick={() => toggle(b.slug)} style={{ padding: '8px 12px', fontSize: 11, borderRadius: 6, border: `1px solid ${selected.includes(b.slug) ? ACCENT : 'var(--foundry-border)'}`, background: selected.includes(b.slug) ? 'var(--foundry-border-warm)' : 'transparent', color: selected.includes(b.slug) ? 'var(--foundry-text)' : 'var(--foundry-text-muted)', cursor: 'pointer' }}>
            {b.name}
          </button>
        ))}
      </div>

      {insight && selected.length > 0 && (
        <article style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}44` }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>What your shelf says about you</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 18, marginTop: 12, lineHeight: 1.5 }}>{insight.headline}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 16 }}>You appear to like:</p>
          <ul style={{ marginTop: 8, paddingLeft: 20, color: 'var(--foundry-text)', lineHeight: 1.8 }}>
            {insight.traits.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 20, fontStyle: 'italic' }}>Share: &ldquo;{insight.shareText}&rdquo;</p>
        </article>
      )}
      <RabbitHoleFooter seed="shelf-psych" />
    </div>
  );
}
