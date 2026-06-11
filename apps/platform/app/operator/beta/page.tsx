import Link from 'next/link';
import {
  getBetaWaitlistStats,
  getMissionCompletionStats,
  getValidationDashboardMetrics,
  isSupabaseConfigured,
} from '@foundry/db';

export const dynamic = 'force-dynamic';

export default async function OperatorBetaDashboardPage() {
  const waitlist = isSupabaseConfigured() ? await getBetaWaitlistStats() : null;
  const missions = isSupabaseConfigured() ? await getMissionCompletionStats() : null;
  const funnel = isSupabaseConfigured() ? await getValidationDashboardMetrics() : null;

  const pricingViews = funnel?.recent_events.filter((e) => e.event_type === 'pricing_viewed').length ?? 0;
  const pricingClicks = funnel?.recent_events.filter((e) => e.event_type === 'pricing_clicked').length ?? 0;
  const betaJoins = funnel?.recent_events.filter((e) => e.event_type === 'beta_joined').length ?? 0;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Private Beta Dashboard</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>Waitlist · segments · world interest · signups · mission sync · pricing funnel</p>

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
          <section style={{ marginTop: 32, padding: 24, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Segments</h2>
            {Object.entries(waitlist.by_segment).map(([seg, count]) => (
              <div key={seg} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                <span>{seg.replace('_', ' ')}</span>
                <span style={{ color: '#8A8A8E' }}>{count}</span>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 16, padding: 24, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>World interest</h2>
            {Object.entries(waitlist.by_world)
              .sort((a, b) => b[1] - a[1])
              .map(([world, count]) => (
                <div key={world} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                  <span>{world}</span>
                  <span style={{ color: '#8A8A8E' }}>{count}</span>
                </div>
              ))}
          </section>

          <section style={{ marginTop: 16, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Recent waitlist</h2>
            {waitlist.recent.slice(0, 15).map((row) => (
              <div key={row.id} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
                <span style={{ color: '#E8E8EC' }}>{row.email}</span>
                <span style={{ color: '#6B6B70', marginLeft: 8 }}>{row.segment}</span>
                <span style={{ color: '#4A4A4E', marginLeft: 8 }}>{(row.interested_worlds ?? []).join(', ')}</span>
              </div>
            ))}
          </section>
        </>
      )}

      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        Consumer routes: <Link href="/beta" style={{ color: '#6B6B70' }}>/beta</Link>
        {' · '}
        <Link href="/pricing" style={{ color: '#6B6B70' }}>/pricing</Link>
        {' · '}
        <Link href="/sign-in" style={{ color: '#6B6B70' }}>/sign-in</Link>
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
      <div style={{ fontSize: 24, fontWeight: 300, color: '#C8A96E' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{label}</div>
    </div>
  );
}
