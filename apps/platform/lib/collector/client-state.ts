/** Client-side collector state (localStorage v1 — Supabase sync in PASS-035) */

import type { CollectorEvent, CollectorStore, CollectionProgressView } from '@foundry/collector-engine';
import {
  applyActionToStore,
  applyCollectorEvents,
  emptyStore,
  getAllCollectionViews,
  getWorldCollectionViews,
} from '@foundry/collector-engine';

const KEY = 'foundry-collector-state';

function read(): CollectorStore {
  if (typeof window === 'undefined') return emptyStore();
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? emptyStore();
  } catch {
    return emptyStore();
  }
}

function write(store: CollectorStore) {
  localStorage.setItem(KEY, JSON.stringify(store));
  void import('../personal-database/sync-client').then(({ scheduleCollectorStateSync }) =>
    scheduleCollectorStateSync(store),
  );
}

export function replaceCollectorStore(store: CollectorStore) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function getCollectorStore(): CollectorStore {
  return read();
}

export function getWorldCollections(worldSlug: string): CollectionProgressView[] {
  return getWorldCollectionViews(worldSlug, read());
}

export function getAllCollections(): CollectionProgressView[] {
  return getAllCollectionViews(read());
}

export function getRecentCollectorEvents(limit = 8): CollectorEvent[] {
  return read().recent_events.slice(0, limit);
}

export function applyCollectorFromConsequences(
  events: Parameters<typeof applyCollectorEvents>[1],
): CollectorEvent[] {
  const store = read();
  const emitted = applyCollectorEvents(store, events);
  write(store);
  return emitted;
}

export function applyCollectorFromAction(
  world_slug: string,
  action_type: string,
  action_id?: string,
): CollectorEvent[] {
  const store = read();
  const emitted = applyActionToStore(store, world_slug, action_type, action_id);
  write(store);
  return emitted;
}
