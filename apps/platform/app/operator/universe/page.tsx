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
      subtitle="Build Foundry so Steve can see Foundry. User artifacts are the north-star metric — evidence the ecosystem is alive."
    >
      <section
        style={{
          marginTop: 24,
          padding: 24,
          background: 'linear-gradient(135deg, #1A1410 0%, var(--foundry-surface) 100%)',
          border: '1px solid #3A3020',
          borderRadius: 10,
        }}
      >
        <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          North star · 040A
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 48, fontWeight: 300, color: 'var(--foundry-text)' }}>{snap.artifact_metrics.user_artifacts.toLocaleString()}</span>
          <div>
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: 0 }}>User artifacts</p>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{snap.artifact_metrics.north_star_label}</p>
          </div>
        </div>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16, lineHeight: 1.6 }}>
          Primitive ready: {snap.artifact_metrics.engine_ready ? 'yes' : 'no'} · {snap.artifact_metrics.artifact_types_defined} artifact types defined
          · Passport displays artifacts — without them, passport is an empty profile
        </p>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 10 }}>
          Eventually: Atlas 15k · Lessons 8k · Worlds 2k matter less than User Artifacts 4.3M
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: '32px 0 0' }}>1 · What exists?</h2>
        <StatGrid
          items={[
            { label: 'User artifacts', value: snap.artifact_metrics.user_artifacts, note: 'largest KPI' },
            { label: 'Artifact types', value: snap.artifact_metrics.artifact_types_defined, note: '040A primitive' },
            { label: 'Worlds live', value: snap.knowledge.worlds },
            { label: 'Atlas entries', value: snap.knowledge.atlas_entries, note: 'bourbon v1' },
            { label: 'Collections', value: snap.knowledge.collections },
            { label: 'Bottles', value: snap.knowledge.bottles },
            { label: 'Producers', value: snap.knowledge.producers },
            { label: 'Leader slots', value: snap.knowledge.leader_slots, note: 'empty until verified' },
            { label: 'Verified profiles', value: snap.knowledge.verified_profiles },
            { label: 'Debates (refs)', value: snap.knowledge.debates },
            { label: 'Mysteries (refs)', value: snap.knowledge.mysteries },
          ]}
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>2 · What is connected?</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
          Graph density avg: {snap.graph_density_avg} connections/node · {snap.graph_weak_nodes.length} weak nodes
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 16 }}>
          <thead>
            <tr style={{ color: 'var(--foundry-text-faint)', textAlign: 'left', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
              <th style={{ padding: 10 }}>Node</th>
              <th style={{ padding: 10 }}>Type</th>
              <th style={{ padding: 10 }}>Connections</th>
              <th style={{ padding: 10 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {graphNodes.map((n) => (
              <tr key={n.id} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                <td style={{ padding: 10, color: 'var(--foundry-text)' }}>{n.label}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-muted)' }}>{n.entity_type}</td>
                <td style={{ padding: 10, color: 'var(--foundry-primary)' }}>{n.connections}</td>
                <td style={{ padding: 10, color: n.weak ? '#C96B6B' : 'var(--foundry-success)' }}>{n.weak ? 'weak' : 'ok'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>3 · What is weak?</h2>
        <div style={{ display: 'grid', gap: 16, marginTop: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {snap.world_scores.map((w) => (
            <div key={w.slug} style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--foundry-text)', fontSize: 15 }}>{w.displayName}</span>
                <span style={{ color: w.overallScore >= 85 ? 'var(--foundry-success)' : w.overallScore >= 60 ? 'var(--foundry-primary)' : '#C96B6B', fontSize: 18 }}>
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
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Computed queue — not a manually maintained list</p>
        {snap.highest_roi_world && (
          <div style={{ marginTop: 16, padding: 20, background: '#1A1410', border: '1px solid #3A3020', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', fontSize: 11, margin: 0 }}>Highest ROI world</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 18, marginTop: 8 }}>{snap.highest_roi_world.target}</p>
            <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
              {snap.highest_roi_world.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            {snap.highest_roi_world.estimated_hours != null && (
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
                Estimated build: ~{snap.highest_roi_world.estimated_hours} hours
              </p>
            )}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 20 }}>
          <thead>
            <tr style={{ color: 'var(--foundry-text-faint)', textAlign: 'left', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
              <th style={{ padding: 10 }}>#</th>
              <th style={{ padding: 10 }}>Target</th>
              <th style={{ padding: 10 }}>Type</th>
              <th style={{ padding: 10 }}>Score</th>
              <th style={{ padding: 10 }}>Reasons</th>
            </tr>
          </thead>
          <tbody>
            {snap.build_queue.slice(0, 12).map((item) => (
              <tr key={`${item.rank}-${item.target}`} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                <td style={{ padding: 10, color: 'var(--foundry-text-faint)' }}>{item.rank}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text)' }}>{item.target}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-muted)' }}>{item.target_type}</td>
                <td style={{ padding: 10, color: 'var(--foundry-primary)' }}>{item.score}</td>
                <td style={{ padding: 10, color: 'var(--foundry-text-muted)', fontSize: 11 }}>{item.reasons.join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#8E6BBD', margin: 0 }}>Knowledge gravity</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Which nodes pull people deeper — from graph edge counts</p>
        <ol style={{ marginTop: 16, paddingLeft: 20, color: 'var(--foundry-text)', fontSize: 14, lineHeight: 2 }}>
          {snap.knowledge_gravity.map((n, i) => (
            <li key={n.slug}>
              <span style={{ color: 'var(--foundry-text-faint)', marginRight: 8 }}>{i + 1}.</span>
              {n.title}
              <span style={{ color: 'var(--foundry-primary)', marginLeft: 8 }}>{n.connections} edges</span>
            </li>
          ))}
        </ol>
      </section>
    </OperatorShell>
  );
}
