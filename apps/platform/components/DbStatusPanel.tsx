import type { DatabaseStatus } from '@foundry/db';

type Props = {
  status: DatabaseStatus;
};

export function DbStatusPanel({ status }: Props) {
  const connected = status.connected;
  const borderColor = connected ? '#2A3A2A' : '#3A2A2A';
  const accent = connected ? '#6BC96B' : '#C96B6B';

  return (
    <div
      style={{
        marginBottom: 24,
        padding: 16,
        background: '#0F0F12',
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        fontSize: 13,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ color: accent, fontWeight: 500 }}>
          Database: {connected ? 'Connected' : status.configured ? 'Unreachable' : 'Not Configured'}
        </span>
        {status.latency_ms !== null && (
          <span style={{ color: '#6B6B70' }}>{status.latency_ms}ms</span>
        )}
      </div>

      {!status.configured && (
        <p style={{ color: '#8A8A8E', margin: '12px 0 0' }}>
          Copy <code style={{ color: 'var(--foundry-primary)' }}>.env.example</code> to{' '}
          <code style={{ color: 'var(--foundry-primary)' }}>.env.local</code> — see docs/SUPABASE_SETUP.md
        </p>
      )}

      {status.error && (
        <p style={{ color: '#C96B6B', margin: '12px 0 0', fontSize: 12 }}>{status.error}</p>
      )}

      {connected && (
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, color: '#8A8A8E' }}>
          <div>Verticals: {status.tables.verticals ?? '—'}</div>
          <div>Topics: {status.tables.topics ?? '—'}</div>
          <div>Entities: {status.tables.entities ?? '—'}</div>
          <div>Ownership: {status.tables.user_entity_relationships ?? '—'}</div>
          <div>Buckets: {status.storage_buckets.length || '—'}</div>
        </div>
      )}
    </div>
  );
}
