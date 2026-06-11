import Link from 'next/link';
import {
  buildIdentityShareCard,
  EXAMPLE_STEVE_IDENTITY,
  FOUNDRY_VISION_STATEMENT,
  VIRAL_SHARE_HOOK,
} from '@foundry/ownership-graph';

export default function IdentityPage() {
  const identity = EXAMPLE_STEVE_IDENTITY;
  const shareCard = buildIdentityShareCard(identity);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Foundry Identity</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        Not merely an account — identity follows you across every world.
      </p>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <div style={{ fontSize: 22, fontWeight: 300 }}>{identity.display_name}</div>
        {identity.region && <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{identity.region}</div>}
        <div style={{ marginTop: 16 }}>
          {identity.roles.map((r) => (
            <div key={`${r.vertical_slug}-${r.role}`} style={{ color: '#C8A96E', fontSize: 14, padding: '4px 0' }}>
              {r.role} <span style={{ color: '#6B6B70', fontSize: 11 }}>({r.vertical_slug})</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20, fontSize: 13, color: '#8A8A8E' }}>
          <div>Collections: <span style={{ color: '#E8E8EC' }}>{identity.collections_count}</span></div>
          <div>Reviews: <span style={{ color: '#E8E8EC' }}>{identity.reviews_count.toLocaleString()}</span></div>
          <div>Paths Completed: <span style={{ color: '#E8E8EC' }}>{identity.paths_completed}</span></div>
          <div>Projects Completed: <span style={{ color: '#E8E8EC' }}>{identity.projects_completed}</span></div>
          <div>People Mentored: <span style={{ color: '#E8E8EC' }}>{identity.people_mentored}</span></div>
          <div>Communities Led: <span style={{ color: '#E8E8EC' }}>{identity.communities_led}</span></div>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Current Projects</h2>
        {identity.active_projects.map((p) => (
          <div key={p.project_slug} style={{ padding: '14px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ fontSize: 14 }}>{p.display_name}</div>
            <div style={{ marginTop: 8, height: 6, background: '#1A1A1E', borderRadius: 3 }}>
              <div style={{ width: `${p.progress_pct}%`, height: '100%', background: '#8B7355', borderRadius: 3 }} />
            </div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{p.progress_pct}% Complete</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>What Are You Becoming?</h2>
        {identity.active_paths.map((p) => (
          <div key={p.path_slug} style={{ padding: '14px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ fontSize: 14 }}>{p.display_name}</div>
            <div style={{ marginTop: 8, height: 6, background: '#1A1A1E', borderRadius: 3 }}>
              <div style={{ width: `${p.progress_pct}%`, height: '100%', background: '#C8A96E', borderRadius: 3 }} />
            </div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{p.progress_pct}% Complete</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Viral Loop — {VIRAL_SHARE_HOOK}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          {shareCard.display_name} is becoming a {shareCard.primary_path?.display_name.replace('Road to ', '')} ({shareCard.primary_path?.progress_pct}%).
          Not what they ate or watched — what they are mastering.
        </p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0, lineHeight: 1.7 }}>{FOUNDRY_VISION_STATEMENT.headline}</p>
        {FOUNDRY_VISION_STATEMENT.lines.map((line) => (
          <p key={line} style={{ color: '#8A8A8E', fontSize: 14, margin: '8px 0 0', lineHeight: 1.6 }}>{line}</p>
        ))}
      </section>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        One Foundry app · One account · One identity graph · docs/FOUNDRY_IDENTITY.md
      </p>
    </main>
  );
}
