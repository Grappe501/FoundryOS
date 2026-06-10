import { headers } from 'next/headers';
import { generateProgrammaticPaths } from '@foundry/seo-engine';

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const headersList = await headers();
  const host = headersList.get('x-foundry-host') || 'foundryos.com';
  const displayName = topic.replace(/-/g, ' ');

  const programmatic = generateProgrammaticPaths(topic, displayName);

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0B', color: '#F0F0F2', padding: '2rem', fontFamily: 'system-ui' }}>
      <p style={{ color: '#6B6B70', fontSize: 11 }}>{host}/{topic}</p>
      <h1 style={{ fontWeight: 300, fontSize: '1.75rem', textTransform: 'capitalize' }}>{displayName}</h1>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 13, color: '#C8A96E', fontWeight: 500 }}>Programmatic SEO Pages</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
          {programmatic.map((p) => (
            <li key={p.path} style={{ padding: '6px 0', fontSize: 13, color: '#8A8A8E' }}>
              {p.path} — {p.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
