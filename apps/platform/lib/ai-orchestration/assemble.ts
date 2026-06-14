/** PASS-049 — Platform orchestration context assembly */

import type { AtlasAskPrompt } from '@foundry/atlas-aware-ai';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import {
  orchestrateFoundryAI,
  type OrchestrationBundle,
  type OrchestrationRequest,
  type OrchestrationResponse,
} from '@foundry/ai-orchestration';
import { summarizeRecommendationSignals, recommendationsFromArtifacts } from '@foundry/recommendation-engine-v2';
import { summarizeReviewSignals, reviewsFromArtifacts } from '@foundry/review-engine';
import { resolveWorldIdentityNarrative } from '@foundry/identity-narrative-engine';
import { getMemoryState } from '../world-memory/memory-store';
import { assembleSignalBundle } from '../identity-narrative/assemble-signals';
import { getLocalUserId, listClientArtifacts } from '../artifacts/client-store';
import {
  askAtlas,
  buildUserContextFromSignals,
  resolveAtlasContextForSlug,
} from '../atlas-aware-ai/assemble';

export type AssembleOrchestrationInput = {
  world_slug: string;
  entity_slug?: string;
  user_id?: string;
};

export function assembleOrchestrationBundle(input: AssembleOrchestrationInput): OrchestrationBundle {
  const memory = getMemoryState();
  const signals = assembleSignalBundle(input.world_slug);
  const userId = input.user_id ?? getLocalUserId();
  const artifacts = listClientArtifacts({ user_id: userId, world_slug: input.world_slug });

  const reviews = reviewsFromArtifacts(artifacts);
  const recommendations = recommendationsFromArtifacts(artifacts);

  const user = buildUserContextFromSignals(signals, memory, artifacts);
  user.reviews = reviews.map((r) => ({
    entity_slug: r.entity_slug,
    title: r.title,
    who_this_is_for: r.who_this_is_for,
    what_surprised_me: r.what_surprised_me,
    what_to_try_next: r.what_to_try_next,
  }));
  user.recommendations = recommendations.map((r) => ({
    entity_slug: r.entity_slug,
    title: r.title,
    who_this_is_for: r.who_this_is_for,
    recommendation_reason: r.recommendation_reason,
    best_next_action: r.best_next_action,
  }));

  const narrative = resolveWorldIdentityNarrative(signals);
  const atlas = input.entity_slug ? resolveAtlasContextForSlug(input.entity_slug) : null;

  return {
    atlas,
    user,
    mentor_notice: narrative?.mentor_notice,
  };
}

export function runFoundryOrchestration(
  request: OrchestrationRequest,
  input: AssembleOrchestrationInput,
): OrchestrationResponse {
  const bundle = assembleOrchestrationBundle(input);
  return orchestrateFoundryAI(request, bundle);
}

export function runAtlasOrchestration(
  slug: string,
  prompt: AtlasAskPrompt,
  world_slug = 'bourbon',
): OrchestrationResponse {
  return runFoundryOrchestration(
    {
      world_slug,
      action: 'ask_atlas',
      user_segment: 'adult',
      entity_slug: slug,
      atlas_prompt: prompt,
    },
    { world_slug, entity_slug: slug },
  );
}

export function socialSignalHeadline(artifacts: FoundryArtifact[]): string {
  const reviewSummary = summarizeReviewSignals(artifacts);
  const recSummary = summarizeRecommendationSignals(artifacts);
  return `${reviewSummary.total} review${reviewSummary.total === 1 ? '' : 's'} · ${recSummary.total} recommendation${recSummary.total === 1 ? '' : 's'}`;
}

/** Legacy helper — direct atlas ask without full orchestration envelope */
export { askAtlas, buildUserContextFromSignals, resolveAtlasContextForSlug };
