import type { ConsequenceNode } from '@foundry/consequence-engine';
import type { CollectorEvent, CollectorEventType, CollectorStore, CollectionProgress, CollectionProgressView } from './types';
import { COLLECTION_EARN_RULES, COLLECTION_DEFINITIONS, collectionsForWorld, getCollectionDefinition } from './registry';

const emptyStore = (): CollectorStore => ({ collections: {}, recent_events: [] });

const PROGRESS_UNITS: Record<string, string> = {
  'wheated-explorer': 'discoveries',
  'bottled-in-bond-collection': 'bottles',
  'distillery-pilgrim': 'houses',
};

function progressUnitForCollection(collectionId: string): string {
  return PROGRESS_UNITS[collectionId] ?? 'items';
}

export function buildProgressView(collectionId: string, store: CollectorStore): CollectionProgressView | null {
  const definition = getCollectionDefinition(collectionId);
  if (!definition) return null;

  const progress = store.collections[collectionId];
  const unlockedIds = new Set(progress?.unlocked_items ?? []);
  const unlocked_items = definition.items.filter((i) => unlockedIds.has(i.id));
  const remaining_items = definition.items.filter((i) => !unlockedIds.has(i.id));
  const unlocked_count = unlocked_items.length;
  const total_count = definition.items.length;
  const completed = total_count > 0 && unlocked_count >= total_count;

  const unit = progressUnitForCollection(collectionId);

  return {
    definition,
    unlocked_count,
    total_count,
    completed,
    unlocked_items,
    remaining_items,
    progress_label: `${unlocked_count} of ${total_count} ${unit}`,
  };
}

export function getWorldCollectionViews(worldSlug: string, store: CollectorStore): CollectionProgressView[] {
  return collectionsForWorld(worldSlug)
    .map((d) => buildProgressView(d.id, store))
    .filter(Boolean) as CollectionProgressView[];
}

export function getAllCollectionViews(store: CollectorStore): CollectionProgressView[] {
  return COLLECTION_DEFINITIONS.map((d) => buildProgressView(d.id, store)).filter(Boolean) as CollectionProgressView[];
}

function upsertProgress(store: CollectorStore, collectionId: string, worldSlug: string): CollectionProgress {
  const existing = store.collections[collectionId];
  if (existing) return existing;
  const created: CollectionProgress = {
    collection_id: collectionId,
    world_slug: worldSlug,
    unlocked_items: [],
    updated_at: new Date().toISOString(),
  };
  store.collections[collectionId] = created;
  return created;
}

function eventLabel(type: CollectorEventType, title: string, itemLabel?: string): string {
  if (type === 'collection_completed') return `${title} — complete`;
  if (itemLabel) return `${title}: ${itemLabel}`;
  return `${title} — progress`;
}

/** Apply a single collector event to store (mutates copy) */
export function applyCollectorEvent(store: CollectorStore, partial: Omit<CollectorEvent, 'at' | 'label'> & { label?: string }): CollectorEvent[] {
  const definition = getCollectionDefinition(partial.collection_id);
  if (!definition) return [];

  const next: CollectorStore = {
    collections: { ...store.collections },
    recent_events: [...store.recent_events],
  };

  const progress = { ...upsertProgress(next, partial.collection_id, definition.world_slug) };
  const unlocked = new Set(progress.unlocked_items);
  const emitted: CollectorEvent[] = [];

  let itemId = partial.item_id;
  if (!itemId) {
    const nextItem = definition.items.find((i) => !unlocked.has(i.id));
    itemId = nextItem?.id;
  }

  if (itemId && !unlocked.has(itemId)) {
    unlocked.add(itemId);
    const item = definition.items.find((i) => i.id === itemId);
    const unlockedEvent: CollectorEvent = {
      type: 'collection_unlocked',
      collection_id: partial.collection_id,
      world_slug: definition.world_slug,
      item_id: itemId,
      label: partial.label ?? eventLabel('collection_unlocked', definition.title, item?.label),
      at: new Date().toISOString(),
    };
    emitted.push(unlockedEvent);
  } else if (!itemId) {
    const progEvent: CollectorEvent = {
      type: 'collection_progress',
      collection_id: partial.collection_id,
      world_slug: definition.world_slug,
      label: partial.label ?? eventLabel('collection_progress', definition.title),
      at: new Date().toISOString(),
    };
    emitted.push(progEvent);
  }

  progress.unlocked_items = [...unlocked];
  progress.updated_at = new Date().toISOString();

  if (progress.unlocked_items.length >= definition.items.length && !progress.completed_at) {
    progress.completed_at = progress.updated_at;
    emitted.push({
      type: 'collection_completed',
      collection_id: partial.collection_id,
      world_slug: definition.world_slug,
      label: eventLabel('collection_completed', definition.title),
      at: progress.updated_at,
    });
  }

  next.collections[partial.collection_id] = progress;
  next.recent_events = [...emitted, ...next.recent_events].slice(0, 50);

  Object.assign(store, next);
  return emitted;
}

/** Match earn rules from user action */
export function collectorEventsFromAction(
  world_slug: string,
  action_type: string,
  action_id?: string,
): Omit<CollectorEvent, 'at' | 'label'>[] {
  const rules = COLLECTION_EARN_RULES.filter(
    (r) =>
      r.world_slug === world_slug &&
      r.action_type === action_type &&
      (r.action_id === undefined || r.action_id === action_id),
  );

  return rules.map((r) => ({
    type: 'collection_unlocked' as const,
    collection_id: r.collection_id,
    world_slug: r.world_slug,
    item_id: r.item_id,
  }));
}

/** Map consequence effect nodes → collector events */
export function collectorEventsFromConsequences(effects: ConsequenceNode[]): Omit<CollectorEvent, 'at' | 'label'>[] {
  const events: Omit<CollectorEvent, 'at' | 'label'>[] = [];

  for (const effect of effects) {
    if (effect.kind === 'unlock_collector_progress' && effect.target_id) {
      events.push({
        type: 'collection_unlocked',
        collection_id: effect.target_id,
        world_slug: effect.world_slug,
        item_id: typeof effect.metadata?.item_id === 'string' ? effect.metadata.item_id : undefined,
      });
    }
    if (effect.kind === 'unlock_collection' && effect.target_id) {
      events.push({
        type: 'collection_unlocked',
        collection_id: effect.target_id,
        world_slug: effect.world_slug,
        item_id: typeof effect.metadata?.item_id === 'string' ? effect.metadata.item_id : undefined,
      });
    }
  }

  return events;
}

export function applyCollectorEvents(store: CollectorStore, events: Omit<CollectorEvent, 'at' | 'label'>[]): CollectorEvent[] {
  const all: CollectorEvent[] = [];
  for (const e of events) {
    all.push(...applyCollectorEvent(store, e));
  }
  return all;
}

export function applyActionToStore(
  store: CollectorStore,
  world_slug: string,
  action_type: string,
  action_id?: string,
): CollectorEvent[] {
  const events = collectorEventsFromAction(world_slug, action_type, action_id);
  return applyCollectorEvents(store, events);
}

export { emptyStore };
