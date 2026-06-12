import { OperatorShell, StatGrid } from '../../../components/operator/UniverseCommandCenter';
import { getUniverseSnapshot } from '../../../lib/universe-registry';
import { listAtlasEntries } from '../../../lib/bourbon-atlas/registry';

export const dynamic = 'force-dynamic';

export default function OperatorAtlasHealthPage() {
  const snap = getUniverseSnapshot();
  const h = snap.atlas_health_summary;

  return (
    <OperatorShell
      pass="PASS-034U · Atlas Health"
      title="Atlas quality gate"
      subtitle="Not the graph — Atlas entry health. Every node should answer the six-question model before scale."
    >
      <StatGrid
        items={[
          { label: 'Entries', value: h.entries },
          { label: 'Avg connections', value: h.avg_connections },
          { label: 'Missing why care', value: h.missing_why_care },
          { label: 'Missing geography', value: h.missing_geography },
          { label: 'Missing debate', value: h.missing_debate },
          { label: 'Missing mystery', value: h.missing_mystery },
          { label: 'Missing collection', value: h.missing_collection },
          { label: 'Missing artifact', value: h.missing_artifact },
        ]}
      />

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Six-question model (040B)</h2>
        <ol style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 2, marginTop: 12, paddingLeft: 20 }}>
          <li>Why should I care?</li>
          <li>What should I do next?</li>
          <li>What else is connected?</li>
          <li>Who matters here? (leader slots — not fabricated bios)</li>
          <li>Where did this happen?</li>
          <li>Why do people disagree?</li>
        </ol>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9' }}>Knowledge gravity (top rabbit holes)</h2>
        <ol style={{ marginTop: 12, paddingLeft: 20, color: 'var(--foundry-text)', fontSize: 14, lineHeight: 2 }}>
          {snap.knowledge_gravity.map((n, i) => (
            <li key={n.slug}>
              {i + 1}. {n.title} — {n.connections} edges
            </li>
          ))}
        </ol>
      </section>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 24 }}>
        Source: {listAtlasEntries().length} bourbon atlas entries · cross-world atlases stubbed until factory scales
      </p>
    </OperatorShell>
  );
}
