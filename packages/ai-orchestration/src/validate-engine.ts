import { validateAtlasAwareAI } from '@foundry/atlas-aware-ai';
import { validateRecommendationEngine } from '@foundry/recommendation-engine-v2';
import { validateReviewEngine } from '@foundry/review-engine';
import { COPILOT_PERSONAS } from './copilots';
import { orchestrateFoundryAI } from './foundry-orchestrate';
import { orchestrateCopilot } from './orchestrate';
import { ORCHESTRATION_ACTION_LABELS, ORCHESTRATION_VERSION } from './types';

export function validateOrchestrationEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (COPILOT_PERSONAS.length < 7) errors.push('COPILOT_PERSONAS incomplete');
  if (Object.keys(ORCHESTRATION_ACTION_LABELS).length < 13) errors.push('ORCHESTRATION_ACTION_LABELS incomplete');

  const copilot = orchestrateCopilot({
    world_slug: 'ai-builder',
    action: 'recommend_next_mission',
    user_segment: 'adult',
  });
  if (!copilot.message || copilot.suggestions.length === 0) errors.push('orchestrateCopilot returned empty');

  const blocked = orchestrateCopilot({
    world_slug: 'bourbon',
    action: 'recommend_next_mission',
    user_segment: 'student',
  });
  if (!blocked.blocked) errors.push('Student bourbon copilot must be blocked');

  const atlasBlocked = orchestrateFoundryAI(
    { world_slug: 'bourbon', action: 'ask_atlas', user_segment: 'adult', atlas_prompt: 'why_care' },
    {},
  );
  if (!atlasBlocked.blocked) errors.push('ask_atlas without bundle must block');

  const atlas = validateAtlasAwareAI();
  if (!atlas.ok) errors.push(...atlas.errors.map((e) => `atlas-aware-ai: ${e}`));

  const reviews = validateReviewEngine();
  if (!reviews.ok) errors.push(...reviews.errors.map((e) => `review-engine: ${e}`));

  const recs = validateRecommendationEngine();
  if (!recs.ok) errors.push(...recs.errors.map((e) => `recommendation-engine-v2: ${e}`));

  return { ok: errors.length === 0, errors };
}

export function getOrchestrationEngineStats() {
  const validation = validateOrchestrationEngine();
  return {
    version: ORCHESTRATION_VERSION,
    copilot_personas: COPILOT_PERSONAS.length,
    orchestration_actions: Object.keys(ORCHESTRATION_ACTION_LABELS).length,
    engine_ready: validation.ok,
    stack: ['ai-orchestration', 'atlas-aware-ai', 'review-engine', 'recommendation-engine-v2', 'mentor-engine'],
  };
}
