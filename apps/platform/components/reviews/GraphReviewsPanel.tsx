'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { FoundryReview } from '@foundry/review-engine';
import { ARTIFACTS_CHANGED_EVENT } from '../../lib/artifacts/client-store';
import { getEntityReviews } from '../../lib/reviews/client';

const ACCENT = 'var(--foundry-primary)';

type Props = {
  worldSlug: string;
  entityType: string;
  slug: string;
  graphTitle: string;
  relatedBottleSlug?: string;
  relatedBottleName?: string;
};

export function GraphReviewsPanel({
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

  const { myReview, reviewCount } = useMemo(() => {
    if (!mounted) return { myReview: null as FoundryReview | null, reviewCount: 0 };
    const mine = getEntityReviews(worldSlug, entityType, slug, { mineOnly: true });
    return { myReview: mine[0] ?? null, reviewCount: mine.length };
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
        Reviews and field notes
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
        Your graph signals — not aggregated hype.
      </p>

      <div style={{ marginTop: 14, display: 'flex', gap: 16, fontSize: 13 }}>
        <span style={{ color: 'var(--foundry-text)' }}>
          Your reviews here: <strong>{reviewCount}</strong>
        </span>
      </div>

      {myReview ? (
        <div style={{ marginTop: 16, padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Latest field note</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 6 }}>{myReview.title}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
            {myReview.what_surprised_me}
          </p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
            Next: {myReview.what_to_try_next}
          </p>
        </div>
      ) : (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 14 }}>
          No review logged for this node yet.
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
          Review {promptName} →
        </Link>
      )}
    </section>
  );
}
