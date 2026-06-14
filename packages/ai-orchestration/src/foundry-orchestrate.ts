import {
  generateComparisonExplanation,
  generateMentorAnswer,
  generateNextBestRabbitHole,
  type AtlasAskPrompt,
} from '@foundry/atlas-aware-ai';
import { orchestrateCopilot } from './orchestrate';
import { getCopilotPersona, type CopilotRequest } from './copilots';
import { validateCopilotSafety } from './safety';
import type {
  OrchestrationBundle,
  OrchestrationRequest,
  OrchestrationResponse,
} from './types';

const COPILOT_ACTIONS = new Set<OrchestrationRequest['action']>([
  'explain_lesson',
  'recommend_next_mission',
  'review_reflection',
  'suggest_glossary_terms',
  'connect_related_worlds',
  'generate_practice_drills',
  'summarize_progress',
  'create_7_day_plan',
]);

function blocked(request: OrchestrationRequest, reason: string): OrchestrationResponse {
  return {
    persona: getCopilotPersona(request.world_slug)?.persona_name ?? 'Foundry Guide',
    action: request.action as OrchestrationResponse['action'],
    message: reason,
    suggestions: [],
    blocked: true,
    block_reason: reason,
    channel: 'blocked',
    grounded_in_foundry: false,
    engines_used: ['ai-orchestration'],
  };
}

function fromCopilot(
  request: OrchestrationRequest,
  copilot: ReturnType<typeof orchestrateCopilot>,
): OrchestrationResponse {
  return {
    ...copilot,
    channel: copilot.blocked ? 'blocked' : 'copilot',
    grounded_in_foundry: false,
    engines_used: ['ai-orchestration', 'mentor-bridge'],
  };
}

function atlasPromptFor(request: OrchestrationRequest): AtlasAskPrompt {
  return request.atlas_prompt ?? 'explore_next';
}

export function orchestrateFoundryAI(
  request: OrchestrationRequest,
  bundle: OrchestrationBundle = {},
): OrchestrationResponse {
  const safety = validateCopilotSafety(request);
  if (!safety.allowed) {
    return blocked(request, safety.reason ?? 'Request blocked by safety policy.');
  }

  const persona = getCopilotPersona(request.world_slug)?.persona_name ?? 'Foundry Guide';

  if (COPILOT_ACTIONS.has(request.action as CopilotRequest['action'])) {
    return fromCopilot(request, orchestrateCopilot(request as CopilotRequest));
  }

  const { atlas, user } = bundle;

  if (request.action === 'ask_atlas') {
    if (!atlas || !user) {
      return blocked(
        request,
        'Atlas answers require graph context and portable identity — open from a graph node or hydrate identity first.',
      );
    }
    const prompt = atlasPromptFor(request);
    const answer = generateMentorAnswer(prompt, atlas, user);
    return {
      persona,
      action: request.action,
      message: answer.answer,
      suggestions: answer.citations.map((c) => c.label),
      channel: 'atlas',
      citations: answer.citations,
      confidence_notice: answer.confidence_notice,
      grounded_in_foundry: answer.grounded_in_foundry,
      engines_used: ['ai-orchestration', 'atlas-aware-ai'],
      atlas_answer: answer,
    };
  }

  if (request.action === 'next_rabbit_hole') {
    if (!atlas || !user) {
      return blocked(request, 'Rabbit-hole paths require atlas context and user identity.');
    }
    const path = generateNextBestRabbitHole(atlas, user);
    return {
      persona,
      action: request.action,
      message: `${path.reason} Follow: ${path.path_label}.`,
      suggestions: path.hops.map((h) => h.label),
      channel: 'atlas',
      citations: path.hops,
      grounded_in_foundry: true,
      engines_used: ['ai-orchestration', 'atlas-aware-ai'],
    };
  }

  if (request.action === 'compare_explain') {
    if (!request.comparison) {
      return blocked(request, 'Comparison explain requires label_a, label_b, and slugs.');
    }
    const answer = generateComparisonExplanation(request.comparison, atlas ?? undefined);
    return {
      persona,
      action: request.action,
      message: answer.answer,
      suggestions: answer.citations.map((c) => c.label),
      channel: 'comparison',
      citations: answer.citations,
      confidence_notice: answer.confidence_notice,
      grounded_in_foundry: answer.grounded_in_foundry,
      engines_used: ['ai-orchestration', 'atlas-aware-ai'],
      atlas_answer: answer,
    };
  }

  if (request.action === 'social_signals') {
    const reviews = user?.reviews ?? [];
    const recs = user?.recommendations ?? [];
    const headline =
      reviews.length + recs.length === 0
        ? 'No reviews or recommendations in context yet — create one from a graph node or tasting artifact.'
        : `${reviews.length} review${reviews.length === 1 ? '' : 's'} and ${recs.length} recommendation${recs.length === 1 ? '' : 's'} shape social proof for this session.`;

    const suggestions: string[] = [];
    if (recs[0]) suggestions.push(`Latest rec: ${recs[0].title} — ${recs[0].best_next_action}`);
    if (reviews[0]) suggestions.push(`Latest review: ${reviews[0].title} — try ${reviews[0].what_to_try_next}`);
    if (suggestions.length === 0) suggestions.push('Open /bourbon/graph and leave a structured review');

    return {
      persona,
      action: request.action,
      message: headline,
      suggestions,
      channel: 'social',
      grounded_in_foundry: reviews.length + recs.length > 0,
      engines_used: ['ai-orchestration', 'review-engine', 'recommendation-engine-v2'],
      social_summary: {
        review_count: reviews.length,
        recommendation_count: recs.length,
        headline,
      },
    };
  }

  if (request.action === 'mentor_primary') {
    const notice = bundle.mentor_notice ?? user?.narrative?.mentor_notice;
    const next = user?.narrative?.suggested_next;
    const suggestions = next
      ? [`${next.label} — ${next.reason}`]
      : ['Open your current mission', 'Save a tasting artifact'];
    return {
      persona,
      action: request.action,
      message:
        notice ??
        user?.curiosity_summary ??
        `${persona} is ready — complete a mission or save a graph walk to unlock personalized mentor signals.`,
      suggestions,
      channel: 'mentor',
      grounded_in_foundry: Boolean(notice || user?.artifacts.length),
      engines_used: ['ai-orchestration', 'mentor-engine', 'identity-narrative'],
    };
  }

  return fromCopilot(request, orchestrateCopilot(request as CopilotRequest));
}
