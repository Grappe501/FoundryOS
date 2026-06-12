import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WILD_TOPICS, getWildTopic } from '../../../../lib/bourbon-level-1/wild/wild-topics';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return WILD_TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function WildTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getWildTopic(slug);
  if (!topic) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: '#6B6B70', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12, lineHeight: 1.25 }}>{topic.title}</h1>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>{topic.hook}</p>

      {topic.myth && (
        <div style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8 }}>
          <p style={{ color: '#B88', fontSize: 13, margin: 0 }}>Common myth: {topic.myth}</p>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>{topic.truth}</p>
        </div>
      )}

      <article style={{ marginTop: 28 }}>
        {topic.paragraphs.map((p, i) => (
          <p key={i} style={{ color: '#8A8A8E', fontSize: 16, lineHeight: 1.75, marginTop: i === 0 ? 0 : 20 }}>{p}</p>
        ))}
      </article>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Rabbit holes</h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {topic.rabbitHoles.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              style={{
                display: 'block',
                padding: 16,
                background: '#111114',
                borderRadius: 8,
                textDecoration: 'none',
                border: '1px solid #1A1A1E',
              }}
            >
              <span style={{ color: '#E8E8EC', fontSize: 14 }}>{h.title}</span>
              <span style={{ display: 'block', color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{h.tease}</span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
