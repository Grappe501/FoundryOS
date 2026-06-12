'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { analyzeShelfIntelligence, slugsFromCollection } from '../../../lib/bourbon-level-1/intelligence/shelf-intelligence';
import { getCollection } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function ShelfIntelligencePanel() {
  const [mounted, setMounted] = useState(false);
  const [report, setReport] = useState<ReturnType<typeof analyzeShelfIntelligence> | null>(null);

  useEffect(() => {
    setMounted(true);
    const slugs = slugsFromCollection(getCollection());
    setReport(analyzeShelfIntelligence(slugs));
  }, []);

  if (!mounted || !report) return null;

  return (
    <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shelf intelligence</p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 10 }}>{report.summary}</p>
      <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
        {report.insights.map((ins) => (
          <article key={ins.headline} style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 10, textTransform: 'uppercase', margin: 0 }}>{ins.type.replace('-', ' ')}</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 8 }}>{ins.headline}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{ins.body}</p>
            {ins.href && (
              <Link href={ins.href} style={{ display: 'inline-block', marginTop: 10, color: ACCENT, fontSize: 13 }}>
                Explore →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
