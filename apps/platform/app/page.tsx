import Link from 'next/link';
import { getMissionControlStats, getPlatformAssetStory, PASSES } from '../lib/mission-control';

const statLabels: Record<string, string> = {
  topics_in_registry: 'Topics',
  total_entities: 'Entities',
  total_relationships: 'Relationships',
  total_collections: 'Collections',
  total_user_entity_relationships: 'Ownership Links',
  users_registered: 'Users',
  reviews_written: 'Reviews',
  estimated_seo_pages_published: 'SEO Pages Live',
};

export default function MissionControlHome() {
  const stats = getMissionControlStats();
  const assets = getPlatformAssetStory();
  const liveStats = Object.entries(statLabels).map(([key, label]) => ({
    label,
    value: stats[key as keyof typeof stats] as number,
  }));

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC' }}>
      <header style={{ borderBottom: '1px solid #1A1A1E', padding: '1.5rem 2rem' }}>
        <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
          Mission Control
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', margin: '4px 0 0' }}>FoundryOS</h1>
        <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
          Living platform headquarters — not a brochure
        </p>
      </header>

      <section style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            marginBottom: 24,
            padding: 16,
            background: '#0F0F12',
            border: '1px solid #2A2520',
            borderRadius: 8,
            fontSize: 14,
            color: '#8A8A8E',
          }}
        >
          <span style={{ color: '#C8A96E' }}>Platform Assets</span>
          {' — '}
          Topics: {assets.topics} · Entities: {assets.entities} · Relationships: {assets.relationships} · Collections: {assets.collections}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {liveStats.map((s) => (
            <div key={s.label} style={{ padding: '1rem', background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{s.value.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 12 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 500, margin: 0 }}>Current State</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 16, fontSize: 13 }}>
            <div><span style={{ color: '#6B6B70' }}>Version</span><br />{stats.version}</div>
            <div><span style={{ color: '#6B6B70' }}>Last Pass</span><br />{stats.last_pass}</div>
            <div><span style={{ color: '#6B6B70' }}>Next Pass</span><br />{stats.next_pass}</div>
            <div><span style={{ color: '#6B6B70' }}>Launch Readiness</span><br />{stats.launch_readiness_pct}%</div>
            <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#6B6B70' }}>Current Focus</span><br />{stats.current_focus}</div>
          </div>
        </div>

        <nav style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/passes" style={{ color: '#C8A96E', fontSize: 14 }}>Build Journal →</Link>
          <Link href="/investors" style={{ color: '#C8A96E', fontSize: 14 }}>Investors →</Link>
          <Link href="/verticals" style={{ color: '#C8A96E', fontSize: 14 }}>Vertical Domains →</Link>
          <Link href="/architecture" style={{ color: '#C8A96E', fontSize: 14 }}>Architecture →</Link>
        </nav>

        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, marginBottom: 16 }}>Recent Passes</h2>
          {PASSES.filter((p) => p.status === 'completed').map((p) => (
            <div key={p.code} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
              <span style={{ color: '#C8A96E' }}>{p.code}</span>
              <span style={{ color: '#8A8A8E', margin: '0 8px' }}>—</span>
              <span>{p.title}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
