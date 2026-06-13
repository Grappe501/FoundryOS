import type { FoundryRecommendation, RecommendationIdentitySignal } from './types';

export function recommendationToIdentitySignals(rec: FoundryRecommendation): RecommendationIdentitySignal[] {
  const signals: RecommendationIdentitySignal[] = [
    {
      world_slug: rec.world_slug,
      signal: `Recommended ${rec.entity_slug}: ${rec.recommendation_reason.slice(0, 80)}`,
      topic: rec.recommendation_type.replace('_recommendation', ''),
      evidence_type: 'recommendation',
      entity_slug: rec.entity_slug,
    },
  ];

  if (rec.based_on_reviews.length > 0) {
    signals.push({
      world_slug: rec.world_slug,
      signal: `Judgment backed by ${rec.based_on_reviews.length} review(s)`,
      topic: 'review-backed',
      evidence_type: 'recommendation',
      entity_slug: rec.entity_slug,
    });
  }

  return signals;
}
