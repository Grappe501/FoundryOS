import Link from 'next/link';
import { OperatorShell } from '../../../../components/operator/UniverseCommandCenter';
import { ACQUISITION_AVENUE_LABELS, listIncomingWorldsByRank, type AcquisitionAvenue } from '../../../../lib/incoming-worlds';
import { getUniverseSnapshot } from '../../../../lib/universe-registry';

export const dynamic = 'force-dynamic';

function formatAvenues(avenues: AcquisitionAvenue[]): string {
  return avenues.map((a) => ACQUISITION_AVENUE_LABELS[a]).join(' · ');
}

export default function OperatorIncomingWorldsPage() {
  const incoming = listIncomingWorldsByRank();
  const snap = getUniverseSnapshot();
  const roi = snap.highest_roi_world;

  return (
    <OperatorShell
      pass="PASS-034U"
      title="Incoming worlds"
      subtitle="Ranked pipeline with computed launch probability signals — not a manual build queue."
    >
      {roi && (
        <div style={{ marginTop: 24, padding: 20, background: '#1A1410', border: '1px solid #3A3020', borderRadius: 8 }}>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 11, margin: 0 }}>Highest ROI (computed)</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 17, marginTop: 8 }}>{roi.target}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{roi.reasons.join(' · ')}</p>
        </div>
      )}

      <div style={{ overflowX: 'auto', marginTop: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ color: 'var(--foundry-text-faint)', textAlign: 'left', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
              <th style={{ padding: 10 }}>#</th>
              <th style={{ padding: 10 }}>World</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Score</th>
              <th style={{ padding: 10 }}>Acquisition</th>
              <th style={{ padding: 10 }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {incoming.map((w) => (
              <tr key={w.slug} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                <td style={{ padding: 10, color: 'var(--foundry-text-faint)' }}>{w.rank}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text)' }}>{w.name}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-muted)' }}>{w.status}</td>
                <td style={{ padding: 10, color: 'var(--foundry-primary)' }}>{w.score}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-muted)' }}>{formatAvenues(w.acquisition_avenues)}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-faint)', fontSize: 11 }}>{w.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/operator/opportunities" style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 20, display: 'inline-block' }}>
        Legacy opportunities view →
      </Link>
    </OperatorShell>
  );
}
