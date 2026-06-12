import Link from 'next/link';
import { getRoutingHealthReport } from '../../lib/routing-health';

const statusColor: Record<string, string> = {
  planned: 'var(--foundry-text-faint)',
  active_build: 'var(--foundry-primary)',
  staging: '#6B9FD4',
  live: '#6BC96B',
  archived: 'var(--foundry-text-dim)',
};

export default function RoutingPage() {
  const report = getRoutingHealthReport();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Vertical Routing</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>
        PASS-005 diagnostics — configured verticals, resolved domains, routing health
      </p>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{ padding: 16, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{report.configured_verticals}</div>
          <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)' }}>Configured Verticals</div>
        </div>
        <div style={{ padding: 16, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{report.resolved_domains}/{report.configured_domains}</div>
          <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)' }}>Resolved Domains</div>
        </div>
        <div style={{ padding: 16, background: 'var(--foundry-surface)', border: `1px solid ${report.routing_healthy ? '#2A3A2A' : '#3A2A2A'}`, borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: report.routing_healthy ? '#6BC96B' : '#C96B6B' }}>
            {report.routing_healthy ? 'Healthy' : 'Degraded'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)' }}>Routing Health</div>
        </div>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', fontWeight: 500 }}>Vertical Launch Status</h2>
        <table style={{ width: '100%', marginTop: 16, fontSize: 13, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: 'var(--foundry-text-faint)', textAlign: 'left' }}>
              <th style={{ padding: '8px 0' }}>Vertical</th>
              <th>Theme</th>
              <th>Status</th>
              <th>Pass</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {report.launch_status.map((row) => (
              <tr key={row.vertical} style={{ borderTop: '1px solid var(--foundry-border-subtle)' }}>
                <td style={{ padding: '10px 0' }}>{row.vertical}</td>
                <td style={{ color: 'var(--foundry-text-muted)' }}>{row.theme}</td>
                <td style={{ color: statusColor[row.status] ?? 'var(--foundry-text-muted)' }}>{row.status.replace('_', ' ')}</td>
                <td style={{ color: 'var(--foundry-text-faint)' }}>{row.launch_pass ?? '—'}</td>
                <td style={{ color: 'var(--foundry-text-muted)', fontSize: 12 }}>{row.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', fontWeight: 500 }}>Domain Resolution</h2>
        {report.domains.map((d) => (
          <div key={d.domain} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: d.resolves ? '#6BC96B' : '#C96B6B' }}>{d.resolves ? '✓' : '✗'}</span>
            {' '}
            <span style={{ color: 'var(--foundry-text)' }}>{d.domain}</span>
            <span style={{ color: 'var(--foundry-text-faint)' }}> → </span>
            <span style={{ color: 'var(--foundry-primary)' }}>{d.vertical_name}</span>
            <span style={{ color: 'var(--foundry-text-faint)' }}> / </span>
            <span style={{ color: 'var(--foundry-text-muted)' }}>{d.theme}</span>
            <span style={{ color: 'var(--foundry-text-dim)', marginLeft: 8 }}>({d.local_domain})</span>
          </div>
        ))}
      </section>

      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 32 }}>
        Local dev: <code style={{ color: 'var(--foundry-text-muted)' }}>books.localhost:3002</code> · see docs/LOCAL_DEV.md
      </p>
    </main>
  );
}
