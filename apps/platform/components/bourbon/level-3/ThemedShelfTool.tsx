'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SHELF_THEMES, THEME_GROUPS, getShelfTheme } from '../../../lib/bourbon-level-3/shelf-themes';
import { getShelfRoleLabel } from '../../../lib/bourbon-level-3/shelf-slots';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { markThemeViewed, saveThemedShelf } from '../../../lib/bourbon-level-3/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialThemeId?: string };

export function ThemedShelfTool({ initialThemeId }: Props) {
  const defaultId = initialThemeId ?? SHELF_THEMES[0].id;
  const [themeId, setThemeId] = useState(defaultId);
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const theme = getShelfTheme(themeId) ?? SHELF_THEMES[0];

  const visible = useMemo(() => {
    if (groupFilter === 'all') return SHELF_THEMES;
    return SHELF_THEMES.filter((t) => t.group === groupFilter);
  }, [groupFilter]);

  useEffect(() => {
    markThemeViewed(themeId);
    setSaved(false);
  }, [themeId]);

  const total = theme.bottles.reduce((s, b) => s + (getBottle(b.bottleSlug)?.priceUsd ?? 0), 0);

  function handleSave() {
    saveThemedShelf({ themeId, note, savedAt: new Date().toISOString() });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Twelve themed shelves — each bottle has a role. Curate 5–8 bottles around a defensible story, not label roulette.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(['all', ...THEME_GROUPS.map((g) => g.id)] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroupFilter(g)}
            style={chipStyle(groupFilter === g)}
          >
            {g === 'all' ? 'All' : THEME_GROUPS.find((x) => x.id === g)?.label.split('—')[0].trim()}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {visible.map((t) => (
          <button key={t.id} type="button" onClick={() => setThemeId(t.id)} style={chipStyle(themeId === t.id, true)}>
            {t.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>{theme.budgetBand}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8, marginBottom: 0 }}>{theme.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{theme.tagline}</p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Est. total ~${total}</p>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {theme.bottles.map(({ bottleSlug, role, rationale }) => {
            const b = getBottle(bottleSlug);
            if (!b) return null;
            return (
              <article key={bottleSlug} style={{ padding: '14px 16px', background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
                <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{getShelfRoleLabel(role)}</p>
                <Link href={`/bourbon/bottles/${b.slug}`} style={{ color: 'var(--foundry-text)', fontSize: 15, textDecoration: 'none', display: 'block', marginTop: 6 }}>
                  {b.name}
                </Link>
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>${b.priceUsd} · {b.proof} proof · {b.mashbill}</p>
                <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.55 }}>{rationale}</p>
              </article>
            );
          })}
        </div>

        <textarea
          value={note}
          onChange={(e) => { setNote(e.target.value); setSaved(false); }}
          placeholder="Your shelf note — why this theme for you?"
          rows={2}
          style={{ width: '100%', marginTop: 16, padding: 12, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)', resize: 'vertical' }}
        />

        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={handleSave} style={{ padding: '10px 18px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer' }}>
            Save themed shelf
          </button>
          <Link href={`/bourbon/shelf-gap?theme=${themeId}`} style={{ color: ACCENT, fontSize: 12 }}>Run gap analysis →</Link>
          <Link href={`/bourbon/academy/${theme.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
          {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved</span>}
        </div>
      </section>
    </div>
  );
}

function chipStyle(active: boolean, large = false) {
  return {
    padding: large ? '8px 14px' : '6px 12px',
    fontSize: large ? 12 : 11,
    borderRadius: 6,
    border: `1px solid ${active ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
    background: active ? 'var(--foundry-surface-raised)' : 'transparent',
    color: active ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)',
    cursor: 'pointer' as const,
  };
}
