import Link from 'next/link';
import {
  EXPERT_DEVELOPMENT_PILLARS,
  getActivePaths,
  getNorthStarMetrics,
  getPathsForVertical,
  NORTH_STAR_QUESTION,
} from '@foundry/path-engine';

export default function PathsPage() {
  const northStar = getNorthStarMetrics();
  const bourbonPaths = getPathsForVertical('bourbon');
  const activePaths = getActivePaths();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Road to Expert</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        Expert Development — the real product. Encyclopedia is one component.
      </p>

      <section style={{ marginTop: 28, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>North Star</div>
        <p style={{ color: '#E8E8EC', marginTop: 8, fontSize: 15 }}>{NORTH_STAR_QUESTION}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 16 }}>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.active_paths}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Active Paths</div></div>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.users_on_paths}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Users on Paths</div></div>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.academy_graduates}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Academy Graduates</div></div>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.community_leaders}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Community Leaders</div></div>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.expert_contributors}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Expert Contributors</div></div>
          <div><div style={{ fontSize: 22, color: 'var(--foundry-primary)' }}>{northStar.club_hosts}</div><div style={{ fontSize: 11, color: '#6B6B70' }}>Club Hosts</div></div>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Expert Development Pillars</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {EXPERT_DEVELOPMENT_PILLARS.map((p) => (
            <span key={p} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#8A8A8E' }}>{p}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Bourbon Paths ({bourbonPaths.length})</h2>
        {bourbonPaths.map((p) => (
          <div key={p.slug} style={{ padding: '14px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <div style={{ color: '#E8E8EC' }}>{p.display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{p.tagline}</div>
            <div style={{ color: '#4A4A4E', fontSize: 11, marginTop: 4 }}>
              {p.milestones.length} milestones · {p.assembled_from.join(' + ')}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>All Paths ({activePaths.length} active / {northStar.total_paths_defined} defined)</h2>
        <p style={{ fontSize: 12, color: '#4A4A4E', marginTop: 8 }}>
          Movies, BBQ, Books paths reserved in catalog. No Bourbon UI until PASS-014.
        </p>
      </section>
    </main>
  );
}
