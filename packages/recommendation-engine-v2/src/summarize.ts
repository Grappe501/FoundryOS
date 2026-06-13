import type {
  FoundryRecommendation,
  InfluenceSignalSummary,
  RecommendationInfluenceSignal,
  RecommendationSignalSummary,
} from './types';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import { recommendationsFromArtifacts } from './artifact';
import { recommendationGraphSignalChain } from './graph';

export function recommendationToInfluenceSignal(rec: FoundryRecommendation): RecommendationInfluenceSignal {
  let trust_basis: RecommendationInfluenceSignal['trust_basis'] = 'self_reported';
  if (rec.based_on_reviews.length > 0) trust_basis = 'review_backed';
  else if (rec.based_on_collections.length > 0) trust_basis = 'collection_backed';
  else if (rec.based_on_artifacts.length > 0) trust_basis = 'artifact_backed';

  return {
    world_slug: rec.world_slug,
    recommender_user_id: rec.user_id,
    recommendation_id: rec.id,
    entity_slug: rec.entity_slug,
    judgment_summary: `${rec.who_this_is_for} — ${rec.recommendation_reason.slice(0, 120)}`,
    trust_basis,
    graph_nodes: recommendationGraphSignalChain(rec),
    is_public: rec.privacy === 'public' || rec.privacy === 'community',
  };
}

export function buildInfluenceSummary(recommendations: FoundryRecommendation[]): InfluenceSignalSummary {
  return {
    recommendations_created: recommendations.length,
    recommendations_connected_to_graph: recommendations.filter(
      (r) => r.related_graph_nodes.length > 0 || r.world_slug === 'bourbon',
    ).length,
    recommendations_based_on_artifacts: recommendations.filter((r) => r.based_on_artifacts.length > 0).length,
    recommendations_based_on_reviews: recommendations.filter((r) => r.based_on_reviews.length > 0).length,
    recommendations_public: recommendations.filter((r) => r.privacy === 'public' || r.privacy === 'community')
      .length,
  };
}

export function summarizeRecommendationSignals(
  artifacts: FoundryArtifact[],
  userId?: string,
): RecommendationSignalSummary {
  let recommendations = recommendationsFromArtifacts(artifacts);
  if (userId) recommendations = recommendations.filter((r) => r.user_id === userId);

  recommendations = [...recommendations].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const by_world: Record<string, number> = {};
  const by_entity: Record<string, number> = {};
  const by_type: RecommendationSignalSummary['by_type'] = {};
  let public_count = 0;
  let private_count = 0;

  for (const r of recommendations) {
    by_world[r.world_slug] = (by_world[r.world_slug] ?? 0) + 1;
    const entityKey = `${r.world_slug}:${r.entity_type}:${r.entity_slug}`;
    by_entity[entityKey] = (by_entity[entityKey] ?? 0) + 1;
    by_type[r.recommendation_type] = (by_type[r.recommendation_type] ?? 0) + 1;
    if (r.privacy === 'public' || r.privacy === 'community') public_count += 1;
    else private_count += 1;
  }

  const latest = recommendations[0] ?? null;
  const influence = buildInfluenceSummary(recommendations);
  const narrative = latest ? narrativeFromRecommendation(latest) : undefined;

  return {
    total: recommendations.length,
    public_count,
    private_count,
    by_world,
    by_entity,
    by_type,
    latest,
    influence,
    narrative,
  };
}

function narrativeFromRecommendation(rec: FoundryRecommendation): RecommendationSignalSummary['narrative'] {
  return {
    recommended_for: rec.who_this_is_for,
    why: rec.recommendation_reason,
    next_action: rec.best_next_action,
    watch_for: rec.what_to_watch_for ?? 'No specific watch note',
    connects_to: recommendationGraphSignalChain(rec).join(' → '),
  };
}
