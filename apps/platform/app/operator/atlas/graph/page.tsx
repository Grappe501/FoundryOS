import Link from 'next/link';
import { OperatorShell, StatGrid } from '../../../../components/operator/UniverseCommandCenter';
import { getUniverseSnapshot } from '../../../../lib/universe-registry';
import { getBourbonGraphWeakQueue, listAllBottleGraphs } from '../../../../lib/bourbon-graph';

export const dynamic = 'force-dynamic';

const ISSUE_LABEL: Record<string, string> = {
  low_edges: '<10 edges',
  no_why_care: 'No why-care',
  no_atlas_term: 'No atlas term',
  no_collection: 'No collection path',
  unknown_confidence: 'Unknown confidence fields',
};

export default function OperatorAtlasGraphPage() {
  const snap = getUniverseSnapshot();
  const weakQueue = getBourbonGraphWeakQueue();
  const bottleGraphs = listAllBottleGraphs();
  const avg =
    bottleGraphs.length > 0
      ? Math.round(bottleGraphs.reduce((s, g) => s + g.connection_count, 0) / bottleGraphs.length)
      : 0;

  return (
    <OperatorShell
      pass="PASS-040B2 · Graph Expansion"
      title="What is connected?"
      subtitle="Inventory edge → visible rabbit hole. Weak-node queue drives hallway seeding — not hand-written bottle pages."
    >
      <StatGrid
        items={[
          { label: 'Bottle graphs', value: bottleGraphs.length },
          { label: 'Avg bottle edges', value: avg },
          { label: 'Weak queue', value: weakQueue.length },
          { label: 'BiB edges', value: snap.graph_weak_nodes.find((n) => n.id.includes('bottled-in-bond'))?.connections ?? '20+' },
          { label: 'Target per bottle', value: '10+' },
          { label: 'BiB weekend target', value: '15+' },
        ]}
      />

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C96B6B' }}>Weak-node queue — Burt build order</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 12 }}>
          <thead>
            <tr style={{ color: '#6B6B70', borderBottom: '1px solid #1A1A1E' }}>
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
                <td colSpan={5} style={{ padding: 16, color: '#6B9B6B' }}>
                  No weak nodes in queue — all inventory bottles meet hallway minimums.
                </td>
              </tr>
            ) : (
              weakQueue.map((n) => (
                <tr key={n.id} style={{ borderBottom: '1px solid #1A1A1E' }}>
                  <td style={{ padding: 10, color: '#E8E8EC' }}>{n.label}</td>
                  <td style={{ padding: 10, color: '#8A8A8E', textAlign: 'center' }}>{n.entity_type}</td>
                  <td style={{ padding: 10, color: '#C96B6B', textAlign: 'center' }}>{n.connections}</td>
                  <td style={{ padding: 10, color: '#8A8A8E' }}>
                    {n.issues.map((i) => ISSUE_LABEL[i] ?? i).join(' · ')}
                  </td>
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <Link href={`/bourbon/graph/${n.slug}`} style={{ color: '#C8A96E', fontSize: 12 }}>
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
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>BiB weekend exemplar</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.8 }}>
          <Link href="/bourbon/graph/bottled-in-bond" style={{ color: '#C8A96E' }}>
            bottled-in-bond
          </Link>{' '}
          — one term → full weekend hallway (Act, Taylor, proof, age, warehouses, value path, detective, debate).
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9' }}>Build next (computed)</h2>
        <ul style={{ color: '#8A8A8E', fontSize: 13, lineHeight: 1.8, marginTop: 12 }}>
          {snap.build_queue.slice(0, 8).map((q) => (
            <li key={q.rank}>
              <strong style={{ color: '#E8E8EC' }}>{q.target}</strong> — {q.reasons[0]}
            </li>
          ))}
        </ul>
      </section>

      <Link href="/operator/bourbon/inventory" style={{ color: '#C8A96E', fontSize: 13, marginTop: 24, display: 'inline-block' }}>
        Intelligence inventory →
      </Link>
      <Link href="/operator/atlas" style={{ color: '#6B6B70', fontSize: 13, marginTop: 24, marginLeft: 16, display: 'inline-block' }}>
        Atlas health gate →
      </Link>
    </OperatorShell>
  );
}
