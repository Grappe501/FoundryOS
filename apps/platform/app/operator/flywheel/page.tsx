import Link from 'next/link';
import { getGrowthFlywheelSnapshot, isSupabaseConfigured } from '@foundry/db';
import { FLYWHEEL_FACTORIES } from '../../../lib/growth-flywheel-ui';

export const dynamic = 'force-dynamic';

function InsightCard({
  title,
  insight,
}: {
  title: string;
  insight: { label: string; multiplier: number; sample_size: number; world_slug?: string } | null;
}) {
  if (!insight) {
    return (
      <div style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--foundry-text-dim)', marginTop: 6 }}>Awaiting PASS-030 signal</div>
      </div>
    );
  }
  return (
    <div style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: insight.multiplier >= 1.5 ? '1px solid var(--foundry-primary-border-dim)' : '1px solid var(--foundry-border-subtle)' }}>
      <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)' }}>{title}</div>
      <div style={{ fontSize: 15, color: 'var(--foundry-text)', marginTop: 6 }}>{insight.label}</div>
      <div style={{ fontSize: 13, color: 'var(--foundry-primary)', marginTop: 6 }}>
        {insight.multiplier}x vs average · n={insight.sample_size}
      </div>
      {insight.world_slug && (
        <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 4 }}>{insight.world_slug}</div>
      )}
    </div>
  );
}

export default async function OperatorFlywheelPage() {
  const flywheel = isSupabaseConfigured() ? await getGrowthFlywheelSnapshot() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1080, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/marketing" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Marketing</Link>
      <Link href="/operator/opportunities" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Opportunities</Link>
      <Link href="/operator/learning" style={{ color: 'var(--foundry-success)', fontSize: 13, marginLeft: 16 }}>Learning Lane</Link>

      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>PASS-033</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Growth Flywheel</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Systems that compound — not more passes. Every user interaction improves marketing, product, community, and revenue.
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8, fontFamily: 'monospace' }}>
        {flywheel ? 'traffic → users → missions → community → revenue → insights → better marketing' : FLYWHEEL_FACTORIES.join(' · ')}
      </p>

      <section style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {FLYWHEEL_FACTORIES.map((f) => (
          <div key={f} style={{ padding: 12, background: 'var(--foundry-surface)', borderRadius: 8, fontSize: 12, color: 'var(--foundry-text-muted)' }}>
            {f}
          </div>
        ))}
      </section>

      {!flywheel ? (
        <p style={{ marginTop: 32, color: '#C96B6B' }}>Supabase not configured — flywheel needs live events.</p>
      ) : (
        <>
          {/* System 1 */}
          <section style={{ marginTop: 32, padding: 24, background: '#0F1210', border: '1px solid #2A3A2A', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>System 1 — Insight → Marketing</h2>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Learning lane signals auto-surface on /operator/marketing</p>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
              <InsightCard title="Best mission" insight={flywheel.insight_to_marketing.best_mission} />
              <InsightCard title="Best world" insight={flywheel.insight_to_marketing.best_world} />
              <InsightCard title="Best segment" insight={flywheel.insight_to_marketing.best_segment} />
              <InsightCard title="Best channel / lead magnet" insight={flywheel.insight_to_marketing.best_lead_magnet} />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 13, color: 'var(--foundry-primary)', margin: 0 }}>Recommended marketing assets</h3>
              {flywheel.insight_to_marketing.recommendations.map((r) => (
                <div key={r.priority} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                  <span style={{ color: 'var(--foundry-primary)' }}>#{r.priority}</span>
                  <span style={{ color: 'var(--foundry-text)', marginLeft: 8 }}>{r.title}</span>
                  <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>({r.asset_type})</span>
                  <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, margin: '4px 0 0' }}>{r.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* System 2 */}
          <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>System 2 — Marketing → World</h2>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Source attribution tied to missions and community — not vanity traffic</p>
            <div style={{ marginTop: 16, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ color: 'var(--foundry-text-faint)', textAlign: 'left', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                    <th style={{ padding: 8 }}>Source</th>
                    <th style={{ padding: 8 }}>Visitors</th>
                    <th style={{ padding: 8 }}>Missions</th>
                    <th style={{ padding: 8 }}>Community</th>
                    <th style={{ padding: 8 }}>Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {flywheel.marketing_to_world.by_source.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: 12, color: 'var(--foundry-text-dim)' }}>No source attribution yet</td></tr>
                  ) : (
                    flywheel.marketing_to_world.by_source.map((s) => (
                      <tr key={s.source} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                        <td style={{ padding: 8, color: 'var(--foundry-text)' }}>{s.source}</td>
                        <td style={{ padding: 8 }}>{s.visitors}</td>
                        <td style={{ padding: 8 }}>{s.mission_starts}</td>
                        <td style={{ padding: 8 }}>{s.community_joins}</td>
                        <td style={{ padding: 8, color: 'var(--foundry-primary)' }}>{s.upgrade_completed}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* System 3 */}
          <section style={{ marginTop: 28, padding: 24, background: '#12100F', border: '1px solid #3A3020', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>System 3 — Revenue → Product</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', margin: 0 }}>What earns money</h3>
                {flywheel.revenue_to_product.top_earners.slice(0, 6).map((e) => (
                  <div key={`${e.entity_type}-${e.slug}`} style={{ padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                    <span style={{ color: 'var(--foundry-text-muted)', fontSize: 11 }}>{e.entity_type}</span>
                    <span style={{ color: 'var(--foundry-text)', marginLeft: 8 }}>{e.label}</span>
                    <span style={{ color: 'var(--foundry-primary)', float: 'right' }}>{e.upgrade_completed} paid</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', margin: 0 }}>What to build next</h3>
                {flywheel.revenue_to_product.build_next.map((s) => (
                  <div key={s.priority} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                    <p style={{ color: 'var(--foundry-text)', margin: 0 }}>{s.action}</p>
                    <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: '4px 0 0' }}>{s.signal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--foundry-text-muted)' }}>
              Proven retention: {flywheel.revenue_to_product.worlds_with_proven_retention.join(', ') || 'none yet'}
              {' · '}
              Proven conversion: {flywheel.revenue_to_product.worlds_with_proven_conversion.join(', ') || 'none yet'}
            </div>
          </section>

          <section style={{ marginTop: 24, padding: 16, background: '#1A1410', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', fontSize: 13, margin: 0 }}>
              System 4 — Domain expansion scoring → <Link href="/operator/opportunities" style={{ color: 'var(--foundry-text)' }}>/operator/opportunities</Link>
            </p>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
              No new domains until flywheel proves retention + conversion on live worlds.
            </p>
          </section>
        </>
      )}
    </main>
  );
}
