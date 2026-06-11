import type { ReactNode } from 'react';
import Link from 'next/link';
import { getValidationDashboardMetrics, isSupabaseConfigured } from '@foundry/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Validation Dashboard | Foundry',
  description: 'PASS-016A — Market validation. Learn from 10 strangers before building more domains.',
};

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #1A1A1E',
        fontSize: 14,
      }}
    >
      <span style={{ color: '#8A8A8E' }}>{label}</span>
      <span style={{ color: '#E8E8EC' }}>{value}</span>
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
    <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8, border: `1px solid ${color}` }}>
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
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>
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
        PASS-016A · Market Validation
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Validation Dashboard</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Risk shifted: architecture → <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>building things nobody uses</strong>.
        Goal: learn from {metrics?.stranger_goal ?? 10} strangers before PASS-017.
      </p>

      <section
        style={{
          marginTop: 28,
          padding: 24,
          background: '#111114',
          borderRadius: 8,
          border: `1px solid ${metrics?.pass_016_exit.criteria_met ? '#2A4A2A' : '#2A2520'}`,
        }}
      >
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>PASS-016 Exit Criteria (revised)</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          At least one complete stranger starts a transformation and returns — without explanation.
        </p>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 16, background: '#0F0F12', borderRadius: 6 }}>
            <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Started transformation</p>
            <p style={{ color: '#E8E8EC', fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>
              {metrics?.pass_016_exit.strangers_with_full_funnel ?? 0}
            </p>
          </div>
          <div style={{ padding: 16, background: '#0F0F12', borderRadius: 6 }}>
            <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Returned</p>
            <p style={{ color: '#E8E8EC', fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>
              {metrics?.pass_016_exit.strangers_returned ?? 0}
            </p>
          </div>
        </div>
        <p
          style={{
            marginTop: 16,
            color: metrics?.pass_016_exit.criteria_met ? '#6B9B6B' : '#C8A96E',
            fontSize: 14,
          }}
        >
          {metrics?.pass_016_exit.criteria_met ? 'EXIT CRITERIA MET' : 'NOT YET — put strangers through /future-proof'}
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

          <Section title="Activation" color="#2A4A2A">
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

          <Section title="Recent events" color="#1A1A1E">
            {metrics.recent_events.length === 0 ? (
              <p style={{ color: '#6B6B70', fontSize: 13 }}>No events yet. Share /future-proof with strangers.</p>
            ) : (
              metrics.recent_events.map((e) => (
                <div
                  key={e.id}
                  style={{ fontSize: 12, padding: '8px 0', borderBottom: '1px solid #1A1A1E', color: '#8A8A8E' }}
                >
                  <span style={{ color: '#6B9B6B' }}>{e.event_type}</span>
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
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <p style={{ color: '#8A8A8E', fontSize: 14 }}>
            Run migration <code style={{ color: '#E8E8EC' }}>20260625000000_validation_pass016a.sql</code> and configure
            Supabase. Funnel entry:{' '}
            <Link href="/future-proof" style={{ color: '#6B9B6B' }}>
              /future-proof
            </Link>
          </p>
        </section>
      )}

      <section style={{ marginTop: 32, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Student pilot (manual)</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          Group A: Middle School (6–8) · Group B: High School (9–12). Ask: &ldquo;What do you want to become?&rdquo;
          Observe whether they choose AI Builder, Financial Independence, Public Speaking — or something else.
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Primary marketing asset: Future-Proof Assessment — not AI Builder alone.
        </p>
      </section>

      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        Funnel:{' '}
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>
          /future-proof
        </Link>
        {' → '}
        <Link href="/ai-builder" style={{ color: '#6B6B70' }}>
          /ai-builder
        </Link>
      </p>
    </main>
  );
}
