import { headers } from 'next/headers';
import { routeKindLabel } from '@foundry/vertical-resolver';

export default async function ResolvedRoutePage() {
  const h = await headers();

  const host = h.get('x-foundry-host') || 'unknown';
  const verticalName = h.get('x-foundry-vertical-name') || 'Unknown';
  const siteName = h.get('x-foundry-site-name') || verticalName;
  const routeKind = h.get('x-foundry-route-kind') || 'unknown';
  const canonical = h.get('x-foundry-canonical-path') || '/';
  const topic = h.get('x-foundry-topic');
  const contentType = h.get('x-foundry-content-type');
  const entity = h.get('x-foundry-entity');

  const title =
    entity ? entity.replace(/-/g, ' ')
    : topic ? topic.replace(/-/g, ' ')
    : contentType ? contentType.replace(/_/g, ' ')
    : siteName;

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0B', color: '#F0F0F2', padding: '2rem', fontFamily: 'system-ui' }}>
      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {host}{canonical}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '1.75rem', textTransform: 'capitalize' }}>{title}</h1>

      <section style={{ marginTop: 28, padding: 16, background: '#111114', borderRadius: 8, fontSize: 13, maxWidth: 560 }}>
        <div style={{ color: '#C8A96E', marginBottom: 12 }}>Resolution</div>
        <div style={{ color: '#8A8A8E', lineHeight: 1.9 }}>
          <div>Vertical: <span style={{ color: '#E8E8EC' }}>{verticalName}</span></div>
          <div>Site: <span style={{ color: '#E8E8EC' }}>{siteName}</span></div>
          <div>Kind: <span style={{ color: '#E8E8EC' }}>{routeKindLabel(routeKind as Parameters<typeof routeKindLabel>[0])}</span></div>
          {topic && <div>Topic: <span style={{ color: '#E8E8EC' }}>{topic}</span></div>}
          {contentType && <div>Content: <span style={{ color: '#E8E8EC' }}>{contentType}</span></div>}
          {entity && <div>Entity: <span style={{ color: '#E8E8EC' }}>{entity}</span></div>}
        </div>
      </section>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 20 }}>
        Routing only — no content population in PASS-005.
      </p>
    </main>
  );
}
