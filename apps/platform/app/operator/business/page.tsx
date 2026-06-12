import Link from 'next/link';
import { getBusinessDashboardSnapshot, isSupabaseConfigured } from '@foundry/db';

export const dynamic = 'force-dynamic';

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div style={{ padding: 16, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: accent ? `1px solid ${accent}44` : '1px solid var(--foundry-border-subtle)' }}>
      <div style={{ fontSize: 26, fontWeight: 300, color: accent ?? 'var(--foundry-text)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default async function OperatorBusinessPage() {
  const biz = isSupabaseConfigured() ? await getBusinessDashboardSnapshot() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/revenue" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Revenue funnel</Link>
      <Link href="/operator/invites" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Invites</Link>

      <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>Founder dashboard</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Business</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>
        Business metrics — even when MRR is $0, measure now.
      </p>

      {!biz ? (
        <p style={{ marginTop: 24, color: '#C96B6B' }}>Supabase not configured.</p>
      ) : (
        <>
          <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-primary-border-dim)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>North star KPIs</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
              <Stat label="Transformations in progress" value={biz.transformations_in_progress} accent="var(--foundry-success)" />
              <Stat label="Monthly active transformations" value={biz.monthly_active_transformations} accent="var(--foundry-success)" />
              <Stat label="Upgrade intent (unique)" value={biz.upgrade_intent} accent="var(--foundry-primary)" />
              <Stat label="Paid users" value={biz.paid_users} accent="var(--foundry-primary)" />
              <Stat label="MRR" value={`$${biz.mrr_usd}`} accent="var(--foundry-primary)" />
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>Beta pipeline</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              <Stat label="Waitlist" value={biz.waitlist_total} />
              <Stat label="Pending" value={biz.pending} />
              <Stat label="Invites sent" value={biz.invites_sent} />
              <Stat label="Joined" value={biz.joined} />
              <Stat label="Active testers" value={biz.active_testers} />
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Revenue funnel</h2>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              <Stat label="Pricing views" value={biz.pricing_viewed} />
              <Stat label="Upgrade clicks" value={biz.pricing_clicked} />
              <Stat label="Checkout started" value={biz.upgrade_initiated} />
              <Stat label="Paid" value={biz.upgrade_completed} />
              <Stat label="Build subs" value={biz.build_subscribers} />
              <Stat label="Mastery subs" value={biz.mastery_subscribers} />
            </div>
          </section>

          <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>PASS-030 cohort (5 each)</h2>
            <div style={{ marginTop: 16 }}>
              {Object.entries(biz.by_cohort).map(([cohort, c]) => (
                <div key={cohort} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                  <span style={{ color: 'var(--foundry-text)', textTransform: 'capitalize' }}>{cohort.replace(/_/g, ' ')}</span>
                  <span style={{ color: 'var(--foundry-text-muted)' }}>
                    {c.active}/{c.target} active · {c.joined} joined · {c.invited} invited
                  </span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 16 }}>
              PASS-029A verified — invite via <Link href="/operator/invites" style={{ color: '#6B9BC9' }}>/operator/invites</Link> when ready.
              Learning lane: <Link href="/operator/learning" style={{ color: 'var(--foundry-success)' }}>/operator/learning</Link>
            </p>
          </section>

          <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 14, color: 'var(--foundry-text-faint)', margin: 0 }}>Waitlist by segment</h2>
            <div style={{ marginTop: 12, fontSize: 13, color: 'var(--foundry-text-muted)' }}>
              {Object.entries(biz.waitlist_by_segment).map(([seg, n]) => (
                <p key={seg} style={{ margin: '4px 0' }}>{seg}: {n}</p>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
