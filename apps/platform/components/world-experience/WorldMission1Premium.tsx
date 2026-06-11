import { getWorldAssets } from '../../lib/world-assets';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

export function WorldMission1Premium({ slug }: { slug: string }) {
  const config = getWorldExperienceConfig(slug);
  const assets = getWorldAssets(slug);
  if (!config) return null;

  const p = config.mission1Premium;

  return (
    <section style={{ marginTop: 24, padding: 28, background: assets.cardBg, borderRadius: 10, border: `1px solid ${assets.heroBorder}` }}>
      <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Mission 1 guide</p>
      <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 10, color: '#E8E8EC' }}>What you are about to do</h2>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{p.aboutToDo}</p>

      <h3 style={{ fontSize: 14, fontWeight: 400, marginTop: 24, color: assets.accent }}>Why it matters</h3>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.7 }}>{p.whyItMatters}</p>

      <h3 style={{ fontSize: 14, fontWeight: 400, marginTop: 24, color: assets.accent }}>What you need</h3>
      <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
        {p.toolsNeeded.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>20-minute version</p>
          <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{p.quickVersion}</p>
        </div>
        <div style={{ padding: 16, background: '#0F0F12', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>60-minute version</p>
          <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{p.fullVersion}</p>
        </div>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 400, marginTop: 24, color: assets.accent }}>What to submit</h3>
      <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8 }}>{p.submitArtifact}</p>
      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Portfolio: {p.portfolioArtifact}</p>

      <h3 style={{ fontSize: 14, fontWeight: 400, marginTop: 24, color: assets.accent }}>Debrief</h3>
      <p style={{ color: '#8A8A8E', fontSize: 13, fontStyle: 'italic', marginTop: 8 }}>{p.debriefPrompt}</p>

      <p style={{ color: assets.accent, fontSize: 13, marginTop: 24 }}>Tomorrow: {p.tomorrowStep}</p>
    </section>
  );
}
