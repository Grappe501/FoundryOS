import Link from 'next/link';
import { getRoutingHealthReport } from '../../lib/routing-health';

const statusColor: Record<string, string> = {
  planned: '#6B6B70',
  active_build: '#C8A96E',
  staging: '#6B9FD4',
  live: '#6BC96B',
  archived: '#4A4A4E',
};

export default function RoutingPage() {
  const report = getRoutingHealthReport();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Vertical Routing</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        PASS-005 diagnostics — configured verticals, resolved domains, routing health
      </p>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{ padding: 16, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: '#C8A96E' }}>{report.configured_verticals}</div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Configured Verticals</div>
        </div>
        <div style={{ padding: 16, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: '#C8A96E' }}>{report.resolved_domains}/{report.configured_domains}</div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Resolved Domains</div>
        </div>
        <div style={{ padding: 16, background: '#0F0F12', border: `1px solid ${report.routing_healthy ? '#2A3A2A' : '#3A2A2A'}`, borderRadius: 8 }}>
          <div style={{ fontSize: 22, color: report.routing_healthy ? '#6BC96B' : '#C96B6B' }}>
            {report.routing_healthy ? 'Healthy' : 'Degraded'}
          </div>
          <div style={{ fontSize: 11, color: '#6B6B70' }}>Routing Health</div>
        </div>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 500 }}>Vertical Launch Status</h2>
        <table style={{ width: '100%', marginTop: 16, fontSize: 13, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#6B6B70', textAlign: 'left' }}>
              <th style={{ padding: '8px 0' }}>Vertical</th>
              <th>Theme</th>
              <th>Status</th>
              <th>Pass</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {report.launch_status.map((row) => (
              <tr key={row.vertical} style={{ borderTop: '1px solid #1A1A1E' }}>
                <td style={{ padding: '10px 0' }}>{row.vertical}</td>
                <td style={{ color: '#8A8A8E' }}>{row.theme}</td>
                <td style={{ color: statusColor[row.status] ?? '#8A8A8E' }}>{row.status.replace('_', ' ')}</td>
                <td style={{ color: '#6B6B70' }}>{row.launch_pass ?? '—'}</td>
                <td style={{ color: '#8A8A8E', fontSize: 12 }}>{row.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 500 }}>Domain Resolution</h2>
        {report.domains.map((d) => (
          <div key={d.domain} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: d.resolves ? '#6BC96B' : '#C96B6B' }}>{d.resolves ? '✓' : '✗'}</span>
            {' '}
            <span style={{ color: '#E8E8EC' }}>{d.domain}</span>
            <span style={{ color: '#6B6B70' }}> → </span>
            <span style={{ color: '#C8A96E' }}>{d.vertical_name}</span>
            <span style={{ color: '#6B6B70' }}> / </span>
            <span style={{ color: '#8A8A8E' }}>{d.theme}</span>
            <span style={{ color: '#4A4A4E', marginLeft: 8 }}>({d.local_domain})</span>
          </div>
        ))}
      </section>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        Local dev: <code style={{ color: '#8A8A8E' }}>books.localhost:3002</code> · see docs/LOCAL_DEV.md
      </p>
    </main>
  );
}
