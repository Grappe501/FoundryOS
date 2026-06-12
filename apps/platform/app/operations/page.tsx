import Link from 'next/link';
import { getOperationsMetrics } from '../../lib/operations-metrics';

export default async function OperationsPage() {
  const ops = await getOperationsMetrics();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Operations</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        Platform cockpit — observability before scale (1,961 topics · 100k+ entities)
      </p>

      <div
        style={{
          marginTop: 24,
          padding: 14,
          background: '#0F0F12',
          border: `1px solid ${ops.db_connected ? '#2A3A2A' : '#3A2A2A'}`,
          borderRadius: 8,
          fontSize: 13,
        }}
      >
        Database: {ops.db_connected ? 'Connected' : ops.configured ? 'Unreachable' : 'Not configured'}
      </div>

      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {ops.metrics.map((m) => (
          <div
            key={m.key}
            style={{
              padding: '1rem',
              background: '#0F0F12',
              border: '1px solid #1E1E22',
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 11, color: '#6B6B70', textTransform: 'uppercase' }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--foundry-primary)', marginTop: 6 }}>{m.value}</div>
            <div style={{ fontSize: 10, color: m.status === 'live' ? '#6BC96B' : '#6B6B70', marginTop: 6 }}>
              {m.status}
            </div>
            {m.note && <div style={{ fontSize: 10, color: '#4A4A4E', marginTop: 4 }}>{m.note}</div>}
          </div>
        ))}
      </div>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        Target: full cockpit before PASS-014 (Bourbon launch). Reviews, rankings, AI costs, and deploy tracking wire in progressively.
      </p>
    </main>
  );
}
