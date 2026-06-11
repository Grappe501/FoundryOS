import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
};

export function WorldCommunityDepth({ bundle }: Props) {
  const c = bundle.community;
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{c.name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        A community built around shared mastery — not passive scrolling.
      </p>

      <section style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>Member roles</h2>
        {c.memberRoles.map((role) => (
          <div key={role.role} style={{ marginTop: 16 }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{role.role}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{role.description}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 16, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>Weekly challenge</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{c.weeklyChallenge}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#E8E8EC', margin: 0 }}>Showcase format</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{c.showcaseFormat}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#E8E8EC', margin: 0 }}>Peer feedback loop</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{c.peerFeedbackLoop}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: '#0F0F12', borderRadius: 8, border: `1px solid ${bundle.accentColor}33` }}>
        <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>Mentor role</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{c.mentorRole}</p>
      </section>
    </section>
  );
}
