import { headers } from 'next/headers';
import { routeKindLabel } from '@foundry/vertical-resolver';

export default async function VerticalHomePage() {
  const h = await headers();

  const host = h.get('x-foundry-host') || 'unknown';
  const verticalName = h.get('x-foundry-vertical-name') || 'Unknown';
  const theme = h.get('x-foundry-theme') || '—';
  const siteName = h.get('x-foundry-site-name') || verticalName;
  const routeKind = h.get('x-foundry-route-kind') || 'vertical_home';
  const canonical = h.get('x-foundry-canonical-path') || '/';
  const verticalId = h.get('x-foundry-vertical-id') || '—';

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0B', color: '#F0F0F2', padding: '2rem', fontFamily: 'system-ui' }}>
      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        PASS-005 · Vertical Resolution Engine
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem' }}>{siteName}</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8 }}>{host}</p>

      <section style={{ marginTop: 32, padding: 16, background: '#111114', borderRadius: 8, fontSize: 13, maxWidth: 520 }}>
        <div style={{ color: '#C8A96E', marginBottom: 12 }}>Resolved</div>
        <div style={{ color: '#8A8A8E', lineHeight: 1.8 }}>
          <div>Vertical: <span style={{ color: '#E8E8EC' }}>{verticalName}</span></div>
          <div>Theme: <span style={{ color: '#E8E8EC' }}>{theme}</span></div>
          <div>Vertical ID: <span style={{ color: '#E8E8EC' }}>{verticalId}</span></div>
          <div>Route: <span style={{ color: '#E8E8EC' }}>{routeKindLabel(routeKind as Parameters<typeof routeKindLabel>[0])}</span></div>
          <div>Path: <span style={{ color: '#E8E8EC' }}>{canonical}</span></div>
        </div>
      </section>

      <p style={{ color: '#6B6B70', marginTop: 24, fontSize: 13, maxWidth: 480 }}>
        One deployment → many verticals → one platform. Topics live as paths — not separate sites.
      </p>
      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 12 }}>
        Try: /fantasy · /fantasy/overview · /rankings · /entities/buffalo-trace
      </p>
    </main>
  );
}
