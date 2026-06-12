/** PASS-034P+ — Memory signals from client store (graph, compare, rabbit holes) */

import type {
  AnticipationMemory,
  ContinuitySignalBundle,
  OpenThread,
  UnlockedMemoryObject,
} from '@foundry/world-continuity-engine';

export type GraphViewMemory = {
  world_slug: string;
  slug: string;
  title: string;
  at: string;
};

export type SavedRabbitHoleMemory = {
  world_slug: string;
  slug: string;
  title: string;
  at: string;
};

export type ComparisonMemory = {
  world_slug: string;
  slug_a: string;
  slug_b: string;
  label_a: string;
  label_b: string;
  mode: 'bottles' | 'producers';
  at: string;
};

export type WorldMemorySignals = {
  graph_views: GraphViewMemory[];
  saved_rabbit_holes: SavedRabbitHoleMemory[];
  comparisons: ComparisonMemory[];
  /** first-event id → unlocked_at */
  first_unlock_times: Record<string, string>;
  sync_threads?: { id: string; text: string; href?: string; at: string; world_slug: string }[];
  curiosity_weights?: Record<string, number>;
};

export type MemoryEnrichedBundle = ContinuitySignalBundle & {
  memory: WorldMemorySignals;
};

export type WelcomeBackLineKind =
  | 'exploration'
  | 'rabbit_hole'
  | 'comparison'
  | 'collection'
  | 'debate'
  | 'detective'
  | 'anticipation';

export type WelcomeBackLine = {
  id: string;
  text: string;
  href?: string;
  kind: WelcomeBackLineKind;
};

export type WelcomeBackSnapshot = {
  world_slug: string;
  world_name: string;
  headline: string;
  lines: WelcomeBackLine[];
  /** 1. Active Memory */
  active_memory: OpenThread[];
  /** 2. Story Memory */
  story_memory: UnlockedMemoryObject[];
  /** 3. Anticipation Memory */
  anticipation?: AnticipationMemory;
  since_then: string[];
  continue: { label: string; href: string; reason: string };
};

export type JourneyWelcomeBackSnapshot = {
  headline: string;
  intro: string;
  lines: WelcomeBackLine[];
  active_memory: OpenThread[];
  story_memory: UnlockedMemoryObject[];
  anticipation?: AnticipationMemory;
  since_then: string[];
  continue_label: string;
  continue_href: string;
};

export type UnfinishedThread = OpenThread & {
  priority: number;
  reason: string;
};

export type AtlasRabbitHoleResume = {
  slug: string;
  title: string;
  href: string;
  saved_at: string;
  label: string;
};

export type FirstMemoryDef = {
  id: string;
  world_slug: string;
  title: string;
  story: string;
  timeline_title: string;
};

export type MemoryTimelineStoryEntry = {
  id: string;
  at: string;
  month_label: string;
  title: string;
  story?: string;
  world_slug: string;
  world_name: string;
  href?: string;
  kind: 'story' | 'active';
};
