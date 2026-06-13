'use client';

import Link from 'next/link';
import { WHISKEY_CATEGORY_ROWS, CATEGORY_COMPARE_PRESETS } from '../../../lib/bourbon-level-1/agency/whiskey-category-compare';
import { CompareCategoriesTool } from '../../../components/bourbon/level-1/CompareCategoriesTool';

export default function WhiskeyMapPageClient() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/compare?mode=categories" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
        ← Compare tools
      </Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>American Whiskey Map</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.75, marginTop: 10, maxWidth: 680 }}>
        Bourbon is one branch on a tree — rye, Tennessee whiskey, wheat whiskey, corn whiskey, single malt, and blends
        each have federal identity rules. This map is your label-literacy flight before you buy across categories.
      </p>

      <div
        style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 14,
        }}
      >
        {WHISKEY_CATEGORY_ROWS.map((row) => (
          <article
            key={row.slug}
            style={{
              padding: 18,
              borderRadius: 10,
              border: '1px solid var(--foundry-border-subtle)',
              background: 'var(--foundry-surface)',
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 400, color: 'var(--foundry-primary)', margin: 0 }}>{row.label}</h2>
            <p style={{ fontSize: 12, color: 'var(--foundry-text-faint)', marginTop: 8 }}>{row.grainRule} · {row.barrelRule}</p>
            <p style={{ fontSize: 13, color: 'var(--foundry-text-muted)', marginTop: 10, lineHeight: 1.65 }}>{row.typicalFlavor}</p>
            <p style={{ fontSize: 12, color: 'var(--foundry-text)', marginTop: 10 }}>{row.exampleBrands}</p>
            <p style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 10, fontStyle: 'italic' }}>{row.commonConfusion}</p>
            <Link href={row.atlasHref} style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: 'var(--foundry-primary)' }}>
              Atlas term →
            </Link>
          </article>
        ))}
      </div>

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--foundry-border-subtle)' }}>
        <h2 style={{ fontSize: 17, color: 'var(--foundry-text)', fontWeight: 400 }}>Compare categories side-by-side</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>
          Presets: {CATEGORY_COMPARE_PRESETS.map((p) => p.label).join(' · ')}
        </p>
        <div style={{ marginTop: 20 }}>
          <CompareCategoriesTool />
        </div>
      </section>
    </section>
  );
}
