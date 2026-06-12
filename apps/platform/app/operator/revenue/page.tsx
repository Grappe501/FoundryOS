import Link from 'next/link';
import { getRevenueValidationSnapshot, getDashboardConsistencyCheck, isSupabaseConfigured } from '@foundry/db';

export const dynamic = 'force-dynamic';

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
      <div style={{ fontSize: 24, fontWeight: 300, color: '#E8E8EC' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: '#4A4A4E', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Rate({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, background: '#0F0F12', borderRadius: 6 }}>
      <div style={{ fontSize: 18, color: 'var(--foundry-primary)' }}>{value}%</div>
      <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default async function OperatorRevenuePage() {
  const snapshot = isSupabaseConfigured() ? await getRevenueValidationSnapshot() : null;
  const consistency = isSupabaseConfigured() ? await getDashboardConsistencyCheck() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business dashboard</Link>
      <Link href="/operator/analytics" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Analytics</Link>
      <Link href="/operator/revenue/verify" style={{ color: '#6B9B6B', fontSize: 13, marginLeft: 16 }}>PASS-029A verify →</Link>

      <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>PASS-029</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Revenue Validation</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Can Foundry reliably convert interest into money? Instrument every step from pricing view to paid.
      </p>

      {!snapshot ? (
        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured.</p>
      ) : (
        <>
          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Pricing experiment funnel</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
              <Stat label="Pricing viewed" value={snapshot.funnel.pricing_viewed} sub={`${snapshot.funnel.unique_pricing_viewers} unique`} />
              <Stat label="Pricing clicked" value={snapshot.funnel.pricing_clicked} />
              <Stat label="Upgrade initiated" value={snapshot.funnel.upgrade_initiated} sub={`${snapshot.funnel.unique_upgrade_intent} unique`} />
              <Stat label="Upgrade completed" value={snapshot.funnel.upgrade_completed} />
              <Stat label="Checkout cancelled" value={snapshot.funnel.checkout_cancelled} />
              <Stat label="Paid events" value={snapshot.funnel.paid} />
            </div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              <Rate label="View → click" value={snapshot.funnel.view_to_click_rate} />
              <Rate label="Click → initiate" value={snapshot.funnel.click_to_initiate_rate} />
              <Rate label="Initiate → paid" value={snapshot.funnel.initiate_to_paid_rate} />
            </div>
          </section>

          {consistency && (
            <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8, border: `1px solid ${consistency.aligned ? '#2A4A2A' : '#4A4020'}` }}>
              <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Dashboard consistency</h2>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
                Matches /operator/business funnel · paid_users (subscriptions): {consistency.paid_users_subscriptions}
              </p>
              {consistency.notes.map((n) => (
                <p key={n} style={{ color: '#6B6B70', fontSize: 12, margin: '4px 0' }}>{n}</p>
              ))}
            </section>
          )}

          {snapshot.community_correlation.community_joiners > 0 && (
            <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
              <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Community → upgrade intent</h2>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
                {snapshot.community_correlation.joiners_with_upgrade_intent}/{snapshot.community_correlation.community_joiners} joiners ({snapshot.community_correlation.upgrade_intent_rate_pct}%)
              </p>
            </section>
          )}

          <section style={{ marginTop: 32, padding: 20, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>By tier</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontSize: 13 }}>
              <div>
                <p style={{ color: '#6B6B70', margin: 0 }}>Clicks</p>
                {Object.entries(snapshot.by_tier_click).map(([t, n]) => (
                  <p key={t} style={{ color: '#E8E8EC', margin: '4px 0' }}>{t}: {n}</p>
                ))}
              </div>
              <div>
                <p style={{ color: '#6B6B70', margin: 0 }}>Initiated</p>
                {Object.entries(snapshot.by_tier_initiated).map(([t, n]) => (
                  <p key={t} style={{ color: '#E8E8EC', margin: '4px 0' }}>{t}: {n}</p>
                ))}
              </div>
              <div>
                <p style={{ color: '#6B6B70', margin: 0 }}>Paid</p>
                {Object.entries(snapshot.by_tier_paid).map(([t, n]) => (
                  <p key={t} style={{ color: '#E8E8EC', margin: '4px 0' }}>{t}: {n}</p>
                ))}
              </div>
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Which world converts best?</h2>
            <div style={{ marginTop: 12 }}>
              {snapshot.by_world.map((w) => (
                <div key={w.world_slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                  <Link href={`/community/${w.world_slug}`} style={{ color: '#E8E8EC' }}>{w.world_slug}</Link>
                  <span style={{ color: '#8A8A8E' }}>
                    {w.mission_completions} missions · {w.pricing_clicks} clicks · {w.upgrade_initiated} initiated · {w.upgrade_completed} paid
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Which mission converts best?</h2>
            <div style={{ marginTop: 12 }}>
              {snapshot.by_mission.length === 0 ? (
                <p style={{ color: '#6B6B70', fontSize: 13 }}>No mission conversion data yet.</p>
              ) : (
                snapshot.by_mission.map((m) => (
                  <div key={`${m.world_slug}:${m.mission_slug}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                    <span style={{ color: '#E8E8EC' }}>{m.world_slug} / {m.mission_slug}</span>
                    <span style={{ color: '#8A8A8E' }}>{m.completions} done · {m.upgrade_initiated} initiated · {m.upgrade_completed} paid</span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Recent revenue events</h2>
            <div style={{ marginTop: 12, maxHeight: 320, overflow: 'auto' }}>
              {snapshot.recent_upgrade_events.map((e) => (
                <div key={e.id} style={{ fontSize: 12, padding: '6px 0', borderBottom: '1px solid #1A1A1E', color: '#8A8A8E' }}>
                  {e.event_type} · {e.path_slug ?? '—'} · {new Date(e.created_at).toLocaleString()}
                  {e.metadata?.tier != null && <span style={{ color: 'var(--foundry-primary)' }}> · {String(e.metadata.tier)}</span>}
                </div>
              ))}
            </div>
            <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 10 }}>{snapshot.event_count.toLocaleString()} events analyzed</p>
          </section>
        </>
      )}
    </main>
  );
}
