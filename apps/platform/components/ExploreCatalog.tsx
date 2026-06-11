'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  EXPLORE_CATEGORY_FILTERS,
  EXPLORE_STATUS_COLORS,
  EXPLORE_STATUS_LABELS,
  getExplorePathHref,
  getExploreSectionsWithPaths,
  type ExploreCategoryFilter,
  type ExplorePath,
} from '../lib/explore-catalog';
import { trackPathClicked } from '../lib/validation-tracker';

function StatusBadge({ status }: { status: ExplorePath['status'] }) {
  const c = EXPLORE_STATUS_COLORS[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        color: c.text,
        padding: '4px 10px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 999,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot }} />
      {EXPLORE_STATUS_LABELS[status]}
    </span>
  );
}

function PathRow({ path }: { path: ExplorePath }) {
  const href = getExplorePathHref(path);

  return (
    <Link
      href={href}
      onClick={() => trackPathClicked(path.slug, '/explore', href)}
      style={{
        display: 'block',
        padding: '16px 18px',
        background: '#111114',
        border: '1px solid #1A1A1E',
        borderRadius: 8,
        textDecoration: 'none',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ color: '#E8E8EC', fontSize: 16, fontWeight: 400 }}>{path.name}</span>
            <StatusBadge status={path.status} />
          </div>
          <p style={{ color: '#8A8A8E', fontSize: 13, margin: '8px 0 0', lineHeight: 1.5 }}>{path.outcome}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#6B6B70' }}>
          <div>{path.tier}</div>
          {path.launch_rank != null && <div style={{ marginTop: 4 }}>Launch #{path.launch_rank}</div>}
        </div>
      </div>
      <p style={{ color: '#6B9B6B', fontSize: 12, marginTop: 12 }}>
        {path.status === 'live' || path.status === 'validating' || path.status === 'in_build'
          ? 'View path →'
          : 'Learn more →'}
      </p>
    </Link>
  );
}

export function ExploreCatalog() {
  const [category, setCategory] = useState<ExploreCategoryFilter>('all');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      ['life-leverage', 'foundry-student', 'ai-technology', 'finance-wealth'].map((id) => [id, true])
    )
  );

  const groups = useMemo(() => getExploreSectionsWithPaths(category), [category]);

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 28,
        }}
      >
        {EXPLORE_CATEGORY_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setCategory(f.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 999,
              border: `1px solid ${category === f.id ? '#2A4A2A' : '#1A1A1E'}`,
              background: category === f.id ? '#1A2A1A' : '#0F0F12',
              color: category === f.id ? '#E8E8EC' : '#8A8A8E',
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, color: '#6B6B70' }}>
        {(Object.keys(EXPLORE_STATUS_LABELS) as ExplorePath['status'][]).map((s) => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: EXPLORE_STATUS_COLORS[s].dot,
              }}
            />
            {EXPLORE_STATUS_LABELS[s]}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {groups.length === 0 ? (
          <p style={{ color: '#8A8A8E', fontSize: 14 }}>No paths in this category yet.</p>
        ) : (
          groups.map(({ section, paths }) => {
            const open = openSections[section.id] !== false;
            return (
              <section
                key={section.id}
                style={{
                  border: '1px solid #1A1A1E',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#0A0A0C',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '18px 20px',
                    background: '#0F0F12',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#E8E8EC',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 400 }}>{section.title}</span>
                    <span style={{ color: '#6B6B70', fontSize: 18 }}>{open ? '−' : '+'}</span>
                  </div>
                  {open && (
                    <p style={{ color: '#8A8A8E', fontSize: 13, margin: '10px 0 0', lineHeight: 1.5 }}>
                      {section.description}
                    </p>
                  )}
                </button>
                {open && (
                  <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {paths.map((path) => (
                      <PathRow key={path.slug} path={path} />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
