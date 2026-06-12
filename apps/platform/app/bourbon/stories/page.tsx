import Link from 'next/link';
import { BOURBON_STORIES } from '../../../lib/bourbon-level-1/stories';

export const metadata = { title: 'Bourbon History Stories | Foundry' };

export default function BourbonStoriesPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>History stories</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>Narrative rabbit holes — not encyclopedia entries.</p>
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {BOURBON_STORIES.map((s) => (
          <Link
            key={s.slug}
            href={`/bourbon/stories/${s.slug}`}
            style={{ display: 'block', padding: 20, background: '#111114', borderRadius: 10, textDecoration: 'none', color: 'inherit', border: '1px solid #1A1A1E' }}
          >
            <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{s.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{s.subtitle} · {s.readMinutes} min read</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
