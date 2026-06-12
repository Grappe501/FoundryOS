import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { getWorldDepth } from '../../../lib/world-depth/registry';
import { termToSlug } from '../../../lib/search/build-index';
import { segmentCanAccessWorld } from '../../../lib/world-governance';
import type { UserSegment } from '../../../lib/world-governance';

type Props = { params: Promise<{ world: string }> };

export async function generateStaticParams() {
  const { ACTIVE_WORLD_SLUGS } = await import('../../../lib/world-depth/registry');
  return ACTIVE_WORLD_SLUGS.map((world) => ({ world }));
}

export async function generateMetadata({ params }: Props) {
  const { world } = await params;
  const bundle = getWorldDepth(world);
  if (!bundle) return { title: 'Encyclopedia | Foundry' };
  return {
    title: `${bundle.displayName} Encyclopedia | Foundry`,
    description: `Glossary and encyclopedia for ${bundle.displayName}.`,
  };
}

export default async function WorldEncyclopediaPage({ params }: Props) {
  const { world } = await params;
  const bundle = getWorldDepth(world);
  if (!bundle) notFound();

  const segment: UserSegment = 'adult';
  const access = segmentCanAccessWorld(segment, world);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <p style={{ color: bundle.accentColor, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Encyclopedia
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>{bundle.displayName}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12 }}>
          {bundle.glossary.length} terms · related concepts · where terms appear in missions
        </p>
        {!access.allowed && (
          <p style={{ color: '#B06B6B', fontSize: 13, marginTop: 12 }}>{access.reason}</p>
        )}
        <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
          {bundle.glossary.map((term) => (
            <Link
              key={term.term}
              href={`/${world}/encyclopedia/${termToSlug(term.term)}`}
              style={{
                display: 'block',
                padding: '14px 16px',
                background: '#111114',
                border: '1px solid #1A1A1E',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={{ color: '#E8E8EC', fontSize: 15 }}>{term.term}</span>
              <p style={{ color: '#8A8A8E', fontSize: 13, margin: '6px 0 0' }}>{term.definition}</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/${world}/glossary`} style={{ color: '#6B6B70', fontSize: 13 }}>Glossary view →</Link>
          <Link href={`/${world}/academy`} style={{ color: '#6B6B70', fontSize: 13 }}>Academy →</Link>
          <Link href="/search" style={{ color: '#6B9B6B', fontSize: 13 }}>Global search →</Link>
        </div>
      </section>
    </main>
  );
}
