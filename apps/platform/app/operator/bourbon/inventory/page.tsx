import { OperatorShell, StatGrid } from '../../../../components/operator/UniverseCommandCenter';
import {
  getBourbonIntelligenceInventory,
  inventoryStats,
  validateBourbonIntelligence,
  LEGAL_STANDARDS,
} from '../../../../lib/bourbon-intelligence';
import type { InventoryRelationship } from '@foundry/bourbon-intelligence';

export const dynamic = 'force-dynamic';

export default function OperatorBourbonInventoryPage() {
  const inv = getBourbonIntelligenceInventory();
  const stats = inventoryStats();
  const validation = validateBourbonIntelligence();

  return (
    <OperatorShell
      pass="PASS-040B1 · Bourbon Intelligence Inventory"
      title="Bourbon intelligence registry"
      subtitle="Schema-first, source-attributed inventory — not hand-written bottle pages. Unknown fields stay unknown."
    >
      <StatGrid
        items={[
          { label: 'Producers', value: stats.producers },
          { label: 'Bottles', value: stats.bottles },
          { label: 'People (publishable)', value: `${stats.people_publishable}/${stats.people}` },
          { label: 'Mash bills', value: stats.mash_bills },
          { label: 'Terroir records', value: stats.terroir_records },
          { label: 'Graph edges', value: stats.relationships },
          { label: 'Verified leader slots', value: stats.leader_slots_verified },
          { label: 'Unknown mash % fields', value: stats.unknown_mash_pct_fields },
        ]}
      />

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Legal spine (27 CFR Part 5)</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.9, marginTop: 12, paddingLeft: 20 }}>
          {LEGAL_STANDARDS.map((s) => (
            <li key={s.slug}>
              <span style={{ color: 'var(--foundry-text)' }}>{s.title}</span>
              {' — '}
              {s.requirements[0]?.value.toString().slice(0, 120)}…
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F1210', borderRadius: 8, border: '1px solid #2A3520' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Inventory chain model</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.8 }}>
          Bottle → Producer → Master Distiller → Mash Bill → Grain/Terroir → Barrel → Flavor family → Comparables →
          Artifacts (040A) → Reviews (040E)
        </p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
          Confidence labels: verified · producer_disclosed · commonly_reported · editorial · unknown
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9' }}>Sample graph: Wild Turkey 101</h2>
        <ul style={{ marginTop: 12, paddingLeft: 20, color: 'var(--foundry-text)', fontSize: 13, lineHeight: 1.9 }}>
          {inv.relationships
            .filter((e: InventoryRelationship) => e.from.slug === 'wild-turkey-101' || e.to.slug === 'wild-turkey-101')
            .slice(0, 12)
            .map((e: InventoryRelationship) => (
              <li key={e.id}>
                {e.from.entity_type}:{e.from.slug} → {e.relation} → {e.to.entity_type}:{e.to.slug}
                <span style={{ color: 'var(--foundry-text-faint)' }}> ({e.confidence})</span>
              </li>
            ))}
        </ul>
      </section>

      {!validation.ok && (
        <section style={{ marginTop: 24, padding: 16, background: '#2A1515', borderRadius: 8 }}>
          <p style={{ color: '#E88', fontSize: 13, margin: 0 }}>Validation errors: {validation.errors.join(' · ')}</p>
        </section>
      )}

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 24 }}>
        Package: @foundry/bourbon-intelligence v{inv.version} · Pages generate from registry — do not bulk-author copy
      </p>
    </OperatorShell>
  );
}
