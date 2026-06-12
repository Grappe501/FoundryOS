import Link from 'next/link';
import { getBusinessDashboardSnapshot, isSupabaseConfigured } from '@foundry/db';
import {
  LEARNING_LANE_METRICS,
  LEARNING_LANE_RULES,
  LEARNING_LANE_SEGMENTS,
  LEARNING_LANE_WORLDS,
} from '../../../lib/pass-030-learning';
import { getMissionCount } from '../../../lib/immersion/registry';
import { WorldAssignmentGuard } from '../../../components/world-governance/WorldAssignmentGuard';

export const dynamic = 'force-dynamic';

export default async function OperatorLearningPage() {
  const biz = isSupabaseConfigured() ? await getBusinessDashboardSnapshot() : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/invites" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Invites</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business</Link>
      <Link href="/operator/revenue/verify" style={{ color: '#6B9B6B', fontSize: 13, marginLeft: 16 }}>029A verify →</Link>

      <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>PASS-034 (deferred)</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Learning Lane</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Deferred until PASS-032 World Immersion lands. First impression: &quot;Wow — there is way more here than I expected.&quot;
      </p>

      <section style={{ marginTop: 24, padding: 20, background: '#0F1210', border: '1px solid #2A3A2A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Locked rules</h2>
        <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Maximum {LEARNING_LANE_RULES.max_testers} testers — no scaling</li>
          <li>No ads · no public launch</li>
          <li>Gate: {LEARNING_LANE_RULES.gate}</li>
          <li>Segments: {LEARNING_LANE_SEGMENTS.join(', ').replace(/_/g, ' ')} (5 each)</li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>What we measure</h2>
        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {LEARNING_LANE_METRICS.map((m) => (
            <div key={m.key} style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
              <div style={{ fontSize: 14, color: '#E8E8EC' }}>{m.label}</div>
              <div style={{ fontSize: 12, color: '#6B6B70', marginTop: 4 }}>{m.description}</div>
            </div>
          ))}
        </div>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Live metrics: <Link href="/operator/analytics" style={{ color: '#6B9BC9' }}>/operator/analytics</Link>
          {' · '}
          <Link href="/operator/revenue" style={{ color: '#6B9BC9' }}>/operator/revenue</Link>
        </p>
      </section>

      {biz && (
        <section style={{ marginTop: 28, padding: 20, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Cohort progress (5 each)</h2>
          <div style={{ marginTop: 16 }}>
            {Object.entries(biz.by_cohort).map(([cohort, c]) => (
              <div key={cohort} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                <span style={{ textTransform: 'capitalize' }}>{cohort.replace(/_/g, ' ')}</span>
                <span style={{ color: '#8A8A8E' }}>
                  {c.active}/{c.target} active · {c.joined} joined · upgrade intent tracked
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, fontSize: 13 }}>
            <div><span style={{ color: '#6B6B70' }}>Return signal</span><br />{biz.active_testers} active testers</div>
            <div><span style={{ color: '#6B6B70' }}>Upgrade intent</span><br />{biz.upgrade_intent}</div>
            <div><span style={{ color: '#6B6B70' }}>Paid</span><br />{biz.upgrade_completed} conversions · ${biz.mrr_usd} MRR</div>
          </div>
        </section>
      )}

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Starting worlds</h2>
        <div style={{ marginTop: 12, fontSize: 13, color: '#8A8A8E' }}>
          {LEARNING_LANE_WORLDS.map((w) => (
            <p key={w.slug} style={{ margin: '6px 0' }}>
              <Link href={`/${w.slug}`} style={{ color: '#E8E8EC' }}>{w.label}</Link>
              <span style={{ color: '#6B6B70' }}> — {w.priority}</span>
            </p>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#B06B6B', margin: 0 }}>Age-safe assignment (PASS-033)</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>Operators must not assign adult worlds to student accounts.</p>
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          <WorldAssignmentGuard worldSlug="ai-builder" targetSegment="student" />
          <WorldAssignmentGuard worldSlug="bourbon" targetSegment="student" />
          <WorldAssignmentGuard worldSlug="medical-cannabis-literacy" targetSegment="teen" />
        </div>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#1A1410', border: '1px solid #3A3020', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 13, margin: 0 }}>
          Ready after PASS-032: {getMissionCount('ai-builder')}+ missions per Life Leverage world. Use <Link href="/operator/invites" style={{ color: '#E8E8EC' }}>/operator/invites</Link> when immersion gate clears.
        </p>
      </section>
    </main>
  );
}
