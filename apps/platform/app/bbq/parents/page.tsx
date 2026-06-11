import Link from 'next/link';
import { BBQ_PARENT_VIEW } from '../../../lib/bbq-world-meta';

export default function BbqParentsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{BBQ_PARENT_VIEW.headline}</h1>
      <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16, lineHeight: 1.6 }}>{BBQ_PARENT_VIEW.oneLiner}</p>
      {BBQ_PARENT_VIEW.sections.map((s) => (
        <article key={s.title} style={{ padding: 24, marginTop: 12, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 15, color: '#B06B50', margin: 0 }}>{s.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{s.body}</p>
        </article>
      ))}
      <Link href="/bbq/missions/first-pork-butt" style={{ display: 'inline-block', marginTop: 24, color: '#B06B50', fontSize: 14 }}>See Mission 1 →</Link>
    </section>
  );
}
