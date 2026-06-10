import { headers } from 'next/headers';

export default async function VerticalHomePage() {
  const headersList = await headers();
  const vertical = headersList.get('x-foundry-vertical') || 'unknown';
  const topic = headersList.get('x-foundry-topic');
  const host = headersList.get('x-foundry-host') || `${vertical}.foundryos.com`;

  if (topic) {
    return (
      <main style={{ minHeight: '100vh', background: '#0A0A0B', color: '#F0F0F2', padding: '2rem', fontFamily: 'system-ui' }}>
        <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {host} / topic
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '1.75rem', textTransform: 'capitalize' }}>
          {topic.replace(/-/g, ' ')}
        </h1>
        <p style={{ color: '#8A8A8E', marginTop: 12, fontSize: 14 }}>
          Topic page under vertical domain. Programmatic SEO paths: /collections, /rankings, /reviews, /best-of…
        </p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0B', color: '#F0F0F2', padding: '2rem', fontFamily: 'system-ui' }}>
      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Vertical Domain
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', textTransform: 'capitalize' }}>
        {vertical.replace(/-/g, ' ')}
      </h1>
      <p style={{ color: '#8A8A8E', marginTop: 12 }}>{host}</p>
      <p style={{ color: '#6B6B70', marginTop: 24, fontSize: 13, maxWidth: 480 }}>
        Thousands of topics live as paths beneath this domain — not separate websites.
      </p>
      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 16 }}>
        Example: {host}/fantasy · {host}/science-fiction · {host}/authors
      </p>
    </main>
  );
}
