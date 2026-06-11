import Link from 'next/link';
import {
  getDashboardConsistencyCheck,
  isSupabaseConfigured,
  runFullRevenueVerification,
  REVENUE_TEST_PERSONAS,
} from '@foundry/db';

export const dynamic = 'force-dynamic';

export default async function RevenueVerifyPage() {
  const result = isSupabaseConfigured() ? await runFullRevenueVerification() : null;
  const consistency = isSupabaseConfigured() ? await getDashboardConsistencyCheck() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator/revenue" style={{ color: '#6B6B70', fontSize: 13 }}>← Revenue dashboard</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business</Link>

      <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>PASS-029A</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Revenue & Analytics Verification</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Prove every business metric is accurate before PASS-030 invites. Seeds {REVENUE_TEST_PERSONAS.length} test personas and validates attribution.
      </p>

      {!result ? (
        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured.</p>
      ) : (
        <>
          <section style={{ marginTop: 28, padding: 24, background: result.passed ? '#1A2A1A' : '#2A1A1A', borderRadius: 8, border: `1px solid ${result.passed ? '#2A4A2A' : '#4A2A2A'}` }}>
            <h2 style={{ fontSize: 16, color: result.passed ? '#6B9B6B' : '#C96B6B', margin: 0 }}>
              {result.passed ? 'PASS-029A verification passed' : 'Verification incomplete — fix before PASS-030'}
            </h2>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>
              {result.checks.filter((c) => c.passed).length}/{result.checks.length} checks passed
            </p>
          </section>

          <section style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Test personas</h2>
            <div style={{ marginTop: 12 }}>
              {REVENUE_TEST_PERSONAS.map((p) => (
                <div key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                  <span style={{ color: '#E8E8EC' }}>{p.name}</span>
                  <span style={{ color: '#6B6B70', marginLeft: 8 }}>{p.segment}</span>
                  <span style={{ color: '#8A8A8E', marginLeft: 8 }}>{p.world_slug} · {p.mission_slug} · {p.tier}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>Verification checklist</h2>
            {result.checks.map((c) => (
              <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13, display: 'flex', gap: 12 }}>
                <span style={{ color: c.passed ? '#6B9B6B' : '#C96B6B', minWidth: 20 }}>{c.passed ? '✓' : '✗'}</span>
                <div>
                  <p style={{ margin: 0, color: '#E8E8EC' }}>{c.label}</p>
                  <p style={{ margin: '4px 0 0', color: '#6B6B70', fontSize: 12 }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </section>

          {result.snapshot && (
            <section style={{ marginTop: 28, padding: 20, background: '#111114', borderRadius: 8 }}>
              <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Community → upgrade intent</h2>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
                {result.snapshot.community_correlation.joiners_with_upgrade_intent} of {result.snapshot.community_correlation.community_joiners} community joiners showed upgrade intent ({result.snapshot.community_correlation.upgrade_intent_rate_pct}%)
              </p>
              {result.snapshot.community_correlation.by_world.map((w) => (
                <p key={w.world_slug} style={{ color: '#6B6B70', fontSize: 12, margin: '4px 0' }}>
                  {w.world_slug}: {w.upgrade_intent}/{w.joiners} joiners → intent
                </p>
              ))}
            </section>
          )}

          {consistency && (
            <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
              <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Dashboard consistency</h2>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
                pricing_viewed {consistency.pricing_viewed} · upgrade_initiated {consistency.upgrade_initiated} · paid_users (subscriptions) {consistency.paid_users_subscriptions}
              </p>
              {consistency.notes.map((n) => (
                <p key={n} style={{ color: '#6B6B70', fontSize: 12, margin: '4px 0' }}>{n}</p>
              ))}
            </section>
          )}

          {result.snapshot?.persona_payments.length ? (
            <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
              <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Who paid and why</h2>
              {result.snapshot.persona_payments.map((p) => (
                <div key={p.persona} style={{ padding: '8px 0', fontSize: 13, borderBottom: '1px solid #1A1A1E' }}>
                  <span style={{ color: '#E8E8EC' }}>{p.persona}</span>
                  <span style={{ color: p.paid ? '#6B9B6B' : '#6B6B70', marginLeft: 8 }}>{p.paid ? 'paid' : 'intent only'}</span>
                  <span style={{ color: '#8A8A8E', marginLeft: 8 }}>{p.world_slug}{p.mission_slug ? ` · ${p.mission_slug}` : ''}{p.context ? ` · ${p.context}` : ''}</span>
                </div>
              ))}
            </section>
          ) : null}
        </>
      )}

      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        CLI: <code style={{ color: '#6B6B70' }}>npm run verify:revenue</code> · Re-run this page to re-seed personas and verify.
      </p>
    </main>
  );
}
