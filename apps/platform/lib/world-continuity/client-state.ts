/** Client continuity store (localStorage v1 — Supabase journey_events in PASS-035) */

import { detectNewMemoryUnlocks } from '@foundry/world-continuity-engine';

const KEY = 'foundry-world-continuity-state';

export type ContinuityClientState = {
  last_visit: Record<string, string>;
  atlas_views: { world_slug: string; term_slug: string; title: string; at: string }[];
  context_notes: { world_slug: string; text: string; at: string }[];
  intent_notes: { world_slug: string; text: string; at: string }[];
  memory_objects: { id: string; world_slug: string; unlocked_at: string }[];
};

function empty(): ContinuityClientState {
  return { last_visit: {}, atlas_views: [], context_notes: [], intent_notes: [], memory_objects: [] };
}

function read(): ContinuityClientState {
  if (typeof window === 'undefined') return empty();
  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) ?? 'null') };
  } catch {
    return empty();
  }
}

function write(state: ContinuityClientState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getContinuityState(): ContinuityClientState {
  return read();
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
