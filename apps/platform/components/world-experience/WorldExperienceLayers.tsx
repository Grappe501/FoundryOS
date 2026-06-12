import Link from 'next/link';
import { getWorldAssets } from '../../lib/world-assets';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

export function WorldExperienceLayers({ slug }: { slug: string }) {
  const config = getWorldExperienceConfig(slug);
  const assets = getWorldAssets(slug);
  if (!config) return null;

  const basePath = `/${slug}`;

  return (
    <>
      <section style={{ marginTop: 32 }}>
        <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Start here</p>
        <h2 style={{ fontSize: 20, fontWeight: 400, marginTop: 8, color: 'var(--foundry-text)' }}>Mission 1 — useful even if you stop here</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.7, maxWidth: 560 }}>{config.mission1Premium.aboutToDo}</p>
        <Link
          href={config.mission1Href}
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '12px 20px',
            background: assets.accentMuted,
            borderRadius: 6,
            color: 'var(--foundry-text)',
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          {config.mission1Premium.enterCta} →
        </Link>
      </section>

      <section style={{ marginTop: 36 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Keep going</p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: 'var(--foundry-text)' }}>Explore the craft</h2>
        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {config.exploreCraft.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: 18,
                background: assets.cardBg,
                border: '1px solid var(--foundry-border-subtle)',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{item.title}</p>
              <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Go deeper</p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: 'var(--foundry-text)' }}>Tools & journals</h2>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {config.modules.slice(0, 4).map((m) => (
            <Link
              key={m.slug}
              href={`${basePath}/experiences/${m.slug}`}
              style={{
                padding: 16,
                background: 'var(--foundry-surface-raised)',
                border: '1px solid var(--foundry-border-subtle)',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={{ color: 'var(--foundry-text-faint)', fontSize: 10, textTransform: 'uppercase' }}>{m.category}</span>
              <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 6 }}>{m.title}</p>
            </Link>
          ))}
        </div>
        <Link href={`${basePath}/experiences`} style={{ display: 'inline-block', marginTop: 12, color: assets.accent, fontSize: 13, textDecoration: 'none' }}>
          All {config.modules.length} tools →
        </Link>
      </section>

      <section style={{ marginTop: 36, padding: 24, background: assets.cardBg, borderRadius: 8, border: `1px solid ${assets.heroBorder}` }}>
        <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Community challenges</p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 10, color: 'var(--foundry-text)' }}>What people are working on</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 14, paddingLeft: 18, lineHeight: 1.9 }}>
          {config.community.workingOn.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 16 }}>{config.community.firstContributionCta}</p>
        <Link href={config.communityHref} style={{ display: 'inline-block', marginTop: 12, color: assets.accent, fontSize: 14, textDecoration: 'none' }}>
          Enter the circle →
        </Link>
      </section>

      <section style={{ marginTop: 36 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Advanced craft</p>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={`${basePath}/academy`} style={{ padding: '10px 16px', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 13, textDecoration: 'none' }}>
            Academy
          </Link>
          <Link href={`${basePath}/glossary`} style={{ padding: '10px 16px', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 13, textDecoration: 'none' }}>
            Glossary
          </Link>
          <Link href={`${basePath}/missions`} style={{ padding: '10px 16px', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 13, textDecoration: 'none' }}>
            All missions
          </Link>
          <Link href={`${basePath}/learn`} style={{ padding: '10px 16px', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 13, textDecoration: 'none' }}>
            Guides
          </Link>
        </div>
      </section>
    </>
  );
}
