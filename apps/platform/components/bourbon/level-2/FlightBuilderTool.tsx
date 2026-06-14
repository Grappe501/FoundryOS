'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FLIGHT_BUILDER_TEMPLATES, bottlesMatchingFilter, getFlightBuilderTemplate } from '../../../lib/bourbon-level-2/flight-builder';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialTemplateId?: string };

export function FlightBuilderTool({ initialTemplateId }: Props) {
  const defaultId = initialTemplateId ?? FLIGHT_BUILDER_TEMPLATES[0].id;
  const [templateId, setTemplateId] = useState(defaultId);
  const template = getFlightBuilderTemplate(templateId) ?? FLIGHT_BUILDER_TEMPLATES[0];

  const bottles = useMemo(() => bottlesMatchingFilter(template.filter), [template]);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Build custom flights from the 55-bottle catalog — filter by mash bill, category, price, proof, and tags. One variable per session.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {FLIGHT_BUILDER_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemplateId(t.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${templateId === t.id ? ACCENT : 'var(--foundry-border-subtle)'}`,
              background: templateId === t.id ? 'var(--foundry-surface-raised)' : 'var(--foundry-surface)',
              color: templateId === t.id ? ACCENT : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {t.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', margin: 0 }}>{template.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{template.description}</p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{bottles.length} bottle{bottles.length !== 1 ? 's' : ''} match</p>

        <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
          {bottles.map((b) => (
            <div key={b.slug} style={{ padding: '12px 14px', background: 'var(--foundry-surface-raised)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <Link href={`/bourbon/bottle/${b.slug}`} style={{ color: 'var(--foundry-text)', fontSize: 13, textDecoration: 'none' }}>
                  {b.name}
                </Link>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--foundry-text-faint)' }}>{b.mashbill} · {b.category.replace(/_/g, ' ')}</p>
              </div>
              <span style={{ fontSize: 12, color: 'var(--foundry-text-faint)' }}>${b.priceUsd} · {b.proof} proof</span>
            </div>
          ))}
        </div>

        {bottles.length > 0 && (
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            Pour these in Tasting Lab — copy slugs into a manual session or run closest preset flight.
            {' '}
            <Link href="/bourbon/tasting-lab" style={{ color: ACCENT }}>Open Tasting Lab →</Link>
          </p>
        )}
      </section>
    </div>
  );
}
