/** localStorage v1 — world memory (graph, compare, rabbit holes, firsts) */

import { detectGraphFirstUnlocks } from '@foundry/world-memory-engine';
import { detectNewMemoryUnlocks } from '@foundry/world-continuity-engine';
import type { WorldMemorySignals } from '@foundry/world-memory-engine';

const KEY = 'foundry-world-memory-v1';
const LEGACY_KEY = 'foundry-world-continuity-state';

export type WorldMemoryV1 = {
  version: 1;
  last_visit: Record<string, string>;
  atlas_views: { world_slug: string; term_slug: string; title: string; at: string }[];
  context_notes: { world_slug: string; text: string; at: string }[];
  intent_notes: { world_slug: string; text: string; at: string }[];
  memory_objects: { id: string; world_slug: string; unlocked_at: string }[];
  graph_views: { world_slug: string; slug: string; title: string; at: string }[];
  saved_rabbit_holes: { world_slug: string; slug: string; title: string; at: string }[];
  comparisons: {
    world_slug: string;
    slug_a: string;
    slug_b: string;
    label_a: string;
    label_b: string;
    mode: 'bottles' | 'producers';
    at: string;
  }[];
  first_unlock_times: Record<string, string>;
};

function empty(): WorldMemoryV1 {
  return {
    version: 1,
    last_visit: {},
    atlas_views: [],
    context_notes: [],
    intent_notes: [],
    memory_objects: [],
    graph_views: [],
    saved_rabbit_holes: [],
    comparisons: [],
    first_unlock_times: {},
  };
}

function migrateLegacy(raw: Record<string, unknown>): Partial<WorldMemoryV1> {
  if (!raw || typeof raw !== 'object') return {};
  return {
    last_visit: (raw.last_visit as WorldMemoryV1['last_visit']) ?? {},
    atlas_views: (raw.atlas_views as WorldMemoryV1['atlas_views']) ?? [],
    context_notes: (raw.context_notes as WorldMemoryV1['context_notes']) ?? [],
    intent_notes: (raw.intent_notes as WorldMemoryV1['intent_notes']) ?? [],
    memory_objects: (raw.memory_objects as WorldMemoryV1['memory_objects']) ?? [],
  };
}

function read(): WorldMemoryV1 {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return { ...empty(), ...JSON.parse(raw) };
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const merged = { ...empty(), ...migrateLegacy(JSON.parse(legacy)) };
      write(merged);
      return merged;
    }
    return empty();
  } catch {
    return empty();
  }
}

function write(state: WorldMemoryV1) {
  localStorage.setItem(KEY, JSON.stringify(state));
  void import('../personal-database/sync-client').then(({ scheduleMemoryStateSync }) =>
    scheduleMemoryStateSync(state),
  );
}

export function replaceMemoryState(state: WorldMemoryV1) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getMemoryState(): WorldMemoryV1 {
  return read();
}

export function getMemorySignalsForWorld(worldSlug: string): WorldMemorySignals {
  const s = read();
  return {
    graph_views: s.graph_views.filter((g) => g.world_slug === worldSlug),
    saved_rabbit_holes: s.saved_rabbit_holes.filter((h) => h.world_slug === worldSlug),
    comparisons: s.comparisons.filter((c) => c.world_slug === worldSlug),
    first_unlock_times: s.first_unlock_times,
  };
}

export function getAllMemorySignals(): WorldMemorySignals {
  const s = read();
  return {
    graph_views: s.graph_views,
    saved_rabbit_holes: s.saved_rabbit_holes,
    comparisons: s.comparisons,
    first_unlock_times: s.first_unlock_times,
  };
}

export function recordWorldVisit(worldSlug: string) {
  const s = read();
  s.last_visit[worldSlug] = new Date().toISOString();
  write(s);
}

export function recordAtlasView(worldSlug: string, termSlug: string, title: string) {
  const s = read();
  s.atlas_views = [{ world_slug: worldSlug, term_slug: termSlug, title, at: new Date().toISOString() }, ...s.atlas_views].slice(0, 50);
  write(s);
}

export function recordContextNote(worldSlug: string, text: string) {
  const s = read();
  s.context_notes = [{ world_slug: worldSlug, text, at: new Date().toISOString() }, ...s.context_notes].slice(0, 30);
  write(s);
}

export function recordIntentNote(worldSlug: string, text: string) {
  const s = read();
  s.intent_notes = [{ world_slug: worldSlug, text, at: new Date().toISOString() }, ...s.intent_notes].slice(0, 30);
  write(s);
}

export function recordGraphView(worldSlug: string, slug: string, title: string) {
  const s = read();
  const at = new Date().toISOString();
  s.graph_views = [{ world_slug: worldSlug, slug, title, at }, ...s.graph_views.filter((g) => !(g.world_slug === worldSlug && g.slug === slug))].slice(0, 40);
  syncFirstUnlocks(worldSlug, s);
  write(s);
  void import('../personal-database/sync-client').then(({ persistGraphTraversalToCloud }) =>
    persistGraphTraversalToCloud({
      world_slug: worldSlug,
      node_slug: slug,
      node_title: title,
      node_type: 'graph',
      source: 'graph',
      entered_at: at,
    }),
  );
}

export function recordSavedRabbitHole(worldSlug: string, slug: string, title: string) {
  const s = read();
  const at = new Date().toISOString();
  s.saved_rabbit_holes = [{ world_slug: worldSlug, slug, title, at }, ...s.saved_rabbit_holes.filter((h) => !(h.world_slug === worldSlug && h.slug === slug))].slice(0, 20);
  syncFirstUnlocks(worldSlug, s);
  write(s);
}

export function recordComparison(
  worldSlug: string,
  slugA: string,
  slugB: string,
  labelA: string,
  labelB: string,
  mode: 'bottles' | 'producers' = 'bottles',
) {
  const s = read();
  const at = new Date().toISOString();
  s.comparisons = [{ world_slug: worldSlug, slug_a: slugA, slug_b: slugB, label_a: labelA, label_b: labelB, mode, at }, ...s.comparisons].slice(0, 30);
  syncFirstUnlocks(worldSlug, s);
  write(s);
}

function syncFirstUnlocks(worldSlug: string, s: WorldMemoryV1) {
  const graphCount = s.graph_views.filter((g) => g.world_slug === worldSlug).length;
  const compareCount = s.comparisons.filter((c) => c.world_slug === worldSlug).length;
  const holeCount = s.saved_rabbit_holes.filter((h) => h.world_slug === worldSlug).length;
  const missionCount = s.memory_objects.filter((m) => m.world_slug === worldSlug && m.id.includes('mission')).length;

  const newIds = detectGraphFirstUnlocks(worldSlug, s.first_unlock_times, {
    graph_views: graphCount,
    comparisons: compareCount,
    saved_rabbit_holes: holeCount,
    missions_completed: missionCount,
  });

  const now = new Date().toISOString();
  for (const id of newIds) {
    s.first_unlock_times[id] = now;
  }
}

export function syncMemoryObjects(
  worldSlug: string,
  signals: {
    missions_completed: number;
    events_completed: number;
    collection_items_unlocked: number;
    detective_cases_closed: number;
  },
) {
  const s = read();
  const existing = s.memory_objects.map((m) => m.id);
  const newIds = detectNewMemoryUnlocks(worldSlug, existing, signals);
  if (newIds.length === 0) return;
  const now = new Date().toISOString();
  for (const id of newIds) {
    s.memory_objects.push({ id, world_slug: worldSlug, unlocked_at: now });
  }
  syncFirstUnlocks(worldSlug, s);
  write(s);
}

export function getMemoryObjectIds(worldSlug?: string): { id: string; unlocked_at: string }[] {
  const s = read();
  const list = worldSlug ? s.memory_objects.filter((m) => m.world_slug === worldSlug) : s.memory_objects;
  return list.map((m) => ({ id: m.id, unlocked_at: m.unlocked_at }));
}

export function getLastVisit(worldSlug: string): string | undefined {
  return read().last_visit[worldSlug];
}

export function getAtlasViewsForWorld(worldSlug: string) {
  return read().atlas_views.filter((v) => v.world_slug === worldSlug);
}

export function getLatestContext(worldSlug: string) {
  return read().context_notes.find((n) => n.world_slug === worldSlug);
}

export function getLatestIntent(worldSlug: string) {
  return read().intent_notes.find((n) => n.world_slug === worldSlug);
}

/** @deprecated use getMemoryState */
export type ContinuityClientState = WorldMemoryV1;

export function getContinuityState(): WorldMemoryV1 {
  return getMemoryState();
}
