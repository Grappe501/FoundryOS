/** PASS-034L — Events are world state, not content */

export const WORLD_EVENT_TYPES = [
  'daily_mystery',
  'weekly_rivalry',
  'spotlight',
  'debate',
  'challenge',
  'rabbit_hole',
  'legendary_object',
  'history',
] as const;

export type WorldEventType = (typeof WORLD_EVENT_TYPES)[number];

export const USER_INTERACTION_TYPES = [
  'view',
  'vote',
  'save',
  'complete',
  'respond',
  'join_challenge',
] as const;

export type UserInteractionType = (typeof USER_INTERACTION_TYPES)[number];

export type RivalryOption = {
  id: string;
  label: string;
};

export type WorldEventAction = {
  label: string;
  href: string;
};

export type WorldEventTrigger = {
  action_type: string;
  action_id: string;
};

/** Template in registry — resolved with dates at runtime */
export type WorldEventDefinition = {
  event_id: string;
  world_slug: string;
  event_type: WorldEventType;
  title: string;
  short_hook: string;
  deep_description: string;
  why_it_matters: string;
  primary_action: WorldEventAction;
  related_missions?: string[];
  related_collections?: string[];
  related_lore?: string[];
  related_atlas_terms?: string[];
  related_community_prompt?: string;
  user_interaction_type: UserInteractionType;
  rivalry_options?: RivalryOption[];
  consequence_trigger?: WorldEventTrigger;
  collector_action?: WorldEventTrigger;
  debate_options?: { id: string; label: string }[];
};

/** Active event with computed window */
export type WorldEvent = WorldEventDefinition & {
  starts_at: string;
  ends_at: string;
  status: 'active' | 'upcoming' | 'ended';
  /** Simulated weekly split for rivalries (seeded, stable per week) */
  rivalry_split?: Record<string, number>;
};

export type WorldEventsSnapshot = {
  world_slug: string;
  date_key: string;
  week_key: string;
  hero_title: string;
  hero_hook: string;
  events: WorldEvent[];
};

export type WorldEventPool = Record<WorldEventType, WorldEventDefinition[]>;

export const LIVE_EVENT_WORLDS = [
  'bourbon',
  'ai-builder',
  'public-speaking',
  'civic-engagement',
  'bbq',
  'poker',
  'financial-independence',
] as const;

export type LiveEventWorld = (typeof LIVE_EVENT_WORLDS)[number];

export const EVENT_TYPE_LABELS: Record<WorldEventType, string> = {
  daily_mystery: 'Daily Mystery',
  weekly_rivalry: 'Weekly Rivalry',
  spotlight: 'Spotlight',
  debate: 'Debate',
  challenge: 'Challenge',
  rabbit_hole: 'Rabbit Hole',
  legendary_object: 'Legendary Object',
  history: 'This Week in History',
};
