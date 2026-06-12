'use client';

import { useEffect, useMemo, useState } from 'react';
import { aggregateEntityArtifacts } from '@foundry/artifact-engine';
import { ARTIFACTS_CHANGED_EVENT, getLocalUserId, listClientArtifacts } from '../../lib/artifacts/client-store';

const ACCENT = 'var(--foundry-primary)';

function StatLine({ label, count }: { label: string; count: number }) {
  if (count === 0) return null;
  return (
    <p style={{ color: '#8A8A8E', fontSize: 13, margin: '6px 0 0' }}>
      <span style={{ color: '#E8E8EC' }}>{count}</span> {label}
    </p>
  );
}

/** Knowledge + experience — artifact counts on atlas nodes */
export function ArtifactExperiencePanel({
  worldSlug,
  entityType,
  slug,
  entityName,
}: {
  worldSlug: string;
  entityType: string;
  slug: string;
  entityName: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setMounted(true);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const stats = useMemo(() => {
    if (!mounted) return null;
    const userId = getLocalUserId();
    const all = listClientArtifacts();
    const yours = aggregateEntityArtifacts(all, { world_slug: worldSlug, entity_type: entityType, slug }, {
      user_id: userId,
    });
    return { yours };
  }, [mounted, worldSlug, entityType, slug]);

  if (!mounted || !stats) return null;
  if (stats.yours.total === 0) return null;

  const hosted = stats.yours.by_type.event ?? 0;

  return (
    <section
      style={{
        marginTop: 24,
        padding: 20,
        background: '#0F1210',
        borderRadius: 10,
        border: `1px solid ${ACCENT}33`,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Knowledge + experience
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8 }}>{entityName}</p>
      <StatLine label="reviews" count={stats.yours.reviews} />
      <StatLine label="comparisons" count={stats.yours.comparisons} />
      <StatLine label="tasting notes" count={stats.yours.journals + stats.yours.notes} />
      <StatLine label="distillery visits" count={stats.yours.visits} />
      {hosted > 0 && <StatLine label="hosted tastings" count={hosted} />}
      {stats.yours.collection_entries > 0 && (
        <StatLine label="shelf entries" count={stats.yours.collection_entries} />
      )}
      <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12 }}>
        Community totals sync when artifacts persist to the graph (040D).
      </p>
    </section>
  );
}
