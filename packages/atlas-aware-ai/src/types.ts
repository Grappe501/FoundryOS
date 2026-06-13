import type { EntityGraphView, GraphConfidence, GraphEntityType } from '@foundry/atlas-graph-engine';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { IdentityNarrative } from '@foundry/identity-narrative-engine';
import type { PortableMemoryState } from '@foundry/personal-database';

export const UNKNOWN_SOURCE_MESSAGE =
  'Foundry does not have a verified source for that yet.';

/** Fields AI must not invent without verified confidence */
export const FORBIDDEN_INVENTION_TOPICS = [
  'mash bill percentages',
  'master distiller history',
  'grain source',
  'soil claims',
  'proprietary production details',
  'medical advice',
  'legal advice',
  'financial advice',
] as const;

export type InventoryFact = {
  field: string;
  value: string;
  confidence: GraphConfidence;
  source_label?: string;
};

export type AtlasContextEdge = {
  title: string;
  href: string;
  relation: string;
  confidence: GraphConfidence;
  teaser: string;
  source_label?: string;
};

export type AtlasContext = {
  anchor: {
    world_slug: string;
    entity_type: GraphEntityType;
    slug: string;
    title: string;
  };
  why_should_i_care: string;
  identities: string[];
  edges: AtlasContextEdge[];
  inventory_facts: InventoryFact[];
  unknown_fields: string[];
  confidence_warnings: string[];
  suggested_hops: { title: string; href: string; reason: string; confidence: GraphConfidence }[];
};

export type UserIdentityContext = {
  world_slug: string;
  artifacts: { title: string; type: string; at: string }[];
  reviews: {
    entity_slug: string;
    title: string;
    who_this_is_for: string;
    what_surprised_me: string;
    what_to_try_next: string;
  }[];
  recommendations: {
    entity_slug: string;
    title: string;
    who_this_is_for: string;
    recommendation_reason: string;
    best_next_action: string;
  }[];
  graph_views: { slug: string; title: string; at: string }[];
  saved_rabbit_holes: { slug: string; title: string }[];
  comparisons: { label_a: string; label_b: string }[];
  collections: { id: string; title: string; unlocked: number; total: number }[];
  curiosity_topics: { topic: string; weight: number; label: string }[];
  sync_threads: { text: string; href?: string }[];
  narrative?: Pick<IdentityNarrative, 'recent_pattern' | 'mentor_notice' | 'suggested_next'>;
  curiosity_summary: string;
};

export type AtlasAskPrompt =
  | 'why_care'
  | 'explore_next'
  | 'connect_shelf'
  | 'what_unknown';

export type MentorCitation = {
  label: string;
  href: string;
  confidence?: GraphConfidence;
};

export type MentorAnswer = {
  prompt: AtlasAskPrompt;
  answer: string;
  citations: MentorCitation[];
  confidence_notice: string | null;
  unknowns_acknowledged: string[];
  personalized: boolean;
  grounded_in_foundry: boolean;
};

export type ComparisonExplanationInput = {
  label_a: string;
  label_b: string;
  slug_a: string;
  slug_b: string;
  world_slug: string;
};

export type BuildUserIdentityInput = {
  world_slug: string;
  memory_state: PortableMemoryState;
  artifacts?: FoundryArtifact[];
  collections?: { id: string; title: string; unlocked: number; total: number }[];
  narrative?: UserIdentityContext['narrative'];
};

export type BuildAtlasContextInput = {
  graph: EntityGraphView;
  inventory_facts?: InventoryFact[];
};
