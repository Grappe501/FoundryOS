import { canPublishContent, DEFAULT_MINIMUM_PUBLISH_SCORE } from '@foundry/content-engine';
import type { PublishDecision } from './types';

/**
 * Publish decision — default HOLD for factory output.
 * Generated ≠ Published. Score must clear gate.
 */
export function decidePublish(overallScore: number, forceHold = true): PublishDecision {
  if (forceHold) return 'hold';
  return canPublishContent(overallScore, DEFAULT_MINIMUM_PUBLISH_SCORE) ? 'eligible' : 'hold';
}
