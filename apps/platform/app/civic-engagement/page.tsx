import Link from 'next/link';
import { CIVIC_ENGAGEMENT_COMMUNITY, CIVIC_ENGAGEMENT_CORE_PROMISE, CIVIC_ENGAGEMENT_LOOP, CIVIC_ENGAGEMENT_MISSIONS } from '../../lib/civic-engagement-world';

export const metadata = {
  title: 'Civic Engagement World | Foundry',
  description: CIVIC_ENGAGEMENT_CORE_PROMISE,
};

export default function CivicEngagementWorldPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <section style={{ padding: 32, background: '#0F0F12', border: '1px solid #2A4A2A', borderRadius: 8 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Improve Your Community · Life Leverage
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Civic Engagement World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>{CIVIC_ENGAGEMENT_CORE_PROMISE}</p>
        <p style={{ color: '#6B9B6B', fontSize: 14, marginTop: 16 }}>Outcome: Become an Informed Citizen</p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/civic-engagement/missions/research-ballot" style={{ padding: '14px 24px', background: '#2A4A2A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
            Start Mission 1 →
          </Link>
          <Link href="/civic-engagement/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
          <Link href="/civic-engagement/community" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            Civic Circle
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>How Foundry works</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          {CIVIC_ENGAGEMENT_LOOP.map((item, i) => (
            <span key={item.step}>{i > 0 ? ' → ' : ''}{item.step}</span>
          ))}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Missions</h2>
        {CIVIC_ENGAGEMENT_MISSIONS.map((m) => (
          <Link key={m.slug} href={`/civic-engagement/missions/${m.slug}`} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #1A1A1E', textDecoration: 'none', color: '#E8E8EC', fontSize: 14 }}>
            Mission {m.number}: {m.title}
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>{CIVIC_ENGAGEMENT_COMMUNITY.name}</h2>
        {CIVIC_ENGAGEMENT_COMMUNITY.features.map((f) => (
          <p key={f.title} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{f.title}</strong> — {f.description}
          </p>
        ))}
      </section>


      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/explore/civic-engagement" style={{ color: '#6B6B70' }}>Explore path</Link>
        {' · '}
        <Link href="/civic-engagement/learn" style={{ color: '#6B6B70' }}>Guides</Link>
      </p>
    </section>
  );
}
