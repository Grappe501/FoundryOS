import Link from 'next/link';
import { getWorldAssets } from '../../lib/world-assets';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';
import { FOUNDRY_MISSION_LOOP_TEXT } from '../../lib/voice-loop';

export function WorldHeroExperience({ slug }: { slug: string }) {
  const config = getWorldExperienceConfig(slug);
  const assets = getWorldAssets(slug);
  if (!config) return null;

  const basePath = `/${slug}`;

  return (
    <>
      <section
        style={{
          marginTop: 16,
          padding: '40px 36px',
          background: assets.heroGradient,
          border: `1px solid ${assets.heroBorder}`,
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
          {config.frame} · {config.tierLabel}
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.75rem', marginTop: 14, lineHeight: 1.12, maxWidth: 640 }}>
          {config.identityPromise}
        </h1>
        <p style={{ color: '#C8C8CC', fontSize: 17, marginTop: 18, lineHeight: 1.65, maxWidth: 560 }}>{config.emotionalHook}</p>
        <p style={{ color: assets.accentMuted, fontSize: 14, marginTop: 14, fontStyle: 'italic', maxWidth: 520 }}>
          {config.secretPathLine}
        </p>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href={config.mission1Href}
            style={{
              padding: '16px 28px',
              background: assets.accent,
              borderRadius: 8,
              color: '#08080A',
              fontSize: 15,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            {config.startHereCta} →
          </Link>
          <Link
            href={`${basePath}/experiences`}
            style={{
              padding: '16px 28px',
              border: `1px solid ${assets.heroBorder}`,
              borderRadius: 8,
              color: '#E8E8EC',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Explore the craft
          </Link>
          <Link
            href={config.communityHref}
            style={{
              padding: '16px 28px',
              border: '1px solid #1A1A1E',
              borderRadius: 8,
              color: '#8A8A8E',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            See the circle
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <div style={{ padding: 20, background: assets.cardBg, borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <p style={{ color: '#6B6B70', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>What you will prove</p>
          <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, paddingLeft: 18, lineHeight: 1.8 }}>
            {config.collectProof.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href={`${basePath}/portfolio`} style={{ color: assets.accent, fontSize: 12, textDecoration: 'none', marginTop: 8, display: 'inline-block' }}>
            {config.portfolioLabel} →
          </Link>
        </div>
        <div style={{ padding: 20, background: assets.cardBg, borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <p style={{ color: '#6B6B70', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>The loop</p>
          <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 12, lineHeight: 1.7 }}>{FOUNDRY_MISSION_LOOP_TEXT}</p>
        </div>
        <div style={{ padding: 20, background: assets.cardBg, borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <p style={{ color: '#6B6B70', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Community preview</p>
          <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 12 }}>{config.community.weeklyChallenge}</p>
          <Link href={config.communityHref} style={{ color: assets.accent, fontSize: 12, textDecoration: 'none', marginTop: 8, display: 'inline-block' }}>
            Join the conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
