import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BOURBON_STORIES, getStory } from '../../../../lib/bourbon-level-1/stories';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BOURBON_STORIES.map((s) => ({ slug: s.slug }));
}

export default async function BourbonStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/stories" style={{ color: '#6B6B70', fontSize: 13 }}>← All stories</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>{story.title}</h1>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>{story.subtitle}</p>
      <article style={{ marginTop: 28 }}>
        {story.paragraphs.map((p, i) => (
          <p key={i} style={{ color: '#8A8A8E', fontSize: 16, lineHeight: 1.75, marginTop: i === 0 ? 0 : 20 }}>{p}</p>
        ))}
      </article>
      {story.relatedProducer && (
        <Link href={`/bourbon/producers/${story.relatedProducer}`} style={{ display: 'inline-block', marginTop: 28, color: 'var(--foundry-primary)', fontSize: 14 }}>
          Related producer deep dive →
        </Link>
      )}
    </section>
  );
}
