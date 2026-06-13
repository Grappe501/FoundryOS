import type { CreateArtifactInput, FoundryArtifact, ArtifactRelation } from '@foundry/artifact-engine';
import type { FoundryReview } from '@foundry/review-engine';
import type { CreateRecommendationInput, FoundryRecommendation, RecommendationListFilter } from './types';
import { inferRecommendationType } from './contexts';
import { createRecommendation } from './create';

const PAYLOAD_KEYS = [
  'id',
  'user_id',
  'world_slug',
  'entity_slug',
  'entity_type',
  'recommendation_type',
  'title',
  'recommendation_reason',
  'who_this_is_for',
  'best_next_action',
  'what_to_watch_for',
  'confidence_level',
  'based_on_artifacts',
  'based_on_reviews',
  'based_on_collections',
  'related_graph_nodes',
  'privacy',
  'comparison_note',
  'budget_note',
  'beginner_note',
  'hosting_note',
  'collection_note',
  'bourbon_context',
  'created_at',
  'updated_at',
] as const;

export function recommendationPayload(rec: FoundryRecommendation): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of PAYLOAD_KEYS) {
    payload[key] = rec[key];
  }
  return payload;
}

export function extractRecommendationFromArtifact(artifact: FoundryArtifact): FoundryRecommendation | null {
  if (artifact.type !== 'recommendation') return null;
  const p = artifact.metadata.payload ?? {};
  if (typeof p.entity_slug !== 'string' || typeof p.recommendation_reason !== 'string') return null;

  return {
    id: (p.id as string) ?? artifact.id,
    user_id: artifact.user_id,
    world_slug: artifact.metadata.world_slug,
    entity_slug: p.entity_slug as string,
    entity_type: (p.entity_type as string) ?? 'entity',
    recommendation_type:
      (p.recommendation_type as FoundryRecommendation['recommendation_type']) ?? 'entity_recommendation',
    title: artifact.metadata.title,
    recommendation_reason: p.recommendation_reason as string,
    who_this_is_for: (p.who_this_is_for as string) ?? '',
    best_next_action: (p.best_next_action as string) ?? '',
    what_to_watch_for: p.what_to_watch_for as string | undefined,
    confidence_level: (p.confidence_level as FoundryRecommendation['confidence_level']) ?? 'medium',
    based_on_artifacts: (p.based_on_artifacts as string[]) ?? [],
    based_on_reviews: (p.based_on_reviews as string[]) ?? [],
    based_on_collections: (p.based_on_collections as string[]) ?? [],
    related_graph_nodes: (p.related_graph_nodes as string[]) ?? [],
    privacy: artifact.metadata.privacy,
    comparison_note: p.comparison_note as string | undefined,
    budget_note: p.budget_note as string | undefined,
    beginner_note: p.beginner_note as string | undefined,
    hosting_note: p.hosting_note as string | undefined,
    collection_note: p.collection_note as string | undefined,
    bourbon_context: p.bourbon_context as string | undefined,
    created_at: artifact.created_at,
    updated_at: artifact.updated_at,
  };
}

export function recommendationsFromArtifacts(artifacts: FoundryArtifact[]): FoundryRecommendation[] {
  return artifacts
    .filter((a) => a.type === 'recommendation')
    .map(extractRecommendationFromArtifact)
    .filter((r): r is FoundryRecommendation => r !== null);
}

export function listRecommendationsForEntity(
  artifacts: FoundryArtifact[],
  filter: RecommendationListFilter,
): FoundryRecommendation[] {
  let list = recommendationsFromArtifacts(artifacts).filter(
    (r) =>
      r.world_slug === filter.world_slug &&
      r.entity_slug === filter.entity_slug &&
      r.entity_type === filter.entity_type,
  );

  if (filter.user_id) list = list.filter((r) => r.user_id === filter.user_id);
  if (filter.privacy) list = list.filter((r) => r.privacy === filter.privacy);
  if (filter.recommendation_type) {
    list = list.filter((r) => r.recommendation_type === filter.recommendation_type);
  }

  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function listRecommendationsByUser(
  artifacts: FoundryArtifact[],
  userId: string,
  worldSlug?: string,
): FoundryRecommendation[] {
  let list = recommendationsFromArtifacts(artifacts).filter((r) => r.user_id === userId);
  if (worldSlug) list = list.filter((r) => r.world_slug === worldSlug);
  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function recommendationToArtifact(
  rec: FoundryRecommendation,
  entityTitle?: string,
): CreateArtifactInput {
  const entityRef = {
    world_slug: rec.world_slug,
    entity_type: rec.entity_type,
    slug: rec.entity_slug,
    title: entityTitle,
  };

  const relations: ArtifactRelation[] = [
    { type: 'references', target: entityRef, label: 'recommended' },
    { type: 'recommended_by', target: { artifact_id: rec.user_id }, label: 'recommender' },
  ];

  for (const nodeSlug of rec.related_graph_nodes.slice(0, 6)) {
    relations.push({
      type: 'connected_to',
      target: {
        world_slug: rec.world_slug,
        entity_type: 'atlas_term',
        slug: nodeSlug,
      },
      label: 'connects to',
    });
  }

  return {
    type: 'recommendation',
    user_id: rec.user_id,
    metadata: {
      world_slug: rec.world_slug,
      title: rec.title,
      summary: rec.recommendation_reason.slice(0, 160),
      occurred_at: rec.created_at,
      entities: [entityRef],
      topics: [rec.recommendation_type.replace('_recommendation', '')],
      privacy: rec.privacy,
      payload: recommendationPayload(rec),
    },
    relations,
  };
}

/** Optional — seed a recommendation from an existing review */
export function createRecommendationInputFromReview(
  review: FoundryReview,
  userId: string,
  overrides?: Partial<CreateRecommendationInput>,
): CreateRecommendationInput {
  return {
    user_id: userId,
    world_slug: review.world_slug,
    entity_slug: review.entity_slug,
    entity_type: review.entity_type,
    recommendation_type: inferRecommendationType(review.world_slug, review.entity_type),
    title: `Recommend: ${review.title}`,
    recommendation_reason: review.what_surprised_me,
    who_this_is_for: review.who_this_is_for,
    best_next_action: review.what_to_try_next,
    what_to_watch_for: review.who_should_skip,
    based_on_reviews: [review.id],
    confidence_level: review.confidence_level,
    privacy: review.privacy,
    beginner_note: review.beginner_note,
    comparison_note: review.comparison_note,
    budget_note: review.value_note,
    ...overrides,
  };
}

export function recommendationFromReview(
  review: FoundryReview,
  userId: string,
  overrides?: Partial<CreateRecommendationInput>,
) {
  return createRecommendation(createRecommendationInputFromReview(review, userId, overrides));
}
