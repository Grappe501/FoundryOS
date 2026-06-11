import Link from 'next/link';
import { getTransformationAnalyticsSnapshot, isSupabaseConfigured } from '@foundry/db';
import { getWorldDepthSnapshot } from '../../../lib/growth-os';

export const dynamic = 'force-dynamic';

export default async function OperatorAnalyticsPage() {
  const depthSnapshot = getWorldDepthSnapshot();
  const depthScores = Object.fromEntries(
    depthSnapshot.rows.map((r) => [r.slug, r.depthScore]),
  );

  const analytics = isSupabaseConfigured()
    ? await getTransformationAnalyticsSnapshot(depthScores)
    : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/beta" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Beta dashboard</Link>
      <Link href="/operator/feedback" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Feedback</Link>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Transformation Analytics</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        What actually helps people improve? Capture behavior · measure transformation · identify successful patterns.
      </p>

      {!analytics ? (
        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured — analytics unavailable.</p>
      ) : (
        <>
          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: '0 0 12px' }}>Transformation funnel</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
              <Stat label="Assessment started" value={analytics.funnel.assessment_started} />
              <Stat label="Assessment completed" value={analytics.funnel.assessment_completed} />
              <Stat label="Mission started" value={analytics.funnel.mission_started} />
              <Stat label="Mission completed" value={analytics.funnel.mission_completed} />
              <Stat label="Return tomorrow" value={analytics.funnel.return_tomorrow} />
              <Stat label="Return this week" value={analytics.funnel.return_this_week} />
              <Stat label="Portfolio created" value={analytics.funnel.portfolio_created} />
              <Stat label="Community joined" value={analytics.funnel.community_joined} />
              <Stat label="Challenge submitted" value={analytics.funnel.challenge_submitted} />
              <Stat label="Showcase posted" value={analytics.funnel.showcase_posted} />
              <Stat label="Peer feedback" value={analytics.funnel.peer_feedback_given} />
              <Stat label="Paid conversion" value={analytics.funnel.paid_conversion} />
            </div>
            <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 10 }}>
              {analytics.event_count.toLocaleString()} events · {analytics.mission_sync_count} synced completions · {analytics.beta_active} active testers
            </p>
          </section>

          {analytics.community_activation && (
            <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8, border: '1px solid #2A4A2A' }}>
              <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Community activation — PASS-028</h2>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                <Stat label="Challenge participation" value={analytics.community_activation.challenge_participation} />
                <Stat label="Posts this week" value={analytics.community_activation.community_posts} />
                <Stat label="Mentor activity (3+ helps)" value={analytics.community_activation.mentor_activity} />
                <Stat label="Peer feedback" value={analytics.community_activation.peer_feedback} />
              </div>
              <div style={{ marginTop: 16 }}>
                {Object.entries(analytics.community_activation.by_world).map(([slug, s]) => (
                  <div key={slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
                    <Link href={`/community/${slug}`} style={{ color: '#E8E8EC' }}>{slug}</Link>
                    <span style={{ color: '#8A8A8E' }}>{s.member_count} members · {s.challenge_submissions} challenges · {s.showcase_posts} showcases</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>Transformation velocity (avg hours)</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              <VelocityStat label="Join → first mission" value={analytics.velocity.join_to_first_mission_hours} />
              <VelocityStat label="Start → completion" value={analytics.velocity.first_mission_to_completion_hours} />
              <VelocityStat label="Completion → portfolio" value={analytics.velocity.completion_to_portfolio_hours} />
              <VelocityStat label="Portfolio → return" value={analytics.velocity.portfolio_to_return_hours} />
            </div>
            <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 10 }}>Sample size: {analytics.velocity.sample_size}</p>
          </section>

          <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6BC96B', margin: 0 }}>Early success indicators</h2>
            {analytics.success_indicators.map((ind) => (
              <div key={ind.label} style={{ marginTop: 16, padding: 14, background: '#0F0F12', borderRadius: 6 }}>
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{ind.insight}</p>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>
                  {ind.label}: {ind.cohort_pct}% vs {ind.baseline_pct}% baseline
                  {ind.multiplier > 0 && ` · ${ind.multiplier}x`}
                </p>
              </div>
            ))}
          </section>

          <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>World-level analytics</h2>
            <div style={{ marginTop: 12, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ color: '#6B6B70', textAlign: 'left' }}>
                    <th style={{ padding: '8px 6px' }}>World</th>
                    <th style={{ padding: '8px 6px' }}>Users</th>
                    <th style={{ padding: '8px 6px' }}>Mission rate</th>
                    <th style={{ padding: '8px 6px' }}>Return rate</th>
                    <th style={{ padding: '8px 6px' }}>Portfolio</th>
                    <th style={{ padding: '8px 6px' }}>Community</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.worlds.map((w) => (
                    <tr key={w.slug} style={{ borderTop: '1px solid #1A1A1E' }}>
                      <td style={{ padding: '10px 6px', color: '#E8E8EC' }}>{w.label}</td>
                      <td style={{ padding: '10px 6px' }}>{w.users}</td>
                      <td style={{ padding: '10px 6px' }}>{w.mission_completion_rate}%</td>
                      <td style={{ padding: '10px 6px' }}>{w.return_rate}%</td>
                      <td style={{ padding: '10px 6px' }}>{w.portfolio_usage}</td>
                      <td style={{ padding: '10px 6px' }}>{w.community_activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Mission effectiveness</h2>
            {analytics.missions.length === 0 ? (
              <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 12 }}>No mission data yet — testers need to start missions.</p>
            ) : (
              analytics.missions.slice(0, 20).map((m) => (
                <div key={`${m.world_slug}-${m.mission_slug}`} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                  <span style={{ color: '#E8E8EC' }}>{m.mission_title}</span>
                  <span style={{ color: '#6B6B70', marginLeft: 8 }}>({m.world_slug})</span>
                  <div style={{ color: '#8A8A8E', marginTop: 4 }}>
                    Started: {m.started} · Completed: {m.completed} · {m.completion_pct}%
                    {m.avg_time_minutes != null && ` · ~${m.avg_time_minutes} min`}
                    {m.drop_off_step && ` · Drop-off: ${m.drop_off_step}`}
                  </div>
                </div>
              ))
            )}
          </section>

          <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A2A2A' }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>PASS-027 exit criteria</h2>
            <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.8, paddingLeft: 18 }}>
              <li>Which worlds work best? → World table above (mission + return rates)</li>
              <li>Which missions work best? → Mission effectiveness list</li>
              <li>Where do users drop off? → Drop-off step per mission</li>
              <li>What predicts return visits? → Success indicators</li>
              <li>What predicts mastery? → Portfolio + completion correlation</li>
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{value}</div>
      <div style={{ fontSize: 10, color: '#6B6B70', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function VelocityStat({ label, value }: { label: string; value: number | null }) {
  return (
    <div style={{ padding: 12, background: '#111114', borderRadius: 6 }}>
      <div style={{ fontSize: 18, color: '#6B9BC9' }}>{value != null ? `${value}h` : '—'}</div>
      <div style={{ fontSize: 10, color: '#6B6B70', marginTop: 4 }}>{label}</div>
    </div>
  );
}
