import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConsumerNav } from '../../../../components/ConsumerNav';
import { getWorldDepth } from '../../../../lib/world-depth/registry';
import { termToSlug } from '../../../../lib/search/build-index';
import { recommendWorlds } from '@foundry/recommendation-engine';
import { getEncyclopediaAuthorityLinks } from '../../../../lib/living-worlds/encyclopedia-authority';
import { RabbitHolePanel } from '../../../../components/living-worlds/RabbitHolePanel';

type Props = { params: Promise<{ world: string; term: string }> };

export async function generateStaticParams() {
  const { WORLD_DEPTH_BUNDLES } = await import('../../../../lib/world-depth/registry');
  return WORLD_DEPTH_BUNDLES.flatMap((b) =>
    b.glossary.map((t) => ({ world: b.slug, term: termToSlug(t.term) })),
  );
}

export default async function EncyclopediaTermPage({ params }: Props) {
  const { world, term } = await params;
  const bundle = getWorldDepth(world);
  if (!bundle) notFound();

  const entry = bundle.glossary.find((t) => termToSlug(t.term) === term);
  if (!entry) notFound();

  const relatedWorlds = recommendWorlds({
    current_world: world,
    user_segment: 'adult',
    pricing_tier: 'free',
  });

  const lessonHits = bundle.academyLessons.filter(
    (l) =>
      l.title.toLowerCase().includes(entry.term.toLowerCase()) ||
      (l.glossaryTerms ?? []).some((g) => g.toLowerCase() === entry.term.toLowerCase()),
  );

  const authority = getEncyclopediaAuthorityLinks(world, entry.term);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <Link href={`/${world}/encyclopedia`} style={{ color: '#6B6B70', fontSize: 13 }}>
          ← {bundle.displayName} encyclopedia
        </Link>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>{entry.term}</h1>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>{entry.definition}</p>

        <article style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 13, color: '#6B6B70', margin: 0 }}>Why it matters</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{entry.whyItMatters}</p>
        </article>

        <article style={{ marginTop: 16, padding: 20, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 13, color: '#6B6B70', margin: 0 }}>Example</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{entry.example}</p>
        </article>

        {entry.relatedTerms.length > 0 && (
          <section style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Related concepts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {entry.relatedTerms.map((rt) => (
                <Link
                  key={rt}
                  href={`/${world}/encyclopedia/${termToSlug(rt)}`}
                  style={{ padding: '6px 12px', background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 999, color: '#8A8A8E', fontSize: 12, textDecoration: 'none' }}
                >
                  {rt}
                </Link>
              ))}
            </div>
          </section>
        )}

        {lessonHits.length > 0 && (
          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: '#6B9B6B' }}>Where this appears in academy</h2>
            <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, paddingLeft: 18 }}>
              {lessonHits.map((l) => (
                <li key={l.slug}>
                  <Link href={`/${world}/academy/${l.slug}`} style={{ color: '#6B9BC9' }}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(authority.missions.length > 0 || authority.producers.length > 0) && (
          <section style={{ marginTop: 28, padding: 20, background: '#0F1210', borderRadius: 8, border: '1px solid #2A3A2A' }}>
            <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Authority layer — go deeper</h2>
            {authority.missions.length > 0 && (
              <>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 14, marginBottom: 8 }}>Missions</p>
                <ul style={{ color: '#8A8A8E', fontSize: 13, paddingLeft: 18, margin: 0 }}>
                  {authority.missions.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} style={{ color: '#6B9B6B' }}>{m.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {authority.producers.length > 0 && (
              <>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 14, marginBottom: 8 }}>Producer atlas</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {authority.producers.map((p) => (
                    <Link key={p.href} href={p.href} style={{ padding: '6px 12px', background: '#111114', borderRadius: 999, color: '#C8A96E', fontSize: 12, textDecoration: 'none' }}>
                      {p.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
            <Link href={authority.communityHref} style={{ display: 'inline-block', marginTop: 16, color: '#8A8A8E', fontSize: 13 }}>
              Community discussions →
            </Link>
          </section>
        )}

        {authority.relatedWorlds.length > 0 && (
          <section style={{ marginTop: 20 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BD4' }}>Cross-world paths</h2>
            <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
              {authority.relatedWorlds.map((w) => (
                <Link key={w.href} href={w.href} style={{ padding: 12, background: '#0F0F12', borderRadius: 6, textDecoration: 'none', color: '#8A8A8E', fontSize: 13 }}>
                  <span style={{ color: '#E8E8EC' }}>{w.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedWorlds.length > 0 && (
          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, color: '#6B6B70' }}>Related worlds</h2>
            <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
              {relatedWorlds.slice(0, 3).map((w) => (
                <Link key={w.world_slug} href={w.href} style={{ padding: 12, background: '#0F0F12', borderRadius: 6, textDecoration: 'none', color: '#8A8A8E', fontSize: 13 }}>
                  <span style={{ color: '#E8E8EC' }}>{w.world_name}</span> — {w.reason}
                </Link>
              ))}
            </div>
          </section>
        )}

        <RabbitHolePanel term={entry.term} accent="#C8A96E" />
      </section>
    </main>
  );
}
