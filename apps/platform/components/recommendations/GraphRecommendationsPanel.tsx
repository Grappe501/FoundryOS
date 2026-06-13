'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { FoundryRecommendation } from '@foundry/recommendation-engine-v2';
import { ARTIFACTS_CHANGED_EVENT } from '../../lib/artifacts/client-store';
import { getEntityRecommendations } from '../../lib/recommendations/client';

const ACCENT = 'var(--foundry-primary)';

type Props = {
  worldSlug: string;
  entityType: string;
  slug: string;
  graphTitle: string;
  relatedBottleSlug?: string;
  relatedBottleName?: string;
};

export function GraphRecommendationsPanel({
  worldSlug,
  entityType,
  slug,
  graphTitle,
  relatedBottleSlug,
  relatedBottleName,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const { myRec, count } = useMemo(() => {
    if (!mounted) return { myRec: null as FoundryRecommendation | null, count: 0 };
    const mine = getEntityRecommendations(worldSlug, entityType, slug, { mineOnly: true });
    return { myRec: mine[0] ?? null, count: mine.length };
  }, [mounted, worldSlug, entityType, slug, tick]);

  if (!mounted) return null;

  const promptSlug = relatedBottleSlug ?? (entityType === 'bottle' ? slug : undefined);
  const promptName = relatedBottleName ?? graphTitle;

  return (
    <section
      style={{
        marginTop: 28,
        padding: 20,
        background: 'var(--foundry-surface)',
        borderRadius: 10,
        border: `1px solid ${ACCENT}33`,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Recommendations and next steps
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
        Your judgment signals — not algorithmic popularity.
      </p>

      <p style={{ color: 'var(--foundry-text)', fontSize: 13, marginTop: 14 }}>
        Your recommendations here: <strong>{count}</strong>
      </p>

      {myRec ? (
        <div style={{ marginTop: 16, padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Latest recommendation</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 6 }}>{myRec.title}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
            {myRec.recommendation_reason}
          </p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
            Next: {myRec.best_next_action}
          </p>
        </div>
      ) : (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 14 }}>
          No recommendation logged for this node yet.
        </p>
      )}

      {promptSlug && (
        <Link
          href={`/${worldSlug}/bottles/${promptSlug}`}
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '8px 14px',
            background: 'var(--foundry-primary-bg-subtle)',
            borderRadius: 6,
            color: ACCENT,
            fontSize: 12,
            textDecoration: 'none',
            border: '1px solid var(--foundry-primary-border-dim)',
          }}
        >
          Recommend {promptName} →
        </Link>
      )}
    </section>
  );
}
