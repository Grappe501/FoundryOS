/** PASS-034P — Continuity is life, not storage */

export type OpenThreadKind =
  | 'bookmark'
  | 'collection'
  | 'detective'
  | 'debate'
  | 'challenge'
  | 'atlas'
  | 'mission';

export type OpenThread = {
  id: string;
  kind: OpenThreadKind;
  label: string;
  href: string;
};

export type MemoryObjectDef = {
  id: string;
  world_slug: string;
  title: string;
  story: string;
};

export type UnlockedMemoryObject = MemoryObjectDef & {
  unlocked_at: string;
};

export type AnticipationMemory = {
  curiosity: string;
  suggestion: string;
  label: string;
  href: string;
};

export type UnfinishedCollection = {
  collection_id: string;
  title: string;
  remaining_label: string;
  href?: string;
};

export type CompletedCollectionMoment = {
  collection_id: string;
  title: string;
  completed_at: string;
  href?: string;
};

export type ClosedDetectiveMoment = {
  slug: string;
  title: string;
  closed_at: string;
  href: string;
};

export type StoryMoment = {
  id: string;
  title: string;
  story: string;
  at: string;
  href?: string;
};

/** Assembled from client state across engines — not page clicks */
export type ContinuitySignalBundle = {
  world_slug: string;
  world_name: string;
  mentor_name: string;
  last_visit_at?: string;
  /** Last meaningful context (mission, atlas, consequence) */
  last_context?: { text: string; at?: string };
  intent?: { text: string; at?: string };
  open_thread_ids: OpenThread[];
  atlas_views: { term_slug: string; title: string; at: string }[];
  recent_discoveries: string[];
  unfinished_collections: UnfinishedCollection[];
  completed_collections: CompletedCollectionMoment[];
  closed_detective_cases: ClosedDetectiveMoment[];
  story_moments: StoryMoment[];
  unlocked_memory_ids: string[];
  memory_unlock_times: Record<string, string>;
  /** Detective case slugs not yet closed */
  open_detective_cases: { slug: string; title: string; href: string }[];
  /** Consequence labels unlocked since last visit (simulated v1: latest unlock) */
  latest_unlock_label?: string;
  latest_unlock_at?: string;
  missions_completed: number;
  last_mission_title?: string;
  events_saved: string[];
  events_completed: string[];
  event_titles: Record<string, { title: string; href: string }>;
  world_changed_hint?: string;
};

export type WorldContinuitySnapshot = {
  world_slug: string;
  world_name: string;
  headline: string;
  /** Narrative block — stories, not activity */
  narrative: string;
  context: string;
  intent?: string;
  /** 1. Active Memory — unfinished business */
  active_memory: OpenThread[];
  /** @deprecated use active_memory */
  open_threads: OpenThread[];
  unfinished_collections: UnfinishedCollection[];
  /** 2. Story Memory — permanent milestones */
  story_memory: UnlockedMemoryObject[];
  /** @deprecated use story_memory */
  memory_objects: UnlockedMemoryObject[];
  /** 3. Anticipation Memory — forward motion */
  anticipation?: AnticipationMemory;
  continue: { label: string; href: string; reason: string };
  since_then: string[];
  /** @deprecated use narrative */
  last_time: string;
};

export type JourneyContinuitySnapshot = {
  headline: string;
  intro: string;
  last_time_you_were: { world_name: string; summary: string; href: string }[];
  active_memory: OpenThread[];
  /** @deprecated */
  open_threads: OpenThread[];
  since_then: string[];
  story_memory: UnlockedMemoryObject[];
  /** @deprecated */
  memory_highlights: UnlockedMemoryObject[];
  anticipation?: AnticipationMemory;
  continue_label: string;
};

export type MemoryTimelineEntry = {
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

export const LIVE_CONTINUITY_WORLDS = [
  'bourbon',
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'civic-engagement',
  'bbq',
  'poker',
] as const;

export type LiveContinuityWorld = (typeof LIVE_CONTINUITY_WORLDS)[number];
