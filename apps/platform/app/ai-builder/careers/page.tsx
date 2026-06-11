import Link from 'next/link';
import { AI_BUILDER_CAREERS } from '../../../lib/ai-builder-world';

export const metadata = { title: 'Careers | AI Builder World' };

export default function CareersPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>What careers use this?</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Every major page in AI Builder World answers this question. AI Builder skills transfer — the portfolio proves it.
      </p>
      <div style={{ marginTop: 28 }}>
        {AI_BUILDER_CAREERS.map((career) => (
          <article key={career.title} style={{ padding: 20, marginBottom: 10, background: '#0F0F12', borderRadius: 8 }}>
            <h2 style={{ fontSize: 15, fontWeight: 400, color: '#E8E8EC', margin: 0 }}>{career.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{career.connection}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 24, fontSize: 13, color: '#6B6B70' }}>
        How does this help you become future-proof? Every career above is being rewritten by AI — builders lead the
        rewrite.
      </p>
      <Link href="/future-proof" style={{ color: '#6B9B6B', fontSize: 14 }}>
        Take the Future-Proof Assessment →
      </Link>
    </section>
  );
}
