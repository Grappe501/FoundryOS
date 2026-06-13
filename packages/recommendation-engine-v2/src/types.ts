import type { ArtifactPrivacy, GraphEntityRef } from '@foundry/artifact-engine';

export type RecommendationType =
  | 'entity_recommendation'
  | 'bottle_recommendation'
  | 'tool_recommendation'
  | 'mission_recommendation'
  | 'atlas_path_recommendation'
  | 'collection_recommendation'
  | 'event_recommendation'
  | 'group_recommendation'
  | 'experience_recommendation'
  | 'next_step_recommendation';

export const RECOMMENDATION_TYPES: RecommendationType[] = [
  'entity_recommendation',
  'bottle_recommendation',
  'tool_recommendation',
  'mission_recommendation',
  'atlas_path_recommendation',
  'collection_recommendation',
  'event_recommendation',
  'group_recommendation',
  'experience_recommendation',
  'next_step_recommendation',
];

export type RecommendationConfidence = 'low' | 'medium' | 'high' | 'expert';

export type FoundryRecommendation = {
  id: string;
  user_id: string;
  world_slug: string;
  entity_slug: string;
  entity_type: string;
  recommendation_type: RecommendationType;
  title: string;
  recommendation_reason: string;
  who_this_is_for: string;
  best_next_action: string;
  what_to_watch_for?: string;
  confidence_level: RecommendationConfidence;
  based_on_artifacts: string[];
  based_on_reviews: string[];
  based_on_collections: string[];
  related_graph_nodes: string[];
  privacy: ArtifactPrivacy;
  comparison_note?: string;
  budget_note?: string;
  beginner_note?: string;
  hosting_note?: string;
  collection_note?: string;
  bourbon_context?: string;
  created_at: string;
  updated_at: string;
};

export type CreateRecommendationInput = {
  user_id: string;
  world_slug: string;
  entity_slug: string;
  entity_type: string;
  recommendation_type: RecommendationType;
  title: string;
  recommendation_reason: string;
  who_this_is_for: string;
  best_next_action: string;
  what_to_watch_for?: string;
  confidence_level?: RecommendationConfidence;
  based_on_artifacts?: string[];
  based_on_reviews?: string[];
  based_on_collections?: string[];
  related_graph_nodes?: string[];
  privacy?: ArtifactPrivacy;
  comparison_note?: string;
  budget_note?: string;
  beginner_note?: string;
  hosting_note?: string;
  collection_note?: string;
  bourbon_context?: string;
  entity_title?: string;
};

export type RecommendationListFilter = {
  world_slug: string;
  entity_type: string;
  entity_slug: string;
  user_id?: string;
  privacy?: ArtifactPrivacy;
  recommendation_type?: RecommendationType;
};

export type RecommendationSignalSummary = {
  total: number;
  public_count: number;
  private_count: number;
  by_world: Record<string, number>;
  by_entity: Record<string, number>;
  by_type: Partial<Record<RecommendationType, number>>;
  latest: FoundryRecommendation | null;
  influence: InfluenceSignalSummary;
  narrative?: {
    recommended_for: string;
    why: string;
    next_action: string;
    watch_for: string;
    connects_to: string;
  };
};

export type InfluenceSignalSummary = {
  recommendations_created: number;
  recommendations_connected_to_graph: number;
  recommendations_based_on_artifacts: number;
  recommendations_based_on_reviews: number;
  recommendations_public: number;
};

export type RecommendationGraphEdge = {
  from: { kind: 'user_recommendation'; recommendation_id: string; user_id: string };
  to: GraphEntityRef;
  relation: 'recommended';
  label: string;
};

export type RecommendationIdentitySignal = {
  world_slug: string;
  signal: string;
  topic?: string;
  evidence_type: 'recommendation';
  entity_slug: string;
};

export type RecommendationInfluenceSignal = {
  world_slug: string;
  recommender_user_id: string;
  recommendation_id: string;
  entity_slug: string;
  judgment_summary: string;
  trust_basis: 'self_reported' | 'review_backed' | 'collection_backed' | 'artifact_backed';
  graph_nodes: string[];
  is_public: boolean;
};
