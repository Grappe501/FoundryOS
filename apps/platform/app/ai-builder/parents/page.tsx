import Link from 'next/link';
import { AI_BUILDER_PARENT_VIEW } from '../../../lib/ai-builder-world';

export const metadata = { title: 'For Parents | AI Builder World' };

export default function ParentsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{AI_BUILDER_PARENT_VIEW.headline}</h1>
      <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16, lineHeight: 1.6, maxWidth: 640 }}>
        {AI_BUILDER_PARENT_VIEW.oneLiner}
      </p>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Foundry teaches real future-proof skills — not another online course. Here is what your child is doing inside AI
        Builder World.
      </p>
      <div style={{ marginTop: 28 }}>
        {AI_BUILDER_PARENT_VIEW.sections.map((section) => (
          <article key={section.title} style={{ padding: 24, marginBottom: 12, background: '#0F0F12', borderRadius: 8 }}>
            <h2 style={{ fontSize: 15, fontWeight: 400, color: '#6B9B6B', margin: 0 }}>{section.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{section.body}</p>
          </article>
        ))}
      </div>
      <section style={{ marginTop: 24, padding: 24, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>
          Ask your child to show you Mission 1 — a homework assistant they built themselves.
        </p>
        <Link href="/ai-builder/missions/homework-assistant" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 14 }}>
          See Mission 1 →
        </Link>
      </section>
    </section>
  );
}
