'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { analyzeShelfIntelligence, slugsFromCollection } from '../../../lib/bourbon-level-1/intelligence/shelf-intelligence';
import { getCollection } from '../../../lib/bourbon-level-1/storage';

const ACCENT = '#C8A96E';

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
    <section style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shelf intelligence</p>
      <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 10 }}>{report.summary}</p>
      <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
        {report.insights.map((ins) => (
          <article key={ins.headline} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
            <p style={{ color: '#6B6B70', fontSize: 10, textTransform: 'uppercase', margin: 0 }}>{ins.type.replace('-', ' ')}</p>
            <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8 }}>{ins.headline}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{ins.body}</p>
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
