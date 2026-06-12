'use client';

import { operatorAssignmentWarning } from '../../lib/world-governance';
import type { UserSegment } from '../../lib/world-governance';
import { WORLD_AUDIENCE_REGISTRY } from '../../lib/world-governance';

type Props = {
  worldSlug: string;
  targetSegment: UserSegment;
  onConfirm?: () => void;
};

export function WorldAssignmentGuard({ worldSlug, targetSegment, onConfirm }: Props) {
  const warning = operatorAssignmentWarning(worldSlug, targetSegment);
  const record = WORLD_AUDIENCE_REGISTRY.find((w) => w.world_slug === worldSlug);

  if (!warning) {
    return (
      <p style={{ color: '#6B9B6B', fontSize: 13 }}>
        ✓ {record?.world_name ?? worldSlug} is allowed for {targetSegment} accounts.
      </p>
    );
  }

  return (
    <div style={{ padding: 16, background: '#1A160F', border: '1px solid #4A4020', borderRadius: 8 }}>
      <p style={{ color: '#C8A96E', fontSize: 14, margin: 0 }}>Assignment blocked</p>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{warning}</p>
      {record?.disclaimer_text && (
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{record.disclaimer_text}</p>
      )}
      {onConfirm && (
        <button type="button" disabled style={{ marginTop: 12, padding: '8px 14px', opacity: 0.5, cursor: 'not-allowed' }}>
          Cannot assign
        </button>
      )}
    </div>
  );
}
