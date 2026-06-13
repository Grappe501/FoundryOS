import { RECOMMENDATION_TYPES } from './types';
import { BOURBON_RECOMMENDATION_CONTEXTS } from './contexts';
import { createRecommendation } from './create';
import { recommendationToArtifact } from './artifact';
import { validateRecommendation } from './validate';
import { recommendationToInfluenceSignal } from './summarize';

export function validateRecommendationEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (RECOMMENDATION_TYPES.length < 10) errors.push('RECOMMENDATION_TYPES incomplete');
  if (BOURBON_RECOMMENDATION_CONTEXTS.length < 8) errors.push('Missing bourbon recommendation contexts');

  const sample = createRecommendation({
    user_id: 'audit-user',
    world_slug: 'bourbon',
    entity_slug: 'wild-turkey-101',
    entity_type: 'bottle',
    recommendation_type: 'bottle_recommendation',
    title: 'Audit sample recommendation',
    recommendation_reason: 'Proof and value balance for everyday pours.',
    who_this_is_for: 'Beginners who want proof without hype.',
    best_next_action: 'Pour neat, then compare with Old Forester 100.',
    bourbon_context: 'value hunt',
  });

  if (!sample.ok) errors.push('createRecommendation failed audit sample');
  else {
    const artifact = recommendationToArtifact(sample.recommendation);
    if (artifact.type !== 'recommendation') errors.push('recommendationToArtifact must produce type recommendation');
    const influence = recommendationToInfluenceSignal(sample.recommendation);
    if (!influence.judgment_summary) errors.push('Missing influence signal');
  }

  const bad = validateRecommendation({ user_id: 'x', world_slug: 'bourbon' });
  if (bad.ok) errors.push('validateRecommendation should reject incomplete input');

  return { ok: errors.length === 0, errors };
}

export function getRecommendationEngineStats() {
  return {
    recommendation_types: RECOMMENDATION_TYPES.length,
    bourbon_contexts: BOURBON_RECOMMENDATION_CONTEXTS.length,
    engine_ready: validateRecommendationEngine().ok,
  };
}
