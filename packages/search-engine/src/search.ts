import type { SearchFilters, SearchResponse, SearchResult } from './types';

export type SearchIndexEntry = SearchResult;

export function searchIndex(entries: SearchIndexEntry[], filters: SearchFilters): SearchResponse {
  const q = filters.query.trim().toLowerCase();
  const limit = filters.limit ?? 40;

  let results = entries;

  if (filters.world_slug) {
    results = results.filter((r) => r.world_slug === filters.world_slug);
  }

  if (filters.student_safe_only || filters.audience === 'student_safe') {
    results = results.filter(
      (r) =>
        !r.audience_classification ||
        r.audience_classification === 'student_safe' ||
        r.audience_classification === 'teen_safe',
    );
  }

  if (filters.types?.length) {
    results = results.filter((r) => filters.types!.includes(r.type));
  }

  if (q) {
    results = results.filter((r) => {
      const hay = `${r.title} ${r.summary} ${(r.tags ?? []).join(' ')}`.toLowerCase();
      return q.split(/\s+/).every((token) => hay.includes(token));
    });
  }

  results = rankResults(results, q).slice(0, limit);

  const related_worlds = inferRelatedWorlds(results, entries);
  const learn_this_next = results.filter((r) => r.type === 'mission' || r.type === 'academy_lesson').slice(0, 5);

  return {
    query: filters.query,
    total: results.length,
    results,
    related_worlds,
    learn_this_next,
  };
}

function rankResults(results: SearchResult[], q: string): SearchResult[] {
  if (!q) return results;
  return [...results].sort((a, b) => score(b, q) - score(a, q));
}

function score(r: SearchResult, q: string): number {
  const title = r.title.toLowerCase();
  let s = 0;
  if (title === q) s += 100;
  if (title.startsWith(q)) s += 50;
  if (title.includes(q)) s += 20;
  if (r.type === 'world') s += 5;
  if (r.type === 'encyclopedia' || r.type === 'glossary_term') s += 3;
  return s;
}

function inferRelatedWorlds(
  results: SearchResult[],
  all: SearchResult[],
): { slug: string; name: string; reason: string }[] {
  const slugs = new Set(results.map((r) => r.world_slug).filter(Boolean) as string[]);
  const related = new Map<string, { slug: string; name: string; reason: string }>();

  for (const slug of slugs) {
    const worldHits = all.filter((e) => e.world_slug === slug && e.type === 'world');
    if (worldHits[0]) {
      related.set(slug, { slug, name: worldHits[0].title, reason: 'Matches your search' });
    }
  }

  return [...related.values()].slice(0, 4);
}

export function mergeSearchIndexes(...indexes: SearchIndexEntry[][]): SearchIndexEntry[] {
  const seen = new Set<string>();
  const out: SearchIndexEntry[] = [];
  for (const index of indexes) {
    for (const entry of index) {
      if (seen.has(entry.id)) continue;
      seen.add(entry.id);
      out.push(entry);
    }
  }
  return out;
}
