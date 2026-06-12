import Link from 'next/link';
import {
  JANUARY_2027_LAUNCH_SEQUENCE,
  listLaunchSequence,
  listTrafficOpportunities,
  OPPORTUNITY_ANTI_PATTERNS,
  OPPORTUNITY_ANTI_PATTERN_RATIONALE,
  OPPORTUNITY_PRINCIPLE,
  OPPORTUNITY_TYPE_LABELS,
} from '../../../lib/opportunity-registry';
import {
  GROWTH_FACTORY_FUNNEL,
  PORTFOLIO_SCORE_LABELS,
} from '../../../lib/growth-factory';

export const dynamic = 'force-dynamic';

export default function TrafficOpportunitiesPage() {
  const ranked = listTrafficOpportunities();
  const launchSequence = listLaunchSequence();

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--foundry-bg)',
        color: 'var(--foundry-text)',
        padding: '2rem',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <Link href="/growth" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
        ← Growth OS
      </Link>
      <p
        style={{
          color: '#8B4545',
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        PASS-015A · Traffic Opportunity Registry
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Traffic Opportunities</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{OPPORTUNITY_PRINCIPLE}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        Funnel: Traffic → Domain → Transformation → Retention
      </p>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        {GROWTH_FACTORY_FUNNEL.join(' → ')}
      </p>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Acquisition Portfolio Scorecard</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 8 }}>
          7 dimensions (max 70) — portfolio decisions, not shiny objects
        </p>
        <div style={{ marginTop: 16, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--foundry-border-subtle)', color: 'var(--foundry-text-faint)', textAlign: 'left' }}>
                <th style={{ padding: '8px 4px' }}>Opportunity</th>
                <th style={{ padding: '8px 4px' }}>Domain</th>
                {(Object.keys(PORTFOLIO_SCORE_LABELS) as (keyof typeof PORTFOLIO_SCORE_LABELS)[]).map((k) => (
                  <th key={k} style={{ padding: '8px 2px', fontSize: 10 }}>
                    {PORTFOLIO_SCORE_LABELS[k].split(' ')[0]}
                  </th>
                ))}
                <th style={{ padding: '8px 4px', color: 'var(--foundry-primary)' }}>/70</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((o) => (
                <tr key={o.slug} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--foundry-text)' }}>
                    {o.display_name}
                    {o.status === 'active' && (
                      <span style={{ color: 'var(--foundry-success)', fontSize: 10, marginLeft: 6 }}>live</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 4px', color: 'var(--foundry-text-muted)', fontSize: 11 }}>{o.permanent_domain_name}</td>
                  {(Object.keys(PORTFOLIO_SCORE_LABELS) as (keyof typeof PORTFOLIO_SCORE_LABELS)[]).map((k) => (
                    <td key={k} style={{ padding: '10px 2px', color: 'var(--foundry-text-muted)', textAlign: 'center' }}>
                      {o.portfolio[k]}
                    </td>
                  ))}
                  <td style={{ padding: '10px 4px', color: 'var(--foundry-primary)', fontWeight: 500 }}>{o.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>January 2027 Launch Sequence</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12 }}>
          Identity · Community · Projects · Collections — not traffic-chasing apps.
        </p>
        <div style={{ marginTop: 16 }}>
          {JANUARY_2027_LAUNCH_SEQUENCE.map((d) => (
            <div
              key={d.slug}
              style={{
                display: 'flex',
                gap: 16,
                padding: '12px 0',
                borderBottom: '1px solid var(--foundry-border-subtle)',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--foundry-primary)', minWidth: 24 }}>{d.rank}.</span>
              <span style={{ color: 'var(--foundry-text)', minWidth: 160 }}>{d.name}</span>
              <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>{d.rationale}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid #3A2020' }}>
        <h2 style={{ fontSize: 14, color: '#8B4545', margin: 0 }}>Do Not Build (Anti-Patterns)</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{OPPORTUNITY_ANTI_PATTERN_RATIONALE}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.8 }}>
          {OPPORTUNITY_ANTI_PATTERNS.join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Acquisition Patterns</h2>
        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.9 }}>
          <p style={{ color: 'var(--foundry-text-muted)' }}>
            <strong style={{ color: 'var(--foundry-success)' }}>World Cup 2026 → Soccer</strong> — not World Cup app. Paths: Soccer Fan,
            Youth Coach, Referee, Analyst.
          </p>
          <p style={{ color: 'var(--foundry-text-muted)', marginTop: 12 }}>
            <strong style={{ color: 'var(--foundry-success)' }}>Midterm Elections 2026 → Civic Engagement</strong> — not election news.
            Outcome: Become an Informed Citizen. Paths: Informed Voter, Poll Worker, Local Leader, Civic Organizer.
          </p>
        </div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          Briefs:{' '}
          <code style={{ color: 'var(--foundry-text-muted)' }}>world-cup-2026/</code> ·{' '}
          <code style={{ color: 'var(--foundry-text-muted)' }}>midterm-elections-2026/</code> ·{' '}
          <code style={{ color: 'var(--foundry-text-muted)' }}>civic-engagement/</code>
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>All Opportunities</h2>
        <div style={{ marginTop: 16 }}>
          {ranked.map((o) => (
            <div
              key={o.slug}
              style={{
                padding: '16px 0',
                borderBottom: '1px solid var(--foundry-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: 'var(--foundry-text)', fontSize: 15 }}>{o.display_name}</span>
                <span style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>Score {o.total_score}</span>
              </div>
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 6 }}>
                {OPPORTUNITY_TYPE_LABELS[o.type]} · {o.event_window}
              </p>
              <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
                Permanent domain: <span style={{ color: 'var(--foundry-text)' }}>{o.permanent_domain_name}</span>
              </p>
              <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 6 }}>
                Paths: {o.transformation_paths.join(' · ')}
              </p>
              {o.note && (
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 6, fontStyle: 'italic' }}>{o.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <p>
          Registry: <code style={{ color: 'var(--foundry-text-faint)' }}>marketing/opportunities/registry.json</code>
        </p>
        <p style={{ marginTop: 8 }}>
          {launchSequence.length} opportunities tied to January 2027 launch ranks.
        </p>
      </section>
    </main>
  );
}
