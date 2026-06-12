import { OperatorShell, ScoreBar, StatGrid } from '../../../components/operator/UniverseCommandCenter';
import { getAllGraphNodes, getUniverseSnapshot, HEATMAP_LAYERS } from '../../../lib/universe-registry';

export const dynamic = 'force-dynamic';

export default function OperatorUniversePage() {
  const snap = getUniverseSnapshot();
  const graphNodes = getAllGraphNodes().sort((a, b) => b.connections - a.connections);

  return (
    <OperatorShell
      pass="PASS-034U · Universe Command Center"
      title="What exists in Foundry?"
      subtitle="Build Foundry so Steve can see Foundry. Not an admin dashboard — a CEO view of knowledge, connections, weakness, and what to build next. All counts from live registries — no fabricated profiles."
    >
      <section>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: '24px 0 0' }}>1 · What exists?</h2>
        <StatGrid
          items={[
            { label: 'Worlds live', value: snap.knowledge.worlds },
            { label: 'Atlas entries', value: snap.knowledge.atlas_entries, note: 'bourbon v1' },
            { label: 'Bottles', value: snap.knowledge.bottles },
            { label: 'Producers', value: snap.knowledge.producers },
            { label: 'Leader slots', value: snap.knowledge.leader_slots, note: 'empty until verified' },
            { label: 'Verified profiles', value: snap.knowledge.verified_profiles, note: 'must stay 0 until editorial' },
            { label: 'Places (refs)', value: snap.knowledge.places },
            { label: 'Organizations (refs)', value: snap.knowledge.organizations },
            { label: 'Debates (refs)', value: snap.knowledge.debates },
            { label: 'Mysteries (refs)', value: snap.knowledge.mysteries },
            { label: 'Collections', value: snap.knowledge.collections },
            { label: 'Artifacts', value: snap.knowledge.artifacts, note: '040A not built' },
            { label: 'Reviews', value: snap.knowledge.reviews, note: '040E not built' },
          ]}
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>2 · What is connected?</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          Graph density avg: {snap.graph_density_avg} connections/node · {snap.graph_weak_nodes.length} weak nodes
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 16 }}>
          <thead>
            <tr style={{ color: '#6B6B70', textAlign: 'left', borderBottom: '1px solid #1A1A1E' }}>
              <th style={{ padding: 10 }}>Node</th>
              <th style={{ padding: 10 }}>Type</th>
              <th style={{ padding: 10 }}>Connections</th>
              <th style={{ padding: 10 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {graphNodes.map((n) => (
              <tr key={n.id} style={{ borderBottom: '1px solid #1A1A1E' }}>
                <td style={{ padding: 10, color: '#E8E8EC' }}>{n.label}</td>
                <td style={{ padding: 10, color: '#8A8A8E' }}>{n.entity_type}</td>
                <td style={{ padding: 10, color: '#C8A96E' }}>{n.connections}</td>
                <td style={{ padding: 10, color: n.weak ? '#C96B6B' : '#6B9B6B' }}>{n.weak ? 'weak' : 'ok'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>3 · What is weak?</h2>
        <div style={{ display: 'grid', gap: 16, marginTop: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {snap.world_scores.map((w) => (
            <div key={w.slug} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: '#E8E8EC', fontSize: 15 }}>{w.displayName}</span>
                <span style={{ color: w.overallScore >= 85 ? '#6B9B6B' : w.overallScore >= 60 ? '#C8A96E' : '#C96B6B', fontSize: 18 }}>
                  {w.overallScore}
                </span>
              </div>
              {HEATMAP_LAYERS.filter((l) => w.layers[l] < 75)
                .slice(0, 4)
                .map((l) => (
                  <ScoreBar key={l} label={l} value={w.layers[l]} />
                ))}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>4 · What should be built next?</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Computed queue — not a manually maintained list</p>
        {snap.highest_roi_world && (
          <div style={{ marginTop: 16, padding: 20, background: '#1A1410', border: '1px solid #3A3020', borderRadius: 8 }}>
            <p style={{ color: '#C8A96E', fontSize: 11, margin: 0 }}>Highest ROI world</p>
            <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 8 }}>{snap.highest_roi_world.target}</p>
            <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
              {snap.highest_roi_world.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            {snap.highest_roi_world.estimated_hours != null && (
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
                Estimated build: ~{snap.highest_roi_world.estimated_hours} hours
              </p>
            )}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 20 }}>
          <thead>
            <tr style={{ color: '#6B6B70', textAlign: 'left', borderBottom: '1px solid #1A1A1E' }}>
              <th style={{ padding: 10 }}>#</th>
              <th style={{ padding: 10 }}>Target</th>
              <th style={{ padding: 10 }}>Type</th>
              <th style={{ padding: 10 }}>Score</th>
              <th style={{ padding: 10 }}>Reasons</th>
            </tr>
          </thead>
          <tbody>
            {snap.build_queue.slice(0, 12).map((item) => (
              <tr key={`${item.rank}-${item.target}`} style={{ borderBottom: '1px solid #1A1A1E' }}>
                <td style={{ padding: 10, color: '#6B6B70' }}>{item.rank}</td>
                <td style={{ padding: 10, color: '#E8E8EC' }}>{item.target}</td>
                <td style={{ padding: 10, color: '#8A8A8E' }}>{item.target_type}</td>
                <td style={{ padding: 10, color: '#C8A96E' }}>{item.score}</td>
                <td style={{ padding: 10, color: '#8A8A8E', fontSize: 11 }}>{item.reasons.join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#8E6BBD', margin: 0 }}>Knowledge gravity</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Which nodes pull people deeper — from graph edge counts</p>
        <ol style={{ marginTop: 16, paddingLeft: 20, color: '#E8E8EC', fontSize: 14, lineHeight: 2 }}>
          {snap.knowledge_gravity.map((n, i) => (
            <li key={n.slug}>
              <span style={{ color: '#6B6B70', marginRight: 8 }}>{i + 1}.</span>
              {n.title}
              <span style={{ color: '#C8A96E', marginLeft: 8 }}>{n.connections} edges</span>
            </li>
          ))}
        </ol>
      </section>
    </OperatorShell>
  );
}
