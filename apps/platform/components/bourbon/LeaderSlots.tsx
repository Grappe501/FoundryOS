'use client';

import Link from 'next/link';
import { leaderSlotsForWorld, type LeaderSlot } from '../../lib/entity-slots/leaders';

const ACCENT = 'var(--foundry-primary)';

export function LeaderSlotsIndex() {
  const slots = leaderSlotsForWorld('bourbon');

  return (
    <>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
        Spaces for verified leaders, hosts, and reviewers — not fabricated biographies. Profiles appear here when
        community or editorial content passes the publish gate.
      </p>

      <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
        {slots.map((slot) => (
          <LeaderSlotCard key={slot.id} slot={slot} />
        ))}
      </div>

      <section style={{ marginTop: 36, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)' }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Reviews (040E)</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Review slots open when the Review Engine ships. Your tasting notes and recommendations will connect into the
          knowledge graph — not marketing copy.
        </p>
        <Link href="/bourbon/experiences/tasting-journal" style={{ color: '#6B9BC9', fontSize: 13, marginTop: 12, display: 'inline-block' }}>
          Tasting journal (artifact stub) →
        </Link>
      </section>
    </>
  );
}

function LeaderSlotCard({ slot }: { slot: LeaderSlot }) {
  const statusColor =
    slot.status === 'verified' ? 'var(--foundry-success)' : slot.status === 'editorial' ? '#6B9BC9' : slot.status === 'community' ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)';

  return (
    <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{slot.label}</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{slot.role.replace(/_/g, ' ')}</p>
        </div>
        <span style={{ color: statusColor, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{slot.status}</span>
      </div>
      {slot.linked_producer_slug && (
        <Link href={`/bourbon/producers/${slot.linked_producer_slug}`} style={{ color: '#6B9BC9', fontSize: 12, marginTop: 10, display: 'inline-block' }}>
          Producer atlas →
        </Link>
      )}
      {slot.status === 'empty' && (
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 10, fontStyle: 'italic' }}>
          Awaiting verified profile · {slot.graph_reference_count} graph references reserved
        </p>
      )}
    </div>
  );
}
