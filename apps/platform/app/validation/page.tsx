import type { ReactNode } from 'react';
import Link from 'next/link';
import { getValidationDashboardMetrics, isSupabaseConfigured } from '@foundry/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Validation Dashboard | Foundry',
  description: 'Internal funnel dashboard — private build mode. Stranger beta paused until PASS-022.',
};

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid var(--foundry-border-subtle)',
        fontSize: 14,
      }}
    >
      <span style={{ color: 'var(--foundry-text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--foundry-text)' }}>{value}</span>
    </div>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: `1px solid ${color}` }}>
      <h2 style={{ fontSize: 14, color, margin: 0 }}>{title}</h2>
      <div style={{ marginTop: 16 }}>{children}</div>
    </section>
  );
}

export default async function ValidationPage() {
  const configured = isSupabaseConfigured();
  const metrics = configured ? await getValidationDashboardMetrics() : null;

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--foundry-bg)',
        color: 'var(--foundry-text)',
        padding: '2rem',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
        ← Mission Control
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
        Private Build · Internal Dashboard
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Validation Dashboard</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        <strong style={{ fontWeight: 400, color: 'var(--foundry-text)' }}>Private build mode</strong> — vertical depth before
        public beta. Funnel metrics for internal observation. Stranger recruitment paused until PASS-022.
      </p>

      <section
        style={{
          marginTop: 28,
          padding: 24,
          background: 'var(--foundry-surface-raised)',
          borderRadius: 8,
          border: '1px solid var(--foundry-border-warm)',
        }}
      >
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Private Beta Gate (PASS-022)</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          No public beta until 3 verticals are consumer-ready, assessment routes cleanly, auth + email capture exist,
          and pricing page is live. Next: PASS-017 AI Builder depth.
        </p>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 6 }}>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Funnel starts (path/project)</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>
              {metrics?.pass_016_exit.strangers_with_full_funnel ?? 0}
            </p>
          </div>
          <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 6 }}>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Returned visitors</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>
              {metrics?.pass_016_exit.strangers_returned ?? 0}
            </p>
          </div>
        </div>
        <p style={{ marginTop: 16, color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          Observed during private build — not a launch gate.
        </p>
        {!configured && (
          <p style={{ color: '#8B4545', fontSize: 12, marginTop: 12 }}>
            Supabase not configured — events stored in-memory only until migration runs.
          </p>
        )}
      </section>

      {metrics ? (
        <>
          <Section title="Acquisition" color="#3A4A6A">
            <MetricRow label="Unique visitors" value={metrics.acquisition.visitors} />
            {Object.entries(metrics.acquisition.by_landing_page).map(([page, count]) => (
              <MetricRow key={page} label={`Landing: ${page}`} value={count} />
            ))}
            {Object.entries(metrics.acquisition.by_source).map(([src, count]) => (
              <MetricRow key={src} label={`Source: ${src}`} value={count} />
            ))}
          </Section>

          <Section title="Activation" color="var(--foundry-success-bg)">
            <MetricRow label="Assessment started" value={metrics.activation.assessment_started} />
            <MetricRow label="Assessment completed" value={metrics.activation.assessment_completed} />
            <MetricRow label="Path started" value={metrics.activation.path_started} />
            <MetricRow label="Project started" value={metrics.activation.project_started} />
            <MetricRow label="Explore viewed" value={metrics.activation.explore_viewed} />
            <MetricRow label="Path clicked" value={metrics.activation.path_clicked} />
            <MetricRow label="Assessment completion rate" value={`${metrics.activation.completion_rate}%`} />
          </Section>

          <Section title="Retention" color="#4A3A2A">
            <MetricRow label="Returned tomorrow" value={metrics.retention.returned_next_day} />
            <MetricRow label="Returned this week" value={metrics.retention.returned_this_week} />
            <MetricRow label="Unique visitor sessions" value={metrics.retention.unique_visitors} />
          </Section>

          <Section title="Conversion" color="#4A2A4A">
            <MetricRow label="Created account" value={metrics.conversion.account_created} />
            <MetricRow label="Interest submitted" value={metrics.conversion.interest_submitted} />
            <MetricRow label="Started trial" value={metrics.conversion.trial_started} />
            <MetricRow label="Paid" value={metrics.conversion.paid} />
          </Section>

          <Section title="Recent events" color="var(--foundry-border-subtle)">
            {metrics.recent_events.length === 0 ? (
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>No events yet. Funnel tracks internal visits during private build.</p>
            ) : (
              metrics.recent_events.map((e) => (
                <div
                  key={e.id}
                  style={{ fontSize: 12, padding: '8px 0', borderBottom: '1px solid var(--foundry-border-subtle)', color: 'var(--foundry-text-muted)' }}
                >
                  <span style={{ color: 'var(--foundry-success)' }}>{e.event_type}</span>
                  {' · '}
                  {e.visitor_id.slice(0, 10)}…
                  {e.landing_page ? ` · ${e.landing_page}` : ''}
                  {e.path_slug ? ` · ${e.path_slug}` : ''}
                  {' · '}
                  {new Date(e.created_at).toLocaleString()}
                </div>
              ))
            )}
          </Section>
        </>
      ) : (
        <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14 }}>
            Run migration <code style={{ color: 'var(--foundry-text)' }}>20260625000000_validation_pass016a.sql</code> and configure
            Supabase. Funnel entry:{' '}
            <Link href="/future-proof" style={{ color: 'var(--foundry-success)' }}>
              /future-proof
            </Link>
          </p>
        </section>
      )}

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Vertical depth mode</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          Build order: AI Builder → Financial Independence → Public Speaking → Civic Engagement → Bourbon polish.
          Beta wedge: Future-Proof Trinity. See <code style={{ color: 'var(--foundry-text)' }}>docs/VERTICAL_DEPTH_MODE.md</code>.
        </p>
      </section>

      <p style={{ marginTop: 24, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        Funnel:{' '}
        <Link href="/future-proof" style={{ color: 'var(--foundry-text-faint)' }}>
          /future-proof
        </Link>
        {' → '}
        <Link href="/ai-builder" style={{ color: 'var(--foundry-text-faint)' }}>
          /ai-builder
        </Link>
      </p>
    </main>
  );
}
