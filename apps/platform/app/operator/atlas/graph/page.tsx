import Link from 'next/link';
import { OperatorShell } from '../../../../components/operator/UniverseCommandCenter';
import { getAllGraphNodes, getUniverseSnapshot } from '../../../../lib/universe-registry';

export const dynamic = 'force-dynamic';

export default function OperatorAtlasGraphPage() {
  const snap = getUniverseSnapshot();
  const nodes = getAllGraphNodes().sort((a, b) => a.connections - b.connections);

  return (
    <OperatorShell
      pass="PASS-034U · Graph Command Center"
      title="What is connected?"
      subtitle="Graph density, weak nodes, and Burt's build queue. 040B will explode this view — 034U keeps you from going blind."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
        <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: '#C8A96E' }}>{snap.graph_density_avg}</div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Avg connections</div>
        </div>
        <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: '#C96B6B' }}>{snap.graph_weak_nodes.length}</div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Weak nodes (&lt;10)</div>
        </div>
        <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: '#6B9B6B' }}>{nodes.filter((n) => !n.weak).length}</div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Seeded nodes</div>
        </div>
      </div>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C96B6B' }}>Weak nodes — Burt queue</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 12 }}>
          <thead>
            <tr style={{ color: '#6B6B70', borderBottom: '1px solid #1A1A1E' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Node</th>
              <th style={{ padding: 10 }}>Connections</th>
              <th style={{ padding: 10 }}>Target</th>
            </tr>
          </thead>
          <tbody>
            {nodes
              .filter((n) => n.weak)
              .map((n) => (
                <tr key={n.id} style={{ borderBottom: '1px solid #1A1A1E' }}>
                  <td style={{ padding: 10, color: '#E8E8EC' }}>{n.label}</td>
                  <td style={{ padding: 10, color: '#C96B6B', textAlign: 'center' }}>{n.connections}</td>
                  <td style={{ padding: 10, color: '#8A8A8E', textAlign: 'center' }}>50+</td>
                </tr>
              ))}
          </tbody>
        </table>
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

      <Link href="/operator/atlas" style={{ color: '#C8A96E', fontSize: 13, marginTop: 24, display: 'inline-block' }}>
        Atlas health gate →
      </Link>
    </OperatorShell>
  );
}
