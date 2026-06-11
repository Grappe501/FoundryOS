import Link from 'next/link';
import { AI_BUILDER_GLOSSARY } from '../../../lib/ai-builder-world';

export const metadata = { title: 'Glossary | AI Builder World' };

export default function GlossaryPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Glossary</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>
        Terms you will use in missions and playground — plain language, no jargon walls.
      </p>
      <dl style={{ marginTop: 28 }}>
        {AI_BUILDER_GLOSSARY.map((item) => (
          <div key={item.term} style={{ padding: '16px 0', borderBottom: '1px solid #1A1A1E' }}>
            <dt style={{ color: '#6B9B6B', fontSize: 14, fontWeight: 400 }}>{item.term}</dt>
            <dd style={{ color: '#8A8A8E', fontSize: 13, margin: '8px 0 0', lineHeight: 1.6 }}>{item.definition}</dd>
          </div>
        ))}
      </dl>
      <Link href="/ai-builder/missions" style={{ display: 'inline-block', marginTop: 24, color: '#6B9B6B', fontSize: 14 }}>
        Use these in Mission 1 →
      </Link>
    </section>
  );
}
