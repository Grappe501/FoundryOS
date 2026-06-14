'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRICE_TIERS, TIER_EXERCISES, classifyPriceTier, bottlesByTier } from '../../../lib/bourbon-level-3/price-tiers';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';

const ACCENT = 'var(--foundry-primary)';

export function PriceLadderTool() {
  const [activeTier, setActiveTier] = useState<string>('entry');
  const [exerciseId, setExerciseId] = useState(TIER_EXERCISES[0].id);
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const exercise = TIER_EXERCISES.find((e) => e.id === exerciseId) ?? TIER_EXERCISES[0];
  const tierBottles = bottlesByTier(activeTier as 'entry' | 'standard' | 'premium' | 'ultra');

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Four price tiers — what you pay for vs what you don&apos;t. Match bottles before splurge regret.
      </p>

      <div style={{ marginTop: 20, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {PRICE_TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTier(t.id)}
            style={{
              padding: 16,
              textAlign: 'left' as const,
              borderRadius: 8,
              border: `1px solid ${activeTier === t.id ? ACCENT : 'var(--foundry-border-subtle)'}`,
              background: activeTier === t.id ? 'var(--foundry-surface-raised)' : 'var(--foundry-surface)',
              cursor: 'pointer',
            }}
          >
            <p style={{ margin: 0, color: ACCENT, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.label}</p>
            <p style={{ margin: '6px 0 0', color: 'var(--foundry-text)', fontSize: 14 }}>{t.range}</p>
            <p style={{ margin: '8px 0 0', color: 'var(--foundry-text-muted)', fontSize: 12, lineHeight: 1.5 }}>Pay for: {t.payFor}</p>
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <h3 style={{ fontWeight: 400, fontSize: 15, margin: 0, color: 'var(--foundry-text)' }}>
          Catalog in {PRICE_TIERS.find((t) => t.id === activeTier)?.label} tier
        </h3>
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tierBottles.slice(0, 12).map((b) => (
            <Link key={b.slug} href={`/bourbon/bottles/${b.slug}`} style={{ padding: '6px 10px', fontSize: 12, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
              {b.name} · ${b.priceUsd}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Tier match exercise</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10 }}>{exercise.prompt}</p>

        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          {TIER_EXERCISES.map((e) => (
            <button key={e.id} type="button" onClick={() => { setExerciseId(e.id); setGuesses({}); setRevealed(false); }} style={{ padding: '6px 12px', fontSize: 11, borderRadius: 6, border: `1px solid ${exerciseId === e.id ? ACCENT : 'var(--foundry-border-subtle)'}`, background: 'transparent', color: exerciseId === e.id ? ACCENT : 'var(--foundry-text-faint)', cursor: 'pointer' }}>
              {e.id}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {exercise.bottleSlugs.map((slug, i) => {
            const b = getBottle(slug);
            if (!b) return null;
            return (
              <div key={slug} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', fontSize: 13 }}>
                <span style={{ minWidth: 160, color: 'var(--foundry-text)' }}>{b.name}</span>
                <span style={{ color: 'var(--foundry-text-faint)' }}>${b.priceUsd}</span>
                <select
                  value={guesses[slug] ?? ''}
                  onChange={(e) => setGuesses({ ...guesses, [slug]: e.target.value })}
                  style={{ padding: '6px 10px', fontSize: 12, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
                >
                  <option value="">Pick tier…</option>
                  {PRICE_TIERS.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                {revealed && (
                  <span style={{ color: guesses[slug] === exercise.answer[i] ? ACCENT : 'var(--foundry-text-faint)', fontSize: 12 }}>
                    → {exercise.answer[i]} {guesses[slug] === exercise.answer[i] ? '✓' : `(actual: ${classifyPriceTier(b)})`}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => setRevealed(true)} style={{ marginTop: 16, padding: '10px 18px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer' }}>
          Reveal answers
        </button>
      </section>
    </div>
  );
}
