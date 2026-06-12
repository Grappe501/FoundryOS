/** PASS-040D.5 — every saved action changes the user's world */

import type { FoundryArtifact } from '@foundry/artifact-engine';

export type IdentitySyncEventType =
  | 'artifact_created'
  | 'graph_viewed'
  | 'rabbit_hole_saved'
  | 'comparison_saved'
  | 'collection_advanced'
  | 'mission_completed'
  | 'event_completed';

export type IdentitySyncEvent =
  | { type: 'artifact_created'; world_slug: string; at: string; artifact: FoundryArtifact }
  | { type: 'graph_viewed'; world_slug: string; at: string; slug: string; title: string }
  | { type: 'rabbit_hole_saved'; world_slug: string; at: string; slug: string; title: string }
  | { type: 'comparison_saved'; world_slug: string; at: string; slug_a: string; slug_b: string; label_a: string; label_b: string }
  | { type: 'collection_advanced'; world_slug: string; at: string; collection_id: string; item_id?: string; label?: string }
  | { type: 'mission_completed'; world_slug: string; at: string; mission_slug: string; mission_title: string }
  | { type: 'event_completed'; world_slug: string; at: string; event_id: string; event_title?: string };

export type CollectionUpdate = {
  world_slug: string;
  action_type: string;
  action_id?: string;
  collection_id?: string;
  item_id?: string;
  label?: string;
};

export type IdentitySignal = {
  world_slug: string;
  signal: string;
  topic?: string;
};

export type MemoryUpdate = {
  world_slug: string;
  category: 'active' | 'story' | 'anticipation';
  memory_key: string;
  text: string;
  href?: string;
  at: string;
};

export type PassportUpdate = {
  kind: 'artifact_highlight' | 'collection_milestone' | 'identity_signal';
  world_slug: string;
  title: string;
  story: string;
  href?: string;
};

export type WelcomeBackThread = {
  id: string;
  text: string;
  href?: string;
  kind: 'exploration' | 'artifact' | 'collection' | 'comparison' | 'rabbit_hole';
};

export type CuriosityWeight = {
  world_slug: string;
  topic_slug: string;
  delta: number;
  source: IdentitySyncEventType;
};

export type IdentitySyncResult = {
  event_type: IdentitySyncEventType;
  world_slug: string;
  collection_updates: CollectionUpdate[];
  identity_signals: IdentitySignal[];
  memory_updates: MemoryUpdate[];
  passport_updates: PassportUpdate[];
  welcome_back_threads: WelcomeBackThread[];
  curiosity_weights: CuriosityWeight[];
};

export type IdentitySyncContext = {
  /** Recent artifact titles for narrative dedupe */
  recent_artifact_titles?: string[];
};
