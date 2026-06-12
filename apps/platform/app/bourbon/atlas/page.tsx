import Link from 'next/link';
import { listAtlasEntries } from '../../../lib/bourbon-atlas/registry';
import { atlasTermHref } from '../../../lib/bourbon-atlas/slug';
import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';

export const metadata = {
  title: 'The Atlas | Bourbon | Foundry',
  description: 'The definitive map of bourbon — every industry word is a doorway to deep research.',
};

export default function BourbonAtlasIndexPage() {
  const entries = listAtlasEntries().sort((a, b) => a.title.localeCompare(b.title));
  const depth = getBourbonPageDepth('atlas');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 820, margin: '0 auto' }}>
      <Link href="/bourbon" style={{ color: '#6B6B70', fontSize: 13 }}>← Bourbon world</Link>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Level 1 HQ</Link>
      <Link href="/bourbon/glossary" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Quick glossary</Link>

      {depth ? (
        <BourbonDeepPageShell content={depth} />
      ) : (
        <>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
            PASS-034E · The Atlas
          </p>
          <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8 }}>The Atlas</h1>
          <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>
            Not a glossary — a map. Every unfamiliar word is a doorway to history, taste, buying, and the next rabbit hole.
          </p>
        </>
      )}

      <section style={{ marginTop: 32 }}>
        <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>{entries.length} entries</p>
        <div style={{ marginTop: 16, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {entries.map((e) => (
            <Link
              key={e.slug}
              href={atlasTermHref(e.slug)}
              style={{
                display: 'block',
                padding: 16,
                background: '#111114',
                borderRadius: 8,
                border: '1px solid #1A1A1E',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{e.title}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>{e.shortDefinition}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
