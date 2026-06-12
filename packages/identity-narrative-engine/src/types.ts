/** PASS-034M — Identity Narrative (not progression UI) */

/** Internal only — never shown to users */
export type InternalPhase = 'curious' | 'practicing' | 'shaping' | 'guiding';

export type IdentitySignalBundle = {
  world_slug: string;
  missions_completed: number;
  mission_titles: string[];
  reflections: string[];
  /** Consequence node ids unlocked (any world — filtered per world in assembly) */
  consequence_node_ids: string[];
  consequence_labels: string[];
  active_collections: { id: string; title: string; unlocked: number; total: number }[];
  completed_collection_ids: string[];
  events_voted: string[];
  events_completed: string[];
  events_saved: string[];
  debate_topics: string[];
  journal_entries: number;
  /** PASS-040D.5 — artifact signals for narrative */
  artifact_count: number;
  recent_artifact_titles: string[];
  recent_artifact_types: string[];
};

/** User-facing narrative — no tiers, no percentages */
export type IdentityNarrative = {
  world_slug: string;
  world_name: string;
  mentor_name: string;
  origin: string;
  recent_pattern: string;
  mentor_notice: string;
  recognition?: string;
  suggested_next: { label: string; href: string; reason: string };
};

export type FoundryIdentityStory = {
  display_name: string;
  headline: string;
  opening: string;
  worlds: IdentityNarrative[];
  primary_world?: IdentityNarrative;
};

export const LIVE_NARRATIVE_WORLDS = [
  'bourbon',
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'civic-engagement',
  'bbq',
  'poker',
] as const;

export type LiveNarrativeWorld = (typeof LIVE_NARRATIVE_WORLDS)[number];
