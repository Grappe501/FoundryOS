'use client';

import Link from 'next/link';
import { leaderSlotsForWorld, type LeaderSlot } from '../../lib/entity-slots/leaders';

const ACCENT = '#C8A96E';

export function LeaderSlotsIndex() {
  const slots = leaderSlotsForWorld('bourbon');

  return (
    <>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
        Spaces for verified leaders, hosts, and reviewers — not fabricated biographies. Profiles appear here when
        community or editorial content passes the publish gate.
      </p>

      <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
        {slots.map((slot) => (
          <LeaderSlotCard key={slot.id} slot={slot} />
        ))}
      </div>

      <section style={{ marginTop: 36, padding: 20, background: '#111114', borderRadius: 10, border: '1px solid #1A1A1E' }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Reviews (040E)</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
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
    slot.status === 'verified' ? '#6B9B6B' : slot.status === 'editorial' ? '#6B9BC9' : slot.status === 'community' ? '#C8A96E' : '#6B6B70';

  return (
    <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{slot.label}</p>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>{slot.role.replace(/_/g, ' ')}</p>
        </div>
        <span style={{ color: statusColor, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{slot.status}</span>
      </div>
      {slot.linked_producer_slug && (
        <Link href={`/bourbon/producers/${slot.linked_producer_slug}`} style={{ color: '#6B9BC9', fontSize: 12, marginTop: 10, display: 'inline-block' }}>
          Producer atlas →
        </Link>
      )}
      {slot.status === 'empty' && (
        <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 10, fontStyle: 'italic' }}>
          Awaiting verified profile · {slot.graph_reference_count} graph references reserved
        </p>
      )}
    </div>
  );
}
