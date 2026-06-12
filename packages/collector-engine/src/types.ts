/** PASS-034K — Collections are identity objects, not badges */

export type CollectorEventType = 'collection_progress' | 'collection_unlocked' | 'collection_completed';

export type CollectionItemDef = {
  id: string;
  label: string;
  tease?: string;
};

export type CollectionEarnRule = {
  id: string;
  label: string;
  world_slug: string;
  action_type: string;
  action_id?: string;
  /** Which discovery this unlocks — if omitted, next unowned item */
  item_id?: string;
  collection_id: string;
};

export type CollectionDefinition = {
  id: string;
  world_slug: string;
  title: string;
  /** Identity story — why this collection matters to who you are becoming */
  story: string;
  items: CollectionItemDef[];
  href?: string;
};

export type CollectionProgress = {
  collection_id: string;
  world_slug: string;
  unlocked_items: string[];
  completed_at?: string;
  updated_at: string;
};

export type CollectionProgressView = {
  definition: CollectionDefinition;
  unlocked_count: number;
  total_count: number;
  completed: boolean;
  unlocked_items: CollectionItemDef[];
  remaining_items: CollectionItemDef[];
  progress_label: string;
};

export type CollectorEvent = {
  type: CollectorEventType;
  collection_id: string;
  world_slug: string;
  item_id?: string;
  label: string;
  at: string;
};

export type CollectorStore = {
  collections: Record<string, CollectionProgress>;
  recent_events: CollectorEvent[];
};
