import Link from 'next/link';
import {
  getBetaWaitlistStats,
  getMissionCompletionStats,
  getValidationDashboardMetrics,
  getRevenueValidationSnapshot,
  isSupabaseConfigured,
} from '@foundry/db';

export const dynamic = 'force-dynamic';

export default async function OperatorBetaDashboardPage() {
  const waitlist = isSupabaseConfigured() ? await getBetaWaitlistStats() : null;
  const missions = isSupabaseConfigured() ? await getMissionCompletionStats() : null;
  const funnel = isSupabaseConfigured() ? await getValidationDashboardMetrics() : null;
  const revenue = isSupabaseConfigured() ? await getRevenueValidationSnapshot() : null;

  const pricingViews = revenue?.funnel.pricing_viewed ?? 0;
  const pricingClicks = revenue?.funnel.pricing_clicked ?? 0;
  const betaJoins = funnel?.recent_events.filter((e) => e.event_type === 'beta_joined').length ?? 0;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Private Beta Dashboard</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>Waitlist · segments · world interest · signups · mission sync · pricing funnel</p>

      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
        <Stat label="Waitlist" value={waitlist?.total ?? '—'} />
        <Stat label="Beta joins (events)" value={betaJoins} />
        <Stat label="Mission syncs" value={missions?.total ?? '—'} />
        <Stat label="Pricing views" value={pricingViews} />
        <Stat label="Pricing clicks" value={pricingClicks} />
        <Stat label="Accounts (events)" value={funnel?.conversion.account_created ?? '—'} />
      </div>

      {waitlist && (
        <>
          <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Segments</h2>
            {Object.entries(waitlist.by_segment).map(([seg, count]) => (
              <div key={seg} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                <span>{seg.replace('_', ' ')}</span>
                <span style={{ color: 'var(--foundry-text-muted)' }}>{count}</span>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>World interest</h2>
            {Object.entries(waitlist.by_world)
              .sort((a, b) => b[1] - a[1])
              .map(([world, count]) => (
                <div key={world} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                  <span>{world}</span>
                  <span style={{ color: 'var(--foundry-text-muted)' }}>{count}</span>
                </div>
              ))}
          </section>

          <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-text-faint)', margin: 0 }}>Recent waitlist</h2>
            {waitlist.recent.slice(0, 15).map((row) => (
              <div key={row.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 12 }}>
                <span style={{ color: 'var(--foundry-text)' }}>{row.email}</span>
                <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>{row.segment}</span>
                <span style={{ color: 'var(--foundry-text-dim)', marginLeft: 8 }}>{(row.interested_worlds ?? []).join(', ')}</span>
              </div>
            ))}
          </section>
        </>
      )}

      <p style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <Link href="/operator/invites" style={{ color: 'var(--foundry-primary)' }}>Invite operations →</Link>
        {' · '}
        <Link href="/operator/analytics" style={{ color: '#6B9BC9' }}>Analytics</Link>
        {' · '}
        Consumer routes: <Link href="/beta" style={{ color: 'var(--foundry-text-faint)' }}>/beta</Link>
        {' · '}
        <Link href="/pricing" style={{ color: 'var(--foundry-text-faint)' }}>/pricing</Link>
        {' · '}
        <Link href="/sign-in" style={{ color: 'var(--foundry-text-faint)' }}>/sign-in</Link>
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: 16, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
      <div style={{ fontSize: 24, fontWeight: 300, color: 'var(--foundry-primary)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 4 }}>{label}</div>
    </div>
  );
}
