import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAtlasEntry, getAtlasRabbitHole, listAtlasEntries } from '../../../../lib/bourbon-atlas/registry';
import { atlasTermHref } from '../../../../lib/bourbon-atlas/slug';

type Props = { params: Promise<{ term: string }> };

export async function generateStaticParams() {
  return listAtlasEntries().map((e) => ({ term: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { term } = await params;
  const entry = getAtlasEntry(term);
  if (!entry) return { title: 'Atlas | Bourbon' };
  return {
    title: `${entry.title} | The Atlas | Bourbon`,
    description: entry.shortDefinition,
  };
}

export default async function BourbonAtlasTermPage({ params }: Props) {
  const { term } = await params;
  const entry = getAtlasEntry(term);
  if (!entry) notFound();

  const rabbit = getAtlasRabbitHole(term);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <Link href="/bourbon/atlas" style={{ color: '#6B6B70', fontSize: 13 }}>← The Atlas</Link>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Level 1 HQ</Link>

      <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        The Atlas
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8 }}>{entry.title}</h1>
      <p style={{ color: '#E8E8EC', fontSize: 17, marginTop: 16, lineHeight: 1.7, fontWeight: 400 }}>{entry.shortDefinition}</p>

      <AtlasSection title="Plain English" body={entry.plainEnglish} />
      <AtlasSection title="Why it matters" body={entry.whyItMatters} accent />
      <AtlasSection title="History" body={entry.history} />
      <AtlasSection title="Taste, buying & collecting" body={entry.tasteBuyingCollecting} />
      <AtlasSection title="What beginners get wrong" body={entry.beginnerMisunderstanding} />

      {entry.examples.length > 0 && (
        <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-primary)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Examples</h2>
          <ul style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, paddingLeft: 18, lineHeight: 1.8 }}>
            {entry.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </section>
      )}

      {entry.geography && (
        <AtlasSection title="Geography & region" body={entry.geography} />
      )}

      {entry.relatedTerms.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#6B9B6B', fontWeight: 400 }}>Related terms</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {entry.relatedTerms.map((slug) => {
              const rel = getAtlasEntry(slug);
              if (!rel) return null;
              return (
                <Link
                  key={slug}
                  href={atlasTermHref(slug)}
                  style={{ padding: '6px 12px', background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 999, color: '#8A8A8E', fontSize: 12, textDecoration: 'none' }}
                >
                  {rel.title}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {entry.cousinIdeas.length > 0 && (
        <section style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Cousin ideas</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{entry.cousinIdeas.join(' · ')}</p>
        </section>
      )}

      <RabbitHoleSection title="Tools & games" links={rabbit.toolLinks} />
      <RabbitHoleSection title="Lessons" links={rabbit.lessonLinks} />
      <RabbitHoleSection title="Producer Atlas" links={rabbit.producerLinks} />
      <RabbitHoleSection title="Detective cases" links={rabbit.detectiveLinks} />
      <RabbitHoleSection title="Stories & lore" links={[...rabbit.storyLinks, ...rabbit.historyLinks]} />
      <RabbitHoleSection title="Geography" links={rabbit.geographyLinks} />

      {entry.forwardLinks.length > 0 && (
        <section style={{ marginTop: 28, padding: 20, background: '#0F1210', borderRadius: 8, border: '1px solid #2A3A2A' }}>
          <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Go next</h2>
          <ul style={{ margin: '14px 0 0', paddingLeft: 18, color: '#8A8A8E', fontSize: 13, lineHeight: 1.9 }}>
            {entry.forwardLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} style={{ color: '#6B9B6B' }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function AtlasSection({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <section style={{ marginTop: 24, maxWidth: 720 }}>
      <h2 style={{ fontSize: 13, color: accent ? 'var(--foundry-primary)' : '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        {title}
      </h2>
      <p style={{ color: '#C4C4C8', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{body}</p>
    </section>
  );
}

function RabbitHoleSection({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (links.length === 0) return null;
  return (
    <section style={{ marginTop: 20 }}>
      <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{ padding: '6px 12px', background: '#111114', borderRadius: 999, color: '#8A8A8E', fontSize: 12, textDecoration: 'none' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
