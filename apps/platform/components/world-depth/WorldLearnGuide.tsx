import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
  basePath: string;
  guideSlug: string;
};

export function WorldLearnGuide({ bundle, basePath, guideSlug }: Props) {
  const guide = bundle.seoGuides.find((g) => g.slug === guideSlug);
  if (!guide) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>
        <Link href={basePath} style={{ color: '#6B6B70' }}>
          {bundle.displayName}
        </Link>
        {' · '}
        <Link href={`${basePath}/learn`} style={{ color: '#6B6B70' }}>
          Guides
        </Link>
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>{guide.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>{guide.summary}</p>
      {guide.sections.map((section) => (
        <article key={section.heading} style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 16, color: bundle.accentColor, fontWeight: 400, margin: 0 }}>{section.heading}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{section.body}</p>
        </article>
      ))}
      <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link href={`${basePath}/missions`} style={{ color: bundle.accentColor, fontSize: 14 }}>
          Start a mission →
        </Link>
        <Link href={`${basePath}/glossary`} style={{ color: '#6B6B70', fontSize: 14 }}>
          Browse glossary →
        </Link>
      </div>
    </section>
  );
}

export function WorldLearnIndex({ bundle, basePath }: { bundle: WorldDepthBundle; basePath: string }) {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Guides</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>
        Starter guides to help you begin — plain language, no jargon walls.
      </p>
      {bundle.seoGuides.map((guide) => (
        <Link
          key={guide.slug}
          href={`${basePath}/learn/${guide.slug}`}
          style={{
            display: 'block',
            padding: '16px 0',
            borderBottom: '1px solid #1A1A1E',
            textDecoration: 'none',
            color: '#E8E8EC',
          }}
        >
          <p style={{ fontSize: 15, margin: 0 }}>{guide.title}</p>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>{guide.summary}</p>
        </Link>
      ))}
    </section>
  );
}
