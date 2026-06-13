import type { ArtifactPrivacy, GraphEntityRef } from '@foundry/artifact-engine';

/** Structured review types — worlds map entity types to these */
export type ReviewType =
  | 'bottle_review'
  | 'tool_review'
  | 'lesson_review'
  | 'mission_review'
  | 'producer_review'
  | 'experience_review'
  | 'event_review'
  | 'book_review'
  | 'recipe_review'
  | 'project_review'
  | 'place_review';

export const REVIEW_TYPES: ReviewType[] = [
  'bottle_review',
  'tool_review',
  'lesson_review',
  'mission_review',
  'producer_review',
  'experience_review',
  'event_review',
  'book_review',
  'recipe_review',
  'project_review',
  'place_review',
];

export type ReviewConfidence = 'low' | 'medium' | 'high' | 'expert';

/** Qualitative dimension notes — not star ratings */
export type ReviewDimensions = Record<string, string>;

export type FoundryReview = {
  id: string;
  user_id: string;
  world_slug: string;
  entity_slug: string;
  entity_type: string;
  review_type: ReviewType;
  title: string;
  body: string;
  who_this_is_for: string;
  who_should_skip?: string;
  what_surprised_me: string;
  what_to_try_next: string;
  confidence_level: ReviewConfidence;
  experience_context?: string;
  review_dimensions: ReviewDimensions;
  privacy: ArtifactPrivacy;
  value_note?: string;
  beginner_note?: string;
  comparison_note?: string;
  serving_note?: string;
  created_at: string;
  updated_at: string;
};

export type CreateReviewInput = {
  user_id: string;
  world_slug: string;
  entity_slug: string;
  entity_type: string;
  review_type: ReviewType;
  title: string;
  body: string;
  who_this_is_for: string;
  who_should_skip?: string;
  what_surprised_me: string;
  what_to_try_next: string;
  confidence_level?: ReviewConfidence;
  experience_context?: string;
  review_dimensions?: ReviewDimensions;
  privacy?: ArtifactPrivacy;
  value_note?: string;
  beginner_note?: string;
  comparison_note?: string;
  serving_note?: string;
  entity_title?: string;
};

export type EntityReviewRef = {
  world_slug: string;
  entity_type: string;
  entity_slug: string;
};

export type ReviewListFilter = EntityReviewRef & {
  user_id?: string;
  privacy?: ArtifactPrivacy;
  review_type?: ReviewType;
};

export type ReviewSignalSummary = {
  total: number;
  public_count: number;
  private_count: number;
  by_world: Record<string, number>;
  by_entity: Record<string, number>;
  by_type: Partial<Record<ReviewType, number>>;
  latest: FoundryReview | null;
  /** Bourbon-style narrative summary — no aggregate score */
  narrative?: {
    best_for: string;
    avoid_if: string;
    teaches: string;
    next_bottle: string;
  };
};

export type ReviewGraphEdge = {
  from: { kind: 'user_review'; review_id: string; user_id: string };
  to: GraphEntityRef;
  relation: 'reviewed';
  label: string;
};

export type ReviewIdentitySignal = {
  world_slug: string;
  signal: string;
  topic?: string;
  evidence_type: 'review';
  entity_slug: string;
};

export type ReviewRecommendationSeed = {
  world_slug: string;
  source_entity_slug: string;
  source_entity_type: string;
  review_id: string;
  best_for: string;
  avoid_if?: string;
  surprise: string;
  next_try: string;
  confidence: ReviewConfidence;
};
