import { headers } from 'next/headers';

export default async function SiteHomePage() {
  const headersList = await headers();
  const slug = headersList.get('x-foundry-site-slug') || 'unknown';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--foundry-bg, #0A0A0B)',
        color: 'var(--foundry-text, #F0F0F2)',
        fontFamily: 'var(--foundry-font-sans, system-ui, sans-serif)',
        padding: '2rem',
      }}
    >
      <p style={{ color: '#8A8A8E', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Standalone Site
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8, textTransform: 'capitalize' }}>
        {slug.replace(/-/g, ' ')}
      </h1>
      <p style={{ color: '#6B6B70', marginTop: 16, textAlign: 'center', maxWidth: 400 }}>
        Hostname-driven site engine. Admin provisions each app at {slug}.foundryos.app
      </p>
      <div style={{ marginTop: 24, padding: '12px 20px', border: '1px solid #2A2A2E', borderRadius: 8 }}>
        <span style={{ color: '#C8A96E', fontSize: 13 }}>Tier 1 Catalog</span>
        <span style={{ color: '#4A4A4E', margin: '0 8px' }}>→</span>
        <span style={{ color: '#8A8A8E', fontSize: 13 }}>$4 Personal</span>
        <span style={{ color: '#4A4A4E', margin: '0 8px' }}>→</span>
        <span style={{ color: '#8A8A8E', fontSize: 13 }}>$18 Expert</span>
      </div>
    </main>
  );
}
