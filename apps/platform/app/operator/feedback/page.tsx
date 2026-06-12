import Link from 'next/link';
import { getTesterFeedbackStats, isSupabaseConfigured } from '@foundry/db';

export const dynamic = 'force-dynamic';

export default async function OperatorFeedbackPage() {
  const stats = isSupabaseConfigured() ? await getTesterFeedbackStats() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/analytics" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Analytics</Link>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Tester Feedback</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>
        What confused you · what you liked · what to build next — tied to world, mission, segment.
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        Testers submit at <Link href="/beta/feedback" style={{ color: 'var(--foundry-success)' }}>/beta/feedback</Link>
      </p>

      {!stats ? (
        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured.</p>
      ) : (
        <>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
            <Stat label="Total responses" value={stats.total} />
          </div>

          <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 13, color: 'var(--foundry-primary)', margin: 0 }}>By world</h2>
            {Object.entries(stats.by_world).map(([world, count]) => (
              <div key={world} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                <span>{world}</span>
                <span style={{ color: 'var(--foundry-text-muted)' }}>{count}</span>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 16, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 13, color: 'var(--foundry-success)', margin: 0 }}>By segment</h2>
            {Object.entries(stats.by_segment).map(([seg, count]) => (
              <div key={seg} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                <span>{seg.replace(/_/g, ' ')}</span>
                <span style={{ color: 'var(--foundry-text-muted)' }}>{count}</span>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 16, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', margin: 0 }}>Recent feedback</h2>
            {stats.recent.length === 0 ? (
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 12 }}>No feedback yet.</p>
            ) : (
              stats.recent.map((row) => (
                <article key={row.id} style={{ padding: '14px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                  <p style={{ color: 'var(--foundry-text-faint)', margin: 0, fontSize: 11 }}>
                    {row.world_slug ?? 'general'}
                    {row.mission_slug && ` · ${row.mission_slug}`}
                    {row.segment && ` · ${row.segment.replace(/_/g, ' ')}`}
                    {' · '}
                    {new Date(row.created_at).toLocaleDateString()}
                  </p>
                  {row.confused && <p style={{ color: 'var(--foundry-primary)', marginTop: 8 }}><strong>Confused:</strong> {row.confused}</p>}
                  {row.liked && <p style={{ color: 'var(--foundry-success)', marginTop: 6 }}><strong>Liked:</strong> {row.liked}</p>}
                  {row.build_next && <p style={{ color: 'var(--foundry-text)', marginTop: 6 }}><strong>Build next:</strong> {row.build_next}</p>}
                </article>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--foundry-primary)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 4 }}>{label}</div>
    </div>
  );
}
