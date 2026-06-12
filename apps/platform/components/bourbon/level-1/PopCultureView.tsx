'use client';

import { POP_CULTURE_SECTIONS } from '../../../lib/bourbon-level-1/wild/pop-culture';

const ACCENT = 'var(--foundry-primary)';

export function PopCultureView() {
  return (
    <div>
      {POP_CULTURE_SECTIONS.map((section) => (
        <section key={section.id} id={section.id} style={{ marginTop: 36, scrollMarginTop: 80 }}>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: '#E8E8EC', margin: 0 }}>{section.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>{section.intro}</p>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {section.entries.map((e) => (
              <article key={e.id} style={{ padding: 20, background: '#111114', borderRadius: 10, border: '1px solid #1A1A1E' }}>
                <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{e.medium}</p>
                <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 8 }}>{e.title}</p>
                <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{e.whyBourbon}</p>
                {e.brands && (
                  <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 10 }}>Brands / notes: {e.brands}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
