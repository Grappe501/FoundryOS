'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { searchPlatform } from '../../lib/search';
import type { SearchResult } from '@foundry/search-engine';
import { ACTIVE_WORLD_SLUGS } from '../../lib/world-depth/registry';

const TYPE_LABELS: Record<string, string> = {
  world: 'World',
  academy_lesson: 'Lesson',
  glossary_term: 'Glossary',
  encyclopedia: 'Encyclopedia',
  mission: 'Mission',
  tool: 'Tool',
  guide: 'Guide',
  incoming_world: 'Coming soon',
};

function ResultRow({ r }: { r: SearchResult }) {
  return (
    <Link
      href={r.href}
      style={{
        display: 'block',
        padding: '14px 16px',
        background: 'var(--foundry-surface-raised)',
        border: '1px solid var(--foundry-border-subtle)',
        borderRadius: 8,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--foundry-text)', fontSize: 15 }}>{r.title}</span>
        <span style={{ color: 'var(--foundry-text-faint)', fontSize: 11 }}>{TYPE_LABELS[r.type] ?? r.type}</span>
      </div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, margin: '8px 0 0', lineHeight: 1.5 }}>{r.summary}</p>
      {r.world_slug && (
        <p style={{ color: 'var(--foundry-success)', fontSize: 11, marginTop: 8 }}>{r.world_slug.replace(/-/g, ' ')}</p>
      )}
    </Link>
  );
}

export function GlobalSearchPanel() {
  const [query, setQuery] = useState('');
  const [worldFilter, setWorldFilter] = useState('');
  const [studentSafeOnly, setStudentSafeOnly] = useState(false);

  const response = useMemo(
    () =>
      searchPlatform({
        query,
        world_slug: worldFilter || undefined,
        student_safe_only: studentSafeOnly,
        limit: 30,
      }),
    [query, worldFilter, studentSafeOnly],
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
        <input
          type="search"
          placeholder="Search worlds, lessons, glossary, guides…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: '1 1 280px',
            padding: '12px 16px',
            background: 'var(--foundry-surface)',
            border: '1px solid var(--foundry-border)',
            borderRadius: 8,
            color: 'var(--foundry-text)',
            fontSize: 15,
          }}
        />
        <select
          value={worldFilter}
          onChange={(e) => setWorldFilter(e.target.value)}
          style={{
            padding: '12px 16px',
            background: 'var(--foundry-surface)',
            border: '1px solid var(--foundry-border)',
            borderRadius: 8,
            color: 'var(--foundry-text)',
            fontSize: 14,
          }}
        >
          <option value="">All worlds</option>
          {ACTIVE_WORLD_SLUGS.map((s) => (
            <option key={s} value={s}>
              {s.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--foundry-text-muted)', fontSize: 13 }}>
          <input
            type="checkbox"
            checked={studentSafeOnly}
            onChange={(e) => setStudentSafeOnly(e.target.checked)}
          />
          Student-safe only
        </label>
      </div>

      {response.related_worlds.length > 0 && query && (
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Related worlds</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {response.related_worlds.map((w) => (
              <Link
                key={w.slug}
                href={`/${w.slug}`}
                style={{
                  padding: '8px 14px',
                  background: '#0F1210',
                  border: '1px solid #2A3A2A',
                  borderRadius: 999,
                  color: 'var(--foundry-success)',
                  fontSize: 12,
                  textDecoration: 'none',
                }}
              >
                {w.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 28, display: 'grid', gap: 10 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, margin: 0 }}>
          {response.total} result{response.total === 1 ? '' : 's'}
          {query ? ` for “${query}”` : ''}
        </p>
        {response.results.map((r) => (
          <ResultRow key={r.id} r={r} />
        ))}
        {response.results.length === 0 && (
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14 }}>Try a world name, glossary term, or lesson topic.</p>
        )}
      </section>

      {response.learn_this_next.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', fontWeight: 400 }}>Learn this next</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {response.learn_this_next.map((r) => (
              <ResultRow key={`next-${r.id}`} r={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
