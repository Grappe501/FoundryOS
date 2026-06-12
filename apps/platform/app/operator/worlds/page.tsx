import Link from 'next/link';
import { OperatorShell } from '../../../components/operator/UniverseCommandCenter';
import { ACTIVE_WORLD_SLUGS, getWorldDepth } from '../../../lib/world-depth/registry';
import { INCOMING_WORLDS } from '../../../lib/incoming-worlds';
import { getUniverseSnapshot } from '../../../lib/universe-registry';

export const dynamic = 'force-dynamic';

export default function OperatorWorldsPage() {
  const snap = getUniverseSnapshot();

  return (
    <OperatorShell
      pass="PASS-034U"
      title="World registry"
      subtitle="Live worlds and their layer scores — searchable universe tree."
    >
      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9' }}>Live worlds ({ACTIVE_WORLD_SLUGS.length})</h2>
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {snap.world_scores.map((w) => {
            const bundle = getWorldDepth(w.slug);
            return (
              <div key={w.slug} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#E8E8EC' }}>{w.displayName}</span>
                  <span style={{ color: 'var(--foundry-primary)' }}>{w.overallScore}</span>
                </div>
                {bundle?.displayName && (
                  <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>{w.slug}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Incoming ({INCOMING_WORLDS.length})</h2>
        <Link href="/operator/worlds/incoming" style={{ color: '#6B6B70', fontSize: 12 }}>Full ranked pipeline →</Link>
      </section>
    </OperatorShell>
  );
}
