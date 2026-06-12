import Link from 'next/link';
import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
  basePath: string;
};

export function WorldGlossaryDepth({ bundle, basePath }: Props) {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Glossary</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12 }}>
        {bundle.glossary.length} terms — plain language, why each matters, and examples you can use today.
      </p>
      <dl style={{ marginTop: 28 }}>
        {bundle.glossary.map((item) => (
          <div key={item.term} style={{ padding: '20px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <dt style={{ color: bundle.accentColor, fontSize: 15, fontWeight: 400 }}>{item.term}</dt>
            <dd style={{ color: 'var(--foundry-text)', fontSize: 13, margin: '8px 0 0', lineHeight: 1.6 }}>{item.definition}</dd>
            <dd style={{ color: 'var(--foundry-text-muted)', fontSize: 12, margin: '8px 0 0', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Why it matters:</strong> {item.whyItMatters}
            </dd>
            <dd style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '8px 0 0', lineHeight: 1.6 }}>
              <strong style={{ fontWeight: 400 }}>Example:</strong> {item.example}
            </dd>
            {item.relatedTerms.length > 0 && (
              <dd style={{ color: 'var(--foundry-text-dim)', fontSize: 11, margin: '8px 0 0' }}>
                Related: {item.relatedTerms.join(' · ')}
              </dd>
            )}
          </div>
        ))}
      </dl>
      <Link href={`${basePath}/missions`} style={{ display: 'inline-block', marginTop: 24, color: bundle.accentColor, fontSize: 14 }}>
        Use these in missions →
      </Link>
    </section>
  );
}
