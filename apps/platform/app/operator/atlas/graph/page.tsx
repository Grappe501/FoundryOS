import Link from 'next/link';
import { OperatorShell, StatGrid } from '../../../../components/operator/UniverseCommandCenter';
import { getUniverseSnapshot } from '../../../../lib/universe-registry';
import {
  getBourbonGraphWeakQueue,
  computeGraphHealthStats,
} from '../../../../lib/bourbon-graph';

export const dynamic = 'force-dynamic';

const ISSUE_LABEL: Record<string, string> = {
  low_edges: '<10 edges',
  no_why_care: 'No why-care',
  no_atlas_term: 'No atlas term',
  no_collection: 'No collection path',
  unknown_confidence: '>50% unknown edges',
  shallow_teasers: 'Shallow edge copy',
};

export default function OperatorAtlasGraphPage() {
  const snap = getUniverseSnapshot();
  const weakQueue = getBourbonGraphWeakQueue();
  const stats = computeGraphHealthStats();

  return (
    <OperatorShell
      pass="PASS-040B2 · Graph Expansion"
      title="What is connected?"
      subtitle="Layer 1 = Explore. Inventory gave us rooms — 040B2 builds the hallways."
    >
      <StatGrid
        items={[
          { label: 'Graph nodes', value: stats.total_nodes },
          { label: 'Graph edges', value: stats.total_edges },
          { label: 'Avg edge count', value: stats.average_edge_count },
          { label: 'Inventory bottles', value: stats.bottle_count },
          { label: 'BiB exemplar edges', value: stats.bib_edge_count },
          { label: 'Weak queue', value: weakQueue.length },
          { label: 'Nodes <10 edges', value: stats.nodes_under_10_edges },
          { label: 'Missing why-care', value: stats.nodes_missing_why },
        ]}
      />

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>Graph health</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.9, marginTop: 12, paddingLeft: 20 }}>
          <li>Nodes under 3 edges: {stats.nodes_under_3_edges}</li>
          <li>Edges missing confidence: {stats.edges_missing_confidence}</li>
          <li>Verified edges missing source: {stats.verified_edges_missing_source}</li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C96B6B' }}>Weak-node queue — what should Burt build next?</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 12 }}>
          <thead>
            <tr style={{ color: 'var(--foundry-text-faint)', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Node</th>
              <th style={{ padding: 10 }}>Type</th>
              <th style={{ padding: 10 }}>Edges</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Issues</th>
              <th style={{ padding: 10 }}>Graph</th>
            </tr>
          </thead>
          <tbody>
            {weakQueue.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 16, color: 'var(--foundry-success)' }}>
                  No weak nodes — inventory hallways meet minimums.
                </td>
              </tr>
            ) : (
              weakQueue.map((n) => (
                <tr key={n.id} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                  <td style={{ padding: 10, color: 'var(--foundry-text)' }}>{n.label}</td>
                  <td style={{ padding: 10, color: 'var(--foundry-text-muted)', textAlign: 'center' }}>{n.entity_type}</td>
                  <td style={{ padding: 10, color: '#C96B6B', textAlign: 'center' }}>{n.connections}</td>
                  <td style={{ padding: 10, color: 'var(--foundry-text-muted)' }}>
                    {n.issues.map((i) => ISSUE_LABEL[i] ?? i).join(' · ')}
                  </td>
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <Link href={`/bourbon/graph/${n.slug}`} style={{ color: 'var(--foundry-primary)', fontSize: 12 }}>
                      view →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F1210', borderRadius: 8, border: '1px solid #2A3520' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>BiB weekend exemplar</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.8 }}>
          <Link href="/bourbon/graph/bottled-in-bond" style={{ color: 'var(--foundry-primary)' }}>
            bottled-in-bond
          </Link>{' '}
          — one Atlas term → full weekend (Act, proof, age, warehouses, value bottles, detective, debate, tasting mission).
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9' }}>Universe build queue</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.8, marginTop: 12 }}>
          {snap.build_queue.slice(0, 8).map((q) => (
            <li key={q.rank}>
              <strong style={{ color: 'var(--foundry-text)' }}>{q.target}</strong> — {q.reasons[0]}
            </li>
          ))}
        </ul>
      </section>

      <Link href="/operator/bourbon/inventory" style={{ color: 'var(--foundry-primary)', fontSize: 13, marginTop: 24, display: 'inline-block' }}>
        Intelligence inventory →
      </Link>
      <Link href="/operator/universe" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 24, marginLeft: 16, display: 'inline-block' }}>
        Universe command center →
      </Link>
    </OperatorShell>
  );
}
