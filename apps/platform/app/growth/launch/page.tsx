import Link from 'next/link';
import {
  getLaunchVelocitySnapshot,
  PASS_015B_COMMAND,
  PASS_015B_PASS_GATE,
  PASS_015B_TITLE,
  VALIDATION_MILESTONES,
} from '../../../lib/launch-factory-loader';

export const dynamic = 'force-dynamic';

export default function LaunchFactoryPage() {
  const velocity = getLaunchVelocitySnapshot();

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
        {PASS_015B_TITLE}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Launch Factory</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{PASS_015B_PASS_GATE}</p>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 13, marginTop: 12, fontFamily: 'monospace' }}>
        {PASS_015B_COMMAND}
      </p>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-success-bg)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Domain Launch Velocity</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12 }}>
          Days from blueprint to live active domain. Target: {velocity.target_q4_days} days (Q4) →{' '}
          {velocity.target_mature_days} days (mature factory).
        </p>
        <div style={{ display: 'flex', gap: 32, marginTop: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Active domains</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 28, fontWeight: 300, margin: '4px 0 0' }}>
              {velocity.active_count}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Scaffolded</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 28, fontWeight: 300, margin: '4px 0 0' }}>
              {velocity.scaffolded_count}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Avg days to active</p>
            <p style={{ color: 'var(--foundry-primary)', fontSize: 28, fontWeight: 300, margin: '4px 0 0' }}>
              {velocity.avg_days_blueprint_to_active ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>One Command Creates</h2>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, fontSize: 13 }}>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', margin: '0 0 8px' }}>Platform</p>
            <p style={{ color: 'var(--foundry-text-muted)', margin: 0, lineHeight: 1.7 }}>
              Blueprint · Paths · Projects · Collections · Communities · Roles · Mastery
            </p>
          </div>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', margin: '0 0 8px' }}>SEO</p>
            <p style={{ color: 'var(--foundry-text-muted)', margin: 0, lineHeight: 1.7 }}>
              What Is · Beginner Guide · Road to Expert · Projects · Mistakes · Resources
            </p>
          </div>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', margin: '0 0 8px' }}>Marketing</p>
            <p style={{ color: 'var(--foundry-text-muted)', margin: 0, lineHeight: 1.7 }}>
              Brief · Checklist · 30-day calendar · Email · Social · SEO cluster
            </p>
          </div>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-primary)', margin: '0 0 8px' }}>Growth</p>
            <p style={{ color: 'var(--foundry-text-muted)', margin: 0, lineHeight: 1.7 }}>
              Target user · Traffic sources · Opportunity score · Monetization · KPIs
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Validation Milestones (Realistic)</h2>
        <div style={{ marginTop: 16 }}>
          {VALIDATION_MILESTONES.map((m) => (
            <div
              key={m.date}
              style={{
                padding: '12px 0',
                borderBottom: '1px solid var(--foundry-border-subtle)',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--foundry-text)' }}>{m.date}</span>
              <span style={{ color: 'var(--foundry-text-faint)', margin: '0 8px' }}>—</span>
              <span style={{ color: 'var(--foundry-primary)' }}>
                {m.active_domains} active · {m.users.toLocaleString()} users · {m.paid} paid
                {'mrr' in m && m.mrr ? ` · ${m.mrr} MRR` : ''}
              </span>
              <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, margin: '4px 0 0' }}>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Next: Domain #2 — AI Builder</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          Highest opportunity score (64). Ideal early adopter — pays, creates, shares, refers. PASS-016 is{' '}
          <strong style={{ color: 'var(--foundry-text)', fontWeight: 500 }}>not</strong> another architecture pass. Milestone: second{' '}
          <strong style={{ color: 'var(--foundry-success)', fontWeight: 500 }}>Active Domain</strong> with real users.
        </p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, fontFamily: 'monospace' }}>
          npm run launch:domain -- ai-builder
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Launch Registry</h2>
        <div style={{ marginTop: 16 }}>
          {velocity.entries.map((e) => (
            <div
              key={e.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--foundry-border-subtle)',
                fontSize: 13,
              }}
            >
              <span style={{ color: 'var(--foundry-text)' }}>{e.display_name}</span>
              <span style={{ color: e.status === 'active' ? 'var(--foundry-success)' : 'var(--foundry-primary)' }}>{e.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
