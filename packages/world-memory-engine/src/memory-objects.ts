import type { FirstMemoryDef } from './types';

/** Story memory for graph-era firsts — layered on continuity catalog */
export const FIRST_MEMORY_CATALOG: FirstMemoryDef[] = [
  {
    id: 'bourbon-first-graph',
    world_slug: 'bourbon',
    title: 'Your First Graph Hallway',
    story: 'You walked connections instead of scrolling lists — the shelf became a map.',
    timeline_title: 'First graph hallway explored',
  },
  {
    id: 'bourbon-first-compare',
    world_slug: 'bourbon',
    title: 'Your First Side-by-Side Compare',
    story: 'Two bottles, one frame — differences that ratings hide.',
    timeline_title: 'First bourbon comparison logged',
  },
  {
    id: 'bourbon-first-rabbit-hole',
    world_slug: 'bourbon',
    title: 'Your First Saved Rabbit Hole',
    story: 'You marked a thread to return to — curiosity with a bookmark.',
    timeline_title: 'First rabbit hole saved',
  },
  {
    id: 'bourbon-first-tasting',
    world_slug: 'bourbon',
    title: 'Your First Tasting Logged',
    story: 'The pour where vocabulary started to stick.',
    timeline_title: 'First tasting logged',
  },
];

export function detectGraphFirstUnlocks(
  worldSlug: string,
  existingFirsts: Record<string, string>,
  signals: {
    graph_views: number;
    comparisons: number;
    saved_rabbit_holes: number;
    missions_completed: number;
  },
): string[] {
  const has = (id: string) => id in existingFirsts;
  const ids: string[] = [];

  const rules: Record<string, () => boolean> = {
    'bourbon-first-graph': () => signals.graph_views >= 1,
    'bourbon-first-compare': () => signals.comparisons >= 1,
    'bourbon-first-rabbit-hole': () => signals.saved_rabbit_holes >= 1,
    'bourbon-first-tasting': () => signals.missions_completed >= 1,
  };

  for (const m of FIRST_MEMORY_CATALOG) {
    if (m.world_slug !== worldSlug) continue;
    if (has(m.id)) continue;
    if (rules[m.id]?.()) ids.push(m.id);
  }

  return ids;
}

export function resolveFirstMemories(
  worldSlug: string,
  firstUnlockTimes: Record<string, string>,
): FirstMemoryDef[] {
  return FIRST_MEMORY_CATALOG.filter((m) => m.world_slug === worldSlug && m.id in firstUnlockTimes);
}

export function resolveFirstMemoryObjects(
  worldSlug: string,
  firstUnlockTimes: Record<string, string>,
): import('@foundry/world-continuity-engine').UnlockedMemoryObject[] {
  return resolveFirstMemories(worldSlug, firstUnlockTimes).map((m) => ({
    id: m.id,
    world_slug: m.world_slug,
    title: m.title,
    story: m.story,
    unlocked_at: firstUnlockTimes[m.id] ?? new Date().toISOString(),
  }));
}
