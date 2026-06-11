import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorldAssets } from '../../lib/world-assets';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';
import { WorldImmersionModuleWorkbench } from './WorldImmersionModuleWorkbench';

export function WorldExperiencesIndex({ slug }: { slug: string }) {
  const config = getWorldExperienceConfig(slug);
  const assets = getWorldAssets(slug);
  if (!config) notFound();

  const basePath = `/${slug}`;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href={basePath} style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>
        ← {config.displayName}
      </Link>
      <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>Immersive tools</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Explore the craft</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Journals, labs, and worksheets — not lessons. Save work to your device; log evidence in your portfolio.
      </p>

      <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
        {config.modules.map((m) => (
          <Link
            key={m.slug}
            href={`${basePath}/experiences/${m.slug}`}
            style={{
              display: 'block',
              padding: 22,
              background: assets.cardBg,
              border: `1px solid ${assets.heroBorder}`,
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span style={{ color: '#6B6B70', fontSize: 10, textTransform: 'uppercase' }}>{m.category}</span>
            <h2 style={{ fontSize: 17, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{m.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{m.description}</p>
            <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 10 }}>~{m.estimatedMinutes} min</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function WorldExperienceModulePage({ slug, moduleSlug }: { slug: string; moduleSlug: string }) {
  const config = getWorldExperienceConfig(slug);
  const assets = getWorldAssets(slug);
  if (!config) notFound();
  const module = config.modules.find((m) => m.slug === moduleSlug);
  if (!module) notFound();

  return (
    <WorldImmersionModuleWorkbench worldSlug={slug} module={module} accent={assets.accent} basePath={`/${slug}`} />
  );
}
