import Link from 'next/link';
import { CIVIC_ENGAGEMENT_COMMUNITY } from '../../../lib/civic-engagement-world';

export default function CivicEngagementCommunityPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{CIVIC_ENGAGEMENT_COMMUNITY.name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Shared mastery — members, projects, and evidence. Not just social.
      </p>
      {CIVIC_ENGAGEMENT_COMMUNITY.features.map((f) => (
        <article key={f.title} style={{ padding: 20, marginTop: 12, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <h2 style={{ fontSize: 15, color: '#6B9B6B', margin: 0 }}>{f.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{f.description}</p>
        </article>
      ))}
      <Link href="/civic-engagement/missions/research-ballot" style={{ display: 'inline-block', marginTop: 24, color: '#6B9B6B', fontSize: 14 }}>Start with Mission 1 →</Link>
    </section>
  );
}
