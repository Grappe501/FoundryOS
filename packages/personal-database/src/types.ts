/** PASS-040D — Portable Identity bundle (all worlds) */

import type { FoundryArtifact } from '@foundry/artifact-engine';

export type MemoryCategory = 'active' | 'story' | 'anticipation' | 'snapshot';

export type UserMemoryRecord = {
  world_slug: string;
  memory_category: MemoryCategory;
  memory_key: string;
  payload: Record<string, unknown>;
  occurred_at: string;
};

export type GraphTraversalRecord = {
  world_slug: string;
  node_slug: string;
  node_title: string;
  node_type: string;
  source: 'atlas' | 'graph' | 'compare' | 'search';
  entered_at: string;
};

/** Mirrors client WorldMemoryV1 — cloud source of truth when authed */
export type PortableMemoryState = {
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
  sync_threads: { id: string; text: string; href?: string; at: string; world_slug: string }[];
  curiosity_weights: Record<string, number>;
};

export type PortableCollectorState = {
  collections: Record<string, unknown>;
  recent_events: unknown[];
  unlocked_items: Record<string, string[]>;
};

export type PortableIdentityBundle = {
  user_id: string;
  artifacts: FoundryArtifact[];
  memory_state: PortableMemoryState;
  collector_state: PortableCollectorState | null;
  graph_history: GraphTraversalRecord[];
  hydrated_at: string;
};

export const GLOBAL_WORLD_SLUG = '_global';
export const MEMORY_SNAPSHOT_KEY = 'world-memory-v1';
export const COLLECTOR_SNAPSHOT_KEY = 'collector-state';
